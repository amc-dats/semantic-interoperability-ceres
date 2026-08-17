# Iterations

This repo is a fork of [amc-dats/semantic-interoperability](https://github.com/amc-dats/semantic-interoperability) —
see that repo's `ITERATIONS.md` for the full build history (brief → local
prototype → wording toggle → real backend → GitHub Pages). This file only
logs what happened in the fork itself.

---

## Fork created for Ceres's internal respondents

Forked from `semantic-interoperability` at the point where it had a real
backend, real video, and both wording variants. Changes made in the fork:

- Removed the Business Context step (`BusinessContextScreen.tsx` →
  `AssessmentSetupScreen.tsx`, stripped to just the wording-variant choice)
  since every respondent here is from Ceres — the demographic questions
  don't apply and `BusinessContext` was removed from the type model
  entirely.
- Replaced the 4-question external validation survey with the 13-question
  **Internal Expert Validation Survey (Plain)**, transcribed from
  `Internal_Expert_Validation_Survey_Plain.docx` (Sections A/B/C — about
  you, core DSR constructs shared with the external survey, and
  Ceres-specific supplementary questions).
- Repointed `submitAssessment` at a new `/api/submit-assessment-ceres`
  backend route so responses land in a separate `ResponsesCeres` table on
  the same storage account, rather than mixing with the general-audience
  app's `Responses` table. Backend changes (new route, parameterised table
  client, new flatten logic) live in
  [amc-dats/interoperability-results](https://github.com/amc-dats/interoperability-results).
- Intro screen, video, 5-dimension assessment, results screen, and email
  opt-in carried over unchanged.
- New repo (`amc-dats/semantic-interoperability-ceres`), same deploy-pages
  workflow, `vite.config.ts` base updated to
  `/semantic-interoperability-ceres/`.
