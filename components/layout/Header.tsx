import Image from "next/image";
import Link from "next/link";
import { navigation } from "@/content/navigation";
import { primaryCta, site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slateLine bg-white/95 shadow-sm backdrop-blur">
      <Container className="relative flex h-20 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
        >
          <Image
            src="/brand/logo-mark.png"
            width={46}
            height={46}
            alt=""
            priority
            className="rounded-xl border border-slateLine bg-white object-contain shadow-sm"
          />
          <span className="text-base font-extrabold tracking-tight text-ink sm:text-lg">
            ProtectOurBrand<span className="text-blue">.com</span>
          </span>
        </Link>
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden lg:block">
          <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
        </div>
        <MobileNav />
      </Container>
    </header>
  );
}
