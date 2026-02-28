import React, { useEffect, useState } from "react";
import useTransactionStore from "../../store/transactionStore";

const Balance = ({ filteredTransactions, filter }) => {
    const {
        balance,
        transactions,
        isGettingBalance,
        getBalance,
        isCreatingTransaction,
        isUpdatingTransaction,
        isDeletingTransaction,
    } = useTransactionStore();

    const [totalExpense, setTotalExpense] = useState(0);

    const getTotalExpenses = () => {
        setTotalExpense(0);

        if (filteredTransactions.length === 0 && filter === "All") {
            transactions.map((t) => {
                if (t.isExpense) {
                    setTotalExpense((prev) => prev + t.amount);
                }
            });
        } else {
            filteredTransactions.map((t) => {
                if (t.isExpense) {
                    setTotalExpense((prev) => prev + t.amount);
                }
            });
        }
    };

    useEffect(() => {
        getBalance();
        getTotalExpenses();
    }, [
        isCreatingTransaction,
        isUpdatingTransaction,
        isDeletingTransaction,
        transactions,
        filteredTransactions,
    ]);

    return (
        <div className="w-full text-3xl border-b-5 border-b-green-900 p-5 bg-green-800 ">
            <h1 className="w-full text-center text-white font-black">
                Balance : ₹{balance}
            </h1>

            <p className="text-sm text-white">
                Total Expenditure : {totalExpense}
            </p>
        </div>
    );
};

export default Balance;
