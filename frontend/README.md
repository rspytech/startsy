# Startsy mobile app (front end)

The Android app users install as an APK. Built with **React Native** using **Expo** (SDK 51,
React Native 0.74.5). Android package name: `com.rspytech.startsy`.

It talks to the back end at the address in `config.js` (`https://startsy.onrender.com/`) and uses
a live Socket.IO connection to the same address for chat.

## How to run it on your computer

1. Install [Node.js](https://nodejs.org) (version 18 or newer) and the **Expo Go** app on an Android phone,
   or an Android emulator from Android Studio.
2. In this `frontend/` folder, install the exact package versions from the lock file:
   ```bash
   npm ci
   ```
3. Start the development server:
   ```bash
   npx expo start
   ```
   Scan the QR code with Expo Go, or press `a` to open the Android emulator.

> **Careful:** a locally running app still talks to the **live** server and database by default
> (see `config.js`). Anything you post, upvote or delete while testing is real. To test safely,
> point `config.js` at a test copy of the back end on your own machine (and don't commit that change).

Some native libraries used by the app may not run inside Expo Go; in that case use a development
build (`eas build --profile development`).

## How the APK is built

Builds use Expo's cloud build service (EAS). Settings are in `app.json` and `eas.json`.
**Do not change those files as part of cleanup.**

- `eas.json` has three profiles: `development`, `preview` and `production`. None of them sets
  `buildType: "apk"`, so EAS would produce an `.aab` (Play Store format) by default. How the
  current APK was produced is not recorded in this repository; check the builds list on expo.dev.
- `requireCommit: true`: EAS refuses to build with uncommitted changes.
- The app includes **expo-updates** with a `runtimeVersion` and `updates` settings in `app.json`,
  which means JavaScript changes can be pushed to installed apps "over the air" with `eas update`.
  Treat `eas update` like a production release.

## How the code is organised

```
frontend/
├── app/(tabs)/index.tsx   START HERE: the list of every screen (navigation stack)
├── config.js              server address
├── .env                   API_URL setting read at build time (react-native-dotenv)
├── SCREENS/               every screen (see docs/SCREENS.md for what each one does)
│   ├── Main1.js           investor home (bottom tabs)
│   ├── Main2.js           founder / community / job-seeker home (bottom tabs)
│   ├── main-1/            tabs and chat screens used mostly by Main1
│   ├── main-2/            tabs used mostly by Main2
│   └── edit profile pages/  editing profiles
├── Global/globalcontext.js  app-wide shared data (the login token)
├── components/            reusable pieces (Post, back button, button) + Expo template examples
├── styles/                shared style sheets
├── assets/                fonts, images, SVG icons
├── hooks/useLoadFonts.js  loads the custom fonts
└── app.json, eas.json, babel.config.js, react-native.config.js, withAndroidSoftInputMode.js
                           build configuration: do not touch during cleanup
```

The files in `components/` named `Themed*`, `HelloWave`, `ParallaxScrollView`, `Collapsible`,
`ExternalLink`, `navigation/TabBarIcon`, plus `constants/Colors.ts` and `hooks/useColorScheme*`,
come from Expo's starter template. The app does not use them; only the template test in
`components/__tests__` does.

## Formatting

Style settings are in `.prettierrc.json`. Some screens were deliberately **not** auto-formatted
because the formatter would re-wrap on-screen text (see docs/CLEANUP_LOG.md). Before formatting
a screen, check that it still builds to the same program.

## More documentation

- `docs/SCREENS.md`: every screen, what it does and which server endpoints it calls
- `docs/ENDPOINTS.md`: every server endpoint
- `CLAUDE.md`: working rules for this repository
