# Interoperability Maturity Self-Assessment — Ceres internal variant

A fork of [amc-dats/semantic-interoperability](https://github.com/amc-dats/semantic-interoperability)
for Ceres Power's internal respondents. Same React 19 + TypeScript + Vite
build, same 5-dimension assessment, results screen, and email opt-in as the
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
- **Same intro screen, video, assessment, results, and email opt-in** —
  copied unchanged from the general-audience app (same `VITE_VIDEO_URL`
  blob, same `assessment-data.json`/`roadmap-data.json`).
- **Results saved to a separate table, same storage account.**
  `submitAssessment` posts to `/api/submit-assessment-ceres` instead of
  `/api/submit-assessment` (see `src/lib/api.ts`) — same
  `interoperability-results` Function App and `semanticinteroperability`
  storage account as the general-audience app, but writing to a
  `ResponsesCeres` table instead of `Responses`, so the two respondent
  pools don't mix. `send-results` (the email endpoint) is shared unchanged
  between both apps. See the backend repo's README
  ([amc-dats/interoperability-results](https://github.com/amc-dats/interoperability-results))
  for the endpoint/table details.

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
- Repo variables `VITE_VIDEO_URL` and `VITE_API_BASE` are set to the same
  values as the general-audience app (same video, same Function App).
