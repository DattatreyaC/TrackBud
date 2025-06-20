import React, { useState } from "react";
import toast from "react-hot-toast";
import useTransactionStore from "../../store/transactionStore";

const CreateTransaction = ({ createOpen, setCreateOpen }) => {
    const [amount, setAmount] = useState("");
    const [person, setPerson] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [type, setType] = useState("");
    const [notes, setNotes] = useState("");

    const { isCreatingTransaction, createTransaction } = useTransactionStore();

    const validateForm = () => {
        if (!amount || !person || !category || !date || !type) {
            return false;
        }

        const isValidAmount = (value) => /^\d+(\.\d+)?$/.test(value);
        if (!isValidAmount(amount)) {
            return toast.error("Amount must be a valid number");
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let payload = {};
        let paidTo = "";
        let receivedFrom = "";

        let isExpense = false;

        if (validateForm() === true) {
            if (type === "Debit") {
                isExpense = true;
                paidTo = person;
                receivedFrom = null;
            }
            if (type === "Credit") {
                isExpense = false;
                receivedFrom = person;
                paidTo = null;
            }

            payload = {
                amount: Number(amount),
                category,
                isExpense,
                paidTo,
                receivedFrom,
                notes,
                date,
            };

            // console.log(payload);

            await createTransaction(payload);

            setAmount("");
            setPerson("");
            setCategory("");
            setDate("");
            setType("");
            setNotes("");
            setCreateOpen(false);
        } else {
            toast.error("Fill all fields");
        }
    };

    return (
        <div className="h-full w-full absolute top-0 left-0 bg-black/90 z-20 px-5 flex flex-col items-center justify-center ">
            <h1 className="text-4xl w-full text-center py-5 bg-white/80 border-b border-dashed rounded-t-sm">
                Add new Transaction
            </h1>
            <form
                onSubmit={(e) => handleSubmit(e)}
                className="w-full px-3 py-5 flex flex-col gap-2 bg-white/80 text-black"
            >
                <div className="flex items-center w-full gap-5">
                    <div className="w-full">
                        <label htmlFor="title">Amount</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="border w-full p-1 placeholder:italic"
                        />
                    </div>

                    <div className="w-full">
                        <label htmlFor="person">To / From</label>
                        <input
                            id="person"
                            name="person"
                            type="text"
                            value={person}
                            onChange={(e) => setPerson(e.target.value)}
                            className="border w-full p-1 "
                        />
                    </div>
                </div>

                {/* <div></div> */}

                <div className="flex items-center justify-between gap-5 w-full">
                    <div className="flex gap-5 w-full">
                        <div className="flex flex-col w-full ">
                            <label htmlFor="date">Date of Transaction</label>
                            <input
                                name="date"
                                id="date"
                                type="date"
                                placeholder="Due date"
                                value={date}
                                onChange={(e) => {
                                    setDate(e.target.value);
                                }}
                                className="border p-1"
                            />
                        </div>

                        <div className="flex flex-col w-full ">
                            <label htmlFor="type">Type of Transaction</label>
                            <select
                                name="type"
                                id="type"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="border p-1.5"
                            >
                                <option value="" disabled>
                                    Select the type of transaction
                                </option>
                                <option value="Debit">
                                    Debit (Money spent)
                                </option>
                                <option value="Credit">
                                    Credit (Money earned)
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="flex gap-5">
                    <div className="flex flex-col w-full">
                        <label htmlFor="category">Category</label>
                        <select
                            name="category"
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="border p-1.5"
                        >
                            <option value="" disabled>
                                Choose Category
                            </option>
                            <option value="Salary">Salary</option>
                            <option value="Travel">Travel</option>
                            <option value="Food">Food</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Other">Others</option>
                        </select>
                    </div>

                    <div className="w-full flex flex-col">
                        <label htmlFor="notes">Other notes</label>
                        <input
                            name="notes"
                            id="notes"
                            type="text"
                            value={notes}
                            onChange={(e) => {
                                setNotes(e.target.value);
                            }}
                            className="border p-1"
                        />
                    </div>
                </div>

                <div className="flex gap-5 w-full">
                    <button
                        type="submit"
                        disabled={isCreatingTransaction}
                        className="p-2 w-full bg-green-800 mt-3 rounded-sm cursor-pointer text-white hover:bg-green-900 transition-colors duration-100"
                    >
                        Add Transaction
                    </button>

                    <button
                        onClick={() => setCreateOpen(false)}
                        disabled={isCreatingTransaction}
                        className="p-2 w-full bg-red-800 mt-3 rounded-sm cursor-pointer text-white hover:bg-red-900 transition-colors duration-100"
                    >
                        Close
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateTransaction;
