// NOTE: Dropdown option lists have moved to /dropdown/School_module/*.json and
// /dropdown/common/common.json (see dropdown-migration-plan.md). This file now keeps
// only computed pickers, mock/dashboard data, style maps, and a few currently-unused
// dropdown exports left in place pending review (see dropdown-cleanup-report.md).

// ─── School/Org Profile sections (section-tab config, not a dropdown) ─────────

export const profileSections = [
  { id: "basic", label: "Basic Information" },
  { id: "other", label: "Other Information" },
  { id: "social", label: "Social Links" },
  { id: "address", label: "Address / Location" },
];

// ─── Date picker arrays (computed) ───────────────────────────────────────────

export const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0"));
export const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
export const years = Array.from({ length: 76 }, (_, i) => String(2025 - i));

// ─── Dashboard mock data ─────────────────────────────────────────────────────

export const initialJobs = [
  { id: 1, title: "Math Teacher", applicants: 22, status: "Active", date: "12 May 2025" },
  { id: 2, title: "Science Teacher", applicants: 12, status: "Closed", date: "10 May 2025" },
  { id: 3, title: "English Teacher", applicants: 8, status: "Active", date: "8 May 2025" },
  { id: 4, title: "Hindi Teacher", applicants: 3, status: "Draft", date: "6 May 2025" },
];

export const initialApplicants = [
  { id: 1, name: "Rahul Sharma", subject: "Mathematics", experience: "3 yrs", status: "Not Reviewed", avatar: "https://i.pravatar.cc/100?img=12" },
  { id: 2, name: "Priya Singh", subject: "English", experience: "5 yrs", status: "Shortlisted", avatar: "https://i.pravatar.cc/100?img=16" },
  { id: 3, name: "Amit Kumar", subject: "Science", experience: "2 yrs", status: "Not Reviewed", avatar: "https://i.pravatar.cc/100?img=11" },
  { id: 4, name: "Neha Patel", subject: "Hindi", experience: "7 yrs", status: "Rejected", avatar: "https://i.pravatar.cc/100?img=25" },
  { id: 5, name: "Suresh Verma", subject: "Mathematics", experience: "4 yrs", status: "Shortlisted", avatar: "https://i.pravatar.cc/100?img=30" },
];

export const statusChipClass = {
  "Not Reviewed": "bg-blue-50 text-blue-600",
  Reviewed: "bg-purple-50 text-purple-600",
  Applied: "bg-blue-50 text-blue-600",
  Shortlisted: "bg-green-50 text-green-600",
  Rejected: "bg-red-50 text-red-500",
  Active: "bg-green-50 text-green-600",
  Closed: "bg-red-50 text-red-500",
  Draft: "bg-slate-100 text-slate-500",
};
