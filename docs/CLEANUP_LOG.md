# Cleanup log

Everything changed on the `development` branch compared with production, why, and how it was
checked. Production itself was **not** changed.

- **Production back end:** `develop/backend` @ `0b9f871` (local tag `production-snapshot-2026-11-07`).
- **Production front end:** Anshgala333/Startsy `main` @ `b8f244a` (Expo SDK 52), forked to
  rspytech/Startsy-Production_Frontend and copied into this repo as branch `production/frontend`
  (local tag `production-snapshot-2026-11-10-frontend`).
  An earlier cleanup was done on the older `Ansh-Final` branch by mistake; it was replaced on
  2026-11-10 when the real production front end was found (commits 1, 10–14 below are superseded).
- **Goal:** same behaviour, easier to understand. No fixes, upgrades or new features.

## How "nothing changed" was checked

No server was started for the checks and no database was contacted. Instead:

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
  name was compared with production. Nothing was added; only strings in deleted dead files went away.
- **Live side-by-side test (2026-11-10):** production code and development code ran together on the
  live database; 173 safe (non-writing) requests got identical answers.

**Front end** (real production code, after every commit):
- The Android JavaScript bundle (what goes inside the APK) was built from production twice (repeatable,
  byte-identical) and again after each commit, then compared byte by byte, or as a program when only
  quote style differed (7.5 million syntax-tree tokens compared).
- Every reformatted file was also compiled on its own with the app's Babel preset and compared.
- A full Hermes (bytecode) build, the format used in the APK, was run at the end.
- `app.json`, `eas.json`, `google-services.json`, babel/Android/TypeScript config, `package.json`,
  the lock file, `.env` and `config.js` are byte-for-byte unchanged. No package was upgraded.

## Commits on `development`

| # | Commit | What and why | Check |
|---|---|---|---|
| 1 | `9d2d9fd` chore: copy `Ansh-Final` into `frontend/` | First copy of the front end (later found to be the older version). | superseded by #16 |
| 2 | `6b4acec` chore: add CLAUDE.md and safety hooks | Written working rules; local hooks block commits/pushes to anything but `development`. | hooks tested |
| 3 | `27d6a2b` docs: `docs/ENDPOINTS.md` | Every endpoint listed **before** cleanup, as a reference. | n/a (docs) |
| 4 | `846114d` style: Prettier on back end | Consistent formatting. Adds `backend/.prettierrc.json`. Quotes around object keys preserved. | 162/162 files same program; routes identical |
| 5 | `d47b030` refactor: remove 30 unused imports | Imports nothing used. The modules they pointed to are still loaded elsewhere or do nothing on load. | routes identical |
| 6 | `1344cb9` chore: delete 9 dead back-end files | Never loaded anywhere (3 fully commented out, 1 empty, 5 dead code) + 2 commented-out route lines. | routes identical; startup list unchanged |
| 7 | `f660de9` refactor: group controllers into topic folders | 39 files moved (names unchanged) into topic folders. Only import paths changed. | routes identical |
| 8 | `b7ba6bf` docs: back-end header comments | 34 files explain what they do and why. | 154/154 files same program |
| 9 | `568a571` docs: back-end README + ENDPOINTS file locations | How to run safely, settings (names only), folder map. | n/a (docs) |
| 10–14 | `98d6e8c` … `07485cc` | Cleanup of the older `Ansh-Final` front end. | superseded by #16 |
| 15 | `ef7da7d` docs: ARCHITECTURE, CLEANUP_LOG, NOTICED_NOT_CHANGED | First documentation pass. | n/a (docs) |
| 16 | `fa0eb9a` chore: replace front end with the real production code | `frontend/` = exact copy of Anshgala333/Startsy `main` @ `b8f244a`. | file-for-file identical |
| 17 | `9123027`, `e22ad1d` docs: point rules/docs at the real front end | CLAUDE.md, ARCHITECTURE and fork name. | n/a (docs) |
| 18 | `664ca7f` docs: rewrite `docs/SCREENS.md` | Every real screen, what it does, endpoints it calls. | n/a (docs) |
| 19 | `76c3372` chore: delete 26 unused front-end files | Old pasted copies of screens (`.txt`), scratch HTML, a stray `%ProgramData%` Windows folder, and 14 code files nothing imports (e.g. `Homescreen.js`, `Requests.js`, `main-2/Profile.js`, `Postrender.js`, unused icons/styles). `@/` shortcut imports were followed too. | bundle byte-identical |
| 20 | `468bdcc` style: Prettier on 129 front-end files | Consistent formatting. Adds `frontend/.prettierrc.json`. | each file compiled and compared; bundle program-identical |
| 21 | `084aa2e` docs: front-end header comments | 24 key files explained, including misleading ones (Logout.js, Main1, Skeleton1). | bundle byte-identical to #20 |
| 22 | `38e9d30` docs: front-end README | Replaces the Expo template README. | n/a (docs) |
| 23 | (this commit) docs: update CLEANUP_LOG, NOTICED_NOT_CHANGED, SCREENS | Documentation for the real front end. | bundle byte-identical (comment fix) |

## Deliberately left as is (and why)

| What | Why it was not changed |
|---|---|
| 24 front-end files not auto-formatted (`Apnauser.js`, `Main1.js`, `Settings.js`, `Signup10.js`, `Signup13.js`, `signup12.js`, `login2.js`, `logintrial.js`, `singleprofilepage.js`, `test1.js`, `trial-1.js`, `JASH/terms-condition/TermsAndCondition.jsx`, the three `edit profile pages`, `main-1/Card.js`, `Message.js`, `NewsLetter.js`, `Request.js`, `main-2/Foryou.js`, `Message.js`, `Newsletter.js`, `SeperatePost.js`, `Upvotedata.js`) | The formatter would re-wrap on-screen text (e.g. `"Login "` became `"Login"` + `" "`). It looks the same, but it is not provably the same. |
| Unused imports in the front end | Removing them changes the app bundle. Kept so the APK code stays provably identical. |
| Front-end folder layout and file names (`SCREENS/`, `JASH/`, `edit profile pages/` with spaces) | Moving files changes the bundle; risk not worth it for the shipped app. |
| `app/(tabs)/index.tsx` (older entry file) and `Main1.js` (older investor home) | Still part of the app bundle (Expo Router includes every file in `app/`); removing them changes what is shipped. |
| Expo starter-template leftovers and the broken template test | Not used by the app; left for a later, separate decision. |
| `package-lock.json` out of sync (`npm ci` refuses) | Fixing it means editing the lock file; production is kept exactly as is. Use `npm install` and restore the lock file. |
| Unused **variables** in the back end (~30) | Many hold the result of a database call; removing them means editing logic lines. |
| Misspelled names (`getAllNewletters`, `getUserNotifiation`, `SeperatePost`, …) | Some are part of the API; the rest are cosmetic. |
| `backend/src/config/passport.js`, `backend/aestest.js` | Never loaded, but the only record of the intended Google login and a manual test script. |
| Root-level duplicates on `develop/backend` | Render's settings aren't visible from the repo. |
| `backend/userdetails.csv`, `backend/src/APK/Startsy.apk` | Data files; see `NOTICED_NOT_CHANGED.md`. |

## Tools used (not part of the project)

Checks ran from a scratch folder outside the repository: acorn and @babel/parser (to read code),
Prettier 3.3.3, ESLint 9, the app's own Babel preset, and the project's own installed packages for
the route snapshot and the Expo bundle builds.
