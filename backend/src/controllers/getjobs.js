import { Post } from "../models/post.model.js";

async function getjobs(req, res) {
    var userid = req.user._id;
    try {
        var rec1 = await Post.find({
            $and: [{ user_id: userid }, { type: "jobPost" }],
        });
        res.status(200).json({
            data: rec1,
        });
    } catch (err) {
        res.status(404).json({
            error: "Error while sharing post",
            message: err.message,
        });
    }
}

export default getjobs;
