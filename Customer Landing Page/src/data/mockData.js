import { ShieldCheck, Users, Truck, Brain } from 'lucide-react';

export const categories = [
  {
    id: 'electricals',
    name: 'Electricals',
    tagline: 'Electricians & Parts',
    iconName: 'Zap',
    gradient: 'bg-gradient-card-green',
    textColor: 'text-green-700',
    popular: true,
    image: '',
  },
  {
    id: 'hardware',
    name: 'Hardware',
    tagline: 'Tools & Fittings',
    iconName: 'Hammer',
    gradient: 'bg-gradient-card-yellow',
    textColor: 'text-amber-700',
    popular: false,
    image: '',
  },
  {
    id: 'construction',
    name: 'Construction',
    tagline: 'Cement, Sand & Brick',
    iconName: 'HardHat',
    gradient: 'bg-gradient-card-blue',
    textColor: 'text-blue-700',
    popular: true,
    image: '',
  },
  {
    id: 'repairs',
    name: 'Repairs & AC',
    tagline: 'Appliance Experts',
    iconName: 'Wrench',
    gradient: 'bg-gradient-card-red',
    textColor: 'text-red-700',
    popular: true,
    image: '',
  },
  {
    id: 'grocery',
    name: 'Grocery & Fresh',
    tagline: 'Daily Essentials',
    iconName: 'ShoppingCart',
    gradient: 'bg-gradient-card-purple',
    textColor: 'text-purple-700',
    popular: true,
    image: '',
  },
  {
    id: 'agriculture',
    name: 'Agriculture',
    tagline: 'Seeds & Fertilizer',
    iconName: 'Tractor',
    gradient: 'bg-gradient-card-orange',
    textColor: 'text-orange-700',
    popular: false,
    image: '',
  },
  {
    id: 'vehicle',
    name: 'Vehicle Care',
    tagline: 'Wash & Mechanics',
    iconName: 'Car',
    gradient: 'bg-gradient-card-cyan',
    textColor: 'text-cyan-700',
    popular: false,
    image: '',
  },
  {
    id: 'home_services',
    name: 'Home Services',
    tagline: 'Cleaning & Painting',
    iconName: 'Home',
    gradient: 'bg-gradient-card-teal',
    textColor: 'text-teal-700',
    popular: true,
    image: '',
  },
  {
    id: 'furniture',
    name: 'Furniture',
    tagline: 'Sofa & Carpentry',
    iconName: 'Sofa',
    gradient: 'bg-gradient-card-green',
    textColor: 'text-green-700',
    popular: false,
    image: '',
  },
  {
    id: 'mobiles',
    name: 'Accessories',
    tagline: 'Cables & Covers',
    iconName: 'Smartphone',
    gradient: 'bg-gradient-card-yellow',
    textColor: 'text-amber-700',
    popular: false,
    image: '',
  },
  {
    id: 'gas_booking',
    name: 'Gas Booking',
    tagline: 'LPG Refill',
    iconName: 'Flame',
    gradient: 'bg-gradient-card-red',
    textColor: 'text-red-700',
    popular: false,
    image: '',
  },
  {
    id: 'water_booking',
    name: 'Water Delivery',
    tagline: '20L Pure Water cans',
    iconName: 'Droplet',
    gradient: 'bg-gradient-card-blue',
    textColor: 'text-blue-700',
    popular: false,
    image: '',
  },
  {
    id: 'newspaper',
    name: 'Newspaper',
    tagline: 'Daily Subscriptions',
    iconName: 'Newspaper',
    gradient: 'bg-gradient-card-teal',
    textColor: 'text-teal-700',
    popular: false,
    image: '',
  }
];

export const flashDeals = [];

export const featuredProducts = [];

export const nearbyShops = [];

export const services = [];

export const advertisements = [];

export const testimonials = [];

export const howItWorksSteps = [
  {
    step: '01',
    title: 'Choose Products or Services',
    description: 'Search for groceries, hardware, farm supplies, or professional local home services.'
  },
  {
    step: '02',
    title: 'Instant Booking & Checkout',
    description: 'Add items from local stores or select service schedules with flat, upfront pricing.'
  },
  {
    step: '03',
    title: 'Saathi Professional Assigned',
    description: 'A verified local Saathi or delivery partner is matched to fulfill your order immediately.'
  },
  {
    step: '04',
    title: 'Delivered or Serviced',
    description: 'Receive your goods or service with live tracking, and pay securely once fully satisfied.'
  }
];

