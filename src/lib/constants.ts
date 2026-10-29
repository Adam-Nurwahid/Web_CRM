import { CustomerStatus, DealStage } from "@/types";

export const STATUS_CONFIG: Record<
  CustomerStatus,
  { label: string; className: string; dotClassName: string }
> = {
  lead: {
    label: "Lead",
    className: "border-slate-400/15 bg-slate-400/[0.08] text-slate-300",
    dotClassName: "bg-slate-400",
  },
  prospect: {
    label: "Prospect",
    className: "border-gold/20 bg-gold/[0.09] text-gold",
    dotClassName: "bg-gold",
  },
  customer: {
    label: "Customer",
    className: "border-sage/20 bg-sage/[0.09] text-sage",
    dotClassName: "bg-sage",
  },
  churned: {
    label: "Churned",
    className: "border-rose/20 bg-rose/[0.09] text-rose",
    dotClassName: "bg-rose",
  },
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
  {
    label: string;
    barClassName: string;
    chipClassName: string;
    dotClassName: string;
  }
> = {
  new: {
    label: "New",
    barClassName: "bg-gradient-to-r from-[#93a0b4] to-[#6f7d92]",
    chipClassName: "border-[#93a0b4]/20 bg-[#93a0b4]/10 text-[#b7c1cf]",
    dotClassName: "bg-[#93a0b4]",
  },
  contacted: {
    label: "Contacted",
    barClassName: "bg-gradient-to-r from-[#8cc5ef] to-[#5a91bd]",
    chipClassName: "border-[#8cc5ef]/20 bg-[#8cc5ef]/10 text-[#a8d5f5]",
    dotClassName: "bg-[#8cc5ef]",
  },
  proposal: {
    label: "Proposal",
    barClassName: "bg-gradient-to-r from-[#c0b4f7] to-[#8b7cd4]",
    chipClassName: "border-[#c0b4f7]/20 bg-[#c0b4f7]/10 text-[#cfc6fa]",
    dotClassName: "bg-[#c0b4f7]",
  },
  negotiation: {
    label: "Negotiation",
    barClassName: "bg-gradient-to-r from-[#ecc78c] to-[#c79a52]",
    chipClassName: "border-[#ecc78c]/20 bg-[#ecc78c]/10 text-[#ecc78c]",
    dotClassName: "bg-[#ecc78c]",
  },
  won: {
    label: "Won",
    barClassName: "bg-gradient-to-r from-[#a3dcc7] to-[#5f9f89]",
    chipClassName: "border-[#a3dcc7]/20 bg-[#a3dcc7]/10 text-[#a3dcc7]",
    dotClassName: "bg-[#a3dcc7]",
  },
  lost: {
    label: "Lost",
    barClassName: "bg-gradient-to-r from-[#eba0a6] to-[#b9656d]",
    chipClassName: "border-[#eba0a6]/20 bg-[#eba0a6]/10 text-[#eba0a6]",
    dotClassName: "bg-[#eba0a6]",
  },
};
