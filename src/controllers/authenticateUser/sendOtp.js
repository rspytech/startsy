import crypto from "crypto";
import { sendEmail } from "../../utils/sendEmail.js";
import { Otp } from "../../models/otp.model.js";

export const sendOtp = async (req, res) => {
    try {
        const {email} = req.body;
        
        if(!email){
            return res.status(400).json({message: 'Email is required.'});
        }
        
        const otp = crypto.randomInt(1000, 9999).toString();
        const expiresAt = new Date(Date.now() + 5 * 60000);

        await Otp.findOneAndUpdate(
            { email },
            { otp, expiresAt },
            { upsert: true, new: true }
        );
      
        await sendEmail(email, otp);
    
        return res.json({ message: "OTP sent successfully" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error while sending OTP" });
    }
}