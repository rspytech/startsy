# App screens

Every screen in the Startsy Android app, what it does, and which server endpoints it calls.
Use it as a checklist: open each screen on a phone and confirm it looks and works as before.
Endpoint details (inputs/outputs) are in [ENDPOINTS.md](ENDPOINTS.md).

How navigation works: the app has one stack of full-screen pages, listed in
`frontend/app/(tabs)/index.tsx`. Two of those pages are the **home screens** with a bottom tab bar:
**Main1** for investors and **Main2** for everyone else (founders, community members, job seekers).
The navigation stack is set to open on **Skeleton1** (`initialRouteName`), a loading animation.
⚠️ Skeleton1 contains no code that moves on to another screen; the "am I logged in?" check lives
in **Green**. Please check on a phone which screen the app really shows first.

All files below are under `frontend/`. "Calls" lists `METHOD /path`; `:id` means a value filled in by the app.
The server address comes from `frontend/config.js` (`https://startsy.onrender.com/`).

## 1. Start, login and logout

| Screen (name in code) | File | What it does | Calls | Goes to |
|---|---|---|---|---|
| Skeleton1 | `SCREENS/main-2/skeleton.js` | Loading animation (grey placeholder blocks); configured as the first screen | — | — (see note above) |
| Green | `SCREENS/greenscreen.js` | Checks for a saved login: logged-in users go to their home screen, others to login | — | Main1, Main2, LoginTrial |
| LoginTrial | `SCREENS/logintrial.js` | Login with username/email + password; cleans up an unfinished sign-up | `POST /api/authenticate`, `POST /api/deleteUnAuthenticatedUser` | Main1 (investor), Main2 (others), Signup1 |
| Login2 | `SCREENS/login2.js` | "Create a new account as?" Investor / Founder / Freelancer, or go to login | — | LoginTrial, Signup1 |
| Wait | `SCREENS/Wait.js` | Text-only information page | — | — |

## 2. Sign-up and onboarding

| Screen | File | What it does | Calls | Goes to |
|---|---|---|---|---|
| Signup1 | `SCREENS/signup-1.js` | Choose a username (checks it is free) | `POST /api/checkUserName` | Signup2 |
| Signup2 | `SCREENS/signup2.js` | Set password and create the account | `POST /api/register` | Signup4, Signup5 |
| Signup3 | `SCREENS/signup3.js` | Sign-up step with a "Choose another option" button (restarts the flow) | — | — |
| Signup4 | `SCREENS/signup4.js` | Sign-up step (step indicator 1–4), continues with the chosen account type | — | Signup3, Signup5 |
| Signup5 | `SCREENS/signup5.js` | Upload a profile picture, then continue to the form for your account type | ⚠️ uploads to a developer's local address `192.168.1.7:9000/userimg` | Signup6, Signup7, Signup9, Signup12 |
| Signup6 | `SCREENS/signup6.js` | Community-member interests (participation, area of interest, content preference) | ⚠️ calls `192.168.1.7:5002/api/communityMemberInfo` (local address) | Main2, Signup7 |
| Signup7 | `SCREENS/signup7.js` | Community-member profile form | `POST /api/communityMemberInfo` | Main2, Signup8 |
| Signup8 | `SCREENS/signup8.js` | Freelancer / job-seeker profile form | ⚠️ `POST /freelancerInfo` (missing `/api`, server has `/api/freelancerInfo`) | Main2 |
| Signup9 → Signup10 → Signup11 | `SCREENS/Signup9.js`, `Signup10.js`, `Signup11.js` | Founder onboarding: startup details over three steps; adds team members by username | `GET /api/getUserNameSuggestions/:userName`, `POST /api/founderInfo` | Main2 |
| Signup12 → Signup13 | `SCREENS/signup12.js`, `Signup13.js` | Investor onboarding: experience, interests, preferred startup stage/sector, then details and PAN card | `POST /api/investorInfo` | Main1 |
| Line, Line2, Line3 | `SCREENS/line.js`, `line2.js`, `line3.js` | Step indicators (1–4 with progress bar) shown on sign-up screens | — | — |

