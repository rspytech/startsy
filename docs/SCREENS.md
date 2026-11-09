# App screens

Every screen in the live Startsy Android app (production code: Anshgala333/Startsy `main`, Expo SDK 52,
copied to `frontend/`), what it does, and which server endpoints it calls. Use it as a checklist:
open each screen on a phone and confirm it looks and works as before.
Endpoint details (inputs/outputs) are in [ENDPOINTS.md](ENDPOINTS.md).

How navigation works: the app's real entry file is `frontend/app/index.tsx`. It lists every full-screen
page in one navigation stack and starts on **Green**. (`frontend/app/(tabs)/index.tsx` is an older entry
file that is still in the project.) Two pages are the **home screens** with a bottom tab bar:
**Main1** (investors) and **Main2** (everyone else). Most screens are loaded only when first opened.

All paths below are under `frontend/`. "Calls" lists `METHOD /path`; `:id` means a value filled in by the app.
The server address comes from `frontend/config.js` (`https://startsy.onrender.com/`).

## 1. Start, login and password

| Screen (name in code) | File | What it does | Calls | Goes to |
|---|---|---|---|---|
| Green (first screen) | `SCREENS/greenscreen.js` | Checks for a saved login; investors are checked for verification first | `GET /test/getInvestorStatus` | Main2, InvestorWaitingPage, InvestorNotVerifiedScreen |
| LoginTrial | `SCREENS/logintrial.js` | Welcome screen with the logo, **Log in** / **Create account** and the **Terms & Conditions** link; also the email + password login form | `POST /api/authenticate`, `POST /api/deleteUnAuthenticatedUser` | LoginPage, Signup1, TermsAndConditions, Main2, investor waiting screens |
| LoginPage | `SCREENS/LoginPage.js` | "Welcome Back!" email + password login | `POST /api/authenticate` | FP1 (forgot password), investor waiting screens |
| TermsAndConditions | `SCREENS/JASH/terms-condition/TermsAndCondition.jsx` | The Terms & Conditions text | — | — |
| FP1 → FP2 | `SCREENS/FP1.js`, `SCREENS/FP2.js` | Forgot password: enter email, receive OTP, enter OTP | `POST /api/sendOtp`, `POST /api/verifyOtp` | ChangePassword2 |
| ChangePassword1 → ChangePassword2 | `SCREENS/changePassword1.js`, `changePassword2.js` | Change password (current, then new). ChangePassword2 is also the last step of "forgot password" | `POST /api/checkCurrentPassword`, then `POST /api/changePassword` or `POST /api/forgotPassword` | Green |
| Login2 | `SCREENS/login2.js` | "Create a new account as?" Investor / Founder / Freelancer | — | LoginTrial, Signup1 |

## 2. Sign-up and onboarding

| Screen | File | What it does | Calls | Goes to |
|---|---|---|---|---|
| Signup1 | `SCREENS/signup-1.js` | Choose a username | `POST /api/checkUserName` | Signup2 |
| Signup2 | `SCREENS/signup2.js` | Set password, create the account | `POST /api/register` | Email, Signup4 |
| Email | `SCREENS/email.js` | Enter email, receive and check an OTP code | `POST /api/checkemail`, `POST /api/sendOtp`, `POST /api/verifyOtp` | Signup5 |
| Signup3, Signup4 | `SCREENS/signup3.js`, `signup4.js` | Sign-up steps (step indicator 1–4) | — | Signup5 |
| Signup5 | `SCREENS/signup5.js` | Profile picture, then the form for the chosen account type | `GET /api/getProfiledetailForSwitch` | Signup6, Signup7, Signup9, Signup12 |
| Signup6 → Signup7 | `SCREENS/signup6.js`, `signup7.js` | Community member: interests, then profile form | `POST /api/communityMemberInfo` | Signup8, Main2 |
| Signup8 | `SCREENS/signup8.js` | Freelancer / job seeker profile form | ⚠️ `POST /freelancerInfo` (server has `/api/freelancerInfo`) | — |
| Signup9 → Signup10 → Signup11 | `SCREENS/Signup9.js`, `Signup10.js`, `Signup11.js` | Founder onboarding: startup details, team members by username | `GET /api/getUserNameSuggestions/:userName`, `POST /api/founderInfo` | — |
| Signup12 → SelectInvestor → Signup13 | `SCREENS/signup12.js`, `SelectInvestorType.js`, `Signup13.js` | Investor onboarding: experience and preferences, investor type, details and PAN, email OTP | `POST /api/investorInfo`, `POST /api/sendOtp`, `POST /api/verifyOtp` | Main2 |
| (role explainer) | `SCREENS/trial-1.js` | "Why choose the role of Investor / Founder?" | `GET /api/updateToJobSeeker` | Signup5 |
| PricePage | `SCREENS/JASH/PricePage.js` | Pricing page ("coming soon") | — | Signup5 |
| InvestorWaitingPage, VerificationPendingScreen | `SCREENS/main-2/InvestorWaitingPage.js`, `SCREENS/InvestorVerify.js` | "Verification takes up to 24 hours" for new investors | — | — |
| InvestorNotVerifiedScreen | `SCREENS/NotVerified.js` | Investor was not verified; continue as a community member | `GET /test/convertInvestorToCommunity` | Main2 |
| Wait | `SCREENS/Wait.js` | Information page | — | — |

