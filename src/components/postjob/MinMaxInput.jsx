const MinMaxInput = ({ label, minValue, maxValue, onMinChange, onMaxChange, suffix = "" }) => (
  <div>
    {label && <p className="mb-2 text-xs font-bold text-slate-600">{label}</p>}
    <div className="flex items-center gap-3">
      <div className="flex flex-1 items-center gap-2 rounded-xl border border-borderColor bg-white px-3 py-2.5 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
        <span className="text-sm font-bold text-slate-400">₹</span>
        <input
          type="number"
          value={minValue}
          onChange={(e) => onMinChange(e.target.value)}
          placeholder="Min"
          className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
        />
      </div>
      <span className="text-sm text-slate-400">—</span>
      <div className="flex flex-1 items-center gap-2 rounded-xl border border-borderColor bg-white px-3 py-2.5 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
        <span className="text-sm font-bold text-slate-400">₹</span>
        <input
          type="number"
          value={maxValue}
          onChange={(e) => onMaxChange(e.target.value)}
          placeholder="Max"
          className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
        />
        {suffix && <span className="shrink-0 text-xs text-slate-400">{suffix}</span>}
      </div>
    </div>
  </div>
);

export default MinMaxInput;
