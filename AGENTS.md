<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

CS-Hub is a single-package, client-only Next.js 16 (App Router, Turbopack) learning app. There is no backend, database, API, or auth — user progress and theme are persisted in the browser's `localStorage` only. The only runtime service is the Next.js dev server.

- Run the dev server with `npm run dev` (serves on http://localhost:3000). Standard scripts (`dev`/`build`/`start`/`lint`) are in `package.json`.
- `npm run lint` reports a few `import/no-anonymous-default-export` warnings in `src/content/**/index.ts`; these are pre-existing warnings, not errors.
- Since progress lives in `localStorage`, exercise/verify core flows (quizzes, level unlocking) in the browser rather than via API calls.
