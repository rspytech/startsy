import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const verifyUser = async (req, res, next) => {
    try {
        var authHeader = req.headers.authorization;

        // console.log(authHeader);

        authHeader = authHeader.replaceAll(/Bearer/gi, "").trim();
        console.log(authHeader);

        // if (!authHeader || !authHeader.startsWith("Bearer ")) {
        //     return res.status(401).json({
        //         message: "Unauthorized Request. Token not found",
        //     });
        // }
        let token;
        token = authHeader;

        const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findOne({ _id: decodedToken._id });

        if (!user) {
            return res.status(400).json({
                message: "Invalid decoded token",
            });
        }

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({
            message: `Invalid user. Authentication Failed! ERROR: ${error.message}`,
        });
    }
};

export { verifyUser };
