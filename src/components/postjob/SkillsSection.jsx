import { X } from "lucide-react";
import SectionCard from "./SectionCard";
import postjob from "../../../dropdown/School_module/postjob.json";
import styles from "./styles/SkillsSection.module.css";
import { Button } from "@cloudstrytech/ui-components";


const { Required_skill: REQUIRED_SKILLS, Technical_skill: TECHNICAL_SKILLS } = postjob;

const SkillPicker = ({ label, allSkills, selected, onToggle }) => (
  <div>
    <p className={styles.pickerLabel}>{label}</p>
    <div className={styles.pickerRow}>
      {allSkills.map((skill) => {
        const active = selected.includes(skill);
        return (
          <Button
            key={skill}
            variant={active ? "filled" : "outlined"}
            onClick={() => onToggle(skill)}
            className={active ? styles.pillActive : styles.pill}
            endIcon={active ? <X size={10} /> : null}
          >
            {skill}
          </Button>
        );
      })}
    </div>
    {selected.length > 0 && (
      <p className={styles.selectedCount}>{selected.length} selected</p>
    )}
  </div>
);

const SkillsSection = ({ form, setField }) => {
  const toggle = (key) => (item) => {
    const arr = form[key];
    setField(key, arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item]);
  };

  return (
    <SectionCard number={5} title="Skills & Competencies" optional>
      <div className={styles.wrapper}>
        <SkillPicker
          label="Required Skills"
          allSkills={REQUIRED_SKILLS}
          selected={form.requiredSkills}
          onToggle={toggle("requiredSkills")}
        />
        <div className={styles.technicalSkillsBlock}>
          <SkillPicker
            label="Technical Skills"
            allSkills={TECHNICAL_SKILLS}
            selected={form.technicalSkills}
            onToggle={toggle("technicalSkills")}
          />
        </div>
      </div>
    </SectionCard>
  );
};

export default SkillsSection;
