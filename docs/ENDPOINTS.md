# API endpoints

Every endpoint the production back end exposes. This list was generated from the code of
`develop/backend` (tag `production-snapshot-2026-11-07`), so you can check after each cleanup
that **nothing here changed**.

- **Total:** 102 endpoints. The server address is `https://startsy.onrender.com`.
- **Login required:** "yes" means the app must send `Authorization: Bearer <access token>`.
  The token comes from `POST /api/authenticate`. Without it the server answers `401`.
- **Inputs** are the fields the code reads: *body* (JSON or form fields), *URL* (the `:parts` of the path),
  *query* (`?key=value`), *file* (uploaded image/video).
- **Outputs** are the status codes and the top-level JSON fields the code can send back.
  `text` means plain text, `value` means a JSON value built elsewhere in the code.

## Root

### `GET /`

Simple "Hello, World!" reply to show the server is up.

- **Login required:** **no**
- **Code:** `backend/src/app.js`

## Accounts, sign-up, login and profiles (/api)

### `POST /api/register`

Create a new user account (sign-up).

- **Login required:** **no**
- **Inputs:** body `userName`, `password`, `role`; URL —; query —
- **Outputs:** `400 { message }`, `201 { message, accessToken, refreshToken }`, `500 { message }`
- **Code:** `backend/src/controllers/authenticateUser/registration.controller.js`

### `POST /api/checkusername`

Check whether a username is already taken.

- **Login required:** **no**
- **Inputs:** body `username`; URL —; query —
- **Outputs:** `400 { message }`, `200 { message }`
- **Code:** `backend/src/controllers/authenticateUser/checkUserName.js`

### `POST /api/checkemail`

Check whether an email is already registered.

- **Login required:** **no**
- **Inputs:** body `email`; URL —; query —
- **Outputs:** `400 { message }`, `200 { message }`
- **Code:** `backend/src/controllers/authenticateUser/checkEmail.js`

### `POST /api/checkCurrentPassword`

Check the logged-in user's current password (before changing it).

- **Login required:** yes
- **Inputs:** body `password`; URL —; query —
- **Outputs:** `400 { message }`, `200 { message }`
- **Code:** `backend/src/controllers/authenticateUser/checkCurrentPassword.js`

### `POST /api/changePassword`

Change the logged-in user's password.

- **Login required:** yes
- **Inputs:** body `newPassword`, `confirmPassword`; URL —; query —
- **Outputs:** `400 { message }`, `200 { message }`, `500 { message }`
- **Code:** `backend/src/controllers/authenticateUser/changePassword.controller.js`

### `POST /api/authenticate`

Log in with email/username and password; returns login tokens.

- **Login required:** **no**
- **Inputs:** body `identifier`, `password`, `notificationToken`, `isAdmin`; URL —; query —
- **Outputs:** `403 { message }`, `400 { message }`, `401 { message }`, `200 { message, accessToken, refreshToken }`, `500 { message }`
- **Code:** `backend/src/controllers/authenticateUser/login.controller.js`

### `POST /api/investorInfo`

Save investor profile details during onboarding (profile photo + PAN card photo; PAN is encrypted).

- **Login required:** yes
- **Inputs:** body `fullName`, `country`, `age`, `gender`, `contactInfo`, `previousExperience`, `startupStage`, `preferredSector`, `investmentRange`, `linkedInUrl`, `websiteUrl`, `domainEmail`, `investorType`, `generalModelId`; URL —; query —; file `fields(profilePhoto+panCardPhoto)`
- **Outputs:** `400 { message }`, `400 { message, error }`, `200 { message, newToken }`
- **Code:** `backend/src/controllers/onboardingControllers/InvestorInfo.controller.js`

### `POST /api/founderInfo`

Save founder/startup profile details during onboarding; also updates recommendations.

- **Login required:** yes
- **Inputs:** body `teamInfo`, `previousWorkExperience`, `socialProof`, `country`, `age`, `gender`, `contactInfo`, `fullName`, `education`, `skills`, `nameOfStartup`, `goal`, `description`, `sector`, `fundingStatus`, `stageOfStartup`, `generalModelId`; URL —; query —; file `single("profilePhoto")`
- **Outputs:** `400 { message }`, `555 { message, invalidTeamMates }`, `400 { message, error }`, `200 { message, newToken }`, `500 { message }`
- **Code:** `backend/src/controllers/onboardingControllers/founderInfo.controller.js`

### `POST /api/freelancerInfo`

Save freelancer profile details during onboarding.

- **Login required:** yes
- **Inputs:** body `certification`, `portfolio`, `fullName`, `email`, `country`, `age`, `gender`, `contactInfo`, `tagline`, `skills`, `education`, `services`, `currentAvailability`, `pricing`; URL —; query —; file `single("profilePhoto")`
- **Outputs:** `200 { message }`, `500 { message }`
- **Code:** `backend/src/controllers/onboardingControllers/freelancerInfo.controller.js`

