import mongoose, { mongo } from "mongoose";

const ExpenseSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        amount: {
            type: Number,
            required: true,
            default: 0,
        },

        category: {
            type: String,
            required: true,
        },

        isExpense: {
            type: Boolean,
            default: false,
            required: true,
        },

        paidTo: {
            type: String,
            default: null,
        },

        receivedFrom: {
            type: String,
            default: null,
        },

        date: {
            type: Date,
            required: true,
        },

        notes: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

const Expense = mongoose.model("Expense", ExpenseSchema);

export default Expense;
