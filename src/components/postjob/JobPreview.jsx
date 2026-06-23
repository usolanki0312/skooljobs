import {
  Award, BadgeCheck, Briefcase, CalendarClock, GraduationCap,
  Languages, MapPin, Sparkles, Wallet, X,
} from "lucide-react";
import styles from "./styles/JobPreview.module.css";
import { Button } from "@cloudstrytech/ui-components";

const Chip = ({ children, tone = "primary" }) => {
  const tones = {
    primary: styles.chipPrimary,
    green: styles.chipGreen,
    slate: styles.chipSlate,
  };
  return (
    <span className={`${styles.chip} ${tones[tone]}`}>
      {children}
    </span>
  );
};

const Section = ({ icon: Icon, title, children }) => (
  <div>
    <h4 className={styles.sectionTitle}>
      <Icon size={16} className={styles.sectionIcon} /> {title}
    </h4>
    {children}
  </div>
);

const TagList = ({ items, empty = "—" }) =>
  items?.length ? (
    <div className={styles.tagListWrap}>
      {items.map((it) => <Chip key={it} tone="slate">{it}</Chip>)}
    </div>
  ) : (
    <p className={styles.tagListEmpty}>{empty}</p>
  );

const fmt = (v) => (v ? Number(v).toLocaleString("en-IN") : "");

const salarySummary = (form) => {
  switch (form.employmentType) {
    case "Full Time": {
      if (!form.minAnnualCTC && !form.maxAnnualCTC) return "Not specified";
      const pct = Number(form.inHandPercentage) || 0;
      const monthly = (ctc) => (Number(ctc) && pct ? Math.round((Number(ctc) * pct) / 100 / 12) : 0);
      return `₹${fmt(form.minAnnualCTC)} – ₹${fmt(form.maxAnnualCTC)} CTC/yr  ·  ~₹${fmt(monthly(form.minAnnualCTC))} – ₹${fmt(monthly(form.maxAnnualCTC))} in-hand/mo`;
    }
    case "Part Time":
      return form.minHourlyRate || form.maxHourlyRate
        ? `₹${fmt(form.minHourlyRate)} – ₹${fmt(form.maxHourlyRate)} / hour  ·  ${form.hoursPerWeek || ""}`
        : "Not specified";
    case "Contract":
      return form.contractPaymentType === "Monthly Payment (₹)"
        ? `₹${fmt(form.contractMonthlyPayment)} / month  ·  ${form.contractDuration || ""}`
        : `₹${fmt(form.contractTotalValue)} total  ·  ${form.contractDuration || ""}`;
    case "Hybrid":
    case "Remote":
      return form.minMonthlySalary || form.maxMonthlySalary
        ? `₹${fmt(form.minMonthlySalary)} – ₹${fmt(form.maxMonthlySalary)} / month`
        : "Not specified";
    case "Internship":
      return form.minStipend || form.maxStipend
        ? `₹${fmt(form.minStipend)} – ₹${fmt(form.maxStipend)} stipend/mo  ·  ${form.internshipDuration || ""}`
        : "Not specified";
    default:
      return "Not specified";
  }
};

