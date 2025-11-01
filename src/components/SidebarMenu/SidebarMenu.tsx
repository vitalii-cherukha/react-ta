import { useState, useEffect } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { TfiClose } from "react-icons/tfi";

export interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  children?: MenuItem[];
}

interface SidebarMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: MenuItem[];
}

const MenuItemComponent = ({
  item,
  level = 0,
}: {
  item: MenuItem;
  level?: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const toggleExpanded = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };

  const itemStyle: React.CSSProperties = {
    padding: `10px ${16 + level * 20}px`,
    cursor: hasChildren ? "pointer" : "default",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    transition: "background-color 0.2s",
    backgroundColor: "transparent",
    borderLeft: level > 0 ? "2px solid #e5e7eb" : "none",
  };

  const labelStyle: React.CSSProperties = {
    flex: 1,
    fontSize: "14px",
    fontWeight: level === 0 ? 500 : 400,
    color: "#374151",
  };

  const iconWrapperStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    color: "#6b7280",
    transition: "transform 0.2s",
    transform: isExpanded ? "rotate(0deg)" : "rotate(0deg)",
  };

  return (
    <div>
      <div
        style={itemStyle}
        onClick={toggleExpanded}
        onMouseEnter={(e) => {
          if (hasChildren) {
            e.currentTarget.style.backgroundColor = "#f3f4f6";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        <div style={labelStyle}>
          {item.icon && <span style={{ marginRight: "8px" }}>{item.icon}</span>}
          {item.label}
        </div>

        {hasChildren && (
          <div style={iconWrapperStyle}>
            {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
          </div>
        )}
      </div>

      {/* Підменю (рекурсивно) */}
      {hasChildren && isExpanded && (
        <div>
          {item.children!.map((child) => (
            <MenuItemComponent key={child.id} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export const SidebarMenu = ({ isOpen, onClose, items }: SidebarMenuProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  // Закриття по Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;

  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 9998,
    animation: isAnimating ? "fadeIn 0.3s ease-out" : "fadeOut 0.3s ease-out",
  };

  const sidebarStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    width: "320px",
    maxWidth: "90vw",
    backgroundColor: "#ffffff",
    boxShadow: "-4px 0 12px rgba(0, 0, 0, 0.1)",
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    animation: isAnimating
      ? "slideInRight 0.3s ease-out"
      : "slideOutRight 0.3s ease-out",
  };

  const headerStyle: React.CSSProperties = {
    padding: "20px",
    borderBottom: "1px solid #e5e7eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "18px",
    fontWeight: 600,
    color: "#111827",
  };

  const closeButtonStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px",
    display: "flex",
    alignItems: "center",
    color: "#6b7280",
  };

  const contentStyle: React.CSSProperties = {
    flex: 1,
    overflowY: "auto",
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        
        @keyframes slideOutRight {
          from { transform: translateX(0); }
          to { transform: translateX(100%); }
        }
      `}</style>

      {/* Overlay */}
      <div style={overlayStyle} onClick={handleClose} />

      {/* Sidebar */}
      <div style={sidebarStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <div style={titleStyle}>Menu</div>
          <button
            style={closeButtonStyle}
            onClick={handleClose}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#111827")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
            aria-label="Close menu"
          >
            <TfiClose />
          </button>
        </div>

        {/* Content */}
        <div style={contentStyle}>
          {items.map((item) => (
            <MenuItemComponent key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};
