import { Post } from "../../models/post.model.js";

export const getPostedJobs = async (req, res) => {
    try {
        const user_id = req.user._id;
        const jobsPosted = await Post.find({
            user_id: user_id,
            type: "jobPost",
        }).populate("jobPosts");

        if (!jobsPosted) {
            return res.status(404).json({ message: "No jobs posted" });
        }
        console.log(jobsPosted);

        return res.status(200).json({
            message: "Fetched posted jobs successfully",
            data: jobsPosted,
        });
    } catch (error) {
        return res.status(500).json({ message: "Error while fetching jobs posts" });
    }
};
