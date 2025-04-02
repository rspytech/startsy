import { Report } from "../../models/report.model.js";

const fetchPendingReports = async (req, res) => {
    try {
        const pendingReports = await Report.find({ status: "Pending" })
            .populate({
                path: "postId",
                select: "user_id type mediaUrl mediaType content communityPost jobPosts", // Fetching only postId and post photo
                populate: {
                    path: "user_id",
                    select: "_id role userName profilePhoto"
                }

            })
            .populate({
                path: "reports.reportedBy",
                select: "_id userName profilePhoto role", // Fetching only userId, username, and pfp
                model: "User"
            });

          
            


        if (pendingReports.length === 0) {            
            return res.json({ message: "No pending reports found" });
        }        

        const populatedPosts = await Promise.all(
            pendingReports.map(async (post) => {
                console.log(post.postId.type);

                if (post.postId.type === "jobPost") {
                    return await post.postId.populate("jobPosts");
                } else if (post.postId.type === "communityPost") {
                    return await post.postId.populate("communityPost");
                }
                return post; // Return the original post if no type match
            })
        );

        console.log(pendingReports);


        res.send(pendingReports);

    } catch (error) {
        console.error("Error fetching pending reports:", error);
    }
};

export default fetchPendingReports
