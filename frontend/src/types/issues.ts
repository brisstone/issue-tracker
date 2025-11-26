export type IssueStatus = "OPEN" | "IN_PROGRESS" | "DONE";

export type StatusFilter = IssueStatus | "ALL";

export const STATUS_OPTIONS: IssueStatus[] = ["OPEN", "IN_PROGRESS", "DONE"];

export interface Issue {
    id: number;
    title: string;
    description: string;
    status: IssueStatus,
    createdAt: string;
    updatedAt: string;
}

export interface UpdateIssue {
    id: number;
    title?: string;
    description?: string;
    status?: IssueStatus,
}

export interface IssueFormValues {
    title: string;
    description: string;
    status: IssueStatus;
  }


export interface IssueFormProps {
    initial?: Partial<Issue>;
    mode?: "create" | "edit";
    submitting?: boolean;
    onSubmit: (data: IssueFormValues) => void | Promise<void>;
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


   export interface PaginatedIssues {
    data: Issue[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }