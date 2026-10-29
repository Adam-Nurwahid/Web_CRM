import { Download, Sparkles } from "lucide-react";
import DealsBoard from "@/components/deals/DealsBoard";
import PageHeader from "@/components/ui/PageHeader";

export default function DealsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Revenue pipeline"
        title="Deals"
        description="Pantau setiap peluang paket aqiqah dari first touch sampai closing. Board yang rapi, konteks yang cukup, tanpa distraksi."
        meta={
          <>
            <span className="chip">
              <span className="h-1 w-1 rounded-full bg-accent" />
              6 stages
            </span>
            <span className="chip">Q4 forecast aktif</span>
          </>
        }
        actions={
          <>
            <button type="button" className="btn btn-secondary">
              <Sparkles size={14} className="text-accent-soft" />
              Automate
            </button>
            <button type="button" className="btn btn-secondary">
              <Download size={14} />
              Export
            </button>
          </>
        }
      />

      <DealsBoard />
    </div>
  );
}
