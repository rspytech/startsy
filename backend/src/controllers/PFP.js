import { User } from "../models/user.model.js";

async function PFP(req,res){
    var id = req.user.id;
    console.log('====================================');
    console.log(id);

    var rec1 = await User.findById(id).select("profilePhoto");
    console.log(rec1)

    return res.status(200).json({
        data: rec1.profilePhoto,
    });
}

export default PFP