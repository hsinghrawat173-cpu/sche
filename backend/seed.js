import mongoose from "mongoose";
import { Scheme } from "./models/schemeSchema.js"; 

// 1. 15 Real, Highly-Specific Schemes
const realSchemes = [
  { customId: "SM-TECH-001", title: "National Tech Scholarship", benefit: "₹50,000 per year for B.Tech students.", targetCategory: "Students in engineering, income below ₹5L/yr.", ministry: "Ministry of Education" },
  { customId: "SM-FARM-002", title: "PM Kisan Samman Nidhi", benefit: "₹6,000 direct cash transfer annually.", targetCategory: "Farmers with agricultural land.", ministry: "Ministry of Agriculture" },
  { customId: "SM-GIRL-003", title: "Kanya Sumangala Scheme", benefit: "Financial assistance for female education.", targetCategory: "Female students, age under 25.", ministry: "Ministry of Women & Child Development" },
  { customId: "SM-BIZ-004", title: "PM Mudra Yojana", benefit: "Loans up to ₹10 Lakhs for non-corporate small businesses.", targetCategory: "Small business owners, entrepreneurs.", ministry: "Ministry of Finance" },
  { customId: "SM-HLTH-005", title: "Ayushman Bharat", benefit: "Health insurance cover of ₹5 lakhs per family.", targetCategory: "Low-income families, BPL card holders.", ministry: "Ministry of Health" },
  { customId: "SM-OLD-006", title: "Atal Pension Yojana", benefit: "Guaranteed minimum pension of ₹1,000 to ₹5,000.", targetCategory: "Citizens aged 18-40 working in unorganized sectors.", ministry: "Ministry of Finance" },
  { customId: "SM-HOUSE-007", title: "PM Awas Yojana", benefit: "Financial assistance for building affordable housing.", targetCategory: "Urban and rural poor without pucca houses.", ministry: "Ministry of Housing" },
  { customId: "SM-START-008", title: "Startup India Seed Fund", benefit: "Financial assistance for proof of concept and prototyping.", targetCategory: "DPIIT recognized startups.", ministry: "Ministry of Commerce" },
  { customId: "SM-WOMEN-009", title: "Stand-Up India", benefit: "Bank loans between ₹10 lakh and ₹1 crore for enterprises.", targetCategory: "Women entrepreneurs and SC/ST communities.", ministry: "Ministry of Finance" },
  { customId: "SM-FARM-010", title: "PM Fasal Bima Yojana", benefit: "Comprehensive crop insurance against natural calamities.", targetCategory: "Farmers growing notified crops.", ministry: "Ministry of Agriculture" },
  { customId: "SM-STUD-011", title: "Post Matric Scholarship", benefit: "Covers tuition fees and maintenance allowance.", targetCategory: "SC/ST/OBC students studying post-matriculation.", ministry: "Ministry of Social Justice" },
  { customId: "SM-LABOR-012", title: "PM Shram Yogi Maandhan", benefit: "Assured pension of ₹3,000/month after 60 years.", targetCategory: "Unorganized workers earning less than ₹15,000/month.", ministry: "Ministry of Labour" },
  { customId: "SM-FOOD-013", title: "PM Garib Kalyan Anna Yojana", benefit: "5 kg free wheat/rice per person per month.", targetCategory: "Poor families covered under NFSA.", ministry: "Ministry of Consumer Affairs" },
  { customId: "SM-SKILL-014", title: "PM Kaushal Vikas Yojana", benefit: "Free short-term skill training and certification.", targetCategory: "School/college dropouts and unemployed youth.", ministry: "Ministry of Skill Development" },
  { customId: "SM-TECH-015", title: "Digital India Internship", benefit: "Stipend of ₹10,000 per month for 2 months.", targetCategory: "Undergraduate tech and engineering students.", ministry: "Ministry of Electronics & IT" }
];

// 2. The Auto-Generator Loop (Builds 85 more schemes)
const generatedSchemes = [];
const ministries = ["Ministry of Rural Development", "Ministry of MSME", "Ministry of Textiles", "Ministry of Jal Shakti"];
const targets = ["Rural artisans", "Micro-enterprise owners", "Self-help groups", "Daily wage workers", "Disabled individuals"];

for (let i = 16; i <= 100; i++) {
  generatedSchemes.push({
    customId: `SM-AUTO-${i}`,
    title: `State Welfare Initiative Phase ${i}`,
    benefit: `Financial grant of ₹${(Math.floor(Math.random() * 5) + 1) * 1000} per month.`,
    targetCategory: targets[Math.floor(Math.random() * targets.length)],
    ministry: ministries[Math.floor(Math.random() * ministries.length)]
  });
}

// 3. Combine them all into the 'allSchemes' variable that was missing
const allSchemes = [...realSchemes, ...generatedSchemes];

// 4. The Execution with your exact MongoDB URI
const seedDB = async () => {
  try {
    console.log("Connecting directly to MongoDB...");
    // Your exact URI with the SchemeMatch database folder specified
    await mongoose.connect("mongodb+srv://harshrawat2803_db_user:rCvCOcH7a2cRmGgg@cluster0.ouksl0e.mongodb.net/SchemeMatch?appName=Cluster0"); 
    
    console.log("Wiping old database completely clean...");
    await Scheme.deleteMany();
    
    console.log(`Writing ${allSchemes.length} schemes directly to MongoDB...`);
    await Scheme.insertMany(allSchemes);
    
    console.log("✅ BOOM. 100 Schemes are now permanently saved in your MongoDB Database!");
    process.exit();
  } catch (error) {
    console.error("Database Write Failed:", error);
    process.exit(1);
  }
};

seedDB();