import { User } from "../../models/user.model.js";

export const unfollowUser = async(req, res) => {
    try{
        const loggedInUserId = req.user._id;
        const unfollowedUserId = req.params.id; 

        

        const updatedLoggedInUser = User.findByIdAndUpdate({_id : loggedInUserId},{
            $pull : {
                following : unfollowedUserId, followers : unfollowedUserId
            }
            },
            { new: true });

        const updatedUnfollowedUser = User.findByIdAndUpdate({_id : unfollowedUserId}, {
            $pull : {
                followers: loggedInUserId
            }
        }, { new: true });

        await Promise.all([updatedLoggedInUser, updatedUnfollowedUser]);

        return res.status(200).json({message : "User unfollowed successfully."});
    }   
    catch(error){
        return res.status(200).json({
            message : `Error occured while unfollowing user. ERROR : ${error}`
        });
    }
}