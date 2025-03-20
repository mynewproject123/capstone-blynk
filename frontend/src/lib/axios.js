import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api",
    withCredentials: true, // Send cookies to the server
});

export default axiosInstance;
