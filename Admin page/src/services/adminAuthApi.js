import apiClient from './apiClient';

export const adminAuthApi = {
  login: async (email, password) => {
    const response = await apiClient.post('/api/admin/auth/login', { email, password });
    return response.data;
  },
  getProfile: async () => {
    const response = await apiClient.get('/api/admin/profile');
    return response.data;
  }
};
