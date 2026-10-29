import CustomersView from "@/components/customers/CustomersView";

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Customers</h1>
        <p className="mt-1 text-sm text-slate-500">
          Kelola semua lead, prospect, dan customer di satu tempat.
        </p>
      </div>

      <CustomersView />
    </div>
  );
}