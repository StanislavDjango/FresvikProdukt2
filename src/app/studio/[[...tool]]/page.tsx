import type { Metadata } from "next";
import { StudioShell } from "@/components/StudioShell";

export const metadata: Metadata = {
  title: "Studio",
  robots: {
    index: false,
    follow: false,
  },
};

export default function StudioPage() {
  return <StudioShell />;
}
