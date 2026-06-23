import React from "react";
import styles from "./styles/AuthButton.module.css";

function AuthButton({ children, type = "submit", onClick, disabled }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={styles.button}
    >
      {children}
    </button>
  );
}

export default AuthButton;
