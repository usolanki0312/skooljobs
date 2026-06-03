import MinMaxInput from "./MinMaxInput";
import SectionCard from "./SectionCard";
import {
  COMPENSATION_STRUCTURES, MONTHLY_BENEFITS, ANNUAL_BENEFITS,
} from "../../lib/postjobOptions";

const CONTRACT_DURATIONS  = ["3 Months", "6 Months", "9 Months", "1 Year", "2 Years"];
const HOURS_PER_WEEK      = ["5-10 Hours", "10-20 Hours", "20-30 Hours", "30-40 Hours"];
const WFH_DAYS            = ["1 Day/Week", "2-3 Days/Week", "3-4 Days/Week"];
const OFFICE_DAYS         = ["1 Day/Week", "2-3 Days/Week", "3-4 Days/Week", "5 Days/Week"];
const TIMEZONES           = ["India (IST)", "UK (GMT)", "USA (EST)", "USA (PST)", "UAE (GST)", "Singapore (SGT)"];
const INTERNSHIP_DURATIONS = ["1 Month", "2 Months", "3 Months", "6 Months", "1 Year"];

const selectCls =
  "w-full rounded-xl border border-borderColor bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10";

const SubLabel = ({ children }) => (
  <p className="mb-3 text-xs font-bold uppercase tracking-wide text-primary">{children}</p>
);

const BenefitCheckboxes = ({ title, list, selected, onToggle }) => (
  <div>
    <SubLabel>{title}</SubLabel>
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {list.map((b) => (
        <label key={b} className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={selected.includes(b)} onChange={() => onToggle(b)}
            className="h-4 w-4 accent-primary" />
          {b}
        </label>
      ))}
    </div>
  </div>
);

// ── Per-type salary panels ─────────────────────────────────────────────────

const FullTimeSalary = ({ form, setField, toggleMonthlyBenefit, toggleAnnualBenefit }) => (
  <div className="space-y-5">
    <div className="rounded-xl border border-borderColor bg-light p-4 space-y-4">
      <SubLabel>Salary Structure</SubLabel>
      <MinMaxInput label="Annual CTC (₹)"
        minValue={form.minAnnualCTC} maxValue={form.maxAnnualCTC}
        onMinChange={(v) => setField("minAnnualCTC", v)} onMaxChange={(v) => setField("maxAnnualCTC", v)} />
      <MinMaxInput label="Monthly In-Hand Salary (₹)"
        minValue={form.minMonthlySalary} maxValue={form.maxMonthlySalary}
        onMinChange={(v) => setField("minMonthlySalary", v)} onMaxChange={(v) => setField("maxMonthlySalary", v)} />
    </div>
    <BenefitCheckboxes title="Monthly Benefits" list={MONTHLY_BENEFITS} selected={form.monthlyBenefits} onToggle={toggleMonthlyBenefit} />
    <BenefitCheckboxes title="Annual Benefits" list={ANNUAL_BENEFITS} selected={form.annualBenefits} onToggle={toggleAnnualBenefit} />
    <p className="flex items-start gap-2 rounded-xl bg-amber-50 px-4 py-3 text-xs text-amber-700">
      <span>ℹ</span> The In-Hand salary is an estimate and may vary based on deductions and other factors.
    </p>
  </div>
);

const PartTimeSalary = ({ form, setField }) => (
  <div className="space-y-4">
    <div className="rounded-xl border border-borderColor bg-light p-4 space-y-4">
      <SubLabel>Hourly Compensation</SubLabel>
      <MinMaxInput label="Hourly Rate (₹)"
        minValue={form.minHourlyRate} maxValue={form.maxHourlyRate}
        onMinChange={(v) => setField("minHourlyRate", v)} onMaxChange={(v) => setField("maxHourlyRate", v)}
        suffix="per hour" />
      <div>
        <p className="mb-2 text-xs font-bold text-slate-600">Expected Hours Per Week</p>
        <select value={form.hoursPerWeek} onChange={(e) => setField("hoursPerWeek", e.target.value)} className={selectCls}>
          <option value="">Select</option>
          {HOURS_PER_WEEK.map((h) => <option key={h}>{h}</option>)}
        </select>
      </div>
    </div>
  </div>
);

