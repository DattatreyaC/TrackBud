import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
        },

        middlename: {
            type: String,
            required: false,
        },

        lastname: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
        },

        password: {
            type: String,
            required: true,
        },

        age: {
            type: Number,
            required: false,
        },

        mobile: {
            type: String,
            required: false,
        },

        tasks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Task",
            },
        ],

        balance: {
            type: Number,
            required: false,
            default: 0,
        },

        expenses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Expense",
            },
        ],
    },
    {
        timestamps: true,
    },
);

const User = mongoose.model("User", UserSchema);

export default User;
