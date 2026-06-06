import { useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Building2 } from "lucide-react";
import { initialJobs } from "../lib/schooldata";
import SharedJobDetail from "../components/SharedJobDetail";

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
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4 text-center">
        <Building2 size={64} className="text-slate-300 mb-4 animate-bounce" />
        <h2 className="text-2xl font-bold text-slate-800">Job Not Found</h2>
        <p className="mt-2 text-slate-500 max-w-sm">
          The sharing link might be invalid, or this job post may have been removed by the school administration.
        </p>
        <Link
          to="/"
          className="mt-6 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-primary/95 transition"
        >
          Back to SkoolJobs Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-body">
      {/* Navbar branding */}
      <header className="sticky top-0 z-30 border-b border-borderColor bg-white px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white font-extrabold text-xl shadow-md">
              SJ
            </span>
            <span className="font-heading text-xl font-bold text-primary tracking-wide">
              SkoolJobs
            </span>
          </div>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <Link
                to={isCandidate ? "/teacher/dashboard" : "/school/dashboard"}
                className="text-sm font-semibold text-slate-600 hover:text-primary transition"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/"
                  className="text-sm font-semibold text-slate-600 hover:text-primary transition"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="rounded-xl bg-primary/10 px-4 py-2 text-xs font-bold text-primary hover:bg-primary/15 transition"
                >
                  Register as Teacher
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content wrapper */}
      <main className="mx-auto max-w-6xl px-4 py-8 md:px-6 lg:py-12">
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