### `POST /api/communityMemberInfo`

Save community-member profile details during onboarding.

- **Login required:** yes
- **Inputs:** body `certification`, `portfolio`, `socialProof`, `fullName`, `email`, `country`, `age`, `gender`, `contactInfo`, `communityMemberRole`, `areaOfInterest`, `contentPrefrence`, `tagline`, `skills`, `education`; URL —; query —; file `single("profilePhoto")`
- **Outputs:** `400 { message, error }`, `400 { message }`, `200 { message, newToken }`, `400 { error, message }`
- **Code:** `backend/src/controllers/onboardingControllers/communityMemberInfo.controller.js`

### `GET /api/getUsersProfiles/:id`

Get another user's public profile (with follow status).

- **Login required:** yes
- **Inputs:** body —; URL `id`; query —
- **Outputs:** `404 { message }`, `400 { message }`, `200 { message, data, status, profileCompletion }`, `500 { message, error }`
- **Code:** `backend/src/controllers/profileControllers/getUsersProfile.js`

### `GET /api/getProfileDetailsForEditProfile`

Get the logged-in user's details to pre-fill the Edit Profile screen.

- **Login required:** yes
- **Inputs:** body —; URL —; query —
- **Outputs:** `404 { message }`, `200 { message, data }`, `500 { message }`
- **Code:** `backend/src/controllers/profileControllers/getProfileDetailsForEditProfile.js`

### `GET /api/getProfiledetailForSwitch`

Get the logged-in user's details for the role-switch screen.

- **Login required:** yes
- **Inputs:** body —; URL —; query —
- **Outputs:** `404 { message }`, `200 { message, data, profilePhoto }`, `500 { message }`
- **Code:** `backend/src/controllers/profileControllers/getProfileDetailsForswitch.js`

### `POST /api/doesUserExists`

Check whether a user exists (used during login/sign-up).

- **Login required:** **no**
- **Inputs:** body `email`, `contactInfo`; URL —; query —
- **Outputs:** `409 { message }`, `500 { message }`
- **Code:** `backend/src/controllers/authenticateUser/doesUserExists.controller.js`

### `POST /api/uploadCoverImage`

Upload the logged-in user's profile cover image.

- **Login required:** yes
- **Inputs:** body —; URL —; query —; file `single("coverImage")`
- **Outputs:** `400 { message }`, `404 { message }`, `400 { message, error }`, `200 { message, coverImageUrl }`, `500 { message, error }`
- **Code:** `backend/src/controllers/profileControllers/uploadProfileCoverImage.js`

### `GET /api/getInvestorProfile`

Get the logged-in investor's profile.

- **Login required:** yes
- **Inputs:** body —; URL —; query —
- **Outputs:** `404 { message }`, `200 { message, user }`, `500 { message }`
- **Code:** `backend/src/controllers/profileControllers/getInvestorProfile.js`

### `GET /api/getUserNameSuggestions/:userName`

Search users by username (search/suggestions).

- **Login required:** yes
- **Inputs:** body —; URL `userName`; query —
- **Outputs:** `400 { message }`, `200 { message, data }`, `404 { message, error }`
- **Code:** `backend/src/controllers/profileControllers/getUserNameSuggestions.js`

### `POST /api/getCommunityMemberProfile`

Get basic profiles (name, email) for a list of users.

- **Login required:** yes
- **Inputs:** body `array`; URL —; query —
- **Outputs:** `200 { message, data }`, `500 { message }`
- **Code:** `backend/src/controllers/profileControllers/getCommunityMemberProfile.js`

### `POST /api/deleteUnauthenticatedUser`

Delete the logged-in user's half-finished account (sign-up abandoned).

- **Login required:** yes
- **Inputs:** body —; URL —; query —
- **Outputs:** `400 { message }`, `200 { message }`, `500 { message }`
- **Code:** `backend/src/controllers/authenticateUser/deleteUnAuthenticatedUser.js`

### `POST /api/deleteMemberFromCommunity`

Remove a member from a community.

- **Login required:** yes
- **Inputs:** body `communityId`, `userId`; URL —; query —
- **Outputs:** `200 { message }`, `404 { error, message }`
- **Code:** `backend/src/controllers/postControllers/deleteMemberFromCommunity.js`

### `GET /api/updateToJobSeeker`

Switch the logged-in user to job-seeker mode.

- **Login required:** yes
- **Inputs:** body —; URL —; query —
- **Outputs:** `404 { message }`, `200 { message, user, token }`, `500 { message, error }`
- **Code:** `backend/src/controllers/profileControllers/ChangeToJobSeeker.js`

