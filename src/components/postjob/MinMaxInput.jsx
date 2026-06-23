import styles from "./styles/MinMaxInput.module.css";
import { Button, Input } from "@cloudstrytech/ui-components";

const MinMaxInput = ({
  label, minValue, maxValue, onMinChange, onMaxChange, suffix = "", readOnly = false,
}) => {
  const boxCls = `${styles.box} ${readOnly ? styles.boxReadOnly : styles.boxEditable}`;
  const inputCls = `${styles.input} ${readOnly ? styles.inputReadOnly : styles.inputEditable}`;

  return (
    <div>
      {label && <p className={styles.label}>{label}</p>}
      <div className={styles.row}>
        <div className={boxCls}>
          <span className={styles.currencySymbol}>₹</span>
          <Input
            type="number"
            value={minValue}
            onChange={(value) => onMinChange?.(value)}
            readOnly={readOnly}
            placeholder="Min"
          />
        </div>
        <span className={styles.separator}>—</span>
        <div className={boxCls}>
          <span className={styles.currencySymbol}>₹</span>
          <Input
            type="number"
            value={maxValue}
            onChange={(value) => onMaxChange?.(value)}
            readOnly={readOnly}
            placeholder="Max"
          />
          {suffix && <span className={styles.suffix}>{suffix}</span>}
        </div>
      </div>
    </div>
  );
};

export default MinMaxInput;
