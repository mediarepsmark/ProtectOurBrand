import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { services } from "@/content/services";

export function ServicesGrid({ limit }: { limit?: number }) {
  const visibleServices = limit ? services.slice(0, limit) : services;

  return (
    <Section>
      <Container>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-cyan">Services</p>
            <h2 className="mt-3 text-3xl font-bold text-ink">Detection, evidence, and enforcement support.</h2>
          </div>
          <Link className="text-sm font-semibold text-cyan hover:text-blue" href="/services">
            View all services
          </Link>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visibleServices.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`} className="group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan">
              <Card className="h-full transition group-hover:border-cyan/60 group-hover:bg-cyan/10">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold text-ink">{service.shortTitle}</h3>
                  <ArrowRight aria-hidden="true" className="size-5 shrink-0 text-cyan transition group-hover:translate-x-1" />
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{service.summary}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
