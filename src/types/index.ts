export type CustomerStatus = "lead" | "prospect" | "customer" | "churned";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: CustomerStatus;
  value: number; // total nilai transaksi (IDR)
  createdAt: string; // ISO date
}

export type DealStage =
  | "new"
  | "contacted"
  | "proposal"
  | "negotiation"
  | "won"
  | "lost";

export interface Deal {
  id: string;
  title: string;
  customerId: string;
  amount: number;
  stage: DealStage;
  dueDate: string; // ISO date
}

export type CustomerFormData = Omit<Customer, "id" | "createdAt">;
export type DealFormData = Omit<Deal, "id">;