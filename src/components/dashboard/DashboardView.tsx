"use client";

import { Handshake, Target, Users, Wallet } from "lucide-react";
import { useData } from "@/components/providers/DataProvider";
import { getDashboardStats } from "@/lib/stats";
import { formatRupiah } from "@/lib/utils";
import StatCard from "./StatCard";
import RecentCustomers from "./RecentCustomers";
import PipelineByStage from "./PipelineByStage";
import UpcomingDeals from "./UpcomingDeals";
import CopilotBrief from "./CopilotBrief";
import RevenueChart from "./RevenueChart";

export default function DashboardView() {
  const { customers, deals } = useData();
  const stats = getDashboardStats(customers, deals);

  return (
    <div className="mt-7 space-y-5">
      <CopilotBrief
        customers={customers}
        deals={deals}
        pipelineValue={stats.pipelineValue}
        winRate={stats.winRate}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Total customer",
            value: String(stats.totalCustomers),
            hint: "Semua status",
            icon: Users,
            tone: "accent" as const,
            trend: "+12.4%",
            sparkline: [4, 4, 5, 5, 5, 6],
          },
          {
            label: "Total revenue",
            value: formatRupiah(stats.totalRevenue),
            hint: "vs bulan lalu",
            icon: Wallet,
            tone: "sage" as const,
            trend: "+18.2%",
            sparkline: [12, 18, 15, 22, 20, 28],
          },
          {
            label: "Deal aktif",
            value: String(stats.activeDealsCount),
            hint: `${formatRupiah(stats.pipelineValue)} pipeline`,
            icon: Handshake,
            tone: "violet" as const,
            trend: "+2 active",
            sparkline: [3, 4, 3, 5, 4, 4],
          },
          {
            label: "Win rate",
            value: `${stats.winRate}%`,
            hint: "won vs closed deals",
            icon: Target,
            tone: "gold" as const,
            trend: "+4.0 pts",
            sparkline: [38, 42, 40, 46, 44, 50],
          },
        ].map((card, index) => (
          <div
            key={card.label}
            className="fade-up"
            style={{ animationDelay: `${80 + index * 60}ms` }}
          >
            <StatCard {...card} />
          </div>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-12">
        <div className="min-w-0 xl:col-span-8">
          <RevenueChart totalRevenue={stats.totalRevenue} />
        </div>
        <div className="min-w-0 xl:col-span-4">
          <PipelineByStage deals={deals} />
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-12">
        <div className="min-w-0 xl:col-span-7">
          <RecentCustomers customers={customers} />
        </div>
        <div className="min-w-0 xl:col-span-5">
          <UpcomingDeals deals={deals} customers={customers} />
        </div>
      </div>
    </div>
  );
}
