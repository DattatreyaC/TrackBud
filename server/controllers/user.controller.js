import Expense from "../models/Expense.js";
import Task from "../models/Task.js";

export const getUserData = async (req, res) => {
    try {
        return res.status(200).json(req.user);
    } catch (error) {
        console.log(`error in getUserData controller ${error.message}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getUserTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id }).sort({
            createdAt: -1,
        });
        if (tasks) {
            return res.status(200).json(tasks);
        }
    } catch (error) {
        console.log(`error in getUserTasks controller ${error.message}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getUserExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user._id });
        if (expenses) {
            return res.status(200).json(expenses);
        }
    } catch (error) {
        console.log(`error in getUserExpenses controller ${error.message}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};
