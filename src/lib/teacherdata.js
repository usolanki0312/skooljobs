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

// ─── Personal Info options ───────────────────────────────────────────────────

export const titles = ["Mr", "Ms", "Mrs", "Dr", "Prof"];
export const nationalities = [
  "Indian", "Afghan", "Albanian", "Algerian", "American", "Andorran", "Angolan",
  "Anguillan", "Argentine", "Armenian", "Australian", "Austrian", "Azerbaijani",
  "Bahamian", "Bahraini", "Bangladeshi", "Barbadian", "Belarusian", "Belgian",
  "Belizean", "Beninese", "Bermudian", "Bhutanese", "Bolivian", "Botswanan",
  "Brazilian", "British", "British Virgin Islander", "Bruneian", "Bulgarian",
  "Burkinan", "Burmese", "Burundian", "Cambodian", "Cameroonian", "Canadian",
  "Cape Verdean", "Cayman Islander", "Central African", "Chadian", "Chilean",
  "Chinese", "Citizen of Antigua and Barbuda", "Citizen of Bosnia and Herzegovina",
  "Citizen of Guinea-Bissau", "Citizen of Kiribati", "Citizen of Seychelles",
  "Citizen of the Dominican Republic", "Citizen of Vanuatu", "Colombian", "Comoran",
  "Congolese (Congo)", "Congolese (DRC)", "Cook Islander", "Costa Rican", "Croatian",
  "Cuban", "Cymraes", "Cymro", "Cypriot", "Czech", "Danish", "Djiboutian",
  "Dominican", "Dutch", "East Timorese", "Ecuadorean", "Egyptian", "Emirati",
  "English", "Equatorial Guinean", "Eritrean", "Estonian", "Ethiopian", "Faroese",
  "Fijian", "Filipino", "Finnish", "French", "Gabonese", "Gambian", "Georgian",
  "German", "Ghanaian", "Gibraltarian", "Greek", "Greenlandic", "Grenadian",
  "Guamanian", "Guatemalan", "Guinean", "Guyanese", "Haitian", "Honduran",
  "Hong Konger", "Hungarian", "Icelandic", "Indonesian", "Iranian", "Iraqi",
  "Irish", "Israeli", "Italian", "Ivorian", "Jamaican", "Japanese", "Jordanian",
  "Kazakh", "Kenyan", "Kittitian", "Kosovan", "Kuwaiti", "Kyrgyz", "Lao",
  "Latvian", "Lebanese", "Liberian", "Libyan", "Liechtenstein citizen", "Lithuanian",
  "Luxembourger", "Macanese", "Macedonian", "Malagasy", "Malawian", "Malaysian",
  "Maldivian", "Malian", "Maltese", "Marshallese", "Martiniquais", "Mauritanian",
  "Mauritian", "Mexican", "Micronesian", "Moldovan", "Monegasque", "Mongolian",
  "Montenegrin", "Montserratian", "Moroccan", "Mosotho", "Mozambican", "Namibian",
  "Nauruan", "Nepalese", "New Zealander", "Nicaraguan", "Nigerian", "Nigerien",
  "Niuean", "North Korean", "Northern Irish", "Norwegian", "Omani", "Pakistani",
  "Palauan", "Palestinian", "Panamanian", "Papua New Guinean", "Paraguayan",
  "Peruvian", "Pitcairn Islander", "Polish", "Portuguese", "Prydeinig",
  "Puerto Rican", "Qatari", "Romanian", "Russian", "Rwandan", "Salvadorean",
  "Sammarinese", "Samoan", "Sao Tomean", "Saudi Arabian", "Scottish", "Senegalese",
  "Serbian", "Sierra Leonean", "Singaporean", "Slovak", "Slovenian",
  "Solomon Islander", "Somali", "South African", "South Korean", "South Sudanese",
  "Spanish", "Sri Lankan", "St Helenian", "St Lucian", "Stateless", "Sudanese",
  "Surinamese", "Swazi", "Swedish", "Swiss", "Syrian", "Taiwanese", "Tajik",
  "Tanzanian", "Thai", "Togolese", "Tongan", "Trinidadian", "Tristanian",
  "Tunisian", "Turkish", "Turkmen", "Turks and Caicos Islander", "Tuvaluan",
  "Ugandan", "Ukrainian", "Uruguayan", "Uzbek", "Vatican citizen", "Venezuelan",
  "Vietnamese", "Vincentian", "Wallisian", "Welsh", "Yemeni", "Zambian", "Zimbabwean",
];
export const jobTypes = ["Full Time", "Part Time", "Freelance", "Online", "Temporary", "Any"];
export const experienceYears = [
  "Fresh", "1 yr", "2 yrs", "3 yrs", "4 yrs", "5 yrs",
  "6 yrs", "7 yrs", "8 yrs", "9 yrs", "10+ yrs",
];
export const teachingMediums = ["English", "Hindi", "Local Language", "Foreign Language", "Others"];
export const expectedSalaryRanges = ["10k-15k", "15k-25k", "25k-40k", "40k-60k", "60k+", "Negotiable"];
export const languages = ["English", "Hindi", "French", "Spanish", "Urdu", "Bengali", "Tamil", "Telugu", "Marathi", "Other"];
export const languageStatuses = [
  "Fluency enough to teach",
  "Native Speaker",
  "Basic Knowledge",
  "Professional Working Proficiency",
];
export const teachingSubjects = [
  "Mathematics", "Science", "English", "Computer", "Hindi",
  "Social Science", "History", "Geography", "Art", "Music",
  "Physics", "Chemistry", "Biology", "Economics", "Other",
];
export const classesList = ["Class A", "Class B", "Class C", "Class 10", "Class 12"];

