import { CalendarDays, ChevronDown, Trash2 } from "lucide-react";
import { Customer, Deal, DealStage } from "@/types";
import { STAGE_CONFIG, STAGE_ORDER } from "@/lib/constants";
import { formatCompactRupiah, formatDate } from "@/lib/utils";
import Avatar from "@/components/ui/Avatar";

interface DealCardProps {
  deal: Deal;
  customer?: Customer;
  isDragging: boolean;
  onDragStart: () => void;
  onDragEnd: () => void;
  onMove: (stage: DealStage) => void;
  onDelete: () => void;
}

export default function DealCard({
  deal,
  customer,
  isDragging,
  onDragStart,
  onDragEnd,
  onMove,
  onDelete,
}: DealCardProps) {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", deal.id);
        e.dataTransfer.effectAllowed = "move";
        onDragStart();
      }}
      onDragEnd={onDragEnd}
      className={`group cursor-grab rounded-xl border border-line bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-3 shadow-[0_10px_30px_-24px_rgba(0,0,0,0.9)] transition-all duration-200 hover:border-line-strong hover:from-white/[0.065] active:cursor-grabbing ${
        isDragging ? "scale-[0.98] opacity-40" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-start gap-2">
          <Avatar
            name={customer?.name ?? "Unassigned"}
            size="xs"
            className="mt-0.5"
          />
          <div className="min-w-0">
            <p className="line-clamp-2 text-[12px] font-medium leading-snug text-ink">
              {deal.title}
            </p>
            <p className="mt-1 truncate text-[10px] text-faint">
              {customer ? customer.company : "Customer tidak ditemukan"}
            </p>
          </div>
        </div>
        <button
          type="button"
          aria-label={`Hapus deal ${deal.title}`}
          onClick={onDelete}
          className="-mr-1 -mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-md text-faint/50 opacity-0 transition-all hover:bg-rose/10 hover:text-rose focus-visible:opacity-100 group-hover:opacity-100"
        >
          <Trash2 size={12} />
        </button>
      </div>

      <div className="mt-3 flex items-end justify-between gap-2">
        <p className="tabular text-[13px] font-semibold tracking-[-0.01em] text-ink">
          {formatCompactRupiah(deal.amount)}
        </p>
        <span className="inline-flex items-center gap-1 text-[9.5px] text-faint">
          <CalendarDays size={10} />
          {formatDate(deal.dueDate)}
        </span>
      </div>

      <div className="relative mt-3 border-t border-line/60 pt-2.5">
        <span
          className={`pointer-events-none absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full ${STAGE_CONFIG[deal.stage].dotClassName}`}
        />
        <select
          aria-label="Pindahkan ke stage"
          value={deal.stage}
          onChange={(e) => onMove(e.target.value as DealStage)}
          className="w-full cursor-pointer appearance-none rounded-md bg-transparent py-0.5 pl-3 pr-5 text-[10px] font-medium text-faint outline-none transition-colors hover:text-muted focus-visible:text-ink"
        >
          {STAGE_ORDER.map((s) => (
            <option key={s} value={s}>
              {STAGE_CONFIG[s].label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={10}
          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-faint"
        />
      </div>
    </div>
  );
}
