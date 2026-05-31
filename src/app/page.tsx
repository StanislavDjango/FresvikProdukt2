import type { Metadata } from "next";
import { ContentPageView } from "@/components/content/ContentPageView";
import { getContentPage } from "@/data/pages";

const homePage = getContentPage("/");

export const metadata: Metadata = {
  title: "Fresvik Produkt",
  description:
    "Fresvik Produkt leverer isolerte panel, portar, dører, montasje og service til norske prosjekt.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Fresvik Produkt",
    description:
      "Isolerte panel, kjøle- og fryseløysingar, montasje og service.",
    url: "/",
    siteName: "Fresvik Produkt",
    locale: "nn_NO",
    type: "website",
  },
};

export default function Home() {
  if (!homePage) {
    return null;
  }

  return <ContentPageView page={homePage} />;
}
