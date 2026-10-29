"use client";

import { useMemo, useState } from "react";
import {
  Handshake,
  Plus,
  Search,
  SlidersHorizontal,
  Target,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Deal, DealStage } from "@/types";
import { STAGE_CONFIG, STAGE_ORDER } from "@/lib/constants";
import { getDashboardStats } from "@/lib/stats";
import { formatCompactRupiah } from "@/lib/utils";
import { useData } from "@/components/providers/DataProvider";
import Modal from "@/components/ui/Modal";
import DealCard from "./DealCard";
import DealForm from "./DealForm";

type ModalState =
  | { type: "closed" }
  | { type: "create"; stage?: DealStage }
  | { type: "delete"; deal: Deal };

export default function DealsBoard() {
  const { customers, deals, addDeal, moveDeal, deleteDeal } = useData();
  const [modal, setModal] = useState<ModalState>({ type: "closed" });
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [overStage, setOverStage] = useState<DealStage | null>(null);
  const [query, setQuery] = useState("");

  const closeModal = () => setModal({ type: "closed" });
  const stats = getDashboardStats(customers, deals);
  const wonValue = deals
    .filter((deal) => deal.stage === "won")
    .reduce((sum, deal) => sum + deal.amount, 0);

  const filteredDeals = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return deals;

    return deals.filter((deal) => {
      const customer = customers.find((c) => c.id === deal.customerId);
      return (
        deal.title.toLowerCase().includes(q) ||
        customer?.name.toLowerCase().includes(q) ||
        customer?.company.toLowerCase().includes(q)
      );
    });
  }, [customers, deals, query]);

  function handleDrop(stage: DealStage) {
    if (draggingId) moveDeal(draggingId, stage);
    setDraggingId(null);
    setOverStage(null);
  }

  const metrics = [
    {
      label: "Pipeline value",
      value: formatCompactRupiah(stats.pipelineValue),
      hint: `${stats.activeDealsCount} active deals`,
      icon: Wallet,
      className: "border-accent/20 bg-accent/[0.08] text-accent-soft",
    },
    {
      label: "Revenue won",
      value: formatCompactRupiah(wonValue),
      hint: "Closed this quarter",
      icon: TrendingUp,
      className: "border-sage/20 bg-sage/[0.08] text-sage",
    },
    {
      label: "Total deals",
      value: String(deals.length),
      hint: "Across 6 stages",
      icon: Handshake,
      className: "border-violet/20 bg-violet/[0.08] text-violet",
    },
    {
      label: "Win rate",
      value: `${stats.winRate}%`,
      hint: "Won vs closed",
      icon: Target,
      className: "border-gold/20 bg-gold/[0.08] text-gold",
    },
  ];

  return (
    <div className="mt-7 space-y-5">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {metrics.map(({ label, value, hint, icon: Icon, className }, index) => (
          <div
            key={label}
            className="panel fade-up flex items-center justify-between gap-3 p-4"
            style={{ animationDelay: `${60 + index * 50}ms` }}
          >
            <div className="min-w-0">
              <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-faint">
                {label}
              </p>
              <p className="tabular mt-2 text-[20px] font-semibold leading-none tracking-[-0.03em] text-ink">
                {value}
              </p>
              <p className="mt-1.5 truncate text-[10px] text-faint">{hint}</p>
            </div>
            <span
              className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border ${className}`}
            >
              <Icon size={14} strokeWidth={1.7} />
            </span>
          </div>
        ))}
      </div>

      <div className="panel fade-up overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-line/60 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[14px] font-medium text-ink">Pipeline board</h2>
              <span className="chip !py-0.5 !text-[9.5px]">
                {deals.length} deals
              </span>
            </div>
            <p className="mt-1 text-[10.5px] text-faint">
              Seret kartu antar kolom untuk mengubah stage.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-[240px]">
              <Search
                size={14}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari deal atau customer..."
                className="input h-9 !pl-8 text-[11.5px]"
              />
            </div>
            <button type="button" className="btn btn-secondary h-9">
              <SlidersHorizontal size={13} />
              Filter
            </button>
            <button
              type="button"
              onClick={() => setModal({ type: "create" })}
              disabled={customers.length === 0}
              className="btn btn-primary h-9"
            >
              <Plus size={14} strokeWidth={2.2} />
              Tambah deal
            </button>
          </div>
        </div>

        <div className="overflow-x-auto p-4 sm:p-5">
          <div className="flex min-w-max gap-3">
            {STAGE_ORDER.map((stage) => {
              const { label, barClassName, dotClassName } = STAGE_CONFIG[stage];
              const items = filteredDeals.filter((d) => d.stage === stage);
              const total = items.reduce((sum, d) => sum + d.amount, 0);
              const isOver = overStage === stage;

              return (
                <section
                  key={stage}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setOverStage(stage);
                  }}
                  onDragLeave={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                      setOverStage(null);
                    }
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    handleDrop(stage);
                  }}
                  className={`relative w-[244px] shrink-0 rounded-xl border p-2.5 transition-all duration-200 ${
                    isOver
                      ? "border-accent/40 bg-accent/[0.05] shadow-[inset_0_0_0_1px_rgba(224,138,104,0.12)]"
                      : "border-line/55 bg-black/20"
                  }`}
                >
                  <div
                    className={`absolute inset-x-3 top-0 h-px rounded-full ${barClassName} opacity-60`}
                  />

                  <header className="px-1 pb-2.5 pt-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex min-w-0 items-center gap-2">
                        <span
                          className={`h-1.5 w-1.5 shrink-0 rounded-full ${dotClassName}`}
                        />
                        <h3 className="truncate text-[11.5px] font-medium text-ink">
                          {label}
                        </h3>
                        <span className="rounded bg-white/[0.05] px-1.5 py-0.5 text-[9px] text-faint">
                          {items.length}
                        </span>
                      </div>
                      <button
                        type="button"
                        aria-label={`Tambah deal di ${label}`}
                        onClick={() => setModal({ type: "create", stage })}
                        className="grid h-6 w-6 place-items-center rounded-md text-faint/60 transition-colors hover:bg-white/[0.06] hover:text-ink"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                    <p className="tabular mt-1.5 text-[10.5px] text-faint">
                      {total > 0 ? formatCompactRupiah(total) : "Belum ada nilai"}
                    </p>
                  </header>

                  <div className="min-h-[140px] space-y-2">
                    {items.map((deal) => (
                      <DealCard
                        key={deal.id}
                        deal={deal}
                        customer={customers.find(
                          (c) => c.id === deal.customerId
                        )}
                        isDragging={draggingId === deal.id}
                        onDragStart={() => setDraggingId(deal.id)}
                        onDragEnd={() => {
                          setDraggingId(null);
                          setOverStage(null);
                        }}
                        onMove={(next) => moveDeal(deal.id, next)}
                        onDelete={() => setModal({ type: "delete", deal })}
                      />
                    ))}

                    {items.length === 0 && (
                      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-line py-7 text-center">
                        <span className="text-[9.5px] text-faint">
                          {query ? "Tidak ada hasil" : "Belum ada deal"}
                        </span>
                        <button
                          type="button"
                          onClick={() => setModal({ type: "create", stage })}
                          className="mt-1.5 text-[9.5px] font-medium text-muted transition-colors hover:text-accent-soft"
                        >
                          + Tambah deal
                        </button>
                      </div>
                    )}
                  </div>
                </section>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-line/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <p className="text-[10.5px] text-faint">
            Menampilkan{" "}
            <span className="font-medium text-muted">
              {filteredDeals.length}
            </span>{" "}
            dari <span className="font-medium text-muted">{deals.length}</span>{" "}
            deal
          </p>
          <div className="flex items-center gap-4 text-[10px] text-faint">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-sage" />
              Drag & drop aktif
            </span>
            <span>Board view</span>
          </div>
        </div>
      </div>

      {modal.type === "create" && (
        <Modal title="Tambah deal" onClose={closeModal}>
          <DealForm
            customers={customers}
            defaultStage={modal.stage}
            onSubmit={(data) => {
              addDeal(data);
              closeModal();
            }}
            onCancel={closeModal}
          />
        </Modal>
      )}

      {modal.type === "delete" && (
        <Modal title="Hapus deal" onClose={closeModal}>
          <p className="text-[12.5px] leading-relaxed text-muted">
            Yakin ingin menghapus deal{" "}
            <strong className="font-medium text-ink">
              {modal.deal.title}
            </strong>
            ? Tindakan ini tidak bisa dibatalkan.
          </p>
          <div className="mt-6 flex justify-end gap-2">
            <button type="button" onClick={closeModal} className="btn btn-secondary">
              Batal
            </button>
            <button
              type="button"
              onClick={() => {
                deleteDeal(modal.deal.id);
                closeModal();
              }}
              className="btn btn-danger"
            >
              Hapus deal
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
