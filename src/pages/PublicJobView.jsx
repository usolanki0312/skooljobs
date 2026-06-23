import { useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Building2 } from "lucide-react";
import { initialJobs } from "../lib/schooldata";
import SharedJobDetail from "../components/SharedJobDetail";
import styles from "./PublicJobView.module.css";

const PublicJobView = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  // Load jobs from localStorage, fallback to initialJobs
  const jobs = useMemo(() => {
    const saved = localStorage.getItem("skooljobs_jobs");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialJobs;
      }
    }
    return initialJobs;
  }, []);

  const job = useMemo(() => {
    return jobs.find((j) => String(j.id) === String(jobId));
  }, [jobs, jobId]);

  // Load currentUser to check role
  const currentUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("currentUser") || "{}");
    } catch {
      return {};
    }
  }, []);

  const isLoggedIn = !!currentUser.email;
  const isCandidate = currentUser.role === "candidate";

  const [applied, setApplied] = useState(false);

  const handleApply = () => {
    if (!isLoggedIn) {
      alert("Please log in or sign up as a Teacher to apply for this job.");
      navigate("/", { state: { from: `/public-job/${jobId}` } });
      return;
    }
    if (!isCandidate) {
      alert("You are currently logged in as a School recruiter. Please sign in as a Teacher to apply.");
      return;
    }

    setApplied(true);
    alert("Success! Your teacher profile has been sent to the recruiter for review.");
  };

  if (!job) {
    return (
      <div className={styles.notFoundWrap}>
        <Building2 size={64} className={styles.notFoundIcon} />
        <h2 className={styles.notFoundTitle}>Job Not Found</h2>
        <p className={styles.notFoundText}>
          The sharing link might be invalid, or this job post may have been removed by the school administration.
        </p>
        <Link
          to="/"
          className={styles.notFoundLink}
        >
          Back to SkoolJobs Home
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Navbar branding */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.brandGroup}>
            <span className={styles.brandLogo}>
              SJ
            </span>
            <span className={styles.brandName}>
              SkoolJobs
            </span>
          </div>

          <div className={styles.navActions}>
            {isLoggedIn ? (
              <Link
                to={isCandidate ? "/teacher/dashboard" : "/school/dashboard"}
                className={styles.navLink}
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/"
                  className={styles.navLink}
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className={styles.registerLink}
                >
                  Register as Teacher
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content wrapper */}
      <main className={styles.main}>
        <SharedJobDetail
          job={job}
          isApplied={applied}
          onApply={handleApply}
          onBack={() => window.history.back()}
          showSaveButton={false}
          showMatch={false}
        />
      </main>
    </div>
  );
};

export default PublicJobView;