## 3. Investor home: Main1 (`SCREENS/Main1.js`)

Main1 itself also calls `POST /chats/sendMessage/:id` and `POST /investor/postSuggestions/:id`.

| Tab | File | What it does | Calls | Goes to |
|---|---|---|---|---|
| ForYou | `SCREENS/main-1/Foryou.js` | Feed of posts; upvote | `GET /posts/getPosts`, `POST /posts/upvotePost/:postId/:likeStatus` | Mediapage |
| NewsLetter | `SCREENS/main-1/NewsLetter.js` | Newsletters | `GET /admin/getAllNewletters` | NewsletterPage, Singleuserpage |
| Startsy | `SCREENS/main-1/Startsy.js` | Swipe through recommended founders; request / suggest | `GET /investor/recommendation/getFounderProfile`, `POST /investor/addFounderProfile/:id`, `POST /investor/postSuggestions/:id`, `POST /posts/deletePost/:id` | Card |
| Message | `SCREENS/main-1/Message.js` | Sub-tabs **Connections** (`main-1/connection.js`) and **Requests** (`main-1/Request.js`) | `GET /chats/getMessage/individual/:id`, `GET /investor/getInvestorChatUserList`, `GET /investor/getPendingRequestsByInvestor` | Chat |
| Profile | `SCREENS/Apnauser.js` | Your own profile (shared with Main2) | see section 5 | Settings, Followerpage, CertificatePortfolioPage |

