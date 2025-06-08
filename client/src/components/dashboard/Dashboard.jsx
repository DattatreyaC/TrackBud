import React, { useEffect, useState } from "react";
import useAuthStore from "../../store/authStore";
import Modal from "../misc/Modal";
import useTaskStore from "../../store/TaskStore";

const Dashboard = () => {
    const { user, logout, deleteAccount, isDeletingProfile, checkAuth } =
        useAuthStore();

    const { tasks, isFetchingTasks, getAllTasks } = useTaskStore();

    useEffect(() => {
        checkAuth();
        getAllTasks();
    }, []);

    return (
        <>
            <div className="relative w-full h-screen p-5 flex flex-col pt-20 bg-gray-950">
                <div className="w-full text-center">
                    <h1 className="text-3xl text-white ">
                        {user.firstname.toUpperCase()}
                    </h1>
                </div>

                <div className=" w-full h-full p-3">
                    <div className="border border-white/50 rounded-md w-full h-full flex items-center justify-center overflow-hidden">
                        {tasks.length === 0 ? (
                            <div className="text-center">
                                <p className="text-xl font-semibold text-white">
                                    Your most recent tasks appear here.
                                </p>
                                <p className="text-sm text-white">
                                    Start adding tasks to see them here
                                </p>
                                <button className="text-white border px-3 rounded">
                                    Add
                                </button>
                            </div>
                        ) : (
                            <div className=" w-full h-full text-center flex flex-col items-center justify-between bg-gray-300">
                                <h1 className="text-[1.6rem] p-2.5 h-max border-b w-full bg-gray-400 text-black font-semibold">
                                    Your most recent tasks
                                </h1>
                                <div className="h-full w-full flex flex-col items-start justify-begin">
                                    {tasks.map((task, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="h-1/3 w-full border-b flex items-center justify-around bg-gray-300"
                                            >
                                                <h2 className="text-xl">
                                                    {task.title}
                                                </h2>
                                                <h4
                                                    className={`font-semibold ${
                                                        task.priority ===
                                                            "Low" &&
                                                        "text-green-700 bg-green-400/30"
                                                    } ${
                                                        task.priority ===
                                                            "Medium" &&
                                                        "text-orange-400 bg-orange-300/30"
                                                    } ${
                                                        task.priority ===
                                                            "High" &&
                                                        "text-red-700 bg-red-500/30"
                                                    } px-4 rounded-full`}
                                                >
                                                    {task.priority}
                                                </h4>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="h-max w-full border-t bg-gray-400">
                                    <button className="p-1 text-black font-semibold cursor-pointer">
                                        Manage your tasks
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className=" w-full h-full p-3">
                    <div className="border border-white/50 rounded-md w-full h-full"></div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
