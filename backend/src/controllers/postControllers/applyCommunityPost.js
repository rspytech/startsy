import { Post } from "../../models/post.model.js";
import { User } from "../../models/user.model.js";
import { Notification } from "../../models/notification.model.js";
import sendNotification from "../../utils/sendNotification.js";

export const applyCommunity = async (req, res) => {
    try {
        const communityPostId = req.params.id;
        const userId = req.user._id;

        const post = await Post.findById(communityPostId).populate("communityPost");

        if (!post) return res.status(404).json({ message: "Community not found" });
        console.log(post.communityPost.isLock);
        if (post.communityPost?.isLock) {
            return res.status(303).json({ message: "Group lock" });
        }

        const user = await User.findById(userId).populate("roleId");
        const communityRules = post.communityPost.communityRules;

        const checkCommunityAccess = () => {
            switch (communityRules) {
                case "Only for Founders":
                    if (user.role === "Founder") {
                        console.log("aefihaefjaofjoafjoaf");
                        console.log(user.role);
                        console.log(communityRules);
                        return true;
                    }
                    return false;
                case "Only for Community Members":
                    if (user.role === "CommunityMember") {
                        return true;
                    }
                    return false;
                case "Jobseeker":
                    if (user.role === "CommunityMember" && user.roleId.communityMemberRole === "Job seeker") {
                        return true;
                    }
                    return false;
                case "Mentor":
                    if (user.role === "CommunityMember" && user.roleId.communityMemberRole === "Mentor") {
                        return true;
                    }
                    return false;
                case "Startup Enthusiast":
                    if (
                        user.role === "CommunityMember" &&
                        user.roleId.communityMemberRole === "Startup Enthusiast"
                    ) {
                        return true;
                    }
                    return false;
                case "Networker":
                    if (user.role === "CommunityMember" && user.roleId.communityMemberRole === "Networker") {
                        return true;
                    }
                    return false;
                case "Founder or Mentor":
                    if (
                        (user.role === "CommunityMember" && user.roleId.communityRole === "Mentor") ||
                        user.role === "Founder"
                    ) {
                        return true;
                    }
                    return false;
                case "Founder or Startup Enthusiast":
                    if (
                        (user.role === "CommunityMember" &&
                            user.roleId.communityRole === "Startup Enthusiast") ||
                        user.role === "Founder"
                    ) {
                        return true;
                    }
                    return false;
                case "No rules":
                    return true;
                default:
                    return false;
            }
        };

        // if (!checkCommunityAccess()) {
        //     return res.status(403).json({ message: "You don't have permission to apply to this community" });
        // }

        if (post.communityPost.communityMembers.includes(userId)) {
            return res.status(403).json({ message: "You are already a member of this community" });
        }

        // Add user to community members and save
        post.communityPost.communityMembers.push(userId);
        await post.communityPost.save();

        // Add community to user’s community list and save
        user.communityList.push(post.communityPost._id);
        await user.save();

        await Notification.create({
            receivingUserId: post.user_id,
            sendingUserId: req.user._id,
            notificationType: "joinedCommunity",
            notificationMessage: `Joined ${post.communityPost.communityName}`,
        });
        var receiverIdToken = await User.findOne({ _id: post.user_id }).select("notificationToken");
        var rec2 = await User.findOne({ _id: req.user._id }).select("userName");
        var userNameForNotification = rec2.userName;
        var response = await sendNotification(
            receiverIdToken.notificationToken,
            `${userNameForNotification} joined your community `,
            ""
        );

        console.log("Community members updated:", post.communityPost.communityMembers);
        console.log("User's community list updated:", user.communityList);

        return res.status(200).json({
            message: "You have successfully applied to the community",
        });
    } catch (error) {
        console.error("Error in applyCommunity:", error);
        return res.status(500).json({
            message: "Error applying to community",
            error: error.message,
        });
    }
};
