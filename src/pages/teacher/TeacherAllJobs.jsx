import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Bell, Filter } from "lucide-react";
import { jobsData } from "../../lib/teacherdata";
import TeacherJobCard from "../../components/TeacherJobCard";
import Select from "../../components/ui/Select";

const TeacherAllJobs = () => {
  const { appliedJobs, savedJobs, handleApply, handleSave } = useOutletContext();

  const [jobFilter, setJobFilter] = useState({ subject: "", type: "" });
  const [notifPrefs, setNotifPrefs] = useState({
    enabled: true, subjects: [], jobTitles: [], newInput: "",
  });

  const subjectOptions = [...new Set(jobsData.map((j) => j.skill))];
  const typeOptions = [...new Set(jobsData.map((j) => j.type))];

  const filteredJobs = jobsData.filter((job) => {
    if (jobFilter.subject && job.skill !== jobFilter.subject) return false;
    if (jobFilter.type && job.type !== jobFilter.type) return false;
    return true;
  });

  const twoYearsAgo = new Date();
  twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
  const appliedHistory = appliedJobs.filter(
    (j) => j.appliedDate && new Date(j.appliedDate) >= twoYearsAgo,
  );

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-white p-6 shadow-soft">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold text-primary">All Teaching Jobs</h2>
          <div className="flex items-center gap-3">
            <Filter size={16} className="text-slate-400" />
            <Select
              value={jobFilter.subject}
              onChange={(v) => setJobFilter((p) => ({ ...p, subject: v }))}
              placeholder="All Subjects"
              options={subjectOptions}
              className="min-w-40 rounded-xl border border-borderColor bg-light px-3 py-2 text-sm font-bold focus:border-primary"
            />
            <Select
              value={jobFilter.type}
              onChange={(v) => setJobFilter((p) => ({ ...p, type: v }))}
              placeholder="All Types"
              options={typeOptions}
              className="min-w-36 rounded-xl border border-borderColor bg-light px-3 py-2 text-sm font-bold focus:border-primary"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {filteredJobs.length === 0 ? (
            <p className="rounded-2xl bg-light p-5 text-sm text-slate-500">No jobs match your filter.</p>
          ) : (
            filteredJobs.map((job) => (
              <TeacherJobCard
                key={job.id}
                job={job}
                appliedJobs={appliedJobs}
                savedJobs={savedJobs}
                onApply={handleApply}
                onSave={handleSave}
              />
            ))
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
                  <p className="mt-1 text-xs text-slate-400">
                    {new Date(job.appliedDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
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
          <input type="checkbox" checked={notifPrefs.enabled} onChange={(e) => setNotifPrefs((p) => ({ ...p, enabled: e.target.checked }))} className="h-4 w-4 accent-primary" />
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
                    <button key={s} type="button"
                      onClick={() => setNotifPrefs((p) => ({ ...p, subjects: active ? p.subjects.filter((x) => x !== s) : [...p.subjects, s] }))}
                      className={`rounded-full px-4 py-2 text-sm font-bold transition ${active ? "bg-primary text-white" : "border border-borderColor bg-light text-slate-600 hover:border-primary"}`}>
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">Custom job title alerts</p>
              <input
                value={notifPrefs.newInput}
                onChange={(e) => setNotifPrefs((p) => ({ ...p, newInput: e.target.value }))}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && notifPrefs.newInput.trim()) {
                    setNotifPrefs((p) => ({ ...p, jobTitles: [...p.jobTitles, p.newInput.trim()], newInput: "" }));
                  }
                }}
                placeholder="e.g. Science Teacher (press Enter)"
                className="w-full rounded-xl border border-borderColor px-4 py-2 text-sm outline-none focus:border-primary"
              />
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

export default TeacherAllJobs;
