import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { inputClass } from "../../lib/formStyles";

// Normalize a raw option node into { label, value } or a group.
// - string            → { label, value: same }
// - { label, value }  → used as-is (value falls back to label)
// - { label, options } → group header + recursed children
const normalize = (node) => {
  if (node == null) return { label: "", value: "" };
  if (typeof node === "string") return { label: node, value: node };
  if (node && Array.isArray(node.options)) {
    return { group: node.label, options: node.options.map(normalize) };
  }
  return { label: node.label, value: node.value ?? node.label };
};

// Flatten only the selectable options (skip group headers) for keyboard nav + lookup.
const flattenSelectable = (items) =>
  items.flatMap((it) => (it.group ? it.options : [it]));

const Select = ({
  value,
  onChange,
  options = [],
  placeholder = "Select…",
  disabled = false,
  searchable,
  className = "",
  ariaLabel,
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const searchRef = useRef(null);

  const normalized = useMemo(() => options.map(normalize), [options]);
  const allSelectable = useMemo(() => flattenSelectable(normalized), [normalized]);

  // Auto-enable search for long lists unless explicitly set.
  const showSearch = searchable ?? allSelectable.length > 10;

  const selectedLabel =
    allSelectable.find((o) => o.value === value)?.label || "";

  // Apply the search filter while preserving group structure (hide empty groups).
  const filtered = useMemo(() => {
    if (!query.trim()) return normalized;
    const q = query.toLowerCase();
    const match = (o) => o.label.toLowerCase().includes(q);
    return normalized
      .map((it) =>
        it.group ? { ...it, options: it.options.filter(match) } : it,
      )
      .filter((it) => (it.group ? it.options.length > 0 : match(it)));
  }, [normalized, query]);

  const filteredSelectable = useMemo(
    () => flattenSelectable(filtered),
    [filtered],
  );

  // Close on outside click.
  useEffect(() => {
    if (!open) return undefined;
    const onDocClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  // When opening: reset query, focus search, point active at current selection.
  useEffect(() => {
    if (open) {
      setQuery("");
      const idx = allSelectable.findIndex((o) => o.value === value);
      setActiveIndex(idx >= 0 ? idx : 0);
      if (showSearch) setTimeout(() => searchRef.current?.focus(), 0);
    }
  }, [open, value, allSelectable, showSearch]);

  // Keep active index in range when the filtered list shrinks.
  useEffect(() => {
    setActiveIndex((i) => Math.min(i, Math.max(filteredSelectable.length - 1, 0)));
  }, [filteredSelectable.length]);

  const choose = (val) => {
    onChange?.(val);
    setOpen(false);
    setQuery("");
    triggerRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (disabled) return;
    if (!open && (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (!open) return;
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filteredSelectable.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const opt = filteredSelectable[activeIndex];
      if (opt) choose(opt.value);
    }
  };

  // Render the popover rows, tracking a running selectable index for highlight.
  let runningIndex = -1;
  const renderRows = (items) =>
    items.map((it, i) => {
      if (it.group) {
        return (
          <div key={`g-${it.group}-${i}`} role="group" aria-label={it.group}>
            <p className="px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-slate-400">
              {it.group}
            </p>
            {renderRows(it.options)}
          </div>
        );
      }
      runningIndex += 1;
      const idx = runningIndex;
      const isSelected = it.value === value;
      const isActive = idx === activeIndex;
      return (
        <button
          key={it.value}
          type="button"
          role="option"
          aria-selected={isSelected}
          onMouseEnter={() => setActiveIndex(idx)}
          onClick={() => choose(it.value)}
          className={`flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left text-sm transition ${
            isSelected
              ? "bg-primary/5 font-semibold text-primary"
              : isActive
                ? "bg-light text-slate-700"
                : "text-slate-700 hover:bg-light"
          }`}
        >
          <span className="truncate">{it.label}</span>
          {isSelected && <Check size={14} className="shrink-0 text-primary" />}
        </button>
      );
    });

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        className={`flex items-center justify-between gap-2 text-left ${
          className || inputClass
        } ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
      >
        <span className={`truncate ${selectedLabel ? "text-slate-800" : "text-slate-400"}`}>
          {selectedLabel || placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute z-30 mt-1 max-h-64 w-full overflow-y-auto rounded-xl border border-borderColor bg-white py-1 shadow-soft"
        >
          {showSearch && (
            <div className="sticky top-0 border-b border-borderColor bg-white px-2 pb-2 pt-1">
              <div className="flex items-center gap-2 rounded-lg border border-borderColor px-2.5 py-1.5">
                <Search size={14} className="shrink-0 text-slate-400" />
                <input
                  ref={searchRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search…"
                  className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>
          )}

          {filteredSelectable.length === 0 ? (
            <p className="px-3 py-3 text-center text-sm text-slate-400">No matches</p>
          ) : (
            renderRows(filtered)
          )}
        </div>
      )}
    </div>
  );
};

export default Select;
