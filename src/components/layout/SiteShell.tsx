import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { DevelopmentNotice } from "@/components/layout/DevelopmentNotice";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LocaleProvider } from "@/components/layout/LocaleProvider";
import { adminSessionCookie, isValidAdminSession } from "@/lib/adminSession";

type SiteShellProps = {
  children: ReactNode;
};

export async function SiteShell({ children }: SiteShellProps) {
  const cookieStore = await cookies();
  const isAdmin = await isValidAdminSession(
    cookieStore.get(adminSessionCookie)?.value,
  );

  return (
    <div id="top" className="min-h-screen bg-slate-50 text-slate-950">
      <LocaleProvider>
        <Header isAdmin={isAdmin} />
        {children}
        <Footer />
        <DevelopmentNotice />
      </LocaleProvider>
    </div>
  );
}
