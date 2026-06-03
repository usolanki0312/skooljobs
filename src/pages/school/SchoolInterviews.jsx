import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Calendar, CheckCircle, Clock, Link2, MapPin, Pencil,
  PhoneCall, Video, XCircle, X,
} from "lucide-react";

const DURATIONS = ["15 Minutes", "30 Minutes", "45 Minutes", "60 Minutes", "90 Minutes"];
const ROUNDS = ["1st Round", "2nd Round", "Technical Round", "HR Round", "Final Round"];
const STATUSES = ["Scheduled", "Confirmed", "Completed", "Cancelled"];

const statusColor = {
  Scheduled: "bg-blue-50 text-blue-600",
  Confirmed: "bg-green-50 text-green-600",
  Completed: "bg-slate-100 text-slate-600",
  Cancelled: "bg-red-50 text-red-500",
};

const blankForm = {
  round: "1st Round",
  date: "",
  time: "",
  duration: "45 Minutes",
  mode: "Online",
  meetingLink: "",
  location: "",
  room: "",
  interviewer: "",
  notesForCandidate: "",
  internalNotes: "",
  remindConfirmation: true,
  remind24h: true,
  remind1h: true,
};

const Label = ({ children, required }) => (
  <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-slate-500">
    {children}{required && <span className="ml-1 text-red-500">*</span>}
  </p>
);

const inputCls =
  "w-full rounded-xl border border-borderColor bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10";

