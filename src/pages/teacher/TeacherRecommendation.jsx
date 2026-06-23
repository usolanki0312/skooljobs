import { useOutletContext } from "react-router-dom";
import TeacherJobCard from "../../components/TeacherJobCard";
import styles from "./styles/TeacherRecommendation.module.css";

const TeacherRecommendation = () => {
  const { appliedJobs, savedJobs, recommendedJobs, handleApply, handleSave } = useOutletContext();

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Resume Based Recommendation</h2>
      <div className={styles.grid}>
        {recommendedJobs.length === 0 ? (
          <p className={styles.emptyMessage}>No recommendations for this resume yet.</p>
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
