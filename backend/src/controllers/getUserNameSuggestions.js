import { User } from "../models/user.model.js";

export const getUserNameSuggestions = async (req, res) => {
    try {
        let { userName } = req.params;
        const userId = req.user._id;


        const user = await User.findById(userId).populate("roleId");
        const LoggedinuserKeFollowing = user.following


        console.log(user.role);
        


        // console.log(LoggedinuserKeFollowing);


        // console.log(new Set(user.roleId.chatUsers));
        var list = user.roleId.chatUsers;

        // console.log(list);








        console.log(userName);
        userName = userName.substring(1,);

        if (userName == "howAllUser" || userName == "" || userName == undefined ) {
            var userSuggestions = await User.find().select("_id userName role profilePhoto followers isProfileComplete");
        }
        else {
            var userSuggestions = await User.find({
                userName: { $regex: `^${userName}`, $options: "i" }
            }).limit(3);
            console.log(userSuggestions.length);
        }




        if(user.role != "Investor"){
            var newarray = userSuggestions.filter((user) => user.role !== "Investor");
        }
        else{
            var newarray = userSuggestions.filter((user) => user.role == "Investor");
        }

        console.log(newarray);
        







        let finalarray = newarray.map((e) => {
            var status = "ok";
            let plainObj = e.toObject();
            if (list.includes(e._id)) {
                return { ...plainObj, status: "Connected" }
            }
            else if (!list.includes(e._id)) {

                // console.log("second");

                if (e.followers.includes(userId)) {
                    return { ...plainObj, status: "Request Sent" }

                }
                else {
                    return { ...plainObj, status: "Connect" }

                }

            }


        })

        // console.log(finalarray, "okkkkkkkkkk");






        if (!userSuggestions) {
            return res.status(400).json({ message: "No matching users found" });
        }
        return res.status(200).json({
            message: "User name suggestions found",
            data: finalarray,
        })
    }
    catch (error) {
        return res.status(404).json({
            message: "Error fetching user suggestions",
            error: error.message,
        })
    }
}