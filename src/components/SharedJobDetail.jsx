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
import styles from "./styles/SharedJobDetail.module.css";

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
    <div className={styles.wrapper}>
      {/* Back button (optional) */}
      {onBack && (
        <div>
          <button
            onClick={onBack}
            className={styles.backButton}
          >
            <ArrowLeft size={16} /> Back
          </button>
        </div>
      )}

      <div className={styles.layoutGrid}>
        {/* Left Column: Job Details */}
        <div className={styles.leftColumn}>
          {/* Header Card */}
          <div className={styles.headerCard}>
            <div className={styles.headerRow}>
              <div className={styles.headerInfo}>
                <h1 className={styles.jobTitle}>
                  {title}
                </h1>
                <p className={styles.companyName}>
                  {companyName}
                </p>
                <div className={styles.badgeRow}>
                  <span className={styles.badgeLocation}>
                    <MapPin size={13} /> {location}
                  </span>
                  <span className={styles.badgeType}>
                    <Briefcase size={13} /> {employmentType}
                  </span>
                  <span className={styles.badgeSalary}>
                    <DollarSign size={13} /> {salaryRange}
                  </span>
                </div>
              </div>

              <div className={styles.headerActions}>
                {showMatch && (
                  <span className={styles.matchBadge}>
                    {match}% Match
                  </span>
                )}
                <button
                  onClick={handleCopyLink}
                  className={styles.shareButton}
                  title="Copy Share Link"
                >
                  <Share2 size={16} />
                  <span className={styles.shareLabel}>{copied ? "Copied!" : "Share"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Info grid */}
          <div className={styles.infoGrid}>
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
                  className={styles.infoItem}
                >
                  <div className={styles.infoIconWrap}>
                    <Icon size={18} />
                  </div>
                  <p className={styles.infoLabel}>
                    {item.label}
                  </p>
                  <p className={styles.infoValue}>
                    {item.val}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Details sections */}
          <div className={styles.detailsCard}>
            <div>
              <h3 className={styles.sectionHeading}>
                Job Description
              </h3>
              <p className={styles.descriptionText}>
                {description}
              </p>
            </div>

            {requirements && (
              <div>
                <h3 className={styles.sectionHeading}>
                  Key Requirements &amp; Skills
                </h3>
                <ul className={styles.list}>
                  {requirements.split("\n").map((r, i) => r.trim() && (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            )}

            {qualifications && (
              <div>
                <h3 className={styles.sectionHeading}>
                  Required Qualifications
                </h3>
                <ul className={styles.list}>
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
          <div className={styles.rightColumnInner}>
            {/* Action Card */}
            <div className={styles.actionCard}>
              <h3 className={styles.actionCardHeading}>
                Interested in this position?
              </h3>
              <p className={styles.actionCardText}>
                Submit your credentials directly. The recruitment team of {companyName} will review your application.
              </p>

              {isApplied ? (
                <div className={styles.appliedBanner}>
                  <CheckCircle2 size={16} /> Applied Successfully!
                </div>
              ) : (
                <button
                  type="button"
                  onClick={onApply}
                  className={styles.applyButton}
                >
                  Apply Now
                </button>
              )}

              {showSaveButton && onSave && (
                <button
                  type="button"
                  onClick={onSave}
                  className={isSaved ? styles.saveButtonSaved : styles.saveButton}
                >
                  <Bookmark size={16} /> {isSaved ? "Saved Job" : "Save Job"}
                </button>
              )}
            </div>

            {/* School Details */}
            <div className={styles.instituteCard}>
              <h3 className={styles.instituteHeading}>
                About the Institute
              </h3>
              <div className={styles.instituteRow}>
                <div className={styles.instituteIconWrap}>
                  <Building2 size={22} />
                </div>
                <div className={styles.instituteTextWrap}>
                  <h4 className={styles.instituteName}>
                    {companyName}
                  </h4>
                  <p className={styles.instituteVerified}>Verified Recruiter</p>
                </div>
              </div>

              <div className={styles.instituteFacts}>
                <div className={styles.instituteFactRow}>
                  <span className={styles.instituteFactLabel}>Sector:</span>
                  <span className={styles.instituteFactValue}>Schools &amp; Institutions</span>
                </div>
                <div className={styles.instituteFactRow}>
                  <span className={styles.instituteFactLabel}>Medium:</span>
                  <span className={styles.instituteFactValue}>English Medium</span>
                </div>
                <div className={styles.instituteFactRow}>
                  <span className={styles.instituteFactLabel}>Affiliation:</span>
                  <span className={styles.instituteFactValue}>CBSE Affiliated</span>
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