## 3. Investor home: Main1 (`SCREENS/Main1.js`)

Bottom tabs:

| Tab | File | What it does | Calls | Goes to |
|---|---|---|---|---|
| ForYou | `SCREENS/main-1/Foryou.js` | Feed of posts; upvote | `GET /posts/getPosts`, `POST /posts/upvotePost/:postId/:likeStatus` | — |
| NewsLetter | `SCREENS/main-1/NewsLetter.js` | List of newsletters | `GET /admin/getAllNewletters` | NewsletterPage |
| Startsy | `SCREENS/main-1/Startsy.js` | Swipe through recommended founders; send a connection request | `GET /investor/recommendation/getFounderProfile`, `POST /investor/addFounderProfile/:id`, ⚠️ `POST /investor/updateFounderUpvoteCounter/:id` (does not exist on the server) | Card |
| Message | `SCREENS/main-1/Message.js` | Two sub-tabs: **Connections** (`main-1/connection.js`) and **Requests** (`main-1/Request.js`) | Connections: `GET /investor/recommendation/getFounderProfile`, `GET /chats/getMessage/individual/:id`; Requests: `GET /investor/getPendingRequestsByInvestor` | Chat |
| Profile | `SCREENS/Apnauser.js` | Your own profile and posts (shared with Main2) | see "Profile" below | ChangePassword1, EditInvestorInfo |
| (hidden) NewsletterPage | `SCREENS/main-2/news1.js` | Reading one newsletter | — | — |
| (hidden) Singleprofilepage | `SCREENS/singleprofilepage.js` | Someone else's profile | see below | — |

