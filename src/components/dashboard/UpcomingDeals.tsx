import Link from "next/link";
import { ArrowUpRight, CalendarDays, Handshake } from "lucide-react";
import { Customer, Deal } from "@/types";
import { STAGE_CONFIG } from "@/lib/constants";
import { formatCompactRupiah, formatDate } from "@/lib/utils";

export default function UpcomingDeals({
  deals,
  customers,
}: {
  deals: Deal[];
  customers: Customer[];
}) {
  const upcoming = deals
    .filter((deal) => deal.stage !== "won" && deal.stage !== "lost")
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 4);

  const total = upcoming.reduce((sum, deal) => sum + deal.amount, 0);

  return (
    <section className="panel fade-up flex h-full flex-col p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow">In motion</p>
          <h2 className="mt-1.5 text-[15px] font-medium text-ink">
            Deals closing soon
          </h2>
          <p className="mt-1 text-[11px] text-faint">
            Peluang dengan target terdekat
          </p>
        </div>
        <Link
          href="/deals"
          aria-label="Buka deals"
          className="icon-btn -mr-1 -mt-1"
        >
          <ArrowUpRight size={16} />
        </Link>
      </div>

      <ul className="mt-3 flex-1 space-y-1">
        {upcoming.map((deal) => {
          const customer = customers.find(
            (item) => item.id === deal.customerId
          );
          const stage = STAGE_CONFIG[deal.stage];

          return (
            <li key={deal.id}>
              <Link
                href="/deals"
                className="group block rounded-xl border border-transparent px-2 py-2.5 transition-all duration-200 hover:border-line hover:bg-white/[0.025]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-[12px] font-medium text-ink">
                      {deal.title}
                    </p>
                    <p className="mt-0.5 truncate text-[10.5px] text-faint">
                      {customer?.company ?? "Unassigned"}
                    </p>
                  </div>
                  <p className="tabular shrink-0 text-[12px] font-medium text-ink">
                    {formatCompactRupiah(deal.amount)}
                  </p>
                </div>

                <div className="mt-2 flex items-center justify-between gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-1.5 py-0.5 text-[9px] font-medium ${stage.chipClassName}`}
                  >
                    <span
                      className={`h-1 w-1 rounded-full ${stage.dotClassName}`}
                    />
                    {stage.label}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[9.5px] text-faint">
                    <CalendarDays size={10} />
                    {formatDate(deal.dueDate)}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      {upcoming.length === 0 && (
        <div className="flex flex-1 flex-col items-center justify-center py-12 text-center">
          <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-white/[0.03] text-faint">
            <Handshake size={18} />
          </span>
          <p className="mt-3 text-[12.5px] font-medium text-ink">
            Semua deal sudah selesai
          </p>
          <p className="mt-1 text-[11px] text-faint">
            Tambahkan deal baru untuk mulai tracking.
          </p>
        </div>
      )}

      <div className="mt-3 flex items-center justify-between border-t border-line/60 pt-3.5">
        <span className="text-[10px] text-faint">Active pipeline</span>
        <span className="tabular text-[10.5px] font-medium text-muted">
          {formatCompactRupiah(total)}
        </span>
      </div>
    </section>
  );
}
