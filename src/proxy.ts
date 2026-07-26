import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { localeFromPathname, stripLocalePrefix, withLocale } from "@/i18n/config";
import {
  createPrototypeAccessToken,
  isPrototypeAccessConfigured,
  prototypeAccessCookie,
} from "@/lib/prototypeAccess";

const prototypeAccessPath = "/prototype-access";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-fresvik-locale", localeFromPathname(pathname));

  if (pathname === prototypeAccessPath) {
    requestHeaders.set("x-fresvik-access-page", "true");

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  if (pathname.startsWith("/studio")) {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  if (isPrototypeAccessConfigured()) {
    const expectedToken = await createPrototypeAccessToken();
    const accessToken = request.cookies.get(prototypeAccessCookie)?.value;

    if (!expectedToken || accessToken !== expectedToken) {
      const accessUrl = request.nextUrl.clone();
      accessUrl.pathname = prototypeAccessPath;
      accessUrl.search = "";
      accessUrl.searchParams.set(
        "returnTo",
        `${pathname}${request.nextUrl.search}`,
      );

      return NextResponse.redirect(accessUrl);
    }
  }

  if (localeFromPathname(pathname) === "en") {
    const sourcePath = stripLocalePrefix(pathname);
    const canonicalPath = withLocale(sourcePath, "en");

    if (pathname !== canonicalPath) {
      const nextUrl = request.nextUrl.clone();
      nextUrl.pathname = canonicalPath;
      return NextResponse.redirect(nextUrl);
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!_next|api|assets|favicon.ico|icon.svg|robots.txt|sitemap.xml).*)"],
};
