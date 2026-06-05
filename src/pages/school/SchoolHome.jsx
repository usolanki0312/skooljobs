import { useNavigate, useOutletContext } from "react-router-dom";
import { Calendar, CheckSquare, Clock } from "lucide-react";

const SchoolHome = () => {
  const navigate = useNavigate();
  const { jobs, applicants, interviews } = useOutletContext();
  const scheduledInterviews = interviews.filter(
    (iv) => iv.status !== "Cancelled",
  );

  const shortlistedApplicants = applicants.filter(
    (a) => a.status === "Shortlisted",
  );

  const stats = [
    {
      label: "Posted Jobs",
      value: jobs.filter((j) => j.status === "Active").length,
      sub: "In Job board",
      color: "text-primary",
      to: "/school/manage-jobs",
    },
    {
      label: "Viewed CVs",
      value: 0,
      sub: "CVs against opportunities",
      color: "text-green-500",
    },
    {
      label: "Saved Candidates",
      value: shortlistedApplicants.length,
      sub: "Manually saved candidates",
      color: "text-orange-500",
      to: "/school/saved-candidates",
    },
    {
      label: "Shortlisted",
      value: applicants.filter((a) => a.status === "Shortlisted").length,
      sub: "Shortlisted for interview",
      color: "text-blue-500",
      to: "/school/all-applicants?status=Shortlisted",
    },
    {
      label: "Interviews Scheduled",
      value: scheduledInterviews.length,
      sub: "Upcoming interviews",
      color: "text-purple-500",
      to: "/school/interviews",
    },
    {
      label: "Offers Made",
      value: 1,
      sub: "Offer letters sent",
      color: "text-teal-500",
    },
  ];

  const barData = [
    {
      label: "Posted Jobs",
      color: "bg-primary",
      val: jobs.filter((j) => j.status === "Active").length,
    },
    {
      label: "Saved",
      color: "bg-orange-500",
      val: shortlistedApplicants.length,
    },
    { label: "Viewed CVs", color: "bg-green-500", val: 0 },
    {
      label: "Shortlisted",
      color: "bg-blue-500",
      val: applicants.filter((a) => a.status === "Shortlisted").length,
    },
    {
      label: "Interviews",
      color: "bg-purple-500",
      val: scheduledInterviews.length,
    },
    { label: "Offers", color: "bg-teal-500", val: 1 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">
          Applications Statistics
        </h2>
      </div>

      <div className="flex items-start gap-3 rounded-2xl bg-primary px-5 py-4 text-sm text-white">
        <CheckSquare size={18} className="mt-0.5 shrink-0" />
        <p>
          Your account is active but, in order to post jobs, buy a plan at{" "}
          <button
            type="button"
            onClick={() => navigate("/school/packages")}
            className="font-bold underline underline-offset-2"
          >
            Plans
          </button>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
        {stats.map((stat) => {
          const clickable = Boolean(stat.to);
          return (
            <div
              key={stat.label}
              role={clickable ? "button" : undefined}
              tabIndex={clickable ? 0 : undefined}
              onClick={clickable ? () => navigate(stat.to) : undefined}
              onKeyDown={
                clickable
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        navigate(stat.to);
                      }
                    }
                  : undefined
              }
              className={`rounded-2xl border border-borderColor bg-white p-5 shadow-sm transition ${
                clickable
                  ? "cursor-pointer hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                  : ""
              }`}
            >
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                {stat.label}
              </p>
              <p className={`mt-3 text-4xl font-bold ${stat.color}`}>
                {stat.value}
              </p>
              <p className="mt-2 text-xs text-slate-400">{stat.sub}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border border-borderColor bg-white p-6 shadow-sm">
          <div className="flex h-40 items-end justify-around gap-4 border-b border-borderColor pb-4">
            {barData.map((bar) => (
              <div
                key={bar.label}
                className="flex flex-1 flex-col items-center gap-2"
              >
                <span className="text-xs font-bold text-slate-400">
                  {bar.val}
                </span>
                <div
                  className={`w-full rounded-t-lg ${bar.color} opacity-80`}
                  style={{ height: `${Math.max(bar.val * 20, 4)}px` }}
                />
                <span className="text-center text-xs leading-tight text-slate-400">
                  {bar.label}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-xs text-slate-400">
            Posted: {jobs.filter((j) => j.status === "Active").length} ·
            Shortlisted:{" "}
            {applicants.filter((a) => a.status === "Shortlisted").length} ·
            Interviews: {scheduledInterviews.length}
          </p>
        </div>

        <div className="rounded-2xl border border-borderColor bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Calendar size={18} className="text-primary" />
            <h3 className="font-bold text-slate-800">Upcoming Interviews</h3>
          </div>
          {scheduledInterviews.length === 0 ? (
            <p className="text-sm text-slate-400">No interviews scheduled.</p>
          ) : (
            <div className="space-y-3">
              {scheduledInterviews.map((iv) => (
                <div
                  key={iv.id}
                  className="rounded-xl border border-borderColor bg-light p-3"
                >
                  <p className="text-sm font-bold text-slate-800">
                    {iv.candidateName}
                  </p>
                  <p className="text-xs text-slate-500">
                    {iv.jobTitle} · {iv.round}
                  </p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar size={11} /> {iv.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={11} /> {iv.time}
                    </span>
                  </div>
                  <span
                    className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${
                      iv.status === "Confirmed"
                        ? "bg-green-50 text-green-600"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {iv.status}
                  </span>
                </div>
              ))}
            </div>
          )}
          <button
            type="button"
            onClick={() => navigate("/school/interviews")}
            className="mt-4 w-full rounded-xl border border-primary/20 py-2 text-xs font-bold text-primary hover:bg-primary/5"
          >
            + Schedule Interview
          </button>
        </div>
      </div>
    </div>
  );
};

export default SchoolHome;
