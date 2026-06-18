import { useMemo } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { Building2 } from "lucide-react";
import SharedJobDetail from "../../components/SharedJobDetail";

const TeacherJobDetail = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const {
    allJobs = [],
    appliedJobs,
    savedJobs,
    handleApply,
    handleSave,
  } = useOutletContext();

  const job = useMemo(() => {
    return allJobs.find((j) => String(j.id) === String(jobId));
  }, [allJobs, jobId]);

  const isApplied = useMemo(() => {
    return appliedJobs.some((item) => String(item.id) === String(jobId));
  }, [appliedJobs, jobId]);

  const isSaved = useMemo(() => {
    return savedJobs.some((item) => String(item.id) === String(jobId));
  }, [savedJobs, jobId]);

  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-16 text-center sm:py-24">
        <Building2 size={64} className="text-slate-300 mb-4" />
        <h2 className="text-2xl font-bold text-slate-800">Job not found.</h2>
        <button
          type="button"
          onClick={() => navigate("/teacher/all-jobs")}
          className="mt-4 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-primary/90"
        >
          Back to All Jobs
        </button>
      </div>
    );
  }

  return (
    <SharedJobDetail
      job={job}
      isApplied={isApplied}
      isSaved={isSaved}
      onApply={() => handleApply(job)}
      onSave={() => handleSave(job)}
      onBack={() => navigate(-1)}
      showSaveButton={true}
      showMatch={true}
    />
  );
};

export default TeacherJobDetail;
