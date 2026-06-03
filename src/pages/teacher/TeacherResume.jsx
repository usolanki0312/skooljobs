import { useOutletContext } from "react-router-dom";
import { FileText } from "lucide-react";
import { resumesData } from "../../lib/teacherdata";

const TeacherResume = () => {
  const { selectedResume, setSelectedResume, addActivity } = useOutletContext();

  return (
    <section className="rounded-3xl bg-white p-6 shadow-soft">
      <h2 className="text-2xl font-bold text-primary">Resume Match Center</h2>
      <p className="mt-1 text-sm text-slate-500">Select a resume to update recommendations.</p>
      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {resumesData.map((resume) => {
          const isSelected = selectedResume.id === resume.id;
          return (
            <button
              key={resume.id}
              type="button"
              onClick={() => {
                setSelectedResume(resume);
                addActivity(`Selected ${resume.name}`);
              }}
              className={`rounded-3xl border p-5 text-left transition ${
                isSelected
                  ? "border-primary bg-primary text-white shadow-soft"
                  : "border-borderColor bg-white text-slate-700 hover:border-primary"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <FileText size={26} />
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${isSelected ? "bg-white/20" : "bg-primary/10 text-primary"}`}>
                  {resume.score}% Score
                </span>
              </div>
              <h3 className="mt-4 font-bold">{resume.name}</h3>
              <p className={`mt-2 text-sm ${isSelected ? "text-white/80" : "text-slate-500"}`}>
                Skill focus: {resume.skill}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default TeacherResume;
