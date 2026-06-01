import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";
import { legacyRoutes } from "@/data/legacyRoutes";
import { publicRoutes } from "@/data/navigation";
import { isRedirectedSource } from "@/data/redirects";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-05-31T00:00:00.000Z");
  const routes = Array.from(new Set([...publicRoutes, ...legacyRoutes])).filter(
    (route) => !isRedirectedSource(route),
  );

  return routes.map((route) => ({
    url: route === "/" ? siteUrl : `${siteUrl}${route}`,
    lastModified,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route === "/kontakt" ? 0.8 : 0.7,
  }));
}
