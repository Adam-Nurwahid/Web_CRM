import DashboardView from "@/components/dashboard/DashboardView";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Ringkasan aktivitas penjualan kamu.
        </p>
      </div>

      <DashboardView />
    </div>
  );
}