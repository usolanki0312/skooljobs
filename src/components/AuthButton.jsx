import React from "react";

function AuthButton({ children, type = "submit", onClick, disabled }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full bg-primary hover:opacity-90 text-white py-3.5 rounded-xl text-[15px] font-bold transition-all duration-300 flex items-center justify-center gap-2 mt-6 active:scale-98"
    >
      {children}
    </button>
  );
}

export default AuthButton;
