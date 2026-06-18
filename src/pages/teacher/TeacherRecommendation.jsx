import { useOutletContext } from "react-router-dom";
import TeacherJobCard from "../../components/TeacherJobCard";

const TeacherRecommendation = () => {
  const { appliedJobs, savedJobs, recommendedJobs, handleApply, handleSave } = useOutletContext();

  return (
    <section className="rounded-3xl bg-white p-5 shadow-soft sm:p-6">
      <h2 className="text-2xl font-bold text-primary sm:text-3xl">Resume Based Recommendation</h2>
      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {recommendedJobs.length === 0 ? (
          <p className="rounded-2xl bg-light p-5 text-sm text-slate-500">No recommendations for this resume yet.</p>
        ) : (
          recommendedJobs.map((job) => (
            <TeacherJobCard
              key={job.id}
              job={job}
              appliedJobs={appliedJobs}
              savedJobs={savedJobs}
              onApply={handleApply}
              onSave={handleSave}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default TeacherRecommendation;
