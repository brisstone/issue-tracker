import type { IssueListItemProps } from "../../types/issues";
import { Button } from "../view/Button/Button";

export default function IssueListItem({
  issue,
  onEdit,
  onDelete,
}: IssueListItemProps) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <h3 className="text-sm font-semibold text-slate-900">
          #{issue.id} – {issue.title}
        </h3>
        <p className="text-sm text-slate-700">{issue.description}</p>
        <p className="mt-1 text-[11px] uppercase tracking-wide text-slate-400">
          Status: {issue.status.replace("_", " ")} · Updated{" "}
          {new Date(issue.updatedAt).toLocaleString()}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <Button
          type="button"
          variant="secondary"
          className="px-2 py-1 text-xs"
          onClick={() => onEdit(issue)}
        >
          Edit
        </Button>
        <Button
          type="button"
          variant="danger"
          className="px-2 py-1 text-xs"
          onClick={() => onDelete(issue)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
