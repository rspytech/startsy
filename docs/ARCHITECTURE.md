# How Startsy fits together

A plain-English map of the whole system: the app on users' phones, the server, the database and
the outside services they use.

## The big picture

```
   Android phone                         Render (cloud hosting)                   MongoDB
 ┌──────────────────┐   HTTPS requests  ┌─────────────────────────────┐        ┌────────────┐
 │  Startsy app     │ ────────────────► │  Back end (Express server)  │ ─────► │  Database  │
 │  (React Native / │ ◄──────────────── │  startsy.onrender.com       │ ◄───── │  (users,   │
 │   Expo, APK)     │    JSON answers   │                             │        │  posts, …) │
 │                  │                   │                             │        └────────────┘
 │                  │ ◄═══════════════► │  Socket.IO (live chat)      │
 └──────────────────┘  live connection  └─────────────────────────────┘
          ▲                                  │        │         │
          │ push notification                │        │         │
   ┌──────┴───────┐                   ┌──────▼──┐ ┌───▼────┐ ┌──▼──────────────┐
   │ Expo push    │ ◄──────────────── │Cloudinary│ │ Gmail  │ │ Expo build/OTA  │
   │ service      │   "notify phone"  │ (photos, │ │ (OTP   │ │ (APK builds and │
   └──────────────┘                   │  videos) │ │ emails)│ │  live updates)  │
                                      └──────────┘ └────────┘ └─────────────────┘
```

1. **The app** (front end) is what users install. It shows the screens and sends requests to the server.
2. **The server** (back end) checks who the user is, applies the rules (who can follow, upvote,
   chat…), and reads and writes the database.
3. **The database** (MongoDB) permanently stores everything: accounts, profiles, posts, messages.
4. **Outside services** do specialised jobs: Cloudinary stores images and videos, Gmail sends OTP
   emails, Expo delivers push notifications and builds the APK.

## Where each part lives in the repository

| Part | Production branch | Folder on `development` | Runs on |
|---|---|---|---|
| Front end (app) | `main` of Anshgala333/Startsy (fork: rspytech/Startsy-production) | `frontend/` | Users' Android phones (APK) |
| Back end (server) | `develop/backend` | `backend/` | Render, at `https://startsy.onrender.com` |
| Database | (not in git) | (not in git) | MongoDB server, address in Render's `MONGODB_URI` setting |

Secrets such as database passwords and keys are **not** in the code. They are settings on Render
(Environment tab). Their names are listed in `backend/README.md`.

## The front end (the app)

- Starts at `frontend/app/(tabs)/index.tsx`, which lists every screen.
- Two home screens: **Main1** for investors and **Main2** for founders, community members and job
  seekers. Each has a bottom tab bar.
- The server address is in `frontend/config.js`. Every screen builds its requests from it.
- After login, the server gives the app an **access token** (a signed pass). The app saves it on the
  phone and sends it with every request (`Authorization: Bearer …`).
- Every screen and the endpoints it calls: [SCREENS.md](SCREENS.md).

## The back end (the server)

A request travels through these layers:

```
 request ─► app.js ─► routes/ ─► middleware/ ─► controllers/ ─► models/ ─► MongoDB
            (which    (which      (login check,  (the actual     (shape of
             prefix?)  exact URL?) file upload,   work: rules,    the data)
                                   encryption)    reads/writes)
```

- `src/index.js` connects to MongoDB, then starts the server.
- `src/app.js` sends each URL prefix to a route file, e.g. `/posts/...` to `routes/post.routes.js`.
- `middleware/user.auth.middleware.js` (`verifyUser`) checks the access token on most endpoints.
- `controllers/` hold the logic, grouped by topic (onboarding, profiles, posts, chat…).
- `models/` describe each database collection.
- `socket/socketIo.js` handles live chat: phones keep a connection open and messages arrive instantly.
- Two timers run inside the server: one pings itself every 10 minutes to stop Render's server from
  going to sleep, and one resets everyone's daily upvote allowance at midnight.
- Every endpoint: [ENDPOINTS.md](ENDPOINTS.md).

## The database

MongoDB stores data as "collections" (like spreadsheet tabs). The main ones:

| Collection (model) | What it holds |
|---|---|
| User | Every account: username, email, hashed password, role, followers/following, push token |
| General | The role-specific profile linked to each user (`User.roleId` points here) |
| Investor, Founder, CommunityMember, Freelancer | Older role-specific profile models, still used by some features |
| Post, JobPost, Community | Feed posts, job posts and communities |
| Comment, UpvotePost, upvoteProfile, Save | Comments, upvotes and saved posts |
| Conversation, Message | Chats (one-to-one and group) and their messages |
| Notification | In-app notifications |
| Recommendation | Data used to recommend founders to investors |
| Report, Rating | Reported posts and app ratings |
| Newsletter | Admin-published newsletters |
| Otp | One-time email codes (expire automatically) |
| JobApplicantDescription | Job applications |
| APKurl, ApkUser | Published APK versions and who downloaded which |

Passwords are stored hashed (bcrypt, `backend/src/models/user.model.js`). Investors' PAN numbers are
stored encrypted plus a one-way hash (`middleware/encrypt.middleware.js`).

## How a typical action flows: "a founder creates a post with a photo"

1. On the **Main2** screen the founder writes a post and picks a photo.
2. The app sends `POST /posts/createPost/:postType` with the photo and the access token.
3. `verifyUser` checks the token and finds the founder's account.
4. The upload middleware holds the photo in memory (max 50 MB, images/videos only).
5. The controller uploads the photo to **Cloudinary**, saves the post in MongoDB and links it to the user.
6. The server answers with the result, and the feed shows the new post.

## How releases happen

- **Back end:** Render deploys the server from GitHub. The branch and folder are set in Render's
  dashboard, not in this repository (expected: `develop/backend`, `backend/`). Pushing to that branch
  may redeploy the live server.
- **App:** built with Expo's cloud build service (EAS) using `frontend/app.json` and `frontend/eas.json`.
  The app also supports **over-the-air updates** (`expo-updates`): `eas update` can change the
  JavaScript inside already-installed apps, so treat it like a release.
- The back end also serves a copy of the APK (`backend/src/APK/Startsy.apk`, via `/admin/ApkFromAssets`)
  and a download of the latest build fetched from Expo (`/admin/apkForWebsite`), intended for the website.
