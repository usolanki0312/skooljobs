import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { profileSections } from "../../lib/schooldata";
import profileOptions from "../../../dropdown/School_module/profile.json";
import { Button, Input } from "@cloudstrytech/ui-components";


const {
  Sector: sectors,
  Medium: mediums,
  Level: levels,
  Board: boards,
  Industry: industries,
  Country: countries,
  Indian_state: indianStates,
  Student_count: studentCountOptions,
  Students_per_class: studentsPerClassOptions,
  Public_view: publicViewOptions,
  Bus_service: busServiceOptions,
} = profileOptions;
import {
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  Bus,
  Camera,
  Clock,
  CreditCard,
  Globe,
  Heart,
  ImageIcon,
  KeyRound,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  PlusCircle,
  Save,
  Settings,
  Upload,
  Users,
  X,
} from "lucide-react";
import Select from "../../components/ui/Select";

const sidebarItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    route: "/school/dashboard",
  },
  { id: "companyProfile", label: "Institute Profile", icon: Building2 },
  {
    id: "postJob",
    label: "Post a New Job",
    icon: PlusCircle,
    route: "/school/post-job",
  },
  {
    id: "manageJobs",
    label: "Manage Jobs",
    icon: BriefcaseBusiness,
    route: "/school/manage-jobs",
  },
  {
    id: "allApplicants",
    label: "All Applicants",
    icon: Users,
    route: "/school/all-applicants",
  },
  {
    id: "savedCandidates",
    label: "Saved Candidates",
    icon: Heart,
    route: "/school/saved-candidates",
  },
  {
    id: "packages",
    label: "Packages",
    icon: Package,
    route: "/school/packages",
  },
  {
    id: "transactions",
    label: "Transactions",
    icon: CreditCard,
    route: "/school/transactions",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    route: "/school/settings",
  },
];

const establishmentYears = Array.from({ length: 76 }, (_, i) =>
  String(2025 - i),
);

const inputClass =
  "w-full rounded-xl border border-borderColor bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10";

