import { delay } from './_sellerServiceUtils';
import { getHubRecords, createHubRecord, updateHubRecord } from './sellerHubModulesService';

export async function getSupportTickets(query = {}) {
  return getHubRecords('support', query);
}

export async function createSupportTicket(payload) {
  await delay(300);
  return createHubRecord('support', {
    ...payload,
    name: payload.name || `TKT-${Date.now().toString().slice(-4)}`,
    status: 'open',
    subject: payload.subject,
  });
}

export async function updateSupportTicket(id, patch) {
  return updateHubRecord('support', id, patch);
}
