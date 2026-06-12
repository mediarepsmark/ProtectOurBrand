import Image from "next/image";
import { Card } from "@/components/ui/Card";

const queueItems = [
  ["Counterfeit listing", "Marketplace", "Evidence ready"],
  ["Clone storefront", "Domain", "Reviewing host"],
  ["Fake profile", "Social", "Submitted"],
  ["Scraper page", "Search", "Escalation"]
];

export function DashboardMockup() {
  return (
    <Card className="relative overflow-hidden p-0 shadow-glow">
      <div className="border-b border-slateLine bg-slate-50 px-5 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <Image
              src="/brand/logo-mark.png"
              alt=""
              width={44}
              height={44}
              className="shrink-0 rounded-xl border border-slateLine bg-white object-contain shadow-sm"
            />
            <div>
              <p className="text-xs uppercase tracking-[0.08em] text-cyan">Threat queue</p>
              <h2 className="mt-1 text-xl font-semibold text-ink">Evidence-first monitoring</h2>
            </div>
          </div>
          <span className="whitespace-nowrap rounded-full bg-amber/15 px-3 py-1 text-xs font-semibold text-amber">Human-reviewed</span>
        </div>
      </div>
      <div className="grid gap-4 p-5">
        <Image
          src="/images/threat-map.svg"
          alt="Threat map showing monitored web, social, marketplace, search, and domain channels"
          width={720}
          height={360}
          className="rounded-md border border-slateLine bg-white"
        />
        <div className="grid gap-3">
          {queueItems.map(([threat, channel, status]) => (
            <div key={threat} className="grid grid-cols-[1fr_auto] gap-4 rounded-md border border-slateLine bg-white px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-ink">{threat}</p>
                <p className="text-xs text-slate-500">{channel}</p>
              </div>
              <span className="self-center rounded-full bg-cyan/10 px-3 py-1 text-xs font-semibold text-cyan">{status}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
