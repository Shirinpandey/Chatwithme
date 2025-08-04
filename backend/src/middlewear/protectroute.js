import jwt from 'jsonwebtoken';
import User from "../models/usermodel.js";

export async function protectroute(req, res, next) {
    try {
        // Get the token from the cookies or Authorization header
        const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];

        // If token is not provided, respond with an error
        if (!token) {
            return res.status(400).json({ message: "Invalid - no token provided" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        // Find the user in the database using the userId from the decoded token
        const user = await User.findById(decoded.id).select('-password');

        // If user is not found, respond with an error
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Attach the user to the request object so it's available in the next middleware
        req.user = user;

        // Proceed to the next middleware
        next();

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error in middleware" });
    }
}
