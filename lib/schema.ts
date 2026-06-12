import { site } from "@/content/site";
import type { FAQ } from "@/content/faqs";
import type { Service } from "@/content/services";
import { absoluteUrl } from "./utils";

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: absoluteUrl(site.url, "/brand/logo-lockup.png"),
    email: site.email,
    telephone: site.phone,
    sameAs: []
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.domain,
    url: site.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${site.url}/resources?query={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}

export function serviceSchema(service: Service, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.keyword,
    provider: {
      "@type": "Organization",
      name: site.name,
      url: site.url
    },
    url: absoluteUrl(site.url, path),
    description: service.summary,
    areaServed: "United States",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Brand protection services",
      itemListElement: service.deliverables.map((deliverable) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: deliverable
        }
      }))
    }
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(site.url, item.path)
    }))
  };
}

export function faqSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}
