import { JobPost } from "../../models/jobPost.model.js";
import { Post } from "../../models/post.model.js";
import { User } from "../../models/user.model.js";

export const createJobPost = async (req, res) => {
    try {
        const type = req.params.postType;
        const {role, description, duration, pay} = req.body;
        const user_id = req.user._id;

        const jobPost = await JobPost.create({role, description, duration, pay});

        if (!jobPost) {
            return res.status(400).json({ message: "Error while creating a job post" });
        }

        const post = await Post.create({
            user_id,
            type,
            jobPosts: jobPost._id,
        });

        const user = await User.findById(user_id).populate("roleId");

        if (user.roleId && Array.isArray(user.roleId.posts)) {
            user.roleId.posts.push(post._id);
            await user.roleId.save();
        }

        if (!post) {
            return res.status(400).json({ message: "Failed to create main post" });
        }

        return res.status(201).json({ message: "Job post created successfully", post });

    }
    catch (error) {
        return res.status(500).json({message: "Error while creating a job post", error});
    }
}