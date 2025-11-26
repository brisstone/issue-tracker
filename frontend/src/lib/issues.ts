import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Issue, IssueStatus, PaginatedIssues } from "../types/issues";
import api from "./api";


const ISSUES_KEY = ["issues"];

export interface CreateIssuePayload {
    title: string;
    description: string;
    status?: IssueStatus;
}

export interface UpdateIssuePayload {
    id: number;
    title?: string;
    description?: string;
    status?: IssueStatus;
}


export function useIssues(searchTerm: string, status: string,  page: number,
    pageSize: number) {
    return useQuery<PaginatedIssues>({
        queryKey: ["issues", { searchTerm, status,  page, pageSize }],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (searchTerm) params.set("searchTerm", searchTerm);
            if (status) params.set("status", status);
            params.set("page", String(page));
            params.set("pageSize", String(pageSize));
            const res = await api.get<PaginatedIssues>(`/issues?${params.toString()}`);
            return res.data;
        }
    })
}

export function useCreateIssue() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: CreateIssuePayload) => {
            const res = await api.post<Issue>("/issues", payload);
            return res.data;
        },
        onSuccess: () =>{
            queryClient.invalidateQueries({ queryKey: ISSUES_KEY})
        },
    })
}

export function useUpdateIssue() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: UpdateIssuePayload) => {
            const { id, ...data } = payload;
            const res = await api.patch<Issue>(`/issues/${id}`, data);
            return res.data;
        },
        onSuccess: () =>{
            queryClient.invalidateQueries({ queryKey: ISSUES_KEY})
        },
    })
}

export function useDeleteIssue() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            const res = await api.delete<Issue>(`/issues/${id}`);
            return res.data;
        },
        onSuccess: () =>{
            queryClient.invalidateQueries({ queryKey: ISSUES_KEY})
        },
    })
}