export const equipmentConfig = {
  importantTerms: [
    'Welcome Kit provided only once',
    'Non-transferable',
    'Non-exchangeable',
    'No cash redemption',
    'Replacement items are chargeable',
    'Equipment rental subject to availability',
    'Security deposit required for rentals',
    'Maintenance responsibility during rental',
    'Signed rental agreement required',
    'Applicable taxes extra',
    'Logistics / shipping charges may apply',
    'Qualification / skill requirements may apply for certain equipment',
  ],
  uniforms: [
    { id: 'uniform_set', name: 'Branded Uniform Set', price: 1199 },
    { id: 'safety_vest', name: 'Safety Vest', price: 499 },
    { id: 'cap_set', name: 'Cap / Cap Set', price: 299 },
  ],
  safety: [
    { id: 'safety_kit', name: 'Safety Kit (Gloves, Goggles, Mask)', price: 899 },
    { id: 'helmet', name: 'Helmet', price: 599 },
    { id: 'safety_shoes', name: 'Safety Shoes', price: 1299 },
  ],
  tools: [
    { id: 'tool_bag', name: 'Tool Bag (Premium)', price: 1499 },
    { id: 'hand_tools', name: 'Basic Hand Tools Kit', price: 2499 },
    { id: 'power_tools_buy', name: 'Power Tools Kit (purchase)', price: 7999 },
  ],
  vehicle: [
    { id: 'vehicle_wrap', name: 'Vehicle Branding Wrap', price: 4999 },
    { id: 'bike_branding', name: 'Bike Branding Kit', price: 1999 },
    { id: 'led_board', name: 'LED Shop Board', price: 3499 },
  ],
  rental: [
    { id: 'power_tools', name: 'Power Tools Kit', monthlyRent: 499, deposit: 2000 },
    { id: 'ladder', name: 'Ladder (6ft)', monthlyRent: 199, deposit: 500 },
    { id: 'vacuum', name: 'Vacuum Cleaner (Industrial)', monthlyRent: 399, deposit: 1500 },
    { id: 'scaffolding', name: 'Scaffolding Set', monthlyRent: 1299, deposit: 5000 },
    { id: 'welding_machine', name: 'Welding Machine', monthlyRent: 1999, deposit: 8000 },
  ],
  digitalServices: [
    { id: 'website', name: 'Professional Website', price: 4999 },
    { id: 'portfolio_site', name: 'Portfolio Website', price: 2999 },
    { id: 'visiting_card', name: 'Digital Visiting Card', price: 499 },
    { id: 'business_email', name: 'Business Email', price: 799 },
    { id: 'domain', name: 'Domain Registration', price: 999 },
    { id: 'digital_marketing', name: 'Digital Marketing (30 days)', price: 2499 },
    { id: 'photography', name: 'Photography', price: 1999 },
    { id: 'whatsapp_biz', name: 'WhatsApp Business Setup', price: 599 },
    { id: 'booking_profile', name: 'Online Booking Profile', price: 799 },
    { id: 'qr_payment', name: 'QR Payment Setup', price: 399 },
    { id: 'consultation', name: 'Business Consultation', price: 1499 },
  ],
  safetyRules: [
    'Use certified tools only',
    'Maintain own equipment to platform safety standards',
    'PPE is mandatory on all jobs',
    'Rental equipment must be returned in good working condition',
  ],
};

export function getEquipmentConfig() {
  return equipmentConfig;
}

export default equipmentConfig;
