import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { errorMiddleware } from "./middlewares/error.js";
import { dbConnection } from "./database/dbConnection.js";
import reservationRouter from "./routes/reservationRoute.js";
import userRouter from "./routes/userRoute.js"; 
import schemeRouter from "./routes/schemeRoute.js";
import { startAutomatedDeliveryTruck } from "./utils/schemeUpdater.js"; // 1. IMPORT IT

// PHASE 1: LOAD ENVIRONMENT VARIABLES FIRST
dotenv.config({ path: "./config.env" });

const app = express();

// PHASE 2: BORDER PATROL (CORS)
app.use(cors({
    origin: "https://sche-1.onrender.com", 
    credentials: true
}));

// PHASE 3: THE PARSERS (Must be exactly here, before routes)
app.use(cookieParser()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// PHASE 4: THE ROUTES
app.use("/api/v1/schemes", schemeRouter);
app.use("/api/v1/reservation", reservationRouter);
app.use("/api/v1/user", userRouter); 

app.get("/", (req, res, next) => {
  return res.status(200).json({ success: true, message: "HELLO WORLD AGAIN" });
});

// PHASE 5: DATABASE & ERROR HANDLIN

dbConnection();
// 2. TURN IT ON RIGHT BEFORE EXPORTING/LISTENING
startAutomatedDeliveryTruck();
app.use(errorMiddleware);

export default app;
