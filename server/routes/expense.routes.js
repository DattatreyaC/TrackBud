import express from "express";
import {
    createNewExpense,
    deleteExpense,
    getAllExpenses,
    updateExpense,
} from "../controllers/expense.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", isLoggedIn, createNewExpense);
router.put("/update/:id", isLoggedIn, updateExpense);
router.delete("/delete/:id", isLoggedIn, deleteExpense);
router.get("/", isLoggedIn, getAllExpenses);

export default router;
