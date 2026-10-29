"use client";

import { useState } from "react";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { formatCompactRupiah } from "@/lib/utils";

const RANGES = {
  "6M": {
    labels: ["Mei", "Jun", "Jul", "Agu", "Sep", "Okt"],
    values: [18, 24, 21, 31, 27, 38],
    delta: "+18.2%",
    period: "6 bulan terakhir",
  },
  "12M": {
    labels: ["Nov", "Des", "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt"],
    values: [12, 15, 18, 17, 21, 23, 20, 26, 28, 25, 32, 38],
    delta: "+32.6%",
    period: "12 bulan terakhir",
  },
} as const;

type RangeKey = keyof typeof RANGES;

function buildPath(values: number[], height = 100) {
  const max = Math.max(...values) * 1.15;
  const min = Math.min(...values) * 0.55;
  const range = max - min || 1;
  const points = values.map((value, index) => {
    const x = (index / Math.max(values.length - 1, 1)) * 100;
    const y = height - 6 - ((value - min) / range) * (height - 16);
    return [x, y] as const;
  });

  let line = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 1; i < points.length; i++) {
    const [px, py] = points[i - 1];
    const [cx, cy] = points[i];
    const mid = (px + cx) / 2;
    line += ` C ${mid} ${py}, ${mid} ${cy}, ${cx} ${cy}`;
  }

  const area = `${line} L 100 ${height} L 0 ${height} Z`;
  return { line, area, points };
}

export default function RevenueChart({ totalRevenue }: { totalRevenue: number }) {
  const [range, setRange] = useState<RangeKey>("6M");
  const data = RANGES[range];
  const { line, area, points } = buildPath([...data.values]);
  const last = points[points.length - 1];

  return (
    <section className="panel fade-up flex h-full flex-col p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="eyebrow">Revenue overview</p>
          <h2 className="mt-1.5 text-[15px] font-medium text-ink">
            Closed revenue
          </h2>
          <p className="mt-1 text-[11px] text-faint">
            Performa {data.period}
          </p>
        </div>

        <div className="flex items-center rounded-lg border border-line bg-black/25 p-0.5">
          {(Object.keys(RANGES) as RangeKey[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setRange(key)}
              className={`rounded-md px-2.5 py-1 text-[10.5px] font-medium transition-all ${
                range === key
                  ? "bg-white/[0.08] text-ink shadow-sm"
                  : "text-faint hover:text-muted"
              }`}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-end justify-between gap-3">
        <div className="flex items-end gap-3">
          <p className="font-display text-[38px] leading-none tracking-[-0.01em] text-ink">
            {formatCompactRupiah(totalRevenue)}
          </p>
          <span className="mb-1 inline-flex items-center gap-1 rounded-full border border-sage/20 bg-sage/[0.08] px-2 py-0.5 text-[10px] font-medium text-sage">
            <TrendingUp size={11} />
            {data.delta}
          </span>
        </div>

        <div className="flex items-center gap-3 pb-1 text-[10px] text-faint">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-3 rounded-full bg-accent" />
            Revenue
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-px w-3 border-t border-dashed border-muted/60" />
            Target
          </span>
        </div>
      </div>

      <div className="relative mt-6 min-h-[190px] flex-1 sm:min-h-[210px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-full"
        >
          {[0, 25, 50, 75, 100].map((top) => (
            <div
              key={top}
              className="absolute inset-x-0 border-t border-dashed border-white/[0.055]"
              style={{ top: `${top}%` }}
            />
          ))}
          <div
            className="absolute inset-x-0 border-t border-dashed border-accent/20"
            style={{ top: "24%" }}
          >
            <span className="absolute -top-4 right-0 text-[9px] uppercase tracking-[0.14em] text-accent/50">
              target
            </span>
          </div>
        </div>

        <svg
          key={range}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="fade-in absolute inset-0 h-full w-full"
          aria-label={`Grafik revenue ${data.period}`}
          role="img"
        >
          <defs>
            <linearGradient id="revenue-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e08a68" stopOpacity="0.24" />
              <stop offset="65%" stopColor="#e08a68" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#e08a68" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="revenue-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#b9826e" />
              <stop offset="55%" stopColor="#e08a68" />
              <stop offset="100%" stopColor="#f2b79f" />
            </linearGradient>
          </defs>
          <path d={area} fill="url(#revenue-fill)" />
          <path
            d={line}
            fill="none"
            stroke="url(#revenue-line)"
            strokeWidth="1.8"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
          />
        </svg>

        <span
          aria-hidden="true"
          className="absolute z-10 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent bg-canvas shadow-[0_0_0_4px_rgba(224,138,104,0.14)]"
          style={{
            left: `${last[0]}%`,
            top: `${last[1]}%`,
          }}
        />
        <span
          className="absolute z-10 -translate-y-[calc(100%+14px)] translate-x-[-50%] rounded-lg border border-line bg-[#171513] px-2 py-1 text-[9.5px] font-medium text-ink shadow-xl"
          style={{ left: `${last[0]}%`, top: `${last[1]}%` }}
        >
          {formatCompactRupiah(data.values[data.values.length - 1] * 1_000_000)}
        </span>
      </div>

      <div className="mt-3 flex justify-between text-[10px] text-faint">
        {data.labels.map((label, index) => (
          <span
            key={label + index}
            className={
              index === data.labels.length - 1
                ? "font-medium text-accent-soft"
                : ""
            }
          >
            {label}
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-line/60 pt-4">
        <p className="text-[10.5px] text-faint">
          Rata-rata deal{" "}
          <span className="text-muted">{formatCompactRupiah(46_450_000)}</span>
        </p>
        <button
          type="button"
          className="inline-flex items-center gap-1 text-[10.5px] font-medium text-muted transition-colors hover:text-accent-soft"
        >
          Lihat laporan lengkap
          <ArrowUpRight size={12} />
        </button>
      </div>
    </section>
  );
}
