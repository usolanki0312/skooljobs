import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ChevronRight, PlusCircle, Search, Share2 } from "lucide-react";
import managejobsOptions from "../../../dropdown/School_module/managejobs.json";
import styles from "./styles/SchoolManageJobs.module.css";
import { Button, Select } from "@cloudstrytech/ui-components";
import { toOptions } from "../../lib/selectOptions";

const { Job_status: jobStatusOptionsRaw } = managejobsOptions;
const jobStatusOptions = toOptions(jobStatusOptionsRaw);

const jobStatusChip = {
  Active: styles.statusActive,
  Draft: styles.statusDraft,
  Closed: styles.statusClosed,
  Paused: styles.statusPaused,
  Scheduled: styles.statusScheduled,
  "Pending Approval": styles.statusPending,
  Approved: styles.statusApproved,
  Rejected: styles.statusRejected,
};

const SchoolManageJobs = () => {
  const navigate = useNavigate();
  const { jobs, setJobs, applicants } = useOutletContext();

  const [jobSearch, setJobSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const draftCount = jobs.filter((j) => j.status === "Draft").length;

  const publishApprovedJob = (id) => {
    setJobs((prev) =>
      prev.map((j) =>
        j.id === id ? { ...j, status: j.requestedStatus || "Active" } : j,
      ),
    );
  };

  const filteredJobs = jobs
    .filter((j) => j.title.toLowerCase().includes(jobSearch.toLowerCase()))
    .filter((j) => !statusFilter || j.status === statusFilter);

  return (
    <div className={styles.page}>

      <div className={styles.headerRow}>
        <div>
          <h2 className={styles.title}>Manage Jobs</h2>
          {draftCount > 0 && (
            <p className={styles.draftNotice}>
              {draftCount} draft{draftCount > 1 ? "s" : ""} awaiting publication
            </p>
          )}
        </div>
        <Button
          variant="filled"
          onClick={() => navigate("/school/post-job")}
          className={styles.postJobButton}
          startIcon={<PlusCircle size={16} />}
        >
          Post New Job
        </Button>
      </div>

      <div className={styles.filterRow}>
        <div className={styles.searchBox}>
          <Search size={16} className={styles.searchIcon} />
          <input value={jobSearch} onChange={(e) => setJobSearch(e.target.value)} placeholder="Search jobs..." className={styles.searchInput} />
        </div>
        <Select
          value={statusFilter}
          onChange={(value) => setStatusFilter(value)}
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
                <th className={styles.th}>Applied</th>
                <th className={styles.th}>Shortlisted</th>
                <th className={styles.th}>Status</th>
                <th className={styles.th}>Posted</th>
                <th className={styles.th}>Expiry</th>
                <th className={styles.thActions}>Actions</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={7} className={styles.emptyCell}>
                    No jobs found.
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job) => {
                  const candidates = applicants.filter((a) => a.jobTitle === job.title);
                  const shortlisted = candidates.filter((a) => a.status === "Shortlisted").length;
                  return (
                    <tr
                      key={job.id}
                      onClick={() => navigate(`/school/manage-jobs/${job.id}`)}
                      className={styles.row}
                    >
                      <td className={styles.td}>
                        <p className={styles.tdTitle}>{job.title}</p>
                        {job.subject && <p className={styles.tdSubject}>{job.subject}</p>}
                      </td>
                      <td className={styles.tdMuted}>{candidates.length || job.applicants}</td>
                      <td className={styles.tdMuted}>{shortlisted}</td>
                      <td className={styles.td}>
                        <span className={`${styles.statusChip} ${jobStatusChip[job.status] || styles.statusDefault}`}>
                          {job.status}
                        </span>
                        {job.status === "Rejected" && job.rejectionReason && (
                          <p className={styles.tdSubject} title={job.rejectionReason}>
                            {job.rejectionReason}
                          </p>
                        )}
                      </td>
                      <td className={styles.tdLight}>{job.date}</td>
                      <td className={styles.tdLight}>{job.expiryDate || "—"}</td>
                      <td className={styles.tdActions} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.actionsInner}>
                          {job.status === "Approved" && (
                            <button
                              type="button"
                              onClick={() => publishApprovedJob(job.id)}
                              className={styles.publishButton}
                              title="Publish Now"
                            >
                              Publish Now
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              const shareLink = window.location.origin + "/public-job/" + job.id;
                              navigator.clipboard.writeText(shareLink);
                              alert(`Public sharing link copied to clipboard!\n${shareLink}`);
                            }}
                            className={styles.shareButton}
                            title="Copy Share Link"
                          >
                            <Share2 size={15} />
                          </button>
                          <ChevronRight size={16} className={styles.chevron} />
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SchoolManageJobs;
