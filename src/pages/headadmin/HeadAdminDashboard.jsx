import { useNavigate, useOutletContext } from "react-router-dom";
import {
  Building2,
  CheckCircle2,
  Clock,
  PlusCircle,
  ThumbsUp,
  XCircle,
} from "lucide-react";
import { Button } from "@cloudstrytech/ui-components";
import styles from "./styles/HeadAdminDashboard.module.css";

const HeadAdminDashboard = () => {
  const navigate = useNavigate();
  const { myJobs, managedSchools } = useOutletContext();

  const pendingCount = myJobs.filter((j) => j.status === "Pending Approval").length;
  const approvedCount = myJobs.filter((j) => j.status === "Approved").length;
  const liveCount = myJobs.filter(
    (j) => j.status === "Active" || j.status === "Scheduled",
  ).length;
  const rejectedCount = myJobs.filter((j) => j.status === "Rejected").length;

  const stats = [
    {
      label: "Schools Managed",
      value: managedSchools.length,
      sub: "under this account",
      color: styles.colorPrimary,
      iconBg: styles.iconBgPrimary,
      icon: Building2,
    },
    {
      label: "Total Jobs",
      value: myJobs.length,
      sub: "across all schools",
      color: styles.colorBlue,
      iconBg: styles.iconBgBlue,
      icon: Building2,
    },
    {
      label: "Sent to SkoolJobs",
      value: pendingCount,
      sub: "awaiting platform review",
      color: styles.colorGold,
      iconBg: styles.iconBgGold,
      icon: Clock,
    },
    {
      label: "Approved",
      value: approvedCount,
      sub: "ready — needs your Publish",
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
      sub: "see reason on each job",
      color: styles.colorRust,
      iconBg: styles.iconBgRust,
      icon: XCircle,
    },
  ];

  const schoolBreakdown = managedSchools.map((name) => {
    const schoolJobs = myJobs.filter((j) => j.schoolName === name);
    return {
      name,
      pending: schoolJobs.filter((j) => j.status === "Pending Approval").length,
      approved: schoolJobs.filter((j) => j.status === "Approved").length,
      live: schoolJobs.filter(
        (j) => j.status === "Active" || j.status === "Scheduled",
      ).length,
      rejected: schoolJobs.filter((j) => j.status === "Rejected").length,
    };
  });

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.pageTitle}>Head Admin Dashboard</h2>
          <p className={styles.pageSubtitle}>
            One login, {managedSchools.length} schools. Every job you submit
            goes to SkoolJobs for review — once approved, you publish it from
            here.
          </p>
        </div>
        <Button
          variant="filled"
          onClick={() => navigate("/head-admin/post-job")}
          startIcon={<PlusCircle size={16} />}
        >
          Post New Job
        </Button>
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
        <h3 className={styles.sectionTitle}>Jobs by school</h3>
        <div className={styles.tableWrap}>
          <div className={styles.tableScroll}>
            <table className={styles.table}>
              <thead className={styles.tableHead}>
                <tr>
                  <th className={styles.th}>School</th>
                  <th className={styles.th}>Sent to SkoolJobs</th>
                  <th className={styles.th}>Approved</th>
                  <th className={styles.th}>Live</th>
                  <th className={styles.th}>Rejected</th>
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                {schoolBreakdown.map((s) => (
                  <tr key={s.name}>
                    <td className={styles.td}>{s.name}</td>
                    <td className={styles.tdMuted}>{s.pending}</td>
                    <td className={styles.tdMuted}>{s.approved}</td>
                    <td className={styles.tdMuted}>{s.live}</td>
                    <td className={styles.tdMuted}>{s.rejected}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadAdminDashboard;
