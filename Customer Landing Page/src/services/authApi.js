import apiClient from './apiClient';

export const authApi = {
  login: async (email, password) => {
    const response = await apiClient.post('/api/auth/login', { email, password });
    return response.data;
  },
  register: async (userData) => {
    const response = await apiClient.post('/api/auth/register', userData);
    return response.data;
  },
  getProfile: async () => {
    const response = await apiClient.get('/api/user/profile');
    return response.data;
  }
};
