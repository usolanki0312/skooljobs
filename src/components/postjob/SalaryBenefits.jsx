import MinMaxInput from "./MinMaxInput";
import SectionCard from "./SectionCard";
import postjob from "../../../dropdown/School_module/postjob.json";
import styles from "./styles/SalaryBenefits.module.css";
import { Button, Input, Select } from "@cloudstrytech/ui-components";
import { toOptions } from "../../lib/selectOptions";

const {
  Compensation_structure: COMPENSATION_STRUCTURES,
  Contract_duration: CONTRACT_DURATIONS_RAW,
  Hours_per_week: HOURS_PER_WEEK_RAW,
  Wfh_days: WFH_DAYS_RAW,
  Office_days: OFFICE_DAYS_RAW,
  Timezone: TIMEZONES_RAW,
  Internship_duration: INTERNSHIP_DURATIONS_RAW,
} = postjob;

const CONTRACT_DURATIONS = toOptions(CONTRACT_DURATIONS_RAW);
const HOURS_PER_WEEK = toOptions(HOURS_PER_WEEK_RAW);
const WFH_DAYS = toOptions(WFH_DAYS_RAW);
const OFFICE_DAYS = toOptions(OFFICE_DAYS_RAW);
const TIMEZONES = toOptions(TIMEZONES_RAW);
const INTERNSHIP_DURATIONS = toOptions(INTERNSHIP_DURATIONS_RAW);

const selectCls = styles.selectFieldWrap;

const SubLabel = ({ children }) => (
  <p className={styles.subLabel}>
    {children}
  </p>
);

const BenefitCheckboxes = ({ title, list, selected, onToggle }) => (
  <div>
    <SubLabel>{title}</SubLabel>
    <div className={styles.checkboxGrid}>
      {list.map((b) => (
        <label
          key={b}
          className={styles.checkboxLabel}
        >
          <Input
            type="checkbox"
            checked={selected.includes(b)}
            onChange={() => onToggle(b)}
          />
          {b}
        </label>
      ))}
    </div>
  </div>
);

// ── Per-type salary panels ─────────────────────────────────────────────────

const FullTimeSalary = ({
  form,
  setField,
  toggleMonthlyBenefit,
  toggleAnnualBenefit,
}) => {
  const pct = Number(form.inHandPercentage) || 0;
  const monthlyInHand = (ctc) => {
    const n = Number(ctc);
    if (!n || !pct) return "";
    return Math.round((n * pct) / 100 / 12);
  };

  return (
    <div className={styles.panelStack}>
      <div className={styles.panelBox}>
        <SubLabel>Salary Structure</SubLabel>

        <MinMaxInput
          label="Annual CTC (₹)"
          minValue={form.minAnnualCTC}
          maxValue={form.maxAnnualCTC}
          onMinChange={(v) => setField("minAnnualCTC", v)}
          onMaxChange={(v) => setField("maxAnnualCTC", v)}
        />

        {/* In-hand take-home percentage of the CTC */}
        <div>
          <p className={styles.fieldLabel}>
            In-Hand Percentage (% of CTC)
          </p>
          <div className={styles.percentField}>
            <Input
              type="number"
              min="0"
              max="100"
              value={form.inHandPercentage}
              onChange={(value) => setField("inHandPercentage", value)}
              placeholder="75"
            />
            <span className={styles.percentSign}>%</span>
          </div>
          <p className={styles.helperText}>
            Take-home portion of CTC after deductions. Monthly in-hand is
            calculated automatically.
          </p>
        </div>

        <MinMaxInput
          label="Monthly In-Hand Salary (₹) — auto-calculated"
          minValue={monthlyInHand(form.minAnnualCTC)}
          maxValue={monthlyInHand(form.maxAnnualCTC)}
          readOnly
        />
      </div>
    </div>
  );
};

