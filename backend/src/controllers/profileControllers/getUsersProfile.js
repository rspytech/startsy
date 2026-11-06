import { User } from "../../models/user.model.js";
import { Founder } from "../../models/founder.model.js";
import { Freelancer } from "../../models/freelancer.model.js";
import { CommunityMember } from "../../models/communityMember.model.js";
import { Post } from "../../models/post.model.js";
import { Investor } from "../../models/investor.model.js";
import { General } from "../../models/general.model.js";
import { calculateProfileCompletion } from "./ProfileCompletion.js";

export const getUsersProfiles = async (req, res) => {
    try {
        // Map roles to their respective models
        const roleMap = {
            Founder: Founder,
            Freelancer: Freelancer,
            CommunityMember: CommunityMember,
            Investor: Investor,
        };
        const loggedInUserId = req.user._id;
        const userId = req.params.id;

        var temp = await User.find({ _id: userId });

        var temp2 = await General.find({ _id: temp.roleId });

        const user = await User.findById(userId).populate("roleId");

        const loggedInUser = await User.findById(loggedInUserId).populate("roleId");
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const userRole = user.role;

        let status;
        // if(user.following.includes(loggedInUserId) && user.followers.includes(loggedInUserId)){
        //     status = "Followed";
        // }

        if (
            user.roleId.chatUsers.includes(loggedInUserId) &&
            loggedInUser.roleId.chatUsers.includes(userId)
        ) {
            status = "Followed";
        } else if (user.followers.includes(loggedInUserId)) {
            status = "Pending Request";
        } else {
            status = "Follow";
        }

        // const role = roleMap[userRole]; commented
        const role = "General";
        if (!role) {
            return res.status(400).json({ message: "Invalid user role." });
        }
        let userProfile;
        // Fetch the user's profile with basic `posts` population
        if (true) {
            userProfile = await General.findOne({ user_id: userId })
                .populate({
                    path: "user_id chatUsers",
                }) // Populate user details
                .populate({ path: "posts" }) // Basic population for `posts`
                .lean();

            // console.log("User Profile:", userProfile);

            if (!userProfile) {
                return res
                    .status(404)
                    .json({
                        message:
                            "Profile not found. Ensure the user_id is correctly linked in the role-specific collection.",
                    });
            }

            // Conditionally populate `jobPosts` or `communityPost` in each post
            const populatedPosts = await Promise.all(
                userProfile.posts.map(async (post) => {
                    if (post.type === "jobPost") {
                        return await Post.findById(post._id).populate("jobPosts").lean();
                    } else if (post.type === "communityPost") {
                        return await Post.findById(post._id).populate("communityPost").lean();
                    }
                    return post; // Return the post as-is if type doesn't match
                })
            );

            // Update `userProfile.posts` with the conditionally populated posts
            userProfile.posts = populatedPosts;
        } else {
            userProfile = await General.findOne({ user_id: userId })
                .populate({
                    path: "user_id chatUsers",
                }) // Populate user details
                .lean();

            // console.log("User Profile:", userProfile);

            if (!userProfile) {
                return res
                    .status(404)
                    .json({
                        message:
                            "Profile not found. Ensure the user_id is correctly linked in the role-specific collection.",
                    });
            }
        }
        var profileCompletion = calculateProfileCompletion(userProfile, userRole);
        // console.log(profileCompletion);

        return res.status(200).json({
            message: "Profile details fetched successfully.",
            data: userProfile,
            status: status,
            profileCompletion: profileCompletion,
            // connectionCount: counts[0] || { followersCount: 0, followingCount: 0 },
        });
    } catch (error) {
        console.error("Error:", error.message);
        return res
            .status(500)
            .json({ message: "Error while fetching profile details.", error: error.message });
    }
};
