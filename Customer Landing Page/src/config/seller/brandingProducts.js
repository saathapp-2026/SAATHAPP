import brandingData from '../sellerBrandingProducts.json';

export const brandingProductsConfig = brandingData;

export function getBrandingProducts() {
  return brandingProductsConfig.products;
}

export function getBrandingStoreConfig() {
  return brandingProductsConfig;
}

export function getBrandingProductById(id) {
  return brandingProductsConfig.products.find((p) => p.id === id);
}

export default brandingProductsConfig;
