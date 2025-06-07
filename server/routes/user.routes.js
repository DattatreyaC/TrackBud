import express from "express";
import {
    getUserData,
    getUserExpenses,
    getUserTasks,
} from "../controllers/user.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", isLoggedIn, getUserData);
router.get("/tasks", isLoggedIn, getUserTasks);
router.get("/expenses", isLoggedIn, getUserExpenses);

export default router;
