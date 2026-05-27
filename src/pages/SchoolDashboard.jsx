import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  CheckSquare,
  CreditCard,
  Eye,
  FileText,
  Heart,
  KeyRound,
  LayoutDashboard,
  LogOut,
  Package,
  Pencil,
  PlusCircle,
  RefreshCw,
  Search,
  Send,
  Trash2,
  Upload,
  Users,
} from "lucide-react";
import Topbar from "../components/topbar";

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "companyProfile", label: "Institute Profile", icon: Building2 },
  { id: "viewProfile", label: "View Profile", icon: Eye },
  { id: "postJob", label: "Post a New Job", icon: PlusCircle },
  { id: "manageJobs", label: "Manage Jobs", icon: BriefcaseBusiness },
  { id: "allApplicants", label: "All Applicants", icon: Users },
  { id: "savedCandidates", label: "Saved Candidates", icon: Heart },
  { id: "packages", label: "Packages", icon: Package },
  { id: "transactions", label: "Transactions", icon: CreditCard },
  { id: "changePassword", label: "Change Password", icon: KeyRound },
];

const inputClass =
  "w-full rounded-xl border border-borderColor bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10";
const labelClass = "mb-2 block text-xs font-bold uppercase tracking-wide text-slate-600";

const Field = ({ label, required, children }) => (
  <div>
    <label className={labelClass}>
      {label}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
    {children}
  </div>
);

const subjects = [
  "Mathematics", "Science", "English", "Hindi", "Social Science", "Computer",
  "Physics", "Chemistry", "Biology", "Economics", "History", "Geography",
  "Art", "Music", "Physical Education", "Other",
];
const experienceOptions = [
  "0 - 1 Year (Fresher)", "1 - 3 Years", "3 - 5 Years", "5 - 8 Years", "8+ Years", "Any Experience",
];
const employmentTypes = ["Full Time", "Part Time", "Contract", "Hybrid", "Remote", "Internship"];

const blankJobForm = {
  title: "", subject: "", experience: "", salary: "",
  location: "", employmentType: "", description: "", requirements: "", qualifications: "",
};

const initialJobs = [
  { id: 1, title: "Math Teacher", applicants: 22, status: "Active", date: "12 May 2025" },
  { id: 2, title: "Science Teacher", applicants: 12, status: "Closed", date: "10 May 2025" },
  { id: 3, title: "English Teacher", applicants: 8, status: "Active", date: "8 May 2025" },
  { id: 4, title: "Hindi Teacher", applicants: 3, status: "Draft", date: "6 May 2025" },
];

const initialApplicants = [
  { id: 1, name: "Rahul Sharma", subject: "Mathematics", experience: "3 yrs", status: "Applied", avatar: "https://i.pravatar.cc/100?img=12" },
  { id: 2, name: "Priya Singh", subject: "English", experience: "5 yrs", status: "Shortlisted", avatar: "https://i.pravatar.cc/100?img=16" },
  { id: 3, name: "Amit Kumar", subject: "Science", experience: "2 yrs", status: "Applied", avatar: "https://i.pravatar.cc/100?img=11" },
  { id: 4, name: "Neha Patel", subject: "Hindi", experience: "7 yrs", status: "Rejected", avatar: "https://i.pravatar.cc/100?img=25" },
  { id: 5, name: "Suresh Verma", subject: "Mathematics", experience: "4 yrs", status: "Shortlisted", avatar: "https://i.pravatar.cc/100?img=30" },
];

const statusChipClass = {
  Applied: "bg-blue-50 text-blue-600",
  Shortlisted: "bg-green-50 text-green-600",
  Rejected: "bg-red-50 text-red-500",
  Active: "bg-green-50 text-green-600",
  Closed: "bg-red-50 text-red-500",
  Draft: "bg-slate-100 text-slate-500",
};

const SchoolDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [logoImage, setLogoImage] = useState(null);

  const currentUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("currentUser") || "{}");
    } catch {
      return {};
    }
  }, []);

  const schoolName =
    currentUser.companyName || currentUser.schoolName || currentUser.firstName || "Som Lalit School";

  // Job form state
  const [jobForm, setJobForm] = useState(blankJobForm);
  const [jobs, setJobs] = useState(initialJobs);
  const [jobSearch, setJobSearch] = useState("");

  // Applicants state
  const [applicants, setApplicants] = useState(initialApplicants);
  const [applicantSearch, setApplicantSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [expFilter, setExpFilter] = useState("");

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) setLogoImage(URL.createObjectURL(file));
  };

  const handleNavClick = (id) => {
    if (id === "companyProfile") {
      navigate("/school-profile");
      return;
    }
    setActiveSection(id);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  const handleJobChange = (e) => {
    const { name, value } = e.target;
    setJobForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveDraft = () => {
    if (!jobForm.title) {
      alert("Please add a job title before saving as draft.");
      return;
    }
    const newJob = {
      ...jobForm,
      id: Date.now(),
      status: "Draft",
      applicants: 0,
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
    };
    setJobs((prev) => [...prev, newJob]);
    setJobForm(blankJobForm);
    alert("Job saved as draft!");
    setActiveSection("manageJobs");
  };

  const handlePublishJob = () => {
    if (!jobForm.title || !jobForm.subject || !jobForm.location || !jobForm.employmentType) {
      alert("Please fill in all required fields: Job Title, Subject, Location, Employment Type.");
      return;
    }
    const newJob = {
      ...jobForm,
      id: Date.now(),
      status: "Active",
      applicants: 0,
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
    };
    setJobs((prev) => [...prev, newJob]);
    setJobForm(blankJobForm);
    alert("Job published successfully!");
    setActiveSection("manageJobs");
  };

  const handleDeleteJob = (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      setJobs((prev) => prev.filter((j) => j.id !== id));
    }
  };

  const handleRepostJob = (id) => {
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, status: "Active" } : j)));
  };

  const handleShortlist = (id) => {
    setApplicants((prev) => prev.map((a) => (a.id === id ? { ...a, status: "Shortlisted" } : a)));
  };

  const handleReject = (id) => {
    setApplicants((prev) => prev.map((a) => (a.id === id ? { ...a, status: "Rejected" } : a)));
  };

  const filteredJobs = jobs.filter((j) =>
    j.title.toLowerCase().includes(jobSearch.toLowerCase())
  );

  const filteredApplicants = applicants.filter((a) => {
    const matchSearch =
      a.name.toLowerCase().includes(applicantSearch.toLowerCase()) ||
      a.subject.toLowerCase().includes(applicantSearch.toLowerCase());
    const matchSubject = !subjectFilter || a.subject === subjectFilter;
    const expYears = parseInt(a.experience) || 0;
    const matchExp =
      !expFilter ||
      (expFilter === "0-3" && expYears <= 3) ||
      (expFilter === "3-6" && expYears > 3 && expYears <= 6) ||
      (expFilter === "6+" && expYears > 6);
    return matchSearch && matchSubject && matchExp;
  });

  // ─── Sections ───────────────────────────────────────────────────────────────

  const renderDashboard = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Applications statistics</h2>

      <div className="flex items-start gap-3 rounded-2xl bg-primary px-5 py-4 text-sm text-white">
        <CheckSquare size={18} className="mt-0.5 shrink-0" />
        <p>
          Your account is active but, in order to post jobs, buy a plan at{" "}
          <button
            type="button"
            onClick={() => setActiveSection("postJob")}
            className="font-bold underline underline-offset-2"
          >
            Post A New Job
          </button>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {[
          { label: "Posted Jobs", value: jobs.filter((j) => j.status === "Active").length, sub: "In Job board", color: "text-primary" },
          { label: "Viewed CVs", value: 0, sub: "CVs against opportunities", color: "text-green-500" },
          { label: "Saved Candidates", value: 0, sub: "Manually saved candidates", color: "text-orange-500" },
          { label: "Shortlisted", value: applicants.filter((a) => a.status === "Shortlisted").length, sub: "Shortlisted for interview", color: "text-blue-500" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-borderColor bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{stat.label}</p>
            <p className={`mt-3 text-4xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="mt-2 text-xs text-slate-400">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_260px]">
        <div className="rounded-2xl border border-borderColor bg-white p-6 shadow-sm">
          <div className="flex h-40 items-end justify-around gap-4 border-b border-borderColor pb-4">
            {[
              { label: "Posted Jobs", color: "bg-primary" },
              { label: "Saved Candidates", color: "bg-orange-500" },
              { label: "Viewed CVs", color: "bg-green-500" },
              { label: "Shortlisted", color: "bg-blue-500" },
            ].map((bar) => (
              <div key={bar.label} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-xs font-bold text-slate-400">0</span>
                <div className={`w-full rounded-t-lg ${bar.color} opacity-70`} style={{ height: "4px" }} />
                <span className="text-center text-xs leading-tight text-slate-400">{bar.label}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-xs text-slate-400">
            Posted Jobs: {jobs.filter((j) => j.status === "Active").length}, Shortlisted: {applicants.filter((a) => a.status === "Shortlisted").length}, Viewed CVs: 0
          </p>
        </div>

        <div className="flex flex-col items-center justify-center rounded-2xl border border-borderColor bg-white p-6 shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Users size={26} />
          </div>
          <p className="mt-3 text-sm font-bold text-slate-500">Total Applicants</p>
          <p className="mt-2 text-5xl font-bold text-slate-800">{applicants.length}</p>
          <div className="mt-5 w-full space-y-2">
            {[
              { label: "Posted Jobs", color: "bg-primary" },
              { label: "Viewed CVs", color: "bg-green-500" },
              { label: "Save Candidates", color: "bg-orange-500" },
              { label: "Shortlisted", color: "bg-blue-500" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-xs text-slate-500">
                <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderViewProfile = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">View Profile</h2>
      <div className="overflow-hidden rounded-3xl border border-borderColor bg-white shadow-soft">
        <div className="h-28 bg-primary" />
        <div className="relative px-6 pb-8">
          <div className="-mt-12 flex flex-col items-center gap-5 md:flex-row md:items-end">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-3xl border-4 border-white bg-light shadow-md">
              {logoImage ? (
                <img src={logoImage} alt="logo" className="h-full w-full object-cover" />
              ) : (
                <Building2 size={36} className="text-primary" />
              )}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-slate-900">{schoolName}</h2>
              <p className="mt-1 text-sm font-semibold text-primary">Schools & Institutions</p>
            </div>
            <button
              type="button"
              onClick={() => navigate("/school-profile")}
              className="rounded-xl border border-primary px-5 py-2.5 text-sm font-bold text-primary hover:bg-primary/5"
            >
              Edit Profile
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Email", value: currentUser.email || "Not added" },
              { label: "Phone", value: currentUser.phone || "Not added" },
              { label: "City", value: currentUser.city || "Not added" },
              { label: "Institute Name", value: schoolName },
              { label: "Account Type", value: "School / Institution" },
              { label: "Total Teachers", value: currentUser.totalTeachers ? `${currentUser.totalTeachers} Teachers` : "Not added" },
            ].map((detail) => (
              <div key={detail.label} className="rounded-2xl border border-borderColor bg-light p-4">
                <p className="text-xs font-bold uppercase text-slate-500">{detail.label}</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">{detail.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPostJob = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Post a New Job</h2>

      {/* Institute header */}
      <div className="flex items-center gap-4 rounded-2xl border border-borderColor bg-white p-4 shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-borderColor bg-light">
          {logoImage ? (
            <img src={logoImage} alt="logo" className="h-full w-full object-cover" />
          ) : (
            <Building2 size={22} className="text-primary" />
          )}
        </div>
        <div>
          <p className="font-bold text-slate-800">{schoolName}</p>
          <p className="text-xs text-slate-400">Posting as Institute</p>
        </div>
      </div>

      <div className="rounded-2xl border border-borderColor bg-white p-6 shadow-sm">
        <h3 className="mb-5 border-b border-borderColor pb-4 text-lg font-bold text-primary">
          Job Details
        </h3>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="lg:col-span-2">
            <Field label="Job Title" required>
              <input
                name="title"
                value={jobForm.title}
                onChange={handleJobChange}
                className={inputClass}
                placeholder="e.g. Mathematics Teacher"
              />
            </Field>
          </div>
          <Field label="Subject" required>
            <select name="subject" value={jobForm.subject} onChange={handleJobChange} className={inputClass}>
              <option value="">Select Subject</option>
              {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="Experience Required" required>
            <select name="experience" value={jobForm.experience} onChange={handleJobChange} className={inputClass}>
              <option value="">Select Experience</option>
              {experienceOptions.map((e) => <option key={e} value={e}>{e}</option>)}
            </select>
          </Field>
          <Field label="Salary">
            <input
              name="salary"
              value={jobForm.salary}
              onChange={handleJobChange}
              className={inputClass}
              placeholder="e.g. 4.5 LPA or 35,000/month"
            />
          </Field>
          <Field label="Location" required>
            <input
              name="location"
              value={jobForm.location}
              onChange={handleJobChange}
              className={inputClass}
              placeholder="e.g. Ahmedabad, Gujarat"
            />
          </Field>
          <div className="lg:col-span-2">
            <Field label="Employment Type" required>
              <div className="flex flex-wrap gap-3">
                {employmentTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setJobForm((prev) => ({ ...prev, employmentType: type }))}
                    className={`rounded-xl border px-4 py-2 text-sm font-bold transition ${
                      jobForm.employmentType === type
                        ? "border-primary bg-primary text-white"
                        : "border-borderColor text-slate-600 hover:border-primary hover:text-primary"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </Field>
          </div>
          <div className="lg:col-span-2">
            <Field label="Job Description">
              <textarea
                name="description"
                value={jobForm.description}
                onChange={handleJobChange}
                className={`${inputClass} min-h-28 resize-none`}
                placeholder="Describe the role, responsibilities, and what you're looking for..."
              />
            </Field>
          </div>
          <div className="lg:col-span-2">
            <Field label="Requirements">
              <textarea
                name="requirements"
                value={jobForm.requirements}
                onChange={handleJobChange}
                className={`${inputClass} min-h-24 resize-none`}
                placeholder="List the key requirements for this role..."
              />
            </Field>
          </div>
          <div className="lg:col-span-2">
            <Field label="Qualifications">
              <textarea
                name="qualifications"
                value={jobForm.qualifications}
                onChange={handleJobChange}
                className={`${inputClass} min-h-24 resize-none`}
                placeholder="List the required qualifications and certifications..."
              />
            </Field>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-borderColor pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="rounded-xl border border-borderColor px-6 py-3 text-sm font-bold text-slate-500 hover:bg-light"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={handlePublishJob}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white hover:bg-primary/95"
          >
            <Send size={16} />
            Publish Job
          </button>
        </div>
      </div>
    </div>
  );

  const renderManageJobs = () => (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Manage Jobs</h2>
        <button
          type="button"
          onClick={() => setActiveSection("postJob")}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-primary/95"
        >
          <PlusCircle size={16} /> Post New Job
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 rounded-2xl border border-borderColor bg-white px-4 py-3 shadow-sm">
        <Search size={16} className="text-slate-400" />
        <input
          value={jobSearch}
          onChange={(e) => setJobSearch(e.target.value)}
          placeholder="Search jobs..."
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-borderColor bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-[640px] w-full text-left text-sm">
            <thead className="bg-primary/5 text-xs uppercase tracking-wide text-primary">
              <tr>
                <th className="px-5 py-4">Job Title</th>
                <th className="px-5 py-4">Applicants</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderColor">
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-sm text-slate-400">
                    No jobs found.
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-light/50">
                    <td className="px-5 py-4 font-bold text-slate-800">{job.title}</td>
                    <td className="px-5 py-4 text-slate-600">{job.applicants}</td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusChipClass[job.status] || "bg-slate-100 text-slate-500"}`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-500">{job.date}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="flex items-center gap-1 rounded-lg border border-borderColor px-3 py-1.5 text-xs font-bold text-primary hover:bg-light"
                        >
                          <Pencil size={12} /> Edit
                        </button>
                        {job.status !== "Closed" && (
                          <button
                            type="button"
                            onClick={() => handleDeleteJob(job.id)}
                            className="flex items-center gap-1 rounded-lg border border-red-100 px-3 py-1.5 text-xs font-bold text-red-500 hover:bg-red-50"
                          >
                            <Trash2 size={12} /> Delete
                          </button>
                        )}
                        {job.status === "Active" && (
                          <button
                            type="button"
                            onClick={() => setActiveSection("allApplicants")}
                            className="flex items-center gap-1 rounded-lg border border-borderColor px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-light"
                          >
                            <Eye size={12} /> View
                          </button>
                        )}
                        {job.status === "Closed" && (
                          <button
                            type="button"
                            onClick={() => handleRepostJob(job.id)}
                            className="flex items-center gap-1 rounded-lg border border-green-200 px-3 py-1.5 text-xs font-bold text-green-600 hover:bg-green-50"
                          >
                            <RefreshCw size={12} /> Repost
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAllApplicants = () => (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold text-slate-800">All Applicants</h2>

      {/* Search + Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex flex-1 items-center gap-2 rounded-2xl border border-borderColor bg-white px-4 py-3 shadow-sm">
          <Search size={16} className="text-slate-400" />
          <input
            value={applicantSearch}
            onChange={(e) => setApplicantSearch(e.target.value)}
            placeholder="Search by name or subject..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </div>
        <select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          className="rounded-2xl border border-borderColor bg-white px-4 py-3 text-sm text-slate-600 shadow-sm outline-none focus:border-primary"
        >
          <option value="">All Subjects</option>
          {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select
          value={expFilter}
          onChange={(e) => setExpFilter(e.target.value)}
          className="rounded-2xl border border-borderColor bg-white px-4 py-3 text-sm text-slate-600 shadow-sm outline-none focus:border-primary"
        >
          <option value="">All Experience</option>
          <option value="0-3">0 – 3 yrs</option>
          <option value="3-6">3 – 6 yrs</option>
          <option value="6+">6+ yrs</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-borderColor bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-[700px] w-full text-left text-sm">
            <thead className="bg-primary/5 text-xs uppercase tracking-wide text-primary">
              <tr>
                <th className="px-5 py-4">Candidate</th>
                <th className="px-5 py-4">Subject</th>
                <th className="px-5 py-4">Experience</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderColor">
              {filteredApplicants.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-sm text-slate-400">
                    No applicants found.
                  </td>
                </tr>
              ) : (
                filteredApplicants.map((applicant) => (
                  <tr key={applicant.id} className="hover:bg-light/50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={applicant.avatar}
                          alt={applicant.name}
                          className="h-9 w-9 rounded-xl object-cover"
                        />
                        <span className="font-bold text-slate-800">{applicant.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-600">{applicant.subject}</td>
                    <td className="px-5 py-4 text-slate-600">{applicant.experience}</td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusChipClass[applicant.status] || "bg-slate-100 text-slate-500"}`}>
                        {applicant.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          className="flex items-center gap-1 rounded-lg border border-borderColor px-3 py-1.5 text-xs font-bold text-primary hover:bg-light"
                        >
                          <FileText size={12} /> Resume
                        </button>
                        {applicant.status !== "Shortlisted" && applicant.status !== "Rejected" && (
                          <button
                            type="button"
                            onClick={() => handleShortlist(applicant.id)}
                            className="flex items-center gap-1 rounded-lg border border-green-200 px-3 py-1.5 text-xs font-bold text-green-600 hover:bg-green-50"
                          >
                            Shortlist
                          </button>
                        )}
                        {applicant.status !== "Rejected" && (
                          <button
                            type="button"
                            onClick={() => handleReject(applicant.id)}
                            className="flex items-center gap-1 rounded-lg border border-red-100 px-3 py-1.5 text-xs font-bold text-red-500 hover:bg-red-50"
                          >
                            Reject
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderPlaceholder = (title) => (
    <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
      <h2 className="text-2xl font-bold text-primary">{title}</h2>
      <p className="mt-2 text-sm text-slate-500">This section is coming soon.</p>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard": return renderDashboard();
      case "viewProfile": return renderViewProfile();
      case "postJob": return renderPostJob();
      case "manageJobs": return renderManageJobs();
      case "allApplicants": return renderAllApplicants();
      default:
        return renderPlaceholder(sidebarItems.find((i) => i.id === activeSection)?.label || "");
    }
  };

  const SidebarInner = () => (
    <div className="flex h-full flex-col">
      {/* Upload Logo */}
      <label className="mb-5 flex cursor-pointer items-center gap-2 self-start rounded-xl border border-dashed border-borderColor px-4 py-2 text-xs font-bold text-primary hover:bg-light">
        <Upload size={13} />
        Upload Institute Logo
        <input type="file" hidden accept="image/*" onChange={handleLogoUpload} />
      </label>

      {/* School identity */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-borderColor bg-light">
          {logoImage ? (
            <img src={logoImage} alt="logo" className="h-full w-full object-cover" />
          ) : (
            <Building2 size={22} className="text-primary" />
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-slate-800">{schoolName}</p>
          <p className="text-xs text-slate-400">School Account</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold transition ${
                isActive
                  ? "bg-primary text-white"
                  : "text-slate-600 hover:bg-light hover:text-primary"
              }`}
            >
              <Icon size={17} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="mt-4 space-y-1 border-t border-borderColor pt-4">
        <button
          type="button"
          onClick={() => navigate("/select-role")}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold text-slate-600 hover:bg-light"
        >
          <ArrowLeft size={17} />
          Back to Home
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold text-slate-600 hover:bg-light"
        >
          <LogOut size={17} />
          Logout
        </button>
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-xl bg-red-500 px-4 py-3 text-left text-sm font-bold text-white hover:bg-red-600"
        >
          <Trash2 size={17} />
          Delete Profile
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-light">
      <div className="flex min-h-screen">
        {/* Desktop sidebar */}
        <aside className="hidden w-64 shrink-0 flex-col border-r border-borderColor bg-white p-5 lg:flex">
          <SidebarInner />
        </aside>

        {/* Main content */}
        <main className="flex-1 p-5 lg:p-8">
          <Topbar
            title="School Dashboard"
            subtitle="Manage your job postings and track applicants."
          />

          {/* Mobile nav */}
          <div className="mt-4 flex gap-2 overflow-x-auto rounded-3xl bg-white p-3 shadow-soft lg:hidden">
            <button
              type="button"
              onClick={() => navigate("/select-role")}
              className="flex shrink-0 items-center gap-2 rounded-2xl bg-light px-4 py-3 text-sm font-bold text-primary"
            >
              <ArrowLeft size={17} /> Home
            </button>
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`flex shrink-0 items-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold transition ${
                    isActive ? "bg-primary text-white" : "bg-light text-primary"
                  }`}
                >
                  <Icon size={17} />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="mt-6">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
};

export default SchoolDashboard;