### `POST /api/deleteUserAccount/:id`

Permanently delete a user account and all their posts, comments, messages and notifications.

- **Login required:** **no**
- **Inputs:** body —; URL `id`; query —
- **Outputs:** `200 { message }`, `404 { message, error }`
- **Code:** `backend/src/controllers/authenticateUser/deleteUserAccount.js`

### `POST /api/updateNotificationToken`

Save the phone's push-notification token for the logged-in user.

- **Login required:** yes
- **Inputs:** body `notificationToken`; URL —; query —
- **Outputs:** `200 { message }`, `500 { message }`
- **Code:** `backend/src/controllers/notificationController/notificationController.js`

### `POST /api/sendOtp`

Email a one-time password (OTP) code.

- **Login required:** **no**
- **Inputs:** body `email`; URL —; query —
- **Outputs:** `400 { message }`, `200 { message }`, `500 { message }`
- **Code:** `backend/src/controllers/authenticateUser/sendOtp.js`

### `POST /api/verifyOtp`

Check a one-time password (OTP) code.

- **Login required:** **no**
- **Inputs:** body `email`, `otp`; URL —; query —
- **Outputs:** `400 { message }`, `200 { message }`, `500 { message, error }`
- **Code:** `backend/src/controllers/authenticateUser/verifyOtp.js`

### `POST /api/forgotPassword`

Set a new password for the account with the given email (the app checks the OTP first). WARNING: the server itself does not check the OTP.

- **Login required:** **no**
- **Inputs:** body `password`, `confirmPassword`, `email`; URL —; query —
- **Outputs:** `400 { message }`, `200 { message }`, `500 { message }`
- **Code:** `backend/src/controllers/authenticateUser/forgotPassword.js`

### `GET /api/PFP`

Get the logged-in user's profile photo.

- **Login required:** yes
- **Inputs:** body —; URL —; query —
- **Outputs:** `200 { data }`
- **Code:** `backend/src/controllers/profileControllers/PFP.js`

### `GET /api/getJobs`

List the job posts created by the logged-in user.

- **Login required:** yes
- **Inputs:** body —; URL —; query —
- **Outputs:** `200 { data }`, `404 { error, message }`
- **Code:** `backend/src/controllers/postControllers/getjobs.js`

### `GET /api/getApiLink`

Get the latest APK download link/version (for app update prompts).

- **Login required:** yes
- **Inputs:** body —; URL —; query —
- **Outputs:** `200 { msg, link }`, `400 { error }`, `404 { msg }`
- **Code:** `backend/src/controllers/adminControllers/GetApklink.js`

## Investors (/investor)

### `POST /investor/postSuggestions/:id`

Investor sends a suggestion to a founder (creates a notification).

- **Login required:** yes
- **Inputs:** body `suggestion`; URL `id`; query —
- **Outputs:** `404 { message }`, `400 { message }`, `200 { message, profilePhoto }`
- **Code:** `backend/src/controllers/investorControllers/postSuggestions.js`

### `POST /investor/addFounderProfile/:id`

Investor sends a connection request to a founder (home-feed "+" button).

- **Login required:** yes
- **Inputs:** body —; URL `id`; query —
- **Outputs:** `404 { message }`, `400 { message }`, `200 { success, message, data }`, `500 { success, message, error }`
- **Code:** `backend/src/controllers/investorControllers/addFounderProfile.js`

### `GET /investor/recommendation/getFounderProfile`

Get recommended founder profiles for the logged-in investor.

- **Login required:** yes
- **Inputs:** body —; URL —; query —
- **Outputs:** `404 { success, message }`, `200 { success, message, data }`, `500 { success, message, error }`
- **Code:** `backend/src/controllers/investorControllers/getFounderProfile.js`

### `GET /investor/getProfilePageDetails`

Get the logged-in investor's profile page details.

- **Login required:** yes
- **Inputs:** body —; URL —; query —
- **Outputs:** `404 { message }`, `200 { message, data }`, `500 { message }`
- **Code:** `backend/src/controllers/investorControllers/getInvestorProfileDetails.js`

### `GET /investor/getPendingRequestsByInvestor`

List founders the investor has requested but who haven't responded.

- **Login required:** yes
- **Inputs:** body —; URL —; query —
- **Outputs:** `404 { message }`, `200 { message, requestedFounders }`, `500 { message, error }`
- **Code:** `backend/src/controllers/investorControllers/getRequestedFounders.js`

### `GET /investor/getInvestorChatUserList`

List people the investor can chat with (recent chats).

- **Login required:** yes
- **Inputs:** body —; URL —; query —
- **Outputs:** `404 { error }`, `200 value`, `500 { error }`
- **Code:** `backend/src/controllers/investorControllers/getInvestorChatsUserList.js`

