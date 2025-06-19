import axios from "axios";

// ✅ Base API URL
const BASE_URL = "http://192.177.75.54/AbControllersApiService/";

// ✅ Global Axios instance
const api = axios.create({
  baseURL: BASE_URL,
});

// ✅ Add token to request headers if exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// ✅ POST Request Function
export const post = (url, data = {}) => {
  return api.post(url, data).then((res) => res.data);
};

// ✅ GET Request Function (not common for your use, but included)
export const get = (url, params = {}) => {
  return api.get(url, { params }).then((res) => res.data);
};

// ✅ Export full axios instance if needed
export default api;
