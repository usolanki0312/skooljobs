import { Award, Bookmark, BriefcaseBusiness, GraduationCap, MapPin, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TeacherJobCard = ({ job, appliedJobs, savedJobs, onApply, onSave }) => {
  const navigate = useNavigate();
  const isApplied = appliedJobs.some((item) => item.id === job.id);
  const isSaved = savedJobs.some((item) => item.id === job.id);

  const handleCardClick = (e) => {
    if (e.target.closest("button")) return;
    navigate(`/teacher/jobs/${job.id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="rounded-3xl border border-borderColor bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft cursor-pointer"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <GraduationCap size={25} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary">{job.role}</h3>
            <p className="text-sm font-semibold text-slate-500">{job.school}</p>
          </div>
        </div>
        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-600">
          {job.match}% Match
        </span>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 text-sm text-slate-500 sm:grid-cols-2">
        <span className="flex items-center gap-2"><MapPin size={16} /> {job.location}</span>
        <span className="flex items-center gap-2"><BriefcaseBusiness size={16} /> {job.type}</span>
        <span className="flex items-center gap-2"><Award size={16} /> {job.skill}</span>
        <span className="font-bold text-primary">{job.salary}</span>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => onApply(job)}
          disabled={isApplied}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-white ${
            isApplied ? "bg-green-500" : "bg-primary hover:bg-primary/95"
          }`}
        >
          <Send size={16} /> {isApplied ? "Applied" : "Apply"}
        </button>
        <button
          type="button"
          onClick={() => onSave(job)}
          className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-bold ${
            isSaved
              ? "border-green-500 bg-green-500 text-white"
              : "border-primary text-primary hover:bg-primary/5"
          }`}
        >
          <Bookmark size={16} /> {isSaved ? "Saved" : "Save"}
        </button>
      </div>
    </div>
  );
};

export default TeacherJobCard;
