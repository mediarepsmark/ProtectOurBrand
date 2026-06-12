import type { ReactNode } from "react";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { primaryCta, secondaryCta } from "@/content/site";

export function Hero({
  eyebrow,
  title,
  description,
  children,
  showSecondary = true
}: {
  eyebrow?: string;
  title: string;
  description: string;
  children?: ReactNode;
  showSecondary?: boolean;
}) {
  return (
    <section className="relative overflow-hidden border-b border-slateLine bg-white bg-grid bg-[length:36px_36px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(8,145,178,0.14),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.86),#f8fbff_95%)]" />
      <Container className="relative grid gap-10 py-16 sm:py-20 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:py-24">
        <div>
          {eyebrow ? <Badge>{eyebrow}</Badge> : null}
          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight text-ink sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">{description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
            {showSecondary ? (
              <ButtonLink href={secondaryCta.href} variant="secondary">
                {secondaryCta.label}
              </ButtonLink>
            ) : null}
          </div>
        </div>
        {children ? <div>{children}</div> : null}
      </Container>
    </section>
  );
}
