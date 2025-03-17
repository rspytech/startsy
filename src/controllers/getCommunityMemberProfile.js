import { User } from "../models/user.model.js";
// ansh
export const getCommunityMemberProfile = async(req, res) => {
    try {
        const userId = req.user._id;
        var {array} = req.body;
        console.log(userId);
        console.log(req.body);
        console.log(array);
        
        
        


        

        const users = await User.find(
            { _id: { $in: array } },    // Find users whose _id is in the array
            { userName: 1, role: 1  , profilePhoto : 1 , followers : 1 , _id : 1}         // Only include name and email
        );
        console.log(users);
        
        const loggedin = await User.findById(userId).populate("roleId");
        const LoggedinuserKeFollowing = loggedin.following
        var list = loggedin.roleId.chatUsers;
        

        const userDetails = users.map(user => {
           
            if (list.includes(user._id)){
                return { 
                    id : user._id,
                    userName: user.userName,
                    role: user.role,
                    profilePhoto: user.profilePhoto,
                    status: "Connected" 
                }
            }
            else if (!list.includes(user._id)) {

                console.log("second");
                
                if (user.followers.includes(userId)) {
                    return {
                        id : user._id,
                        userName: user.userName,
                        role: user.role,
                        profilePhoto: user.profilePhoto,
                        status: "Request Sent" }

                }
                else {
                    return { 
                        id : user._id,
                        userName: user.userName,
                        role: user.role,
                        profilePhoto: user.profilePhoto,
                        status: "Connect" }

                }

            }
            
        });

        console.log(userDetails);

        return res.status(200).json({
            message : "Comments fetched successfully",
            data: userDetails,
        });
        

       
    }
    catch (error) {
        return res.status(500).json({ message: "Error fetching comments" });
    }
}