const PartTimeSalary = ({ form, setField }) => (
  <div className={styles.panelStackTight}>
    <div className={styles.panelBox}>
      <SubLabel>Hourly Compensation</SubLabel>
      <MinMaxInput
        label="Hourly Rate (₹)"
        minValue={form.minHourlyRate}
        maxValue={form.maxHourlyRate}
        onMinChange={(v) => setField("minHourlyRate", v)}
        onMaxChange={(v) => setField("maxHourlyRate", v)}
        suffix="per hour"
      />
      <div>
        <p className={styles.fieldLabel}>
          Expected Hours Per Week
        </p>
        <Select value={form.hoursPerWeek} onChange={(v) => setField("hoursPerWeek", v)} placeholder="Select" options={HOURS_PER_WEEK} />
      </div>
    </div>
  </div>
);

const ContractSalary = ({ form, setField }) => (
  <div className={styles.panelStackTight}>
    <div className={styles.panelBox}>
      <SubLabel>Contract Details</SubLabel>
      <div>
        <p className={styles.fieldLabel}>
          Contract Duration
        </p>
        <Select value={form.contractDuration} onChange={(v) => setField("contractDuration", v)} placeholder="Select Duration" options={CONTRACT_DURATIONS} />
      </div>
      <div>
        <p className={styles.fieldLabel}>Payment Type</p>
        <div className={styles.radioRow}>
          {["Monthly Payment (₹)", "Total Contract Value (₹)"].map((type) => (
            <label
              key={type}
              className={styles.radioLabel}
            >
              <Input
                type="radio"
                name="contractPaymentType"
                value={type}
                checked={form.contractPaymentType === type}
                onChange={() => setField("contractPaymentType", type)}
              />
              {type}
            </label>
          ))}
        </div>
      </div>
      <div className={styles.amountField}>
        <span className={styles.amountPrefix}>₹</span>
        <input
          type="number"
          value={
            form.contractPaymentType === "Monthly Payment (₹)"
              ? form.contractMonthlyPayment
              : form.contractTotalValue
          }
          onChange={(e) =>
            form.contractPaymentType === "Monthly Payment (₹)"
              ? setField("contractMonthlyPayment", e.target.value)
              : setField("contractTotalValue", e.target.value)
          }
          placeholder={
            form.contractPaymentType === "Monthly Payment (₹)"
              ? "e.g. 30,000"
              : "e.g. 1,80,000"
          }
          className={styles.amountInput}
        />
      </div>
    </div>
  </div>
);

const HybridSalary = ({ form, setField }) => (
  <div className={styles.panelStackTight}>
    <div className={styles.panelBox}>
      <SubLabel>Salary Range</SubLabel>
      <MinMaxInput
        label="Monthly Salary (₹)"
        minValue={form.minMonthlySalary}
        maxValue={form.maxMonthlySalary}
        onMinChange={(v) => setField("minMonthlySalary", v)}
        onMaxChange={(v) => setField("maxMonthlySalary", v)}
      />
    </div>
    <div className={styles.panelBox}>
      <SubLabel>Work Arrangement</SubLabel>
      <div className={styles.twoColGrid}>
        <div>
          <p className={styles.fieldLabel}>
            Work From Home Days
          </p>
          <Select value={form.wfhDays} onChange={(v) => setField("wfhDays", v)} placeholder="Select" options={WFH_DAYS} />
        </div>
        <div>
          <p className={styles.fieldLabel}>Office Days</p>
          <Select value={form.officeDays} onChange={(v) => setField("officeDays", v)} placeholder="Select" options={OFFICE_DAYS} />
        </div>
      </div>
    </div>
  </div>
);

const RemoteSalary = ({ form, setField }) => (
  <div className={styles.panelStackTight}>
    <div className={styles.panelBox}>
      <SubLabel>Salary Range</SubLabel>
      <MinMaxInput
        label="Monthly Salary (₹)"
        minValue={form.minMonthlySalary}
        maxValue={form.maxMonthlySalary}
        onMinChange={(v) => setField("minMonthlySalary", v)}
        onMaxChange={(v) => setField("maxMonthlySalary", v)}
      />
    </div>
    <div className={styles.twoColGrid}>
      <div>
        <p className={styles.fieldLabel}>Work Timezone</p>
        <Select value={form.workTimezone} onChange={(v) => setField("workTimezone", v)} placeholder="Select Timezone" options={TIMEZONES} />
      </div>
      <div>
        <p className={styles.fieldLabel}>
          Location Preference
        </p>
        <Input
          type="number"
          value={
            form.contractPaymentType === "Monthly Payment (₹)"
              ? form.contractMonthlyPayment
              : form.contractTotalValue
          }
          onChange={(value) =>
            form.contractPaymentType === "Monthly Payment (₹)"
              ? setField("contractMonthlyPayment", value)
              : setField("contractTotalValue", value)
          }
          placeholder={
            form.contractPaymentType === "Monthly Payment (₹)"
              ? "e.g. 30,000"
              : "e.g. 1,80,000"
          }
        />
      </div>
    </div>
  </div>
);

