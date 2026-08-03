import { delay } from './_sellerServiceUtils';

export async function getSupportTickets() {
  await delay();
  return { success: true, data: [] };
}

export async function createSupportTicket(payload) {
  await delay(500);
  return {
    success: true,
    data: { id: `TKT_${Date.now()}`, ...payload, status: 'open' },
  };
}
