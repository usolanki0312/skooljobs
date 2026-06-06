import { Wand2 } from "lucide-react";
import SectionCard from "./SectionCard";

const JobDescriptionSection = ({
  form,
  setField,
  onGenerateJD,
  generating,
}) => (
  <SectionCard number={4} title="Job Description">
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Describe the role, responsibilities, and what you're looking for in an
          ideal candidate.
        </p>
        <button
          type="button"
          onClick={onGenerateJD}
          disabled={generating}
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-xs font-bold text-primary hover:bg-primary/20 disabled:opacity-50 transition"
        >
          <Wand2 size={13} />
          {generating ? "Generating…" : "AI Generate JD"}
        </button>
      </div>
      <textarea
        value={form.description}
        onChange={(e) => setField("description", e.target.value)}
        rows={7}
        placeholder="Describe the role, responsibilities, and expectations. Click 'AI Generate JD' to auto-generate based on your job details."
        className="w-full resize-none rounded-xl border border-borderColor bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
      />
      <p className="text-right text-xs text-slate-400">
        {form.description.length} characters
      </p>
    </div>
  </SectionCard>
);

export default JobDescriptionSection;
