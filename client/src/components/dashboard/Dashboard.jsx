import React, { useEffect } from "react";
import useAuthStore from "../../store/authStore";
import useTaskStore from "../../store/taskStore";
import useTransactionStore from "../../store/transactionStore";
import { Link } from "react-router-dom";
import TaskGraph from "../Graphs/TaskGraph";
import TaskPriorityGraph from "../Graphs/TaskPriorityGraph";
import TransactionRadar from "../Graphs/TransactionRadar";

const Dashboard = () => {
    const { user } = useAuthStore();
    const { dashboardTasks, getDashboardTasks } = useTaskStore();
    const { dashboardTransactions, getDashboardTransactions } =
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

        if (monthNumber === "01") month = "January";
        else if (monthNumber === "02") month = "February";
        else if (monthNumber === "03") month = "March";
        else if (monthNumber === "04") month = "April";
        else if (monthNumber === "05") month = "May";
        else if (monthNumber === "06") month = "June";
        else if (monthNumber === "07") month = "July";
        else if (monthNumber === "08") month = "August";
        else if (monthNumber === "09") month = "September";
        else if (monthNumber === "10") month = "October";
        else if (monthNumber === "11") month = "November";
        else if (monthNumber === "12") month = "December";

        const year = formattedDate.substring(formattedDate.length - 6, 0);
        finalDate = `${day} ${month} ${year}`;
        return finalDate;
    };

    useEffect(() => {
        document.title = "Home | TrackBud";
        getDashboardTasks();
        getDashboardTransactions();
    }, []);

    return (
        <div
            id="dashboard"
            className=" w-full bg-slate-300 my-17 overflow-y-auto space-y-5 sm:flex sm:flex-col px-3 pb-5"
        >
            <div id="greeting-heading" className="text-center">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 pt-3">
                    Hello,{" "}
                    <span className="font-vibur underline underline-offset-5">
                        {user.firstname}!
                    </span>
                </h1>
            </div>

            <div
                id="task-overview"
                className={`bg-gray-200 shadow-lg rounded h-1/2 sm:h-full flex flex-col overflow-hidden`}
            >
                <h2 className="text-xl font-bold text-white bg-black px-4 py-3 text-center ">
                    <i className="ri-list-check-3 pr-3 font-light"></i>
                    Task Overview
                </h2>

                <div className="h-full">
                    {dashboardTasks.length === 0 ? (
                        <div className="text-center px-4 py-8 flex-grow flex flex-col justify-center h-full border border-black/50">
                            <p className="text-lg font-semibold text-gray-700">
                                No tasks available
                            </p>
                            <p className="text-base text-gray-500 mt-1">
                                Add some tasks to see a summarized overview!
                            </p>
                        </div>
                    ) : (
                        <div className="flex sm:flex-row items-center justify-center h-full px-1 sm:px-5 pb-2 w-full ">
                            <TaskGraph />
                            <TaskPriorityGraph />
                        </div>
                    )}
                </div>

                <Link
                    to="/tasks"
                    className="flex gap-2 items-center justify-center text-center py-2 bg-gray-800 text-white hover:bg-gray-900 transition-colors duration-200 text-base font-medium group"
                >
                    Manage Your Tasks
                    <i className="ri-arrow-right-line transition-all group-hover:translate-x-1" />
                </Link>
            </div>

            <div
                id="transaction-overview"
                className="bg-white shadow-lg rounded overflow-hidden h-1/2 sm:h-full flex flex-col border"
            >
                <h2 className="text-xl font-bold text-white bg-black px-4 py-3 text-center">
                    <i className="ri-money-rupee-circle-line pr-3 font-light"></i>
                    Transaction Overview
                </h2>

                {dashboardTransactions.length === 0 ? (
                    <div className="text-center px-4 py-8 flex-grow flex flex-col justify-center">
                        <p className="text-lg font-semibold text-gray-700">
                            No transactions added.
                        </p>
                        <p className="text-base text-gray-500 mt-1">
                            Start logging transactions to see an overview!
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200 bg-gray-50 flex-grow overflow-y-auto">
                        <TransactionRadar />
                    </div>
                )}

                <Link
                    to="/transactions"
                    className=" text-center py-2 bg-gray-800 text-white hover:bg-gray-900 transition-colors duration-200 text-base font-medium flex gap-2 items-center justify-center group"
                >
                    <i className="ri-arrow-left-line transition-all group-hover:translate-x-[-4px]" />
                    Manage Your Transactions
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
