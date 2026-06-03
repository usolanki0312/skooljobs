import SectionCard from "./SectionCard";
import {
  GENDER_PREFERENCES, INTERVIEW_MODES, HIRING_ROUNDS, PUBLISH_SETTINGS,
} from "../../lib/postjobOptions";

const PillGroup = ({ label, options, value, onSelect, required }) => (
  <div>
    <p className="mb-2 text-xs font-bold text-slate-600">
      {label} {required && <span className="text-red-500">*</span>}
    </p>
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onSelect(opt)}
          className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
            value === opt
              ? "border-primary bg-primary text-white"
              : "border-borderColor text-slate-600 hover:border-primary hover:text-primary"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  </div>
);

const HiringPreferences = ({ form, setField }) => {
  const togglePublish = (opt) => {
    const current = form.publishSettings;
    setField(
      "publishSettings",
      current.includes(opt) ? current.filter((x) => x !== opt) : [...current, opt],
    );
  };

  return (
    <SectionCard number={7} title="Hiring Preferences">
      <div className="space-y-6">

        {/* Row 1: Gender + Interview Mode + Rounds */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <PillGroup
            label="Gender Preference"
            options={GENDER_PREFERENCES}
            value={form.genderPreference}
            onSelect={(v) => setField("genderPreference", v)}
          />
          <PillGroup
            label="Interview Mode"
            options={INTERVIEW_MODES}
            value={form.interviewMode}
            onSelect={(v) => setField("interviewMode", v)}
            required
          />
          <PillGroup
            label="Number of Hiring Rounds"
            options={HIRING_ROUNDS}
            value={form.hiringRounds}
            onSelect={(v) => setField("hiringRounds", v)}
          />
        </div>

        {/* Publish Settings */}
        <div className="border-t border-borderColor pt-5">
          <p className="mb-3 text-xs font-bold text-slate-600">
            Publish Settings <span className="text-red-500">*</span>
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {PUBLISH_SETTINGS.map((opt) => {
              const active = form.publishSettings.includes(opt);
              return (
                <label key={opt} className={`flex cursor-pointer items-center gap-2.5 rounded-xl border p-3 transition ${
                  active ? "border-primary bg-primary/5" : "border-borderColor hover:border-primary/40"
                }`}>
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() => togglePublish(opt)}
                    className="h-4 w-4 accent-primary"
                  />
                  <span className="text-xs font-semibold text-slate-700">{opt}</span>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </SectionCard>
  );
};

export default HiringPreferences;
