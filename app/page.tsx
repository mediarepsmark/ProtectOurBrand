import type { Metadata } from "next";
import Link from "next/link";
import { Archive, FileCheck2, ShieldCheck } from "lucide-react";
import { DashboardMockup } from "@/components/sections/DashboardMockup";
import { FAQSection } from "@/components/sections/FAQSection";
import { Hero } from "@/components/sections/Hero";
import { PlatformCoverage } from "@/components/sections/PlatformCoverage";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ThreatAssessmentCTA } from "@/components/sections/ThreatAssessmentCTA";
import { ThreatGrid } from "@/components/sections/ThreatGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { homeFaqs } from "@/content/faqs";
import { useCases } from "@/content/site";
import { industries } from "@/content/industries";
import { buildMetadata } from "@/lib/seo";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Brand Protection Service + DMCA Monitoring | ProtectOurBrand",
  description:
    "ProtectOurBrand helps businesses detect stolen creative, fake profiles, counterfeit listings, clone websites, scraper pages, rogue domains, and other online brand abuse.",
  path: "/"
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(homeFaqs)} />
      <Hero
        eyebrow="Brand Protection + DMCA Monitoring"
        title="Find the Theft. Prove the Abuse. Remove the Threat."
        description="ProtectOurBrand helps businesses detect stolen creative, fake profiles, counterfeit listings, clone websites, scraper pages, rogue domains, and other online brand abuse — then documents the evidence and pursues removal through the right enforcement channel."
      >
        <DashboardMockup />
      </Hero>

      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-cyan">Problem statement</p>
              <h2 className="mt-3 text-3xl font-bold text-ink">Online brand abuse moves faster than internal teams can manually chase.</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["Detect", "Find likely abuse across public web, search, social, domains, marketplaces, and ad surfaces."],
                ["Document", "Build a URL-level evidence file with screenshots, timestamps, ownership context, and channel details."],
                ["Enforce", "Prepare and submit enforcement requests, then track through resolution or escalation."]
              ].map(([title, text]) => (
                <Card key={title}>
                  <h3 className="text-lg font-semibold text-ink">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <ThreatGrid />
      <PlatformCoverage />
      <ProcessSteps />
      <ServicesGrid limit={9} />

      <Section className="bg-slate-50">
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            {[
              {
                icon: FileCheck2,
                title: "Evidence-first workflow",
                text: "Every priority finding is reviewed and organized by original source, infringing URL, abuse type, platform, and enforcement channel."
              },
              {
                icon: Archive,
                title: "Trackable case files",
                text: "Submission history, responses, unresolved items, and escalation options stay visible instead of getting buried in email threads."
              },
              {
                icon: ShieldCheck,
                title: "Ongoing monitoring",
                text: "Monitor for replacement accounts, mirror URLs, marketplace relistings, and new domains after the first request is submitted."
              }
            ].map(({ icon: Icon, title, text }) => (
              <Card key={title}>
                <Icon aria-hidden="true" className="size-8 text-cyan" />
                <h2 className="mt-5 text-xl font-semibold text-ink">{title}</h2>
                <p className="mt-3 leading-7 text-slate-600">{text}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-cyan">Industry use cases</p>
              <h2 className="mt-3 text-3xl font-bold text-ink">Built for teams that need proof, not panic.</h2>
              <p className="mt-4 text-slate-700">
                Use ProtectOurBrand when abuse affects trust, revenue, search visibility, customer safety, or creator ownership.
              </p>
            </div>
            <div>
              <ul className="grid gap-3">
                {useCases.map((useCase) => (
                  <li key={useCase} className="rounded-md border border-slateLine bg-white px-4 py-3 text-slate-800">
                    {useCase}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                {industries.map((industry) => (
                  <Link key={industry.slug} href={`/industries/${industry.slug}`} className="rounded-full border border-slateLine px-3 py-2 text-sm text-slate-700 hover:border-cyan hover:text-cyan">
                    {industry.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <FAQSection faqs={homeFaqs} title="Brand protection FAQ" defaultOpenCount={5} />
      <ThreatAssessmentCTA />
    </>
  );
}
