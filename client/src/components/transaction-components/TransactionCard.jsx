import React from "react";

const TransactionCard = ({ transaction }) => {
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

    return (
        <>
            <div className="flex flex-col items-start w-full">
                <h2 className="text-xl text-start font-semibold">
                    {(() => {
                        const name =
                            transaction.paidTo ?? transaction.receivedFrom;
                        return name.charAt(0).toUpperCase() + name.slice(1);
                    })()}
                </h2>
                <p className="text-md text-gray-500 whitespace-nowrap">
                    {formatDate(transaction.date)}
                </p>

                <div className="flex gap-2 items-center justify-start">
                    {transaction.category && (
                        <p className="text-sm border border-black rounded-xl  px-2 bg-yellow-100 text-black">
                            {transaction.category}
                        </p>
                    )}

                    {transaction.notes && (
                        <p className="text-sm border border-black rounded-xl px-2 bg-sky-100 text-black ">
                            {transaction.notes}
                        </p>
                    )}
                </div>
            </div>
            <div className="w-full  text-center">
                <h4
                    className={`font-semibold text-lg whitespace-nowrap ${
                        transaction.isExpense
                            ? "text-red-500"
                            : "text-green-600"
                    }`}
                >
                    {transaction.isExpense
                        ? `- ₹${transaction.amount}`
                        : `+ ₹${transaction.amount}`}
                </h4>
            </div>
        </>
    );
};

export default TransactionCard;
