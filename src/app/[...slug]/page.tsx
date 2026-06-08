import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ContentPageView } from "@/components/content/ContentPageView";
import { isLegacyRoute, legacyRoutes } from "@/data/legacyRoutes";
import {
  createLegacyContentPage,
  getAllContentPages,
  getContentPage,
} from "@/data/pages";
import { pageMetadata } from "@/lib/seo";
import {
  getSanityContentPage,
  getSanityContentSlugs,
} from "@/sanity/lib/contentPages";

type RouteProps = {
  params: Promise<{ slug: string[] }>;
};

function toPath(slug: string[]) {
  return `/${slug.join("/")}`;
}

export async function generateStaticParams() {
  const routes = new Set([
    ...(await getSanityContentSlugs()),
    ...getAllContentPages()
      .filter((page) => page.slug !== "/")
      .map((page) => page.slug),
    ...legacyRoutes,
  ]);

  return Array.from(routes).map((route) => ({
    slug: route.split("/").filter(Boolean),
  }));
}

export async function generateMetadata({
  params,
}: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const path = toPath(slug);
  const page = await getSanityContentPage(path);

  if (page) {
    return pageMetadata(page);
  }

  if (isLegacyRoute(path)) {
    const legacyPage = createLegacyContentPage(path);

    return pageMetadata(legacyPage, {
      noIndex: legacyPage.showMigrationDetails === true,
    });
  }

  return {};
}

export default async function DynamicContentPage({ params }: RouteProps) {
  const { slug } = await params;
  const path = toPath(slug);

  if (path === "/produkt/fresvik-panel") {
    redirect("/produkt/fresvik-pur-panel");
  }

  const page = getContentPage(path);
  const sanityPage = await getSanityContentPage(path);

  if (sanityPage) {
    return <ContentPageView page={sanityPage} />;
  }

  if (isLegacyRoute(path)) {
    return <ContentPageView page={createLegacyContentPage(path)} />;
  }

  if (!page) notFound();
}
