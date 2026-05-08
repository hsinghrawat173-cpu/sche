import express from "express";
import { register, login, getUserProfile, logout, updateProfile } from "../controller/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", isAuthenticated, getUserProfile);
router.get("/logout", isAuthenticated, logout);
router.put("/update", isAuthenticated, updateProfile);

export default router;