import { create } from "zustand";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

const useAuthStore = create((set) => ({
    user: null,
    isRegistering: false,
    isLoggingIn: false,
    isLoggingOut: false,
    // isUpdatingProfile: false,
    isDeletingProfile: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            // set({ isCheckingAuth: true });
            const response = await axiosInstance.get("/auth/checkAuth");
            if (response) {
                set({ user: response.data });
            }
        } catch (error) {
            set({ user: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    register: async (firstname, lastname, email, password) => {
        try {
            set({ isRegistering: true });
            const response = await axiosInstance.post("/auth/register", {
                firstname,
                lastname,
                email,
                password,
            });
            console.log(response);
            if (response.status === 201) {
                set({ user: response.data });
                toast.success("Account Created");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Cannot Register");
        } finally {
            set({ isRegistering: false });
        }
    },

    login: async (email, password) => {
        try {
            set({ isLoggingIn: true });
            const response = await axiosInstance.post("/auth/login", {
                email,
                password,
            });
            if (response.status === 200) {
                set({ user: response.data });
            }
        } catch (error) {
            set({ user: null });
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            set({ isLoggingOut: true });
            const response = await axiosInstance.post("/auth/logout");
            if (response.status === 200) {
                toast.success("Logged Out");
            }
            set({ user: null });
        } catch (error) {
        } finally {
            set({ isLoggingOut: false });
        }
    },

    deleteAccount: async () => {
        try {
            set({ isDeletingProfile: true });
            const response = await axiosInstance.delete("/auth/delete");
            if (response.status === 200) {
                set({ user: null });
                toast.success("Account deleted");
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Cannot delete account",
            );
        } finally {
            set({ isDeletingProfile: false });
        }
    },
}));

export default useAuthStore;
