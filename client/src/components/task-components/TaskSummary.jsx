import React, { useEffect, useState } from "react";
import useTaskStore from "../../store/taskStore";

const TaskSummary = () => {
    const { tasks } = useTaskStore();

    const [complete, setComplete] = useState(false);

    const findCompletedTasks = () => {
        let count = 0;
        tasks.forEach((task) => {
            if (task.isComplete) {
                count += 1;
            }
        });

        return count;
    };

    useEffect(() => {
        if (tasks.length != 0 && tasks.length === findCompletedTasks()) {
            setComplete(true);
        } else {
            setComplete(false);
        }
    }, [tasks]);

    return (
        <>
            <div
                className={`w-full flex items-center justify-evenly py-3 border-b ${
                    complete ? "bg-green-500" : "bg-green-50"
                }`}
            >
                <div className="text-center">
                    <h1 className="text-2xl sm:text-3xl font-bold italic">
                        Tasks
                    </h1>
                    <p className="text-2xl italic font-semibold">
                        {tasks.length}
                    </p>
                </div>

                <div className="text-center">
                    <h1 className="text-2xl sm:text-3xl font-bold italic">
                        Completed
                    </h1>
                    <p className="text-2xl italic font-semibold">
                        {findCompletedTasks()}
                    </p>
                </div>

                <div
                    id="overall"
                    className={`text-center border-3 flex items-center justify-center p-2 ${
                        complete
                            ? "bg-black text-white border-green-600 "
                            : "bg-white text-black"
                    }`}
                >
                    <h1 className="text-3xl sm:text-4xl font-black">
                        {findCompletedTasks()}
                        <span className="font-light">/</span>
                        {tasks.length}
                    </h1>
                </div>
            </div>

            {/* <div className="border h-3 w-full bg-black">
                {tasks.forEach((t) => {
                    return <div className={`bg-white`}>#</div>;
                })}
            </div> */}
        </>
    );
};

export default TaskSummary;
