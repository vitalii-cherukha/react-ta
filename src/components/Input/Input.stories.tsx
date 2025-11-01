import type { Meta, StoryObj } from "@storybook/react-vite";
import Input from "./Input";

const meta = {
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    type: "text",
    placeholder: "Enter text...",
  },
};

export const PasswordWithToggle: Story = {
  args: {
    type: "password",
    placeholder: "Enter password...",
    defaultValue: "mypassword123",
  },
};

export const Number: Story = {
  args: {
    type: "number",
    placeholder: "Enter number...",
  },
};

export const TextWithClearable: Story = {
  args: {
    type: "text",
    placeholder: "Enter text...",
    clearable: true,
    defaultValue: "Some text",
  },
};

export const TextWithoutClearable: Story = {
  args: {
    type: "text",
    placeholder: "Enter text...",
    clearable: false,
    defaultValue: "Some text",
  },
};
