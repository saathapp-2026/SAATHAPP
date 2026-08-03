import { delay } from './_sellerServiceUtils';

export async function getReports() {
  await delay();
  return { success: true, data: [] };
}

export async function generateReport(type) {
  await delay(600);
  return { success: true, data: { type, generatedAt: new Date().toISOString() } };
}
