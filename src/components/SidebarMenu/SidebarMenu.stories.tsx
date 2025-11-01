import type { Meta, StoryObj } from '@storybook/react-vite';

import { SidebarMenu } from './SidebarMenu';

const meta = {
  component: SidebarMenu,
} satisfies Meta<typeof SidebarMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    items: []
  }
};