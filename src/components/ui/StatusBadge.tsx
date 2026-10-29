import { CustomerStatus } from "@/types";
import { STATUS_CONFIG } from "@/lib/constants";

export default function StatusBadge({ status }: { status: CustomerStatus }) {
  const { label, className, dotClassName } = STATUS_CONFIG[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10.5px] font-medium ${className}`}
    >
      <span className={`h-1 w-1 rounded-full ${dotClassName}`} />
      {label}
    </span>
  );
}