const SchoolInterviews = () => {
  const { applicants, interviews, setInterviews } = useOutletContext();

  const shortlisted = applicants.filter((a) => a.status === "Shortlisted");

  const [schedulingFor, setSchedulingFor] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(blankForm);

  const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  const scheduledIds = new Set(
    interviews.filter((iv) => iv.status !== "Cancelled").map((iv) => iv.candidateId),
  );

  const openSchedule = (applicant) => {
    setSchedulingFor(applicant);
    setForm(blankForm);
    setEditingId(null);
  };

  const openEdit = (iv) => {
    const applicant = applicants.find((a) => a.id === iv.candidateId) || {
      name: iv.candidateName, jobTitle: iv.jobTitle, id: iv.candidateId,
    };
    setSchedulingFor(applicant);
    setForm({
      round: iv.round, date: iv.date, time: iv.time, duration: iv.duration,
      mode: iv.mode, meetingLink: iv.meetingLink || "", location: iv.location || "",
      room: iv.room || "", interviewer: iv.interviewer,
      notesForCandidate: iv.notesForCandidate || "",
      internalNotes: iv.internalNotes || "",
      remindConfirmation: iv.remindConfirmation ?? true,
      remind24h: iv.remind24h ?? true,
      remind1h: iv.remind1h ?? true,
    });
    setEditingId(iv.id);
  };

  const handleSubmit = () => {
    if (!form.date || !form.time) { alert("Date and Time are required."); return; }
    if (form.mode === "Online" && !form.meetingLink) { alert("Please add a Meeting Link for Online interviews."); return; }

    if (editingId) {
      setInterviews((p) => p.map((iv) => iv.id === editingId ? { ...iv, ...form } : iv));
    } else {
      setInterviews((p) => [...p, {
        id: Date.now(),
        candidateId: schedulingFor.id,
        candidateName: schedulingFor.name,
        jobTitle: schedulingFor.jobTitle,
        subject: schedulingFor.subject,
        status: "Scheduled",
        ...form,
      }]);
    }
    setSchedulingFor(null);
    setEditingId(null);
  };

  const updateStatus = (id, status) =>
    setInterviews((p) => p.map((iv) => iv.id === id ? { ...iv, status } : iv));

  const deleteInterview = (id) => {
    if (window.confirm("Remove this interview?"))
      setInterviews((p) => p.filter((iv) => iv.id !== id));
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-slate-800">Interview Schedule</h2>

      {/* ── Shortlisted candidates ─────────────────────────────────────────── */}
      <div className="rounded-2xl border border-borderColor bg-white shadow-sm">
        <div className="border-b border-borderColor px-6 py-4">
          <h3 className="font-bold text-slate-800">Shortlisted Candidates</h3>
          <p className="mt-0.5 text-xs text-slate-500">
            Only shortlisted candidates can be scheduled for an interview.
          </p>
        </div>

        {shortlisted.length === 0 ? (
          <p className="px-6 py-10 text-center text-sm text-slate-400">
            No shortlisted candidates yet. Go to All Applicants and shortlist candidates first.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-170 w-full text-left text-sm">
              <thead className="bg-primary/5 text-xs uppercase tracking-wide text-primary">
                <tr>
                  <th className="px-5 py-3">Candidate</th>
                  <th className="px-5 py-3">Job Title</th>
                  <th className="px-5 py-3">Subject</th>
                  <th className="px-5 py-3">Experience</th>
                  <th className="px-5 py-3">Interview</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borderColor">
                {shortlisted.map((a) => {
                  const isScheduled = scheduledIds.has(a.id);
                  return (
                    <tr key={a.id} className="hover:bg-light/40">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <img src={a.avatar} alt={a.name} className="h-8 w-8 rounded-xl object-cover" />
                          <span className="font-bold text-slate-800">{a.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-slate-600">{a.jobTitle}</td>
                      <td className="px-5 py-3 text-slate-600">{a.subject}</td>
                      <td className="px-5 py-3 text-slate-600">{a.experience}</td>
                      <td className="px-5 py-3">
                        {isScheduled ? (
                          <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-600">
                            Scheduled ✓
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => openSchedule(a)}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primary/90"
                          >
                            <Calendar size={13} /> Schedule Interview
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Scheduled interviews list ──────────────────────────────────────── */}
      {interviews.length > 0 && (
        <div className="rounded-2xl border border-borderColor bg-white shadow-sm">
          <div className="border-b border-borderColor px-6 py-4">
            <h3 className="font-bold text-slate-800">All Scheduled Interviews</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-215 w-full text-left text-sm">
              <thead className="bg-primary/5 text-xs uppercase tracking-wide text-primary">
                <tr>
                  <th className="px-5 py-3">Candidate</th>
                  <th className="px-5 py-3">Role</th>
                  <th className="px-5 py-3">Date &amp; Time</th>
                  <th className="px-5 py-3">Mode</th>
                  <th className="px-5 py-3">Round</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borderColor">
                {interviews.map((iv) => (
                  <tr key={iv.id} className="hover:bg-light/40">
                    <td className="px-5 py-3 font-bold text-slate-800">{iv.candidateName}</td>
                    <td className="px-5 py-3 text-slate-600">{iv.jobTitle}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Calendar size={13} className="text-primary" /> {iv.date}
                        <Clock size={13} className="ml-1 text-primary" /> {iv.time}
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="flex items-center gap-1.5 text-slate-600">
                        {iv.mode === "Online" && <Video size={13} className="text-blue-500" />}
                        {iv.mode === "In-Person" && <MapPin size={13} className="text-orange-500" />}
                        {iv.mode === "Telephonic" && <PhoneCall size={13} className="text-green-500" />}
                        {iv.mode}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-slate-600">{iv.round}</td>
                    <td className="px-5 py-3">
                      <select
                        value={iv.status}
                        onChange={(e) => updateStatus(iv.id, e.target.value)}
                        className={`rounded-full border-0 px-3 py-1 text-xs font-bold outline-none cursor-pointer ${statusColor[iv.status] || "bg-slate-100 text-slate-600"}`}
                      >
                        {STATUSES.map((s) => <option key={s}>{s}</option>)}
                      </select>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <button type="button" onClick={() => openEdit(iv)} className="flex items-center gap-1 rounded-lg border border-borderColor px-3 py-1.5 text-xs font-bold text-primary hover:bg-light">
                          <Pencil size={11} /> Edit
                        </button>
                        {iv.status === "Scheduled" && (
                          <button type="button" onClick={() => updateStatus(iv.id, "Confirmed")} className="flex items-center gap-1 rounded-lg border border-green-200 px-3 py-1.5 text-xs font-bold text-green-600 hover:bg-green-50">
                            <CheckCircle size={11} /> Confirm
                          </button>
                        )}
                        <button type="button" onClick={() => deleteInterview(iv.id)} className="flex items-center gap-1 rounded-lg border border-red-100 px-3 py-1.5 text-xs font-bold text-red-500 hover:bg-red-50">
                          <XCircle size={11} /> Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ══ Schedule / Edit modal ════════════════════════════════════════════ */}
      {schedulingFor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white shadow-2xl">

            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-3xl border-b border-borderColor bg-white px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                  <Calendar size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">
                    {editingId ? "Edit Interview" : "Schedule Interview"}
                  </h3>
                  <p className="text-xs text-slate-500">{schedulingFor.name} · {schedulingFor.jobTitle}</p>
                </div>
              </div>
              <button type="button" onClick={() => setSchedulingFor(null)} className="rounded-xl p-2 text-slate-400 hover:bg-light">
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">

              {/* ── 1. Basic Information ─────────────────────────────────── */}
              <div className="rounded-2xl border border-borderColor p-5">
                <div className="mb-4 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">1</span>
                  <h4 className="text-sm font-bold text-slate-700">Basic Information</h4>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label required>Candidate</Label>
                    <input readOnly value={schedulingFor.name} className={`${inputCls} bg-light text-slate-500`} />
                  </div>
                  <div>
                    <Label required>Job Posting</Label>
                    <input readOnly value={schedulingFor.jobTitle} className={`${inputCls} bg-light text-slate-500`} />
                  </div>
                  <div>
                    <Label>Interviewer(s)</Label>
                    <input
                      value={form.interviewer}
                      onChange={(e) => set("interviewer", e.target.value)}
                      className={inputCls}
                      placeholder="e.g. Priya Sharma (Academic Head)"
                    />
                  </div>
                  <div>
                    <Label required>Interview Round</Label>
                    <select value={form.round} onChange={(e) => set("round", e.target.value)} className={inputCls}>
                      {ROUNDS.map((r) => <option key={r}>{r}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* ── 2. Date, Time & Duration ─────────────────────────────── */}
              <div className="rounded-2xl border border-borderColor p-5">
                <div className="mb-4 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">2</span>
                  <h4 className="text-sm font-bold text-slate-700">Date, Time &amp; Duration</h4>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label required>Date</Label>
                    <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <Label required>Time</Label>
                    <input type="time" value={form.time} onChange={(e) => set("time", e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <Label required>Duration</Label>
                    <select value={form.duration} onChange={(e) => set("duration", e.target.value)} className={inputCls}>
                      {DURATIONS.map((d) => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* ── 3. Interview Mode ────────────────────────────────────── */}
              <div className="rounded-2xl border border-borderColor p-5">
                <div className="mb-4 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">3</span>
                  <h4 className="text-sm font-bold text-slate-700">Interview Mode</h4>
                </div>
                <div className="space-y-3">
                  {[
                    { val: "Online", icon: <Video size={15} />, color: "text-blue-500" },
                    { val: "In-Person", icon: <MapPin size={15} />, color: "text-orange-500" },
                    { val: "Telephonic", icon: <PhoneCall size={15} />, color: "text-green-500" },
                  ].map(({ val, icon, color }) => (
                    <label key={val} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition ${form.mode === val ? "border-primary bg-primary/5" : "border-borderColor hover:bg-light"}`}>
                      <input type="radio" name="mode" value={val} checked={form.mode === val} onChange={() => set("mode", val)} className="accent-primary" />
                      <span className={color}>{icon}</span>
                      <span className="text-sm font-bold text-slate-700">{val}</span>
                    </label>
                  ))}

                  {form.mode === "Online" && (
                    <div className="mt-3">
                      <Label required>Meeting Link</Label>
                      <div className="flex items-center gap-2 rounded-xl border border-borderColor bg-white px-3 py-2.5 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
                        <Link2 size={15} className="shrink-0 text-slate-400" />
                        <input
                          value={form.meetingLink}
                          onChange={(e) => set("meetingLink", e.target.value)}
                          placeholder="https://meet.google.com/abc-defg-hjk"
                          className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                  )}

                  {form.mode === "In-Person" && (
                    <div className="mt-3 space-y-3 rounded-xl border border-orange-100 bg-orange-50/50 p-4">
                      <p className="text-xs font-bold text-orange-600">In-Person Details</p>
                      <div>
                        <Label>Location / Address</Label>
                        <input value={form.location} onChange={(e) => set("location", e.target.value)} className={inputCls} placeholder="e.g. Delhi Public School, Sector-45" />
                      </div>
                      <div>
                        <Label>Room / Venue</Label>
                        <input value={form.room} onChange={(e) => set("room", e.target.value)} className={inputCls} placeholder="e.g. Conference Room – 2" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* ── 4. Actions & Status ──────────────────────────────────── */}
              <div className="rounded-2xl border border-borderColor p-5">
                <div className="mb-4 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">4</span>
                  <h4 className="text-sm font-bold text-slate-700">Reminder Settings</h4>
                </div>
                <div className="space-y-3">
                  {[
                    { key: "remindConfirmation", label: "Send Confirmation to Candidate", sub: "Immediately after scheduling" },
                    { key: "remind24h", label: "24 Hour Reminder", sub: "Before interview" },
                    { key: "remind1h", label: "1 Hour Reminder", sub: "Before interview" },
                  ].map(({ key, label, sub }) => (
                    <label key={key} className="flex cursor-pointer items-start gap-3 rounded-xl border border-borderColor p-3 hover:bg-light">
                      <input
                        type="checkbox"
                        checked={form[key]}
                        onChange={(e) => set(key, e.target.checked)}
                        className="mt-0.5 h-4 w-4 accent-primary"
                      />
                      <div>
                        <p className="text-sm font-bold text-slate-700">{label}</p>
                        <p className="text-xs text-slate-400">{sub}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* ── 5. Notes (full width) ────────────────────────────────── */}
              <div className="rounded-2xl border border-borderColor p-5 md:col-span-2">
                <div className="mb-4 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">5</span>
                  <h4 className="text-sm font-bold text-slate-700">Additional Notes</h4>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Label>Notes for Candidate</Label>
                    <textarea
                      value={form.notesForCandidate}
                      onChange={(e) => set("notesForCandidate", e.target.value)}
                      rows={3}
                      placeholder="Bring original certificates, Demo class may be required..."
                      className={`${inputCls} resize-none`}
                    />
                  </div>
                  <div>
                    <Label>Internal Notes <span className="ml-1 text-xs font-normal normal-case text-slate-400">(Visible to HR only)</span></Label>
                    <textarea
                      value={form.internalNotes}
                      onChange={(e) => set("internalNotes", e.target.value)}
                      rows={3}
                      placeholder="Add internal notes here..."
                      className={`${inputCls} resize-none`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 flex justify-end gap-3 rounded-b-3xl border-t border-borderColor bg-white px-6 py-4">
              <button type="button" onClick={() => setSchedulingFor(null)} className="rounded-xl border border-borderColor px-6 py-2.5 text-sm font-bold text-slate-500 hover:bg-light">
                Cancel
              </button>
              <button type="button" onClick={handleSubmit} className="rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primary/90">
                {editingId ? "Save Changes" : "Schedule Interview"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolInterviews;