const JobPreview = ({ form, onClose }) => {
  const title = form.jobTitle === "Other" ? form.customJobTitle : form.jobTitle;
  const subject = form.subject === "Other" ? form.customSubject : form.subject;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <Sparkles size={18} className={styles.headerIcon} />
            <h3 className={styles.headerTitle}>Job Preview</h3>
            <span className={styles.headerBadge}>
              How candidates will see it
            </span>
          </div>
          <Button
            variant="filled"
            onClick={onClose}
            className={styles.closeButton}
            startIcon={<X size={18} />}
          />
        </div>

        {/* Scrollable body */}
        <div className={styles.body}>

          {/* Hero */}
          <div className={styles.hero}>
            <div className={styles.heroTop}>
              <div className={styles.heroIconWrap}>
                <GraduationCap size={28} />
              </div>
              <div className={styles.heroBody}>
                <h2 className={styles.heroTitle}>
                  {title || "Untitled Job"}
                </h2>
                <p className={styles.heroSubject}>{subject || "—"}</p>
                <div className={styles.heroChips}>
                  {form.employmentType && <Chip>{form.employmentType}</Chip>}
                  {form.roleCategory && <Chip tone="slate">{form.roleCategory}</Chip>}
                  {form.experience && <Chip tone="green">{form.experience}</Chip>}
                </div>
              </div>
            </div>

            <div className={styles.heroMetaRow}>
              {form.location && (
                <span className={styles.heroMetaItem}><MapPin size={15} className={styles.heroMetaIcon} /> {form.location}</span>
              )}
              {form.joiningTimeline && (
                <span className={styles.heroMetaItem}><CalendarClock size={15} className={styles.heroMetaIcon} /> Joining: {form.joiningTimeline}</span>
              )}
              <span className={styles.heroMetaSalary}>
                <Wallet size={15} className={styles.heroMetaIcon} /> {salarySummary(form)}
              </span>
            </div>
          </div>

          {/* Body sections */}
          <div className={styles.sections}>

            {form.description && (
              <Section icon={Briefcase} title="Job Description">
                <p className={styles.description}>
                  {form.description}
                </p>
              </Section>
            )}

            <Section icon={GraduationCap} title="Qualifications & Experience">
              <div className={styles.qualWrap}>
                <p><span className={styles.qualLabel}>Minimum:</span> {form.minQualification || "—"}</p>
                {form.additionalQualification && (
                  <p><span className={styles.qualLabel}>Additional:</span> {form.additionalQualification}</p>
                )}
                <p><span className={styles.qualLabel}>Experience:</span> {form.experience || "—"}</p>
                {form.studentLevels?.length > 0 && (
                  <div className={styles.studentLevelsWrap}><span className={styles.qualLabel}>Student Levels:</span>
                    <div className={styles.studentLevelsInner}><TagList items={form.studentLevels} /></div>
                  </div>
                )}
              </div>
            </Section>

            {form.certifications?.length > 0 && (
              <Section icon={BadgeCheck} title="Certifications">
                <TagList items={form.certifications} />
              </Section>
            )}

            {form.preferredSchoolTypes?.length > 0 && (
              <Section icon={Award} title="Preferred School Type">
                <TagList items={form.preferredSchoolTypes} />
              </Section>
            )}

            {form.languages?.length > 0 && (
              <Section icon={Languages} title="Language Requirements">
                <div className={styles.tagListWrap}>
                  {form.languages.map((l) => (
                    <Chip key={l.name} tone="slate">{l.name} · {l.proficiency}</Chip>
                  ))}
                </div>
              </Section>
            )}

            {(form.requiredSkills?.length > 0 || form.technicalSkills?.length > 0) && (
              <Section icon={Sparkles} title="Skills">
                <div className={styles.skillsWrap}>
                  {form.requiredSkills?.length > 0 && (
                    <div>
                      <p className={styles.skillsLabel}>Required Skills</p>
                      <TagList items={form.requiredSkills} />
                    </div>
                  )}
                  {form.technicalSkills?.length > 0 && (
                    <div>
                      <p className={styles.skillsLabel}>Technical Skills</p>
                      <TagList items={form.technicalSkills} />
                    </div>
                  )}
                </div>
              </Section>
            )}

            {(form.monthlyBenefits?.length > 0 || form.annualBenefits?.length > 0) && (
              <Section icon={Wallet} title="Benefits">
                <div className={styles.skillsWrap}>
                  {form.monthlyBenefits?.length > 0 && (
                    <div>
                      <p className={styles.skillsLabel}>Monthly</p>
                      <TagList items={form.monthlyBenefits} />
                    </div>
                  )}
                  {form.annualBenefits?.length > 0 && (
                    <div>
                      <p className={styles.skillsLabel}>Annual</p>
                      <TagList items={form.annualBenefits} />
                    </div>
                  )}
                </div>
              </Section>
            )}

            {/* Hiring meta */}
            <Section icon={BadgeCheck} title="Hiring Details">
              <div className={styles.hiringGrid}>
                <div className={styles.hiringCard}>
                  <p className={styles.hiringCardLabel}>Gender Preference</p>
                  <p className={styles.hiringCardValue}>{form.genderPreference || "Any"}</p>
                </div>
                <div className={styles.hiringCard}>
                  <p className={styles.hiringCardLabel}>Interview Mode</p>
                  <p className={styles.hiringCardValue}>{form.interviewMode || "Not specified"}</p>
                </div>
              </div>
              <p className={styles.publishNote}>
                {form.publishOption === "Publish Later" && form.publishDate
                  ? `Scheduled to publish on ${form.publishDate}${form.publishTime ? ` at ${form.publishTime}` : ""}`
                  : "Will be published immediately"}
              </p>
            </Section>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <Button
            variant="outlined"
            onClick={onClose}
          >
            Close Preview
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobPreview;
