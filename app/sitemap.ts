import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://whotheimposter.vercel.app";

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date("2025-01-01T00:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
