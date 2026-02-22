import axios from "axios";
import { triggerLogout } from "./authService";

const axiosInstance = axios.create({
  baseURL: "https://e-commerce-new-backend.vercel.app/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// for request interceptor to add token to headers
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Assuming you store the token in localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// for response interceptor to handle 401 errors and trigger logout
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      triggerLogout();
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
