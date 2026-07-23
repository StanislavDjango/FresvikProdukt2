import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPageView } from "@/components/content/ContentPageView";
import { legacyRoutes } from "@/data/legacyRoutes";
import { publicRoutes } from "@/data/navigation";
import { getEnglishContentPage } from "@/data/englishPages";
import { pageMetadata } from "@/lib/seo";

type RouteProps = {
  params: Promise<{ slug?: string[] }>;
};

function toSourcePath(slug?: string[]) {
  if (!slug?.length) return "/";
  return `/${slug.join("/")}`;
}

export function generateStaticParams() {
  const routes = new Set<string>([...publicRoutes, ...legacyRoutes]);

  return Array.from(routes).map((route) => ({
    slug: route === "/" ? [] : route.split("/").filter(Boolean),
  }));
}

export async function generateMetadata({
  params,
}: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const sourcePath = toSourcePath(slug);
  const page = getEnglishContentPage(sourcePath);

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
  const page = getEnglishContentPage(sourcePath);

  if (!page) notFound();

  return <ContentPageView page={page} />;
}
