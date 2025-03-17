import { Report } from "../../models/report.model.js";

export const postReport = async(req, res) => {
    try {
        const reportingUserId = req.user._id;
        const {reportType} = req.body;
        
        let reportedUserId;
        let reportedPost;

        if(reportType === 'user'){
            reportedUserId = req.params.id;
        }

        else{
            reportedPost = req.params.id;
        }

        const newReport = await Report.create({
            reportingUserId,
            reportedUserId,
            reportedPost,
            reportType
        });

        return res.status(200).json({
            message: 'Report created successfully',
            report: newReport,
        })
    }
    catch (error) {
        return res.status(500).json({ message: 'Error creating report', error: error.message });
    }
}