// Computes a job-match percentage from the teacher's profile (subject, highest
// qualification, and total years of experience) instead of a hardcoded number.
export function computeJobMatch(job, { teacherData = {}, qualifications = [], experiences = [] } = {}) {
  let score = 0;

  const jobSubject = String(job.skill || job.subject || "").toLowerCase().trim();
  const teacherSubject = String(
    teacherData.mainSubject === "Other"
      ? teacherData.mainSubjectOther
      : teacherData.mainSubject || "",
  )
    .toLowerCase()
    .trim();

  if (jobSubject && teacherSubject) {
    if (jobSubject === teacherSubject) score += 50;
    else if (jobSubject.includes(teacherSubject) || teacherSubject.includes(jobSubject)) score += 32;
    else score += 12;
  } else {
    score += 22;
  }

  const jobQualText = String(job.qualifications || job.requirements || "").toLowerCase();
  const teacherDegrees = [
    teacherData.highestQualificationOne === "Other"
      ? teacherData.highestQualificationOneOther
      : teacherData.highestQualificationOne,
    teacherData.highestQualificationTwo === "Other"
      ? teacherData.highestQualificationTwoOther
      : teacherData.highestQualificationTwo,
    ...qualifications.map((q) => (q.degree === "Other" ? q.degreeOther : q.degree)),
  ]
    .filter(Boolean)
    .map((d) => String(d).toLowerCase());

  if (jobQualText && teacherDegrees.length) {
    score += teacherDegrees.some((d) => jobQualText.includes(d)) ? 25 : 12;
  } else {
    score += 16;
  }

  const totalYears = experiences.reduce((sum, exp) => {
    if (!exp.startDate) return sum;
    const end = exp.currentEmployer
      ? new Date()
      : exp.endDate
        ? new Date(exp.endDate)
        : new Date();
    return sum + Math.max(0, (end - new Date(exp.startDate)) / (1000 * 60 * 60 * 24 * 365));
  }, 0);
  score += Math.min(25, Math.round(totalYears * 5) + 5);

  return Math.max(35, Math.min(99, Math.round(score)));
}

export function loadTeacherMatchProfile() {
  const readJson = (key, fallback) => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : fallback;
    } catch {
      return fallback;
    }
  };
  return {
    teacherData: readJson("skooljobs_teacher_data", {}),
    qualifications: readJson("skooljobs_teacher_qualifications", []),
    experiences: readJson("skooljobs_teacher_experiences", []),
  };
}
