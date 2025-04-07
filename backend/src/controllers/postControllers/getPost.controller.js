
// // asli code
// import { Post } from "../../models/post.model.js";
// import { Save } from "../../models/save.model.js";
// import { User } from "../../models/user.model.js";

// export const getPosts = async (req, res) => {
//     try {
//         // Retrieve posts with the user_id populated
//         let posts = await Post.find().populate({
//             path: "user_id",
//             select: "userName profilePhoto _id role ",
//         });
//         // console.log(posts);

//         // Fetch the user's followers and following list
//         var user_id = req.user._id;
//         console.log(user_id, "logged in");

//         var savePosts = await Save.findOne({ userId: user_id });
//         console.log(savePosts?.saveId);
//         if (savePosts?.saveId == null) {
//             var save = []
//         }
//         else {
//             var save = savePosts?.saveId;
//         }

//         if (!posts || posts.length === 0) {
//             return res.status(404).json({ message: "No posts found" });
//         }
//         const currentUser = await User.findById(user_id).select("followers following");

//         // Filter posts based on privacy settings
//         const visiblePosts = posts.filter((post) => {
//             if (!post.isPrivate) {
//                 // Public posts are always visible
//                 return true;
//             }
//             console.log(post.user_id._id, "ok");
//             console.log(user_id, post.user_id._id);

//             if (user_id.toString() == post.user_id._id.toString()) {
//                 console.log("recahed here");
//                 return true; // User is the owner of the post, always visible
//             }


//             // Private posts are visible only if the user is a follower or following the post's owner
//             const postOwnerId = post.user_id;
//             return (
//                 currentUser.followers.includes(postOwnerId) ||
//                 currentUser.following.includes(postOwnerId)
//             );
//         });



//         // Populate specific fields based on post type
//         const populatedPosts = await Promise.all(
//             visiblePosts.map(async (post) => {
//                 if (post.type === "jobPost") {
//                     return await post.populate("jobPosts");
//                 } else if (post.type === "communityPost") {
//                     return await post.populate("communityPost");
//                 }
//                 return post; // Return the original post if no type match
//             })
//         );


//         return res.status(200).json({
//             message: "Posts retrieved successfully",
//             data: populatedPosts,
//             bookmarks: save
//         });
//     }
//     catch (error) {
//         return res.status(500).json({
//             message: "Error retrieving posts",
//             error: error.message,
//         });
//     }
// };




// // check recommendation

import { Post } from "../../models/post.model.js";
import { Save } from "../../models/save.model.js";
import { User } from "../../models/user.model.js";
import { General } from "../../models/general.model.js";

export const getPosts = async (req, res) => {
    try {
        const userId = req.user._id;
        console.log(userId, "logged in");

        // Fetch user details (followers, following, roleId)
        const currentUser = await User.findById(userId)
            .populate("roleId")
            .select("following followers roleId");

        if (!currentUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const followingIds = currentUser.following.map(id => id.toString());
        const followerIds = currentUser.followers.map(id => id.toString());

        // Fetch saved posts
        const savedPostsData = await Save.findOne({ userId });
        const savedPosts = savedPostsData?.saveId || [];

        // Fetch all posts and populate user data
        let allPosts = await Post.find().populate("user_id");
        if (!allPosts.length) {
            return res.status(404).json({ message: "No posts found" });
        }

        // Filter posts based on privacy settings
        const visiblePosts = allPosts.filter((post) => {
            if (!post.isPrivate) return true;
            if (userId.toString() === post.user_id._id.toString()) return true;
            return followingIds.includes(post.user_id._id.toString()) || followerIds.includes(post.user_id._id.toString());
        });

        const populatedPosts = await Promise.all(
            visiblePosts.map(async (post) => {
                if (post.type === "jobPost") {
                    return await post.populate("jobPosts");
                } else if (post.type === "communityPost") {
                    return await post.populate("communityPost");
                }
                return post; // Return the original post if no type match
            })
        );

        // Fetch user's own posts
        let ownPosts = visiblePosts.filter((post) => post.user_id._id.toString() === userId.toString());

        // Fetch priority posts (followers & following)
        let priorityPosts = visiblePosts.filter((post) =>
            followingIds.includes(post.user_id._id.toString()) || followerIds.includes(post.user_id._id.toString())
        );

        // Fetch interest-based posts
        let interestPosts = [];
        if (currentUser.roleId?.areaOfInterest) {
            const interestUserIds = (await General.find({ areaOfInterest: currentUser.roleId.areaOfInterest })
                .select("user_id")).map(user => user.user_id.toString());

            interestPosts = visiblePosts.filter((post) =>
                interestUserIds.includes(post.user_id._id.toString()) &&
                !priorityPosts.includes(post) &&
                post.user_id._id.toString() !== userId.toString()
            );
        }

        // Fetch remaining posts
        const excludedUserIds = [...followingIds, ...followerIds, userId, ...interestPosts.map(p => p.user_id._id.toString())];
        let otherPosts = visiblePosts.filter((post) => !excludedUserIds.includes(post.user_id._id.toString()));

        // Merge all post categories while maintaining priority order
        const postSet = new Set();
        const finalPosts = [];
        [ownPosts, priorityPosts, interestPosts, otherPosts].forEach(postGroup => {
            postGroup.forEach(post => {
                if (!postSet.has(post._id.toString())) {
                    postSet.add(post._id.toString());
                    finalPosts.push(post);
                }
            });
        });

        // Sort final posts by creation date (newest first)
        finalPosts.sort((a, b) => b.createdAt - a.createdAt);

        return res.status(200).json({
            message: "Posts retrieved successfully",
            data: finalPosts,
            bookmarks: savedPosts,
        });
    } catch (error) {
        console.error("Error retrieving posts:", error);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};