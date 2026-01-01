import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://c634b013c43b-11525078760688036516.ngrok-free.app"
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("SGR_TOKEN");
    if (token) {
      config.headers.Authorization = `Basic ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const apiFetcher = (url: string) => apiClient.get(url).then((res) => res.data);