import Link from "next/link";
import { Customer } from "@/types";
import { formatDate, getInitials } from "@/lib/utils";
import StatusBadge from "@/components/ui/StatusBadge";

export default function RecentCustomers({
  customers,
}: {
  customers: Customer[];
}) {
  const recent = [...customers]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5);

  return (
    <section className="rounded-xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <h2 className="font-semibold">Customer terbaru</h2>
        <Link
          href="/customers"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          Lihat semua
        </Link>
      </div>

      <ul className="divide-y divide-slate-100">
        {recent.map((c) => (
          <li key={c.id} className="flex items-center gap-4 px-5 py-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
              {getInitials(c.name)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{c.name}</p>
              <p className="truncate text-xs text-slate-500">{c.company}</p>
            </div>
            <div className="hidden text-right sm:block">
              <StatusBadge status={c.status} />
              <p className="mt-1 text-xs text-slate-400">
                {formatDate(c.createdAt)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}