const labelClass =
  "mb-2 block text-xs font-bold uppercase tracking-wide text-slate-600";

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
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [logoImage, setLogoImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [pincodeError, setPincodeError] = useState("");

  // Area / locality search (India Post "postoffice" endpoint)
  const [areaQuery, setAreaQuery] = useState("");
  const [areaResults, setAreaResults] = useState([]);
  const [areaLoading, setAreaLoading] = useState(false);
  const [areaError, setAreaError] = useState("");
  const [showAreaDropdown, setShowAreaDropdown] = useState(false);

  const currentUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("currentUser") || "{}");
    } catch {
      return {};
    }
  }, []);

  const schoolName =
    currentUser.companyName ||
    currentUser.schoolName ||
    currentUser.firstName ||
    "Som Lalit School";

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
    aboutInstitute: "",
    totalStudents: "",
    studentsPerClass: "",
    schoolTimings: "",
    busService: "",
    establishedYear: "2000",
    industry: "Schools & Institutions",
    medium: "English",
    level: "",
    board: "",
    alternateEmail: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    country: "India",
    state: "",
    city: "",
    area: "",
    postalCode: "",
    addressLane1: "",
    addressLane2: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const setField = (name, value) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) setLogoImage(URL.createObjectURL(file));
  };

  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (file) setCoverImage(URL.createObjectURL(file));
  };

  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files || []);
    const urls = files.map((f) => URL.createObjectURL(f));
    setGalleryImages((prev) => [...prev, ...urls].slice(0, 8));
  };

  const handleNavClick = (item) => {
    if (item.route) navigate(item.route);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeSection === "address" && !formData.postalCode) {
      alert("Postal Code is required for job location matching.");
      return;
    }
    if (activeSection === "other" && !formData.level) {
      alert("Level is required as it directly affects job matching.");
      return;
    }
    alert("Profile saved successfully!");
  };

  // Profile completion calculation
  const completionFields = [
    formData.companyName,
    formData.email,
    formData.phone,
    formData.website,
    formData.aboutInstitute,
    formData.level,
    formData.board,
    formData.medium,
    formData.establishedYear,
    formData.city,
    formData.postalCode,
    formData.totalStudents,
    formData.schoolTimings,
  ];
  const completionPct = Math.round(
    (completionFields.filter(Boolean).length / completionFields.length) * 100,
  );

  // ─── Render Basic Info ─────────────────────────────────────────────────────

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-primary">Basic Information</h2>

      {/* Logo + Cover photo upload */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        {/* Institute logo */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-borderColor bg-light">
            {logoImage ? (
              <img src={logoImage} alt="logo" className="h-full w-full object-cover" />
            ) : (
              <Building2 size={32} className="text-slate-300" />
            )}
          </div>
          <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-borderColor bg-white px-3 py-2 text-xs font-bold text-primary hover:bg-primary/5">
            <Upload size={13} /> {logoImage ? "Change Logo" : "Upload Logo"}
            <input type="file" hidden accept="image/*" onChange={handleLogoUpload} />
          </label>
          <p className="text-xs text-slate-400">Recommended: 200×200px</p>
        </div>

        {/* Cover photo */}
        <div className="flex-1">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-borderColor bg-light px-5 py-2.5 text-sm font-bold text-primary hover:bg-primary/5">
            <ImageIcon size={16} /> Upload Cover Photo
            <input type="file" hidden accept="image/*" onChange={handleCoverUpload} />
          </label>
          {coverImage && (
            <div className="mt-3 h-32 w-full overflow-hidden rounded-2xl border border-borderColor">
              <img src={coverImage} alt="cover" className="h-full w-full object-cover" />
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Field label="First Name" required>
          <Input
            value={formData.firstName}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                firstName: value,
              }))
            }
          />
        </Field>
        <Field label="Last Name" required>
          <Input
            value={formData.lastName}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                lastName: value,
              }))
            }
          />
        </Field>
        <Field label="Institute Name" required>
          <Input
            value={formData.companyName}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                companyName: value,
              }))
            }
          />
        </Field>
        <Field label="Email" required>
          <Input
            value={formData.email}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                email: value,
              }))
            }
          />
        </Field>
      </div>

      {/* Profile URL */}
      <div>
        <label className={labelClass}>Profile URL</label>
        <div className="flex items-center gap-3 rounded-xl border border-borderColor bg-light px-4 py-3">
          <Globe size={15} className="shrink-0 text-primary" />
          <span className="flex-1 truncate text-sm text-slate-600">
            {formData.profileUrl}
          </span>
          <Button variant="text" color type="button">
            Edit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Field label="Profile for Public View">
          <Select
            value={formData.publicView}
            onChange={(v) => setField("publicView", v)}
            options={publicViewOptions}
          />
        </Field>
        <Field label="Phone">
          <Input
            value={formData.phone}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                phone: value,
              }))
            }
            placeholder="Phone number"
          />
        </Field>
        <Field label="Website">
          <Input
            value={formData.website}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                website: value,
              }))
            }
            placeholder="https://yourwebsite.com"
          />
        </Field>
        <Field label="Sector" required>
          <Select
            value={formData.sector}
            onChange={(v) => setField("sector", v)}
            placeholder="Select Sector"
            options={sectors}
          />
        </Field>
      </div>

      {/* About the Institute (renamed from About the Company) */}
      <div>
        <label className={labelClass}>About the Institute</label>
        <div className="overflow-hidden rounded-xl border border-borderColor">
          <div className="flex flex-wrap items-center gap-1 border-b border-borderColor bg-light px-3 py-2">
            {["B", "I", "U", "S", "≡", "≡", "≡", "⊞", "🔗", "↩", "↪"].map(
              (btn, i) => (
                <button
                  key={i}
                  type="button"
                  className="min-w-7 rounded px-2 py-1 text-xs font-bold text-slate-600 hover:bg-white hover:shadow-sm"
                >
                  {btn}
                </button>
              ),
            )}
            <div className="ml-auto flex gap-1">
              <button
                type="button"
                className="rounded border border-primary/30 px-3 py-1 text-xs font-bold text-primary bg-white"
              >
                Visual
              </button>
              <button
                type="button"
                className="rounded px-3 py-1 text-xs font-bold text-slate-500 hover:bg-white"
              >
                Text
              </button>
            </div>
          </div>
          <textarea
            name="aboutInstitute"
            value={formData.aboutInstitute}
            onChange={handleChange}
            className="min-h-32 w-full resize-none bg-white px-4 py-3 text-sm text-slate-800 outline-none"
            placeholder="Write about your school / institute..."
          />
        </div>
      </div>

      {/* School-specific fields */}
      <div className="rounded-2xl border border-borderColor bg-light p-5 space-y-5">
        <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide">
          School Details for Candidate Matching
        </h3>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <Field label="Total Student Strength">
            <Select
              value={formData.totalStudents}
              onChange={(v) => setField("totalStudents", v)}
              placeholder="Select total students"
              options={studentCountOptions}
            />
          </Field>

          <Field label="Students Per Class">
            <Select
              value={formData.studentsPerClass}
              onChange={(v) => setField("studentsPerClass", v)}
              placeholder="Select students per class"
              options={studentsPerClassOptions}
            />
          </Field>

          <Field label="School Timings / Working Hours">
            <Input
              value={formData.schoolTimings}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  schoolTimings: value,
                }))
              }
              placeholder="e.g. 8:00 AM – 2:30 PM, Mon–Sat"
            />
          </Field>

          <Field label="Bus / Transport Service Available">
            <Select
              value={formData.busService}
              onChange={(v) => setField("busService", v)}
              placeholder="Select option"
              options={busServiceOptions}
            />
          </Field>
        </div>
      </div>

      {/* School Photo Gallery */}
      <div>
        <label className={labelClass}>School Photos / Gallery</label>
        <p className="mb-3 text-xs text-slate-500">
          Upload up to 8 photos — a visual profile makes your school more
          attractive to candidates.
        </p>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-primary/40 px-5 py-3 text-sm font-bold text-primary hover:bg-primary/5">
          <Camera size={16} /> Upload Photos
          <input
            type="file"
            hidden
            accept="image/*"
            multiple
            onChange={handleGalleryUpload}
          />
        </label>
        {galleryImages.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {galleryImages.map((url, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-xl border border-borderColor"
              >
                <img
                  src={url}
                  alt={`gallery-${i}`}
                  className="h-24 w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() =>
                    setGalleryImages((prev) =>
                      prev.filter((_, idx) => idx !== i),
                    )
                  }
                  className="absolute right-1 top-1 hidden rounded-full bg-red-500 p-1 text-white group-hover:flex"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // ─── Render Other Info ─────────────────────────────────────────────────────

  const renderOtherInfo = () => {
    const currentYear = new Date().getFullYear();
    const age = formData.establishedYear
      ? currentYear - parseInt(formData.establishedYear)
      : null;
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-primary">Other Information</h2>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Founded Since — replaced slider with dropdown */}
          <div>
            <Field label="Established / Founded Since *">
              <Select
                value={formData.establishedYear}
                onChange={(v) => setField("establishedYear", v)}
                placeholder="Select year of establishment"
                options={establishmentYears}
              />
            </Field>
            {age !== null && age > 0 && (
              <p className="mt-1.5 text-xs text-slate-500">
                School age:{" "}
                <span className="font-bold text-primary">
                  {age} year{age !== 1 ? "s" : ""}
                </span>
              </p>
            )}
          </div>

          <Field label="Industry">
            <Select
              value={formData.industry}
              onChange={(v) => setField("industry", v)}
              options={industries}
            />
          </Field>

          <Field label="Medium">
            <Select
              value={formData.medium}
              onChange={(v) => setField("medium", v)}
              placeholder="Select Medium"
              options={mediums}
            />
          </Field>

          {/* Level — made mandatory */}
          <Field label="Level" required>
            <Select
              value={formData.level}
              onChange={(v) => setField("level", v)}
              placeholder="Select the Level"
              options={levels}
            />
            <p className="mt-1 text-xs text-slate-400">
              Mandatory — affects teacher matching.
            </p>
          </Field>

          {/* Board — visible prominently for matching */}
          <Field label="Board">
            <Select
              value={formData.board}
              onChange={(v) => setField("board", v)}
              placeholder="Select the Board"
              options={boards}
            />
            <p className="mt-1 text-xs text-slate-400">
              Board helps match the right teachers for your curriculum.
            </p>
          </Field>

          {/* Website field REMOVED from Other Info — it's in Basic Information already */}

          <div className="lg:col-span-2">
            <Field label="Alternate Email">
              <Input
                value={formData.alternateEmail}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    alternateEmail: value,
                  }))
                }
                placeholder="alternate-email"
              />
            </Field>
          </div>
        </div>
      </div>
    );
  };

  // ─── Render Social Links ───────────────────────────────────────────────────

  const renderSocialLinks = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-primary">Social Links</h2>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Field label="Facebook">
          <Input
            value={formData.facebook}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                facebook: value,
              }))
            }
            placeholder="https://facebook.com/yourschool"
          />
        </Field>
        {/* Twitter → renamed to X (Twitter) */}
        <Field label="X (Twitter)">
          <Input
            value={formData.twitter}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                twitter: value,
              }))
            }
            placeholder="https://x.com/yourschool"
          />
        </Field>
        <div className="lg:col-span-2">
          <Field label="LinkedIn">
            <Input
              value={formData.linkedin}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  linkedin: value,
                }))
              }
              placeholder="https://linkedin.com/school/yourschool"
            />
          </Field>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    const pin = formData.postalCode.trim();
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
          setFormData((p) => ({
            ...p,
            state: po.State,
            city: po.District,
            area: po.Name.replace(/\s*(S\.O|B\.O|H\.O)$/i, "").trim(),
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
  }, [formData.postalCode]);

  // Debounced area/locality search → India Post "postoffice" endpoint.
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
    setFormData((p) => ({
      ...p,
      area: cleanName,
      city: po.District,
      state: po.State,
      postalCode: po.Pincode,
    }));
    setAreaQuery(cleanName);
    setShowAreaDropdown(false);
    setAreaResults([]);
    setPincodeError("");
  };

  // ─── Render Address ────────────────────────────────────────────────────────

  const renderAddress = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-primary">Address / Location</h2>

      {/* Locality search — type an area name, pick from results, everything fills */}
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
        <Field label="Search Area / Locality">
          <div className="relative">
            <Input
              value={areaQuery}
              onChange={(value) => {
                setAreaQuery(value);
                setAreaError("");
              }}
              onFocus={() => areaResults.length > 0 && setShowAreaDropdown(true)}
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
              Select a locality and the City/District, State &amp; PIN code fill in automatically.
            </p>
          )}
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Field label="Country">
          <Select
            value={formData.country}
            onChange={(v) => setField("country", v)}
            options={countries}
          />
        </Field>

        <Field label="Area / Locality">
         <Input
  value={formData.area}
  onChange={(value) =>
    setFormData((prev) => ({
      ...prev,
      area: value,
    }))
  }
  placeholder="e.g. Rajendra Nagar"
