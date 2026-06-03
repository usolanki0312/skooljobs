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
} from "lucide-react";
import Topbar from "../components/topbar";
import { jobsData, resumesData } from "../lib/teacherdata";

const resumes = resumesData;

const navItems = [
  { label: "My Profile", icon: UserRound, path: "/teacher/profile" },
  { label: "Dashboard", icon: LayoutDashboard, path: "/teacher/dashboard" },
  { label: "All Jobs", icon: BriefcaseBusiness, path: "/teacher/all-jobs" },
  { label: "Recommendation", icon: Sparkles, path: "/teacher/recommendation" },
  { label: "Resume", icon: FileText, path: "/teacher/resume" },
  { label: "Recent Activity", icon: Clock3, path: "/teacher/activity" },
];

const TeacherLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [profileImage, setProfileImage] = useState("https://i.pravatar.cc/300?img=12");
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [activities, setActivities] = useState([
    {
      message: "Profile viewed by Green Valley School",
      date: new Date(Date.now() - 3600000).toISOString(),
      type: "view",
    },
  ]);
  const [selectedResume, setSelectedResume] = useState(resumes[0]);

  const currentUser = useMemo(() => {
    try { return JSON.parse(localStorage.getItem("currentUser") || "{}"); } catch { return {}; }
  }, []);

  useEffect(() => {
    if (currentUser.profilePhoto) setProfileImage(currentUser.profilePhoto);
  }, [currentUser.profilePhoto]);

  if (!localStorage.getItem("currentUser")) {
    return <Navigate to="/" replace />;
  }

  const displayName = currentUser.name || currentUser.firstName || "Gopal";
  const recommendedJobs = jobsData.filter((job) => job.skill === selectedResume.skill);

  const addActivity = (message, type = "action") => {
    setActivities((prev) => [{ message, date: new Date().toISOString(), type }, ...prev]);
  };

  const handleApply = (job) => {
    if (!appliedJobs.some((item) => item.id === job.id)) {
      setAppliedJobs((prev) => [...prev, { ...job, appliedDate: new Date().toISOString() }]);
      addActivity(`Applied for ${job.role} at ${job.school}`, "apply");
    }
  };

  const handleSave = (job) => {
    if (!savedJobs.some((item) => item.id === job.id)) {
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
    selectedResume,
    setSelectedResume,
    recommendedJobs,
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
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-2xl bg-red-500 px-4 py-3 text-left text-sm font-bold text-white"
              type="button"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </aside>

        <main className="flex-1 p-5 lg:p-8">
          <Topbar />
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
