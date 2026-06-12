import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CTASection } from "@/components/sections/CTASection";
import { FAQSection } from "@/components/sections/FAQSection";
import { Hero } from "@/components/sections/Hero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getIndustry, industries } from "@/content/industries";
import { services } from "@/content/services";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);

  if (!industry) {
    return buildMetadata({
      title: "Industry Not Found | ProtectOurBrand",
      description: "This ProtectOurBrand industry page could not be found.",
      path: `/industries/${slug}`,
      noIndex: true
    });
  }

  return buildMetadata({
    title: industry.metaTitle,
    description: industry.metaDescription,
    path: `/industries/${industry.slug}`
  });
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustry(slug);

  if (!industry) {
    notFound();
  }

  const path = `/industries/${industry.slug}`;
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Industries", path: "/industries" },
    { name: industry.title, path }
  ];

  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), faqSchema(industry.faqs)]} />
      <Breadcrumbs items={breadcrumbs} />
      <Hero eyebrow="Industry use case" title={industry.title} description={industry.summary} />

      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <Card>
              <h2 className="text-2xl font-semibold text-ink">Common abuse patterns</h2>
              <ul className="mt-5 grid gap-3">
                {industry.threats.map((threat) => (
                  <li key={threat} className="border-l-2 border-amber pl-3 text-sm leading-6 text-slate-700">
                    {threat}
                  </li>
                ))}
              </ul>
            </Card>
            <Card>
              <h2 className="text-2xl font-semibold text-ink">Recommended workflow</h2>
              <ol className="mt-5 grid gap-3">
                {industry.workflow.map((step, index) => (
                  <li key={step} className="grid grid-cols-[auto_1fr] gap-3 text-sm leading-6 text-slate-700">
                    <span className="flex size-7 items-center justify-center rounded-full bg-cyan text-xs font-bold text-ink">{index + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-50">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-cyan">Related services</p>
            <h2 className="mt-3 text-3xl font-bold text-ink">Start with the channels most exposed to abuse.</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {services.slice(0, 6).map((service) => (
              <Card key={service.slug}>
                <h3 className="text-lg font-semibold text-ink">{service.shortTitle}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{service.summary}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <FAQSection faqs={industry.faqs} />
      <CTASection title={`Request a brand protection scan for ${industry.title.toLowerCase()}.`} />
    </>
  );
}
