// One-off database maintenance: gives every user without an isInvestorVerified field the value false.

import { User } from "../../models/user.model.js";

const addField = async (req, res) => {
    try {
        // Update existing documents to include isInvestorVerified with default value false
        await User.updateMany(
            { notificationToken: { $exists: false } }, // Only update if the field doesn't exist
            { $set: { notificationToken: "" } }
        );

        res.send("Field 'notificationToken' added to all existing records.");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating documents.");
    }
};

export default addField;
