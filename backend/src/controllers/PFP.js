import { User } from "../models/user.model.js";

async function PFP(req, res) {
    var id = req.user.id;

    var rec1 = await User.findById(id).select("profilePhoto");

    return res.status(200).json({
        data: rec1.profilePhoto,
    });
}

export default PFP;
