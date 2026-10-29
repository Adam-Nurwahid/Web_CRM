import { CustomerStatus, DealStage } from "@/types";

export const STATUS_CONFIG: Record<
  CustomerStatus,
  { label: string; className: string }
> = {
  lead: { label: "Lead", className: "bg-slate-100 text-slate-700" },
  prospect: { label: "Prospect", className: "bg-amber-50 text-amber-700" },
  customer: { label: "Customer", className: "bg-emerald-50 text-emerald-700" },
  churned: { label: "Churned", className: "bg-rose-50 text-rose-700" },
};

export const STAGE_ORDER: DealStage[] = [
  "new",
  "contacted",
  "proposal",
  "negotiation",
  "won",
  "lost",
];

export const STAGE_CONFIG: Record<
  DealStage,
  { label: string; barClassName: string }
> = {
  new: { label: "New", barClassName: "bg-slate-400" },
  contacted: { label: "Contacted", barClassName: "bg-sky-500" },
  proposal: { label: "Proposal", barClassName: "bg-indigo-500" },
  negotiation: { label: "Negotiation", barClassName: "bg-amber-500" },
  won: { label: "Won", barClassName: "bg-emerald-500" },
  lost: { label: "Lost", barClassName: "bg-rose-500" },
};