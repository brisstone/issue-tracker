import { useState, type FormEvent } from "react";
import { TextInput } from "../view/Text/TextInput";
import {
  STATUS_OPTIONS,
  type IssueFormProps,
  type IssueStatus,
} from "../../types/issues";
import { TextArea } from "../view/Text/TextArea";
import { Select } from "../view/Select/Select";
import { Button } from "../view/Button/Button";
import { toast } from "sonner";

export default function IssueForm({
  initial = {},
  mode = "create",
  submitting = false,
  onSubmit,
}: IssueFormProps) {
  const [form, setForm] = useState({
    title: initial.title ?? "",
    description: initial.description ?? "",
    status: (initial.status as IssueStatus) ?? "OPEN",
  });

  const updateField = <K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) toast("Form fields are required!");

    onSubmit({
      title: form.title.trim(),
      description: form.description.trim(),
      status: form.status,
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <TextInput
          label="Title"
          value={form.title}
          placeholder="Title"
          onChange={(e) => updateField("title", e.target.value)}
          required
        />
        <TextArea
          label="Description"
          rows={3}
          value={form.description}
          placeholder="Add description"
          onChange={(e) => updateField("description", e.target.value)}
          required
        />

        {mode === "edit" && (
          <Select
            label="Status"
            value={form.status}
            onChange={(e) =>
              updateField("status", e.target.value as IssueStatus)
            }
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s.replace("_", " ")}
              </option>
            ))}
          </Select>
        )}

        <Button type="submit" disabled={submitting}>
          {submitting
            ? "Saving..."
            : mode == "create"
            ? "Create issue"
            : "Save changes"}
        </Button>
      </form>
    </div>
  );
}
