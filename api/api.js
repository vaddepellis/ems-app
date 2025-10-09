// src/api/axiosInstance.js
import axios from 'axios';
import { BASE_URL } from '@env';
const api = axios.create({
  baseURL: BASE_URL, // Replace with your base URL
  timeout: 10000, // Optional: 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Optional: Set up interceptors (for auth token, logging, etc.)
api.interceptors.request.use(
  async (config) => {
    // Example: Add auth token if needed
    // const token = await AsyncStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optionally handle errors globally
    console.log('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
