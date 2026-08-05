import "server-only";

import { passwordsMatch } from "@/lib/prototypeAccess";

const adminSessionPayload = "fresvik-admin-session-v1";
const adminSessionMaxAge = 60 * 60 * 8;

export const adminSessionCookie = "fresvik_admin_session";

function adminUsername() {
  return process.env.ADMIN_USERNAME || "admin";
}

function adminPassword() {
  return process.env.ADMIN_PASSWORD || "admin";
}

function adminSigningKey() {
  return `${process.env.ADMIN_SESSION_SECRET || adminPassword()}:fresvik-admin`;
}

function toHex(bytes: ArrayBuffer) {
  return Array.from(new Uint8Array(bytes), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

async function sign(value: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(adminSigningKey()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(value),
  );

  return toHex(signature);
}

export async function adminCredentialsMatch(
  username: string,
  password: string,
) {
  const [usernameMatches, passwordMatches] = await Promise.all([
    passwordsMatch(username, adminUsername()),
    passwordsMatch(password, adminPassword()),
  ]);

  return usernameMatches && passwordMatches;
}

export async function createAdminSessionToken() {
  const expiresAt = Math.floor(Date.now() / 1000) + adminSessionMaxAge;
  const payload = `${adminSessionPayload}.${expiresAt}`;

  return `${payload}.${await sign(payload)}`;
}

export async function isValidAdminSession(token?: string) {
  if (!token) return false;

  const [version, expiresAtValue, signature] = token.split(".");
  const expiresAt = Number(expiresAtValue);

  if (
    version !== adminSessionPayload ||
    !Number.isSafeInteger(expiresAt) ||
    expiresAt <= Math.floor(Date.now() / 1000) ||
    !signature
  ) {
    return false;
  }

  const expectedSignature = await sign(`${version}.${expiresAtValue}`);
  return passwordsMatch(signature, expectedSignature);
}

export { adminSessionMaxAge };
