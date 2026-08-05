import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { adminSessionCookie } from "@/lib/adminSession";

function safeReturnPath(value: FormDataEntryValue | null) {
  if (
    typeof value !== "string" ||
    !value.startsWith("/") ||
    value.startsWith("//")
  ) {
    return "/";
  }

  return value.startsWith("/admin") ? "/" : value;
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const response = new NextResponse(null, {
    status: 303,
    headers: { Location: safeReturnPath(formData.get("returnTo")) },
  });

  response.cookies.set({
    name: adminSessionCookie,
    value: "",
    httpOnly: true,
    secure:
      request.headers.get("x-forwarded-proto") === "https" ||
      request.nextUrl.protocol === "https:",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  response.headers.set("Cache-Control", "no-store");

  return response;
}
