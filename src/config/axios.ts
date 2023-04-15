import { getToken } from "@src/utils/token";
import axios from "axios";
import { io } from "socket.io-client";

const url = "http://10.0.2.2:3000";

export const socket = io(url, {
  auth: (cb) => {
    getToken().then((token) => {
      if (token) {
        cb({ authorization: `Bearer ${token}` });
      }
    });
  },
  withCredentials: true,
});

const baseURL = `${url}/api`;

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
