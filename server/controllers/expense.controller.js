import Expense from "../models/Expense.js";
import User from "../models/User.js";

export const createNewExpense = async (req, res) => {
    try {
        const { amount, category, isExpense, paidTo, receivedFrom, notes } =
            req.body;

        if (!amount || !category || !isExpense) {
            return res.status(400).json({ message: "Fill all fields" });
        }

        if (
            (isExpense === true && !paidTo) ||
            (isExpense === false && !receivedFrom)
        ) {
            return res.status(400).json({ message: "Enter correct data" });
        }

        const createdExpense = await Expense.create({
            user: req.user._id,
            amount,
            category,
            isExpense,
            paidTo,
            receivedFrom,
            notes,
        });

        if (createdExpense) {
            const updatedUser = await User.findByIdAndUpdate(
                req.user._id,
                { $push: { expenses: createdExpense._id } },
                { new: true },
            );

            return res
                .status(201)
                .json({ message: "Expense created", createdExpense });
        }
    } catch (error) {
        console.log(`error in createNewExpense controller ${error.message}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const updateExpense = async (req, res) => {
    try {
        const ExpenseId = req.params.id;
        const { amount, category, isExpense, paidTo, receivedFrom, notes } =
            req.body;

        if (req.user.expenses.indexOf(ExpenseId) === -1) {
            return res.status(400).json({ message: "Not authorized" });
        }

        if (
            (isExpense === true && paidTo === null) ||
            (isExpense === false && receivedFrom === null)
        ) {
            return res.status(400).json({ message: "Enter correct data" });
        }

        const updatedExpense = await Expense.findByIdAndUpdate(
            ExpenseId,
            {
                amount,
                category,
                isExpense,
                paidTo,
                receivedFrom,
                notes,
            },
            { new: true },
        );

        if (updatedExpense) {
            return res
                .status(200)
                .json({ message: "Expense Updated", updatedExpense });
        }
    } catch (error) {
        console.log(`error in updateExpense controller ${error.message}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteExpense = async (req, res) => {
    try {
        const ExpenseId = req.params.id;

        if (req.user.expenses.indexOf(ExpenseId) === -1) {
            return res.status(400).json({ message: "Not authorized" });
        }

        const deletedExpense = await Expense.findByIdAndDelete(ExpenseId);

        if (deletedExpense) {
            const updatedUser = await User.findByIdAndUpdate(
                req.user._id,
                { $pull: { expenses: deletedExpense._id } },
                { new: true },
            );

            if (updatedUser) {
                return res.status(200).json({ message: "Expense Deleted" });
            }
        }
    } catch (error) {
        console.log(`error in deleteExpense controller ${error.message}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getAllExpenses = async (req, res) => {
    try {
        const allExpenses = await Expense.find({ user: req.user._id });
        return res.status(200).json(allExpenses);
    } catch (error) {
        console.log(`error in getAllTasks controller ${error.message}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};