Also: `SCREENS/main-1/Card.js` (stack screen "Card": a founder's startup details), `SCREENS/main-1/Profile.js` (→ ChangePassword1, EditInvestorInfo).

## 4. Founder / community / job-seeker home: Main2 (`SCREENS/Main2.js`)

Main2 itself calls `GET /api/PFP`, `GET /posts/getComments/:id`, `POST /posts/createComment/:id`, `POST /posts/deletePost/:id`, `POST /chats/sendMessage/:id` and opens the create pages (Blogpage, CommunityPage, Jobpost).

| Tab | File | What it does | Calls | Goes to |
|---|---|---|---|---|
| NewsLetter | `SCREENS/main-2/Newsletter.js` | Newsletters and user search | `GET /admin/getAllNewletters`, `GET /api/getUserNameSuggestions/:userName` | NewsletterPage |
| bell (Notifications) | `SCREENS/main-2/Notification.js` | Notifications: investor requests and activity (`main-2/Upvotedata.js`) | `GET /notification/getUserNotifiation`, `POST /chats/addToChatDirectly/:id` | AllRequests, Chat, Singleuserpage, ViewSendedPost |
| Startsy (centre, feed) | `SCREENS/main-2/Foryou.js` | Main feed; each item is drawn by `main-2/Scroll.js` (posts), `SeperatePost.js`, `JobPost.js`, `SeperateCommunity.js`, `Question.js`, `SuggestedUser.js` | `GET /posts/getPosts`, `POST /posts/upvotePost/:postId/:likeStatus`, `POST /test/savePost/:saveId/:saveStatus`, `POST /posts/applyJobPost/:id`, `POST /posts/applyCommunity/:id`, `GET /groupChat/getGroupChatMessage/:id`, `POST /posts/createPost/:postType`, `POST /connections/followUser/:id` | Mediapage, JobApply, ApplicantsList, QuestionReply, Chat1, Singleuserpage |
| Message | `SCREENS/main-2/Message.js` | Sub-tabs **Connections** (`main-1/connection.js`), **InvestorConnection** (`main-1/SeperateInvestor.js`), **Communities** (`main-2/Communities.js`) | `GET /groupChat/getCommunityGroupChatList`, `GET /groupChat/getGroupChatMessage/:id`, `GET /chats/getMessage/individual/:id`, chat user lists | Chat, Chat1 |
| Profile | `SCREENS/Apnauser.js` | Your own profile | see section 5 | Settings, Followerpage |
| (hidden) Followerpage | `SCREENS/Followerpage.js` | Followers / connections list | `POST /connections/followUser/:id`, `POST /founder/rejectRequest/:id` | Profile |
| (hidden) Jobposted, Applicant | `SCREENS/JASH/JobsPostedScreen.jsx`, `ApplicantsList.jsx` | Jobs you posted and who applied | `GET /posts/getPostedJobs`, `POST /posts/getAppliedJobApplicants` | Singleprofilepage |
| (hidden) ViewSendedPost | `SCREENS/JASH/View post/ViewSendedPost.jsx` | Opens a single shared post | `GET /test/getOnePost/:id`, `POST /posts/upvotePost/...`, `POST /test/savePost/...` | — |
| (hidden) NewsletterPage, Singleuserpage | `SCREENS/main-2/news1.js`, `SCREENS/singleprofilepage.js` | One newsletter; another user's profile | see section 5 | — |

## 5. Profiles, posts and settings

| Screen | File | What it does | Calls |
|---|---|---|---|
| Profile tab | `SCREENS/Apnauser.js` | Your profile, cover image, posts, comments, follow lists | `GET /api/getUsersProfiles/:id`, `POST /api/uploadCoverImage`, `POST /connections/followUser/:id`, `POST /posts/upvotePost/...`, `POST /posts/createComment/:id`, `POST /posts/deletePost/:id`, chat user list |
| Singleprofilepage | `SCREENS/singleprofilepage.js` | Another user's profile: follow, upvote, comment, apply to jobs | `GET /api/getUsersProfiles/:id`, `POST /connections/followUser/:id`, `POST /founder/rejectRequest/:id`, `POST /posts/applyJobPost/:id`, `POST /posts/createComment/:id`, `POST /posts/upvotePost/...`, `POST /test/getAllUsersWithStatus` |
| Settings | `SCREENS/Settings.js` | Update app, Edit Profile, Saved Posts, Switch Account, Beta Feedback | `GET /api/getApiLink` |
| SavedPost | `SCREENS/SavedPost.js` | Your saved posts | `GET /test/getSavedPost` |
| RatingPage | `SCREENS/BetaRating.js` | Beta feedback / rate the app | `POST /test/ratingsController` |
| CertificatePortfolioPage | `SCREENS/Certificates.js` | Your certifications and portfolio | `GET /test/getPortfolioAndCertifications` |
| Mediapage, Blogpage, CommunityPage, Jobpost | `SCREENS/MediaPost.js`, `BlogPage.jsx`, `CommunityPage.jsx`, `JobPosting.jsx` | Create a media post, blog post, community or job post | `POST /posts/createPost/:postType`, `POST /posts/createCommunityPost/:postType`, `POST /posts/createJobPost/:postType` |
| JobApply, JobApplicantCard | `SCREENS/JASH/Jobs/JobApplyScreen.jsx`, `JobApplicantCard.jsx` | Apply to a job; an applicant's card | `POST /posts/applyJobPost/:id` |
| QuestionReply | `SCREENS/main-2/QuestionReply.js` | Answers to a question post | `GET /posts/getComments/:id`, `POST /posts/createComment/:id` |
| AllRequests | `SCREENS/main-2/InvestorCard.js` | Founder: all investor requests (accept / reject) | `GET /founder/getFounderNotifications`, `POST /founder/acceptRequest/:id`, `POST /founder/rejectRequest/:id` |
| EditInvestorInfo, Founder1 → Founder2, Editcommunity | `SCREENS/edit profile pages/…` | Edit your profile | `GET /api/getProfileDetailsForEditProfile`, `POST /investor/editInvestorAccountProfileDetails`, `POST /founder/editFounderAccountProfileDetails`, `POST /communityMember/editCommunityMemberAccountProfileDetails` |
| Report sheet | `SCREENS/JASH/bottom-sheet/reportBottomSheet.jsx` | Report a post | `POST /test/reportContent/:postId` |

## 6. Chat (real time)

Both chat screens open a live Socket.IO connection to the server address.

| Screen | File | What it does | Calls | Goes to |
|---|---|---|---|---|
| Chat | `SCREENS/main-1/CHATSCREEN.js` | One-to-one chat; marks messages read | `POST /test/markAsRead` + live chat | Singleprofilepage, NewsletterPage, ViewSendedPost |
| Chat1 | `SCREENS/main-1/GROUPCHATSCREEN.js` | Community group chat | `GET /api/PFP` + live chat | GroupDescriptionPage |
| GroupDescriptionPage | `SCREENS/JASH/GroupDetailsScreen.js` | Group details: members, photo, lock / edit community | `POST /api/getCommunityMemberProfile`, `POST /api/deleteMemberFromCommunity`, `POST /posts/groupPhoto/:comid`, `POST /posts/lockCommunity/:id/:status`, `POST /posts/updateCommunity/:id`, follow / reject | — |

## 7. Leftover / test screens still registered

Registered in `app/index.tsx`, but nothing obvious leads to them. Kept unchanged.

| Screen | File |
|---|---|
| Logout | `SCREENS/Logout.js` (a leftover shopping-template "Continue Shopping" page; it does not log out) |
| Test1 | `SCREENS/test1.js` (sample "John Doe" profile) |
| Modal1 | `SCREENS/Modal.js` (sample delete dialog) |
| Date | `SCREENS/Date.js` |
| Skeleton1 | `SCREENS/main-2/skeleton.js` |
| F1 | `SCREENS/FP1.js` (same as FP1) |

## Shared pieces (not screens)

- `config.js`: server address · `.env`: `API_URL` setting
- `Global/globalcontext.js`, `Global/globalSocket.js`: app-wide shared state and the live chat connection
- `app/index.tsx` also registers the phone for push notifications (`POST /api/updateNotificationToken`; uses `google-services.json`)
- `components/`, `styles/`, `assets/icons/`: reusable UI parts · `hooks/useLoadFonts.js`: loads fonts
