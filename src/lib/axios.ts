import { useAuthStore } from "@/hooks/store/use-auth";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${apiUrl}` || "http://localhost:3000",
  withCredentials: true, // penting untuk mengirim cookies
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Panggil endpoint refresh token
        await axios.post(`${apiUrl}/api/users/refresh`, {
          withCredentials: true,
        });
        return api(originalRequest); // Ulangi permintaan asli dengan token yang baru
      } catch (refreshError) {
        console.error("Refresh token expired or invalid");
        useAuthStore.getState().logout(); // Logout user jika refresh gagal
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
