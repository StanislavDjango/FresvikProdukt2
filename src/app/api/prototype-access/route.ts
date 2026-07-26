import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  createPrototypeAccessToken,
  passwordsMatch,
  prototypeAccessCookie,
} from "@/lib/prototypeAccess";

function safeReturnPath(value: FormDataEntryValue | null) {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) {
    return "/";
  }

  return value.startsWith("/prototype-access") ? "/" : value;
}

function accessPageLocation(returnTo: string, error: string) {
  const params = new URLSearchParams({ returnTo, error });
  return `/prototype-access?${params.toString()}`;
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const returnTo = safeReturnPath(formData.get("returnTo"));
  const password = formData.get("password");
  const expectedPassword = process.env.PROTOTYPE_ACCESS_PASSWORD;
  const token = await createPrototypeAccessToken();

  if (
    typeof password !== "string" ||
    !expectedPassword ||
    !token ||
    !(await passwordsMatch(password, expectedPassword))
  ) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return new NextResponse(null, {
      status: 303,
      headers: {
        Location: accessPageLocation(returnTo, "invalid"),
      },
    });
  }

  const response = new NextResponse(null, {
    status: 303,
    headers: {
      Location: returnTo,
    },
  });
  const isSecureRequest =
    request.headers.get("x-forwarded-proto") === "https" ||
    request.nextUrl.protocol === "https:";

  response.cookies.set({
    name: prototypeAccessCookie,
    value: token,
    httpOnly: true,
    secure: isSecureRequest,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    priority: "high",
  });
  response.headers.set("Cache-Control", "no-store");

  return response;
}
