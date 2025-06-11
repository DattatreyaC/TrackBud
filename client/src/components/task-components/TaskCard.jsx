import React, { useEffect, useState } from "react";
import useTaskStore from "../../store/TaskStore";

const TaskCard = ({
    id,
    title,
    description,
    priority,
    isComplete,
    dueDate,
    complete,
}) => {
    return (
        <>
            {/* task title  and completion box*/}
            <div className="flex items-center gap-3 w-1/2">
                <input
                    type="checkbox"
                    className="size-5 accent-green-600"
                    onClick={() => handleComplete(id)}
                />

                <div className="flex flex-col justify-start">
                    <h2 className="text-xl text-start ">{title}</h2>

                    <p className="text-sm ">
                        {!description ? "No description" : description}
                    </p>

                    <p></p>
                </div>
            </div>

            {/* task priority */}
            <div className="">
                <h4
                    className={`font-semibold ${
                        priority === "Low" &&
                        "text-green-700 bg-green-400/10 border border-green-700"
                    } ${
                        priority === "Medium" &&
                        "text-orange-400 bg-orange-300/10 border border-orange-400"
                    } ${
                        priority === "High" &&
                        "text-red-700 bg-red-500/10 border border-red-500"
                    } px-4 rounded-full text-sm `}
                >
                    {priority}
                </h4>
            </div>

            <div
                className={`border w-full border-black/70 absolute top-1/2 left-0  ${
                    complete ? "block" : "hidden"
                }`}
            ></div>
        </>
    );
};

export default TaskCard;
