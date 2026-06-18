import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Bookmark, MessageSquare, Save } from "lucide-react";

const SchoolSavedCandidates = () => {
  const navigate = useNavigate();
  const { applicants, handleSaveCandidate } = useOutletContext();

  const [candidateComments, setCandidateComments] = useState({});
  const [editingComment, setEditingComment] = useState(null);
  const [commentDraft, setCommentDraft] = useState("");

  const savedApplicants = applicants.filter((a) => a.saved);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">Saved Candidates</h2>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
          {savedApplicants.length} saved
        </span>
      </div>
      <p className="text-sm text-slate-500">
        Profiles you bookmarked from All Applicants. Add private notes for each candidate.
      </p>

      {savedApplicants.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <Bookmark size={32} className="mx-auto mb-3 text-slate-300" />
          <p className="font-bold text-slate-500">No saved candidates yet.</p>
          <p className="mt-1 text-sm text-slate-400">
            Click the bookmark icon on any candidate in All Applicants to save them here.
          </p>
          <button
            type="button"
            onClick={() => navigate("/school/all-applicants")}
            className="mt-4 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-primary/95"
          >
            Go to All Applicants
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {savedApplicants.map((applicant) => (
            <div key={applicant.id} className="rounded-2xl border border-borderColor bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <img src={applicant.avatar} alt={applicant.name} className="h-14 w-14 shrink-0 rounded-2xl object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <h3 className="font-bold text-slate-800 truncate">{applicant.name}</h3>
                      <p className="text-xs text-slate-500 truncate">
                        {applicant.jobTitle} · {applicant.subject} · {applicant.experience}
                      </p>
                      <p className="text-xs text-slate-400 truncate">{applicant.qualification}</p>
                    </div>
                    <div className="flex items-center gap-2 self-start">
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                        applicant.status === "Shortlisted"
                          ? "bg-green-50 text-green-600"
                          : applicant.status === "Rejected"
                          ? "bg-red-50 text-red-500"
                          : "bg-slate-100 text-slate-500"
                      }`}>
                        {applicant.status}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleSaveCandidate(applicant.id)}
                        title="Remove from saved"
                        className="rounded-lg border border-primary/20 p-1.5 text-primary hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition"
                      >
                        <Bookmark size={14} className="fill-primary" />
                      </button>
                    </div>
                  </div>

                  {/* Notes section */}
                  <div className="mt-4">
                    {editingComment === applicant.id ? (
                      <div className="space-y-2">
                        <textarea
                          value={commentDraft}
                          onChange={(e) => setCommentDraft(e.target.value)}
                          className="w-full min-h-20 resize-none rounded-xl border border-borderColor bg-light px-3 py-2 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                          placeholder="Add private notes about this candidate..."
                        />
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setCandidateComments((prev) => ({ ...prev, [applicant.id]: commentDraft }));
                              setEditingComment(null);
                            }}
                            className="flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-white hover:bg-primary/95"
                          >
                            <Save size={12} /> Save Note
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingComment(null)}
                            className="rounded-lg border border-borderColor px-3 py-1.5 text-xs font-bold text-slate-500 hover:bg-light"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-3">
                        {candidateComments[applicant.id] ? (
                          <div className="flex-1 rounded-xl bg-light px-3 py-2 text-sm text-slate-600">
                            <p className="mb-1 text-xs font-bold text-slate-500">Note:</p>
                            {candidateComments[applicant.id]}
                          </div>
                        ) : (
                          <p className="text-xs italic text-slate-400">No notes added yet.</p>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            setCommentDraft(candidateComments[applicant.id] || "");
                            setEditingComment(applicant.id);
                          }}
                          className="flex shrink-0 items-center gap-1 rounded-lg border border-borderColor px-3 py-1.5 text-xs font-bold text-primary hover:bg-light"
                        >
                          <MessageSquare size={12} />
                          {candidateComments[applicant.id] ? "Edit Note" : "Add Note"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SchoolSavedCandidates;
