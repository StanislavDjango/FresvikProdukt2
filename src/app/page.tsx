import type { Metadata } from "next";
import { ContentPageView } from "@/components/content/ContentPageView";
import { HomeHero } from "@/components/home/HomeHero";
import { getContentPage } from "@/data/pages";
import { pageMetadata } from "@/lib/seo";
import { getSanityContentPage } from "@/sanity/lib/contentPages";

const homePage = getContentPage("/");

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSanityContentPage("/");

  return page
    ? pageMetadata(page)
    : homePage
    ? pageMetadata(homePage)
    : {
        title: "Fresvik Produkt",
        description:
          "Fresvik Produkt leverer isolerte panel, portar, dører, montasje og service til norske prosjekt.",
      };
}

export default async function Home() {
  const page = await getSanityContentPage("/");
  const contentPage = page || homePage;

  if (!contentPage) {
    return null;
  }

  return (
    <ContentPageView
      page={contentPage}
      locale="nn"
      hero={<HomeHero page={contentPage} />}
    />
  );
}
