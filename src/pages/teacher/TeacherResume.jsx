import { useOutletContext } from "react-router-dom";
import { FileText } from "lucide-react";
import styles from "./styles/TeacherResume.module.css";

const TeacherResume = () => {
  const { resumes = [], setSelectedResume, addActivity } = useOutletContext();

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Resume Match Center</h2>
      <p className={styles.subtext}>Select a resume to update recommendations.</p>
      <div className={styles.grid}>
        {resumes.map((resume) => {
          const resumeName = resume.name || resume.title || "Custom Resume";
          const skillFocus = resume.skill || resume.currentJobTitle || "Teaching";

          return (
            <button
              key={resume.id}
              type="button"
              onClick={() => {
                setSelectedResume(resume);
                addActivity(`Selected ${resumeName}`);
              }}
              className={styles.resumeCard}
            >
              <div className={styles.cardHeader}>
                <FileText size={26} />
                <span className={styles.scoreBadge}>
                  {resume.score || 85}% Score
                </span>
              </div>

              <h3 className={styles.resumeName}>{resumeName}</h3>

              <p className={styles.skillFocus}>
                Skill focus: {skillFocus}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default TeacherResume;
