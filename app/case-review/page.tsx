import type { Metadata } from "next";
import { DollarSign, Monitor, Route } from "lucide-react";
import { CTASection } from "@/components/sections/CTASection";
import { FAQSection } from "@/components/sections/FAQSection";
import { Hero } from "@/components/sections/Hero";
import { ThreatScanIntakeForm } from "@/components/sections/ThreatScanIntakeForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { caseReviewFaqs } from "@/content/faqs";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Request a Brand Threat Scan | ProtectOurBrand",
  description:
    "Request a ProtectOurBrand threat scan for stolen creative, fake profiles, counterfeit listings, scraper sites, clone websites, rogue domains, fake ads, and marketplace abuse.",
  path: "/case-review"
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Case Review", path: "/case-review" }
];

export default function CaseReviewPage() {
  const scanBenefits = [
    { icon: Route, label: "Get a Step-by-step Removal Plan" },
    { icon: Monitor, label: "Free 15-Min 360° Threat Report" },
    { icon: DollarSign, label: "See the Real Cost of Copycats" }
  ];

  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), faqSchema(caseReviewFaqs)]} />
      <Breadcrumbs items={breadcrumbs} />
      <Hero
        eyebrow="Brand threat scan"
        title="Request a Brand Threat Scan"
        description="Send your brand details, owned properties, known abuse, urgency, and budget range so ProtectOurBrand can review the scope and recommend the next monitoring or enforcement path."
        showSecondary={false}
      />
      <Section>
        <Container>
          <div className="relative mx-auto max-w-6xl">
            <div className="grid gap-4 md:grid-cols-3">
              {scanBenefits.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 rounded-md border border-slateLine bg-white px-5 py-4 shadow-sm">
                  <Icon aria-hidden="true" className="size-6 shrink-0 text-blue" />
                  <span className="text-base font-bold text-ink">{label}</span>
                </div>
              ))}
            </div>
            <svg
              aria-hidden="true"
              className="mx-auto mt-4 hidden h-24 w-full text-slate-300 md:block"
              viewBox="0 0 1200 120"
              fill="none"
            >
              <path d="M210 0 C210 58 345 76 510 112" stroke="currentColor" strokeWidth="2.5" strokeDasharray="10 12" />
              <path d="M600 0 V112" stroke="currentColor" strokeWidth="2.5" strokeDasharray="10 12" />
              <path d="M990 0 C990 58 855 76 690 112" stroke="currentColor" strokeWidth="2.5" strokeDasharray="10 12" />
            </svg>

            <Card className="mt-4 overflow-hidden p-0">
              <div className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-ink">FREE 360° Threat Scan (15-Min)</h2>
                <ul className="mt-5 grid gap-3 text-sm font-semibold leading-6 text-slate-700">
                  <li>We review live brand abuse signals during intake.</li>
                  <li>We estimate the practical risk, evidence needs, and enforcement path.</li>
                  <li>You keep the recommended plan even if you do not hire us.</li>
                </ul>
                <ThreatScanIntakeForm />
              </div>
            </Card>
          </div>
        </Container>
      </Section>
      <FAQSection faqs={caseReviewFaqs} />
      <CTASection title="Have a known infringement instead?" text="Use the infringement form if you already have original and infringing URLs ready for review." />
    </>
  );
}
