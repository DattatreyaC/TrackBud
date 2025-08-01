import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

const useTransactionStore = create((set) => ({
    balance: 0,
    transactions: [],
    dashboardTransactions: [],
    isGettingBalance: false,
    isFetchingTransactions: false,
    isCreatingTransaction: false,
    isDeletingTransaction: false,

    getBalance: async () => {
        try {
            set({ isGettingBalance: true });
            const response = await axiosInstance.get("/user", {
                withCredentials: true,
            });

            if (response.status === 200) {
                set({ balance: response.data.balance });
            }
        } catch (error) {
            console.log(`error in getBalance ${error.message}`);
            toast.error(error.response?.data?.message || "Cannot get Balance");
        } finally {
            set({ isGettingBalance: false });
        }
    },

    createTransaction: async (payload) => {
        try {
            set({ isCreatingTransaction: true });

            const response = await axiosInstance.post(
                "/expenses/create",
                payload,
            );
            if (response.status === 201) {
                toast.success("Transaction added");
            }
        } catch (error) {
            console.log(`error in createTransaction ${error.message}`, {
                withCredentials: true,
            });
            toast.error(
                error.response?.data?.message || "Cannot craete transaction",
            );
        } finally {
            set({ isCreatingTransaction: false });
        }
    },

    deleteTransaction: async (id) => {
        try {
            set({ isDeletingTransaction: true });
            const response = await axiosInstance.delete(
                `/expenses/delete/${id}`,
                { withCredentials: true },
            );
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Cannot delete transaction",
            );
        } finally {
            set({ isDeletingTransaction: false });
        }
    },

    getAllTransactions: async () => {
        try {
            set({ isFetchingTransactions: true });
            const response = await axiosInstance.get("/expenses/", {
                withCredentials: true,
            });
            if (response.status === 200) {
                set({ transactions: response.data });
            }
        } catch (error) {
            set({ transactions: [] });
        } finally {
            set({ isFetchingTransactions: false });
        }
    },

    getDashboardTransactions: async () => {
        try {
            set({ isFetchingTransactions: true });
            const response = await axiosInstance.get(
                "/expenses/dashboard-expenses",
                { withCredentials: true },
            );
            if (response.status === 200) {
                set({ dashboardTransactions: response.data });
            }
        } catch (error) {
            set({ dashboardTransactions: [] });
            console.log(`error in getDashboardTransactions ${error.message}`);
        } finally {
            set({ isFetchingTransactions: false });
        }
    },
}));

export default useTransactionStore;
