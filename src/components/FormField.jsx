import { labelClass } from "../lib/formStyles";

const FormField = ({ label, required, children }) => (
  <div>
    <label className={labelClass}>
      {label}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
    {children}
  </div>
);

export default FormField;
