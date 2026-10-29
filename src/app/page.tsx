import { CalendarDays, ChevronDown, Download, Sparkles } from "lucide-react";
import DashboardView from "@/components/dashboard/DashboardView";
import PageHeader from "@/components/ui/PageHeader";

export default function HomePage() {
  return (
    <div>
      <PageHeader
        eyebrow="Home · Overview"
        title="Good morning, Adam"
        description="Ringkasan bisnis Juragan Aqiqah hari ini — pesanan, pipeline, customer, dan momentum revenue dalam satu tampilan yang tenang."
        meta={
          <>
            <span className="chip">
              <span className="h-1 w-1 rounded-full bg-sage shadow-[0_0_8px_rgba(132,191,169,0.7)]" />
              Q4 · 2026
            </span>
            <span className="chip">
              <Sparkles size={11} className="text-accent-soft" />
              AI insights enabled
            </span>
          </>
        }
        actions={
          <>
            <button type="button" className="btn btn-secondary">
              <CalendarDays size={14} />
              Last 30 days
              <ChevronDown size={13} className="text-faint" />
            </button>
            <button type="button" className="btn btn-secondary">
              <Download size={14} />
              Export
            </button>
          </>
        }
      />

      <DashboardView />
    </div>
  );
}
