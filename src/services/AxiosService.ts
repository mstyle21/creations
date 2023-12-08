import axios, { InternalAxiosRequestConfig } from "axios";
import { BACKEND_URL } from "../config";
import { TOKEN_KEY } from "../hooks/useAuth";

export const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  timeout: 30000,
});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem(TOKEN_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  }
  // (error) => {
  //   console.log(error);
  // }
);
