# Noticed, not changed

Problems found during the cleanup that were deliberately **left as they are** (the cleanup rules
forbid changing behaviour). Each should be fixed on its own branch, tested, and released on
purpose. File and line numbers refer to the `development` branch. **No secret values are
written here.** Front-end entries refer to the real production front end (Anshgala333/Startsy `main`, now in `frontend/`).

Severity: 🔴 critical (fix first) · 🟠 high · 🟡 medium · ⚪ low / tidy-up

## Security

| | Problem | Where |
|---|---|---|
| 🔴 | **Anyone can create an admin account.** `POST /admin/registerAdmin` needs no login, and the role (e.g. "Admin") is taken from the request. | `backend/src/routes/admin.routes.js:30`, `backend/src/controllers/adminControllers/addAdmin.js:5`, `:11` |
| 🔴 | **Anyone can reset anyone's password if they know the email.** `POST /api/forgotPassword` sets the new password without checking the OTP code on the server (the check happens only in the app). | `backend/src/routes/auth.routes.js:75`, `backend/src/controllers/authenticateUser/forgotPassword.js:8`, `:19` |
| 🔴 | **Anyone can delete any account.** `POST /api/deleteUserAccount/:id` needs no login and deletes whichever user ID is in the URL, with all their content. | `backend/src/routes/auth.routes.js:70`, `backend/src/controllers/authenticateUser/deleteUserAccount.js:16` |
| 🔴 | **Admin pages without login:** list unverified investors, approve/reject investors, list and delete reported posts, **export all users to a spreadsheet**, ratings, user counts. | `backend/src/routes/admin.routes.js:37`–`45` |
| 🟠 | One-off database maintenance endpoint `POST /test/addField` needs no login. | `backend/src/routes/test.route.js:29` |
| 🟠 | **The GitHub repository is public**, so all code, history and the files below are visible to anyone. | GitHub → Settings → General → Danger zone |
| 🟠 | **Real user data in the repository:** `userdetails.csv` holds 53 users' usernames, full names, roles and emails (also in git history). It looks like an old download from the open "export all users" endpoint, which sends a file with that name. | `backend/userdetails.csv`, `backend/src/controllers/adminControllers/Excel.js:27` |
| 🟠 | **Session signing key is written in the code** (public repo), instead of being a setting. | `backend/src/app.js:50` |
| 🟡 | Every request's login token is printed to the server log. | `backend/src/middleware/user.auth.middleware.js:15` |
| 🟡 | The admin check prints the whole user record (including password hash) to the log. | `backend/src/middleware/adminAuth.middleware.js:6` |
| 🟡 | Push-notification tokens are printed to the log. | `backend/src/utils/sendNotification.js:5` |
| 🟠 | **The server writes what users type at login, including their password, into the server log** ("yeh body mese hai"). The live server on Render does the same, so real passwords are likely in the Render logs. | `backend/src/controllers/authenticateUser/login.controller.js:6`, `:7` |
| 🟡 | Several app screens print login tokens to the phone log. | `frontend/SCREENS/NotVerified.js:18`, `main-1/Profile.js:23`, `main-1/Request.js:62`, `main-1/SeperateInvestor.js:144`, `main-2/SeperatePost.js:55`, `trial-1.js:104` |
| 🟡 | Server accepts requests from any website (CORS `*`). | `backend/src/app.js:36` |
| 🟡 | The refresh token is saved in plain form in the user's database record on each login. | `backend/src/controllers/authenticateUser/login.controller.js:45` |
| ⚪ | `frontend/.env` (public server address) and `frontend/google-services.json` (Firebase settings with an API key meant to ship inside the app) are committed to public repositories. | `frontend/.env`, `frontend/google-services.json` |

## Bugs (things that likely don't work)

| | Problem | Where |
|---|---|---|
| 🟠 | **Two sign-up steps send data to a developer's home network address** (`192.168.1.7`), not the real server, so these calls fail for real users (profile picture upload; community-member interests). | `frontend/SCREENS/signup5.js:224`; `frontend/SCREENS/signup6.js:129` |
| 🟠 | Freelancer sign-up calls `/freelancerInfo` (missing `/api/`), so it gets "not found". | `frontend/SCREENS/signup8.js:85` |
| ⚪ | Two entry files both claim the app's start page: the live `app/index.tsx` and an older `app/(tabs)/index.tsx`, which is still shipped in the app. | `frontend/app/index.tsx`, `frontend/app/(tabs)/index.tsx` |
| 🟡 | `forgotPassword` answers with a generic error 500 when the email doesn't exist, because it uses the user before checking it was found. | `backend/src/controllers/authenticateUser/forgotPassword.js:8`–`19` |
| 🟡 | **Google sign-in can't work:** the Google setup file is never loaded, so `/auth/google` has no strategy configured. | `backend/src/routes/google.auth.routes.js:11`, `:19`; `backend/src/config/passport.js` |
| ⚪ | `/posts/groupPhoto/:comid` is registered twice (the second never runs). | `backend/src/routes/post.routes.js:27`, `:40` |
| ⚪ | The screen registered as "Logout" is a leftover shopping-template page; it doesn't log out. | `frontend/app/index.tsx:307`, `frontend/SCREENS/Logout.js` |
| ⚪ | Some app calls use different capitalisation from the server (`deletepost`, `checkUserName`, `deleteUnAuthenticatedUser`). They work only because Express ignores case by default. | e.g. `frontend/SCREENS/Apnauser.js:484` |

