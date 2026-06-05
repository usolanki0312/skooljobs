import { useState } from "react";
import { useNavigate, useOutletContext, useSearchParams } from "react-router-dom";
import {
  Bookmark, Calendar, ChevronRight, FileText, Search, X,
} from "lucide-react";
import { subjects, statusChipClass } from "../../lib/schooldata";

const statusOptions = ["Applied", "Shortlisted", "Rejected"];

const SchoolAllApplicants = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { applicants, setApplicants, handleSaveCandidate } = useOutletContext();

  const [applicantSearch, setApplicantSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [expFilter, setExpFilter] = useState("");
  const [jobTitleFilter, setJobTitleFilter] = useState("");
  // Pre-select status filter from the URL (e.g. ?status=Shortlisted from dashboard card)
  const [statusFilter, setStatusFilter] = useState(searchParams.get("status") || "");
  const [selected, setSelected] = useState(null);

  const uniqueJobTitles = [...new Set(applicants.map((a) => a.jobTitle))];

  const filteredApplicants = applicants.filter((a) => {
    const matchSearch =
      a.name.toLowerCase().includes(applicantSearch.toLowerCase()) ||
      a.subject.toLowerCase().includes(applicantSearch.toLowerCase());
    const matchSubject = !subjectFilter || a.subject === subjectFilter;
    const matchJob = !jobTitleFilter || a.jobTitle === jobTitleFilter;
    const matchStatus = !statusFilter || a.status === statusFilter;
    const expYears = parseInt(a.experience) || 0;
    const matchExp =
      !expFilter ||
      (expFilter === "0-3" && expYears <= 3) ||
      (expFilter === "3-6" && expYears > 3 && expYears <= 6) ||
      (expFilter === "6+" && expYears > 6);
    return matchSearch && matchSubject && matchExp && matchJob && matchStatus;
  });

  const handleStatusChange = (id, status) => {
    setApplicants((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    if (selected?.id === id) setSelected((s) => ({ ...s, status }));
  };

  const handleSave = (id) => {
    handleSaveCandidate(id);
    if (selected?.id === id) setSelected((s) => ({ ...s, saved: !s.saved }));
  };

  const openDrawer = (applicant) => setSelected(applicant);
  const closeDrawer = () => setSelected(null);

  // Keep drawer in sync when applicant state changes (e.g. save toggled from table)
  const drawerApplicant = selected
    ? applicants.find((a) => a.id === selected.id) ?? selected
    : null;

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold text-slate-800">All Applicants</h2>

      {/* ── Filters ───────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <div className="flex flex-1 min-w-48 items-center gap-2 rounded-2xl border border-borderColor bg-white px-4 py-3 shadow-sm">
          <Search size={16} className="shrink-0 text-slate-400" />
          <input
            value={applicantSearch}
            onChange={(e) => setApplicantSearch(e.target.value)}
            placeholder="Search by name or subject..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </div>
        <select value={jobTitleFilter} onChange={(e) => setJobTitleFilter(e.target.value)} className="rounded-2xl border border-borderColor bg-white px-4 py-3 text-sm text-slate-600 shadow-sm outline-none focus:border-primary">
          <option value="">All Job Titles</option>
          {uniqueJobTitles.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)} className="rounded-2xl border border-borderColor bg-white px-4 py-3 text-sm text-slate-600 shadow-sm outline-none focus:border-primary">
          <option value="">All Subjects</option>
          {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-2xl border border-borderColor bg-white px-4 py-3 text-sm text-slate-600 shadow-sm outline-none focus:border-primary">
          <option value="">All Status</option>
          {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={expFilter} onChange={(e) => setExpFilter(e.target.value)} className="rounded-2xl border border-borderColor bg-white px-4 py-3 text-sm text-slate-600 shadow-sm outline-none focus:border-primary">
          <option value="">All Experience</option>
          <option value="0-3">0 – 3 yrs</option>
          <option value="3-6">3 – 6 yrs</option>
          <option value="6+">6+ yrs</option>
        </select>
      </div>

      {/* ── Table ─────────────────────────────────────────────────────────── */}
      <div className="overflow-hidden rounded-2xl border border-borderColor bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-170 w-full text-left text-sm">
            <thead className="bg-primary/5 text-xs uppercase tracking-wide text-primary">
              <tr>
                <th className="px-5 py-4">Candidate</th>
                <th className="px-5 py-4">Job Title</th>
                <th className="px-5 py-4">Subject</th>
                <th className="px-5 py-4">Experience</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 w-10" />
              </tr>
            </thead>
            <tbody className="divide-y divide-borderColor">
              {filteredApplicants.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-sm text-slate-400">
                    No applicants found.
                  </td>
                </tr>
              ) : (
                filteredApplicants.map((applicant) => (
                  <tr
                    key={applicant.id}
                    onClick={() => openDrawer(applicant)}
                    className={`cursor-pointer transition hover:bg-light/60 ${selected?.id === applicant.id ? "bg-primary/5" : ""}`}
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img src={applicant.avatar} alt={applicant.name} className="h-9 w-9 shrink-0 rounded-xl object-cover" />
                        <div className="min-w-0">
                          <p className="font-bold text-slate-800 truncate">{applicant.name}</p>
                          <p className="text-xs text-slate-400 truncate">{applicant.qualification}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">{applicant.jobTitle}</td>
                    <td className="px-5 py-3.5 text-slate-600">{applicant.subject}</td>
                    <td className="px-5 py-3.5 text-slate-600">{applicant.experience}</td>
                    <td className="px-5 py-3.5">
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusChipClass[applicant.status] || "bg-slate-100 text-slate-500"}`}>
                        {applicant.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-slate-300">
                      <ChevronRight size={16} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Drawer backdrop ───────────────────────────────────────────────── */}
      {drawerApplicant && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          onClick={closeDrawer}
        />
      )}

      {/* ── Drawer panel ──────────────────────────────────────────────────── */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          drawerApplicant ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {drawerApplicant && (
          <>
            {/* Drawer header */}
            <div className="flex items-center justify-between border-b border-borderColor px-6 py-4">
              <h3 className="font-bold text-slate-800">Candidate Profile</h3>
              <button type="button" onClick={closeDrawer} className="rounded-xl p-2 text-slate-400 hover:bg-light">
                <X size={18} />
              </button>
            </div>

            {/* Drawer content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">

              {/* Profile card */}
              <div className="flex items-center gap-4 rounded-2xl border border-borderColor bg-light p-4">
                <img
                  src={drawerApplicant.avatar}
                  alt={drawerApplicant.name}
                  className="h-16 w-16 shrink-0 rounded-2xl object-cover"
                />
                <div className="min-w-0">
                  <h4 className="text-lg font-bold text-slate-800">{drawerApplicant.name}</h4>
                  <p className="text-sm text-slate-500">{drawerApplicant.jobTitle}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{drawerApplicant.qualification}</p>
                </div>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Subject", value: drawerApplicant.subject },
                  { label: "Experience", value: drawerApplicant.experience },
                  { label: "Job Title", value: drawerApplicant.jobTitle },
                  { label: "Qualification", value: drawerApplicant.qualification },
                ].map((d) => (
                  <div key={d.label} className="rounded-xl border border-borderColor bg-white p-3">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{d.label}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">{d.value}</p>
                  </div>
                ))}
              </div>

              {/* Status */}
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Application Status</p>
                <div className="flex gap-2">
                  {statusOptions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => handleStatusChange(drawerApplicant.id, s)}
                      className={`flex-1 rounded-xl border py-2 text-xs font-bold transition ${
                        drawerApplicant.status === s
                          ? s === "Shortlisted"
                            ? "border-green-400 bg-green-50 text-green-600"
                            : s === "Rejected"
                            ? "border-red-300 bg-red-50 text-red-500"
                            : "border-primary bg-primary/10 text-primary"
                          : "border-borderColor text-slate-500 hover:border-primary hover:text-primary"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Actions</p>
                <div className="space-y-2">
                  <button
                    type="button"
                    className="flex w-full items-center gap-3 rounded-xl border border-borderColor px-4 py-3 text-sm font-bold text-slate-700 hover:bg-light transition"
                  >
                    <FileText size={16} className="text-primary" /> View Resume
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSave(drawerApplicant.id)}
                    className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-sm font-bold transition ${
                      drawerApplicant.saved
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-borderColor text-slate-700 hover:bg-light"
                    }`}
                  >
                    <Bookmark size={16} className={drawerApplicant.saved ? "fill-primary text-primary" : "text-slate-400"} />
                    {drawerApplicant.saved ? "Saved — click to unsave" : "Save Profile"}
                  </button>

                  {drawerApplicant.status === "Shortlisted" && (
                    <button
                      type="button"
                      onClick={() => { closeDrawer(); navigate("/school/interviews"); }}
                      className="flex w-full items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-bold text-blue-600 hover:bg-blue-100 transition"
                    >
                      <Calendar size={16} /> Schedule Interview
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SchoolAllApplicants;
