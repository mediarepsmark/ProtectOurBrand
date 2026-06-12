import type { Metadata } from "next";
import { CTASection } from "@/components/sections/CTASection";
import { PlatformCoverage } from "@/components/sections/PlatformCoverage";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Hero } from "@/components/sections/Hero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { services } from "@/content/services";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Online Brand Protection Services | ProtectOurBrand",
  description:
    "Explore ProtectOurBrand services for DMCA takedowns, brand monitoring, fake profile removal, counterfeit takedowns, rogue domains, search deindexing, and marketplace enforcement.",
  path: "/services"
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" }
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />
      <Hero
        eyebrow="Services"
        title="Brand protection services built around detection, evidence, and enforcement."
        description="ProtectOurBrand helps teams monitor online abuse, prepare evidence files, submit enforcement requests, and track outcomes across platforms, hosts, registrars, marketplaces, search engines, and social networks."
        showSecondary={false}
      />
      <ServicesGrid />
      <PlatformCoverage />
      <Section className="bg-slate-50">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-ink">Each service follows the same careful enforcement standard.</h2>
            <p className="mt-4 text-slate-700">
              We avoid vague reports. Each workflow is built around the abuse type, available evidence, ownership basis, and the channel most likely to review the request.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {["URL-level documentation", "Platform-specific submissions", "Resolution and escalation tracking"].map((item) => (
              <Card key={item}>
                <h3 className="text-lg font-semibold text-ink">{item}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item === "URL-level documentation"
                    ? "Screenshots, timestamps, ownership notes, and source comparisons are organized into a readable evidence file."
                    : item === "Platform-specific submissions"
                      ? "Requests are prepared for the host, registrar, marketplace, search engine, or social platform receiving them."
                      : "Open items, responses, rejections, and next-step escalation paths are tracked after submission."}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
      <CTASection />
    </>
  );
}
