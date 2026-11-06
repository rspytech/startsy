import { User } from "../../models/user.model.js";

export const registerUser = async (req, res) => {
    try {
        const { userName, password, role } = req.body;

        if (!userName || !password || !role) {
            return res.status(400).json({ message: "Please fill in all fields." });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ userName });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create a new user
        const newUser = new User({
            userName,
            password,
            role,
            refreshToken: "",
        });

        // Save the user to the database
        await newUser.save();

        // Generate tokens
        const refreshToken = newUser.generateRefreshToken();
        const accessToken = newUser.generateAccessToken();

        // Update refreshToken in the database
        await User.updateOne(
            { userName: userName },
            { $set: { refreshToken: refreshToken } },
            { upsert: false }
        );

        // Respond with Bearer tokens
        res.status(201).json({
            message: "User registered successfully",
            accessToken: `Bearer ${accessToken}`,
            refreshToken,
        });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Server error while registering" });
    }
};
