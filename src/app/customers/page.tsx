import { Download, SlidersHorizontal } from "lucide-react";
import CustomersView from "@/components/customers/CustomersView";
import PageHeader from "@/components/ui/PageHeader";

export default function CustomersPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Relationships"
        title="Customers"
        description="Satu tempat untuk setiap calon customer, keluarga, reseller, dan mitra aqiqah. Kelola relasi dengan konteks yang jelas."
        meta={
          <>
            <span className="chip">
              <span className="h-1 w-1 rounded-full bg-sage" />
              Data tersinkron
            </span>
            <span className="chip">4 segmen</span>
          </>
        }
        actions={
          <>
            <button type="button" className="btn btn-secondary">
              <SlidersHorizontal size={14} />
              Segments
            </button>
            <button type="button" className="btn btn-secondary">
              <Download size={14} />
              Export
            </button>
          </>
        }
      />

      <CustomersView />
    </div>
  );
}
