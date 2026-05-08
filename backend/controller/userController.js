import { User } from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// ==========================================
// 1. REGISTER LOGIC
// ==========================================
export const register = async (req, res, next) => {
  try {
    const { name, email, password, age, gender, state, category, occupation, income } = req.body;

    const user = await User.create({
      name, email, password, age, gender, state, category, occupation, income
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES || "7d",
    });

    // Localhost friendly cookie (No 'secure: true' block)
    res.status(200).cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 
    }).json({
      success: true,
      message: "User Registered Successfully",
      user,
    });

  } catch (error) {
    // Cleanly handles the exact 11000 duplicate email error you hit earlier
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      return res.status(400).json({ 
        success: false, 
        message: "An account with this email already exists. Please log in." 
      });
    }
    next(error);
  }
};

// ==========================================
// 2. LOGIN LOGIC
// ==========================================
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please provide email and password." });
    }

    // Verify the user exists
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid Email or Password." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES || "7d",
    });

    // Localhost friendly cookie (No 'secure: true' block)
    res.status(200).cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 
    }).json({
      success: true,
      message: "User Logged In Successfully",
      user,
    });

  } catch (error) {
    next(error);
  }
};

// ==========================================
// 3. GET CURRENT LOGGED-IN USER
// ==========================================
export const getUserProfile = async (req, res) => {
  try {
    // Assuming req.user is populated by an authentication middleware
    const userId = req.user._id; 
    
    // Fetch the user from the DB
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // 🔒 STRICT SECURITY LOGIC: Remove the password field before sending to the client
    // .toObject() converts the Mongoose document to a plain JS object
    const { password, ...safeUserData } = user.toObject();

    res.status(200).json({
      success: true,
      user: safeUserData, // The password hash is completely gone now
    });

  } catch (error) {
    console.error("Profile Fetch Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ==========================================
// 4. LOGOUT LOGIC
// ==========================================
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Check if both fields were provided
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please provide email and password." });
    }

    // 2. Find the user in the database by their email
    // We add .select("+password") just in case you hid the password field in your schema
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    // 3. THE MAGIC TRICK: Compare the entered password to the database hash
    // bcrypt.compare takes the plain text input and compares it to the encrypted string
    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    // 4. GENERATE THE JWT (The Digital ID Card)
    // If we make it here, the password was perfect. We create a secure token for them.
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || "7d",
    });

    // 5. Send the token back to the frontend securely
    res.status(200).json({
      success: true,
      message: "Login successful! JWT secured.",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        occupation: user.occupation,
        income: user.income,
        category: user.category
      },
      token: token // Your React app will save this token to stay logged in
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Server error during login." });
  }
};

export const logout = async (req, res, next) => {
  try {
    // Overwrite the token with a blank string and expire it instantly
    res.status(200).cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    }).json({
      success: true,
      message: "User Logged Out Successfully."
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 5. UPDATE PROFILE LOGIC
// ==========================================
export const updateProfile = async (req, res, next) => {
  try {
    const newUserData = req.body;

    // Use the ID verified by the bouncer to update MongoDB
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id, 
      newUserData, 
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: updatedUser
    });
  } catch (error) {
    next(error);
  }
};