### `POST /investor/editInvestorAccountProfileDetails`

Edit the logged-in investor's profile.

- **Login required:** yes
- **Inputs:** body `fullName`, `country`, `contactInfo`, `previousExperience`, `startupStage`, `preferredSector`, `investmentRange`; URL —; query —; file `single("profilePhoto")`
- **Outputs:** `404 { message }`, `400 { message, error }`, `400 { message }`, `200 { message, investor }`, `500 { message }`
- **Code:** `backend/src/controllers/profileControllers/editInvestorProfileAccountDetails.js`

## Founders (/founder)

### `POST /founder/acceptRequest/:id`

Founder accepts an investor's connection request.

- **Login required:** yes
- **Inputs:** body —; URL `id`; query —
- **Outputs:** `404 { message }`, `200 { message }`, `500 { message }`
- **Code:** `backend/src/controllers/founderControllers/founderAcceptsRequest.js`

### `POST /founder/rejectRequest/:id`

Founder rejects an investor's connection request.

- **Login required:** yes
- **Inputs:** body —; URL `id`; query —
- **Outputs:** `404 { message }`, `200 { message }`, `500 { message }`
- **Code:** `backend/src/controllers/founderControllers/founderRejectsRequest.js`

### `GET /founder/getFounderChatUserList`

List people the founder can chat with.

- **Login required:** yes
- **Inputs:** body —; URL —; query —
- **Outputs:** `404 { error }`, `200 value`, `500 { error }`
- **Code:** `backend/src/controllers/founderControllers/getFounderChatsUserList.js`

### `GET /founder/getFounderNotifications`

Get the founder's notifications (e.g. investor requests).

- **Login required:** yes
- **Inputs:** body —; URL —; query —
- **Outputs:** `404 { message }`, `200 { message, data }`, `500 { message }`
- **Code:** `backend/src/controllers/founderControllers/getFounderNotifications.js`

### `GET /founder/getFounderProfileDetails`

Get the logged-in founder's profile page details.

- **Login required:** yes
- **Inputs:** body —; URL —; query —
- **Outputs:** `404 { message }`, `400 { message }`, `200 { message, data }`, `500 { message, error }`
- **Code:** `backend/src/controllers/founderControllers/getFounderProfileDetails.js`

### `POST /founder/editFounderAccountProfileDetails`

Edit the logged-in founder's profile (incl. team members).

- **Login required:** yes
- **Inputs:** body `teamInfo`, `previousWorkExperience`, `socialProof`, `country`, `contactInfo`, `fullName`, `education`, `skills`, `email`, `nameOfStartup`, `goal`, `description`, `sector`, `fundingStatus`, `stageOfStartup`; URL —; query —; file `single("profilePhoto")`
- **Outputs:** `555 { message, invalidTeamMates }`, `404 { message }`, `400 { message, error }`, `400 { message }`, `200 { message, founder }`, `500 { message }`
- **Code:** `backend/src/controllers/profileControllers/editFounderProfileAccoutDetails.js`

## Community members (/communityMember)

### `POST /communityMember/editCommunityMemberAccountProfileDetails`

Edit the logged-in community member's profile.

- **Login required:** yes
- **Inputs:** body `certification`, `portfolio`, `socialProof`, `fullName`, `country`, `contactInfo`, `communityMemberRole`, `areaOfInterest`, `contentPrefrence`, `tagline`, `skills`, `education`; URL —; query —; file `single("profilePhoto")`
- **Outputs:** `404 { message }`, `400 { message, error }`, `400 { message }`, `200 { message, communityMember }`, `500 { message }`
- **Code:** `backend/src/controllers/profileControllers/editCommunityMemberAccountProfileDetails.controller.js`

## Posts, jobs and communities (/posts)

### `POST /posts/createPost/:postType`

Create a normal post (optionally with an image/video).

- **Login required:** yes
- **Inputs:** body `caption`, `content`, `aspectRatio`, `isPrivate`; URL `postType`; query —; file `single("media")`
- **Outputs:** `412 { success, message }`, `400 { message, error }`, `400 { message }`, `500 { success, message }`, `200 { success, post }`, `404 { success, message }`
- **Code:** `backend/src/controllers/postControllers/createPost.controller.js`

### `POST /posts/groupPhoto/:comid`

Change a community's group photo. (Registered twice in production; the first one handles requests.)

- **Login required:** yes
- **Inputs:** body `communityName`, `communityDescription`; URL `comid`; query —; file `single("media")`
- **Outputs:** `400 { message }`, `500 { message, error }`, `404 { message }`, `200 { message, updatedCommunity, communityPosts }`
- **Code:** `backend/src/controllers/postControllers/groupPhoto.js`

### `POST /posts/createJobPost/:postType`

Create a job post.

