import { useState } from "react";
import { Calendar, Clock, MapPin, Video, Clipboard, CheckCircle, XCircle } from "lucide-react";

const initialTeacherInterviews = [
  {
    id: 1,
    role: "Math Teacher",
    school: "Sunrise Public School",
    date: "2026-06-06",
    time: "10:00 AM",
    mode: "Online",
    round: "1st Round (Technical)",
    status: "Scheduled",
    notes: "Interview will cover algebra, calculus curriculum design, and mock classroom demo. Please join the link 5 mins early.",
    link: "https://zoom.us/j/1234567890",
  },
  {
    id: 2,
    role: "Science Teacher",
    school: "Green Valley School",
    date: "2026-06-12",
    time: "02:00 PM",
    mode: "In-Person",
    round: "Final Interview",
    status: "Scheduled",
    notes: "Management round. Please carry printed copies of your B.Ed certificates, resume, and experience letters to the school front desk.",
    location: "Sector 12, Kolar Road, Bhopal",
  },
  {
    id: 3,
    role: "English Teacher",
    school: "EduHire Recruiters",
    date: "2026-05-28",
    time: "11:30 AM",
    mode: "Online",
    round: "HR Screening",
    status: "Completed",
    notes: "Basic communication and background screening.",
  },
];

const TeacherInterviews = () => {
  const [interviews, setInterviews] = useState(() => {
    const saved = localStorage.getItem("skooljobs_teacher_interviews");
    return saved ? JSON.parse(saved) : initialTeacherInterviews;
  });

  const [activeTab, setActiveTab] = useState("upcoming");

  const saveInterviews = (data) => {
    setInterviews(data);
    localStorage.setItem("skooljobs_teacher_interviews", JSON.stringify(data));
  };

  const handleCopyDetails = (iv) => {
    const text = iv.mode === "Online" 
      ? `Interview for ${iv.role} at ${iv.school}\nDate: ${iv.date} at ${iv.time}\nMode: Online (Zoom: ${iv.link})`
      : `Interview for ${iv.role} at ${iv.school}\nDate: ${iv.date} at ${iv.time}\nMode: In-Person\nLocation: ${iv.location}`;
    navigator.clipboard.writeText(text);
    alert("Interview invitation details copied to clipboard!");
  };

  const handleRequestReschedule = (id) => {
    const newDate = prompt("Enter preferred date (e.g. YYYY-MM-DD):");
    const newTime = prompt("Enter preferred time (e.g. HH:MM AM/PM):");
    if (newDate && newTime) {
      alert(`Reschedule request submitted for ${newDate} at ${newTime}. The school recruiter will review your request.`);
      const updated = interviews.map(iv => iv.id === id ? { ...iv, status: "Reschedule Requested" } : iv);
      saveInterviews(updated);
    }
  };

  const upcomingInterviews = interviews.filter(iv => iv.status !== "Completed" && iv.status !== "Cancelled");
  const pastInterviews = interviews.filter(iv => iv.status === "Completed" || iv.status === "Cancelled");

  const activeInterviews = activeTab === "upcoming" ? upcomingInterviews : pastInterviews;

  return (
    <section className="rounded-3xl bg-white p-6 shadow-soft space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-borderColor pb-5">
        <div>
          <h2 className="text-2xl font-bold text-primary">Interviews</h2>
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
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{iv.role}</h3>
                  <p className="text-sm font-semibold text-primary">{iv.school}</p>
                  
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
                          <span className="text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-md">Online</span>
                        </>
                      ) : (
                        <>
                          <MapPin size={14} className="text-orange-500" />
                          <span className="text-orange-600 font-bold bg-orange-50 px-2 py-0.5 rounded-md">In-Person</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:items-end">
                  <span className={`rounded-full px-3 py-1 text-xs font-bold self-start sm:self-auto ${
                    iv.status === "Scheduled" ? "bg-blue-50 text-blue-600" :
                    iv.status === "Reschedule Requested" ? "bg-amber-50 text-amber-600" :
                    iv.status === "Completed" ? "bg-green-50 text-green-600" :
                    "bg-red-50 text-red-600"
                  }`}>
                    {iv.status}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">{iv.round}</span>
                </div>
              </div>

              {iv.notes && (
                <div className="rounded-xl bg-light p-4 text-xs text-slate-600 leading-relaxed border border-borderColor/60">
                  <p className="font-bold text-slate-700 mb-1">Recruiter Notes:</p>
                  <p>{iv.notes}</p>
                  {iv.mode === "Online" && iv.link && (
                    <div className="mt-2 text-primary font-bold break-all">
                      Meeting Link: <a href={iv.link} target="_blank" rel="noopener noreferrer" className="hover:underline">{iv.link}</a>
                    </div>
                  )}
                  {iv.mode === "In-Person" && iv.location && (
                    <div className="mt-2 text-slate-700 font-bold">
                      Location: <span className="font-semibold text-slate-600">{iv.location}</span>
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
                  <button
                    type="button"
                    onClick={() => handleRequestReschedule(iv.id)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-amber-200 hover:bg-amber-50 px-4 py-2 text-xs font-bold text-amber-600 transition"
                  >
                    Request Reschedule
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
