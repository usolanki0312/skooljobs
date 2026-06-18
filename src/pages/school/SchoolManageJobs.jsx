import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ChevronRight, PlusCircle, Search, Share2 } from "lucide-react";
import Select from "../../components/ui/Select";
import managejobsOptions from "../../../dropdown/School_module/managejobs.json";

const { Job_status: jobStatusOptions } = managejobsOptions;

const jobStatusChip = {
  Active: "bg-green-50 text-green-600",
  Draft:  "bg-amber-50 text-amber-600",
  Closed: "bg-slate-100 text-slate-500",
  Paused: "bg-orange-50 text-orange-500",
  Scheduled: "bg-blue-50 text-blue-600",
};

const SchoolManageJobs = () => {
  const navigate = useNavigate();
  const { jobs, applicants } = useOutletContext();

  const [jobSearch, setJobSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const draftCount = jobs.filter((j) => j.status === "Draft").length;

  const filteredJobs = jobs
    .filter((j) => j.title.toLowerCase().includes(jobSearch.toLowerCase()))
    .filter((j) => !statusFilter || j.status === statusFilter);

  return (
    <div className="space-y-5">

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">Manage Jobs</h2>
          {draftCount > 0 && (
            <p className="mt-1 text-xs font-semibold text-amber-600">
              {draftCount} draft{draftCount > 1 ? "s" : ""} awaiting publication
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={() => navigate("/school/post-job")}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-primary/95"
        >
          <PlusCircle size={16} /> Post New Job
        </button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex flex-1 items-center gap-2 rounded-2xl border border-borderColor bg-white px-4 py-3 shadow-sm">
          <Search size={16} className="text-slate-400" />
          <input
            value={jobSearch}
            onChange={(e) => setJobSearch(e.target.value)}
            placeholder="Search jobs..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </div>
        <Select
          value={statusFilter}
          onChange={setStatusFilter}
          placeholder="All Status"
          options={jobStatusOptions}
          className="min-w-44 rounded-2xl border border-borderColor bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-primary"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-borderColor bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-190 w-full text-left text-sm">
            <thead className="bg-primary/5 text-xs uppercase tracking-wide text-primary">
              <tr>
                <th className="px-5 py-4">Job Title</th>
                <th className="px-5 py-4">Applied</th>
                <th className="px-5 py-4">Shortlisted</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Posted</th>
                <th className="px-5 py-4">Expiry</th>
                <th className="px-5 py-4 w-24 text-right pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderColor">
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-sm text-slate-400">
                    No jobs found.
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job) => {
                  const candidates = applicants.filter((a) => a.jobTitle === job.title);
                  const shortlisted = candidates.filter((a) => a.status === "Shortlisted").length;
                  return (
                    <tr
                      key={job.id}
                      onClick={() => navigate(`/school/manage-jobs/${job.id}`)}
                      className="cursor-pointer transition hover:bg-light/60"
                    >
                      <td className="px-5 py-3.5">
                        <p className="font-bold text-slate-800">{job.title}</p>
                        {job.subject && <p className="text-xs text-slate-400">{job.subject}</p>}
                      </td>
                      <td className="px-5 py-3.5 text-slate-600">{candidates.length || job.applicants}</td>
                      <td className="px-5 py-3.5 text-slate-600">{shortlisted}</td>
                      <td className="px-5 py-3.5">
                        <span className={`rounded-full px-3 py-1 text-xs font-bold ${jobStatusChip[job.status] || "bg-slate-100 text-slate-500"}`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-500">{job.date}</td>
                      <td className="px-5 py-3.5 text-slate-500">{job.expiryDate || "—"}</td>
                      <td className="px-5 py-3.5 text-right pr-6" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              const shareLink = window.location.origin + "/public-job/" + job.id;
                              navigator.clipboard.writeText(shareLink);
                              alert(`Public sharing link copied to clipboard!\n${shareLink}`);
                            }}
                            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-primary transition"
                            title="Copy Share Link"
                          >
                            <Share2 size={15} />
                          </button>
                          <ChevronRight size={16} className="text-slate-300" />
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SchoolManageJobs;
