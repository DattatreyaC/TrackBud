import React, { useEffect, useState } from "react";
import useAuthStore from "../../store/authStore";
import useTaskStore from "../../store/TaskStore";
import useTransactionStore from "../../store/transactionStore";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const { user, logout, deleteAccount, isDeletingProfile } = useAuthStore();
    const { dashboardTasks, isFetchingTasks, getDashboardTasks } =
        useTaskStore();
    const { transactions, isFetchingTransactions, getDashboardTransactions } =
        useTransactionStore();

    const formatDate = (date) => {
        let finalDate = "";
        const formattedDate = date.substring(0, date.indexOf("T"));

        const day = formattedDate.substring(
            formattedDate.length,
            formattedDate.length - 2,
        );

        const monthNumber = formattedDate.substring(
            formattedDate.length - 3,
            formattedDate.length - 5,
        );

        let month;
        if (monthNumber === "01") {
            month = "January";
        } else if (monthNumber === "02") {
            month = "February";
        } else if (monthNumber === "03") {
            month = "March";
        } else if (monthNumber === "04") {
            month = "April";
        } else if (monthNumber === "05") {
            month = "May";
        } else if (monthNumber === "06") {
            month = "June";
        } else if (monthNumber === "07") {
            month = "July";
        } else if (monthNumber === "08") {
            month = "August";
        } else if (monthNumber === "09") {
            month = "September";
        } else if (monthNumber === "10") {
            month = "October";
        } else if (monthNumber === "11") {
            month = "November";
        } else if (monthNumber === "12") {
            month = "December";
        }

        const year = formattedDate.substring(formattedDate.length - 6, 0);

        finalDate = `${day} ${month} ${year}`;

        return finalDate;
    };

    useEffect(() => {
        getDashboardTasks();
        getDashboardTransactions();
    }, []);

    return (
        <>
            <div
                id="dashboard"
                className="relative w-full min-h-screen h-screen p-5 flex flex-col pb-20 pt-20 bg-gray-100 "
            >
                <div className="w-full text-center">
                    <h1 className="text-3xl text-black font-bold ">
                        {"Welcome, " + user.firstname}
                    </h1>
                </div>

                <div className=" w-full h-full p-3">
                    <div className="border border-r-6 border-b-7 rounded-md w-full h-full flex flex-col items-center justify-between overflow-hidden">
                        <h1 className="text-[1.6rem] p-2.5 h-max border-b-3 border-b-black w-full px-5 bg-gray-500 text-white font-semibold text-center text-shadow-[2.5px_2.5px_3px_black]">
                            Your Latest Tasks
                        </h1>

                        {dashboardTasks.length === 0 ? (
                            <div className="text-center">
                                <p className="text-xl font-semibold text-black">
                                    Your most recent tasks appear here
                                </p>
                                <p className="text-sm text-black">
                                    Start adding tasks to see them here
                                </p>
                            </div>
                        ) : (
                            <div className=" w-full h-full text-center flex flex-col items-center justify-between bg-gray-300">
                                <div className="h-full w-full flex flex-col items-start justify-begin ">
                                    {dashboardTasks.map((task, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="h-1/3 px-8 w-full border-b flex items-center justify-between bg-gray-300"
                                            >
                                                <div className="flex flex-col justify-start w-full">
                                                    <h2 className="text-xl text-start">
                                                        {task.title}
                                                    </h2>
                                                    <p className="text-sm text-start">
                                                        {task.description === ""
                                                            ? "No description provided"
                                                            : task.description}
                                                    </p>
                                                </div>

                                                <div className="w-1/2 flex items-center justify-center">
                                                    <h4
                                                        className={`font-semibold ${
                                                            task.priority ===
                                                                "Low" &&
                                                            "text-green-700 bg-green-400/10 border border-green-700"
                                                        } ${
                                                            task.priority ===
                                                                "Medium" &&
                                                            "text-orange-500 bg-orange-300/10 border border-orange-400"
                                                        } ${
                                                            task.priority ===
                                                                "High" &&
                                                            "text-red-700 bg-red-500/10 border border-red-500"
                                                        } px-4 rounded-full text-sm`}
                                                    >
                                                        {task.priority}
                                                    </h4>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        <Link
                            to="/tasks"
                            className="group p-1 text-white bg-gray-800 font-semibold cursor-pointer h-max w-full border-t border-t-white flex items-center justify-center gap-2"
                        >
                            <span>Manage your tasks</span>
                            <i className="ri-arrow-right-line transition-transform duration-150 group-hover:translate-x-1"></i>
                        </Link>
                    </div>
                </div>

                <div className=" w-full h-full p-3">
                    <div className="border border-r-6 border-b-7 rounded-md w-full h-full flex flex-col items-center justify-between overflow-hidden">
                        <h1 className="text-[1.6rem] p-2.5 h-max border-b-3 border-b-black w-full bg-gray-500 text-white font-semibold text-center text-shadow-[2.5px_2.5px_3px_black]">
                            Your Latest Transactions
                        </h1>
                        {transactions.length === 0 ? (
                            <div className="text-center">
                                <p className="text-xl font-semibold text-black">
                                    Your most recent transactions appear here.
                                </p>
                                <p className="text-sm text-black">
                                    Start adding transactions to see them
                                </p>
                            </div>
                        ) : (
                            <div className=" w-full h-full text-center flex flex-col items-center justify-between bg-gray-300">
                                <div className="h-full w-full flex flex-col items-start justify-begin">
                                    {transactions.map((transaction, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className={`h-1/3 w-full border-b flex items-center justify-around ${
                                                    transaction.isExpense
                                                        ? "bg-red-400/20"
                                                        : "bg-green-300/20"
                                                }`}
                                            >
                                                <div className="flex flex-col justify-start">
                                                    <h2 className="text-xl text-start font-semibold ">
                                                        {transaction.paidTo !=
                                                        null
                                                            ? transaction.paidTo
                                                            : transaction.receivedFrom}
                                                    </h2>
                                                    <p className="text-sm text-start">
                                                        {formatDate(
                                                            transaction.createdAt,
                                                        )}
                                                    </p>
                                                </div>

                                                <h4
                                                    className={`font-semibold ${
                                                        transaction.isExpense ===
                                                        true
                                                            ? "text-red-500"
                                                            : "text-green-700"
                                                    } px-4 rounded-full text-lg`}
                                                >
                                                    {transaction.isExpense
                                                        ? `- ${transaction.amount}`
                                                        : `+ ${transaction.amount}`}
                                                </h4>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                        <div className="h-max w-full border-t bg-gray-400 text-center">
                            <Link
                                to={"/expenses"}
                                className="p-1 text-black font-semibold cursor-pointer"
                            >
                                Manage your transactions
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
