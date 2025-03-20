import { Post } from "../../models/post.model.js";
import { Notification } from "../../models/notification.model.js";

export const applyJobPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const user_id = req.user._id;

        const post = await Post.findById(postId).populate("jobPosts");

        if (!post) {
            return res.status(404).json({ message: "Job Post not found" });
        }

        if (!post.jobPosts || !post.jobPosts.jobApplicants) {
            return res.status(400).json({ message: "Invalid job post structure" });
        }

        if (post.jobPosts.jobApplicants.includes(user_id)) {
            return res.status(400).json({ message: "You have already applied for this job" });
        }

        post.jobPosts.jobApplicants.push(user_id);
        await post.jobPosts.save();

        await Notification.create({
            receivingUserId : post.user_id, 
            sendingUserId : req.user._id,
            appliedJobRole : post.jobPosts.role,
            notificationType: "jobApplied",
            notificationMessage : "Applied for your job posting.",
        });

        return res.status(200).json({ message: "Job Post Applied Successfully" });
    }
    catch (error) {
        console.error("Error applying to job post:", error);
        return res.status(500).json({ message: "An error occurred while applying for the job", error });
    }
};
