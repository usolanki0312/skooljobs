import { useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import {
  ArrowLeft, PauseCircle, Pencil, PlayCircle,
  Send, Trash2, X, XCircle, Share2,
} from "lucide-react";
import { statusChipClass } from "../../lib/schooldata";
import postjob from "../../../dropdown/School_module/postjob.json";
import { inputClass, labelClass } from "../../lib/formStyles";
import Select from "../../components/ui/Select";

const {
  Subject: subjects,
  Experience_required: experienceOptions,
  Employment_type: employmentTypes,
  Salary_range: salaryRanges,
} = postjob;

const jobStatusChip = {
  Active: "bg-green-50 text-green-600",
  Draft: "bg-amber-50 text-amber-600",
  Closed: "bg-slate-100 text-slate-500",
  Paused: "bg-orange-50 text-orange-500",
  Scheduled: "bg-blue-50 text-blue-600",
};

const SchoolJobDetail = () => {
  const jobId = useParams();
  const navigate = useNavigate();
  const { jobs, setJobs, applicants, interviews } = useOutletContext();

  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({});

  const job = jobs.find((j) => String(j.id) === String(jobId.jobId));

  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-lg font-bold text-slate-500">Job not found.</p>
        <button type="button" onClick={() => navigate("/school/manage-jobs")}
          className="mt-4 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-primary/90">
          Back to Manage Jobs
        </button>
      </div>
    );
  }

  const candidates = applicants.filter((a) => a.jobTitle === job.title);
  const shortlisted = candidates.filter((a) => a.status === "Shortlisted").length;
  const rejected = candidates.filter((a) => a.status === "Rejected").length;
  const ivCount = interviews.filter((iv) => iv.jobTitle === job.title).length;

  const setJobStatus = (status) =>
    setJobs((p) => p.map((j) => (j.id === job.id ? { ...j, status } : j)));

  const handleDelete = () => {
    if (window.confirm("Permanently delete this job? This cannot be undone.")) {
      setJobs((p) => p.filter((j) => j.id !== job.id));
      navigate("/school/manage-jobs");
    }
  };

  const openEdit = () => {
    setEditForm({
      title: job.title || "",
      roleType: job.roleType || "Teaching",
      subject: job.subject || "",
      experience: job.experience || "",
      vacancies: job.vacancies || "1",
      salaryRange: job.salaryRange || "",
      location: job.location || "",
      employmentType: job.employmentType || "",
      expiryDate: job.expiryDate || "",
      description: job.description || "",
      requirements: job.requirements || "",
      qualifications: job.qualifications || "",
    });
    setEditOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editForm.title || !editForm.location || !editForm.employmentType) {
      alert("Job Title, Location and Employment Type are required.");
      return;
    }
    setJobs((p) => p.map((j) => (j.id === job.id ? { ...j, ...editForm } : j)));
    setEditOpen(false);
  };

  const setField = (k, v) => setEditForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="space-y-6">

      {/* ── Back + header ─────────────────────────────────────────────────── */}
      <div>
        <button
          type="button"
          onClick={() => navigate("/school/manage-jobs")}
          className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary"
        >
          <ArrowLeft size={16} /> Back to Manage Jobs
        </button>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">{job.title}</h2>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${jobStatusChip[job.status] || "bg-slate-100 text-slate-500"}`}>
                {job.status}
              </span>
            </div>
            <div className="mt-1 flex flex-wrap gap-3 text-sm text-slate-500">
              {job.subject && <span>{job.subject}</span>}
              {job.location && <span>· {job.location}</span>}
              {job.employmentType && <span>· {job.employmentType}</span>}
            </div>
          </div>

          {/* Quick actions */}
          <div className="flex flex-wrap gap-2 shrink-0">
            <button type="button"
              onClick={() => {
                const shareLink = window.location.origin + "/public-job/" + job.id;
                navigator.clipboard.writeText(shareLink);
                alert(`Public sharing link copied to clipboard!\n${shareLink}`);
              }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-borderColor bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:bg-light transition">
              <Share2 size={14} /> Share Link
            </button>
            <button type="button" onClick={openEdit}
              className="inline-flex items-center gap-1.5 rounded-xl border border-borderColor bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:bg-light transition">
              <Pencil size={14} /> Edit
            </button>
            <button type="button" onClick={handleDelete}
              className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 transition">
              <Trash2 size={14} /> Delete
            </button>
          </div>
        </div>
      </div>

      {/* ── Stats row ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Applied", value: candidates.length || job.applicants, color: "text-primary" },
          { label: "Shortlisted", value: shortlisted, color: "text-green-600" },
          { label: "Rejected", value: rejected, color: "text-red-500" },
          { label: "Interviews", value: ivCount, color: "text-blue-600" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-borderColor bg-white p-5 shadow-sm text-center">
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="mt-1 text-xs font-semibold text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">

        {/* ── Left: Candidates ──────────────────────────────────────────────── */}
        <div className="rounded-2xl border border-borderColor bg-white shadow-sm">
          <div className="border-b border-borderColor px-6 py-4">
            <h3 className="font-bold text-slate-800">Applicants for this Role ({candidates.length})</h3>
          </div>
          {candidates.length === 0 ? (
            <p className="px-6 py-10 text-center text-sm text-slate-400">No applications received yet.</p>
          ) : (
            <div className="divide-y divide-borderColor">
              {candidates.map((a) => (
                <div key={a.id} className="flex items-center gap-4 px-6 py-4">
                  <img src={a.avatar} alt={a.name} className="h-10 w-10 shrink-0 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-slate-800 truncate">{a.name}</p>
                    <p className="text-xs text-slate-400">{a.experience} · {a.qualification}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${statusChipClass[a.status] || "bg-slate-100 text-slate-500"}`}>
                    {a.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Right: Job info + status controls ─────────────────────────────── */}
        <div className="space-y-5">

          {/* Job details */}
          <div className="rounded-2xl border border-borderColor bg-white p-5 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-800">Job Details</h3>
            {[
              { label: "Posted", value: job.date },
              { label: "Expiry", value: job.expiryDate || "Not set" },
              { label: "Experience", value: job.experience || "—" },
              { label: "Vacancies", value: job.vacancies || "—" },
              { label: "Salary Range", value: job.salaryRange || "—" },
              { label: "Role Type", value: job.roleType || "—" },
            ].map((d) => (
              <div key={d.label} className="flex items-center justify-between text-sm">
                <span className="text-slate-500">{d.label}</span>
                <span className="font-semibold text-slate-700 text-right max-w-[60%] truncate">{d.value}</span>
              </div>
            ))}
          </div>

          {/* Hiring status controls */}
          <div className="rounded-2xl border border-borderColor bg-white p-5 shadow-sm">
            <h3 className="mb-3 font-bold text-slate-800">Hiring Status</h3>
            <div className="flex flex-col gap-2">
              {job.status !== "Active" && (
                <button type="button" onClick={() => setJobStatus("Active")}
                  className="flex items-center gap-2 rounded-xl border border-green-300 bg-green-50 px-4 py-2.5 text-sm font-bold text-green-600 hover:bg-green-100 transition">
                  <PlayCircle size={16} /> Activate Job
                </button>
              )}
              {job.status === "Active" && (
                <button type="button" onClick={() => setJobStatus("Paused")}
                  className="flex items-center gap-2 rounded-xl border border-orange-200 bg-orange-50 px-4 py-2.5 text-sm font-bold text-orange-500 hover:bg-orange-100 transition">
                  <PauseCircle size={16} /> Pause Hiring
                </button>
              )}
              {job.status !== "Closed" && job.status !== "Draft" && (
                <button type="button" onClick={() => setJobStatus("Closed")}
                  className="flex items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 transition">
                  <XCircle size={16} /> Close Job
                </button>
              )}
              {job.status === "Draft" && (
                <button type="button" onClick={() => setJobStatus("Active")}
                  className="flex items-center gap-2 rounded-xl border border-primary bg-primary/5 px-4 py-2.5 text-sm font-bold text-primary hover:bg-primary/10 transition">
                  <Send size={16} /> Publish Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ══ Edit job modal ════════════════════════════════════════════════════ */}
      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl">

            <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-3xl border-b border-borderColor bg-white px-6 py-4">
              <div>
                <h3 className="font-bold text-slate-800">Edit Job</h3>
                <p className="text-xs text-slate-500">{job.title}</p>
              </div>
              <button type="button" onClick={() => setEditOpen(false)} className="rounded-xl p-2 text-slate-400 hover:bg-light">
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2">

              <div className="sm:col-span-2">
                <label className={labelClass}>Job Title <span className="text-red-500">*</span></label>
                <input value={editForm.title} onChange={(e) => setField("title", e.target.value)} className={inputClass} />
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass}>Role Type</label>
                <div className="flex flex-wrap gap-2">
                  {["Teaching", "Administrative", "Teaching & Administrative"].map((t) => (
                    <button key={t} type="button" onClick={() => setField("roleType", t)}
                      className={`rounded-xl border px-4 py-2 text-sm font-bold transition ${editForm.roleType === t ? "border-primary bg-primary text-white" : "border-borderColor text-slate-600 hover:border-primary"}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {(editForm.roleType === "Teaching" || editForm.roleType === "Teaching & Administrative") && (
                <div>
                  <label className={labelClass}>Subject</label>
                  <Select value={editForm.subject} onChange={(v) => setField("subject", v)} placeholder="Select Subject" options={subjects} />
                </div>
              )}

              <div>
                <label className={labelClass}>Experience Required</label>
                <Select value={editForm.experience} onChange={(v) => setField("experience", v)} placeholder="Select" options={experienceOptions} />
              </div>

              <div>
                <label className={labelClass}>Vacancies</label>
                <input type="number" min="1" value={editForm.vacancies} onChange={(e) => setField("vacancies", e.target.value)} className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Salary Range</label>
                <Select value={editForm.salaryRange} onChange={(v) => setField("salaryRange", v)} placeholder="Select" options={salaryRanges} />
              </div>

              <div>
                <label className={labelClass}>Location <span className="text-red-500">*</span></label>
                <Input
                  value={editForm.location}
                  onChange={(value) => setField("location", value)}
                />              </div>

              <div>
                <label className={labelClass}>Expiry Date</label>
                <input type="date" value={editForm.expiryDate} onChange={(e) => setField("expiryDate", e.target.value)} className={inputClass} />
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass}>Employment Type <span className="text-red-500">*</span></label>
                <div className="flex flex-wrap gap-2">
                  {employmentTypes.map((t) => (
                    <button key={t} type="button" onClick={() => setField("employmentType", t)}
                      className={`rounded-xl border px-4 py-2 text-sm font-bold transition ${editForm.employmentType === t ? "border-primary bg-primary text-white" : "border-borderColor text-slate-600 hover:border-primary"}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass}>Job Description</label>
                <textarea value={editForm.description} onChange={(e) => setField("description", e.target.value)}
                  className={`${inputClass} min-h-28 resize-none`} />
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass}>Requirements</label>
                <textarea value={editForm.requirements} onChange={(e) => setField("requirements", e.target.value)}
                  className={`${inputClass} min-h-20 resize-none`} />
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass}>Qualifications</label>
                <textarea value={editForm.qualifications} onChange={(e) => setField("qualifications", e.target.value)}
                  className={`${inputClass} min-h-20 resize-none`} />
              </div>
            </div>

            <div className="sticky bottom-0 flex flex-col-reverse gap-3 rounded-b-3xl border-t border-borderColor bg-white px-6 py-4 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => setEditOpen(false)} className="rounded-xl border border-borderColor px-6 py-2.5 text-sm font-bold text-slate-500 hover:bg-light">
                Cancel
              </button>
              <button type="button" onClick={handleSaveEdit} className="rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primary/90">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolJobDetail;
