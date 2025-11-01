import { useEffect, useState } from "react";
import { GrStatusGood } from "react-icons/gr";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdErrorOutline } from "react-icons/md";
import { TfiClose } from "react-icons/tfi";
import { VscError } from "react-icons/vsc";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose?: () => void;
  isVisible?: boolean;
}

export const Toast = ({
  message,
  type = "info",
  duration = 3000,
  onClose,
  isVisible = true,
}: ToastProps) => {
  const [visible, setVisible] = useState(isVisible);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!visible || duration === 0) return;

    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [visible, duration]);

  useEffect(() => {
    setVisible(isVisible);
  }, [isVisible]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, 300);
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <GrStatusGood />;
      case "error":
        return <VscError />;
      case "warning":
        return <MdErrorOutline />;
      case "info":
      default:
        return <IoMdInformationCircleOutline />;
    }
  };

  const getColors = () => {
    switch (type) {
      case "success":
        return {
          bg: "#10b981",
          border: "#059669",
          text: "#ffffff",
        };
      case "error":
        return {
          bg: "#ef4444",
          border: "#dc2626",
          text: "#ffffff",
        };
      case "warning":
        return {
          bg: "#f59e0b",
          border: "#d97706",
          text: "#ffffff",
        };
      case "info":
      default:
        return {
          bg: "#3b82f6",
          border: "#2563eb",
          text: "#ffffff",
        };
    }
  };

  if (!visible) return null;

  const colors = getColors();

  const toastStyle: React.CSSProperties = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: colors.bg,
    color: colors.text,
    padding: "16px 20px",
    borderRadius: "8px",
    border: `2px solid ${colors.border}`,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    minWidth: "300px",
    maxWidth: "500px",
    zIndex: 9999,
    animation: isExiting
      ? "slideOut 0.3s ease-out forwards"
      : "slideIn 0.3s ease-out",
  };

  const iconStyle: React.CSSProperties = {
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
  };

  const messageStyle: React.CSSProperties = {
    flex: 1,
    fontSize: "14px",
    fontWeight: 500,
  };

  const closeButtonStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    color: colors.text,
    cursor: "pointer",
    padding: "4px",
    display: "flex",
    alignItems: "center",
    opacity: 0.8,
  };

  return (
    <>
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `}</style>

      <div style={toastStyle}>
        <div style={iconStyle}>{getIcon()}</div>

        <div style={messageStyle}>{message}</div>

        <button
          style={closeButtonStyle}
          onClick={handleClose}
          onMouseOver={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseOut={(e) => (e.currentTarget.style.opacity = "0.8")}
          aria-label="Close"
        >
          <TfiClose />
        </button>
      </div>
    </>
  );
};
