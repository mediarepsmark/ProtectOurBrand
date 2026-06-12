import { industries } from "@/content/industries";
import { resources } from "@/content/resources";
import { services } from "@/content/services";

export const serviceSeoComplete = services.every(
  (service) =>
    service.title.length > 0 &&
    service.metaDescription.length > 70 &&
    service.faqs.length > 0 &&
    service.detects.length > 0 &&
    service.evidence.length > 0 &&
    service.channels.length > 0
);

export const industrySeoComplete = industries.every(
  (industry) => industry.metaTitle.includes("ProtectOurBrand") && industry.metaDescription.length > 70 && industry.faqs.length > 0
);

export const resourceSeoComplete = resources.every(
  (resource) => resource.metaTitle.includes("ProtectOurBrand") && resource.metaDescription.length > 70 && resource.sections.length > 0
);
