import { User } from "../../models/user.model.js";

export const followUser = async(req, res) => {
    try{
        const loggedInUserId = req.user._id;
        const followedUserId = req.params.id;

        const updatedLoggedInUser = User.findByIdAndUpdate({_id : loggedInUserId},{
            $addToSet : {
                following : followedUserId,
            }
        });

        const updatedFollowedUser = User.findByIdAndUpdate({_id : followedUserId}, {
            $addToSet : {
                followers: loggedInUserId,  
            }
        });

        await Promise.all([updatedLoggedInUser, updatedFollowedUser]);

        return res.status(200).json({message : "User followed successfully."});
    }
    catch(error){
        return res.status(200).json({
            message : `Error occured while following user. ERROR : ${error}`
        });
    }
}