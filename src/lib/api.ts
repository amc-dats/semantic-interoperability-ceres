import type { SubmissionPayload } from "../types";

// Production: VITE_API_BASE is https://mellocosta.com/interop and responses go
// to save.php there. Local dev: left empty, and Vite's dev-server proxy
// forwards /api/* to the local mock backend (see vite.config.ts and
// server/index.js).
const API_BASE = import.meta.env.VITE_API_BASE ?? "";
const SUBMIT_PATH = API_BASE ? "/save.php?survey=internal" : "/api/submit-assessment-ceres";

async function postJson<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`Request to ${path} failed with status ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export function submitAssessment(
  payload: SubmissionPayload,
): Promise<{ ok: true; responseId: string }> {
  return postJson(SUBMIT_PATH, payload);
}
