# Interoperability Maturity Self-Assessment — Ceres internal variant

A fork of [amc-dats/semantic-interoperability](https://github.com/amc-dats/semantic-interoperability)
for Ceres Power's internal respondents. Same React 19 + TypeScript + Vite
build, same 5-dimension assessment and results screen as the
general-audience app — see that repo's README for the full architecture and
decision history. This README only documents what's different here.

## What's different from the general-audience app

- **No Business Context step.** Every respondent is from Ceres, so the
  demographic questions (industry sector, site structure, regulatory
  environment, etc.) don't apply. The wording-variant choice (technical vs.
  plain-English) that used to live on that screen is kept, on its own,
  simpler "Before you start" screen (`src/components/AssessmentSetupScreen.tsx`).
- **Feedback form replaced.** Instead of the general app's 4-question
  validation survey, this uses the **Internal Expert Validation Survey
  (Plain)** (`../Internal_Expert_Validation_Survey_Plain.docx`) — 13
  questions across three sections: about-you context (time at Ceres, area,
  role type), the same four core DSR-evaluation questions as the external
  survey (worded identically so the two respondent groups are directly
  comparable), and Ceres-specific supplementary questions (problem
  validity, solution fit, roadmap validity, confidence, open-ended
  concerns). See `src/components/ValidationScreen.tsx` and the
  `ValidationAnswers` shape in `src/types.ts`.
- **Same intro screen, video, assessment, and results** — copied from the
  general-audience app (same `VITE_VIDEO_URL`, same
  `assessment-data.json`/`roadmap-data.json`). The results screen has a
  "Print or save as PDF" button; the earlier results-by-email step has been
  removed from both apps.
- **No company-code step.** Company codes exist in the general-audience app
  only.
- **Results saved to the same backend, separate survey.** In production
  `submitAssessment` posts to `https://mellocosta.com/interop/save.php?survey=internal`
  (see `src/lib/api.ts`). This is the same PHP/MySQL backend as the
  general-audience app (it replaced the earlier Azure Function app), but rows
  are stored with `survey = 'internal'`, so the two respondent pools don't
  mix. Locally, with `VITE_API_BASE` unset, it posts to the mock server's
  `/api/submit-assessment-ceres`. See the general-audience repo's README for
  the backend details.

## Running it

Same as the general-audience app:

```
npm install
npm run dev:all     # http://localhost:5173/semantic-interoperability-ceres/ (or next free port)
```

## Deployment

- Repo: `https://github.com/amc-dats/semantic-interoperability-ceres`
  (public, for GitHub Pages Free-plan hosting).
- `.github/workflows/deploy-pages.yml` — identical to the general-audience
  app's, deploys on push to `main`.
- `vite.config.ts` sets `base: '/semantic-interoperability-ceres/'`.
- Live at `https://amc-dats.github.io/semantic-interoperability-ceres/`.
- Repo variables `VITE_VIDEO_URL` (`https://mellocosta.com/interop/Interoperability_Intro_HD.mp4`)
  and `VITE_API_BASE` (`https://mellocosta.com/interop`) are set to the same
  values as the general-audience app. Changing a variable only takes effect
  after the "Deploy to GitHub Pages" workflow is re-run.
