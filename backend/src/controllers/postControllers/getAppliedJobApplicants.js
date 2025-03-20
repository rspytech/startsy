import { Post } from "../../models/post.model.js";
import { User } from "../../models/user.model.js";

export const UsersAppliedForJobs = async (req, res) => {
    try {
        const user_id = req.user._id;
        const {jobPostIds} = req.body

        const jobPosts = await User.find({ _id: { $in: jobPostIds } })
            .select("userName profilePhoto email contactInfo roleId ")


            return res.status(200).json({
                message: "Fetched applied job applicants successfully",
                data: jobPosts,
            });
    } catch (error) {
        console.error("Error fetching applied job applicants:", error);
        return res.status(500).json({ message: "Error while fetching applied job applicants" });
    }
};
