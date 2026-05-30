"use client";

import dynamic from "next/dynamic";

export const StudioShell = dynamic(
  () => import("./SanityStudio").then((mod) => mod.SanityStudio),
  {
    ssr: false,
  },
);
