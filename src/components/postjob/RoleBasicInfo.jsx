import { MapPin } from "lucide-react";
import SectionCard from "./SectionCard";
import Select from "../ui/Select";
import postjob from "../../../dropdown/School_module/postjob.json";

const {
  Role_category: ROLE_CATEGORIES,
  Job_title_group: JOB_TITLE_GROUPS,
  Subject_by_job_title: SUBJECTS_BY_JOB_TITLE,
  Joining_timeline: JOINING_TIMELINES,
  Employment_type: EMPLOYMENT_TYPES,
} = postjob;

const inputCls =
  "w-full rounded-xl border border-borderColor bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10";

const RoleBasicInfo = ({ form, setField }) => {
  const jobTitleList = form.roleCategory
    ? [...(JOB_TITLE_GROUPS[form.roleCategory] || []), "Other"]
    : [];
  const subjectList  = form.jobTitle
    ? [...(SUBJECTS_BY_JOB_TITLE[form.jobTitle] || []), "Other"]
    : [];

  const handleRoleChange = (value) => {
    setField("roleCategory", value);
    setField("jobTitle",     "");
    setField("subject",      "");
  };

  const handleJobTitleChange = (value) => {
    setField("jobTitle", value);
    setField("subject",  "");
  };

  return (
    <SectionCard number={1} title="Role & Basic Information">
      <div className="space-y-5">

        {/* Row 1: Role Category + Job Title + Subject/Department */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">

          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-600">
              Role Category <span className="text-red-500">*</span>
            </label>
            <Select
              value={form.roleCategory}
              onChange={handleRoleChange}
              placeholder="Select Category"
              options={ROLE_CATEGORIES}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-600">
              Job Title <span className="text-red-500">*</span>
            </label>
            <Select
              value={form.jobTitle}
              onChange={handleJobTitleChange}
              placeholder={form.roleCategory ? "Select Job Title" : "Select Role Category first"}
              options={jobTitleList}
              disabled={!form.roleCategory}
            />
            {form.jobTitle === "Other" && (
              <input
                type="text"
                value={form.customJobTitle || ""}
                onChange={(e) => setField("customJobTitle", e.target.value)}
                placeholder="Enter custom job title"
                className={`${inputCls} mt-2`}
                required
              />
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-600">
              Subject / Department <span className="text-red-500">*</span>
            </label>
            <Select
              value={form.subject}
              onChange={(v) => setField("subject", v)}
              placeholder={
                !form.roleCategory
                  ? "Select Role Category first"
                  : !form.jobTitle
                    ? "Select Job Title first"
                    : subjectList.length
                      ? "Select Subject / Department"
                      : "No subjects available"
              }
              options={subjectList}
              disabled={!form.jobTitle || !subjectList.length}
            />
            {form.subject === "Other" && (
              <input
                type="text"
                value={form.customSubject || ""}
                onChange={(e) => setField("customSubject", e.target.value)}
                placeholder="Enter custom subject/department"
                className={`${inputCls} mt-2`}
                required
              />
            )}
          </div>
        </div>

        {/* Row 2: Employment Type */}
        <div>
          <label className="mb-2 block text-xs font-bold text-slate-600">
            Employment Type <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {EMPLOYMENT_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setField("employmentType", type)}
                className={`rounded-full border px-5 py-2 text-sm font-bold transition ${
                  form.employmentType === type
                    ? "border-primary bg-primary text-white"
                    : "border-borderColor text-slate-600 hover:border-primary hover:text-primary"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Row 3: Location + Joining Timeline */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-600">
              Location <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={form.location}
                onChange={(e) => setField("location", e.target.value)}
                placeholder="e.g. Ahmedabad, Gujarat"
                className={`${inputCls} pl-9`}
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-600">
              Joining Timeline <span className="text-red-500">*</span>
            </label>
            <Select
              value={form.joiningTimeline}
              onChange={(v) => setField("joiningTimeline", v)}
              placeholder="Select Timeline"
              options={JOINING_TIMELINES}
            />
          </div>
        </div>

      </div>
    </SectionCard>
  );
};

export default RoleBasicInfo;
