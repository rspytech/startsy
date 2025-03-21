import { Post } from "../../models/post.model.js";
import { Save } from "../../models/save.model.js";

export const getPosts = async (req, res) => {
    try {
        // Retrieve posts with the user_id populated
        let posts = await Post.find().populate("user_id");
        var user_id = req.user._id;
        var savePosts = await Save.findOne({ userId: user_id });
        console.log(savePosts?.saveId);
        if(savePosts?.saveId == null){
            var save = []
        }
        else{
            var save = savePosts?.saveId;
        }
        
        if (!posts || posts.length === 0) {
            return res.status(404).json({ message: "No posts found" });
        }

        // Populate specific fields based on post type
        const populatedPosts = await Promise.all(
            posts.map(async (post) => {
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
            bookmarks : save
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Error retrieving posts",
            error: error.message,
        });
    }
};
