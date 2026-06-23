import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Bell, Filter } from "lucide-react";
import TeacherJobCard from "../../components/TeacherJobCard";
import Select from "../../components/ui/Select";
import styles from "./styles/TeacherAllJobs.module.css";



const TeacherAllJobs = () => {
  const { allJobs = [], appliedJobs, savedJobs, handleApply, handleSave } = useOutletContext();

  const [jobFilter, setJobFilter] = useState({ subject: "", type: "" });
  const [notifPrefs, setNotifPrefs] = useState({
    enabled: true, subjects: [], jobTitles: [], newInput: "",
  });

  const subjectOptions = [...new Set(allJobs.map((j) => j.skill))];
  const typeOptions = [...new Set(allJobs.map((j) => j.type))];

  const filteredJobs = allJobs.filter((job) => {
    if (jobFilter.subject && job.skill !== jobFilter.subject) return false;
    if (jobFilter.type && job.type !== jobFilter.type) return false;
    return true;
  });

  const twoYearsAgo = new Date();
  twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
  const appliedHistory = appliedJobs.filter(
    (j) => j.appliedDate && new Date(j.appliedDate) >= twoYearsAgo,
  );

  return (
    <div className={styles.page}>
      <section className={styles.section}>
        <div className={styles.headerRow}>
          <h2 className={styles.heading}>All Teaching Jobs</h2>
          <div className={styles.filterGroup}>
            <Filter size={16} className={styles.filterIcon} />
            <Select
              value={jobFilter.subject}
              onChange={(v) => setJobFilter((p) => ({ ...p, subject: v }))}
              placeholder="All Subjects"
              options={subjectOptions}
              className={styles.subjectSelect}
            />

            <Select
              value={jobFilter.type}
              onChange={(v) => setJobFilter((p) => ({ ...p, type: v }))}
              placeholder="All Types"
              options={typeOptions}
              className={styles.typeSelect}
            />
          </div>
        </div>
        <div className={styles.jobsGrid}>
          {filteredJobs.length === 0 ? (
            <p className={styles.emptyMessage}>No jobs match your filter.</p>
          ) : (
            filteredJobs.map((job) => (
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

      {appliedHistory.length > 0 && (
        <section className={styles.section}>
          <h3 className={styles.historyHeading}>Applied History (Last 2 Years)</h3>
          <p className={styles.historySubtext}>Your job applications from the past 2 years.</p>
          <div className={styles.historyList}>
            {appliedHistory.map((job) => (
              <div key={job.id} className={styles.historyRow}>
                <div className={styles.historyMain}>
                  <p className={styles.historyRole}>{job.role}</p>
                  <p className={styles.historyMeta}>{job.school} · {job.location}</p>
                </div>
                <div className={styles.historyStatusWrap}>
                  <span className={styles.appliedBadge}>Applied</span>
                  <p className={styles.appliedDate}>
                    {new Date(job.appliedDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className={styles.section}>
        <div className={styles.notifHeaderRow}>
          <span className={styles.notifIconBadge}><Bell size={19} /></span>
          <div>
            <h3 className={styles.notifTitle}>Job Notification Preferences</h3>
            <p className={styles.notifSubtext}>Get notified when similar jobs are posted.</p>
          </div>
        </div>
        <label className={styles.enableRow}>
          <input type="checkbox" checked={notifPrefs.enabled} onChange={(e) => setNotifPrefs((p) => ({ ...p, enabled: e.target.checked }))} className={styles.enableCheckbox} />
          <span className={styles.enableLabel}>Enable job notifications</span>
        </label>
        {notifPrefs.enabled && (
          <div className={styles.prefsWrap}>
            <div>
              <p className={styles.fieldLabel}>Notify me for these subjects</p>
              <div className={styles.subjectPillRow}>
                {subjectOptions.map((s) => {
                  const active = notifPrefs.subjects.includes(s);
                  return (
                    <button key={s} type="button"
                      onClick={() => setNotifPrefs((p) => ({ ...p, subjects: active ? p.subjects.filter((x) => x !== s) : [...p.subjects, s] }))}
                      className={active ? styles.subjectPillActive : styles.subjectPill}>
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <p className={styles.fieldLabel}>Custom job title alerts</p>
              <input
                value={notifPrefs.newInput}
                onChange={(e) =>
                  setNotifPrefs((p) => ({
                    ...p,
                    newInput: e.target.value,
                  }))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" && notifPrefs.newInput.trim()) {
                    setNotifPrefs((p) => ({
                      ...p,
                      jobTitles: [...p.jobTitles, p.newInput.trim()],
                      newInput: "",
                    }));
                  }
                }}
                placeholder="e.g. Science Teacher (press Enter)"
                className={styles.jobTitleInput}
              />
              {notifPrefs.jobTitles.length > 0 && (
                <div className={styles.titleTagRow}>
                  {notifPrefs.jobTitles.map((title) => (
                    <span key={title} className={styles.titleTag}>
                      {title}
                      <button type="button" onClick={() => setNotifPrefs((p) => ({ ...p, jobTitles: p.jobTitles.filter((t) => t !== title) }))} className={styles.titleTagRemove}>×</button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default TeacherAllJobs;
