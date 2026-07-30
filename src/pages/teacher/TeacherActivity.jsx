import { useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { formatRelativeTime } from "../../lib/teacherdata";
import styles from "./styles/TeacherActivity.module.css";

const TeacherActivity = () => {
  const { activities } = useOutletContext();

  const recentActivities = useMemo(() => {
    // eslint-disable-next-line react-hooks/purity -- window is anchored to "now" at render time by design (last-30-days display filter)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    return activities
      .filter((a) => new Date(a.date) >= thirtyDaysAgo)
      .slice(0, 10);
  }, [activities]);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.heading}>Recent Activity</h2>
          <p className={styles.subtext}>
            Jobs searched and applications submitted in the last 30 days (max 10 entries).
          </p>
        </div>
        <span className={styles.countBadge}>
          {recentActivities.length} / 10
        </span>
      </div>
      {recentActivities.length === 0 ? (
        <p className={styles.emptyMessage}>No activity in the last 30 days.</p>
      ) : (
        <div className={styles.list}>
          {recentActivities.map((activity, index) => (
            <div
              key={`${activity.message}-${index}`}
              className={styles.activityRow}
            >
              <div className={styles.activityMain}>
                <span className={styles.dot} />
                <span className={styles.activityMessage}>{activity.message}</span>
              </div>
              <span className={styles.activityTime}>{formatRelativeTime(activity.date)}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TeacherActivity;
