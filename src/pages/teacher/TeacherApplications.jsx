import { useOutletContext, useNavigate } from "react-router-dom";
import { Calendar, Briefcase, CheckCircle2 } from "lucide-react";
import styles from "./styles/TeacherApplications.module.css";
import { Button } from "@cloudstrytech/ui-components";

const TeacherApplications = () => {
  const navigate = useNavigate();
  const { appliedJobs, setAppliedJobs, addActivity } = useOutletContext();

  const handleWithdraw = (jobId, jobRole, school) => {
    if (window.confirm(`Are you sure you want to withdraw your application for "${jobRole}" at ${school}?`)) {
      setAppliedJobs(prev => prev.filter(j => j.id !== jobId));
      if (addActivity) {
        addActivity(`Withdrew application for ${jobRole} at ${school}`, "withdraw");
      }

      // Sync withdrawal with recruiter's applicants database in localStorage
      try {
        const savedApplicantsStr = localStorage.getItem("skooljobs_applicants");
        if (savedApplicantsStr) {
          const currentApplicants = JSON.parse(savedApplicantsStr);
          const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
          const teacherProfile = JSON.parse(localStorage.getItem("skooljobs_teacher_data") || "{}");
          const candidateName = `${teacherProfile.firstName || currentUser.firstName || "Rahul"} ${teacherProfile.lastName || currentUser.lastName || "Sharma"}`.trim();

          const updatedApplicants = currentApplicants.filter(
            (a) => !(a.jobTitle === jobRole && (String(a.candidateId) === String(currentUser.id) || a.name.toLowerCase() === candidateName.toLowerCase()))
          );
          localStorage.setItem("skooljobs_applicants", JSON.stringify(updatedApplicants));
        }
      } catch (err) {
        console.error("Error syncing withdrawal:", err);
      }

      alert("Application withdrawn successfully.");
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.headerRow}>
        <h2 className={styles.heading}>Applied Jobs</h2>
        <p className={styles.subtext}>
          Monitor your job application history and current status.
        </p>
      </div>

      {appliedJobs.length === 0 ? (
        <div className={styles.emptyState}>
          <Briefcase size={40} className={styles.emptyIcon} />
          <p>You haven't submitted any job applications yet.</p>
           <Button
            variant="filled"
            onClick={() => navigate("/teacher/all-jobs")}
          >
            Find Teaching Jobs
          </Button>
        </div>
      ) : (
        <div className={styles.tableScrollWrap}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeadRow}>
                <th className={styles.th}>Job Role</th>
                <th className={styles.th}>School</th>
                <th className={styles.th}>Applied Date</th>
                <th className={styles.th}>Status</th>
                <th className={styles.thActions}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appliedJobs.map((job) => {
                const displayDate = job.appliedDate
                  ? new Date(job.appliedDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                  : "05 Jun 2026";

                // Mock status mapping for UI
                const status = job.status || "Under Review";

                return (
                  <tr key={job.id} className={styles.row}>
                    <td className={styles.tdRole}>
                      <div>
                        {job.role || job.title}
                        <span className={styles.typeTag}>
                          {job.type}
                        </span>
                      </div>
                    </td>
                    <td className={styles.tdSchool}>{job.school || "Sunrise Public School"}</td>
                    <td className={styles.tdDate}>
                      <Calendar size={13} className={styles.dateIcon} />
                      {displayDate}
                    </td>
                    <td className={styles.tdStatus}>
                      <span className={`${styles.statusBadge} ${status === "Shortlisted" ? styles.statusShortlisted :
                        status === "Rejected" ? styles.statusRejected :
                          styles.statusDefault
                        }`}>
                        <CheckCircle2 size={12} className={styles.statusIcon} />
                        {status === "Rejected" ? "Feedback" : status}
                      </span>
                    </td>
                    <td className={styles.tdActions}>
                      <div className={styles.actionsRow}>
                        <Button
                          variant="text"
                          startIcon="eyeIcon"
                          onClick={() => navigate(`/teacher/jobs/${job.id}`)}
                          className={styles.viewJobButton}
                        >
                          View Job
                        </Button>

                        <Button
                          variant="text"
                          startIcon="deleteIcon"
                          onClick={() =>
                            handleWithdraw(
                              job.id,
                              job.role || job.title,
                              job.school
                            )
                          }
                          className={styles.withdrawButton}
                        >
                          Withdraw
                        </Button>                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default TeacherApplications;
