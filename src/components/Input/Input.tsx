import React, { useState, type InputHTMLAttributes } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdClear } from "react-icons/md";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  clearable?: boolean;
}

const Input = ({
  type = "text",
  label,
  error,
  clearable = false,
  value,
  onChange,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [internalValue, setInternalValue] = useState(value || "");

  const isPassword = type === "password";
  const currentType = isPassword && showPassword ? "text" : type;
  const hasValue = String(internalValue).length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    onChange?.(e);
  };

  const handleClear = () => {
    setInternalValue("");
    const fakeEvent = {
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange?.(fakeEvent);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      {label && <label>{label}</label>}
      <div>
        <input
          type={currentType}
          value={internalValue}
          onChange={handleChange}
          {...props}
        />
        <div>
          {clearable && hasValue && !props.disabled && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear input"
              tabIndex={-1}
            >
              <MdClear />
            </button>
          )}
          {isPassword && (
            <button
              type="button"
              onClick={togglePassword}
              aria-label={showPassword ? "Hide password" : "Show password"}
              tabIndex={-1}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          )}
        </div>
      </div>
      {error && <span>{error}</span>}
    </div>
  );
};

export default Input;
