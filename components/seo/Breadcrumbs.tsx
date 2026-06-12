import Link from "next/link";
import type { BreadcrumbItem } from "@/lib/schema";
import { Container } from "@/components/ui/Container";

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <Container className="pt-6">
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-2">
                {index > 0 ? <span aria-hidden="true">/</span> : null}
                {isLast ? (
                  <span className="text-slate-800" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link className="hover:text-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan" href={item.path}>
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </Container>
  );
}
