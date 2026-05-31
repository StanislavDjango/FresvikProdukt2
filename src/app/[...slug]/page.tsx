import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ContentPageView } from "@/components/content/ContentPageView";
import { getAllContentPages, getContentPage } from "@/data/pages";

type RouteProps = {
  params: Promise<{ slug: string[] }>;
};

function toPath(slug: string[]) {
  return `/${slug.join("/")}`;
}

export function generateStaticParams() {
  return getAllContentPages()
    .filter((page) => page.slug !== "/")
    .map((page) => ({
      slug: page.slug.split("/").filter(Boolean),
    }));
}

export async function generateMetadata({
  params,
}: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const path = toPath(slug);
  const page = getContentPage(path);

  if (!page) {
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

  if (!page) {
    notFound();
  }

  return <ContentPageView page={page} />;
}
