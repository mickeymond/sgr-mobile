import axios from "axios";

const API_URL = "https://c634b013c43b-11525078760688036516.ngrok-free.app";

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Basic ${btoa("asare:2083")}`,
  },
});

export const apiFetcher = (url: string) => apiClient.get(url).then((res) => res.data);