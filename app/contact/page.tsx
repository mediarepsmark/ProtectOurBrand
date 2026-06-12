import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Hero } from "@/components/sections/Hero";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { formDisclaimer, site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Submit an Infringement | ProtectOurBrand",
  description:
    "Submit known infringement details to ProtectOurBrand, including original content URLs, infringing URLs, abuse type, ownership notes, and available evidence.",
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
      <Hero
        eyebrow="Contact"
        title="Submit an Infringement"
        description="Use this form when you already have an original content URL, an infringing URL, and enough context for a first review."
        showSecondary={false}
      />
      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
            <div className="grid gap-4">
              <Card>
                <Mail aria-hidden="true" className="size-7 text-cyan" />
                <h2 className="mt-4 text-xl font-semibold text-ink">Email</h2>
                <a className="mt-2 block text-slate-700 hover:text-cyan" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </Card>
              <Card>
                <Phone aria-hidden="true" className="size-7 text-cyan" />
                <h2 className="mt-4 text-xl font-semibold text-ink">Phone</h2>
                <a className="mt-2 block text-slate-700 hover:text-cyan" href={`tel:${site.phone.replaceAll(" ", "")}`}>
                  {site.phone}
                </a>
              </Card>
            </div>

            <Card id="submit-infringement">
              <form className="grid gap-5" aria-describedby="infringement-disclaimer" method="post" encType="multipart/form-data">
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
                  <input id="evidence" name="evidence" type="file" multiple className="mt-2 w-full rounded-md border border-dashed border-slateLine bg-white px-4 py-3 text-sm text-slate-700 file:mr-4 file:rounded-md file:border-0 file:bg-cyan file:px-4 file:py-2 file:text-sm file:font-semibold file:text-ink" />
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
