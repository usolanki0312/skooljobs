import { X } from "lucide-react";
import SectionCard from "./SectionCard";
import postjob from "../../../dropdown/School_module/postjob.json";
import styles from "./styles/QualificationsSection.module.css";
import { Select } from "@cloudstrytech/ui-components";
import { toOptions } from "../../lib/selectOptions";

const {
  Min_qualification: MIN_QUALIFICATIONS_RAW,
  Additional_qualification: ADDITIONAL_QUALIFICATIONS_RAW,
  Certification: CERTIFICATIONS,
  Experience: EXPERIENCE_OPTIONS_RAW,
  Preferred_school_type: PREFERRED_SCHOOL_TYPES,
  Student_level: STUDENT_LEVELS,
} = postjob;

const MIN_QUALIFICATIONS = toOptions(MIN_QUALIFICATIONS_RAW);
const ADDITIONAL_QUALIFICATIONS = toOptions(ADDITIONAL_QUALIFICATIONS_RAW);
const EXPERIENCE_OPTIONS = toOptions(EXPERIENCE_OPTIONS_RAW);

const TagMultiSelect = ({ label, options, selected, onToggle }) => (
  <div>
    <p className={styles.fieldLabel}>{label}</p>
    <div className={styles.tagSelectBox}>
      {selected.map((c) => (
        <span key={c} className={styles.tag}>
          {c}
          <button type="button" onClick={() => onToggle(c)} className={styles.tagRemoveButton}>
            <X size={10} />
          </button>
        </span>
      ))}
      <select
        value=""
        onChange={(e) => { if (e.target.value) onToggle(e.target.value); }}
        className={styles.tagSelect}
      >
        <option value="">Add…</option>
        {options.filter((o) => !selected.includes(o)).map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  </div>
);

const CheckboxGrid = ({ label, options, selected, onToggle, cols = 3 }) => (
  <div>
    <p className={styles.fieldLabel}>{label}</p>
    <div className={`${styles.checkboxGrid} ${cols === 4 ? styles.checkboxGridCols4 : styles.checkboxGridCols3}`}>
      {options.map((opt) => (
        <label key={opt} className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={selected.includes(opt)}
            onChange={() => onToggle(opt)}
            className={styles.checkboxInput}
          />
          {opt}
        </label>
      ))}
    </div>
  </div>
);

const QualificationsSection = ({ form, setField }) => {
  const toggle = (key) => (item) => {
    const arr = form[key];
    setField(key, arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item]);
  };

  return (
    <SectionCard number={3} title="Qualifications & Experience">
      <div className={styles.wrapper}>

        {/* Row 1: Min Qual + Additional Qual + Certifications */}
        <div className={styles.gridRow3}>
          <div>
            <label className={styles.fieldLabelBlock}>
              Minimum Qualification <span className={styles.requiredMark}>*</span>
            </label>
            <Select value={form.minQualification} onChange={(v) => setField("minQualification", v)} placeholder="Select" options={MIN_QUALIFICATIONS} />
          </div>

          <div>
            <label className={styles.fieldLabelBlock}>Additional Qualification</label>
            <Select value={form.additionalQualification} onChange={(v) => setField("additionalQualification", v)} placeholder="Select" options={ADDITIONAL_QUALIFICATIONS} />
          </div>

          <TagMultiSelect
            label={<>Certifications <span className={styles.optionalMark}>(Optional)</span></>}
            options={CERTIFICATIONS}
            selected={form.certifications}
            onToggle={toggle("certifications")}
          />
        </div>

        {/* Row 2: Experience + Student Level */}
        <div className={styles.gridRow2}>
          <div>
            <label className={styles.fieldLabelBlock}>
              Experience Required <span className={styles.requiredMark}>*</span>
            </label>
            <Select value={form.experience} onChange={(v) => setField("experience", v)} placeholder="Select Experience" options={EXPERIENCE_OPTIONS} />
          </div>

          <TagMultiSelect
            label="Student Level"
            options={STUDENT_LEVELS}
            selected={form.studentLevels}
            onToggle={toggle("studentLevels")}
          />
        </div>

        {/* Row 3: Preferred School Type */}
        <CheckboxGrid
          label={<>Preferred School Type <span className={styles.optionalMark}>(Select all that apply)</span></>}
          options={PREFERRED_SCHOOL_TYPES}
          selected={form.preferredSchoolTypes}
          onToggle={toggle("preferredSchoolTypes")}
          cols={4}
        />
      </div>
    </SectionCard>
  );
};

export default QualificationsSection;
