import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import Sparkline from "@/components/ui/Sparkline";

type Tone = "accent" | "sage" | "violet" | "gold";

const tones: Record<Tone, { icon: string; line: string; glow: string }> = {
  accent: {
    icon: "border-accent/20 bg-accent/[0.09] text-accent-soft",
    line: "#e08a68",
    glow: "bg-accent/10",
  },
  sage: {
    icon: "border-sage/20 bg-sage/[0.09] text-sage",
    line: "#84bfa9",
    glow: "bg-sage/10",
  },
  violet: {
    icon: "border-violet/20 bg-violet/[0.09] text-violet",
    line: "#a99bf0",
    glow: "bg-violet/10",
  },
  gold: {
    icon: "border-gold/20 bg-gold/[0.09] text-gold",
    line: "#e3b778",
    glow: "bg-gold/10",
  },
};

interface StatCardProps {
  label: string;
  value: string;
  hint: string;
  icon: LucideIcon;
  tone?: Tone;
  trend?: string;
  trendDirection?: "up" | "down" | "flat";
  sparkline?: number[];
}

export default function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = "accent",
  trend,
  trendDirection = "up",
  sparkline,
}: StatCardProps) {
  const palette = tones[tone];
  const TrendIcon =
    trendDirection === "up"
      ? ArrowUpRight
      : trendDirection === "down"
        ? ArrowDownRight
        : Minus;
  const trendClass =
    trendDirection === "up"
      ? "text-sage"
      : trendDirection === "down"
        ? "text-rose"
        : "text-faint";

  return (
    <div className="panel panel-interactive group relative overflow-hidden p-5">
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-10 -top-16 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 ${palette.glow}`}
      />

      <div className="relative flex items-start justify-between gap-3">
        <span className="pt-0.5 text-[11.5px] font-medium text-muted">
          {label}
        </span>
        <span
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border ${palette.icon}`}
        >
          <Icon size={15} strokeWidth={1.7} />
        </span>
      </div>

      <div className="relative mt-4 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="tabular whitespace-nowrap text-[clamp(1.3rem,1.65vw,1.7rem)] font-semibold leading-none tracking-[-0.035em] text-ink">
            {value}
          </p>
          <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1">
            {trend && (
              <span
                className={`inline-flex items-center gap-0.5 text-[10.5px] font-medium ${trendClass}`}
              >
                <TrendIcon size={11} strokeWidth={2} />
                {trend}
              </span>
            )}
            <span className="text-[10.5px] text-faint">{hint}</span>
          </div>
        </div>

        {sparkline && (
          <Sparkline
            values={sparkline}
            color={palette.line}
            className="h-9 w-[72px] shrink-0 opacity-75 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}
      </div>
    </div>
  );
}
