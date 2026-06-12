import { ChevronDown } from "lucide-react";
import type { FAQ } from "@/content/faqs";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function FAQSection({
  faqs,
  title = "Frequently asked questions",
  defaultOpenCount = 3
}: {
  faqs: FAQ[];
  title?: string;
  defaultOpenCount?: number;
}) {
  return (
    <Section className="bg-white">
      <Container className="max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-cyan">FAQ</p>
          <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">{title}</h2>
        </div>
        <div className="mt-10 divide-y divide-slateLine border-y border-slateLine">
          {faqs.map((faq, index) => (
            <details key={faq.question} className="group py-7" open={index < defaultOpenCount}>
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 rounded-md text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan [&::-webkit-details-marker]:hidden">
                <span className="pt-1 text-xl font-bold leading-7 text-ink">{faq.question}</span>
                <span className="grid size-11 shrink-0 place-items-center rounded-full border border-slateLine bg-white text-ink shadow-sm transition group-open:rotate-180">
                  <ChevronDown aria-hidden="true" className="size-5" />
                </span>
              </summary>
              <div className="mt-5 max-w-5xl space-y-5 text-lg leading-8 text-slate-600">
                {faq.answer.split("\n\n").map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}
