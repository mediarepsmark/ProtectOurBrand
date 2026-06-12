import type { Metadata } from "next";
import { CTASection } from "@/components/sections/CTASection";
import { Hero } from "@/components/sections/Hero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { processSteps } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "How Brand Protection Monitoring Works | ProtectOurBrand",
  description:
    "Learn how ProtectOurBrand handles intake, detection, human review, evidence capture, enforcement, reporting, and ongoing monitoring for online brand abuse.",
  path: "/how-it-works"
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "How It Works", path: "/how-it-works" }
];

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />
      <Hero
        eyebrow="Process"
        title="A practical workflow for finding, documenting, and pursuing enforcement."
        description="ProtectOurBrand moves from discovery to evidence and submission tracking, with human review at the points where classification and escalation matter."
        showSecondary={false}
      />
      <ProcessSteps />
      <Section>
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {processSteps.slice(0, 3).map((step) => (
              <Card key={step.title}>
                <h2 className="text-xl font-semibold text-ink">{step.title}</h2>
                <p className="mt-3 leading-7 text-slate-700">{step.text}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
      <CTASection />
    </>
  );
}
