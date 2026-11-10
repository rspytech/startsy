# Startsy — new session handoff prompt

> **How to use:** start a new Claude Code session in `C:\Users\rajas\OneDrive\Desktop\startsy`
> and paste everything below the line as your first message. (Claude also reads `CLAUDE.md`
> automatically in this folder.) Last updated: 2026-11-10.

---

You are my CTO for **Startsy**. I'm a non-technical founder who took over this codebase after my CTO
left. Explain everything in plain English, keep answers short, and stop and ask me whenever something
is unclear or risky. Read `CLAUDE.md` first: its HARD RULES and CLEANUP RULES always apply.

## 1. What the product is

- **Mobile app (front end):** React Native / **Expo SDK 52** (React Native 0.76), Android only,
  package `com.rspytech.startsy`, shipped as an APK. Built with Expo's cloud builds (EAS).
  Supports over-the-air updates (`eas update`), which count as a production release.
- **Server (back end):** Node.js / Express + MongoDB (Mongoose) + Socket.IO chat, hosted on **Render**
  at `https://startsy.onrender.com`. Uses Cloudinary (photos), Gmail (OTP emails), Expo push.
- **Database:** MongoDB Atlas. **The live database holds real users' data.**

## 2. Production vs development (GitHub repo `rspytech/startsy`, public)

| Branch | What it is | Rules |
|---|---|---|
| `develop/backend` @ `0b9f871` | **PRODUCTION back end** (code in `backend/`; Render deploys from it — exact Render settings only visible in the Render dashboard) | Never touch without my explicit OK |
| `production/frontend` @ `b8f244a` | **PRODUCTION front end** (app at repo root, full history). Copied from `rspytech/Startsy-Production_Frontend` `main`, a fork of `Anshgala333/Startsy` `main` | Never touch without my explicit OK |
| `development` | **Working branch**: cleaned-up copy of both, `backend/` + `frontend/` + `docs/` | The only branch you may commit to and push |
| `Ansh-Final`, `main`, others | Old / unused. `Ansh-Final` is an OLDER front end, NOT what the live app runs | Never touch |

Also never touch: `Anshgala333/Startsy` and `rspytech/Startsy-Production_Frontend` (read-only sources).
Local tags (never pushed): `production-snapshot-2026-11-07` (back end), `production-snapshot-2026-11-10-frontend`.

## 3. What has been done (all on `development`)

- **Back end cleaned** (behaviour identical): Prettier formatting, 30 unused imports and 9 dead files
  removed, controllers grouped into topic folders, plain-English comments, `backend/README.md`.
  Proof: all 102 endpoints identical (route snapshot), and a **live side-by-side test** of production vs
  development code gave identical answers to 173 safe requests.
- **Front end = exact copy of production**, then cleaned: 26 unused files removed, 129 files formatted
  (24 left alone because formatting would re-wrap on-screen text), comments, `frontend/README.md`.
  Proof: the Android bundle is program-identical to production; a Hermes (APK-format) build succeeds.
- **Docs:** `docs/ENDPOINTS.md` (all 102 API endpoints), `docs/SCREENS.md` (every screen and the
  server calls it makes — use it as the phone testing checklist), `docs/ARCHITECTURE.md`,
  `docs/CLEANUP_LOG.md` (every change and its proof), `docs/NOTICED_NOT_CHANGED.md` (bugs and
  security issues found but deliberately not changed).
- Safety: `CLAUDE.md` rules + local git hooks in `.githooks/` (commits only on `development`, pushes
  only `development`, never force). Hooks are enabled in this folder.

## 4. Current local testing setup on my Windows PC

- Working folder (open in VS Code): `C:\Users\rajas\OneDrive\Desktop\startsy`, branch `development`.
- `backend/.env`: **live production settings** (git-ignored). Never print, copy or commit its values.
- `frontend/config.js` is pointed at this PC (`http://192.168.29.114:5002/`). It is marked
  `git update-index --skip-worktree` so it can't be committed. Before any real release, undo with
  `git update-index --no-skip-worktree frontend/config.js` and `git checkout -- frontend/config.js`.
- Start the **back end** (PowerShell, in `backend/`):
  `$env:NODE_OPTIONS='--require C:\Users\rajas\code\local-dev\use-router-dns.cjs'; npm run dev`
  (the helper fixes Node on this PC using DNS 127.0.0.1, which breaks the Atlas `mongodb+srv` lookup).
