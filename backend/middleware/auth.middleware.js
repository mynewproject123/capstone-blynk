import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Protect route middleware to check for Bearer token in the Authorization header
export const protectRoute = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers['authorization'];

    // Check if the authorization header is missing or doesn't start with "Bearer "
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "Unauthorized - No access token provided" });
    }

    // Extract the token from the Authorization header
    const accessToken = authorizationHeader.split(' ')[1]; // Extract token from "Bearer <token>"

    try {
      // Verify the access token using the secret
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      // Find the user by ID from the decoded token, excluding the password
      const user = await User.findById(decoded.userId).select("-password");

      // Check if the user exists
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      // Attach the user object to the request for use in subsequent middleware or route handlers
      req.user = user;

      next(); // Continue to the next middleware or route handler
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Unauthorized - Access token expired" });
      }
      throw error; // Propagate other errors
    }
  } catch (error) {
    console.log("Error in protectRoute middleware", error.message);
    return res.status(401).json({ message: "Unauthorized - Invalid access token" });
  }
};

// Admin-only route middleware
export const adminRoute = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); // Proceed if the user is an admin
  } else {
    return res.status(403).json({ message: "Access denied - Admin only" }); // Deny access if not an admin
  }
};
