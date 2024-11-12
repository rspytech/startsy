import { Founder } from "../../models/founder.model.js";

export const getFounderNotifications = async (req, res) => {
    try {
        const founderId = req.user._id;
        const founder = await Founder.findOne({user_id : founderId});
        if (!founder) {
            return res.status(404).json({ message: "Founder not found" });
        }
        
        const investorRequestNotifications = founder.populate('requestNotifications.investor');
        
        if(!investorRequestNotifications){
            return res.status(404).json({ message: "No notifications found" });
        }
        
        return res.status(200).json({
            message : "Request notifications fetched successfully",
            data : investorRequestNotifications,
        });

    }
    catch (error) {
        return res.status(500).json({ message: "Error duting fetching request notifications "});
    }
}

/* 
    NOTE 
    - This controller would send the set of investor who have sent notification to a specific founder. So it would 
    contain the set of investor Ids (User Schema) too inside it.
    - When a founder would come and accept a particular request the id of that specific investor would be sent by frontend
      by using the key functionality of map in JS.

    SAMPLE CODE : 

    return (
    <div>
        {investorRequests.map((investor) => (
            <div key={investor._id}>
            <p>{investor.name} has requested to connect</p>
            <button onClick={() => handleAcceptRequest(investor._id)}>Accept</button>
            </div>
        ))}
    </div>
    );

*/