// src/utils/axiosInstance.js
import axios from "axios";
import { getToken } from "./auth";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api",
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || "10000"),
  headers: {
    "Content-Type": "application/json",
  }
});

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle specific HTTP error codes
      switch (error.response.status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          toast.error("Session expired. Please login again.");
          localStorage.removeItem(import.meta.env.VITE_TOKEN_STORAGE_KEY || "token");
          window.location.href = "/login";
          break;
        case 403:
          toast.error("You don't have permission to perform this action");
          break;
        case 429:
          toast.error("Too many requests. Please try again later");
          break;
        case 500:
          toast.error("Server error. Please try again later");
          break;
        default:
          // Handle other errors
          if (error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
          } else {
            toast.error("An error occurred");
          }
      }
    } else if (error.request) {
      // Request was made but no response received
      toast.error("No response from server. Please check your connection");
    } else {
      // Something else happened while setting up the request
      toast.error("Error setting up request");
    }
    return Promise.reject(error);
  }
);

export default instance;
