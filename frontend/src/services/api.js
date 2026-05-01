import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // Bypass ngrok browser warning for GET requests
  config.headers['ngrok-skip-browser-warning'] = 'true';
  return config;
});

export default api;
