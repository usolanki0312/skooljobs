import { useMemo, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "@cloudstrytech/ui-components/styles.css";
import { Button, Input, Select } from "@cloudstrytech/ui-components";
import {
  Award,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  Eye,
  FileText,
  GraduationCap,
  MapPin,
  Menu,
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
import { pinStateMap } from "../../lib/teacherdata";
import qualificationOptions from "../../../dropdown/Teacher_module/qualifications.json";
import experienceOptions from "../../../dropdown/Teacher_module/experience.json";
import common from "../../../dropdown/common/common.json";
import myprofile from "../../../dropdown/Teacher_module/myprofile.json";
import styles from "./styles/TeacherProfile.module.css";


const { Language: languageOptions, Nationality: nationalities } = common;
const {
  Title: TITLES,
  Current_job_title: CURRENT_JOB_TITLES,
  Main_subject: MAIN_SUBJECTS,
  Additional_subject: ALL_ADDITIONAL_SUBJECTS,
  Class: CLASSES_TAUGHT,
  Language_proficiency: languageStatuses,
  Achievement_award_type: AWARD_TYPES,
  Achievement_course_type: COURSE_TYPES,
  Resume_format: RESUME_FORMATS,
} = myprofile;

const navItems = [
  { id: "basic", label: "My Profile", icon: User },
  { id: "viewProfile", label: "View Profile", icon: Eye },
  { id: "contact", label: "Contact Details", icon: Phone },
  { id: "qualification", label: "Qualification", icon: GraduationCap },
  { id: "experience", label: "Experience", icon: BriefcaseBusiness },
  { id: "achievements", label: "Achievements", icon: Award },
  { id: "resume", label: "Resume", icon: FileText },
];

const inputClass = styles.input;

const compactInputClass = styles.compactInput;

const labelClass = styles.fieldLabel;

const SectionHeader = ({ title, description }) => (
  <div className={styles.sectionHeaderWrap}>
    <h2 className={styles.sectionHeaderTitle}>{title}</h2>
    {description && (
      <p className={styles.sectionHeaderDescription}>
        {description}
      </p>
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
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(
    storedUser.profilePhoto || "https://i.pravatar.cc/300?img=12",
  );
  const [teacherData, setTeacherData] = useState(() => {
    const saved = localStorage.getItem("skooljobs_teacher_data");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch { }
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

  const [qualificationDraft, setQualificationDraft] =
    useState(blankQualification);
  const [savedQualifications, setSavedQualifications] = useState(() => {
    const saved = localStorage.getItem("skooljobs_teacher_qualifications");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch { }
    }
    return [];
  });
  const [editingQualificationIndex, setEditingQualificationIndex] =
    useState(null);
  const [showQualificationForm, setShowQualificationForm] = useState(false);
  const qualificationFormRef = useRef(null);

  const [experienceDraft, setExperienceDraft] = useState(blankExperience);
  const [savedExperiences, setSavedExperiences] = useState(() => {
    const saved = localStorage.getItem("skooljobs_teacher_experiences");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch { }
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
      } catch { }
    }
    return [];
  });
  const [savedCourses, setSavedCourses] = useState(() => {
    const saved = localStorage.getItem("skooljobs_teacher_courses");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch { }
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
  const [savedCoverLetters, setSavedCoverLetters] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("skooljobs_cover_letters") || "[]");
    } catch {
      return [];
    }
  });
  const [resumeMode, setResumeMode] = useState("upload");

  const [dynamicLanguages, setDynamicLanguages] = useState(() => {
    const saved = localStorage.getItem("skooljobs_teacher_languages");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch { }
    }
    return [{ language: "English", status: "Fluency enough to teach" }];
  });

  const [selectedAdditionalSubjects, setSelectedAdditionalSubjects] = useState(
    () => {
      const saved = localStorage.getItem(
        "skooljobs_teacher_additional_subjects",
      );
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch { }
      }
      return ["History", "Geography"];
    },
  );

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
    localStorage.setItem(
      "skooljobs_teacher_qualifications",
      JSON.stringify(savedQualifications),
    );
  }, [savedQualifications]);

  useEffect(() => {
    localStorage.setItem(
      "skooljobs_teacher_experiences",
      JSON.stringify(savedExperiences),
    );
  }, [savedExperiences]);

  useEffect(() => {
    localStorage.setItem(
      "skooljobs_teacher_awards",
      JSON.stringify(savedAwards),
    );
  }, [savedAwards]);

  useEffect(() => {
    localStorage.setItem(
      "skooljobs_teacher_courses",
      JSON.stringify(savedCourses),
    );
  }, [savedCourses]);

  useEffect(() => {
    localStorage.setItem(
      "skooljobs_teacher_languages",
      JSON.stringify(dynamicLanguages),
    );
  }, [dynamicLanguages]);

  useEffect(() => {
    localStorage.setItem(
      "skooljobs_teacher_additional_subjects",
      JSON.stringify(selectedAdditionalSubjects),
    );
  }, [selectedAdditionalSubjects]);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    const nextValue = type === "checkbox" ? checked : value;
    const nextState =
      name === "pinCode" && value.length >= 2
        ? pinStateMap[value.slice(0, 2)] || ""
        : undefined;

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
          if (!cancelled)
            setAreaError("Could not reach postal API. Enter manually.");
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
          index === editingQualificationIndex ? qualificationDraft : item,
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
    setTimeout(
      () =>
        qualificationFormRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        }),
      0,
    );
  };

  const saveAndAddQualification = () => {
    if (!hasValue(qualificationDraft)) {
      alert("Please enter qualification details before saving.");
      return;
    }

    setSavedQualifications((prev) => {
      if (editingQualificationIndex !== null) {
        return prev.map((item, index) =>
          index === editingQualificationIndex ? qualificationDraft : item,
        );
      }

      return [...prev, qualificationDraft];
    });
    setQualificationDraft(blankQualification);
    setEditingQualificationIndex(null);
    setShowQualificationForm(true);
    setTimeout(
      () =>
        qualificationFormRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        }),
      0,
    );
  };

  const removeQualification = (index) => {
    setSavedQualifications((prev) =>
      prev.filter((_, itemIndex) => itemIndex !== index),
    );
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
    qualificationFormRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const saveExperienceDraft = () => {
    if (!hasValue(experienceDraft)) {
      alert("Please enter experience details before saving.");
      return false;
    }

    if (
      experienceDraft.startDate &&
      new Date(experienceDraft.startDate) > new Date()
    ) {
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

    if (
      experienceDraft.endDate &&
      new Date(experienceDraft.endDate) > new Date()
    ) {
      alert("End date cannot be in the future.");
      return false;
    }

    setSavedExperiences((prev) => {
      if (editingExperienceIndex !== null) {
        return prev.map((item, index) =>
          index === editingExperienceIndex ? experienceDraft : item,
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
    setTimeout(
      () =>
        experienceFormRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        }),
      0,
    );
  };

  const saveAndAddExperience = () => {
    if (!saveExperienceDraft()) return;
    setExperienceDraft(blankExperience);
    setEditingExperienceIndex(null);
    setShowExperienceForm(true);
    setTimeout(
      () =>
        experienceFormRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        }),
      0,
    );
  };

  const removeExperience = (index) => {
    setSavedExperiences((prev) =>
      prev.filter((_, itemIndex) => itemIndex !== index),
    );
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
    experienceFormRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
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
      if (!resumeDraft.title.trim()) {
        alert("Please add a resume title.");
        return;
      }

      const addressParts = [];
      if (teacherData.address) addressParts.push(teacherData.address);
      if (teacherData.city) addressParts.push(teacherData.city);
      if (teacherData.state) addressParts.push(teacherData.state);
      if (teacherData.pinCode) addressParts.push(teacherData.pinCode);
      const fullAddress = addressParts.join(", ");

      const educationStr = savedQualifications
        .map(
          (q) =>
            `${q.degree || q.classLevel}${q.course ? " in " + q.course : ""} - ${q.college || q.school} (${q.year || "N/A"})`,
        )
        .join("\n");

      const experienceStr = savedExperiences
        .map(
          (e) =>
            `${e.post} at ${e.school} (${e.startDate || "N/A"} to ${e.currentEmployer ? "Present" : e.endDate || "N/A"})`,
        )
        .join("\n\n");

      const certificationsStr = savedCourses
        .map(
          (c) =>
            `${c.name || "Course"} by ${c.by || "N/A"} (${c.year || "N/A"})`,
        )
        .join("\n");

      const achievementsStr = savedAwards
        .map(
          (a) =>
            `${a.name || "Award"} by ${a.by || "N/A"} (${a.year || "N/A"})`,
        )
        .join("\n");

      const languagesStr = dynamicLanguages
        .map((l) => `${l.language} (${l.status})`)
        .filter((l) => l.trim())
        .join(", ");

      const skillsStr = [teacherData.mainSubject, ...selectedAdditionalSubjects]
        .filter(Boolean)
        .join(", ");

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
        fileName: `${cleanTitle
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")}.${extension}`,
        notes: resumeDraft.notes,
        source: "Created",
        skill: teacherData.mainSubject || "Teaching",
        score: 85,
      };

      const updated = [...savedResumes, newResume];
      setSavedResumes(updated);
      localStorage.setItem("skooljobs_resumes", JSON.stringify(updated));

      setResumeDraft({
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
      const cleanTitle =
        resumeDraft.title.trim() ||
        resumeDraft.fileName.replace(/\.[^/.]+$/, "");
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
        score: 85,
      };

      const updated = [...savedResumes, newResume];
      setSavedResumes(updated);
      localStorage.setItem("skooljobs_resumes", JSON.stringify(updated));

      setResumeDraft({
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
      sep,
      resume.title.toUpperCase(),
      sep,
      "",
      "PERSONAL INFORMATION",
      sec,
      `Name        : ${resume.fullName}`,
      `Email       : ${resume.email}`,
      `Mobile      : ${resume.mobile}`,
      `Address     : ${resume.address || "Not provided"}`,
      `Job Title   : ${resume.currentJobTitle || "Not provided"}`,
      "",
    ];
    const addSection = (heading, value) => {
      if (value?.trim())
        lines.push(heading.toUpperCase(), sec, value.trim(), "");
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
    const blob = new Blob([content], {
      type: isPdf ? "application/octet-stream" : "text/plain",
    });
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
    (completionItems.filter(Boolean).length / completionItems.length) * 100,
  );
  const updateField = (field) => (value) => {
    setTeacherData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const renderBasicInfo = () => (
    <>
      <SectionHeader
        title="My Profile"
        description="Keep your identity, teaching preferences, and profile details accurate for schools."
      />
      <div className={styles.basicInfoNameGrid}>
        <Field label="Title">
          <Select
            value={teacherData.title}
            onChange={(v) => setField("title", v)}
            options={TITLES}
          />
        </Field>
        <Field label="First Name">
          <Input
            value={teacherData.firstName}
            onChange={(value) =>
              setTeacherData((prev) => ({
                ...prev,
                firstName: value,
              }))
            }
          />
        </Field>
        <Field label="Middle Name">
          <Input
            value={teacherData.middleName}
            placeholder="Optional"
            onChange={(value) =>
              setTeacherData((prev) => ({
                ...prev,
                middleName: value,
              }))
            }
          />
        </Field>
        <Field label="Last Name">
          <Input
            value={teacherData.lastName}
            onChange={(value) =>
              setTeacherData((prev) => ({
                ...prev,
                lastName: value,
              }))
            }
          />
        </Field>
      </div>

      <div className={styles.basicInfoDobGrid}>
        <div className={styles.flexColStart}>
          <label className={labelClass}>DOB</label>
          <div className={styles.dobInputGrid}>
            <Input
              value={teacherData.dobDay}
              placeholder="DD"
              onChange={(value) =>
                setTeacherData((prev) => ({
                  ...prev,
                  dobDay: value,
                }))
              }
            />
            <Input
              value={teacherData.dobMonth}
              placeholder="MM"
              onChange={(value) =>
                setTeacherData((prev) => ({
                  ...prev,
                  dobMonth: value.replace(/\D/g, "").slice(0, 2),
                }))
              }
            />

            <Input
              value={teacherData.dobYear}
              placeholder="YYYY"
              onChange={(value) =>
                setTeacherData((prev) => ({
                  ...prev,
                  dobYear: value.replace(/\D/g, "").slice(0, 4),
                }))
              }
            />
          </div>
        </div>
        <div className={styles.flexColStart}>
          <label className={labelClass}>Age (Years Only)</label>
          <Input
            value={teacherData.age}
            placeholder="Auto calculated"
            onChange={(value) =>
              setTeacherData((prev) => ({
                ...prev,
                age: value,
              }))
            }
          />
          <p className={styles.helperText}>
            If DOB not entered, user can enter age.
          </p>
        </div>
        <div className={styles.flexColStart}>
          <label className={labelClass}>Nationality</label>
          <Select
            value={teacherData.nationality}
            onChange={(v) => setField("nationality", v)}
            placeholder="Select nationality"
            options={nationalities}
          />
        </div>
      </div>

      <div className={styles.basicInfoLowerGrid}>
        <Field label="Current Job Title">
          <Select
            value={teacherData.currentJob}
            onChange={(v) => setField("currentJob", v)}
            placeholder="Select..."
            options={CURRENT_JOB_TITLES}
          />
        </Field>
        <Field label="Main Subject">
          <Select
            value={teacherData.mainSubject}
            onChange={(v) => setField("mainSubject", v)}
            placeholder="Select Subject"
            options={MAIN_SUBJECTS}
          />
          <p className={styles.helperTextTight}>
            Only one can be selected.
          </p>
        </Field>
        <div className={styles.lgColSpan2}>
          <label className={labelClass}>Additional Subject(s)</label>
          {/* Selected subjects as removable tags */}
          {selectedAdditionalSubjects.length > 0 && (
            <div className={styles.subjectTagsRow}>
              {selectedAdditionalSubjects.map((subject) => (
                <span
                  key={subject}
                  className={styles.subjectTag}
                >
                  {subject}
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedAdditionalSubjects((prev) =>
                        prev.filter((s) => s !== subject),
                      )
                    }
                    className={styles.subjectTagRemoveBtn}
                  >
                    <X size={13} />
                  </button>
                </span>
              ))}
            </div>
          )}
          {/* Dropdown + manual input row */}
          <div className={styles.subjectPickerRow}>
            <select
              value=""
              onChange={(e) => {
                const val = e.target.value;
                if (val && !selectedAdditionalSubjects.includes(val)) {
                  setSelectedAdditionalSubjects((prev) => [...prev, val]);
                }
              }}
              className={`${inputClass} ${styles.subjectSelectFlex}`}
            >
              <option value="">Select additional subject...</option>
              {ALL_ADDITIONAL_SUBJECTS.filter(
                (s) => !selectedAdditionalSubjects.includes(s),
              ).map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Or type custom subject"
              className={`${inputClass} ${styles.subjectSelectFlex}`}
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
              className={styles.addSubjectBtn}
            >
              <Plus size={15} /> Add
            </button>
          </div>
          <p className={styles.helperTextTight}>
            Select from dropdown or type a custom subject and press Enter / Add.
          </p>
        </div>
        <div className={styles.lgColSpan3}>
          <label className={labelClass}>Classes Taught</label>
          <div className={styles.classesTaughtRow}>
            <span className={styles.classIndexLabel}>(1)</span>
            <div className={styles.classSelectWrap}>
              <Select
                value={teacherData.classTaughtOne}
                onChange={(v) => setField("classTaughtOne", v)}
                placeholder="Select..."
                options={CLASSES_TAUGHT}
              />
            </div>
            <span className={styles.classIndexLabel}>(2)</span>
            <div className={styles.classSelectWrap}>
              <Select
                value={teacherData.classTaughtTwo}
                onChange={(v) => setField("classTaughtTwo", v)}
                placeholder="Select..."
                options={CLASSES_TAUGHT}
              />
            </div>
          </div>
        </div>
        <div className={styles.lgColSpan3}>
          <Button startIcon="plusIcon" endIcon="shareIcon" size="sm">Add Language</Button>
          <div className={styles.languageRowsStack}>
            {dynamicLanguages.map((lang, idx) => (
              <div
                key={idx}
                className={styles.languageRow}
              >
                <Select
                  value={lang.language}
                  onChange={(v) =>
                    setDynamicLanguages((prev) =>
                      prev.map((l, i) =>
                        i === idx ? { ...l, language: v } : l,
                      ),
                    )
                  }
                  placeholder="Select language..."
                  options={languageOptions}
                />
                <Select
                  value={lang.status}
                  onChange={(v) =>
                    setDynamicLanguages((prev) =>
                      prev.map((l, i) => (i === idx ? { ...l, status: v } : l)),
                    )
                  }
                  placeholder="Select proficiency..."
                  options={languageStatuses}
                />
                {dynamicLanguages.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setDynamicLanguages((prev) =>
                        prev.filter((_, i) => i !== idx),
                      )
                    }
                    className={styles.languageRemoveBtn}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.lgColSpan3}>
          <div className={styles.qualificationGrid}>
            <span className={styles.qualificationLabel}>
              Highest Qualification 1
            </span>
            <Select
              value={teacherData.highestQualificationOne}
              onChange={(v) => setField("highestQualificationOne", v)}
              placeholder="Select..."
              options={qualificationOptions.degrees}
            />
            <span className={styles.qualificationLabel}>
              Highest Qualification 2
            </span>
            <Select
              value={teacherData.highestQualificationTwo}
              onChange={(v) => setField("highestQualificationTwo", v)}
              placeholder="Select..."
              options={qualificationOptions.degrees}
            />
          </div>
        </div>
        <div className={styles.lgColSpan3}>
          <Field label="Brief Professional Write-up (50–100 words)">
            <textarea
              name="briefWriteUp"
              value={teacherData.briefWriteUp}
              onChange={handleChange}
              maxLength={600}
              rows={4}
              className={`${inputClass} ${styles.inputTextarea}`}
              placeholder="Write a short professional summary about yourself — your teaching philosophy, key strengths, and what makes you stand out as an educator..."
            />
            <p className={styles.wordCountText}>
              {teacherData.briefWriteUp.split(/\s+/).filter(Boolean).length} /
              100 words
            </p>
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
      <div className={styles.contactSectionStack}>
        <div>
          <div className={styles.contactSubHeaderRow}>
            <span className={styles.contactSubHeaderIcon}>
              <Phone size={19} />
            </span>
            <h3 className={styles.contactSubHeaderTitle}>Phone & Email</h3>
          </div>
          <div className={styles.contactFieldsGrid}>
            <Field label="Mobile Number *">
              <Input
                value={teacherData.mobile}

                onChange={(value) =>
                  setTeacherData((prev) => ({
                    ...prev,
                    mobile: value,
                  }))
                }
              />
            </Field>
            <div>
              <Field label="WhatsApp Number">
                <Input
                  value={teacherData.whatsapp}
                  placeholder="Enter WhatsApp number"
                  onChange={(value) =>
                    setTeacherData((prev) => ({
                      ...prev,
                      whatsapp: value,
                    }))
                  }
                />
              </Field>
              <label className={styles.sameAsMobileLabel}>
                <input
                  type="checkbox"
                  name="sameAsMobile"
                  checked={teacherData.sameAsMobile}
                  onChange={handleChange}
                  className={styles.sameAsMobileCheckbox}
                />
                Same as Mobile Number
              </label>
            </div>
            <Field label="Primary Email *">
              <Input
                type="email"
                value={teacherData.primaryEmail}
                onChange={(value) =>
                  setTeacherData((prev) => ({
                    ...prev,
                    primaryEmail: value,
                  }))
                }
              />
            </Field>
            <Field label="Secondary Email">
              <Input
                type="email"
                value={teacherData.secondaryEmail}
                placeholder="Enter secondary email"
                onChange={(value) =>
                  setTeacherData((prev) => ({
                    ...prev,
                    secondaryEmail: value,
                  }))
                }
              />
            </Field>
          </div>
        </div>
        <div>
          <div className={styles.addressSubHeaderRow}>
            <div className={styles.addressSubHeaderLeft}>
              <span className={styles.contactSubHeaderIcon}>
                <MapPin size={19} />
              </span>
              <h3 className={styles.contactSubHeaderTitle}>
                Postal Address
              </h3>
            </div>
            <span className={styles.smartEntryBadge}>
              <Sparkles size={14} /> Smart Entry
            </span>
          </div>

          {/* Locality search — type an area name, pick from results, everything fills */}
          <div className={styles.localitySearchCard}>
            <Field label="Search Area / Locality">
              <div className={styles.relativeWrap}>
                <Input
                  value={areaQuery}
                  placeholder="Type an area name, e.g. Rajendra Nagar (min 3 letters)"
                  autoComplete="off"
                  onChange={(value) => {
                    setAreaQuery(value);
                    setAreaError("");
                  }}
                  onFocus={() =>
                    areaResults.length > 0 && setShowAreaDropdown(true)
                  }
                />
                {areaLoading && (
                  <span className={styles.searchingBadge}>
                    Searching…
                  </span>
                )}

                {showAreaDropdown && areaResults.length > 0 && (
                  <div className={styles.localityDropdown}>
                    {areaResults.map((po, i) => (
                      <button
                        key={`${po.Name}-${po.Pincode}-${i}`}
                        type="button"
                        onClick={() => handleSelectLocality(po)}
                        className={styles.localityOptionBtn}
                      >
                        <span>
                          <span className={styles.localityOptionName}>
                            {po.Name}
                          </span>
                          <span className={styles.localityOptionMeta}>
                            {po.District}, {po.State}
                          </span>
                        </span>
                        <span className={styles.localityOptionPincode}>
                          {po.Pincode}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {areaError ? (
                <p className={styles.errorTextSm}>{areaError}</p>
              ) : (
                <p className={styles.helperTextSm}>
                  Select a locality and the City, State &amp; PIN code fill in
                  automatically.
                </p>
              )}
            </Field>
          </div>

          <div className={styles.addressLightCard}>
            <div className={styles.addressFieldsGrid}>
              <Field label="PIN Code *">
                <div className={styles.relativeWrap}>
                  <Input
                    name="pinCode"
                    value={teacherData.pinCode}
                    onChange={(value) => {
                      setPincodeError("");
                      handleChange({
                        target: {
                          name: "pinCode",
                          value,
                        },
                      });
                    }}
                    placeholder="Enter PIN"
                  />
                  {pincodeLoading && (
                    <span className={styles.fetchingBadge}>
                      Fetching…
                    </span>
                  )}
                </div>
                {pincodeError ? (
                  <p className={styles.errorTextSm}>{pincodeError}</p>
                ) : (
                  <p className={styles.helperTextXs}>
                    Auto-filled from locality search, or type a 6-digit PIN to
                    fill the rest.
                  </p>
                )}
              </Field>
              <Field label="City *">
                <Input
                  name="city"
                  value={teacherData.city}
                  onChange={(value) =>
                    handleChange({
                      target: {
                        name: "city",
                        value,
                      },
                    })
                  }
                  placeholder="Type city"
                />
              </Field>
              <Field label="State *">
                <Input
                  name="state"
                  value={teacherData.state}
                  onChange={(value) =>
                    handleChange({
                      target: {
                        name: "state",
                        value,
                      },
                    })
                  }
                  placeholder="Auto-filled"
                />
              </Field>
            </div>
          </div>

          <div className={styles.fullAddressWrap}>
            <Field label="Full Address for Correspondence">
              <textarea
                name="address"
                value={teacherData.address}
                onChange={handleChange}
                className={`${inputClass} ${styles.inputTextareaMinH28}`}
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
      <SectionHeader title="Academic Qualifications" />
      <div className={styles.sectionStack7}>
        {!showQualificationForm && (
          <Button
            type="button"
            variant="filled"
            startIcon="plusIcon"
            onClick={addQualification}
          >
            Add Qualification
          </Button>
        )}

        {showQualificationForm && (
          <div
            ref={qualificationFormRef}
            className={styles.formCard}
          >
            <div className={styles.formGrid3}>
              <Field label="Class">
                <Select
                  value={qualificationDraft.classLevel}
                  onChange={(classLevel) => {
                    setQualificationDraft((prev) => ({
                      ...prev,
                      classLevel,
                      degree:
                        classLevel === "Class 10"
                          ? "Secondary (10th)"
                          : classLevel === "Class 12"
                            ? "Senior Secondary (12th)"
                            : prev.degree,
                    }));
                  }}
                  placeholder="Select Class"
                  options={qualificationOptions.class_levels}
                />
              </Field>
              {qualificationDraft.classLevel && (
                <Field label="School Name">
                  <Input
                    value={qualificationDraft.school}
                    placeholder="Enter school name"
                    onChange={(value) =>
                      updateQualification("school", value)
                    }
                  />
                </Field>
              )}
              {qualificationDraft.classLevel && (
                <Field label=" %">
                  <Input
                    value={qualificationDraft.percentage}
                    placeholder="e.g. 76.2"
                    onChange={(value) =>
                      updateQualification(
                        "percentage",
                        value.replace(/[^0-9.]/g, "")
                      )
                    }
                  />
                </Field>
              )}
              <Field label="Degree">
                <Select
                  value={qualificationDraft.degree}
                  onChange={(v) => updateQualification("degree", v)}
                  placeholder="Select Degree"
                  options={qualificationOptions.degrees}
                />
              </Field>
              <Field label="Course Name">
                <Select
                  value={qualificationDraft.course}
                  onChange={(v) => updateQualification("course", v)}
                  placeholder="Select Course"
                  options={qualificationOptions.courses}
                />
              </Field>
              <Field label="Year Passed">
                <Input
                  value={qualificationDraft.year}
                  placeholder="e.g. 2023"
                  onChange={(value) =>
                    updateQualification("year", value.replace(/\D/g, "").slice(0, 4))
                  }
                />
              </Field>
              <Field label="Medium of Instruction">
                <Select
                  value={qualificationDraft.medium}
                  onChange={(v) => updateQualification("medium", v)}
                  placeholder="Select Medium"
                  options={qualificationOptions.mediums}
                />
              </Field>
              <Field label="Mode of Study">
                <Select
                  value={qualificationDraft.mode}
                  onChange={(v) => updateQualification("mode", v)}
                  placeholder="Select Mode"
                  options={qualificationOptions.modes}
                />
              </Field>
              {!qualificationDraft.classLevel && (
                <Field label="Percentage %">
                  <Input
                    label=" "
                    value={qualificationDraft.percentage}
                    onChange={(value) =>
                      updateQualification("percentage", value)
                    }
                    placeholder="e.g. 76.2"
                  />
                </Field>
              )}
              <Field label="University Name">
                <Select
                  value={qualificationDraft.university}
                  onChange={(v) => updateQualification("university", v)}
                  placeholder="Select University"
                  options={qualificationOptions.universities}
                />
              </Field>
              <div className={styles.lgColSpan2}>
                <Field label="College Name">
                  <Select
                    value={qualificationDraft.college}
                    onChange={(v) => updateQualification("college", v)}
                    placeholder="Select College / Institution"
                    options={qualificationOptions.colleges}
                  />
                </Field>
              </div>
            </div>
            <div className={styles.formActionsRow}>
              <Button
                variant="filled"
                startIcon="saveIcon"
                onClick={saveQualificationDraft}
              >
                Save
              </Button>
              <Button
                variant="filled"
                startIcon="plusIcon"
                onClick={saveAndAddQualification}
              >
                Add Another
              </Button>
            </div>
          </div>
        )}

        <div className={styles.savedListCard}>
          <h3 className={styles.savedListTitle}>
            Saved Qualifications
          </h3>
          {savedQualifications.length === 0 ? (
            <p className={styles.emptyListText}>
              Saved qualification entries will appear here.
            </p>
          ) : (
            <div className={styles.tableScrollWrap}>
              <table className={styles.tableMinWide}>
                <thead className={styles.tableHead}>
                  <tr>
                    {[
                      "Class",
                      "School",
                      "%",
                      "Degree",
                      "Course",
                      "Year",
                      "Medium",
                      "Mode",
                      "University",
                      "College",
                      "Action",
                    ].map((heading) => (
                      <th key={heading} className={styles.tableHeadCell}>
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className={styles.tableBody}>
                  {savedQualifications.map((item, index) => (
                    <tr key={`${item.degree}-${index}`} className={styles.tableRowTop}>
                      <td className={styles.tableCellBold}>
                        {item.classLevel || "Not added"}
                      </td>
                      <td className={styles.tableCell}>
                        {item.school || "Not added"}
                      </td>
                      <td className={styles.tableCell}>
                        {item.percentage || "Not added"}
                      </td>
                      <td className={styles.tableCell}>
                        {item.degree || "Not added"}
                      </td>
                      <td className={styles.tableCell}>
                        {item.course || "Not added"}
                      </td>
                      <td className={styles.tableCell}>{item.year || "Not added"}</td>
                      <td className={styles.tableCell}>
                        {item.medium || "Not added"}
                      </td>
                      <td className={styles.tableCell}>{item.mode || "Not added"}</td>
                      <td className={styles.tableCell}>
                        {item.university || "Not added"}
                      </td>
                      <td className={styles.tableCell}>
                        {item.college || "Not added"}
                      </td>
                      <td className={styles.tableCell}>
                        <div className={styles.tableActionsRow}>
                          <Button
                            variant="outlined"
                            onClick={() => editQualification(index)}
                            startIcon="editIcon"
                          >
                            Edit
                          </Button>

                          <Button
                            variant="outlined"
                            onClick={() => removeQualification(index)}
                            startIcon="deleteIcon"
                          >
                            Delete
                          </Button>
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
      <SectionHeader title="Teaching Experience" />
      <div className={styles.sectionStack7}>
        {!showExperienceForm && (
          <Button
            variant="primary"
            onClick={addExperience}
            startIcon="plusIcon"
          >
            Add Experience
          </Button>
        )}

        {showExperienceForm && (
          <div
            ref={experienceFormRef}
            className={styles.formCard}
          >
            <div className={styles.formGrid3}>
              <div className={styles.lgColSpan2}>
                <Field label="Name of the School">
                  <Input
                    label="School"
                    value={experienceDraft.school}
                    onChange={(value) =>
                      updateExperience("school", value)
                    }
                    placeholder="e.g. Lincoln High School"
                  />
                </Field>
              </div>
              <label className={styles.checkboxLabelLg}>
                <input
                  type="checkbox"
                  checked={experienceDraft.currentEmployer}
                  onChange={(e) =>
                    updateExperience("currentEmployer", e.target.checked)
                  }
                  className={styles.sameAsMobileCheckbox}
                />
                Current Employer
              </label>
              <Field label="Board">
                <Select
                  value={experienceDraft.board}
                  onChange={(v) => updateExperience("board", v)}
                  placeholder="Select Board"
                  options={experienceOptions.boards}
                />
              </Field>
              <Field label="Start Date">
                <input
                  type="date"
                  value={experienceDraft.startDate}
                  max={new Date().toISOString().split("T")[0]}
                  onChange={(e) =>
                    updateExperience("startDate", e.target.value)
                  }
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
                <Select
                  value={experienceDraft.mainSubject}
                  onChange={(v) => updateExperience("mainSubject", v)}
                  placeholder="Select Main Subject"
                  options={experienceOptions.subjects}
                />
              </Field>
              <Field label="Other Subjects">
                <Select
                  value={experienceDraft.otherSubjects}
                  onChange={(v) => updateExperience("otherSubjects", v)}
                  placeholder="Select Other Subject"
                  options={experienceOptions.subjects}
                />
              </Field>
              <Field label="Post Held / Job Title">
                <Select
                  value={experienceDraft.post}
                  onChange={(v) => updateExperience("post", v)}
                  placeholder="Select Post"
                  options={experienceOptions.posts}
                />
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
                <Select
                  value={experienceDraft.reason}
                  onChange={(v) => updateExperience("reason", v)}
                  placeholder="Select Reason"
                  options={experienceOptions.reasons}
                />
              </Field>
              <div className={styles.lgColSpan3}>
                <Field label="Any other details to be mentioned">
                  <textarea
                    value={experienceDraft.details}
                    onChange={(e) =>
                      updateExperience("details", e.target.value)
                    }
                    className={`${inputClass} ${styles.inputTextareaMinH28}`}
                    placeholder="Describe key achievements, responsibilities, or specific methodologies used."
                  />
                </Field>
              </div>
            </div>
            <div className={styles.formActionsRow}>
              <Button
                variant="primary"
                onClick={saveExperienceDraft}
                startIcon="saveIcon"
              >
                Save
              </Button>

              <Button
                variant="outlined"
                onClick={saveAndAddExperience}
                startIcon="plusIcon"
              >
                Add Another
              </Button>
            </div>
          </div>
        )}

        <div className={styles.savedListCard}>
          <h3 className={styles.savedListTitle}>
            Saved Experience
          </h3>
          {savedExperiences.length === 0 ? (
            <p className={styles.emptyListText}>
              Saved experience entries will appear here.
            </p>
          ) : (
            <div className={styles.tableScrollWrap}>
              <table className={styles.tableMinWideLg}>
                <thead className={styles.tableHead}>
                  <tr>
                    {[
                      "School",
                      "Current",
                      "Board",
                      "Start",
                      "End",
                      "Main Subject",
                      "Other Subject",
                      "Post",
                      "Salary",
                      "Monthly Take Home",
                      "Reason",
                      "Action",
                    ].map((heading) => (
                      <th key={heading} className={styles.tableHeadCell}>
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className={styles.tableBody}>
                  {savedExperiences.map((item, index) => (
                    <tr key={`${item.school}-${index}`} className={styles.tableRowTop}>
                      <td className={styles.tableCellBold}>
                        {item.school || "Not added"}
                      </td>
                      <td className={styles.tableCell}>
                        {item.currentEmployer ? "Yes" : "No"}
                      </td>
                      <td className={styles.tableCell}>{item.board || "Not added"}</td>
                      <td className={styles.tableCell}>
                        {item.startDate || "Not added"}
                      </td>
                      <td className={styles.tableCell}>
                        {item.currentEmployer
                          ? "Present"
                          : item.endDate || "Not added"}
                      </td>
                      <td className={styles.tableCell}>
                        {item.mainSubject || "Not added"}
                      </td>
                      <td className={styles.tableCell}>
                        {item.otherSubjects || "Not added"}
                      </td>
                      <td className={styles.tableCell}>{item.post || "Not added"}</td>
                      <td className={styles.tableCell}>
                        {item.salary || "Not added"}
                      </td>
                      <td className={styles.tableCell}>
                        {item.monthlyTakeHome || "Not added"}
                      </td>
                      <td className={styles.tableCell}>
                        {item.reason || "Not added"}
                      </td>
                      <td className={styles.tableCell}>
                        <div className={styles.tableActionsRow}>
                          <Button
                            variant="outlined"
                            onClick={() => editExperience(index)}
                            startIcon="editIcon"
                          >
                            Edit
                          </Button>

                          <Button
                            variant="outlined"
                            onClick={() => removeExperience(index)}
                            startIcon="deleteIcon"
                          >
                            Delete
                          </Button>
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
      <div className={styles.achievementsStack}>
        <div className={styles.achievementCard}>
          <div className={styles.achievementCardHeader}>
            <span className={styles.contactSubHeaderIcon}>
              <Trophy size={20} />
            </span>
            <h3 className={styles.contactSubHeaderTitle}>
              Achievements & Recognitions
            </h3>
          </div>
          <div className={styles.formGrid4}>
            <Field label="Type">
              <Select
                value={resumeData.awardType}
                onChange={(v) =>
                  setResumeData((prev) => ({ ...prev, awardType: v }))
                }
                placeholder="Select category"
                options={AWARD_TYPES}
              />
            </Field>
            <Field label="Name of the Award">
              <Input
                value={resumeData.awardName}
                onChange={(value) =>
                  setResumeData((prev) => ({
                    ...prev,
                    awardName: value,
                  }))
                }
              />
            </Field>
            <Field label="Presented By">
              <Input
                value={resumeData.awardBy}
                onChange={(value) =>
                  setResumeData((prev) => ({
                    ...prev,
                    awardBy: value,
                  }))
                }
                placeholder="Organization / Institute"
              />
            </Field>
            <Field label="Year">
              <Input
                value={resumeData.awardYear}
                onChange={(value) =>
                  setResumeData((prev) => ({
                    ...prev,
                    awardYear: value,
                  }))
                }
                placeholder="Year"
              />

            </Field>
          </div>
          <Button
            variant="filled"
            onClick={addAward}
            startIcon="plusIcon"
          >
            Add Another Award
          </Button>
          <div className={styles.savedSubCard}>
            <h4 className={styles.savedSubCardTitle}>Saved Awards</h4>
            {savedAwards.length === 0 ? (
              <p className={styles.emptyListText}>
                Saved award entries will appear here.
              </p>
            ) : (
              <div className={styles.savedEntriesStack}>
                {savedAwards.map((award, index) => (
                  <div
                    key={`award-${index}`}
                    className={styles.savedEntryCard}
                  >
                    <p className={styles.savedEntryTitle}>
                      Award #{index + 1}
                    </p>
                    <div className={styles.savedEntryGrid}>
                      <p>
                        <span className={styles.savedEntryFieldLabel}>Type:</span>{" "}
                        {award.type || "Not added"}
                      </p>
                      <p>
                        <span className={styles.savedEntryFieldLabel}>Name:</span>{" "}
                        {award.name || "Not added"}
                      </p>
                      <p>
                        <span className={styles.savedEntryFieldLabel}>
                          Presented By:
                        </span>{" "}
                        {award.by || "Not added"}
                      </p>
                      <p>
                        <span className={styles.savedEntryFieldLabel}>Year:</span>{" "}
                        {award.year || "Not added"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className={styles.achievementCard}>
          <div className={styles.achievementCardHeader}>
            <span className={styles.contactSubHeaderIcon}>
              <BookOpen size={20} />
            </span>
            <h3 className={styles.contactSubHeaderTitle}>
              Additional Courses & Trainings
            </h3>
          </div>
          <div className={styles.formGrid4}>
            <Field label="Type">
              <Select
                value={resumeData.courseType}
                onChange={(v) =>
                  setResumeData((prev) => ({ ...prev, courseType: v }))
                }
                placeholder="Select type"
                options={COURSE_TYPES}
              />
            </Field>
            <Field label="Name of the Course">
              <Input
                value={resumeData.courseName}
                onChange={(value) =>
                  setResumeData((prev) => ({
                    ...prev,
                    courseName: value,
                  }))
                }
                placeholder="e.g. Advanced Pedagogy"
              />
            </Field>
            <Field label="Conducted By">
              <Input
                value={resumeData.conductedBy}
                onChange={(value) =>
                  setResumeData((prev) => ({
                    ...prev,
                    conductedBy: value,
                  }))
                }
                placeholder="Organization / Institute"
              />
            </Field>
            <Field label="Year">
              <Input
                value={resumeData.courseYear}
                onChange={(value) =>
                  setResumeData((prev) => ({
                    ...prev,
                    courseYear: value,
                  }))
                }
                placeholder="Year"
              />
            </Field>
          </div>
          <Button
            variant="filled"
            onClick={addCourse}
            startIcon="plusIcon"
          >
            Add Another Course
          </Button>
          <div className={styles.savedSubCard}>
            <h4 className={styles.savedSubCardTitle}>Saved Courses</h4>
            {savedCourses.length === 0 ? (
              <p className={styles.emptyListText}>
                Saved course entries will appear here.
              </p>
            ) : (
              <div className={styles.savedEntriesStack}>
                {savedCourses.map((course, index) => (
                  <div
                    key={`course-${index}`}
                    className={styles.savedEntryCard}
                  >
                    <p className={styles.savedEntryTitle}>
                      Course #{index + 1}
                    </p>
                    <div className={styles.savedEntryGrid}>
                      <p>
                        <span className={styles.savedEntryFieldLabel}>Type:</span>{" "}
                        {course.type || "Not added"}
                      </p>
                      <p>
                        <span className={styles.savedEntryFieldLabel}>Name:</span>{" "}
                        {course.name || "Not added"}
                      </p>
                      <p>
                        <span className={styles.savedEntryFieldLabel}>
                          Conducted By:
                        </span>{" "}
                        {course.by || "Not added"}
                      </p>
                      <p>
                        <span className={styles.savedEntryFieldLabel}>Year:</span>{" "}
                        {course.year || "Not added"}
                      </p>
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
      <div className={styles.resumeSectionStack}>
        <div className={styles.resumeMainCard}>
          <div className={styles.resumeHeaderRow}>
            <div className={styles.resumeHeaderLeft}>
              <span className={styles.contactSubHeaderIcon}>
                <Upload size={20} />
              </span>
              <div>
                <h3 className={styles.contactSubHeaderTitle}>
                  {resumeMode === "upload"
                    ? "Add Resume"
                    : resumeMode === "create"
                      ? "Create Resume"
                      : "Cover Letter"}
                </h3>
                {resumeMode === "upload" && (
                  <p className={styles.resumeHeaderSubtext}>
                    Accepted formats: <strong>PDF</strong> or{" "}
                    <strong>Word (.docx)</strong> only.
                  </p>
                )}
              </div>
            </div>
            <div className={styles.resumeModeTabs}>
              <button
                type="button"
                onClick={() => setResumeMode("upload")}
                className={`${styles.resumeModeTab} ${resumeMode === "upload" ? styles.resumeModeTabActive : ""}`}
              >
                Add Resume
              </button>
              <button
                type="button"
                onClick={() => setResumeMode("create")}
                className={`${styles.resumeModeTab} ${resumeMode === "create" ? styles.resumeModeTabActive : ""}`}
              >
                Create Resume
              </button>
              <button
                type="button"
                onClick={() => setResumeMode("coverletter")}
                className={`${styles.resumeModeTab} ${resumeMode === "coverletter" ? styles.resumeModeTabActive : ""}`}
              >
                Cover Letter
              </button>
            </div>
          </div>
          {/* Upload mode: show CV Builder callout */}
          {resumeMode === "upload" && (
            <div className={styles.cvBuilderCallout}>
              <FileText size={20} className={styles.cvBuilderIcon} />
              <div>
                <p className={styles.cvBuilderTitle}>
                  Don't have a CV ready?
                </p>
                <p className={styles.cvBuilderText}>
                  Use the <strong>Create Resume</strong> tab to build a
                  formatted CV using our CV Builder — you can preview and
                  download it as a PDF.
                </p>
                <button
                  type="button"
                  onClick={() => setResumeMode("create")}
                  className={styles.cvBuilderButton}
                >
                  Open CV Builder →
                </button>
              </div>
            </div>
          )}

          {/* Top row: always visible for upload/create */}
          {resumeMode !== "coverletter" && (
            <div className={styles.resumeTopRowGrid}>
              <Field label="Resume Title *">
                <Input
                  value={resumeDraft.title}
                  onChange={(value) =>
                    setResumeDraft((prev) => ({
                      ...prev,
                      title: value,
                    }))
                  }
                  placeholder="e.g. Senior Teacher Resume"
                />
              </Field>
              <Field label="Format">
                <Select
                  value={resumeDraft.format}
                  onChange={(v) =>
                    setResumeDraft((prev) => ({ ...prev, format: v }))
                  }
                  options={RESUME_FORMATS}
                />
              </Field>
              {resumeMode === "upload" && (
                <Field label="Upload File">
                  <label className={styles.fileUploadLabel}>
                    <Upload size={22} />
                    <span>Choose PDF or Word (.docx)</span>
                    <span className={styles.fileUploadHint}>
                      Only PDF and .docx files are accepted
                    </span>
                    <input
                      type="file"
                      hidden
                      accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={handleResumeFile}
                    />
                  </label>
                  {resumeDraft.fileName && (
                    <p className={styles.fileSelectedText}>
                      Selected: {resumeDraft.fileName}
                    </p>
                  )}
                </Field>
              )}
            </div>
          )}

          {/* Create mode: full structured resume form */}
          {resumeMode === "create" && (
            <div className={styles.createModeStack}>
              {/* Section 1: Personal Info & Contact Details */}
              <div className={styles.createModeCard}>
                <h4 className={styles.createModeCardTitle}>
                  1. Personal &amp; Contact Information
                </h4>
                <div className={styles.createModeFieldsGrid}>
                  <Field label="First Name *">
                    <Input
                      value={teacherData.firstName}
                      onChange={(value) =>
                        setTeacherData((prev) => ({
                          ...prev,
                          firstName: value,
                        }))
                      }
                    />
                  </Field>

                  <Field label="Last Name *">
                    <Input
                      value={teacherData.lastName}
                      onChange={(value) =>
                        setTeacherData((prev) => ({
                          ...prev,
                          lastName: value,
                        }))
                      }
                    />
                  </Field>

                  <Field label="Email Address *">
                    <Input
                      type="email"
                      value={teacherData.primaryEmail}
                      onChange={(value) =>
                        setTeacherData((prev) => ({
                          ...prev,
                          primaryEmail: value,
                        }))
                      }
                    />
                  </Field>

                  <Field label="Mobile Number *">
                    <Input
                      value={teacherData.mobile}
                      onChange={(value) =>
                        setTeacherData((prev) => ({
                          ...prev,
                          mobile: value,
                        }))
                      }
                    />
                  </Field>

                  <Field label="Current Job Title">
                    <Input
                      value={teacherData.currentJob}
                      placeholder="e.g. Mathematics Teacher"
                      onChange={(value) =>
                        setTeacherData((prev) => ({
                          ...prev,
                          currentJob: value,
                        }))
                      }
                    />
                  </Field>

                  <Field label="Full Address">
                    <Input
                      value={teacherData.address}
                      onChange={(value) =>
                        setTeacherData((prev) => ({
                          ...prev,
                          address: value,
                        }))
                      }
                    />
                  </Field>
                </div>
                <Field label="Profile Professional Summary *">
                  <textarea
                    value={teacherData.briefWriteUp}
                    onChange={(e) =>
                      setTeacherData((prev) => ({
                        ...prev,
                        briefWriteUp: e.target.value,
                      }))
                    }
                    className={`${inputClass} ${styles.inputTextareaMinH24}`}
                    placeholder="Describe your teaching philosophy and core pedagogical experience..."
                  />
                </Field>
              </div>

              {/* Section 2: Academic Qualifications */}
              <div className={styles.createModeCard}>
                <div className={styles.createModeCardHeaderRow}>
                  <h4 className={styles.createModeCardTitleNoBorder}>
                    2. Academic Qualifications
                  </h4>
                  {!showQualificationForm && (
                    <Button
                      variant="filled"
                      onClick={addQualification}
                      className={styles.addInlineBtn}
                    >
                      Add Qualification
                    </Button>
                  )}
                </div>

                {showQualificationForm && (
                  <div
                    ref={qualificationFormRef}
                    className={styles.nestedFormCard}
                  >
                    <div className={styles.nestedFormGrid}>
                      <Field label="Class">
                        <Select
                          value={qualificationDraft.classLevel}
                          onChange={(classLevel) => {
                            setQualificationDraft((prev) => ({
                              ...prev,
                              classLevel,
                              degree:
                                classLevel === "Class 10"
                                  ? "Secondary (10th)"
                                  : classLevel === "Class 12"
                                    ? "Senior Secondary (12th)"
                                    : prev.degree,
                            }));
                          }}
                          placeholder="Select Class"
                          options={qualificationOptions.class_levels}
                        />
                      </Field>
                      {qualificationDraft.classLevel && (
                        <Field label="School Name">
                          <input
                            value={qualificationDraft.school}
                            onChange={(e) =>
                              updateQualification("school", e.target.value)
                            }
                            className={inputClass}
                            placeholder="Enter school name"
                          />
                        </Field>
                      )}
                      {qualificationDraft.classLevel && (
                        <Field label="Percentage %">
                          <Input
                            value={qualificationDraft.percentage}
                            onChange={(value) =>
                              updateQualification("percentage", value)
                            }
                            placeholder="e.g. 76.2"
                          />
                        </Field>
                      )}
                      <Field label="Degree">
                        <Select
                          value={qualificationDraft.degree}
                          onChange={(v) => updateQualification("degree", v)}
                          placeholder="Select Degree"
                          options={qualificationOptions.degrees}
                        />
                      </Field>
                      <Field label="Course Name">
                        <Select
                          value={qualificationDraft.course}
                          onChange={(v) => updateQualification("course", v)}
                          placeholder="Select Course"
                          options={qualificationOptions.courses}
                        />
                      </Field>
                      <Field label="Year Passed">
                        <Input
                          value={qualificationDraft.year}
                          onChange={(value) =>
                            updateQualification("year", value)
                          }
                          placeholder="e.g. 2023"
                        />
                      </Field>
                      <Field label="Medium of Instruction">
                        <Select
                          value={qualificationDraft.medium}
                          onChange={(v) => updateQualification("medium", v)}
                          placeholder="Select Medium"
                          options={qualificationOptions.mediums}
                        />
                      </Field>
                      <Field label="Mode of Study">
                        <Select
                          value={qualificationDraft.mode}
                          onChange={(v) => updateQualification("mode", v)}
                          placeholder="Select Mode"
                          options={qualificationOptions.modes}
                        />
                      </Field>
                      {!qualificationDraft.classLevel && (
                        <Field label="Percentage %">
                          <Input
                            value={qualificationDraft.percentage}
                            onChange={(value) =>
                              updateQualification("percentage", value)
                            }
                            placeholder="e.g. 76.2"
                          />
                        </Field>
                      )}
                      <Field label="University Name">
                        <Select
                          value={qualificationDraft.university}
                          onChange={(v) => updateQualification("university", v)}
                          placeholder="Select University"
                          options={qualificationOptions.universities}
                        />
                      </Field>
                      <div className={styles.lgColSpan2}>
                        <Field label="College Name">
                          <Select
                            value={qualificationDraft.college}
                            onChange={(v) => updateQualification("college", v)}
                            placeholder="Select College / Institution"
                            options={qualificationOptions.colleges}
                          />
                        </Field>
                      </div>
                    </div>
                    <div className={styles.nestedFormActionsRow}>
                      <Button
                        variant="filled"
                        onClick={saveQualificationDraft}
                        className={styles.smallSaveBtn}
                      >
                        Save
                      </Button>

                      <Button
                        variant="outlined"
                        onClick={() => setShowQualificationForm(false)}
                        className={styles.smallCancelBtn}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}

                {savedQualifications.length === 0 ? (
                  <p className={styles.emptyListTextItalic}>
                    No qualifications added yet. Use the button above to add
                    qualifications.
                  </p>
                ) : (
                  <div className={styles.compactSavedStack}>
                    {savedQualifications.map((q, idx) => (
                      <div
                        key={idx}
                        className={styles.compactSavedRow}
                      >
                        <div className={styles.compactSavedMinW0}>
                          <p className={styles.compactSavedTitle}>
                            {q.degree || q.classLevel}{" "}
                            {q.course ? `(${q.course})` : ""}
                          </p>
                          <p className={styles.compactSavedSubtext}>
                            {q.college || q.school} · Passed in {q.year} ·
                            Marks: {q.percentage ? `${q.percentage}%` : "—"}
                          </p>
                        </div>
                        <div className={styles.compactSavedActions}>
                          <Button
                            variant="filled"
                            onClick={() => editQualification(idx)}
                            className={styles.editLinkBtn}
                          >
                            Edit
                          </Button>

                          <Button
                            variant="filled"
                            onClick={() => removeQualification(idx)}
                            className={styles.deleteLinkBtn}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Section 3: Employment History */}
              <div className={styles.createModeCard}>
                <div className={styles.createModeCardHeaderRow}>
                  <h4 className={styles.createModeCardTitleNoBorder}>
                    3. Employment History
                  </h4>
                  {!showExperienceForm && (
                    <Button
                      variant="filled"
                      onClick={addExperience}
                      className={styles.addInlineBtn}
                    >
                      Add Experience
                    </Button>
                  )}
                </div>

                {showExperienceForm && (
                  <div
                    ref={experienceFormRef}
                    className={styles.nestedFormCard}
                  >
                    <div className={styles.nestedFormGrid}>
                      <Field label="School Name">
                        <Input
                          value={experienceDraft.school}
                          placeholder="Enter school/employer name"
                          onChange={(value) =>
                            updateExperience("school", value)
                          }
                        />
                      </Field>

                      <Field label="Salary / Take Home (Monthly)">
                        <Input
                          value={experienceDraft.monthlyTakeHome}
                          placeholder="e.g. 35,000"
                          onChange={(value) =>
                            updateExperience("monthlyTakeHome", value)
                          }
                        />
                      </Field>
                      <div className={styles.checkboxInlineTopPad}>
                        <input
                          type="checkbox"
                          checked={experienceDraft.currentEmployer}
                          onChange={(e) =>
                            updateExperience(
                              "currentEmployer",
                              e.target.checked,
                            )
                          }
                          className={styles.sameAsMobileCheckbox}
                        />
                        <span className={styles.checkboxInlineLabelText}>
                          Current Employer
                        </span>
                      </div>
                      <Field label="Board">
                        <Select
                          value={experienceDraft.board}
                          onChange={(v) => updateExperience("board", v)}
                          placeholder="Select Board"
                          options={experienceOptions.boards}
                        />
                      </Field>
                      <Field label="Start Date">
                        <input
                          type="date"
                          value={experienceDraft.startDate}
                          onChange={(e) =>
                            updateExperience("startDate", e.target.value)
                          }
                          className={inputClass}
                        />
                      </Field>
                      {!experienceDraft.currentEmployer && (
                        <Field label="End Date">
                          <input
                            type="date"
                            value={experienceDraft.endDate}
                            onChange={(e) =>
                              updateExperience("endDate", e.target.value)
                            }
                            className={inputClass}
                          />
                        </Field>
                      )}
                      <Field label="Main Subject Taught">
                        <Select
                          value={experienceDraft.mainSubject}
                          onChange={(v) => updateExperience("mainSubject", v)}
                          placeholder="Select Subject"
                          options={experienceOptions.subjects}
                        />
                      </Field>
                      <Field label="Other Subjects Taught">
                        <Input
                          value={experienceDraft.otherSubjects}
                          placeholder="e.g. Science, Hindi"
                          onChange={(value) =>
                            updateExperience("otherSubjects", value)
                          }
                        />
                      </Field>
                      <Field label="Designation / Post">
                        <Select
                          value={experienceDraft.post}
                          onChange={(v) => updateExperience("post", v)}
                          placeholder="Select Designation"
                          options={experienceOptions.posts}
                        />
                      </Field>
                      <Field label="Reason for Leaving">
                        <Select
                          value={experienceDraft.reason}
                          onChange={(v) => updateExperience("reason", v)}
                          placeholder="Select Reason"
                          options={experienceOptions.reasons}
                        />
                      </Field>
                      <div className={styles.lgColSpan2}>
                        <Field label="Key Achievements / Work Details">
                          <textarea
                            value={experienceDraft.details}
                            onChange={(e) =>
                              updateExperience("details", e.target.value)
                            }
                            className={`${inputClass} ${styles.inputTextareaMinH20}`}
                            placeholder="Describe responsibilities and achievements..."
                          />
                        </Field>
                      </div>
                    </div>
                    <div className={styles.nestedFormActionsRow}>
                      <Button
                        variant="filled"
                        onClick={saveExperienceDraft}
                        className={styles.smallSaveBtn}
                      >
                        Save
                      </Button>

                      <Button
                        variant="outlined"
                        onClick={() => setShowExperienceForm(false)}
                        className={styles.smallCancelBtn}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}

                {savedExperiences.length === 0 ? (
                  <p className={styles.emptyListTextItalic}>
                    No experience added yet. Use the button above to add
                    experiences.
                  </p>
                ) : (
                  <div className={styles.compactSavedStack}>
                    {savedExperiences.map((exp, idx) => (
                      <div
                        key={idx}
                        className={styles.compactSavedRow}
                      >
                        <div className={styles.compactSavedMinW0}>
                          <p className={styles.compactSavedTitle}>
                            {exp.post} at {exp.school}
                          </p>
                          <p className={styles.compactSavedSubtext}>
                            {exp.startDate} to{" "}
                            {exp.currentEmployer ? "Present" : exp.endDate} ·
                            Subject: {exp.mainSubject} · Board: {exp.board}
                          </p>
                        </div>
                        <div className={styles.compactSavedActions}>
                          <Button
                            variant="filled"
                            onClick={() => editExperience(idx)}
                            className={styles.editLinkBtn}
                          >
                            Edit
                          </Button>

                          <Button
                            variant="filled"
                            onClick={() => removeExperience(idx)}
                            className={styles.deleteLinkBtn}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Section 4: Achievements, Awards & Courses */}
              <div className={styles.createModeCardSpace5}>
                <h4 className={styles.createModeCardTitle}>
                  4. Achievements, Awards &amp; Courses
                </h4>

                <div>
                  <p className={styles.subBlockLabel}>
                    Awards &amp; Recognitions
                  </p>
                  <div className={styles.formGrid4ItemsEnd}>
                    <Field label="Type">
                      <Select
                        value={resumeData.awardType}
                        onChange={(v) =>
                          setResumeData((prev) => ({ ...prev, awardType: v }))
                        }
                        placeholder="Select category"
                        options={AWARD_TYPES}
                      />
                    </Field>
                    <Field label="Name of the Award">
                      <Input
                        value={resumeData.awardName}
                        placeholder="e.g. Best Educator Award"
                        onChange={(value) =>
                          setResumeData((prev) => ({
                            ...prev,
                            awardName: value,
                          }))
                        }
                      />
                    </Field>

                    <Field label="Presented By">
                      <Input
                        value={resumeData.awardBy}
                        placeholder="Organization / Institute"
                        onChange={(value) =>
                          setResumeData((prev) => ({
                            ...prev,
                            awardBy: value,
                          }))
                        }
                      />
                    </Field>

                    <Field label="Year">
                      <Input
                        value={resumeData.awardYear}
                        placeholder="Year"
                        onChange={(value) =>
                          setResumeData((prev) => ({
                            ...prev,
                            awardYear: value,
                          }))
                        }
                      />
                    </Field>
                  </div>
                  <Button
                    icon="plusIcon"
                    onClick={addAward}
                  >
                    Add Award to Resume
                  </Button>
                  {savedAwards.length > 0 && (
                    <div className={styles.miniSavedStack}>
                      {savedAwards.map((award, index) => (
                        <div
                          key={index}
                          className={styles.miniSavedRow}
                        >
                          <span className={styles.miniSavedText}>
                            <strong>{award.name}</strong> by {award.by} (
                            {award.year})
                          </span>
                          <Button
                            variant="filled"
                            onClick={() =>
                              setSavedAwards((prev) =>
                                prev.filter((_, i) => i !== index)
                              )
                            }
                            className={styles.removeLinkBtn}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className={styles.dividerTop}>
                  <p className={styles.subBlockLabel}>
                    Additional Courses &amp; Certifications
                  </p>
                  <div className={styles.formGrid4ItemsEnd}>
                    <Field label="Type">
                      <Select
                        value={resumeData.courseType}
                        onChange={(v) =>
                          setResumeData((prev) => ({ ...prev, courseType: v }))
                        }
                        placeholder="Select type"
                        options={COURSE_TYPES}
                      />
                    </Field>
                    <Field label="Name of the Course">
                      <Input
                        value={resumeData.courseName}
                        placeholder="e.g. Advanced Pedagogy"
                        onChange={(value) =>
                          setResumeData((prev) => ({
                            ...prev,
                            courseName: value,
                          }))
                        }
                      />
                    </Field>

                    <Field label="Conducted By">
                      <Input
                        value={resumeData.conductedBy}
                        placeholder="Organization / Institute"
                        onChange={(value) =>
                          setResumeData((prev) => ({
                            ...prev,
                            conductedBy: value,
                          }))
                        }
                      />
                    </Field>

                    <Field label="Year">
                      <Input
                        value={resumeData.courseYear}
                        placeholder="Year"
                        onChange={(value) =>
                          setResumeData((prev) => ({
                            ...prev,
                            courseYear: value,
                          }))
                        }
                      />
                    </Field>
                  </div>
                  <Button
                    variant="filled"
                    startIcon="plusIcon"
                    onClick={addCourse}
                  >
                    Add Course to Resume
                  </Button>
                  {savedCourses.length > 0 && (
                    <div className={styles.miniSavedStack}>
                      {savedCourses.map((course, index) => (
                        <div
                          key={index}
                          className={styles.miniSavedRow}
                        >
                          <span className={styles.miniSavedText}>
                            <strong>{course.name}</strong> conducted by{" "}
                            {course.by} ({course.year})
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setSavedCourses((prev) =>
                                prev.filter((_, i) => i !== index),
                              )
                            }
                            className={styles.removeLinkBtn}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Section 5: Skills & Languages Information */}
              <div className={styles.createModeCard}>
                <h4 className={styles.createModeCardTitle}>
                  5. Skills &amp; Languages
                </h4>
                <div className={styles.skillsLanguagesGrid}>
                  <div>
                    <label className={labelClass}>
                      Subject Skills (Linked to Profile)
                    </label>
                    <div className={styles.subjectTagsWrap}>
                      {teacherData.mainSubject && (
                        <span className={styles.subjectTagSolid}>
                          {teacherData.mainSubject} (Main)
                        </span>
                      )}
                      {selectedAdditionalSubjects.map((subject) => (
                        <span
                          key={subject}
                          className={styles.subjectTagLight}
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>
                      Languages Spoken (Linked to Profile)
                    </label>
                    <div className={styles.subjectTagsWrap}>
                      {dynamicLanguages.map(
                        (lang, idx) =>
                          lang.language && (
                            <span
                              key={idx}
                              className={styles.languageTag}
                            >
                              {lang.language} ({lang.status})
                            </span>
                          ),
                      )}
                    </div>
                  </div>
                </div>
                <p className={styles.noteTextTiny}>
                  * Note: Skills and Languages are kept in sync with the **My
                  Profile** tab entries.
                </p>
              </div>
            </div>
          )}

          {/* Cover Letter mode */}
          {resumeMode === "coverletter" && (
            <div className={styles.coverLetterStack}>
              <p className={styles.coverLetterIntroText}>
                Select the job you are applying for and the CV you want to use.
                Our AI will generate a crisp, humanized cover letter tailored to
                the role.
              </p>
              <div className={styles.coverLetterFieldsGrid}>
                <Field label="Select Job Applying For">
                  <Select
                    value={coverLetterState.selectedJob}
                    onChange={(v) =>
                      setCoverLetterState((p) => ({
                        ...p,
                        selectedJob: v,
                        generated: "",
                      }))
                    }
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
                    onChange={(v) =>
                      setCoverLetterState((p) => ({
                        ...p,
                        selectedResume: v,
                        generated: "",
                      }))
                    }
                    placeholder={
                      savedResumes.length === 0
                        ? "No resumes saved yet"
                        : "Select a resume..."
                    }
                    options={savedResumes.map((r) => r.title).filter(Boolean)}
                  />
                </Field>
              </div>
              <button
                type="button"
                disabled={
                  !coverLetterState.selectedJob ||
                  !coverLetterState.selectedResume ||
                  coverLetterState.loading
                }
                onClick={() => {
                  setCoverLetterState((p) => ({
                    ...p,
                    loading: true,
                    generated: "",
                  }));
                  setTimeout(() => {
                    const name =
                      `${teacherData.title} ${teacherData.firstName} ${teacherData.lastName}`.trim();
                    setCoverLetterState((p) => ({
                      ...p,
                      loading: false,
                      generated: `Dear Hiring Manager,\n\nI am writing to express my keen interest in the position of ${p.selectedJob}. With my background in ${teacherData.mainSubject || "teaching"} and ${savedExperiences.length > 0 ? `${savedExperiences.length} years of hands-on teaching experience` : "a strong passion for education"}, I am confident in my ability to contribute meaningfully to your institution.\n\nMy teaching philosophy centers on student-focused learning and I have consistently adapted curriculum to meet diverse learning needs. I am eager to bring this approach to your team.\n\nI would welcome the opportunity to discuss how my experience aligns with your requirements.\n\nWarm regards,\n${name}`,
                    }));
                  }, 1500);
                }}
                className={styles.coverLetterGenerateBtn}
              >
                <Wand2 size={17} />{" "}
                {coverLetterState.loading
                  ? "Generating..."
                  : "Generate Cover Letter"}
              </button>
              {coverLetterState.generated && (
                <div className={styles.coverLetterResultCard}>
                  <div className={styles.coverLetterResultHeader}>
                    <p className={styles.coverLetterResultTitle}>
                      AI Generated Cover Letter
                    </p>
                    <div className={styles.coverLetterActionsRow}>
                      <button
                        type="button"
                        onClick={() => {
                          const linkedResume = savedResumes.find(
                            (r) => r.title === coverLetterState.selectedResume,
                          );
                          const newCoverLetter = {
                            id: Date.now(),
                            title: `Cover Letter - ${coverLetterState.selectedJob}`,
                            source: "ai_generated",
                            content: coverLetterState.generated,
                            resume_id: linkedResume?.id ?? null,
                            resumeTitle: coverLetterState.selectedResume,
                            jobTitle: coverLetterState.selectedJob,
                            createdAt: new Date().toISOString(),
                          };
                          const updated = [...savedCoverLetters, newCoverLetter];
                          setSavedCoverLetters(updated);
                          localStorage.setItem(
                            "skooljobs_cover_letters",
                            JSON.stringify(updated),
                          );
                          alert("Cover letter saved!");
                        }}
                        className={styles.smallSaveBtnSolid}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            coverLetterState.generated,
                          );
                          alert("Copied to clipboard!");
                        }}
                        className={styles.smallCopyBtn}
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                  <pre className={styles.coverLetterPre}>
                    {coverLetterState.generated}
                  </pre>
                </div>
              )}

              {savedCoverLetters.length > 0 && (
                <div className={styles.savedLettersStack}>
                  <p className={styles.savedLettersHeading}>
                    Saved Cover Letters ({savedCoverLetters.length})
                  </p>
                  {savedCoverLetters.map((cl) => (
                    <div
                      key={cl.id}
                      className={styles.savedLetterCard}
                    >
                      <div className={styles.savedLetterRow}>
                        <div className={styles.savedLetterMinW0}>
                          <p className={styles.savedLetterTitle}>
                            {cl.title}
                          </p>
                          {cl.resumeTitle && (
                            <p className={styles.savedLetterMeta}>
                              CV: {cl.resumeTitle}
                            </p>
                          )}
                        </div>
                        <div className={styles.savedLetterActions}>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(cl.content);
                              alert("Copied to clipboard!");
                            }}
                            className={styles.copyOutlineBtn}
                          >
                            Copy
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = savedCoverLetters.filter(
                                (c) => c.id !== cl.id,
                              );
                              setSavedCoverLetters(updated);
                              localStorage.setItem(
                                "skooljobs_cover_letters",
                                JSON.stringify(updated),
                              );
                            }}
                            className={styles.deleteOutlineBtn}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Notes: only visible for upload/create modes */}
          {resumeMode !== "coverletter" && (
            <div className={styles.fullAddressWrap}>
              <Field label="Resume Notes">
                <textarea
                  value={resumeDraft.notes}
                  onChange={(e) =>
                    setResumeDraft((prev) => ({
                      ...prev,
                      notes: e.target.value,
                    }))
                  }
                  className={`${inputClass} ${styles.inputTextareaMinH24}`}
                  placeholder="Short note about when to use this resume."
                />
              </Field>
            </div>
          )}

          {resumeMode !== "coverletter" && (
            <button
              type="button"
              onClick={addResume}
              className={styles.coverLetterGenerateBtn}
            >
              <Plus size={17} />{" "}
              {resumeMode === "upload" ? "Add Resume" : "Save Resume"}
            </button>
          )}
        </div>

        <div className={styles.savedListCard}>
          <h3 className={styles.savedListTitle}>All Resumes</h3>
          {savedResumes.length === 0 ? (
            <p className={styles.emptyListText}>
              Added or created resumes will appear here.
            </p>
          ) : (
            <div className={styles.tableScrollWrap}>
              <table className={styles.tableMinWideMd}>
                <thead className={styles.tableHead}>
                  <tr>
                    {[
                      "Title",
                      "Full Name",
                      "Email",
                      "Mobile",
                      "Job Title",
                      "Format",
                      "Notes",
                      "Actions",
                    ].map((heading) => (
                      <th key={heading} className={styles.tableHeadCell}>
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className={styles.tableBody}>
                  {savedResumes.map((resume, index) => (
                    <tr
                      key={`${resume.fileName}-${index}`}
                      className={styles.tableRowTop}
                    >
                      <td className={styles.tableCellBold}>
                        {resume.title}
                      </td>
                      <td className={styles.tableCell}>{resume.fullName || "—"}</td>
                      <td className={styles.tableCell}>{resume.email || "—"}</td>
                      <td className={styles.tableCell}>{resume.mobile || "—"}</td>
                      <td className={styles.tableCell}>
                        {resume.currentJobTitle || "—"}
                      </td>
                      <td className={styles.tableCell}>{resume.format}</td>
                      <td className={styles.tableCellTruncate}>
                        {resume.notes || "—"}
                      </td>
                      <td className={styles.tableCell}>
                        <div className={styles.tableActionsRow}>
                          {resume.source === "Created" && (
                            <button
                              type="button"
                              onClick={() => downloadResume(resume)}
                              className={styles.downloadBtn}
                            >
                              Download
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleDeleteResume(index)}
                            className={styles.deleteBtn}
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
      const end = exp.currentEmployer
        ? new Date()
        : exp.endDate
          ? new Date(exp.endDate)
          : new Date();
      const start = new Date(exp.startDate);
      return sum + Math.max(0, (end - start) / (1000 * 60 * 60 * 24 * 365));
    }, 0);
    const expDisplay =
      totalExpYears > 0 ? `${totalExpYears.toFixed(1)} years` : "Not added";
    const highestDeg =
      savedQualifications[0]?.degree ||
      teacherData.highestQualificationOne ||
      "Not added";
    const university = savedQualifications[0]?.university || "Not added";

    return (
      <>
        <SectionHeader
          title="View Profile"
          description="This is how your profile appears to recruiters before you give consent to share full details."
        />

        <div className={styles.viewProfileCard}>
          <div className={styles.viewProfileBanner} />
          <div className={styles.viewProfileBody}>
            <div className={styles.viewProfileHeaderRow}>
              <div className={styles.viewProfileAvatar}>
                <User size={48} />
              </div>
              <div className={styles.viewProfileNameBlock}>
                <h2 className={styles.viewProfileName}>
                  {teacherData.title} {teacherData.firstName?.charAt(0)}.{" "}
                  {teacherData.lastName?.charAt(0)}.
                </h2>
                <p className={styles.viewProfileJobTitle}>
                  {teacherData.currentJob || "Teaching Professional"}
                </p>
                <p className={styles.viewProfileLocation}>
                  {teacherData.city
                    ? `${teacherData.city}`
                    : "Location not added"}
                </p>
              </div>
            </div>

            <div className={styles.viewProfileStatsGrid}>
              <div className={styles.viewProfileStatCard}>
                <p className={styles.viewProfileStatLabel}>
                  Age
                </p>
                <p className={styles.viewProfileStatValue}>
                  {teacherData.age || "Not added"}
                </p>
              </div>
              <div className={styles.viewProfileStatCard}>
                <p className={styles.viewProfileStatLabel}>
                  Main Subject
                </p>
                <p className={styles.viewProfileStatValue}>
                  {teacherData.mainSubject || "Not added"}
                </p>
              </div>
              <div className={styles.viewProfileStatCard}>
                <p className={styles.viewProfileStatLabel}>
                  Total Experience
                </p>
                <p className={styles.viewProfileStatValue}>
                  {expDisplay}
                </p>
              </div>
              <div className={styles.viewProfileStatCard}>
                <p className={styles.viewProfileStatLabel}>
                  Highest Qualification
                </p>
                <p className={styles.viewProfileStatValue}>
                  {highestDeg}
                </p>
              </div>
              <div className={styles.viewProfileStatCard}>
                <p className={styles.viewProfileStatLabel}>
                  University
                </p>
                <p className={styles.viewProfileStatValue}>
                  {university}
                </p>
              </div>
              <div className={styles.viewProfileStatCard}>
                <p className={styles.viewProfileStatLabel}>
                  Area / City
                </p>
                <p className={styles.viewProfileStatValue}>
                  {teacherData.city || "Not added"}
                </p>
              </div>
            </div>

            {teacherData.briefWriteUp && (
              <div className={styles.summaryBlockWrap}>
                <h4 className={styles.summaryBlockTitle}>
                  Professional Summary
                </h4>
                <p className={styles.summaryBlockText}>
                  {teacherData.briefWriteUp}
                </p>
              </div>
            )}

            {savedAwards.length > 0 && (
              <div className={styles.publicAwardsWrap}>
                <h4 className={styles.summaryBlockTitle}>
                  Public Awards
                </h4>
                <div className={styles.publicAwardsRow}>
                  {savedAwards.map((award, i) => (
                    <div
                      key={i}
                      className={styles.publicAwardCard}
                    >
                      <p className={styles.publicAwardName}>
                        {award.name || "Unnamed Award"}
                      </p>
                      <p className={styles.publicAwardMeta}>
                        {award.by} · {award.year}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.privacyNotice}>
          <p className={styles.privacyNoticeTitle}>Privacy Notice</p>
          <p className={styles.privacyNoticeText}>
            The above profile is what recruiters will see in the first instance
            — your photo, full name, mobile number, and email are kept private.
            Once you apply for a job and give your consent, your complete CV and
            detailed profile will be shared with the recruiter.
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
    <div className={styles.pageWrap}>
      <form onSubmit={handleSubmit} className={styles.formLayoutRow}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarProfileCard}>
            <div className={styles.sidebarProfileInner}>
              <div className={styles.sidebarAvatarWrap}>
                <img
                  src={profileImage}
                  alt="profile"
                  className={styles.sidebarAvatarImg}
                />
                <span className={styles.sidebarAvatarBadge}>
                  <CheckCircle2 size={18} />
                </span>
              </div>
              <label className={styles.sidebarUploadLabel}>
                Upload Photo
                <input type="file" hidden onChange={handleProfileImage} />
              </label>
              <h1 className={styles.sidebarName}>
                {teacherData.title} {teacherData.firstName}{" "}
                {teacherData.lastName}
              </h1>
              <p className={styles.sidebarJobTitle}>
                {teacherData.currentJob}
              </p>
            </div>
          </div>

          <div className={styles.sidebarScoreCard}>
            <div className={styles.sidebarScoreHeaderRow}>
              <span>Profile Score</span>
              <span>{completion}%</span>
            </div>
            <div className={styles.sidebarScoreTrack}>
              <div
                className={styles.sidebarScoreFill}
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>

          <nav className={styles.sidebarNav}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  className={`${styles.sidebarNavBtn} ${isActive ? styles.sidebarNavBtnActive : ""}`}
                >
                  <Icon size={18} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className={styles.sidebarFooter}>
            <Button
              type="button"
              variant="filled"
              startIcon="arrowBackIcon"
              onClick={() => navigate("/teacher/dashboard")}
            >
              Back to Dashboard
            </Button>
          </div>
        </aside>

        <main className={styles.mainContent}>
          <div className={styles.mainHeaderCard}>
            <div>
              <p className={styles.mainHeaderEyebrow}>
                Profile Workspace
              </p>
              <h1 className={styles.mainHeaderTitle}>
                Teacher Profile
              </h1>
              <p className={styles.mainHeaderSubtext}>
                Complete your profile sections so schools can evaluate you
                faster.
              </p>
            </div>
            <BackButton />
          </div>

          <div className={styles.mobileNavWrap}>
            <div className={styles.mobileNavBar}>
              <span className={styles.mobileNavLabel}>
                {navItems.find((item) => item.id === activeSection)?.label || "Menu"}
              </span>
              <button
                type="button"
                onClick={() => setMobileNavOpen((o) => !o)}
                aria-label="Toggle navigation menu"
                aria-expanded={mobileNavOpen}
                className={styles.mobileNavToggleBtn}
              >
                {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

            {mobileNavOpen && (
              <div className={styles.mobileNavDropdown}>
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveSection(item.id);
                        setMobileNavOpen(false);
                      }}
                      className={`${styles.mobileNavItemBtn} ${isActive ? styles.mobileNavItemBtnActive : ""}`}
                    >
                      <Icon size={17} />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className={styles.contentCard}>
            {renderActiveSection()}
            {!["qualification", "experience", "viewProfile"].includes(
              activeSection,
            ) && (
                <div className={styles.formFooterActions}>
                  <Button
                    type="button"
                    variant="text"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="filled"
                    startIcon="saveIcon"
                  >
                    Save Changes
                  </Button>
                </div>
              )}
          </div>
        </main>
      </form>
    </div>
  );
};

export default TeacherProfile;
