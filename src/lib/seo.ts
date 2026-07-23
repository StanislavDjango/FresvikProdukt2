import type { Metadata } from "next";
import { siteName } from "@/config/site";
import type { ContentPage } from "@/data/pages";
import { withLocale } from "@/i18n/config";

const defaultOgImage = "/fresvik-logo.svg";

function firstImage(page: ContentPage) {
  return (
    page.cards.find((card) => card.imageUrl)?.imageUrl ||
    page.sections
      .flatMap((section) => section.items)
      .find((item) => item.imageUrl)?.imageUrl ||
    defaultOgImage
  );
}

export function pageMetadata(
  page: ContentPage,
  options: {
    noIndex?: boolean;
    locale?: "nn" | "en";
    canonical?: string;
    alternateSourcePath?: string;
  } = {},
): Metadata {
  const image = firstImage(page);
  const sourcePath = options.alternateSourcePath ?? page.slug;
  const canonical = options.canonical ?? page.slug;
  const locale = options.locale ?? "nn";

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical,
      languages: {
        "nn-NO": sourcePath,
        en: withLocale(sourcePath, "en"),
      },
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: canonical,
      siteName,
      locale: locale === "en" ? "en_US" : "nn_NO",
      type: "website",
      images: [
        {
          url: image,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [image],
    },
    robots: options.noIndex
      ? {
          index: false,
          follow: true,
        }
      : undefined,
  };
}
