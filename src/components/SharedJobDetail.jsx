import { useState, useMemo } from "react";
import {
  Briefcase,
  Calendar,
  MapPin,
  DollarSign,
  Users,
  Award,
  BookOpen,
  Building2,
  Share2,
  CheckCircle2,
  ArrowLeft,
  Bookmark,
} from "lucide-react";

const SharedJobDetail = ({
  job,
  isApplied = false,
  isSaved = false,
  onApply,
  onSave,
  onBack,
  showSaveButton = false,
  showMatch = false,
}) => {
  const [copied, setCopied] = useState(false);

  // Normalize fields so parent views can pass the raw job object safely
  const title = useMemo(() => job?.title || job?.role || "Job Position", [job]);
  const companyName = useMemo(() => job?.companyName || job?.school || "Sunrise Public School", [job]);
  const location = useMemo(() => job?.location || "Bhopal, MP", [job]);
  const employmentType = useMemo(() => job?.employmentType || job?.type || "Full Time", [job]);
  const salaryRange = useMemo(() => job?.salaryRange || job?.salary || "Competitive Salary", [job]);
  const subject = useMemo(() => job?.subject || job?.skill || "Teaching", [job]);
  const experience = useMemo(() => job?.experience || "Any Experience", [job]);
  const vacancies = useMemo(() => job?.vacancies || "1", [job]);
  const expiryDate = useMemo(() => job?.expiryDate || "30 Jun 2026", [job]);
  const match = useMemo(() => job?.match || "95", [job]);

  const description = useMemo(() => {
    return job?.description ||
      `We are seeking a highly motivated and qualified educator to join our school as a ${title}. The ideal candidate will be responsible for creating classroom lessons, collaborating with peers, assessing students' progress, and building strong relationships with students and parents.`;
  }, [job, title]);

  const requirements = useMemo(() => {
    return job?.requirements ||
      "Strong communication and classroom management skills.\nAbility to use modern educational technology and tools.\nPassionate about teaching and student development.\nActive participation in school events and curriculum planning.";
  }, [job]);

  const qualifications = useMemo(() => {
    return job?.qualifications ||
      "Bachelor's Degree in Education (B.Ed) or related field.\nMaster's degree is highly preferred.\nValid teaching certification/license.";
  }, [job]);

  const handleCopyLink = () => {
    if (!job?.id) return;
    const shareUrl = `${window.location.origin}/public-job/${job.id}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Back button (optional) */}
      {onBack && (
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary transition"
          >
            <ArrowLeft size={16} /> Back
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column: Job Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header Card */}
          <div className="rounded-3xl border border-borderColor bg-white p-6 shadow-soft sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-3xl font-bold text-slate-800 font-heading leading-tight">
                  {title}
                </h1>
                <p className="text-lg font-semibold text-primary">
                  {companyName}
                </p>
                <div className="mt-4 flex flex-wrap gap-2.5 pt-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-bold text-slate-600">
                    <MapPin size={13} /> {location}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/5 px-3.5 py-1.5 text-xs font-bold text-primary">
                    <Briefcase size={13} /> {employmentType}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3.5 py-1.5 text-xs font-bold text-green-600">
                    <DollarSign size={13} /> {salaryRange}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {showMatch && (
                  <span className="rounded-full bg-green-50 px-3.5 py-1.5 text-xs font-bold text-green-600 shadow-sm border border-green-100">
                    {match}% Match
                  </span>
                )}
                <button
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-borderColor bg-white hover:bg-slate-50 p-2.5 text-sm font-semibold text-slate-600 transition shadow-sm"
                  title="Copy Share Link"
                >
                  <Share2 size={16} />
                  <span className="hidden sm:inline">{copied ? "Copied!" : "Share"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { icon: BookOpen, label: "Subject", val: subject },
              { icon: Award, label: "Experience", val: experience },
              { icon: Users, label: "Vacancies", val: `${vacancies} opening${parseInt(vacancies) !== 1 ? 's' : ''}` },
              { icon: Calendar, label: "Apply Before", val: expiryDate },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-borderColor bg-white p-4 text-center shadow-sm hover:shadow-soft transition duration-200"
                >
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-primary mb-2">
                    <Icon size={18} />
                  </div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-800 truncate">
                    {item.val}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Details sections */}
          <div className="rounded-3xl border border-borderColor bg-white p-6 shadow-soft space-y-6 sm:p-8">
            <div>
              <h3 className="text-lg font-bold text-slate-800 border-b border-borderColor pb-3 mb-4 font-heading">
                Job Description
              </h3>
              <p className="text-sm leading-relaxed text-slate-600 whitespace-pre-line">
                {description}
              </p>
            </div>

            {requirements && (
              <div>
                <h3 className="text-lg font-bold text-slate-800 border-b border-borderColor pb-3 mb-4 font-heading">
                  Key Requirements &amp; Skills
                </h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-slate-600 pl-1">
                  {requirements.split("\n").map((r, i) => r.trim() && (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            )}

            {qualifications && (
              <div>
                <h3 className="text-lg font-bold text-slate-800 border-b border-borderColor pb-3 mb-4 font-heading">
                  Required Qualifications
                </h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-slate-600 pl-1">
                  {qualifications.split("\n").map((q, i) => q.trim() && (
                    <li key={i}>{q}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Apply Panel */}
        <div>
          <div className="space-y-6 lg:sticky lg:top-24">
            {/* Action Card */}
            <div className="rounded-3xl border border-borderColor bg-white p-6 shadow-soft space-y-4">
              <h3 className="font-heading text-lg font-bold text-slate-800">
                Interested in this position?
              </h3>
              <p className="text-xs leading-relaxed text-slate-400">
                Submit your credentials directly. The recruitment team of {companyName} will review your application.
              </p>

              {isApplied ? (
                <div className="flex items-center gap-2 rounded-xl bg-green-50 p-4 text-xs font-bold text-green-600 border border-green-150 shadow-sm">
                  <CheckCircle2 size={16} /> Applied Successfully!
                </div>
              ) : (
                <button
                  type="button"
                  onClick={onApply}
                  className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-white shadow-md hover:bg-primary/95 transition active:scale-[0.98]"
                >
                  Apply Now
                </button>
              )}

              {showSaveButton && onSave && (
                <button
                  type="button"
                  onClick={onSave}
                  className={`w-full rounded-xl border py-3 text-sm font-bold transition flex items-center justify-center gap-1.5 ${
                    isSaved
                      ? "border-green-500 bg-green-500 text-white shadow-sm"
                      : "border-borderColor text-slate-600 hover:bg-light"
                  }`}
                >
                  <Bookmark size={16} /> {isSaved ? "Saved Job" : "Save Job"}
                </button>
              )}
            </div>

            {/* School Details */}
            <div className="rounded-3xl border border-borderColor bg-white p-6 shadow-soft space-y-4">
              <h3 className="font-bold text-slate-800 border-b border-borderColor pb-3 mb-2 font-heading">
                About the Institute
              </h3>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-primary border border-borderColor">
                  <Building2 size={22} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 truncate max-w-[180px]">
                    {companyName}
                  </h4>
                  <p className="text-xs text-slate-400">Verified Recruiter</p>
                </div>
              </div>
              
              <div className="space-y-2.5 pt-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Sector:</span>
                  <span className="font-bold text-slate-700">Schools &amp; Institutions</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Medium:</span>
                  <span className="font-bold text-slate-700">English Medium</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Affiliation:</span>
                  <span className="font-bold text-slate-700">CBSE Affiliated</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharedJobDetail;
