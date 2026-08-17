import type { Level, ValidationAnswers } from "../types";
import { AREA_OPTIONS, CONFIDENCE_LABELS, ROLE_TYPE_OPTIONS } from "../data/validationOptions";

interface Props {
  value: ValidationAnswers;
  onChange: (v: ValidationAnswers) => void;
  onSubmit: () => void;
  onSkip: () => void;
}

const AGREEMENT_LABELS: Record<Level, string> = {
  1: "Strongly disagree",
  2: "Disagree",
  3: "Neutral",
  4: "Agree",
  5: "Strongly agree",
};

function LikertQuestion({
  label,
  value,
  onChange,
  endLabels = AGREEMENT_LABELS,
}: {
  label: string;
  value: Level | null;
  onChange: (v: Level) => void;
  endLabels?: Record<Level, string>;
}) {
  return (
    <div className="field">
      <label className="field-label">{label}</label>
      <div className="likert">
        {([1, 2, 3, 4, 5] as Level[]).map((lvl) => (
          <label className="likert-option" key={lvl}>
            <input
              type="radio"
              name={label}
              checked={value === lvl}
              onChange={() => onChange(lvl)}
            />
            <span>{lvl === 1 || lvl === 5 ? endLabels[lvl] : lvl}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

const CONFIDENCE_END_LABELS: Record<Level, string> = {
  1: CONFIDENCE_LABELS[0],
  2: "",
  3: "",
  4: "",
  5: CONFIDENCE_LABELS[1],
};

export function ValidationScreen({ value, onChange, onSubmit, onSkip }: Props) {
  const set = <K extends keyof ValidationAnswers>(key: K, v: ValidationAnswers[K]) =>
    onChange({ ...value, [key]: v });

  return (
    <div className="card">
      <div className="eyebrow">Optional — last step</div>
      <h1>Internal expert validation survey</h1>
      <p className="lede">
        This survey asks you to evaluate the roadmap against Ceres' specific
        situation, based on your day-to-day knowledge of our systems and
        ways of working. Your responses are anonymous and used solely to
        inform academic research for an MSc in Digital and Technology
        Solutions at Cranfield University. It should take about ten minutes.
      </p>

      <div className="section-heading">Section A: About you</div>

      <div className="field">
        <label className="field-label">
          Roughly how long have you worked at Ceres, or with these systems specifically?
        </label>
        <input
          type="text"
          value={value.yearsAtCeres}
          onChange={(e) => set("yearsAtCeres", e.target.value)}
          placeholder="e.g. 3 years"
        />
      </div>

      <div className="field">
        <label className="field-label">Which area do you work in?</label>
        <select
          value={value.area ?? ""}
          onChange={(e) => set("area", e.target.value === "" ? null : e.target.value)}
        >
          <option value="">Prefer not to say</option>
          {AREA_OPTIONS.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label className="field-label">
          Which best describes your role in relation to interoperability decisions?
        </label>
        {ROLE_TYPE_OPTIONS.map((option) => (
          <label className="radio-row" key={option.value}>
            <input
              type="radio"
              name="roleType"
              checked={value.roleType === option.value}
              onChange={() => set("roleType", option.value)}
            />
            <span>
              {option.value} — {option.description}
            </span>
          </label>
        ))}
      </div>

      <div className="section-heading">Section B: Core evaluation</div>

      <LikertQuestion
        label="This self-assessment would help Ceres identify where it currently stands on its interoperability journey."
        value={value.utility}
        onChange={(v) => set("utility", v)}
      />
      <LikertQuestion
        label="Acting on this roadmap would likely help Ceres progress towards its interoperability goals."
        value={value.effectiveness}
        onChange={(v) => set("effectiveness", v)}
      />
      <LikertQuestion
        label="The self-assessment is clear and straightforward to complete."
        value={value.easeOfUse}
        onChange={(v) => set("easeOfUse", v)}
      />
      <LikertQuestion
        label="This framework would be relevant and applicable to organisations in your industry more broadly."
        value={value.generality}
        onChange={(v) => set("generality", v)}
      />

      <div className="field">
        <label className="field-label">
          What, if anything, would make this assessment and framework more useful?
        </label>
        <textarea
          value={value.usefulnessText}
          onChange={(e) => set("usefulnessText", e.target.value)}
          placeholder="Optional"
        />
      </div>

      <div className="section-heading">Section C: Additional context-expert questions</div>

      <LikertQuestion
        label="The interoperability challenge described (our data being spread across separate systems, such as those for product design, business planning, and shop-floor manufacturing, with people manually cross-checking and correcting it by hand) accurately reflects a real problem at Ceres."
        value={value.problemValidity}
        onChange={(v) => set("problemValidity", v)}
      />
      <LikertQuestion
        label="The proposed approach for giving our systems a shared, consistent way to describe and query data is an appropriate way to address this problem in the Ceres context."
        value={value.solutionFit}
        onChange={(v) => set("solutionFit", v)}
      />
      <LikertQuestion
        label="The maturity roadmap reflects meaningful, realistic stages of progress for an organisation like Ceres."
        value={value.roadmapValidity}
        onChange={(v) => set("roadmapValidity", v)}
      />
      <LikertQuestion
        label="How confident are you in the assessment you have just given?"
        value={value.confidence}
        onChange={(v) => set("confidence", v)}
        endLabels={CONFIDENCE_END_LABELS}
      />

      <div className="field">
        <label className="field-label">
          Are there any concerns or limitations you see with this approach, specific to Ceres?
        </label>
        <textarea
          value={value.concernsText}
          onChange={(e) => set("concernsText", e.target.value)}
          placeholder="Optional"
        />
      </div>

      <div className="actions-row">
        <button className="btn btn-secondary" onClick={onSkip}>
          Skip
        </button>
        <button className="btn btn-primary" onClick={onSubmit}>
          Submit feedback
        </button>
      </div>
    </div>
  );
}
