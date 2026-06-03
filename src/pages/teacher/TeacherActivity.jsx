import { useOutletContext } from "react-router-dom";
import { formatRelativeTime } from "../../lib/teacherdata";

const TeacherActivity = () => {
  const { activities } = useOutletContext();

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const recentActivities = activities
    .filter((a) => new Date(a.date) >= thirtyDaysAgo)
    .slice(0, 10);

  return (
    <section className="rounded-3xl bg-white p-6 shadow-soft">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary">Recent Activity</h2>
          <p className="mt-1 text-sm text-slate-500">
            Jobs searched and applications submitted in the last 30 days (max 10 entries).
          </p>
        </div>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
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
              className="flex items-start justify-between rounded-2xl border border-borderColor p-4 text-sm"
            >
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
};

export default TeacherActivity;
