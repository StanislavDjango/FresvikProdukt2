import { cookies } from "next/headers";
import { ContentPageEditorClient } from "@/components/admin/ContentPageEditorClient";
import { Container } from "@/components/ui/Container";
import type { Locale } from "@/i18n/config";
import {
  adminSessionCookie,
  isValidAdminSession,
} from "@/lib/adminSession";

type AdminContentPageEditorProps = {
  pathname: string;
  locale: Locale;
};

export async function AdminContentPageEditor({
  pathname,
  locale,
}: AdminContentPageEditorProps) {
  const cookieStore = await cookies();
  const isAdmin = await isValidAdminSession(
    cookieStore.get(adminSessionCookie)?.value,
  );

  if (!isAdmin) return null;

  return (
    <aside className="border-y border-cyan-100 bg-cyan-50/50">
      <Container className="py-4">
        <ContentPageEditorClient pathname={pathname} locale={locale} />
      </Container>
    </aside>
  );
}
