import apiClient from './apiClient';

export const productApi = {
  getCategories: async () => {
    const response = await apiClient.get('/api/categories');
    return response.data;
  },
  getProducts: async (params) => {
    const response = await apiClient.get('/api/products', { params });
    return response.data;
  },
  getProductDetails: async (id) => {
    const response = await apiClient.get(`/api/products/${id}`);
    return response.data;
  }
};
