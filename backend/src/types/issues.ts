import { Issue } from "@prisma/client";

export interface FindAllIssuesParams {
  searchTerm?: string;
  status?: string; // comma-separated
  page?: number;
  pageSize?: number;
}

export interface PaginatedIssues {
  data: Issue[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
