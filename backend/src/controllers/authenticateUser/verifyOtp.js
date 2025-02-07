import { Otp } from "../../models/otp.model.js";

export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
  
    if (!email || !otp) return res.status(400).json({ message: "Email and OTP are required" });
  
    try {
      const otpRecord = await Otp.findOne({ email });
  
      if (!otpRecord || otpRecord.otp !== otp) {
        return res.status(400).json({ message: "Invalid OTP" });
      }
  
      if (new Date() > otpRecord.expiresAt) {
        return res.status(400).json({ message: "OTP expired" });
      }
  
      await Otp.deleteOne({ email });
  
      return res.json({ message: "OTP verified successfully" });
    }
    catch (error) {
      res.status(500).json({ message: "Error verifying OTP", error });
    }
} 