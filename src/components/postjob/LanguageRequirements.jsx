import { Plus, Trash2, Info, HelpCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import SectionCard from "./SectionCard";
import Select from "../ui/Select";
import common from "../../../dropdown/common/common.json";
import postjob from "../../../dropdown/School_module/postjob.json";

const { Indian_language: INDIAN_LANGUAGES, Foreign_language: FOREIGN_LANGUAGES } = common;
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
    <div className="relative" ref={pickerRef}>
      <button
        type="button"
        onClick={() => {
          setShowPicker(!showPicker);
          setTempType("");
          setTempLang("");
        }}
        className="flex items-center gap-1.5 rounded-xl border border-primary px-4 py-2.5 text-sm font-bold text-primary hover:bg-primary/5 transition cursor-pointer"
      >
        <Plus size={16} /> Add Language
      </button>
      {showPicker && (
        <div className="absolute right-0 top-12 z-50 w-64 rounded-2xl border border-borderColor bg-white p-4 shadow-[0_8px_32px_rgba(0,0,0,0.12)] space-y-3">
          <div>
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Language Type
            </label>
            <Select
              value={tempType}
              onChange={(v) => { setTempType(v); setTempLang(""); }}
              placeholder="Select Type..."
              options={[
                { label: "Indian Languages", value: "Indian" },
                { label: "Foreign Languages", value: "Foreign" },
              ]}
              className="w-full rounded-xl border border-borderColor bg-white px-3 py-2 text-sm focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
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
              className="w-full rounded-xl border border-borderColor bg-white px-3 py-2 text-sm focus:border-primary"
            />
          </div>

          <button
            type="button"
            disabled={!tempLang}
            onClick={() => {
              addLanguage(tempLang);
              setTempLang("");
              setTempType("");
              setShowPicker(false);
            }}
            className="w-full rounded-xl bg-primary py-2 text-xs font-bold text-white hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Add to List
          </button>
        </div>
      )}
    </div>
  );

  return (
    <SectionCard number={2} title="Language Requirement" headerAction={headerAction}>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        {/* Left Side: Table & Info Box */}
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-xl border border-borderColor bg-white">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-borderColor bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <th className="px-5 py-4 w-1/3">Language</th>
                  <th className="px-5 py-4">
                    <span className="flex items-center gap-1.5">
                      Required Proficiency Level <span className="text-red-500">*</span>
                      <HelpCircle size={14} className="text-slate-400 cursor-pointer" title="Expected level of proficiency" />
                    </span>
                  </th>
                  <th className="px-5 py-4 text-center w-24">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borderColor">
                {form.languages.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-5 py-8 text-center text-sm text-slate-400 italic">
                      No languages added yet. Click "+ Add Language" at the top right to start.
                    </td>
                  </tr>
                ) : (
                  form.languages.map((l) => (
                    <tr key={l.name} className="hover:bg-slate-50/50 transition">
                      <td className="px-5 py-4 font-semibold text-slate-800">{l.name}</td>
                      <td className="px-5 py-4">
                        <Select
                          value={l.proficiency}
                          onChange={(v) => setProficiency(l.name, v)}
                          options={PROFICIENCY_LEVELS}
                          className="w-full max-w-xs rounded-xl border border-borderColor bg-white px-4 py-2.5 text-sm focus:border-primary focus:ring-4 focus:ring-primary/10"
                        />
                      </td>
                      <td className="px-5 py-4 text-center">
                        <button
                          type="button"
                          onClick={() => removeLanguage(l.name)}
                          className="rounded-xl p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 transition cursor-pointer"
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

          <div className="flex items-start gap-2.5 rounded-xl border border-blue-100 bg-blue-50/50 p-4 text-xs leading-relaxed text-blue-700">
            <Info size={16} className="mt-0.5 shrink-0 text-blue-500" />
            <p>Add all languages required for the job and select the minimum proficiency level expected for each.</p>
          </div>
        </div>

        {/* Right Side: Guidelines Card */}
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50/30 p-5 text-sm">
          <h4 className="font-bold text-indigo-955 mb-3 text-indigo-900">Proficiency Levels</h4>
          <ul className="space-y-2.5 text-xs text-indigo-900/80">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong>Basic</strong> – Understands simple conversations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong>Intermediate</strong> – Can handle basic communication</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong>Conversational</strong> – Comfortable in daily conversations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong>Professional</strong> – Can communicate in professional settings</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong>Fluent</strong> – Highly proficient</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong>Native</strong> – Native level proficiency</span>
            </li>
          </ul>
        </div>
      </div>
    </SectionCard>
  );
};

export default LanguageRequirements;
