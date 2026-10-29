import Link from "next/link";
import { ArrowUpRight, UserPlus } from "lucide-react";
import { Customer } from "@/types";
import { formatCompactRupiah, formatDate } from "@/lib/utils";
import StatusBadge from "@/components/ui/StatusBadge";
import Avatar from "@/components/ui/Avatar";

export default function RecentCustomers({
  customers,
}: {
  customers: Customer[];
}) {
  const recent = [...customers]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5);

  return (
    <section className="panel fade-up flex h-full flex-col p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow">Relationships</p>
          <h2 className="mt-1.5 text-[15px] font-medium text-ink">
            Recent customers
          </h2>
          <p className="mt-1 text-[11px] text-faint">
            {customers.length} relationships in your workspace
          </p>
        </div>
        <Link
          href="/customers"
          className="group inline-flex items-center gap-1 text-[11px] font-medium text-muted transition-colors hover:text-accent-soft"
        >
          View all
          <ArrowUpRight
            size={13}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </div>

      <ul className="-mx-2 mt-3 flex-1 divide-y divide-white/[0.045]">
        {recent.map((customer) => (
          <li key={customer.id}>
            <Link
              href="/customers"
              className="row-hover group flex items-center gap-3 rounded-xl px-2 py-3"
            >
              <Avatar name={customer.name} size="md" />

              <div className="min-w-0 flex-1">
                <p className="truncate text-[12.5px] font-medium text-ink transition-colors group-hover:text-white">
                  {customer.name}
                </p>
                <p className="mt-0.5 truncate text-[10.5px] text-faint">
                  {customer.company}
                </p>
              </div>

              <div className="hidden w-20 text-right lg:block">
                <p className="tabular text-[11px] font-medium text-muted">
                  {customer.value > 0
                    ? formatCompactRupiah(customer.value)
                    : "—"}
                </p>
                <p className="mt-0.5 text-[9.5px] text-faint">
                  {formatDate(customer.createdAt)}
                </p>
              </div>

              <div className="hidden sm:block">
                <StatusBadge status={customer.status} />
              </div>

              <ArrowUpRight
                size={13}
                className="hidden shrink-0 text-faint/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-muted sm:block"
              />
            </Link>
          </li>
        ))}
      </ul>

      {recent.length === 0 && (
        <div className="flex flex-1 flex-col items-center justify-center py-12 text-center">
          <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-white/[0.03] text-faint">
            <UserPlus size={18} />
          </span>
          <p className="mt-3 text-[12.5px] font-medium text-ink">
            Belum ada customer
          </p>
          <p className="mt-1 text-[11px] text-faint">
            Customer baru akan muncul di sini.
          </p>
        </div>
      )}

      <div className="mt-3 flex items-center justify-between border-t border-line/60 pt-3.5">
        <span className="flex items-center gap-2 text-[10px] text-faint">
          <span className="flex -space-x-1.5">
            {customers.slice(0, 3).map((customer) => (
              <Avatar
                key={customer.id}
                name={customer.name}
                size="xs"
                className="ring-2 ring-[#121110]"
              />
            ))}
          </span>
          Active this week
        </span>
        <span className="tabular text-[10px] text-muted">
          {customers.filter((c) => c.status === "customer").length} customers
        </span>
      </div>
    </section>
  );
}
