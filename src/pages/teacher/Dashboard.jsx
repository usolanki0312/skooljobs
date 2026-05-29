import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Award,
  Bell,
  Bookmark,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  FileText,
  Filter,
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
import Topbar from "../../components/topbar";
import { jobsData, resumesData } from "../../lib/teacherdata";

const resumes = resumesData;

const navItems = [
  { id: "profile", label: "My Profile", icon: UserRound },
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
  const [activities, setActivities] = useState([
    { message: "Profile viewed by Green Valley School", date: new Date(Date.now() - 3600000).toISOString(), type: "view" },
  ]);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [jobFilter, setJobFilter] = useState({ subject: "", type: "" });
  const [notifPrefs, setNotifPrefs] = useState({
    enabled: true,
    subjects: [],
    jobTitles: [],
    newInput: "",
  });

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

  const handleProfileImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      addActivity("Updated profile photo", "profile");
    }
  };

  const formatRelativeTime = (isoDate) => {
    const diff = Date.now() - new Date(isoDate).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
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
      <div className="mb-6 rounded-3xl bg-primary px-6 py-5 text-white">
        <p className="text-xs font-bold uppercase tracking-widest text-white/70">Welcome Back, {displayName.toUpperCase()}</p>
        <h2 className="mt-1 text-2xl font-bold">Teacher Dashboard</h2>
        <p className="mt-1 text-sm text-white/70">Find your next teaching opportunity today.</p>
      </div>
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
            <div className="flex items-center gap-4">
              <img src={profileImage} alt="profile" className="h-16 w-16 rounded-2xl object-cover" />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-primary truncate">{displayName}</h3>
                <p className="text-sm text-green-500">Available for jobs</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-soft">
            <h3 className="text-lg font-bold text-primary">Recent Activity</h3>
            <div className="mt-5 space-y-4">
              {activities.slice(0, 4).map((activity, index) => (
                <div key={`${activity.message}-${index}`} className="flex gap-3 text-sm text-slate-600">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <div className="flex-1">
                    <span>{activity.message}</span>
                    <span className="ml-2 text-xs text-slate-400">{formatRelativeTime(activity.date)}</span>
                  </div>
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

  const renderAllJobs = () => {
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
    const appliedHistory = appliedJobs.filter(
      (j) => j.appliedDate && new Date(j.appliedDate) >= twoYearsAgo
    );

    const filteredJobs = jobsData.filter((job) => {
      if (jobFilter.subject && job.skill !== jobFilter.subject) return false;
      if (jobFilter.type && job.type !== jobFilter.type) return false;
      return true;
    });

    const subjectOptions = [...new Set(jobsData.map((j) => j.skill))];
    const typeOptions = [...new Set(jobsData.map((j) => j.type))];

    return (
      <div className="space-y-6">
        <section className="rounded-3xl bg-white p-6 shadow-soft">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold text-primary">All Teaching Jobs</h2>
            <div className="flex items-center gap-3">
              <Filter size={16} className="text-slate-400" />
              <select
                value={jobFilter.subject}
                onChange={(e) => setJobFilter((p) => ({ ...p, subject: e.target.value }))}
                className="rounded-xl border border-borderColor bg-light px-3 py-2 text-sm font-bold text-slate-700 outline-none focus:border-primary"
              >
                <option value="">All Subjects</option>
                {subjectOptions.map((s) => <option key={s}>{s}</option>)}
              </select>
              <select
                value={jobFilter.type}
                onChange={(e) => setJobFilter((p) => ({ ...p, type: e.target.value }))}
                className="rounded-xl border border-borderColor bg-light px-3 py-2 text-sm font-bold text-slate-700 outline-none focus:border-primary"
              >
                <option value="">All Types</option>
                {typeOptions.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {filteredJobs.length === 0 ? (
              <p className="rounded-2xl bg-light p-5 text-sm text-slate-500">No jobs match your filter.</p>
            ) : (
              filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
            )}
          </div>
        </section>

        {appliedHistory.length > 0 && (
          <section className="rounded-3xl bg-white p-6 shadow-soft">
            <h3 className="text-xl font-bold text-primary">Applied History (Last 2 Years)</h3>
            <p className="mt-1 text-sm text-slate-500">Your job applications from the past 2 years.</p>
            <div className="mt-5 space-y-3">
              {appliedHistory.map((job) => (
                <div key={job.id} className="flex items-center justify-between rounded-2xl border border-borderColor p-4">
                  <div>
                    <p className="font-bold text-primary">{job.role}</p>
                    <p className="text-sm text-slate-500">{job.school} · {job.location}</p>
                  </div>
                  <div className="text-right">
                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-600">Applied</span>
                    <p className="mt-1 text-xs text-slate-400">{new Date(job.appliedDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="rounded-3xl bg-white p-6 shadow-soft">
          <div className="mb-5 flex items-center gap-3">
            <span className="rounded-xl bg-primary/10 p-2 text-primary"><Bell size={19} /></span>
            <div>
              <h3 className="text-xl font-bold text-primary">Job Notification Preferences</h3>
              <p className="text-sm text-slate-500">Get notified when similar jobs are posted.</p>
            </div>
          </div>
          <label className="flex items-center gap-3 rounded-2xl border border-borderColor p-4">
            <input
              type="checkbox"
              checked={notifPrefs.enabled}
              onChange={(e) => setNotifPrefs((p) => ({ ...p, enabled: e.target.checked }))}
              className="h-4 w-4 accent-primary"
            />
            <span className="text-sm font-bold text-slate-700">Enable job notifications</span>
          </label>
          {notifPrefs.enabled && (
            <div className="mt-4 space-y-4">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">Notify me for these subjects</p>
                <div className="flex flex-wrap gap-2">
                  {subjectOptions.map((s) => {
                    const active = notifPrefs.subjects.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setNotifPrefs((p) => ({
                          ...p,
                          subjects: active ? p.subjects.filter((x) => x !== s) : [...p.subjects, s],
                        }))}
                        className={`rounded-full px-4 py-2 text-sm font-bold transition ${active ? "bg-primary text-white" : "border border-borderColor bg-light text-slate-600 hover:border-primary"}`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">Custom job title alerts</p>
                <div className="flex gap-3">
                  <input
                    value={notifPrefs.newInput}
                    onChange={(e) => setNotifPrefs((p) => ({ ...p, newInput: e.target.value }))}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && notifPrefs.newInput.trim()) {
                        setNotifPrefs((p) => ({ ...p, jobTitles: [...p.jobTitles, p.newInput.trim()], newInput: "" }));
                      }
                    }}
                    placeholder="e.g. Science Teacher (press Enter)"
                    className="flex-1 rounded-xl border border-borderColor px-4 py-2 text-sm outline-none focus:border-primary"
                  />
                </div>
                {notifPrefs.jobTitles.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {notifPrefs.jobTitles.map((title) => (
                      <span key={title} className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
                        {title}
                        <button type="button" onClick={() => setNotifPrefs((p) => ({ ...p, jobTitles: p.jobTitles.filter((t) => t !== title) }))} className="text-primary/60 hover:text-primary">×</button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </section>
      </div>
    );
  };

  const renderContent = () => {
    if (activeSection === "applied") {
      return renderJobsList("Applied Jobs", appliedJobs, "No applied jobs yet.");
    }
    if (activeSection === "saved") {
      return renderJobsList("Saved Jobs", savedJobs, "No saved jobs yet.");
    }
    if (activeSection === "alljobs") {
      return renderAllJobs();
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
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      const recentActivities = activities
        .filter((a) => new Date(a.date) >= thirtyDaysAgo)
        .slice(0, 10);
      return (
        <section className="rounded-3xl bg-white p-6 shadow-soft">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-primary">Recent Activity</h2>
              <p className="mt-1 text-sm text-slate-500">Jobs searched and applications submitted in the last 30 days (max 10 entries).</p>
            </div>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">{recentActivities.length} / 10</span>
          </div>
          {recentActivities.length === 0 ? (
            <p className="rounded-2xl bg-light p-5 text-sm text-slate-500">No activity in the last 30 days.</p>
          ) : (
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={`${activity.message}-${index}`} className="flex items-start justify-between rounded-2xl border border-borderColor p-4 text-sm">
                  <div className="flex gap-3">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <span className="text-slate-700">{activity.message}</span>
                  </div>
                  <span className="ml-4 shrink-0 text-xs text-slate-400">{formatRelativeTime(activity.date)}</span>
                </div>
              ))}
            </div>
          )}
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

          <div className="mt-6 rounded-3xl bg-white/10 p-5">
            <div className="mb-3 flex items-center justify-between text-sm font-bold text-white">
              <span>Profile Score</span>
              <div className="flex items-center gap-2">
                <span>86%</span>
                <button
                  type="button"
                  onClick={() => navigate("/teacher-profile")}
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
              const isActive = activeSection === item.id;
              const navButton = (
                <button
                  key={item.id}
                  onClick={() => (item.id === "profile" ? navigate("/teacher-profile") : setActiveSection(item.id))}
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${
                    isActive ? "bg-white text-primary" : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                  type="button"
                >
                  <Icon size={18} /> {item.label}
                </button>
              );

              return navButton;
            })}
          </nav>

          <div className="mt-10 space-y-2">
            <button
              onClick={() => navigate("/select-role")}
              className="flex w-full items-center gap-3 rounded-2xl border border-white/30 px-4 py-3 text-left text-sm font-bold text-white/80 hover:bg-white/10"
              type="button"
            >
              <ArrowLeft size={18} /> Back to Home
            </button>
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
            <button
              type="button"
              onClick={() => navigate("/select-role")}
              className="flex shrink-0 items-center gap-2 rounded-2xl bg-light px-4 py-3 text-sm font-bold text-primary"
            >
              <ArrowLeft size={17} /> Home
            </button>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              const navButton = (
                <button
                  key={item.id}
                  onClick={() => (item.id === "profile" ? navigate("/teacher-profile") : setActiveSection(item.id))}
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

              return navButton;
            })}
          </div>
          <div className="mt-6">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
