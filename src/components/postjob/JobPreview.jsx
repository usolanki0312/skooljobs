import {
  Award, BadgeCheck, Briefcase, CalendarClock, GraduationCap,
  Languages, MapPin, Sparkles, Wallet, X,
} from "lucide-react";

const Chip = ({ children, tone = "primary" }) => {
  const tones = {
    primary: "bg-primary/10 text-primary",
    green: "bg-green-50 text-green-600",
    slate: "bg-slate-100 text-slate-600",
  };
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${tones[tone]}`}>
      {children}
    </span>
  );
};

const Section = ({ icon: Icon, title, children }) => (
  <div>
    <h4 className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-800">
      <Icon size={16} className="text-primary" /> {title}
    </h4>
    {children}
  </div>
);

const TagList = ({ items, empty = "—" }) =>
  items?.length ? (
    <div className="flex flex-wrap gap-2">
      {items.map((it) => <Chip key={it} tone="slate">{it}</Chip>)}
    </div>
  ) : (
    <p className="text-sm text-slate-400">{empty}</p>
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-borderColor px-6 py-4">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-primary" />
            <h3 className="font-bold text-slate-800">Job Preview</h3>
            <span className="rounded-full bg-light px-2.5 py-0.5 text-xs font-semibold text-slate-500">
              How candidates will see it
            </span>
          </div>
          <button type="button" onClick={onClose} className="rounded-xl p-2 text-slate-400 hover:bg-light">
            <X size={18} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto">

          {/* Hero */}
          <div className="bg-primary/5 px-6 py-6">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <GraduationCap size={28} />
              </div>
              <div className="min-w-0">
                <h2 className="text-xl font-bold text-slate-800">
                  {title || "Untitled Job"}
                </h2>
                <p className="mt-0.5 text-sm font-semibold text-primary">{subject || "—"}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {form.employmentType && <Chip>{form.employmentType}</Chip>}
                  {form.roleCategory && <Chip tone="slate">{form.roleCategory}</Chip>}
                  {form.experience && <Chip tone="green">{form.experience}</Chip>}
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
              {form.location && (
                <span className="flex items-center gap-1.5"><MapPin size={15} className="text-slate-400" /> {form.location}</span>
              )}
              {form.joiningTimeline && (
                <span className="flex items-center gap-1.5"><CalendarClock size={15} className="text-slate-400" /> Joining: {form.joiningTimeline}</span>
              )}
              <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                <Wallet size={15} className="text-slate-400" /> {salarySummary(form)}
              </span>
            </div>
          </div>

          {/* Body sections */}
          <div className="space-y-6 px-6 py-6">

            {form.description && (
              <Section icon={Briefcase} title="Job Description">
                <p className="whitespace-pre-line text-sm leading-relaxed text-slate-600">
                  {form.description}
                </p>
              </Section>
            )}

            <Section icon={GraduationCap} title="Qualifications & Experience">
              <div className="space-y-2 text-sm text-slate-600">
                <p><span className="font-semibold text-slate-700">Minimum:</span> {form.minQualification || "—"}</p>
                {form.additionalQualification && (
                  <p><span className="font-semibold text-slate-700">Additional:</span> {form.additionalQualification}</p>
                )}
                <p><span className="font-semibold text-slate-700">Experience:</span> {form.experience || "—"}</p>
                {form.studentLevels?.length > 0 && (
                  <div className="pt-1"><span className="font-semibold text-slate-700">Student Levels:</span>
                    <div className="mt-1"><TagList items={form.studentLevels} /></div>
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
                <div className="flex flex-wrap gap-2">
                  {form.languages.map((l) => (
                    <Chip key={l.name} tone="slate">{l.name} · {l.proficiency}</Chip>
                  ))}
                </div>
              </Section>
            )}

            {(form.requiredSkills?.length > 0 || form.technicalSkills?.length > 0) && (
              <Section icon={Sparkles} title="Skills">
                <div className="space-y-3">
                  {form.requiredSkills?.length > 0 && (
                    <div>
                      <p className="mb-1.5 text-xs font-semibold text-slate-500">Required Skills</p>
                      <TagList items={form.requiredSkills} />
                    </div>
                  )}
                  {form.technicalSkills?.length > 0 && (
                    <div>
                      <p className="mb-1.5 text-xs font-semibold text-slate-500">Technical Skills</p>
                      <TagList items={form.technicalSkills} />
                    </div>
                  )}
                </div>
              </Section>
            )}

            {(form.monthlyBenefits?.length > 0 || form.annualBenefits?.length > 0) && (
              <Section icon={Wallet} title="Benefits">
                <div className="space-y-3">
                  {form.monthlyBenefits?.length > 0 && (
                    <div>
                      <p className="mb-1.5 text-xs font-semibold text-slate-500">Monthly</p>
                      <TagList items={form.monthlyBenefits} />
                    </div>
                  )}
                  {form.annualBenefits?.length > 0 && (
                    <div>
                      <p className="mb-1.5 text-xs font-semibold text-slate-500">Annual</p>
                      <TagList items={form.annualBenefits} />
                    </div>
                  )}
                </div>
              </Section>
            )}

            {/* Hiring meta */}
            <Section icon={BadgeCheck} title="Hiring Details">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl border border-borderColor bg-light p-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Gender Preference</p>
                  <p className="mt-1 font-semibold text-slate-700">{form.genderPreference || "Any"}</p>
                </div>
                <div className="rounded-xl border border-borderColor bg-light p-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Interview Mode</p>
                  <p className="mt-1 font-semibold text-slate-700">{form.interviewMode || "Not specified"}</p>
                </div>
              </div>
              <p className="mt-3 text-xs text-slate-400">
                {form.publishOption === "Publish Later" && form.publishDate
                  ? `Scheduled to publish on ${form.publishDate}${form.publishTime ? ` at ${form.publishTime}` : ""}`
                  : "Will be published immediately"}
              </p>
            </Section>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-borderColor px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primary/90"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobPreview;
