import Image from "next/image";
import Link from "next/link";
import { footerNavigation } from "@/content/navigation";
import { secondaryCta, site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-slateLine bg-slate-50">
      <Container className="py-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/brand/logo-mark.png"
                width={48}
                height={48}
                alt=""
                className="rounded-xl border border-slateLine bg-white object-contain shadow-sm"
              />
              <span className="text-lg font-extrabold tracking-tight text-ink">
                ProtectOurBrand<span className="text-blue">.com</span>
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-700">{site.description}</p>
            <div className="mt-6">
              <ButtonLink href={secondaryCta.href} variant="secondary">
                {secondaryCta.label}
              </ButtonLink>
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {footerNavigation.map((group) => (
              <div key={group.title}>
                <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-800">{group.title}</h2>
                <ul className="mt-4 grid gap-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link className="text-sm text-slate-600 hover:text-cyan" href={link.href}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 border-t border-slateLine pt-6">
          <p className="max-w-5xl text-xs leading-5 text-slate-500">{site.legalDisclaimer}</p>
          <p className="mt-5 text-xs text-slate-500">© {new Date().getFullYear()} ProtectOurBrand. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
