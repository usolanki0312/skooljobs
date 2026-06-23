
import { useNavigate, useOutletContext } from "react-router-dom";
import { Calendar, CheckSquare, Clock } from "lucide-react";
import styles from "./styles/SchoolHome.module.css";
import { Button } from "@cloudstrytech/ui-components";

const SchoolHome = () => {
  const navigate = useNavigate();
  const { jobs, applicants, interviews } = useOutletContext();

  const scheduledInterviews = interviews.filter(
    (iv) => iv.status !== "Cancelled",
  );

  const shortlistedApplicants = applicants.filter(
    (a) => a.status === "Shortlisted",
  );

  const stats = [
    {
      label: "Posted Jobs",
      value: jobs.filter((j) => j.status === "Active").length,
      sub: "In Job board",
      color: styles.colorPrimary,
      to: "/school/manage-jobs",
    },
    {
      label: "Viewed CVs",
      value: 0,
      sub: "CVs against opportunities",
      color: styles.colorGreen,
    },
    {
      label: "Saved Candidates",
      value: shortlistedApplicants.length,
      sub: "Manually saved candidates",
      color: styles.colorOrange,
      to: "/school/saved-candidates",
    },
    {
      label: "Shortlisted",
      value: shortlistedApplicants.length,
      sub: "Shortlisted for interview",
      color: styles.colorBlue,
      to: "/school/all-applicants?status=Shortlisted",
    },
    {
      label: "Interviews Scheduled",
      value: scheduledInterviews.length,
      sub: "Upcoming interviews",
      color: styles.colorPurple,
      to: "/school/interviews",
    },
    {
      label: "Offers Made",
      value: 1,
      sub: "Offer letters sent",
      color: styles.colorTeal,
    },
  ];

  const barData = [
    {
      label: "Posted Jobs",
      color: styles.barBgPrimary,
      val: jobs.filter((j) => j.status === "Active").length,
    },
    {
      label: "Saved",
      color: styles.barBgOrange,
      val: shortlistedApplicants.length,
    },
    {
      label: "Viewed CVs",
      color: styles.barBgGreen,
      val: 0,
    },
    {
      label: "Shortlisted",
      color: styles.barBgBlue,
      val: shortlistedApplicants.length,
    },
    {
      label: "Interviews",
      color: styles.barBgPurple,
      val: scheduledInterviews.length,
    },
    {
      label: "Offers",
      color: styles.barBgTeal,
      val: 1,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>Applications Statistics</h2>
      </div>

      <div className={styles.alertBanner}>
        <CheckSquare size={18} className={styles.alertIcon} />

        <p>
          Your account is active but, in order to post jobs, buy a plan at{" "}
          <button
            type="button"
            onClick={() => navigate("/school/packages")}
            className={styles.alertButton}
          >
            Plans
          </button>
        </p>
      </div>

      <div className={styles.statsGrid}>
        {stats.map((stat) => {
          const clickable = Boolean(stat.to);

          return (
            <div
              key={stat.label}
              role={clickable ? "button" : undefined}
              tabIndex={clickable ? 0 : undefined}
              onClick={clickable ? () => navigate(stat.to) : undefined}
              onKeyDown={
                clickable
                  ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      navigate(stat.to);
                    }
                  }
                  : undefined
              }
              className={`${styles.statCard} ${clickable ? styles.statCardClickable : ""
                }`}
            >
              <p className={styles.statLabel}>{stat.label}</p>

              <p className={`${styles.statValue} ${stat.color}`}>
                {stat.value}
              </p>

              <p className={styles.statSub}>{stat.sub}</p>
            </div>
          );
        })}
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.card}>
          <div className={styles.chart}>
            {barData.map((bar) => (
              <div key={bar.label} className={styles.chartItem}>
                <span className={styles.chartValue}>{bar.val}</span>

                <div
                  className={`${styles.chartBar} ${bar.color}`}
                  style={{ height: `${Math.max(bar.val * 20, 4)}px` }}
                />

                <span className={styles.chartLabel}>{bar.label}</span>
              </div>
            ))}
          </div>

          <p className={styles.chartSummary}>
            Posted: {jobs.filter((j) => j.status === "Active").length} ·
            Shortlisted: {shortlistedApplicants.length} · Interviews:{" "}
            {scheduledInterviews.length}
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.sectionHeader}>
            <Calendar size={18} className={styles.primaryIcon} />

            <h3 className={styles.sectionTitle}>Upcoming Interviews</h3>
          </div>

          {scheduledInterviews.length === 0 ? (
            <p className={styles.emptyText}>No interviews scheduled.</p>
          ) : (
            <div className={styles.interviewList}>
              {scheduledInterviews.map((iv) => (
                <div key={iv.id} className={styles.interviewCard}>
                  <p className={styles.candidateName}>{iv.candidateName}</p>

                  <p className={styles.interviewInfo}>
                    {iv.jobTitle} · {iv.round}
                  </p>

                  <div className={styles.interviewMeta}>
                    <span className={styles.metaItem}>
                      <Calendar size={11} /> {iv.date}
                    </span>

                    <span className={styles.metaItem}>
                      <Clock size={11} /> {iv.time}
                    </span>
                  </div>

                  <span
                    className={`${styles.statusBadge} ${iv.status === "Confirmed"
                      ? styles.statusConfirmed
                      : styles.statusPending
                      }`}
                  >
                    {iv.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          <Button
            type="button"
            variant="outlined"
            startIcon="plusIcon"
            onClick={() => navigate("/school/interviews")}
            className={styles.scheduleButton}
          >
            Schedule Interview
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SchoolHome;

