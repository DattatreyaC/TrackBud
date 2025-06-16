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
        <div className="w-full text-3xl border p-5">
            <h1 className="w-full text-center">Current balance : {balance}</h1>
        </div>
    );
};

export default Balance;
