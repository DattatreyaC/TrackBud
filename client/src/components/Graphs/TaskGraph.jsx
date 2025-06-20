import React, { useEffect } from "react";
import useTaskStore from "../../store/taskStore";
import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

Chart.defaults.maintainAspectRatio = false;
Chart.defaults.responsive = true;
Chart.defaults.color = "#000";

const TaskGraph = () => {
    const { tasks, getAllTasks, isFetchingTasks } = useTaskStore();

    useEffect(() => {
        getAllTasks();
    }, []);

    const completedTasks = tasks.filter((task) => task.isComplete).length;
    const incompleteTasks = tasks.length - completedTasks;

    const data = {
        labels: ["Your Tasks"],
        datasets: [
            {
                label: "Total",
                data: [tasks.length],
                backgroundColor: "rgba(0, 150, 255, 0.7)", //blue
                borderColor: "rgb(0,0,255)",
                // color: "black",
            },
            {
                label: "Complete",
                data: [completedTasks],
                backgroundColor: "rgba(0, 255, 60, 0.7)", // green
                borderColor: "rgb(0,255,0)",
            },
            {
                label: "Incomplete",
                data: [incompleteTasks],
                backgroundColor: "rgba(255,0,0,0.7)", // red
                borderColor: "rgb(255,0,0)",
            },
        ],
    };

    const options = {
        scales: {
            y: {
                ticks: {
                    stepSize: 1,
                    callback: function (value) {
                        return Number.isInteger(value) ? value : null;
                    },
                },
                beginAtZero: true,
            },
        },
        plugins: {
            title: {
                text: "Task Summary",
            },
        },
    };

    if (isFetchingTasks) {
        return (
            <div className="h-full w-full flex items-center justify-center">
                Loading your Graphs. Please wait
            </div>
        );
    }

    return (
        <div
            className={`w-full h-full ${
                tasks.length === completedTasks ? "bg-green-100" : ""
            }`}
        >
            {isFetchingTasks ? (
                <p>Loading task data...</p>
            ) : (
                <Bar data={data} options={options} />
            )}
        </div>
    );
};

export default TaskGraph;
