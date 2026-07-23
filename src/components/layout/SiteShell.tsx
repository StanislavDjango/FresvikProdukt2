import type { ReactNode } from "react";
import { DevelopmentNotice } from "@/components/layout/DevelopmentNotice";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div id="top" className="min-h-screen bg-slate-50 text-slate-950">
      <Header />
      {children}
      <Footer />
      <DevelopmentNotice />
    </div>
  );
}
