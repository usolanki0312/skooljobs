import SectionCard from "./SectionCard";
import postjob from "../../../dropdown/School_module/postjob.json";
import { PUBLISH_OPTIONS } from "../../lib/postjobOptions";
import styles from "./styles/HiringPreferences.module.css";
import { Button, Input } from "@cloudstrytech/ui-components";

const { Gender_preference: GENDER_PREFERENCES, Interview_mode: INTERVIEW_MODES } = postjob;

const inputCls = styles.input;

const PillGroup = ({ label, options, value, onSelect }) => (
  <div>
    <p className={styles.pillGroupLabel}>{label}</p>
    <div className={styles.pillRow}>
      {options.map((opt) => (
        <Button
          key={opt}
          variant={value === opt ? "filled" : "outlined"}
          onClick={() => onSelect(opt)}
          className={value === opt ? styles.pillActive : styles.pill}
        >
          {opt}
        </Button>
      ))}
    </div>
  </div>
);

const HiringPreferences = ({ form, setField }) => (
  <SectionCard number={7} title="Hiring Preferences">
    <div className={styles.wrapper}>
      {/* Row 1: Gender + Interview Mode (both optional) */}
      <div className={styles.preferencesRow}>
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
      <div className={styles.publishBlock}>
        <p className={styles.publishLabel}>
          Publish Settings <span className={styles.requiredMark}>*</span>
        </p>
        <div className={styles.publishOptionsGrid}>
          {PUBLISH_OPTIONS.map(({ val, icon: Icon, sub }) => {
            const active = form.publishOption === val;
            return (
              <Button
                key={val}
                variant={active ? "filled" : "outlined"}
                onClick={() => setField("publishOption", val)}
                className={active ? styles.publishOptionActive : styles.publishOption}
                startIcon={<Icon size={18} />}
              >
                <span>
                  <span className={styles.publishOptionTitle}>{val}</span>
                  <span className={styles.publishOptionSub}>{sub}</span>
                </span>
              </Button>);
          })}
        </div>

        {/* Date & time pickers when scheduling */}
        {form.publishOption === "Publish Later" && (
          <div className={styles.scheduleGrid}>
            <div>
              <p className={styles.scheduleLabel}>
                Publish Date <span className={styles.requiredMark}>*</span>
              </p>
              <Input
                type="date"
                value={form.publishDate}
                fieldClassName="host-tweak"
                onChange={(value) => setField("publishDate", value)}
              />
            </div>
            <div>
              <p className={styles.scheduleLabel}>
                Publish Time <span className={styles.requiredMark}>*</span>
              </p>
              <Input
                type="time"
                fieldClassName="host-tweak"
                value={form.publishTime}
                onChange={(value) => setField("publishTime", value)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  </SectionCard>
);

export default HiringPreferences;
