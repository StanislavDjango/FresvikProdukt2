import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { prototypeAccessCookie } from "@/lib/prototypeAccess";

function safeReturnPath(value: FormDataEntryValue | null) {
  if (
    typeof value !== "string" ||
    !value.startsWith("/") ||
    value.startsWith("//")
  ) {
    return "/";
  }

  return value.startsWith("/prototype-access") ? "/" : value;
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const returnTo = safeReturnPath(formData.get("returnTo"));
  const params = new URLSearchParams({ returnTo });
  const response = new NextResponse(null, {
    status: 303,
    headers: {
      Location: `/prototype-access?${params.toString()}`,
    },
  });

  response.cookies.set({
    name: prototypeAccessCookie,
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
