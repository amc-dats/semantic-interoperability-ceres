import type { WordingVariant } from "../types";
import { WORDING_VARIANT_OPTIONS } from "../data/assessmentSetupOptions";

interface Props {
  wordingVariant: WordingVariant;
  onWordingVariantChange: (v: WordingVariant) => void;
  onNext: () => void;
}

export function AssessmentSetupScreen({
  wordingVariant,
  onWordingVariantChange,
  onNext,
}: Props) {
  return (
    <div className="card">
      <div className="eyebrow">Step 1 of 2</div>
      <h1>Before you start</h1>

      <div className="section-heading">How would you like the assessment worded?</div>
      <p className="field-hint" style={{ marginBottom: 8 }}>
        This only changes how questions and answer options are worded — it
        doesn't affect scoring.
      </p>
      {WORDING_VARIANT_OPTIONS.map((option) => (
        <label className="radio-row" key={option.value}>
          <input
            type="radio"
            name="wordingVariant"
            checked={wordingVariant === option.value}
            onChange={() => onWordingVariantChange(option.value)}
          />
          <span>{option.label}</span>
        </label>
      ))}

      <div className="actions-row">
        <button className="btn btn-primary" onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  );
}
