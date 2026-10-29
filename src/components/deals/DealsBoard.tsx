"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Deal, DealStage } from "@/types";
import { STAGE_CONFIG, STAGE_ORDER } from "@/lib/constants";
import { formatRupiah } from "@/lib/utils";
import { useData } from "@/components/providers/DataProvider";
import Modal from "@/components/ui/Modal";
import DealCard from "./DealCard";
import DealForm from "./DealForm";

type ModalState =
  | { type: "closed" }
  | { type: "create" }
  | { type: "delete"; deal: Deal };

export default function DealsBoard() {
  const { customers, deals, addDeal, moveDeal, deleteDeal } = useData();
  const [modal, setModal] = useState<ModalState>({ type: "closed" });
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [overStage, setOverStage] = useState<DealStage | null>(null);

  const closeModal = () => setModal({ type: "closed" });

  function handleDrop(stage: DealStage) {
    if (draggingId) moveDeal(draggingId, stage);
    setDraggingId(null);
    setOverStage(null);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {deals.length} deal · seret kartu antar kolom untuk mengubah stage
        </p>
        <button
          type="button"
          onClick={() => setModal({ type: "create" })}
          disabled={customers.length === 0}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus size={16} />
          Tambah deal
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {STAGE_ORDER.map((stage) => {
          const { label, barClassName } = STAGE_CONFIG[stage];
          const items = deals.filter((d) => d.stage === stage);
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
              className={`w-72 shrink-0 rounded-xl p-3 transition-colors ${
                isOver ? "bg-indigo-50 ring-2 ring-indigo-200" : "bg-slate-100/70"
              }`}
            >
              <header className="mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${barClassName}`} />
                  <h2 className="text-sm font-semibold">{label}</h2>
                  <span className="rounded-full bg-white px-2 text-xs text-slate-500">
                    {items.length}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-500">{formatRupiah(total)}</p>
              </header>

              <div className="min-h-24 space-y-3">
                {items.map((deal) => (
                  <DealCard
                    key={deal.id}
                    deal={deal}
                    customer={customers.find((c) => c.id === deal.customerId)}
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
                  <p className="rounded-lg border border-dashed border-slate-300 py-6 text-center text-xs text-slate-400">
                    Belum ada deal
                  </p>
                )}
              </div>
            </section>
          );
        })}
      </div>

      {modal.type === "create" && (
        <Modal title="Tambah deal" onClose={closeModal}>
          <DealForm
            customers={customers}
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
          <p className="text-sm text-slate-600">
            Yakin ingin menghapus deal <strong>{modal.deal.title}</strong>?
          </p>
          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={closeModal}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={() => {
                deleteDeal(modal.deal.id);
                closeModal();
              }}
              className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700"
            >
              Hapus
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}