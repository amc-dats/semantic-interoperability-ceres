// Option lists for the Internal Expert Validation Survey (Plain) --
// Section A, questions 2 and 3. See Internal_Expert_Validation_Survey_Plain.docx.

export const AREA_OPTIONS = [
  "People",
  "Operations",
  "Product",
  "Technology",
  "Commercial",
  "Finance",
] as const;

export const ROLE_TYPE_OPTIONS = [
  {
    value: "Strategic / architecture-focused",
    description:
      "I help shape overall data strategy or how our systems and data are structured",
  },
  {
    value: "Hands-on / technical implementation",
    description: "I build, maintain or operate the systems and data connections directly",
  },
  {
    value: "Operational / decision-adjacent",
    description:
      "I use these systems day-to-day but am not directly responsible for their design",
  },
] as const;

export const CONFIDENCE_LABELS = ["Not at all confident", "Extremely confident"] as const;
