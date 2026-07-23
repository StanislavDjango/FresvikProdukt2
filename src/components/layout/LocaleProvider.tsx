"use client";

import { NextIntlClientProvider } from "next-intl";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { localeFromPathname } from "@/i18n/config";
import { messages } from "@/i18n/messages";

type LocaleProviderProps = {
  children: ReactNode;
};

export function LocaleProvider({ children }: LocaleProviderProps) {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages[locale]}
      timeZone="Europe/Oslo"
    >
      {children}
    </NextIntlClientProvider>
  );
}
