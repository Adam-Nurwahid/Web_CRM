import { Calendar, Trash2 } from "lucide-react";
import { Customer, Deal, DealStage } from "@/types";
import { STAGE_CONFIG, STAGE_ORDER } from "@/lib/constants";
import { formatDate, formatRupiah } from "@/lib/utils";

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
      className={`cursor-grab rounded-lg border border-slate-200 bg-white p-3 shadow-sm active:cursor-grabbing ${
        isDragging ? "opacity-40" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium leading-snug">{deal.title}</p>
        <button
          type="button"
          aria-label={`Hapus deal ${deal.title}`}
          onClick={onDelete}
          className="shrink-0 rounded p-1 text-slate-300 hover:bg-rose-50 hover:text-rose-600"
        >
          <Trash2 size={14} />
        </button>
      </div>

      <p className="mt-1 text-xs text-slate-500">
        {customer ? `${customer.name} · ${customer.company}` : "Customer tidak ditemukan"}
      </p>

      <p className="mt-3 text-sm font-semibold">{formatRupiah(deal.amount)}</p>

      <div className="mt-2 flex items-center gap-1 text-xs text-slate-400">
        <Calendar size={12} />
        {formatDate(deal.dueDate)}
      </div>

      <select
        aria-label="Pindahkan ke stage"
        value={deal.stage}
        onChange={(e) => onMove(e.target.value as DealStage)}
        className="mt-3 w-full rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-600 outline-none focus:border-indigo-400"
      >
        {STAGE_ORDER.map((s) => (
          <option key={s} value={s}>
            {STAGE_CONFIG[s].label}
          </option>
        ))}
      </select>
    </div>
  );
}