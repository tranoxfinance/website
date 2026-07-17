import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";

const siteUrl = "https://tranoxfinance.com";

const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/compliance", priority: 0.5, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.5, changeFrequency: "monthly" },
  { path: "/terms", priority: 0.5, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap(({ path, priority, changeFrequency }) =>
    locales.map((locale) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${siteUrl}/${l}${path}`]),
        ),
      },
    })),
  );
}
