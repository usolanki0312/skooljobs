import { labelClass } from "../lib/formStyles";
import styles from "./styles/FormField.module.css";

const FormField = ({ label, required, children }) => (
  <div>
    <label className={labelClass}>
      {label}
      {required && <span className={styles.required}>*</span>}
    </label>
    {children}
  </div>
);

export default FormField;
