import { Post } from "../../models/post.model.js";
import { Save } from "../../models/save.model.js";
import { User } from "../../models/user.model.js";

export const getPosts = async (req, res) => {
    try {
        // Retrieve posts with the user_id populated
        let posts = await Post.find().populate("user_id");
        // console.log(posts);

        // Fetch the user's followers and following list
        var user_id = req.user._id;
        console.log(user_id , "logged in");
        
        var savePosts = await Save.findOne({ userId: user_id });
        console.log(savePosts?.saveId);
        if (savePosts?.saveId == null) {
            var save = []
        }
        else {
            var save = savePosts?.saveId;
        }

        if (!posts || posts.length === 0) {
            return res.status(404).json({ message: "No posts found" });
        }
        const currentUser = await User.findById(user_id).select("followers following");

        // Filter posts based on privacy settings
        const visiblePosts = posts.filter((post) => {
            if (!post.isPrivate) {
                // Public posts are always visible
                return true;
            }
            console.log(post.user_id._id , "ok");

            console.log(user_id , post.user_id._id);
            
            
            if (user_id.toString() == post.user_id._id.toString()) {
                console.log("recahed here");
                
                return true; // User is the owner of the post, always visible
            }


            // Private posts are visible only if the user is a follower or following the post's owner
            const postOwnerId = post.user_id;
            return (
                currentUser.followers.includes(postOwnerId) ||
                currentUser.following.includes(postOwnerId)
            );
        });

        // Populate specific fields based on post type
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

        return res.status(200).json({
            message: "Posts retrieved successfully",
            data: populatedPosts,
            bookmarks: save
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Error retrieving posts",
            error: error.message,
        });
    }
};