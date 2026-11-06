import { Report } from "../../models/report.model.js";
export const reportContent = async (req, res) => {
    try {
        const userId = req.user._id;
        const postId = req.params.postId;
        const { reason, type } = req.body; // `postId` can be a profile or post ID

        // console.log(userId);
        // console.log(postId);
        // console.log(reason);
        // console.log(type);

        if (!["Post", "User"].includes(type)) {
            return res.status(400).json({ message: "Invalid type. Must be 'Post' or 'Profile'." });
        }

        let report = await Report.findOne({ postId });

        if (!report) {
            report = new Report({ postId, type, reports: [] });
        }

        if (!Array.isArray(report.reports)) {
            report.reports = [];
        }

        //  Check if the user has already reported
        const alreadyReported = report.reports.some((r) => r.reportedBy.toString() === userId.toString());
        if (alreadyReported) {
            return res.status(401).json({ message: "You have already reported this content." });
        }

        report.reports.push({ reportedBy: userId, reason });
        await report.save();

        return res.status(200).json({ message: "Report submitted successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
