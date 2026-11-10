# CLAUDE.md — rules for working on Startsy

The owner is a non-technical founder. Explain everything in plain English.

## What lives where

| Thing | Branch | Folder |
|---|---|---|
| Production back end (Express + MongoDB, hosted on Render at startsy.onrender.com) | `develop/backend` | `backend/` |
| Production front end (React Native / Expo SDK 52 app, shipped as an APK) | `production/frontend` in this repo (copied 2026-11-10 from rspytech/Startsy-Production_Frontend `main`, itself a fork of https://github.com/Anshgala333/Startsy) | repo root |
| Older front end (NOT what the live app runs) | `Ansh-Final` in this repo | repo root |
| Cleanup work (both halves together) | `development` | `backend/` and `frontend/` |

Snapshots of production (local tags):
- `production-snapshot-2026-11-07` → `develop/backend` @ 0b9f871 (back end)
- `production-snapshot-2026-11-10-frontend` → Anshgala333/Startsy `main` @ b8f244a (real production front end, = `production/frontend`)
- `production-snapshot-2026-11-07-frontend` → `Ansh-Final` @ ef8d040 (older front end, superseded)

Since 2026-11-10, `frontend/` on `development` is an exact copy of Anshgala333/Startsy `main`
(commit fa0eb9a). The earlier front-end cleanup was done on `Ansh-Final` and no longer applies.

## HARD RULES (never break these)

1. Never commit, merge, rebase, push, force-push, delete or rename anything on production
   branches (`develop/backend`, `production/frontend`, `Ansh-Final`, `main`, and anything Render deploys from),
   nor on any branch of Anshgala333/Startsy or rspytech/Startsy-Production_Frontend,
   until the founder explicitly says so.
2. Every commit goes on the `development` branch only. Before every commit, run
   `git branch --show-current` and confirm it says `development`.
3. Push only the `development` branch to origin. Never push any other branch or tag,
   and never use `--force`. (One founder-approved exception on 2026-11-10: the new branch
   `production/frontend` was created once, by a normal push.)
4. Never connect to or run anything against the production database. Never print, move
   or commit secrets (keys, passwords, database links). Refer to them by variable name only.
5. If anything is unclear or risky, stop and ask the founder.

Local git hooks in `.githooks/` enforce rules 2 and 3. Enable them once per clone with:
`git config core.hooksPath .githooks`

## CLEANUP RULES (for the `development` branch)

Goal: same behavior and logic as production, but cleaner and easier to understand.
Do not optimize, fix, upgrade or add features.

Allowed:
- Consistent formatting (add Prettier/ESLint config only if absent; auto-format only)
- Clearer names for files, variables and functions, when the rename is safe and every
  reference is updated
- Splitting very long files or functions into smaller ones with identical behavior
- Removing unused imports, variables and files, only when 100% sure they are unused
- Plain-English comments explaining what and why
- A logical folder structure (routes, controllers, models, utils) with imports updated
- README files explaining how to run things

Forbidden:
- Changing API routes or request/response shapes
- Changing database collection or field names
- Changing business logic or the authentication flow
- Changing environment variable names
- Changing dependency versions
- Changing user-facing error messages
- Adding or removing features

Front end, additionally:
- No visible changes to screens, text, styling or navigation
- Do not upgrade Expo, React Native or any package
- Do not touch `app.json`, `eas.json`, signing or build config

Method:
- One small concern per commit, with clear messages (e.g. `refactor: split user routes into controller`).
- After each commit, verify nothing broke. With no test database, do not start the server;
  use static checks (syntax check, lint, imports resolve, front-end bundles).
- Keep `docs/ENDPOINTS.md` (every API endpoint) and `docs/SCREENS.md` (every screen) up to date.
- Never open a PR or merge anything unless the founder asks.
