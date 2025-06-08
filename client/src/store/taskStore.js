import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

const useTaskStore = create((set) => ({
    tasks: [],
    isFetchingTasks: false,
    isCreatingTask: false,
    isUpdatingTask: false,
    isDeletingTask: false,

    createTask: async (title, description, priority) => {
        try {
            set({ isCreatingTask: true });
            const response = await axiosInstance.post("/tasks/create", {
                title,
                description,
                priority,
            });

            if (response.status === 201) {
                toast.success("Task Created");
            }
        } catch (error) {
            console.log(`error in createTask ${error.message}`);
            toast.error(error.response?.data?.message || "Cannot create task");
        } finally {
            set({ isCreatingTask: false });
        }
    },

    updateTask: async () => {},

    deleteTask: async () => {},

    getAllTasks: async () => {
        try {
            set({ isFetchingTasks: true });
            const response = await axiosInstance.get("/user/tasks");
            if (response.status === 200) {
                set({ tasks: response.data });
            }
        } catch (error) {
            set({ tasks: null });
            toast.error(
                error.response?.data?.message || "Something went wrong",
            );
        } finally {
            set({ isFetchingTasks: false });
        }
    },
}));

export default useTaskStore;
