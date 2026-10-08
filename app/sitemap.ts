import type { MetadataRoute } from "next";
import { modules } from "@/lib/modules";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/solutions",
    "/products",
    "/industries",
    "/case-studies",
    "/events",
    "/company",
    "/team",
    "/contact",
    "/faq",
    "/privacy",
    "/terms",
  ];
  const base = paths.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
  const modulePages = modules.map((m) => ({
    url: `${site.url}/solutions/${m.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  const productPages = products.map((p) => ({
    url: `${site.url}/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  return [...base, ...modulePages, ...productPages];
}
