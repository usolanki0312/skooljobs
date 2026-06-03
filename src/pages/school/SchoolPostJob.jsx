import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Save, Send } from "lucide-react";
import RoleBasicInfo from "../../components/postjob/RoleBasicInfo";
import LanguageRequirements from "../../components/postjob/LanguageRequirements";
import QualificationsSection from "../../components/postjob/QualificationsSection";
import JobDescriptionSection from "../../components/postjob/JobDescriptionSection";
import SkillsSection from "../../components/postjob/SkillsSection";
import SalaryBenefits from "../../components/postjob/SalaryBenefits";
import HiringPreferences from "../../components/postjob/HiringPreferences";

const blankForm = {
  // Section 1 — Role & Basic Info
  roleCategory: "",
  jobTitle: "",
  employmentType: "Full Time",
  location: "",
  joiningTimeline: "",

  // Section 2 — Language Requirements
  languageType: "Indian",
  languages: [
    { name: "English", proficiency: "Fluent" },
    { name: "Hindi", proficiency: "Conversational" },
    { name: "Gujarati", proficiency: "Basic" },
  ], // [{ name, proficiency }]

  // Section 3 — Qualifications & Experience
  minQualification: "",
  additionalQualification: "",
  certifications: [],
  experience: "",
  studentLevels: [],
  preferredSchoolTypes: [],

  // Section 4 — Job Description
  description: "",

  // Section 5 — Skills
  requiredSkills: [],
  technicalSkills: [],

  // Section 6 — Salary & Benefits
  compensationStructure: "Monthly",
  monthlyBenefits: [],
  annualBenefits: [],
  // Full Time
  minAnnualCTC: "",
  maxAnnualCTC: "",
  minMonthlySalary: "",
  maxMonthlySalary: "",
  // Part Time
  minHourlyRate: "",
  maxHourlyRate: "",
  hoursPerWeek: "",
  // Contract
  contractDuration: "",
  contractPaymentType: "Monthly Payment (₹)",
  contractMonthlyPayment: "",
  contractTotalValue: "",
  // Hybrid
  wfhDays: "",
  officeDays: "",
  // Remote
  workTimezone: "",
  remoteLocation: "",
  // Internship
  internshipDuration: "",
  minStipend: "",
  maxStipend: "",

  // Section 7 — Hiring Preferences
  genderPreference: "Any",
  interviewMode: "",
  hiringRounds: "",
  publishSettings: ["Publish Immediately"],
};

const SchoolPostJob = () => {
  const navigate = useNavigate();
  const { setJobs } = useOutletContext();

  const [form, setForm] = useState(blankForm);
  const [generating, setGenerating] = useState(false);

  const setField = (key, value) => setForm((p) => ({ ...p, [key]: value }));

  const handleGenerateJD = () => {
    if (!form.jobTitle) {
      alert("Enter a Job Title first.");
      return;
    }
    setGenerating(true);
    setTimeout(() => {
      const subject = form.subject || "the assigned subject";
      const exp = form.experience || "relevant experience";
      setField(
        "description",
        `We are seeking a dedicated and passionate ${form.jobTitle} to join our team. The ideal candidate will have ${exp} in teaching ${subject} and a strong commitment to academic excellence.\n\nKey Responsibilities:\n• Plan, prepare and deliver engaging instructional activities\n• Develop curriculum aligned with board standards\n• Assess and evaluate student progress through tests and assignments\n• Maintain a positive and disciplined classroom environment\n• Communicate regularly with parents/guardians regarding student performance\n• Participate in school meetings and professional development programs`,
      );
      setGenerating(false);
    }, 1500);
  };

  const buildJob = (status) => ({
    id: Date.now(),
    title: form.jobTitle,
    subject: form.subject || "",
    roleType: form.roleCategory,
    employmentType: form.employmentType,
    location: form.location,
    experience: form.experience,
    description: form.description,
    status,
    applicants: 0,
    vacancies: 1,
    salaryRange: form.minAnnualCTC
      ? `₹${form.minAnnualCTC} – ₹${form.maxAnnualCTC}`
      : "",
    date: new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    expiryDate: "",
  });

  const handleSaveDraft = () => {
    if (!form.jobTitle) {
      alert("Enter a Job Title before saving as draft.");
      return;
    }
    setJobs((p) => [buildJob("Draft"), ...p]);
    setForm(blankForm);
    alert("Job saved as draft!");
    navigate("/school/manage-jobs");
  };

  const handlePublish = () => {
    if (!form.jobTitle || !form.location || !form.employmentType) {
      alert("Job Title, Location and Employment Type are required to publish.");
      return;
    }
    setJobs((p) => [buildJob("Active"), ...p]);
    setForm(blankForm);
    alert("Job published successfully!");
    navigate("/school/manage-jobs");
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="rounded-2xl border border-borderColor bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-800">Post a New Job</h2>
        <p className="mt-1 text-sm text-slate-500">
          Create a detailed job post to attract the right candidates.
        </p>
      </div>

      {/* 7 sections */}
      <RoleBasicInfo form={form} setField={setField} />
      <LanguageRequirements form={form} setField={setField} />
      <QualificationsSection form={form} setField={setField} />
      <JobDescriptionSection
        form={form}
        setField={setField}
        onGenerateJD={handleGenerateJD}
        generating={generating}
      />
      <SkillsSection form={form} setField={setField} />
      <SalaryBenefits form={form} setField={setField} />
      <HiringPreferences form={form} setField={setField} />

      {/* Footer */}
      <div className="flex items-center justify-between rounded-2xl border border-borderColor bg-white px-6 py-4 shadow-sm">
        <button
          type="button"
          onClick={() => navigate("/school/manage-jobs")}
          className="text-sm font-bold text-slate-400 hover:text-slate-600"
        >
          Cancel
        </button>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="inline-flex items-center gap-2 rounded-xl border border-borderColor px-6 py-2.5 text-sm font-bold text-slate-600 hover:bg-light transition"
          >
            <Save size={15} /> Save as Draft
          </button>
          <button
            type="button"
            onClick={handlePublish}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primary/90 transition"
          >
            <Send size={15} /> Publish Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default SchoolPostJob;
