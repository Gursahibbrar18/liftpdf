import { MetadataRoute } from "next";
import { TOOLS } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://liftpdf.com";
  const now = new Date();

  const toolPages = TOOLS.map((tool) => ({
    url: `${base}/${tool.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: tool.comingSoon ? 0.4 : 0.8,
  }));

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/pricing`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...toolPages,
  ];
}
