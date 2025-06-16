import React, { useState } from "react";
import useTaskStore from "../../store/TaskStore";
import { useEffect } from "react";
import TaskCard from "./TaskCard";
import CreateTask from "./CreateTask";
import UpdateTask from "./UpdateTask";
import TaskSummary from "./TaskSummary";

const Tasks = () => {
    const {
        tasks,
        isCreatingTask,
        isFetchingTasks,
        getAllTasks,
        updateTask,
        isUpdatingTask,
        deleteTask,
        isDeletingTask,
        setTaskToBeUpdated,
        taskToBeUpdated,
    } = useTaskStore();

    const [createOpen, setCreateOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

    const handleComplete = (id, isComplete) => {
        const payload = { isComplete: !isComplete };
        updateTask(id, payload);
    };

    const handleDelete = (id) => {
        deleteTask(id);
    };

    useEffect(() => {
        const fetchTasks = async () => {
            await getAllTasks();
            if (!hasLoadedOnce) setHasLoadedOnce(true);
        };

        document.title = "Tasks | TrackBud";
        fetchTasks();
    }, [isCreatingTask, isDeletingTask, isUpdatingTask]);

    if (isFetchingTasks && !hasLoadedOnce) {
        return (
            <div className="h-screen w-full flex place-content-center">
                LOADING...
            </div>
        );
    }

    return (
        <>
            <div
                id="tasks-container"
                className=" w-full my-17 overflow-y-auto "
            >
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

                <div className=" w-full h-full ">
                    <TaskSummary />
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
                                    className={` w-full p-3 flex items-center justify-between relative  ${
                                        index % 2 === 0
                                            ? "bg-gray-200"
                                            : "bg-gray-300"
                                    }`}
                                >
                                    <div className=" flex items-center justify-center h-full">
                                        <input
                                            type="checkbox"
                                            checked={task.isComplete}
                                            className="size-5 accent-green-600 "
                                            onChange={() => {
                                                setTaskToBeUpdated(task);
                                                handleComplete(
                                                    task._id,
                                                    task.isComplete,
                                                );
                                            }}
                                        />
                                    </div>

                                    <TaskCard
                                        id={task._id}
                                        title={task.title}
                                        description={task.description}
                                        priority={task.priority}
                                        isComplete={task.isComplete}
                                        dueDate={task.dueDate}
                                    />

                                    <div className="flex gap-3">
                                        {/* edit button */}
                                        <button
                                            className="border border-blue-500 p-1 text-blue-500 bg-blue-300/30 cursor-pointer size-9 sm:size-10 rounded-full flex items-center justify-center"
                                            onClick={() => {
                                                setUpdateOpen(true);
                                                setTaskToBeUpdated(task);
                                            }}
                                        >
                                            <i className="ri-edit-line"></i>
                                        </button>

                                        {/* delete button */}
                                        <button
                                            className="border border-red-500 p-1 text-red-500 bg-red-300/30 hover:bg-red-200 transition cursor-pointer size-9
                                            sm:size-10 rounded-full flex items-center justify-center"
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

                    <span className="w-max flex items-center justify-center absolute bottom-0 left-42 mb-20">
                        <button
                            className="p-3  bg-green-900 hover:bg-green-800 transition-colors duration-100 text-white rounded-full text-center cursor-pointer size-15 flex items-center justify-center shadow-[2px_2px_3px_black]"
                            onClick={() => setCreateOpen(true)}
                        >
                            <i className="ri-add-line text-xl"></i>
                        </button>
                    </span>
                </div>
            </div>
        </>
    );
};

export default Tasks;
