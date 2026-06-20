import { User } from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// ==========================================
// 1. REGISTER LOGIC
// ==========================================
export const register = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      age,
      gender,
      state,
      category,
      occupation,
      income,
    } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      age,
      gender,
      state,
      category,
      occupation,
      income,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES || "7d",
    });

    // 🛡️ UPGRADED: Render/Production friendly cookie
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Days
        secure: true, // REQUIRED for Render HTTPS
        sameSite: "none", // REQUIRED for Cross-Domain React
      })
      .json({
        success: true,
        message: "User Registered Successfully",
        user,
      });
  } catch (error) {
    // Cleanly handles the exact 11000 duplicate email error you hit earlier
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      return res.status(400).json({
        success: false,
        message: "An account with this email already exists. Please log in.",
      });
    }
    // 🛡️ UPGRADED: Guarantees a JSON response on crash
    console.error("Register Error:", error);
    res.status(500).json({ success: false, message: "Server error during registration.", error: error.message });
  }
};

// ==========================================
// 2. LOGIN LOGIC
// ==========================================
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password.",
      });
    }

    // 1. Verify the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid Email or Password." });
    }

    // 2. The Math Engine: Compare plain text to the database hash
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid Email or Password." });
    }

    // 3. Login successful! Generate the VIP Wristband (JWT)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES || "7d",
    });

    // 4. Send the token securely as an HTTP-only cookie
    // 🛡️ UPGRADED: Render/Production friendly cookie
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true, // Prevents hackers from stealing it via JavaScript
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        secure: true, // REQUIRED for Render
        sameSite: "none", // REQUIRED for Cross-Domain React
      })
      .json({
        success: true,
        message: "User Logged In Successfully",
        user: {
            _id: user._id,
            email: user.email,
        },
      });
  } catch (error) {
    // 🛡️ UPGRADED: Guarantees a JSON response on crash
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Server error during login." });
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
    const { password, ...safeUserData } = user.toObject();

    res.status(200).json({
      success: true,
      user: safeUserData, 
    });

  } catch (error) {
    console.error("Profile Fetch Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ==========================================
// NOTE: This was your duplicate login function (loginUser). 
// I left it intact so it doesn't break your routes if you were pointing to it!
// ==========================================
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please provide email and password.",
        });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES || "7d",
    });

    res.status(200).json({
      success: true,
      message: "Login successful! JWT secured.",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        occupation: user.occupation,
        income: user.income,
        category: user.category,
      },
      token: token, 
    });
  } catch (error) {
    console.error("Login Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error during login." });
  }
};

// ==========================================
// 4. LOGOUT LOGIC
// ==========================================
export const logout = async (req, res, next) => {
  try {
    // Overwrite the token with a blank string and expire it instantly
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
        secure: true, // 🛡️ UPGRADED
        sameSite: "none", // 🛡️ UPGRADED
      })
      .json({
        success: true,
        message: "User Logged Out Successfully.",
      });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ success: false, message: "Server error during logout." });
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
      { new: true, runValidators: true },
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ success: false, message: "Server error during profile update." });
  }
};
