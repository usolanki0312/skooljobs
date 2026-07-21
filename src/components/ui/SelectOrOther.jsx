import { RotateCcw } from "lucide-react";
import { Input, Select } from "@cloudstrytech/ui-components";
import styles from "./SelectOrOther.module.css";

const DEFAULT_OTHER_VALUE = "Other";

// Renders a dropdown that, when "Other" is picked, turns into a text input
// in the same slot (instead of showing dropdown + a second input below it).
const SelectOrOther = ({
  value,
  onChange,
  otherValue,
  onOtherChange,
  options,
  placeholder,
  otherPlaceholder = "Please specify",
  otherToken = DEFAULT_OTHER_VALUE,
  className,
  disabled,
}) => {
  const isOther = value === otherToken;

  if (isOther) {
    return (
      <div className={`${styles.otherRow} ${className || ""}`}>
        <Input
          value={otherValue}
          onChange={onOtherChange}
          placeholder={otherPlaceholder}
          autoFocus
        />
        <button
          type="button"
          onClick={() => {
            onChange("");
            onOtherChange("");
          }}
          className={styles.backButton}
          aria-label="Choose from list instead"
          title="Choose from list instead"
        >
          <RotateCcw size={14} />
        </button>
      </div>
    );
  }

  return (
    <Select
      value={value}
      onChange={onChange}
      placeholder={placeholder || "Select..."}
      options={options}
      className={className}
      disabled={disabled}
    />
  );
};

export default SelectOrOther;
