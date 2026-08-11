import type { Metadata } from "next";
import { DollarSign, Monitor, Route } from "lucide-react";
import { CTASection } from "@/components/sections/CTASection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ThreatScanIntakeForm } from "@/components/sections/ThreatScanIntakeForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
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
      <section className="bg-slate-50 py-8 sm:py-10">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <span className="inline-flex items-center rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-cyan">
                Brand threat scan
              </span>
              <h1 className="mt-4 max-w-xl text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-5xl">Request a Brand Threat Scan</h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-700">
                Send your brand details, owned properties, known abuse, urgency, and budget range so ProtectOurBrand can review the scope and recommend the next monitoring or enforcement path.
              </p>
              <div className="mt-6 hidden gap-3 lg:grid">
                {scanBenefits.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3 rounded-md border border-slateLine bg-white px-4 py-3 shadow-sm">
                    <Icon aria-hidden="true" className="size-5 shrink-0 text-blue" />
                    <span className="text-sm font-bold text-ink">{label}</span>
                  </div>
                ))}
              </div>
              <p className="mt-5 max-w-xl rounded-md border border-cyan/30 bg-cyan/10 px-4 py-3 text-sm font-semibold leading-6 text-ink">
                Start with the intake form. Your preferred review date is included with the submission for follow-up.
              </p>
            </div>

            <div className="rounded-md border border-slateLine bg-white p-6 shadow-sm scroll-mt-28 overflow-hidden p-0 shadow-lg shadow-cyan/5" id="brand-threat-scan-panel">
              <div className="flex flex-wrap items-center justify-center gap-8 border-b border-slateLine bg-white px-5 py-3 text-sm font-semibold">
                <span className="inline-flex items-center gap-2 text-ink">
                  <span className="size-2.5 rounded-full bg-ink" />
                  Fill out the form
                </span>
                <span className="inline-flex items-center gap-2 text-slate-500">
                  <span className="size-2.5 rounded-full bg-slate-300" />
                  Book your review
                </span>
              </div>
              <div className="p-5 sm:p-6">
                <h2 className="text-2xl font-bold text-ink">FREE 360° Threat Scan (15-Min)</h2>
                <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">
                  We review live brand abuse signals, estimate practical risk, and outline the evidence and enforcement path.
                </p>
                <ThreatScanIntakeForm />
              </div>
            </div>
          </div>
        </div>
      </section>
      <FAQSection faqs={caseReviewFaqs} />
      <CTASection title="Have a known infringement instead?" text="Use the infringement form if you already have original and infringing URLs ready for review." />
    </>
  );
}
