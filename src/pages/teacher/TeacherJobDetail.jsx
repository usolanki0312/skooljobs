import { useMemo } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { Building2 } from "lucide-react";
import SharedJobDetail from "../../components/SharedJobDetail";
import styles from "./styles/TeacherJobDetail.module.css";

const TeacherJobDetail = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const {
    allJobs = [],
    appliedJobs,
    savedJobs,
    handleApply,
    handleSave,
  } = useOutletContext();

  const job = useMemo(() => {
    return allJobs.find((j) => String(j.id) === String(jobId));
  }, [allJobs, jobId]);

  const isApplied = useMemo(() => {
    return appliedJobs.some((item) => String(item.id) === String(jobId));
  }, [appliedJobs, jobId]);

  const isSaved = useMemo(() => {
    return savedJobs.some((item) => String(item.id) === String(jobId));
  }, [savedJobs, jobId]);

  if (!job) {
    return (
      <div className={styles.notFoundWrapper}>
        <Building2 size={64} className={styles.notFoundIcon} />
        <h2 className={styles.notFoundTitle}>Job not found.</h2>
        <button
          type="button"
          onClick={() => navigate("/teacher/all-jobs")}
          className={styles.backButton}
        >
          Back to All Jobs
        </button>
      </div>
    );
  }

  return (
    <SharedJobDetail
      job={job}
      isApplied={isApplied}
      isSaved={isSaved}
      onApply={() => handleApply(job)}
      onSave={() => handleSave(job)}
      onBack={() => navigate(-1)}
      showSaveButton={true}
      showMatch={true}
    />
  );
};

export default TeacherJobDetail;
