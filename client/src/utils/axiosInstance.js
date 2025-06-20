import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "trackbud-backend.vercel.app",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export default axiosInstance;
