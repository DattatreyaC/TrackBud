import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";

const useTransactionStore = create((set) => ({
    transactions: [],
    isFetchingTransactions: false,
    isCreatingTransaction: false,
    isUpatingTransaction: false,
    isDeletingTransaction: false,

    createTransaction: async () => {},

    updateTransaction: async () => {},

    deleteTransaction: async () => {},

    getAllTransactions: async () => {},

    getDashboardTransactions: async () => {
        try {
            set({ isFetchingTransactions: true });
            const response = await axiosInstance.get(
                "/expenses/dashboard-expenses",
            );
            if (response.status === 200) {
                set({ transactions: response.data });
            }
        } catch (error) {
            set({ transactions: [] });
            console.log(`error in getDashboardTransactions ${error.message}`);
        } finally {
            set({ isFetchingTransactions: false });
        }
    },
}));

export default useTransactionStore;
