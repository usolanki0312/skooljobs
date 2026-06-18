import { useOutletContext, useNavigate } from "react-router-dom";
import { Bookmark } from "lucide-react";
import TeacherJobCard from "../../components/TeacherJobCard";

const TeacherSavedJobs = () => {
  const { savedJobs, appliedJobs, handleApply, handleSave } = useOutletContext();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-white p-5 shadow-soft sm:p-6">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-primary font-heading sm:text-3xl">Saved &amp; Bookmarked Jobs</h2>
            <p className="text-sm text-slate-500 mt-1">
              Keep track of jobs you bookmarked. You can apply directly or remove them from this list.
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-bold text-primary self-start border border-primary/20">
            {savedJobs.length} saved
          </span>
        </div>

        {savedJobs.length === 0 ? (
          <div className="rounded-3xl bg-light py-12 px-5 text-center border border-dashed border-borderColor sm:py-16 sm:px-6">
            <Bookmark size={48} className="mx-auto mb-4 text-slate-300" />
            <h3 className="text-lg font-bold text-slate-700">No saved jobs yet</h3>
            <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">
              Explore available teaching positions and save them here by clicking the bookmark icon.
            </p>
            <button
              type="button"
              onClick={() => navigate("/teacher/all-jobs")}
              className="mt-6 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-md hover:bg-primary/95 transition duration-150 active:scale-[0.98]"
            >
              Explore All Jobs
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {savedJobs.map((job) => (
              <TeacherJobCard
                key={job.id}
                job={job}
                appliedJobs={appliedJobs}
                savedJobs={savedJobs}
                onApply={handleApply}
                onSave={handleSave}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default TeacherSavedJobs;
