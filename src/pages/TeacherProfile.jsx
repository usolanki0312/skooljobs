import { useMemo, useState } from "react";
import {
  Award,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  GraduationCap,
  MapPin,
  Phone,
  Plus,
  Save,
  Sparkles,
  Trash2,
  Trophy,
  User,
} from "lucide-react";
import BackButton from "../components/backbutton";

const navItems = [
  { id: "basic", label: "Basic Info", icon: User },
  { id: "contact", label: "Contact Details", icon: Phone },
  { id: "qualification", label: "Qualification", icon: GraduationCap },
  { id: "experience", label: "Experience", icon: BriefcaseBusiness },
  { id: "resume", label: "Resume", icon: Award },
];

const inputClass =
  "w-full rounded-xl border border-borderColor bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:bg-slate-100 disabled:text-slate-500";

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

  const [qualifications, setQualifications] = useState([
    {
      degree: "",
      course: "",
      year: "",
      medium: "",
      mode: "",
      percentage: "",
      university: "",
      college: "",
    },
  ]);

  const [experiences, setExperiences] = useState([
    {
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
    },
  ]);

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

  const updateQualification = (index, field, value) => {
    setQualifications((prev) =>
      prev.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item
      )
    );
  };

  const updateExperience = (index, field, value) => {
    setExperiences((prev) =>
      prev.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item
      )
    );
  };

  const addQualification = () => {
    setQualifications((prev) => [
      ...prev,
      {
        degree: "",
        course: "",
        year: "",
        medium: "",
        mode: "",
        percentage: "",
        university: "",
        college: "",
      },
    ]);
  };

  const addExperience = () => {
    setExperiences((prev) => [
      ...prev,
      {
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
      },
    ]);
  };

  const removeQualification = (index) => {
    setQualifications((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
  };

  const removeExperience = (index) => {
    setExperiences((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile saved successfully");
  };

  const completionItems = [
    teacherData.firstName,
    teacherData.primaryEmail,
    teacherData.mobile,
    teacherData.mainSubject,
    qualifications[0]?.degree,
    experiences[0]?.school,
  ];
  const completion = Math.round(
    (completionItems.filter(Boolean).length / completionItems.length) * 100
  );

  const renderBasicInfo = () => (
    <>
      <SectionHeader
        title="Basic Information"
        description="Keep your identity, teaching preferences, and profile details accurate for schools."
      />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Field label="Title">
          <select name="title" value={teacherData.title} onChange={handleChange} className={inputClass}>
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
        <div>
          <label className={labelClass}>DOB</label>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <input name="dobDay" value={teacherData.dobDay} onChange={handleDobChange} className={inputClass} placeholder="DD" />
            <input name="dobMonth" value={teacherData.dobMonth} onChange={handleDobChange} className={inputClass} placeholder="MM" />
            <input name="dobYear" value={teacherData.dobYear} onChange={handleDobChange} className={inputClass} placeholder="YYYY" />
          </div>
        </div>
        <Field label="Age (Years Only)">
          <input name="age" value={teacherData.age} readOnly className={inputClass} placeholder="Auto calculated" />
          <p className="mt-2 text-xs text-slate-500">If DOB not entered, user can enter age.</p>
        </Field>
        <Field label="Nationality">
          <input name="nationality" value={teacherData.nationality} onChange={handleChange} className={inputClass} />
        </Field>
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
        <div className="lg:col-span-2">
          <Field label="Additional Subject(s)">
            <textarea
              name="additionalSubjects"
              value={teacherData.additionalSubjects}
              onChange={handleChange}
              className={`${inputClass} min-h-28 resize-none`}
              placeholder="History&#10;Geography&#10;Art&#10;Music"
            />
            <p className="mt-2 text-xs text-slate-500">Option to select more than one option.</p>
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
        description="Please provide details of your educational background starting from your highest degree."
      />
      <div className="space-y-5">
        {qualifications.map((item, index) => (
          <div key={index} className="rounded-2xl border border-borderColor bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between border-b border-borderColor pb-3">
              <span className="text-xs font-bold uppercase tracking-[2px] text-slate-400">Entry #{index + 1}</span>
              {qualifications.length > 1 && (
                <button type="button" onClick={() => removeQualification(index)} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500">
                  <Trash2 size={17} />
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              <Field label="Degree">
                <select value={item.degree} onChange={(e) => updateQualification(index, "degree", e.target.value)} className={inputClass}>
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
                <select value={item.course} onChange={(e) => updateQualification(index, "course", e.target.value)} className={inputClass}>
                  <option value="">Select Course</option>
                  <option>Mathematics</option>
                  <option>Science</option>
                  <option>English</option>
                  <option>Computer Science</option>
                </select>
              </Field>
              <Field label="Year Passed">
                <input value={item.year} onChange={(e) => updateQualification(index, "year", e.target.value)} className={inputClass} placeholder="e.g. 2023" />
              </Field>
              <Field label="Medium of Instruction">
                <select value={item.medium} onChange={(e) => updateQualification(index, "medium", e.target.value)} className={inputClass}>
                  <option value="">Select Medium</option>
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Regional Language</option>
                </select>
              </Field>
              <Field label="Mode of Study">
                <select value={item.mode} onChange={(e) => updateQualification(index, "mode", e.target.value)} className={inputClass}>
                  <option value="">Select Mode</option>
                  <option>Regular</option>
                  <option>Distance</option>
                  <option>Online</option>
                </select>
              </Field>
              <Field label="Percentage %">
                <input value={item.percentage} onChange={(e) => updateQualification(index, "percentage", e.target.value)} className={inputClass} placeholder="e.g. 76.2" />
              </Field>
              <Field label="University Name">
                <input value={item.university} onChange={(e) => updateQualification(index, "university", e.target.value)} className={inputClass} placeholder="Enter University" />
              </Field>
              <div className="lg:col-span-2">
                <Field label="College Name">
                  <input value={item.college} onChange={(e) => updateQualification(index, "college", e.target.value)} className={inputClass} placeholder="Enter College / Institution" />
                </Field>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-7 flex justify-center">
        <button type="button" onClick={addQualification} className="inline-flex items-center gap-2 rounded-2xl border border-dashed border-primary/40 bg-white px-7 py-4 text-sm font-bold text-primary hover:bg-primary/5">
          <Plus size={18} /> Add Another Qualification
        </button>
      </div>
    </>
  );

  const renderExperience = () => (
    <>
      <SectionHeader
        title="Teaching Experience"
        description="Detail your teaching history. Administrative and current roles can also be listed here."
      />
      <div className="space-y-6">
        {experiences.map((item, index) => (
          <div key={index} className="rounded-2xl border border-borderColor border-l-4 border-l-primary bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-bold text-primary">Experience #{index + 1}</h3>
              {experiences.length > 1 && (
                <button type="button" onClick={() => removeExperience(index)} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500">
                  <Trash2 size={17} />
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Field label="Name of the School">
                  <input value={item.school} onChange={(e) => updateExperience(index, "school", e.target.value)} className={inputClass} placeholder="e.g. Lincoln High School" />
                </Field>
              </div>
              <label className="mt-8 flex items-center gap-2 text-sm font-bold text-slate-600">
                <input type="checkbox" checked={item.currentEmployer} onChange={(e) => updateExperience(index, "currentEmployer", e.target.checked)} className="h-4 w-4 accent-primary" />
                Current Employer
              </label>
              <Field label="Board">
                <select value={item.board} onChange={(e) => updateExperience(index, "board", e.target.value)} className={inputClass}>
                  <option value="">Select Board</option>
                  <option>CBSE</option>
                  <option>ICSE</option>
                  <option>State Board</option>
                  <option>IB</option>
                </select>
              </Field>
              <Field label="Start Date">
                <input type="date" value={item.startDate} onChange={(e) => updateExperience(index, "startDate", e.target.value)} className={inputClass} />
              </Field>
              <Field label="End Date">
                <input type="date" value={item.endDate} disabled={item.currentEmployer} onChange={(e) => updateExperience(index, "endDate", e.target.value)} className={inputClass} />
              </Field>
              <Field label="Subject Taught (Main)">
                <select value={item.mainSubject} onChange={(e) => updateExperience(index, "mainSubject", e.target.value)} className={inputClass}>
                  <option value="">Select Main Subject</option>
                  <option>Mathematics</option>
                  <option>Science</option>
                  <option>English</option>
                  <option>History</option>
                </select>
              </Field>
              <Field label="Other Subjects">
                <textarea value={item.otherSubjects} onChange={(e) => updateExperience(index, "otherSubjects", e.target.value)} className={`${inputClass} min-h-24 resize-none`} placeholder="Mathematics&#10;Science&#10;English" />
              </Field>
              <Field label="Post Held / Job Title">
                <select value={item.post} onChange={(e) => updateExperience(index, "post", e.target.value)} className={inputClass}>
                  <option value="">Select Post</option>
                  <option>Teacher</option>
                  <option>Senior Teacher</option>
                  <option>HOD</option>
                  <option>Coordinator</option>
                </select>
              </Field>
              <Field label="Salary Drawn (CTC)">
                <input value={item.salary} onChange={(e) => updateExperience(index, "salary", e.target.value)} className={inputClass} placeholder="e.g. 600000" />
              </Field>
              <Field label="Reason for Leaving">
                <input value={item.reason} onChange={(e) => updateExperience(index, "reason", e.target.value)} className={inputClass} placeholder="e.g. Career growth" />
              </Field>
              <div className="lg:col-span-3">
                <Field label="Any other details to be mentioned">
                  <textarea value={item.details} onChange={(e) => updateExperience(index, "details", e.target.value)} className={`${inputClass} min-h-28 resize-none`} placeholder="Describe key achievements, responsibilities, or specific methodologies used." />
                </Field>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-7 flex justify-end">
        <button type="button" onClick={addExperience} className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-soft hover:bg-primary/95">
          <Plus size={17} /> Add Next
        </button>
      </div>
    </>
  );

  const renderResume = () => (
    <>
      <SectionHeader
        title="Resume Details"
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

  const renderActiveSection = () => {
    if (activeSection === "contact") return renderContact();
    if (activeSection === "qualification") return renderQualification();
    if (activeSection === "experience") return renderExperience();
    if (activeSection === "resume") return renderResume();
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
