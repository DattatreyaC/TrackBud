import React, { useEffect, useState } from "react";

const TaskCard = ({
    id,
    title,
    description,
    priority,
    isComplete,
    dueDate,
}) => {
    return (
        <div className="w-full flex items-center justify-between px-5">
            {/* task title , description and date*/}
            <div className="flex items-center gap-3 flex-grow relative">
                {/* <div
                    className={`border w-full border-black/70 absolute top-1/2 left-0  ${
                        isComplete ? "block" : "hidden"
                    }`}
                ></div> */}

                <div className="flex flex-col justify-start ">
                    <h2 className="text-xl sm:text-[1.37rem] text-start ">
                        {title}
                    </h2>

                    <p className="text-sm sm:text-md font-light">
                        {!description ? "No description" : description}
                    </p>

                    {/* <p>{dueDate}</p> */}
                </div>
            </div>

            {/* task priority */}
            <div className="flex-shrink-0 flex items-center justify-center min-w-[120px]">
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
                    } px-4 rounded-full text-sm w-max`}
                >
                    {priority}
                </h4>
            </div>
        </div>
    );
};

export default TaskCard;
