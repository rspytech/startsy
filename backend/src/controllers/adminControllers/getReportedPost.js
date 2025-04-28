import { Report } from "../../models/report.model.js";

const fetchPendingReports = async (req, res) => {
    const pendingReports = await Report.find({ 
        status: "Pending", 
        type: "Post", 
        postId: { $ne: null, $exists: true } 
    })
    .populate({
        path: "postId",
        select: "user_id type mediaUrl mediaType content communityPost jobPosts",
        populate: {
            path: "user_id",
            select: "_id role userName profilePhoto"
        }
    })
    .populate({
        path: "reports.reportedBy",
        select: "_id userName profilePhoto role",
        model: "User"
    });
    
    // ⚠️ Filter out the ones where postId is still null after population
    const filteredReports = pendingReports.filter(report => report.postId !== null);
    
    if (filteredReports.length === 0) {
        return res.json({ message: [] });
    }
    
    // Continue with populating communityPost / jobPost as needed
    const populatedPosts = await Promise.all(
        filteredReports.map(async (post) => {
            if (post.postId?.type === "jobPost") {
                return await post.postId.populate("jobPosts");
            } else if (post.postId?.type === "communityPost") {
                return await post.postId.populate("communityPost");
            }
            return post;
        })
    );
    
    res.send(filteredReports);
    
};

export default fetchPendingReports
