import SectionCard from "./SectionCard";
import postjob from "../../../dropdown/School_module/postjob.json";
import { PUBLISH_OPTIONS } from "../../lib/postjobOptions";

const { Gender_preference: GENDER_PREFERENCES, Interview_mode: INTERVIEW_MODES } = postjob;

const inputCls =
  "w-full rounded-xl border border-borderColor bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10";

const PillGroup = ({ label, options, value, onSelect }) => (
  <div>
    <p className="mb-2 text-xs font-bold text-slate-600">{label}</p>
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

const HiringPreferences = ({ form, setField }) => (
  <SectionCard number={7} title="Hiring Preferences">
    <div className="space-y-6">
      {/* Row 1: Gender + Interview Mode (both optional) */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
        />
      </div>

      {/* Publish Settings */}
      <div className="border-t border-borderColor pt-5">
        <p className="mb-3 text-xs font-bold text-slate-600">
          Publish Settings <span className="text-red-500">*</span>
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {PUBLISH_OPTIONS.map(({ val, icon: Icon, sub }) => {
            const active = form.publishOption === val;
            return (
              <button
                key={val}
                type="button"
                onClick={() => setField("publishOption", val)}
                className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
                  active
                    ? "border-primary bg-primary/5"
                    : "border-borderColor hover:border-primary/40"
                }`}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    active ? "bg-primary text-white" : "bg-light text-slate-400"
                  }`}
                >
                  <Icon size={18} />
                </span>
                <span>
                  <span className="block text-sm font-bold text-slate-800">
                    {val}
                  </span>
                  <span className="block text-xs text-slate-400">{sub}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Date & time pickers when scheduling */}
        {form.publishOption === "Publish Later" && (
          <div className="mt-4 grid grid-cols-1 gap-4 rounded-xl border border-primary/20 bg-primary/5 p-4 sm:grid-cols-2">
            <div>
              <p className="mb-1.5 text-xs font-bold text-slate-600">
                Publish Date <span className="text-red-500">*</span>
              </p>
              <input
                type="date"
                value={form.publishDate}
                onChange={(e) => setField("publishDate", e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <p className="mb-1.5 text-xs font-bold text-slate-600">
                Publish Time <span className="text-red-500">*</span>
              </p>
              <input
                type="time"
                value={form.publishTime}
                onChange={(e) => setField("publishTime", e.target.value)}
                className={inputCls}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  </SectionCard>
);

export default HiringPreferences;
