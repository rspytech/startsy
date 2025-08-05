import { JobApplicantDescription } from "../../models/JobApplicantDescription.js";
import { Post } from "../../models/post.model.js";
import { User } from "../../models/user.model.js";

export const UsersAppliedForJobs = async (req, res) => {
    try {
        const user_id = req.user._id;
        const { jobPostIds, jobId } = req.body
        console.log(jobPostIds , jobId);
        

        // const jobPosts = await User.find({ _id: { $in: jobPostIds } })
        //     .select("userName profilePhoto email contactInfo roleId role ")


        const extraData = await JobApplicantDescription.find(
            { jobId: jobId, user_id: { $in: jobPostIds } },
        ).populate("user_id", "userName profilePhoto email contactInfo roleId role")
        console.log(extraData);

        
        return res.status(200).json({
            message: "Fetched applied job applicants successfully",
            data: extraData,
        });
    } catch (error) {
        console.error("Error fetching applied job applicants:", error);
        return res.status(500).json({ message: "Error while fetching applied job applicants" });
    }
};
