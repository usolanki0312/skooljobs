import { useMemo, useRef, useState } from "react";
import {
  Award,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  Eye,
  FileText,
  GraduationCap,
  MapPin,
  Phone,
  Plus,
  Save,
  Sparkles,
  Trophy,
  Upload,
  User,
} from "lucide-react";
import BackButton from "../components/backbutton";

const navItems = [
  { id: "basic", label: "My Profile", icon: User },
  { id: "viewProfile", label: "View Profile", icon: Eye },
  { id: "contact", label: "Contact Details", icon: Phone },
  { id: "qualification", label: "Qualification", icon: GraduationCap },
  { id: "experience", label: "Experience", icon: BriefcaseBusiness },
  { id: "achievements", label: "Achievements", icon: Award },
  { id: "resume", label: "Resume", icon: FileText },
];

const inputClass =
  "w-full rounded-xl border border-borderColor bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:bg-slate-100 disabled:text-slate-500";

const compactInputClass =
  "w-full rounded-xl border border-borderColor bg-white px-3 py-3 text-sm text-slate-800 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:bg-slate-100 disabled:text-slate-500";

const labelClass = "mb-2 block text-xs font-bold uppercase tracking-wide text-primary";

const SectionHeader = ({ title, description }) => (
  <div className="mb-7">
    <h2 className="text-2xl font-bold text-primary sm:text-3xl">{title}</h2>
    {description && (
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{description}</p>
    )}
  </div>
);

const Field = ({ label, children }) => (
  <div>
    <label className={labelClass}>{label}</label>
    {children}
  </div>
);

const blankQualification = {
  classLevel: "",
  degree: "",
  course: "",
  year: "",
  medium: "",
  mode: "",
  percentage: "",
  school: "",
  university: "",
  college: "",
};

const blankExperience = {
  school: "",
  monthlyTakeHome: "",
  currentEmployer: false,
  board: "",
  startDate: "",
  endDate: "",
  mainSubject: "",
  otherSubjects: "",
  post: "",
  salary: "",
  reason: "",
  details: "",
};

const blankResumeData = {
  awardType: "",
  awardName: "",
  awardBy: "",
  awardYear: "",
  courseType: "",
  courseName: "",
  conductedBy: "",
  courseYear: "",
};

const qualificationOptions = {
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
    "BA",
    "BSc",
    "BCom",
    "BBA",
    "BCA",
    "BTech",
    "BE",
    "B.Ed",
    "MA",
    "MSc",
    "MCom",
    "MBA",
    "MCA",
    "MTech",
    "M.Ed",
    "Research Degree",
    "Subject Specialization",
    "Other",
  ],
  mediums: [
    "English",
    "Hindi",
    "Bilingual (English + Hindi)",
    "Urdu",
    "Punjabi",
    "Bengali",
    "Tamil",
    "Telugu",
    "Marathi",
    "Gujarati",
    "Kannada",
    "Malayalam",
    "Odia",
    "Other",
  ],
  modes: [
    "Regular",
    "Part Time",
    "Distance Learning",
    "Online",
    "Correspondence",
    "Open University",
    "Hybrid",
  ],
  universities: [
    "University of Delhi",
    "Mumbai University",
    "IIT Delhi",
    "JNU",
    "Lucknow University",
    "Anna University",
    "IGNOU",
    "Other",
  ],
  colleges: [
    "Hindu College",
    "Miranda House",
    "IIT Bombay",
    "Amity University",
    "Christ University",
    "Other",
  ],
};

const experienceOptions = {
  boards: [
    "CBSE",
    "ICSE",
    "ISC",
    "State Board",
    "IB (International Baccalaureate)",
    "IGCSE / Cambridge",
    "NIOS",
    "Open School",
    "International Board",
    "Other",
  ],
  subjects: [
    "Accountancy",
    "Biology",
    "Business Studies",
    "Chemistry",
    "Economics",
    "English",
    "Geography",
    "History And Civics",
    "Home Science",
    "Maths",
    "Philosophy",
    "Physics",
    "Pol.Science",
    "Psychology",
    "Science",
    "Social Science",
    "Sociology",
    "Art & Painting",
    "Hindi",
  ],
  posts: [
    "PRT (Primary Teacher)",
    "TGT (Trained Graduate Teacher)",
    "PGT (Post Graduate Teacher)",
    "Assistant Teacher",
    "Subject Teacher",
    "Class Teacher",
    "Senior Teacher",
    "Head Teacher",
    "Vice Principal",
    "Principal",
    "Academic Coordinator",
    "Curriculum Coordinator",
    "Lecturer",
    "Professor",
    "Tutor",
    "Special Educator",
    "Lab Instructor",
    "Counselor",
    "Sports Coach",
    "Music Teacher",
    "Art Teacher",
    "Computer Instructor",
    "Teaching Assistant",
    "Administrative Head",
    "Other",
  ],
  reasons: [
    "Career Growth",
    "Better Opportunity",
    "Higher Salary",
    "Relocation",
    "Personal Reasons",
    "Contract Completed",
    "School Closure",
    "Family Reasons",
    "Health Reasons",
    "Higher Studies",
    "Role Change",
    "Work-Life Balance",
    "Other",
  ],
};

const renderOptions = (items) =>
  items.map((item) => (
    <option key={item} value={item}>
      {item}
    </option>
  ));

const pinStateMap = {
  11: "Delhi",
  12: "Haryana",
  13: "Haryana",
  14: "Punjab",
  16: "Chandigarh",
  17: "Himachal Pradesh",
  18: "Jammu and Kashmir",
  19: "Jammu and Kashmir",
  20: "Uttar Pradesh",
  21: "Uttar Pradesh",
  22: "Uttar Pradesh",
  23: "Uttar Pradesh",
  24: "Uttar Pradesh",
  25: "Uttar Pradesh",
  26: "Uttar Pradesh",
  27: "Uttar Pradesh",
  28: "Uttar Pradesh",
  30: "Rajasthan",
  31: "Rajasthan",
  32: "Rajasthan",
  33: "Rajasthan",
  34: "Rajasthan",
  36: "Gujarat",
  37: "Gujarat",
  38: "Gujarat",
  39: "Gujarat",
  40: "Maharashtra",
  41: "Maharashtra",
  42: "Maharashtra",
  43: "Maharashtra",
  44: "Maharashtra",
  45: "Madhya Pradesh",
  46: "Madhya Pradesh",
  47: "Madhya Pradesh",
  48: "Madhya Pradesh",
  49: "Chhattisgarh",
  50: "Telangana",
  51: "Andhra Pradesh",
  52: "Andhra Pradesh",
  53: "Andhra Pradesh",
  56: "Karnataka",
  57: "Karnataka",
  58: "Karnataka",
  60: "Tamil Nadu",
  61: "Tamil Nadu",
  62: "Tamil Nadu",
  63: "Tamil Nadu",
  64: "Tamil Nadu",
  67: "Kerala",
  68: "Kerala",
  69: "Kerala",
  70: "West Bengal",
  71: "West Bengal",
  72: "West Bengal",
  73: "West Bengal",
  74: "West Bengal",
  75: "Odisha",
  76: "Odisha",
  78: "Assam",
  79: "North East",
  80: "Bihar",
  81: "Bihar",
  82: "Jharkhand",
  83: "Jharkhand",
  84: "Bihar",
};

