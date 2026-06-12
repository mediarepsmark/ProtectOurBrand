import { ArrowRight, CalendarDays, CheckCircle2, DollarSign, Monitor, Route, Search } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { primaryCta, secondaryCta } from "@/content/site";

const assessmentBenefits = [
  { icon: Route, label: "Step-by-step removal plan" },
  { icon: Monitor, label: "15-minute threat assessment" },
  { icon: DollarSign, label: "Revenue-risk review" }
];

const reportItems = [
  ["Copied product photo", "Evidence needed"],
  ["Fake profile", "Abuse channel found"],
  ["Clone storefront", "Host review path"],
  ["Search result abuse", "Deindexing option"]
];

export function ThreatAssessmentCTA() {
  return (
    <Section className="overflow-hidden bg-ink text-white">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-cyan">Threat assessment</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">Book a focused review before abuse spreads.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-200">
              Start with a guided assessment of your known URLs, owned assets, platform exposure, evidence gaps, and best enforcement channels.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={primaryCta.href} variant="secondary" className="border-white bg-white text-ink hover:bg-cyan/20 hover:text-white">
                Book a Threat Assessment
                <ArrowRight aria-hidden="true" className="size-4" />
              </ButtonLink>
              <ButtonLink href={secondaryCta.href} variant="secondary">
                {secondaryCta.label}
              </ButtonLink>
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-300">
              Submitting a request does not guarantee removal. Outcomes depend on the platform, host, registrar, marketplace, search engine, applicable law, and available evidence.
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-x-8 top-16 hidden h-28 rounded-b-[48px] border-x-2 border-b-2 border-dashed border-white/18 lg:block" />
            <div className="relative grid gap-4 md:grid-cols-3">
              {assessmentBenefits.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 rounded-md border border-white/20 bg-white px-4 py-3 text-ink shadow-glow">
                  <Icon aria-hidden="true" className="size-5 shrink-0 text-blue" />
                  <span className="text-sm font-bold">{label}</span>
                </div>
              ))}
            </div>

            <div className="relative mt-10 overflow-hidden rounded-md border border-white/20 bg-white text-ink shadow-glow">
              <div className="flex flex-wrap items-center justify-center gap-8 border-b border-slateLine bg-slate-50 px-5 py-4 text-sm font-semibold">
                <span className="inline-flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-ink" />
                  Fill out the form
                </span>
                <span className="inline-flex items-center gap-2 text-slate-500">
                  <span className="size-2.5 rounded-full bg-slate-300" />
                  Book your review
                </span>
              </div>

              <div className="grid lg:grid-cols-[0.9fr_1fr]">
                <div className="border-b border-slateLine p-6 lg:border-b-0 lg:border-r">
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-md bg-blue text-white">
                      <Search aria-hidden="true" className="size-5" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-cyan">Free review</p>
                      <h3 className="text-xl font-bold">360° Threat Scan</h3>
                    </div>
                  </div>
                  <ul className="mt-5 grid gap-3 text-sm font-semibold text-slate-700">
                    <li className="flex gap-3">
                      <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-cyan" />
                      Live abuse signals reviewed during intake
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-cyan" />
                      Evidence gaps and enforcement channels mapped
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-cyan" />
                      Action plan available even if you do not hire us
                    </li>
                  </ul>
                  <div className="mt-6 grid gap-2">
                    {reportItems.map(([threat, status]) => (
                      <div key={threat} className="grid grid-cols-[1fr_auto] gap-3 rounded-md border border-slateLine bg-slate-50 px-3 py-2 text-xs">
                        <span className="font-semibold text-slate-800">{threat}</span>
                        <span className="text-cyan">{status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-cyan">Scheduling preview</p>
                      <h3 className="mt-2 text-xl font-bold">June 2026</h3>
                    </div>
                    <CalendarDays aria-hidden="true" className="size-7 text-blue" />
                  </div>
                  <div className="mt-6 grid grid-cols-7 gap-2 text-center text-xs font-bold uppercase tracking-[0.08em] text-slate-400">
                    {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                      <span key={`${day}-${index}`}>{day}</span>
                    ))}
                  </div>
                  <div className="mt-3 grid grid-cols-7 gap-2 text-center text-sm text-slate-500">
                    {Array.from({ length: 30 }, (_, index) => index + 1).map((day) => (
                      <span
                        key={day}
                        className={day >= 9 && day <= 12 ? "rounded-md bg-cyan/10 px-2 py-3 font-bold text-blue" : "px-2 py-3"}
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 rounded-md border border-slateLine bg-slate-50 p-4 text-center text-sm font-semibold leading-6 text-slate-700">
                    Complete the assessment form before selecting a review time.
                  </div>
                  <ButtonLink href={primaryCta.href} className="mt-5 w-full">
                    Request Assessment
                  </ButtonLink>
                </div>
              </div>
              <div className="border-t border-slateLine bg-slate-50 px-5 py-3 text-center text-xs font-semibold text-slate-500">
                ProtectOurBrand intake and scheduling preview
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
