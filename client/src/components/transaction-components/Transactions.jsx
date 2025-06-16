import React, { useEffect, useState } from "react";
import Balance from "./Balance";
import useTransactionStore from "../../store/transactionStore";
import CreateTransaction from "./CreateTransaction";
import TransactionCard from "./TransactionCard";
import UpdateTransaction from "./UpdateTransaction";

const Transactions = () => {
    const {
        transactions,
        deleteTransaction,
        isCreatingTransaction,
        isFetchingTransactions,
        setTransactionToBeUpdated,
        isUpdatingTransaction,
        isDeletingTransaction,
        getAllTransactions,
    } = useTransactionStore();

    const [createOpen, setCreateOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

    const handleDelete = (id) => {
        deleteTransaction(id);
    };

    useEffect(() => {
        const fetchTransactions = async () => {
            await getAllTransactions();
            if (!hasLoadedOnce) setHasLoadedOnce(true);
        };

        document.title = "Transactions | TrackBud";

        fetchTransactions();
    }, [isCreatingTransaction, isDeletingTransaction, isUpdatingTransaction]);

    if (isFetchingTransactions && !hasLoadedOnce) {
        return (
            <div className="min-h-screen w-full flex place-content-center">
                LOADING...
            </div>
        );
    }

    return (
        <>
            <div
                id="transaction-container"
                className=" w-full my-17 overflow-y-auto "
            >
                {createOpen && (
                    <CreateTransaction
                        createOpen={createOpen}
                        setCreateOpen={setCreateOpen}
                    />
                )}
                {updateOpen && (
                    <UpdateTransaction
                        updateOpen={updateOpen}
                        setUpdateOpen={setUpdateOpen}
                    />
                )}

                <div className=" w-full h-full">
                    <Balance />

                    {transactions.length === 0 ? (
                        <div className="h-full w-full text-center flex flex-col items-center justify-center">
                            <h1 className="text-3xl font-semibold">
                                No transactions available
                            </h1>
                            <p>
                                Click the button below to start adding
                                transactions
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3 px-4">
                            {transactions.map((transaction, index) => (
                                <div
                                    key={index}
                                    className={`w-full flex items-center justify-between relative gap-3 p-4 rounded-xl border shadow-sm ${
                                        transaction.isExpense
                                            ? "bg-red-400/10 border-red-300"
                                            : "bg-green-300/10 border-green-300"
                                    }`}
                                >
                                    <TransactionCard
                                        transaction={transaction}
                                    />

                                    {/* Actions */}
                                    <div className="flex gap-3 justify-end w-full">
                                        <button
                                            className="border border-blue-500 text-blue-500 bg-blue-100 hover:bg-blue-200 p-2 rounded-full transition size-9 sm:size-10 flex items-center justify-center"
                                            onClick={() => {
                                                setUpdateOpen(true);
                                                setTransactionToBeUpdated(
                                                    transaction,
                                                );
                                            }}
                                        >
                                            <i className="ri-edit-line text-lg"></i>
                                        </button>
                                        <button
                                            className="border border-red-500 text-red-500 bg-red-100 hover:bg-red-200 p-2 rounded-full transition size-9 sm:size-10 flex items-center justify-center"
                                            onClick={() =>
                                                handleDelete(transaction._id)
                                            }
                                        >
                                            <i className="ri-close-line text-lg"></i>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="w-full flex items-center justify-center absolute bottom-0 mb-20">
                        <button
                            className="p-3 bg-green-900 hover:bg-green-800 transition-colors duration-100 text-white rounded-full text-center cursor-pointer size-15 flex items-center justify-center shadow-[2px_2px_3px_black]"
                            onClick={() => setCreateOpen(true)}
                        >
                            <i className="ri-add-line text-xl"></i>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Transactions;
