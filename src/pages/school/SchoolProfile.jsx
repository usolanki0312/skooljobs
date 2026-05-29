import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  profileSections, sectors, schoolMediums as mediums, levels, boards,
  industries, countries, indianStates, days, months, years,
} from "../../lib/schooldata";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  CreditCard,
  Globe,
  Heart,
  ImageIcon,
  KeyRound,
  LayoutDashboard,
  LogOut,
  Package,
  PlusCircle,
  Save,
  Trash2,
  Upload,
  Users,
} from "lucide-react";

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, route: "/school-dashboard" },
  { id: "companyProfile", label: "Institute Profile", icon: Building2 },
  { id: "postJob", label: "Post a New Job", icon: PlusCircle, route: "/school-dashboard" },
  { id: "manageJobs", label: "Manage Jobs", icon: BriefcaseBusiness, route: "/school-dashboard" },
  { id: "allApplicants", label: "All Applicants", icon: Users, route: "/school-dashboard" },
  { id: "savedCandidates", label: "Saved Candidates", icon: Heart, route: "/school-dashboard" },
  { id: "packages", label: "Packages", icon: Package, route: "/school-dashboard" },
  { id: "transactions", label: "Transactions", icon: CreditCard, route: "/school-dashboard" },
  { id: "changePassword", label: "Change Password", icon: KeyRound, route: "/school-dashboard" },
];


const inputClass =
  "w-full rounded-xl border border-borderColor bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10";

const labelClass = "mb-2 block text-xs font-bold uppercase tracking-wide text-slate-600";

const Field = ({ label, required, children }) => (
  <div>
    <label className={labelClass}>
      {label}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
    {children}
  </div>
);


