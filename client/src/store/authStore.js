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
    isCheckingAuth: false,

    checkAuth: async () => {
        try {
            set({ isCheckingAuth: true });
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
            if (response.status === 201) {
                set({ user: response.data });
            }
        } catch (error) {
            toast.error("Cannot register");
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
            toast.error(response.data.message);
        } finally {
            set({ isLoggingIn: false });
        }
    },
}));

export default useAuthStore;
