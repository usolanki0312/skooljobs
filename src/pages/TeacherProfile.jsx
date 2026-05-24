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
  { id: "contact", label: "Contact Details", icon: Phone },
  { id: "qualification", label: "Qualification", icon: GraduationCap },
  { id: "experience", label: "Experience", icon: BriefcaseBusiness },
  { id: "achievements", label: "Achievements", icon: Award },
  { id: "resume", label: "Resume", icon: FileText },
  { id: "viewProfile", label: "View Profile", icon: Eye },
];

const inputClass =
  "w-full rounded-xl border border-borderColor bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:bg-slate-100 disabled:text-slate-500";

const compactInputClass =
  "w-full rounded-xl border border-borderColor bg-white px-3 py-3 text-sm text-slate-800 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:bg-slate-100 disabled:text-slate-500";

const labelClass = "mb-2 block text-xs font-bold uppercase tracking-wide text-primary";

const SectionHeader = ({ title, description }) => (
  <div className="mb-7">
    <h2 className="text-2xl font-bold text-primary sm:text-3xl">{title}</h2>
    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{description}</p>
  </div>
);

const Field = ({ label, children }) => (
  <div>
    <label className={labelClass}>{label}</label>
    {children}
  </div>
);

const blankQualification = {
  degree: "",
  course: "",
  year: "",
  medium: "",
  mode: "",
  percentage: "",
  university: "",
  college: "",
};

