import type { ReactNode } from "react";
import { DevelopmentNotice } from "@/components/layout/DevelopmentNotice";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LocaleProvider } from "@/components/layout/LocaleProvider";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div id="top" className="min-h-screen bg-slate-50 text-slate-950">
      <LocaleProvider>
        <Header />
        {children}
        <Footer />
        <DevelopmentNotice />
      </LocaleProvider>
    </div>
  );
}
