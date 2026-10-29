import { Deal } from "@/types";
import { STAGE_CONFIG } from "@/lib/constants";
import { getDealsByStage } from "@/lib/stats";
import { formatRupiah } from "@/lib/utils";

export default function PipelineByStage({ deals }: { deals: Deal[] }) {
  const stages = getDealsByStage(deals);
  const maxCount = Math.max(...stages.map((s) => s.count), 1);

  return (
    <section className="rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 px-5 py-4">
        <h2 className="font-semibold">Pipeline per stage</h2>
      </div>

      <ul className="space-y-4 p-5">
        {stages.map(({ stage, count, amount }) => {
          const { label, barClassName } = STAGE_CONFIG[stage];
          return (
            <li key={stage}>
              <div className="mb-1 flex items-baseline justify-between text-sm">
                <span className="font-medium">{label}</span>
                <span className="text-slate-500">
                  {count} deal · {formatRupiah(amount)}
                </span>
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div
                  className={`h-2 rounded-full ${barClassName}`}
                  style={{ width: `${(count / maxCount) * 100}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}