import cron from "node-cron";
import axios from "axios";
import * as cheerio from "cheerio"; // Cheerio lets us read HTML like a browser
import { Scheme } from "../models/schemeSchema.js";

// ==========================================
// 1. THE WEB SCRAPER (The Scout)
// ==========================================
const scrapeGovtPortal = async () => {
  console.log("Scout deployed: Fetching HTML from the government portal...");
  
  // Replace this with the actual URL you want to scrape
  const TARGET_URL = "https://example-govt-portal.in/schemes"; 
  
  try {
    // 1. Download the raw HTML of the page
    const { data: html } = await axios.get(TARGET_URL);
    
    // 2. Load the HTML into Cheerio
    const $ = cheerio.load(html);
    const freshSchemes = [];

    // 3. Loop through every "card" on the screen. 
    // YOU MUST CHANGE '.scheme-card' TO MATCH THE ACTUAL WEBSITE'S HTML CLASS!
    $('.scheme-card').each((index, element) => {
      
      // Extract the text from the HTML tags
      const title = $(element).find('.scheme-title').text().trim();
      const benefit = $(element).find('.scheme-benefit').text().trim();
      const targetCategory = $(element).find('.target-audience').text().trim();
      
      // Generate a custom ID based on the title so we don't create duplicates later
      const generatedId = `SM-${title.substring(0, 5).toUpperCase().replace(/\s/g, '')}-${index}`;

      // Only push it if the scraper actually found a title
      if (title) {
        freshSchemes.push({
          customId: generatedId,
          title,
          benefit,
          targetCategory
        });
      }
    });

    console.log(`Scout returned with ${freshSchemes.length} fresh schemes.`);
    return freshSchemes;

  } catch (error) {
    console.error("Scout failed to scrape the portal:", error.message);
    return []; // Return an empty array so the server doesn't crash
  }
};

// ==========================================
// 2. THE AUTOMATED TRUCK (The Cron Job)
// ==========================================
export const startAutomatedDeliveryTruck = () => {
  
  console.log("🚚 Automated Delivery Truck is parked and waiting for 3:00 AM.");

  // This cron string means: "Minute 0, Hour 3, Every Day, Every Month, Every Year"
  cron.schedule("0 3 * * *", async () => {
    console.log("⏰ 3:00 AM: Waking up the scraper...");

    try {
      // 1. Get the data
      const freshGovtData = await scrapeGovtPortal(); 

      if (freshGovtData.length === 0) {
        console.log("No data found today. Going back to sleep.");
        return;
      }

      console.log("Updating MongoDB Refrigerator...");
      let newCount = 0;
      let updateCount = 0;

      // 2. THE UPSERT LOOP (Update or Insert)
      for (const scheme of freshGovtData) {
        
        const result = await Scheme.findOneAndUpdate(
          { customId: scheme.customId }, // Search for this exact ID
          { 
            title: scheme.title,
            benefit: scheme.benefit,
            targetCategory: scheme.targetCategory
          }, 
          { 
            upsert: true, // MAGIC WIRE: Create it if it doesn't exist
            new: true,    // Return the updated document
            rawResult: true // Gives us metadata so we know if it was inserted or updated
          } 
        );

        // Just some nice logging to see what happened
        if (result.lastErrorObject.updatedExisting) {
          updateCount++;
        } else {
          newCount++;
        }
      }

      console.log(`✅ MongoDB Restocked! New: ${newCount} | Updated: ${updateCount}`);

    } catch (error) {
      console.error("Nightly automated update completely failed:", error);
    }
  });
};