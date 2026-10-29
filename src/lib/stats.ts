import { Customer, Deal, DealStage } from "@/types";
import { STAGE_ORDER } from "./constants";

export function getDashboardStats(customers: Customer[], deals: Deal[]) {
  const totalRevenue = customers.reduce((sum, c) => sum + c.value, 0);

  const activeDeals = deals.filter(
    (d) => d.stage !== "won" && d.stage !== "lost"
  );
  const pipelineValue = activeDeals.reduce((sum, d) => sum + d.amount, 0);

  const won = deals.filter((d) => d.stage === "won").length;
  const lost = deals.filter((d) => d.stage === "lost").length;
  const closed = won + lost;
  const winRate = closed === 0 ? 0 : Math.round((won / closed) * 100);

  return {
    totalCustomers: customers.length,
    totalRevenue,
    activeDealsCount: activeDeals.length,
    pipelineValue,
    winRate,
  };
}

export function getDealsByStage(deals: Deal[]) {
  return STAGE_ORDER.map((stage: DealStage) => {
    const items = deals.filter((d) => d.stage === stage);
    return {
      stage,
      count: items.length,
      amount: items.reduce((sum, d) => sum + d.amount, 0),
    };
  });
}