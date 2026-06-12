import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service | ProtectOurBrand",
  description:
    "Read ProtectOurBrand terms covering website use, service scope, enforcement outcomes, client-submitted evidence, and legal limitations.",
  path: "/terms"
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Terms", path: "/terms" }
];

export default function TermsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />
      <Section>
        <Container className="max-w-4xl">
          <h1 className="text-4xl font-bold text-ink">Terms of Service</h1>
          <div className="mt-8 grid gap-8 text-slate-700">
            <LegalSection title="Website use" text="This website provides general information about ProtectOurBrand services. Submitting a form does not create a client relationship unless a separate agreement is accepted." />
            <LegalSection title="Service scope" text="ProtectOurBrand provides monitoring, documentation, submission support, reporting, and workflow tracking based on the scope agreed with the client." />
            <LegalSection title="Removal outcomes" text="ProtectOurBrand does not control platforms, hosts, registrars, marketplaces, search engines, advertisers, or third-party reviewers. Outcomes depend on the receiving channel, applicable law, policy requirements, evidence quality, and the type of infringement." />
            <LegalSection title="Client responsibilities" text="Clients are responsible for providing accurate information, authorization, ownership context, and evidence. Clients should not submit false, misleading, or unauthorized claims." />
            <LegalSection title="No legal advice" text={site.legalDisclaimer} />
            <LegalSection title="Contact" text={`Questions about these terms can be sent to ${site.email}.`} />
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
