import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Briefcase,
  Building2,
  CheckCircle2,
  Clock,
  ThumbsUp,
  XCircle,
} from "lucide-react";
import { Button } from "@cloudstrytech/ui-components";
import managejobsOptions from "../../../dropdown/School_module/managejobs.json";
import { toOptions } from "../../lib/selectOptions";
import SelectOrOther from "../../components/ui/SelectOrOther";
import styles from "./styles/AdminDashboard.module.css";

const rejectionReasonOptions = toOptions(managejobsOptions.Rejection_reason);
const OTHER_VALUE = "Other";

const AdminDashboard = () => {
  const { jobs, setJobs } = useOutletContext();

  const [rejectingId, setRejectingId] = useState(null);
  const [reasonChoice, setReasonChoice] = useState("");
  const [reasonOther, setReasonOther] = useState("");

  const schools = new Set(jobs.map((j) => j.schoolName).filter(Boolean));
  const pendingJobs = jobs
    .filter((j) => j.status === "Pending Approval")
    .sort((a, b) => a.id - b.id);
  const approvedCount = jobs.filter((j) => j.status === "Approved").length;
  const liveCount = jobs.filter(
    (j) => j.status === "Active" || j.status === "Scheduled",
  ).length;
  const rejectedCount = jobs.filter((j) => j.status === "Rejected").length;

  const stats = [
    {
      label: "Schools",
      value: schools.size,
      sub: "submitted at least one job",
      color: styles.colorPrimary,
      iconBg: styles.iconBgPrimary,
      icon: Building2,
    },
    {
      label: "Total Jobs",
      value: jobs.length,
      sub: "all statuses",
      color: styles.colorBlue,
      iconBg: styles.iconBgBlue,
      icon: Briefcase,
    },
    {
      label: "Pending Approval",
      value: pendingJobs.length,
      sub: "needs your review",
      color: styles.colorGold,
      iconBg: styles.iconBgGold,
      icon: Clock,
    },
    {
      label: "Approved",
      value: approvedCount,
      sub: "waiting on school to publish",
      color: styles.colorTeal,
      iconBg: styles.iconBgTeal,
      icon: ThumbsUp,
    },
    {
      label: "Live",
      value: liveCount,
      sub: "visible to teachers",
      color: styles.colorGreen,
      iconBg: styles.iconBgGreen,
      icon: CheckCircle2,
    },
    {
      label: "Rejected",
      value: rejectedCount,
      sub: "sent back with a reason",
      color: styles.colorRust,
      iconBg: styles.iconBgRust,
      icon: XCircle,
    },
  ];

  const approveJob = (id) => {
    setJobs((prev) =>
      prev.map((j) =>
        j.id === id ? { ...j, status: "Approved", rejectionReason: "" } : j,
      ),
    );
  };

  const startReject = (id) => {
    setRejectingId(id);
    setReasonChoice("");
    setReasonOther("");
  };

  const confirmReject = (id) => {
    const reason =
      reasonChoice === OTHER_VALUE ? reasonOther.trim() : reasonChoice;
    if (!reason) {
      alert("Select or enter a reason for rejecting this job.");
      return;
    }
    setJobs((prev) =>
      prev.map((j) =>
        j.id === id ? { ...j, status: "Rejected", rejectionReason: reason } : j,
      ),
    );
    setRejectingId(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>Job Approval Dashboard</h2>
        <p className={styles.pageSubtitle}>
          Every job a school submits lands here first. Nothing reaches
          teachers until you approve it — and even then, the school takes the
          final "Publish" step.
        </p>
      </div>

      <div className={styles.statsGrid}>
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className={styles.statCard}>
              <div className={styles.statTop}>
                <p className={styles.statLabel}>{stat.label}</p>
                <div className={`${styles.statIconWrap} ${stat.iconBg}`}>
                  <Icon size={18} className={stat.color} />
                </div>
              </div>
              <p className={styles.statValue}>{stat.value}</p>
              <p className={styles.statSub}>{stat.sub}</p>
            </div>
          );
        })}
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHead}>
          <h3 className={styles.sectionTitle}>
            Pending approval — {pendingJobs.length}
          </h3>
          <span className={styles.hint}>Oldest first</span>
        </div>

        {pendingJobs.length === 0 ? (
          <p className={styles.emptyText}>Nothing waiting on review right now.</p>
        ) : (
          <div className={styles.queue}>
            {pendingJobs.map((job) => (
              <div key={job.id} className={styles.jobCard}>
                <div className={styles.jobMain}>
                  <div className={styles.jobTitleRow}>
                    <h4 className={styles.jobTitle}>{job.title}</h4>
                    <span className={`${styles.chip} ${styles.chipPending}`}>
                      Pending
                    </span>
                  </div>
                  <div className={styles.jobMeta}>
                    <span className={styles.schoolTag}>{job.schoolName}</span>
                    <span className={styles.dot}>·</span>
                    <span>{job.location || "Location not set"}</span>
                    <span className={styles.dot}>·</span>
                    <span>{job.employmentType}</span>
                    <span className={styles.dot}>·</span>
                    <span>Submitted {job.date}</span>
                  </div>
                </div>

                <div className={styles.jobActions}>
                  <Button variant="filled" onClick={() => approveJob(job.id)}>
                    Approve
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      rejectingId === job.id ? setRejectingId(null) : startReject(job.id)
                    }
                  >
                    Reject
                  </Button>
                </div>

                {rejectingId === job.id && (
                  <div className={styles.rejectComposer}>
                    <p className={styles.rejectComposerLabel}>
                      Reason for rejection — visible to the school
                    </p>
                    <SelectOrOther
                      value={reasonChoice}
                      onChange={setReasonChoice}
                      placeholder="Select a reason"
                      options={rejectionReasonOptions}
                      otherValue={reasonOther}
                      onOtherChange={setReasonOther}
                      otherPlaceholder="Describe the reason"
                    />
                    <div className={styles.rejectComposerActions}>
                      <Button
                        variant="filled"
                        onClick={() => confirmReject(job.id)}
                      >
                        Confirm Rejection
                      </Button>
                      <Button variant="text" onClick={() => setRejectingId(null)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
