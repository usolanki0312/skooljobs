import { useState } from "react";
import { useNavigate, useOutletContext, useSearchParams } from "react-router-dom";
import {
  Bookmark, Calendar, ChevronRight, FileText, Search, X, CheckCircle2, XCircle, User,
} from "lucide-react";
import { statusChipClass } from "../../lib/schooldata";
import postjob from "../../../dropdown/School_module/postjob.json";
import applicantsOptions from "../../../dropdown/School_module/applicants.json";
import Select from "../../components/ui/Select";

const { Subject: subjects } = postjob;
const { Applicant_status: statusOptions } = applicantsOptions;

const filterPill =
  "min-w-44 rounded-2xl border border-borderColor bg-white px-4 py-3 text-sm shadow-sm focus:border-primary";

const SchoolAllApplicants = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { applicants, setApplicants, handleSaveCandidate } = useOutletContext();

  const [applicantSearch, setApplicantSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [expFilter, setExpFilter] = useState("");
  const [jobTitleFilter, setJobTitleFilter] = useState("");
  // Pre-select status filter from the URL (e.g. ?status=Shortlisted from dashboard card)
  const [statusFilter, setStatusFilter] = useState(searchParams.get("status") || "");
  const [selected, setSelected] = useState(null);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const teacherProfile = JSON.parse(localStorage.getItem("skooljobs_teacher_data") || "{}");

  const getResumeData = (candidate) => {
    if (!candidate) return null;
    const isRahul = candidate.candidateId === 1 || candidate.name.toLowerCase().includes("rahul");
    if (isRahul) {
      const teacherQualifications = JSON.parse(localStorage.getItem("skooljobs_teacher_qualifications") || "[]");
      const teacherExperiences = JSON.parse(localStorage.getItem("skooljobs_teacher_experiences") || "[]");
      const teacherAchievements = JSON.parse(localStorage.getItem("skooljobs_teacher_achievements") || "[]");
      return {
        name: `${teacherProfile.firstName || "Rahul"} ${teacherProfile.lastName || "Sharma"}`.trim(),
        email: teacherProfile.email || "teacher@gmail.com",
        phone: teacherProfile.phone || "9876543210",
        summary: teacherProfile.briefWriteUp || "Dedicated, creative, and student-focused classroom teacher who is committed to providing a high-quality educational experience.",
        qualifications: teacherQualifications.length > 0 
          ? teacherQualifications.map(q => ({ degree: q.degree, school: q.school, year: `${q.startYear}-${q.endYear}`, score: q.score || q.percentage }))
          : [
              { degree: "Bachelor of Education (B.Ed)", school: "Bhopal University", year: "2019-2021", score: "82%" },
              { degree: "M.Sc in Mathematics", school: "Indore University", year: "2017-2019", score: "9.2 CGPA" }
            ],
        experiences: teacherExperiences.length > 0
          ? teacherExperiences.map(e => ({ jobTitle: e.jobTitle || e.role, schoolName: e.schoolName || e.school, startYear: e.startYear, endYear: e.endYear, details: e.details || e.description }))
          : [
              { jobTitle: "Mathematics Teacher", schoolName: "Sunrise Public School", startYear: "2021", endYear: "2024", details: "Handled senior secondary algebra and calculus curriculum. Developed creative classroom teaching aids." }
            ],
        achievements: teacherAchievements.length > 0
          ? teacherAchievements.map(a => ({ name: a.name || a.title, year: a.year, by: a.by || a.issuer }))
          : [
              { name: "Best Teacher Award", year: "2023", by: "School Administration" }
            ]
      };
    }
    const nameKey = candidate.name.toLowerCase();
    if (nameKey.includes("priya")) {
      return {
        name: "Priya Singh",
        email: "priya.singh@gmail.com",
        phone: "+91 98123 45678",
        summary: "Dedicated and result-oriented English Teacher with over 5 years of experience in leading international schools. Proven track record of improving students' reading and writing skills by implementing customized curriculum and creative teaching methodologies.",
        qualifications: [
          { degree: "M.A. in English Literature", school: "Delhi University", year: "2018-2020", score: "8.5 CGPA" },
          { degree: "Bachelor of Education (B.Ed)", school: "LSR, Delhi University", year: "2015-2018", score: "82%" }
        ],
        experiences: [
          { jobTitle: "Senior English Teacher", schoolName: "St. Xavier's High School", startYear: "2021", endYear: "Present", details: "Designed and implemented interactive English language and literature curriculum for grades 9-12. Coordinated annual literature festivals and inter-school debate championships." },
          { jobTitle: "English Language Tutor", schoolName: "EduPath Online Academy", startYear: "2020", endYear: "2021", details: "Conducted live online English instruction for ESL students globally. Handled batches of 15+ students with customized learning progress trackers." }
        ],
        achievements: [
          { name: "Best Teacher of the Year", year: "2023", by: "St. Xavier's High School" },
          { name: "Certified IELTS Trainer", year: "2022", by: "British Council" }
        ]
      };
    }
    if (nameKey.includes("suresh")) {
      return {
        name: "Suresh Verma",
        email: "suresh.verma@yahoo.com",
        phone: "+91 97654 32109",
        summary: "Enthusiastic Mathematics Educator with a deep passion for logical reasoning and teaching pedagogy. Experienced in grooming students for competitive math olympiads and building solid algebra/calculus foundation skills.",
        qualifications: [
          { degree: "M.Sc. in Mathematics", school: "Banaras Hindu University (BHU)", year: "2016-2018", score: "9.1 CGPA" },
          { degree: "Bachelor of Education (B.Ed)", school: "BHU", year: "2013-2016", score: "79%" }
        ],
        experiences: [
          { jobTitle: "Mathematics Faculty", schoolName: "Sunrise Public School", startYear: "2019", endYear: "Present", details: "Taught calculus, algebra and geometry to high school students. Designed question banks and mock tests for Board Examinations." }
        ],
        achievements: [
          { name: "National Math Olympiad Coordinator", year: "2024", by: "CBSE board" }
        ]
      };
    }
    return {
      name: candidate.name,
      email: `${candidate.name.toLowerCase().replace(/\s+/g, ".")}@example.com`,
      phone: "+91 99999 88888",
      summary: `Experienced educator specializing in ${candidate.subject || "Teaching"}. Dedicated to creating an inclusive, positive, and intellectually stimulating environment for all students.`,
      qualifications: [
        { degree: candidate.qualification || "B.Ed", school: "State Board University", year: "2016-2018", score: "1st Class" }
      ],
      experiences: [
        { jobTitle: candidate.jobTitle || "Teacher", schoolName: "Global Public School", startYear: "2019", endYear: "Present", details: `Responsible for teaching ${candidate.subject || "relevant subjects"} and conducting regular academic assessments.` }
      ],
      achievements: []
    };
  };

  const resumeData = selected ? getResumeData(selected) : null;

  const getPublicProfileData = (candidate) => {
    if (!candidate) return null;
    const isRahul = candidate.candidateId === 1 || candidate.name.toLowerCase().includes("rahul");
    if (isRahul) {
      const teacherQualifications = JSON.parse(localStorage.getItem("skooljobs_teacher_qualifications") || "[]");
      const teacherExperiences = JSON.parse(localStorage.getItem("skooljobs_teacher_experiences") || "[]");
      const teacherAchievements = JSON.parse(localStorage.getItem("skooljobs_teacher_achievements") || "[]");
      const totalExpYears = teacherExperiences.reduce((sum, exp) => {
        if (!exp.startDate) return sum;
        const end = exp.currentEmployer ? new Date() : (exp.endDate ? new Date(exp.endDate) : new Date());
        const start = new Date(exp.startDate);
        return sum + Math.max(0, (end - start) / (1000 * 60 * 60 * 24 * 365));
      }, 0);
      return {
        title: teacherProfile.title || "Mr",
        firstName: teacherProfile.firstName || "Rahul",
        lastName: teacherProfile.lastName || "Sharma",
        currentJob: teacherProfile.currentJob || "Mathematics Teacher",
        city: teacherProfile.city || "Indore",
        age: teacherProfile.age || "24",
        mainSubject: teacherProfile.mainSubject || "Mathematics",
        experience: totalExpYears > 0 ? `${totalExpYears.toFixed(1)} years` : "3 years",
        highestDeg: teacherQualifications[0]?.degree || teacherProfile.highestQualificationOne || "B.Ed",
        university: teacherQualifications[0]?.university || "Bhopal University",
        summary: teacherProfile.briefWriteUp || "Dedicated and passionate Mathematics Teacher with a focus on student engagement.",
        awards: teacherAchievements
      };
    }
    const nameKey = candidate.name.toLowerCase();
    if (nameKey.includes("priya")) {
      return {
        title: "Ms",
        firstName: "Priya",
        lastName: "Singh",
        currentJob: "English Teacher",
        city: "Delhi",
        age: "27",
        mainSubject: "English",
        experience: "5 years",
        highestDeg: "MA English",
        university: "Delhi University",
        summary: "Dedicated and result-oriented English Teacher with over 5 years of experience in leading international schools.",
        awards: [
          { name: "Best Teacher of the Year", by: "St. Xavier's High School", year: "2023" }
        ]
      };
    }
    if (nameKey.includes("suresh")) {
      return {
        title: "Mr",
        firstName: "Suresh",
        lastName: "Verma",
        currentJob: "Mathematics Teacher",
        city: "Bhopal",
        age: "29",
        mainSubject: "Mathematics",
        experience: "6 years",
        highestDeg: "M.Sc. Mathematics",
        university: "BHU",
        summary: "Enthusiastic Mathematics Educator with a deep passion for logical reasoning and teaching pedagogy.",
        awards: [
          { name: "National Math Olympiad Coordinator", by: "CBSE board", year: "2024" }
        ]
      };
    }
    return {
      title: "Mr/Ms",
      firstName: candidate.name.split(" ")[0],
      lastName: candidate.name.split(" ")[1] || "",
      currentJob: candidate.jobTitle,
      city: "Bhopal",
      age: "26",
      mainSubject: candidate.subject,
      experience: candidate.experience,
      highestDeg: candidate.qualification,
      university: "State University",
      summary: `Experienced educator specializing in ${candidate.subject || "teaching"}.`,
      awards: []
    };
  };

  const publicProfileData = selected ? getPublicProfileData(selected) : null;

  const uniqueJobTitles = [...new Set(applicants.map((a) => a.jobTitle))];

  const filteredApplicants = applicants.filter((a) => {
    const matchSearch =
      a.name.toLowerCase().includes(applicantSearch.toLowerCase()) ||
      a.subject.toLowerCase().includes(applicantSearch.toLowerCase());
    const matchSubject = !subjectFilter || a.subject === subjectFilter;
    const matchJob = !jobTitleFilter || a.jobTitle === jobTitleFilter;
    const matchStatus = !statusFilter || a.status === statusFilter;
    const expYears = parseInt(a.experience) || 0;
    const matchExp =
      !expFilter ||
      (expFilter === "0-3" && expYears <= 3) ||
      (expFilter === "3-6" && expYears > 3 && expYears <= 6) ||
      (expFilter === "6+" && expYears > 6);
    return matchSearch && matchSubject && matchExp && matchJob && matchStatus;
  });

  const handleStatusChange = (id, status) => {
    setApplicants((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    if (selected?.id === id) setSelected((s) => ({ ...s, status }));
  };

  const handleSave = (id) => {
    handleSaveCandidate(id);
    if (selected?.id === id) setSelected((s) => ({ ...s, saved: !s.saved }));
  };

  const openDrawer = (applicant) => setSelected(applicant);
  const closeDrawer = () => setSelected(null);

  // Keep drawer in sync when applicant state changes (e.g. save toggled from table)
  const drawerApplicant = selected
    ? applicants.find((a) => a.id === selected.id) ?? selected
    : null;

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">All Applicants</h2>

      {/* ── Filters ───────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <div className="flex flex-1 min-w-48 items-center gap-2 rounded-2xl border border-borderColor bg-white px-4 py-3 shadow-sm">
          <Search size={16} className="shrink-0 text-slate-400" />
          <input
            value={applicantSearch}
            onChange={(e) => setApplicantSearch(e.target.value)}
            placeholder="Search by name or subject..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </div>
        <Select
          value={jobTitleFilter}
          onChange={setJobTitleFilter}
          placeholder="All Job Titles"
          options={uniqueJobTitles}
          className={filterPill}
        />
        <Select
          value={subjectFilter}
          onChange={setSubjectFilter}
          placeholder="All Subjects"
          options={subjects}
          className={filterPill}
        />
        <Select
          value={statusFilter}
          onChange={setStatusFilter}
          placeholder="All Status"
          options={statusOptions}
          className={filterPill}
        />
        <Select
          value={expFilter}
          onChange={setExpFilter}
          placeholder="All Experience"
          options={[
            { label: "0 – 3 yrs", value: "0-3" },
            { label: "3 – 6 yrs", value: "3-6" },
            { label: "6+ yrs", value: "6+" },
          ]}
          className={filterPill}
        />
      </div>

      {/* ── Table ─────────────────────────────────────────────────────────── */}
      <div className="overflow-hidden rounded-2xl border border-borderColor bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-170 w-full text-left text-sm">
            <thead className="bg-primary/5 text-xs uppercase tracking-wide text-primary">
              <tr>
                <th className="px-5 py-4">Candidate</th>
                <th className="px-5 py-4">Job Title</th>
                <th className="px-5 py-4">Subject</th>
                <th className="px-5 py-4">Experience</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 w-10" />
              </tr>
            </thead>
            <tbody className="divide-y divide-borderColor">
              {filteredApplicants.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-sm text-slate-400">
                    No applicants found.
                  </td>
                </tr>
              ) : (
                filteredApplicants.map((applicant) => (
                  <tr
                    key={applicant.id}
                    onClick={() => openDrawer(applicant)}
                    className={`cursor-pointer transition hover:bg-light/60 ${selected?.id === applicant.id ? "bg-primary/5" : ""}`}
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img src={applicant.avatar} alt={applicant.name} className="h-9 w-9 shrink-0 rounded-xl object-cover" />
                        <div className="min-w-0">
                          <p className="font-bold text-slate-800 truncate">{applicant.name}</p>
                          <p className="text-xs text-slate-400 truncate">{applicant.qualification}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">{applicant.jobTitle}</td>
                    <td className="px-5 py-3.5 text-slate-600">{applicant.subject}</td>
                    <td className="px-5 py-3.5 text-slate-600">{applicant.experience}</td>
                    <td className="px-5 py-3.5">
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusChipClass[applicant.status] || "bg-slate-100 text-slate-500"}`}>
                        {applicant.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-slate-300">
                      <ChevronRight size={16} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Drawer backdrop ───────────────────────────────────────────────── */}
      {drawerApplicant && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          onClick={closeDrawer}
        />
      )}

      {/* ── Drawer panel ──────────────────────────────────────────────────── */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          drawerApplicant ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {drawerApplicant && (
          <>
            {/* Drawer header */}
            <div className="flex items-center justify-between border-b border-borderColor px-6 py-4">
              <h3 className="font-bold text-slate-800">Candidate Profile</h3>
              <button type="button" onClick={closeDrawer} className="rounded-xl p-2 text-slate-400 hover:bg-light">
                <X size={18} />
              </button>
            </div>

            {/* Drawer content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">

              {/* Profile card */}
              <div className="relative rounded-2xl border border-borderColor bg-light p-4">
                <span className={`absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-bold ${statusChipClass[drawerApplicant.status] || "bg-slate-100 text-slate-500"}`}>
                  {drawerApplicant.status}
                </span>
                <div className="flex items-center gap-4 pr-24">
                  <img
                    src={drawerApplicant.avatar}
                    alt={drawerApplicant.name}
                    className="h-16 w-16 shrink-0 rounded-2xl object-cover"
                  />
                  <div className="min-w-0">
                    <h4 className="text-lg font-bold text-slate-800 truncate">{drawerApplicant.name}</h4>
                    <p className="text-sm text-slate-500 truncate">{drawerApplicant.jobTitle}</p>
                    <p className="text-xs text-slate-400 mt-0.5 truncate">{drawerApplicant.qualification}</p>
                  </div>
                </div>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  { label: "Subject", value: drawerApplicant.subject },
                  { label: "Experience", value: drawerApplicant.experience },
                  { label: "Job Title", value: drawerApplicant.jobTitle },
                  { label: "Qualification", value: drawerApplicant.qualification },
                ].map((d) => (
                  <div key={d.label} className="rounded-xl border border-borderColor bg-white p-3">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{d.label}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">{d.value}</p>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Actions</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleStatusChange(drawerApplicant.id, "Shortlisted")}
                    className={`flex-1 flex flex-col items-center justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-bold transition ${
                      drawerApplicant.status === "Shortlisted"
                        ? "border-green-400 bg-green-50 text-green-600 shadow-sm"
                        : "border-borderColor text-slate-600 hover:border-green-400 hover:text-green-600 hover:bg-green-50/20"
                    }`}
                  >
                    <CheckCircle2 size={16} className="mb-0.5" />
                    Shortlist
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSave(drawerApplicant.id)}
                    className={`flex-1 flex flex-col items-center justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-bold transition ${
                      drawerApplicant.saved
                        ? "border-orange-400 bg-orange-50 text-orange-600 shadow-sm"
                        : "border-borderColor text-slate-700 hover:bg-orange-50/20 hover:text-orange-600 hover:border-orange-400"
                    }`}
                  >
                    <Bookmark size={16} className={drawerApplicant.saved ? "fill-orange-600 text-orange-600 mb-0.5" : "text-slate-400 mb-0.5"} />
                    Save for later
                  </button>

                  <button
                    type="button"
                    onClick={() => handleStatusChange(drawerApplicant.id, "Rejected")}
                    className={`flex-1 flex flex-col items-center justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-bold transition ${
                      drawerApplicant.status === "Rejected"
                        ? "border-red-300 bg-red-50 text-red-500 shadow-sm"
                        : "border-borderColor text-slate-600 hover:border-red-300 hover:text-red-500 hover:bg-red-50/20"
                    }`}
                  >
                    <XCircle size={16} className="mb-0.5" />
                    Reject
                  </button>
                </div>
              </div>

              {/* Evaluation & Scheduling */}
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Evaluation & Scheduling</p>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowResumeModal(true);
                      if (drawerApplicant.status === "Not Reviewed") {
                        handleStatusChange(drawerApplicant.id, "Reviewed");
                      }
                    }}
                    className="flex w-full items-center gap-3 rounded-xl border border-borderColor px-4 py-3 text-sm font-bold text-slate-700 hover:bg-light transition"
                  >
                    <FileText size={16} className="text-primary" /> View Resume
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowProfileModal(true);
                      if (drawerApplicant.status === "Not Reviewed") {
                        handleStatusChange(drawerApplicant.id, "Reviewed");
                      }
                    }}
                    className="flex w-full items-center gap-3 rounded-xl border border-borderColor px-4 py-3 text-sm font-bold text-slate-700 hover:bg-light transition"
                  >
                    <User size={16} className="text-primary" /> View Public Profile
                  </button>

                  <button
                    type="button"
                    onClick={() => { closeDrawer(); navigate("/school/interviews"); }}
                    className="flex w-full items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-bold text-blue-600 hover:bg-blue-100 transition"
                  >
                    <Calendar size={16} className="text-blue-600" /> Schedule Interview
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ── Resume Modal Overlay ─────────────────────────────────────────── */}
      {showResumeModal && resumeData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl border border-borderColor">
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-borderColor bg-white px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">Curriculum Vitae</h3>
                  <p className="text-xs text-slate-500">{resumeData.name}</p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => setShowResumeModal(false)} 
                className="rounded-xl p-2 text-slate-400 hover:bg-light hover:text-slate-600 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Resume Details Content */}
            <div className="p-6 md:p-8 space-y-6">
              {/* Header Card */}
              <div className="rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-6 text-white shadow-soft">
                <h2 className="text-2xl font-bold">{resumeData.name}</h2>
                <p className="text-white/80 mt-1 font-medium">{drawerApplicant.jobTitle} · {drawerApplicant.subject}</p>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/90">
                  <span>📧 {resumeData.email}</span>
                  <span>📞 {resumeData.phone}</span>
                  {teacherProfile.city && (
                    <span>📍 {teacherProfile.city}</span>
                  )}
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold uppercase tracking-wide text-primary border-b border-borderColor pb-1">Professional Summary</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{resumeData.summary}</p>
              </div>

              {/* Experience */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wide text-primary border-b border-borderColor pb-1">Work Experience</h3>
                {resumeData.experiences.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No professional experience listed.</p>
                ) : (
                  <div className="space-y-4">
                    {resumeData.experiences.map((exp, idx) => (
                      <div key={idx} className="relative pl-4 border-l-2 border-primary/20">
                        <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-primary" />
                        <div className="flex flex-wrap justify-between items-start">
                          <h4 className="text-sm font-bold text-slate-800">{exp.jobTitle}</h4>
                          <span className="text-xs font-semibold text-slate-400">{exp.startYear} - {exp.endYear || "Present"}</span>
                        </div>
                        <p className="text-xs font-semibold text-primary">{exp.schoolName}</p>
                        {exp.details && <p className="mt-2 text-xs text-slate-600 leading-relaxed">{exp.details}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Qualifications */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wide text-primary border-b border-borderColor pb-1">Education & Qualifications</h3>
                {resumeData.qualifications.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No educational qualifications listed.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {resumeData.qualifications.map((qual, idx) => (
                      <div key={idx} className="rounded-xl border border-borderColor bg-light/50 p-4">
                        <h4 className="text-sm font-bold text-slate-800">{qual.degree}</h4>
                        <p className="text-xs text-primary font-semibold mt-1">{qual.school}</p>
                        <div className="mt-2 flex justify-between items-center text-[11px] text-slate-400">
                          <span>Year: {qual.year}</span>
                          {qual.score && <span className="bg-white px-2 py-0.5 rounded border border-borderColor font-bold text-slate-600">{qual.score}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Achievements */}
              {resumeData.achievements && resumeData.achievements.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-primary border-b border-borderColor pb-1">Awards & Certifications</h3>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.achievements.map((ach, idx) => (
                      <div key={idx} className="rounded-xl border border-borderColor bg-light px-3.5 py-2 text-xs">
                        <p className="font-bold text-slate-800">{ach.name}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{ach.by} · {ach.year}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-borderColor px-6 py-4 flex justify-end bg-light/40">
              <button 
                type="button" 
                onClick={() => setShowResumeModal(false)} 
                className="rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primary/90 transition shadow-soft"
              >
                Close CV
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Public Profile Modal Overlay ─────────────────────────────────── */}
      {showProfileModal && publicProfileData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl border border-borderColor">
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-borderColor bg-white px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <User size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">Public Profile</h3>
                  <p className="text-xs text-slate-500">{publicProfileData.firstName} {publicProfileData.lastName?.charAt(0)}.</p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => setShowProfileModal(false)} 
                className="rounded-xl p-2 text-slate-400 hover:bg-light hover:text-slate-600 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Profile Content */}
            <div className="p-6 md:p-8 space-y-6">
              {/* Header Card */}
              <div className="relative overflow-hidden rounded-2xl border border-borderColor bg-white shadow-soft">
                <div className="h-20 bg-primary/10" />
                <div className="px-6 pb-6">
                  <div className="-mt-10 flex items-end gap-4">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-white bg-slate-200 shadow-md text-slate-400">
                      <User size={32} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xl font-bold text-slate-800">
                        {publicProfileData.title} {publicProfileData.firstName} {publicProfileData.lastName?.charAt(0)}.
                      </h4>
                      <p className="text-xs text-primary font-bold mt-1">
                        {publicProfileData.currentJob}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { label: "Age", value: publicProfileData.age },
                  { label: "Main Subject", value: publicProfileData.mainSubject },
                  { label: "Total Experience", value: publicProfileData.experience },
                  { label: "Highest Qualification", value: publicProfileData.highestDeg },
                  { label: "University", value: publicProfileData.university },
                  { label: "Area / City", value: publicProfileData.city },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-borderColor bg-light/50 p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{s.label}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">{s.value || "Not added"}</p>
                  </div>
                ))}
              </div>

              {/* Summary */}
              {publicProfileData.summary && (
                <div className="space-y-2">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-primary border-b border-borderColor pb-1">Professional Summary</h3>
                  <p className="text-sm text-slate-600 leading-relaxed bg-light/35 p-4 rounded-xl border border-borderColor/50">
                    {publicProfileData.summary}
                  </p>
                </div>
              )}

              {/* Awards */}
              {publicProfileData.awards && publicProfileData.awards.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-primary border-b border-borderColor pb-1">Public Awards</h3>
                  <div className="flex flex-wrap gap-2">
                    {publicProfileData.awards.map((award, idx) => (
                      <div key={idx} className="rounded-xl border border-borderColor bg-light px-3.5 py-2 text-xs">
                        <p className="font-bold text-slate-800">{award.name || award.title}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{award.by || award.issuer} · {award.year}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-borderColor px-6 py-4 flex justify-end bg-light/40">
              <button 
                type="button" 
                onClick={() => setShowProfileModal(false)} 
                className="rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primary/90 transition shadow-soft"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolAllApplicants;
