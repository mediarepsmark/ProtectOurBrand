import Link from "next/link";
import { SearchX } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="py-24">
      <div className="max-w-2xl">
        <SearchX aria-hidden="true" className="size-12 text-amber" />
        <h1 className="mt-6 text-4xl font-bold text-ink">Page not found</h1>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The page may have moved, or the URL may not match a published ProtectOurBrand resource.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/">Return home</ButtonLink>
          <Link className="inline-flex min-h-11 items-center justify-center rounded-md px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-100 hover:text-blue" href="/resources">
            Browse resources
          </Link>
        </div>
      </div>
    </Container>
  );
}
