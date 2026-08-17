export type Level = 1 | 2 | 3 | 4 | 5;

export const DIMENSION_ORDER = [
  "technical",
  "semantic",
  "organisational",
  "cultural",
  "strategic_governance",
] as const;

export type DimensionId = (typeof DIMENSION_ORDER)[number];

// Which wording the respondent saw throughout the assessment. Scoring,
// roadmap activities, and stored levels (1-5) are identical either way --
// only the displayed question/descriptor text differs.
export type WordingVariant = "technical" | "plainEnglish";

export type WordedText = Record<WordingVariant, string>;

export interface QuestionLevel {
  level: Level;
  text: WordedText;
}

export interface Question {
  id: string;
  number: number;
  text: WordedText;
  levels: QuestionLevel[];
}

export interface Dimension {
  id: DimensionId;
  name: string;
  questionCount: number;
  questions: Question[];
}

export interface AssessmentData {
  dimensions: Dimension[];
}

export interface RoadmapEntry {
  fromLevel: number;
  toLevel: number | null;
  activityId: string | null;
  activity: string;
  outcome: string | null;
}

export interface RoadmapData {
  dimensions: Record<string, Record<string, RoadmapEntry[]>>;
}

// ---- Assessment answers ----

export type AssessmentAnswers = Record<string, Level>; // questionId -> level

export interface DimensionTargets {
  shortTerm: Level;
  longTerm: Level;
}

export type TargetsByDimension = Record<DimensionId, DimensionTargets>;

// ---- Validation survey ----
// Internal Expert Validation Survey (Plain) -- see
// Internal_Expert_Validation_Survey_Plain.docx. Section A is Ceres-specific
// respondent context; Section B (utility/effectiveness/easeOfUse/generality)
// is worded identically to the external survey's own validation questions,
// so responses from both expert groups can be compared directly; Section C
// is supplementary, Ceres-context-specific.

export interface ValidationAnswers {
  // Section A -- about you
  yearsAtCeres: string;
  area: string | null;
  roleType: string | null;
  // Section B -- core DSR constructs
  utility: Level | null;
  effectiveness: Level | null;
  easeOfUse: Level | null;
  generality: Level | null;
  usefulnessText: string;
  // Section C -- additional context-expert questions
  problemValidity: Level | null;
  solutionFit: Level | null;
  roadmapValidity: Level | null;
  confidence: Level | null;
  concernsText: string;
}

export const EMPTY_VALIDATION: ValidationAnswers = {
  yearsAtCeres: "",
  area: null,
  roleType: null,
  utility: null,
  effectiveness: null,
  easeOfUse: null,
  generality: null,
  usefulnessText: "",
  problemValidity: null,
  solutionFit: null,
  roadmapValidity: null,
  confidence: null,
  concernsText: "",
};

// ---- Scores ----

export interface DimensionScore {
  dimensionId: DimensionId;
  average: number;
  currentLevel: Level; // rounded, clamped
  stageName: string;
}

export interface Scores {
  byDimension: Record<DimensionId, DimensionScore>;
  overall: number;
}

// ---- Full submission payload (flat, matches Table Storage model) ----

export interface SubmissionPayload {
  responseId: string;
  timestamp: string;
  consent: boolean;
  wordingVariant: WordingVariant;
  assessment: AssessmentAnswers;
  scores: Record<DimensionId, number> & { overall: number };
  goals: Record<`${DimensionId}_shortTerm` | `${DimensionId}_longTerm`, Level>;
  validation: ValidationAnswers | null;
}
