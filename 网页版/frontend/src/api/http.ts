import axios from "axios";
import { ElMessage } from "element-plus";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 10000,
  withCredentials: true,
});

http.interceptors.request.use((config) => {
  const raw = localStorage.getItem("luying-auth-session");
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as { token?: string };
      if (parsed.token) {
        config.headers.Authorization = `Bearer ${parsed.token}`;
      }
    } catch {
      localStorage.removeItem("luying-auth-session");
    }
  }
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message || error?.message || "请求失败，请稍后再试";
    ElMessage.error(message);
    return Promise.reject(error);
  },
);
