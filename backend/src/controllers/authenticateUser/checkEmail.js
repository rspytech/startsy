import {User} from "../../models/user.model.js"

export const checkEmail = async (req, res) => {
    try {
        const { email, /*contactInfo*/ } = req.body;
        if(!email  /* ||  !contactInfo*/){
            return res.status(400).json({message : "Email not recieved",});
        } 
        const userwithEmail = await User.findOne({ email: email });
        if (userwithEmail) {
            return res.status(400).json({ message: "Email already taken" });
        }

        // Check if contact number is already taken
        // const userWithContact = await User.findOne({ contactInfo: contactInfo });
        // if (userWithContact) {
        //     return res.status(400).json({ message: "Contact number already taken" });
        // }

        return res.status(200).json({ message: "Email is unique" });
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({message : "Error while checking email and contact number"});
    }
}