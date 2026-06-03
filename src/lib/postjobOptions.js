// ── Role Categories ──────────────────────────────────────────────────────────
export const ROLE_CATEGORIES = ["Teacher", "Administrator", "Teacher & Administrator"];

// ── Job Title (the GROUP name) options per Role Category ─────────────────────
export const JOB_TITLE_GROUPS = {
  Teacher: [
    "Early Years / Pre-Primary",
    "Primary School",
    "Middle School",
    "Senior Secondary",
    "Subject-Specific Teachers",
    "Language Teachers",
    "Co-Curricular Teachers",
    "Special Education & Student Support",
    "Technology & Skill-Based Teachers",
    "Academic Leadership",
  ],
  Administrator: [
    "School Leadership",
    "Academic Administration",
    "Admissions",
    "Human Resources",
    "Finance & Accounts",
    "Operations",
    "Front Office",
    "Transport & Facilities",
    "Hostel Management",
    "Library",
    "IT & Systems",
    "Student Support",
    "Office Support",
  ],
  "Teacher & Administrator": [
    "Academic Leadership",
    "Coordination Roles",
    "Department Leadership",
    "Management Roles",
    "Specialized Hybrid Roles",
  ],
};

// ── Subject / Department options per Job Title group ─────────────────────────
export const SUBJECTS_BY_JOB_TITLE = {
  // Teacher ────────────────────────────────────────────────────────────────
  "Early Years / Pre-Primary": [
    "Assistant Teacher", "Pre-Primary Teacher", "Nursery Teacher",
    "Kindergarten Teacher", "Montessori Teacher", "ECCE Teacher", "Daycare Teacher",
  ],
  "Primary School": [
    "Primary Teacher (PRT)", "Class Teacher", "Homeroom Teacher",
  ],
  "Middle School": [
    "Trained Graduate Teacher (TGT)", "Subject Teacher",
  ],
  "Senior Secondary": [
    "Post Graduate Teacher (PGT)", "Senior Secondary Teacher",
  ],
  "Subject-Specific Teachers": [
    "Mathematics Teacher", "Science Teacher", "Physics Teacher", "Chemistry Teacher",
    "Biology Teacher", "English Teacher", "Hindi Teacher", "Sanskrit Teacher",
    "Social Science Teacher", "History Teacher", "Geography Teacher",
    "Political Science Teacher", "Economics Teacher", "Commerce Teacher",
    "Accountancy Teacher", "Business Studies Teacher", "Computer Science Teacher",
    "Information Technology Teacher", "Environmental Science Teacher",
    "General Knowledge Teacher",
  ],
  "Language Teachers": [
    "Language Teacher", "French Teacher", "German Teacher", "Spanish Teacher",
    "Japanese Teacher", "Chinese Teacher", "Arabic Teacher", "Urdu Teacher",
  ],
  "Co-Curricular Teachers": [
    "Physical Education Teacher", "Sports Coach", "Yoga Teacher",
    "Music Teacher (Vocal)", "Music Teacher (Instrumental)", "Dance Teacher",
    "Art Teacher", "Craft Teacher", "Theatre Teacher", "Drama Teacher",
    "Performing Arts Teacher",
  ],
  "Special Education & Student Support": [
    "Special Educator", "Learning Support Teacher", "Resource Room Teacher",
    "School Counsellor", "Career Counsellor", "Wellness Counsellor",
  ],
  "Technology & Skill-Based Teachers": [
    "Robotics Teacher", "Coding Teacher", "STEM Teacher", "AI Teacher",
    "ICT Teacher", "Digital Literacy Teacher",
  ],
  "Academic Leadership": [
    "Head of Department (HOD)", "Academic Coordinator", "Curriculum Coordinator",
    "Examination Coordinator", "Activity Coordinator", "Senior Teacher", "Mentor Teacher",
    // also used in Teacher & Administrator
    "Principal", "Vice Principal", "Head of School", "Academic Director", "Academic Head",
  ],

  // Administrator ──────────────────────────────────────────────────────────
  "School Leadership": [
    "Principal", "Vice Principal", "School Director", "Head of School", "Academic Head",
  ],
  "Academic Administration": [
    "Academic Coordinator", "Curriculum Coordinator", "Examination Coordinator",
    "Academic Manager", "Academic Supervisor",
  ],
  "Admissions": [
    "Admission Counsellor", "Admission Executive", "Admission Manager", "Enrollment Manager",
  ],
  "Human Resources": [
    "HR Executive", "HR Manager", "Talent Acquisition Executive", "Recruitment Specialist",
  ],
  "Finance & Accounts": [
    "Accountant", "Senior Accountant", "Finance Executive", "Finance Manager", "Accounts Officer",
  ],
  "Operations": [
    "Operations Executive", "Operations Manager", "School Administrator", "Administrative Officer",
  ],
  "Front Office": [
    "Receptionist", "Front Desk Executive", "Front Office Manager", "Customer Relationship Executive",
  ],
  "Transport & Facilities": [
    "Transport Manager", "Transport Coordinator", "Facility Manager", "Maintenance Supervisor",
  ],
  "Hostel Management": [
    "Hostel Warden", "Hostel Superintendent", "Residential Coordinator",
  ],
  "Library": [
    "Librarian", "Assistant Librarian", "Library Coordinator",
  ],
  "IT & Systems": [
    "IT Administrator", "IT Executive", "System Administrator", "Technical Support Executive",
  ],
  "Student Support": [
    "Student Welfare Officer", "Student Affairs Coordinator", "Discipline Coordinator",
  ],
  "Office Support": [
    "Office Assistant", "Administrative Assistant", "Data Entry Operator", "Documentation Executive",
  ],

  // Teacher & Administrator ─────────────────────────────────────────────────
  "Coordination Roles": [
    "Academic Coordinator", "Curriculum Coordinator", "Examination Coordinator",
    "Activity Coordinator", "Teacher Coordinator",
  ],
  "Department Leadership": [
    "Head of Department (HOD)", "Senior Teacher & Coordinator", "Lead Teacher", "Department Coordinator",
  ],
  "Management Roles": [
    "Academic Manager", "School Administrator", "Operations & Academic Coordinator", "Program Manager",
  ],
  "Specialized Hybrid Roles": [
    "Teacher & Admission Coordinator", "Teacher & Examination Coordinator",
    "Teacher & Activity Coordinator", "Teacher & Curriculum Coordinator",
    "Teacher & Student Welfare Coordinator",
  ],
};