const ContractSalary = ({ form, setField }) => (
  <div className="space-y-4">
    <div className="rounded-xl border border-borderColor bg-light p-4 space-y-4">
      <SubLabel>Contract Details</SubLabel>
      <div>
        <p className="mb-2 text-xs font-bold text-slate-600">Contract Duration</p>
        <select value={form.contractDuration} onChange={(e) => setField("contractDuration", e.target.value)} className={selectCls}>
          <option value="">Select Duration</option>
          {CONTRACT_DURATIONS.map((d) => <option key={d}>{d}</option>)}
        </select>
      </div>
      <div>
        <p className="mb-2 text-xs font-bold text-slate-600">Payment Type</p>
        <div className="flex gap-4">
          {["Monthly Payment (₹)", "Total Contract Value (₹)"].map((type) => (
            <label key={type} className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
              <input type="radio" name="contractPaymentType" value={type}
                checked={form.contractPaymentType === type}
                onChange={() => setField("contractPaymentType", type)}
                className="accent-primary" />
              {type}
            </label>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-xl border border-borderColor bg-white px-3 py-2.5 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
        <span className="text-sm font-bold text-slate-400">₹</span>
        <input type="number"
          value={form.contractPaymentType === "Monthly Payment (₹)" ? form.contractMonthlyPayment : form.contractTotalValue}
          onChange={(e) => form.contractPaymentType === "Monthly Payment (₹)"
            ? setField("contractMonthlyPayment", e.target.value)
            : setField("contractTotalValue", e.target.value)}
          placeholder={form.contractPaymentType === "Monthly Payment (₹)" ? "e.g. 30,000" : "e.g. 1,80,000"}
          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" />
      </div>
    </div>
  </div>
);

const HybridSalary = ({ form, setField }) => (
  <div className="space-y-4">
    <div className="rounded-xl border border-borderColor bg-light p-4 space-y-4">
      <SubLabel>Salary Range</SubLabel>
      <MinMaxInput label="Monthly Salary (₹)"
        minValue={form.minMonthlySalary} maxValue={form.maxMonthlySalary}
        onMinChange={(v) => setField("minMonthlySalary", v)} onMaxChange={(v) => setField("maxMonthlySalary", v)} />
    </div>
    <div className="rounded-xl border border-borderColor bg-light p-4">
      <SubLabel>Work Arrangement</SubLabel>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="mb-2 text-xs font-bold text-slate-600">Work From Home Days</p>
          <select value={form.wfhDays} onChange={(e) => setField("wfhDays", e.target.value)} className={selectCls}>
            <option value="">Select</option>
            {WFH_DAYS.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <p className="mb-2 text-xs font-bold text-slate-600">Office Days</p>
          <select value={form.officeDays} onChange={(e) => setField("officeDays", e.target.value)} className={selectCls}>
            <option value="">Select</option>
            {OFFICE_DAYS.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>
      </div>
    </div>
  </div>
);

const RemoteSalary = ({ form, setField }) => (
  <div className="space-y-4">
    <div className="rounded-xl border border-borderColor bg-light p-4 space-y-4">
      <SubLabel>Salary Range</SubLabel>
      <MinMaxInput label="Monthly Salary (₹)"
        minValue={form.minMonthlySalary} maxValue={form.maxMonthlySalary}
        onMinChange={(v) => setField("minMonthlySalary", v)} onMaxChange={(v) => setField("maxMonthlySalary", v)} />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="mb-2 text-xs font-bold text-slate-600">Work Timezone</p>
        <select value={form.workTimezone} onChange={(e) => setField("workTimezone", e.target.value)} className={selectCls}>
          <option value="">Select Timezone</option>
          {TIMEZONES.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div>
        <p className="mb-2 text-xs font-bold text-slate-600">Location Preference</p>
        <input value={form.remoteLocation} onChange={(e) => setField("remoteLocation", e.target.value)}
          placeholder="Any Location" className={selectCls} />
      </div>
    </div>
  </div>
);

const InternshipSalary = ({ form, setField }) => (
  <div className="space-y-4">
    <div className="rounded-xl border border-borderColor bg-light p-4 space-y-4">
      <SubLabel>Stipend Structure</SubLabel>
      <div>
        <p className="mb-2 text-xs font-bold text-slate-600">Internship Duration</p>
        <select value={form.internshipDuration} onChange={(e) => setField("internshipDuration", e.target.value)} className={selectCls}>
          <option value="">Select Duration</option>
          {INTERNSHIP_DURATIONS.map((d) => <option key={d}>{d}</option>)}
        </select>
      </div>
      <MinMaxInput label="Monthly Stipend (₹)"
        minValue={form.minStipend} maxValue={form.maxStipend}
        onMinChange={(v) => setField("minStipend", v)} onMaxChange={(v) => setField("maxStipend", v)} />
    </div>
  </div>
);

// ── Panel meta ─────────────────────────────────────────────────────────────
const PANEL_META = {
  "Full Time":  { icon: "💼", subtitle: "Salary & Benefits" },
  "Part Time":  { icon: "⏰", subtitle: "Hourly Compensation" },
  "Contract":   { icon: "📋", subtitle: "Contract Compensation" },
  "Hybrid":     { icon: "🏠", subtitle: "Monthly Salary" },
  "Remote":     { icon: "💻", subtitle: "Monthly Salary" },
  "Internship": { icon: "🎓", subtitle: "Stipend Details" },
};

const SalaryBenefits = ({ form, setField }) => {
  const toggle = (key) => (item) => {
    const arr = form[key];
    setField(key, arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item]);
  };

  const type = form.employmentType;
  const meta = PANEL_META[type];

  return (
    <SectionCard number={6} title="Salary & Benefits">

      {/* Compensation structure */}
      <div className="mb-5">
        <p className="mb-2 text-xs font-bold text-slate-600">Compensation Structure</p>
        <div className="flex flex-wrap gap-2">
          {COMPENSATION_STRUCTURES.map((s) => (
            <button key={s} type="button"
              onClick={() => setField("compensationStructure", s)}
              className={`rounded-full border px-4 py-1.5 text-sm font-bold transition ${
                form.compensationStructure === s
                  ? "border-primary bg-primary text-white"
                  : "border-borderColor text-slate-600 hover:border-primary hover:text-primary"
              }`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {!type ? (
        <p className="rounded-xl bg-light px-4 py-5 text-center text-sm text-slate-400">
          Select an Employment Type in Section 1 to configure salary details.
        </p>
      ) : (
        <div className="rounded-xl border border-borderColor p-5">
          <div className="mb-5 flex items-center gap-3 border-b border-borderColor pb-4">
            <span className="text-2xl">{meta.icon}</span>
            <div>
              <p className="font-bold text-slate-800">{meta.subtitle}</p>
              <p className="text-xs text-slate-400">Fields change based on Employment Type</p>
            </div>
            <span className="ml-auto rounded-full border border-borderColor px-3 py-1 text-xs font-bold text-slate-500">
              {type}
            </span>
          </div>

          {type === "Full Time"  && <FullTimeSalary   form={form} setField={setField} toggleMonthlyBenefit={toggle("monthlyBenefits")} toggleAnnualBenefit={toggle("annualBenefits")} />}
          {type === "Part Time"  && <PartTimeSalary   form={form} setField={setField} />}
          {type === "Contract"   && <ContractSalary   form={form} setField={setField} />}
          {type === "Hybrid"     && <HybridSalary     form={form} setField={setField} />}
          {type === "Remote"     && <RemoteSalary     form={form} setField={setField} />}
          {type === "Internship" && <InternshipSalary form={form} setField={setField} />}
        </div>
      )}
    </SectionCard>
  );
};

export default SalaryBenefits;
