import { useOutletContext, useNavigate } from "react-router-dom";
import { Bookmark } from "lucide-react";
import TeacherJobCard from "../../components/TeacherJobCard";
import styles from "./styles/TeacherSavedJobs.module.css";

const TeacherSavedJobs = () => {
  const { savedJobs, appliedJobs, handleApply, handleSave } = useOutletContext();
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <section className={styles.section}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.heading}>Saved &amp; Bookmarked Jobs</h2>
            <p className={styles.subtext}>
              Keep track of jobs you bookmarked. You can apply directly or remove them from this list.
            </p>
          </div>
          <span className={styles.countBadge}>
            {savedJobs.length} saved
          </span>
        </div>

        {savedJobs.length === 0 ? (
          <div className={styles.emptyState}>
            <Bookmark size={48} className={styles.emptyIcon} />
            <h3 className={styles.emptyTitle}>No saved jobs yet</h3>
            <p className={styles.emptyText}>
              Explore available teaching positions and save them here by clicking the bookmark icon.
            </p>
            <button
              type="button"
              onClick={() => navigate("/teacher/all-jobs")}
              className={styles.emptyButton}
            >
              Explore All Jobs
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
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
