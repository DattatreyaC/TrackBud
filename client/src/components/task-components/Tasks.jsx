import React, { useState } from "react";
import useTaskStore from "../../store/TaskStore";
import { useEffect } from "react";
import TaskCard from "./TaskCard";
import CreateTask from "./CreateTask";

const Tasks = () => {
    const { tasks, isFetchingTasks, getAllTasks } = useTaskStore();
    const [createOpen, setCreateOpen] = useState(false);

    useEffect(() => {
        getAllTasks();
    }, [createOpen]);

    if (isFetchingTasks && !tasks) {
        return (
            <div className="min-h-screen w-full flex place-content-center">
                LOADING...
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen w-full pt-15">
                {createOpen && (
                    <CreateTask
                        createOpen={createOpen}
                        setCreateOpen={setCreateOpen}
                    />
                )}

                <div className="border w-full h-max">
                    {tasks.map((task, index) => {
                        return (
                            <div
                                key={task._id}
                                className={` w-full p-3 flex items-center justify-between relative ${
                                    index % 2 === 0
                                        ? "bg-gray-100"
                                        : "bg-gray-300"
                                }`}
                            >
                                <TaskCard
                                    id={task._id}
                                    title={task.title}
                                    description={task.description}
                                    priority={task.priority}
                                    isComplete={task.isComplete}
                                    dueDate={task.dueDate}
                                />
                            </div>
                        );
                    })}

                    <div className="w-full text-center">
                        <button
                            className="p-3 border bg-green-900 text-white rounded-full text-center"
                            onClick={() => setCreateOpen(true)}
                        >
                            Add Task
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Tasks;