export const liveStats = [
  { value: 0, label: 'Products Available', prefix: '', suffix: '' },
  { value: 0, label: 'Verified Local Stores', prefix: '', suffix: '' },
  { value: 0, label: 'Successful Orders Today', prefix: '', suffix: '' },
  { value: 0, label: 'Active Saathi Partners', prefix: '', suffix: '' }
];

// ─── Worker Dashboard Mock Data ───────────────────────────────────────────

export const workerProfile = {
  name: '',
  id: '',
  type: '',
  email: '',
  phone: '',
  photo: '',
  verified: false,
  city: '',
  experience: '',
  skills: [],
  bankAccount: '',
  emergencyContact: '',
};

export const workerJobs = [];

export const workerStats = {
  todayJobs: 0,
  assignedJobs: 0,
  completedJobs: 0,
  pendingJobs: 0,
  cancelledJobs: 0,
  todayEarnings: 0,
  monthlyEarnings: 0,
  performanceScore: 0,
  workingHours: 0,
  attendancePercent: 0,
  monthlySalary: 0,
  incentives: 0,
  averageRating: 0,
};

export const workerEarnings = {
  today: 0,
  weekly: 0,
  monthly: 0,
  salary: 0,
  bonus: 0,
  incentives: 0,
  statements: [],
};

export const workerAttendance = {
  isClockedIn: false,
  totalHours: 0,
  lateMarks: 0,
  leavesTaken: 0,
  todayHours: 0,
  calendar: [],
};

export const workerPerformance = {
  completionRate: 0,
  acceptanceRate: 0,
  customerRating: 0,
  averageJobTime: '0 mins',
  rank: 0,
  totalWorkers: 0,
  badges: [],
};

export const workerReviews = [];

export const workerWallet = {
  balance: 0,
  salaryStatus: 'none',
  pendingSalary: 0,
  bonus: 0,
  withdrawHistory: [],
};

export const workerDocuments = [];

export const workerNotifications = [];

export const workerSupportFaqs = [
  { q: 'How are incentives calculated?', a: 'Incentives are based on job complexity, priority, and customer rating bonus.' },
  { q: 'When is salary credited?', a: 'Base salary is credited on the 1st of every month. Incentives settle weekly on Tuesdays.' },
  { q: 'How to dispute a late mark?', a: 'Raise a support ticket under Attendance with your shift log details.' },
];

export const workerTrainingVideos = [
  { title: 'Safety Protocols for Electrical Work', duration: '8 min' },
  { title: 'Customer Communication Best Practices', duration: '5 min' },
  { title: 'Photo Documentation Guidelines', duration: '4 min' },
];

// ─── Professional Dashboard Mock Data ───────────────────────────────────────

export const professionalProfile = {
  name: '',
  id: '',
  type: '',
  email: '',
  phone: '',
  photo: '',
  verified: false,
  city: '',
  serviceRadius: 0,
  rating: 0,
  totalCustomers: 0,
  repeatCustomers: 0,
};

export const professionalBookings = [];

export const professionalStats = {
  todayJobs: 0,
  upcomingJobs: 0,
  completedJobs: 0,
  cancelledJobs: 0,
  pendingJobs: 0,
  inProgressJobs: 0,
  monthlyEarnings: 0,
  pendingPayments: 0,
  customerRating: 0,
  acceptanceRate: 0,
  responseTime: '0 mins',
  totalEarnings: 0,
  averageRating: 0,
  totalCustomers: 0,
  repeatCustomers: 0,
};

export const professionalSchedule = [];

export const professionalCustomers = [];

export const professionalNotifications = [];

export const professionalWallet = {
  currentBalance: 0,
  pendingBalance: 0,
  withdrawHistory: [],
  transactions: [],
};

export const professionalDocuments = [];

export const professionalReviews = [];

export const professionalSupportFaqs = [
  { q: 'How long to clear payouts?', a: 'Completed payouts settle in available balance instantly. Bank transfers happen weekly on Tuesdays.' },
  { q: 'What is client escrow?', a: 'Payments are secured in escrow upon booking to guarantee you get paid for completed work.' },
  { q: 'How to boost my profile?', a: 'Complete verification, maintain high ratings, and stay online during peak hours.' },
];
