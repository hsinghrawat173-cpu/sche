import dotenv from "dotenv";
// Make sure it loads your API key
dotenv.config({ path: "./config.env" }); 

const scanGoogleServers = async () => {
  console.log("Knocking on Google's door...");
  
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.models) {
      console.log("\n✅ YOUR API KEY HAS ACCESS TO THESE EXACT MODELS:");
      // Filter out the noise and just print the exact names we need
      const modelNames = data.models.map(m => m.name);
      console.log(modelNames);
    } else {
      console.log("\n❌ GOOGLE REJECTED THE SCANNER:");
      console.log(data);
    }
  } catch (error) {
    console.error("Scanner crashed:", error);
  }
};

scanGoogleServers();