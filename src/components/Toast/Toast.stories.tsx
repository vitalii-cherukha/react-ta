import type { Meta, StoryObj } from "@storybook/react-vite";

import { Toast } from "./Toast";

const meta = {
  component: Toast,
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    message: "Operation completed successfully!",
    type: "success",
    duration: 3000,
  },
};

export const Error: Story = {
  args: {
    message: "An error occurred. Please try again.",
    type: "error",
    duration: 3000,
  },
};

export const Warning: Story = {
  args: {
    message: "Warning: This action cannot be undone.",
    type: "warning",
    duration: 3000,
  },
};

export const Info: Story = {
  args: {
    message: "You have a new notification.",
    type: "info",
    duration: 3000,
  },
};

export const ShortDuration: Story = {
  args: {
    message: "This will disappear quickly",
    type: "info",
    duration: 2000,
  },
};

export const LongDuration: Story = {
  args: {
    message: "This will stay longer",
    type: "info",
    duration: 5000,
  },
};

export const ManualCloseOnly: Story = {
  args: {
    message: "This toast will not auto-dismiss. Click X to close.",
    type: "info",
    duration: 0,
  },
};
