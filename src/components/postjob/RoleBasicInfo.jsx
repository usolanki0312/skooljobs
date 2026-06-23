import { MapPin } from "lucide-react";
import SectionCard from "./SectionCard";
import postjob from "../../../dropdown/School_module/postjob.json";
import styles from "./styles/RoleBasicInfo.module.css";
import { Button, Select, Input } from "@cloudstrytech/ui-components";

const {
  Role_category: ROLE_CATEGORIES,
  Job_title_group: JOB_TITLE_GROUPS,
  Subject_by_job_title: SUBJECTS_BY_JOB_TITLE,
  Joining_timeline: JOINING_TIMELINES,
  Employment_type: EMPLOYMENT_TYPES,
} = postjob;

const inputCls = styles.input;

const RoleBasicInfo = ({ form, setField }) => {
  const jobTitleList = form.roleCategory
    ? [...(JOB_TITLE_GROUPS[form.roleCategory] || []), "Other"]
    : [];
  const subjectList = form.jobTitle
    ? [...(SUBJECTS_BY_JOB_TITLE[form.jobTitle] || []), "Other"]
    : [];

  const handleRoleChange = (value) => {
    setField("roleCategory", value);
    setField("jobTitle", "");
    setField("subject", "");
  };

  const handleJobTitleChange = (value) => {
    setField("jobTitle", value);
    setField("subject", "");
  };

  return (
    <SectionCard number={1} title="Role & Basic Information">
      <div className={styles.fieldGroup}>

        {/* Row 1: Role Category + Job Title + Subject/Department */}
        <div className={styles.rowThree}>

          <div>
            <label className={styles.label}>
              Role Category <span className={styles.required}>*</span>
            </label>
            <Select
              value={form.roleCategory}
              onChange={(value) => handleRoleChange(value)}
              placeholder="Select Category"
              options={ROLE_CATEGORIES}
            />
          </div>

          <div>
            <label className={styles.label}>
              Job Title <span className={styles.required}>*</span>
            </label>
            <Select
              value={form.jobTitle}
              onChange={(value) => handleJobTitleChange(value)}
              placeholder={form.roleCategory ? "Select Job Title" : "Select Role Category first"}
              options={jobTitleList}
              disabled={!form.roleCategory}
            />
            {form.jobTitle === "Other" && (
              <Input
                type="text"
                value={form.customJobTitle || ""}
                onChange={(value) => setField("customJobTitle", value)}
                placeholder="Enter custom job title"
                required
              />
            )}
          </div>

          <div>
            <label className={styles.label}>
              Subject / Department <span className={styles.required}>*</span>
            </label>
            <Select
              value={form.subject}
              onChange={(value) => setField("subject", value)}
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
              <Input
                type="text"
                value={form.customSubject || ""}
                onChange={(value) => setField("customSubject", value)}
                placeholder="Enter custom subject/department"
                required
              />
            )}
          </div>
        </div>

        {/* Row 2: Employment Type */}
        <div>
          <label className={styles.labelMb2}>
            Employment Type <span className={styles.required}>*</span>
          </label>
          <div className={styles.employmentTypeWrap}>
            {EMPLOYMENT_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setField("employmentType", type)}
                className={`${styles.employmentTypeButton} ${form.employmentType === type ? styles.employmentTypeButtonActive : ""
                  }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Row 3: Location + Joining Timeline */}
        <div className={styles.rowTwo}>
          <div>
            <label className={styles.label}>
              Location <span className={styles.required}>*</span>
            </label>
            <div className={styles.locationField}>
              <MapPin size={15} className={styles.locationIcon} />
            <Input
  value={form.location}
  onChange={(value) => setField("location", value)}
  placeholder="e.g. Ahmedabad, Gujarat"
/>
            </div>
          </div>

          <div>
            <label className={styles.label}>
              Joining Timeline <span className={styles.required}>*</span>
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
