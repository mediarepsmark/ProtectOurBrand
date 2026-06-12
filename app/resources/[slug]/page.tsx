import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CTASection } from "@/components/sections/CTASection";
import { FAQSection } from "@/components/sections/FAQSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getResource, resources } from "@/content/resources";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return resources.map((resource) => ({ slug: resource.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResource(slug);

  if (!resource) {
    return buildMetadata({
      title: "Resource Not Found | ProtectOurBrand",
      description: "This ProtectOurBrand resource could not be found.",
      path: `/resources/${slug}`,
      noIndex: true
    });
  }

  return buildMetadata({
    title: resource.metaTitle,
    description: resource.metaDescription,
    path: `/resources/${resource.slug}`
  });
}

export default async function ResourcePage({ params }: Props) {
  const { slug } = await params;
  const resource = getResource(slug);

  if (!resource) {
    notFound();
  }

  const path = `/resources/${resource.slug}`;
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" },
    { name: resource.title, path }
  ];

  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), faqSchema(resource.faqs)]} />
      <Breadcrumbs items={breadcrumbs} />
      <article>
        <Section className="border-b border-slateLine">
          <Container>
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-cyan">Resource</p>
              <h1 className="mt-5 text-4xl font-bold leading-tight text-ink sm:text-5xl">{resource.title}</h1>
              <p className="mt-6 text-lg leading-8 text-slate-700">{resource.summary}</p>
            </div>
          </Container>
        </Section>

        <Section>
          <Container className="max-w-4xl">
            <div className="grid gap-10">
              {resource.sections.map((section) => (
                <section key={section.heading} aria-labelledby={`${resource.slug}-${section.heading.toLowerCase().replaceAll(" ", "-")}`}>
                  <h2 id={`${resource.slug}-${section.heading.toLowerCase().replaceAll(" ", "-")}`} className="text-2xl font-semibold text-ink">
                    {section.heading}
                  </h2>
                  <p className="mt-4 leading-8 text-slate-700">{section.body}</p>
                  {section.bullets ? (
                    <ul className="mt-5 grid gap-3">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="border-l-2 border-cyan pl-3 text-slate-700">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          </Container>
        </Section>
      </article>
      <FAQSection faqs={resource.faqs} />
      <CTASection title="Need help turning evidence into an enforcement workflow?" />
    </>
  );
}