// ── Joining Timeline ─────────────────────────────────────────────────────────
export const JOINING_TIMELINES = [
  "Immediate", "Within 7 Days", "Within 15 Days",
  "Within 30 Days", "Within 45 Days", "Within 60 Days", "Flexible",
];

// ── Languages ────────────────────────────────────────────────────────────────
export const INDIAN_LANGUAGES = [
  "Hindi", "English", "Sanskrit", "Marathi", "Gujarati", "Punjabi", "Bengali",
  "Tamil", "Telugu", "Kannada", "Malayalam", "Urdu", "Odia", "Assamese",
  "Konkani", "Kashmiri", "Manipuri", "Nepali",
];

export const FOREIGN_LANGUAGES = [
  "French", "German", "Spanish", "Japanese", "Chinese", "Russian",
  "Arabic", "Italian", "Portuguese", "Korean", "Turkish", "Dutch", "Thai",
];

export const PROFICIENCY_LEVELS = [
  "Basic", "Intermediate", "Conversational", "Professional", "Fluent", "Native",
];

// ── Qualifications ───────────────────────────────────────────────────────────
export const MIN_QUALIFICATIONS = [
  "12th Pass", "Diploma", "Graduate", "Post Graduate", "B.Ed", "M.Ed",
  "D.El.Ed", "B.El.Ed", "NTT", "Montessori Training", "MBA", "MCA",
  "BCA", "B.Tech", "M.Tech", "PhD", "NET Qualified", "CTET Qualified",
  "TET Qualified", "Other",
];

export const ADDITIONAL_QUALIFICATIONS = [
  "B.Ed", "M.Ed", "PhD", "NET", "SET", "CTET", "State TET",
  "Montessori Certification", "TESOL", "IELTS", "Special Education Certification",
  "Google Certified Educator", "Microsoft Certified Educator",
  "Cambridge Certification", "IB Certification",
];

export const CERTIFICATIONS = [
  "CTET", "TET", "NET", "SET", "IELTS", "TESOL", "Cambridge Certified",
  "IB Certified", "Google Certified Educator", "Microsoft Certified Educator",
  "NPTEL Certification", "AI Certification", "Coding Certification",
  "Special Education Certification",
];

export const EXPERIENCE_OPTIONS = [
  "Fresher", "0-1 Years", "1+ Years", "2+ Years", "3+ Years",
  "5+ Years", "7+ Years", "10+ Years", "15+ Years",
];

export const PREFERRED_SCHOOL_TYPES = [
  "CBSE", "ICSE", "IB", "Cambridge", "State Board",
  "Coaching Institute", "EdTech", "Play School", "College",
  "University", "NGO", "Training Institute",
];

export const STUDENT_LEVELS = [
  "Pre Primary", "Primary", "Middle School", "Secondary",
  "Senior Secondary", "College Level", "Competitive Exam", "Adult Learning",
];

// ── Salary & Compensation ────────────────────────────────────────────────────
export const COMPENSATION_STRUCTURES = ["Monthly", "Annual CTC", "Both", "Negotiable"];

export const MONTHLY_BENEFITS = [
  "PF Included", "ESIC", "Incentives", "Accommodation", "Food", "Transport",
  "Medical Insurance", "Performance Bonus", "Internet Reimbursement",
  "Laptop Provided", "Paid Leaves", "Other",
];

export const ANNUAL_BENEFITS = [
  "Performance Bonus", "Joining Bonus", "Yearly Increment", "Health Insurance",
  "PF", "ESIC", "Paid Leaves", "Travel Allowance", "Relocation Support",
  "Accommodation", "Food Allowance", "Education Allowance", "Other",
];

// ── Skills ───────────────────────────────────────────────────────────────────
export const REQUIRED_SKILLS = [
  "Classroom Management", "Lesson Planning", "Student Engagement", "Communication Skills",
  "Smart Board Handling", "Curriculum Planning", "Assessment Management",
  "Parent Communication", "Online Teaching", "MS Office", "Excel",
  "PowerPoint", "Leadership Skills", "Team Management", "Time Management",
  "Conflict Resolution", "Public Speaking",
];

export const TECHNICAL_SKILLS = [
  "Google Classroom", "Zoom", "Microsoft Teams", "Canva", "ChatGPT",
  "AI Tools", "ERP Software", "LMS", "Coding", "Python", "Excel Advanced",
  "Power BI", "Data Analysis", "Video Editing",
];

// ── Hiring Preferences ───────────────────────────────────────────────────────
export const GENDER_PREFERENCES = ["Male", "Female", "Any"];

export const INTERVIEW_MODES = ["Online", "Offline", "Hybrid", "Telephonic", "Walk-In"];

export const HIRING_ROUNDS = ["1 Round", "2 Rounds", "3 Rounds", "4+ Rounds"];

export const PUBLISH_SETTINGS = [
  "Publish Immediately", "Schedule Job Post", "Save as Draft",
  "Private Hiring", "Featured Job", "Urgent Hiring",
  "Auto Expire in 30 Days", "Auto Renew Job",
];
