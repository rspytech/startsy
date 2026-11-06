import { User } from "../../models/user.model.js";

export const getFounderNotifications = async (req, res) => {
    try {
        const founderId = req.user._id;

        // Find the user and populate roleId
        const user = await User.findById(founderId)
            .populate({
                path: "roleId",
                populate: {
                    path: "requestNotifications.investor",
                    select: "_id userName role profilePhoto role",
                    populate: {
                        path: "roleId",
                        select: "hiddenInfo user_id skills tagline hiddenInfo previousExperience investmentRange fullName role",
                    },
                },
            })
            .lean();

        const founder = user.roleId;
        console.log(founder);

        if (!founder) {
            return res.status(404).json({ message: "Founder not found" });
        }

        // Extract populated notifications
        const investorRequestNotifications = founder.requestNotifications;
        if (!investorRequestNotifications || investorRequestNotifications.length === 0) {
            return res.status(404).json({ message: "No notifications found" });
        }

        // Return the notifications
        return res.status(200).json({
            message: "Request notifications fetched successfully",
            data: investorRequestNotifications,
        });
    } catch (error) {
        console.error(`Error fetching notifications: ${error.message}`);
        return res.status(500).json({
            message: "Error during fetching request notifications",
        });
    }
};

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
