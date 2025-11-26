export type IssueStatus = "OPEN" | "IN_PROGRESS" | "DONE";

export const STATUS_OPTIONS: IssueStatus[] = ["OPEN", "IN_PROGRESS", "DONE"];

export interface Issue {
    id: number;
    title: string;
    description: string;
    status: IssueStatus,
    createdAt: string;
    updatedAt: string;
}


export interface IssueFormProps {
    initial?: Partial<Issue>;
    mode?: "create" | "edit";
    submitting?: boolean;
    onSubmit: (data: {
      title: string;
      description: string;
      status?: IssueStatus;
    }) => void;
  }
  

  export interface IssueListItemProps {
    issue: Issue;
    onEdit: (issue: Issue) => void;
    onDelete: (issue: Issue) => void;
  }

  export interface IssueListProps {
    issues: Issue[];
    onEdit: (issue: Issue) => void;
    onDelete: (issue: Issue) => void;
  }