const InternshipSalary = ({ form, setField }) => (
  <div className={styles.panelStackTight}>
    <div className={styles.panelBox}>
      <SubLabel>Stipend Structure</SubLabel>
      <div>
        <p className={styles.fieldLabel}>
          Internship Duration
        </p>
        <Select value={form.internshipDuration} onChange={(v) => setField("internshipDuration", v)} placeholder="Select Duration" options={INTERNSHIP_DURATIONS} />
      </div>
      <MinMaxInput
        label="Monthly Stipend (₹)"
        minValue={form.minStipend}
        maxValue={form.maxStipend}
        onMinChange={(v) => setField("minStipend", v)}
        onMaxChange={(v) => setField("maxStipend", v)}
      />
    </div>
  </div>
);

// ── Panel meta ─────────────────────────────────────────────────────────────
const PANEL_META = {
  "Full Time": { icon: "💼", subtitle: "Salary & Benefits" },
  "Part Time": { icon: "⏰", subtitle: "Hourly Compensation" },
  Contract: { icon: "📋", subtitle: "Contract Compensation" },
  Hybrid: { icon: "🏠", subtitle: "Monthly Salary" },
  Remote: { icon: "💻", subtitle: "Monthly Salary" },
  Internship: { icon: "🎓", subtitle: "Stipend Details" },
};

const SalaryBenefits = ({ form, setField }) => {
  const toggle = (key) => (item) => {
    const arr = form[key];
    setField(
      key,
      arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item],
    );
  };

  const type = form.employmentType;
  const meta = PANEL_META[type];

  return (
    <SectionCard number={6} title="Salary & Benefits">
      {/* Compensation structure */}
      <div className={styles.compWrap}>
        <p className={styles.fieldLabel}>
          Compensation Structure
        </p>
        <div className={styles.compButtonRow}>
          {COMPENSATION_STRUCTURES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setField("compensationStructure", s)}
              className={`${styles.compButton} ${form.compensationStructure === s ? styles.compButtonActive : ""
                }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {!type ? (
        <p className={styles.emptyState}>
          Select an Employment Type in Section 1 to configure salary details.
        </p>
      ) : (
        <div className={styles.panelOuter}>
          <div className={styles.panelHeader}>
            <span className={styles.panelIcon}>{meta.icon}</span>
            <div className={styles.panelHeaderText}>
              <p className={styles.panelTitle}>{meta.subtitle}</p>
              <p className={styles.panelSubtitle}>
                Fields change based on Employment Type
              </p>
            </div>
            <span className={styles.panelTypeBadge}>
              {type}
            </span>
          </div>

          {type === "Full Time" && (
            <FullTimeSalary
              form={form}
              setField={setField}
              toggleMonthlyBenefit={toggle("monthlyBenefits")}
              toggleAnnualBenefit={toggle("annualBenefits")}
            />
          )}
          {type === "Part Time" && (
            <PartTimeSalary form={form} setField={setField} />
          )}
          {type === "Contract" && (
            <ContractSalary form={form} setField={setField} />
          )}
          {type === "Hybrid" && (
            <HybridSalary form={form} setField={setField} />
          )}
          {type === "Remote" && (
            <RemoteSalary form={form} setField={setField} />
          )}
          {type === "Internship" && (
            <InternshipSalary form={form} setField={setField} />
          )}
        </div>
      )}
    </SectionCard>
  );
};

export default SalaryBenefits;
