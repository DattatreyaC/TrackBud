import React, { useState } from "react";
import useTaskStore from "../../store/taskStore";

const UpdateTask = ({ updateOpen, setUpdateOpen }) => {
    const { updateTask, isUpdatingTask, taskToBeUpdated } = useTaskStore();

    if (taskToBeUpdated.description === null) {
        taskToBeUpdated.description = "";
    }
    if (taskToBeUpdated.dueDate === null) {
        taskToBeUpdated.dueDate = "";
    } else {
        taskToBeUpdated.dueDate = taskToBeUpdated.dueDate.substring(
            0,
            taskToBeUpdated.dueDate.indexOf("T"),
        );
    }

    const [title, setTitle] = useState(taskToBeUpdated.title);
    const [description, setDescription] = useState(taskToBeUpdated.description);
    const [priority, setPriority] = useState(taskToBeUpdated.priority);
    const [dueDate, setDueDate] = useState(taskToBeUpdated.dueDate);

    // if (taskToBeUpdated.dueDate != null) {
    //     setDueDate(
    //         taskToBeUpdated.dueDate.substring(
    //             0,
    //             taskToBeUpdated.dueDate.indexOf("T"),
    //         ),
    //     );
    // }

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            title,
            description,
            priority,
            dueDate,
        };

        updateTask(taskToBeUpdated._id, payload);
        setUpdateOpen(false);
    };

    return (
        <div className="h-full w-full absolute top-0 left-0 bg-black/90 z-20 px-5 flex flex-col items-center justify-center ">
            <h1 className="text-4xl w-full text-center py-5 bg-white/80 border-b border-dashed rounded-t-sm">
                Edit Task
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
                            <option value="High">High</option>
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
                        disabled={isUpdatingTask}
                        className="p-2 w-full bg-green-800 mt-3 rounded-sm cursor-pointer text-white hover:bg-green-900 transition-colors duration-100"
                    >
                        Save
                    </button>

                    <button
                        onClick={() => setUpdateOpen(false)}
                        disabled={isUpdatingTask}
                        className="p-2 w-full bg-red-800 mt-3 rounded-sm cursor-pointer text-white hover:bg-red-900 transition-colors duration-100"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateTask;