const blankExperience = {
  school: "",
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
  const qualificationFormRef = useRef(null);

  const [experienceDraft, setExperienceDraft] = useState(blankExperience);
  const [savedExperiences, setSavedExperiences] = useState([]);
  const [editingExperienceIndex, setEditingExperienceIndex] = useState(null);
  const experienceFormRef = useRef(null);

  const [resumeData, setResumeData] = useState({
    awardType: "",
    awardName: "",
    awardBy: "",
    awardYear: "",
    courseType: "",
    courseName: "",
    conductedBy: "",
    courseYear: "",
  });

  const [resumeDraft, setResumeDraft] = useState({
    title: "",
    format: "PDF",
    fileName: "",
    notes: "",
  });
  const [savedResumes, setSavedResumes] = useState([
    {
      title: "Modern Teacher Resume",
      format: "PDF",
      fileName: "modern-teacher-resume.pdf",
      notes: "Clean one-page layout for quick school screening.",
    },
    {
      title: "Academic CV Resume",
      format: "PDF",
      fileName: "academic-cv-resume.pdf",
      notes: "Detailed format for qualification and teaching history.",
    },
    {
      title: "Fresher Teacher Resume",
      format: "Text",
      fileName: "fresher-teacher-resume.txt",
      notes: "Simple text format for new teaching applicants.",
    },
  ]);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    const nextValue = type === "checkbox" ? checked : value;

    setTeacherData((prev) => ({
      ...prev,
      [name]: nextValue,
      ...(name === "sameAsMobile" && checked ? { whatsapp: prev.mobile } : {}),
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
    return true;
  };

  const addQualification = () => {
    if (hasValue(qualificationDraft)) {
      saveQualificationDraft();
      return;
    }

    setQualificationDraft(blankQualification);
    setEditingQualificationIndex(null);
  };

  const removeQualification = (index) => {
    setSavedQualifications((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
    if (editingQualificationIndex === index) {
      setQualificationDraft(blankQualification);
      setEditingQualificationIndex(null);
    }
  };

  const editQualification = (index) => {
    setQualificationDraft(savedQualifications[index]);
    setEditingQualificationIndex(index);
    qualificationFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const saveExperienceDraft = () => {
    if (!hasValue(experienceDraft)) {
      alert("Please enter experience details before saving.");
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
    return true;
  };

  const addExperience = () => {
    if (hasValue(experienceDraft)) {
      saveExperienceDraft();
      return;
    }

    setExperienceDraft(blankExperience);
    setEditingExperienceIndex(null);
  };

  const removeExperience = (index) => {
    setSavedExperiences((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
    if (editingExperienceIndex === index) {
      setExperienceDraft(blankExperience);
      setEditingExperienceIndex(null);
    }
  };

  const editExperience = (index) => {
    setExperienceDraft(savedExperiences[index]);
    setEditingExperienceIndex(index);
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
    if (!resumeDraft.title.trim() && !resumeDraft.fileName.trim()) {
      alert("Please add a resume title or upload a file.");
      return;
    }

    setSavedResumes((prev) => [
      ...prev,
      {
        ...resumeDraft,
        title: resumeDraft.title || "New Resume",
        fileName: resumeDraft.fileName || "Manual resume entry",
      },
    ]);
    setResumeDraft({ title: "", format: "PDF", fileName: "", notes: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeSection === "qualification") {
      if (saveQualificationDraft()) alert("Qualification saved successfully");
      return;
    }

    if (activeSection === "experience") {
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
            <option>Dr</option>
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
          <input name="nationality" value={teacherData.nationality} onChange={handleChange} className={inputClass} />
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
              <option>B.Ed</option>
              <option>M.Ed</option>
              <option>B.Sc</option>
              <option>M.Sc</option>
              <option>Ph.D</option>
            </select>
            <span className="text-sm font-bold text-slate-500">Highest Qualification 2</span>
            <select name="highestQualificationTwo" value={teacherData.highestQualificationTwo} onChange={handleChange} className={inputClass}>
              <option value="">Select...</option>
              <option>B.Ed</option>
              <option>M.Ed</option>
              <option>B.Sc</option>
              <option>M.Sc</option>
              <option>Ph.D</option>
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
        description="Enter one qualification at a time. Save it, then add another qualification whenever needed."
      />
      <div className="space-y-7">
        <div ref={qualificationFormRef} className="rounded-2xl border border-borderColor bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between border-b border-borderColor pb-3">
            <span className="text-xs font-bold uppercase tracking-[2px] text-slate-400">
              {editingQualificationIndex !== null
                ? `Editing Entry #${editingQualificationIndex + 1}`
                : "New Qualification"}
            </span>
          </div>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              <Field label="Degree">
                <select value={qualificationDraft.degree} onChange={(e) => updateQualification("degree", e.target.value)} className={inputClass}>
                  <option value="">Select Degree</option>
                  <option>B.Ed</option>
                  <option>B.A</option>
                  <option>B.Sc</option>
                  <option>M.A</option>
                  <option>M.Sc</option>
                  <option>Ph.D</option>
                </select>
              </Field>
              <Field label="Course Name">
                <select value={qualificationDraft.course} onChange={(e) => updateQualification("course", e.target.value)} className={inputClass}>
                  <option value="">Select Course</option>
                  <option>Mathematics</option>
                  <option>Science</option>
                  <option>English</option>
                  <option>Computer Science</option>
                </select>
              </Field>
              <Field label="Year Passed">
                <input value={qualificationDraft.year} onChange={(e) => updateQualification("year", e.target.value)} className={inputClass} placeholder="e.g. 2023" />
              </Field>
              <Field label="Medium of Instruction">
                <select value={qualificationDraft.medium} onChange={(e) => updateQualification("medium", e.target.value)} className={inputClass}>
                  <option value="">Select Medium</option>
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Regional Language</option>
                </select>
              </Field>
              <Field label="Mode of Study">
                <select value={qualificationDraft.mode} onChange={(e) => updateQualification("mode", e.target.value)} className={inputClass}>
                  <option value="">Select Mode</option>
                  <option>Regular</option>
                  <option>Distance</option>
                  <option>Online</option>
                </select>
              </Field>
              <Field label="Percentage %">
                <input value={qualificationDraft.percentage} onChange={(e) => updateQualification("percentage", e.target.value)} className={inputClass} placeholder="e.g. 76.2" />
              </Field>
              <Field label="University Name">
                <input value={qualificationDraft.university} onChange={(e) => updateQualification("university", e.target.value)} className={inputClass} placeholder="Enter University" />
              </Field>
              <div className="lg:col-span-2">
                <Field label="College Name">
                  <input value={qualificationDraft.college} onChange={(e) => updateQualification("college", e.target.value)} className={inputClass} placeholder="Enter College / Institution" />
                </Field>
              </div>
            </div>
          <div className="mt-7 flex justify-center">
            <button type="button" onClick={addQualification} className="inline-flex items-center gap-2 rounded-2xl border border-dashed border-primary/40 bg-white px-7 py-4 text-sm font-bold text-primary hover:bg-primary/5">
              <Plus size={18} /> Add Another Qualification
            </button>
          </div>
        </div>

        <div className="rounded-2xl bg-light p-5">
          <h3 className="mb-4 text-lg font-bold text-primary">Saved Qualifications</h3>
          {savedQualifications.length === 0 ? (
            <p className="text-sm text-slate-500">Saved qualification entries will appear here.</p>
          ) : (
            <div className="space-y-3">
              {savedQualifications.map((item, index) => (
                <div key={`${item.degree}-${index}`} className="rounded-xl border border-borderColor bg-white p-4">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h4 className="font-bold text-slate-800">
                        {item.degree || "Qualification"} {item.course ? `- ${item.course}` : ""}
                      </h4>
                      <p className="mt-1 text-sm text-slate-500">
                        {item.university || "University not added"} {item.year ? `| ${item.year}` : ""}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {item.mode || "Mode not added"} {item.percentage ? `| ${item.percentage}%` : ""}
                      </p>
                      <div className="mt-4 grid grid-cols-1 gap-3 text-sm text-slate-600 sm:grid-cols-2 lg:grid-cols-4">
                        <p><span className="font-bold text-slate-800">Degree:</span> {item.degree || "Not added"}</p>
                        <p><span className="font-bold text-slate-800">Course:</span> {item.course || "Not added"}</p>
                        <p><span className="font-bold text-slate-800">Year Passed:</span> {item.year || "Not added"}</p>
                        <p><span className="font-bold text-slate-800">Medium:</span> {item.medium || "Not added"}</p>
                        <p><span className="font-bold text-slate-800">Mode:</span> {item.mode || "Not added"}</p>
                        <p><span className="font-bold text-slate-800">Percentage:</span> {item.percentage || "Not added"}</p>
                        <p><span className="font-bold text-slate-800">University:</span> {item.university || "Not added"}</p>
                        <p><span className="font-bold text-slate-800">College:</span> {item.college || "Not added"}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => editQualification(index)} className="rounded-lg border border-borderColor px-4 py-2 text-sm font-bold text-primary hover:bg-primary/5">
                        Edit
                      </button>
                      <button type="button" onClick={() => removeQualification(index)} className="rounded-lg border border-red-100 px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
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
        description="Save one experience entry at a time, then add more roles without losing previous entries."
      />
      <div className="space-y-7">
        <div ref={experienceFormRef} className="rounded-2xl border border-borderColor border-l-4 border-l-primary bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="font-bold text-primary">
              {editingExperienceIndex !== null
                ? `Editing Experience #${editingExperienceIndex + 1}`
                : "New Experience"}
            </h3>
          </div>
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
                  <option>CBSE</option>
                  <option>ICSE</option>
                  <option>State Board</option>
                  <option>IB</option>
                </select>
              </Field>
              <Field label="Start Date">
                <input type="date" value={experienceDraft.startDate} onChange={(e) => updateExperience("startDate", e.target.value)} className={inputClass} />
              </Field>
              <Field label="End Date">
                <input type="date" value={experienceDraft.endDate} disabled={experienceDraft.currentEmployer} onChange={(e) => updateExperience("endDate", e.target.value)} className={inputClass} />
              </Field>
              <Field label="Subject Taught (Main)">
                <select value={experienceDraft.mainSubject} onChange={(e) => updateExperience("mainSubject", e.target.value)} className={inputClass}>
                  <option value="">Select Main Subject</option>
                  <option>Mathematics</option>
                  <option>Science</option>
                  <option>English</option>
                  <option>History</option>
                </select>
              </Field>
              <Field label="Other Subjects">
                <textarea value={experienceDraft.otherSubjects} onChange={(e) => updateExperience("otherSubjects", e.target.value)} className={`${inputClass} min-h-24 resize-none`} placeholder="Mathematics&#10;Science&#10;English" />
              </Field>
              <Field label="Post Held / Job Title">
                <select value={experienceDraft.post} onChange={(e) => updateExperience("post", e.target.value)} className={inputClass}>
                  <option value="">Select Post</option>
                  <option>Teacher</option>
                  <option>Senior Teacher</option>
                  <option>HOD</option>
                  <option>Coordinator</option>
                </select>
              </Field>
              <Field label="Salary Drawn (CTC)">
                <input value={experienceDraft.salary} onChange={(e) => updateExperience("salary", e.target.value)} className={inputClass} placeholder="e.g. 600000" />
              </Field>
              <Field label="Reason for Leaving">
                <input value={experienceDraft.reason} onChange={(e) => updateExperience("reason", e.target.value)} className={inputClass} placeholder="e.g. Career growth" />
              </Field>
              <div className="lg:col-span-3">
                <Field label="Any other details to be mentioned">
                  <textarea value={experienceDraft.details} onChange={(e) => updateExperience("details", e.target.value)} className={`${inputClass} min-h-28 resize-none`} placeholder="Describe key achievements, responsibilities, or specific methodologies used." />
                </Field>
              </div>
            </div>
          <div className="mt-7 flex justify-end">
            <button type="button" onClick={addExperience} className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-soft hover:bg-primary/95">
              <Plus size={17} /> Add Next
            </button>
          </div>
        </div>

        <div className="rounded-2xl bg-light p-5">
          <h3 className="mb-4 text-lg font-bold text-primary">Saved Experience</h3>
          {savedExperiences.length === 0 ? (
            <p className="text-sm text-slate-500">Saved experience entries will appear here.</p>
          ) : (
            <div className="space-y-3">
              {savedExperiences.map((item, index) => (
                <div key={`${item.school}-${index}`} className="rounded-xl border border-borderColor bg-white p-4">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h4 className="font-bold text-slate-800">{item.school || "School not added"}</h4>
                      <p className="mt-1 text-sm text-slate-500">
                        {item.post || "Post not added"} {item.board ? `| ${item.board}` : ""}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {item.startDate || "Start date"} - {item.currentEmployer ? "Present" : item.endDate || "End date"}
                      </p>
                      <div className="mt-4 grid grid-cols-1 gap-3 text-sm text-slate-600 sm:grid-cols-2 lg:grid-cols-3">
                        <p><span className="font-bold text-slate-800">School:</span> {item.school || "Not added"}</p>
                        <p><span className="font-bold text-slate-800">Current Employer:</span> {item.currentEmployer ? "Yes" : "No"}</p>
                        <p><span className="font-bold text-slate-800">Board:</span> {item.board || "Not added"}</p>
                        <p><span className="font-bold text-slate-800">Start Date:</span> {item.startDate || "Not added"}</p>
                        <p><span className="font-bold text-slate-800">End Date:</span> {item.currentEmployer ? "Present" : item.endDate || "Not added"}</p>
                        <p><span className="font-bold text-slate-800">Main Subject:</span> {item.mainSubject || "Not added"}</p>
                        <p><span className="font-bold text-slate-800">Other Subjects:</span> {item.otherSubjects || "Not added"}</p>
                        <p><span className="font-bold text-slate-800">Post:</span> {item.post || "Not added"}</p>
                        <p><span className="font-bold text-slate-800">Salary:</span> {item.salary || "Not added"}</p>
                        <p><span className="font-bold text-slate-800">Reason:</span> {item.reason || "Not added"}</p>
                        <p className="lg:col-span-2"><span className="font-bold text-slate-800">Details:</span> {item.details || "Not added"}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => editExperience(index)} className="rounded-lg border border-borderColor px-4 py-2 text-sm font-bold text-primary hover:bg-primary/5">
                        Edit
                      </button>
                      <button type="button" onClick={() => removeExperience(index)} className="rounded-lg border border-red-100 px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
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
          <button type="button" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary">
            <Plus size={16} /> Add Another Award
          </button>
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
          <button type="button" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary">
            <Plus size={16} /> Add Another Course
          </button>
        </div>
      </div>
    </>
  );

  const renderResume = () => (
    <>
      <SectionHeader
        title="Resume"
        description="Keep multiple resume formats ready for school applications."
      />
      <div className="space-y-7">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {savedResumes.slice(0, 3).map((resume, index) => (
            <div key={`${resume.title}-${index}`} className="rounded-2xl border border-borderColor bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-xl bg-primary/10 p-3 text-primary">
                  <FileText size={22} />
                </span>
                <span className="rounded-full bg-light px-3 py-1 text-xs font-bold text-primary">
                  {resume.format}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-800">{resume.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{resume.notes}</p>
              <p className="mt-4 truncate text-xs font-bold uppercase tracking-wide text-slate-400">
                {resume.fileName}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-borderColor bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3 border-b border-borderColor pb-5">
            <span className="rounded-xl bg-primary/10 p-2 text-primary"><Upload size={20} /></span>
            <h3 className="text-lg font-bold text-slate-800">Add New Resume</h3>
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
            <Field label="Upload File">
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-primary/40 bg-light px-4 py-3 text-sm font-bold text-primary hover:bg-primary/5">
                <Upload size={17} /> Choose PDF/Text
                <input type="file" hidden accept=".pdf,.txt,text/plain,application/pdf" onChange={handleResumeFile} />
              </label>
            </Field>
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
            <Plus size={17} /> Add Resume
          </button>
        </div>

        <div className="rounded-2xl bg-light p-5">
          <h3 className="mb-4 text-lg font-bold text-primary">All Resumes</h3>
          <div className="space-y-3">
            {savedResumes.map((resume, index) => (
              <div key={`${resume.fileName}-${index}`} className="flex flex-col gap-3 rounded-xl border border-borderColor bg-white p-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h4 className="font-bold text-slate-800">{resume.title}</h4>
                  <p className="text-sm text-slate-500">{resume.fileName} | {resume.format}</p>
                </div>
                <button type="button" onClick={() => setSavedResumes((prev) => prev.filter((_, itemIndex) => itemIndex !== index))} className="self-start rounded-lg border border-red-100 px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 md:self-auto">
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  const renderViewProfile = () => (
    <>
      <SectionHeader
        title="View Profile"
        description="Review all information entered across your profile sections."
      />
      <div className="space-y-6">
        <div className="rounded-2xl border border-borderColor bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-bold text-primary">Basic Details</h3>
          <div className="grid grid-cols-1 gap-4 text-sm text-slate-600 md:grid-cols-2">
            <p><span className="font-bold text-slate-800">Name:</span> {teacherData.title} {teacherData.firstName} {teacherData.middleName} {teacherData.lastName}</p>
            <p><span className="font-bold text-slate-800">Age:</span> {teacherData.age || "Not added"}</p>
            <p><span className="font-bold text-slate-800">Nationality:</span> {teacherData.nationality || "Not added"}</p>
            <p><span className="font-bold text-slate-800">Current Job:</span> {teacherData.currentJob || "Not added"}</p>
            <p><span className="font-bold text-slate-800">Main Subject:</span> {teacherData.mainSubject || "Not added"}</p>
            <p><span className="font-bold text-slate-800">Classes:</span> {[teacherData.classTaughtOne, teacherData.classTaughtTwo].filter(Boolean).join(", ") || "Not added"}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-borderColor bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-bold text-primary">Contact Details</h3>
          <div className="grid grid-cols-1 gap-4 text-sm text-slate-600 md:grid-cols-2">
            <p><span className="font-bold text-slate-800">Mobile:</span> {teacherData.mobile || "Not added"}</p>
            <p><span className="font-bold text-slate-800">WhatsApp:</span> {teacherData.whatsapp || "Not added"}</p>
            <p><span className="font-bold text-slate-800">Primary Email:</span> {teacherData.primaryEmail || "Not added"}</p>
            <p><span className="font-bold text-slate-800">Secondary Email:</span> {teacherData.secondaryEmail || "Not added"}</p>
            <p className="md:col-span-2"><span className="font-bold text-slate-800">Address:</span> {[teacherData.address, teacherData.city, teacherData.state, teacherData.pinCode].filter(Boolean).join(", ") || "Not added"}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-borderColor bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-bold text-primary">Qualifications</h3>
          {savedQualifications.length === 0 ? (
            <p className="text-sm text-slate-500">No qualification saved yet.</p>
          ) : (
            <div className="space-y-3">
              {savedQualifications.map((item, index) => (
                <div key={`profile-qualification-${index}`} className="rounded-xl bg-light p-4 text-sm text-slate-600">
                  <p className="mb-3 font-bold text-slate-800">Qualification #{index + 1}</p>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
                    <p><span className="font-bold text-slate-800">Degree:</span> {item.degree || "Not added"}</p>
                    <p><span className="font-bold text-slate-800">Course:</span> {item.course || "Not added"}</p>
                    <p><span className="font-bold text-slate-800">Year:</span> {item.year || "Not added"}</p>
                    <p><span className="font-bold text-slate-800">Medium:</span> {item.medium || "Not added"}</p>
                    <p><span className="font-bold text-slate-800">Mode:</span> {item.mode || "Not added"}</p>
                    <p><span className="font-bold text-slate-800">Percentage:</span> {item.percentage || "Not added"}</p>
                    <p><span className="font-bold text-slate-800">University:</span> {item.university || "Not added"}</p>
                    <p><span className="font-bold text-slate-800">College:</span> {item.college || "Not added"}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-borderColor bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-bold text-primary">Experience</h3>
          {savedExperiences.length === 0 ? (
            <p className="text-sm text-slate-500">No experience saved yet.</p>
          ) : (
            <div className="space-y-3">
              {savedExperiences.map((item, index) => (
                <div key={`profile-experience-${index}`} className="rounded-xl bg-light p-4 text-sm text-slate-600">
                  <p className="mb-3 font-bold text-slate-800">Experience #{index + 1}</p>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                    <p><span className="font-bold text-slate-800">School:</span> {item.school || "Not added"}</p>
                    <p><span className="font-bold text-slate-800">Current Employer:</span> {item.currentEmployer ? "Yes" : "No"}</p>
                    <p><span className="font-bold text-slate-800">Board:</span> {item.board || "Not added"}</p>
                    <p><span className="font-bold text-slate-800">Start Date:</span> {item.startDate || "Not added"}</p>
                    <p><span className="font-bold text-slate-800">End Date:</span> {item.currentEmployer ? "Present" : item.endDate || "Not added"}</p>
                    <p><span className="font-bold text-slate-800">Main Subject:</span> {item.mainSubject || "Not added"}</p>
                    <p><span className="font-bold text-slate-800">Other Subjects:</span> {item.otherSubjects || "Not added"}</p>
                    <p><span className="font-bold text-slate-800">Post:</span> {item.post || "Not added"}</p>
                    <p><span className="font-bold text-slate-800">Salary:</span> {item.salary || "Not added"}</p>
                    <p><span className="font-bold text-slate-800">Reason:</span> {item.reason || "Not added"}</p>
                    <p className="lg:col-span-2"><span className="font-bold text-slate-800">Details:</span> {item.details || "Not added"}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-borderColor bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-bold text-primary">Resumes</h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {savedResumes.map((resume, index) => (
              <div key={`profile-resume-${index}`} className="rounded-xl bg-light p-4">
                <p className="font-bold text-slate-800">{resume.title}</p>
                <p className="mt-1 text-sm text-slate-500">{resume.fileName} | {resume.format}</p>
              </div>
            ))}
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
                    className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${
                      isActive
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
                    className={`flex shrink-0 items-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold transition ${
                      isActive
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
            <div className="mt-10 flex flex-col-reverse gap-3 border-t border-borderColor pt-6 sm:flex-row sm:justify-end">
              <button type="button" className="rounded-xl border border-borderColor px-6 py-3 text-sm font-bold text-slate-500 hover:bg-light">
                Cancel
              </button>
              <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-soft hover:bg-primary/95">
                <Save size={17} /> Save Changes
              </button>
            </div>
            </div>
          </main>
        </form>
    </div>
  );
};

export default TeacherProfile;
