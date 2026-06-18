const SectionCard = ({ number, title, optional = false, headerAction = null, children }) => (
  <div className="rounded-2xl border border-borderColor bg-white p-4 shadow-sm sm:p-6">
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h3 className="flex min-w-0 items-center gap-2 text-lg font-bold text-slate-800">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
          {number}
        </span>
        <span className="break-words">{title}</span>
        {optional && (
          <span className="ml-1 text-sm font-normal text-slate-400">(Optional)</span>
        )}
      </h3>
      {headerAction}
    </div>
    {children}
  </div>
);

export default SectionCard;
