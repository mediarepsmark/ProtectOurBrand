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
import { resources } from "@/content/resources";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Brand Protection Resources | ProtectOurBrand",
  description:
    "Practical guides for DMCA takedowns, fake profile reporting, stolen product images, counterfeit listings, clone websites, search deindexing, and brand abuse documentation.",
  path: "/resources"
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Resources", path: "/resources" }
];

export default function ResourcesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />
      <Hero
        eyebrow="Resources"
        title="Guides for documenting and reporting online brand abuse."
        description="Use these resources to understand evidence capture, takedown workflows, search deindexing, fake profile reporting, counterfeit listing documentation, and clone site response."
        showSecondary={false}
      />
      <Section>
        <Container>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource) => (
              <Link key={resource.slug} href={`/resources/${resource.slug}`} className="group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan">
                <Card className="h-full transition group-hover:border-cyan/60 group-hover:bg-cyan/10">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-xl font-semibold text-ink">{resource.title}</h2>
                    <ArrowRight aria-hidden="true" className="size-5 shrink-0 text-cyan transition group-hover:translate-x-1" />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{resource.summary}</p>
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
