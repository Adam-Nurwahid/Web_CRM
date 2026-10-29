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

function Field({
  label,
  error,
  children,
  hint,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between gap-2">
        <span className="text-[11px] font-medium text-muted">{label}</span>
        {hint && <span className="text-[9.5px] text-faint">{hint}</span>}
      </span>
      {children}
      {error && (
        <span className="mt-1 block text-[10px] text-rose">{error}</span>
      )}
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
        <Field label="Nama lengkap" error={errors.name}>
          <input
            type="text"
            value={values.name}
            onChange={(e) => setField("name", e.target.value)}
            className={`input ${errors.name ? "input-error" : ""}`}
            autoFocus
          />
        </Field>
        <Field label="Perusahaan" error={errors.company}>
          <input
            type="text"
            value={values.company}
            onChange={(e) => setField("company", e.target.value)}
            className={`input ${errors.company ? "input-error" : ""}`}
          />
        </Field>
      </div>

      <Field label="Email" error={errors.email}>
        <input
          type="email"
          value={values.email}
          onChange={(e) => setField("email", e.target.value)}
          className={`input ${errors.email ? "input-error" : ""}`}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Telepon" error={errors.phone} hint="Opsional">
          <input
            type="tel"
            value={values.phone}
            onChange={(e) => setField("phone", e.target.value)}
            placeholder="0812-0000-0000"
            className={`input ${errors.phone ? "input-error" : ""}`}
          />
        </Field>
        <Field label="Status">
          <select
            value={values.status}
            onChange={(e) => setField("status", e.target.value as CustomerStatus)}
            className="input cursor-pointer pr-8"
          >
            {(Object.keys(STATUS_CONFIG) as CustomerStatus[]).map((s) => (
              <option key={s} value={s}>
                {STATUS_CONFIG[s].label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Nilai transaksi (Rp)" error={errors.value} hint="Lifetime value">
        <input
          type="number"
          min={0}
          value={values.value}
          onChange={(e) => setField("value", e.target.value)}
          placeholder="0"
          className={`input ${errors.value ? "input-error" : ""}`}
        />
      </Field>

      <div className="flex flex-col-reverse gap-2 border-t border-line/60 pt-4 sm:flex-row sm:justify-end">
        <button type="button" onClick={onCancel} className="btn btn-secondary">
          Batal
        </button>
        <button type="submit" className="btn btn-primary">
          {customer ? "Simpan perubahan" : "Tambah customer"}
        </button>
      </div>
    </form>
  );
}
