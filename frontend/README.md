# Startsy mobile app (front end)

The Android app users install as an APK. Built with **React Native** using **Expo SDK 52**
(React Native 0.76). Android package name: `com.rspytech.startsy`.

Source of truth: this folder is an exact copy of https://github.com/Anshgala333/Startsy (`main`,
commit b8f244a), forked to rspytech/Startsy-Production_Frontend, plus cleanup that keeps the app's
behaviour identical (see `docs/CLEANUP_LOG.md`).

The app talks to the back end at the address in `config.js` (`https://startsy.onrender.com/`) and
uses a live Socket.IO connection to the same address for chat.

## How to run it on your computer

1. Install [Node.js](https://nodejs.org) (18 or newer) and, on an Android phone, **Expo Go for SDK 52**
   (https://expo.dev/go?sdkVersion=52&platform=android&device=true). The Play Store version may be a
   different SDK.
2. Install the packages in this `frontend/` folder:
   ```bash
   npm install
   ```
   `npm ci` refuses to run here because `package-lock.json` is missing a few Mac/Linux-only entries.
   `npm install` uses the versions in the lock file anyway; afterwards, undo its lock-file edits so
   the project stays identical to production:
   ```bash
   git checkout -- package-lock.json
   ```
3. Start the development server:
   ```bash
   npx expo start
   ```
   Scan the QR code with Expo Go (phone on the same Wi-Fi as the computer).

> **Careful:** by default the app talks to the **live** server and database (see `config.js`).
> Anything you post, upvote or delete while testing is real. To use a server on your own computer,
> change `config.js` locally and never commit that change.

## How the APK is built

Builds use Expo's cloud build service (EAS) with `app.json` and `eas.json`. **Do not change these
files, `google-services.json` (Firebase push notifications) or `babel.config.js` as part of cleanup.**

- The app includes **expo-updates**, so JavaScript changes can be pushed to installed apps "over the
  air" with `eas update`. Treat `eas update` like a production release.
- Push notifications: `app/index.tsx` asks for permission, gets the phone's Expo push token and saves
  it on the server (`POST /api/updateNotificationToken`).

## How the code is organised

```
frontend/
├── app/index.tsx          START HERE: every screen (navigation stack), push-notification setup
├── app/(tabs)/index.tsx   older entry file, not the live one
├── config.js              server address
├── SCREENS/               every screen (see docs/SCREENS.md)
│   ├── greenscreen.js     first screen: welcome / login, or straight to the home screen
│   ├── logintrial.js      welcome screen with Log in / Create account / Terms & Conditions
│   ├── Main2.js           home screen with bottom tabs (used by everyone)
│   ├── Main1.js           older investor home screen (nothing opens it any more)
│   ├── main-1/, main-2/   tabs, feed items and chat screens
│   ├── JASH/              jobs, applicants, group details, terms & conditions, view post
│   └── edit profile pages/  editing profiles
├── Global/                app-wide shared data and the shared chat connection
├── components/, styles/   reusable pieces and shared style sheets
├── assets/                fonts, images, SVG icons
└── app.json, eas.json, google-services.json, babel.config.js, react-native.config.js,
    withAndroidSoftInputMode.js   build configuration: do not touch during cleanup
```

Expo starter-template leftovers (`constants/Colors.ts`, `hooks/useColorScheme*`, `hooks/useThemeColor.ts`,
`components/navigation/TabBarIcon.tsx`) are not used by the app. The only test
(`components/__tests__/ThemedText-test.tsx`) is already broken in production: the `ThemedText` file it
tests no longer exists.

## Formatting

Style settings are in `.prettierrc.json`. Some screens were deliberately **not** auto-formatted
because the formatter would re-wrap on-screen text (see `docs/CLEANUP_LOG.md`).

## More documentation

- `docs/SCREENS.md`: every screen, what it does and which server endpoints it calls
- `docs/ENDPOINTS.md`: every server endpoint
- `CLAUDE.md`: working rules for this repository
