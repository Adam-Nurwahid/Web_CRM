import { getInitials } from "@/lib/utils";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
type AvatarTone = "auto" | "accent" | "sage" | "violet";

const tones = [
  "from-[#e08a68] to-[#8f4a34] text-[#25110a]",
  "from-[#84bfa9] to-[#35695a] text-[#0c211b]",
  "from-[#a99bf0] to-[#5d5099] text-[#140f2c]",
  "from-[#e3b778] to-[#8d642e] text-[#241809]",
  "from-[#d990a0] to-[#8c4354] text-[#2a0d13]",
  "from-[#8fb3d9] to-[#3f6287] text-[#0a1826]",
];

const fixedTones: Record<Exclude<AvatarTone, "auto">, string> = {
  accent: "from-[#f0b297] to-[#b9583d] text-[#2a120a]",
  sage: "from-[#a6d9c7] to-[#4a7f6f] text-[#0c211b]",
  violet: "from-[#c3b8f7] to-[#7263b8] text-[#140f2c]",
};

const sizes: Record<AvatarSize, string> = {
  xs: "h-6 w-6 text-[9px]",
  sm: "h-9 w-9 text-[10.5px]",
  md: "h-10 w-10 text-[11px]",
  lg: "h-12 w-12 text-[13px]",
  xl: "h-16 w-16 text-lg",
};

function hashName(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }
  return hash;
}

interface AvatarProps {
  name: string;
  size?: AvatarSize;
  tone?: AvatarTone;
  className?: string;
}

export default function Avatar({
  name,
  size = "md",
  tone = "auto",
  className = "",
}: AvatarProps) {
  const gradient =
    tone === "auto" ? tones[hashName(name) % tones.length] : fixedTones[tone];

  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-semibold tracking-wide ring-1 ring-inset ring-white/15 ${
        sizes[size]
      } ${gradient} ${className}`}
    >
      {getInitials(name) || "?"}
    </span>
  );
}
