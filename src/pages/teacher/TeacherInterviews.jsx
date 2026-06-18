import { useState } from "react";
import { Calendar, Clock, MapPin, Video, Clipboard } from "lucide-react";

const TeacherInterviews = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const teacherProfile = JSON.parse(
    localStorage.getItem("skooljobs_teacher_data") || "{}",
  );
  const candidateName =
    `${teacherProfile.firstName || currentUser.firstName || "Rahul"} ${teacherProfile.lastName || currentUser.lastName || "Sharma"}`.trim();

  const [interviews, setInterviews] = useState(() => {
    const saved = localStorage.getItem("skooljobs_interviews");
    return saved ? JSON.parse(saved) : [];
  });

  const [activeTab, setActiveTab] = useState("upcoming");

  const handleCopyDetails = (iv) => {
    const roleName = iv.role || iv.jobTitle || "Teacher";
    const schoolName = iv.school || "School";
    const meetingLink = iv.link || iv.meetingLink || "";
    const text =
      iv.mode === "Online"
        ? `Interview for ${roleName} at ${schoolName}\nDate: ${iv.date} at ${iv.time}\nMode: Online (Zoom: ${meetingLink})`
        : `Interview for ${roleName} at ${schoolName}\nDate: ${iv.date} at ${iv.time}\nMode: In-Person\nLocation: ${iv.location}`;
    navigator.clipboard.writeText(text);
    alert("Interview invitation details copied to clipboard!");
  };

  const myInterviews = interviews.filter(
    (iv) =>
      String(iv.candidateId) === String(currentUser.id) ||
      iv.candidateName?.toLowerCase() === candidateName.toLowerCase(),
  );

  const upcomingInterviews = myInterviews.filter(
    (iv) => iv.status !== "Completed" && iv.status !== "Cancelled",
  );
  const pastInterviews = myInterviews.filter(
    (iv) => iv.status === "Completed" || iv.status === "Cancelled",
  );

  const activeInterviews =
    activeTab === "upcoming" ? upcomingInterviews : pastInterviews;

  return (
    <section className="rounded-3xl bg-white p-5 shadow-soft sm:p-6 space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-borderColor pb-5">
        <div>
          <h2 className="text-2xl font-bold text-primary sm:text-3xl">Interviews</h2>
          <p className="mt-1 text-sm text-slate-500">
            Track your scheduled interviews and communicate with recruiters.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex rounded-xl bg-light p-1 self-start">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
              activeTab === "upcoming"
                ? "bg-white text-primary shadow-sm"
                : "text-slate-500 hover:text-primary"
            }`}
          >
            Upcoming ({upcomingInterviews.length})
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
              activeTab === "past"
                ? "bg-white text-primary shadow-sm"
                : "text-slate-500 hover:text-primary"
            }`}
          >
            Past ({pastInterviews.length})
          </button>
        </div>
      </div>

      {activeInterviews.length === 0 ? (
        <p className="py-12 text-center text-sm text-slate-400">
          No {activeTab} interviews scheduled.
        </p>
      ) : (
        <div className="space-y-4">
          {activeInterviews.map((iv) => (
            <div
              key={iv.id}
              className="rounded-2xl border border-borderColor bg-white p-5 shadow-sm space-y-4 hover:shadow-soft transition"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <h3 className="break-words text-lg font-bold text-slate-800">
                    {iv.role || iv.jobTitle}
                  </h3>
                  <p className="break-words text-sm font-semibold text-primary">
                    {iv.school || "School"}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Calendar size={14} className="text-slate-400" />
                      {iv.date}
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <Clock size={14} className="text-slate-400" />
                      {iv.time}
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      {iv.mode === "Online" ? (
                        <>
                          <Video size={14} className="text-blue-500" />
                          <span className="text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-md">
                            Online
                          </span>
                        </>
                      ) : (
                        <>
                          <MapPin size={14} className="text-orange-500" />
                          <span className="text-orange-600 font-bold bg-orange-50 px-2 py-0.5 rounded-md">
                            In-Person
                          </span>
                        </>
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:items-end">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold self-start sm:self-auto ${
                      iv.status === "Scheduled"
                        ? "bg-blue-50 text-blue-600"
                        : iv.status === "Completed"
                          ? "bg-green-50 text-green-600"
                          : "bg-red-50 text-red-600"
                    }`}
                  >
                    {iv.status}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    {iv.round}
                  </span>
                </div>
              </div>

              {(iv.notes || iv.notesForCandidate) && (
                <div className="rounded-xl bg-light p-4 text-xs text-slate-600 leading-relaxed border border-borderColor/60">
                  <p className="font-bold text-slate-700 mb-1">
                    Recruiter Notes:
                  </p>
                  <p>{iv.notes || iv.notesForCandidate}</p>
                  {iv.mode === "Online" && (iv.link || iv.meetingLink) && (
                    <div className="mt-2 text-primary font-bold break-all">
                      Meeting Link:{" "}
                      <a
                        href={iv.link || iv.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {iv.link || iv.meetingLink}
                      </a>
                    </div>
                  )}
                  {iv.mode === "In-Person" && iv.location && (
                    <div className="mt-2 text-slate-700 font-bold">
                      Location:{" "}
                      <span className="font-semibold text-slate-600">
                        {iv.location}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "upcoming" && (
                <div className="flex flex-wrap gap-2 pt-2 border-t border-borderColor/65">
                  <button
                    type="button"
                    onClick={() => handleCopyDetails(iv)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-borderColor hover:bg-slate-50 px-4 py-2 text-xs font-bold text-slate-600 transition"
                  >
                    <Clipboard size={14} /> Copy Invite Details
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TeacherInterviews;
