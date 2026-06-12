import { allRoutes } from "@/lib/constants";
import { industries } from "@/content/industries";
import { resources } from "@/content/resources";
import { services } from "@/content/services";

const expectedRoutes = [
  "/",
  "/services",
  "/industries",
  "/how-it-works",
  "/pricing",
  "/case-review",
  "/contact",
  "/resources",
  "/privacy",
  "/terms",
  ...services.map((service) => `/services/${service.slug}`),
  ...industries.map((industry) => `/industries/${industry.slug}`),
  ...resources.map((resource) => `/resources/${resource.slug}`)
];

export const routeCoverage = expectedRoutes.every((route) => allRoutes.includes(route));
export const uniqueRouteCount = new Set(allRoutes).size;
export const routeCount = allRoutes.length;
