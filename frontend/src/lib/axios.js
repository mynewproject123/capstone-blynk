import axios from "axios";

const axiosInstance = axios.create({
<<<<<<< HEAD
<<<<<<< HEAD
	baseURL: import.meta.mode === "development" ? "http://backend:5000/api" : "/api",
=======
	baseURL: import.meta.mode === "development" ? "http://localhost:5000/api" : "/api",
>>>>>>> 1816c54e36cfeab654cf9ac79a9fce99bdfb5a01
=======
	baseURL: import.meta.mode === "development" ? "http://localhost:5001/api" : "/api",
>>>>>>> 6f12ac82388963669ba449803b3ba65218eef185
	withCredentials: true, // send cookies to the server
});

export default axiosInstance;
