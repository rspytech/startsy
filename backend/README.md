# Startsy back end

The server behind the Startsy mobile app. It stores users, posts, chats and notifications in
MongoDB, and the app talks to it over HTTPS at `https://startsy.onrender.com`.

- **Language / framework:** Node.js with Express (JavaScript, ES modules)
- **Database:** MongoDB (through Mongoose)
- **Real-time chat:** Socket.IO
- **File storage:** Cloudinary (photos and videos)
- **Emails:** Gmail (OTP codes) · **Push notifications:** Expo push service
- **Hosting:** Render. The deploy settings live only in Render's dashboard; they are expected to be
  branch `develop/backend`, folder `backend/` (not stored in this repository, so check there).

## How to run it on your computer

> **Never point a local copy at the production database.** Use a separate test database
> (for example a free MongoDB Atlas cluster or MongoDB installed locally).

1. Install [Node.js](https://nodejs.org) (version 18 or newer).
2. In this `backend/` folder, install the exact package versions from the lock file:
   ```bash
   npm ci
   ```
3. Create a file called `.env` in this folder (it is ignored by git, never commit it) with these settings:

   | Setting | What it is |
   |---|---|
   | `MONGODB_URI` | Address of a **test** MongoDB server (without the database name) |
   | `DB_NAME` | Database name to use on that server |
   | `PORT` | Port to listen on (optional, default 5000) |
   | `ACCESS_TOKEN_SECRET`, `ACCESS_TOKEN_EXPIRY` | Secret and lifetime of login tokens |
   | `REFRESH_TOKEN_SECRET`, `REFRESH_TOKEN_EXPIRY` | Secret and lifetime of refresh tokens |
   | `AES_KEY` | 64-character hex key used to encrypt PAN numbers (the server won't start without it) |
   | `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Cloudinary account for uploads |
   | `EMAIL_USER`, `EMAIL_PASS` | Gmail account used to send OTP emails |
   | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Google sign-in (currently not wired up) |
   | `DEFAULT_PROFILE_PHOTO` | Image link used when a user has no profile photo |

   The production values live only in Render's dashboard (Environment tab).
4. Start the server (it restarts automatically when you edit a file):
   ```bash
   npm run dev
   ```
   You should see `Database connection successful` and `Server started on port 5000`.
   Opening `http://localhost:5000/` shows `Hello, World!`.

Two timers start with the server: one pings the live server every 10 minutes to keep Render
awake, and one resets everyone's daily upvote counter at midnight. Keep that in mind when
running a local copy against any shared database.

## How the code is organised

```
backend/
├── cloudinary.js          upload helper for Cloudinary
├── src/
│   ├── index.js           START HERE: connects to MongoDB, then starts the server
│   ├── app.js             builds the server and maps URL prefixes to route files
│   ├── routes/            one file per URL prefix (/api, /posts, /chats, /admin …)
│   ├── controllers/       the code that actually handles each request, grouped by topic
│   │   ├── authenticateUser/        sign-up, login, OTP, passwords, account deletion
│   │   ├── onboardingControllers/   first-time profile forms (investor, founder, …)
│   │   ├── profileControllers/      viewing and editing profiles
│   │   ├── postControllers/         posts, jobs, communities, upvotes, comments, saved posts
│   │   ├── chatControllers/         one-to-one chat
│   │   ├── groupChat/               community group chat
│   │   ├── investorControllers/     investor-specific features
│   │   ├── founderControllers/      founder-specific features
│   │   ├── networkingConnectionsControllers/  follow / unfollow, followers
│   │   ├── notificationController/  notifications and push tokens
│   │   ├── reportControllers/       reporting posts
│   │   ├── feedbackControllers/     app ratings
│   │   ├── adminControllers/        admin panel, newsletters, APK links
│   │   └── health/                  "are you alive?" check
│   ├── models/            shape of each MongoDB collection (users, posts, messages …)
│   ├── middleware/        checks that run before controllers (login, admin, uploads, encryption)
│   ├── socket/            real-time chat (Socket.IO)
│   ├── utils/             helpers: encryption, emails, push notifications
│   ├── algorithms/        founder recommendation scoring
│   ├── config/            lookup tables, Google sign-in setup (unused)
│   └── APK/Startsy.apk    copy of the Android app served by /admin/ApkFromAssets
└── userdetails.csv        an old export of user data (see docs/NOTICED_NOT_CHANGED.md)
```

To follow a request: find its URL in `docs/ENDPOINTS.md`, which names the controller file
that handles it.

## Formatting

Code style is set in `.prettierrc.json`. To re-format after editing:
```bash
npx prettier@3.3.3 --write "src/**/*.js" "*.js"
```

## More documentation

- `docs/ENDPOINTS.md`: every API endpoint (method, path, purpose, inputs, outputs)
- `CLAUDE.md`: working rules for this repository
