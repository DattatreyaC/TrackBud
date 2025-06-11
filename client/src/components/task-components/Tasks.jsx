import React, { useState } from "react";
import useTaskStore from "../../store/TaskStore";
import { useEffect } from "react";
import TaskCard from "./TaskCard";
import CreateTask from "./CreateTask";
import UpdateTask from "./UpdateTask";

const Tasks = () => {
    const {
        tasks,
        isFetchingTasks,
        getAllTasks,
        updateTask,
        isUpdatingTask,
        deleteTask,
        isDeletingTask,
        setTaskToBeUpdated,
    } = useTaskStore();

    const [createOpen, setCreateOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [complete, setComplete] = useState(false);

    const handleComplete = (id) => {
        setComplete((prev) => !prev);
        console.log(id);
    };

    const handleDelete = (id) => {
        deleteTask(id);
    };

    useEffect(() => {
        getAllTasks();
    }, [createOpen, isDeletingTask, isUpdatingTask]);

    if (isFetchingTasks && !tasks) {
        return (
            <div className="min-h-screen w-full flex place-content-center">
                LOADING...
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen h-screen w-full pt-15 relative">
                {createOpen && (
                    <CreateTask
                        createOpen={createOpen}
                        setCreateOpen={setCreateOpen}
                    />
                )}
                {updateOpen && (
                    <UpdateTask
                        updateOpen={updateOpen}
                        setUpdateOpen={setUpdateOpen}
                    />
                )}

                <div className=" w-full h-full">
                    {tasks.length === 0 ? (
                        <div className=" h-full w-full text-center flex flex-col items-center justify-center">
                            <h1 className="text-3xl font-semibold">
                                No tasks available
                            </h1>
                            <p>Click the button below to start adding tasks</p>
                        </div>
                    ) : (
                        tasks.map((task, index) => {
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
                                        complete={complete}
                                    />

                                    <div className="flex gap-2">
                                        {/* edit button */}
                                        <button
                                            className="border border-blue-500 p-1 text-blue-500 bg-blue-300/30 cursor-pointer size-8 rounded-full flex items-center justify-center"
                                            onClick={() => {
                                                setUpdateOpen(true);
                                                setTaskToBeUpdated(task);
                                            }}
                                        >
                                            <i className="ri-edit-line"></i>
                                        </button>

                                        {/* delete button */}
                                        <button
                                            className="border border-red-500 p-1 text-red-500 bg-red-300/30 cursor-pointer size-8 rounded-full flex items-center justify-center"
                                            onClick={() =>
                                                handleDelete(task._id)
                                            }
                                        >
                                            {/* <i className="ri-delete-bin-7-line"></i> */}
                                            <i className="ri-close-line"></i>
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}

                    <div className="w-full flex items-center justify-center fixed bottom-0 my-10">
                        <button
                            className="p-3  bg-green-900 hover:bg-green-800 transition-colors duration-100 text-white rounded-full text-center cursor-pointer size-15 flex items-center justify-center shadow-[2px_2px_3px_black]"
                            onClick={() => setCreateOpen(true)}
                        >
                            <i className="ri-add-line text-xl"></i>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Tasks;
