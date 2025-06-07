import Task from "../models/Task.js";
import User from "../models/User.js";

export const getAllTasks = async (req, res) => {
    try {
        const allTasks = await Task.find({ user: req.user._id });
        return res.status(200).json(allTasks);
    } catch (error) {
        console.log(`error in getAllTasks controller ${error.message}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const createTask = async (req, res) => {
    try {
        const { title, description, priority, dueDate } = req.body;

        if (!title || !priority) {
            return res.status(400).json({ message: "Fill all fields" });
        }

        const createdTask = await Task.create({
            title,
            description,
            priority,
            dueDate,
            user: req.user._id,
        });

        if (createdTask) {
            const updatedUser = await User.findByIdAndUpdate(
                req.user._id,
                {
                    $push: { tasks: createdTask._id },
                },
                { new: true },
            );

            return res
                .status(201)
                .json({ message: "Task Created", createdTask });
        }
    } catch (error) {
        console.log(`error in createTask controller ${error.message}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { title, description, priority, isComplete, dueDate } = req.body;
        const taskId = req.params.id;

        if (req.user.tasks.indexOf(taskId) === -1) {
            return res.status(400).json({ message: "Not authorized" });
        }

        const payload = { title, description, priority, isComplete, dueDate };

        const updatedTask = await Task.findByIdAndUpdate(taskId, payload, {
            new: true,
        });

        if (updatedTask) {
            return res
                .status(200)
                .json({ message: "Task updated", updatedTask });
        }
    } catch (error) {
        console.log(`error in updateTask controller ${error.message}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        if (req.user.tasks.indexOf(taskId) === -1) {
            return res.status(400).json({ message: "Not authorized" });
        }

        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (deletedTask) {
            const updatedUser = await User.findByIdAndUpdate(
                req.user._id,
                { $pull: { tasks: deletedTask._id } },
                { new: true },
            );

            if (updatedUser) {
                return res
                    .status(200)
                    .json(
                        { message: "Task deleted successfully" },
                        deletedTask,
                    );
            }
        }
    } catch (error) {
        console.log(`error in deleteTask controller ${error.message}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};