const hasValue = (item) =>
  Object.values(item).some((value) => {
    if (typeof value === "boolean") return value;
    return String(value || "").trim();
  });

const TeacherProfile = () => {
  const storedUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("currentUser") || "{}");
    } catch {
      return {};
    }
  }, []);

  const [activeSection, setActiveSection] = useState("basic");
  const [profileImage, setProfileImage] = useState(
    storedUser.profilePhoto || "https://i.pravatar.cc/300?img=12"
  );
  const [teacherData, setTeacherData] = useState({
    title: "Mr",
    firstName: storedUser.firstName || "Rahul",
    middleName: "",
    lastName: storedUser.lastName || "Sharma",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    age: "",
    nationality: "Indian",
    currentJob: "",
    mainSubject: "Mathematics",
    additionalSubjects: "History\nGeography\nArt\nMusic",
    classTaughtOne: "Class A",
    classTaughtTwo: "Class C",
    languageOne: "English",
    languageStatusOne: "Fluency enough to teach",
    languageTwo: "",
    languageStatusTwo: "",
    languageThree: "",
    languageStatusThree: "",
    highestQualificationOne: "",
    highestQualificationTwo: "",
    mobile: storedUser.phone || "9876543210",
    whatsapp: "",
    sameAsMobile: false,
    primaryEmail: storedUser.email || "teacher@gmail.com",
    secondaryEmail: "",
    pinCode: "",
    city: storedUser.city || "",
    state: "",
    address: "",
  });

  const [qualificationDraft, setQualificationDraft] = useState(blankQualification);
  const [savedQualifications, setSavedQualifications] = useState([]);
  const [editingQualificationIndex, setEditingQualificationIndex] = useState(null);
  const [showQualificationForm, setShowQualificationForm] = useState(false);
  const qualificationFormRef = useRef(null);

  const [experienceDraft, setExperienceDraft] = useState(blankExperience);
  const [savedExperiences, setSavedExperiences] = useState([]);
  const [editingExperienceIndex, setEditingExperienceIndex] = useState(null);
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const experienceFormRef = useRef(null);

  const [resumeData, setResumeData] = useState(blankResumeData);
  const [savedAwards, setSavedAwards] = useState([]);
  const [savedCourses, setSavedCourses] = useState([]);

  const [resumeDraft, setResumeDraft] = useState({
    title: "",
    format: "PDF",
    fileName: "",
    notes: "",
  });
  const [savedResumes, setSavedResumes] = useState([]);
  const [resumeMode, setResumeMode] = useState("upload");

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    const nextValue = type === "checkbox" ? checked : value;
    const nextState =
      name === "pinCode" && value.length >= 2 ? pinStateMap[value.slice(0, 2)] || "" : undefined;

    setTeacherData((prev) => ({
      ...prev,
      [name]: nextValue,
      ...(name === "sameAsMobile" && checked ? { whatsapp: prev.mobile } : {}),
      ...(nextState !== undefined ? { state: nextState } : {}),
    }));
  };

  const handleDobChange = (e) => {
    const { name, value } = e.target;
    const nextData = { ...teacherData, [name]: value };
    const { dobDay, dobMonth, dobYear } = nextData;
    const birthDate = new Date(`${dobYear}-${dobMonth}-${dobDay}`);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    setTeacherData({ ...nextData, age: Number.isNaN(age) ? "" : age });
  };

  const handleProfileImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const updateQualification = (field, value) => {
    setQualificationDraft((prev) => ({ ...prev, [field]: value }));
  };

  const updateExperience = (field, value) => {
    setExperienceDraft((prev) => ({ ...prev, [field]: value }));
  };

  const saveQualificationDraft = () => {
    if (!hasValue(qualificationDraft)) {
      alert("Please enter qualification details before saving.");
      return false;
    }

    setSavedQualifications((prev) => {
      if (editingQualificationIndex !== null) {
        return prev.map((item, index) =>
          index === editingQualificationIndex ? qualificationDraft : item
        );
      }

      return [...prev, qualificationDraft];
    });
    setQualificationDraft(blankQualification);
    setEditingQualificationIndex(null);
    setShowQualificationForm(false);
    return true;
  };

  const addQualification = () => {
    setQualificationDraft(blankQualification);
    setEditingQualificationIndex(null);
    setShowQualificationForm(true);
    setTimeout(() => qualificationFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  };

  const saveAndAddQualification = () => {
    if (!hasValue(qualificationDraft)) {
      alert("Please enter qualification details before saving.");
      return;
    }

    setSavedQualifications((prev) => {
      if (editingQualificationIndex !== null) {
        return prev.map((item, index) =>
          index === editingQualificationIndex ? qualificationDraft : item
        );
      }

      return [...prev, qualificationDraft];
    });
    setQualificationDraft(blankQualification);
    setEditingQualificationIndex(null);
    setShowQualificationForm(true);
    setTimeout(() => qualificationFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  };

  const removeQualification = (index) => {
    setSavedQualifications((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
    if (editingQualificationIndex === index) {
      setQualificationDraft(blankQualification);
      setEditingQualificationIndex(null);
      setShowQualificationForm(false);
    }
  };

  const editQualification = (index) => {
    setQualificationDraft(savedQualifications[index]);
    setEditingQualificationIndex(index);
    setShowQualificationForm(true);
    qualificationFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const saveExperienceDraft = () => {
    if (!hasValue(experienceDraft)) {
      alert("Please enter experience details before saving.");
      return false;
    }

    if (experienceDraft.startDate && new Date(experienceDraft.startDate) > new Date()) {
      alert("Start date cannot be in the future.");
      return false;
    }

    if (
      experienceDraft.startDate &&
      experienceDraft.endDate &&
      new Date(experienceDraft.endDate) < new Date(experienceDraft.startDate)
    ) {
      alert("End date cannot be before start date.");
      return false;
    }

    if (experienceDraft.endDate && new Date(experienceDraft.endDate) > new Date()) {
      alert("End date cannot be in the future.");
      return false;
    }

    setSavedExperiences((prev) => {
      if (editingExperienceIndex !== null) {
        return prev.map((item, index) =>
          index === editingExperienceIndex ? experienceDraft : item
        );
      }

      return [...prev, experienceDraft];
    });
    setExperienceDraft(blankExperience);
    setEditingExperienceIndex(null);
    setShowExperienceForm(false);
    return true;
  };

  const addExperience = () => {
    setExperienceDraft(blankExperience);
    setEditingExperienceIndex(null);
    setShowExperienceForm(true);
    setTimeout(() => experienceFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  };

  const saveAndAddExperience = () => {
    if (!saveExperienceDraft()) return;
    setExperienceDraft(blankExperience);
    setEditingExperienceIndex(null);
    setShowExperienceForm(true);
    setTimeout(() => experienceFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  };

  const removeExperience = (index) => {
    setSavedExperiences((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
    if (editingExperienceIndex === index) {
      setExperienceDraft(blankExperience);
      setEditingExperienceIndex(null);
      setShowExperienceForm(false);
    }
  };

  const editExperience = (index) => {
    setExperienceDraft(savedExperiences[index]);
    setEditingExperienceIndex(index);
    setShowExperienceForm(true);
    experienceFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleResumeFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      setResumeDraft((prev) => ({
        ...prev,
        title: prev.title || file.name.replace(/\.[^/.]+$/, ""),
        fileName: file.name,
        format: file.type === "application/pdf" ? "PDF" : "Text",
      }));
    }
  };

  const addResume = () => {
    if (!resumeDraft.title.trim() && resumeMode === "create") {
      alert("Please add a resume title.");
      return;
    }

    if (!resumeDraft.fileName.trim() && resumeMode === "upload") {
      alert("Please upload a resume file.");
      return;
    }

    const extension = resumeDraft.format === "PDF" ? "pdf" : "txt";
    const cleanTitle = resumeDraft.title.trim() || resumeDraft.fileName.replace(/\.[^/.]+$/, "") || "Teacher Resume";

    setSavedResumes((prev) => [
      ...prev,
      {
        ...resumeDraft,
        source: resumeMode === "upload" ? "Uploaded" : "Created",
        title: cleanTitle,
        fileName: resumeDraft.fileName || `${cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}.${extension}`,
      },
    ]);
    setResumeDraft({ title: "", format: "PDF", fileName: "", notes: "" });
  };

  const addAward = () => {
    const award = {
      type: resumeData.awardType,
      name: resumeData.awardName,
      by: resumeData.awardBy,
      year: resumeData.awardYear,
    };

    if (!hasValue(award)) {
      alert("Please enter award details before adding.");
      return;
    }

    setSavedAwards((prev) => [...prev, award]);
    setResumeData((prev) => ({
      ...prev,
      awardType: "",
      awardName: "",
      awardBy: "",
      awardYear: "",
    }));
  };

  const addCourse = () => {
    const course = {
      type: resumeData.courseType,
      name: resumeData.courseName,
      by: resumeData.conductedBy,
      year: resumeData.courseYear,
    };

    if (!hasValue(course)) {
      alert("Please enter course details before adding.");
      return;
    }

    setSavedCourses((prev) => [...prev, course]);
    setResumeData((prev) => ({
      ...prev,
      courseType: "",
      courseName: "",
      conductedBy: "",
      courseYear: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeSection === "qualification" && showQualificationForm) {
      if (saveQualificationDraft()) alert("Qualification saved successfully");
      return;
    }

    if (activeSection === "experience" && showExperienceForm) {
      if (saveExperienceDraft()) alert("Experience saved successfully");
      return;
    }

    alert("Profile saved successfully");
  };

  const completionItems = [
    teacherData.firstName,
    teacherData.primaryEmail,
    teacherData.mobile,
    teacherData.mainSubject,
    savedQualifications[0]?.degree || qualificationDraft.degree,
    savedExperiences[0]?.school || experienceDraft.school,
  ];
  const completion = Math.round(
    (completionItems.filter(Boolean).length / completionItems.length) * 100
  );

  const renderBasicInfo = () => (
    <>
      <SectionHeader
        title="My Profile"
        description="Keep your identity, teaching preferences, and profile details accurate for schools."
      />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[120px_1fr_1fr_1fr]">
        <Field label="Title">
          <select name="title" value={teacherData.title} onChange={handleChange} className={compactInputClass}>
            <option>Mr</option>
            <option>Mrs</option>
            <option>Miss</option>
            <option>Ms</option>
            <option>Dr</option>
            <option>Prof</option>
          </select>
        </Field>
        <Field label="First Name">
          <input name="firstName" value={teacherData.firstName} onChange={handleChange} className={inputClass} />
        </Field>
        <Field label="Middle Name">
          <input name="middleName" value={teacherData.middleName} onChange={handleChange} className={inputClass} placeholder="Optional" />
        </Field>
        <Field label="Last Name">
          <input name="lastName" value={teacherData.lastName} onChange={handleChange} className={inputClass} />
        </Field>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div>
          <label className={labelClass}>DOB</label>
          <div className="grid grid-cols-[72px_72px_96px] gap-2">
            <input name="dobDay" value={teacherData.dobDay} onChange={handleDobChange} className={compactInputClass} placeholder="DD" />
            <input name="dobMonth" value={teacherData.dobMonth} onChange={handleDobChange} className={compactInputClass} placeholder="MM" />
            <input name="dobYear" value={teacherData.dobYear} onChange={handleDobChange} className={compactInputClass} placeholder="YYYY" />
          </div>
        </div>
        <Field label="Age (Years Only)">
          <input name="age" value={teacherData.age} readOnly className={inputClass} placeholder="Auto calculated" />
          <p className="mt-2 text-xs text-slate-500">If DOB not entered, user can enter age.</p>
        </Field>
        <Field label="Nationality">
          <select name="nationality" value={teacherData.nationality} onChange={handleChange} className={inputClass}>
            <option value="">Select nationality</option>
            <option>Indian</option>
            <option>Nepalese</option>
            <option>Bhutanese</option>
            <option>Other</option>
          </select>
        </Field>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Field label="Current Job Title">
          <select name="currentJob" value={teacherData.currentJob} onChange={handleChange} className={inputClass}>
            <option value="">Select...</option>
            <option>Primary Teacher</option>
            <option>Mathematics Teacher</option>
            <option>Science Teacher</option>
            <option>English Teacher</option>
            <option>Coordinator</option>
          </select>
        </Field>
        <Field label="Main Subject">
          <select name="mainSubject" value={teacherData.mainSubject} onChange={handleChange} className={inputClass}>
            <option value="">Select Subject</option>
            <option>Mathematics</option>
            <option>Science</option>
            <option>English</option>
            <option>Computer</option>
          </select>
          <p className="mt-2 text-xs text-slate-500">Only one can be selected.</p>
        </Field>
        <div>
          <Field label="Additional Subject(s)">
            <select
              name="additionalSubjects"
              value={teacherData.additionalSubjects}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select additional subject</option>
              <option>History</option>
              <option>Geography</option>
              <option>Art</option>
              <option>Music</option>
              <option>Hindi</option>
              <option>Social Science</option>
              <option>Computer</option>
            </select>
            <p className="mt-2 text-xs text-slate-500">Choose one additional subject for now.</p>
          </Field>
        </div>
        <div className="lg:col-span-3">
          <label className={labelClass}>Classes Taught</label>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <span className="text-sm font-bold text-slate-500">(1)</span>
            <select name="classTaughtOne" value={teacherData.classTaughtOne} onChange={handleChange} className={`${inputClass} sm:max-w-44`}>
              <option value="">Select...</option>
              <option>Class A</option>
              <option>Class B</option>
              <option>Class C</option>
              <option>Class 10</option>
              <option>Class 12</option>
            </select>
            <span className="text-sm font-bold text-slate-500">(2)</span>
            <select name="classTaughtTwo" value={teacherData.classTaughtTwo} onChange={handleChange} className={`${inputClass} sm:max-w-44`}>
              <option value="">Select...</option>
              <option>Class A</option>
              <option>Class B</option>
              <option>Class C</option>
              <option>Class 10</option>
              <option>Class 12</option>
            </select>
          </div>
        </div>
        <div className="lg:col-span-3">
          <label className={labelClass}>Language</label>
          <div className="space-y-4">
            {[
              ["Language 1", "languageOne", "languageStatusOne"],
              ["Language 2", "languageTwo", "languageStatusTwo"],
              ["Language 3", "languageThree", "languageStatusThree"],
            ].map(([label, languageKey, statusKey]) => (
              <div key={languageKey} className="grid grid-cols-1 gap-3 lg:grid-cols-[160px_1fr_1fr] lg:items-center">
                <span className="text-sm font-bold text-slate-500">{label}</span>
                <select name={languageKey} value={teacherData[languageKey]} onChange={handleChange} className={inputClass}>
                  <option value="">Select...</option>
                  <option>English</option>
                  <option>Hindi</option>
                  <option>French</option>
                  <option>Spanish</option>
                </select>
                <select name={statusKey} value={teacherData[statusKey]} onChange={handleChange} className={inputClass}>
                  <option value="">Select...</option>
                  <option>Fluency enough to teach</option>
                  <option>Native Speaker</option>
                  <option>Basic Knowledge</option>
                  <option>Professional Working Proficiency</option>
                </select>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[260px_1fr] lg:items-center">
            <span className="text-sm font-bold text-slate-500">Highest Qualification 1</span>
            <select name="highestQualificationOne" value={teacherData.highestQualificationOne} onChange={handleChange} className={inputClass}>
              <option value="">Select...</option>
              {renderOptions(qualificationOptions.degrees)}
            </select>
            <span className="text-sm font-bold text-slate-500">Highest Qualification 2</span>
            <select name="highestQualificationTwo" value={teacherData.highestQualificationTwo} onChange={handleChange} className={inputClass}>
              <option value="">Select...</option>
              {renderOptions(qualificationOptions.degrees)}
            </select>
          </div>
        </div>
      </div>
    </>
  );

  const renderContact = () => (
    <>
      <SectionHeader
        title="Contact Details"
        description="Update your primary communication methods and postal address."
      />
      <div className="space-y-8">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <span className="rounded-xl bg-primary/10 p-2 text-primary"><Phone size={19} /></span>
            <h3 className="text-lg font-bold text-slate-800">Phone & Email</h3>
          </div>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <Field label="Mobile Number *">
              <input name="mobile" value={teacherData.mobile} onChange={handleChange} className={inputClass} />
            </Field>
            <div>
              <Field label="WhatsApp Number">
                <input name="whatsapp" value={teacherData.whatsapp} onChange={handleChange} className={inputClass} placeholder="Enter WhatsApp number" />
              </Field>
              <label className="mt-3 flex items-center gap-2 text-xs font-semibold text-slate-500">
                <input type="checkbox" name="sameAsMobile" checked={teacherData.sameAsMobile} onChange={handleChange} className="h-4 w-4 accent-primary" />
                Same as Mobile Number
              </label>
            </div>
            <Field label="Primary Email *">
              <input type="email" name="primaryEmail" value={teacherData.primaryEmail} onChange={handleChange} className={inputClass} />
            </Field>
            <Field label="Secondary Email">
              <input type="email" name="secondaryEmail" value={teacherData.secondaryEmail} onChange={handleChange} className={inputClass} placeholder="Enter secondary email" />
            </Field>
          </div>
        </div>
        <div>
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="rounded-xl bg-primary/10 p-2 text-primary"><MapPin size={19} /></span>
              <h3 className="text-lg font-bold text-slate-800">Postal Address</h3>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              <Sparkles size={14} /> Smart Entry
            </span>
          </div>
          <div className="rounded-2xl bg-light p-5">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              <Field label="PIN Code *">
                <input name="pinCode" value={teacherData.pinCode} onChange={handleChange} className={inputClass} placeholder="Enter PIN" />
              </Field>
              <Field label="City *">
                <input name="city" value={teacherData.city} onChange={handleChange} className={inputClass} placeholder="Type city" />
              </Field>
              <Field label="State *">
                <input name="state" value={teacherData.state} onChange={handleChange} className={inputClass} placeholder="Auto-filled" />
              </Field>
            </div>
            <p className="mt-2 text-xs text-slate-500">PIN code can help auto-populate city and state later.</p>
          </div>
          <div className="mt-5">
            <Field label="Full Address for Correspondence">
              <textarea
                name="address"
                value={teacherData.address}
                onChange={handleChange}
                className={`${inputClass} min-h-28 resize-none`}
                placeholder="Flat No., Building Name, Street Name, Landmark..."
              />
            </Field>
          </div>
        </div>
      </div>
    </>
  );

  const renderQualification = () => (
    <>
      <SectionHeader
        title="Academic Qualifications"
      />
      <div className="space-y-7">
        {!showQualificationForm && (
          <button type="button" onClick={addQualification} className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-soft hover:bg-primary/95">
            <Plus size={17} /> Add Qualification
          </button>
        )}

        {showQualificationForm && (
          <div ref={qualificationFormRef} className="rounded-xl border border-borderColor bg-white p-5 shadow-sm">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              <Field label="Class">
                <select
                  value={qualificationDraft.classLevel}
                  onChange={(e) => {
                    const classLevel = e.target.value;
                    setQualificationDraft((prev) => ({
                      ...prev,
                      classLevel,
                      degree: classLevel === "Class 10" ? "Secondary (10th)" : classLevel === "Class 12" ? "Senior Secondary (12th)" : prev.degree,
                    }));
                  }}
                  className={inputClass}
                >
                  <option value="">Select Class</option>
                  <option>Class 10</option>
                  <option>Class 12</option>
                </select>
              </Field>
              {qualificationDraft.classLevel && (
                <Field label="School Name">
                  <input value={qualificationDraft.school} onChange={(e) => updateQualification("school", e.target.value)} className={inputClass} placeholder="Enter school name" />
                </Field>
              )}
              {qualificationDraft.classLevel && (
                <Field label="Percentage %">
                  <input value={qualificationDraft.percentage} onChange={(e) => updateQualification("percentage", e.target.value)} className={inputClass} placeholder="e.g. 76.2" />
                </Field>
              )}
              <Field label="Degree">
                <select value={qualificationDraft.degree} onChange={(e) => updateQualification("degree", e.target.value)} className={inputClass}>
                  <option value="">Select Degree</option>
                  {renderOptions(qualificationOptions.degrees)}
                </select>
              </Field>
              <Field label="Course Name">
                <select value={qualificationDraft.course} onChange={(e) => updateQualification("course", e.target.value)} className={inputClass}>
                  <option value="">Select Course</option>
                  {renderOptions(qualificationOptions.courses)}
                </select>
              </Field>
              <Field label="Year Passed">
                <input value={qualificationDraft.year} onChange={(e) => updateQualification("year", e.target.value)} className={inputClass} placeholder="e.g. 2023" />
              </Field>
              <Field label="Medium of Instruction">
                <select value={qualificationDraft.medium} onChange={(e) => updateQualification("medium", e.target.value)} className={inputClass}>
                  <option value="">Select Medium</option>
                  {renderOptions(qualificationOptions.mediums)}
                </select>
              </Field>
              <Field label="Mode of Study">
                <select value={qualificationDraft.mode} onChange={(e) => updateQualification("mode", e.target.value)} className={inputClass}>
                  <option value="">Select Mode</option>
                  {renderOptions(qualificationOptions.modes)}
                </select>
              </Field>
              {!qualificationDraft.classLevel && (
                <Field label="Percentage %">
                  <input value={qualificationDraft.percentage} onChange={(e) => updateQualification("percentage", e.target.value)} className={inputClass} placeholder="e.g. 76.2" />
                </Field>
              )}
              <Field label="University Name">
                <select value={qualificationDraft.university} onChange={(e) => updateQualification("university", e.target.value)} className={inputClass}>
                  <option value="">Select University</option>
                  {renderOptions(qualificationOptions.universities)}
                </select>
              </Field>
              <div className="lg:col-span-2">
                <Field label="College Name">
                  <select value={qualificationDraft.college} onChange={(e) => updateQualification("college", e.target.value)} className={inputClass}>
                    <option value="">Select College / Institution</option>
                    {renderOptions(qualificationOptions.colleges)}
                  </select>
                </Field>
              </div>
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button type="button" onClick={saveQualificationDraft} className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-soft hover:bg-primary/95">
                <Save size={17} /> Save
              </button>
              <button type="button" onClick={saveAndAddQualification} className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/30 bg-white px-6 py-3 text-sm font-bold text-primary hover:bg-primary/5">
                <Plus size={17} /> Add Another
              </button>
            </div>
          </div>
        )}

        <div className="rounded-xl bg-light p-5">
          <h3 className="mb-4 text-lg font-bold text-primary">Saved Qualifications</h3>
          {savedQualifications.length === 0 ? (
            <p className="text-sm text-slate-500">Saved qualification entries will appear here.</p>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-borderColor bg-white">
              <table className="min-w-[980px] w-full text-left text-sm">
                <thead className="bg-primary/5 text-xs uppercase tracking-wide text-primary">
                  <tr>
                    {["Class", "School", "%", "Degree", "Course", "Year", "Medium", "Mode", "University", "College", "Action"].map((heading) => (
                      <th key={heading} className="px-4 py-3 font-bold">{heading}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-borderColor text-slate-600">
                  {savedQualifications.map((item, index) => (
                    <tr key={`${item.degree}-${index}`} className="align-top">
                      <td className="px-4 py-3 font-bold text-slate-800">{item.classLevel || "Not added"}</td>
                      <td className="px-4 py-3">{item.school || "Not added"}</td>
                      <td className="px-4 py-3">{item.percentage || "Not added"}</td>
                      <td className="px-4 py-3">{item.degree || "Not added"}</td>
                      <td className="px-4 py-3">{item.course || "Not added"}</td>
                      <td className="px-4 py-3">{item.year || "Not added"}</td>
                      <td className="px-4 py-3">{item.medium || "Not added"}</td>
                      <td className="px-4 py-3">{item.mode || "Not added"}</td>
                      <td className="px-4 py-3">{item.university || "Not added"}</td>
                      <td className="px-4 py-3">{item.college || "Not added"}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button type="button" onClick={() => editQualification(index)} className="rounded-lg border border-borderColor px-3 py-2 text-xs font-bold text-primary hover:bg-primary/5">
                            Edit
                          </button>
                          <button type="button" onClick={() => removeQualification(index)} className="rounded-lg border border-red-100 px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-50">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );

  const renderExperience = () => (
    <>
      <SectionHeader
        title="Teaching Experience"
      />
      <div className="space-y-7">
        {!showExperienceForm && (
          <button type="button" onClick={addExperience} className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-soft hover:bg-primary/95">
            <Plus size={17} /> Add Experience
          </button>
        )}

        {showExperienceForm && (
          <div ref={experienceFormRef} className="rounded-xl border border-borderColor bg-white p-5 shadow-sm">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Field label="Name of the School">
                  <input value={experienceDraft.school} onChange={(e) => updateExperience("school", e.target.value)} className={inputClass} placeholder="e.g. Lincoln High School" />
                </Field>
              </div>
              <label className="mt-8 flex items-center gap-2 text-sm font-bold text-slate-600">
                <input type="checkbox" checked={experienceDraft.currentEmployer} onChange={(e) => updateExperience("currentEmployer", e.target.checked)} className="h-4 w-4 accent-primary" />
                Current Employer
              </label>
              <Field label="Board">
                <select value={experienceDraft.board} onChange={(e) => updateExperience("board", e.target.value)} className={inputClass}>
                  <option value="">Select Board</option>
                  {renderOptions(experienceOptions.boards)}
                </select>
              </Field>
              <Field label="Start Date">
                <input
                  type="date"
                  value={experienceDraft.startDate}
                  max={new Date().toISOString().split("T")[0]}
                  onChange={(e) => updateExperience("startDate", e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="End Date">
                <input
                  type="date"
                  value={experienceDraft.endDate}
                  min={experienceDraft.startDate || undefined}
                  max={new Date().toISOString().split("T")[0]}
                  disabled={experienceDraft.currentEmployer}
                  onChange={(e) => updateExperience("endDate", e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Subject Taught (Main)">
                <select value={experienceDraft.mainSubject} onChange={(e) => updateExperience("mainSubject", e.target.value)} className={inputClass}>
                  <option value="">Select Main Subject</option>
                  {renderOptions(experienceOptions.subjects)}
                </select>
              </Field>
              <Field label="Other Subjects">
                <select value={experienceDraft.otherSubjects} onChange={(e) => updateExperience("otherSubjects", e.target.value)} className={inputClass}>
                  <option value="">Select Other Subject</option>
                  {renderOptions(experienceOptions.subjects)}
                </select>
              </Field>
              <Field label="Post Held / Job Title">
                <select value={experienceDraft.post} onChange={(e) => updateExperience("post", e.target.value)} className={inputClass}>
                  <option value="">Select Post</option>
                  {renderOptions(experienceOptions.posts)}
                </select>
              </Field>
              <Field label="Salary Drawn (CTC) per Year">
                <input
                  type="number"
                  value={experienceDraft.salary}
                  onChange={(e) => updateExperience("salary", e.target.value)}
                  className={inputClass}
                  placeholder="e.g. 600000"
                />
              </Field>

              <Field label="Monthly Take Home">
                <input
                  type="number"
                  value={experienceDraft.monthlyTakeHome}
                  onChange={(e) =>
                    updateExperience("monthlyTakeHome", e.target.value)
                  }
                  className={inputClass}
                  placeholder="e.g. 50000"
                />
              </Field>
              <Field label="Reason for Leaving">
                <select value={experienceDraft.reason} onChange={(e) => updateExperience("reason", e.target.value)} className={inputClass}>
                  <option value="">Select Reason</option>
                  {renderOptions(experienceOptions.reasons)}
                </select>
              </Field>
              <div className="lg:col-span-3">
                <Field label="Any other details to be mentioned">
                  <textarea value={experienceDraft.details} onChange={(e) => updateExperience("details", e.target.value)} className={`${inputClass} min-h-28 resize-none`} placeholder="Describe key achievements, responsibilities, or specific methodologies used." />
                </Field>
              </div>
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button type="button" onClick={saveExperienceDraft} className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-soft hover:bg-primary/95">
                <Save size={17} /> Save
              </button>
              <button type="button" onClick={saveAndAddExperience} className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/30 bg-white px-6 py-3 text-sm font-bold text-primary hover:bg-primary/5">
                <Plus size={17} /> Add Another
              </button>
            </div>
          </div>
        )}

        <div className="rounded-xl bg-light p-5">
          <h3 className="mb-4 text-lg font-bold text-primary">Saved Experience</h3>
          {savedExperiences.length === 0 ? (
            <p className="text-sm text-slate-500">Saved experience entries will appear here.</p>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-borderColor bg-white">
              <table className="min-w-[1100px] w-full text-left text-sm">
                <thead className="bg-primary/5 text-xs uppercase tracking-wide text-primary">
                  <tr>
                    {["School", "Current", "Board", "Start", "End", "Main Subject", "Other Subject", "Post", "Salary", "Monthly Take Home", "Reason", "Action"].map((heading) => (
                      <th key={heading} className="px-4 py-3 font-bold">{heading}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-borderColor text-slate-600">
                  {savedExperiences.map((item, index) => (
                    <tr key={`${item.school}-${index}`} className="align-top">
                      <td className="px-4 py-3 font-bold text-slate-800">{item.school || "Not added"}</td>
                      <td className="px-4 py-3">{item.currentEmployer ? "Yes" : "No"}</td>
                      <td className="px-4 py-3">{item.board || "Not added"}</td>
                      <td className="px-4 py-3">{item.startDate || "Not added"}</td>
                      <td className="px-4 py-3">{item.currentEmployer ? "Present" : item.endDate || "Not added"}</td>
                      <td className="px-4 py-3">{item.mainSubject || "Not added"}</td>
                      <td className="px-4 py-3">{item.otherSubjects || "Not added"}</td>
                      <td className="px-4 py-3">{item.post || "Not added"}</td>
                      <td className="px-4 py-3">{item.salary || "Not added"}</td>
                      <td className="px-4 py-3">{item.monthlyTakeHome || "Not added"}</td>
                      <td className="px-4 py-3">{item.reason || "Not added"}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button type="button" onClick={() => editExperience(index)} className="rounded-lg border border-borderColor px-3 py-2 text-xs font-bold text-primary hover:bg-primary/5">
                            Edit
                          </button>
                          <button type="button" onClick={() => removeExperience(index)} className="rounded-lg border border-red-100 px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-50">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );

  const renderAchievements = () => (
    <>
      <SectionHeader
        title="Achievements"
        description="Add achievements, recognitions, and professional development courses to strengthen your profile."
      />
      <div className="space-y-8">
        <div className="rounded-2xl border border-borderColor bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3 border-b border-borderColor pb-5">
            <span className="rounded-xl bg-primary/10 p-2 text-primary"><Trophy size={20} /></span>
            <h3 className="text-lg font-bold text-slate-800">Achievements & Recognitions</h3>
          </div>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
            <Field label="Type">
              <select value={resumeData.awardType} onChange={(e) => setResumeData((prev) => ({ ...prev, awardType: e.target.value }))} className={inputClass}>
                <option value="">Select category</option>
                <option>Award</option>
                <option>Recognition</option>
                <option>Publication</option>
              </select>
            </Field>
            <Field label="Name of the Award">
              <input value={resumeData.awardName} onChange={(e) => setResumeData((prev) => ({ ...prev, awardName: e.target.value }))} className={inputClass} placeholder="e.g. Best Educator Award" />
            </Field>
            <Field label="Presented By">
              <input value={resumeData.awardBy} onChange={(e) => setResumeData((prev) => ({ ...prev, awardBy: e.target.value }))} className={inputClass} placeholder="Organization / Institute" />
            </Field>
            <Field label="Year">
              <input value={resumeData.awardYear} onChange={(e) => setResumeData((prev) => ({ ...prev, awardYear: e.target.value }))} className={inputClass} placeholder="Year" />
            </Field>
          </div>
          <button type="button" onClick={addAward} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary">
            <Plus size={16} /> Add Another Award
          </button>
          <div className="mt-5 rounded-2xl bg-light p-4">
            <h4 className="mb-3 font-bold text-primary">Saved Awards</h4>
            {savedAwards.length === 0 ? (
              <p className="text-sm text-slate-500">Saved award entries will appear here.</p>
            ) : (
              <div className="space-y-3">
                {savedAwards.map((award, index) => (
                  <div key={`award-${index}`} className="rounded-xl border border-borderColor bg-white p-4 text-sm text-slate-600">
                    <p className="mb-2 font-bold text-slate-800">Award #{index + 1}</p>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
                      <p><span className="font-bold text-slate-800">Type:</span> {award.type || "Not added"}</p>
                      <p><span className="font-bold text-slate-800">Name:</span> {award.name || "Not added"}</p>
                      <p><span className="font-bold text-slate-800">Presented By:</span> {award.by || "Not added"}</p>
                      <p><span className="font-bold text-slate-800">Year:</span> {award.year || "Not added"}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="rounded-2xl border border-borderColor bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3 border-b border-borderColor pb-5">
            <span className="rounded-xl bg-primary/10 p-2 text-primary"><BookOpen size={20} /></span>
            <h3 className="text-lg font-bold text-slate-800">Additional Courses & Trainings</h3>
          </div>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
            <Field label="Type">
              <select value={resumeData.courseType} onChange={(e) => setResumeData((prev) => ({ ...prev, courseType: e.target.value }))} className={inputClass}>
                <option value="">Select type</option>
                <option>Workshop</option>
                <option>Certification</option>
                <option>Training</option>
              </select>
            </Field>
            <Field label="Name of the Course">
              <input value={resumeData.courseName} onChange={(e) => setResumeData((prev) => ({ ...prev, courseName: e.target.value }))} className={inputClass} placeholder="e.g. Advanced Pedagogy" />
            </Field>
            <Field label="Conducted By">
              <input value={resumeData.conductedBy} onChange={(e) => setResumeData((prev) => ({ ...prev, conductedBy: e.target.value }))} className={inputClass} placeholder="Organization / Institute" />
            </Field>
            <Field label="Year">
              <input value={resumeData.courseYear} onChange={(e) => setResumeData((prev) => ({ ...prev, courseYear: e.target.value }))} className={inputClass} placeholder="Year" />
            </Field>
          </div>
          <button type="button" onClick={addCourse} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary">
            <Plus size={16} /> Add Another Course
          </button>
          <div className="mt-5 rounded-2xl bg-light p-4">
            <h4 className="mb-3 font-bold text-primary">Saved Courses</h4>
            {savedCourses.length === 0 ? (
              <p className="text-sm text-slate-500">Saved course entries will appear here.</p>
            ) : (
              <div className="space-y-3">
                {savedCourses.map((course, index) => (
                  <div key={`course-${index}`} className="rounded-xl border border-borderColor bg-white p-4 text-sm text-slate-600">
                    <p className="mb-2 font-bold text-slate-800">Course #{index + 1}</p>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
                      <p><span className="font-bold text-slate-800">Type:</span> {course.type || "Not added"}</p>
                      <p><span className="font-bold text-slate-800">Name:</span> {course.name || "Not added"}</p>
                      <p><span className="font-bold text-slate-800">Conducted By:</span> {course.by || "Not added"}</p>
                      <p><span className="font-bold text-slate-800">Year:</span> {course.year || "Not added"}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );

  const renderResume = () => (
    <>
      <SectionHeader
        title="Resume"
        description="Upload a resume or create a basic resume entry, then choose PDF or text format."
      />
      <div className="space-y-7">
        <div className="rounded-xl border border-borderColor bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-col gap-4 border-b border-borderColor pb-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <span className="rounded-xl bg-primary/10 p-2 text-primary"><Upload size={20} /></span>
              <h3 className="text-lg font-bold text-slate-800">{resumeMode === "upload" ? "Add Resume" : "Create Resume"}</h3>
            </div>
            <div className="grid grid-cols-2 rounded-xl border border-borderColor bg-light p-1 text-sm font-bold">
              <button type="button" onClick={() => setResumeMode("upload")} className={`rounded-lg px-4 py-2 ${resumeMode === "upload" ? "bg-white text-primary shadow-sm" : "text-slate-500"}`}>
                Add Resume
              </button>
              <button type="button" onClick={() => setResumeMode("create")} className={`rounded-lg px-4 py-2 ${resumeMode === "create" ? "bg-white text-primary shadow-sm" : "text-slate-500"}`}>
                Create Resume
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <Field label="Resume Title">
              <input
                value={resumeDraft.title}
                onChange={(e) => setResumeDraft((prev) => ({ ...prev, title: e.target.value }))}
                className={inputClass}
                placeholder="e.g. Senior Teacher Resume"
              />
            </Field>
            <Field label="Format">
              <select
                value={resumeDraft.format}
                onChange={(e) => setResumeDraft((prev) => ({ ...prev, format: e.target.value }))}
                className={inputClass}
              >
                <option>PDF</option>
                <option>Text</option>
              </select>
            </Field>
            {resumeMode === "upload" && (
              <Field label="Upload File">
                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-primary/40 bg-light px-4 py-3 text-sm font-bold text-primary hover:bg-primary/5">
                  <Upload size={17} /> Choose PDF/Text
                  <input type="file" hidden accept=".pdf,.txt,text/plain,application/pdf" onChange={handleResumeFile} />
                </label>
              </Field>
            )}
            <div className="lg:col-span-3">
              <Field label="Resume Notes">
                <textarea
                  value={resumeDraft.notes}
                  onChange={(e) => setResumeDraft((prev) => ({ ...prev, notes: e.target.value }))}
                  className={`${inputClass} min-h-24 resize-none`}
                  placeholder="Short note about when to use this resume."
                />
              </Field>
              {resumeDraft.fileName && (
                <p className="mt-2 text-xs font-bold text-slate-500">Selected file: {resumeDraft.fileName}</p>
              )}
            </div>
          </div>
          <button type="button" onClick={addResume} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-soft hover:bg-primary/95">
            <Plus size={17} /> {resumeMode === "upload" ? "Add Resume" : "Create Resume"}
          </button>
        </div>

        <div className="rounded-xl bg-light p-5">
          <h3 className="mb-4 text-lg font-bold text-primary">All Resumes</h3>
          {savedResumes.length === 0 ? (
            <p className="text-sm text-slate-500">Added or created resumes will appear here.</p>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-borderColor bg-white">
              <table className="min-w-[760px] w-full text-left text-sm">
                <thead className="bg-primary/5 text-xs uppercase tracking-wide text-primary">
                  <tr>
                    {["Title", "Format", "Source", "File", "Notes", "Action"].map((heading) => (
                      <th key={heading} className="px-4 py-3 font-bold">{heading}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-borderColor text-slate-600">
                  {savedResumes.map((resume, index) => (
                    <tr key={`${resume.fileName}-${index}`} className="align-top">
                      <td className="px-4 py-3 font-bold text-slate-800">{resume.title}</td>
                      <td className="px-4 py-3">{resume.format}</td>
                      <td className="px-4 py-3">{resume.source}</td>
                      <td className="px-4 py-3">{resume.fileName}</td>
                      <td className="px-4 py-3">{resume.notes || "Not added"}</td>
                      <td className="px-4 py-3">
                        <button type="button" onClick={() => setSavedResumes((prev) => prev.filter((_, itemIndex) => itemIndex !== index))} className="rounded-lg border border-red-100 px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-50">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );

  const renderViewProfile = () => (
    <>
      <SectionHeader title="View Profile" />
      <div className="rounded-xl border border-borderColor bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <img src={profileImage} alt="profile" className="h-28 w-28 rounded-xl border border-borderColor object-cover" />
          <div className="min-w-0 flex-1">
            <h3 className="text-2xl font-bold text-slate-900">
              {teacherData.title} {teacherData.firstName} {teacherData.middleName} {teacherData.lastName}
            </h3>
            <div className="mt-5 grid grid-cols-1 gap-4 text-sm text-slate-600 md:grid-cols-3">
              <p><span className="font-bold text-slate-800">Mobile:</span> {teacherData.mobile || "Not added"}</p>
              <p><span className="font-bold text-slate-800">Email:</span> {teacherData.primaryEmail || "Not added"}</p>
              <p><span className="font-bold text-slate-800">Nationality:</span> {teacherData.nationality || "Not added"}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderActiveSection = () => {
    if (activeSection === "contact") return renderContact();
    if (activeSection === "qualification") return renderQualification();
    if (activeSection === "experience") return renderExperience();
    if (activeSection === "achievements") return renderAchievements();
    if (activeSection === "resume") return renderResume();
    if (activeSection === "viewProfile") return renderViewProfile();
    return renderBasicInfo();
  };

  return (
    <div className="min-h-screen bg-light">
      <form onSubmit={handleSubmit} className="flex min-h-screen">
        <aside className="hidden w-72 bg-primary p-5 text-white lg:block">
          <div className="rounded-3xl bg-white/10 p-5">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <img src={profileImage} alt="profile" className="h-24 w-24 rounded-3xl border-4 border-white/20 object-cover" />
                <span className="absolute -bottom-2 -right-2 rounded-full bg-green-500 p-2 text-white">
                  <CheckCircle2 size={18} />
                </span>
              </div>
              <label className="mt-5 cursor-pointer rounded-xl bg-white px-4 py-2 text-sm font-bold text-primary hover:bg-white/90">
                Upload Photo
                <input type="file" hidden onChange={handleProfileImage} />
              </label>
              <h1 className="mt-5 text-xl font-bold text-white">
                {teacherData.title} {teacherData.firstName} {teacherData.lastName}
              </h1>
              <p className="mt-1 text-sm text-white/70">{teacherData.currentJob}</p>
            </div>
          </div>

          <div className="mt-6 rounded-3xl bg-white/10 p-5">
            <div className="mb-3 flex items-center justify-between text-sm font-bold text-white">
              <span>Profile Score</span>
              <span>{completion}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/20">
              <div className="h-full rounded-full bg-white" style={{ width: `${completion}%` }} />
            </div>
          </div>

          <nav className="mt-8 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${isActive
                      ? "bg-white text-primary shadow-soft"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                >
                  <Icon size={18} />
                  {item.label}
                </button>
              );
            })}
          </nav>

        </aside>

        <main className="min-w-0 flex-1 p-4 sm:p-5 lg:p-8">
          <div className="mb-6 flex flex-col gap-4 rounded-3xl bg-white p-5 shadow-soft md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[2px] text-secondary">
                Profile Workspace
              </p>
              <h1 className="mt-1 text-2xl font-bold text-primary sm:text-3xl">Teacher Profile</h1>
              <p className="mt-1 text-sm text-slate-500">
                Complete your profile sections so schools can evaluate you faster.
              </p>
            </div>
            <BackButton />
          </div>

          <div className="mb-6 flex gap-2 overflow-x-auto rounded-3xl bg-white p-3 shadow-soft lg:hidden">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  className={`flex shrink-0 items-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold transition ${isActive
                      ? "bg-primary text-white"
                      : "bg-light text-primary"
                    }`}
                >
                  <Icon size={17} />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="rounded-3xl bg-white p-4 shadow-soft sm:p-6 lg:p-8">
            {renderActiveSection()}
            {!["qualification", "experience", "viewProfile"].includes(activeSection) && (
              <div className="mt-10 flex flex-col-reverse gap-3 border-t border-borderColor pt-6 sm:flex-row sm:justify-end">
                <button type="button" className="rounded-xl border border-borderColor px-6 py-3 text-sm font-bold text-slate-500 hover:bg-light">
                  Cancel
                </button>
                <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-soft hover:bg-primary/95">
                  <Save size={17} /> Save Changes
                </button>
              </div>
            )}
          </div>
        </main>
      </form>
    </div>
  );
};

export default TeacherProfile;
