export type IssueStatus = "OPEN" | "IN_PROGRESS" | "DONE";

export interface Issue {
    id: number;
    title: string;
    description: string;
    status: IssueStatus,
    createdAt: string;
    updatedAt: string;
}