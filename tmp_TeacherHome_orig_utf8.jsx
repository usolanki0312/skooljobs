import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  Bookmark,
  CheckCircle2,
  Calendar,
  Send,
  GraduationCap,
  ChevronRight,
  Star,
  X,
  Bell,
} from "lucide-react";
import { formatRelativeTime } from "../../lib/teacherdata";

const TeacherHome = () => {
  const navigate = useNavigate();
  const {
    appliedJobs,
    savedJobs,
    activities,
    profileImage,
    displayName,
    recommendedJobs,
    handleApply,
    handleSave,
  } = useOutletContext();

  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, msg: "Shortlisted for Math Teacher interview at Sunrise Public School", time: "2h ago", read: false },
    { id: 2, msg: "New job matching your profile: English Teacher at Som Lalit School", time: "5h ago", read: false },
    { id: 3, msg: "Your application for Science Teacher was viewed by Green Valley School", time: "1d ago", read: true },
    { id: 4, msg: "Welcome to SkoolJobs! Complete your profile to reach 100%", time: "3d ago", read: true },
  ]);

  const handleMarkRead = (id) => {
    setNotifications((p) => p.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const handleDeleteNotification = (id) => {
    setNotifications((p) => p.filter((n) => n.id !== id));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const notificationDropdown = showNotifDropdown && (
    <div className="absolute right-0 top-12 z-50 w-[90vw] max-w-sm rounded-2xl border border-borderColor bg-white shadow-[0_8px_32px_rgba(0,0,0,0.12)] sm:w-80">
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
                <p className="break-words text-slate-700">{n.msg}</p>
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

  return (
    <div className="space-y-6">
      {/* 1. Header Welcome Card */}
      <div className="rounded-3xl bg-white border border-borderColor p-5 shadow-soft sm:p-6 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Welcome Back, {displayName.toUpperCase()}
          </p>
          <h2 className="mt-1 text-2xl font-bold text-primary sm:text-3xl">
            Teacher Dashboard
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Find your next teaching opportunity today.
          </p>
        </div>

        <div className="flex flex-col items-start sm:items-end gap-4">
          {/* Action Icons */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                className="relative rounded-2xl border border-borderColor p-3 text-primary hover:bg-light transition"
                type="button"
                onClick={() => setShowNotifDropdown((v) => !v)}
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </button>
              {notificationDropdown}
            </div>
          </div>

          {/* Profile Strength progress tracker */}
          <div className="w-full space-y-2 border-t border-borderColor pt-4 sm:w-auto sm:min-w-[240px] sm:border-t-0 sm:pt-0">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-primary font-bold">86% Complete</span>
              <span className="text-slate-400 font-bold">Profile Strength</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-primary" style={{ width: "86%" }} />
            </div>
            <p className="text-[11px] font-semibold text-amber-600 flex items-center gap-1">
              ΓÜí Complete your profile to reach 100%
            </p>
          </div>
        </div>
      </div>

      {/* 2. Metrics Section (3 cards instead of 4) */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {/* Card 1: Applications Sent */}
        <button
          type="button"
          onClick={() => navigate("/teacher/applications")}
          className="rounded-3xl bg-white border border-borderColor p-5 text-left shadow-soft transition hover:-translate-y-0.5 duration-150"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Applications Sent
            </span>
            <span className="rounded-2xl bg-green-50 p-2.5 text-green-600">
              <Send size={18} />
            </span>
          </div>
          <p className="mt-4 text-3xl font-extrabold text-slate-800">
            {appliedJobs.length}
          </p>
          <p className="mt-2 text-xs font-semibold text-green-600">
            +12% Sent this week
          </p>
        </button>

        {/* Card 2: Interviews */}
        <button
          type="button"
          onClick={() => navigate("/teacher/interviews")}
          className="rounded-3xl bg-white border border-borderColor p-5 text-left shadow-soft transition hover:-translate-y-0.5 duration-150"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Interviews Scheduled
            </span>
            <span className="rounded-2xl bg-blue-50 p-2.5 text-blue-600">
              <Calendar size={18} />
            </span>
          </div>
          <p className="mt-4 text-3xl font-extrabold text-slate-800">03</p>
          <p className="mt-2 text-xs font-semibold text-blue-600">
            Next: Tomorrow, 10:00 AM
          </p>
        </button>

        {/* Card 3: Saved Jobs */}
        <button
          type="button"
          onClick={() => navigate("/teacher/saved-jobs")}
          className="rounded-3xl bg-white border border-borderColor p-5 text-left shadow-soft transition hover:-translate-y-0.5 duration-150"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Saved Jobs
            </span>
            <span className="rounded-2xl bg-amber-50 p-2.5 text-amber-600">
              <Bookmark size={18} />
            </span>
          </div>
          <p className="mt-4 text-3xl font-extrabold text-slate-800">
            {savedJobs.length}
          </p>
          <p className="mt-2 text-xs font-semibold text-slate-500">
            Across 12 categories
          </p>
        </button>
      </div>

      {/* 3. Two-Column Dashboard Layout (Left: Job recommendation + Activity, Right: Upcoming Interview Card) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column: Occupies 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recommended Jobs */}
          <section className="rounded-3xl bg-white border border-borderColor p-5 shadow-soft sm:p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-primary font-heading">
                Recommended Jobs
              </h2>
              <button
                onClick={() => navigate("/teacher/recommendation")}
                className="text-xs font-bold text-primary hover:underline"
                type="button"
              >
                View all
              </button>
            </div>

            <div className="space-y-4">
              {recommendedJobs.length === 0 ? (
                <p className="py-6 text-center text-sm text-slate-400">
                  No recommended jobs found. Update your profile skills to match listings.
                </p>
              ) : (
                recommendedJobs.map((job) => {
                  const isApplied = appliedJobs.some((item) => item.id === job.id);
                  const isSaved = savedJobs.some((item) => item.id === job.id);

                  const handleRowClick = (e) => {
                    if (e.target.closest("button")) return;
                    navigate(`/teacher/jobs/${job.id}`);
                  };

                  return (
                    <div
                      key={job.id}
                      onClick={handleRowClick}
                      className="rounded-2xl border border-borderColor bg-white p-5 shadow-sm hover:shadow-soft transition duration-150 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between cursor-pointer"
                    >
                      <div className="flex min-w-0 items-center gap-4">
                        {/* School Icon Placeholder */}
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary">
                          <GraduationCap size={22} />
                        </div>
                        <div className="min-w-0">
                          <h3 className="break-words font-bold text-slate-800 text-base">
                            {job.role}
                          </h3>
                          <p className="break-words text-sm font-semibold text-slate-500">
                            {job.school} ┬╖ {job.location}
                          </p>
                          <div className="mt-1 flex flex-wrap gap-2 text-xs text-slate-400">
                            <span>{job.type}</span>
                            <span>┬╖</span>
                            <span>{job.skill}</span>
                            <span>┬╖</span>
                            <span className="font-bold text-primary">
                              {job.salary}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 border-t border-borderColor pt-3 sm:border-t-0 sm:pt-0">
                        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-600">
                          {job.match || "95"}% Match
                        </span>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleApply(job)}
                            disabled={isApplied}
                            className={`rounded-xl px-4 py-2 text-xs font-bold text-white transition ${
                              isApplied
                                ? "bg-green-500"
                                : "bg-primary hover:bg-primary/95 shadow-sm"
                            }`}
                          >
                            {isApplied ? "Applied" : "Apply"}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSave(job)}
                            disabled={isSaved}
                            className={`rounded-xl border px-3 py-2 text-xs font-bold transition ${
                              isSaved
                                ? "border-green-500 bg-green-500 text-white shadow-sm"
                                : "border-borderColor text-slate-600 hover:bg-light"
                            }`}
                          >
                            {isSaved ? "Saved" : "Save"}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>

          {/* Recent Activity */}
          <section className="rounded-3xl bg-white border border-borderColor p-5 shadow-soft sm:p-6 space-y-4">
            <h3 className="text-lg font-bold text-primary font-heading">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {activities.slice(0, 4).map((activity, index) => (
                <div
                  key={`${activity.message}-${index}`}
                  className="flex gap-3 text-sm text-slate-600 items-start"
                >
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <div className="flex-1">
                    <span>{activity.message}</span>
                    <span className="ml-2 text-xs text-slate-400">
                      {formatRelativeTime(activity.date)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Sticky Upcoming Interview Card */}
        <div className="space-y-6 lg:col-span-1">
          {/* Upcoming Interview Card */}
          <section className="rounded-3xl bg-white border border-borderColor p-5 shadow-soft sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-borderColor pb-3">
              <h3 className="font-heading text-lg font-bold text-primary">
                Upcoming Interview
              </h3>
              <span className="rounded-xl bg-primary/10 p-2 text-primary">
                <Calendar size={18} />
              </span>
            </div>

            <div className="rounded-2xl bg-[#f0f5fc] p-4 border border-primary/5 space-y-2">
              <p className="font-bold text-slate-800 text-sm">
                Math Teacher Interview @ Sunrise Public School
              </p>
              <p className="text-xs text-slate-500">
                Oct 24, 10:00 AM
              </p>
            </div>

            <button
              onClick={() => navigate("/teacher/interviews")}
              className="w-full rounded-xl bg-primary py-2.5 text-xs font-bold text-white shadow-md hover:bg-primary/95 transition flex items-center justify-center gap-1.5 active:scale-[0.98]"
            >
              View Interview Details <ChevronRight size={14} />
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TeacherHome;
