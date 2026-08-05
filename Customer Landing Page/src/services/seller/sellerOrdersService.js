import { delay } from './_sellerServiceUtils';
import {
  ORDER_STATUS,
  RETURN_STATUS,
  canTransition,
  HIGH_VALUE_THRESHOLD,
  ACCEPTANCE_SLA_MS,
  PACKING_SLA_MS,
} from '../../config/seller/orderConstants';

const ORDERS_KEY = 'saathapp-seller-orders-v1';
const AGENTS_KEY = 'saathapp-seller-delivery-agents-v1';

function hoursAgo(h) {
  return Date.now() - h * 60 * 60 * 1000;
}

function minutesAgo(m) {
  return Date.now() - m * 60 * 1000;
}

function startOfDay(ts = Date.now()) {
  const d = new Date(ts);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function yesterdayStart() {
  return startOfDay() - 24 * 60 * 60 * 1000;
}

const SEED_AGENTS = [
  {
    id: 'ag_1',
    name: 'Ravi Kumar',
    photo: '',
    distanceKm: 1.2,
    vehicle: 'Bike',
    rating: 4.8,
    available: true,
    currentOrders: 2,
    etaMinutes: 8,
    phone: '+91 98765 11111',
  },
  {
    id: 'ag_2',
    name: 'Suresh Yadav',
    photo: '',
    distanceKm: 2.4,
    vehicle: 'Scooter',
    rating: 4.6,
    available: true,
    currentOrders: 1,
    etaMinutes: 12,
    phone: '+91 98765 22222',
  },
  {
    id: 'ag_3',
    name: 'Amit Singh',
    photo: '',
    distanceKm: 3.1,
    vehicle: 'Bike',
    rating: 4.9,
    available: false,
    currentOrders: 4,
    etaMinutes: 25,
    phone: '+91 98765 33333',
  },
  {
    id: 'ag_4',
    name: 'Priya Nair',
    photo: '',
    distanceKm: 0.8,
    vehicle: 'EV Scooter',
    rating: 4.7,
    available: true,
    currentOrders: 0,
    etaMinutes: 5,
    phone: '+91 98765 44444',
  },
];

function makeTimeline(events) {
  return events.map((e, i) => ({
    id: `tl_${i}_${e.status}`,
    status: e.status,
    label: e.label,
    at: e.at,
    actor: e.actor || 'System',
    remarks: e.remarks || '',
  }));
}

function seedOrders() {
  const now = Date.now();
  return [
    {
      id: 'SA-1042',
      invoiceNumber: 'INV-2026-1042',
      customer: {
        id: 'c1',
        name: 'Rahul Sharma',
        phone: '+91 98111 22334',
        email: 'rahul.sharma@email.com',
        address: '12, MG Road, Indiranagar, Bengaluru 560038',
        lat: 12.9784,
        lng: 77.6408,
        notes: 'Ring doorbell twice',
        blocked: false,
        orderCount: 8,
      },
      items: [
        { id: 'p1', name: 'Organic Mangoes (1kg)', sku: 'MNG-001', qty: 2, price: 120, image: '', gst: 5, discount: 0 },
        { id: 'p2', name: 'Basmati Rice 5kg', sku: 'RCE-002', qty: 1, price: 450, image: '', gst: 5, discount: 20 },
      ],
      paymentMode: 'cod',
      paymentStatus: 'pending',
      deliveryMode: 'saath',
      deliveryPartner: null,
      agent: null,
      amount: 1250,
      commission: 62.5,
      deliveryCharge: 30,
      packingCharge: 10,
      platformFee: 15,
      taxes: 55,
      coupon: null,
      discount: 20,
      status: ORDER_STATUS.NEW,
      createdAt: minutesAgo(8),
      acceptanceDeadline: minutesAgo(8) + ACCEPTANCE_SLA_MS,
      packingDeadline: null,
      pickupDeadline: null,
      deliveryEta: now + 45 * 60 * 1000,
      pickupTime: null,
      isExpress: true,
      isPriority: true,
      isLate: false,
      isRepeatCustomer: true,
      timeline: makeTimeline([
        { status: ORDER_STATUS.NEW, label: 'Customer Ordered', at: minutesAgo(8), actor: 'Customer', remarks: 'Order placed via app' },
      ]),
      cancellation: null,
      rejection: null,
      returnFlow: null,
      handover: null,
      attachments: [],
      sellerNotes: '',
    },
    {
      id: 'SA-1041',
      invoiceNumber: 'INV-2026-1041',
      customer: {
        id: 'c2',
        name: 'Priya Patel',
        phone: '+91 98222 33445',
        email: 'priya.patel@email.com',
        address: '45, Koramangala 5th Block, Bengaluru 560095',
        lat: 12.9352,
        lng: 77.6245,
        notes: '',
        blocked: false,
        orderCount: 3,
      },
      items: [
        { id: 'p3', name: 'Fresh Milk 1L', sku: 'MLK-003', qty: 4, price: 65, image: '', gst: 5, discount: 0 },
        { id: 'p4', name: 'Premium Tea 250g', sku: 'TEA-005', qty: 1, price: 180, image: '', gst: 12, discount: 0 },
      ],
      paymentMode: 'upi',
      paymentStatus: 'received',
      deliveryMode: 'saath',
      deliveryPartner: 'Saath Delivery',
      agent: null,
      amount: 890,
      commission: 44.5,
      deliveryCharge: 25,
      packingCharge: 5,
      platformFee: 10,
      taxes: 40,
      coupon: 'SAATH10',
      discount: 50,
      status: ORDER_STATUS.ACCEPTED,
      createdAt: minutesAgo(25),
      acceptanceDeadline: minutesAgo(25) + ACCEPTANCE_SLA_MS,
      packingDeadline: minutesAgo(20) + PACKING_SLA_MS,
      pickupDeadline: null,
      deliveryEta: now + 35 * 60 * 1000,
      pickupTime: null,
      isExpress: false,
      isPriority: false,
      isLate: false,
      isRepeatCustomer: true,
      timeline: makeTimeline([
        { status: ORDER_STATUS.NEW, label: 'Customer Ordered', at: minutesAgo(25), actor: 'Customer' },
        { status: ORDER_STATUS.ACCEPTED, label: 'Accepted', at: minutesAgo(20), actor: 'Seller', remarks: 'Accepted within SLA' },
      ]),
      cancellation: null,
      rejection: null,
      returnFlow: null,
      handover: null,
      attachments: [],
      sellerNotes: 'VIP customer',
    },
    {
      id: 'SA-1040',
      invoiceNumber: 'INV-2026-1040',
      customer: {
        id: 'c3',
        name: 'Amit Kumar',
        phone: '+91 98333 44556',
        email: 'amit.k@email.com',
        address: '88, HSR Layout Sector 2, Bengaluru 560102',
        lat: 12.9116,
        lng: 77.6473,
        notes: 'Leave at security if not home',
        blocked: false,
        orderCount: 12,
      },
      items: [
        { id: 'p5', name: 'Whole Wheat Flour 5kg', sku: 'FLR-004', qty: 2, price: 280, image: '', gst: 5, discount: 0 },
        { id: 'p1', name: 'Organic Mangoes (1kg)', sku: 'MNG-001', qty: 5, price: 120, image: '', gst: 5, discount: 0 },
        { id: 'p2', name: 'Basmati Rice 5kg', sku: 'RCE-002', qty: 2, price: 450, image: '', gst: 5, discount: 0 },
      ],
      paymentMode: 'online',
      paymentStatus: 'received',
      deliveryMode: 'saath',
      deliveryPartner: 'Saath Delivery',
      agent: null,
      amount: 3420,
      commission: 171,
      deliveryCharge: 40,
      packingCharge: 20,
      platformFee: 25,
      taxes: 160,
      coupon: null,
      discount: 0,
      status: ORDER_STATUS.PACKED,
      createdAt: hoursAgo(1.5),
      acceptanceDeadline: hoursAgo(1.5) + ACCEPTANCE_SLA_MS,
      packingDeadline: hoursAgo(1.2) + PACKING_SLA_MS,
      pickupDeadline: hoursAgo(0.5) + 45 * 60 * 1000,
      deliveryEta: now + 50 * 60 * 1000,
      pickupTime: null,
      isExpress: false,
      isPriority: true,
      isLate: false,
      isRepeatCustomer: true,
      timeline: makeTimeline([
        { status: ORDER_STATUS.NEW, label: 'Customer Ordered', at: hoursAgo(1.5), actor: 'Customer' },
        { status: ORDER_STATUS.ACCEPTED, label: 'Accepted', at: hoursAgo(1.4), actor: 'Seller' },
        { status: ORDER_STATUS.PREPARING, label: 'Preparing', at: hoursAgo(1.2), actor: 'Seller' },
        { status: ORDER_STATUS.PACKED, label: 'Packed', at: hoursAgo(0.5), actor: 'Seller', remarks: 'All items packed' },
      ]),
      cancellation: null,
      rejection: null,
      returnFlow: null,
      handover: null,
      attachments: [],
      sellerNotes: '',
    },
    {
      id: 'SA-1039',
      invoiceNumber: 'INV-2026-1039',
      customer: {
        id: 'c4',
        name: 'Sneha Reddy',
        phone: '+91 98444 55667',
        email: 'sneha.r@email.com',
        address: '22, Jayanagar 4th Block, Bengaluru 560011',
        lat: 12.9308,
        lng: 77.5838,
        notes: '',
        blocked: false,
        orderCount: 2,
      },
      items: [
        { id: 'p4', name: 'Premium Tea 250g', sku: 'TEA-005', qty: 2, price: 180, image: '', gst: 12, discount: 0 },
        { id: 'p3', name: 'Fresh Milk 1L', sku: 'MLK-003', qty: 2, price: 65, image: '', gst: 5, discount: 0 },
      ],
      paymentMode: 'wallet',
      paymentStatus: 'received',
      deliveryMode: 'self',
      deliveryPartner: 'Self Delivery',
      agent: { id: 'ag_self', name: 'Store Runner', vehicle: 'Bike', phone: '+91 98000 00001', rating: 5 },
      amount: 650,
      commission: 32.5,
      deliveryCharge: 0,
      packingCharge: 5,
      platformFee: 8,
      taxes: 30,
      coupon: null,
      discount: 0,
      status: ORDER_STATUS.READY,
      createdAt: hoursAgo(2),
      acceptanceDeadline: hoursAgo(2) + ACCEPTANCE_SLA_MS,
      packingDeadline: hoursAgo(1.8) + PACKING_SLA_MS,
      pickupDeadline: hoursAgo(0.8) + 45 * 60 * 1000,
      deliveryEta: now + 20 * 60 * 1000,
      pickupTime: now + 15 * 60 * 1000,
      isExpress: true,
      isPriority: false,
      isLate: false,
      isRepeatCustomer: false,
      timeline: makeTimeline([
        { status: ORDER_STATUS.NEW, label: 'Customer Ordered', at: hoursAgo(2), actor: 'Customer' },
        { status: ORDER_STATUS.ACCEPTED, label: 'Accepted', at: hoursAgo(1.9), actor: 'Seller' },
        { status: ORDER_STATUS.PREPARING, label: 'Preparing', at: hoursAgo(1.7), actor: 'Seller' },
        { status: ORDER_STATUS.PACKED, label: 'Packed', at: hoursAgo(1.2), actor: 'Seller' },
        { status: ORDER_STATUS.READY, label: 'Ready for Pickup', at: hoursAgo(0.8), actor: 'Seller' },
      ]),
      cancellation: null,
      rejection: null,
      returnFlow: null,
      handover: null,
      attachments: [],
      sellerNotes: '',
    },
    {
      id: 'SA-1038',
      invoiceNumber: 'INV-2026-1038',
      customer: {
        id: 'c5',
        name: 'Vikram Singh',
        phone: '+91 98555 66778',
        email: 'vikram.s@email.com',
        address: '9, Whitefield Main Road, Bengaluru 560066',
        lat: 12.9698,
        lng: 77.7499,
        notes: '',
        blocked: false,
        orderCount: 1,
      },
      items: [{ id: 'p6', name: 'Organic Honey 500g', sku: 'HNY-006', qty: 1, price: 2100, image: '', gst: 5, discount: 0 }],
      paymentMode: 'credit_card',
      paymentStatus: 'refunded',
      deliveryMode: 'courier',
      deliveryPartner: 'BlueDart',
      agent: null,
      amount: 2100,
      commission: 105,
      deliveryCharge: 60,
      packingCharge: 15,
      platformFee: 20,
      taxes: 100,
      coupon: null,
      discount: 0,
      status: ORDER_STATUS.CANCELLED,
      createdAt: hoursAgo(48),
      acceptanceDeadline: hoursAgo(48) + ACCEPTANCE_SLA_MS,
      packingDeadline: null,
      pickupDeadline: null,
      deliveryEta: null,
      pickupTime: null,
      isExpress: false,
      isPriority: false,
      isLate: true,
      isRepeatCustomer: false,
      timeline: makeTimeline([
        { status: ORDER_STATUS.NEW, label: 'Customer Ordered', at: hoursAgo(48), actor: 'Customer' },
        { status: ORDER_STATUS.CANCELLED, label: 'Cancelled', at: hoursAgo(47), actor: 'Seller', remarks: 'Inventory Issue' },
      ]),
      cancellation: {
        reason: 'Inventory Issue',
        customReason: '',
        cancelledBy: 'Seller',
        at: hoursAgo(47),
        history: [{ reason: 'Inventory Issue', at: hoursAgo(47), by: 'Seller' }],
      },
      rejection: null,
      returnFlow: null,
      handover: null,
      attachments: [],
      sellerNotes: '',
    },
    {
      id: 'SA-1037',
      invoiceNumber: 'INV-2026-1037',
      customer: {
        id: 'c1',
        name: 'Rahul Sharma',
        phone: '+91 98111 22334',
        email: 'rahul.sharma@email.com',
        address: '12, MG Road, Indiranagar, Bengaluru 560038',
        lat: 12.9784,
        lng: 77.6408,
        notes: '',
        blocked: false,
        orderCount: 8,
      },
      items: [{ id: 'p2', name: 'Basmati Rice 5kg', sku: 'RCE-002', qty: 3, price: 450, image: '', gst: 5, discount: 0 }],
      paymentMode: 'cod',
      paymentStatus: 'pending',
      deliveryMode: 'saath',
      deliveryPartner: 'Saath Delivery',
      agent: {
        id: 'ag_1',
        name: 'Ravi Kumar',
        vehicle: 'Bike',
        phone: '+91 98765 11111',
        rating: 4.8,
      },
      amount: 1450,
      commission: 72.5,
      deliveryCharge: 30,
      packingCharge: 10,
      platformFee: 12,
      taxes: 68,
      coupon: null,
      discount: 0,
      status: ORDER_STATUS.OUT_FOR_DELIVERY,
      createdAt: hoursAgo(3),
      acceptanceDeadline: hoursAgo(3) + ACCEPTANCE_SLA_MS,
      packingDeadline: hoursAgo(2.8) + PACKING_SLA_MS,
      pickupDeadline: hoursAgo(2) + 45 * 60 * 1000,
      deliveryEta: now + 12 * 60 * 1000,
      pickupTime: hoursAgo(0.8),
      isExpress: false,
      isPriority: false,
      isLate: true,
      isRepeatCustomer: true,
      timeline: makeTimeline([
        { status: ORDER_STATUS.NEW, label: 'Customer Ordered', at: hoursAgo(3), actor: 'Customer' },
        { status: ORDER_STATUS.ACCEPTED, label: 'Accepted', at: hoursAgo(2.9), actor: 'Seller' },
        { status: ORDER_STATUS.PREPARING, label: 'Preparing', at: hoursAgo(2.7), actor: 'Seller' },
        { status: ORDER_STATUS.PACKED, label: 'Packed', at: hoursAgo(2.2), actor: 'Seller' },
        { status: ORDER_STATUS.READY, label: 'Ready', at: hoursAgo(2), actor: 'Seller' },
        { status: ORDER_STATUS.PICKUP_ASSIGNED, label: 'Pickup Assigned', at: hoursAgo(1.8), actor: 'Seller', remarks: 'Assigned Ravi Kumar' },
        { status: ORDER_STATUS.PICKED_UP, label: 'Picked Up', at: hoursAgo(0.8), actor: 'Agent' },
        { status: ORDER_STATUS.OUT_FOR_DELIVERY, label: 'Out for Delivery', at: hoursAgo(0.7), actor: 'Agent' },
      ]),
      cancellation: null,
      rejection: null,
      returnFlow: null,
      handover: {
        packageId: 'PKG-1037',
        orderId: 'SA-1037',
        otp: '4821',
        qrCode: 'SAATH-SA-1037-PKG',
        sellerSignature: 'Rahul Store',
        deliverySignature: 'Ravi K',
        timestamp: hoursAgo(0.8),
        gps: { lat: 12.9716, lng: 77.5946 },
        verified: true,
      },
      attachments: [],
      sellerNotes: '',
    },
    {
      id: 'SA-1036',
      invoiceNumber: 'INV-2026-1036',
      customer: {
        id: 'c6',
        name: 'Ananya Iyer',
        phone: '+91 98666 77889',
        email: 'ananya.i@email.com',
        address: '3, Malleswaram 18th Cross, Bengaluru 560003',
        lat: 13.0035,
        lng: 77.5648,
        notes: '',
        blocked: false,
        orderCount: 5,
      },
      items: [
        { id: 'p1', name: 'Organic Mangoes (1kg)', sku: 'MNG-001', qty: 3, price: 120, image: '', gst: 5, discount: 0 },
      ],
      paymentMode: 'upi',
      paymentStatus: 'received',
      deliveryMode: 'saath',
      deliveryPartner: 'Saath Delivery',
      agent: { id: 'ag_2', name: 'Suresh Yadav', vehicle: 'Scooter', phone: '+91 98765 22222', rating: 4.6 },
      amount: 420,
      commission: 21,
      deliveryCharge: 20,
      packingCharge: 5,
      platformFee: 5,
      taxes: 18,
      coupon: null,
      discount: 0,
      status: ORDER_STATUS.DELIVERED,
      createdAt: hoursAgo(5),
      acceptanceDeadline: hoursAgo(5) + ACCEPTANCE_SLA_MS,
      packingDeadline: hoursAgo(4.8) + PACKING_SLA_MS,
      pickupDeadline: hoursAgo(4) + 45 * 60 * 1000,
      deliveryEta: hoursAgo(1),
      pickupTime: hoursAgo(2.5),
      isExpress: false,
      isPriority: false,
      isLate: false,
      isRepeatCustomer: true,
      timeline: makeTimeline([
        { status: ORDER_STATUS.NEW, label: 'Customer Ordered', at: hoursAgo(5), actor: 'Customer' },
        { status: ORDER_STATUS.ACCEPTED, label: 'Accepted', at: hoursAgo(4.9), actor: 'Seller' },
        { status: ORDER_STATUS.PREPARING, label: 'Preparing', at: hoursAgo(4.7), actor: 'Seller' },
        { status: ORDER_STATUS.PACKED, label: 'Packed', at: hoursAgo(4.3), actor: 'Seller' },
        { status: ORDER_STATUS.READY, label: 'Ready', at: hoursAgo(4), actor: 'Seller' },
        { status: ORDER_STATUS.PICKUP_ASSIGNED, label: 'Pickup Assigned', at: hoursAgo(3.8), actor: 'Seller' },
        { status: ORDER_STATUS.PICKED_UP, label: 'Picked Up', at: hoursAgo(2.5), actor: 'Agent' },
        { status: ORDER_STATUS.OUT_FOR_DELIVERY, label: 'Out for Delivery', at: hoursAgo(2.4), actor: 'Agent' },
        { status: ORDER_STATUS.DELIVERED, label: 'Delivered', at: hoursAgo(1), actor: 'Agent', remarks: 'OTP verified' },
      ]),
      cancellation: null,
      rejection: null,
      returnFlow: null,
      handover: {
        packageId: 'PKG-1036',
        orderId: 'SA-1036',
        otp: '9173',
        qrCode: 'SAATH-SA-1036-PKG',
        sellerSignature: 'Store Mgr',
        deliverySignature: 'Suresh Y',
        timestamp: hoursAgo(2.5),
        gps: { lat: 12.9716, lng: 77.5946 },
        verified: true,
      },
      attachments: [],
      sellerNotes: '',
    },
    {
      id: 'SA-1035',
      invoiceNumber: 'INV-2026-1035',
      customer: {
        id: 'c7',
        name: 'Deepak Mehta',
        phone: '+91 98777 88990',
        email: 'deepak.m@email.com',
        address: '77, Electronic City Phase 1, Bengaluru 560100',
        lat: 12.8399,
        lng: 77.677,
        notes: '',
        blocked: false,
        orderCount: 4,
      },
      items: [{ id: 'p5', name: 'Whole Wheat Flour 5kg', sku: 'FLR-004', qty: 1, price: 280, image: '', gst: 5, discount: 0 }],
      paymentMode: 'debit_card',
      paymentStatus: 'received',
      deliveryMode: 'courier',
      deliveryPartner: 'Delhivery',
      agent: null,
      amount: 320,
      commission: 16,
      deliveryCharge: 40,
      packingCharge: 5,
      platformFee: 5,
      taxes: 15,
      coupon: null,
      discount: 0,
      status: ORDER_STATUS.RETURNED,
      createdAt: hoursAgo(72),
      acceptanceDeadline: hoursAgo(72) + ACCEPTANCE_SLA_MS,
      packingDeadline: hoursAgo(71) + PACKING_SLA_MS,
      pickupDeadline: null,
      deliveryEta: hoursAgo(60),
      pickupTime: hoursAgo(65),
      isExpress: false,
      isPriority: false,
      isLate: false,
      isRepeatCustomer: true,
      timeline: makeTimeline([
        { status: ORDER_STATUS.NEW, label: 'Customer Ordered', at: hoursAgo(72), actor: 'Customer' },
        { status: ORDER_STATUS.DELIVERED, label: 'Delivered', at: hoursAgo(60), actor: 'Agent' },
        { status: ORDER_STATUS.RETURNED, label: 'Returned', at: hoursAgo(24), actor: 'Customer', remarks: 'Damaged packaging' },
      ]),
      cancellation: null,
      rejection: null,
      returnFlow: {
        status: RETURN_STATUS.INSPECTION,
        history: [
          { status: RETURN_STATUS.REQUESTED, at: hoursAgo(30), actor: 'Customer', remarks: 'Damaged packaging' },
          { status: RETURN_STATUS.REVIEW, at: hoursAgo(28), actor: 'Seller' },
          { status: RETURN_STATUS.APPROVED, at: hoursAgo(27), actor: 'Seller' },
          { status: RETURN_STATUS.PICKUP_SCHEDULED, at: hoursAgo(26), actor: 'System' },
          { status: RETURN_STATUS.PRODUCT_RETURNED, at: hoursAgo(25), actor: 'Agent' },
          { status: RETURN_STATUS.INSPECTION, at: hoursAgo(24), actor: 'Seller', remarks: 'Under inspection' },
        ],
      },
      handover: null,
      attachments: [],
      sellerNotes: 'Inspect for resealability',
    },
  ];
}

function loadOrders() {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  const seeded = seedOrders();
  localStorage.setItem(ORDERS_KEY, JSON.stringify(seeded));
  return seeded;
}

function saveOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  return orders;
}

