import { cookies } from "next/headers";
import { ArticleEditorClient } from "@/components/admin/ArticleEditorClient";
import { Container } from "@/components/ui/Container";
import type { Locale } from "@/i18n/config";
import {
  adminSessionCookie,
  isValidAdminSession,
} from "@/lib/adminSession";

type AdminArticleEditorProps = {
  pathname: string;
  locale: Locale;
};

export async function AdminArticleEditor({
  pathname,
  locale,
}: AdminArticleEditorProps) {
  const cookieStore = await cookies();
  const isAdmin = await isValidAdminSession(
    cookieStore.get(adminSessionCookie)?.value,
  );

  if (!isAdmin) return null;

  return (
    <aside className="border-y border-cyan-100 bg-cyan-50/40">
      <Container className="py-6">
        <ArticleEditorClient pathname={pathname} locale={locale} />
      </Container>
    </aside>
  );
}
