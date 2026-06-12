import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { primaryCta, secondaryCta } from "@/content/site";

export function CTASection({
  title = "Start with a brand threat scan.",
  text = "Send the brand, known URLs, social handles, and priority concerns. ProtectOurBrand will review the scope and recommend the next enforcement path."
}: {
  title?: string;
  text?: string;
}) {
  return (
    <Section className="border-t border-slateLine bg-[linear-gradient(135deg,rgba(34,211,238,0.12),rgba(245,158,11,0.08))]">
      <Container>
        <div className="max-w-4xl">
          <h2 className="text-3xl font-bold text-ink sm:text-4xl">{title}</h2>
          <p className="mt-4 text-lg leading-8 text-slate-700">{text}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
            <ButtonLink href={secondaryCta.href} variant="secondary">
              {secondaryCta.label}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
