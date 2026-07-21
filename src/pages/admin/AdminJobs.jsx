import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Search } from "lucide-react";
import { Select } from "@cloudstrytech/ui-components";
import managejobsOptions from "../../../dropdown/School_module/managejobs.json";
import { toOptions } from "../../lib/selectOptions";
import styles from "./styles/AdminJobs.module.css";

const jobStatusOptions = toOptions(managejobsOptions.Job_status);

const statusChip = {
  Active: styles.statusActive,
  Scheduled: styles.statusScheduled,
  "Pending Approval": styles.statusPending,
  Approved: styles.statusApproved,
  Rejected: styles.statusRejected,
  Draft: styles.statusDraft,
  Paused: styles.statusPaused,
  Closed: styles.statusClosed,
};

const AdminJobs = () => {
  const { jobs } = useOutletContext();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredJobs = jobs
    .filter((j) => j.title.toLowerCase().includes(search.toLowerCase()))
    .filter((j) => !statusFilter || j.status === statusFilter);

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h2 className={styles.title}>All Jobs</h2>
        <p className={styles.subtitle}>
          Every job submitted by every school on the platform, in every status.
        </p>
      </div>

      <div className={styles.filterRow}>
        <div className={styles.searchBox}>
          <Search size={16} className={styles.searchIcon} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs..."
            className={styles.searchInput}
          />
        </div>
        <Select
          value={statusFilter}
          onChange={setStatusFilter}
          placeholder="All Status"
          options={jobStatusOptions}
        />
      </div>

      <div className={styles.tableWrap}>
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                <th className={styles.th}>Job Title</th>
                <th className={styles.th}>School</th>
                <th className={styles.th}>Location</th>
                <th className={styles.th}>Status</th>
                <th className={styles.th}>Submitted</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={5} className={styles.emptyCell}>
                    No jobs found.
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job) => (
                  <tr key={job.id} className={styles.row}>
                    <td className={styles.td}>
                      <p className={styles.tdTitle}>{job.title}</p>
                      {job.subject && (
                        <p className={styles.tdSubject}>{job.subject}</p>
                      )}
                    </td>
                    <td className={styles.tdMuted}>{job.schoolName || "—"}</td>
                    <td className={styles.tdMuted}>{job.location || "—"}</td>
                    <td className={styles.td}>
                      <span
                        className={`${styles.statusChip} ${statusChip[job.status] || styles.statusDefault
                          }`}
                      >
                        {job.status}
                      </span>
                      {job.status === "Rejected" && job.rejectionReason && (
                        <p className={styles.tdSubject} title={job.rejectionReason}>
                          {job.rejectionReason}
                        </p>
                      )}
                    </td>
                    <td className={styles.tdLight}>{job.date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
