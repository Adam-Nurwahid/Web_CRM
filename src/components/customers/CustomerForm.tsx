"use client";

import { useState } from "react";
import { Customer, CustomerFormData, CustomerStatus } from "@/types";
import { STATUS_CONFIG } from "@/lib/constants";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  company: string;
  status: CustomerStatus;
  value: string;
}

type Errors = Partial<Record<keyof FormValues, string>>;

function validate(values: FormValues): Errors {
  const errors: Errors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Nama minimal 2 karakter.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Format email tidak valid.";
  }
  if (values.company.trim() === "") {
    errors.company = "Perusahaan wajib diisi.";
  }
  if (values.phone.trim() !== "" && !/^[0-9+\-\s]{8,16}$/.test(values.phone.trim())) {
    errors.phone = "Nomor telepon 8-16 karakter, hanya angka, +, atau -.";
  }
  if (values.value !== "" && !(Number(values.value) >= 0)) {
    errors.value = "Nilai transaksi tidak boleh negatif.";
  }

  return errors;
}

const inputClass = (hasError: boolean) =>
  `w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 ${
    hasError
      ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
      : "border-slate-200 focus:border-indigo-400 focus:ring-indigo-100"
  }`;

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-rose-600">{error}</span>}
    </label>
  );
}

interface CustomerFormProps {
  customer?: Customer;
  onSubmit: (data: CustomerFormData) => void;
  onCancel: () => void;
}

export default function CustomerForm({
  customer,
  onSubmit,
  onCancel,
}: CustomerFormProps) {
  const [values, setValues] = useState<FormValues>({
    name: customer?.name ?? "",
    email: customer?.email ?? "",
    phone: customer?.phone ?? "",
    company: customer?.company ?? "",
    status: customer?.status ?? "lead",
    value: customer ? String(customer.value) : "",
  });
  const [errors, setErrors] = useState<Errors>({});

  function setField<K extends keyof FormValues>(key: K, next: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: next }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    onSubmit({
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      company: values.company.trim(),
      status: values.status,
      value: Number(values.value || 0),
    });
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nama" error={errors.name}>
          <input
            type="text"
            value={values.name}
            onChange={(e) => setField("name", e.target.value)}
            className={inputClass(!!errors.name)}
            autoFocus
          />
        </Field>
        <Field label="Perusahaan" error={errors.company}>
          <input
            type="text"
            value={values.company}
            onChange={(e) => setField("company", e.target.value)}
            className={inputClass(!!errors.company)}
          />
        </Field>
      </div>

      <Field label="Email" error={errors.email}>
        <input
          type="email"
          value={values.email}
          onChange={(e) => setField("email", e.target.value)}
          className={inputClass(!!errors.email)}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Telepon" error={errors.phone}>
          <input
            type="tel"
            value={values.phone}
            onChange={(e) => setField("phone", e.target.value)}
            placeholder="0812-0000-0000"
            className={inputClass(!!errors.phone)}
          />
        </Field>
        <Field label="Status">
          <select
            value={values.status}
            onChange={(e) => setField("status", e.target.value as CustomerStatus)}
            className={inputClass(false)}
          >
            {(Object.keys(STATUS_CONFIG) as CustomerStatus[]).map((s) => (
              <option key={s} value={s}>
                {STATUS_CONFIG[s].label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Nilai transaksi (Rp)" error={errors.value}>
        <input
          type="number"
          min={0}
          value={values.value}
          onChange={(e) => setField("value", e.target.value)}
          placeholder="0"
          className={inputClass(!!errors.value)}
        />
      </Field>

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          Batal
        </button>
        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          {customer ? "Simpan perubahan" : "Tambah customer"}
        </button>
      </div>
    </form>
  );
}