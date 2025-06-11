import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

const useTaskStore = create((set, get) => ({
    tasks: [],
    // dashboardTasks: [],
    isFetchingTasks: false,
    isCreatingTask: false,
    isUpdatingTask: false,
    isDeletingTask: false,

    createTask: async (title, description, priority, dueDate) => {
        try {
            set({ isCreatingTask: true });
            if (description === "") {
                description = null;
            }
            if (dueDate === "") {
                dueDate = null;
            }

            const payload = {
                title,
                description,
                priority,
                dueDate,
            };

            const response = await axiosInstance.post("/tasks/create", payload);

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

    deleteTask: async (id) => {
        try {
            set({ isDeletingTask: true });
            const response = await axiosInstance.delete(`/tasks/delete/${id}`);
            if (response.status === 200) {
                toast.success("Task Deleted");
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        } finally {
            set({ isDeletingTask: false });
        }
    },

    getAllTasks: async () => {
        // if (get().tasks.length > 0) {
        //     return;
        // }
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

    getDashboardTasks: async () => {
        // if (get().dashboardTasks.length > 0) {
        //     return;
        // }
        try {
            set({ isFetchingTasks: true });
            const response = await axiosInstance.get("/tasks/dashboard-tasks");
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
