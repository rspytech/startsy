# Cleanup log
> **⚠️ Out of date for the front end (2026-11-10):** the front-end parts of this document describe the older `Ansh-Final` code. The live app is built from Anshgala333/Startsy `main` (Expo SDK 52), which is now in `frontend/`. Screen names, files and line numbers below may differ.

Everything changed on the `development` branch compared with production, why, and how it was
checked. Production itself (`develop/backend`, `Ansh-Final`) was **not** changed.

- **Starting point:** `develop/backend` @ `0b9f871` (back end) + `Ansh-Final` @ `ef8d040` (front end),
  snapshotted 2026-11-07 as local tags `production-snapshot-2026-11-07` and
  `production-snapshot-2026-11-07-frontend`.
- **Goal:** same behaviour, easier to understand. No fixes, upgrades or new features.

## How "nothing changed" was checked

No server was started and no database was contacted. Instead:

**Back end** (after every commit):
- **Syntax and imports:** every file parses, and every import points to a file that exists with the
  exact same upper/lower case (Render runs Linux, which is case-sensitive). Named imports exist.
- **Route snapshot:** the app was loaded with timers disabled and fake settings, and the full list of
  endpoints was printed: method, path and the chain of checks and handlers. It had to match
  production exactly (102 endpoints).
- **Same program:** for formatting/comment commits, each file was parsed and its program structure
  compared with production, ignoring only spacing, comments and quote style.
- **Startup file list:** the set of files and packages loaded at startup was compared before and after.
- **Final sweep:** every text string (error messages, field and collection names) and every setting
  name was compared with production. Nothing was added. The only strings removed belonged to
  deleted dead files.

**Front end:**
- The Android JavaScript bundle (what goes inside the APK) was built from production and after each
  commit, then compared byte by byte, or as a program when only quote style differed.
- A full Hermes (bytecode) build, the format used in the APK, was run at the end and succeeded.
- `app.json`, `eas.json`, babel/Android/TypeScript config, `package.json`, the lock file and `.env`
  are byte-for-byte unchanged. No package was upgraded.

## Commits on `development`

| # | Commit | What and why | Check |
|---|---|---|---|
| 1 | `9d2d9fd` chore: copy production front end into `frontend/` | Puts both halves on one branch; exact copy of `Ansh-Final`. | git diff: identical |
| 2 | `6b4acec` chore: add CLAUDE.md and safety hooks | Written working rules; local hooks block commits/pushes to anything but `development`. | hooks tested |
| 3 | `27d6a2b` docs: `docs/ENDPOINTS.md` | Every endpoint listed **before** cleanup, as a reference. | n/a (docs) |
| 4 | `846114d` style: Prettier on back end | Consistent formatting. Adds `backend/.prettierrc.json`. Quotes around object keys preserved. | 162/162 files same program; routes identical |
| 5 | `d47b030` refactor: remove 30 unused imports | Imports nothing used. The modules they pointed to are still loaded elsewhere or do nothing on load. | routes identical; startup list only lost 2 do-nothing files |
| 6 | `1344cb9` chore: delete 9 dead back-end files | Never loaded anywhere: 3 fully commented out, 1 empty, 5 dead code (`RiskMetric.js`, `checkMessagePrivilege.js`, `connection.model.js`, `AppliedJobPeople.js`, `Apkcontroller.js`) + 2 commented-out route lines pointing at them. | routes identical; startup list unchanged |
| 7 | `f660de9` refactor: group controllers into topic folders | 39 files moved (names unchanged) out of `controllers/` root and the misleading `TestController/`/`CustomController/` folders into `authenticateUser/`, `onboardingControllers/`, `profileControllers/`, `postControllers/`, `chatControllers/`, `notificationController/`, `networkingConnectionsControllers/`, `reportControllers/`, `adminControllers/`, `feedbackControllers/`. Only import paths changed. | git shows only import lines changed; routes identical |
| 8 | `b7ba6bf` docs: back-end header comments | 34 files explain what they do and why. | 154/154 files same program |
| 9 | `568a571` docs: back-end README + ENDPOINTS file locations | How to run safely, settings (names only), folder map. | ENDPOINTS: only "Code:" lines changed |
| 10 | `98d6e8c` docs: `docs/SCREENS.md` | Every screen, what it does, endpoints it calls. | n/a (docs) |
| 11 | `04a1500` chore: delete 15 unused front-end files | Old pasted copies of screens (`.txt`), scratch HTML, an empty file, a stray `%ProgramData%` Windows folder, and `SCREENS/readmore-1.js`, `assets/icons/Mail.js`, `Extra-data/country.js` (nothing imports them). | bundle byte-identical |
| 12 | `7367ac4` style: Prettier on 86 front-end files | Consistent formatting. Adds `frontend/.prettierrc.json` (build config excluded). | each file compiled and compared; bundle program-identical |
| 13 | `b155657` docs: front-end header comments | 18 key files explained, including misleading ones. | bundle byte-identical to #12 |
| 14 | `07485cc` docs: front-end README | Replaces the Expo template README. | n/a (docs) |
| 15 | (this commit) docs: ARCHITECTURE, CLEANUP_LOG, NOTICED_NOT_CHANGED | Final documentation. | n/a (docs) |

