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

    useEffect(() => {
        getBalance();
    }, [isCreatingTransaction, isUpdatingTransaction, isDeletingTransaction]);

    return <div className="w-full text-3xl border p-5">{balance}</div>;
};

export default Balance;
