import axios from "axios";

const env = import.meta.env.VITE_ENVIRONMENT;
const url = import.meta.env.VITE_SERVER_URL;
let axiosInstance = null;

if (env === "prod") {
    axiosInstance = axios.create({
        baseURL: url,
        // baseURL: "http://localhost:5000/api",
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    });
} else {
    axiosInstance = axios.create({
        // baseURL: "https://trackbud.onrender.com/api",
        baseURL: "http://localhost:5000/api",
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    });
}

export default axiosInstance;