- **Login required:** yes
- **Inputs:** body `role`, `description`, `duration`, `pay`, `amount`; URL `postType`; query —
- **Outputs:** `400 { message }`, `201 { message, post }`, `500 { message, error }`
- **Code:** `backend/src/controllers/postControllers/createJobPost.controller.js`

### `POST /posts/createCommunityPost/:postType`

Create a community (with group photo and group chat).

- **Login required:** yes
- **Inputs:** body `communityName`, `communityDescription`, `communityRules`, `groupPhoto`; URL `postType`; query —; file `single("groupPhoto")`
- **Outputs:** `400 { message, error }`, `400 { message }`, `500 { success, message }`, `201 { success, post }`, `400 { success, message }`
- **Code:** `backend/src/controllers/postControllers/createCommunityPost.controller.js`

### `POST /posts/applyJobPost/:id`

Apply to a job post.

- **Login required:** yes
- **Inputs:** body `description`, `resume`; URL `id`; query —
- **Outputs:** `404 { message }`, `400 { message }`, `200 { message }`, `500 { message, error }`
- **Code:** `backend/src/controllers/postControllers/applyJobPost.js`

### `GET /posts/getPostedJobs`

List the jobs the logged-in user has posted.

- **Login required:** yes
- **Inputs:** body —; URL —; query —
- **Outputs:** `404 { message }`, `200 { message, data }`, `500 { message }`
- **Code:** `backend/src/controllers/postControllers/getPostedJobs.js`

### `POST /posts/applyCommunity/:id`

Join a community.

- **Login required:** yes
- **Inputs:** body —; URL `id`; query —
- **Outputs:** `404 { message }`, `303 { message }`, `403 { message }`, `200 { message }`, `500 { message, error }`
- **Code:** `backend/src/controllers/postControllers/applyCommunityPost.js`

### `GET /posts/getCommunityChatList`

List the communities the logged-in user belongs to.

- **Login required:** yes
- **Inputs:** body —; URL —; query —
- **Outputs:** `404 { message }`, `200 { data, message }`, `500 { message, error }`
- **Code:** `backend/src/controllers/postControllers/getCommunityList.js`

### `POST /posts/upvotePost/:postId/:likeStatus`

Upvote or remove an upvote on a post (daily upvote limit applies).

- **Login required:** yes
- **Inputs:** body —; URL `postId`, `likeStatus`; query —
- **Outputs:** `404 { message }`, `200 { message }`, `400 { message }`, `400 { message, error }`
- **Code:** `backend/src/controllers/postControllers/upvotePost.js`

### `POST /posts/createComment/:id`

Comment on a post.

- **Login required:** yes
- **Inputs:** body `comment`, `message`; URL `id`; query —
- **Outputs:** `200 { message, newComment, profilePhoto, userName }`, `500 { message, error }`
- **Code:** `backend/src/controllers/postControllers/createComment.controller.js`

### `GET /posts/getComments/:id`

Get the comments on a post.

- **Login required:** yes
- **Inputs:** body —; URL `id`; query —
- **Outputs:** `404 { message }`, `200 { message, data }`, `500 { message }`
- **Code:** `backend/src/controllers/postControllers/getComments.controller.js`

### `POST /posts/deletePost/:id`

Delete a post (and its community, if it is a community post).

- **Login required:** yes
- **Inputs:** body —; URL `id`; query —
- **Outputs:** `400 { message }`, `200 { message }`, `404 { message }`
- **Code:** `backend/src/controllers/postControllers/deletePost.controller.js`

### `GET /posts/getPosts`

Get the home feed of posts.

- **Login required:** yes
- **Inputs:** body —; URL —; query —
- **Outputs:** `404 { message }`, `200 { message, data, bookmarks }`, `500 { message, error }`
- **Code:** `backend/src/controllers/postControllers/getPost.controller.js`

### `POST /posts/getAppliedJobApplicants`

List the people who applied to a job.

- **Login required:** yes
- **Inputs:** body `jobPostIds`, `jobId`; URL —; query —
- **Outputs:** `200 { message, data }`, `500 { message }`
- **Code:** `backend/src/controllers/postControllers/getAppliedJobApplicants.js`

### `POST /posts/groupPhoto/:comid`

Change a community's group photo. (Registered twice in production; the first one handles requests.)

- **Login required:** yes
- **Inputs:** body `communityName`, `communityDescription`; URL `comid`; query —; file `single("media")`
- **Outputs:** `400 { message }`, `500 { message, error }`, `404 { message }`, `200 { message, updatedCommunity, communityPosts }`
- **Code:** `backend/src/controllers/postControllers/groupPhoto.js`

### `POST /posts/lockCommunity/:id/:status`

Lock or unlock a community (community admin only).

