import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ContentPageView } from "@/components/content/ContentPageView";
import { legacyRoutes } from "@/data/legacyRoutes";
import { publicRoutes } from "@/data/navigation";
import { getEnglishContentPage } from "@/data/englishPages";
import { stripLocalePrefix, withLocale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { getSanityContentPage } from "@/sanity/lib/contentPages";

type RouteProps = {
  params: Promise<{ slug?: string[] }>;
};

function toSourcePath(slug?: string[]) {
  if (!slug?.length) return "/";
  return stripLocalePrefix(`/en/${slug.join("/")}`);
}

export function generateStaticParams() {
  const routes = new Set<string>([...publicRoutes, ...legacyRoutes]);

  return Array.from(routes).map((route) => {
    const englishRoute = withLocale(route, "en").replace(/^\/en\/?/, "/");

    return {
      slug: englishRoute === "/" ? [] : englishRoute.split("/").filter(Boolean),
    };
  });
}

export async function generateMetadata({
  params,
}: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const sourcePath = toSourcePath(slug);
  const requestedPath = !slug?.length ? "/en" : `/en/${slug.join("/")}`;
  const canonicalPath = withLocale(sourcePath, "en");

  if (requestedPath !== canonicalPath) {
    redirect(canonicalPath);
  }

  const sanityPage = await getSanityContentPage(sourcePath, "en");
  const page = sanityPage
    ? { ...sanityPage, slug: canonicalPath }
    : getEnglishContentPage(sourcePath);

  if (!page) return {};

  return pageMetadata(page, {
    locale: "en",
    canonical: page.slug,
    alternateSourcePath: sourcePath,
  });
}

export default async function EnglishContentPage({ params }: RouteProps) {
  const { slug } = await params;
  const sourcePath = toSourcePath(slug);
  const requestedPath = !slug?.length ? "/en" : `/en/${slug.join("/")}`;
  const canonicalPath = withLocale(sourcePath, "en");

  if (requestedPath !== canonicalPath) {
    redirect(canonicalPath);
  }

  const sanityPage = await getSanityContentPage(sourcePath, "en");
  const page = sanityPage
    ? { ...sanityPage, slug: canonicalPath }
    : getEnglishContentPage(sourcePath);

  if (!page) notFound();

  return <ContentPageView page={page} />;
}
