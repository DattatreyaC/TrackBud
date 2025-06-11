import express from "express";
import {
    createTask,
    deleteTask,
    getAllTasks,
    getDashboardTasks,
    updateTask,
} from "../controllers/task.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", isLoggedIn, getAllTasks);
router.get("/dashboard-tasks", isLoggedIn, getDashboardTasks);
router.post("/create", isLoggedIn, createTask);
router.put("/update/:id", isLoggedIn, updateTask);
router.delete("/delete/:id", isLoggedIn, deleteTask);

export default router;
