import { industries } from "@/content/industries";
import { resources } from "@/content/resources";
import { services } from "@/content/services";

export const staticRoutes = [
  "/",
  "/services",
  "/industries",
  "/how-it-works",
  "/pricing",
  "/case-review",
  "/contact",
  "/resources",
  "/privacy",
  "/terms"
];

export const allRoutes = [
  ...staticRoutes,
  ...services.map((service) => `/services/${service.slug}`),
  ...industries.map((industry) => `/industries/${industry.slug}`),
  ...resources.map((resource) => `/resources/${resource.slug}`)
];