// ─── Qualification options ───────────────────────────────────────────────────

export const qualificationOptions = {
  degrees: [
    "Secondary (10th)",
    "Senior Secondary (12th)",
    "Bachelor's Degree",
    "Master's Degree",
    "MPhil",
    "PhD / Doctorate",
    "Post Doctorate",
    "Professional Degree",
    "Other",
  ],
  courses: [
    "General Secondary Education",
    "Science",
    "Commerce",
    "Arts / Humanities",
    "Vocational",
    "BA", "BSc", "BCom", "BBA", "BCA", "BTech", "BE", "B.Ed",
    "MA", "MSc", "MCom", "MBA", "MCA", "MTech", "M.Ed",
    "Research Degree",
    "Subject Specialization",
    "Other",
  ],
  mediums: [
    "English",
    "Hindi",
    "Bilingual (English + Hindi)",
    "Urdu", "Punjabi", "Bengali", "Tamil", "Telugu",
    "Marathi", "Gujarati", "Kannada", "Malayalam", "Odia",
    "Other",
  ],
  modes: ["Regular", "Part Time", "Distance Learning", "Online", "Correspondence", "Open University", "Hybrid"],
  universities: [
    "University of Delhi", "Mumbai University", "IIT Delhi", "JNU",
    "Lucknow University", "Anna University", "IGNOU", "Other",
  ],
  colleges: [
    "Hindu College", "Miranda House", "IIT Bombay",
    "Amity University", "Christ University", "Other",
  ],
};

// ─── Experience options ──────────────────────────────────────────────────────

export const experienceOptions = {
  boards: [
    "CBSE", "ICSE", "ISC", "State Board",
    "IB (International Baccalaureate)", "IGCSE / Cambridge",
    "NIOS", "Open School", "International Board", "Other",
  ],
  subjects: [
    "Accountancy", "Biology", "Business Studies", "Chemistry",
    "Economics", "English", "Geography", "History And Civics",
    "Home Science", "Maths", "Philosophy", "Physics",
    "Pol.Science", "Psychology", "Science", "Social Science",
    "Sociology", "Art & Painting", "Hindi",
  ],
  posts: [
    "PRT (Primary Teacher)",
    "TGT (Trained Graduate Teacher)",
    "PGT (Post Graduate Teacher)",
    "Assistant Teacher", "Subject Teacher", "Class Teacher",
    "Senior Teacher", "Head Teacher", "Vice Principal", "Principal",
    "Academic Coordinator", "Curriculum Coordinator",
    "Lecturer", "Professor", "Tutor", "Special Educator",
    "Lab Instructor", "Counselor", "Sports Coach",
    "Music Teacher", "Art Teacher", "Computer Instructor",
    "Teaching Assistant", "Administrative Head", "Other",
  ],
  reasons: [
    "Career Growth", "Better Opportunity", "Higher Salary",
    "Relocation", "Personal Reasons", "Contract Completed",
    "School Closure", "Family Reasons", "Health Reasons",
    "Higher Studies", "Role Change", "Work-Life Balance", "Other",
  ],
};

// ─── PIN → State mapping ─────────────────────────────────────────────────────

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
