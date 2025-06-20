import React, { useEffect } from "react";
import "chart.js/auto";
import { Pie } from "react-chartjs-2";
import useTaskStore from "../../store/taskStore";
import { Chart, defaults, plugins } from "chart.js/auto";

defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "center";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

const TaskPriorityGraph = () => {
    const { tasks, getAllTasks, isFetchingTasks } = useTaskStore();

    useEffect(() => {
        getAllTasks();
    }, []);

    const lowTasks = tasks.filter((task) => task.priority === "Low");
    const mediumTasks = tasks.filter((task) => task.priority === "Medium");
    const highTasks = tasks.filter((task) => task.priority === "High");

    const data = {
        labels: ["Low", "Medium", "High"],
        datasets: [
            {
                // label: "Low",
                data: [lowTasks.length, mediumTasks.length, highTasks.length],
                backgroundColor: [
                    "rgb(0, 255, 60)",
                    "rgb(200,160,0)",
                    "rgb(200,50,0)",
                ],
            },
        ],
    };

    return (
        <div className="w-full h-full hidden sm:block  ">
            {isFetchingTasks ? (
                <p>Loading task data...</p>
            ) : (
                <Pie
                    data={data}
                    options={{
                        plugins: {
                            title: {
                                text: "Task Priorities",
                            },
                        },
                    }}
                />
            )}
        </div>
    );
};

export default TaskPriorityGraph;
