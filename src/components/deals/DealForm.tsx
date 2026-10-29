"use client";

import { useState } from "react";
import { Customer, DealFormData, DealStage } from "@/types";
import { STAGE_CONFIG, STAGE_ORDER } from "@/lib/constants";

interface FormValues {
  title: string;
  customerId: string;
  amount: string;
  stage: DealStage;
  dueDate: string;
}

type Errors = Partial<Record<keyof FormValues, string>>;

function validate(values: FormValues): Errors {
  const errors: Errors = {};

  if (values.title.trim().length < 3) {
    errors.title = "Judul minimal 3 karakter.";
  }
  if (values.customerId === "") {
    errors.customerId = "Pilih customer.";
  }
  if (!(Number(values.amount) > 0)) {
    errors.amount = "Nilai deal harus lebih dari 0.";
  }
  if (values.dueDate === "") {
    errors.dueDate = "Tanggal target wajib diisi.";
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

interface DealFormProps {
  customers: Customer[];
  onSubmit: (data: DealFormData) => void;
  onCancel: () => void;
}

export default function DealForm({ customers, onSubmit, onCancel }: DealFormProps) {
  const [values, setValues] = useState<FormValues>({
    title: "",
    customerId: "",
    amount: "",
    stage: "new",
    dueDate: "",
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
      title: values.title.trim(),
      customerId: values.customerId,
      amount: Number(values.amount),
      stage: values.stage,
      dueDate: values.dueDate,
    });
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <Field label="Judul deal" error={errors.title}>
        <input
          type="text"
          value={values.title}
          onChange={(e) => setField("title", e.target.value)}
          className={inputClass(!!errors.title)}
          autoFocus
        />
      </Field>

      <Field label="Customer" error={errors.customerId}>
        <select
          value={values.customerId}
          onChange={(e) => setField("customerId", e.target.value)}
          className={inputClass(!!errors.customerId)}
        >
          <option value="">Pilih customer...</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} ({c.company})
            </option>
          ))}
        </select>
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nilai deal (Rp)" error={errors.amount}>
          <input
            type="number"
            min={0}
            value={values.amount}
            onChange={(e) => setField("amount", e.target.value)}
            className={inputClass(!!errors.amount)}
          />
        </Field>
        <Field label="Stage">
          <select
            value={values.stage}
            onChange={(e) => setField("stage", e.target.value as DealStage)}
            className={inputClass(false)}
          >
            {STAGE_ORDER.map((s) => (
              <option key={s} value={s}>
                {STAGE_CONFIG[s].label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Target selesai" error={errors.dueDate}>
        <input
          type="date"
          value={values.dueDate}
          onChange={(e) => setField("dueDate", e.target.value)}
          className={inputClass(!!errors.dueDate)}
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
          Tambah deal
        </button>
      </div>
    </form>
  );
}