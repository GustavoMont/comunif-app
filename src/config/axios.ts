import { getToken } from "@src/utils/token";
import axios from "axios";

const baseURL = "http://10.0.2.2:3000/api";

export const api = axios.create({
  baseURL,
});

api.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default api;
