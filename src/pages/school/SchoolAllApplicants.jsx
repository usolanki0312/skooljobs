import { useState } from "react";
import { useNavigate, useOutletContext, useSearchParams } from "react-router-dom";
import {
  Bookmark, Calendar, ChevronRight, FileText, Search, X, CheckCircle2, XCircle, User,
} from "lucide-react";
import postjob from "../../../dropdown/School_module/postjob.json";
import applicantsOptions from "../../../dropdown/School_module/applicants.json";
import styles from "./styles/SchoolAllApplicants.module.css";
import { Select } from "@cloudstrytech/ui-components";
import { toOptions } from "../../lib/selectOptions";

const { Subject: subjectsRaw } = postjob;
const { Applicant_status: statusOptionsRaw, Experience_filter: experienceFilterOptionsRaw } = applicantsOptions;
const subjects = toOptions(subjectsRaw);
const statusOptions = toOptions(statusOptionsRaw);
const experienceFilterOptions = toOptions(experienceFilterOptionsRaw);

const applicantStatusChipStyle = {
  "Not Reviewed": { backgroundColor: "#eff6ff", color: "#2563eb" },
  Reviewed: { backgroundColor: "#faf5ff", color: "#9333ea" },
  Applied: { backgroundColor: "#eff6ff", color: "#2563eb" },
  Shortlisted: { backgroundColor: "#f0fdf4", color: "#16a34a" },
  Rejected: { backgroundColor: "#fef2f2", color: "#ef4444" },
  Active: { backgroundColor: "#f0fdf4", color: "#16a34a" },
  Closed: { backgroundColor: "#fef2f2", color: "#ef4444" },
  Draft: { backgroundColor: "#f1f5f9", color: "#64748b" },
};
const defaultStatusChipStyle = { backgroundColor: "#f1f5f9", color: "#64748b" };

