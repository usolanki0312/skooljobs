import { useEffect, useMemo, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness,
  Clock3,
  FileText,
  LayoutDashboard,
  LogOut,
  Sparkles,
  UserRound,
  Calendar,
  ClipboardList,
  Settings,
  Bookmark,
} from "lucide-react";
import { jobsData, resumesData } from "../lib/teacherdata";

const resumes = resumesData;

const navItems = [
  { label: "My Profile", icon: UserRound, path: "/teacher/profile" },
  { label: "Dashboard", icon: LayoutDashboard, path: "/teacher/dashboard" },
  { label: "All Jobs", icon: BriefcaseBusiness, path: "/teacher/all-jobs" },
  { label: "Saved Jobs", icon: Bookmark, path: "/teacher/saved-jobs" },
  { label: "My Applications", icon: ClipboardList, path: "/teacher/applications" },
  { label: "Interviews", icon: Calendar, path: "/teacher/interviews" },
  { label: "Recommendation", icon: Sparkles, path: "/teacher/recommendation" },
  { label: "Resume", icon: FileText, path: "/teacher/resume" },
  { label: "Recent Activity", icon: Clock3, path: "/teacher/activity" },
];

const TeacherLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [profileImage, setProfileImage] = useState("https://i.pravatar.cc/300?img=12");
  const [appliedJobs, setAppliedJobs] = useState(() => {
    const saved = localStorage.getItem("skooljobs_applied_jobs");
    return saved ? JSON.parse(saved) : [];
  });
  const [savedJobs, setSavedJobs] = useState(() => {
    const saved = localStorage.getItem("skooljobs_saved_jobs");
    return saved ? JSON.parse(saved) : [];
  });
  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem("skooljobs_teacher_activities");
    return saved ? JSON.parse(saved) : [
      {
        message: "Profile viewed by Green Valley School",
        date: new Date(Date.now() - 3600000).toISOString(),
        type: "view",
      },
    ];
  });

  const allJobs = useMemo(() => {
    const savedRecruiterJobsStr = localStorage.getItem("skooljobs_jobs");
    const recruiterJobs = savedRecruiterJobsStr ? JSON.parse(savedRecruiterJobsStr) : [];
    const normalizedRecruiter = recruiterJobs.map((j) => ({
      id: j.id,
      role: j.title || "Teaching Position",
      school: j.companyName || "Green Valley School",
      location: j.location || "Bhopal, MP",
      type: j.employmentType || "Full Time",
      salary: j.salaryRange || "Competitive",
      skill: j.subject || "Teaching",
      match: "98",
      description: j.description,
      requirements: j.requirements,
      qualifications: j.qualifications,
      expiryDate: j.expiryDate,
      vacancies: j.vacancies,
      roleType: j.roleType,
    }));
    return [...normalizedRecruiter, ...jobsData];
  }, []);

  const [resumes, setResumes] = useState(() => {
    const saved = localStorage.getItem("skooljobs_resumes");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return resumesData;
      }
    }
    // Set default in localStorage
    localStorage.setItem("skooljobs_resumes", JSON.stringify(resumesData));
    return resumesData;
  });

  const [selectedResume, setSelectedResume] = useState(() => resumes[0] || null);

  const [currentUser, setCurrentUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("currentUser") || "{}"); } catch { return {}; }
  });

  // Persist candidate states
  useEffect(() => {
    localStorage.setItem("skooljobs_applied_jobs", JSON.stringify(appliedJobs));
  }, [appliedJobs]);

  useEffect(() => {
    localStorage.setItem("skooljobs_saved_jobs", JSON.stringify(savedJobs));
  }, [savedJobs]);

  useEffect(() => {
    localStorage.setItem("skooljobs_teacher_activities", JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    if (currentUser.profilePhoto) setProfileImage(currentUser.profilePhoto);
  }, [currentUser.profilePhoto]);

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
        setCurrentUser(user);
        if (user.profilePhoto) setProfileImage(user.profilePhoto);
      } catch {}

      const saved = localStorage.getItem("skooljobs_resumes");
      if (saved) {
        try {
          const list = JSON.parse(saved);
          setResumes(list);
          setSelectedResume((prev) => {
            if (!prev) return list[0] || null;
            const exists = list.find((r) => String(r.id) === String(prev.id));
            return exists || list[0] || null;
          });
        } catch {}
      }
    };
    window.addEventListener("storage", handleStorageChange);
    handleStorageChange();
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [location.pathname]);

  if (!localStorage.getItem("currentUser")) {
    return <Navigate to="/" replace />;
  }

  const displayName = currentUser.name || currentUser.firstName || "Gopal";

  const recommendedJobs = useMemo(() => {
    if (!selectedResume) return allJobs;
    const skillFocus = selectedResume.skill || selectedResume.skills?.split(",")[0]?.trim() || "Teaching";
    return allJobs.filter((job) => job.skill.toLowerCase() === skillFocus.toLowerCase());
  }, [selectedResume, allJobs]);

  const addActivity = (message, type = "action") => {
    setActivities((prev) => [{ message, date: new Date().toISOString(), type }, ...prev]);
  };

  const handleApply = (job) => {
    if (!appliedJobs.some((item) => item.id === job.id)) {
      setAppliedJobs((prev) => [...prev, { ...job, appliedDate: new Date().toISOString() }]);
      addActivity(`Applied for ${job.role} at ${job.school}`, "apply");

      // Sync application to recruiter applicants list in localStorage
      try {
        const savedApplicantsStr = localStorage.getItem("skooljobs_applicants");
        const currentApplicants = savedApplicantsStr ? JSON.parse(savedApplicantsStr) : [];
        
        const teacherProfile = JSON.parse(localStorage.getItem("skooljobs_teacher_data") || "{}");
        const teacherQualifications = JSON.parse(localStorage.getItem("skooljobs_teacher_qualifications") || "[]");
        const highestQual = teacherQualifications[0]?.degree || teacherProfile.highestQualificationOne || "B.Ed";

        const newApplicant = {
          id: Date.now(),
          name: `${teacherProfile.firstName || currentUser.firstName || "Rahul"} ${teacherProfile.lastName || currentUser.lastName || "Sharma"}`.trim(),
          subject: job.skill || "Mathematics",
          experience: teacherProfile.age ? `${Math.max(1, parseInt(teacherProfile.age) - 22)} yrs` : "3 yrs",
          status: "Applied",
          avatar: teacherProfile.profilePhoto || profileImage || "https://i.pravatar.cc/100?img=12",
          jobTitle: job.role,
          qualification: highestQual,
          saved: false,
          candidateId: currentUser.id || 1,
        };

        localStorage.setItem("skooljobs_applicants", JSON.stringify([newApplicant, ...currentApplicants]));
      } catch (err) {
        console.error("Error syncing application:", err);
      }
    }
  };

  const handleSave = (job) => {
    if (savedJobs.some((item) => item.id === job.id)) {
      setSavedJobs((prev) => prev.filter((item) => item.id !== job.id));
      addActivity(`Removed bookmark for ${job.role} at ${job.school}`, "unsave");
    } else {
      setSavedJobs((prev) => [...prev, job]);
      addActivity(`Saved ${job.role} at ${job.school}`, "save");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userName");
    navigate("/");
  };

  const outletCtx = {
    profileImage,
    setProfileImage,
    appliedJobs,
    setAppliedJobs,
    savedJobs,
    setSavedJobs,
    activities,
    setActivities,
    addActivity,
    resumes,
    setResumes,
    selectedResume,
    setSelectedResume,
    recommendedJobs,
    allJobs,
    handleApply,
    handleSave,
    currentUser,
    displayName,
    handleLogout,
  };

  return (
    <div className="min-h-screen bg-light">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 bg-primary p-5 text-white lg:block">
          <div className="rounded-3xl bg-white/10 p-5">
            <div className="flex items-center gap-4">
              <img
                src={profileImage}
                alt="profile"
                className="h-14 w-14 rounded-2xl border-2 border-white/40 object-cover"
              />
              <div>
                <h1 className="font-bold">{displayName}</h1>
                <p className="text-xs text-white/70">Teacher Account</p>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-3xl bg-white/10 p-5">
            <div className="mb-3 flex items-center justify-between text-sm font-bold text-white">
              <span>Profile Score</span>
              <div className="flex items-center gap-2">
                <span>86%</span>
                <button
                  type="button"
                  onClick={() => navigate("/teacher/profile")}
                  className="flex items-center gap-1 rounded-lg bg-white/20 px-2 py-1 text-xs font-bold text-white hover:bg-white/30"
                >
                  <UserRound size={11} /> Complete
                </button>
              </div>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/20">
              <div className="h-full rounded-full bg-white" style={{ width: "86%" }} />
            </div>
          </div>

          <nav className="mt-8 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => navigate(item.path)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${
                    isActive ? "bg-white text-primary" : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon size={18} /> {item.label}
                </button>
              );
            })}
          </nav>

          <div className="mt-10 space-y-2">
            <button
              onClick={() => navigate("/teacher/settings")}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${
                location.pathname === "/teacher/settings" ? "bg-white text-primary" : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
              type="button"
            >
              <Settings size={18} /> Settings
            </button>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-2xl bg-red-500 px-4 py-3 text-left text-sm font-bold text-white hover:bg-red-600 transition"
              type="button"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </aside>

        <main className="flex-1 p-5 lg:p-8">
          <div className="mt-4 flex gap-2 overflow-x-auto rounded-3xl bg-white p-3 shadow-soft lg:hidden">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => navigate(item.path)}
                  className={`flex shrink-0 items-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold transition ${
                    isActive ? "bg-primary text-white" : "bg-light text-primary"
                  }`}
                >
                  <Icon size={17} />
                  {item.label}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => navigate("/teacher/settings")}
              className={`flex shrink-0 items-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold transition ${
                location.pathname === "/teacher/settings" ? "bg-primary text-white" : "bg-light text-primary"
              }`}
            >
              <Settings size={17} />
              Settings
            </button>
          </div>
          <div className="mt-6">
            <Outlet context={outletCtx} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default TeacherLayout;