## Deliberately left as is (and why)

| What | Why it was not changed |
|---|---|
| 22 front-end screens not auto-formatted (`Main1.js`, `Main2.js`, `Apnauser.js`, `logintrial.js`, `login2.js`, `Signup10.js`, `signup12.js`, `singleprofilepage.js`, `test1.js`, the three `edit profile pages`, `main-1/Card.js`, `Message.js`, `NewsLetter.js`, `Request.js`, `Startsy.js`, `main-2/Message.js`, `Newsletter.js`, `Profile.js`, `components/HelloWave.tsx`, `ParallaxScrollView.tsx`) | The formatter would re-wrap on-screen text (e.g. the login button `"Login "` became `"Login"` + `" "`). It looks the same, but it is not provably the same, so these files were left untouched. |
| Unused imports in the front end | Removing them changes the app bundle. Kept so the APK code stays provably identical. |
| Front-end folder layout (`SCREENS/`, `edit profile pages/` with spaces, etc.) | Moving files changes the bundle; risk not worth it for the shipped app. |
| Unused **variables** in the back end (~30) | Many hold the result of a database call; removing them means editing logic lines. |
| Misspelled names (`editFounderProfileAccoutDetails`, `startupPrefrencesMapping`, `getAllNewletters`, `getUserNotifiation`, `tittle`…) | Some are part of the API the app calls and must stay; the rest are cosmetic. |
| No files split | The longest back-end file is ~260 lines; nothing was "very long". |
| `backend/src/config/passport.js`, `backend/aestest.js` | Never loaded, but they are the only record of the intended Google login and a developer's manual test script. |
| Expo starter-template files (`components/Themed*`, `HelloWave`, …) | Unused by the app, but the project's only test (`npm test`) uses them. |
| Root-level duplicates on `develop/backend` (`/package.json`, `/cloudinary.js`, `/aestest.js`, `/readme`) | Render's settings aren't visible from the repo; can't be 100% sure Render never reads the repository root. |
| `backend/userdetails.csv`, `backend/src/APK/Startsy.apk` | Data files; see `NOTICED_NOT_CHANGED.md`. |
| ESLint config not committed | ESLint was run from a separate tools folder only, to avoid adding packages to the project. |

## Tools used (not part of the project)

Checks ran from a scratch folder outside the repository: acorn and @babel/parser (to read code),
Prettier 3.3.3, ESLint 9, and the project's own installed packages (`npm ci`, exact lock-file
versions) for the route snapshot and the Expo bundle builds.
