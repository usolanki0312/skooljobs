// ─── School/Org Profile sections ────────────────────────────────────────────

export const profileSections = [
  { id: "basic", label: "Basic Information" },
  { id: "other", label: "Other Information" },
  { id: "social", label: "Social Links" },
  { id: "address", label: "Address / Location" },
];

// ─── Basic info dropdowns ────────────────────────────────────────────────────

export const sectors = [
  "Schools & Institutions",
  "Colleges & Universities",
  "Coaching Centers",
  "EdTech",
  "Government",
  "Private",
  "Other",
];

export const schoolTypes = [
  "Public School",
  "Private School",
  "International School",
  "Boarding School",
  "Day School",
  "Co-Ed School",
  "Girls School",
  "Boys School",
  "Special Education School",
  "Other",
];

export const affiliationStatus = ["Affiliated", "Pending Affiliation", "Not Affiliated"];

// ─── Other info dropdowns ────────────────────────────────────────────────────

export const schoolMediums = ["English", "Hindi", "Gujarati", "Marathi", "Telugu", "Tamil", "Bilingual", "Other"];

export const levels = ["Primary", "Middle", "Secondary", "Senior Secondary", "All Levels"];

export const boards = [
  "CBSE",
  "ICSE",
  "State Board",
  "IB (International Baccalaureate)",
  "IGCSE / Cambridge",
  "NIOS",
  "Other",
];

export const industries = [
  "Schools & Institutions",
  "Colleges & Universities",
  "EdTech",
  "Coaching Centers",
  "Other",
];

export const staffStrength = [
  "1 - 10",
  "11 - 25",
  "26 - 50",
  "51 - 100",
  "101 - 200",
  "200+",
];

export const studentStrength = [
  "Less than 100",
  "100 - 500",
  "500 - 1000",
  "1000 - 2000",
  "2000 - 5000",
  "5000+",
];

// ─── Location dropdowns ──────────────────────────────────────────────────────

export const countries = ["India", "USA", "UK", "Canada", "Australia", "Other"];

export const indianStates = [
  "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Odisha", "Punjab", "Rajasthan",
  "Tamil Nadu", "Telangana", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

// ─── Date picker arrays ──────────────────────────────────────────────────────

export const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0"));
export const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
export const years = Array.from({ length: 76 }, (_, i) => String(2025 - i));

// ─── Job posting dropdowns ───────────────────────────────────────────────────

export const subjects = [
  "Mathematics", "Science", "English", "Hindi", "Social Science", "Computer",
  "Physics", "Chemistry", "Biology", "Economics", "History", "Geography",
  "Art", "Music", "Physical Education", "Other",
];

export const schoolExperienceOptions = [
  "0 - 1 Year (Fresher)",
  "1 - 3 Years",
  "3 - 5 Years",
  "5 - 8 Years",
  "8+ Years",
  "Any Experience",
];

export const employmentTypes = ["Full Time", "Part Time", "Contract", "Hybrid", "Remote", "Internship"];

// ─── Dashboard mock data ─────────────────────────────────────────────────────

export const initialJobs = [
  { id: 1, title: "Math Teacher", applicants: 22, status: "Active", date: "12 May 2025" },
  { id: 2, title: "Science Teacher", applicants: 12, status: "Closed", date: "10 May 2025" },
  { id: 3, title: "English Teacher", applicants: 8, status: "Active", date: "8 May 2025" },
  { id: 4, title: "Hindi Teacher", applicants: 3, status: "Draft", date: "6 May 2025" },
];

export const initialApplicants = [
  { id: 1, name: "Rahul Sharma", subject: "Mathematics", experience: "3 yrs", status: "Applied", avatar: "https://i.pravatar.cc/100?img=12" },
  { id: 2, name: "Priya Singh", subject: "English", experience: "5 yrs", status: "Shortlisted", avatar: "https://i.pravatar.cc/100?img=16" },
  { id: 3, name: "Amit Kumar", subject: "Science", experience: "2 yrs", status: "Applied", avatar: "https://i.pravatar.cc/100?img=11" },
  { id: 4, name: "Neha Patel", subject: "Hindi", experience: "7 yrs", status: "Rejected", avatar: "https://i.pravatar.cc/100?img=25" },
  { id: 5, name: "Suresh Verma", subject: "Mathematics", experience: "4 yrs", status: "Shortlisted", avatar: "https://i.pravatar.cc/100?img=30" },
];

export const statusChipClass = {
  Applied: "bg-blue-50 text-blue-600",
  Shortlisted: "bg-green-50 text-green-600",
  Rejected: "bg-red-50 text-red-500",
  Active: "bg-green-50 text-green-600",
  Closed: "bg-red-50 text-red-500",
  Draft: "bg-slate-100 text-slate-500",
};
