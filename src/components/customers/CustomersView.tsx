"use client";

import { useMemo, useState } from "react";
import { Pencil, Plus, Search, SearchX, Trash2 } from "lucide-react";
import { Customer, CustomerFormData, CustomerStatus } from "@/types";
import { STATUS_CONFIG } from "@/lib/constants";
import { formatDate, formatRupiah, getInitials } from "@/lib/utils";
import { useData } from "@/components/providers/DataProvider";
import StatusBadge from "@/components/ui/StatusBadge";
import Modal from "@/components/ui/Modal";
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

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="relative w-full max-w-sm">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari nama, email, atau perusahaan..."
              className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <button
            type="button"
            onClick={() => setModal({ type: "create" })}
            className="flex shrink-0 items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Tambah customer</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {FILTERS.map(({ value, label }) => {
            const isActive = status === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setStatus(value)}
                className={`rounded-full border px-3 py-1 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-indigo-600 bg-indigo-600 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {label}
                <span
                  className={`ml-1.5 text-xs ${
                    isActive ? "text-indigo-100" : "text-slate-400"
                  }`}
                >
                  {counts[value]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tabel */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center px-6 py-16 text-center">
            <SearchX size={32} className="text-slate-300" />
            <p className="mt-3 font-medium">Tidak ada customer yang cocok</p>
            <p className="mt-1 text-sm text-slate-500">
              Coba ubah kata kunci atau filter status.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-medium">Customer</th>
                  <th className="hidden px-5 py-3 font-medium md:table-cell">
                    Kontak
                  </th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="hidden px-5 py-3 text-right font-medium sm:table-cell">
                    Nilai transaksi
                  </th>
                  <th className="hidden px-5 py-3 font-medium lg:table-cell">
                    Bergabung
                  </th>
                  <th className="px-5 py-3 text-right font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          {getInitials(c.name)}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-medium">{c.name}</p>
                          <p className="truncate text-xs text-slate-500">
                            {c.company}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-5 py-3 md:table-cell">
                      <p>{c.email}</p>
                      <p className="text-xs text-slate-500">{c.phone || "-"}</p>
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge status={c.status} />
                    </td>
                    <td className="hidden px-5 py-3 text-right sm:table-cell">
                      {c.value > 0 ? formatRupiah(c.value) : "-"}
                    </td>
                    <td className="hidden px-5 py-3 text-slate-500 lg:table-cell">
                      {formatDate(c.createdAt)}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-1">
                        <button
                          type="button"
                          aria-label={`Edit ${c.name}`}
                          onClick={() => setModal({ type: "edit", customer: c })}
                          className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          type="button"
                          aria-label={`Hapus ${c.name}`}
                          onClick={() => setModal({ type: "delete", customer: c })}
                          className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="text-xs text-slate-400">
        Menampilkan {filtered.length} dari {customers.length} customer
      </p>

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
    <p className="text-sm text-slate-600">
      Yakin ingin menghapus <strong>{modal.customer.name}</strong> (
      {modal.customer.company})? Data ini tidak bisa dikembalikan.
    </p>
    {deals.some((d) => d.customerId === modal.customer.id) && (
      <p className="mt-2 text-sm text-rose-600">
        {deals.filter((d) => d.customerId === modal.customer.id).length} deal
        milik customer ini ikut terhapus.
      </p>
    )}
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
        onClick={() => handleDelete(modal.customer.id)}
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