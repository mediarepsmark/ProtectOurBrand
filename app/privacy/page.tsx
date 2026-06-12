import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy | ProtectOurBrand",
  description:
    "Read the ProtectOurBrand privacy policy for information about data collection, submitted evidence, contact details, service communications, and retention.",
  path: "/privacy"
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Privacy", path: "/privacy" }
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />
      <Section>
        <Container className="max-w-4xl">
          <h1 className="text-4xl font-bold text-ink">Privacy Policy</h1>
          <div className="mt-8 grid gap-8 text-slate-700">
            <LegalSection title="Information we collect" text="ProtectOurBrand may collect contact details, company information, brand names, websites, social handles, URLs, screenshots, evidence files, messages, and service-related communications submitted through the site or during client intake." />
            <LegalSection title="How information is used" text="Information is used to review requests, scope monitoring, prepare evidence files, submit enforcement requests when authorized, communicate with clients, maintain records, improve workflows, and operate the website." />
            <LegalSection title="Evidence and third-party channels" text="When a client authorizes an enforcement workflow, submitted evidence may be included in reports to platforms, hosts, registrars, marketplaces, search engines, or other abuse channels relevant to the request." />
            <LegalSection title="Retention" text="ProtectOurBrand may retain intake details, evidence records, submission history, and communications as needed for service delivery, reporting, compliance, and legitimate business purposes." />
            <LegalSection title="Contact" text={`Questions about privacy can be sent to ${site.email}.`} />
          </div>
        </Container>
      </Section>
    </>
  );
}

function LegalSection({ title, text }: { title: string; text: string }) {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-ink">{title}</h2>
      <p className="mt-3 leading-8">{text}</p>
    </section>
  );
}