/>
        </Field>

        <Field label="City / District">
         <Input
  value={formData.city}
  onChange={(value) =>
    setFormData((prev) => ({
      ...prev,
      city: value,
    }))
  }
  placeholder="e.g. Indore"
/>
        </Field>

        <Field label="State">
          <Select
            value={formData.state}
            onChange={(v) => setField("state", v)}
            placeholder="Select State"
            options={indianStates}
          />
        </Field>

        {/* Postal code — also supports reverse autofill if typed directly */}
        <Field label="Postal / PIN Code" required>
          <div className="relative">
            <Input
  value={formData.postalCode}
  onChange={(value) => {
    setPincodeError("");
    setFormData((prev) => ({
      ...prev,
      postalCode: value,
    }));
  }}
  placeholder="e.g. 452012"
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

        <div className="lg:col-span-2">
          <Field label="Address Lane 1">
           <Input
  value={formData.addressLane1}
  onChange={(value) =>
    setFormData((prev) => ({
      ...prev,
      addressLane1: value,
    }))
  }
  placeholder="Flat / Building No., Building Name, Street"
/>
          </Field>
        </div>

        <div className="lg:col-span-2">
          <Field label="Address Lane 2">
           <Input
  value={formData.addressLane2}
  onChange={(value) =>
    setFormData((prev) => ({
      ...prev,
      addressLane2: value,
    }))
  }
  placeholder="Area, Landmark (optional)"
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

  // ─── Sidebar ───────────────────────────────────────────────────────────────

  const SidebarInner = () => (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-borderColor bg-light">
          {logoImage ? (
            <img
              src={logoImage}
              alt="logo"
              className="h-full w-full object-cover"
            />
          ) : (
            <Building2 size={22} className="text-primary" />
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-slate-800">
            {schoolName}
          </p>
          <p className="text-xs text-slate-400">School Account</p>
        </div>
      </div>

      {/* Profile completion indicator */}
      <div className="mb-5 rounded-xl bg-light p-3 border border-borderColor">
        <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-1.5">
          <span>Profile Completion</span>
          <span className="text-primary">{completionPct}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white border border-borderColor/50">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${completionPct}%` }}
          />
        </div>
        {completionPct < 100 && (
          <p className="mt-1.5 text-xs text-slate-400">
            {100 - completionPct}% remaining to complete profile
          </p>
        )}
      </div>

      <nav className="flex-1 space-y-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === "companyProfile";
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold transition ${isActive ? "bg-primary text-white" : "text-slate-600 hover:bg-light hover:text-primary"}`}
            >
              <Icon size={17} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-4 space-y-1 border-t border-borderColor pt-4">
        <button
          type="button"
          onClick={() => navigate("/school/dashboard")}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold text-slate-600 hover:bg-light"
        >
          <ArrowLeft size={17} /> Back to Dashboard
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold text-slate-600 hover:bg-light"
        >
          <LogOut size={17} /> Logout
        </button>
        {/* Delete Profile moved to Settings page — no longer in sidebar */}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-light">
      <form onSubmit={handleSubmit} className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 flex-col border-r border-borderColor bg-white p-5 lg:flex">
          <SidebarInner />
        </aside>

        <main className="min-w-0 flex-1 overflow-x-hidden p-5 lg:p-8">
          <div className="mb-6 rounded-3xl bg-white p-5 shadow-soft">
            <p className="text-xs font-bold uppercase tracking-[2px] text-secondary">
              Employer Workspace
            </p>
            <h1 className="mt-1 text-2xl font-bold text-primary sm:text-3xl">
              School Profile
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Keep your school information up to date to attract the best
              candidates.
            </p>
          </div>

          <div className="mb-6 hidden gap-2 rounded-3xl bg-white p-3 shadow-soft lg:flex">
            {profileSections.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveSection(section.id)}
                  className={`flex shrink-0 items-center rounded-2xl px-5 py-3 text-sm font-bold transition ${isActive ? "bg-primary text-white" : "bg-light text-primary hover:bg-primary/10"}`}
                >
                  {section.label}
                </button>
              );
            })}
          </div>

          <div className="relative mb-6 lg:hidden">
            <div className="flex items-center justify-between rounded-3xl bg-white p-3 shadow-soft">
              <span className="px-2 text-sm font-bold text-primary">
                {profileSections.find((section) => section.id === activeSection)?.label || "Menu"}
              </span>
              <button
                type="button"
                onClick={() => setMobileNavOpen((o) => !o)}
                aria-label="Toggle navigation menu"
                aria-expanded={mobileNavOpen}
                className="rounded-xl p-2 text-primary hover:bg-light"
              >
                {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

            {mobileNavOpen && (
              <div className="absolute left-0 right-0 top-full z-40 mt-2 space-y-1 rounded-3xl bg-white p-3 shadow-soft">
                {profileSections.map((section) => {
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => {
                        setActiveSection(section.id);
                        setMobileNavOpen(false);
                      }}
                      className={`flex w-full items-center rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${isActive ? "bg-primary text-white" : "text-slate-600 hover:bg-light hover:text-primary"}`}
                    >
                      {section.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-soft lg:p-8">
            {renderActiveSection()}

            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-borderColor pt-6 sm:flex-row sm:justify-end">
              <Button variant="outlined" type="button">
                Cancel
              </Button>
              <Button type="filled">
                <Save size={17} /> Save Changes
              </Button>
            </div>
          </div>
        </main>
      </form>
    </div>
  );
};

export default SchoolProfile;
