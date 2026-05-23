import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Award,
  Bookmark,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  MapPin,
  MessageCircle,
  Send,
  Sparkles,
  Star,
  UserRound,
} from "lucide-react";
import Topbar from "../components/topbar";

const jobsData = [
  {
    id: 1,
    school: "Green Valley School",
    role: "Mathematics Teacher",
    location: "Indore",
    skill: "Mathematics",
    salary: "4.8 LPA",
    type: "Full time",
    match: 96,
  },
  {
    id: 2,
    school: "Delhi Public Academy",
    role: "Science Faculty",
    location: "Bhopal",
    skill: "Science",
    salary: "5.2 LPA",
    type: "Full time",
    match: 91,
  },
  {
    id: 3,
    school: "St. Mary's International",
    role: "English Teacher",
    location: "Pune",
    skill: "English",
    salary: "4.4 LPA",
    type: "Hybrid",
    match: 86,
  },
  {
    id: 4,
    school: "Bright Future School",
    role: "Computer Teacher",
    location: "Bangalore",
    skill: "Computer",
    salary: "6.0 LPA",
    type: "Full time",
    match: 89,
  },
];

const resumes = [
  { id: 1, name: "Mathematics Teacher Resume.pdf", skill: "Mathematics", score: 88 },
  { id: 2, name: "Science Faculty Resume.pdf", skill: "Science", score: 81 },
  { id: 3, name: "English Teacher Resume.pdf", skill: "English", score: 76 },
  { id: 4, name: "Computer Teacher Resume.pdf", skill: "Computer", score: 84 },
];

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "alljobs", label: "All Jobs", icon: BriefcaseBusiness },
  { id: "recommendation", label: "Recommendation", icon: Sparkles },
  { id: "resume", label: "Resume", icon: FileText },
  { id: "activity", label: "Recent Activity", icon: Clock3 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState("https://i.pravatar.cc/300?img=12");
  const [selectedResume, setSelectedResume] = useState(resumes[0]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [activities, setActivities] = useState(["Profile viewed by Green Valley School"]);
  const [activeSection, setActiveSection] = useState("dashboard");

  const currentUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("currentUser") || "{}");
    } catch {
      return {};
    }
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (!user) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (currentUser.profilePhoto) {
      setProfileImage(currentUser.profilePhoto);
    }
  }, [currentUser.profilePhoto]);

  const displayName = currentUser.name || currentUser.firstName || "Gopal";
  const recommendedJobs = jobsData.filter((job) => job.skill === selectedResume.skill);

  const addActivity = (message) => {
    setActivities((prev) => [message, ...prev]);
  };

  const handleApply = (job) => {
    if (!appliedJobs.some((item) => item.id === job.id)) {
      setAppliedJobs((prev) => [...prev, job]);
      addActivity(`Applied for ${job.role} at ${job.school}`);
    }
  };

  const handleSave = (job) => {
    if (!savedJobs.some((item) => item.id === job.id)) {
      setSavedJobs((prev) => [...prev, job]);
      addActivity(`Saved ${job.role} at ${job.school}`);
    }
  };

  const handleProfileImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      addActivity("Updated profile photo");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userName");
    navigate("/");
  };

  const JobCard = ({ job, compact = false }) => {
    const isApplied = appliedJobs.some((item) => item.id === job.id);
    const isSaved = savedJobs.some((item) => item.id === job.id);

    return (
      <div className="rounded-3xl border border-borderColor bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <GraduationCap size={25} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-primary">{job.role}</h3>
              <p className="text-sm font-semibold text-slate-500">{job.school}</p>
            </div>
          </div>
          <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-600">
            {job.match}% Match
          </span>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 text-sm text-slate-500 sm:grid-cols-2">
          <span className="flex items-center gap-2">
            <MapPin size={16} /> {job.location}
          </span>
          <span className="flex items-center gap-2">
            <BriefcaseBusiness size={16} /> {job.type}
          </span>
          {!compact && (
            <>
              <span className="flex items-center gap-2">
                <Award size={16} /> {job.skill}
              </span>
              <span className="font-bold text-primary">{job.salary}</span>
            </>
          )}
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            onClick={() => handleApply(job)}
            disabled={isApplied}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-white ${
              isApplied ? "bg-green-500" : "bg-primary hover:bg-primary/95"
            }`}
            type="button"
          >
            <Send size={16} /> {isApplied ? "Applied" : "Apply"}
          </button>
          <button
            onClick={() => handleSave(job)}
            disabled={isSaved}
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-bold ${
              isSaved
                ? "border-green-500 bg-green-500 text-white"
                : "border-primary text-primary hover:bg-primary/5"
            }`}
            type="button"
          >
            <Bookmark size={16} /> {isSaved ? "Saved" : "Save"}
          </button>
        </div>
      </div>
    );
  };

  const renderDashboard = () => (
    <>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Applied Jobs", value: appliedJobs.length, icon: CheckCircle2, id: "applied" },
          { label: "Saved Jobs", value: savedJobs.length, icon: Bookmark, id: "saved" },
          { label: "Interviews", value: "03", icon: MessageCircle, id: "dashboard" },
          { label: "Profile Score", value: "86%", icon: Star, id: "dashboard" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <button
              key={stat.label}
              onClick={() => setActiveSection(stat.id)}
              className="rounded-3xl bg-white p-5 text-left shadow-soft transition hover:-translate-y-0.5"
              type="button"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-500">{stat.label}</span>
                <span className="rounded-2xl bg-primary/10 p-3 text-primary">
                  <Icon size={20} />
                </span>
              </div>
              <p className="mt-5 text-4xl font-bold text-primary">{stat.value}</p>
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1fr_330px]">
        <section className="rounded-3xl bg-white p-6 shadow-soft">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-primary">Recommended Jobs</h2>
              <p className="mt-1 text-sm text-slate-500">Based on {selectedResume.name}</p>
            </div>
            <button onClick={() => setActiveSection("recommendation")} className="text-sm font-bold text-primary" type="button">
              View all
            </button>
          </div>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {recommendedJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-soft">
            <div className="flex items-center gap-4 border-b border-borderColor pb-5">
              <img src={profileImage} alt="profile" className="h-16 w-16 rounded-2xl object-cover" />
              <div>
                <h3 className="font-bold text-primary">{displayName}</h3>
                <p className="text-sm text-green-500">Available for jobs</p>
              </div>
            </div>
            <label className="mt-5 inline-flex cursor-pointer rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white">
              Upload Photo
              <input type="file" hidden onChange={handleProfileImage} />
            </label>
            <button
              onClick={() => navigate("/teacher-profile")}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-primary px-4 py-3 text-sm font-bold text-primary hover:bg-primary/5"
              type="button"
            >
              <UserRound size={17} /> Complete Profile
            </button>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-soft">
            <h3 className="text-lg font-bold text-primary">Recent Activity</h3>
            <div className="mt-5 space-y-4">
              {activities.slice(0, 4).map((activity, index) => (
                <div key={`${activity}-${index}`} className="flex gap-3 text-sm text-slate-600">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  <span>{activity}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );

  const renderJobsList = (title, jobs, emptyText) => (
    <section className="rounded-3xl bg-white p-6 shadow-soft">
      <h2 className="text-2xl font-bold text-primary">{title}</h2>
      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {jobs.length === 0 ? (
          <p className="rounded-2xl bg-light p-5 text-sm text-slate-500">{emptyText}</p>
        ) : (
          jobs.map((job) => <JobCard key={job.id} job={job} compact />)
        )}
      </div>
    </section>
  );

  const renderResume = () => (
    <section className="rounded-3xl bg-white p-6 shadow-soft">
      <h2 className="text-2xl font-bold text-primary">Resume Match Center</h2>
      <p className="mt-1 text-sm text-slate-500">Select a resume to update recommendations.</p>
      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {resumes.map((resume) => {
          const isSelected = selectedResume.id === resume.id;
          return (
            <button
              key={resume.id}
              onClick={() => {
                setSelectedResume(resume);
                addActivity(`Selected ${resume.name}`);
              }}
              className={`rounded-3xl border p-5 text-left transition ${
                isSelected
                  ? "border-primary bg-primary text-white shadow-soft"
                  : "border-borderColor bg-white text-slate-700 hover:border-primary"
              }`}
              type="button"
            >
              <div className="flex items-start justify-between gap-4">
                <FileText size={26} />
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${isSelected ? "bg-white/20" : "bg-primary/10 text-primary"}`}>
                  {resume.score}% Score
                </span>
              </div>
              <h3 className="mt-4 font-bold">{resume.name}</h3>
              <p className={`mt-2 text-sm ${isSelected ? "text-white/80" : "text-slate-500"}`}>Skill focus: {resume.skill}</p>
            </button>
          );
        })}
      </div>
    </section>
  );

  const renderContent = () => {
    if (activeSection === "applied") {
      return renderJobsList("Applied Jobs", appliedJobs, "No applied jobs yet.");
    }
    if (activeSection === "saved") {
      return renderJobsList("Saved Jobs", savedJobs, "No saved jobs yet.");
    }
    if (activeSection === "alljobs") {
      return renderJobsList("All Teaching Jobs", jobsData, "No jobs available.");
    }
    if (activeSection === "recommendation") {
      return renderJobsList(
        "Resume Based Recommendation",
        recommendedJobs,
        "No recommendations for this resume yet."
      );
    }
    if (activeSection === "resume") {
      return renderResume();
    }
    if (activeSection === "activity") {
      return (
        <section className="rounded-3xl bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-bold text-primary">Recent Activity</h2>
          <div className="mt-6 space-y-4">
            {activities.map((activity, index) => (
              <div key={`${activity}-${index}`} className="rounded-2xl border border-borderColor p-4 text-sm text-slate-600">
                {activity}
              </div>
            ))}
          </div>
        </section>
      );
    }
    return renderDashboard();
  };

  return (
    <div className="min-h-screen bg-light">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 bg-primary p-5 text-white lg:block">
          <div className="rounded-3xl bg-white/10 p-5">
            <div className="flex items-center gap-4">
              <img src={profileImage} alt="profile" className="h-14 w-14 rounded-2xl border-2 border-white/40 object-cover" />
              <div>
                <h1 className="font-bold">{displayName}</h1>
                <p className="text-xs text-white/70">Teacher Account</p>
              </div>
            </div>
          </div>

          <nav className="mt-8 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              const navButton = (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${
                    isActive ? "bg-white text-primary" : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                  type="button"
                >
                  <Icon size={18} /> {item.label}
                </button>
              );

              if (item.id !== "dashboard") {
                return navButton;
              }

              return (
                <div key={item.id} className="space-y-2">
                  {navButton}
                  <button
                    onClick={() => navigate("/teacher-profile")}
                    className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold text-white/80 hover:bg-white/10 hover:text-white"
                    type="button"
                  >
                    <UserRound size={18} /> My Profile
                  </button>
                </div>
              );
            })}
          </nav>

          <button
            onClick={handleLogout}
            className="mt-10 flex w-full items-center gap-3 rounded-2xl bg-red-500 px-4 py-3 text-left text-sm font-bold text-white"
            type="button"
          >
            <LogOut size={18} /> Logout
          </button>
        </aside>

        <main className="flex-1 p-5 lg:p-8">
          <Topbar />
          <div className="mt-4 flex gap-2 overflow-x-auto rounded-3xl bg-white p-3 shadow-soft lg:hidden">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              const navButton = (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex shrink-0 items-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold transition ${
                    isActive
                      ? "bg-primary text-white"
                      : "bg-light text-primary"
                  }`}
                  type="button"
                >
                  <Icon size={17} />
                  {item.label}
                </button>
              );

              if (item.id !== "dashboard") {
                return navButton;
              }

              return (
                <div key={item.id} className="flex shrink-0 gap-2">
                  {navButton}
                  <button
                    onClick={() => navigate("/teacher-profile")}
                    className="flex shrink-0 items-center gap-2 rounded-2xl bg-light px-4 py-3 text-sm font-bold text-primary"
                    type="button"
                  >
                    <UserRound size={17} />
                    My Profile
                  </button>
                </div>
              );
            })}
          </div>
          <div className="mt-6">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
