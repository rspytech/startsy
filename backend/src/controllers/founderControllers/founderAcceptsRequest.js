// import { User } from "../../models/user.model.js";
// import { Founder } from "../../models/founder.model.js";
// import { Investor } from "../../models/investor.model.js";

// export const acceptRequest = async (req, res) => {
//     try {
//         const investorId = req.params.id;   // The one sending request
//         const founderId = req.user._id;     // The one accepting request

//         const investorUser = await User.findById(investorId).populate("roleId");
//         const founderUser = await User.findById(founderId).populate("roleId");

//         if (!investorUser || !investorUser.roleId) {
//             return res.status(404).json({ message: "Investor not found" });
//         }

//         if (!founderUser || !founderUser.roleId) {
//             return res.status(404).json({ message: "Founder not found" });
//         }

//         const investorProfile = investorUser.roleId;

//         if(investorUser.role === "Investor"){
//             const founderRequestIndex = investorProfile.requestedFounders.findIndex(
//                 (request) => request.founder.toString() === founderId.toString()
//             );

//             if (founderRequestIndex === -1) {
//                 return res.status(404).json({ message: "Founder not found in investor's request list" });
//             }
//         }
        

//         await Investor.findByIdAndUpdate(investorProfile._id, {
//             $pull: { requestedFounders: { founder: founderId } },
//             $push: { chatUsers: founderId }
//         });

//         await Founder.findByIdAndUpdate(founderUser.roleId._id, {
//             $inc: {
//                 investorConnections : 1,
//             },
//             $push: { chatUsers: investorId },
//             $pull: { requestNotifications: { investor: investorId } }
//         });
//         return res.status(200).json({ message: "Request accepted successfully" });
//     }
//     catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// };



// /* 
//     NOTE 
//     - The "getFounderNotifications" controller would send the set of investor who have sent notification to a specific founder. So it would 
//     contain the set of investor Ids (User Schema) too inside it.
//     - When a founder would come and accept a particular request the id of that specific investor would be sent by frontend
//       by using the key functionality of map in JS.

//     SAMPLE CODE : 

//     return (
//     <div>
//         {investorRequests.map((investor) => (
            
//             This is the key ID !!!
            
//             <div key={investor._id}>                     
//             <p>{investor.name} has requested to connect</p>
//             <button onClick={() => handleAcceptRequest(investor._id)}>Accept</button>
//             </div>
//         ))}
//     </div>
//     );

// */


import { User } from "../../models/user.model.js";
import { Founder } from "../../models/founder.model.js";
import { Investor } from "../../models/investor.model.js";

export const acceptRequest = async (req, res) => {
    try {
        const investorId = req.params.id;   // The one sending request
        const founderId = req.user._id;     // The one accepting request

        const investorUser = await User.findById(investorId).populate("roleId");
        const founderUser = await User.findById(founderId).populate("roleId");

        if (!investorUser || !investorUser.roleId) {
            return res.status(404).json({ message: "Investor not found" });
        }

        if (!founderUser || !founderUser.roleId) {
            return res.status(404).json({ message: "Founder not found" });
        }

        const investorProfile = investorUser.roleId;
        const founderProfile = founderUser.roeId;

        if(investorUser.role === "Investor"){
            const founderRequestIndex = investorProfile.requestedFounders.findIndex(
                (request) => request.founder.toString() === founderId.toString()
            );

            if (founderRequestIndex === -1) {
                return res.status(404).json({ message: "Founder not found in investor's request list" });
            }

            await Investor.findByIdAndUpdate(investorProfile._id, {
                $pull: { requestedFounders: { founder: founderId } },
                $push: { chatUsers: founderId }
            });

            await Founder.findByIdAndUpdate(founderUser.roleId._id, {
                $inc: {
                    investorConnections : 1,
                },
                $push: { chatUsers: investorId },
                $pull: { requestNotifications: { investor: investorId } }
            });
        }
        else{
            investorProfile.chatUsers.push(founderId);
            await investorProfile.save();

            founderProfile.chatUsers.push(investorId);
            founderProfile.requestNotifications = founderProfile.requestNotifications.filter(
                (notification) => notification.investor.toString() !== investorId.toString()
            );
            await founderProfile.save();
        }
        return res.status(200).json({ message: "Request accepted successfully" });
    }
    catch (error) {
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