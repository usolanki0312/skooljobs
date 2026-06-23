import React from "react";
import styles from "./styles/AuthInput.module.css";

function AuthInput({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  colSpan = "col-span-2",
  rightElement,
  disabled = false
}) {
  return (
    <div className={colSpan}>
      <div className={styles.labelRow}>
        <label className={disabled ? styles.labelDisabled : styles.label}>
          {label}
        </label>
        {rightElement}
      </div>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={styles.input}
      />
    </div>
  );
}

export default AuthInput;
