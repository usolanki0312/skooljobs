import { useEffect, useMemo, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness,
  Building2,
  Calendar,
  CreditCard,
  Eye,
  Heart,
  LayoutDashboard,
  LogOut,
  Package,
  PlusCircle,
  Settings,
  Upload,
  Users,
  X,
} from "lucide-react";
import Topbar from "../components/topbar";
import { initialJobs, initialApplicants } from "../lib/schooldata";

const augmentedJobs = [...initialJobs]
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .map((j) => ({ ...j, roleType: "Teaching", vacancies: 2, expiryDate: "30 Jun 2025" }));

const augmentedApplicants = initialApplicants.map((a, i) => ({
  ...a,
  jobTitle: ["Math Teacher", "English Teacher", "Science Teacher", "Hindi Teacher", "Math Teacher"][i],
  qualification: ["B.Ed + M.Sc", "B.Ed + MA English", "B.Ed + B.Sc", "MA Hindi + B.Ed", "M.Sc + B.Ed"][i],
  saved: false,
}));

const sidebarItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/school/dashboard" },
  { label: "Institute Profile", icon: Building2, path: "/school/profile" },
  { label: "View Profile", icon: Eye, path: "/school/view-profile" },
  { label: "Post a New Job", icon: PlusCircle, path: "/school/post-job" },
  { label: "Manage Jobs", icon: BriefcaseBusiness, path: "/school/manage-jobs" },
  { label: "All Applicants", icon: Users, path: "/school/all-applicants" },
  { label: "Interviews", icon: Calendar, path: "/school/interviews" },
  { label: "Saved Candidates", icon: Heart, path: "/school/saved-candidates" },
  { label: "Packages", icon: Package, path: "/school/packages" },
  { label: "Transactions", icon: CreditCard, path: "/school/transactions" },
  { label: "Settings", icon: Settings, path: "/school/settings" },
];

const SchoolLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem("skooljobs_jobs");
    if (saved) {
      try { return JSON.parse(saved); } catch { return augmentedJobs; }
    }
    return augmentedJobs;
  });
  const [applicants, setApplicants] = useState(() => {
    const saved = localStorage.getItem("skooljobs_applicants");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((a) => a.status === "Applied" ? { ...a, status: "Not Reviewed" } : a);
      } catch {
        return augmentedApplicants;
      }
    }
    return augmentedApplicants;
  });

  useEffect(() => {
    localStorage.setItem("skooljobs_jobs", JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem("skooljobs_applicants", JSON.stringify(applicants));
  }, [applicants]);

  const [logoImage, setLogoImage] = useState(null);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, msg: "New application from Rahul Sharma for Math Teacher", time: "2h ago", read: false },
    { id: 2, msg: "Priya Singh accepted your interview invitation", time: "5h ago", read: false },
    { id: 3, msg: "English Teacher job post is now live", time: "1d ago", read: true },
    { id: 4, msg: "Profile viewed by 3 candidates today", time: "2d ago", read: true },
  ]);
  const [interviews, setInterviews] = useState(() => {
    const saved = localStorage.getItem("skooljobs_interviews");
    if (saved) {
      try { return JSON.parse(saved); } catch { }
    }
    const initial = [
      {
        id: 1,
        candidateId: 1,
        candidateName: "Rahul Sharma",
        jobTitle: "Math Teacher",
        school: "Sunrise Public School",
        date: "2026-06-06",
        time: "10:00",
        duration: "60 Minutes",
        mode: "Online",
        onlinePlatform: "Zoom",
        meetingLink: "https://zoom.us/j/1234567890",
        round: "1st Round",
        notesForCandidate: "Interview will cover algebra, calculus curriculum design, and mock classroom demo. Please join the link 5 mins early.",
        status: "Scheduled",
      },
      {
        id: 2,
        candidateId: 1,
        candidateName: "Rahul Sharma",
        jobTitle: "Science Teacher",
        school: "Green Valley School",
        date: "2026-06-12",
        time: "14:00",
        duration: "60 Minutes",
        mode: "In-Person",
        round: "Final Round",
        notesForCandidate: "Management round. Please carry printed copies of your B.Ed certificates, resume, and experience letters to the school front desk.",
        location: "Sector 12, Kolar Road, Bhopal",
        status: "Scheduled",
      },
      {
        id: 3,
        candidateId: 1,
        candidateName: "Rahul Sharma",
        jobTitle: "English Teacher",
        school: "EduHire Recruiters",
        date: "2026-05-28",
        time: "11:30",
        duration: "45 Minutes",
        mode: "Online",
        onlinePlatform: "Google Meet",
        meetingLink: "https://meet.google.com/abc-defg-hjk",
        round: "HR Round",
        notesForCandidate: "Basic communication and background screening.",
        status: "Completed",
      },
      {
        id: 101,
        candidateId: 999,
        candidateName: "Priya Singh",
        jobTitle: "English Teacher",
        school: "Green Valley School",
        date: "2026-06-02",
        time: "10:00",
        duration: "45 Minutes",
        mode: "Online",
        onlinePlatform: "Google Meet",
        meetingLink: "https://meet.google.com/abc-defg-hjk",
        round: "1st Round",
        interviewer: "",
        notesForCandidate: "",
        status: "Confirmed",
      },
      {
        id: 102,
        candidateId: 998,
        candidateName: "Suresh Verma",
        jobTitle: "Math Teacher",
        school: "Green Valley School",
        date: "2026-06-03",
        time: "14:00",
        duration: "45 Minutes",
        mode: "In-Person",
        location: "Sector 12, Kolar Road, Bhopal",
        round: "1st Round",
        interviewer: "",
        notesForCandidate: "",
        status: "Pending",
      },
    ];
    localStorage.setItem("skooljobs_interviews", JSON.stringify(initial));
    return initial;
  });

  useEffect(() => {
    localStorage.setItem("skooljobs_interviews", JSON.stringify(interviews));
  }, [interviews]);

  const currentUser = useMemo(() => {
    try { return JSON.parse(localStorage.getItem("currentUser") || "{}"); } catch { return {}; }
  }, []);

  if (!localStorage.getItem("currentUser")) {
    return <Navigate to="/" replace />;
  }

  const schoolName = currentUser.companyName || currentUser.schoolName || currentUser.firstName || "Som Lalit School";
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) setLogoImage(URL.createObjectURL(file));
  };

  const handleMarkRead = (id) => {
    setNotifications((p) => p.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const handleDeleteNotification = (id) => {
    setNotifications((p) => p.filter((n) => n.id !== id));
  };

  const handleSaveCandidate = (id) => {
    setApplicants((p) => p.map((a) => (a.id === id ? { ...a, saved: !a.saved } : a)));
  };

  const notificationDropdown = showNotifDropdown && (
    <div className="absolute right-0 top-12 z-50 w-80 rounded-2xl border border-borderColor bg-white shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
      <div className="flex items-center justify-between border-b border-borderColor px-4 py-3">
        <p className="text-left font-bold text-slate-800">
          Notifications {unreadCount > 0 && <span className="ml-1 text-xs text-primary">({unreadCount} new)</span>}
        </p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setNotifications((p) => p.map((n) => ({ ...n, read: true })))}
            className="text-xs font-bold text-primary hover:underline"
          >
            Mark all read
          </button>
          <button
            type="button"
            onClick={() => setShowNotifDropdown(false)}
            className="rounded-lg p-1 text-slate-400 hover:bg-light hover:text-slate-600"
          >
            <X size={14} />
          </button>
        </div>
      </div>
      <div className="max-h-72 overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="px-4 py-6 text-center text-sm text-slate-400">No notifications</p>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => handleMarkRead(n.id)}
              className={`flex cursor-pointer gap-3 border-b border-borderColor/50 px-4 py-3 text-left text-sm transition hover:bg-light/60 ${n.read ? "bg-white" : "bg-primary/5"}`}
            >
              <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.read ? "bg-slate-300" : "bg-primary"}`} />
              <div className="flex-1 min-w-0">
                <p className="text-slate-700">{n.msg}</p>
                <p className="mt-1 text-xs text-slate-400">{n.time}</p>
              </div>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); handleDeleteNotification(n.id); }}
                className="mt-0.5 shrink-0 rounded-md p-0.5 text-slate-300 hover:bg-red-50 hover:text-red-400"
              >
                <X size={13} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const outletCtx = {
    jobs,
    setJobs,
    applicants,
    setApplicants,
    logoImage,
    notifications,
    setNotifications,
    interviews,
    setInterviews,
    currentUser,
    schoolName,
    handleLogout,
    handleSaveCandidate,
  };

  return (
    <div className="min-h-screen bg-light">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 flex-col border-r border-borderColor bg-white p-5 lg:flex">
          <div className="flex h-full flex-col">
            <label className="mb-5 flex cursor-pointer items-center gap-2 self-start rounded-xl border border-dashed border-borderColor px-4 py-2 text-xs font-bold text-primary hover:bg-light">
              <Upload size={13} />
              Upload Institute Logo
              <input type="file" hidden accept="image/*" onChange={handleLogoUpload} />
            </label>

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

            <nav className="flex-1 space-y-1 overflow-y-auto">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    type="button"
                    onClick={() => navigate(item.path)}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold transition ${
                      isActive ? "bg-primary text-white" : "text-slate-600 hover:bg-light hover:text-primary"
                    }`}
                  >
                    <Icon size={17} />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <div className="mt-4 border-t border-borderColor pt-4">
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold text-slate-600 hover:bg-light"
              >
                <LogOut size={17} /> Logout
              </button>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-5 lg:p-8">
          <Topbar
            title="School Dashboard"
            subtitle="Manage your job postings and track applicants."
            unreadCount={unreadCount}
            onNotificationClick={() => setShowNotifDropdown((v) => !v)}
            notificationDropdown={notificationDropdown}
          />

          <div className="mt-4 flex gap-2 overflow-x-auto rounded-3xl bg-white p-3 shadow-soft lg:hidden">
            {sidebarItems.map((item) => {
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

export default SchoolLayout;
