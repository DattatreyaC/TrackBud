import React, { useEffect } from "react";
import useTransactionStore from "../../store/transactionStore";

const Balance = () => {
    const {
        balance,
        isGettingBalance,
        getBalance,
        isCreatingTransaction,
        isUpdatingTransaction,
        isDeletingTransaction,
    } = useTransactionStore();

    const getUserBalance = () => {
        getBalance();
    };

    useEffect(() => {
        getBalance();
    }, [isCreatingTransaction, isUpdatingTransaction, isDeletingTransaction]);

    return (
        <div className="w-full text-3xl border-b-5 border-b-green-900 p-5 bg-green-800">
            <h1 className="w-full text-center text-white font-black">
                Balance : ₹{balance}
            </h1>
        </div>
    );
};

export default Balance;