- **Login required:** yes
- **Inputs:** body —; URL `id`, `status`; query —
- **Outputs:** `200 { message }`, `500 { message }`
- **Code:** `backend/src/controllers/postControllers/lockController.js`

### `POST /posts/updateCommunity/:id`

Edit a community's details (community admin only).

- **Login required:** yes
- **Inputs:** body `communityName`, `communityDescription`; URL `id`; query —
- **Outputs:** `200 { message }`, `500 { message }`
- **Code:** `backend/src/controllers/postControllers/updateCommunity.js`

## Chat (/chats)

### `POST /chats/sendMessage/:id`

Send a chat message (one-to-one or group); delivered live via Socket.IO and as a push notification.

- **Login required:** yes
- **Inputs:** body `sharedToUsers`; URL `id`; query —
- **Outputs:** `404 { error }`, `200 value`, `404 { error, message }`
- **Code:** `backend/src/controllers/chatControllers/sendMessage.controller.js`

### `GET /chats/getMessage/:chatType/:id`

Get the message history of a chat (chatType = group or individual).

- **Login required:** yes
- **Inputs:** body —; URL `id`, `chatType`; query —
- **Outputs:** `404 { message, senderProfilePhoto, recieverProfilePhoto }`, `200 { message, data, senderProfilePhoto, recieverProfilePhoto }`, `400 { message, error }`
- **Code:** `backend/src/controllers/chatControllers/getMessage.controller.js`

### `POST /chats/addToChatDirectly/:id`

Add a user to the logged-in user's chat list.

- **Login required:** yes
- **Inputs:** body —; URL `id`; query —
- **Outputs:** `404 { message }`, `200 { message }`, `404 { message, error }`
- **Code:** `backend/src/controllers/chatControllers/addToChatListDirectly.js`

## Google sign-in (/auth)

### `GET /auth/google/callback`

Google sign-in return address (see note: Google strategy is never configured).

- **Login required:** **no**
- **Code:** `backend/src/routes/google.auth.routes.js`

### `GET /auth/google`

Start Google sign-in (see note: Google strategy is never configured).

- **Login required:** **no**
- **Code:** `backend/src/routes/google.auth.routes.js`

## Follow / unfollow (/connections)

### `POST /connections/followUser/:id`

Follow a user.

- **Login required:** yes
- **Inputs:** body —; URL `id`; query —
- **Outputs:** `400 { message }`, `404 { message }`, `200 { message }`, `500 { message }`
- **Code:** `backend/src/controllers/networkingConnectionsControllers/follow.controller.js`

### `POST /connections/unfollowUser/:id`

Unfollow a user.

- **Login required:** yes
- **Inputs:** body —; URL `id`; query —
- **Outputs:** `200 { message }`
- **Code:** `backend/src/controllers/networkingConnectionsControllers/unfollow.controller.js`

## Admin panel and APK (/admin)

### `POST /admin/registerAdmin`

Create an admin account. WARNING: no login required.

- **Login required:** **no**
- **Inputs:** body `userName`, `email`, `password`, `role`; URL —; query —
- **Outputs:** `200 { message, accessToken }`, `500 { message, error }`
- **Code:** `backend/src/controllers/adminControllers/addAdmin.js`

### `POST /admin/login`

Admin login; returns an access token.

- **Login required:** **no**
- **Inputs:** body `email`, `password`; URL —; query —
- **Outputs:** `404 text`, `401 text`, `200 { message, accessToken }`, `500 text`
- **Code:** `backend/src/controllers/adminControllers/loginAdmin.js`

### `POST /admin/createNewsletter`

Publish a newsletter (with image) and notify users.

- **Login required:** yes
- **Inputs:** body `title`, `content`, `taggedUserName`, `leaderboardCategory`; URL —; query —; file `single("newsletterImage")`
- **Outputs:** `400 { message }`, `400 { message, error }`, `201 { message, newsletter }`, `500 { message, error }`
- **Code:** `backend/src/controllers/adminControllers/createNewsletter.js`

### `GET /admin/getNewsletter/:id`

Get one newsletter.

- **Login required:** yes
- **Inputs:** body —; URL `id`; query —
- **Outputs:** `400 { message }`, `200 { message, data }`, `500 { message }`
- **Code:** `backend/src/controllers/adminControllers/getNewsletter.js`

### `GET /admin/getAllNewletters`

List all newsletters. (Path spelling "Newletters" is part of the API.)

- **Login required:** yes
- **Inputs:** body —; URL —; query —
- **Outputs:** `404 { message }`, `200 { message, data }`, `500 { message }`
- **Code:** `backend/src/controllers/adminControllers/getAllNewsletters.js`

### `GET /admin/leaderboard/:category`

Get the newsletter leaderboard for a category (e.g. Investor).

