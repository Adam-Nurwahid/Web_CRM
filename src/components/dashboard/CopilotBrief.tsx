import Link from "next/link";
import {
  ArrowUpRight,
  Clock,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import type { Customer, Deal } from "@/types";
import { formatCompactRupiah } from "@/lib/utils";

interface CopilotBriefProps {
  customers: Customer[];
  deals: Deal[];
  pipelineValue: number;
  winRate: number;
}

export default function CopilotBrief({
  customers,
  deals,
  pipelineValue,
  winRate,
}: CopilotBriefProps) {
  const activeDeals = deals.filter(
    (deal) => deal.stage !== "won" && deal.stage !== "lost"
  );
  const topDeal = [...activeDeals].sort((a, b) => b.amount - a.amount)[0];
  const topCustomer = topDeal
    ? customers.find((customer) => customer.id === topDeal.customerId)
    : undefined;
  const openLeads = customers.filter(
    (customer) => customer.status === "lead" || customer.status === "prospect"
  ).length;

  const insights = [
    {
      icon: TrendingUp,
      label: "Momentum",
      title: topDeal?.title ?? "No active deal yet",
      detail: topDeal
        ? `${formatCompactRupiah(topDeal.amount)} · ${topCustomer?.company ?? "Unassigned"}`
        : "Tambahkan deal pertamamu",
      className: "border-gold/20 bg-gold/[0.08] text-gold",
      href: "/deals",
    },
    {
      icon: Clock,
      label: "Follow-up",
      title: `${openLeads} leads menunggu respons`,
      detail: "Prioritaskan yang belum aktif 7 hari terakhir",
      className: "border-accent/20 bg-accent/[0.08] text-accent-soft",
      href: "/customers",
    },
    {
      icon: Target,
      label: "Win rate",
      title: `${winRate}% closing rate`,
      detail: "Di atas rata-rata bisnis aqiqah",
      className: "border-sage/20 bg-sage/[0.08] text-sage",
      href: "/deals",
    },
  ];

  return (
    <section className="panel aurora fade-up overflow-hidden">
      <div
        aria-hidden="true"
        className="grid-fade pointer-events-none absolute inset-0 opacity-50"
      />
      <div className="relative grid gap-6 p-5 sm:p-6 xl:grid-cols-[1.08fr_1fr] xl:items-center xl:gap-8">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/[0.09] px-2.5 py-1 text-[10.5px] font-medium text-accent-soft">
              <Sparkles size={12} strokeWidth={1.9} />
              Copilot briefing
            </span>
            <span className="text-[10.5px] text-faint">Updated just now</span>
          </div>

          <h2 className="mt-4 max-w-lg font-display text-[30px] leading-[1.08] tracking-[-0.01em] text-ink sm:text-[34px]">
            Your pipeline is{" "}
            <em className="italic text-accent-soft">accelerating.</em>
          </h2>
          <p className="mt-3 max-w-md text-[12.5px] leading-relaxed text-muted sm:text-[13px]">
            {activeDeals.length} peluang aqiqah aktif senilai{" "}
            <span className="font-medium text-ink">
              {formatCompactRupiah(pipelineValue)}
            </span>{" "}
            sedang bergerak. Fokus pada {openLeads} lead teratas untuk menjaga
            momentum kuartal ini.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <Link href="/deals" className="btn btn-primary">
              Review pipeline
              <ArrowUpRight size={14} />
            </Link>
            <Link href="/customers" className="btn btn-secondary">
              Lihat customers
            </Link>
          </div>
        </div>

        <div className="grid gap-2">
          {insights.map(({ icon: Icon, label, title, detail, className, href }) => (
            <Link
              key={label}
              href={href}
              className="group flex items-center gap-3 rounded-xl border border-line bg-black/20 p-3 transition-all duration-200 hover:border-line-strong hover:bg-black/35"
            >
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border ${className}`}
              >
                <Icon size={14} strokeWidth={1.8} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[9.5px] font-medium uppercase tracking-[0.14em] text-faint">
                  {label}
                </span>
                <span className="mt-0.5 block truncate text-[12px] font-medium text-ink">
                  {title}
                </span>
                <span className="mt-0.5 block truncate text-[10.5px] text-faint">
                  {detail}
                </span>
              </span>
              <ArrowUpRight
                size={14}
                className="shrink-0 text-faint/60 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-soft"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
