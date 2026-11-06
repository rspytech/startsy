import { Post } from "../../models/post.model.js";
import { User } from "../../models/user.model.js";

export const getAppliedJobApplicants = async (req, res) => {
    try {
        const user_id = req.user._id;

        //Find all job posts created by the logged-in user
        const jobsPosted = await Post.find({
            user_id: user_id,
            type: "jobPost",
        }).populate({
            path: "jobPosts",
            populate: { path: "jobApplicants", select: "userName email profilePhoto contactInfo" },
        });

        if (!jobsPosted || jobsPosted.length === 0) {
            return res.status(404).json({ message: "No jobs posted" });
        }

        //Extract applicants from all jobs
        const appliedApplicants = jobsPosted.map((job) => ({
            jobId: job._id,
            jobTitle: job.jobPosts.role,
            applicants: job.jobPosts.jobApplicants,
        }));

        const phoneNumber = await User.find();
        console.log(appliedApplicants);

        return res.status(200).json({
            message: "Fetched applied job applicants successfully",
            data: appliedApplicants,
        });
    } catch (error) {
        console.error("Error fetching applied job applicants:", error);
        return res.status(500).json({ message: "Error while fetching applied job applicants" });
    }
};
