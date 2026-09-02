import apiClient from './apiClient';

export const orderApi = {
  getOrders: async (page = 1, options = {}) => {
    const response = await apiClient.get('/api/orders', { params: { page }, ...options });
    return response.data;
  },
  createOrder: async (orderData) => {
    const response = await apiClient.post('/api/orders', orderData);
    return response.data;
  }
};

export const cartApi = {
  getCart: async () => {
    const response = await apiClient.get('/api/cart');
    return response.data;
  },
  updateCart: async (productId, quantity) => {
    const response = await apiClient.post('/api/cart/items', { productId, quantity });
    return response.data;
  }
};
