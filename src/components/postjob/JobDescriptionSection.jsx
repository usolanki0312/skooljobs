import { Wand2 } from "lucide-react";
import SectionCard from "./SectionCard";
import styles from "./styles/JobDescriptionSection.module.css";
import { Input, Button } from "@cloudstrytech/ui-components";

const JobDescriptionSection = ({
  form,
  setField,
  onGenerateJD,
  generating,
}) => (
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
  </SectionCard>
);

export default JobDescriptionSection;
