import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Button, Input } from "@cloudstrytech/ui-components";

import {
  Calendar, CheckCircle, Clock, Link2, MapPin, MessageCircle, Pencil,
  PhoneCall, Video, XCircle, X,
} from "lucide-react";
import Select from "../../components/ui/Select";
import interviewsOptions from "../../../dropdown/School_module/interviews.json";

const { Duration: DURATIONS, Round: ROUNDS, Status: STATUSES } = interviewsOptions;

// Online meeting platforms. WhatsApp Video Call uses the candidate's registered
// number, so it does NOT need a meeting link.
const ONLINE_PLATFORMS = [
  { val: "Google Meet", needsLink: true, placeholder: "https://meet.google.com/abc-defg-hjk" },
  { val: "Zoom", needsLink: true, placeholder: "https://zoom.us/j/1234567890" },
  { val: "Microsoft Teams", needsLink: true, placeholder: "https://teams.microsoft.com/l/meetup-join/..." },
  { val: "WhatsApp Video Call", needsLink: false, placeholder: "" },
];

const platformNeedsLink = (platform) =>
  ONLINE_PLATFORMS.find((p) => p.val === platform)?.needsLink ?? true;

// Reminders are only relevant for Online interviews
const REMINDERS_ENABLED_MODES = ["Online"];

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
  onlinePlatform: "Google Meet",
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
  const { applicants, interviews, setInterviews, schoolName } = useOutletContext();

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
      mode: iv.mode, onlinePlatform: iv.onlinePlatform || "Google Meet",
      meetingLink: iv.meetingLink || "", location: iv.location || "",
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
    if (form.mode === "Online" && platformNeedsLink(form.onlinePlatform) && !form.meetingLink) {
      alert(`Please add a Meeting Link for ${form.onlinePlatform} interviews.`);
      return;
    }

    if (editingId) {
      setInterviews((p) => p.map((iv) => iv.id === editingId ? { ...iv, ...form } : iv));
    } else {
      setInterviews((p) => [...p, {
        id: Date.now(),
        candidateId: schedulingFor.id,
        candidateName: schedulingFor.name,
        jobTitle: schedulingFor.jobTitle,
        subject: schedulingFor.subject,
        school: schoolName || "Green Valley School",
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
      <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">Interview Schedule</h2>

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
                          <Button
                            type="button"
                            onClick={() => openSchedule(a)}
                          >
                            <Calendar size={13} /> Schedule Interview
                          </Button>
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
                        {iv.mode === "Online" && iv.onlinePlatform === "WhatsApp Video Call" && <MessageCircle size={13} className="text-green-500" />}
                        {iv.mode === "Online" && iv.onlinePlatform !== "WhatsApp Video Call" && <Video size={13} className="text-blue-500" />}
                        {iv.mode === "In-Person" && <MapPin size={13} className="text-orange-500" />}
                        {iv.mode === "Telephonic" && <PhoneCall size={13} className="text-green-500" />}
                        {iv.mode === "Online" ? iv.onlinePlatform || "Online" : iv.mode}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-slate-600">{iv.round}</td>
                    <td className="px-5 py-3">
                      <Select
                        value={iv.status}
                        onChange={(v) => updateStatus(iv.id, v)}
                        options={STATUSES}
                        className={`min-w-32 rounded-full border-0 px-3 py-1.5 text-xs font-bold ${statusColor[iv.status] || "bg-slate-100 text-slate-600"}`}
                      />
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outlined"
                          type="button"
                          onClick={() => openEdit(iv)}
                        >
                          <Pencil size={11} /> Edit
                        </Button>
                        {iv.status === "Scheduled" && (
                          <Button
                            variant="outlined"
                            type="button"
                            onClick={() => updateStatus(iv.id, "Confirmed")}
                          >
                            <CheckCircle size={11} /> Confirm
                          </Button>
                        )}
                        <Button
                          variant="outlined"
                          type="button"
                          onClick={() => deleteInterview(iv.id)}
                        >
                          <XCircle size={11} /> Remove
                        </Button>
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
              <Button
                variant="text"
                type="button"
                onClick={() => setSchedulingFor(null)}
              >
                <X size={18} />
              </Button>
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
                    <Input
                      value={schedulingFor.name}
                      readOnly
                    />                  </div>
                  <div>
                    <Label required>Job Posting</Label>
                    <Input
                      value={schedulingFor.jobTitle}
                      readOnly
                    />  
                  </div>
                  <div>
                    <Label>Interviewer(s)</Label>
                    <Input
  value={form.interviewer}
  onChange={(value) => set("interviewer", value)}
  placeholder="e.g. Priya Sharma (Academic Head)"
/>
                  </div>
                  <div>
                    <Label required>Interview Round</Label>
                    <Select value={form.round} onChange={(v) => set("round", v)} options={ROUNDS} className={inputCls} />
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
<Input
  type="date"
  value={form.date}
  onChange={(value) => set("date", value)}
/>                  </div>
                  <div>
                    <Label required>Time</Label>
                    <Input
                      type="time"
                      value={form.time}
                      onChange={(value) => set("time", value)}
                    />
                  </div>
                  <div>
                    <Label required>Duration</Label>
                    <Select value={form.duration} onChange={(v) => set("duration", v)} options={DURATIONS} className={inputCls} />
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
<Input
  type="radio"
  name="mode"
  value={val}
  checked={form.mode === val}
  onChange={() => set("mode", val)}
/>                      <span className={color}>{icon}</span>
                      <span className="text-sm font-bold text-slate-700">{val}</span>
                    </label>
                  ))}

                  {form.mode === "Online" && (
                    <div className="mt-3 space-y-3 rounded-xl border border-blue-100 bg-blue-50/50 p-4">
                      <div>
                        <Label required>Platform</Label>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                          {ONLINE_PLATFORMS.map((p) => {
                            const isWhatsApp = p.val === "WhatsApp Video Call";
                            return (
                            <Button
  key={p.val}
  type="button"
  onClick={() => set("onlinePlatform", p.val)}
  variant={
    form.onlinePlatform === p.val ? "default" : "outlined"
  }
>
  {isWhatsApp ? (
    <MessageCircle size={14} className="text-green-500" />
  ) : (
    <Video size={14} className="text-blue-500" />
  )}
  {p.val}
</Button>
                            );
                          })}
                        </div>
                      </div>

                      {platformNeedsLink(form.onlinePlatform) ? (
                        <div>
                          <Label required>Meeting Link</Label>
                          <div className="flex items-center gap-2 rounded-xl border border-borderColor bg-white px-3 py-2.5 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
                            <Link2 size={15} className="shrink-0 text-slate-400" />
                            <Input
  value={form.meetingLink}
  onChange={(value) => set("meetingLink", value)}
  placeholder={
    ONLINE_PLATFORMS.find((p) => p.val === form.onlinePlatform)?.placeholder
  }
/>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start gap-2 rounded-xl border border-green-100 bg-green-50 p-3">
                          <MessageCircle size={15} className="mt-0.5 shrink-0 text-green-500" />
                          <p className="text-xs text-green-700">
                            No meeting link needed. The interviewer will call the candidate on
                            their registered WhatsApp number at the scheduled time.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {form.mode === "In-Person" && (
                    <div className="mt-3 space-y-3 rounded-xl border border-orange-100 bg-orange-50/50 p-4">
                      <p className="text-xs font-bold text-orange-600">In-Person Details</p>
                      <div>
                        <Label>Location / Address</Label>
                        <Input value={form.location} onChange={(value) => set("location", value)} className={inputCls} placeholder="e.g. Delhi Public School, Sector-45" />
                      </div>
                      <div>
                        <Label>Room / Venue</Label>
                        <Input value={form.room} onChange={(value) => set("room", value)} className={inputCls} placeholder="e.g. Conference Room – 2" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* ── 4. Reminder Settings ─────────────────────────────────── */}
              {(() => {
                const remindersEnabled = REMINDERS_ENABLED_MODES.includes(form.mode);
                return (
                  <div className="rounded-2xl border border-borderColor p-5">
                    <div className="mb-4 flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">4</span>
                      <h4 className="text-sm font-bold text-slate-700">Reminder Settings</h4>
                    </div>

                    {!remindersEnabled && (
                      <p className="mb-3 rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-400">
                        Automated reminders are only available for Online interviews.
                        For {form.mode} interviews, please coordinate with the candidate directly.
                      </p>
                    )}

                    <div className={`space-y-3 transition ${remindersEnabled ? "" : "pointer-events-none select-none opacity-40 blur-[1px]"}`}>
                      {[
                        { key: "remindConfirmation", label: "Send Confirmation to Candidate", sub: "Immediately after scheduling" },
                        { key: "remind24h", label: "24 Hour Reminder", sub: "Before interview" },
                        { key: "remind1h", label: "1 Hour Reminder", sub: "Before interview" },
                      ].map(({ key, label, sub }) => (
                        <label key={key} className="flex cursor-pointer items-start gap-3 rounded-xl border border-borderColor p-3 hover:bg-light">
                        <Input
  type="checkbox"
  checked={remindersEnabled && form[key]}
  disabled={!remindersEnabled}
  onChange={(checked) => set(key, checked)}
/>
                          <div>
                            <p className="text-sm font-bold text-slate-700">{label}</p>
                            <p className="text-xs text-slate-400">{sub}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })()}

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
            <div className="sticky bottom-0 flex flex-col-reverse gap-3 rounded-b-3xl border-t border-borderColor bg-white px-6 py-4 sm:flex-row sm:justify-end">
             <Button
  variant="outlined"
  type="button"
  onClick={() => setSchedulingFor(null)}
>
  Cancel
</Button>

<Button
  type="button"
  onClick={handleSubmit}
>
  {editingId ? "Save Changes" : "Schedule Interview"}
</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolInterviews;
