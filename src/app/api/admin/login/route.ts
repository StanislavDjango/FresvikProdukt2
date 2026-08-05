import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  adminCredentialsMatch,
  adminSessionCookie,
  adminSessionMaxAge,
  createAdminSessionToken,
} from "@/lib/adminSession";

function safeReturnPath(value: FormDataEntryValue | null) {
  if (
    typeof value !== "string" ||
    !value.startsWith("/") ||
    value.startsWith("//")
  ) {
    return "/admin";
  }

  return value;
}

function loginPageLocation(returnTo: string, locale: string) {
  const params = new URLSearchParams({ returnTo, locale, error: "invalid" });
  return `/admin?${params.toString()}`;
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const returnTo = safeReturnPath(formData.get("returnTo"));
  const locale = formData.get("locale") === "en" ? "en" : "nn";
  const username = formData.get("username");
  const password = formData.get("password");

  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    !(await adminCredentialsMatch(username, password))
  ) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return new NextResponse(null, {
      status: 303,
      headers: { Location: loginPageLocation(returnTo, locale) },
    });
  }

  const response = new NextResponse(null, {
    status: 303,
    headers: { Location: returnTo },
  });

  response.cookies.set({
    name: adminSessionCookie,
    value: await createAdminSessionToken(),
    httpOnly: true,
    secure:
      request.headers.get("x-forwarded-proto") === "https" ||
      request.nextUrl.protocol === "https:",
    sameSite: "lax",
    path: "/",
    maxAge: adminSessionMaxAge,
    priority: "high",
  });
  response.headers.set("Cache-Control", "no-store");

  return response;
}
