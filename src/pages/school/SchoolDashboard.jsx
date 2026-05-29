import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle, ArrowLeft, Bell, BriefcaseBusiness, Building2,
  Calendar, CheckCircle, CheckSquare, Clock, CreditCard, Eye,
  FileText, Heart, HelpCircle, KeyRound, LayoutDashboard, LogOut,
  MessageSquare, Package, Pencil, PlusCircle, RefreshCw, Save,
  Search, Send, Settings, Trash2, Upload, Users, Wand2, X,
} from "lucide-react";
import Topbar from "../../components/topbar";
import {
  subjects, schoolExperienceOptions as experienceOptions,
  employmentTypes, initialJobs, initialApplicants, statusChipClass,
} from "../../lib/schooldata";

// ─── Constants ────────────────────────────────────────────────────────────────

const salaryRanges = [
  "Less than 1 Lac", "1 Lac – 1.5 Lac", "1.5 Lac – 2 Lac",
  "2 Lac – 3 Lac", "3 Lac – 4 Lac", "4 Lac – 5 Lac",
  "5 Lac – 7 Lac", "7 Lac – 10 Lac", "10 Lac – 15 Lac", "15 Lac+",
];

const adminRoles = [
  "Principal", "Vice Principal", "Academic Coordinator", "Sports Coordinator",
  "Counselor", "Librarian", "HR Manager", "Accountant",
  "IT Administrator", "Office Manager", "Lab Technician", "Other",
];

const augmentedJobs = [...initialJobs]
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .map((j) => ({ ...j, roleType: "Teaching", vacancies: 2, expiryDate: "30 Jun 2025" }));

const augmentedApplicants = initialApplicants.map((a, i) => ({
  ...a,
  jobTitle: ["Math Teacher", "English Teacher", "Science Teacher", "Hindi Teacher", "Math Teacher"][i],
  qualification: ["B.Ed + M.Sc", "B.Ed + MA English", "B.Ed + B.Sc", "MA Hindi + B.Ed", "M.Sc + B.Ed"][i],
}));

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
  { id: "settings", label: "Settings", icon: Settings },
];

const blankJobForm = {
  title: "", roleType: "Teaching", subject: "", adminRole: "",
  experience: "", vacancies: "1", salaryRange: "", salaryYearly: "",
  salaryMonthly: "", location: "", employmentType: "", expiryDate: "",
  description: "", requirements: "", qualifications: "",
};

const inputClass =
  "w-full rounded-xl border border-borderColor bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10";
const labelClass = "mb-2 block text-xs font-bold uppercase tracking-wide text-slate-600";

const Field = ({ label, required, children }) => (
  <div>
    <label className={labelClass}>
      {label}{required && <span className="ml-1 text-red-500">*</span>}
    </label>
    {children}
  </div>
);

// ─── Component ────────────────────────────────────────────────────────────────

const SchoolDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [logoImage, setLogoImage] = useState(null);

  // Notifications
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, msg: "New application from Rahul Sharma for Math Teacher", time: "2h ago", read: false },
    { id: 2, msg: "Priya Singh accepted your interview invitation", time: "5h ago", read: false },
    { id: 3, msg: "English Teacher job post is now live", time: "1d ago", read: true },
    { id: 4, msg: "Profile viewed by 3 candidates today", time: "2d ago", read: true },
  ]);

  // Jobs
  const [jobForm, setJobForm] = useState(blankJobForm);
  const [jobs, setJobs] = useState(augmentedJobs);
  const [jobSearch, setJobSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [generatingJD, setGeneratingJD] = useState(false);

  // Applicants
  const [applicants, setApplicants] = useState(augmentedApplicants);
  const [applicantSearch, setApplicantSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [expFilter, setExpFilter] = useState("");
  const [jobTitleFilter, setJobTitleFilter] = useState("");

  // Saved candidates comments
  const [candidateComments, setCandidateComments] = useState({});
  const [editingComment, setEditingComment] = useState(null);
  const [commentDraft, setCommentDraft] = useState("");

  // Scheduled interviews
  const [scheduledInterviews] = useState([
    { id: 1, candidate: "Priya Singh", role: "English Teacher", date: "2026-06-02", time: "10:00 AM", status: "Confirmed" },
    { id: 2, candidate: "Suresh Verma", role: "Math Teacher", date: "2026-06-03", time: "2:00 PM", status: "Pending" },
  ]);

  // Settings / Delete profile
  const [deleteStep, setDeleteStep] = useState(0); // 0=hidden, 1=checks, 2=otp
  const [deleteChecks, setDeleteChecks] = useState({ c1: false, c2: false });
  const [deleteOtp, setDeleteOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [pwForm, setPwForm] = useState({ current: "", next: "", confirm: "" });

  const currentUser = useMemo(() => {
    try { return JSON.parse(localStorage.getItem("currentUser") || "{}"); } catch { return {}; }
  }, []);

  const schoolName = currentUser.companyName || currentUser.schoolName || currentUser.firstName || "Som Lalit School";
  const unreadCount = notifications.filter((n) => !n.read).length;

  // ─── Handlers ──────────────────────────────────────────────────────────────

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) setLogoImage(URL.createObjectURL(file));
  };

  const handleNavClick = (id) => {
    if (id === "companyProfile") { navigate("/school-profile"); return; }
    setActiveSection(id);
    setShowNotifDropdown(false);
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
    if (!jobForm.title) { alert("Please add a job title before saving as draft."); return; }
    const newJob = {
      ...jobForm, id: Date.now(), status: "Draft", applicants: 0,
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
    };
    setJobs((prev) => [newJob, ...prev]);
    setJobForm(blankJobForm);
    alert("Job saved as draft!");
    setActiveSection("manageJobs");
  };

  const handlePublishJob = () => {
    if (!jobForm.title || !jobForm.location || !jobForm.employmentType) {
      alert("Please fill all required fields: Job Title, Location, Employment Type."); return;
    }
    if (jobForm.roleType !== "Administrative" && !jobForm.subject) {
      alert("Please select a Subject for teaching roles."); return;
    }
    const newJob = {
      ...jobForm, id: Date.now(), status: "Active", applicants: 0,
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
    };
    setJobs((prev) => [newJob, ...prev]);
    setJobForm(blankJobForm);
    alert("Job published successfully!");
    setActiveSection("manageJobs");
  };

  const handleDeleteJob = (id) => {
    if (window.confirm("Delete this job?")) setJobs((prev) => prev.filter((j) => j.id !== id));
  };

  const handleRepostJob = (id) => {
    setJobs((prev) => prev.map((j) => j.id === id ? { ...j, status: "Active" } : j));
  };

  const handlePublishDraft = (id) => {
    setJobs((prev) => prev.map((j) => j.id === id ? { ...j, status: "Active" } : j));
  };

  const handleShortlist = (id) => {
    setApplicants((prev) => prev.map((a) => a.id === id ? { ...a, status: "Shortlisted" } : a));
  };

  const handleReject = (id) => {
    setApplicants((prev) => prev.map((a) => a.id === id ? { ...a, status: "Rejected" } : a));
  };

  const handleUndoReject = (id) => {
    setApplicants((prev) => prev.map((a) => a.id === id ? { ...a, status: "Applied" } : a));
  };

  const generateJD = () => {
    if (!jobForm.title) { alert("Please enter a Job Title first."); return; }
    setGeneratingJD(true);
    setTimeout(() => {
      const subject = jobForm.subject || "the assigned subject";
      const exp = jobForm.experience || "relevant experience";
      const jd = `We are seeking a dedicated and passionate ${jobForm.title} to join our team. The ideal candidate will have ${exp} in teaching ${subject} and a strong commitment to academic excellence.\n\nKey Responsibilities:\n• Plan, prepare and deliver engaging instructional activities\n• Develop curriculum aligned with board standards\n• Assess and evaluate student progress through tests and assignments\n• Maintain a positive and disciplined classroom environment\n• Communicate regularly with parents/guardians regarding student performance\n• Participate in school meetings and professional development programs\n\nWe look forward to welcoming a motivated educator who is passionate about making a difference in students' lives.`;
      setJobForm((prev) => ({ ...prev, description: jd }));
      setGeneratingJD(false);
    }, 1500);
  };

  const filteredJobs = jobs
    .filter((j) => j.title.toLowerCase().includes(jobSearch.toLowerCase()))
    .filter((j) => !statusFilter || j.status === statusFilter);

  const filteredApplicants = applicants.filter((a) => {
    const matchSearch = a.name.toLowerCase().includes(applicantSearch.toLowerCase()) ||
      a.subject.toLowerCase().includes(applicantSearch.toLowerCase());
    const matchSubject = !subjectFilter || a.subject === subjectFilter;
    const matchJob = !jobTitleFilter || a.jobTitle === jobTitleFilter;
    const expYears = parseInt(a.experience) || 0;
    const matchExp = !expFilter ||
      (expFilter === "0-3" && expYears <= 3) ||
      (expFilter === "3-6" && expYears > 3 && expYears <= 6) ||
      (expFilter === "6+" && expYears > 6);
    return matchSearch && matchSubject && matchExp && matchJob;
  });

  const shortlistedApplicants = applicants.filter((a) => a.status === "Shortlisted");
  const uniqueJobTitles = [...new Set(applicants.map((a) => a.jobTitle))];

  // ─── Render Dashboard ──────────────────────────────────────────────────────

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Applications Statistics</h2>
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifDropdown((v) => !v)}
            className="relative flex items-center gap-2 rounded-xl border border-borderColor bg-white px-4 py-2 text-sm font-bold text-slate-600 shadow-sm hover:bg-light"
          >
            <Bell size={16} />
            Notifications
            {unreadCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>
          {showNotifDropdown && (
            <div className="absolute right-0 top-12 z-50 w-80 rounded-2xl border border-borderColor bg-white shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
              <div className="flex items-center justify-between border-b border-borderColor px-4 py-3">
                <p className="font-bold text-slate-800">Notifications</p>
                <button
                  type="button"
                  onClick={() => setNotifications((p) => p.map((n) => ({ ...n, read: true })))}
                  className="text-xs font-bold text-primary hover:underline"
                >
                  Mark all read
                </button>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className={`flex gap-3 border-b border-borderColor/50 px-4 py-3 text-sm ${n.read ? "bg-white" : "bg-primary/5"}`}>
                    <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.read ? "bg-slate-300" : "bg-primary"}`} />
                    <div className="flex-1">
                      <p className="text-slate-700">{n.msg}</p>
                      <p className="mt-1 text-xs text-slate-400">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 text-center">
                <button type="button" onClick={() => setShowNotifDropdown(false)} className="text-xs font-bold text-primary">Close</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-2xl bg-primary px-5 py-4 text-sm text-white">
        <CheckSquare size={18} className="mt-0.5 shrink-0" />
        <p>
          Your account is active but, in order to post jobs, buy a plan at{" "}
          <button type="button" onClick={() => setActiveSection("postJob")} className="font-bold underline underline-offset-2">
            Post A New Job
          </button>
        </p>
      </div>

      {/* 6 Stat cards */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
        {[
          { label: "Posted Jobs", value: jobs.filter((j) => j.status === "Active").length, sub: "In Job board", color: "text-primary" },
          { label: "Viewed CVs", value: 0, sub: "CVs against opportunities", color: "text-green-500" },
          { label: "Saved Candidates", value: shortlistedApplicants.length, sub: "Manually saved candidates", color: "text-orange-500" },
          { label: "Shortlisted", value: applicants.filter((a) => a.status === "Shortlisted").length, sub: "Shortlisted for interview", color: "text-blue-500" },
          { label: "Interviews Scheduled", value: scheduledInterviews.length, sub: "Upcoming interviews", color: "text-purple-500" },
          { label: "Offers Made", value: 1, sub: "Offer letters sent", color: "text-teal-500" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-borderColor bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{stat.label}</p>
            <p className={`mt-3 text-4xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="mt-2 text-xs text-slate-400">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Chart + Interview Calendar */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border border-borderColor bg-white p-6 shadow-sm">
          <div className="flex h-40 items-end justify-around gap-4 border-b border-borderColor pb-4">
            {[
              { label: "Posted Jobs", color: "bg-primary", val: jobs.filter((j) => j.status === "Active").length },
              { label: "Saved", color: "bg-orange-500", val: shortlistedApplicants.length },
              { label: "Viewed CVs", color: "bg-green-500", val: 0 },
              { label: "Shortlisted", color: "bg-blue-500", val: applicants.filter((a) => a.status === "Shortlisted").length },
              { label: "Interviews", color: "bg-purple-500", val: scheduledInterviews.length },
              { label: "Offers", color: "bg-teal-500", val: 1 },
            ].map((bar) => (
              <div key={bar.label} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-xs font-bold text-slate-400">{bar.val}</span>
                <div className={`w-full rounded-t-lg ${bar.color} opacity-80`} style={{ height: `${Math.max(bar.val * 20, 4)}px` }} />
                <span className="text-center text-xs leading-tight text-slate-400">{bar.label}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-xs text-slate-400">
            Posted: {jobs.filter((j) => j.status === "Active").length} · Shortlisted: {applicants.filter((a) => a.status === "Shortlisted").length} · Interviews: {scheduledInterviews.length}
          </p>
        </div>

        {/* Interview Schedule Widget */}
        <div className="rounded-2xl border border-borderColor bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Calendar size={18} className="text-primary" />
            <h3 className="font-bold text-slate-800">Upcoming Interviews</h3>
          </div>
          {scheduledInterviews.length === 0 ? (
            <p className="text-sm text-slate-400">No interviews scheduled.</p>
          ) : (
            <div className="space-y-3">
              {scheduledInterviews.map((iv) => (
                <div key={iv.id} className="rounded-xl border border-borderColor bg-light p-3">
                  <p className="text-sm font-bold text-slate-800">{iv.candidate}</p>
                  <p className="text-xs text-slate-500">{iv.role}</p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><Calendar size={11} /> {iv.date}</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {iv.time}</span>
                  </div>
                  <span className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${iv.status === "Confirmed" ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"}`}>
                    {iv.status}
                  </span>
                </div>
              ))}
            </div>
          )}
          <button
            type="button"
            onClick={() => setActiveSection("allApplicants")}
            className="mt-4 w-full rounded-xl border border-primary/20 py-2 text-xs font-bold text-primary hover:bg-primary/5"
          >
            + Schedule Interview
          </button>
        </div>
      </div>
    </div>
  );

  // ─── Render View Profile ───────────────────────────────────────────────────

  const renderViewProfile = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">View Profile</h2>
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        <p className="font-bold">Public Profile Visibility</p>
        <p className="mt-1">This profile is visible to shortlisted candidates and job applicants. You can control visibility below.</p>
      </div>
      <div className="overflow-hidden rounded-3xl border border-borderColor bg-white shadow-soft">
        <div className="h-28 bg-primary" />
        <div className="relative px-6 pb-8">
          <div className="-mt-12 flex flex-col items-center gap-5 md:flex-row md:items-end">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-3xl border-4 border-white bg-light shadow-md">
              {logoImage ? <img src={logoImage} alt="logo" className="h-full w-full object-cover" /> : <Building2 size={36} className="text-primary" />}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-slate-900">{schoolName}</h2>
              <p className="mt-1 text-sm font-semibold text-primary">Schools & Institutions</p>
            </div>
            <button type="button" onClick={() => navigate("/school-profile")} className="rounded-xl border border-primary px-5 py-2.5 text-sm font-bold text-primary hover:bg-primary/5">
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
          <div className="mt-5 flex items-center justify-between rounded-xl border border-borderColor bg-light px-4 py-3">
            <p className="text-sm font-bold text-slate-700">Profile visible to shortlisted candidates</p>
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-600">Open</span>
          </div>
        </div>
      </div>
    </div>
  );

  // ─── Render Post Job ───────────────────────────────────────────────────────

  const renderPostJob = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Post a New Job</h2>

      <div className="flex items-center gap-4 rounded-2xl border border-borderColor bg-white p-4 shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-borderColor bg-light">
          {logoImage ? <img src={logoImage} alt="logo" className="h-full w-full object-cover" /> : <Building2 size={22} className="text-primary" />}
        </div>
        <div>
          <p className="font-bold text-slate-800">{schoolName}</p>
          <p className="text-xs text-slate-400">Posting as Institute</p>
        </div>
      </div>

      <div className="rounded-2xl border border-borderColor bg-white p-6 shadow-sm">
        <h3 className="mb-5 border-b border-borderColor pb-4 text-lg font-bold text-primary">Job Details</h3>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Job Title */}
          <div className="lg:col-span-2">
            <Field label="Job Title" required>
              <input name="title" value={jobForm.title} onChange={handleJobChange} className={inputClass} placeholder="e.g. Mathematics Teacher" />
            </Field>
          </div>

          {/* Role Type */}
          <div className="lg:col-span-2">
            <Field label="Role Type" required>
              <div className="flex flex-wrap gap-3">
                {["Teaching", "Administrative", "Teaching & Administrative"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setJobForm((p) => ({ ...p, roleType: type, subject: "", adminRole: "" }))}
                    className={`rounded-xl border px-4 py-2 text-sm font-bold transition ${jobForm.roleType === type ? "border-primary bg-primary text-white" : "border-borderColor text-slate-600 hover:border-primary hover:text-primary"}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </Field>
          </div>

          {/* Subject (shown for Teaching or Teaching & Administrative) */}
          {(jobForm.roleType === "Teaching" || jobForm.roleType === "Teaching & Administrative") && (
            <Field label="Subject" required>
              <select name="subject" value={jobForm.subject} onChange={handleJobChange} className={inputClass}>
                <option value="">Select Subject</option>
                {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>
          )}

          {/* Admin Role (shown for Administrative or Teaching & Administrative) */}
          {(jobForm.roleType === "Administrative" || jobForm.roleType === "Teaching & Administrative") && (
            <Field label="Administrative Role" required>
              <select name="adminRole" value={jobForm.adminRole} onChange={handleJobChange} className={inputClass}>
                <option value="">Select Admin Role</option>
                {adminRoles.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </Field>
          )}

          <Field label="Experience Required" required>
            <select name="experience" value={jobForm.experience} onChange={handleJobChange} className={inputClass}>
              <option value="">Select Experience</option>
              {experienceOptions.map((e) => <option key={e} value={e}>{e}</option>)}
            </select>
          </Field>

          <Field label="Number of Vacancies" required>
            <input name="vacancies" type="number" min="1" value={jobForm.vacancies} onChange={handleJobChange} className={inputClass} placeholder="e.g. 2" />
          </Field>

          {/* Salary Range */}
          <Field label="Salary Range (Annual)">
            <select name="salaryRange" value={jobForm.salaryRange} onChange={handleJobChange} className={inputClass}>
              <option value="">Select Salary Range</option>
              {salaryRanges.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </Field>

          <Field label="Location" required>
            <input name="location" value={jobForm.location} onChange={handleJobChange} className={inputClass} placeholder="e.g. Ahmedabad, Gujarat" />
          </Field>

          <Field label="CTC Per Year (₹)">
            <input name="salaryYearly" value={jobForm.salaryYearly} onChange={handleJobChange} className={inputClass} placeholder="e.g. 480000" />
          </Field>

          <Field label="Monthly Take Home (₹)">
            <input name="salaryMonthly" value={jobForm.salaryMonthly} onChange={handleJobChange} className={inputClass} placeholder="e.g. 35000" />
          </Field>

          <Field label="Job Expiry Date">
            <input type="date" name="expiryDate" value={jobForm.expiryDate} onChange={handleJobChange} className={inputClass} />
          </Field>

          <div className="lg:col-span-2">
            <Field label="Employment Type" required>
              <div className="flex flex-wrap gap-3">
                {employmentTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setJobForm((prev) => ({ ...prev, employmentType: type }))}
                    className={`rounded-xl border px-4 py-2 text-sm font-bold transition ${jobForm.employmentType === type ? "border-primary bg-primary text-white" : "border-borderColor text-slate-600 hover:border-primary hover:text-primary"}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </Field>
          </div>

          {/* AI JD Generator */}
          <div className="lg:col-span-2">
            <div className="mb-3 flex items-center justify-between">
              <label className={labelClass}>Job Description</label>
              <button
                type="button"
                onClick={generateJD}
                disabled={generatingJD}
                className="inline-flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-xs font-bold text-primary hover:bg-primary/20 disabled:opacity-50"
              >
                <Wand2 size={14} />
                {generatingJD ? "Generating..." : "AI Generate JD"}
              </button>
            </div>
            <textarea
              name="description"
              value={jobForm.description}
              onChange={handleJobChange}
              className={`${inputClass} min-h-32 resize-none`}
              placeholder="Describe the role, or click 'AI Generate JD' to auto-generate based on Title, Subject & Experience..."
            />
            <p className="mt-1 text-xs text-slate-400">You can edit the AI-generated description as needed.</p>
          </div>

          <div className="lg:col-span-2">
            <Field label="Requirements">
              <textarea name="requirements" value={jobForm.requirements} onChange={handleJobChange} className={`${inputClass} min-h-24 resize-none`} placeholder="List the key requirements for this role (free text)..." />
            </Field>
          </div>

          <div className="lg:col-span-2">
            <Field label="Qualifications">
              <textarea name="qualifications" value={jobForm.qualifications} onChange={handleJobChange} className={`${inputClass} min-h-24 resize-none`} placeholder="List the required qualifications and certifications..." />
            </Field>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-borderColor pt-5 sm:flex-row sm:justify-end">
          <button type="button" onClick={handleSaveDraft} className="rounded-xl border border-borderColor px-6 py-3 text-sm font-bold text-slate-500 hover:bg-light">
            Save Draft
          </button>
          <button type="button" onClick={handlePublishJob} className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white hover:bg-primary/95">
            <Send size={16} /> Publish Job
          </button>
        </div>
      </div>
    </div>
  );

  // ─── Render Manage Jobs ────────────────────────────────────────────────────

  const renderManageJobs = () => {
    const draftCount = jobs.filter((j) => j.status === "Draft").length;
    return (
      <div className="space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Manage Jobs</h2>
            {draftCount > 0 && (
              <p className="mt-1 text-xs text-amber-600 font-semibold">{draftCount} draft job{draftCount > 1 ? "s" : ""} awaiting publication</p>
            )}
          </div>
          <button type="button" onClick={() => setActiveSection("postJob")} className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-primary/95">
            <PlusCircle size={16} /> Post New Job
          </button>
        </div>

        {/* Search + Status Filter */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex flex-1 items-center gap-2 rounded-2xl border border-borderColor bg-white px-4 py-3 shadow-sm">
            <Search size={16} className="text-slate-400" />
            <input value={jobSearch} onChange={(e) => setJobSearch(e.target.value)} placeholder="Search jobs..." className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400" />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-2xl border border-borderColor bg-white px-4 py-3 text-sm text-slate-600 shadow-sm outline-none focus:border-primary">
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Draft">Draft</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <div className="overflow-hidden rounded-2xl border border-borderColor bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-[760px] w-full text-left text-sm">
              <thead className="bg-primary/5 text-xs uppercase tracking-wide text-primary">
                <tr>
                  <th className="px-5 py-4">Job Title</th>
                  <th className="px-5 py-4">Applicants</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Posted</th>
                  <th className="px-5 py-4">Expiry</th>
                  <th className="px-5 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borderColor">
                {filteredJobs.length === 0 ? (
                  <tr><td colSpan={6} className="px-5 py-8 text-center text-sm text-slate-400">No jobs found.</td></tr>
                ) : (
                  filteredJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-light/50">
                      <td className="px-5 py-4 font-bold text-slate-800">{job.title}</td>
                      <td className="px-5 py-4 text-slate-600">{job.applicants}</td>
                      <td className="px-5 py-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusChipClass[job.status] || "bg-slate-100 text-slate-500"}`}>{job.status}</span>
                      </td>
                      <td className="px-5 py-4 text-slate-500">{job.date}</td>
                      <td className="px-5 py-4 text-slate-500">{job.expiryDate || "—"}</td>
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <button type="button" className="flex items-center gap-1 rounded-lg border border-borderColor px-3 py-1.5 text-xs font-bold text-primary hover:bg-light">
                            <Pencil size={12} /> Edit
                          </button>
                          {job.status === "Draft" && (
                            <button type="button" onClick={() => handlePublishDraft(job.id)} className="flex items-center gap-1 rounded-lg border border-green-200 px-3 py-1.5 text-xs font-bold text-green-600 hover:bg-green-50">
                              <Send size={12} /> Publish
                            </button>
                          )}
                          {job.status !== "Closed" && (
                            <button type="button" onClick={() => handleDeleteJob(job.id)} className="flex items-center gap-1 rounded-lg border border-red-100 px-3 py-1.5 text-xs font-bold text-red-500 hover:bg-red-50">
                              <Trash2 size={12} /> Delete
                            </button>
                          )}
                          {job.status === "Active" && (
                            <button type="button" onClick={() => setActiveSection("allApplicants")} className="flex items-center gap-1 rounded-lg border border-borderColor px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-light">
                              <Eye size={12} /> View
                            </button>
                          )}
                          {job.status === "Closed" && (
                            <>
                              <button type="button" onClick={() => handleRepostJob(job.id)} className="flex items-center gap-1 rounded-lg border border-green-200 px-3 py-1.5 text-xs font-bold text-green-600 hover:bg-green-50">
                                <RefreshCw size={12} /> Repost
                              </button>
                              <button type="button" onClick={() => setActiveSection("allApplicants")} className="flex items-center gap-1 rounded-lg border border-borderColor px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-light">
                                <Eye size={12} /> View Apps
                              </button>
                            </>
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
  };

  // ─── Render All Applicants ─────────────────────────────────────────────────

  const renderAllApplicants = () => (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold text-slate-800">All Applicants</h2>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <div className="flex flex-1 min-w-48 items-center gap-2 rounded-2xl border border-borderColor bg-white px-4 py-3 shadow-sm">
          <Search size={16} className="text-slate-400" />
          <input value={applicantSearch} onChange={(e) => setApplicantSearch(e.target.value)} placeholder="Search by name or subject..." className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400" />
        </div>
        <select value={jobTitleFilter} onChange={(e) => setJobTitleFilter(e.target.value)} className="rounded-2xl border border-borderColor bg-white px-4 py-3 text-sm text-slate-600 shadow-sm outline-none focus:border-primary">
          <option value="">All Job Titles</option>
          {uniqueJobTitles.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)} className="rounded-2xl border border-borderColor bg-white px-4 py-3 text-sm text-slate-600 shadow-sm outline-none focus:border-primary">
          <option value="">All Subjects</option>
          {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={expFilter} onChange={(e) => setExpFilter(e.target.value)} className="rounded-2xl border border-borderColor bg-white px-4 py-3 text-sm text-slate-600 shadow-sm outline-none focus:border-primary">
          <option value="">All Experience</option>
          <option value="0-3">0 – 3 yrs</option>
          <option value="3-6">3 – 6 yrs</option>
          <option value="6+">6+ yrs</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-borderColor bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-[860px] w-full text-left text-sm">
            <thead className="bg-primary/5 text-xs uppercase tracking-wide text-primary">
              <tr>
                <th className="px-5 py-4">Candidate</th>
                <th className="px-5 py-4">Job Title</th>
                <th className="px-5 py-4">Subject</th>
                <th className="px-5 py-4">Qualification</th>
                <th className="px-5 py-4">Experience</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderColor">
              {filteredApplicants.length === 0 ? (
                <tr><td colSpan={7} className="px-5 py-8 text-center text-sm text-slate-400">No applicants found.</td></tr>
              ) : (
                filteredApplicants.map((applicant) => (
                  <tr key={applicant.id} className="hover:bg-light/50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img src={applicant.avatar} alt={applicant.name} className="h-9 w-9 rounded-xl object-cover" />
                        <span className="font-bold text-slate-800">{applicant.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-600">{applicant.jobTitle}</td>
                    <td className="px-5 py-4 text-slate-600">{applicant.subject}</td>
                    <td className="px-5 py-4 text-slate-600">{applicant.qualification}</td>
                    <td className="px-5 py-4 text-slate-600">{applicant.experience}</td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusChipClass[applicant.status] || "bg-slate-100 text-slate-500"}`}>{applicant.status}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <button type="button" className="flex items-center gap-1 rounded-lg border border-borderColor px-3 py-1.5 text-xs font-bold text-primary hover:bg-light">
                          <FileText size={12} /> Resume
                        </button>
                        {applicant.status !== "Shortlisted" && applicant.status !== "Rejected" && (
                          <button type="button" onClick={() => handleShortlist(applicant.id)} className="flex items-center gap-1 rounded-lg border border-green-200 px-3 py-1.5 text-xs font-bold text-green-600 hover:bg-green-50">
                            Shortlist
                          </button>
                        )}
                        {applicant.status === "Rejected" ? (
                          <button type="button" onClick={() => handleUndoReject(applicant.id)} className="flex items-center gap-1 rounded-lg border border-amber-200 px-3 py-1.5 text-xs font-bold text-amber-600 hover:bg-amber-50">
                            Undo Reject
                          </button>
                        ) : (
                          <button type="button" onClick={() => handleReject(applicant.id)} className="flex items-center gap-1 rounded-lg border border-red-100 px-3 py-1.5 text-xs font-bold text-red-500 hover:bg-red-50">
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

  // ─── Render Saved Candidates ───────────────────────────────────────────────

  const renderSavedCandidates = () => (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold text-slate-800">Saved Candidates</h2>
      <p className="text-sm text-slate-500">Shortlisted candidates from All Applicants. Add private notes/comments for each candidate.</p>

      {shortlistedApplicants.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <p className="text-slate-400">No shortlisted candidates yet. Go to All Applicants to shortlist candidates.</p>
          <button type="button" onClick={() => setActiveSection("allApplicants")} className="mt-4 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-primary/95">
            View All Applicants
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {shortlistedApplicants.map((applicant) => (
            <div key={applicant.id} className="rounded-2xl border border-borderColor bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <img src={applicant.avatar} alt={applicant.name} className="h-14 w-14 rounded-2xl object-cover" />
                <div className="flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-bold text-slate-800">{applicant.name}</h3>
                      <p className="text-xs text-slate-500">{applicant.jobTitle} · {applicant.subject} · {applicant.experience}</p>
                      <p className="text-xs text-slate-400">{applicant.qualification}</p>
                    </div>
                    <span className="self-start rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-600">Shortlisted</span>
                  </div>

                  {/* Notes/Comments */}
                  <div className="mt-4">
                    {editingComment === applicant.id ? (
                      <div className="space-y-2">
                        <textarea
                          value={commentDraft}
                          onChange={(e) => setCommentDraft(e.target.value)}
                          className="w-full rounded-xl border border-borderColor bg-light px-3 py-2 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 resize-none min-h-20"
                          placeholder="Add private notes about this candidate..."
                        />
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setCandidateComments((prev) => ({ ...prev, [applicant.id]: commentDraft }));
                              setEditingComment(null);
                            }}
                            className="flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-white hover:bg-primary/95"
                          >
                            <Save size={12} /> Save Note
                          </button>
                          <button type="button" onClick={() => setEditingComment(null)} className="rounded-lg border border-borderColor px-3 py-1.5 text-xs font-bold text-slate-500 hover:bg-light">
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-3">
                        {candidateComments[applicant.id] ? (
                          <div className="flex-1 rounded-xl bg-light px-3 py-2 text-sm text-slate-600">
                            <p className="text-xs font-bold text-slate-500 mb-1">Note:</p>
                            {candidateComments[applicant.id]}
                          </div>
                        ) : (
                          <p className="text-xs text-slate-400 italic">No notes added yet.</p>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            setCommentDraft(candidateComments[applicant.id] || "");
                            setEditingComment(applicant.id);
                          }}
                          className="flex shrink-0 items-center gap-1 rounded-lg border border-borderColor px-3 py-1.5 text-xs font-bold text-primary hover:bg-light"
                        >
                          <MessageSquare size={12} /> {candidateComments[applicant.id] ? "Edit Note" : "Add Note"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // ─── Render Settings ───────────────────────────────────────────────────────

  const renderSettings = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-slate-800">Settings</h2>

      {/* Change Password */}
      <div className="rounded-2xl border border-borderColor bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3 border-b border-borderColor pb-4">
          <span className="rounded-xl bg-primary/10 p-2 text-primary"><KeyRound size={18} /></span>
          <h3 className="text-lg font-bold text-slate-800">Change Password</h3>
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <Field label="Current Password">
            <input type="password" value={pwForm.current} onChange={(e) => setPwForm((p) => ({ ...p, current: e.target.value }))} className={inputClass} placeholder="Enter current password" />
          </Field>
          <Field label="New Password">
            <input type="password" value={pwForm.next} onChange={(e) => setPwForm((p) => ({ ...p, next: e.target.value }))} className={inputClass} placeholder="Enter new password" />
          </Field>
          <Field label="Confirm New Password">
            <input type="password" value={pwForm.confirm} onChange={(e) => setPwForm((p) => ({ ...p, confirm: e.target.value }))} className={inputClass} placeholder="Re-enter new password" />
          </Field>
        </div>
        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={() => {
              if (!pwForm.current) { alert("Enter your current password."); return; }
              if (pwForm.next !== pwForm.confirm) { alert("New passwords do not match."); return; }
              if (pwForm.next.length < 6) { alert("Password must be at least 6 characters."); return; }
              alert("Password updated successfully!");
              setPwForm({ current: "", next: "", confirm: "" });
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white hover:bg-primary/95"
          >
            <Save size={16} /> Update Password
          </button>
        </div>
      </div>

      {/* Help & Support */}
      <div className="rounded-2xl border border-borderColor bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3 border-b border-borderColor pb-4">
          <span className="rounded-xl bg-primary/10 p-2 text-primary"><HelpCircle size={18} /></span>
          <h3 className="text-lg font-bold text-slate-800">Help & Support</h3>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            { q: "How do I post a job?", a: "Go to 'Post a New Job' in the sidebar, fill in the details and click Publish Job." },
            { q: "How do I shortlist candidates?", a: "Go to 'All Applicants', find a candidate and click the Shortlist button." },
            { q: "How do I view an applicant's resume?", a: "In All Applicants, click the Resume button next to any candidate's row." },
            { q: "How do I schedule an interview?", a: "Shortlist a candidate first, then go to Saved Candidates to coordinate." },
          ].map((faq) => (
            <div key={faq.q} className="rounded-xl bg-light p-4">
              <p className="text-sm font-bold text-slate-800">{faq.q}</p>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm">
          <p className="font-bold text-primary">Need more help?</p>
          <p className="mt-1 text-slate-600">Email us at <span className="font-bold text-primary">support@skooljobs.in</span> — we respond within 24 hours.</p>
        </div>
      </div>

      {/* Delete Account */}
      <div className="rounded-2xl border border-red-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3 border-b border-red-100 pb-4">
          <span className="rounded-xl bg-red-100 p-2 text-red-500"><Trash2 size={18} /></span>
          <h3 className="text-lg font-bold text-red-600">Delete Account</h3>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          Permanently deleting your account will remove all job postings, applicant data, and profile information. This action is <strong>irreversible</strong>.
        </p>

        {deleteStep === 0 && (
          <button type="button" onClick={() => setDeleteStep(1)} className="mt-5 inline-flex items-center gap-2 rounded-xl border border-red-300 px-5 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50">
            <Trash2 size={15} /> Request Account Deletion
          </button>
        )}

        {deleteStep === 1 && (
          <div className="mt-5 space-y-4 rounded-xl border border-red-200 bg-red-50 p-5">
            <p className="text-sm font-bold text-red-700">Confirmation Required — Step 1 of 2</p>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={deleteChecks.c1} onChange={(e) => setDeleteChecks((p) => ({ ...p, c1: e.target.checked }))} className="mt-1 h-4 w-4 accent-red-500" />
              <span className="text-sm text-slate-700">I understand that all my job postings and applicant data will be permanently deleted.</span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={deleteChecks.c2} onChange={(e) => setDeleteChecks((p) => ({ ...p, c2: e.target.checked }))} className="mt-1 h-4 w-4 accent-red-500" />
              <span className="text-sm text-slate-700">I confirm this is my account and I wish to permanently delete it. This cannot be undone.</span>
            </label>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                disabled={!deleteChecks.c1 || !deleteChecks.c2}
                onClick={() => { setDeleteStep(2); setOtpSent(true); alert("Demo OTP sent! Use code 123456 to confirm deletion."); }}
                className="rounded-xl bg-red-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Proceed to OTP Verification
              </button>
              <button type="button" onClick={() => { setDeleteStep(0); setDeleteChecks({ c1: false, c2: false }); }} className="rounded-xl border border-borderColor px-5 py-2.5 text-sm font-bold text-slate-500 hover:bg-light">
                Cancel
              </button>
            </div>
          </div>
        )}

        {deleteStep === 2 && (
          <div className="mt-5 space-y-4 rounded-xl border border-red-200 bg-red-50 p-5">
            <p className="text-sm font-bold text-red-700">OTP Verification — Step 2 of 2</p>
            {otpSent && <p className="text-xs text-slate-600">A 6-digit OTP has been sent to your registered email and mobile number.</p>}
            <Field label="Enter OTP">
              <input
                value={deleteOtp}
                onChange={(e) => setDeleteOtp(e.target.value)}
                className={inputClass}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
              />
            </Field>
            <p className="text-xs text-slate-400">For demo: use OTP <strong>123456</strong></p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  if (deleteOtp !== "123456") { alert("Invalid OTP. Try 123456 for demo."); return; }
                  alert("Account deleted. Redirecting...");
                  handleLogout();
                }}
                className="rounded-xl bg-red-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-red-600"
              >
                Confirm Delete Account
              </button>
              <button type="button" onClick={() => { setDeleteStep(0); setDeleteChecks({ c1: false, c2: false }); setDeleteOtp(""); setOtpSent(false); }} className="rounded-xl border border-borderColor px-5 py-2.5 text-sm font-bold text-slate-500 hover:bg-light">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // ─── Render Content ────────────────────────────────────────────────────────

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard": return renderDashboard();
      case "viewProfile": return renderViewProfile();
      case "postJob": return renderPostJob();
      case "manageJobs": return renderManageJobs();
      case "allApplicants": return renderAllApplicants();
      case "savedCandidates": return renderSavedCandidates();
      case "settings": return renderSettings();
      case "packages": return (
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <Package size={40} className="mx-auto mb-4 text-primary/30" />
          <h2 className="text-2xl font-bold text-primary">Packages</h2>
          <p className="mt-2 text-sm text-slate-500">Pricing plans and payment gateway details coming soon. Contact support@skooljobs.in for early access.</p>
        </div>
      );
      case "transactions": return (
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <CreditCard size={40} className="mx-auto mb-4 text-primary/30" />
          <h2 className="text-2xl font-bold text-primary">Transactions</h2>
          <p className="mt-2 text-sm text-slate-500">Package and payment transaction records will appear here once your first plan is activated.</p>
        </div>
      );
      default:
        return <div className="rounded-2xl bg-white p-8 text-center shadow-sm"><h2 className="text-2xl font-bold text-primary">{sidebarItems.find((i) => i.id === activeSection)?.label || ""}</h2><p className="mt-2 text-sm text-slate-500">This section is coming soon.</p></div>;
    }
  };

  // ─── Sidebar ───────────────────────────────────────────────────────────────

  const SidebarInner = () => (
    <div className="flex h-full flex-col">
      <label className="mb-5 flex cursor-pointer items-center gap-2 self-start rounded-xl border border-dashed border-borderColor px-4 py-2 text-xs font-bold text-primary hover:bg-light">
        <Upload size={13} />
        Upload Institute Logo
        <input type="file" hidden accept="image/*" onChange={handleLogoUpload} />
      </label>

      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-borderColor bg-light">
          {logoImage ? <img src={logoImage} alt="logo" className="h-full w-full object-cover" /> : <Building2 size={22} className="text-primary" />}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-slate-800">{schoolName}</p>
          <p className="text-xs text-slate-400">School Account</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold transition ${isActive ? "bg-primary text-white" : "text-slate-600 hover:bg-light hover:text-primary"}`}
            >
              <Icon size={17} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-4 space-y-1 border-t border-borderColor pt-4">
        <button type="button" onClick={() => navigate("/select-role")} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold text-slate-600 hover:bg-light">
          <ArrowLeft size={17} /> Back to Home
        </button>
        <button type="button" onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold text-slate-600 hover:bg-light">
          <LogOut size={17} /> Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-light">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 flex-col border-r border-borderColor bg-white p-5 lg:flex">
          <SidebarInner />
        </aside>

        <main className="flex-1 p-5 lg:p-8">
          <Topbar title="School Dashboard" subtitle="Manage your job postings and track applicants." />

          <div className="mt-4 flex gap-2 overflow-x-auto rounded-3xl bg-white p-3 shadow-soft lg:hidden">
            <button type="button" onClick={() => navigate("/select-role")} className="flex shrink-0 items-center gap-2 rounded-2xl bg-light px-4 py-3 text-sm font-bold text-primary">
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
                  className={`flex shrink-0 items-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold transition ${isActive ? "bg-primary text-white" : "bg-light text-primary"}`}
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
