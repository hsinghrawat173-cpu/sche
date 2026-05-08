import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    // This looks inside the cookie jar we just parsed in app.js
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ success: false, message: "No valid session found." });
    }

    // Crack open the VIP wristband
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    // Attach the user to the request pipeline
    req.user = await User.findById(decoded.id);
    next();
    
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};