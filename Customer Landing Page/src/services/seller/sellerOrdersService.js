import { delay } from './_sellerServiceUtils';

export async function getOrders() {
  await delay();
  return { success: true, data: [] };
}

export async function getOrderById(id) {
  await delay();
  return { success: true, data: { id } };
}
