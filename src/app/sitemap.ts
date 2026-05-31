import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-05-31T00:00:00.000Z");

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/kontakt`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
