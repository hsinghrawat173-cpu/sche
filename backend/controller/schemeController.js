
import { Scheme } from "../models/schemeSchema.js";
import { User } from "../models/userSchema.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. ANALYZE SCHEMES (The Hybrid AI Engine)
// 1. ANALYZE SCHEMES (The Hybrid AI Engine)

// THE ALGORITHM: Calculates a 0-100 score based on mathematical need and fit
const calculateImpactScore = (userProfile, scheme) => {
  let score = 20; // Base score just for qualifying

  const userOcc = (userProfile.occupation || "").toLowerCase();
  const schemeCat = (scheme.targetCategory || "general").toLowerCase();
  const userInc = Number(userProfile.income) || 0;
  const schemeLim = Number(scheme.incomeLimit) || 0;

  // 1. Occupation Match (Up to 40 points)
  if (schemeCat.includes(userOcc) || userOcc.includes(schemeCat)) {
    score += 40; // Perfect match
  } else if (schemeCat === "general") {
    score += 20; // Universal schemes get half points
  }

  // 2. Financial Need (Up to 40 points)
  // The closer the user is to extreme poverty relative to the scheme, the higher the impact.
  if (schemeLim > 0) {
    const needRatio = 1 - userInc / schemeLim;
    if (needRatio > 0) {
      score += Math.round(needRatio * 40);
    }
  } else {
    score += 30; // If there is no income limit, give a flat 30 points
  }

  // Cap it at 98 so it feels realistic (nobody gets a perfect 100)
  return Math.min(score, 98);
};
export const analyzeSchemes = async (req, res) => {
  try {
    const { userProfile } = req.body;
    console.log("🚨 TRIPWIRE 1: Frontend hit backend AI Route!");

    const allSchemes = await Scheme.find({});
    const safeOccupation = (userProfile.occupation || "General")
      .trim()
      .toLowerCase();
    const safeIncome = Number(userProfile.income) || 0;

    console.log(
      `🚨 TRIPWIRE 2: Found ${allSchemes.length} schemes. Slimming the payload...`,
    );

    const slimSchemes = allSchemes.map((scheme) => ({
      title: scheme.title,
      target: scheme.targetCategory || scheme.targetAudience,
    }));

    try {
      console.log("🚨 TRIPWIRE 3: Firing lightweight payload to Gemini...");
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `
        You are an expert government scheme matcher.
        User Profile: ${JSON.stringify(userProfile)}
        Available Schemes: ${JSON.stringify(slimSchemes)} 
      
        Compare the user's age, occupation, income, and category to the target audiences of the available schemes.
        
        Task: Act as a welfare expert. Return ONLY a JSON array of the schemes from the Shortlist. 
        For each one, add a field "title" with the exact scheme title, and "aiReason" explaining in 1 short sentence why it fits this user.
        Output ONLY valid JSON without any markdown formatting blocks.
      `;

      const result = await model.generateContent(prompt);

      const text = result.response
        .text()
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();
      const aiMatches = JSON.parse(text);

      console.log("🚨 TRIPWIRE 4: Google Responded Successfully!");

      const finalMatches = [];
      allSchemes.forEach((scheme) => {
        const matchedItem = aiMatches.find((item) =>
          scheme.title.toLowerCase().includes(item.title.toLowerCase()),
        );
        if (matchedItem) {
          const schemeObj = scheme.toObject();
          schemeObj.aiReason = matchedItem.aiReason;
          finalMatches.push(schemeObj);
        }
      });

      return res
        .status(200)
        .json({ success: true, matchedSchemes: finalMatches });
    } catch (geminiError) {
      console.error(
        "❌ Google API Failed. Triggering Fallback with Backup Bouncer...",
      );

      // THE BACKUP BOUNCER: This ONLY runs if Gemini fails.
      let fallbackSchemes = allSchemes
        .filter((scheme) => {
          const schemeCategory = (scheme.targetCategory || "General")
            .trim()
            .toLowerCase();
          const schemeLimit = Number(scheme.incomeLimit) || 0;

          const matchOcc =
            schemeCategory.includes(safeOccupation) ||
            safeOccupation.includes(schemeCategory) ||
            schemeCategory === "general" ||
            safeOccupation === "any";
          const matchInc = schemeLimit === 0 || safeIncome <= schemeLimit;

          return matchOcc && matchInc;
        })
        .map((scheme) => ({
          ...scheme.toObject(),
          aiReason: `Matched based on your profile as a ${safeOccupation}. (Standard Fallback Match)`,
          // Inside your array mapping or pushing, add this single line:
          impactScore: calculateImpactScore(userProfile, scheme),
        }));

      // Failsafe: If the backup bouncer is too strict and finds 0 matches, show 3 general schemes instead of a blank screen.
      if (fallbackSchemes.length === 0) {
        fallbackSchemes = allSchemes.slice(0, 7).map((scheme) => ({
          ...scheme.toObject(),
          aiReason: "Showing popular general schemes while AI is offline.",
          impactScore: calculateImpactScore(userProfile, scheme),
        }));
      }

      return res
        .status(200)
        .json({ success: true, matchedSchemes: fallbackSchemes });
    }
  } catch (error) {
    console.error("Backend Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
// 2. GET ALL SCHEMES (Needed for router)
export const getAllSchemes = async (req, res) => {
  try {
    const schemes = await Scheme.find({});
    res.status(200).json({ success: true, schemes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
  // CRITICAL FIX: Deleted the rogue console.log that would crash this function.
};

// 3. CREATE SCHEME (Needed for router/seeding)
export const createScheme = async (req, res) => {
  try {
    const newScheme = await Scheme.create(req.body);
    res.status(201).json({ success: true, scheme: newScheme });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    // We overwrite the existing valid cookie with a blank one that expires immediately
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    });

    res
      .status(200)
      .json({ success: true, message: "Logged out successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Logout failed." });
  }
};

// UPDATE USER PROFILE
export const updateProfile = async (req, res) => {
  try {
    // We grab the email to identify who is updating, and the new stats
    const { email, age, income, occupation } = req.body;

    // Find the user by email, update their stats, and return the fresh data
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { age, income, occupation },
      { new: true }, // This tells MongoDB to return the UPDATED profile, not the old one
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Profile Updated!", user: updatedUser });
  } catch (error) {
    console.error("Update Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update profile." });
  }
};

// GET MY PROFILE (The Load Save File Function)
export const getMyProfile = async (req, res) => {
  try {
    // 1. Check if the user has a valid login cookie
    const { token } = req.cookies;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not logged in." });
    }

    // 2. Decode the cookie to find out WHO this user is
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // 3. Pull their real data from MongoDB (and hide the password!)
    const user = await User.findById(decoded.id || decoded._id).select(
      "-password",
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // 4. Send the real data to React
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Profile Load Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to load profile." });
  }
};
