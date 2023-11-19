import axios from "axios";
import { CONFIG } from "../config";

const axiosInstance = axios.create({
  baseURL: CONFIG.backendUrl,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

const setAccessToken = (token: string) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export { axiosInstance, setAccessToken };