function loadAgents() {
  try {
    const raw = localStorage.getItem(AGENTS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  localStorage.setItem(AGENTS_KEY, JSON.stringify(SEED_AGENTS));
  return SEED_AGENTS;
}

function appendTimeline(order, status, label, actor = 'Seller', remarks = '') {
  return {
    ...order,
    timeline: [
      ...(order.timeline || []),
      {
        id: `tl_${Date.now()}_${status}`,
        status,
        label,
        at: Date.now(),
        actor,
        remarks,
      },
    ],
  };
}

function pctChange(today, yesterday) {
  if (yesterday === 0) return today === 0 ? 0 : 100;
  return Math.round(((today - yesterday) / yesterday) * 100);
}

function countBy(orders, predicate, from, to) {
  return orders.filter((o) => {
    if (!predicate(o)) return false;
    if (from != null && o.createdAt < from) return false;
    if (to != null && o.createdAt >= to) return false;
    return true;
  }).length;
}

export async function getOrderSummary() {
  await delay(400);
  const orders = loadOrders();
  const todayFrom = startOfDay();
  const yFrom = yesterdayStart();
  const yTo = todayFrom;

  const cards = [
    {
      key: 'new',
      label: 'New Orders',
      icon: 'new',
      filterStatus: ORDER_STATUS.NEW,
      color: 'violet',
      tooltip: 'Orders awaiting seller acceptance',
      today: countBy(orders, (o) => o.status === ORDER_STATUS.NEW, todayFrom, null)
        || orders.filter((o) => o.status === ORDER_STATUS.NEW).length,
      yesterday: countBy(orders, (o) => o.status === ORDER_STATUS.NEW, yFrom, yTo) || 1,
    },
    {
      key: 'accepted',
      label: 'Accepted Orders',
      icon: 'accepted',
      filterStatus: ORDER_STATUS.ACCEPTED,
      color: 'blue',
      tooltip: 'Orders accepted and waiting preparation',
      today: orders.filter((o) => o.status === ORDER_STATUS.ACCEPTED).length,
      yesterday: 1,
    },
    {
      key: 'packed',
      label: 'Packed Orders',
      icon: 'packed',
      filterStatus: ORDER_STATUS.PACKED,
      color: 'violet',
      tooltip: 'Orders packed and ready for next stage',
      today: orders.filter((o) => o.status === ORDER_STATUS.PACKED).length,
      yesterday: 1,
    },
    {
      key: 'ready',
      label: 'Ready for Pickup',
      icon: 'ready',
      filterStatus: ORDER_STATUS.READY,
      color: 'orange',
      tooltip: 'Orders ready for delivery agent pickup',
      today: orders.filter((o) => o.status === ORDER_STATUS.READY).length,
      yesterday: 1,
    },
    {
      key: 'out_for_delivery',
      label: 'Out for Delivery',
      icon: 'ofd',
      filterStatus: ORDER_STATUS.OUT_FOR_DELIVERY,
      color: 'blue',
      tooltip: 'Orders currently out for delivery',
      today: orders.filter((o) => o.status === ORDER_STATUS.OUT_FOR_DELIVERY).length,
      yesterday: 1,
    },
    {
      key: 'delivered_today',
      label: 'Delivered Today',
      icon: 'delivered',
      filterStatus: ORDER_STATUS.DELIVERED,
      color: 'green',
      tooltip: 'Successfully delivered orders today',
      today: orders.filter((o) => o.status === ORDER_STATUS.DELIVERED).length,
      yesterday: Math.max(1, orders.filter((o) => o.status === ORDER_STATUS.DELIVERED).length - 1),
    },
    {
      key: 'cancelled',
      label: 'Cancelled',
      icon: 'cancelled',
      filterStatus: ORDER_STATUS.CANCELLED,
      color: 'red',
      tooltip: 'Cancelled orders',
      today: orders.filter((o) => o.status === ORDER_STATUS.CANCELLED).length,
      yesterday: 1,
    },
    {
      key: 'returned',
      label: 'Returned',
      icon: 'returned',
      filterStatus: ORDER_STATUS.RETURNED,
      color: 'violet',
      tooltip: 'Returned orders in process or completed',
      today: orders.filter((o) => o.status === ORDER_STATUS.RETURNED).length,
      yesterday: 1,
    },
    {
      key: 'cod_pending',
      label: 'COD Pending',
      icon: 'cod',
      filterStatus: null,
      filterExtra: { paymentMode: 'cod', paymentStatus: 'pending' },
      color: 'yellow',
      tooltip: 'Cash on delivery amount pending collection',
      today: orders.filter((o) => o.paymentMode === 'cod' && o.paymentStatus === 'pending').length,
      yesterday: 1,
      amountValue: orders
        .filter((o) => o.paymentMode === 'cod' && o.paymentStatus === 'pending')
        .reduce((s, o) => s + o.amount, 0),
    },
    {
      key: 'payment_received',
      label: 'Payment Received',
      icon: 'payment',
      filterStatus: null,
      filterExtra: { paymentStatus: 'received' },
      color: 'blue',
      tooltip: 'Orders with payment successfully received',
      today: orders.filter((o) => o.paymentStatus === 'received').length,
      yesterday: Math.max(1, orders.filter((o) => o.paymentStatus === 'received').length - 1),
      amountValue: orders
        .filter((o) => o.paymentStatus === 'received')
        .reduce((s, o) => s + o.amount, 0),
    },
    {
      key: 'late',
      label: 'Late Orders',
      icon: 'late',
      filterStatus: null,
      filterExtra: { late: true },
      color: 'rose',
      tooltip: 'Orders past acceptance, packing, or delivery SLA',
      today: orders.filter((o) => o.isLate).length,
      yesterday: 1,
    },
  ].map((c) => {
    const changePct = pctChange(c.today, c.yesterday);
    const isMoney = c.key === 'cod_pending' || c.key === 'payment_received';
    return {
      ...c,
      count: isMoney ? c.amountValue : c.today,
      displayValue: isMoney
        ? `₹${Number(c.amountValue || 0).toLocaleString('en-IN')}`
        : c.today,
      subLabel: c.key === 'cod_pending'
        ? `${c.today} Orders`
        : c.key === 'payment_received'
          ? 'Today'
          : undefined,
      changePct,
      trend: c.today >= c.yesterday ? 'up' : 'down',
    };
  });

  return { success: true, data: cards };
}

function matchesDateFilter(order, dateFilter, customRange) {
  if (!dateFilter || dateFilter === 'all') return true;
  const created = order.createdAt;
  const today = startOfDay();
  if (dateFilter === 'today') return created >= today;
  if (dateFilter === 'yesterday') return created >= yesterdayStart() && created < today;
  if (dateFilter === 'last_7') return created >= today - 7 * 86400000;
  if (dateFilter === 'last_30') return created >= today - 30 * 86400000;
  if (dateFilter === 'this_month') {
    const d = new Date();
    d.setDate(1);
    d.setHours(0, 0, 0, 0);
    return created >= d.getTime();
  }
  if (dateFilter === 'last_month') {
    const start = new Date();
    start.setMonth(start.getMonth() - 1, 1);
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setDate(1);
    end.setHours(0, 0, 0, 0);
    return created >= start.getTime() && created < end.getTime();
  }
  if (dateFilter === 'custom' && customRange?.from && customRange?.to) {
    const from = new Date(customRange.from).setHours(0, 0, 0, 0);
    const to = new Date(customRange.to).setHours(23, 59, 59, 999);
    return created >= from && created <= to;
  }
  return true;
}

function matchesSearch(order, q) {
  if (!q) return true;
  const s = q.toLowerCase().trim();
  const hay = [
    order.id,
    order.invoiceNumber,
    order.customer?.name,
    order.customer?.phone,
    ...(order.items || []).flatMap((i) => [i.name, i.sku]),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  return hay.includes(s);
}

export async function getOrders(filters = {}) {
  await delay(350);
  let orders = loadOrders();

  const {
    dateFilter,
    customRange,
    statuses = [],
    paymentModes = [],
    deliveryModes = [],
    other = [],
    search = '',
    sortBy = 'createdAt',
    sortDir = 'desc',
    page = 1,
    pageSize = 10,
  } = filters;

  orders = orders.filter((o) => matchesDateFilter(o, dateFilter, customRange));
  if (statuses.length) orders = orders.filter((o) => statuses.includes(o.status));
  if (paymentModes.length) orders = orders.filter((o) => paymentModes.includes(o.paymentMode));
  if (deliveryModes.length) orders = orders.filter((o) => deliveryModes.includes(o.deliveryMode));
  if (other.includes('high_value')) orders = orders.filter((o) => o.amount >= HIGH_VALUE_THRESHOLD);
  if (other.includes('express')) orders = orders.filter((o) => o.isExpress);
  if (other.includes('late')) orders = orders.filter((o) => o.isLate);
  if (other.includes('priority')) orders = orders.filter((o) => o.isPriority);
  if (other.includes('repeat')) orders = orders.filter((o) => o.isRepeatCustomer);
  if (search) orders = orders.filter((o) => matchesSearch(o, search));

  orders = [...orders].sort((a, b) => {
    const av = a[sortBy] ?? a.createdAt;
    const bv = b[sortBy] ?? b.createdAt;
    if (av < bv) return sortDir === 'asc' ? -1 : 1;
    if (av > bv) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  const total = orders.length;
  const start = (page - 1) * pageSize;
  const data = orders.slice(start, start + pageSize);

  return {
    success: true,
    data,
    meta: { total, page, pageSize, totalPages: Math.max(1, Math.ceil(total / pageSize)) },
  };
}

export async function getOrderById(id) {
  await delay(200);
  const order = loadOrders().find((o) => o.id === id);
  if (!order) return { success: false, error: 'Order not found' };
  return { success: true, data: order };
}

export async function updateOrderStatus(id, nextStatus, meta = {}) {
  await delay(400);
  const orders = loadOrders();
  const idx = orders.findIndex((o) => o.id === id);
  if (idx < 0) return { success: false, error: 'Order not found' };

  const order = orders[idx];
  if (!canTransition(order.status, nextStatus)) {
    return {
      success: false,
      error: `Invalid transition from ${order.status} to ${nextStatus}`,
    };
  }

  let updated = {
    ...order,
    status: nextStatus,
    ...meta.fields,
  };
  updated = appendTimeline(
    updated,
    nextStatus,
    meta.label || nextStatus,
    meta.actor || 'Seller',
    meta.remarks || ''
  );

  if (nextStatus === ORDER_STATUS.ACCEPTED) {
    updated.packingDeadline = Date.now() + PACKING_SLA_MS;
  }
  if (nextStatus === ORDER_STATUS.READY) {
    updated.pickupDeadline = Date.now() + 45 * 60 * 1000;
  }

  orders[idx] = updated;
  saveOrders(orders);
  return { success: true, data: updated };
}

export async function rejectOrder(id, reason, customReason = '') {
  await delay(400);
  const orders = loadOrders();
  const idx = orders.findIndex((o) => o.id === id);
  if (idx < 0) return { success: false, error: 'Order not found' };
  const order = orders[idx];
  if (!canTransition(order.status, ORDER_STATUS.REJECTED)) {
    return { success: false, error: 'Cannot reject this order in current status' };
  }
  let updated = {
    ...order,
    status: ORDER_STATUS.REJECTED,
    rejection: {
      reason,
      customReason,
      at: Date.now(),
      by: 'Seller',
    },
  };
  updated = appendTimeline(updated, ORDER_STATUS.REJECTED, 'Rejected', 'Seller', reason);
  orders[idx] = updated;
  saveOrders(orders);
  return { success: true, data: updated };
}

export async function cancelOrder(id, reason, customReason = '') {
  await delay(400);
  const orders = loadOrders();
  const idx = orders.findIndex((o) => o.id === id);
  if (idx < 0) return { success: false, error: 'Order not found' };
  const order = orders[idx];
  if (!canTransition(order.status, ORDER_STATUS.CANCELLED)) {
    return { success: false, error: 'Cannot cancel this order in current status' };
  }
  const entry = { reason, customReason, at: Date.now(), by: 'Seller' };
  let updated = {
    ...order,
    status: ORDER_STATUS.CANCELLED,
    cancellation: {
      reason,
      customReason,
      cancelledBy: 'Seller',
      at: Date.now(),
      history: [...(order.cancellation?.history || []), entry],
    },
  };
  updated = appendTimeline(updated, ORDER_STATUS.CANCELLED, 'Cancelled', 'Seller', reason);
  orders[idx] = updated;
  saveOrders(orders);
  return { success: true, data: updated };
}

export async function assignDeliveryAgent(orderId, agentId) {
  await delay(450);
  const agents = loadAgents();
  const agent = agents.find((a) => a.id === agentId);
  if (!agent) return { success: false, error: 'Agent not found' };
  if (!agent.available) return { success: false, error: 'Agent unavailable' };

  const orders = loadOrders();
  const idx = orders.findIndex((o) => o.id === orderId);
  if (idx < 0) return { success: false, error: 'Order not found' };
  const order = orders[idx];
  if (!canTransition(order.status, ORDER_STATUS.PICKUP_ASSIGNED)) {
    return { success: false, error: 'Order must be Ready before assigning delivery' };
  }

  let updated = {
    ...order,
    status: ORDER_STATUS.PICKUP_ASSIGNED,
    deliveryPartner: 'Saath Delivery',
    agent: {
      id: agent.id,
      name: agent.name,
      vehicle: agent.vehicle,
      phone: agent.phone,
      rating: agent.rating,
    },
    pickupTime: Date.now() + agent.etaMinutes * 60 * 1000,
  };
  updated = appendTimeline(
    updated,
    ORDER_STATUS.PICKUP_ASSIGNED,
    'Pickup Assigned',
    'Seller',
    `Assigned ${agent.name}`
  );
  orders[idx] = updated;
  saveOrders(orders);
  return { success: true, data: updated };
}

export async function getDeliveryAgents() {
  await delay(300);
  return { success: true, data: loadAgents() };
}

export async function confirmHandover(orderId, handoverData) {
  await delay(500);
  const orders = loadOrders();
  const idx = orders.findIndex((o) => o.id === orderId);
  if (idx < 0) return { success: false, error: 'Order not found' };
  const order = orders[idx];

  const allowedStart = [
    ORDER_STATUS.PICKUP_ASSIGNED,
    ORDER_STATUS.AGENT_ACCEPTED,
    ORDER_STATUS.AGENT_REACHED_STORE,
    ORDER_STATUS.HANDOVER,
  ];
  if (!allowedStart.includes(order.status)) {
    return { success: false, error: 'Order is not in a pickup/handover state' };
  }

  const flowSteps = [
    { status: ORDER_STATUS.AGENT_ACCEPTED, label: 'Agent Accepted Pickup', actor: 'Agent' },
    { status: ORDER_STATUS.AGENT_REACHED_STORE, label: 'Agent Reached Store', actor: 'Agent' },
    { status: ORDER_STATUS.HANDOVER, label: 'Handover Package', actor: 'Seller' },
    { status: ORDER_STATUS.PICKED_UP, label: 'Pickup Completed', actor: 'Agent' },
    { status: ORDER_STATUS.OUT_FOR_DELIVERY, label: 'Out for Delivery', actor: 'Agent' },
  ];

  let updated = {
    ...order,
    handover: { ...handoverData, timestamp: Date.now(), verified: true },
  };

  for (const step of flowSteps) {
    if (updated.status === step.status) continue;
    if (canTransition(updated.status, step.status)) {
      updated = { ...updated, status: step.status };
      updated = appendTimeline(updated, step.status, step.label, step.actor);
    }
  }

  if (updated.status === order.status) {
    return { success: false, error: 'Unable to complete handover from current status' };
  }

  orders[idx] = updated;
  saveOrders(orders);
  return { success: true, data: updated };
}

export async function updateReturnFlow(orderId, nextReturnStatus, remarks = '') {
  await delay(400);
  const orders = loadOrders();
  const idx = orders.findIndex((o) => o.id === orderId);
  if (idx < 0) return { success: false, error: 'Order not found' };
  const order = orders[idx];
  const history = [
    ...(order.returnFlow?.history || []),
    { status: nextReturnStatus, at: Date.now(), actor: 'Seller', remarks },
  ];
  let updated = {
    ...order,
    returnFlow: { status: nextReturnStatus, history },
  };
  if (nextReturnStatus === RETURN_STATUS.REFUND_COMPLETED) {
    updated = {
      ...updated,
      status: ORDER_STATUS.REFUNDED,
      paymentStatus: 'refunded',
    };
    updated = appendTimeline(updated, ORDER_STATUS.REFUNDED, 'Refund Completed', 'Seller', remarks);
  }
  orders[idx] = updated;
  saveOrders(orders);
  return { success: true, data: updated };
}

export async function bulkUpdateOrders(ids, action, payload = {}) {
  await delay(600);
  const results = [];
  for (const id of ids) {
    if (action === 'accept') results.push(await updateOrderStatus(id, ORDER_STATUS.ACCEPTED, { label: 'Accepted' }));
    else if (action === 'reject') results.push(await rejectOrder(id, payload.reason || 'Out of Stock'));
    else if (action === 'cancel') results.push(await cancelOrder(id, payload.reason || 'Seller Requested'));
    else if (action === 'packed') results.push(await updateOrderStatus(id, ORDER_STATUS.PACKED, { label: 'Packed' }));
    else if (action === 'ready') results.push(await updateOrderStatus(id, ORDER_STATUS.READY, { label: 'Ready for Pickup' }));
    else if (action === 'assign' && payload.agentId) results.push(await assignDeliveryAgent(id, payload.agentId));
    else results.push({ success: false, error: 'Unknown action', id });
  }
  return { success: true, data: results };
}

export async function saveOrderNotes(orderId, notes) {
  await delay(200);
  const orders = loadOrders();
  const idx = orders.findIndex((o) => o.id === orderId);
  if (idx < 0) return { success: false, error: 'Order not found' };
  orders[idx] = { ...orders[idx], sellerNotes: notes };
  saveOrders(orders);
  return { success: true, data: orders[idx] };
}

export async function blockCustomer(customerId, blocked = true) {
  await delay(250);
  const orders = loadOrders().map((o) =>
    o.customer?.id === customerId
      ? { ...o, customer: { ...o.customer, blocked } }
      : o
  );
  saveOrders(orders);
  return { success: true };
}

export async function getOrderAnalytics() {
  await delay(400);
  const orders = loadOrders();
  const delivered = orders.filter((o) => o.status === ORDER_STATUS.DELIVERED || o.timeline?.some((t) => t.status === ORDER_STATUS.DELIVERED));
  const cancelled = orders.filter((o) => o.status === ORDER_STATUS.CANCELLED);
  const rejected = orders.filter((o) => o.status === ORDER_STATUS.REJECTED);
  const late = orders.filter((o) => o.isLate);
  const revenue = delivered.reduce((s, o) => s + o.amount, 0);
  const commission = delivered.reduce((s, o) => s + o.commission, 0);

  const daily = Array.from({ length: 7 }, (_, i) => {
    const day = startOfDay() - (6 - i) * 86400000;
    const next = day + 86400000;
    const dayOrders = orders.filter((o) => o.createdAt >= day && o.createdAt < next);
    return {
      label: new Date(day).toLocaleDateString('en-IN', { weekday: 'short' }),
      orders: dayOrders.length,
      revenue: dayOrders.reduce((s, o) => s + (o.status === ORDER_STATUS.DELIVERED ? o.amount : 0), 0),
    };
  });

  return {
    success: true,
    data: {
      averageDeliveryTimeMin: 42,
      averagePackingTimeMin: 18,
      acceptanceRate: Math.round(((orders.length - rejected.length) / Math.max(orders.length, 1)) * 100),
      cancellationRate: Math.round((cancelled.length / Math.max(orders.length, 1)) * 100),
      rejectionRate: Math.round((rejected.length / Math.max(orders.length, 1)) * 100),
      lateOrders: late.length,
      repeatCustomers: new Set(orders.filter((o) => o.isRepeatCustomer).map((o) => o.customer.id)).size,
      revenue,
      commission,
      netEarnings: revenue - commission,
      daily,
      weekly: daily,
      monthly: [
        { label: 'Week 1', revenue: revenue * 0.2, orders: 12 },
        { label: 'Week 2', revenue: revenue * 0.25, orders: 15 },
        { label: 'Week 3', revenue: revenue * 0.3, orders: 18 },
        { label: 'Week 4', revenue: revenue * 0.25, orders: 14 },
      ],
    },
  };
}

export async function exportOrders(format = 'csv', filters = {}) {
  await delay(300);
  const { data } = await getOrders({ ...filters, page: 1, pageSize: 1000 });
  const headers = ['Order ID', 'Customer', 'Phone', 'Amount', 'Status', 'Payment', 'Delivery', 'Created'];
  const rows = data.map((o) => [
    o.id,
    o.customer.name,
    o.customer.phone,
    o.amount,
    o.status,
    o.paymentMode,
    o.deliveryMode,
    new Date(o.createdAt).toISOString(),
  ]);
  const content =
    format === 'csv'
      ? [headers.join(','), ...rows.map((r) => r.map((c) => `"${c}"`).join(','))].join('\n')
      : JSON.stringify({ headers, rows }, null, 2);
  return { success: true, data: { content, filename: `orders-export.${format === 'csv' ? 'csv' : 'json'}`, mime: format === 'csv' ? 'text/csv' : 'application/json' } };
}

export function resetOrdersDemoData() {
  localStorage.removeItem(ORDERS_KEY);
  localStorage.removeItem(AGENTS_KEY);
  return loadOrders();
}
