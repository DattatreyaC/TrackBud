import mongoose from "mongoose";
import express from "express";
import {
    checkAuth,
    deleteProfile,
    login,
    logout,
    register,
} from "../controllers/auth.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", isLoggedIn, logout);
router.delete("/delete", isLoggedIn, deleteProfile);
router.get("/checkAuth", isLoggedIn, checkAuth);

export default router;
