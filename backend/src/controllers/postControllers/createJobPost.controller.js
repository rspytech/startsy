import { JobPost } from "../../models/jobPost.model.js";
import { Post } from "../../models/post.model.js";
import { User } from "../../models/user.model.js";
import { preprocessText } from "../../utils/textPreprocessing.js";

export const createJobPost = async (req, res) => {
    try {
        const type = req.params.postType;
        const {role, description, duration, pay , amount} = req.body;
        const user_id = req.user._id;

        const user = await User.findById(user_id).populate("roleId");
        if (!user || !user.roleId) {
            return res.status(500).json({ success: false, message: 'User roleId not found' });
        }

        const {
            skills,
            description: userDescription,
            preferredSector,
            areaOfInterest,
            contentPrefrence,
            tagline,
            hiddenInfo
        } = user.roleId;

        const creatorText = [
            skills,
            userDescription,
            preferredSector,
            areaOfInterest,
            contentPrefrence,
            tagline,
            hiddenInfo?.sector
        ].filter(Boolean).join(" ");


        const jobPost = await JobPost.create({role, description, duration, pay , amount});

        if (!jobPost) {
            return res.status(400).json({ message: "Error while creating a job post" });
        }
        // Preprocess text fields for content-based recommendations
        const combinedText = `${role} ${description} ${creatorText}`;
        const preprocessedText = preprocessText(combinedText);
        const post = await Post.create({
            user_id,
            type,
            jobPosts: jobPost._id,
            preprocessedText
        });

        

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