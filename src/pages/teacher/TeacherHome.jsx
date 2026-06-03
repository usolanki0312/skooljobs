import { useNavigate, useOutletContext } from "react-router-dom";
import { Bookmark, CheckCircle2, MessageCircle, Star } from "lucide-react";
import TeacherJobCard from "../../components/TeacherJobCard";
import { formatRelativeTime } from "../../lib/teacherdata";

const TeacherHome = () => {
  const navigate = useNavigate();
  const {
    appliedJobs, savedJobs, activities, profileImage,
    displayName, recommendedJobs, handleApply, handleSave,
  } = useOutletContext();

  const stats = [
    { label: "Applied Jobs", value: appliedJobs.length, icon: CheckCircle2, path: "/teacher/all-jobs" },
    { label: "Saved Jobs", value: savedJobs.length, icon: Bookmark, path: "/teacher/all-jobs" },
    { label: "Interviews", value: "03", icon: MessageCircle, path: "/teacher/dashboard" },
    { label: "Profile Score", value: "86%", icon: Star, path: "/teacher/dashboard" },
  ];

  return (
    <>
      <div className="mb-6 rounded-3xl bg-primary px-6 py-5 text-white">
        <p className="text-xs font-bold uppercase tracking-widest text-white/70">
          Welcome Back, {displayName.toUpperCase()}
        </p>
        <h2 className="mt-1 text-2xl font-bold">Teacher Dashboard</h2>
        <p className="mt-1 text-sm text-white/70">Find your next teaching opportunity today.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <button key={stat.label} type="button" onClick={() => navigate(stat.path)}
              className="rounded-3xl bg-white p-5 text-left shadow-soft transition hover:-translate-y-0.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-500">{stat.label}</span>
                <span className="rounded-2xl bg-primary/10 p-3 text-primary"><Icon size={20} /></span>
              </div>
              <p className="mt-5 text-4xl font-bold text-primary">{stat.value}</p>
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1fr_330px]">
        <section className="rounded-3xl bg-white p-6 shadow-soft">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold text-primary">Recommended Jobs</h2>
            <button onClick={() => navigate("/teacher/recommendation")} className="text-sm font-bold text-primary" type="button">
              View all
            </button>
          </div>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {recommendedJobs.map((job) => (
              <TeacherJobCard
                key={job.id}
                job={job}
                appliedJobs={appliedJobs}
                savedJobs={savedJobs}
                onApply={handleApply}
                onSave={handleSave}
              />
            ))}
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-soft">
            <div className="flex items-center gap-4">
              <img src={profileImage} alt="profile" className="h-16 w-16 rounded-2xl object-cover" />
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-bold text-primary">{displayName}</h3>
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
};

export default TeacherHome;