- **Login required:** yes
- **Inputs:** body —; URL `category`; query —
- **Outputs:** `400 { message }`, `200 { message, newsletters }`, `500 { message, error }`
- **Code:** `backend/src/controllers/adminControllers/getLeaderboard.js`

### `POST /admin/addApkLink`

Admin adds a new APK version/link.

- **Login required:** yes (admin)
- **Inputs:** body `url`, `versionNumber`; URL —; query —
- **Outputs:** `200 { message }`, `400 { error }`
- **Code:** `backend/src/controllers/adminControllers/Addlink.js`

### `GET /admin/getInvestor`

List investors awaiting verification. WARNING: no login required.

- **Login required:** **no**
- **Inputs:** body —; URL —; query —
- **Outputs:** `200 { message }`
- **Code:** `backend/src/controllers/adminControllers/GetInvestor.js`

### `POST /admin/accptOrRejectInvestor/:id/:status`

Approve or reject an investor's verification. WARNING: no login required.

- **Login required:** **no**
- **Inputs:** body —; URL `id`, `status`; query —
- **Outputs:** `200 { message }`, `404 { message }`
- **Code:** `backend/src/controllers/adminControllers/accptOrRejectInvestor.js`

### `GET /admin/reportedPost`

List posts users have reported. WARNING: no login required.

- **Login required:** **no**
- **Inputs:** body —; URL —; query —
- **Outputs:** `200 { message }`, `200 text`
- **Code:** `backend/src/controllers/adminControllers/getReportedPost.js`

### `POST /admin/deletePost/:id`

Delete a reported post and close the report. WARNING: no login required.

- **Login required:** **no**
- **Inputs:** body `reportId`; URL `id`; query —
- **Outputs:** `400 { message }`, `200 { message }`, `404 { message }`
- **Code:** `backend/src/controllers/adminControllers/deleteReportedPostController.js`

### `GET /admin/apkForWebsite`

Download the APK for the website (fetched from Expo).

- **Login required:** **no**
- **Inputs:** body —; URL —; query —
- **Outputs:** `200 text`, `500 text`
- **Code:** `backend/src/controllers/adminControllers/getApkUrlForWebsite.js`

### `GET /admin/convertUserDataToExcel`

Export all users to a spreadsheet file. WARNING: no login required.

- **Login required:** **no**
- **Inputs:** body —; URL —; query —
- **Outputs:** `200 text`
- **Code:** `backend/src/controllers/adminControllers/Excel.js`

### `GET /admin/getBetaRating`

List beta-tester app ratings. WARNING: no login required.

- **Login required:** **no**
- **Inputs:** body —; URL —; query —
- **Outputs:** `200 { message }`, `404 { message }`
- **Code:** `backend/src/controllers/adminControllers/getBetaRating.js`

### `GET /admin/getUserCounts`

Count users with completed profiles, in total and per role. WARNING: no login required.

- **Login required:** **no**
- **Inputs:** body —; URL —; query —
- **Outputs:** `200 { message }`, `400 { message }`
- **Code:** `backend/src/controllers/adminControllers/getUserCounts.js`

### `GET /admin/ApkFromAssets`

Download the APK file stored in the back end (src/APK/Startsy.apk).

- **Login required:** **no**
- **Inputs:** body —; URL —; query —
- **Outputs:** `404 text`, `file download`, `500 text`
- **Code:** `backend/src/controllers/adminControllers/ApkFromAssets.js`

## Notifications (/notification)

### `GET /notification/getUserNotifiation`

Get the logged-in user's notifications. (Path spelling "Notifiation" is part of the API.)

- **Login required:** yes
- **Inputs:** body —; URL —; query —
- **Outputs:** `404 { message, pendingRequest }`, `200 { message, data, pendingRequest }`, `500 { message }`
- **Code:** `backend/src/controllers/notificationController/getUserNotifications.js`

### `GET /notification/getNotificationPost/:id`

Get the post a notification points to.

- **Login required:** yes
- **Inputs:** body —; URL `id`; query —
- **Outputs:** `400 { message }`, `200 { message, data }`, `500 { message }`
- **Code:** `backend/src/controllers/notificationController/getNotificationPost.js`

## Group chat (/groupChat)

### `GET /groupChat/getCommunityGroupChatList`

List the logged-in user's community group chats.

- **Login required:** yes
- **Inputs:** body —; URL —; query —
- **Outputs:** `404 { message }`, `200 { message, data }`, `500 { message, error }`
- **Code:** `backend/src/controllers/groupChat/getCommunityGroupList.js`

### `GET /groupChat/getGroupChatMessage/:id`

Get the messages of a group chat.

- **Login required:** yes
- **Inputs:** body —; URL `id`; query —
- **Outputs:** `404 { message }`, `200 { message, data }`, `500 { message }`
- **Code:** `backend/src/controllers/groupChat/getGroupChatMessage.js`

