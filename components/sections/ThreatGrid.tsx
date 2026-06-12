import { AlertTriangle, FileSearch, Globe2, Megaphone, PackageSearch, Radar, ScanSearch, Users } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { threatCategories } from "@/content/site";

const icons = [FileSearch, Users, PackageSearch, ScanSearch, Radar, Globe2, Megaphone, AlertTriangle];

export function ThreatGrid() {
  return (
    <Section>
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-cyan">Threat categories</p>
          <h2 className="mt-3 text-3xl font-bold text-ink">Monitor the abuse channels that hit revenue and trust.</h2>
          <p className="mt-4 text-slate-700">
            ProtectOurBrand classifies each finding so your team can move from discovery to evidence and enforcement.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {threatCategories.map((category, index) => {
            const Icon = icons[index];
            return (
              <Card key={category} className="min-h-40">
                <Icon aria-hidden="true" className="size-7 text-cyan" />
                <h3 className="mt-5 text-lg font-semibold text-ink">{category}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Detect, document, and route findings into the right takedown workflow.</p>
              </Card>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