const SchoolProfile = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("basic");
  const [logoImage, setLogoImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const currentUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("currentUser") || "{}");
    } catch {
      return {};
    }
  }, []);

  const schoolName =
    currentUser.companyName || currentUser.schoolName || currentUser.firstName || "Som Lalit School";

  const [formData, setFormData] = useState({
    firstName: currentUser.firstName || "Som Lalit School",
    lastName: currentUser.lastName || "Jankara Nagar, Ahmedabad",
    companyName: currentUser.companyName || "Som Lalit School",
    email: currentUser.email || "ms@somlalit.com",
    profileUrl: "https://skooljobs.com/employer/som-lalit-school",
    publicView: "Yes",
    phone: currentUser.phone || "",
    website: "",
    sector: "Schools & Institutions",
    foundedDay: "12",
    foundedMonth: "12",
    foundedYear: "2023",
    aboutCompany: "",
    foundedSince: 2000,
    industry: "Schools & Institutions",
    medium: "English",
    level: "",
    board: "",
    otherWebsite: "",
    alternateEmail: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    country: "India",
    state: "Gujarat",
    city: "Ahmedabad",
    postalCode: "",
    fullAddress: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) setLogoImage(URL.createObjectURL(file));
  };

  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (file) setCoverImage(URL.createObjectURL(file));
  };

  const handleNavClick = (item) => {
    if (item.route) {
      navigate(item.route);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile saved successfully!");
  };

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-primary">Basic Information</h2>

      {/* Cover photo upload */}
      <div>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-borderColor bg-light px-5 py-2.5 text-sm font-bold text-primary hover:bg-primary/5">
          <ImageIcon size={16} />
          Upload Job Cover Photo
          <input type="file" hidden accept="image/*" onChange={handleCoverUpload} />
        </label>
        {coverImage && (
          <div className="mt-3 h-32 w-full overflow-hidden rounded-2xl border border-borderColor">
            <img src={coverImage} alt="cover" className="h-full w-full object-cover" />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Field label="First Name" required>
          <input name="firstName" value={formData.firstName} onChange={handleChange} className={inputClass} />
        </Field>
        <Field label="Last Name" required>
          <input name="lastName" value={formData.lastName} onChange={handleChange} className={inputClass} />
        </Field>
        <Field label="Institute Name" required>
          <input name="companyName" value={formData.companyName} onChange={handleChange} className={inputClass} />
        </Field>
        <Field label="Email" required>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} />
        </Field>
      </div>

      {/* Profile URL */}
      <div>
        <label className={labelClass}>Profile URL</label>
        <div className="flex items-center gap-3 rounded-xl border border-borderColor bg-light px-4 py-3">
          <Globe size={15} className="shrink-0 text-primary" />
          <span className="flex-1 truncate text-sm text-slate-600">{formData.profileUrl}</span>
          <button type="button" className="text-xs font-bold text-primary underline underline-offset-2">
            Edit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Field label="Profile for Public View">
          <select name="publicView" value={formData.publicView} onChange={handleChange} className={inputClass}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </Field>
        <Field label="Phone">
          <input name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="Phone number" />
        </Field>
        <Field label="Website">
          <input name="website" value={formData.website} onChange={handleChange} className={inputClass} placeholder="https://yourwebsite.com" />
        </Field>
        <Field label="Sector" required>
          <select name="sector" value={formData.sector} onChange={handleChange} className={inputClass}>
            <option value="">Select Sector</option>
            {sectors.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </Field>
      </div>

      {/* Founded Date */}
      <div>
        <label className={labelClass}>Founded Date</label>
        <div className="flex items-center gap-2">
          <select name="foundedDay" value={formData.foundedDay} onChange={handleChange} className={`${inputClass} w-24`}>
            {days.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <span className="text-slate-400">/</span>
          <select name="foundedMonth" value={formData.foundedMonth} onChange={handleChange} className={`${inputClass} w-24`}>
            {months.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
          <span className="text-slate-400">/</span>
          <select name="foundedYear" value={formData.foundedYear} onChange={handleChange} className={`${inputClass} w-32`}>
            {years.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
      </div>

      {/* About the Company */}
      <div>
        <label className={labelClass}>About the Company</label>
        <div className="overflow-hidden rounded-xl border border-borderColor">
          <div className="flex flex-wrap items-center gap-1 border-b border-borderColor bg-light px-3 py-2">
            {["B", "I", "U", "S", "≡", "≡", "≡", "⊞", "🔗", "↩", "↪"].map((btn, i) => (
              <button
                key={i}
                type="button"
                className="min-w-[28px] rounded px-2 py-1 text-xs font-bold text-slate-600 hover:bg-white hover:shadow-sm"
              >
                {btn}
              </button>
            ))}
            <div className="ml-auto flex gap-1">
              <button type="button" className="rounded border border-primary/30 px-3 py-1 text-xs font-bold text-primary bg-white">
                Visual
              </button>
              <button type="button" className="rounded px-3 py-1 text-xs font-bold text-slate-500 hover:bg-white">
                Text
              </button>
            </div>
          </div>
          <textarea
            name="aboutCompany"
            value={formData.aboutCompany}
            onChange={handleChange}
            className="min-h-32 w-full resize-none bg-white px-4 py-3 text-sm text-slate-800 outline-none"
            placeholder="Write about your school..."
          />
        </div>
      </div>
    </div>
  );

  const renderOtherInfo = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-primary">Other Information</h2>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Founded Since slider */}
        <div>
          <label className={labelClass}>
            Founded Since <span className="text-red-500">*</span>
          </label>
          <input
            type="range"
            name="foundedSince"
            min={1950}
            max={2025}
            value={formData.foundedSince}
            onChange={handleChange}
            className="w-full accent-primary"
          />
          <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
            <span>1950</span>
            <span className="font-bold text-primary">{formData.foundedSince}</span>
            <span>2025</span>
          </div>
        </div>

        <Field label="Industry">
          <select name="industry" value={formData.industry} onChange={handleChange} className={inputClass}>
            {industries.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </Field>

        <Field label="Medium">
          <select name="medium" value={formData.medium} onChange={handleChange} className={inputClass}>
            <option value="">Select Medium</option>
            {mediums.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </Field>

        <Field label="Level">
          <select name="level" value={formData.level} onChange={handleChange} className={inputClass}>
            <option value="">Select the Level</option>
            {levels.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </Field>

        <Field label="Board">
          <select name="board" value={formData.board} onChange={handleChange} className={inputClass}>
            <option value="">Select the Board</option>
            {boards.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </Field>

        <Field label="Website">
          <input
            name="otherWebsite"
            value={formData.otherWebsite}
            onChange={handleChange}
            className={inputClass}
            placeholder="Paste your website URL"
          />
        </Field>

        <div className="lg:col-span-2">
          <Field label="Alternate Email">
            <input
              type="email"
              name="alternateEmail"
              value={formData.alternateEmail}
              onChange={handleChange}
              className={inputClass}
              placeholder="alternate-email"
            />
          </Field>
        </div>
      </div>
    </div>
  );

  const renderSocialLinks = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-primary">Social Links</h2>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Field label="Facebook">
          <input
            name="facebook"
            value={formData.facebook}
            onChange={handleChange}
            className={inputClass}
            placeholder="https://facebook.com/yourschool"
          />
        </Field>
        <Field label="Twitter">
          <input
            name="twitter"
            value={formData.twitter}
            onChange={handleChange}
            className={inputClass}
            placeholder="https://twitter.com/yourschool"
          />
        </Field>
        <div className="lg:col-span-2">
          <Field label="LinkedIn">
            <input
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className={inputClass}
              placeholder="https://linkedin.com/school/yourschool"
            />
          </Field>
        </div>
      </div>
    </div>
  );

  const renderAddress = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-primary">Address / Location</h2>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Field label="Country">
          <select name="country" value={formData.country} onChange={handleChange} className={inputClass}>
            {countries.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="State">
          <select name="state" value={formData.state} onChange={handleChange} className={inputClass}>
            <option value="">Select State</option>
            {indianStates.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
        <Field label="City">
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={inputClass}
            placeholder="Enter city"
          />
        </Field>
        <Field label="Postal Code">
          <input
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            className={inputClass}
            placeholder="Postal Code"
          />
        </Field>
        <div className="lg:col-span-2">
          <Field label="Full Address">
            <textarea
              name="fullAddress"
              value={formData.fullAddress}
              onChange={handleChange}
              className={`${inputClass} min-h-24 resize-none`}
              placeholder="Enter a location"
            />
          </Field>
        </div>
      </div>
    </div>
  );

  const renderActiveSection = () => {
    if (activeSection === "other") return renderOtherInfo();
    if (activeSection === "social") return renderSocialLinks();
    if (activeSection === "address") return renderAddress();
    return renderBasicInfo();
  };

  const SidebarInner = () => (
    <div className="flex h-full flex-col">
      {/* Logo upload */}
      <label className="mb-5 flex cursor-pointer items-center gap-2 self-start rounded-xl border border-dashed border-borderColor px-4 py-2 text-xs font-bold text-primary hover:bg-light">
        <Upload size={13} />
        Upload Institute Logo
        <input type="file" hidden accept="image/*" onChange={handleLogoUpload} />
      </label>

      {/* School identity */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-borderColor bg-light">
          {logoImage ? (
            <img src={logoImage} alt="logo" className="h-full w-full object-cover" />
          ) : (
            <Building2 size={22} className="text-primary" />
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-slate-800">{schoolName}</p>
          <p className="text-xs text-slate-400">School Account</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === "companyProfile";
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold transition ${
                isActive
                  ? "bg-primary text-white"
                  : "text-slate-600 hover:bg-light hover:text-primary"
              }`}
            >
              <Icon size={17} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="mt-4 space-y-1 border-t border-borderColor pt-4">
        <button
          type="button"
          onClick={() => navigate("/school-dashboard")}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold text-slate-600 hover:bg-light"
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold text-slate-600 hover:bg-light"
        >
          <LogOut size={17} />
          Logout
        </button>
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-xl bg-red-500 px-4 py-3 text-left text-sm font-bold text-white hover:bg-red-600"
        >
          <Trash2 size={17} />
          Delete Profile
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-light">
      <form onSubmit={handleSubmit} className="flex min-h-screen">
        {/* Desktop sidebar */}
        <aside className="hidden w-64 shrink-0 flex-col border-r border-borderColor bg-white p-5 lg:flex">
          <SidebarInner />
        </aside>

        {/* Main content */}
        <main className="flex-1 p-5 lg:p-8">
          {/* Page header */}
          <div className="mb-6 rounded-3xl bg-white p-5 shadow-soft">
            <p className="text-xs font-bold uppercase tracking-[2px] text-secondary">
              Employer Workspace
            </p>
            <h1 className="mt-1 text-2xl font-bold text-primary sm:text-3xl">School Profile</h1>
            <p className="mt-1 text-sm text-slate-500">
              Keep your school information up to date to attract the best candidates.
            </p>
          </div>

          {/* Section tabs */}
          <div className="mb-6 flex gap-2 overflow-x-auto rounded-3xl bg-white p-3 shadow-soft">
            {profileSections.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveSection(section.id)}
                  className={`flex shrink-0 items-center rounded-2xl px-5 py-3 text-sm font-bold transition ${
                    isActive
                      ? "bg-primary text-white"
                      : "bg-light text-primary hover:bg-primary/10"
                  }`}
                >
                  {section.label}
                </button>
              );
            })}
          </div>

          {/* Form card */}
          <div className="rounded-3xl bg-white p-6 shadow-soft lg:p-8">
            {renderActiveSection()}

            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-borderColor pt-6 sm:flex-row sm:justify-end">
              <button
                type="button"
                className="rounded-xl border border-borderColor px-6 py-3 text-sm font-bold text-slate-500 hover:bg-light"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-soft hover:bg-primary/95"
              >
                <Save size={17} />
                Save Changes
              </button>
            </div>
          </div>
        </main>
      </form>
    </div>
  );
};

export default SchoolProfile;
