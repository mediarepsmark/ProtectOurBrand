import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CTASection } from "@/components/sections/CTASection";
import { Hero } from "@/components/sections/Hero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { industries } from "@/content/industries";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Brand Protection by Industry | ProtectOurBrand",
  description:
    "ProtectOurBrand supports ecommerce brands, creators, agencies, SaaS companies, consumer product teams, public figures, and law firms with brand abuse monitoring.",
  path: "/industries"
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Industries", path: "/industries" }
];

export default function IndustriesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />
      <Hero
        eyebrow="Industries"
        title="Brand protection workflows for teams that need fast evidence."
        description="Different organizations face different abuse patterns. ProtectOurBrand adapts monitoring and enforcement support around the channels, assets, and urgency that matter most."
        showSecondary={false}
      />
      <Section>
        <Container>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <Link key={industry.slug} href={`/industries/${industry.slug}`} className="group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan">
                <Card className="h-full transition group-hover:border-cyan/60 group-hover:bg-cyan/10">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-xl font-semibold text-ink">{industry.title}</h2>
                    <ArrowRight aria-hidden="true" className="size-5 shrink-0 text-cyan transition group-hover:translate-x-1" />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{industry.summary}</p>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <CTASection />
    </>
  );
}
