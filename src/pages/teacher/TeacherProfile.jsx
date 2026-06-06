import { useMemo, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  X,
  Wand2,
  ArrowLeft,
} from "lucide-react";
import BackButton from "../../components/backbutton";
import Select from "../../components/ui/Select";
import { qualificationOptions, experienceOptions, pinStateMap, languages as languageOptions, languageStatuses, nationalities } from "../../lib/teacherdata";

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




const hasValue = (item) =>
  Object.values(item).some((value) => {
    if (typeof value === "boolean") return value;
    return String(value || "").trim();
  });

const TeacherProfile = () => {
  const navigate = useNavigate();
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
  const [teacherData, setTeacherData] = useState(() => {
    const saved = localStorage.getItem("skooljobs_teacher_data");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return {
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
      briefWriteUp: "",
    };
  });

  const [qualificationDraft, setQualificationDraft] = useState(blankQualification);
  const [savedQualifications, setSavedQualifications] = useState(() => {
    const saved = localStorage.getItem("skooljobs_teacher_qualifications");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return [];
  });
  const [editingQualificationIndex, setEditingQualificationIndex] = useState(null);
  const [showQualificationForm, setShowQualificationForm] = useState(false);
  const qualificationFormRef = useRef(null);

  const [experienceDraft, setExperienceDraft] = useState(blankExperience);
  const [savedExperiences, setSavedExperiences] = useState(() => {
    const saved = localStorage.getItem("skooljobs_teacher_experiences");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return [];
  });
  const [editingExperienceIndex, setEditingExperienceIndex] = useState(null);
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const experienceFormRef = useRef(null);

  const [resumeData, setResumeData] = useState(blankResumeData);
  const [savedAwards, setSavedAwards] = useState(() => {
    const saved = localStorage.getItem("skooljobs_teacher_awards");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return [];
  });
  const [savedCourses, setSavedCourses] = useState(() => {
    const saved = localStorage.getItem("skooljobs_teacher_courses");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return [];
  });

  const [resumeDraft, setResumeDraft] = useState({
    title: "",
    fullName: "",
    email: "",
    mobile: "",
    address: "",
    currentJobTitle: "",
    summary: "",
    skills: "",
    education: "",
    experience: "",
    certifications: "",
    languages: "",
    achievements: "",
    format: "PDF",
    fileName: "",
    notes: "",
  });
  const [savedResumes, setSavedResumes] = useState(() => {
    const saved = localStorage.getItem("skooljobs_resumes");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });
  const [resumeMode, setResumeMode] = useState("upload");

  const [dynamicLanguages, setDynamicLanguages] = useState(() => {
    const saved = localStorage.getItem("skooljobs_teacher_languages");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return [
      { language: "English", status: "Fluency enough to teach" },
    ];
  });

  const ALL_ADDITIONAL_SUBJECTS = ["History", "Geography", "Art", "Music", "Hindi", "Social Science", "Computer", "Physics", "Chemistry", "Biology"];
  const [selectedAdditionalSubjects, setSelectedAdditionalSubjects] = useState(() => {
    const saved = localStorage.getItem("skooljobs_teacher_additional_subjects");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return ["History", "Geography"];
  });

  const [coverLetterState, setCoverLetterState] = useState({
    selectedJob: "",
    selectedResume: "",
    generated: "",
    loading: false,
  });

  // Persist all states on change
  useEffect(() => {
    localStorage.setItem("skooljobs_teacher_data", JSON.stringify(teacherData));
  }, [teacherData]);

  useEffect(() => {
    localStorage.setItem("skooljobs_teacher_qualifications", JSON.stringify(savedQualifications));
  }, [savedQualifications]);

  useEffect(() => {
    localStorage.setItem("skooljobs_teacher_experiences", JSON.stringify(savedExperiences));
  }, [savedExperiences]);

  useEffect(() => {
    localStorage.setItem("skooljobs_teacher_awards", JSON.stringify(savedAwards));
  }, [savedAwards]);

  useEffect(() => {
    localStorage.setItem("skooljobs_teacher_courses", JSON.stringify(savedCourses));
  }, [savedCourses]);

  useEffect(() => {
    localStorage.setItem("skooljobs_teacher_languages", JSON.stringify(dynamicLanguages));
  }, [dynamicLanguages]);

  useEffect(() => {
    localStorage.setItem("skooljobs_teacher_additional_subjects", JSON.stringify(selectedAdditionalSubjects));
  }, [selectedAdditionalSubjects]);

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

  const setField = (name, value) =>
    setTeacherData((prev) => ({ ...prev, [name]: value }));

  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [pincodeError, setPincodeError] = useState("");
  const [areaQuery, setAreaQuery] = useState("");
  const [areaResults, setAreaResults] = useState([]);
  const [areaLoading, setAreaLoading] = useState(false);
  const [areaError, setAreaError] = useState("");
  const [showAreaDropdown, setShowAreaDropdown] = useState(false);

  // Live PIN code lookup
  useEffect(() => {
    const pin = teacherData.pinCode.trim();
    if (!/^\d{6}$/.test(pin)) return;

    let cancelled = false;
    setPincodeLoading(true);
    setPincodeError("");

    fetch(`https://api.postalpincode.in/pincode/${pin}`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (data[0].Status === "Success" && data[0].PostOffice?.length > 0) {
          const po = data[0].PostOffice[0];
          setTeacherData((p) => ({
            ...p,
            state: po.State,
            city: po.District,
          }));
        } else {
          setPincodeError("PIN code not found. Enter state & city manually.");
        }
      })
      .catch(() => {
        if (!cancelled)
          setPincodeError("Could not reach postal API. Enter manually.");
      })
      .finally(() => {
        if (!cancelled) setPincodeLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [teacherData.pinCode]);

  // Debounced area/locality search
  useEffect(() => {
    const q = areaQuery.trim();
    if (q.length < 3) {
      setAreaResults([]);
      setAreaError("");
      return;
    }

    let cancelled = false;
    setAreaLoading(true);
    setAreaError("");

    const timer = setTimeout(() => {
      fetch(`https://api.postalpincode.in/postoffice/${encodeURIComponent(q)}`)
        .then((r) => r.json())
        .then((data) => {
          if (cancelled) return;
          if (data[0].Status === "Success" && data[0].PostOffice?.length > 0) {
            setAreaResults(data[0].PostOffice.slice(0, 25));
            setShowAreaDropdown(true);
          } else {
            setAreaResults([]);
            setAreaError("No localities found. Try a different name.");
          }
        })
        .catch(() => {
          if (!cancelled) setAreaError("Could not reach postal API. Enter manually.");
        })
        .finally(() => {
          if (!cancelled) setAreaLoading(false);
        });
    }, 500);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [areaQuery]);

  const handleSelectLocality = (po) => {
    const cleanName = po.Name.replace(/\s*(S\.O|B\.O|H\.O)$/i, "").trim();
    setTeacherData((p) => ({
      ...p,
      city: po.District,
      state: po.State,
      pinCode: po.Pincode,
      address: p.address ? p.address : cleanName,
    }));
    setAreaQuery(cleanName);
    setShowAreaDropdown(false);
    setAreaResults([]);
    setPincodeError("");
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
    if (resumeMode === "create") {
      if (!resumeDraft.title.trim()) { alert("Please add a resume title."); return; }
      
      const addressParts = [];
      if (teacherData.address) addressParts.push(teacherData.address);
      if (teacherData.city) addressParts.push(teacherData.city);
      if (teacherData.state) addressParts.push(teacherData.state);
      if (teacherData.pinCode) addressParts.push(teacherData.pinCode);
      const fullAddress = addressParts.join(", ");

      const educationStr = savedQualifications
        .map((q) => `${q.degree || q.classLevel}${q.course ? " in " + q.course : ""} - ${q.college || q.school} (${q.year || "N/A"})`)
        .join("\n");

      const experienceStr = savedExperiences
        .map((e) => `${e.post} at ${e.school} (${e.startDate || "N/A"} to ${e.currentEmployer ? "Present" : e.endDate || "N/A"})`)
        .join("\n\n");

      const certificationsStr = savedCourses
        .map((c) => `${c.name || "Course"} by ${c.by || "N/A"} (${c.year || "N/A"})`)
        .join("\n");

      const achievementsStr = savedAwards
        .map((a) => `${a.name || "Award"} by ${a.by || "N/A"} (${a.year || "N/A"})`)
        .join("\n");

      const languagesStr = dynamicLanguages
        .map((l) => `${l.language} (${l.status})`)
        .filter((l) => l.trim())
        .join(", ");

      const skillsStr = [teacherData.mainSubject, ...selectedAdditionalSubjects].filter(Boolean).join(", ");
      
      const extension = resumeDraft.format === "PDF" ? "pdf" : "txt";
      const cleanTitle = resumeDraft.title.trim();

      const newResume = {
        id: Date.now(),
        name: cleanTitle + "." + extension,
        title: cleanTitle,
        fullName: `${teacherData.firstName} ${teacherData.lastName}`.trim(),
        email: teacherData.primaryEmail,
        mobile: teacherData.mobile,
        address: fullAddress,
        currentJobTitle: teacherData.currentJob || "Teaching Professional",
        summary: teacherData.briefWriteUp,
        skills: skillsStr,
        education: educationStr,
        experience: experienceStr,
        certifications: certificationsStr,
        languages: languagesStr,
        achievements: achievementsStr,
        format: resumeDraft.format,
        fileName: `${cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}.${extension}`,
        notes: resumeDraft.notes,
        source: "Created",
        skill: teacherData.mainSubject || "Teaching",
        score: 85
      };

      const updated = [...savedResumes, newResume];
      setSavedResumes(updated);
      localStorage.setItem("skooljobs_resumes", JSON.stringify(updated));

      setResumeDraft({
        title: "", fullName: "", email: "", mobile: "", address: "",
        currentJobTitle: "", summary: "", skills: "", education: "",
        experience: "", certifications: "", languages: "", achievements: "",
        format: "PDF", fileName: "", notes: "",
      });
      alert("Resume created successfully!");
    } else {
      if (!resumeDraft.title.trim() && !resumeDraft.fileName.trim()) {
        alert("Please enter a resume title or choose a file.");
        return;
      }
      if (!resumeDraft.fileName.trim()) {
        alert("Please choose a file to upload.");
        return;
      }
      const cleanTitle = resumeDraft.title.trim() || resumeDraft.fileName.replace(/\.[^/.]+$/, "");
      const newResume = {
        id: Date.now(),
        name: resumeDraft.fileName,
        title: cleanTitle,
        fullName: `${teacherData.firstName} ${teacherData.lastName}`.trim(),
        email: teacherData.primaryEmail,
        mobile: teacherData.mobile,
        format: resumeDraft.format,
        fileName: resumeDraft.fileName,
        notes: resumeDraft.notes,
        source: "Uploaded",
        skill: teacherData.mainSubject || "Teaching",
        score: 85
      };

      const updated = [...savedResumes, newResume];
      setSavedResumes(updated);
      localStorage.setItem("skooljobs_resumes", JSON.stringify(updated));

      setResumeDraft({
        title: "", fullName: "", email: "", mobile: "", address: "",
        currentJobTitle: "", summary: "", skills: "", education: "",
        experience: "", certifications: "", languages: "", achievements: "",
        format: "PDF", fileName: "", notes: "",
      });
      alert("Resume uploaded successfully!");
    }
  };

  const handleDeleteResume = (index) => {
    const updated = savedResumes.filter((_, i) => i !== index);
    setSavedResumes(updated);
    localStorage.setItem("skooljobs_resumes", JSON.stringify(updated));
  };

  const generateResumeContent = (resume) => {
    const sep = "=".repeat(60);
    const sec = "-".repeat(60);
    const lines = [
      sep, resume.title.toUpperCase(), sep, "",
      "PERSONAL INFORMATION", sec,
      `Name        : ${resume.fullName}`,
      `Email       : ${resume.email}`,
      `Mobile      : ${resume.mobile}`,
      `Address     : ${resume.address || "Not provided"}`,
      `Job Title   : ${resume.currentJobTitle || "Not provided"}`,
      "",
    ];
    const addSection = (heading, value) => {
      if (value?.trim()) lines.push(heading.toUpperCase(), sec, value.trim(), "");
    };
    addSection("Profile Summary", resume.summary);
    addSection("Skills", resume.skills);
    addSection("Education", resume.education);
    addSection("Experience", resume.experience);
    addSection("Certifications", resume.certifications);
    addSection("Languages", resume.languages);
    addSection("Achievements", resume.achievements);
    return lines.join("\n");
  };

  const downloadResume = (resume) => {
    const content = generateResumeContent(resume);
    const isPdf = resume.format === "PDF";
    const blob = new Blob([content], { type: isPdf ? "application/octet-stream" : "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = resume.fileName;
    a.click();
    URL.revokeObjectURL(url);
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

    try {
      const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
      const updatedUser = {
        ...user,
        firstName: teacherData.firstName,
        lastName: teacherData.lastName,
        name: `${teacherData.firstName} ${teacherData.lastName}`.trim(),
        phone: teacherData.mobile,
        email: teacherData.primaryEmail,
        city: teacherData.city,
        profilePhoto: profileImage,
      };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      console.error("Error saving profile to localStorage:", err);
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
          <Select
            value={teacherData.title}
            onChange={(v) => setField("title", v)}
            options={["Mr", "Mrs", "Miss", "Ms", "Dr", "Prof"]}
            className={compactInputClass}
          />
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
        <div className="flex flex-col justify-start">
          <label className={labelClass}>DOB</label>
          <div className="grid grid-cols-[72px_72px_1fr] gap-2">
            <input name="dobDay" value={teacherData.dobDay} onChange={handleDobChange} className={compactInputClass} placeholder="DD" />
            <input name="dobMonth" value={teacherData.dobMonth} onChange={handleDobChange} className={compactInputClass} placeholder="MM" />
            <input name="dobYear" value={teacherData.dobYear} onChange={handleDobChange} className={compactInputClass} placeholder="YYYY" />
          </div>
        </div>
        <div className="flex flex-col justify-start">
          <label className={labelClass}>Age (Years Only)</label>
          <input name="age" value={teacherData.age} onChange={handleChange} className={inputClass} placeholder="Auto calculated" />
          <p className="mt-2 text-xs text-slate-500">If DOB not entered, user can enter age.</p>
        </div>
        <div className="flex flex-col justify-start">
          <label className={labelClass}>Nationality</label>
          <Select
            value={teacherData.nationality}
            onChange={(v) => setField("nationality", v)}
            placeholder="Select nationality"
            options={nationalities}
          />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 items-start gap-5 lg:grid-cols-3">
        <Field label="Current Job Title">
          <Select
            value={teacherData.currentJob}
            onChange={(v) => setField("currentJob", v)}
            placeholder="Select..."
            options={["Primary Teacher", "Mathematics Teacher", "Science Teacher", "English Teacher", "Coordinator"]}
          />
        </Field>
        <Field label="Main Subject">
          <Select
            value={teacherData.mainSubject}
            onChange={(v) => setField("mainSubject", v)}
            placeholder="Select Subject"
            options={["Mathematics", "Science", "English", "Computer"]}
          />
          <p className="mt-2 text-xs text-slate-500">Only one can be selected.</p>
        </Field>
        <div className="lg:col-span-2">
          <label className={labelClass}>Additional Subject(s)</label>
          {/* Selected subjects as removable tags */}
          {selectedAdditionalSubjects.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {selectedAdditionalSubjects.map((subject) => (
                <span
                  key={subject}
                  className="flex items-center gap-1.5 rounded-xl bg-primary/10 px-3 py-1.5 text-sm font-bold text-primary"
                >
                  {subject}
                  <button
                    type="button"
                    onClick={() => setSelectedAdditionalSubjects((prev) => prev.filter((s) => s !== subject))}
                    className="ml-0.5 rounded-full text-primary/60 hover:text-primary"
                  >
                    <X size={13} />
                  </button>
                </span>
              ))}
            </div>
          )}
          {/* Dropdown + manual input row */}
          <div className="flex gap-2">
            <select
              value=""
              onChange={(e) => {
                const val = e.target.value;
                if (val && !selectedAdditionalSubjects.includes(val)) {
                  setSelectedAdditionalSubjects((prev) => [...prev, val]);
                }
              }}
              className={`${inputClass} flex-1`}
            >
              <option value="">Select additional subject...</option>
              {ALL_ADDITIONAL_SUBJECTS.filter((s) => !selectedAdditionalSubjects.includes(s)).map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Or type custom subject"
              className={`${inputClass} flex-1`}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const val = e.target.value.trim();
                  if (val && !selectedAdditionalSubjects.includes(val)) {
                    setSelectedAdditionalSubjects((prev) => [...prev, val]);
                    e.target.value = "";
                  }
                }
              }}
            />
            <button
              type="button"
              title="Add typed subject"
              onClick={(e) => {
                const input = e.currentTarget.previousSibling;
                const val = input.value.trim();
                if (val && !selectedAdditionalSubjects.includes(val)) {
                  setSelectedAdditionalSubjects((prev) => [...prev, val]);
                  input.value = "";
                }
              }}
              className="flex items-center gap-1 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary/90"
            >
              <Plus size={15} /> Add
            </button>
          </div>
          <p className="mt-2 text-xs text-slate-500">Select from dropdown or type a custom subject and press Enter / Add.</p>
        </div>
        <div className="lg:col-span-3">
          <label className={labelClass}>Classes Taught</label>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <span className="text-sm font-bold text-slate-500">(1)</span>
            <div className="sm:max-w-44 sm:flex-1">
              <Select
                value={teacherData.classTaughtOne}
                onChange={(v) => setField("classTaughtOne", v)}
                placeholder="Select..."
                options={["Class A", "Class B", "Class C", "Class 10", "Class 12"]}
              />
            </div>
            <span className="text-sm font-bold text-slate-500">(2)</span>
            <div className="sm:max-w-44 sm:flex-1">
              <Select
                value={teacherData.classTaughtTwo}
                onChange={(v) => setField("classTaughtTwo", v)}
                placeholder="Select..."
                options={["Class A", "Class B", "Class C", "Class 10", "Class 12"]}
              />
            </div>
          </div>
        </div>
        <div className="lg:col-span-3">
          <div className="mb-3 flex items-center justify-between">
            <label className={labelClass}>Language</label>
            <button
              type="button"
              onClick={() => setDynamicLanguages((prev) => [...prev, { language: "", status: "" }])}
              className="inline-flex items-center gap-1 rounded-lg bg-primary/10 px-3 py-1 text-xs font-bold text-primary hover:bg-primary/20"
            >
              <Plus size={13} /> Add Language
            </button>
          </div>
          <div className="space-y-3">
            {dynamicLanguages.map((lang, idx) => (
              <div key={idx} className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_1fr_40px] lg:items-center">
                <Select
                  value={lang.language}
                  onChange={(v) => setDynamicLanguages((prev) => prev.map((l, i) => i === idx ? { ...l, language: v } : l))}
                  placeholder="Select language..."
                  options={languageOptions}
                />
                <Select
                  value={lang.status}
                  onChange={(v) => setDynamicLanguages((prev) => prev.map((l, i) => i === idx ? { ...l, status: v } : l))}
                  placeholder="Select proficiency..."
                  options={languageStatuses}
                />
                {dynamicLanguages.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setDynamicLanguages((prev) => prev.filter((_, i) => i !== idx))}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-100 text-red-400 hover:bg-red-50"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[260px_1fr] lg:items-center">
            <span className="text-sm font-bold text-slate-500">Highest Qualification 1</span>
            <Select
              value={teacherData.highestQualificationOne}
              onChange={(v) => setField("highestQualificationOne", v)}
              placeholder="Select..."
              options={qualificationOptions.degrees}
            />
            <span className="text-sm font-bold text-slate-500">Highest Qualification 2</span>
            <Select
              value={teacherData.highestQualificationTwo}
              onChange={(v) => setField("highestQualificationTwo", v)}
              placeholder="Select..."
              options={qualificationOptions.degrees}
            />
          </div>
        </div>
        <div className="lg:col-span-3">
          <Field label="Brief Professional Write-up (50–100 words)">
            <textarea
              name="briefWriteUp"
              value={teacherData.briefWriteUp}
              onChange={handleChange}
              maxLength={600}
              rows={4}
              className={`${inputClass} resize-none`}
              placeholder="Write a short professional summary about yourself — your teaching philosophy, key strengths, and what makes you stand out as an educator..."
            />
            <p className="mt-1 text-xs text-slate-400">{teacherData.briefWriteUp.split(/\s+/).filter(Boolean).length} / 100 words</p>
          </Field>
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

          {/* Locality search — type an area name, pick from results, everything fills */}
          <div className="mb-5 rounded-2xl border border-primary/20 bg-primary/5 p-4">
            <Field label="Search Area / Locality">
              <div className="relative">
                <input
                  value={areaQuery}
                  onChange={(e) => {
                    setAreaQuery(e.target.value);
                    setAreaError("");
                  }}
                  onFocus={() => areaResults.length > 0 && setShowAreaDropdown(true)}
                  className={inputClass}
                  placeholder="Type an area name, e.g. Rajendra Nagar (min 3 letters)"
                  autoComplete="off"
                />
                {areaLoading && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-primary animate-pulse">
                    Searching…
                  </span>
                )}

                {showAreaDropdown && areaResults.length > 0 && (
                  <div className="absolute z-20 mt-1 max-h-64 w-full overflow-y-auto rounded-xl border border-borderColor bg-white shadow-lg">
                    {areaResults.map((po, i) => (
                      <button
                        key={`${po.Name}-${po.Pincode}-${i}`}
                        type="button"
                        onClick={() => handleSelectLocality(po)}
                        className="flex w-full items-start justify-between gap-3 border-b border-borderColor/60 px-4 py-2.5 text-left last:border-0 hover:bg-light"
                      >
                        <span>
                          <span className="block text-sm font-semibold text-slate-800">
                            {po.Name}
                          </span>
                          <span className="block text-xs text-slate-500">
                            {po.District}, {po.State}
                          </span>
                        </span>
                        <span className="shrink-0 rounded-md bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
                          {po.Pincode}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {areaError ? (
                <p className="mt-1 text-xs text-red-500">{areaError}</p>
              ) : (
                <p className="mt-1 text-xs text-slate-500">
                  Select a locality and the City, State &amp; PIN code fill in automatically.
                </p>
              )}
            </Field>
          </div>

          <div className="rounded-2xl bg-light p-5">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              <Field label="PIN Code *">
                <div className="relative">
                  <input
                    name="pinCode"
                    value={teacherData.pinCode}
                    onChange={(e) => {
                      setPincodeError("");
                      handleChange(e);
                    }}
                    className={inputClass}
                    placeholder="Enter PIN"
                    maxLength={6}
                  />
                  {pincodeLoading && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-primary animate-pulse">
                      Fetching…
                    </span>
                  )}
                </div>
                {pincodeError ? (
                  <p className="mt-1 text-xs text-red-500">{pincodeError}</p>
                ) : (
                  <p className="mt-1 text-xs text-slate-400">
                    Auto-filled from locality search, or type a 6-digit PIN to fill the rest.
                  </p>
                )}
              </Field>
              <Field label="City *">
                <input name="city" value={teacherData.city} onChange={handleChange} className={inputClass} placeholder="Type city" />
              </Field>
              <Field label="State *">
                <input name="state" value={teacherData.state} onChange={handleChange} className={inputClass} placeholder="Auto-filled" />
              </Field>
            </div>
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
                <Select
                  value={qualificationDraft.classLevel}
                  onChange={(classLevel) => {
                    setQualificationDraft((prev) => ({
                      ...prev,
                      classLevel,
                      degree: classLevel === "Class 10" ? "Secondary (10th)" : classLevel === "Class 12" ? "Senior Secondary (12th)" : prev.degree,
                    }));
                  }}
                  placeholder="Select Class"
                  options={["Class 10", "Class 12"]}
                />
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
                <Select value={qualificationDraft.degree} onChange={(v) => updateQualification("degree", v)} placeholder="Select Degree" options={qualificationOptions.degrees} />
              </Field>
              <Field label="Course Name">
                <Select value={qualificationDraft.course} onChange={(v) => updateQualification("course", v)} placeholder="Select Course" options={qualificationOptions.courses} />
              </Field>
              <Field label="Year Passed">
                <input value={qualificationDraft.year} onChange={(e) => updateQualification("year", e.target.value)} className={inputClass} placeholder="e.g. 2023" />
              </Field>
              <Field label="Medium of Instruction">
                <Select value={qualificationDraft.medium} onChange={(v) => updateQualification("medium", v)} placeholder="Select Medium" options={qualificationOptions.mediums} />
              </Field>
              <Field label="Mode of Study">
                <Select value={qualificationDraft.mode} onChange={(v) => updateQualification("mode", v)} placeholder="Select Mode" options={qualificationOptions.modes} />
              </Field>
              {!qualificationDraft.classLevel && (
                <Field label="Percentage %">
                  <input value={qualificationDraft.percentage} onChange={(e) => updateQualification("percentage", e.target.value)} className={inputClass} placeholder="e.g. 76.2" />
                </Field>
              )}
              <Field label="University Name">
                <Select value={qualificationDraft.university} onChange={(v) => updateQualification("university", v)} placeholder="Select University" options={qualificationOptions.universities} />
              </Field>
              <div className="lg:col-span-2">
                <Field label="College Name">
                  <Select value={qualificationDraft.college} onChange={(v) => updateQualification("college", v)} placeholder="Select College / Institution" options={qualificationOptions.colleges} />
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
                <Select value={experienceDraft.board} onChange={(v) => updateExperience("board", v)} placeholder="Select Board" options={experienceOptions.boards} />
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
                <Select value={experienceDraft.mainSubject} onChange={(v) => updateExperience("mainSubject", v)} placeholder="Select Main Subject" options={experienceOptions.subjects} />
              </Field>
              <Field label="Other Subjects">
                <Select value={experienceDraft.otherSubjects} onChange={(v) => updateExperience("otherSubjects", v)} placeholder="Select Other Subject" options={experienceOptions.subjects} />
              </Field>
              <Field label="Post Held / Job Title">
                <Select value={experienceDraft.post} onChange={(v) => updateExperience("post", v)} placeholder="Select Post" options={experienceOptions.posts} />
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
                <Select value={experienceDraft.reason} onChange={(v) => updateExperience("reason", v)} placeholder="Select Reason" options={experienceOptions.reasons} />
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
              <Select
                value={resumeData.awardType}
                onChange={(v) => setResumeData((prev) => ({ ...prev, awardType: v }))}
                placeholder="Select category"
                options={["Award", "Recognition", "Publication"]}
              />
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
              <Select
                value={resumeData.courseType}
                onChange={(v) => setResumeData((prev) => ({ ...prev, courseType: v }))}
                placeholder="Select type"
                options={["Workshop", "Certification", "Training"]}
              />
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
        description="Upload your CV in Word (.docx) or PDF format, use the CV Builder to create one, or generate an AI-powered cover letter."
      />
      <div className="space-y-7">
        <div className="rounded-xl border border-borderColor bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-col gap-4 border-b border-borderColor pb-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <span className="rounded-xl bg-primary/10 p-2 text-primary"><Upload size={20} /></span>
              <div>
                <h3 className="text-lg font-bold text-slate-800">
                  {resumeMode === "upload" ? "Add Resume" : resumeMode === "create" ? "Create Resume" : "Cover Letter"}
                </h3>
                {resumeMode === "upload" && (
                  <p className="mt-0.5 text-xs text-slate-500">Accepted formats: <strong>PDF</strong> or <strong>Word (.docx)</strong> only.</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-3 rounded-xl border border-borderColor bg-light p-1 text-sm font-bold">
              <button type="button" onClick={() => setResumeMode("upload")} className={`rounded-lg px-4 py-2 ${resumeMode === "upload" ? "bg-white text-primary shadow-sm" : "text-slate-500"}`}>
                Add Resume
              </button>
              <button type="button" onClick={() => setResumeMode("create")} className={`rounded-lg px-4 py-2 ${resumeMode === "create" ? "bg-white text-primary shadow-sm" : "text-slate-500"}`}>
                Create Resume
              </button>
              <button type="button" onClick={() => setResumeMode("coverletter")} className={`rounded-lg px-4 py-2 ${resumeMode === "coverletter" ? "bg-white text-primary shadow-sm" : "text-slate-500"}`}>
                Cover Letter
              </button>
            </div>
          </div>
          {/* Upload mode: show CV Builder callout */}
          {resumeMode === "upload" && (
            <div className="mb-5 flex items-start gap-4 rounded-2xl border border-blue-200 bg-blue-50 p-4">
              <FileText size={20} className="mt-0.5 shrink-0 text-blue-600" />
              <div>
                <p className="text-sm font-bold text-blue-800">Don't have a CV ready?</p>
                <p className="mt-1 text-xs text-blue-600">
                  Use the <strong>Create Resume</strong> tab to build a formatted CV using our CV Builder — you can preview and download it as a PDF.
                </p>
                <button
                  type="button"
                  onClick={() => setResumeMode("create")}
                  className="mt-2 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-blue-700"
                >
                  Open CV Builder →
                </button>
              </div>
            </div>
          )}

          {/* Top row: always visible for upload/create */}
          {resumeMode !== "coverletter" && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="Resume Title *">
              <input
                value={resumeDraft.title}
                onChange={(e) => setResumeDraft((prev) => ({ ...prev, title: e.target.value }))}
                className={inputClass}
                placeholder="e.g. Senior Teacher Resume"
              />
            </Field>
            <Field label="Format">
              <Select
                value={resumeDraft.format}
                onChange={(v) => setResumeDraft((prev) => ({ ...prev, format: v }))}
                options={["PDF", "Text"]}
              />
            </Field>
            {resumeMode === "upload" && (
              <Field label="Upload File">
                <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-primary/40 bg-light px-4 py-5 text-sm font-bold text-primary hover:bg-primary/5">
                  <Upload size={22} />
                  <span>Choose PDF or Word (.docx)</span>
                  <span className="text-xs font-normal text-slate-400">Only PDF and .docx files are accepted</span>
                  <input type="file" hidden accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={handleResumeFile} />
                </label>
                {resumeDraft.fileName && (
                  <p className="mt-2 text-xs font-bold text-green-600">Selected: {resumeDraft.fileName}</p>
                )}
              </Field>
            )}
          </div>
          )}

          {/* Create mode: full structured resume form */}
          {resumeMode === "create" && (
            <div className="mt-6 space-y-6">
              {/* Section 1: Personal Info & Contact Details */}
              <div className="rounded-2xl border border-borderColor bg-white p-5 shadow-sm space-y-4">
                <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide border-b border-borderColor pb-2">
                  1. Personal &amp; Contact Information
                </h4>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  <Field label="First Name *">
                    <input
                      value={teacherData.firstName}
                      onChange={(e) => setTeacherData((prev) => ({ ...prev, firstName: e.target.value }))}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Last Name *">
                    <input
                      value={teacherData.lastName}
                      onChange={(e) => setTeacherData((prev) => ({ ...prev, lastName: e.target.value }))}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Email Address *">
                    <input
                      type="email"
                      value={teacherData.primaryEmail}
                      onChange={(e) => setTeacherData((prev) => ({ ...prev, primaryEmail: e.target.value }))}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Mobile Number *">
                    <input
                      value={teacherData.mobile}
                      onChange={(e) => setTeacherData((prev) => ({ ...prev, mobile: e.target.value }))}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Current Job Title">
                    <input
                      value={teacherData.currentJob}
                      onChange={(e) => setTeacherData((prev) => ({ ...prev, currentJob: e.target.value }))}
                      className={inputClass}
                      placeholder="e.g. Mathematics Teacher"
                    />
                  </Field>
                  <Field label="Full Address">
                    <input
                      value={teacherData.address}
                      onChange={(e) => setTeacherData((prev) => ({ ...prev, address: e.target.value }))}
                      className={inputClass}
                    />
                  </Field>
                </div>
                <Field label="Profile Professional Summary *">
                  <textarea
                    value={teacherData.briefWriteUp}
                    onChange={(e) => setTeacherData((prev) => ({ ...prev, briefWriteUp: e.target.value }))}
                    className={`${inputClass} min-h-24 resize-none`}
                    placeholder="Describe your teaching philosophy and core pedagogical experience..."
                  />
                </Field>
              </div>

              {/* Section 2: Academic Qualifications */}
              <div className="rounded-2xl border border-borderColor bg-white p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-borderColor pb-2">
                  <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide">
                    2. Academic Qualifications
                  </h4>
                  {!showQualificationForm && (
                    <button
                      type="button"
                      onClick={addQualification}
                      className="rounded-xl bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary/15 transition"
                    >
                      + Add Qualification
                    </button>
                  )}
                </div>

                {showQualificationForm && (
                  <div ref={qualificationFormRef} className="rounded-xl border border-borderColor bg-light p-4 space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <Field label="Class">
                        <Select
                          value={qualificationDraft.classLevel}
                          onChange={(classLevel) => {
                            setQualificationDraft((prev) => ({
                              ...prev,
                              classLevel,
                              degree: classLevel === "Class 10" ? "Secondary (10th)" : classLevel === "Class 12" ? "Senior Secondary (12th)" : prev.degree,
                            }));
                          }}
                          placeholder="Select Class"
                          options={["Class 10", "Class 12"]}
                        />
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
                        <Select value={qualificationDraft.degree} onChange={(v) => updateQualification("degree", v)} placeholder="Select Degree" options={qualificationOptions.degrees} />
                      </Field>
                      <Field label="Course Name">
                        <Select value={qualificationDraft.course} onChange={(v) => updateQualification("course", v)} placeholder="Select Course" options={qualificationOptions.courses} />
                      </Field>
                      <Field label="Year Passed">
                        <input value={qualificationDraft.year} onChange={(e) => updateQualification("year", e.target.value)} className={inputClass} placeholder="e.g. 2023" />
                      </Field>
                      <Field label="Medium of Instruction">
                        <Select value={qualificationDraft.medium} onChange={(v) => updateQualification("medium", v)} placeholder="Select Medium" options={qualificationOptions.mediums} />
                      </Field>
                      <Field label="Mode of Study">
                        <Select value={qualificationDraft.mode} onChange={(v) => updateQualification("mode", v)} placeholder="Select Mode" options={qualificationOptions.modes} />
                      </Field>
                      {!qualificationDraft.classLevel && (
                        <Field label="Percentage %">
                          <input value={qualificationDraft.percentage} onChange={(e) => updateQualification("percentage", e.target.value)} className={inputClass} placeholder="e.g. 76.2" />
                        </Field>
                      )}
                      <Field label="University Name">
                        <Select value={qualificationDraft.university} onChange={(v) => updateQualification("university", v)} placeholder="Select University" options={qualificationOptions.universities} />
                      </Field>
                      <div className="lg:col-span-2">
                        <Field label="College Name">
                          <Select value={qualificationDraft.college} onChange={(v) => updateQualification("college", v)} placeholder="Select College / Institution" options={qualificationOptions.colleges} />
                        </Field>
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <button type="button" onClick={saveQualificationDraft} className="rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-white hover:bg-primary/95">Save</button>
                      <button type="button" onClick={() => setShowQualificationForm(false)} className="rounded-lg border border-borderColor px-3 py-1.5 text-xs font-bold text-slate-500 hover:bg-light">Cancel</button>
                    </div>
                  </div>
                )}

                {savedQualifications.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">No qualifications added yet. Use the button above to add qualifications.</p>
                ) : (
                  <div className="space-y-2.5">
                    {savedQualifications.map((q, idx) => (
                      <div key={idx} className="flex justify-between items-center rounded-xl bg-light p-3 text-xs border border-borderColor/40">
                        <div>
                          <p className="font-bold text-slate-800">{q.degree || q.classLevel} {q.course ? `(${q.course})` : ""}</p>
                          <p className="text-slate-500">{q.college || q.school} · Passed in {q.year} · Marks: {q.percentage ? `${q.percentage}%` : "—"}</p>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button type="button" onClick={() => editQualification(idx)} className="text-primary font-bold hover:underline">Edit</button>
                          <button type="button" onClick={() => removeQualification(idx)} className="text-red-500 font-bold hover:underline">Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Section 3: Employment History */}
              <div className="rounded-2xl border border-borderColor bg-white p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-borderColor pb-2">
                  <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide">
                    3. Employment History
                  </h4>
                  {!showExperienceForm && (
                    <button
                      type="button"
                      onClick={addExperience}
                      className="rounded-xl bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary/15 transition"
                    >
                      + Add Experience
                    </button>
                  )}
                </div>

                {showExperienceForm && (
                  <div ref={experienceFormRef} className="rounded-xl border border-borderColor bg-light p-4 space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <Field label="School Name">
                        <input value={experienceDraft.school} onChange={(e) => updateExperience("school", e.target.value)} className={inputClass} placeholder="Enter school/employer name" />
                      </Field>
                      <Field label="Salary / Take Home (Monthly)">
                        <input value={experienceDraft.monthlyTakeHome} onChange={(e) => updateExperience("monthlyTakeHome", e.target.value)} className={inputClass} placeholder="e.g. 35,000" />
                      </Field>
                      <div className="flex items-center gap-2 pt-6">
                        <input type="checkbox" checked={experienceDraft.currentEmployer} onChange={(e) => updateExperience("currentEmployer", e.target.checked)} className="h-4 w-4 accent-primary" />
                        <span className="text-xs font-bold text-slate-600">Current Employer</span>
                      </div>
                      <Field label="Board">
                        <Select value={experienceDraft.board} onChange={(v) => updateExperience("board", v)} placeholder="Select Board" options={experienceOptions.boards} />
                      </Field>
                      <Field label="Start Date">
                        <input type="date" value={experienceDraft.startDate} onChange={(e) => updateExperience("startDate", e.target.value)} className={inputClass} />
                      </Field>
                      {!experienceDraft.currentEmployer && (
                        <Field label="End Date">
                          <input type="date" value={experienceDraft.endDate} onChange={(e) => updateExperience("endDate", e.target.value)} className={inputClass} />
                        </Field>
                      )}
                      <Field label="Main Subject Taught">
                        <Select value={experienceDraft.mainSubject} onChange={(v) => updateExperience("mainSubject", v)} placeholder="Select Subject" options={experienceOptions.subjects} />
                      </Field>
                      <Field label="Other Subjects Taught">
                        <input value={experienceDraft.otherSubjects} onChange={(e) => updateExperience("otherSubjects", e.target.value)} className={inputClass} placeholder="e.g. Science, Hindi" />
                      </Field>
                      <Field label="Designation / Post">
                        <Select value={experienceDraft.post} onChange={(v) => updateExperience("post", v)} placeholder="Select Designation" options={experienceOptions.posts} />
                      </Field>
                      <Field label="Reason for Leaving">
                        <Select value={experienceDraft.reason} onChange={(v) => updateExperience("reason", v)} placeholder="Select Reason" options={experienceOptions.reasons} />
                      </Field>
                      <div className="lg:col-span-2">
                        <Field label="Key Achievements / Work Details">
                          <textarea value={experienceDraft.details} onChange={(e) => updateExperience("details", e.target.value)} className={`${inputClass} min-h-20 resize-none`} placeholder="Describe responsibilities and achievements..." />
                        </Field>
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <button type="button" onClick={saveExperienceDraft} className="rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-white hover:bg-primary/95">Save</button>
                      <button type="button" onClick={() => setShowExperienceForm(false)} className="rounded-lg border border-borderColor px-3 py-1.5 text-xs font-bold text-slate-500 hover:bg-light">Cancel</button>
                    </div>
                  </div>
                )}

                {savedExperiences.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">No experience added yet. Use the button above to add experiences.</p>
                ) : (
                  <div className="space-y-2.5">
                    {savedExperiences.map((exp, idx) => (
                      <div key={idx} className="flex justify-between items-center rounded-xl bg-light p-3 text-xs border border-borderColor/40">
                        <div>
                          <p className="font-bold text-slate-800">{exp.post} at {exp.school}</p>
                          <p className="text-slate-500">{exp.startDate} to {exp.currentEmployer ? "Present" : exp.endDate} · Subject: {exp.mainSubject} · Board: {exp.board}</p>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button type="button" onClick={() => editExperience(idx)} className="text-primary font-bold hover:underline">Edit</button>
                          <button type="button" onClick={() => removeExperience(idx)} className="text-red-500 font-bold hover:underline">Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Section 4: Achievements, Awards & Courses */}
              <div className="rounded-2xl border border-borderColor bg-white p-5 shadow-sm space-y-5">
                <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide border-b border-borderColor pb-2">
                  4. Achievements, Awards &amp; Courses
                </h4>

                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Awards &amp; Recognitions</p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-4 items-end">
                    <Field label="Type">
                      <Select
                        value={resumeData.awardType}
                        onChange={(v) => setResumeData((prev) => ({ ...prev, awardType: v }))}
                        placeholder="Select category"
                        options={["Award", "Recognition", "Publication"]}
                      />
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
                  <button type="button" onClick={addAward} className="mt-3 rounded-lg border border-primary text-primary px-3 py-1.5 text-xs font-bold hover:bg-primary/5 flex items-center gap-1">
                    <Plus size={14} /> Add Award to Resume
                  </button>
                  {savedAwards.length > 0 && (
                    <div className="mt-3 space-y-1.5">
                      {savedAwards.map((award, index) => (
                        <div key={index} className="flex justify-between items-center rounded-lg bg-light p-2.5 text-xs border border-borderColor/45">
                          <span><strong>{award.name}</strong> by {award.by} ({award.year})</span>
                          <button type="button" onClick={() => setSavedAwards((prev) => prev.filter((_, i) => i !== index))} className="text-red-500 font-bold hover:underline">Remove</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="border-t border-borderColor/50 pt-4">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Additional Courses &amp; Certifications</p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-4 items-end">
                    <Field label="Type">
                      <Select
                        value={resumeData.courseType}
                        onChange={(v) => setResumeData((prev) => ({ ...prev, courseType: v }))}
                        placeholder="Select type"
                        options={["Workshop", "Certification", "Training"]}
                      />
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
                  <button type="button" onClick={addCourse} className="mt-3 rounded-lg border border-primary text-primary px-3 py-1.5 text-xs font-bold hover:bg-primary/5 flex items-center gap-1">
                    <Plus size={14} /> Add Course to Resume
                  </button>
                  {savedCourses.length > 0 && (
                    <div className="mt-3 space-y-1.5">
                      {savedCourses.map((course, index) => (
                        <div key={index} className="flex justify-between items-center rounded-lg bg-light p-2.5 text-xs border border-borderColor/45">
                          <span><strong>{course.name}</strong> conducted by {course.by} ({course.year})</span>
                          <button type="button" onClick={() => setSavedCourses((prev) => prev.filter((_, i) => i !== index))} className="text-red-500 font-bold hover:underline">Remove</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Section 5: Skills & Languages Information */}
              <div className="rounded-2xl border border-borderColor bg-white p-5 shadow-sm space-y-4">
                <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide border-b border-borderColor pb-2">
                  5. Skills &amp; Languages
                </h4>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label className={labelClass}>Subject Skills (Linked to Profile)</label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {teacherData.mainSubject && (
                        <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-white shadow-sm">
                          {teacherData.mainSubject} (Main)
                        </span>
                      )}
                      {selectedAdditionalSubjects.map((subject) => (
                        <span key={subject} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Languages Spoken (Linked to Profile)</label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {dynamicLanguages.map((lang, idx) => lang.language && (
                        <span key={idx} className="rounded-full bg-green-50 border border-green-150 px-3 py-1 text-xs font-bold text-green-600">
                          {lang.language} ({lang.status})
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 italic">
                  * Note: Skills and Languages are kept in sync with the **My Profile** tab entries.
                </p>
              </div>
            </div>
          )}

          {/* Cover Letter mode */}
          {resumeMode === "coverletter" && (
            <div className="space-y-5">
              <p className="text-sm text-slate-600 leading-relaxed">
                Select the job you are applying for and the CV you want to use. Our AI will generate a crisp, humanized cover letter tailored to the role.
              </p>
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <Field label="Select Job Applying For">
                  <Select
                    value={coverLetterState.selectedJob}
                    onChange={(v) => setCoverLetterState((p) => ({ ...p, selectedJob: v, generated: "" }))}
                    placeholder="Select a job..."
                    options={[
                      "Mathematics Teacher - Green Valley School",
                      "Science Faculty - Delhi Public Academy",
                      "English Teacher - St. Mary's International",
                      "Computer Teacher - Bright Future School",
                    ]}
                  />
                </Field>
                <Field label="Select CV / Resume">
                  <Select
                    value={coverLetterState.selectedResume}
                    onChange={(v) => setCoverLetterState((p) => ({ ...p, selectedResume: v, generated: "" }))}
                    placeholder={savedResumes.length === 0 ? "No resumes saved yet" : "Select a resume..."}
                    options={savedResumes.map((r) => r.title)}
                  />
                </Field>
              </div>
              <button
                type="button"
                disabled={!coverLetterState.selectedJob || !coverLetterState.selectedResume || coverLetterState.loading}
                onClick={() => {
                  setCoverLetterState((p) => ({ ...p, loading: true, generated: "" }));
                  setTimeout(() => {
                    const name = `${teacherData.title} ${teacherData.firstName} ${teacherData.lastName}`.trim();
                    setCoverLetterState((p) => ({
                      ...p,
                      loading: false,
                      generated: `Dear Hiring Manager,\n\nI am writing to express my keen interest in the position of ${p.selectedJob}. With my background in ${teacherData.mainSubject || "teaching"} and ${savedExperiences.length > 0 ? `${savedExperiences.length} years of hands-on teaching experience` : "a strong passion for education"}, I am confident in my ability to contribute meaningfully to your institution.\n\nMy teaching philosophy centers on student-focused learning and I have consistently adapted curriculum to meet diverse learning needs. I am eager to bring this approach to your team.\n\nI would welcome the opportunity to discuss how my experience aligns with your requirements.\n\nWarm regards,\n${name}`,
                    }));
                  }, 1500);
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-soft hover:bg-primary/95 disabled:opacity-50"
              >
                <Wand2 size={17} /> {coverLetterState.loading ? "Generating..." : "Generate Cover Letter"}
              </button>
              {coverLetterState.generated && (
                <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-bold text-primary">AI Generated Cover Letter</p>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(coverLetterState.generated);
                        alert("Copied to clipboard!");
                      }}
                      className="rounded-lg border border-primary/30 px-3 py-1 text-xs font-bold text-primary hover:bg-primary/10"
                    >
                      Copy
                    </button>
                  </div>
                  <pre className="whitespace-pre-wrap text-sm text-slate-700 leading-relaxed font-sans">{coverLetterState.generated}</pre>
                </div>
              )}
            </div>
          )}

          {/* Notes: only visible for upload/create modes */}
          {resumeMode !== "coverletter" && (
            <div className="mt-5">
              <Field label="Resume Notes">
                <textarea
                  value={resumeDraft.notes}
                  onChange={(e) => setResumeDraft((prev) => ({ ...prev, notes: e.target.value }))}
                  className={`${inputClass} min-h-24 resize-none`}
                  placeholder="Short note about when to use this resume."
                />
              </Field>
            </div>
          )}

          {resumeMode !== "coverletter" && (
            <button type="button" onClick={addResume} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-soft hover:bg-primary/95">
              <Plus size={17} /> {resumeMode === "upload" ? "Add Resume" : "Save Resume"}
            </button>
          )}
        </div>

        <div className="rounded-xl bg-light p-5">
          <h3 className="mb-4 text-lg font-bold text-primary">All Resumes</h3>
          {savedResumes.length === 0 ? (
            <p className="text-sm text-slate-500">Added or created resumes will appear here.</p>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-borderColor bg-white">
              <table className="min-w-[1000px] w-full text-left text-sm">
                <thead className="bg-primary/5 text-xs uppercase tracking-wide text-primary">
                  <tr>
                    {["Title", "Full Name", "Email", "Mobile", "Job Title", "Format", "Notes", "Actions"].map((heading) => (
                      <th key={heading} className="px-4 py-3 font-bold">{heading}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-borderColor text-slate-600">
                  {savedResumes.map((resume, index) => (
                    <tr key={`${resume.fileName}-${index}`} className="align-top">
                      <td className="px-4 py-3 font-bold text-slate-800">{resume.title}</td>
                      <td className="px-4 py-3">{resume.fullName || "—"}</td>
                      <td className="px-4 py-3">{resume.email || "—"}</td>
                      <td className="px-4 py-3">{resume.mobile || "—"}</td>
                      <td className="px-4 py-3">{resume.currentJobTitle || "—"}</td>
                      <td className="px-4 py-3">{resume.format}</td>
                      <td className="max-w-[160px] truncate px-4 py-3">{resume.notes || "—"}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          {resume.source === "Created" && (
                            <button
                              type="button"
                              onClick={() => downloadResume(resume)}
                              className="rounded-lg border border-primary/30 px-3 py-2 text-xs font-bold text-primary hover:bg-primary/5"
                            >
                              Download
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleDeleteResume(index)}
                            className="rounded-lg border border-red-100 px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-50"
                          >
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

  const renderViewProfile = () => {
    const totalExpYears = savedExperiences.reduce((sum, exp) => {
      if (!exp.startDate) return sum;
      const end = exp.currentEmployer ? new Date() : (exp.endDate ? new Date(exp.endDate) : new Date());
      const start = new Date(exp.startDate);
      return sum + Math.max(0, (end - start) / (1000 * 60 * 60 * 24 * 365));
    }, 0);
    const expDisplay = totalExpYears > 0 ? `${totalExpYears.toFixed(1)} years` : "Not added";
    const highestDeg = savedQualifications[0]?.degree || teacherData.highestQualificationOne || "Not added";
    const university = savedQualifications[0]?.university || "Not added";

    return (
      <>
        <SectionHeader
          title="View Profile"
          description="This is how your profile appears to recruiters before you give consent to share full details."
        />

        <div className="overflow-hidden rounded-3xl border border-borderColor bg-white shadow-soft">
          <div className="h-28 bg-primary" />
          <div className="relative px-6 pb-8">
            <div className="-mt-16 flex flex-col items-center gap-5 md:flex-row md:items-end">
              <div className="flex h-32 w-32 items-center justify-center rounded-3xl border-4 border-white bg-slate-200 shadow-md text-slate-400">
                <User size={48} />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-slate-900">
                  {teacherData.title} {teacherData.firstName?.charAt(0)}. {teacherData.lastName?.charAt(0)}.
                </h2>
                <p className="mt-2 text-sm font-semibold text-primary">
                  {teacherData.currentJob || "Teaching Professional"}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {teacherData.city ? `${teacherData.city}` : "Location not added"}
                </p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl border border-borderColor bg-light p-4">
                <p className="text-xs font-bold uppercase text-slate-500">Age</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">{teacherData.age || "Not added"}</p>
              </div>
              <div className="rounded-2xl border border-borderColor bg-light p-4">
                <p className="text-xs font-bold uppercase text-slate-500">Main Subject</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">{teacherData.mainSubject || "Not added"}</p>
              </div>
              <div className="rounded-2xl border border-borderColor bg-light p-4">
                <p className="text-xs font-bold uppercase text-slate-500">Total Experience</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">{expDisplay}</p>
              </div>
              <div className="rounded-2xl border border-borderColor bg-light p-4">
                <p className="text-xs font-bold uppercase text-slate-500">Highest Qualification</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">{highestDeg}</p>
              </div>
              <div className="rounded-2xl border border-borderColor bg-light p-4">
                <p className="text-xs font-bold uppercase text-slate-500">University</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">{university}</p>
              </div>
              <div className="rounded-2xl border border-borderColor bg-light p-4">
                <p className="text-xs font-bold uppercase text-slate-500">Area / City</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">{teacherData.city || "Not added"}</p>
              </div>
            </div>

            {teacherData.briefWriteUp && (
              <div className="mt-6">
                <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-slate-500">Professional Summary</h4>
                <p className="rounded-2xl border border-borderColor bg-light px-4 py-3 text-sm leading-relaxed text-slate-700">
                  {teacherData.briefWriteUp}
                </p>
              </div>
            )}

            {savedAwards.length > 0 && (
              <div className="mt-6">
                <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">Public Awards</h4>
                <div className="flex flex-wrap gap-3">
                  {savedAwards.map((award, i) => (
                    <div key={i} className="rounded-2xl border border-borderColor bg-light px-4 py-3">
                      <p className="text-sm font-bold text-slate-800">{award.name || "Unnamed Award"}</p>
                      <p className="text-xs text-slate-500">{award.by} · {award.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
          <p className="font-bold">Privacy Notice</p>
          <p className="mt-1 leading-relaxed">
            The above profile is what recruiters will see in the first instance — your photo, full name, mobile number, and email are kept private.
            Once you apply for a job and give your consent, your complete CV and detailed profile will be shared with the recruiter.
          </p>
        </div>
      </>
    );
  };
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

          <div className="mt-8 border-t border-white/20 pt-4">
            <button
              type="button"
              onClick={() => navigate("/teacher/dashboard")}
              className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold text-white/80 hover:bg-white/10 hover:text-white transition"
            >
              <ArrowLeft size={18} /> Back to Dashboard
            </button>
          </div>

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
                <button type="button" onClick={() => navigate(-1)} className="rounded-xl border border-borderColor px-6 py-3 text-sm font-bold text-slate-500 hover:bg-light">
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
