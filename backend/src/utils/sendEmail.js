// Sends the OTP verification email through Gmail, using the EMAIL_USER / EMAIL_PASS settings.

import nodemailer from "nodemailer";
import { VERIFICATION_EMAIL_TEMPLATE } from "./template/emailTemplate.js";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendEmail = async (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your OTP Code",
        //     text: `We received a request to reset your password for your Startsy account. To proceed, please use the following One-Time Password (OTP):

        // 🔑 [${otp}]

        // This OTP is valid for 5 minutes. If you did not request a password reset, please ignore this email.

        // For security reasons, do not share this OTP with anyone. If you need any assistance, feel free to contact our support team at teamstartsy@gmail.com.`,
        html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", otp),
    };

    await transporter.sendMail(mailOptions);
};
