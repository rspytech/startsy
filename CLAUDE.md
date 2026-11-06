# CLAUDE.md — rules for working on Startsy

The owner is a non-technical founder. Explain everything in plain English.

## What lives where

| Thing | Branch | Folder |
|---|---|---|
| Production back end (Express + MongoDB, hosted on Render at startsy.onrender.com) | `develop/backend` | `backend/` |
| Production front end (React Native / Expo app, shipped as an APK) | `Ansh-Final` | repo root |
| Cleanup work (both halves together) | `development` | `backend/` and `frontend/` |

Snapshots of production taken on 2026-11-07 (local tags):
- `production-snapshot-2026-11-07` → `develop/backend` @ 0b9f871
- `production-snapshot-2026-11-07-frontend` → `Ansh-Final` @ ef8d040

## HARD RULES (never break these)

1. Never commit, merge, rebase, push, force-push, delete or rename anything on production
   branches (`develop/backend`, `Ansh-Final`, `main`, and anything Render deploys from)
   until the founder explicitly says so.
2. Every commit goes on the `development` branch only. Before every commit, run
   `git branch --show-current` and confirm it says `development`.
3. Push only the `development` branch to origin. Never push any other branch or tag,
   and never use `--force`.
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
