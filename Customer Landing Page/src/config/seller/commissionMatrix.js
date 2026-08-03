import commissionData from '../sellerCommission.json';

export const commissionMatrix = commissionData;

export function getCommissionMatrix() {
  return commissionMatrix;
}

export function getCommissionForCategory(categoryId) {
  const entry = commissionMatrix.categories?.[categoryId];
  if (entry) return entry;
  return commissionMatrix.default || { min: 3, max: 8, display: '3–8%' };
}

export default commissionMatrix;
