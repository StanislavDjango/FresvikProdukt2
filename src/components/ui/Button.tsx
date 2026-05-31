import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

const variants = {
  primary: "bg-slate-950 text-white hover:bg-cyan-800",
  secondary:
    "border border-slate-300 bg-white text-slate-950 hover:border-cyan-800 hover:text-cyan-800",
  ghost: "border border-white/25 text-white hover:border-white hover:bg-white/10",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex h-12 items-center justify-center gap-2 rounded-[6px] px-5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2 ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
