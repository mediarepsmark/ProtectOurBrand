import type { Metadata } from "next";
import { site } from "@/content/site";
import { absoluteUrl } from "./utils";

type SeoInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path = "/",
  image = site.defaultOgImage,
  noIndex = false
}: SeoInput): Metadata {
  const canonical = absoluteUrl(site.url, path);
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(site.url, image);

  return {
    title,
    description,
    metadataBase: new URL(site.url),
    alternates: {
      canonical
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      siteName: site.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Brand Protection + DMCA Monitoring"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl]
    }
  };
}
