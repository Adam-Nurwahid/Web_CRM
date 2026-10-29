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

interface DealFormProps {
  customers: Customer[];
  onSubmit: (data: DealFormData) => void;
  onCancel: () => void;
  defaultStage?: DealStage;
}

export default function DealForm({
  customers,
  onSubmit,
  onCancel,
  defaultStage,
}: DealFormProps) {
  const [values, setValues] = useState<FormValues>({
    title: "",
    customerId: "",
    amount: "",
    stage: defaultStage ?? "new",
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
          className={`input ${errors.title ? "input-error" : ""}`}
          placeholder="Contoh: Lisensi platform tahunan"
          autoFocus
        />
      </Field>

      <Field label="Customer" error={errors.customerId}>
        <select
          value={values.customerId}
          onChange={(e) => setField("customerId", e.target.value)}
          className={`input cursor-pointer pr-8 ${errors.customerId ? "input-error" : ""}`}
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
            placeholder="0"
            className={`input ${errors.amount ? "input-error" : ""}`}
          />
        </Field>
        <Field label="Stage">
          <select
            value={values.stage}
            onChange={(e) => setField("stage", e.target.value as DealStage)}
            className="input cursor-pointer pr-8"
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
          className={`input cursor-pointer ${errors.dueDate ? "input-error" : ""}`}
        />
      </Field>

      <div className="flex flex-col-reverse gap-2 border-t border-line/60 pt-4 sm:flex-row sm:justify-end">
        <button type="button" onClick={onCancel} className="btn btn-secondary">
          Batal
        </button>
        <button type="submit" className="btn btn-primary">
          Tambah deal
        </button>
      </div>
    </form>
  );
}