Also used: `SCREENS/main-1/Profile.js` (investor profile layout → ChangePassword1, EditInvestorInfo) and
`SCREENS/main-1/Card.js` (stack screen "Card": a founder's startup details: goal, description, about the founder).

## 4. Founder / community / job-seeker home: Main2 (`SCREENS/Main2.js`)

Main2 also holds the "create post" sheet and the comments sheet.
Calls from Main2 itself: `POST /posts/createPost/:postType`, `POST /posts/createJobPost/:postType`,
`POST /posts/createCommunityPost/:postType`, `GET /posts/getComments/:id`, `POST /posts/createComment/:id`, `POST /posts/deletePost/:id`.

| Tab | File | What it does | Calls | Goes to |
|---|---|---|---|---|
| NewsLetter | `SCREENS/main-2/Newsletter.js` | Newsletters plus user search | `GET /admin/getAllNewletters`, `GET /api/getUserNameSuggestions/:userName` | NewsletterPage, Singleuserpage |
| bell (Notifications) | `SCREENS/main-2/Notification.js` | Two sub-tabs: **investor requests** (`main-2/InvestorCard.js`) and **activity/upvotes** (`main-2/Upvotedata.js`) | InvestorCard: `GET /founder/getFounderNotifications`, `POST /founder/acceptRequest/:id`, `POST /founder/rejectRequest/:id`; Upvotedata: `GET /founder/getFounderProfileDetails`, `GET /notification/getUserNotifiation`, `POST /chats/addToChatDirectly/:id` | Chat, Singleuserpage |
| Startsy (centre, main feed) | `SCREENS/main-2/Foryou.js` | Feed of posts, jobs and communities: upvote, apply to job, join community, delete own post | `GET /posts/getPosts`, `POST /posts/upvotePost/:postId/:likeStatus`, `POST /posts/applyJobPost/:id`, `POST /posts/applyCommunity/:id`, `GET /groupChat/getGroupChatMessage/:id`, `POST /posts/deletePost/:id` | Chat1, Singleuserpage |
| Message | `SCREENS/main-2/Message.js` | Two sub-tabs: **Connections** (`main-1/connection.js`) and **Communities** (`main-2/Communities.js`) | Communities: `GET /groupChat/getCommunityGroupChatList`, `GET /groupChat/getGroupChatMessage/:id` | Chat, Chat1 |
| Profile | `SCREENS/Apnauser.js` | Your own profile and posts | see "Profile" below | — |
| (hidden) NewsletterPage | `SCREENS/main-2/news1.js` | Reading one newsletter | — | — |
| (hidden) Singleuserpage | `SCREENS/singleprofilepage.js` | Someone else's profile | see below | — |

Also used: `SCREENS/main-2/Profile.js` (profile layout → ChangePassword1, Founder1).

## 5. Profiles

| Screen | File | What it does | Calls |
|---|---|---|---|
| Profile tab (own profile) | `SCREENS/Apnauser.js` | Your profile, cover image, posts, comments, follow lists | `GET /api/getUsersProfiles/:id`, `POST /api/uploadCoverImage`, `POST /connections/followUser/:id`, `POST /posts/upvotePost/:postId/:likeStatus`, `GET /posts/getComments/:id`, `POST /posts/createComment/:id`, `POST /posts/deletePost/:id` |
| Singleprofilepage | `SCREENS/singleprofilepage.js` | Another user's profile: follow, upvote and comment on their posts | `GET /api/getUsersProfiles/:id`, `POST /api/uploadCoverImage`, `POST /connections/followUser/:id`, `POST /posts/upvotePost/:postId/:likeStatus`, `GET /posts/getComments/:id`, `POST /posts/createComment/:id` |

## 6. Chat (real time)

Both chat screens open a live Socket.IO connection to the same server address.

| Screen | File | What it does | Live events | Goes to |
|---|---|---|---|---|
| Chat | `SCREENS/main-1/CHATSCREEN.js` | One-to-one chat | sends `registerUser`, `privateMessage`; receives `privateMessage` | Singleprofilepage |
| Chat1 | `SCREENS/main-1/GROUPCHATSCREEN.js` | Community group chat | sends `joinGroup`, `groupMessage`; receives `groupMessage` | Singleprofilepage |

## 7. Settings and editing

| Screen | File | What it does | Calls | Goes to |
|---|---|---|---|---|
| ChangePassword1 | `SCREENS/changePassword1.js` | Enter current password | `POST /api/checkCurrentPassword` | ChangePassword2 |
| ChangePassword2 | `SCREENS/changePassword2.js` | Enter new password | `POST /api/changePassword` | Profile |
| EditInvestorInfo | `SCREENS/edit profile pages/investor.js` | Edit investor profile | `POST /investor/editInvestorAccountProfileDetails` | ChangePassword1 |
| Founder1 → Founder2 | `SCREENS/edit profile pages/founder-1.js`, `founder-2.js` | Edit founder profile (two steps) | `POST /founder/editFounderAccountProfileDetails` | Main2 |
| Editcommunity | `SCREENS/edit profile pages/Editcommunity.js` | Edit community-member profile | `POST /communityMember/editCommunityMemberAccountProfileDetails` | ChangePassword1 |

## 8. Leftover / test screens still registered in the app

These are listed in the navigation stack, but nothing obvious leads to them. They are kept unchanged.

| Screen | File |
|---|---|
| Logout | `SCREENS/Logout.js` (despite the name: a leftover shopping-app "Successful! Continue Shopping" page) |
| Ct | `SCREENS/main-1/Ct.js` (a basic test chat page titled "Chat Header") |
| Modal1 | `SCREENS/Modal.js` |
| F1 | `SCREENS/test.js` |
| Test1 | `SCREENS/test1.js` |
| OK | `SCREENS/bottom.js` |
| KeyboardAvoidingComponent | `SCREENS/Keyboard.js` |
| (imported, not registered) | `SCREENS/trial-1.js` (ReadMore1), `SCREENS/F2.js`, `SCREENS/blur.js`, `SCREENS/main-1/connection.js` as "Connectionscreen" |

## Shared pieces (not screens)

- `Global/globalcontext.js`: app-wide shared state
- `config.js`: server address · `.env`: `API_URL` setting read at build time
- `components/` (`Post.js`, `back.js`, `button.js`), `styles/`, `assets/icons/`: reusable UI parts
- `hooks/useLoadFonts.js`: loads the app's fonts before showing the first screen
