import { X } from "lucide-react";
import SectionCard from "./SectionCard";
import Select from "../ui/Select";
import {
  MIN_QUALIFICATIONS, ADDITIONAL_QUALIFICATIONS, CERTIFICATIONS,
  EXPERIENCE_OPTIONS, PREFERRED_SCHOOL_TYPES, STUDENT_LEVELS,
} from "../../lib/postjobOptions";

const TagMultiSelect = ({ label, options, selected, onToggle }) => (
  <div>
    <p className="mb-2 text-xs font-bold text-slate-600">{label}</p>
    <div className="flex min-h-12 flex-wrap items-center gap-1.5 rounded-xl border border-borderColor bg-white px-3 py-2">
      {selected.map((c) => (
        <span key={c} className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
          {c}
          <button type="button" onClick={() => onToggle(c)} className="text-primary/60 hover:text-primary">
            <X size={10} />
          </button>
        </span>
      ))}
      <select
        value=""
        onChange={(e) => { if (e.target.value) onToggle(e.target.value); }}
        className="min-w-14 flex-1 bg-transparent text-xs text-slate-400 outline-none"
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
    <p className="mb-2 text-xs font-bold text-slate-600">{label}</p>
    <div className={`grid gap-2 grid-cols-2 sm:grid-cols-${cols}`}>
      {options.map((opt) => (
        <label key={opt} className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={selected.includes(opt)}
            onChange={() => onToggle(opt)}
            className="h-4 w-4 accent-primary"
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
      <div className="space-y-6">

        {/* Row 1: Min Qual + Additional Qual + Certifications */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-600">
              Minimum Qualification <span className="text-red-500">*</span>
            </label>
            <Select value={form.minQualification} onChange={(v) => setField("minQualification", v)} placeholder="Select" options={MIN_QUALIFICATIONS} />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-600">Additional Qualification</label>
            <Select value={form.additionalQualification} onChange={(v) => setField("additionalQualification", v)} placeholder="Select" options={ADDITIONAL_QUALIFICATIONS} />
          </div>

          <TagMultiSelect
            label={<>Certifications <span className="ml-1 text-xs font-normal text-slate-400">(Optional)</span></>}
            options={CERTIFICATIONS}
            selected={form.certifications}
            onToggle={toggle("certifications")}
          />
        </div>

        {/* Row 2: Experience + Student Level */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-600">
              Experience Required <span className="text-red-500">*</span>
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
          label={<>Preferred School Type <span className="ml-1 text-xs font-normal text-slate-400">(Select all that apply)</span></>}
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
