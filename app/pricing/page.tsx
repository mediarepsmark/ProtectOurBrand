import type { Metadata } from "next";
import { Check } from "lucide-react";
import { CTASection } from "@/components/sections/CTASection";
import { FAQSection } from "@/components/sections/FAQSection";
import { Hero } from "@/components/sections/Hero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { pricingFaqs } from "@/content/faqs";
import { pricingPackages } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Brand Protection Pricing | ProtectOurBrand",
  description:
    "ProtectOurBrand offers custom monthly plans based on brand size, monitoring scope, enforcement volume, and urgency. Compare Monitor, Enforce, and Defend options.",
  path: "/pricing"
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Pricing", path: "/pricing" }
];

export default function PricingPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), faqSchema(pricingFaqs)]} />
      <Breadcrumbs items={breadcrumbs} />
      <Hero
        eyebrow="Pricing"
        title="Custom monthly plans based on monitoring scope and enforcement volume."
        description="Plans are scoped around brand size, abuse channels, evidence needs, urgency, reporting cadence, and the number of enforcement requests your team expects to pursue."
        showSecondary={false}
      />
      <Section>
        <Container>
          <div className="grid gap-5 lg:grid-cols-3">
            {pricingPackages.map((plan) => (
              <Card key={plan.name} className={plan.name === "Enforce" ? "border-cyan/70 bg-cyan/10" : ""}>
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-2xl font-bold text-ink">{plan.name}</h2>
                  {plan.name === "Enforce" ? <Badge>Active abuse</Badge> : null}
                </div>
                <p className="mt-3 text-slate-700">{plan.bestFor}</p>
                <p className="mt-6 rounded-md border border-slateLine bg-white p-4 text-sm font-semibold text-ink">
                  Custom monthly plans based on brand size, monitoring scope, enforcement volume, and urgency.
                </p>
                <ul className="mt-6 grid gap-3">
                  {plan.includes.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
                      <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-cyan" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
      <FAQSection faqs={pricingFaqs} />
      <CTASection title="Request a scoped plan for your brand." />
    </>
  );
}
