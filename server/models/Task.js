import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: false,
        },

        priority: {
            type: String,
            enum: ["Low", "Medium", "High"],
            required: true,
        },

        isComplete: {
            type: Boolean,
            required: true,
        },

        dueDate: {
            type: Date,
            required: false,
            default: null,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const Task = mongoose.model("Task", TaskSchema);

export default Task;
