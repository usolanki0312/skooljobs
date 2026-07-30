import { Award, BriefcaseBusiness, GraduationCap, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/TeacherJobCard.module.css";
import { Button } from "@cloudstrytech/ui-components";

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
      className={styles.card}
    >
      <div className={styles.headerRow}>
        <div className={styles.titleGroup}>
          <div className={styles.iconBadge}>
            <GraduationCap size={25} />
          </div>
          <div className={styles.titleTextWrap}>
            <h3 className={styles.role}>{job.role}</h3>
            <p className={styles.school}>{job.school}</p>
          </div>
        </div>
        <span className={styles.matchBadge}>
          {job.match}% Match
        </span>
      </div>

      <div className={styles.infoGrid}>
        <span className={styles.infoItem}><MapPin size={16} /> {job.location}</span>
        <span className={styles.infoItem}><BriefcaseBusiness size={16} /> {job.type}</span>
        <span className={styles.infoItem}><Award size={16} /> {job.skill}</span>
        <span className={styles.salary}>{job.salary}</span>
      </div>

      <div className={styles.actionsRow}>
        <Button
          variant="filled"
          onClick={() => onApply(job)}
          className={isApplied ? styles.applyButtonApplied : styles.applyButton}
          startIcon="sendIcon"
        >
          {isApplied ? "Applied" : "Apply"}
        </Button>

        <Button
          variant="outlined"
          onClick={() => onSave(job)}
          className={isSaved ? styles.saveButtonSaved : styles.saveButton}
          startIcon="bookmarkIcon"
        >
          Interested
        </Button>
      </div>
    </div>
  );
};

export default TeacherJobCard;
