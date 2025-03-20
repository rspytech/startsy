import { Community } from "../models/community.model.js";
import { User } from "../models/user.model.js";

async function deleteMemberFromCommunity(req, res) {


    var { communityId, userId } = req.body;

    console.log(communityId);
    console.log(userId);
    try {
        const updatedCommunity = await User.findOneAndUpdate(
            { _id: userId },
            { $pull: { communityList: communityId } },  // Remove postId from postIds array
            { new: true }  // Return updated document
        );
        console.log('Updated User:', updatedCommunity);


        const updatedUser = await Community.findOneAndUpdate(
            { _id: communityId },
            { $pull: { communityMembers: userId } },  // Remove postId from postIds array
            { new: true }  // Return updated document
        );
        console.log('Updated User:', updatedUser);

        res.status(200).json({ 
            message: "user removed from community",
        });

    }
    catch(err){
         res.status(404).json({ 
            error: "Error while sharing post",
            message: err.message,
        });
    }

    


    

}


export default deleteMemberFromCommunity