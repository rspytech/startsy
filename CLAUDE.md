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

`frontend/` on `development` = production front end (`production/frontend` @ b8f244a, copied in
commit fa0eb9a) **plus a behaviour-identical cleanup** (commits 76c3372..dc3c251: 26 unused files
removed, 129 files formatted, comments, README; the Android bundle was proven program-identical).
`backend/` on `development` = `develop/backend` plus its cleanup (all 102 endpoints proven identical).
Full history and proofs: `docs/CLEANUP_LOG.md`. The earlier front-end cleanup of `Ansh-Final` no longer applies.
New Claude session? Also read `docs/SESSION_HANDOFF.md`.

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
- Do not upgrade Expo (SDK 52), React Native (0.76) or any package
- Do not touch `app.json`, `eas.json`, `google-services.json`, `babel.config.js`, signing or build config
- Prove every front-end change with a before/after Android bundle build (`npx expo export --platform android
  --no-bytecode`): byte-identical, or program-identical when only quote style differs.
- Prettier can re-wrap on-screen JSX text: keep formatting only on files that compile to the identical
  program (24 screens were deliberately left unformatted; see `docs/CLEANUP_LOG.md`).

## Front-end facts (production code in `frontend/`)

- Real entry file: `frontend/app/index.tsx` (registers every screen, starts on `Green`, sets up push
  notifications). `app/(tabs)/index.tsx` is an older leftover entry file; `Main1.js` is never opened;
  everyone uses `Main2`. Screens and their server calls: `docs/SCREENS.md`.
- Imports use the `@/` shortcut (= the `frontend/` folder). Any "is this file used?" check must follow it.
- `npm ci` fails (production's `package-lock.json` is out of sync). Use `npm install`, then
  `git checkout -- frontend/package-lock.json` so the lock file stays identical to production.
- Test on a phone with **Expo Go for SDK 52**. On this Windows PC start Expo with
  `$env:REACT_NATIVE_PACKAGER_HOSTNAME='<PC Wi-Fi IP>'; $env:EXPO_NO_TYPESCRIPT_SETUP='1'; npx expo start --offline --clear`.

## Local testing setup (founder's PC: `C:\Users\rajas\OneDrive\Desktop\startsy`)

- `frontend/config.js` is changed locally to point at the PC's back end and is hidden from git with
  `git update-index --skip-worktree`. It must never be committed; undo with `--no-skip-worktree` and
  `git checkout -- frontend/config.js` when testing ends.
- `backend/.env` (git-ignored) currently holds the **live production settings**: the founder explicitly
  chose (2026-11-07) to test locally against the live database. This is the only exception to rule 4;
  do not widen it, never print its values, and remind the founder that a separate test database is the
  priority. Start the back end with
  `$env:NODE_OPTIONS='--require C:\Users\rajas\code\local-dev\use-router-dns.cjs'; npm run dev`
  (fixes Node's broken DNS on this PC for the Atlas `mongodb+srv` address).

Method:
- One small concern per commit, with clear messages (e.g. `refactor: split user routes into controller`).
- After each commit, verify nothing broke. With no test database, do not start the server;
  use static checks (syntax check, lint, imports resolve, front-end bundles).
- Keep `docs/ENDPOINTS.md` (every API endpoint) and `docs/SCREENS.md` (every screen) up to date.
- Never open a PR or merge anything unless the founder asks.
