import { apiUrl } from "@src/constants/api-constants";
import { deleteToken, getToken } from "@src/utils/token";
import axios from "axios";
import { io } from "socket.io-client";

export const socket = io(apiUrl, {
  auth: (cb) => {
    getToken().then((token) => {
      if (token) {
        cb({ authorization: `Bearer ${token}` });
      }
    });
  },
  withCredentials: true,
});

const baseURL = `${apiUrl}/api`;

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

api.interceptors.response.use(async (config) => {
  if (config.status === 401) {
    await deleteToken();
  }
  return config;
});

export default api;
