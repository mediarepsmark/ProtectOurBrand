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
import { getService, serviceProcess, services } from "@/content/services";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return buildMetadata({
      title: "Service Not Found | ProtectOurBrand",
      description: "This ProtectOurBrand service page could not be found.",
      path: `/services/${slug}`,
      noIndex: true
    });
  }

  return buildMetadata({
    title: `${service.title} | ProtectOurBrand`,
    description: service.metaDescription,
    path: `/services/${service.slug}`
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  const path = `/services/${service.slug}`;
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.shortTitle, path }
  ];

  return (
    <>
      <JsonLd data={[serviceSchema(service, path), breadcrumbSchema(breadcrumbs), faqSchema(service.faqs)]} />
      <Breadcrumbs items={breadcrumbs} />
      <Hero eyebrow={service.keyword} title={service.title} description={service.summary} showSecondary />

      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-cyan">Problem</p>
              <h2 className="mt-3 text-3xl font-bold text-ink">Why this threat needs a documented workflow</h2>
            </div>
            <Card>
              <p className="text-lg leading-8 text-slate-700">{service.problem}</p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-50">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            <EvidenceList title="What we detect" items={service.detects} />
            <EvidenceList title="What evidence we collect" items={service.evidence} />
            <EvidenceList title="Enforcement channels" items={service.channels} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-cyan">Process</p>
              <h2 className="mt-3 text-3xl font-bold text-ink">From intake to tracking.</h2>
              <p className="mt-4 text-slate-700">The workflow adapts to the platform, host, registrar, marketplace, search engine, and evidence available.</p>
            </div>
            <ol className="grid gap-3">
              {serviceProcess.map((step, index) => (
                <li key={step} className="grid grid-cols-[auto_1fr] gap-4 rounded-md border border-slateLine bg-white p-4">
                  <span className="flex size-8 items-center justify-center rounded-full bg-cyan text-sm font-bold text-ink">{index + 1}</span>
                  <p className="leading-7 text-slate-700">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-50">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-cyan">Deliverables</p>
            <h2 className="mt-3 text-3xl font-bold text-ink">What your team receives</h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {service.deliverables.map((deliverable) => (
              <Card key={deliverable}>
                <h3 className="text-lg font-semibold text-ink">{deliverable}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">Structured support for review, submission, follow-up, and escalation decisions.</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <FAQSection faqs={service.faqs} />
      <CTASection title={`Request a ${service.shortTitle} review.`} />
    </>
  );
}

function EvidenceList({ title, items }: { title: string; items: string[] }) {
  return (
    <Card>
      <h2 className="text-xl font-semibold text-ink">{title}</h2>
      <ul className="mt-5 grid gap-3">
        {items.map((item) => (
          <li key={item} className="border-l-2 border-cyan/50 pl-3 text-sm leading-6 text-slate-700">
            {item}
          </li>
        ))}
      </ul>
    </Card>
  );
}
