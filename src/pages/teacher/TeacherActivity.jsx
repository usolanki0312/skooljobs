import { useOutletContext } from "react-router-dom";
import { formatRelativeTime } from "../../lib/teacherdata";

const TeacherActivity = () => {
  const { activities } = useOutletContext();

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const recentActivities = activities
    .filter((a) => new Date(a.date) >= thirtyDaysAgo)
    .slice(0, 10);

  return (
    <section className="rounded-3xl bg-white p-5 shadow-soft sm:p-6">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary sm:text-3xl">Recent Activity</h2>
          <p className="mt-1 text-sm text-slate-500">
            Jobs searched and applications submitted in the last 30 days (max 10 entries).
          </p>
        </div>
        <span className="self-start rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
          {recentActivities.length} / 10
        </span>
      </div>
      {recentActivities.length === 0 ? (
        <p className="rounded-2xl bg-light p-5 text-sm text-slate-500">No activity in the last 30 days.</p>
      ) : (
        <div className="space-y-3">
          {recentActivities.map((activity, index) => (
            <div
              key={`${activity.message}-${index}`}
              className="flex flex-col gap-2 rounded-2xl border border-borderColor p-4 text-sm sm:flex-row sm:items-start sm:justify-between"
            >
              <div className="flex min-w-0 gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <span className="break-words text-slate-700">{activity.message}</span>
              </div>
              <span className="shrink-0 text-xs text-slate-400 sm:ml-4">{formatRelativeTime(activity.date)}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TeacherActivity;
