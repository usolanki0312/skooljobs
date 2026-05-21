import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Initial seed jobs to make the prototype feel fully alive
const INITIAL_JOBS = [
  {
    id: 1,
    title: "PGT Mathematics Teacher",
    schoolName: "Delhi Public School",
    schoolEmail: "hr@school.in",
    location: "New Delhi, Delhi",
    salary: "₹65,000 - ₹80,000 / month",
    experience: "3-5 Years",
    type: "Full-time",
    description: "Seeking an experienced educator to teach Higher Secondary classes XI & XII. Strong CBSE board curriculum expertise and command of calculus/algebra required.",
    postedDate: "May 15, 2026"
  },
  {
    id: 2,
    title: "TGT English Educator",
    schoolName: "Heritage International School",
    schoolEmail: "hr@heritage.edu",
    location: "Gurugram, Haryana",
    salary: "₹50,000 - ₹65,000 / month",
    experience: "2-4 Years",
    type: "Full-time",
    description: "Looking for an innovative TGT English teacher with excellent communication skills. Experience in progressive classroom methods is highly preferred.",
    postedDate: "May 17, 2026"
  },
  {
    id: 3,
    title: "Primary School Coordinator",
    schoolName: "Ryan International School",
    schoolEmail: "recruitment@ryan.org",
    location: "Mumbai, Maharashtra",
    salary: "₹45,000 - ₹55,000 / month",
    experience: "1-3 Years",
    type: "Full-time",
    description: "Coordinator role responsible for early childhood pedagogy, lesson planning, school activities coordination, and parent-teacher communication.",
    postedDate: "May 18, 2026"
  },
  {
    id: 4,
    title: "Computer Science Instructor",
    schoolName: "DAV Public School",
    schoolEmail: "jobs@dav.edu.in",
    location: "Bengaluru, Karnataka",
    salary: "₹70,000 - ₹90,000 / month",
    experience: "2+ Years",
    type: "Contract",
    description: "To teach foundational computer programming (Python & SQL) to Class IX-XII. B.Tech/MCA degree and teaching experience highly preferred.",
    postedDate: "May 19, 2026"
  }
];

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Candidate Profile completion states
  const [skills, setSkills] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [resumeName, setResumeName] = useState("");

  const [skillInput, setSkillInput] = useState("");
  const [certInput, setCertInput] = useState("");
  const [expForm, setExpForm] = useState({ title: "", school: "", duration: "" });
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [activeJobTab, setActiveJobTab] = useState("applied");
  const [isApplicationsExpanded, setIsApplicationsExpanded] = useState(true);

  // Global shared state
  const [allJobs, setAllJobs] = useState([]);
  const [allApplications, setAllApplications] = useState([]);

  // Recruiter specific states
  const [isPostingJob, setIsPostingJob] = useState(false);
  const [newJobForm, setNewJobForm] = useState({
    title: "",
    salary: "",
    experience: "",
    location: "",
    type: "Full-time",
    description: ""
  });
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [applicantFilter, setApplicantFilter] = useState("all");

  useEffect(() => {
    // 1. Authenticate user
    const currentUserStr = localStorage.getItem("currentUser");
    if (!currentUserStr) {
      navigate("/");
      return;
    }
    const parsedUser = JSON.parse(currentUserStr);
    setUser(parsedUser);

    // 2. Load global jobs
    const savedJobsStr = localStorage.getItem("skooljobs_all_jobs");
    let loadedJobs = [];
    if (savedJobsStr) {
      loadedJobs = JSON.parse(savedJobsStr);
    } else {
      loadedJobs = INITIAL_JOBS;
      localStorage.setItem("skooljobs_all_jobs", JSON.stringify(INITIAL_JOBS));
    }
    setAllJobs(loadedJobs);

    // 3. Load global applications
    const savedAppsStr = localStorage.getItem("skooljobs_all_applications");
    let loadedApps = [];
    if (savedAppsStr) {
      loadedApps = JSON.parse(savedAppsStr);
    } else {
      // Mock initial applications for demo completeness
      loadedApps = [
        {
          id: 1001,
          jobId: 1,
          jobTitle: "PGT Mathematics Teacher",
          schoolName: "Delhi Public School",
          schoolEmail: "hr@school.in",
          candidateName: "Rajesh Kumar",
          candidateEmail: "rajesh@gmail.com",
          candidatePhone: "+91 9898989898",
          candidateSkills: ["Classroom Management", "Algebra Pedagogy", "Vedic Maths"],
          candidateCerts: ["CTET Qualified", "B.Ed Degree"],
          candidateExps: [{ title: "Mathematics TGT", school: "Bal Bharti School", duration: "3 Years" }],
          candidateResume: "Rajesh_Maths_Resume.pdf",
          status: "Interview Scheduled",
          appliedDate: "May 18, 2026"
        }
      ];
      localStorage.setItem("skooljobs_all_applications", JSON.stringify(loadedApps));
    }
    setAllApplications(loadedApps);

    // 4. Load candidate specific profile details
    if (parsedUser.role === "candidate") {
      const savedSkills = localStorage.getItem(`skills_${parsedUser.email}`);
      setSkills(savedSkills ? JSON.parse(savedSkills) : ["Classroom Management", "Lesson Planning", "Subject Pedagogy"]);

      const savedCerts = localStorage.getItem(`certs_${parsedUser.email}`);
      setCertificates(savedCerts ? JSON.parse(savedCerts) : ["CTET Qualified (Paper II)", "B.Ed Degree"]);

      const savedExps = localStorage.getItem(`exps_${parsedUser.email}`);
      setExperiences(savedExps ? JSON.parse(savedExps) : [
        { title: "TGT Teacher", school: "Army Public School", duration: "2 Years" }
      ]);

      const savedResume = localStorage.getItem(`resume_${parsedUser.email}`);
      setResumeName(savedResume || "");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  // Helper: Save specific profile list to storage
  const saveProfileData = (key, updatedData) => {
    if (user) {
      localStorage.setItem(`${key}_${user.email}`, JSON.stringify(updatedData));
    }
  };

  // Profile completeness calculations
  const calculateProgress = () => {
    let base = 40;
    if (resumeName) base += 15;
    if (skills.length > 0) base += 15;
    if (certificates.length > 0) base += 15;
    if (experiences.length > 0) base += 15;
    return Math.min(base, 100);
  };

  // --- CANDIDATE METHODS ---
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!skillInput.trim()) return;
    if (skills.includes(skillInput.trim())) {
      setSkillInput("");
      return;
    }
    const updated = [...skills, skillInput.trim()];
    setSkills(updated);
    saveProfileData("skills", updated);
    setSkillInput("");
    logActivity(`Added skill "${skillInput.trim()}" to profile`);
  };

  const handleDeleteSkill = (skillToDelete) => {
    const updated = skills.filter(s => s !== skillToDelete);
    setSkills(updated);
    saveProfileData("skills", updated);
    logActivity(`Removed skill "${skillToDelete}"`);
  };

  const handleAddCert = (e) => {
    e.preventDefault();
    if (!certInput.trim()) return;
    if (certificates.includes(certInput.trim())) {
      setCertInput("");
      return;
    }
    const updated = [...certificates, certInput.trim()];
    setCertificates(updated);
    saveProfileData("certs", updated);
    setCertInput("");
    logActivity(`Added certificate "${certInput.trim()}"`);
  };

  const handleDeleteCert = (certToDelete) => {
    const updated = certificates.filter(c => c !== certToDelete);
    setCertificates(updated);
    saveProfileData("certs", updated);
    logActivity(`Removed certificate "${certToDelete}"`);
  };

  const handleAddExp = (e) => {
    e.preventDefault();
    if (!expForm.title || !expForm.school || !expForm.duration) {
      alert("Please fill all experience fields");
      return;
    }
    const updated = [...experiences, expForm];
    setExperiences(updated);
    saveProfileData("exps", updated);
    setExpForm({ title: "", school: "", duration: "" });
    logActivity(`Added experience: "${expForm.title}" at ${expForm.school}`);
  };

  const handleDeleteExp = (indexToDelete) => {
    const updated = experiences.filter((_, idx) => idx !== indexToDelete);
    setExperiences(updated);
    saveProfileData("exps", updated);
    logActivity(`Removed experience entry`);
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeName(file.name);
      localStorage.setItem(`resume_${user.email}`, file.name);
      logActivity(`Uploaded resume "${file.name}"`);
    }
  };

  const handleRemoveResume = () => {
    setResumeName("");
    localStorage.removeItem(`resume_${user.email}`);
    logActivity("Deleted resume portfolio");
  };

  const handleApplyJob = (job) => {
    // Check if already applied
    const alreadyApplied = allApplications.some(
      (app) => app.jobId === job.id && app.candidateEmail === user.email
    );
    if (alreadyApplied) {
      alert("You have already applied for this job!");
      return;
    }

    const newApp = {
      id: Date.now(),
      jobId: job.id,
      jobTitle: job.title,
      schoolName: job.schoolName,
      schoolEmail: job.schoolEmail || "hr@school.in",
      candidateName: user.name,
      candidateEmail: user.email,
      candidatePhone: user.phone || "+91 9876543210",
      candidateSkills: skills,
      candidateCerts: certificates,
      candidateExps: experiences,
      candidateResume: resumeName || "Mock_CV.pdf",
      status: "Applied",
      appliedDate: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      })
    };

    const updatedApps = [newApp, ...allApplications];
    setAllApplications(updatedApps);
    localStorage.setItem("skooljobs_all_applications", JSON.stringify(updatedApps));

    logActivity(`Applied for ${job.title} at ${job.schoolName}`);
    alert(`Application submitted successfully to ${job.schoolName}!`);
  };

  const logActivity = (message) => {
    if (!user) return;
    const key = `activities_${user.email}`;
    const savedAct = localStorage.getItem(key);
    let acts = savedAct ? JSON.parse(savedAct) : [];
    const newAct = {
      id: Date.now(),
      message,
      time: "Just now"
    };
    acts = [newAct, ...acts];
    localStorage.setItem(key, JSON.stringify(acts));
  };

  const getCandidateActivities = () => {
    if (!user) return [];
    const savedAct = localStorage.getItem(`activities_${user.email}`);
    return savedAct
      ? JSON.parse(savedAct)
      : [
          { id: 1, message: "Registered on SkoolJobs platform", time: "2 days ago" },
          { id: 2, message: "Completed basic teacher profile configuration", time: "1 day ago" }
        ];
  };

  // --- RECRUITER (EMPLOYER) METHODS ---
  const handlePostJob = (e) => {
    e.preventDefault();
    if (!newJobForm.title || !newJobForm.salary || !newJobForm.location || !newJobForm.description) {
      alert("Please fill in all the required job details!");
      return;
    }

    const newJob = {
      id: Date.now(),
      title: newJobForm.title,
      schoolName: user.schoolName || user.name || "My School",
      schoolEmail: user.email,
      location: newJobForm.location,
      salary: newJobForm.salary,
      experience: newJobForm.experience || "Freshers Welcome",
      type: newJobForm.type,
      description: newJobForm.description,
      postedDate: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      })
    };

    const updatedJobs = [newJob, ...allJobs];
    setAllJobs(updatedJobs);
    localStorage.setItem("skooljobs_all_jobs", JSON.stringify(updatedJobs));

    setNewJobForm({
      title: "",
      salary: "",
      experience: "",
      location: "",
      type: "Full-time",
      description: ""
    });
    setIsPostingJob(false);
    alert(`"${newJob.title}" posted successfully!`);
  };

  const updateApplicationStatus = (appId, newStatus) => {
    const updatedApps = allApplications.map((app) => {
      if (app.id === appId) {
        return { ...app, status: newStatus };
      }
      return app;
    });
    setAllApplications(updatedApps);
    localStorage.setItem("skooljobs_all_applications", JSON.stringify(updatedApps));

    if (selectedApplicant && selectedApplicant.id === appId) {
      setSelectedApplicant({ ...selectedApplicant, status: newStatus });
    }

    alert(`Applicant status successfully updated to "${newStatus}"!`);
  };

  // Filter lists based on logged in user
  const employerEmail = user ? user.email : "";
  const schoolJobs = allJobs.filter((job) => job.schoolEmail === employerEmail);
  const schoolApplications = allApplications.filter(
    (app) => app.schoolEmail === employerEmail || app.schoolName === user?.name
  );

  const filteredApplications = schoolApplications.filter((app) => {
    if (applicantFilter === "all") return true;
    return app.jobId === parseInt(applicantFilter);
  });

  const teacherAppliedJobs = allApplications.filter(
    (app) => app.candidateEmail === user?.email
  );

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#f5f8fc] font-body text-primary pb-20">
      {/* Dynamic Styled Banner */}
      <div className="bg-primary text-white text-center py-2 px-4 text-xs font-bold uppercase tracking-wider flex justify-center items-center gap-2">
        <span className="bg-white/20 px-2 py-0.5 rounded">Vercel Ready</span>
        Production prototype optimized with SPA client-side routing rewrites!
      </div>

      {/* Top Navbar */}
      <header className="bg-white border-b border-[#e1e9f4] sticky top-0 z-30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">
              S
            </div>
            <span className="text-xl font-bold text-primary font-heading tracking-wide">
              Skool<span className="text-secondary">Jobs</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-light rounded-full pl-3 pr-4 py-1.5 border border-borderColor">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                {user.role === "candidate" ? (user.name ? user.name.charAt(0) : "T") : "S"}
              </div>
              <span className="text-sm font-semibold hidden md:inline text-primary">
                {user.name || user.schoolName}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="bg-[#fde8e8] text-[#e02424] hover:bg-[#fbd5d5] px-4 py-2 rounded-xl text-sm font-bold transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Welcome Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between bg-white rounded-3xl p-6 sm:p-8 border border-borderColor shadow-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
          <div>
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {user.role === "employer" ? "School Recruiting Space" : "Teacher Workspace"}
            </span>
            <h1 className="text-3xl font-extrabold text-primary mt-2 font-heading tracking-tight">
              Welcome, {user.firstName || user.name}! 👋
            </h1>
            <p className="text-secondary text-sm mt-1">
              {user.role === "employer"
                ? "Post teaching roles, evaluate applications, and build your stellar institutional faculty."
                : "Complete your educational portfolio, explore open positions, and track applications in real-time."}
            </p>
          </div>

          {user.role === "employer" ? (
            <div className="mt-4 md:mt-0 flex gap-4 text-sm shrink-0">
              <div className="bg-[#f0f5fc] px-4 py-3 rounded-2xl border border-primary/10">
                <p className="text-xs text-secondary font-semibold uppercase">Jobs Posted</p>
                <p className="text-xl font-bold text-primary">{schoolJobs.length}</p>
              </div>
              <div className="bg-[#e6f4ea] px-4 py-3 rounded-2xl border border-[#137333]/10">
                <p className="text-xs text-secondary font-semibold uppercase">Total Applicants</p>
                <p className="text-xl font-bold text-[#137333]">{schoolApplications.length}</p>
              </div>
            </div>
          ) : (
            <div className="mt-4 md:mt-0 flex gap-4 text-sm shrink-0">
              <div className="bg-[#f0f5fc] px-4 py-3 rounded-2xl border border-primary/10">
                <p className="text-xs text-secondary font-semibold uppercase">My Applications</p>
                <p className="text-xl font-bold text-primary">{teacherAppliedJobs.length}</p>
              </div>
              <div className="bg-[#e6f4ea] px-4 py-3 rounded-2xl border border-[#137333]/10">
                <p className="text-xs text-secondary font-semibold uppercase">Profile Match</p>
                <p className="text-xl font-bold text-[#137333]">{calculateProgress()}%</p>
              </div>
            </div>
          )}
        </div>

        {/* -------------------- DYNAMIC ROLE-BASED DASHBOARD -------------------- */}

        {user.role === "employer" ? (
          // ================= RECRUITER (EMPLOYER) DASHBOARD =================
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left/Center Panel (Job Posts & Applicants) */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Recruiter Active Jobs Panel */}
              <div className="bg-white rounded-3xl border border-borderColor shadow-sm p-6 sm:p-8">
                <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
                  <div>
                    <h2 className="text-lg font-bold text-primary font-heading flex items-center gap-2">
                      <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      Active Job Postings
                    </h2>
                    <p className="text-secondary text-xs mt-1">
                      Manage published openings for your school or institution.
                    </p>
                  </div>
                  
                  <button
                    onClick={() => setIsPostingJob(true)}
                    className="bg-primary text-white hover:opacity-90 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow"
                  >
                    + Post A New Job
                  </button>
                </div>

                {isPostingJob && (
                  <form onSubmit={handlePostJob} className="mb-6 p-5 border-2 border-primary/20 rounded-2xl bg-light space-y-4 transition-all">
                    <div className="flex justify-between items-center border-b border-borderColor pb-2">
                      <span className="font-bold text-sm text-primary font-heading">New Job Details</span>
                      <button
                        type="button"
                        onClick={() => setIsPostingJob(false)}
                        className="text-secondary hover:text-red-500 font-bold text-xs"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-primary">Job Title *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. TGT Physics Teacher"
                          value={newJobForm.title}
                          onChange={(e) => setNewJobForm({ ...newJobForm, title: e.target.value })}
                          className="border border-borderColor rounded-xl px-3 py-2 text-xs outline-none bg-white"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-primary">Salary Range *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. ₹40,000 - ₹50,000 / month"
                          value={newJobForm.salary}
                          onChange={(e) => setNewJobForm({ ...newJobForm, salary: e.target.value })}
                          className="border border-borderColor rounded-xl px-3 py-2 text-xs outline-none bg-white"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-primary">Required Experience</label>
                        <input
                          type="text"
                          placeholder="e.g. 2-3 Years"
                          value={newJobForm.experience}
                          onChange={(e) => setNewJobForm({ ...newJobForm, experience: e.target.value })}
                          className="border border-borderColor rounded-xl px-3 py-2 text-xs outline-none bg-white"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-primary">Location *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Gurugram, Haryana"
                          value={newJobForm.location}
                          onChange={(e) => setNewJobForm({ ...newJobForm, location: e.target.value })}
                          className="border border-borderColor rounded-xl px-3 py-2 text-xs outline-none bg-white"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 sm:col-span-2">
                        <label className="text-xs font-bold text-primary">Job Type</label>
                        <select
                          value={newJobForm.type}
                          onChange={(e) => setNewJobForm({ ...newJobForm, type: e.target.value })}
                          className="border border-borderColor rounded-xl px-3 py-2 text-xs outline-none bg-white"
                        >
                          <option value="Full-time">Full-time</option>
                          <option value="Part-time">Part-time</option>
                          <option value="Contract">Contract</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1.5 sm:col-span-2">
                        <label className="text-xs font-bold text-primary">Job Description *</label>
                        <textarea
                          required
                          rows={3}
                          placeholder="Brief description of requirements and responsibilities..."
                          value={newJobForm.description}
                          onChange={(e) => setNewJobForm({ ...newJobForm, description: e.target.value })}
                          className="border border-borderColor rounded-xl p-3 text-xs outline-none bg-white"
                        ></textarea>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="bg-primary text-white w-full py-2.5 rounded-xl text-xs font-bold hover:opacity-90 transition-all"
                    >
                      Publish Listing
                    </button>
                  </form>
                )}

                {/* List of School's Posted Jobs */}
                <div className="space-y-4">
                  {schoolJobs.length === 0 ? (
                    <div className="py-8 text-center text-secondary text-sm italic border border-dashed border-borderColor rounded-2xl bg-light">
                      No active listings. Click "Post A New Job" to list your first opening!
                    </div>
                  ) : (
                    schoolJobs.map((job) => (
                      <div key={job.id} className="border border-[#e5eaf2] p-5 rounded-2xl hover:border-primary/20 transition-all bg-[#fafbfc]">
                        <div className="flex justify-between items-start flex-wrap gap-2">
                          <div>
                            <h3 className="font-bold text-[15px] text-primary font-heading">{job.title}</h3>
                            <p className="text-xs text-secondary font-semibold mt-1">{job.location} • {job.type}</p>
                          </div>
                          <span className="text-xs bg-[#e6f4ea] text-[#137333] font-bold px-3 py-1 rounded-full">
                            {job.salary}
                          </span>
                        </div>
                        <p className="text-xs text-secondary mt-3 leading-relaxed border-t border-[#e5eaf2]/70 pt-2">
                          {job.description}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Recruitment Pipeline / Applications Manager */}
              <div className="bg-white rounded-3xl border border-borderColor shadow-sm p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-3">
                  <div>
                    <h2 className="text-lg font-bold text-primary font-heading flex items-center gap-2">
                      <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Recruitment Pipeline
                    </h2>
                    <p className="text-secondary text-xs mt-1">
                      Review incoming teacher portfolios and take action.
                    </p>
                  </div>

                  {/* Filter Applications by Job */}
                  <select
                    value={applicantFilter}
                    onChange={(e) => setApplicantFilter(e.target.value)}
                    className="border border-borderColor rounded-xl px-3 py-2 text-xs outline-none bg-white text-primary font-semibold max-w-[200px]"
                  >
                    <option value="all">All Postings</option>
                    {schoolJobs.map((j) => (
                      <option key={j.id} value={j.id}>
                        {j.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Applications Table/List */}
                <div className="space-y-4">
                  {filteredApplications.length === 0 ? (
                    <div className="py-8 text-center text-secondary text-sm italic">
                      No applications received for the selected job filter yet.
                    </div>
                  ) : (
                    filteredApplications.map((app) => {
                      let statusBg = "bg-[#f0f5fc] text-primary";
                      if (app.status === "Interview Scheduled") statusBg = "bg-[#e6f4ea] text-[#137333]";
                      if (app.status === "Shortlisted") statusBg = "bg-[#fef7e0] text-[#b06000]";
                      if (app.status === "Rejected") statusBg = "bg-[#fde8e8] text-[#e02424]";
                      if (app.status.includes("Hired")) statusBg = "bg-primary/20 text-primary";

                      return (
                        <div
                          key={app.id}
                          className="border border-[#e5eaf2] p-5 rounded-2xl bg-white shadow-soft hover:border-primary/20 transition-all flex flex-col sm:flex-row justify-between sm:items-center gap-4"
                        >
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${statusBg}`}>
                                {app.status}
                              </span>
                              <span className="text-[11px] text-secondary">
                                Applied on {app.appliedDate}
                              </span>
                            </div>
                            <h3 className="font-bold text-[15px] text-primary mt-2 font-heading">
                              {app.candidateName}
                            </h3>
                            <p className="text-xs text-secondary font-semibold mt-1">
                              Applied For: <span className="text-primary font-bold">{app.jobTitle}</span>
                            </p>
                          </div>

                          <div className="flex gap-2 self-end sm:self-center shrink-0">
                            <button
                              onClick={() => setSelectedApplicant(app)}
                              className="bg-light hover:bg-[#e2e8f0] text-primary px-3 py-2 rounded-xl text-xs font-bold transition-all border border-borderColor"
                            >
                              View Profile
                            </button>

                            <select
                              onChange={(e) => updateApplicationStatus(app.id, e.target.value)}
                              value={app.status}
                              className="border border-borderColor rounded-xl px-2.5 py-2 text-xs outline-none bg-white font-semibold text-primary"
                            >
                              <option value="Applied">Change Status</option>
                              <option value="Shortlisted">Shortlist</option>
                              <option value="Interview Scheduled">Schedule Interview</option>
                              <option value="Hired 🎉">Hire</option>
                              <option value="Rejected">Reject</option>
                            </select>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

            </div>

            {/* Right Panel (Analytics & Mock Diagrams) */}
            <div className="space-y-8">
              
              {/* Recruiter Active Details */}
              <div className="bg-white rounded-3xl border border-borderColor shadow-sm p-6 sm:p-8">
                <h2 className="text-base font-bold text-primary font-heading mb-4">Recruitment Analytics</h2>
                
                <div className="space-y-4">
                  {/* Mock Chart/Graph 1 */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-primary mb-1">
                      <span>Math & Science roles</span>
                      <span>72% applications</span>
                    </div>
                    <div className="w-full bg-[#f1f3f4] h-2 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: "72%" }}></div>
                    </div>
                  </div>

                  {/* Mock Chart/Graph 2 */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-primary mb-1">
                      <span>Primary School roles</span>
                      <span>45% applications</span>
                    </div>
                    <div className="w-full bg-[#f1f3f4] h-2 rounded-full overflow-hidden">
                      <div className="bg-secondary h-full rounded-full" style={{ width: "45%" }}></div>
                    </div>
                  </div>

                  {/* Mock Chart/Graph 3 */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-primary mb-1">
                      <span>Computer Science roles</span>
                      <span>90% applications</span>
                    </div>
                    <div className="w-full bg-[#f1f3f4] h-2 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-primary to-secondary h-full rounded-full" style={{ width: "90%" }}></div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-borderColor mt-6 pt-4 text-center">
                  <p className="text-[11px] text-secondary font-semibold uppercase">Global Conversion Success</p>
                  <p className="text-2xl font-bold text-primary mt-1">98.4% Match Rate</p>
                </div>
              </div>

              {/* Sliding sidebar/details modal (Glassmorphism design) */}
              {selectedApplicant && (
                <div className="bg-white rounded-3xl border-2 border-primary/20 shadow-soft p-6 sm:p-8 space-y-5 transition-all">
                  <div className="flex justify-between items-center border-b border-borderColor pb-2.5">
                    <h3 className="font-bold text-sm font-heading text-primary">Teacher Portfolio</h3>
                    <button
                      onClick={() => setSelectedApplicant(null)}
                      className="text-secondary hover:text-[#e02424] font-bold text-xs"
                    >
                      Close ×
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-bold text-secondary uppercase">Teacher Name</h4>
                      <p className="text-base font-bold text-primary">{selectedApplicant.candidateName}</p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-secondary uppercase">Contact Information</h4>
                      <p className="text-xs text-primary font-semibold mt-1">{selectedApplicant.candidateEmail}</p>
                      <p className="text-xs text-primary font-semibold mt-0.5">{selectedApplicant.candidatePhone}</p>
                    </div>

                    {/* Resume File */}
                    <div>
                      <h4 className="text-xs font-bold text-secondary uppercase mb-2">Resume file</h4>
                      <div className="flex items-center gap-2 bg-[#f0f5fc] p-2.5 rounded-xl border border-primary/10">
                        <div className="w-8 h-8 bg-primary/20 text-primary rounded-lg flex items-center justify-center font-bold text-[10px] uppercase">
                          PDF
                        </div>
                        <span className="text-xs font-semibold text-primary truncate">
                          {selectedApplicant.candidateResume}
                        </span>
                      </div>
                    </div>

                    {/* Skills */}
                    <div>
                      <h4 className="text-xs font-bold text-secondary uppercase mb-2">Subject Skills</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedApplicant.candidateSkills?.length > 0 ? (
                          selectedApplicant.candidateSkills.map((sk, idx) => (
                            <span key={idx} className="bg-light text-primary text-[10px] px-2.5 py-1 rounded-full font-bold border border-borderColor">
                              {sk}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-secondary italic">No skills listed</span>
                        )}
                      </div>
                    </div>

                    {/* Experience */}
                    <div>
                      <h4 className="text-xs font-bold text-secondary uppercase mb-2">Teaching Experience</h4>
                      <div className="space-y-2">
                        {selectedApplicant.candidateExps?.length > 0 ? (
                          selectedApplicant.candidateExps.map((ex, idx) => (
                            <div key={idx} className="bg-light/60 p-2.5 rounded-xl border border-borderColor/60 text-xs">
                              <p className="font-bold text-primary">{ex.title}</p>
                              <p className="text-secondary text-[10px]">{ex.school} • {ex.duration}</p>
                            </div>
                          ))
                        ) : (
                          <span className="text-xs text-secondary italic">No experience added</span>
                        )}
                      </div>
                    </div>

                    {/* Certificates */}
                    <div>
                      <h4 className="text-xs font-bold text-secondary uppercase mb-2">Degrees / Certs</h4>
                      <div className="space-y-1.5">
                        {selectedApplicant.candidateCerts?.length > 0 ? (
                          selectedApplicant.candidateCerts.map((crt, idx) => (
                            <p key={idx} className="text-xs font-semibold text-primary flex items-center gap-1.5">
                              <span className="w-1 h-1 bg-[#137333] rounded-full"></span>
                              {crt}
                            </p>
                          ))
                        ) : (
                          <span className="text-xs text-secondary italic">No certifications listed</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        ) : (
          // ================= TEACHER (CANDIDATE) DASHBOARD =================
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT & CENTER PANEL (Spans 2 columns on desktop) */}
            <div className="lg:col-span-2 space-y-8">
              {/* 1. APPLICATION STATUS PIPELINE & TRACKER */}
              <div className="bg-white rounded-3xl border border-borderColor shadow-sm overflow-hidden transition-all duration-300">
                <div 
                  onClick={() => setIsApplicationsExpanded(!isApplicationsExpanded)}
                  className={`flex p-6 sm:p-8 flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/80 active:bg-slate-100/50 transition-all duration-200 select-none ${isApplicationsExpanded ? "border-b border-borderColor bg-light/30" : "bg-light/10"}`}
                >
                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-primary font-heading flex items-center gap-2.5">
                      <svg className="w-5 h-5 text-primary animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                      My Applications & Tracking Pipeline
                    </h2>
                    <p className="text-secondary text-xs mt-1 font-medium">
                      Track the real-time review status of your submitted school portfolios.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 self-start sm:self-center">
                    <div className="bg-primary/10 text-primary text-xs font-extrabold px-3.5 py-1.5 rounded-full shadow-sm hover:scale-105 transition-transform duration-200">
                      {teacherAppliedJobs.length} Active {teacherAppliedJobs.length === 1 ? "Application" : "Applications"}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-light flex items-center justify-center border border-borderColor hover:bg-white transition-colors duration-200 shrink-0">
                      <svg 
                        className={`w-4 h-4 text-primary transition-transform duration-300 ${isApplicationsExpanded ? "rotate-180" : ""}`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {isApplicationsExpanded && (
                  <div className="p-6 sm:p-8 transition-all duration-300">
                    <div className="space-y-6">
                      {teacherAppliedJobs.length === 0 ? (
                        <div className="py-12 text-center text-secondary text-sm flex flex-col items-center justify-center gap-3">
                          <svg className="w-12 h-12 text-secondary/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2 2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                          </svg>
                          <p className="italic font-semibold">No active job applications found.</p>
                          <p className="text-xs text-secondary/80 max-w-sm">
                            Explore the list of open teaching vacancies below and tap "Apply Now" to submit your dynamic resume!
                          </p>
                        </div>
                      ) : (
                        teacherAppliedJobs.map((app) => {
                          let statusColor = "bg-[#f0f5fc] text-primary";
                          let statusText = "Applied - Awaiting School Review";
                          let statusDesc = "The school recruiter has received your credentials and is currently reviewing your resume.";
                          let percent = "0%";

                          if (app.status === "Shortlisted") {
                            statusColor = "bg-[#fef7e0] text-[#b06000]";
                            statusText = "Shortlisted for Interview Round";
                            statusDesc = "Success! The school recruiter has shortlisted your profile. They will contact you shortly to lock in a time slot.";
                            percent = "33%";
                          } else if (app.status === "Interview Scheduled") {
                            statusColor = "bg-[#e6f4ea] text-[#137333] border border-[#137333]/20 animate-pulse";
                            statusText = "Interview Scheduled 🚀";
                            statusDesc = "Attention Required: Your live online interview has been scheduled! Check your registered email inbox for connection link.";
                            percent = "66%";
                          } else if (app.status === "Rejected") {
                            statusColor = "bg-[#fde8e8] text-[#e02424]";
                            statusText = "Application Closed";
                            statusDesc = "Thank you for taking the time to apply. The school has decided to move ahead with another teacher for this role.";
                            percent = "100%";
                          } else if (app.status.includes("Hired")) {
                            statusColor = "bg-[#e6f4ea] text-[#137333] font-black border border-green-300";
                            statusText = "Hired 🎉 (Offer Received)";
                            statusDesc = "Congratulations! You have been selected for the teaching position. The school's administration will contact you to onboard.";
                            percent = "100%";
                          }

                          return (
                            <div 
                              key={app.id} 
                              className="border border-[#e5eaf2] rounded-3xl p-6 bg-[#fafbfc] hover:bg-white hover:shadow-soft transition-all duration-300 border-l-4 border-l-primary animate-fadeIn"
                            >
                              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                <div>
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className={`text-[10px] font-extrabold uppercase px-3 py-1 rounded-full ${statusColor}`}>
                                      {app.status}
                                    </span>
                                    <span className="text-[11px] text-secondary font-medium">
                                      Applied on {app.appliedDate}
                                    </span>
                                  </div>
                                  
                                  <h3 className="font-extrabold text-base text-primary mt-3 font-heading tracking-tight">
                                    {app.jobTitle}
                                  </h3>
                                  <p className="text-xs text-secondary font-semibold mt-1 flex items-center gap-1.5">
                                    <svg className="w-3.5 h-3.5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    {app.schoolName} • <span className="text-secondary/70">{app.location}</span>
                                  </p>
                                </div>

                                <div className="sm:text-right shrink-0 flex sm:flex-col items-start sm:items-end justify-between sm:justify-start w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t border-[#edf2f9] sm:border-t-0">
                                  <div>
                                    <span className="text-sm font-bold text-primary block">{app.salary}</span>
                                    <span className="text-[11px] text-secondary block mt-1 font-semibold">Exp required: {app.experience}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Stepper Pipeline */}
                              <div className="mt-6 pt-5 border-t border-[#edf2f9]">
                                <p className="text-[10px] font-bold text-secondary uppercase mb-4 tracking-wider">Visual Recruitment Pipeline</p>
                                
                                <div className="relative flex items-center justify-between w-full max-w-xl mx-auto px-4 py-2">
                                  {/* Background grey bar */}
                                  <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-[#e2e8f0] rounded-full z-0"></div>
                                  {/* Active progress bar */}
                                  {app.status !== "Rejected" && (
                                    <div 
                                      className="absolute left-6 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full z-0 transition-all duration-500"
                                      style={{ width: `calc(${percent} - 12px)` }}
                                    ></div>
                                  )}

                                  {/* Dot 1: Applied */}
                                  <div className="relative z-10 flex flex-col items-center">
                                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs shadow-sm border-4 border-white">
                                      ✓
                                    </div>
                                    <span className="text-[10px] font-bold text-primary mt-1.5">Applied</span>
                                  </div>

                                  {/* Dot 2: Shortlisted */}
                                  <div className="relative z-10 flex flex-col items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border-4 border-white transition-all duration-300 shadow-sm ${
                                      (app.status === "Shortlisted" || app.status === "Interview Scheduled" || app.status.includes("Hired"))
                                        ? "bg-primary text-white" 
                                        : "bg-white text-secondary border-[#e2e8f0]"
                                    }`}>
                                      {(app.status === "Shortlisted" || app.status === "Interview Scheduled" || app.status.includes("Hired")) ? "✓" : "2"}
                                    </div>
                                    <span className={`text-[10px] font-bold mt-1.5 transition-colors ${
                                      (app.status === "Shortlisted" || app.status === "Interview Scheduled" || app.status.includes("Hired"))
                                        ? "text-primary" 
                                        : "text-secondary"
                                    }`}>Shortlisted</span>
                                  </div>

                                  {/* Dot 3: Interview */}
                                  <div className="relative z-10 flex flex-col items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border-4 border-white transition-all duration-300 shadow-sm ${
                                      (app.status === "Interview Scheduled" || app.status.includes("Hired"))
                                        ? "bg-primary text-white" 
                                        : "bg-white text-secondary border-[#e2e8f0]"
                                    }`}>
                                      {(app.status === "Interview Scheduled" || app.status.includes("Hired")) ? "✓" : "3"}
                                    </div>
                                    <span className={`text-[10px] font-bold mt-1.5 transition-colors ${
                                      (app.status === "Interview Scheduled" || app.status.includes("Hired"))
                                        ? "text-primary" 
                                        : "text-secondary"
                                    }`}>Interview</span>
                                  </div>

                                  {/* Dot 4: Decided */}
                                  {app.status === "Rejected" ? (
                                    <div className="relative z-10 flex flex-col items-center">
                                      <div className="w-8 h-8 rounded-full bg-[#cbd5e1] text-[#e02424] flex items-center justify-center font-bold text-xs border-4 border-white shadow-sm">
                                        ✗
                                      </div>
                                      <span className="text-[10px] font-bold text-[#e02424] mt-1.5">Closed</span>
                                    </div>
                                  ) : (
                                    <div className="relative z-10 flex flex-col items-center">
                                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border-4 border-white transition-all duration-300 shadow-sm ${
                                        app.status.includes("Hired")
                                          ? "bg-[#137333] text-white" 
                                          : "bg-white text-secondary border-[#e2e8f0]"
                                      }`}>
                                        {app.status.includes("Hired") ? "🎉" : "4"}
                                      </div>
                                      <span className={`text-[10px] font-bold mt-1.5 transition-colors ${
                                        app.status.includes("Hired")
                                          ? "text-[#137333]" 
                                          : "text-secondary"
                                      }`}>{app.status.includes("Hired") ? "Hired!" : "Hired"}</span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Help description text */}
                              <div className="mt-4 p-3 bg-light rounded-xl border border-borderColor/40 flex items-start gap-2.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-primary/40 mt-1 shrink-0 animate-ping"></div>
                                <div className="text-xs text-secondary font-medium leading-relaxed">
                                  <span className="font-bold text-primary">Recruiter Update: </span>
                                  {statusDesc}
                                </div>
                              </div>

                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* 2. PROFILE COMPLETION PANEL */}
              <div className="bg-white rounded-3xl border border-borderColor shadow-sm p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6">
                  <div>
                    <h2 className="text-lg font-bold text-primary font-heading flex items-center gap-2">
                      <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Profile Completion Status
                    </h2>
                    <p className="text-secondary text-xs mt-1">
                      Complete your teaching profile to get noticed by recruiters faster.
                    </p>
                  </div>
                  <div className="mt-2 sm:mt-0 bg-[#e6f4ea] text-[#137333] px-3.5 py-1.5 rounded-full font-bold text-sm self-start">
                    {calculateProgress()}% Complete
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-[#f1f3f4] h-3 rounded-full mb-8 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-primary to-[#4285f4] h-full rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${calculateProgress()}%` }}
                  ></div>
                </div>

                {/* Accordion Tabs */}
                <div className="space-y-4">
                  {/* Accordion Tab 1: Resume Upload */}
                  <div className="border border-borderColor rounded-2xl overflow-hidden transition-all duration-300">
                    <button 
                      onClick={() => setActiveAccordion(activeAccordion === "resume" ? null : "resume")}
                      className="w-full flex justify-between items-center px-5 py-4 bg-light hover:bg-[#f1f5f9] transition-all"
                    >
                      <span className="font-semibold text-sm flex items-center gap-3 text-primary">
                        <svg className={`w-5 h-5 ${resumeName ? "text-[#137333]" : "text-secondary"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        1. Resume Upload
                      </span>
                      <span className="text-xs flex items-center gap-2 font-medium">
                        {resumeName ? (
                          <span className="text-[#137333] font-bold flex items-center gap-1">
                            ✓ Uploaded
                          </span>
                        ) : (
                          <span className="text-[#c5221f]">Pending (+15%)</span>
                        )}
                        <svg className={`w-4 h-4 transform transition-transform ${activeAccordion === 'resume' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </button>

                    {activeAccordion === "resume" && (
                      <div className="p-5 border-t border-borderColor bg-white space-y-4">
                        {resumeName ? (
                          <div className="flex items-center justify-between bg-[#f0f5fc] px-4 py-3.5 rounded-xl border border-primary/10">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold text-xs uppercase">
                                PDF
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-primary max-w-xs truncate">{resumeName}</p>
                                <p className="text-xs text-secondary">Verified Portfolio CV • 245 KB</p>
                              </div>
                            </div>
                            <button 
                              onClick={handleRemoveResume}
                              className="text-[#e02424] hover:bg-[#fde8e8] p-2 rounded-xl text-xs font-bold transition-all"
                            >
                              Delete
                            </button>
                          </div>
                        ) : (
                          <div className="border-2 border-dashed border-[#dbe4f0] rounded-2xl p-6 text-center hover:bg-light transition-all cursor-pointer relative">
                            <input 
                              type="file" 
                              accept=".pdf,.doc,.docx"
                              onChange={handleResumeUpload}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <svg className="w-8 h-8 mx-auto text-secondary mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <p className="text-sm font-semibold text-primary">Click to upload your resume</p>
                            <p className="text-xs text-secondary mt-1">Supports PDF, DOC, DOCX up to 5MB</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Accordion Tab 2: Skills */}
                  <div className="border border-borderColor rounded-2xl overflow-hidden transition-all duration-300">
                    <button 
                      onClick={() => setActiveAccordion(activeAccordion === "skills" ? null : "skills")}
                      className="w-full flex justify-between items-center px-5 py-4 bg-light hover:bg-[#f1f5f9] transition-all"
                    >
                      <span className="font-semibold text-sm flex items-center gap-3 text-primary">
                        <svg className={`w-5 h-5 ${skills.length > 0 ? "text-[#137333]" : "text-secondary"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        2. Add Key Skills
                      </span>
                      <span className="text-xs flex items-center gap-2 font-medium">
                        {skills.length > 0 ? (
                          <span className="text-[#137333] font-bold">{skills.length} Added</span>
                        ) : (
                          <span className="text-[#c5221f]">Pending (+15%)</span>
                        )}
                        <svg className={`w-4 h-4 transform transition-transform ${activeAccordion === 'skills' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </button>

                    {activeAccordion === "skills" && (
                      <div className="p-5 border-t border-borderColor bg-white space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {skills.length === 0 ? (
                            <p className="text-xs text-secondary italic">No skills added yet.</p>
                          ) : (
                            skills.map((skill, index) => (
                              <span 
                                key={index} 
                                className="bg-[#f0f5fc] text-primary border border-primary/10 text-xs px-3 py-1.5 rounded-full flex items-center gap-2 font-semibold"
                              >
                                {skill}
                                <button 
                                  onClick={() => handleDeleteSkill(skill)}
                                  className="text-secondary hover:text-[#e02424] font-bold text-xs"
                                >
                                  ×
                                </button>
                              </span>
                            ))
                          )}
                        </div>

                        <form onSubmit={handleAddSkill} className="flex gap-2">
                          <input
                            type="text"
                            value={skillInput}
                            onChange={(e) => setSkillInput(e.target.value)}
                            placeholder="e.g. Mathematics, Pedagogy, Online Teaching"
                            className="flex-1 border border-borderColor rounded-xl px-4 py-2 text-sm outline-none placeholder-secondary text-primary focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all bg-white"
                          />
                          <button 
                            type="submit"
                            className="bg-primary text-white hover:opacity-90 px-4 py-2 rounded-xl text-sm font-bold transition-all"
                          >
                            + Add
                          </button>
                        </form>
                      </div>
                    )}
                  </div>

                  {/* Accordion Tab 3: Experience */}
                  <div className="border border-borderColor rounded-2xl overflow-hidden transition-all duration-300">
                    <button 
                      onClick={() => setActiveAccordion(activeAccordion === "exp" ? null : "exp")}
                      className="w-full flex justify-between items-center px-5 py-4 bg-light hover:bg-[#f1f5f9] transition-all"
                    >
                      <span className="font-semibold text-sm flex items-center gap-3 text-primary">
                        <svg className={`w-5 h-5 ${experiences.length > 0 ? "text-[#137333]" : "text-secondary"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        3. Add Experience
                      </span>
                      <span className="text-xs flex items-center gap-2 font-medium">
                        {experiences.length > 0 ? (
                          <span className="text-[#137333] font-bold">{experiences.length} Added</span>
                        ) : (
                          <span className="text-[#c5221f]">Pending (+15%)</span>
                        )}
                        <svg className={`w-4 h-4 transform transition-transform ${activeAccordion === 'exp' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </button>

                    {activeAccordion === "exp" && (
                      <div className="p-5 border-t border-borderColor bg-white space-y-4">
                        <div className="space-y-3">
                          {experiences.length === 0 ? (
                            <p className="text-xs text-secondary italic">No experience entries added yet.</p>
                          ) : (
                            experiences.map((exp, idx) => (
                              <div key={idx} className="flex justify-between items-start bg-light p-3.5 rounded-xl border border-borderColor">
                                <div>
                                  <p className="text-sm font-semibold text-primary">{exp.title}</p>
                                  <p className="text-xs text-secondary">{exp.school} • {exp.duration}</p>
                                </div>
                                <button 
                                  onClick={() => handleDeleteExp(idx)}
                                  className="text-[#e02424] hover:bg-[#fde8e8] p-1.5 rounded-lg text-xs font-bold transition-all"
                                >
                                  Delete
                                </button>
                              </div>
                            ))
                          )}
                        </div>

                        <div className="border border-borderColor rounded-xl p-4 bg-light space-y-3">
                          <p className="text-xs font-bold text-primary">Add New Entry</p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <input
                              type="text"
                              placeholder="Job Title"
                              value={expForm.title}
                              onChange={(e) => setExpForm({...expForm, title: e.target.value})}
                              className="border border-borderColor rounded-lg px-3 py-2 text-xs outline-none bg-white text-primary focus:border-primary/50 transition-all"
                            />
                            <input
                              type="text"
                              placeholder="School"
                              value={expForm.school}
                              onChange={(e) => setExpForm({...expForm, school: e.target.value})}
                              className="border border-borderColor rounded-lg px-3 py-2 text-xs outline-none bg-white text-primary focus:border-primary/50 transition-all"
                            />
                            <input
                              type="text"
                              placeholder="Duration"
                              value={expForm.duration}
                              onChange={(e) => setExpForm({...expForm, duration: e.target.value})}
                              className="border border-borderColor rounded-lg px-3 py-2 text-xs outline-none bg-white text-primary focus:border-primary/50 transition-all"
                            />
                          </div>
                          <button 
                            onClick={handleAddExp}
                            className="bg-primary text-white w-full py-2 rounded-lg text-xs font-bold transition-all mt-2"
                          >
                            + Add Experience Entry
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Accordion Tab 4: Certificates */}
                  <div className="border border-borderColor rounded-2xl overflow-hidden transition-all duration-300">
                    <button 
                      onClick={() => setActiveAccordion(activeAccordion === "certs" ? null : "certs")}
                      className="w-full flex justify-between items-center px-5 py-4 bg-light hover:bg-[#f1f5f9] transition-all"
                    >
                      <span className="font-semibold text-sm flex items-center gap-3 text-primary">
                        <svg className={`w-5 h-5 ${certificates.length > 0 ? "text-[#137333]" : "text-secondary"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                        4. Add Certificates / Degrees
                      </span>
                      <span className="text-xs flex items-center gap-2 font-medium">
                        {certificates.length > 0 ? (
                          <span className="text-[#137333] font-bold">{certificates.length} Added</span>
                        ) : (
                          <span className="text-[#c5221f]">Pending (+15%)</span>
                        )}
                        <svg className={`w-4 h-4 transform transition-transform ${activeAccordion === 'certs' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </button>

                    {activeAccordion === "certs" && (
                      <div className="p-5 border-t border-borderColor bg-white space-y-4">
                        <div className="space-y-3">
                          {certificates.length === 0 ? (
                            <p className="text-xs text-secondary italic">No certificates added yet.</p>
                          ) : (
                            certificates.map((cert, index) => (
                              <div key={index} className="flex justify-between items-center bg-[#fefdfa] p-3 rounded-xl border border-[#f59e0b]/10">
                                <span className="text-xs font-semibold text-primary flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 bg-[#f59e0b] rounded-full shrink-0"></span>
                                  {cert}
                                </span>
                                <button 
                                  onClick={() => handleDeleteCert(cert)}
                                  className="text-[#e02424] hover:bg-[#fde8e8] p-1.5 rounded-lg text-xs font-bold transition-all"
                                >
                                  Delete
                                </button>
                              </div>
                            ))
                          )}
                        </div>

                        <form onSubmit={handleAddCert} className="flex gap-2">
                          <input
                            type="text"
                            value={certInput}
                            onChange={(e) => setCertInput(e.target.value)}
                            placeholder="e.g. CTET Certificate, M.Sc Mathematics Degree"
                            className="flex-1 border border-borderColor rounded-xl px-4 py-2 text-sm outline-none placeholder-secondary text-primary focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all bg-white"
                          />
                          <button 
                            type="submit"
                            className="bg-primary text-white hover:opacity-90 px-4 py-2 rounded-xl text-sm font-bold transition-all"
                          >
                            + Add
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 3. RECOMMENDED JOBS */}
              <div className="bg-white rounded-3xl border border-borderColor shadow-sm p-6 sm:p-8">
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-primary font-heading flex items-center gap-2">
                    <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Recommended Teaching Jobs
                  </h2>
                  <p className="text-secondary text-xs mt-1">
                    Matching your teaching profile details.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {allJobs.map((job) => {
                    const isApplied = teacherAppliedJobs.some((app) => app.jobId === job.id);
                    return (
                      <div 
                        key={job.id} 
                        className="border border-[#e5eaf2] hover:border-primary/40 rounded-2xl p-5 hover:shadow-soft bg-white transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h3 className="font-bold text-[15px] text-primary leading-snug font-heading">
                              {job.title}
                            </h3>
                          </div>

                          <p className="text-xs text-primary font-bold mt-1 text-primary/80">
                            {job.schoolName}
                          </p>

                          <div className="mt-4 space-y-2 text-xs text-secondary">
                            <div className="flex items-center gap-2">
                              <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span>{job.location}</span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="font-semibold text-primary/95">{job.salary}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              <span>Experience: {job.experience}</span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleApplyJob(job)}
                          disabled={isApplied}
                          className={`w-full mt-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5 ${
                            isApplied 
                              ? "bg-[#e6f4ea] text-[#137333] cursor-not-allowed" 
                              : "bg-primary text-white hover:opacity-90 active:scale-95"
                          }`}
                        >
                          {isApplied ? (
                            <>
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                              Applied
                            </>
                          ) : (
                            "Apply Now →"
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Note: Applied Jobs section was moved to the top of the Left Panel for higher visibility and premium visual tracking */}

            </div>

            {/* RIGHT SIDE PANEL (Timeline & Resume portfolio) */}
            <div className="space-y-8">
              
              {/* RESUME UPLOAD CARD */}
              <div className="bg-white rounded-3xl border border-borderColor shadow-sm p-6 sm:p-8">
                <h2 className="text-base font-bold text-primary font-heading mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  My Resume CV Portfolio
                </h2>

                {resumeName ? (
                  <div className="space-y-4">
                    <div className="border border-primary/10 bg-[#f0f5fc] rounded-2xl p-4 flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/20 text-primary rounded-xl flex items-center justify-center font-bold text-xs uppercase shrink-0">
                        PDF
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-sm font-semibold text-primary truncate">{resumeName}</p>
                        <p className="text-[11px] text-secondary">Active Recruiter CV</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <label className="flex-1 bg-light border border-borderColor hover:bg-[#f1f5f9] text-primary text-center py-2 rounded-xl text-xs font-bold transition-all cursor-pointer block">
                        Change
                        <input 
                          type="file" 
                          accept=".pdf,.doc,.docx"
                          onChange={handleResumeUpload}
                          className="hidden" 
                        />
                      </label>
                      <button 
                        onClick={handleRemoveResume}
                        className="bg-[#fde8e8] text-[#e02424] hover:bg-[#fbd5d5] px-4 py-2 rounded-xl text-xs font-bold transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-[#dbe4f0] hover:bg-light transition-all rounded-2xl p-6 text-center relative cursor-pointer">
                    <input 
                      type="file" 
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <svg className="w-7 h-7 mx-auto text-secondary mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <p className="text-xs font-semibold text-primary">Upload Resume PDF</p>
                    <p className="text-[10px] text-secondary mt-1">PDF, DOC, DOCX up to 5MB</p>
                  </div>
                )}
              </div>

              {/* TIMELINE */}
              <div className="bg-white rounded-3xl border border-borderColor shadow-sm p-6 sm:p-8">
                <h2 className="text-base font-bold text-primary font-heading mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Activity Logs
                </h2>

                <div className="relative border-l border-[#e5eaf2] pl-5 ml-2.5 space-y-6">
                  {getCandidateActivities().map((act) => (
                    <div key={act.id} className="relative">
                      <span className="absolute -left-[26px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white ring-4 ring-[#f5f8fc] bg-[#4285f4]"></span>
                      <div>
                        <p className="text-xs font-semibold text-primary leading-tight">
                          {act.message}
                        </p>
                        <span className="text-[10px] text-secondary block mt-1 font-medium">
                          {act.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Profile info */}
              <div className="bg-white rounded-3xl border border-borderColor shadow-sm p-6 sm:p-8">
                <h2 className="text-base font-bold text-primary font-heading mb-4">Quick Profile Info</h2>
                <div className="space-y-3.5 text-xs">
                  <div className="flex justify-between items-center border-b border-borderColor pb-2">
                    <span className="text-secondary font-semibold">Registered Email</span>
                    <span className="text-primary font-bold truncate max-w-[160px]">{user.email}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-borderColor pb-2">
                    <span className="text-secondary font-semibold">Contact Phone</span>
                    <span className="text-primary font-bold">{user.phone || "+91 9876543210"}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-borderColor pb-2">
                    <span className="text-secondary font-semibold">Dashboard Access</span>
                    <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase">
                      Teacher
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

      </main>
    </div>
  );
}

export default Dashboard;