## Health check (/health)

### `GET /health/pingHealth`

Health check; answers "Pong". A timer pings this every 10 minutes to keep Render awake.

- **Login required:** **no**
- **Inputs:** body —; URL —; query —
- **Outputs:** `200 text`
- **Code:** `backend/src/controllers/health/pingHealth.js`

## Reporting (/report)

### `POST /report/postReport/:id`

Report a post.

- **Login required:** yes
- **Inputs:** body `reportType`; URL `id`; query —
- **Outputs:** `200 { message, report }`, `500 { message, error }`
- **Code:** `backend/src/controllers/reportControllers/postReport.controller.js`

## Misc. features living under /test (used by the live app)

### `GET /test/getUserFollowers/:id`

Get a user's followers/following lists.

- **Login required:** yes
- **Inputs:** body —; URL `id`; query —
- **Outputs:** `200 { followers, following }`
- **Code:** `backend/src/controllers/networkingConnectionsControllers/getUserFollow.js`

### `GET /test/getOnePost/:id`

Get a single post.

- **Login required:** yes
- **Inputs:** body —; URL `id`; query —
- **Outputs:** `404 { message }`, `200 { message, data, bookmarks }`, `500 { message, error }`
- **Code:** `backend/src/controllers/postControllers/getOnePost.js`

### `POST /test/savePost/:saveId/:saveStatus`

Save (bookmark) or unsave a post.

- **Login required:** yes
- **Inputs:** body —; URL `saveId`, `saveStatus`; query —
- **Outputs:** `404 { message }`, `200 { message }`, `400 { message }`, `500 { message }`
- **Code:** `backend/src/controllers/postControllers/savePost.js`

### `GET /test/getSavedPost`

List the logged-in user's saved posts.

- **Login required:** yes
- **Inputs:** body —; URL —; query —
- **Outputs:** `404 { message }`, `200 { success, data, message }`, `500 { success, message }`
- **Code:** `backend/src/controllers/postControllers/getSavedPost.js`

### `GET /test/getInvestorStatus`

Get the logged-in investor's verification status.

- **Login required:** yes
- **Inputs:** body —; URL —; query —
- **Outputs:** `200 { message, token }`, `500 { message }`
- **Code:** `backend/src/controllers/profileControllers/getInvestorController.js`

### `POST /test/markAsRead`

Mark chat messages as read.

- **Login required:** yes
- **Inputs:** body `senderId`, `receiverId`; URL —; query —
- **Outputs:** `200 { success, message }`, `500 { success, error }`
- **Code:** `backend/src/controllers/chatControllers/markAsRead.js`

### `POST /test/addField`

One-off database maintenance: adds isInvestorVerified to users missing it. WARNING: no login required.

- **Login required:** **no**
- **Inputs:** body —; URL —; query —
- **Outputs:** `200 text`, `500 text`
- **Code:** `backend/src/controllers/adminControllers/addFieldcontroller.js`

### `POST /test/getAllUsersWithStatus`

List users with their follow/chat status relative to the logged-in user.

- **Login required:** yes
- **Inputs:** body `userIdsArray`; URL —; query —
- **Outputs:** `404 { message }`, `200 { message, data }`, `500 { message, error }`
- **Code:** `backend/src/controllers/networkingConnectionsControllers/getAllUserWithStatus.js`

### `GET /test/getPortfolioAndCertifications`

Get the logged-in user's portfolio and certifications.

- **Login required:** yes
- **Inputs:** body —; URL —; query —
- **Outputs:** `404 { message }`, `200 { success, portfolio, certification, message }`, `500 { success, message }`
- **Code:** `backend/src/controllers/profileControllers/getCerticateAndPortfolio.js`

### `GET /test/convertInvestorToCommunity`

Convert the logged-in investor into a community member.

- **Login required:** yes
- **Inputs:** body —; URL —; query —
- **Outputs:** `200 { accessToken }`, `500 { message }`
- **Code:** `backend/src/controllers/profileControllers/ConvertInvestorToCommunity.js`

### `POST /test/reportContent/:postId`

Report a post or profile (once per user).

- **Login required:** yes
- **Inputs:** body `reason`, `type`; URL `postId`; query —
- **Outputs:** `400 { message }`, `401 { message }`, `200 { message }`, `500 { message, error }`
- **Code:** `backend/src/controllers/reportControllers/ReportPostController.js`

### `POST /test/ratingsController`

Submit an app rating (stars, text, version).

- **Login required:** yes
- **Inputs:** body `ratingStars`, `ratingText`, `version`; URL —; query —
- **Outputs:** `400 { message }`, `200 { message }`, `500 { message }`
- **Code:** `backend/src/controllers/feedbackControllers/ratingController.js`

