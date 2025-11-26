import { useState } from "react";
import { Modal } from "./Modal";
import { Button } from "../Button/Button";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Modal> = {
  title: "UI/Modal",
  component: Modal,
  args: {
    open: true,
    title: "Example modal",
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Basic: Story = {
  render: (args) => {
    const [open, setOpen] = useState(true);

    return (
      <div className="p-4">
        <Button onClick={() => setOpen(true)} disabled={false}>
          Open modal
        </Button>
        <Modal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          footer={
            <>
              <Button
                variant="secondary"
                type="button"
                onClick={() => setOpen(false)}
                disabled={false}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={() => setOpen(false)}
                disabled={false}
              >
                Confirm
              </Button>
            </>
          }
        >
          <p className="text-sm text-slate-700">
            Use this modal for confirmations, editing issues, or displaying
            sensor event details.
          </p>
        </Modal>
      </div>
    );
  },
};
