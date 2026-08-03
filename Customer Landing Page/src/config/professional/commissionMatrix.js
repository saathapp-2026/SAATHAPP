import commissionData from '../professionalCommission.json';

export const commissionMatrix = commissionData;

export function getCommissionMatrix() {
  return commissionMatrix;
}

export function getCommissionForCategory(categoryId) {
  const entry = commissionMatrix.categories?.[categoryId];
  if (entry) return entry;
  return commissionMatrix.defaultRange || { min: 5, max: 12 };
}

export default commissionMatrix;
