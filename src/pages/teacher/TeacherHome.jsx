import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Button } from "@cloudstrytech/ui-components";
import {
  Bookmark,
  CheckCircle2,
  Calendar,
  Send,
  GraduationCap,
  ChevronRight,
  Star,
  X,
  Bell,
} from "lucide-react";
import { formatRelativeTime } from "../../lib/teacherdata";
import styles from "./styles/TeacherHome.module.css";

const TeacherHome = () => {
  const navigate = useNavigate();
  const {
    appliedJobs,
    savedJobs,
    activities,
    profileImage,
    displayName,
    recommendedJobs,
    handleApply,
    handleSave,
  } = useOutletContext();

  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, msg: "Shortlisted for Math Teacher interview at Sunrise Public School", time: "2h ago", read: false },
    { id: 2, msg: "New job matching your profile: English Teacher at Som Lalit School", time: "5h ago", read: false },
    { id: 3, msg: "Your application for Science Teacher was viewed by Green Valley School", time: "1d ago", read: true },
    { id: 4, msg: "Welcome to SkoolJobs! Complete your profile to reach 100%", time: "3d ago", read: true },
  ]);

  const handleMarkRead = (id) => {
    setNotifications((p) => p.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const handleDeleteNotification = (id) => {
    setNotifications((p) => p.filter((n) => n.id !== id));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const notificationDropdown = showNotifDropdown && (
    <div className={styles.notifDropdown}>
      <div className={styles.notifHeader}>
        <p className={styles.notifTitle}>
          Notifications {unreadCount > 0 && <span className={styles.notifUnreadCount}>({unreadCount} new)</span>}
        </p>
        <div className={styles.notifHeaderActions}>
          <button
            type="button"
            onClick={() =>
              setNotifications((p) =>
                p.map((n) => ({ ...n, read: true }))
              )
            }
            className={styles.notifMarkReadButton}
          >
            Mark all read
          </button>
          <button
            type="button"
            onClick={() => setShowNotifDropdown(false)}
            className={styles.notifCloseButton}
          >
            <X size={14} />
          </button>
        </div>
      </div>
      <div className={styles.notifList}>
        {notifications.length === 0 ? (
          <p className={styles.notifEmpty}>No notifications</p>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => handleMarkRead(n.id)}
              className={n.read ? styles.notifItem : styles.notifItemUnread}
            >
              <span className={n.read ? styles.notifDot : styles.notifDotUnread} />
              <div className={styles.notifBody}>
                <p className={styles.notifMsg}>{n.msg}</p>
                <p className={styles.notifTime}>{n.time}</p>
              </div>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); handleDeleteNotification(n.id); }}
                className={styles.notifDeleteButton}
              >
                <X size={13} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className={styles.page}>
      {/* 1. Header Welcome Card */}
      <div className={styles.welcomeCard}>
        <div>
          <p className={styles.welcomeEyebrow}>
            Welcome Back, {displayName.toUpperCase()}
          </p>
          <h2 className={styles.welcomeTitle}>
            Teacher Dashboard
          </h2>
          <p className={styles.welcomeSubtitle}>
            Find your next teaching opportunity today.
          </p>
        </div>

        <div className={styles.welcomeRightCol}>
          {/* Action Icons */}
          <div className={styles.actionIconsRow}>
            <div className={styles.notifButtonWrap}>
              <button
                className={styles.notifBellButton}
                type="button"
                onClick={() => setShowNotifDropdown((v) => !v)}
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className={styles.notifBadge}>
                    {unreadCount}
                  </span>
                )}
              </button>
              {notificationDropdown}
            </div>
          </div>

          {/* Profile Strength progress tracker */}
          <div className={styles.profileStrengthWrap}>
            <div className={styles.profileStrengthRow}>
              <span className={styles.profileStrengthPercent}>86% Complete</span>
              <span className={styles.profileStrengthLabel}>Profile Strength</span>
            </div>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: "86%" }} />
            </div>
            <p className={styles.profileStrengthHint}>
              ⚡ Complete your profile to reach 100%
            </p>
          </div>
        </div>
      </div>

      {/* 2. Metrics Section (3 cards instead of 4) */}
      <div className={styles.metricsGrid}>
        {/* Card 1: Applications Sent */}
        <button
          type="button"
          onClick={() => navigate("/teacher/applications")}
          className={styles.metricCard}
        >
          <div className={styles.metricHeaderRow}>
            <span className={styles.metricLabel}>
              Applications Sent
            </span>
            <span className={styles.metricIconBadgeGreen}>
              <Send size={18} />
            </span>
          </div>
          <p className={styles.metricValue}>
            {appliedJobs.length}
          </p>
          <p className={styles.metricFootnoteGreen}>
            +12% Sent this week
          </p>
        </button>

        {/* Card 2: Interviews */}
        <button
          type="button"
          onClick={() => navigate("/teacher/interviews")}
          className={styles.metricCard}
        >
          <div className={styles.metricHeaderRow}>
            <span className={styles.metricLabel}>
              Interviews Scheduled
            </span>
            <span className={styles.metricIconBadgeBlue}>
              <Calendar size={18} />
            </span>
          </div>
          <p className={styles.metricValue}>03</p>
          <p className={styles.metricFootnoteBlue}>
            Next: Tomorrow, 10:00 AM
          </p>
        </button>

        {/* Card 3: Saved Jobs */}
        <button
          type="button"
          onClick={() => navigate("/teacher/saved-jobs")}
          className={styles.metricCard}
        >
          <div className={styles.metricHeaderRow}>
            <span className={styles.metricLabel}>
              Saved Jobs
            </span>
            <span className={styles.metricIconBadgeAmber}>
              <Bookmark size={18} />
            </span>
          </div>
          <p className={styles.metricValue}>
            {savedJobs.length}
          </p>
          <p className={styles.metricFootnoteSlate}>
            Across 12 categories
          </p>
        </button>
      </div>

      {/* 3. Two-Column Dashboard Layout (Left: Job recommendation + Activity, Right: Upcoming Interview Card) */}
      <div className={styles.dashboardGrid}>
        {/* Left Column: Occupies 2/3 width */}
        <div className={styles.leftColumn}>
          {/* Recommended Jobs */}
          <section className={styles.panel}>
            <div className={styles.panelHeaderRow}>
              <h2 className={styles.panelTitle}>
                Recommended Jobs
              </h2>
              <button
                onClick={() => navigate("/teacher/recommendation")}
                className={styles.viewAllButton}
                type="button"
              >
                View all
              </button>
            </div>

            <div className={styles.jobListWrap}>
              {recommendedJobs.length === 0 ? (
                <p className={styles.jobListEmpty}>
                  No recommended jobs found. Update your profile skills to match listings.
                </p>
              ) : (
                recommendedJobs.map((job) => {
                  const isApplied = appliedJobs.some((item) => item.id === job.id);
                  const isSaved = savedJobs.some((item) => item.id === job.id);

                  const handleRowClick = (e) => {
                    if (e.target.closest("button")) return;
                    navigate(`/teacher/jobs/${job.id}`);
                  };

                  return (
                    <div
                      key={job.id}
                      onClick={handleRowClick}
                      className={styles.jobRow}
                    >
                      <div className={styles.jobRowLeft}>
                        {/* School Icon Placeholder */}
                        <div className={styles.jobIconBadge}>
                          <GraduationCap size={22} />
                        </div>
                        <div className={styles.jobRowInfo}>
                          <h3 className={styles.jobRole}>
                            {job.role}
                          </h3>
                          <p className={styles.jobMeta}>
                            {job.school} · {job.location}
                          </p>
                          <div className={styles.jobTagsRow}>
                            <span>{job.type}</span>
                            <span>·</span>
                            <span>{job.skill}</span>
                            <span>·</span>
                            <span className={styles.jobSalary}>
                              {job.salary}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className={styles.jobRowRight}>
                        <span className={styles.matchBadge}>
                          {job.match || "95"}% Match
                        </span>
                        <div className={styles.jobActionsRow}>
                          <Button
                            variant={isApplied ? "success" : "filled"}
                            onClick={() => handleApply(job)}
                            className={isApplied ? styles.applyButtonApplied : styles.applyButton}
                          >
                            {isApplied ? "Applied" : "Apply"}
                          </Button>

                          <Button
                            variant={isSaved ? "success" : "outlined"}
                            onClick={() => handleSave(job)}
                            className={isSaved ? styles.saveButtonSaved : styles.saveButton}
                          >
                            {isSaved ? "Saved" : "Save"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>

          {/* Recent Activity */}
          <section className={styles.panelCompact}>
            <h3 className={styles.panelTitleSm}>
              Recent Activity
            </h3>
            <div className={styles.activityListWrap}>
              {activities.slice(0, 4).map((activity, index) => (
                <div
                  key={`${activity.message}-${index}`}
                  className={styles.activityRow}
                >
                  <span className={styles.activityDot} />
                  <div className={styles.activityBody}>
                    <span>{activity.message}</span>
                    <span className={styles.activityTime}>
                      {formatRelativeTime(activity.date)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Sticky Upcoming Interview Card */}
        <div className={styles.rightColumn}>
          {/* Upcoming Interview Card */}
          <section className={styles.panelCompact}>
            <div className={styles.interviewHeaderRow}>
              <h3 className={styles.interviewTitle}>
                Upcoming Interview
              </h3>
              <span className={styles.interviewIconBadge}>
                <Calendar size={18} />
              </span>
            </div>

            <div className={styles.interviewDetailsBox}>
              <p className={styles.interviewDetailsTitle}>
                Math Teacher Interview @ Sunrise Public School
              </p>
              <p className={styles.interviewDetailsTime}>
                Oct 24, 10:00 AM
              </p>
            </div>
            <Button
              variant="filled"
              onClick={() => navigate("/teacher/interviews")}
              endIcon="arrowForwardIcon"
            >
              View Interview Details
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TeacherHome;
