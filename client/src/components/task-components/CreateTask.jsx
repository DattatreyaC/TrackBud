import React, { useState } from "react";
import toast from "react-hot-toast";
import useTaskStore from "../../store/TaskStore";

const CreateTask = ({ createOpen, setCreateOpen }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    const [dueDate, setDueDate] = useState("");

    const { createTask, isCreatingTask } = useTaskStore();

    const validateForm = () => {
        if (title === "" || priority === "") {
            return false;
        }

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm() === true) {
            createTask(title, description, priority, dueDate);
            while (isCreatingTask) {}

            setTitle("");
            setDescription("");
            setPriority("");
            setDueDate("");
        } else {
            toast.error("Fill required fields");
        }
    };

    return (
        <div className="h-full w-full absolute top-0 left-0 bg-black/90 z-20 px-5 flex flex-col items-center justify-center ">
            <h1 className="text-4xl w-full text-center py-5 bg-white/80 border-b border-dashed rounded-t-sm">
                Add new Task
            </h1>
            <form
                onSubmit={(e) => handleSubmit(e)}
                className="w-full px-3 py-5 flex flex-col gap-2 bg-white/80 text-black"
            >
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        name="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border w-full p-1 placeholder:italic"
                    />
                </div>

                <div>
                    <label htmlFor="description">Description (Optional)</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border w-full p-1 "
                    />
                </div>

                <div className="flex items-center justify-between gap-5 w-full ">
                    <div className="flex flex-col w-full">
                        <label htmlFor="priority">Priority</label>
                        <select
                            name="priority"
                            id="priority "
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="border p-1.5"
                        >
                            <option value="" disabled>
                                Choose Priority
                            </option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="Medium">High</option>
                        </select>
                    </div>

                    <div className="flex flex-col w-full">
                        <label htmlFor="date">Due date (Optional)</label>
                        <input
                            name="date"
                            type="date"
                            placeholder="Due date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="border p-1"
                        />
                    </div>
                </div>

                <div className="flex gap-5 w-full">
                    <button
                        type="submit"
                        disabled={isCreatingTask}
                        className="p-2 w-full bg-green-800 mt-3 rounded-sm cursor-pointer text-white hover:bg-green-900 transition-colors duration-100"
                    >
                        Add Task
                    </button>

                    <button
                        onClick={() => setCreateOpen(false)}
                        disabled={isCreatingTask}
                        className="p-2 w-full bg-red-800 mt-3 rounded-sm cursor-pointer text-white hover:bg-red-900 transition-colors duration-100"
                    >
                        Close
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateTask;
