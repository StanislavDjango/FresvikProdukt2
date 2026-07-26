const accessTokenPayload = "fresvik-prototype-access-v1";

export const prototypeAccessCookie = "fresvik_prototype_access";

function accessSigningKey() {
  const password = process.env.PROTOTYPE_ACCESS_PASSWORD;
  const secret = process.env.PROTOTYPE_ACCESS_SECRET;

  return password && secret ? `${secret}:${password}` : null;
}

function toHex(bytes: ArrayBuffer) {
  return Array.from(new Uint8Array(bytes), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

async function sha256(value: string) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(value),
  );

  return new Uint8Array(digest);
}

export function isPrototypeAccessConfigured() {
  return accessSigningKey() !== null;
}

export async function createPrototypeAccessToken() {
  const signingKey = accessSigningKey();

  if (!signingKey) {
    return null;
  }

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(signingKey),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(accessTokenPayload),
  );

  return toHex(signature);
}

export async function passwordsMatch(candidate: string, expected: string) {
  const [candidateHash, expectedHash] = await Promise.all([
    sha256(candidate),
    sha256(expected),
  ]);
  let difference = candidateHash.length ^ expectedHash.length;

  for (let index = 0; index < candidateHash.length; index += 1) {
    difference |= candidateHash[index] ^ expectedHash[index];
  }

  return difference === 0;
}

