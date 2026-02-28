import express from "express";
import {
    createNewExpense,
    deleteExpense,
    getAllExpenses,
    getDashboardExpenses,
    getExpensesOfCategory,
    getExpensesOfMonth,
    getExpensesofMonthInCategory,
    updateExpense,
} from "../controllers/expense.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", isLoggedIn, createNewExpense);
router.put("/update/:id", isLoggedIn, updateExpense);
router.delete("/delete/:id", isLoggedIn, deleteExpense);
router.get("/", isLoggedIn, getAllExpenses);
router.get("/dashboard-expenses", isLoggedIn, getDashboardExpenses);
router.get("/category/:category", isLoggedIn, getExpensesOfCategory);
router.get("/month/:month", isLoggedIn, getExpensesOfMonth);
router.get("/:month/:category", isLoggedIn, getExpensesofMonthInCategory);

export default router;
