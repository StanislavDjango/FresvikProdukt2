import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { localeFromPathname } from "@/i18n/config";
import {
  adminSessionCookie,
  isValidAdminSession,
} from "@/lib/adminSession";
import {
  editableNewsArticleRequestSchema,
} from "@/lib/adminArticleSchema";
import {
  getEditableNewsArticle,
  updateEditableNewsArticle,
} from "@/sanity/lib/adminNewsArticles";

async function isAdminRequest() {
  const cookieStore = await cookies();
  return isValidAdminSession(cookieStore.get(adminSessionCookie)?.value);
}

function noStoreJson(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function isSameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  return Boolean(origin && origin === request.nextUrl.origin);
}

export async function GET(request: NextRequest) {
  if (!(await isAdminRequest())) {
    return noStoreJson({ error: "unauthorized" }, 401);
  }

  const pathname = request.nextUrl.searchParams.get("pathname");
  if (!pathname || !pathname.startsWith("/") || pathname.includes("..")) {
    return noStoreJson({ error: "invalid_pathname" }, 400);
  }

  try {
    const article = await getEditableNewsArticle(
      pathname,
      localeFromPathname(pathname),
    );

    if (!article) {
      return noStoreJson({ error: "article_not_found" }, 404);
    }

    return noStoreJson({ article });
  } catch (error) {
    console.error("Unable to load the administrative news article.", error);
    return noStoreJson({ error: "load_failed" }, 500);
  }
}

export async function PATCH(request: NextRequest) {
  if (!(await isAdminRequest())) {
    return noStoreJson({ error: "unauthorized" }, 401);
  }

  if (!isSameOrigin(request)) {
    return noStoreJson({ error: "invalid_origin" }, 403);
  }

  const payload = editableNewsArticleRequestSchema.safeParse(
    await request.json().catch(() => null),
  );

  if (!payload.success) {
    return noStoreJson(
      { error: "invalid_content", fields: payload.error.flatten().fieldErrors },
      400,
    );
  }

  const { pathname, ...update } = payload.data;

  try {
    const article = await updateEditableNewsArticle(
      pathname,
      localeFromPathname(pathname),
      update,
    );

    if (!article) {
      return noStoreJson({ error: "article_not_found" }, 404);
    }

    revalidatePath(pathname);
    return noStoreJson({ article });
  } catch (error) {
    const statusCode =
      typeof error === "object" &&
      error !== null &&
      "statusCode" in error &&
      typeof error.statusCode === "number"
        ? error.statusCode
        : undefined;

    if (statusCode === 409) {
      return noStoreJson({ error: "revision_conflict" }, 409);
    }

    console.error("Unable to update the administrative news article.", error);
    return noStoreJson({ error: "save_failed" }, 500);
  }
}
