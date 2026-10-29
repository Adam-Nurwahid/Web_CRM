import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Download,
  MoreHorizontal,
  Plus,
  Search,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import type { ModuleTone } from "@/lib/modules";
import { MODULES } from "@/lib/modules";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import Avatar from "@/components/ui/Avatar";

const chipTone: Record<ModuleTone, string> = {
  accent: "border-accent/20 bg-accent/[0.08] text-accent-soft",
  sage: "border-sage/20 bg-sage/[0.08] text-sage",
  violet: "border-violet/20 bg-violet/[0.08] text-violet",
  gold: "border-gold/20 bg-gold/[0.08] text-gold",
  rose: "border-rose/20 bg-rose/[0.08] text-rose",
  slate: "border-line bg-white/[0.04] text-muted",
};

const iconTone: Record<ModuleTone, string> = {
  accent: "border-accent/15 bg-accent/[0.07] text-accent-soft",
  sage: "border-sage/15 bg-sage/[0.07] text-sage",
  violet: "border-violet/15 bg-violet/[0.07] text-violet",
  gold: "border-gold/15 bg-gold/[0.07] text-gold",
  rose: "border-rose/15 bg-rose/[0.07] text-rose",
  slate: "border-line bg-white/[0.03] text-muted",
};

const barTone: Record<ModuleTone, string> = {
  accent: "bg-gradient-to-r from-accent/70 to-accent-soft",
  sage: "bg-gradient-to-r from-sage/60 to-sage",
  violet: "bg-gradient-to-r from-violet/60 to-violet",
  gold: "bg-gradient-to-r from-gold/60 to-gold",
  rose: "bg-gradient-to-r from-rose/60 to-rose",
  slate: "bg-gradient-to-r from-slate-500/60 to-slate-400",
};

