import type { IssueListItemProps } from "../../types/issues";
import { StatusBadge } from "../view/Badge/Badge";
import { Button } from "../view/Button/Button";
import { Pencil, Trash2 } from "lucide-react";

export default function IssueListItem({
  issue,
  onEdit,
  onDelete,
}: IssueListItemProps) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex items-start justify-between gap-3 p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer">
      <div>
        <h3 className="text-sm font-semibold text-slate-900">
          #{issue.id} – {issue.title}
        </h3>
        <p className="text-sm text-slate-700">{issue.description}</p>
        <p className="mt-1 text-[11px] uppercase tracking-wide text-slate-400">
          <StatusBadge status={issue?.status} />· Created{" "}
          {new Date(issue.createdAt).toLocaleString()}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <Button
          type="button"
          variant="secondary"
          className="px-2 py-1 text-xs"
          onClick={() => onEdit(issue)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="danger"
          className="px-2 py-1 text-xs"
          onClick={() => onDelete(issue)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
