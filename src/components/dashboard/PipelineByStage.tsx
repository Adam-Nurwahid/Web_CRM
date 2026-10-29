import Link from "next/link";
import { ArrowUpRight, CircleDollarSign } from "lucide-react";
import { Deal } from "@/types";
import { STAGE_CONFIG } from "@/lib/constants";
import { getDealsByStage } from "@/lib/stats";
import { formatCompactRupiah } from "@/lib/utils";

export default function PipelineByStage({ deals }: { deals: Deal[] }) {
  const stages = getDealsByStage(deals);
  const openPipeline = stages
    .filter(({ stage }) => stage !== "won" && stage !== "lost")
    .reduce((sum, stage) => sum + stage.amount, 0);
  const openCount = stages
    .filter(({ stage }) => stage !== "won" && stage !== "lost")
    .reduce((sum, stage) => sum + stage.count, 0);
  const maxAmount = Math.max(...stages.map((stage) => stage.amount), 1);
  const won = deals.filter((deal) => deal.stage === "won").length;
  const lost = deals.filter((deal) => deal.stage === "lost").length;
  const closed = won + lost || 1;

  return (
    <section className="panel fade-up flex h-full flex-col p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow">Pipeline</p>
          <h2 className="mt-1.5 text-[15px] font-medium text-ink">
            By stage
          </h2>
          <p className="mt-1 text-[11px] text-faint">
            Distribusi peluang aktif
          </p>
        </div>
        <Link
          href="/deals"
          aria-label="Buka pipeline"
          className="icon-btn -mr-1 -mt-1"
        >
          <ArrowUpRight size={16} />
        </Link>
      </div>

      <div className="mt-4 rounded-xl border border-line bg-black/20 p-3.5">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-faint">
            <CircleDollarSign size={12} />
            Open pipeline
          </span>
          <span className="chip !py-0.5 !text-[9.5px]">
            {openCount} deals
          </span>
        </div>
        <p className="mt-2 font-display text-[30px] leading-none tracking-[-0.01em] text-ink">
          {formatCompactRupiah(openPipeline)}
        </p>
        <div className="mt-3.5 flex h-1.5 gap-1 overflow-hidden rounded-full bg-white/[0.04]">
          {stages
            .filter(({ stage }) => stage !== "won" && stage !== "lost")
            .map(({ stage, amount }) => (
              <span
                key={stage}
                className={`h-full rounded-full ${STAGE_CONFIG[stage].barClassName}`}
                style={{
                  width: `${Math.max((amount / Math.max(openPipeline, 1)) * 100, 4)}%`,
                }}
              />
            ))}
        </div>
      </div>

      <ul className="-mx-1 mt-3 flex-1 space-y-0.5">
        {stages.map(({ stage, count, amount }) => {
          const { label, barClassName, dotClassName } = STAGE_CONFIG[stage];

          return (
            <li key={stage}>
              <Link
                href="/deals"
                className="group block rounded-lg px-2 py-2 transition-colors hover:bg-white/[0.03]"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${dotClassName}`}
                  />
                  <span className="flex-1 text-[11.5px] font-medium text-muted transition-colors group-hover:text-ink">
                    {label}
                  </span>
                  <span className="tabular text-[9.5px] text-faint">
                    {count} deal
                  </span>
                  <span className="tabular w-[62px] text-right text-[11px] font-medium text-ink">
                    {amount > 0 ? formatCompactRupiah(amount) : "—"}
                  </span>
                </div>
                <div className="ml-4 mt-1.5 h-1 overflow-hidden rounded-full bg-white/[0.045]">
                  <div
                    className={`h-full rounded-full ${barClassName} opacity-80 transition-opacity duration-200 group-hover:opacity-100`}
                    style={{
                      width: `${amount > 0 ? Math.max((amount / maxAmount) * 100, 4) : 0}%`,
                    }}
                  />
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="mt-3 flex items-center justify-between border-t border-line/60 pt-3.5">
        <span className="text-[10px] text-faint">Closed performance</span>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-[10px] text-sage">
            <span className="h-1 w-1 rounded-full bg-sage" />
            {won} won
          </span>
          <span className="h-2.5 w-px bg-line" />
          <span className="inline-flex items-center gap-1 text-[10px] text-rose">
            <span className="h-1 w-1 rounded-full bg-rose" />
            {lost} lost
          </span>
          <span className="ml-1 tabular text-[10px] font-medium text-muted">
            {Math.round((won / closed) * 100)}%
          </span>
        </div>
      </div>
    </section>
  );
}