## Reliability and speed

| | Problem | Where |
|---|---|---|
| 🟡 | The server stops at startup if `AES_KEY` is missing (read when the file loads). | `backend/src/utils/aes.js:10` |
| 🟡 | Midnight upvote reset loads **every user** and updates them one at a time, which gets slow as users grow. It runs inside the web server, so with several server copies it would run several times. | `backend/src/controllers/postControllers/upvotePost.js:12`–`18` |
| 🟡 | Keep-awake timer pings the live server address hard-coded in the code, also from local copies. | `backend/src/controllers/health/pingHealth.js:65`, `:67` |
| ⚪ | `jwt.verify` is used with `await` (it isn't asynchronous; harmless). | `backend/src/middleware/user.auth.middleware.js:25` |
| ⚪ | The app hides some React warnings globally, which can hide real problems. | `frontend/app/index.tsx:90`, `:99` |
| ⚪ | An 87 MB APK file is stored in git, which makes cloning slow. | `backend/src/APK/Startsy.apk` |

## Outdated, messy or confusing

| | Problem | Where |
|---|---|---|
| 🟡 | Back end has no `start` script, only `dev` (runs with `nodemon`, a development tool). Render's start command is set only in its dashboard. | `backend/package.json:8` |
| 🟡 | **Over-the-air updates are enabled:** `eas update` can change the code in installed apps. Treat it as a release. | `frontend/app.json:64`, `:67` |
| ⚪ | `eas.json` doesn't set `buildType: "apk"`, so how the current APK was produced isn't recorded. | `frontend/eas.json:12`–`22` |
| ⚪ | npm packages `crypto` and `os` are listed, but Node has these built in (the npm ones are deprecated placeholders). | `backend/package.json:20`, `:31` |
| ⚪ | Unusual app dependencies: `eas-cli` (a build tool, listed as an app dependency), `recat@0.0.0` (unknown placeholder package, worth checking), both `react-native-elements` and `@rneui/themed` (old and new versions of the same library). | `frontend/package.json:41`, `:113`, `:89`, `:37` |
| ⚪ | Expo SDK 52 / React Native 0.76 are older releases (the Play Store Expo Go now runs SDK 58); upgrading is a separate project. | `frontend/package.json:42` |
| ⚪ | `package-lock.json` is out of sync with `package.json` (missing Mac/Linux-only entries), so `npm ci` refuses to install. | `frontend/package-lock.json` |
| ⚪ | The only app test is broken: it tests a `ThemedText` file that no longer exists. | `frontend/components/__tests__/ThemedText-test.tsx:4` |
| ⚪ | Leftover screens are still registered in the app (`Modal1`, `F1`, `Test1`, `Logout`, `Date`), and `Main1` (older investor home) is registered but nothing opens it. | `frontend/app/index.tsx:249`–`321` |
| ⚪ | Duplicate copies of back-end files at the repository root on `develop/backend` (`package.json`, `cloudinary.js`, `aestest.js`). | repo root |
| ⚪ | About 30 unused variables in the back end (ESLint `no-unused-vars`), e.g. `roleMap`. | e.g. `backend/src/controllers/profileControllers/getUsersProfile.js` |
| ⚪ | API paths with typos that the app depends on (`/admin/getAllNewletters`, `/notification/getUserNotifiation`). Changing them needs a coordinated app + server release. | `backend/src/routes/admin.routes.js`, `notifications.routes.js` |
| ⚪ | No automated tests for either the app or the server. | — |

## Suggested order of fixing

1. The four 🔴 security holes (admin creation, password reset, account deletion, open admin pages).
2. Remove `userdetails.csv` and the hard-coded session key, consider making the repository private,
   and rotate any key that was ever committed.
3. The sign-up bugs (local network addresses, `/freelancerInfo`), since they affect new users.
4. Stop logging passwords, tokens and user records (and clear old Render logs).
5. Everything else, as time allows.
