import { X } from "lucide-react";
import SectionCard from "./SectionCard";
import postjob from "../../../dropdown/School_module/postjob.json";

const { Required_skill: REQUIRED_SKILLS, Technical_skill: TECHNICAL_SKILLS } = postjob;

const SkillPicker = ({ label, allSkills, selected, onToggle }) => (
  <div>
    <p className="mb-3 text-xs font-bold text-slate-600">{label}</p>
    <div className="flex flex-wrap gap-2">
      {allSkills.map((skill) => {
        const active = selected.includes(skill);
        return (
          <button
            key={skill}
            type="button"
            onClick={() => onToggle(skill)}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition ${
              active
                ? "border-primary bg-primary text-white"
                : "border-borderColor text-slate-600 hover:border-primary hover:text-primary"
            }`}
          >
            {skill}
            {active && <X size={10} />}
          </button>
        );
      })}
    </div>
    {selected.length > 0 && (
      <p className="mt-2 text-xs text-slate-400">{selected.length} selected</p>
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
      <div className="space-y-6">
        <SkillPicker
          label="Required Skills"
          allSkills={REQUIRED_SKILLS}
          selected={form.requiredSkills}
          onToggle={toggle("requiredSkills")}
        />
        <div className="border-t border-borderColor pt-5">
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
