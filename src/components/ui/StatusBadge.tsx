import { CustomerStatus } from "@/types";
import { STATUS_CONFIG } from "@/lib/constants";

export default function StatusBadge({ status }: { status: CustomerStatus }) {
  const { label, className } = STATUS_CONFIG[status];

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}
    >
      {label}
    </span>
  );
}