import React, { useEffect } from "react";
import "chart.js/auto";
import { Radar } from "react-chartjs-2";
import { Chart, defaults, plugins } from "chart.js/auto";
import useTransactionStore from "../../store/transactionStore";

defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.plugins.title.display = false;
// defaults.plugins.title.align = "center";
// defaults.plugins.title.font.size = 20;
// defaults.plugins.title.color = "black";
// defaults.color = "black";

const TransactionRadar = () => {
    const { transactions, getAllTransactions, isFetchingTransactions } =
        useTransactionStore();

    useEffect(() => {
        getAllTransactions();
    }, []);

    const food = transactions.filter((t) => t.category === "Food");
    const travel = transactions.filter((t) => t.category === "Travel");
    const shopping = transactions.filter((t) => t.category === "Shopping");
    const salary = transactions.filter((t) => t.category === "Salary");
    const others = transactions.filter((t) => t.category === "Others");

    const data = {
        labels: ["Salary", "Food", "Travel", "Shopping", "Others"],
        datasets: [
            {
                label: "Total count of transactions in each category",
                data: [
                    salary.length,
                    food.length,
                    travel.length,
                    shopping.length,
                    others.length,
                ],
                fill: true,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132,0.6)",
                pointBackgroundColor: "rgb(255, 99, 132)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgb(255, 99, 132)",
            },
        ],
    };

    const options = {
        scales: {
            r: {
                ticks: {
                    stepSize: 1,
                    callback: function (value) {
                        return Number.isInteger(value) ? value : null;
                    },
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="w-full h-full  ">
            {isFetchingTransactions ? (
                <p>Loading task data...</p>
            ) : (
                <Radar data={data} options={options} />
            )}
        </div>
    );
};

export default TransactionRadar;
