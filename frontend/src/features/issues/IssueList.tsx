import IssueListItem from "../../components/IssueListItem/IssueListItem";
import type { IssueListProps } from "../../types/issues";

export default function IssueList({
  issues,
  onDelete,
  onEdit,
}: IssueListProps) {
  if (!issues.length) {
    <>Create an issue to get started.</>;
  }
  return (
    <div className="space-y-3">
      {issues.map((issue) => (
        <IssueListItem
          key={issue.id}
          issue={issue}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
