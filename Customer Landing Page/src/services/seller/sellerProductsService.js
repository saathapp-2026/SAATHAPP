import { delay } from './_sellerServiceUtils';

export async function getProducts() {
  await delay();
  return { success: true, data: [] };
}

export async function createProduct(payload) {
  await delay();
  return { success: true, data: payload };
}
