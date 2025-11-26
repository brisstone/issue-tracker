import { useEffect, useState } from "react";
import { Button } from "../../components/view/Button/Button";
import IssueForm from "../../components/IssueForm/IssueForm";
import { Modal } from "../../components/view/Modal/Modal";
import {
  useCreateIssue,
  useDeleteIssue,
  useIssues,
  useUpdateIssue,
} from "../../lib/issues";
import {
  STATUS_OPTIONS,
  type Issue,
  type IssueFormValues,
  type StatusFilter,
} from "../../types/issues";
import IssueList from "./IssueList";
import { toast } from "sonner";
import { useDebounce } from "../../hooks/useDebounce";
import { Select } from "../../components/view/Select/Select";
import { TextInput } from "../../components/view/Text/TextInput";
import { Pagination } from "../../components/Pagination/Pagination";

const PAGE_SIZE = 10;

export default function IssuesPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const [editingIssue, setEditingIssue] = useState<Issue | null>(null);
  const [issueToDelete, setIssueToDelete] = useState<Issue | null>(null);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
  const statusParam = statusFilter === "ALL" ? "" : statusFilter;

  const [page, setPage] = useState(1);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, statusFilter]);

  const {
    data: paginated,
    isLoading,
    isError,
  } = useIssues(debouncedSearch, statusParam, page, PAGE_SIZE);

  const issues = paginated?.data ?? [];
  const total = paginated?.total ?? 0;
  const totalPages = paginated?.totalPages ?? 1;

  const createMutation = useCreateIssue();
  const updateMutation = useUpdateIssue();
  const deleteMutation = useDeleteIssue();

  const handleCreate = async (data: IssueFormValues) => {
    try {
      await createMutation.mutateAsync(data);
      setCreateOpen(false);
      toast("Issue created successfully");
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const handleUpdate = async (data: IssueFormValues) => {
    try {
      if (!editingIssue) {
        toast.error("Select issue to edit");
        return;
      }
      await updateMutation.mutateAsync({
        ...data,
        id: editingIssue.id,
      });
      setEditingIssue(null);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const confirmDelete = async () => {
    try {
      if (!issueToDelete) {
        toast.error("Select issue to delete");
        return;
      }
      await deleteMutation.mutateAsync(issueToDelete.id);
      setIssueToDelete(null);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <div className="h-full w-full bg-white p-4 md:p-14">
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Issues
          </h2>
          <Button type="button" onClick={() => setCreateOpen(true)}>
            + Create issue
          </Button>
        </div>

        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div className="w-full md:max-w-xs">
            <TextInput
              label="Search"
              type="search"
              value={search}
              placeholder="Search by title or description"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="w-full md:w-auto">
            <Select
              label="Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            >
              <option value="ALL">ALL</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s.replace("_", " ")}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {!isLoading && !isError && (
          <IssueList
            issues={issues}
            onEdit={setEditingIssue}
            onDelete={setIssueToDelete}
          />
        )}

        <Pagination
          page={page}
          total={total}
          pageSize={PAGE_SIZE}
          totalPages={totalPages}
          onPrev={() => setPage((p) => p - 1)}
          onNext={() => setPage((p) => p + 1)}
        />
      </section>

      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Create new issue"
        footer={null}
      >
        <IssueForm
          mode="create"
          submitting={createMutation.isPending}
          onSubmit={handleCreate}
        />
      </Modal>

      <Modal
        open={!!editingIssue}
        onClose={() => setEditingIssue(null)}
        title={editingIssue ? `Edit issue #${editingIssue.id}` : "Edit issue"}
        footer={null}
      >
        {editingIssue && (
          <IssueForm
            mode="edit"
            initial={editingIssue}
            submitting={updateMutation.isPending}
            onSubmit={handleUpdate}
          />
        )}
      </Modal>

      <Modal
        open={!!issueToDelete}
        onClose={() => setIssueToDelete(null)}
        title="Delete issue"
        footer={
          <>
            <Button
              variant="secondary"
              type="button"
              onClick={() => setIssueToDelete(null)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              type="button"
              onClick={confirmDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </>
        }
      >
        <p className="text-sm text-slate-700">
          Are you sure you want to delete{" "}
          <span className="font-semibold">
            #{issueToDelete?.id} – {issueToDelete?.title}
          </span>
          ? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
}
