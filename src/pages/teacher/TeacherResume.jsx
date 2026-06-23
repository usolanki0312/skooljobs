import { useOutletContext } from "react-router-dom";
import { FileText } from "lucide-react";
import { Button } from "@cloudstrytech/ui-components";
import styles from "./styles/TeacherResume.module.css";

const TeacherResume = () => {
  const { resumes = [], selectedResume, setSelectedResume, addActivity } = useOutletContext();

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Resume Match Center</h2>
      <p className={styles.subtext}>Select a resume to update recommendations.</p>
      <div className={styles.grid}>
        {resumes.map((resume) => {
          const isSelected = selectedResume && String(selectedResume.id) === String(resume.id);
          const resumeName = resume.name || resume.title || "Custom Resume";
          const skillFocus = resume.skill || resume.currentJobTitle || "Teaching";

          return (
            <Button
              key={resume.id}
              type="button"
              onClick={() => {
                setSelectedResume(resume);
                addActivity(`Selected ${resumeName}`);
              }}
              className={isSelected ? styles.resumeCardSelected : styles.resumeCard}
            >
              <div className={styles.cardHeader}>
                <FileText size={26} />
                <span
                  className={isSelected ? styles.scoreBadgeSelected : styles.scoreBadge}
                >
                  {resume.score || 85}% Score
                </span>
              </div>

              <h3 className={styles.resumeName}>{resumeName}</h3>

              <p
                className={isSelected ? styles.skillFocusSelected : styles.skillFocus}
              >
                Skill focus: {skillFocus}
              </p>
            </Button>
          );
        })}
      </div>
    </section>
  );
};

export default TeacherResume;
