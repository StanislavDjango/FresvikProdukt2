import type { Metadata } from "next";
import { ContentPageView } from "@/components/content/ContentPageView";
import { getContentPage } from "@/data/pages";
import { pageMetadata } from "@/lib/seo";

const homePage = getContentPage("/");

export const metadata: Metadata = {
  ...(homePage
    ? pageMetadata(homePage)
    : {
        title: "Fresvik Produkt",
        description:
          "Fresvik Produkt leverer isolerte panel, portar, dører, montasje og service til norske prosjekt.",
      }),
};

export default function Home() {
  if (!homePage) {
    return null;
  }

  return <ContentPageView page={homePage} />;
}
