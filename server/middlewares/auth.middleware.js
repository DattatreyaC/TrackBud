import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(400).json({ message: "Invalid token" });
        }

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(`error in isloggedIn midware ${error.message}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};
