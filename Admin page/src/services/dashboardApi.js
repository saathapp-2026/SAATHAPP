import apiClient from './apiClient';

export const dashboardApi = {
  getStats: async () => {
    const response = await apiClient.get('/api/admin/dashboard/stats');
    return response.data;
  },
  getUsers: async (params) => {
    const response = await apiClient.get('/api/admin/users', { params });
    return response.data;
  },
  getOrders: async (params) => {
    const response = await apiClient.get('/api/admin/orders', { params });
    return response.data;
  }
};
