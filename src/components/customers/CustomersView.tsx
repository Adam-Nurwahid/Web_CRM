"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Plus,
  Search,
  SearchX,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";
import { Customer, CustomerFormData, CustomerStatus } from "@/types";
import { STATUS_CONFIG } from "@/lib/constants";
import { formatCompactRupiah, formatDate } from "@/lib/utils";
import { useData } from "@/components/providers/DataProvider";
import StatusBadge from "@/components/ui/StatusBadge";
import Modal from "@/components/ui/Modal";
import Avatar from "@/components/ui/Avatar";
import CustomerForm from "./CustomerForm";

type StatusFilter = "all" | CustomerStatus;

type ModalState =
  | { type: "closed" }
  | { type: "create" }
  | { type: "edit"; customer: Customer }
  | { type: "delete"; customer: Customer };

const FILTERS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "Semua" },
  ...(Object.keys(STATUS_CONFIG) as CustomerStatus[]).map((status) => ({
    value: status,
    label: STATUS_CONFIG[status].label,
  })),
];

export default function CustomersView() {
  const { customers, deals, addCustomer, updateCustomer, deleteCustomer } =
    useData();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [modal, setModal] = useState<ModalState>({ type: "closed" });

  const closeModal = () => setModal({ type: "closed" });

  function handleCreate(data: CustomerFormData) {
    addCustomer(data);
    closeModal();
  }

  function handleUpdate(id: string, data: CustomerFormData) {
    updateCustomer(id, data);
    closeModal();
  }

  function handleDelete(id: string) {
    deleteCustomer(id);
    closeModal();
  }

  const counts = useMemo(() => {
    const result: Record<StatusFilter, number> = {
      all: customers.length,
      lead: 0,
      prospect: 0,
      customer: 0,
      churned: 0,
    };
    customers.forEach((c) => result[c.status]++);
    return result;
  }, [customers]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return customers
      .filter((c) => status === "all" || c.status === status)
      .filter(
        (c) =>
          q === "" ||
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.company.toLowerCase().includes(q)
      )
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [customers, query, status]);

  const isFiltered = query.trim() !== "" || status !== "all";

  return (
    <div className="mt-7 space-y-4">
      <div className="panel fade-up overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-col gap-3 border-b border-line/60 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-[340px]">
            <Search
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari nama, email, atau perusahaan..."
              className="input !pl-9"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button type="button" className="btn btn-secondary">
              <SlidersHorizontal size={14} />
              Filter
              <span className="ml-0.5 rounded-md bg-white/[0.06] px-1.5 py-0.5 text-[9px] text-faint">
                2
              </span>
            </button>
            <button
              type="button"
              onClick={() => setModal({ type: "create" })}
              className="btn btn-primary"
            >
              <Plus size={15} strokeWidth={2.2} />
              Tambah customer
            </button>
          </div>
        </div>

        {/* Status tabs */}
        <div className="flex items-center gap-2 overflow-x-auto border-b border-line/60 px-4 py-2.5 sm:px-5">
          <div className="flex items-center rounded-lg border border-line bg-black/25 p-0.5">
            {FILTERS.map(({ value, label }) => {
              const isActive = status === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setStatus(value)}
                  className={`flex items-center gap-1.5 whitespace-nowrap rounded-md px-2.5 py-1.5 text-[11px] font-medium transition-all ${
                    isActive
                      ? "bg-white/[0.08] text-ink shadow-sm"
                      : "text-faint hover:bg-white/[0.03] hover:text-muted"
                  }`}
                >
                  {label}
                  <span
                    className={`tabular rounded px-1 text-[9px] ${
                      isActive
                        ? "bg-accent/15 text-accent-soft"
                        : "bg-white/[0.04] text-faint"
                    }`}
                  >
                    {counts[value]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center px-6 py-20 text-center">
            <span className="relative grid h-14 w-14 place-items-center rounded-2xl border border-line bg-white/[0.03] text-faint">
              <span className="absolute inset-0 rounded-2xl bg-accent/[0.06] blur-xl" />
              <SearchX size={22} className="relative" />
            </span>
            <p className="mt-4 text-[14px] font-medium text-ink">
              Tidak ada customer yang cocok
            </p>
            <p className="mt-1.5 max-w-xs text-[11.5px] leading-relaxed text-faint">
              Coba ubah kata kunci atau filter status untuk menemukan customer
              yang kamu cari.
            </p>
            {isFiltered && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setStatus("all");
                }}
                className="btn btn-secondary mt-4"
              >
                Reset filter
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left">
              <thead>
                <tr className="border-b border-line/60 text-[9.5px] uppercase tracking-[0.14em] text-faint">
                  <th className="px-5 py-3 font-medium">
                    <span className="inline-flex items-center gap-1">
                      Customer
                      <ArrowUpDown size={10} className="text-faint/60" />
                    </span>
                  </th>
                  <th className="px-5 py-3 font-medium">Kontak</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 text-right font-medium">
                    Nilai transaksi
                  </th>
                  <th className="px-5 py-3 font-medium">Bergabung</th>
                  <th className="px-5 py-3 text-right font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.045]">
                {filtered.map((c) => (
                  <tr
                    key={c.id}
                    className="row-hover group transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <Avatar name={c.name} size="md" />
                        <div className="min-w-0">
                          <p className="truncate text-[12.5px] font-medium text-ink">
                            {c.name}
                          </p>
                          <p className="mt-0.5 truncate text-[10.5px] text-faint">
                            {c.company}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-[11.5px] text-muted">{c.email}</p>
                      <p className="mt-0.5 text-[10.5px] text-faint">
                        {c.phone || "—"}
                      </p>
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusBadge status={c.status} />
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <span className="tabular text-[11.5px] font-medium text-ink">
                        {c.value > 0 ? formatCompactRupiah(c.value) : "—"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-[11px] text-faint">
                      {formatDate(c.createdAt)}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex justify-end gap-0.5 opacity-60 transition-opacity group-hover:opacity-100">
                        <button
                          type="button"
                          aria-label={`Edit ${c.name}`}
                          onClick={() => setModal({ type: "edit", customer: c })}
                          className="grid h-7 w-7 place-items-center rounded-md text-faint transition-colors hover:bg-white/[0.06] hover:text-ink"
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          type="button"
                          aria-label={`Hapus ${c.name}`}
                          onClick={() =>
                            setModal({ type: "delete", customer: c })
                          }
                          className="grid h-7 w-7 place-items-center rounded-md text-faint transition-colors hover:bg-rose/10 hover:text-rose"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex flex-col gap-3 border-t border-line/60 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <p className="text-[10.5px] text-faint">
            Menampilkan{" "}
            <span className="font-medium text-muted">{filtered.length}</span>{" "}
            dari{" "}
            <span className="font-medium text-muted">{customers.length}</span>{" "}
            customer
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-faint">Rows per page · 10</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Halaman sebelumnya"
                disabled
                className="grid h-7 w-7 place-items-center rounded-md border border-line text-faint disabled:opacity-40"
              >
                <ChevronLeft size={13} />
              </button>
              <span className="grid h-7 w-7 place-items-center rounded-md border border-accent/25 bg-accent/10 text-[10px] font-medium text-accent-soft">
                1
              </span>
              <button
                type="button"
                aria-label="Halaman berikutnya"
                disabled
                className="grid h-7 w-7 place-items-center rounded-md border border-line text-faint disabled:opacity-40"
              >
                <ChevronRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modal.type === "create" && (
        <Modal title="Tambah customer" onClose={closeModal}>
          <CustomerForm onSubmit={handleCreate} onCancel={closeModal} />
        </Modal>
      )}

      {modal.type === "edit" && (
        <Modal title="Edit customer" onClose={closeModal}>
          <CustomerForm
            customer={modal.customer}
            onSubmit={(data) => handleUpdate(modal.customer.id, data)}
            onCancel={closeModal}
          />
        </Modal>
      )}

      {modal.type === "delete" && (
        <Modal title="Hapus customer" onClose={closeModal}>
          <p className="text-[12.5px] leading-relaxed text-muted">
            Yakin ingin menghapus{" "}
            <strong className="font-medium text-ink">
              {modal.customer.name}
            </strong>{" "}
            ({modal.customer.company})? Data ini tidak bisa dikembalikan.
          </p>
          {deals.some((d) => d.customerId === modal.customer.id) && (
            <p className="mt-2 rounded-lg border border-rose/20 bg-rose/[0.06] px-3 py-2 text-[11.5px] text-rose">
              {deals.filter((d) => d.customerId === modal.customer.id).length}{" "}
              deal milik customer ini ikut terhapus.
            </p>
          )}
          <div className="mt-6 flex justify-end gap-2">
            <button type="button" onClick={closeModal} className="btn btn-secondary">
              Batal
            </button>
            <button
              type="button"
              onClick={() => handleDelete(modal.customer.id)}
              className="btn btn-danger"
            >
              Hapus customer
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
