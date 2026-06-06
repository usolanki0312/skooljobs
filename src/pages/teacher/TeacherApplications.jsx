import { useOutletContext, useNavigate } from "react-router-dom";
import { Calendar, Briefcase, Eye, Trash2, CheckCircle2 } from "lucide-react";

const TeacherApplications = () => {
  const navigate = useNavigate();
  const { appliedJobs, setAppliedJobs, addActivity } = useOutletContext();

  const handleWithdraw = (jobId, jobRole, school) => {
    if (window.confirm(`Are you sure you want to withdraw your application for "${jobRole}" at ${school}?`)) {
      setAppliedJobs(prev => prev.filter(j => j.id !== jobId));
      if (addActivity) {
        addActivity(`Withdrew application for ${jobRole} at ${school}`, "withdraw");
      }
      alert("Application withdrawn successfully.");
    }
  };

  return (
    <section className="rounded-3xl bg-white p-6 shadow-soft space-y-6">
      <div className="border-b border-borderColor pb-5">
        <h2 className="text-2xl font-bold text-primary">My Applications</h2>
        <p className="mt-1 text-sm text-slate-500">
          Monitor your job application history and current status.
        </p>
      </div>

      {appliedJobs.length === 0 ? (
        <div className="py-12 text-center text-sm text-slate-400 space-y-3">
          <Briefcase size={40} className="mx-auto text-slate-300 animate-pulse" />
          <p>You haven't submitted any job applications yet.</p>
          <button
            type="button"
            onClick={() => navigate("/teacher/all-jobs")}
            className="rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primary/95 transition shadow-sm"
          >
            Find Teaching Jobs
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-borderColor text-xs font-semibold uppercase text-slate-400 bg-slate-50/50">
                <th className="px-5 py-3">Job Role</th>
                <th className="px-5 py-3">School</th>
                <th className="px-5 py-3">Applied Date</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderColor/60">
              {appliedJobs.map((job) => {
                const displayDate = job.appliedDate 
                  ? new Date(job.appliedDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                  : "05 Jun 2026";
                
                // Mock status mapping for UI
                const status = job.status || "Under Review";

                return (
                  <tr key={job.id} className="hover:bg-light/30 transition">
                    <td className="px-5 py-4 font-bold text-slate-800">
                      <div>
                        {job.role || job.title}
                        <span className="ml-2 inline-flex rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                          {job.type}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-600">{job.school || "Sunrise Public School"}</td>
                    <td className="px-5 py-4 text-slate-500 flex items-center gap-1.5 mt-0.5">
                      <Calendar size={13} className="text-slate-400" />
                      {displayDate}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
                        status === "Shortlisted" ? "bg-green-50 text-green-600" :
                        status === "Rejected" ? "bg-red-50 text-red-500" :
                        "bg-blue-50 text-blue-600"
                      }`}>
                        <CheckCircle2 size={12} className="shrink-0" />
                        {status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right pr-6 space-x-2">
                      <button
                        type="button"
                        onClick={() => navigate(`/public-job/${job.id}`)}
                        className="inline-flex items-center gap-1 rounded-lg border border-borderColor hover:bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-600 transition"
                        title="View Public Job Details"
                      >
                        <Eye size={12} /> View Job
                      </button>
                      <button
                        type="button"
                        onClick={() => handleWithdraw(job.id, job.role || job.title, job.school)}
                        className="inline-flex items-center gap-1 rounded-lg border border-red-200 hover:bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-red-500 transition"
                        title="Withdraw Application"
                      >
                        <Trash2 size={12} /> Withdraw
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default TeacherApplications;