const SchoolAllApplicants = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { applicants, setApplicants, handleSaveCandidate } = useOutletContext();

  const [applicantSearch, setApplicantSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [expFilter, setExpFilter] = useState("");
  const [jobTitleFilter, setJobTitleFilter] = useState("");
  // Pre-select status filter from the URL (e.g. ?status=Shortlisted from dashboard card)
  const [statusFilter, setStatusFilter] = useState(searchParams.get("status") || "");
  const [selected, setSelected] = useState(null);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const teacherProfile = JSON.parse(localStorage.getItem("skooljobs_teacher_data") || "{}");

  const getResumeData = (candidate) => {
    if (!candidate) return null;
    const isRahul = candidate.candidateId === 1 || candidate.name.toLowerCase().includes("rahul");
    if (isRahul) {
      const teacherQualifications = JSON.parse(localStorage.getItem("skooljobs_teacher_qualifications") || "[]");
      const teacherExperiences = JSON.parse(localStorage.getItem("skooljobs_teacher_experiences") || "[]");
      const teacherAchievements = JSON.parse(localStorage.getItem("skooljobs_teacher_achievements") || "[]");
      return {
        name: `${teacherProfile.firstName || "Rahul"} ${teacherProfile.lastName || "Sharma"}`.trim(),
        email: teacherProfile.email || "teacher@gmail.com",
        phone: teacherProfile.phone || "9876543210",
        summary: teacherProfile.briefWriteUp || "Dedicated, creative, and student-focused classroom teacher who is committed to providing a high-quality educational experience.",
        qualifications: teacherQualifications.length > 0
          ? teacherQualifications.map(q => ({ degree: q.degree, school: q.school, year: `${q.startYear}-${q.endYear}`, score: q.score || q.percentage }))
          : [
            { degree: "Bachelor of Education (B.Ed)", school: "Bhopal University", year: "2019-2021", score: "82%" },
            { degree: "M.Sc in Mathematics", school: "Indore University", year: "2017-2019", score: "9.2 CGPA" }
          ],
        experiences: teacherExperiences.length > 0
          ? teacherExperiences.map(e => ({ jobTitle: e.jobTitle || e.role, schoolName: e.schoolName || e.school, startYear: e.startYear, endYear: e.endYear, details: e.details || e.description }))
          : [
            { jobTitle: "Mathematics Teacher", schoolName: "Sunrise Public School", startYear: "2021", endYear: "2024", details: "Handled senior secondary algebra and calculus curriculum. Developed creative classroom teaching aids." }
          ],
        achievements: teacherAchievements.length > 0
          ? teacherAchievements.map(a => ({ name: a.name || a.title, year: a.year, by: a.by || a.issuer }))
          : [
            { name: "Best Teacher Award", year: "2023", by: "School Administration" }
          ]
      };
    }
    const nameKey = candidate.name.toLowerCase();
    if (nameKey.includes("priya")) {
      return {
        name: "Priya Singh",
        email: "priya.singh@gmail.com",
        phone: "+91 98123 45678",
        summary: "Dedicated and result-oriented English Teacher with over 5 years of experience in leading international schools. Proven track record of improving students' reading and writing skills by implementing customized curriculum and creative teaching methodologies.",
        qualifications: [
          { degree: "M.A. in English Literature", school: "Delhi University", year: "2018-2020", score: "8.5 CGPA" },
          { degree: "Bachelor of Education (B.Ed)", school: "LSR, Delhi University", year: "2015-2018", score: "82%" }
        ],
        experiences: [
          { jobTitle: "Senior English Teacher", schoolName: "St. Xavier's High School", startYear: "2021", endYear: "Present", details: "Designed and implemented interactive English language and literature curriculum for grades 9-12. Coordinated annual literature festivals and inter-school debate championships." },
          { jobTitle: "English Language Tutor", schoolName: "EduPath Online Academy", startYear: "2020", endYear: "2021", details: "Conducted live online English instruction for ESL students globally. Handled batches of 15+ students with customized learning progress trackers." }
        ],
        achievements: [
          { name: "Best Teacher of the Year", year: "2023", by: "St. Xavier's High School" },
          { name: "Certified IELTS Trainer", year: "2022", by: "British Council" }
        ]
      };
    }
    if (nameKey.includes("suresh")) {
      return {
        name: "Suresh Verma",
        email: "suresh.verma@yahoo.com",
        phone: "+91 97654 32109",
        summary: "Enthusiastic Mathematics Educator with a deep passion for logical reasoning and teaching pedagogy. Experienced in grooming students for competitive math olympiads and building solid algebra/calculus foundation skills.",
        qualifications: [
          { degree: "M.Sc. in Mathematics", school: "Banaras Hindu University (BHU)", year: "2016-2018", score: "9.1 CGPA" },
          { degree: "Bachelor of Education (B.Ed)", school: "BHU", year: "2013-2016", score: "79%" }
        ],
        experiences: [
          { jobTitle: "Mathematics Faculty", schoolName: "Sunrise Public School", startYear: "2019", endYear: "Present", details: "Taught calculus, algebra and geometry to high school students. Designed question banks and mock tests for Board Examinations." }
        ],
        achievements: [
          { name: "National Math Olympiad Coordinator", year: "2024", by: "CBSE board" }
        ]
      };
    }
    return {
      name: candidate.name,
      email: `${candidate.name.toLowerCase().replace(/\s+/g, ".")}@example.com`,
      phone: "+91 99999 88888",
      summary: `Experienced educator specializing in ${candidate.subject || "Teaching"}. Dedicated to creating an inclusive, positive, and intellectually stimulating environment for all students.`,
      qualifications: [
        { degree: candidate.qualification || "B.Ed", school: "State Board University", year: "2016-2018", score: "1st Class" }
      ],
      experiences: [
        { jobTitle: candidate.jobTitle || "Teacher", schoolName: "Global Public School", startYear: "2019", endYear: "Present", details: `Responsible for teaching ${candidate.subject || "relevant subjects"} and conducting regular academic assessments.` }
      ],
      achievements: []
    };
  };

  const resumeData = selected ? getResumeData(selected) : null;

  const getPublicProfileData = (candidate) => {
    if (!candidate) return null;
    const isRahul = candidate.candidateId === 1 || candidate.name.toLowerCase().includes("rahul");
    if (isRahul) {
      const teacherQualifications = JSON.parse(localStorage.getItem("skooljobs_teacher_qualifications") || "[]");
      const teacherExperiences = JSON.parse(localStorage.getItem("skooljobs_teacher_experiences") || "[]");
      const teacherAchievements = JSON.parse(localStorage.getItem("skooljobs_teacher_achievements") || "[]");
      const totalExpYears = teacherExperiences.reduce((sum, exp) => {
        if (!exp.startDate) return sum;
        const end = exp.currentEmployer ? new Date() : (exp.endDate ? new Date(exp.endDate) : new Date());
        const start = new Date(exp.startDate);
        return sum + Math.max(0, (end - start) / (1000 * 60 * 60 * 24 * 365));
      }, 0);
      return {
        title: teacherProfile.title || "Mr",
        firstName: teacherProfile.firstName || "Rahul",
        lastName: teacherProfile.lastName || "Sharma",
        currentJob: teacherProfile.currentJob || "Mathematics Teacher",
        city: teacherProfile.city || "Indore",
        age: teacherProfile.age || "24",
        mainSubject: teacherProfile.mainSubject || "Mathematics",
        experience: totalExpYears > 0 ? `${totalExpYears.toFixed(1)} years` : "3 years",
        highestDeg: teacherQualifications[0]?.degree || teacherProfile.highestQualificationOne || "B.Ed",
        university: teacherQualifications[0]?.university || "Bhopal University",
        summary: teacherProfile.briefWriteUp || "Dedicated and passionate Mathematics Teacher with a focus on student engagement.",
        awards: teacherAchievements
      };
    }
    const nameKey = candidate.name.toLowerCase();
    if (nameKey.includes("priya")) {
      return {
        title: "Ms",
        firstName: "Priya",
        lastName: "Singh",
        currentJob: "English Teacher",
        city: "Delhi",
        age: "27",
        mainSubject: "English",
        experience: "5 years",
        highestDeg: "MA English",
        university: "Delhi University",
        summary: "Dedicated and result-oriented English Teacher with over 5 years of experience in leading international schools.",
        awards: [
          { name: "Best Teacher of the Year", by: "St. Xavier's High School", year: "2023" }
        ]
      };
    }
    if (nameKey.includes("suresh")) {
      return {
        title: "Mr",
        firstName: "Suresh",
        lastName: "Verma",
        currentJob: "Mathematics Teacher",
        city: "Bhopal",
        age: "29",
        mainSubject: "Mathematics",
        experience: "6 years",
        highestDeg: "M.Sc. Mathematics",
        university: "BHU",
        summary: "Enthusiastic Mathematics Educator with a deep passion for logical reasoning and teaching pedagogy.",
        awards: [
          { name: "National Math Olympiad Coordinator", by: "CBSE board", year: "2024" }
        ]
      };
    }
    return {
      title: "Mr/Ms",
      firstName: candidate.name.split(" ")[0],
      lastName: candidate.name.split(" ")[1] || "",
      currentJob: candidate.jobTitle,
      city: "Bhopal",
      age: "26",
      mainSubject: candidate.subject,
      experience: candidate.experience,
      highestDeg: candidate.qualification,
      university: "State University",
      summary: `Experienced educator specializing in ${candidate.subject || "teaching"}.`,
      awards: []
    };
  };

  const publicProfileData = selected ? getPublicProfileData(selected) : null;

  const uniqueJobTitles = toOptions([...new Set(applicants.map((a) => a.jobTitle))]);

  const filteredApplicants = applicants.filter((a) => {
    const matchSearch =
      a.name.toLowerCase().includes(applicantSearch.toLowerCase()) ||
      a.subject.toLowerCase().includes(applicantSearch.toLowerCase());
    const matchSubject = !subjectFilter || a.subject === subjectFilter;
    const matchJob = !jobTitleFilter || a.jobTitle === jobTitleFilter;
    const matchStatus = !statusFilter || a.status === statusFilter;
    const expYears = parseInt(a.experience) || 0;
    const matchExp =
      !expFilter ||
      (expFilter === "0-3" && expYears <= 3) ||
      (expFilter === "3-6" && expYears > 3 && expYears <= 6) ||
      (expFilter === "6+" && expYears > 6);
    return matchSearch && matchSubject && matchExp && matchJob && matchStatus;
  });

  const handleStatusChange = (id, status) => {
    setApplicants((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    if (selected?.id === id) setSelected((s) => ({ ...s, status }));
  };

  const handleSave = (id) => {
    handleSaveCandidate(id);
    if (selected?.id === id) setSelected((s) => ({ ...s, saved: !s.saved }));
  };

  const openDrawer = (applicant) => setSelected(applicant);
  const closeDrawer = () => setSelected(null);

  // Keep drawer in sync when applicant state changes (e.g. save toggled from table)
  const drawerApplicant = selected
    ? applicants.find((a) => a.id === selected.id) ?? selected
    : null;

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>All Applicants</h2>

      {/* ── Filters ───────────────────────────────────────────────────────── */}
      <div className={styles.filtersRow}>
        <div className={styles.searchBox}>
          <Search size={16} className={styles.searchIcon} />
          <input
            value={applicantSearch}
            onChange={(e) => setApplicantSearch(e.target.value)}
            placeholder="Search by name or subject..."
            className={styles.searchInput}
          />
        </div>
        <Select
          options={uniqueJobTitles}
          value={jobTitleFilter}
          onChange={setJobTitleFilter}
          placeholder="All Job Titles"
          className={styles.filterPillJobTitle}
        />
        <Select
          value={subjectFilter}
          onChange={setSubjectFilter}
          placeholder="All Subjects"
          options={subjects}
          className={styles.filterPill}
        />
        <Select
          value={statusFilter}
          onChange={setStatusFilter}
          placeholder="All Status"
          options={statusOptions}
          className={styles.filterPill}
        />
        <Select
          value={expFilter}
          onChange={setExpFilter}
          placeholder="All Experience"
          options={experienceFilterOptions}
          className={styles.filterPill}
        />
      </div>

      {/* ── Table ─────────────────────────────────────────────────────────── */}
      <div className={styles.tableCard}>
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                <th className={styles.th}>Candidate</th>
                <th className={styles.th}>Job Title</th>
                <th className={styles.th}>Subject</th>
                <th className={styles.th}>Experience</th>
                <th className={styles.th}>Status</th>
                <th className={styles.thNarrow} />
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {filteredApplicants.length === 0 ? (
                <tr>
                  <td colSpan={6} className={styles.emptyRow}>
                    No applicants found.
                  </td>
                </tr>
              ) : (
                filteredApplicants.map((applicant) => (
                  <tr
                    key={applicant.id}
                    onClick={() => openDrawer(applicant)}
                    className={selected?.id === applicant.id ? styles.trSelected : styles.tr}
                  >
                    <td className={styles.td}>
                      <div className={styles.candidateCell}>
                        <img src={applicant.avatar} alt={applicant.name} className={styles.candidateAvatar} />
                        <div className={styles.candidateInfo}>
                          <p className={styles.candidateName}>{applicant.name}</p>
                          <p className={styles.candidateQualification}>{applicant.qualification}</p>
                        </div>
                      </div>
                    </td>
                    <td className={styles.tdMuted}>{applicant.jobTitle}</td>
                    <td className={styles.tdMuted}>{applicant.subject}</td>
                    <td className={styles.tdMuted}>{applicant.experience}</td>
                    <td className={styles.td}>
                      <span
                        className={styles.statusChip}
                        style={applicantStatusChipStyle[applicant.status] || defaultStatusChipStyle}
                      >
                        {applicant.status}
                      </span>
                    </td>
                    <td className={styles.tdChevron}>
                      <ChevronRight size={16} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Drawer backdrop ───────────────────────────────────────────────── */}
      {drawerApplicant && (
        <div
          className={styles.drawerBackdrop}
          onClick={closeDrawer}
        />
      )}

      {/* ── Drawer panel ──────────────────────────────────────────────────── */}
      <div className={drawerApplicant ? styles.drawerOpen : styles.drawer}>
        {drawerApplicant && (
          <>
            {/* Drawer header */}
            <div className={styles.drawerHeader}>
              <h3 className={styles.drawerHeaderTitle}>Candidate Profile</h3>
              <button type="button" onClick={closeDrawer} className={styles.drawerCloseBtn}>
                <X size={18} />
              </button>
            </div>

            {/* Drawer content */}
            <div className={styles.drawerContent}>

              {/* Profile card */}
              <div className={styles.profileCard}>
                <span
                  className={styles.profileStatusChip}
                  style={applicantStatusChipStyle[drawerApplicant.status] || defaultStatusChipStyle}
                >
                  {drawerApplicant.status}
                </span>
                <div className={styles.profileHeader}>
                  <img
                    src={drawerApplicant.avatar}
                    alt={drawerApplicant.name}
                    className={styles.profileAvatar}
                  />
                  <div className={styles.profileInfo}>
                    <h4 className={styles.profileName}>{drawerApplicant.name}</h4>
                    <p className={styles.profileJobTitle}>{drawerApplicant.jobTitle}</p>
                    <p className={styles.profileQualification}>{drawerApplicant.qualification}</p>
                  </div>
                </div>
              </div>

              {/* Details grid */}
              <div className={styles.detailsGrid}>
                {[
                  { label: "Subject", value: drawerApplicant.subject },
                  { label: "Experience", value: drawerApplicant.experience },
                  { label: "Job Title", value: drawerApplicant.jobTitle },
                  { label: "Qualification", value: drawerApplicant.qualification },
                ].map((d) => (
                  <div key={d.label} className={styles.detailCard}>
                    <p className={styles.detailLabel}>{d.label}</p>
                    <p className={styles.detailValue}>{d.value}</p>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className={styles.actionsBlock}>
                <p className={styles.actionsLabel}>Actions</p>
                <div className={styles.actionsRow}>
                  <button
                    type="button"
                    onClick={() => handleStatusChange(drawerApplicant.id, "Shortlisted")}
                    className={drawerApplicant.status === "Shortlisted" ? styles.actionBtnShortlistActive : `${styles.actionBtn} ${styles.actionBtnShortlist}`}
                  >
                    <CheckCircle2 size={16} className={styles.actionBtnIcon} />
                    Shortlist
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSave(drawerApplicant.id)}
                    className={drawerApplicant.saved ? styles.actionBtnSaveActive : `${styles.actionBtn} ${styles.actionBtnSave}`}
                  >
                    <Bookmark size={16} className={drawerApplicant.saved ? styles.saveIconActive : styles.saveIconInactive} />
                    Save for later
                  </button>

                  <button
                    type="button"
                    onClick={() => handleStatusChange(drawerApplicant.id, "Rejected")}
                    className={drawerApplicant.status === "Rejected" ? styles.actionBtnRejectActive : `${styles.actionBtn} ${styles.actionBtnReject}`}
                  >
                    <XCircle size={16} className={styles.actionBtnIcon} />
                    Reject
                  </button>
                </div>
              </div>

              {/* Evaluation & Scheduling */}
              <div className={styles.evalBlock}>
                <p className={styles.actionsLabel}>Evaluation & Scheduling</p>
                <div className={styles.evalStack}>
                  <button
                    type="button"
                    onClick={() => {
                      setShowResumeModal(true);
                      if (drawerApplicant.status === "Not Reviewed") {
                        handleStatusChange(drawerApplicant.id, "Reviewed");
                      }
                    }}
                    className={styles.evalBtn}
                  >
                    <FileText size={16} className={styles.evalBtnIcon} /> View Resume
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowProfileModal(true);
                      if (drawerApplicant.status === "Not Reviewed") {
                        handleStatusChange(drawerApplicant.id, "Reviewed");
                      }
                    }}
                    className={styles.evalBtn}
                  >
                    <User size={16} className={styles.evalBtnIcon} /> View Public Profile
                  </button>

                  <button
                    type="button"
                    onClick={() => { closeDrawer(); navigate("/school/interviews"); }}
                    className={styles.evalBtnSchedule}
                  >
                    <Calendar size={16} className={styles.evalBtnScheduleIcon} /> Schedule Interview
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ── Resume Modal Overlay ─────────────────────────────────────────── */}
      {showResumeModal && resumeData && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            {/* Header */}
            <div className={styles.modalHeader}>
              <div className={styles.modalHeaderLeft}>
                <div className={styles.modalHeaderIcon}>
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className={styles.modalHeaderTitle}>Curriculum Vitae</h3>
                  <p className={styles.modalHeaderSubtitle}>{resumeData.name}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowResumeModal(false)}
                className={styles.modalCloseBtn}
              >
                <X size={20} />
              </button>
            </div>

            {/* Resume Details Content */}
            <div className={styles.modalBody}>
              {/* Header Card */}
              <div className={styles.resumeHeaderCard}>
                <h2 className={styles.resumeHeaderName}>{resumeData.name}</h2>
                <p className={styles.resumeHeaderSubtitle}>{drawerApplicant.jobTitle} · {drawerApplicant.subject}</p>
                <div className={styles.resumeHeaderMeta}>
                  <span>📧 {resumeData.email}</span>
                  <span>📞 {resumeData.phone}</span>
                  {teacherProfile.city && (
                    <span>📍 {teacherProfile.city}</span>
                  )}
                </div>
              </div>

              {/* Summary */}
              <div className={styles.sectionBlock}>
                <h3 className={styles.sectionHeading}>Professional Summary</h3>
                <p className={styles.sectionBodyText}>{resumeData.summary}</p>
              </div>

              {/* Experience */}
              <div className={styles.sectionBlockLg}>
                <h3 className={styles.sectionHeading}>Work Experience</h3>
                {resumeData.experiences.length === 0 ? (
                  <p className={styles.emptyHint}>No professional experience listed.</p>
                ) : (
                  <div className={styles.experienceList}>
                    {resumeData.experiences.map((exp, idx) => (
                      <div key={idx} className={styles.experienceItem}>
                        <div className={styles.experienceDot} />
                        <div className={styles.experienceTopRow}>
                          <h4 className={styles.experienceJobTitle}>{exp.jobTitle}</h4>
                          <span className={styles.experienceYears}>{exp.startYear} - {exp.endYear || "Present"}</span>
                        </div>
                        <p className={styles.experienceSchool}>{exp.schoolName}</p>
                        {exp.details && <p className={styles.experienceDetails}>{exp.details}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Qualifications */}
              <div className={styles.sectionBlockLg}>
                <h3 className={styles.sectionHeading}>Education & Qualifications</h3>
                {resumeData.qualifications.length === 0 ? (
                  <p className={styles.emptyHint}>No educational qualifications listed.</p>
                ) : (
                  <div className={styles.qualificationsGrid}>
                    {resumeData.qualifications.map((qual, idx) => (
                      <div key={idx} className={styles.qualificationCard}>
                        <h4 className={styles.qualificationDegree}>{qual.degree}</h4>
                        <p className={styles.qualificationSchool}>{qual.school}</p>
                        <div className={styles.qualificationMetaRow}>
                          <span>Year: {qual.year}</span>
                          {qual.score && <span className={styles.qualificationScore}>{qual.score}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Achievements */}
              {resumeData.achievements && resumeData.achievements.length > 0 && (
                <div className={styles.sectionBlock}>
                  <h3 className={styles.sectionHeading}>Awards & Certifications</h3>
                  <div className={styles.chipsRow}>
                    {resumeData.achievements.map((ach, idx) => (
                      <div key={idx} className={styles.chipCard}>
                        <p className={styles.chipCardTitle}>{ach.name}</p>
                        <p className={styles.chipCardSubtitle}>{ach.by} · {ach.year}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className={styles.modalFooter}>
              <button
                type="button"
                onClick={() => setShowResumeModal(false)}
                className={styles.modalFooterBtn}
              >
                Close CV
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Public Profile Modal Overlay ─────────────────────────────────── */}
      {showProfileModal && publicProfileData && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            {/* Header */}
            <div className={styles.modalHeader}>
              <div className={styles.modalHeaderLeft}>
                <div className={styles.modalHeaderIcon}>
                  <User size={20} />
                </div>
                <div>
                  <h3 className={styles.modalHeaderTitle}>Public Profile</h3>
                  <p className={styles.modalHeaderSubtitle}>{publicProfileData.firstName} {publicProfileData.lastName?.charAt(0)}.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowProfileModal(false)}
                className={styles.modalCloseBtn}
              >
                <X size={20} />
              </button>
            </div>

            {/* Profile Content */}
            <div className={styles.modalBody}>
              {/* Header Card */}
              <div className={styles.profileModalHeaderCard}>
                <div className={styles.profileModalBanner} />
                <div className={styles.profileModalBody}>
                  <div className={styles.profileModalAvatarRow}>
                    <div className={styles.profileModalAvatar}>
                      <User size={32} />
                    </div>
                    <div className={styles.profileModalInfo}>
                      <h4 className={styles.profileModalName}>
                        {publicProfileData.title} {publicProfileData.firstName} {publicProfileData.lastName?.charAt(0)}.
                      </h4>
                      <p className={styles.profileModalJobTitle}>
                        {publicProfileData.currentJob}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className={styles.statsGrid}>
                {[
                  { label: "Age", value: publicProfileData.age },
                  { label: "Main Subject", value: publicProfileData.mainSubject },
                  { label: "Total Experience", value: publicProfileData.experience },
                  { label: "Highest Qualification", value: publicProfileData.highestDeg },
                  { label: "University", value: publicProfileData.university },
                  { label: "Area / City", value: publicProfileData.city },
                ].map((s) => (
                  <div key={s.label} className={styles.statCard}>
                    <p className={styles.statLabel}>{s.label}</p>
                    <p className={styles.statValue}>{s.value || "Not added"}</p>
                  </div>
                ))}
              </div>

              {/* Summary */}
              {publicProfileData.summary && (
                <div className={styles.sectionBlock}>
                  <h3 className={styles.sectionHeading}>Professional Summary</h3>
                  <p className={styles.summaryText}>
                    {publicProfileData.summary}
                  </p>
                </div>
              )}

              {/* Awards */}
              {publicProfileData.awards && publicProfileData.awards.length > 0 && (
                <div className={styles.sectionBlock}>
                  <h3 className={styles.sectionHeading}>Public Awards</h3>
                  <div className={styles.chipsRow}>
                    {publicProfileData.awards.map((award, idx) => (
                      <div key={idx} className={styles.chipCard}>
                        <p className={styles.chipCardTitle}>{award.name || award.title}</p>
                        <p className={styles.chipCardSubtitle}>{award.by || award.issuer} · {award.year}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className={styles.modalFooter}>
              <button
                type="button"
                onClick={() => setShowProfileModal(false)}
                className={styles.modalFooterBtn}
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolAllApplicants;