function StatusChip({
  label,
  tone = "slate",
}: {
  label: string;
  tone?: ModuleTone;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2 py-0.5 text-[9.5px] font-medium ${chipTone[tone]}`}
    >
      <span className="h-1 w-1 rounded-full bg-current" />
      {label}
    </span>
  );
}

export default function ModulePage({ moduleKey }: { moduleKey: string }) {
  const config = MODULES[moduleKey];
  if (!config) return null;

  const Icon = config.icon;

  return (
    <div>
      <PageHeader
        eyebrow={config.eyebrow}
        title={config.title}
        description={config.description}
        meta={
          <>
            <span className="chip">
              <span className="h-1 w-1 rounded-full bg-sage shadow-[0_0_8px_rgba(132,191,169,0.7)]" />
              Live data
            </span>
            <span className="chip">{config.badge}</span>
            <span className="chip">
              <Icon size={11} className="text-accent-soft" />
              Juragan Aqiqah
            </span>
          </>
        }
        actions={
          <>
            <button type="button" className="btn btn-secondary">
              <Download size={14} />
              Export
            </button>
            <button type="button" className="btn btn-primary">
              <Plus size={15} strokeWidth={2.2} />
              {config.cta}
            </button>
          </>
        }
      />

      <div className="mt-7 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {config.stats.map((stat, index) => (
            <div
              key={stat.label}
              className="fade-up"
              style={{ animationDelay: `${60 + index * 55}ms` }}
            >
              <StatCard {...stat} />
            </div>
          ))}
        </div>

        <div className="grid gap-5 xl:grid-cols-12">
          <section className="panel fade-up overflow-hidden xl:col-span-8">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line/60 px-5 py-4">
              <div>
                <p className="eyebrow">{config.badge}</p>
                <h2 className="mt-1.5 text-[15px] font-medium text-ink">
                  {config.panelTitle}
                </h2>
                <p className="mt-1 text-[11px] text-faint">
                  {config.panelDescription}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <label className="group relative hidden w-[190px] sm:block">
                  <Search
                    size={13}
                    className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-faint"
                  />
                  <input
                    type="search"
                    placeholder="Search..."
                    aria-label={`Cari di ${config.title}`}
                    className="input h-8 !pl-8 text-[11px]"
                  />
                </label>
                <button
                  type="button"
                  aria-label="Filter"
                  className="icon-btn h-8 w-8"
                >
                  <SlidersHorizontal size={14} />
                </button>
                <button
                  type="button"
                  aria-label="Menu lainnya"
                  className="icon-btn h-8 w-8"
                >
                  <MoreHorizontal size={15} />
                </button>
              </div>
            </div>

            {config.variant === "table" && (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] text-left">
                  <thead>
                    <tr className="border-b border-line/60 text-[9.5px] uppercase tracking-[0.14em] text-faint">
                      {(config.tableHead ?? ["Item", "Detail", "Status", "Total"]).map(
                        (head, index) => (
                          <th
                            key={head}
                            className={`px-5 py-3 font-medium ${
                              index === 3 ? "text-right" : ""
                            }`}
                          >
                            {head}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.045]">
                    {config.items.map((item) => {
                      const ItemIcon = item.icon ?? config.icon;
                      return (
                        <tr key={item.title} className="row-hover group">
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-3">
                              {item.avatar ? (
                                <Avatar name={item.avatar} size="sm" />
                              ) : (
                                <span
                                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border ${
                                    iconTone[item.tone ?? "slate"]
                                  }`}
                                >
                                  <ItemIcon size={14} strokeWidth={1.7} />
                                </span>
                              )}
                              <div className="min-w-0">
                                <p className="max-w-[280px] truncate text-[12px] font-medium text-ink">
                                  {item.title}
                                </p>
                                <p className="mt-0.5 truncate text-[10px] text-faint">
                                  {item.subtitle}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3.5 text-[10.5px] text-faint">
                            {item.meta}
                          </td>
                          <td className="px-5 py-3.5">
                            <StatusChip
                              label={item.status ?? "—"}
                              tone={item.tone}
                            />
                          </td>
                          <td className="px-5 py-3.5 text-right">
                            <span className="tabular text-[11px] font-medium text-muted">
                              {item.value}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {config.variant === "list" && (
              <div className="p-2.5">
                {config.items.map((item) => {
                  const ItemIcon = item.icon ?? config.icon;
                  const isTask = config.key === "tasks";

                  return (
                    <div
                      key={item.title}
                      className="group flex items-center gap-3 rounded-xl px-2.5 py-3 transition-colors hover:bg-white/[0.028]"
                    >
                      {isTask ? (
                        <span
                          className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors ${
                            item.done
                              ? "border-sage/30 bg-sage/15 text-sage"
                              : "border-line-strong text-transparent"
                          }`}
                        >
                          <Check size={11} strokeWidth={2.4} />
                        </span>
                      ) : item.avatar ? (
                        <Avatar name={item.avatar} size="sm" />
                      ) : (
                        <span
                          className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border ${
                            iconTone[item.tone ?? "slate"]
                          }`}
                        >
                          <ItemIcon size={14} strokeWidth={1.7} />
                        </span>
                      )}

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <p
                            className={`truncate text-[12px] font-medium ${
                              item.done
                                ? "text-faint line-through"
                                : "text-ink"
                            }`}
                          >
                            {item.title}
                          </p>
                          {item.unread && (
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_6px_rgba(224,138,104,0.8)]" />
                          )}
                        </div>
                        <p className="mt-0.5 truncate text-[10.5px] text-faint">
                          {item.subtitle}
                        </p>
                      </div>

                      <span className="hidden w-24 text-right text-[9.5px] text-faint md:block">
                        {item.meta}
                      </span>

                      {item.status && (
                        <StatusChip label={item.status} tone={item.tone} />
                      )}

                      {item.value && (
                        <span className="hidden w-16 text-right text-[10.5px] font-medium text-muted sm:block">
                          {item.value}
                        </span>
                      )}

                      <ChevronRight
                        size={13}
                        className="hidden shrink-0 text-faint/40 transition-all group-hover:translate-x-0.5 group-hover:text-muted sm:block"
                      />
                    </div>
                  );
                })}
              </div>
            )}

            {config.variant === "cards" && (
              <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-5">
                {config.items.map((item) => {
                  const ItemIcon = item.icon ?? config.icon;

                  return (
                    <article
                      key={item.title}
                      className="group flex flex-col rounded-xl border border-line bg-black/15 p-4 transition-all duration-200 hover:border-line-strong hover:bg-white/[0.025]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span
                          className={`grid h-8 w-8 place-items-center rounded-lg border ${
                            iconTone[item.tone ?? "slate"]
                          }`}
                        >
                          <ItemIcon size={14} strokeWidth={1.7} />
                        </span>
                        {item.status && (
                          <StatusChip label={item.status} tone={item.tone} />
                        )}
                      </div>

                      <h3 className="mt-3 text-[12.5px] font-medium text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-[10.5px] leading-relaxed text-faint">
                        {item.subtitle}
                      </p>

                      {item.progress !== undefined && (
                        <div className="mt-3.5">
                          <div className="h-1 overflow-hidden rounded-full bg-white/[0.05]">
                            <div
                              className={`h-full rounded-full ${
                                barTone[item.tone ?? "slate"]
                              }`}
                              style={{ width: `${item.progress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      <div className="mt-auto flex items-center justify-between gap-3 border-t border-line/50 pt-3">
                        <span className="text-[9.5px] text-faint">
                          {item.meta}
                        </span>
                        <span className="tabular text-[10.5px] font-medium text-muted">
                          {item.value}
                        </span>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            <div className="flex items-center justify-between gap-3 border-t border-line/60 px-5 py-3">
              <p className="text-[10px] text-faint">
                Menampilkan{" "}
                <span className="font-medium text-muted">
                  {config.items.length}
                </span>{" "}
                entri · diperbarui baru saja
              </p>
              <button
                type="button"
                className="inline-flex items-center gap-1 text-[10.5px] font-medium text-muted transition-colors hover:text-accent-soft"
              >
                View all
                <ArrowUpRight size={12} />
              </button>
            </div>
          </section>

          <aside className="space-y-5 xl:col-span-4">
            <section className="panel aurora fade-up overflow-hidden p-5">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/[0.08] px-2.5 py-1 text-[10px] font-medium text-accent-soft">
                  <Sparkles size={11} strokeWidth={1.9} />
                  Copilot insight
                </span>
                <span className="text-[9.5px] text-faint">Just now</span>
              </div>
              <h2 className="mt-4 font-display text-[24px] leading-[1.1] tracking-[-0.01em] text-ink">
                {config.insight.title}
              </h2>
              <p className="mt-2.5 text-[11.5px] leading-relaxed text-muted">
                {config.insight.description}
              </p>
              <button
                type="button"
                className="btn btn-secondary mt-4 w-full !text-[11px]"
              >
                {config.insight.cta}
                <ArrowUpRight size={13} />
              </button>
            </section>

            <section className="panel fade-up p-5">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-[13px] font-medium text-ink">
                  {config.sideTitle}
                </h2>
                <span className="chip !py-0.5 !text-[9px]">30 days</span>
              </div>
              <ul className="mt-4 space-y-4">
                {config.sideItems.map((item) => (
                  <li key={item.label}>
                    <div className="flex items-center justify-between gap-2 text-[10.5px]">
                      <span className="text-muted">{item.label}</span>
                      <span className="tabular font-medium text-ink">
                        {item.value}
                      </span>
                    </div>
                    <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/[0.05]">
                      <div
                        className={`h-full rounded-full ${barTone[item.tone]}`}
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center justify-between border-t border-line/60 pt-3">
                <span className="text-[9.5px] text-faint">
                  Berdasarkan data workspace
                </span>
                <button
                  type="button"
                  aria-label="Buka analytics"
                  className="grid h-6 w-6 place-items-center rounded-md text-faint transition-colors hover:bg-white/[0.06] hover:text-ink"
                >
                  <ArrowUpRight size={12} />
                </button>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
