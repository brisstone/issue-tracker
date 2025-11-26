import { useState } from "react";
import { Button } from "../../components/view/Button/Button";
import IssueForm from "../../components/IssueForm/IssueForm";
import { Modal } from "../../components/view/Modal/Modal";
import { useCreateIssue, useIssues } from "../../lib/issues";
import type { IssueStatus } from "../../types/issues";

export default function IssuesPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const { data: issues, isLoading, isError } = useIssues();

  const createMutation = useCreateIssue();

  const handleCreate = async (data: {
    title: string;
    description: string;
    status?: IssueStatus;
  }) => {
    await createMutation.mutateAsync(data);
    setCreateOpen(false);
  };

  return (
    <div className="grid gap-6 md:grid-cols-[1.5fr,1fr]">
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Issues
          </h2>
          <Button
            type="button"
            onClick={() => setCreateOpen(true)}
            disabled={false}
          >
            + Create issue
          </Button>
        </div>
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
    </div>
  );
}
