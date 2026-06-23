import { Plus, Trash2, Info, HelpCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import SectionCard from "./SectionCard";
import common from "../../../dropdown/common/common.json";
import postjob from "../../../dropdown/School_module/postjob.json";
import styles from "./styles/LanguageRequirements.module.css";
import { Button, Select } from "@cloudstrytech/ui-components";

const { Indian_language: INDIAN_LANGUAGES, Foreign_language: FOREIGN_LANGUAGES, Language_type: LANGUAGE_TYPES } = common;
const { Proficiency_level: PROFICIENCY_LEVELS } = postjob;

const LanguageRequirements = ({ form, setField }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [tempType, setTempType] = useState("");
  const [tempLang, setTempLang] = useState("");
  const pickerRef = useRef(null);

  // Close the picker dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowPicker(false);
        setTempType("");
        setTempLang("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const addLanguage = (name) => {
    if (!name) return;
    if (form.languages.some((l) => l.name === name)) return;
    setField("languages", [...form.languages, { name, proficiency: "Fluent" }]);
  };

  const removeLanguage = (name) =>
    setField("languages", form.languages.filter((l) => l.name !== name));

  const setProficiency = (name, proficiency) =>
    setField("languages", form.languages.map((l) => (l.name === name ? { ...l, proficiency } : l)));

  const headerAction = (
    <div className={styles.pickerWrap} ref={pickerRef}>
      <Button
        variant="filled"
        onClick={() => {
          setShowPicker(!showPicker);
          setTempType("");
          setTempLang("");
        }}
        startIcon={<Plus size={16} />}
      >
        Add Language
      </Button>
      {showPicker && (
        <div className={styles.pickerPanel}>
          <div>
            <label className={styles.pickerLabel}>
              Language Type
            </label>
            <Select
              value={tempType}
              onChange={(value) => {
                setTempType(value);
                setTempLang("");
              }}
              placeholder="Select Type..."
              options={LANGUAGE_TYPES}
            />
          </div>

          <div>
            <label className={styles.pickerLabel}>
              Choose Language
            </label>
            <Select
              value={tempLang}
              onChange={setTempLang}
              disabled={!tempType}
              placeholder={tempType ? "Select Language..." : "Choose Type first"}
              options={
                tempType
                  ? (tempType === "Indian" ? INDIAN_LANGUAGES : FOREIGN_LANGUAGES)
                    .filter((l) => !form.languages.some((fl) => fl.name === l))
                  : []
              }
              className={styles.pickerSelect}
            />
          </div>
          <Button
            variant="filled"
            disabled={!tempLang}
            onClick={() => {
              addLanguage(tempLang);
              setTempLang("");
              setTempType("");
              setShowPicker(false);
            }}
          >
            Add to List
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <SectionCard number={2} title="Language Requirement" headerAction={headerAction}>
      <div className={styles.contentGrid}>
        {/* Left Side: Table & Info Box */}
        <div className={styles.leftCol}>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.tableHeadRow}>
                  <th className={styles.thLanguage}>Language</th>
                  <th className={styles.th}>
                    <span className={styles.thInner}>
                      Required Proficiency Level <span className={styles.required}>*</span>
                      <HelpCircle size={14} className={styles.helpIcon} title="Expected level of proficiency" />
                    </span>
                  </th>
                  <th className={styles.thAction}>Action</th>
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                {form.languages.length === 0 ? (
                  <tr>
                    <td colSpan={3} className={styles.emptyCell}>
                      No languages added yet. Click "+ Add Language" at the top right to start.
                    </td>
                  </tr>
                ) : (
                  form.languages.map((l) => (
                    <tr key={l.name} className={styles.row}>
                      <td className={styles.tdName}>{l.name}</td>
                      <td className={styles.td}>
                        <Select
                          value={l.proficiency}
                          onChange={(v) => setProficiency(l.name, v)}
                          options={PROFICIENCY_LEVELS}
                          className={styles.proficiencySelect}
                        />
                      </td>
                      <td className={styles.tdCenter}>
                        <button
                          type="button"
                          onClick={() => removeLanguage(l.name)}
                          className={styles.removeButton}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className={styles.infoBox}>
            <Info size={16} className={styles.infoIcon} />
            <p>Add all languages required for the job and select the minimum proficiency level expected for each.</p>
          </div>
        </div>

        {/* Right Side: Guidelines Card */}
        <div className={styles.guidelinesCard}>
          <h4 className={styles.guidelinesTitle}>Proficiency Levels</h4>
          <ul className={styles.guidelinesList}>
            <li className={styles.guidelinesItem}>
              <span className={styles.guidelinesDot} />
              <span><strong>Basic</strong> – Understands simple conversations</span>
            </li>
            <li className={styles.guidelinesItem}>
              <span className={styles.guidelinesDot} />
              <span><strong>Intermediate</strong> – Can handle basic communication</span>
            </li>
            <li className={styles.guidelinesItem}>
              <span className={styles.guidelinesDot} />
              <span><strong>Conversational</strong> – Comfortable in daily conversations</span>
            </li>
            <li className={styles.guidelinesItem}>
              <span className={styles.guidelinesDot} />
              <span><strong>Professional</strong> – Can communicate in professional settings</span>
            </li>
            <li className={styles.guidelinesItem}>
              <span className={styles.guidelinesDot} />
              <span><strong>Fluent</strong> – Highly proficient</span>
            </li>
            <li className={styles.guidelinesItem}>
              <span className={styles.guidelinesDot} />
              <span><strong>Native</strong> – Native level proficiency</span>
            </li>
          </ul>
        </div>
      </div>
    </SectionCard>
  );
};

export default LanguageRequirements;
