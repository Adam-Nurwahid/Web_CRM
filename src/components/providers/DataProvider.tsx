"use client";

import { createContext, useContext, useMemo, useState } from "react";
import {
  Customer,
  CustomerFormData,
  Deal,
  DealFormData,
  DealStage,
} from "@/types";
import {
  customers as initialCustomers,
  deals as initialDeals,
} from "@/lib/mock-data";

interface DataContextValue {
  customers: Customer[];
  deals: Deal[];
  addCustomer: (data: CustomerFormData) => void;
  updateCustomer: (id: string, data: CustomerFormData) => void;
  deleteCustomer: (id: string) => void;
  addDeal: (data: DealFormData) => void;
  moveDeal: (id: string, stage: DealStage) => void;
  deleteDeal: (id: string) => void;
}

const DataContext = createContext<DataContextValue | null>(null);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [deals, setDeals] = useState<Deal[]>(initialDeals);

  const value = useMemo<DataContextValue>(
    () => ({
      customers,
      deals,

      addCustomer: (data) =>
        setCustomers((prev) => [
          {
            ...data,
            id: crypto.randomUUID(),
            createdAt: new Date().toLocaleDateString("sv-SE"),
          },
          ...prev,
        ]),

      updateCustomer: (id, data) =>
        setCustomers((prev) =>
          prev.map((c) => (c.id === id ? { ...c, ...data } : c))
        ),

      deleteCustomer: (id) => {
        setCustomers((prev) => prev.filter((c) => c.id !== id));
        setDeals((prev) => prev.filter((d) => d.customerId !== id));
      },

      addDeal: (data) =>
        setDeals((prev) => [{ ...data, id: crypto.randomUUID() }, ...prev]),

      moveDeal: (id, stage) =>
        setDeals((prev) =>
          prev.map((d) => (d.id === id ? { ...d, stage } : d))
        ),

      deleteDeal: (id) => setDeals((prev) => prev.filter((d) => d.id !== id)),
    }),
    [customers, deals]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData harus dipakai di dalam DataProvider");
  return ctx;
}