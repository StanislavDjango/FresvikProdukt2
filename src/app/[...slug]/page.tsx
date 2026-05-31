import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ContentPageView } from "@/components/content/ContentPageView";
import { isLegacyRoute, legacyRoutes } from "@/data/legacyRoutes";
import {
  createLegacyContentPage,
  getAllContentPages,
  getContentPage,
} from "@/data/pages";

type RouteProps = {
  params: Promise<{ slug: string[] }>;
};

function toPath(slug: string[]) {
  return `/${slug.join("/")}`;
}

export function generateStaticParams() {
  const routes = new Set([
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
  const page = getContentPage(path) || createLegacyContentPage(path);

  if (!getContentPage(path) && !isLegacyRoute(path)) {
    return {};
  }

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
      siteName: "Fresvik Produkt",
      locale: "nn_NO",
      type: "website",
    },
  };
}

export default async function DynamicContentPage({ params }: RouteProps) {
  const { slug } = await params;
  const path = toPath(slug);

  if (path === "/produkt/fresvik-panel") {
    redirect("/produkt/fresvik-pur-panel");
  }

  const page = getContentPage(path);

  if (page) {
    return <ContentPageView page={page} />;
  }

  if (isLegacyRoute(path)) {
    return <ContentPageView page={createLegacyContentPage(path)} />;
  }

  if (!page) {
    notFound();
  }
}
