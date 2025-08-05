    import { Save } from "../../models/save.model.js";
    import { User } from "../../models/user.model.js";
    import { userVectorQueue } from "../../vector/vector.queue.js";

    export const savePost = async (req, res, ) => {
        try {
            const userId = req.user._id;    
            console.log(userId);

            const { saveId, saveStatus } = req.params;

            let save = await Save.findOne({ userId });
            console.log(save);
            if (!save) {
                var rec1 = new Save({
                    userId: userId,
                    saveId: []
                })
                await rec1.save();
            }

            // console.log(save);

            
            // if (!save) {
            //     return res.status(404).json({ message: "Save not found" });
            // }
            const user = await User.findById(userId);
            console.log(user);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            if (saveStatus === "add") {
                await save.updateOne({
                    $addToSet: { saveId: saveId }
                })
                await save.save();
                await userVectorQueue.add("generateUserVector", { userId: userId.toString()});
                return res.status(200).json({ message: "Save added successfully" });
            }
            else if (saveStatus === "remove") {
                await save.updateOne({
                    $pull: { saveId: saveId }
                })
                await save.save();
                await userVectorQueue.add("generateUserVector", { userId: userId.toString()});
                return res.status(200).json({ message: "Save removed successfully" });
            }else{
                return res.status(400).json({ message: "Invalid save status" });
            }
            
            
        }


        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server Error" });
        }
    }