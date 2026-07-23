import en from "@/i18n/messages/en.json";
import nn from "@/i18n/messages/nn.json";
import type { Locale } from "@/i18n/config";

export const messages = {
  nn,
  en,
} satisfies Record<Locale, typeof nn>;
