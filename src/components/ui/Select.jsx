import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { inputClass } from "../../lib/formStyles";
import styles from "./Select.module.css";

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
            <p className={styles.groupLabel}>
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
          className={
            isSelected
              ? styles.optionSelected
              : isActive
                ? styles.optionActive
                : styles.option
          }
        >
          <span className={styles.optionLabel}>{it.label}</span>
          {isSelected && <Check size={14} className={styles.optionCheck} />}
        </button>
      );
    });

  return (
    <div ref={rootRef} className={styles.root}>
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        className={`${styles.trigger} ${
          className || inputClass
        } ${disabled ? styles.triggerDisabled : styles.triggerEnabled}`}
      >
        <span className={`${styles.selectedLabel} ${selectedLabel ? styles.selectedLabelFilled : styles.selectedLabelPlaceholder}`}>
          {selectedLabel || placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className={styles.popover}
        >
          {showSearch && (
            <div className={styles.searchWrap}>
              <div className={styles.searchInner}>
                <Search size={14} className={styles.searchIcon} />
                <input
                  ref={searchRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search…"
                  className={styles.searchInput}
                />
              </div>
            </div>
          )}

          {filteredSelectable.length === 0 ? (
            <p className={styles.noMatches}>No matches</p>
          ) : (
            renderRows(filtered)
          )}
        </div>
      )}
    </div>
  );
};

export default Select;
