import type { Metadata } from "next";
import { Building2, Clock3, FileCheck2, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { InfringementStatusBanner } from "@/components/sections/InfringementStatusBanner";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { formDisclaimer, site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Contact ProtectOurBrand | Submit an Infringement",
  description:
    "Contact ProtectOurBrand in San Diego for brand protection, DMCA monitoring, infringement review, counterfeit listing documentation, fake profile reporting, and enforcement workflow support.",
  path: "/contact"
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" }
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />

      <section className="relative">
        <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:py-24">
          <div>
            <span className="inline-flex items-center rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-cyan">
              Contact
            </span>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight text-ink sm:text-5xl lg:text-6xl">Contact ProtectOurBrand</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
              Reach the team for brand threat scans, infringement intake, marketplace abuse review, fake profile reporting, copied content documentation, and enforcement workflow support.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/case-review/#brand-threat-scan-panel">Request a Brand Threat Scan</ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <Section className="bg-slate-50">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-cyan">Company background</p>
              <h2 className="mt-3 text-3xl font-bold text-ink">A brand protection contact point backed by DMCA workflow experience.</h2>
              <p className="mt-4 leading-7 text-slate-700">
                The DMCAForce operating background reaches back to 2009, with content protection work centered on web scanning, DMCA notices, Google removal workflows, human review, and support. ProtectOurBrand adapts that practical enforcement discipline for businesses dealing with copied product photos, fake accounts, clone sites, marketplace abuse, rogue domains, and search result misuse.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/case-review/#brand-threat-scan-panel">Request a Brand Threat Scan</ButtonLink>
                <ButtonLink href="#submit-infringement" variant="secondary">
                  Submit Known URLs
                </ButtonLink>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
              <Card>
                <Building2 aria-hidden="true" className="size-7 text-cyan" />
                <h3 className="mt-4 text-lg font-semibold text-ink">Built from DMCA enforcement experience</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  ProtectOurBrand draws on the same content-protection operating background behind DMCAForce, extending evidence-first DMCA and monitoring workflows into ecommerce, agency, product, and brand abuse cases.
                </p>
              </Card>
              <Card>
                <ShieldCheck aria-hidden="true" className="size-7 text-cyan" />
                <h3 className="mt-4 text-lg font-semibold text-ink">Detection, evidence, and review</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Our intake process is organized around owned assets, known URLs, copied images, marketplace listings, fake profiles, clone websites, rogue domains, and the enforcement channel most likely to review the evidence.
                </p>
              </Card>
              <Card>
                <FileCheck2 aria-hidden="true" className="size-7 text-cyan" />
                <h3 className="mt-4 text-lg font-semibold text-ink">Careful enforcement support</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  We prepare and track enforcement requests, but we do not guarantee removals. Outcomes depend on the platform, host, registrar, marketplace, search engine, applicable law, and evidence quality.
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
            <div className="grid content-start gap-4">
              <Card>
                <Mail aria-hidden="true" className="size-7 text-cyan" />
                <h2 className="mt-4 text-xl font-semibold text-ink">Support email</h2>
                <a className="mt-2 block text-slate-700 hover:text-cyan" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
                <p className="mt-3 text-sm leading-6 text-slate-600">Use email for general questions, partnership requests, and follow-up details for an existing intake.</p>
              </Card>
              <Card>
                <Phone aria-hidden="true" className="size-7 text-cyan" />
                <h2 className="mt-4 text-xl font-semibold text-ink">Phone</h2>
                <a className="mt-2 block text-slate-700 hover:text-cyan" href={`tel:${site.phone.replaceAll(" ", "")}`}>
                  {site.phone}
                </a>
                <p className="mt-3 text-sm leading-6 text-slate-600">For urgent active abuse, submit the URLs first so the call can focus on priority and scope.</p>
              </Card>
              <Card>
                <MapPin aria-hidden="true" className="size-7 text-cyan" />
                <h2 className="mt-4 text-xl font-semibold text-ink">Company office</h2>
                <p className="mt-2 text-slate-700">3590 5th Ave</p>
                <p className="text-slate-700">San Diego, CA 92101</p>
              </Card>
              <Card>
                <Clock3 aria-hidden="true" className="size-7 text-cyan" />
                <h2 className="mt-4 text-xl font-semibold text-ink">What happens next</h2>
                <ol className="mt-3 grid gap-3 text-sm leading-6 text-slate-600">
                  {[
                    "Review the brand, source material, suspected abuse, and urgency.",
                    "Identify the likely channel: marketplace, social platform, host, registrar, search engine, ad network, or website operator.",
                    "Organize evidence into a clear case file with URLs, screenshots, timestamps, and ownership notes.",
                    "Recommend the next workflow: threat scan, infringement submission, monitoring plan, or escalation path."
                  ].map((step, index) => (
                    <li key={step} className="flex gap-3">
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-cyan/10 text-xs font-bold text-cyan">{index + 1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </Card>
            </div>

            <Card id="submit-infringement">
              <InfringementStatusBanner />
              <div className="mb-6">
                <FileCheck2 aria-hidden="true" className="size-8 text-cyan" />
                <h2 className="mt-4 text-2xl font-bold text-ink">Submit an infringement for review</h2>
                <p className="mt-3 leading-7 text-slate-700">
                  Use this form when you already have an original content URL, an infringing URL, and enough context for a first review. If you do not know where the abuse is appearing yet, start with a brand threat scan instead.
                </p>
              </div>
              <form
                className="grid gap-5"
                aria-describedby="infringement-disclaimer"
                method="post"
                encType="multipart/form-data"
                action="/api/submit-infringement.php"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Name" id="name" required />
                  <Field label="Email" id="email" type="email" required />
                  <Field label="Company" id="company" />
                  <Field label="Original content URL" id="original-content-url" type="url" required />
                </div>
                <Field label="Infringing URL" id="infringing-url" type="url" required />
                <Select label="Type of infringement" id="type-of-infringement" required options={["Copied image", "Copied website content", "Fake profile", "Counterfeit listing", "Clone website", "Fake ad", "Rogue domain", "Other"]} />
                <Select label="Do you own the copyright/trademark?" id="ownership" required options={["Yes", "Authorized agent", "Not sure", "No"]} />
                <label className="block text-sm font-semibold text-slate-800" htmlFor="evidence">
                  Upload screenshots/evidence
                  <input id="evidence" name="evidence[]" type="file" multiple className="mt-2 w-full rounded-md border border-dashed border-slateLine bg-white px-4 py-3 text-sm text-slate-700 file:mr-4 file:rounded-md file:border-0 file:bg-cyan file:px-4 file:py-2 file:text-sm file:font-semibold file:text-ink" />
                </label>
                <Field label="Additional notes" id="additional-notes" as="textarea" />
                <p id="infringement-disclaimer" className="text-sm leading-6 text-slate-600">{formDisclaimer}</p>
                <Button type="submit">Submit an Infringement</Button>
              </form>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}

function Field({
  label,
  id,
  type = "text",
  required = false,
  as
}: {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  as?: "textarea";
}) {
  const inputClass =
    "mt-2 w-full rounded-md border border-slateLine bg-white px-4 py-3 text-ink outline-none placeholder:text-slate-600 focus:border-cyan focus:ring-2 focus:ring-cyan/30";

  return (
    <label className="block text-sm font-semibold text-slate-800" htmlFor={id}>
      {label}
      {required ? <span className="text-amber"> *</span> : null}
      {as === "textarea" ? (
        <textarea id={id} name={id} required={required} rows={5} className={inputClass} />
      ) : (
        <input id={id} name={id} type={type} required={required} className={inputClass} />
      )}
    </label>
  );
}

function Select({ label, id, options, required = false }: { label: string; id: string; options: string[]; required?: boolean }) {
  return (
    <label className="block text-sm font-semibold text-slate-800" htmlFor={id}>
      {label}
      {required ? <span className="text-amber"> *</span> : null}
      <select id={id} name={id} required={required} className="mt-2 w-full rounded-md border border-slateLine bg-white px-4 py-3 text-ink outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/30">
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
