import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;
const timeout = Number(import.meta.env.VITE_API_TIMEOUT) || 10000;

if (!baseURL) {
  throw new Error(
    "VITE_API_BASE_URL is not set. Copy .env.example to .env and configure it."
  );
}

export const apiClient = axios.create({
  baseURL,
  timeout,
  headers: { "Content-Type": "application/json" },
});
