import { calculateOnboardingFee } from './src/services/professionalOnboardingService.js';

const locations = ['village', 'tier3', 'tier2', 'tier1', 'metro'];
const expectedFees = {
  village: 750,
  tier3: 1250,
  tier2: 1850,
  tier1: 2550,
  metro: 3500
};

console.log('--- TESTING LOCATION TO FEE MAPPING ---');
let allPassed = true;

locations.forEach(loc => {
  const data = {
    serviceLocation: { locationTier: loc }
  };
  const result = calculateOnboardingFee(data);
  const passed = result.fee === expectedFees[loc];
  if (!passed) allPassed = false;
  console.log(`[${loc}] Expected: ₹${expectedFees[loc]}, Got: ₹${result.fee} - ${passed ? 'PASS' : 'FAIL'}`);
});

console.log('\n--- TESTING INVESTMENT/COMPLEXITY IRRELEVANCE ---');
// Simulating an extreme professional profile with maximum staff, experience, and scale
const complexData = {
  accountInfo: {
    experience: '10+ Years',
    entityType: 'company',
    staffCount: '50+',
    equipmentLevel: 'premium',
    businessScale: 'national',
    category: 'electrician'
  },
  serviceLocation: {
    locationTier: 'village', // Should STILL be 750
    serviceRadius: '50+'
  },
  documents: {
    verificationLevel: 'premium'
  }
};

const complexResult = calculateOnboardingFee(complexData);
const complexPassed = complexResult.fee === 750;
if (!complexPassed) allPassed = false;
console.log(`[Village + Extreme Profile] Expected: ₹750, Got: ₹${complexResult.fee} - ${complexPassed ? 'PASS' : 'FAIL'}`);

if (allPassed) {
  console.log('\n✅ ALL TESTS PASSED');
  process.exit(0);
} else {
  console.error('\n❌ TESTS FAILED');
  process.exit(1);
}
