const MinMaxInput = ({
  label, minValue, maxValue, onMinChange, onMaxChange, suffix = "", readOnly = false,
}) => {
  const boxCls = `flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-borderColor px-3 py-2.5 ${
    readOnly
      ? "bg-slate-50"
      : "bg-white focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10"
  }`;
  const inputCls = `w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-slate-400 ${
    readOnly ? "text-slate-500" : "text-slate-800"
  }`;

  return (
    <div>
      {label && <p className="mb-2 text-xs font-bold text-slate-600">{label}</p>}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
        <div className={boxCls}>
          <span className="text-sm font-bold text-slate-400">₹</span>
          <input
            type="number"
            value={minValue}
            onChange={(e) => onMinChange?.(e.target.value)}
            readOnly={readOnly}
            placeholder="Min"
            className={inputCls}
          />
        </div>
        <span className="hidden text-sm text-slate-400 sm:inline">—</span>
        <div className={boxCls}>
          <span className="text-sm font-bold text-slate-400">₹</span>
          <input
            type="number"
            value={maxValue}
            onChange={(e) => onMaxChange?.(e.target.value)}
            readOnly={readOnly}
            placeholder="Max"
            className={inputCls}
          />
          {suffix && <span className="shrink-0 text-xs text-slate-400">{suffix}</span>}
        </div>
      </div>
    </div>
  );
};

export default MinMaxInput;
