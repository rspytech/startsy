import { General } from "../../models/general.model.js";
import { User } from "../../models/user.model.js";

export const rejectRequest = async (req, res) => {
    try {
        const investorId = req.params.id; // Investor ID from request params
        const founderId = req.user._id; // Founder ID from the logged-in user (req.user)

        console.log(investorId);
        console.log(founderId);
        

        const investorUser = await User.findById(investorId).populate("roleId");
        const founderUser = await User.findById(founderId).populate("roleId");

        const investorGeneralId = investorUser.roleId._id;
        const founderGeneralId = founderUser.roleId._id;

        if (!investorUser || !investorUser.roleId) {
            return res.status(404).json({ message: "Investor not found" });
        }

        if (!founderUser || !founderUser.roleId) {
            return res.status(404).json({ message: "Founder not found" });
        }

        // Remove the founder request from the investor's requestedFounders list
        // if(investorUser.role === "Investor"){
        //     await investorUser.roleId.updateOne({
        //         $pull: { requestedFounders: { founder: founderId } }
        //     });
        // }
        if(true){
            await investorUser.roleId.updateOne({
                $pull: { requestedFounders: { founder: founderId } }
            });
            await investorUser.updateOne({
                $pull: { following:founderId , followers:founderId }
            });
            
            await General.findOneAndUpdate({_id: investorGeneralId},{
                $pull: { chatUsers: founderId }
            })

            await General.findOneAndUpdate({_id: founderGeneralId},{
                $pull: { chatUsers: investorId }
            })
            await investorUser.roleId.updateOne({
                $pull: { requestNotifications: { investor: investorId} }
            });

        }


        
        
        // Remove the investor's request notification from the founder's requestNotifications list
        await founderUser.roleId.updateMany({
            $pull: { requestNotifications: { investor: investorId} }
        });
        await founderUser.updateOne({
            $pull: { following:investorId, followers:investorId }
        });
        console.log({message:"Request rejected successfully"});
        
        return res.status(200).json({ message: "Request rejected successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


/* 
    NOTE 
    - The "getFounderNotifications" controller would send the set of investor who have sent notification to a specific founder. So it would 
    contain the set of investor Ids (User Schema) too inside it.
    - When a founder would come and accept a particular request the id of that specific investor would be sent by frontend
      by using the key functionality of map in JS.

    SAMPLE CODE : 

    return (
    <div>
        {investorRequests.map((investor) => (
            
            This is the key ID !!!
            
            <div key={investor._id}>                     
            <p>{investor.name} has requested to connect</p>
            <button onClick={() => handleAcceptRequest(investor._id)}>Accept</button>
            </div>
        ))}
    </div>
    );

*/