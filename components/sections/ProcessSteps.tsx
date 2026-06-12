import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { processSteps } from "@/content/site";

export function ProcessSteps() {
  return (
    <Section className="bg-slate-50">
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-cyan">How it works</p>
          <h2 className="mt-3 text-3xl font-bold text-ink">A human-reviewed takedown workflow from intake to monitoring.</h2>
        </div>
        <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <li key={step.title} className="rounded-md border border-slateLine bg-white p-5">
              <div className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-full bg-cyan text-sm font-bold text-ink">{index + 1}</span>
                <CheckCircle2 aria-hidden="true" className="size-5 text-amber" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
