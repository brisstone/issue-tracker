import type { IssueStatus } from "../../../types/issues";

interface StatusBadgeProps {
  status: IssueStatus;
  className?: string;
}

const STATUS_STYLES: Record<
  IssueStatus,
  {
    label: string;
    classes: string;
  }
> = {
  OPEN: {
    label: "Open",
    classes:
      "bg-rose-50 text-rose-700 border border-rose-200",
  },
  IN_PROGRESS: {
    label: "In Progress",
    classes:
      "bg-amber-50 text-amber-700 border border-amber-200",
  },
  DONE: {
    label: "Done",
    classes:
      "bg-emerald-50 text-emerald-700 border border-emerald-200",
  },
};

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const config = STATUS_STYLES[status];

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.classes} ${className}`}
    >
      {config.label}
    </span>
  );
}
