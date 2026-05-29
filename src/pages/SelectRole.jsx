import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Building2, GraduationCap, LogOut, X } from "lucide-react";

const SelectRole = () => {
  const navigate = useNavigate();
  const [accessError, setAccessError] = useState("");

  const currentUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("currentUser") || "{}");
    } catch {
      return {};
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("currentUser")) {
      navigate("/");
    }
  }, [navigate]);

  const displayName =
    currentUser.name || currentUser.firstName || currentUser.companyName || "User";

  const isTeacher = currentUser.role === "candidate";
  const isSchool = currentUser.role === "employer";

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  const handleTeacherDashboard = () => {
    if (isSchool) {
      setAccessError("Access denied. Your account is registered as a School/Employer. Please log in with a teacher account to access the Teacher Dashboard.");
      return;
    }
    navigate("/dashboard");
  };

  const handleSchoolDashboard = () => {
    if (isTeacher) {
      setAccessError("Access denied. Your account is registered as a Teacher/Candidate. Please log in with a school account to access the School Dashboard.");
      return;
    }
    navigate("/school-dashboard");
  };

  return (
    <div className="min-h-screen bg-light flex flex-col">
      {/* Top bar */}
      <header className="flex items-center justify-between bg-white px-6 py-4 shadow-soft">
        <div>
          <span className="text-xl font-bold text-primary font-heading">SkoolJobs</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-slate-600">
            Welcome, <span className="text-primary">{displayName}</span>
          </span>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl border border-borderColor px-4 py-2 text-sm font-bold text-slate-500 hover:bg-light"
          >
            <LogOut size={15} />
            Logout
          </button>
        </div>
      </header>

      {/* Access error modal */}
      {accessError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5">
          <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
            <div className="mb-5 flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-500">
                <AlertTriangle size={22} />
              </span>
              <div>
                <h3 className="text-lg font-bold text-slate-800">Access Denied</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{accessError}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => { setAccessError(""); handleLogout(); }}
                className="flex-1 rounded-xl border border-borderColor px-4 py-2.5 text-sm font-bold text-slate-500 hover:bg-light"
              >
                Switch Account
              </button>
              <button
                type="button"
                onClick={() => setAccessError("")}
                className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-primary/95"
              >
                OK, Got It
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex flex-1 flex-col items-center justify-center px-5 py-12">
        <div className="mb-10 text-center">
          <p className="text-xs font-bold uppercase tracking-[3px] text-secondary">
            Select Your Workspace
          </p>
          <h1 className="mt-3 text-3xl font-bold text-primary font-heading sm:text-4xl">
            How would you like to continue?
          </h1>
          <p className="mt-3 text-sm text-slate-500">
            Choose your dashboard to get started.
          </p>
        </div>

        <div className="grid w-full max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Teacher Dashboard Card */}
          <button
            type="button"
            onClick={handleTeacherDashboard}
            className={`group flex flex-col items-center gap-5 rounded-3xl border-2 bg-white p-8 text-center shadow-soft transition hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(4,72,144,0.18)] ${
              isSchool ? "border-slate-200 opacity-60 cursor-not-allowed hover:border-slate-200" : "border-borderColor hover:border-primary"
            }`}
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
              <GraduationCap size={40} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-primary font-heading">
                Teacher Dashboard
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Browse jobs, manage your profile, track applications and resumes.
              </p>
              {isSchool && (
                <p className="mt-2 text-xs font-bold text-red-400">Not available for School accounts</p>
              )}
            </div>
            <span className={`mt-auto inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold text-white transition ${
              isSchool ? "bg-slate-400" : "bg-primary group-hover:bg-primary/90"
            }`}>
              Go to Teacher Dashboard →
            </span>
          </button>

          {/* School Dashboard Card */}
          <button
            type="button"
            onClick={handleSchoolDashboard}
            className={`group flex flex-col items-center gap-5 rounded-3xl border-2 bg-white p-8 text-center shadow-soft transition hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(4,72,144,0.18)] ${
              isTeacher ? "border-slate-200 opacity-60 cursor-not-allowed hover:border-slate-200" : "border-borderColor hover:border-primary"
            }`}
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
              <Building2 size={40} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-primary font-heading">
                School Dashboard
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Post jobs, manage applicants, track CVs and shortlisted candidates.
              </p>
              {isTeacher && (
                <p className="mt-2 text-xs font-bold text-red-400">Not available for Teacher accounts</p>
              )}
            </div>
            <span className={`mt-auto inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold text-white transition ${
              isTeacher ? "bg-slate-400" : "bg-primary group-hover:bg-primary/90"
            }`}>
              Go to School Dashboard →
            </span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default SelectRole;
