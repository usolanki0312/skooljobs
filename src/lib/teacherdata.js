// NOTE: Dropdown option lists have moved to /dropdown/Teacher_module/*.json and
// /dropdown/common/common.json (see dropdown-migration-plan.md). This file now keeps
// only helpers, mock data, the PIN→state lookup, and a few currently-unused dropdown
// exports left in place pending review (see dropdown-cleanup-report.md).

export const formatRelativeTime = (isoDate) => {
  const diff = Date.now() - new Date(isoDate).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
};

// ─── Teacher sample data ────────────────────────────────────────────────────

export const TeacherData = {
  teachers: [
    {
      title: "Mr",
      firstName: "Gopal",
      middleName: "Singh",
      lastName: "Rajput",
      dob: { day: "15", month: "08", year: "2001" },
      age: 24,
      nationality: "Indian",
      currentJobTitle: "Mathematics Teacher",
      mainSubject: "Mathematics",
      additionalSubjects: ["History", "Geography", "Art", "Music"],
      classesTaught: ["Class A", "Class C"],
      languages: [
        { language: "English", status: "Fluency enough to teach" },
        { language: "Hindi", status: "Native Speaker" },
        { language: "French", status: "Basic Knowledge" },
      ],
      highestQualifications: ["B.Ed", "M.Sc Mathematics"],
      profilePhoto: "https://dummyimage.com/200x200/cccccc/000000&text=Profile+Pic",
      resume: "gopal_resume.pdf",
      shortlistedJobs: 5,
      appliedJobs: 12,
      coverLetter: "Passionate teacher with 3 years of experience in secondary education.",
      profileStatus: "Active",
    },
  ],
};

// ─── PIN → State mapping (lookup, not a dropdown) ────────────────────────────

export const pinStateMap = {
  11: "Delhi", 12: "Haryana", 13: "Haryana", 14: "Punjab",
  16: "Chandigarh", 17: "Himachal Pradesh",
  18: "Jammu and Kashmir", 19: "Jammu and Kashmir",
  20: "Uttar Pradesh", 21: "Uttar Pradesh", 22: "Uttar Pradesh",
  23: "Uttar Pradesh", 24: "Uttar Pradesh", 25: "Uttar Pradesh",
  26: "Uttar Pradesh", 27: "Uttar Pradesh", 28: "Uttar Pradesh",
  30: "Rajasthan", 31: "Rajasthan", 32: "Rajasthan",
  33: "Rajasthan", 34: "Rajasthan",
  36: "Gujarat", 37: "Gujarat", 38: "Gujarat", 39: "Gujarat",
  40: "Maharashtra", 41: "Maharashtra", 42: "Maharashtra",
  43: "Maharashtra", 44: "Maharashtra",
  45: "Madhya Pradesh", 46: "Madhya Pradesh", 47: "Madhya Pradesh", 48: "Madhya Pradesh",
  49: "Chhattisgarh",
  50: "Telangana", 51: "Andhra Pradesh", 52: "Andhra Pradesh", 53: "Andhra Pradesh",
  56: "Karnataka", 57: "Karnataka", 58: "Karnataka",
  60: "Tamil Nadu", 61: "Tamil Nadu", 62: "Tamil Nadu", 63: "Tamil Nadu", 64: "Tamil Nadu",
  67: "Kerala", 68: "Kerala", 69: "Kerala",
  70: "West Bengal", 71: "West Bengal", 72: "West Bengal", 73: "West Bengal", 74: "West Bengal",
  75: "Odisha", 76: "Odisha",
  78: "Assam", 79: "North East",
  80: "Bihar", 81: "Bihar", 82: "Jharkhand", 83: "Jharkhand", 84: "Bihar",
};

// ─── Dashboard mock data ─────────────────────────────────────────────────────

export const jobsData = [
  { id: 1, school: "Green Valley School", role: "Mathematics Teacher", location: "Indore", skill: "Mathematics", salary: "4.8 LPA", type: "Full time", match: 96 },
  { id: 2, school: "Delhi Public Academy", role: "Science Faculty", location: "Bhopal", skill: "Science", salary: "5.2 LPA", type: "Full time", match: 91 },
  { id: 3, school: "St. Mary's International", role: "English Teacher", location: "Pune", skill: "English", salary: "4.4 LPA", type: "Hybrid", match: 86 },
  { id: 4, school: "Bright Future School", role: "Computer Teacher", location: "Bangalore", skill: "Computer", salary: "6.0 LPA", type: "Full time", match: 89 },
];

export const resumesData = [
  { id: 1, name: "Mathematics Teacher Resume.pdf", skill: "Mathematics", score: 88 },
  { id: 2, name: "Science Faculty Resume.pdf", skill: "Science", score: 81 },
  { id: 3, name: "English Teacher Resume.pdf", skill: "English", score: 76 },
  { id: 4, name: "Computer Teacher Resume.pdf", skill: "Computer", score: 84 },
];
