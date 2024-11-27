import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4001", 
});

// Añade un interceptor para incluir el token de autenticación
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
