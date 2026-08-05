import { delay } from './_sellerServiceUtils';
import { getHubRecords, createHubRecord } from './sellerHubModulesService';

export async function getPayments(query = {}) {
  return getHubRecords('payments', query);
}

export async function getPaymentHistory(query = {}) {
  return getHubRecords('payments', query);
}

export async function recordPayment(payload) {
  await delay(200);
  return createHubRecord('payments', payload);
}
