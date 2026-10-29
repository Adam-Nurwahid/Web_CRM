"use client";

import { Users, Wallet, Handshake, Target } from "lucide-react";
import { useData } from "@/components/providers/DataProvider";
import { getDashboardStats } from "@/lib/stats";
import { formatRupiah } from "@/lib/utils";
import StatCard from "./StatCard";
import RecentCustomers from "./RecentCustomers";
import PipelineByStage from "./PipelineByStage";

export default function DashboardView() {
  const { customers, deals } = useData();
  const stats = getDashboardStats(customers, deals);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total customer"
          value={String(stats.totalCustomers)}
          hint="Semua status"
          icon={Users}
        />
        <StatCard
          label="Total revenue"
          value={formatRupiah(stats.totalRevenue)}
          hint="Akumulasi nilai transaksi"
          icon={Wallet}
        />
        <StatCard
          label="Deal aktif"
          value={String(stats.activeDealsCount)}
          hint={`Nilai pipeline ${formatRupiah(stats.pipelineValue)}`}
          icon={Handshake}
        />
        <StatCard
          label="Win rate"
          value={`${stats.winRate}%`}
          hint="Won dibanding won + lost"
          icon={Target}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentCustomers customers={customers} />
        </div>
        <PipelineByStage deals={deals} />
      </div>
    </>
  );
}