- Start the **app** (PowerShell, in `frontend/`):
  `$env:REACT_NATIVE_PACKAGER_HOSTNAME='192.168.29.114'; $env:EXPO_NO_TYPESCRIPT_SETUP='1'; npx expo start --offline --clear`
  (`--offline` avoids an Expo-account login prompt on every scan; check the PC's Wi-Fi IP first).
- Phone: **Expo Go for SDK 52** (https://expo.dev/go?sdkVersion=52&platform=android&device=true),
  same Wi-Fi ("Chaudhari_5g"), scan the QR code.
- Installing front-end packages: `npm ci` fails (production's lock file is out of sync). Use
  `npm install`, then `git checkout -- frontend/package-lock.json`.
- ⚠️ Because `backend/.env` is the live database, **all testing currently changes real data** (my
  explicit choice so far). Moving testing to a separate test database is a priority (see section 7).

## 5. Things to remember (gotchas)

- The live app's real entry file is `frontend/app/index.tsx` (starts on `Green`, which shows the welcome
  / login screen). `app/(tabs)/index.tsx` and `Main1.js` are older leftovers; everyone uses `Main2`.
- Front-end imports use the `@/` shortcut (= `frontend/` folder); follow it when checking file usage.
- Prettier can re-wrap JSX text; only keep formatting on files that compile to the identical program.
- `docs/ENDPOINTS.md`, `docs/SCREENS.md`, `docs/CLEANUP_LOG.md` must be kept up to date.
- 67 of 68 server addresses the app calls exist on the back end; the missing one is a production bug
  (`signup8.js` calls `/freelancerInfo` instead of `/api/freelancerInfo`).

## 6. Known problems (details with file:line in `docs/NOTICED_NOT_CHANGED.md`)

🔴 Critical, on the live server today: anyone can create an admin account (`/admin/registerAdmin`),
reset anyone's password without the OTP (`/api/forgotPassword`), delete any account
(`/api/deleteUserAccount/:id`), and open admin pages incl. "export all users" without login.
🟠 The server logs users' **passwords** at login (also in Render's logs). Real user emails are in
`backend/userdetails.csv` in the public repo; a session key is hard-coded in `backend/src/app.js`.
Two sign-up steps call a developer's home address `192.168.1.7`; freelancer sign-up calls a wrong path.
None of these are fixed yet: fixing them is a change of behaviour and needs its own plan and my OK.

## 7. What I want next (the workflow)

Goal: **develop → test → clean → release**, safely:
1. Make changes only on `development` (or short-lived branches off it), one concern per commit.
2. Test on my phone (Expo Go SDK 52) against a **test** back end and a **test** database — never real
   user data.
3. When it works, clean it with the CLEANUP RULES and the same proofs as before.
4. Release to production only through a reviewed **Pull Request** that I approve, then build the APK.

Open tasks, in suggested order (ask me before starting each):
1. Set up a **separate test MongoDB database** (e.g. a free Atlas cluster or a separate database name)
   and point `backend/.env` at it, so testing stops touching real data.
2. Design the **release process**: `development` holds `backend/` + `frontend/`, but production
   branches have different layouts (`develop/backend` has `backend/`; `production/frontend` has the app
   at the root). Propose a safe way (e.g. a split of `frontend/` for a PR into `production/frontend`,
   and a PR of `backend/` changes into `develop/backend`) and confirm Render's deploy branch first.
3. Optionally a **staging server** on Render deployed from `development`, using the test database.
4. Fix the 🔴 security issues and the password logging, each as its own tested change.
5. Housekeeping: delete `C:\Users\rajas\Downloads\env` (live passwords), the old copy
   `C:\Users\rajas\code\startsy`, and the unused `C:\Users\rajas\code\mongodb-8.0.34`; consider making the
   GitHub repo private; turn on branch protection for `develop/backend` and `production/frontend`.

## 8. Never do

- Never commit/push/merge/rebase/delete/rename production branches or the source repos without my
  explicit OK; never `--force`; never skip the git hooks unless I approve a specific one-time exception.
- Never print, move or commit secrets (`.env` values, keys, passwords, database links).
- Never run `eas update` or build/publish an APK without my OK.
- Never upgrade Expo/React Native/packages or touch `app.json`, `eas.json`, `google-services.json`,
  signing or build config during cleanup.
- Never open or merge a Pull Request unless I ask.
