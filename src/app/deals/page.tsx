import DealsBoard from "@/components/deals/DealsBoard";

export default function DealsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Deals</h1>
        <p className="mt-1 text-sm text-slate-500">
          Pantau setiap peluang penjualan dari awal sampai closing.
        </p>
      </div>

      <DealsBoard />
    </div>
  );
}