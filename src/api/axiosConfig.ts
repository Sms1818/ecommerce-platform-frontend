import axios from "axios";
import { AUTH_STORAGE_KEY, parseStoredAuth } from "../utils/auth";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (raw) {
      const auth = parseStoredAuth(raw);
      if (auth?.token) {
        config.headers.Authorization = `Bearer ${auth.token}`;
      }
    }
  } catch {
    /* ignore */
  }
  return config;
});

export default api;