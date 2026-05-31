import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";
import { publicRoutes } from "@/data/navigation";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-05-31T00:00:00.000Z");

  return publicRoutes.map((route) => ({
    url: route === "/" ? siteUrl : `${siteUrl}${route}`,
    lastModified,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route === "/kontakt" ? 0.8 : 0.7,
  }));
}
