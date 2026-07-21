import { ImageIcon, Upload, Wand2, X } from "lucide-react";
import SectionCard from "./SectionCard";
import styles from "./styles/JobDescriptionSection.module.css";
import { Input, Button } from "@cloudstrytech/ui-components";
import { useImageUpload } from "../../lib/useImageUpload";

const JobDescriptionSection = ({
  form,
  setField,
  onGenerateJD,
  generating,
}) => {
  const {
    error: logoError,
    validating: logoValidating,
    validateAndProcess: validateLogoImage,
  } = useImageUpload("logo");

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    e.target.value = "";
    if (!file) return;
    const url = await validateLogoImage(file);
    if (url) setField("jobLogoImage", url);
  };

  const displayImage = form.jobLogoImage || form.aiGeneratedImage;

  return (
    <SectionCard number={4} title="Job Description">
      <div className={styles.wrapper}>
        <div className={styles.headerRow}>
          <p className={styles.description}>
            Describe the role, responsibilities, and what you're looking for in an
            ideal candidate.
          </p>
          <Button
            variant="filled"
            onClick={onGenerateJD}
            disabled={generating}
            className={styles.generateButton}
            startIcon={<Wand2 size={13} />}
          >
            {generating ? "Generating…" : "AI Generate JD"}
          </Button>
        </div>

        <div>
          <label className={styles.fieldLabel}>Short Job Description</label>
          <textarea
            value={form.shortDescription}
            onChange={(e) => setField("shortDescription", e.target.value)}
            rows={2}
            placeholder="A 1-2 line summary shown on job cards. Click 'AI Generate JD' to auto-generate."
            className={styles.textarea}
          />
        </div>

        <div>
          <label className={styles.fieldLabel}>Detailed Job Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setField("description", e.target.value)}
            rows={7}
            placeholder="Describe the role, responsibilities, and expectations. Click 'AI Generate JD' to auto-generate based on your job details."
            className={styles.textarea}
          />
          <p className={styles.charCount}>
            {form.description.length} characters
          </p>
        </div>

        <div>
          <label className={styles.fieldLabel}>Job Banner Image</label>
          <p className={styles.description}>
            Auto-generated from your job details, or upload your own school
            logo/banner to use instead.
          </p>
          <div className={styles.imageRow}>
            <div className={styles.imagePreviewWrap}>
              {displayImage ? (
                <img
                  src={displayImage}
                  alt="Job banner"
                  className={styles.imagePreview}
                />
              ) : (
                <div className={styles.imagePlaceholder}>
                  <ImageIcon size={22} />
                </div>
              )}
            </div>
            <div className={styles.imageActionsCol}>
              <p className={styles.imageSourceLabel}>
                {form.jobLogoImage
                  ? "Using your uploaded logo"
                  : form.aiGeneratedImage
                    ? "Using AI-generated banner"
                    : "No image yet"}
              </p>
              <div className={styles.imageActions}>
                <label className={styles.imageUploadLabel}>
                  <Upload size={13} />
                  {logoValidating ? "Checking…" : "Upload Your Logo"}
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    disabled={logoValidating}
                    onChange={handleLogoUpload}
                  />
                </label>
                {form.jobLogoImage && (
                  <button
                    type="button"
                    className={styles.removeImageBtn}
                    onClick={() => setField("jobLogoImage", "")}
                  >
                    <X size={13} /> Remove
                  </button>
                )}
              </div>
              {logoError && <p className={styles.imageError}>{logoError}</p>}
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
};

export default JobDescriptionSection;
