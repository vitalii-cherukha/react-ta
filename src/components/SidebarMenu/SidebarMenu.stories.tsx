import type { Meta } from "@storybook/react-vite";

import { useState } from "react";
import SidebarMenu, { type MenuItem } from "./SidebarMenu";

const meta = {
  component: SidebarMenu,
} satisfies Meta<typeof SidebarMenu>;

export default meta;

const oneLevelItems: MenuItem[] = [
  { id: "1", label: "Dashboard" },
  {
    id: "2",
    label: "Products",
    children: [
      { id: "2-1", label: "All Products" },
      { id: "2-2", label: "Add New" },
    ],
  },
  {
    id: "3",
    label: "Orders",
    children: [
      { id: "3-1", label: "Pending" },
      { id: "3-2", label: "Completed" },
    ],
  },
  { id: "4", label: "Settings" },
];

const twoLevelItems: MenuItem[] = [
  { id: "1", label: "Home" },
  {
    id: "2",
    label: "Company",
    children: [
      {
        id: "2-1",
        label: "Departments",
        children: [
          { id: "2-1-1", label: "IT" },
          { id: "2-1-2", label: "HR" },
          { id: "2-1-3", label: "Finance" },
        ],
      },
      {
        id: "2-2",
        label: "Locations",
        children: [
          { id: "2-2-1", label: "Kyiv Office" },
          { id: "2-2-2", label: "Lviv Office" },
        ],
      },
    ],
  },
  { id: "3", label: "Reports" },
];

export const OneLevelNested = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          padding: "10px 20px",
          backgroundColor: "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          zIndex: 100,
        }}
      >
        Open Menu
      </button>

      <SidebarMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        items={oneLevelItems}
      />
    </div>
  );
};

export const TwoLevelNested = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          padding: "10px 20px",
          backgroundColor: "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          zIndex: 100,
        }}
      >
        Open Menu
      </button>

      <SidebarMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        items={twoLevelItems}
      />
    </div>
  );
};

export const OpenState = () => {
  const [isOpen] = useState(true);

  return (
    <SidebarMenu isOpen={isOpen} onClose={() => {}} items={oneLevelItems} />
  );
};

export const ClosedState = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: "40px" }}>
      <h2>Sidebar is closed. Click button to open:</h2>

      <button
        onClick={() => setIsOpen(true)}
        style={{
          marginTop: "20px",
          padding: "12px 24px",
          backgroundColor: "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Open Sidebar
      </button>

      <SidebarMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        items={oneLevelItems}
      />
    </div>
  );
};
