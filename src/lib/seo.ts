import type { Metadata } from "next";
import { siteName } from "@/config/site";
import type { ContentPage } from "@/data/pages";

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
  options: { noIndex?: boolean } = {},
): Metadata {
  const image = firstImage(page);

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: page.slug,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: page.slug,
      siteName,
      locale: "nn_NO",
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
