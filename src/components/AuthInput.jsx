import React from "react";

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
      <div className="flex justify-between items-center mb-2">
        <label className={`font-bold text-[13px] transition-colors duration-200 ${disabled ? "text-slate-400" : "text-primary"}`}>
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
        className="w-full border border-borderColor rounded-xl px-4 py-3 outline-none text-[15px] text-secondary placeholder-secondary focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all bg-white disabled:bg-slate-50 disabled:border-borderColor/60 disabled:cursor-not-allowed disabled:text-slate-500 font-medium"
      />
    </div>
  );
}

export default AuthInput;
