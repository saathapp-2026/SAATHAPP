import { delay } from './_sellerServiceUtils';

export async function getCustomers() {
  await delay();
  return { success: true, data: [] };
}
