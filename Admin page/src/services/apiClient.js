import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;
if (!baseURL && import.meta.env.DEV) {
  console.warn('⚠️ VITE_API_BASE_URL is not defined in your environment variables. API calls will likely fail.');
}

const apiClient = axios.create({
  baseURL: baseURL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  const session = JSON.parse(window.localStorage.getItem('saathapp-admin-session'));
  if (session && session.token) {
    config.headers.Authorization = `Bearer ${session.token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        window.localStorage.removeItem('saathapp-admin-session');
        window.sessionStorage.removeItem('saathapp-admin-session');
        window.dispatchEvent(new Event('admin-session-expired'));
      } else if (error.response.status >= 500) {
        console.error('Server error:', error.response.data);
        window.dispatchEvent(new CustomEvent('admin-api-error', { detail: 'A server error occurred. Please try again later.' }));
      }
    } else if (error.request) {
      console.error('Network error or timeout:', error.request);
      window.dispatchEvent(new CustomEvent('admin-api-error', { detail: 'Network error. Please check your connection.' }));
    }
    return Promise.reject(error);
  }
);

export default apiClient;
