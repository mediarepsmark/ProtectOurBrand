import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { monitoredPlatforms, platformCoverageNote } from "@/content/platforms";
import { cn } from "@/lib/utils";

export function PlatformCoverage() {
  return (
    <Section className="bg-white">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-cyan">Platform coverage</p>
          <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">Monitoring coverage across major platforms.</h2>
          <p className="mt-4 text-slate-700">
            ProtectOurBrand prepares evidence and enforcement workflows for marketplace, search, social, ecommerce, web publishing, ad, hosting, and domain abuse channels.
          </p>
        </div>

        <ul className="mx-auto mt-10 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-5" aria-label="Examples of monitored platforms and channels">
          {monitoredPlatforms.map((platform) => (
            <li
              key={platform.name}
              className="flex min-h-16 items-center gap-3 rounded-md border border-slateLine bg-slate-50 px-4 py-3 shadow-sm"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "grid size-10 shrink-0 place-items-center rounded-md text-lg font-extrabold",
                  platform.markClassName
                )}
              >
                {platform.mark}
              </span>
              <span className="text-lg font-bold text-ink">{platform.name}</span>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center text-lg font-bold text-ink">
          Plus additional hosts, registrars, ad networks, search engines, marketplaces, and social platforms by scope.
        </p>
        <p className="mx-auto mt-8 max-w-4xl text-center text-sm leading-6 text-slate-500">{platformCoverageNote}</p>
      </Container>
    </Section>
  );
}
