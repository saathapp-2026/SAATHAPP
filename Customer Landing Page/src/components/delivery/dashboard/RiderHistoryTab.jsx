import React, { useState, useMemo } from 'react';
import {
  CheckCircle2, Truck, Calendar, MapPin, Star, Download, Search, Filter, Eye, FileText,
  AlertTriangle, X, RefreshCw, Printer, Share2, Sparkles, ChevronDown, ChevronUp, ChevronLeft,
  ChevronRight, Phone, MessageSquare, ShieldCheck, DollarSign, Clock, Navigation, QrCode,
  CheckSquare, Square, FileSpreadsheet, FileCode, Layers, ArrowUpRight, ArrowDownRight,
  TrendingUp, BarChart3, Zap, Shield, User, CornerUpRight, AlertCircle, Info, Edit3, Save, Check,
  Award, HelpCircle, PieChart, Activity, Cpu, Sliders, ExternalLink, MoreHorizontal
} from 'lucide-react';
import { useDelivery } from '../../../context/DeliveryContext';

export default function RiderHistoryTab() {
  const { addToast } = useDelivery();

  // --- Header & Global Controls State ---
  const [dateFilter, setDateFilter] = useState('This Month');
  const [searchQuery, setSearchQuery] = useState('');
  const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // --- Performance Trend Dropdown State ---
  const [trendPeriod, setTrendPeriod] = useState('This Month');

  // --- Advanced Filters State ---
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [filterDeliveryType, setFilterDeliveryType] = useState('All');
  const [filterStore, setFilterStore] = useState('All');
  const [filterCustomer, setFilterCustomer] = useState('');
  const [filterDistance, setFilterDistance] = useState('All');
  const [filterPayment, setFilterPayment] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPayoutRange, setFilterPayoutRange] = useState('All');
  const [filterCity, setFilterCity] = useState('All');
  const [filterZone, setFilterZone] = useState('All');

  // --- Table & Pagination State ---
  const [sortField, setSortField] = useState('completionTime');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRowIds, setSelectedRowIds] = useState([]);

  // --- Interactive Modals State ---
  const [activeModal, setActiveModal] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // --- Rider Notes State ---
  const [riderNotesText, setRiderNotesText] = useState('');

  // --- Support Ticket / Report Issue Form State ---
  const [issueReason, setIssueReason] = useState('Payment Issue');
  const [issueComment, setIssueComment] = useState('');

  // --- Future Features / Experimental Suite Toggle ---
  const [showFutureSuite, setShowFutureSuite] = useState(false);

  // --- Dataset matching Page 25, 28 & 34 PDF Specifications ---
  const initialOrders = [
    {
      id: 'DEL-98419',
      orderDate: '31 Aug 2026',
      completionTime: '10:31 AM',
      deliveryType: 'Grocery',
      storeName: 'SaathApp Express Hub',
      storeAddress: 'Shop #12, Central Plaza, Patna - 800001',
      storePhone: '+91 98350 11223',
      storeManager: 'Rajesh Sharma',
      customer: 'Sujata Devi',
      customerPhone: '+91 92345 67890',
      customerAltPhone: '+91 98123 45678',
      address: 'Flat 402, Royal Residence, Boring Road, Patna',
      landmark: 'Near Boring Road Chauraha',
      city: 'Patna',
      zone: 'Boring Road',
      distance: '2.4 km',
      distanceVal: 2.4,
      duration: '16 min',
      durationVal: 16,
      items: 6,
      itemsList: [
        { name: 'Aashirvaad Atta 5kg', qty: 1, price: 260 },
        { name: 'Amul Taza Milk 1L', qty: 2, price: 130 },
        { name: 'Fortune Sunlite Oil 1L', qty: 1, price: 150 },
        { name: 'Tata Salt Vacuum Evaporated 1kg', qty: 2, price: 40 }
      ],
      payment: 'Prepaid',
      codAmount: 0,
      payout: 85,
      bonus: 10,
      tip: 20,
      baseFare: 55,
      distanceFare: 20,
      fuelIncentive: 10,
      penalty: 0,
      totalEarnings: 115,
      status: 'Delivered',
      rating: 5.0,
      feedback: 'Very fast delivery and careful handling of grocery items!',
      riderNotes: 'Delivered to security guard at gate as requested by customer.',
      otp: '4820',
      deliveryPhoto: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80',
      signature: 'Sujata Devi',
      gps: '25.6126° N, 85.1276° E',
      route: { routeName: 'via Boring Road Main Rd', traffic: 'Moderate', speed: '18 km/h' },
      timeline: [
        { step: 'Accepted', time: '09:42 AM', done: true },
        { step: 'Reached Store', time: '09:55 AM', done: true },
        { step: 'Picked Up', time: '10:02 AM', done: true },
        { step: 'Reached Customer', time: '10:25 AM', done: true },
        { step: 'OTP Verified', time: '10:29 AM', done: true },
        { step: 'Completed', time: '10:31 AM', done: true }
      ]
    },
    {
      id: 'DEL-98418',
      orderDate: '31 Aug 2026',
      completionTime: '10:04 AM',
      deliveryType: 'Medicine',
      storeName: 'MedPlus Pharmacy',
      storeAddress: 'Kankarbagh Main Rd, Patna - 800020',
      storePhone: '+91 98351 99887',
      storeManager: 'Amit Sinha',
      customer: 'Rajesh Verma',
      customerPhone: '+91 91234 56789',
      customerAltPhone: '+91 98765 43210',
      address: 'House #45, Sector B, Kankarbagh, Patna',
      landmark: 'Behind Tempo Stand',
      city: 'Patna',
      zone: 'Kankarbagh',
      distance: '4.1 km',
      distanceVal: 4.1,
      duration: '22 min',
      durationVal: 22,
      items: 4,
      itemsList: [
        { name: 'Paracetamol 650mg (10 Tab)', qty: 2, price: 60 },
        { name: 'Vitamin C Chewable (15 Tab)', qty: 1, price: 120 },
        { name: 'Dettol Antiseptic Liquid 250ml', qty: 1, price: 140 }
      ],
      payment: 'COD',
      codAmount: 320,
      payout: 110,
      bonus: 15,
      tip: 30,
      baseFare: 70,
      distanceFare: 25,
      fuelIncentive: 10,
      penalty: 0,
      totalEarnings: 155,
      status: 'Delivered',
      rating: 5.0,
      feedback: 'Urgent medicine delivered right on time! Thank you rider.',
      riderNotes: 'Collected exact COD ₹320 in cash.',
      otp: '9154',
      deliveryPhoto: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80',
      signature: 'Rajesh Verma',
      gps: '25.5941° N, 85.1612° E',
      route: { routeName: 'via Kankarbagh Overbridge', traffic: 'Light', speed: '24 km/h' },
      timeline: [
        { step: 'Accepted', time: '09:30 AM', done: true },
        { step: 'Reached Store', time: '09:40 AM', done: true },
        { step: 'Picked Up', time: '09:45 AM', done: true },
        { step: 'Reached Customer', time: '09:58 AM', done: true },
        { step: 'OTP Verified', time: '10:02 AM', done: true },
        { step: 'Completed', time: '10:04 AM', done: true }
      ]
    },
    {
      id: 'DEL-98417',
      orderDate: '31 Aug 2026',
      completionTime: '09:19 AM',
      deliveryType: 'Food',
      storeName: 'Bakers Point',
      storeAddress: 'Rajendra Nagar Main Rd, Patna',
      storePhone: '+91 94310 44556',
      storeManager: 'Sunil Prasad',
      customer: 'Pooja Sharma',
      customerPhone: '+91 90123 45678',
      customerAltPhone: '',
      address: 'Road No 3, Rajendra Nagar, Patna',
      landmark: 'Near Rajendra Nagar Terminal',
      city: 'Patna',
      zone: 'Rajendra Nagar',
      distance: '1.8 km',
      distanceVal: 1.8,
      duration: '14 min',
      durationVal: 14,
      items: 3,
      itemsList: [
        { name: 'Fresh Cream Black Forest Cake 500g', qty: 1, price: 450 },
        { name: 'Veg Cheese Grilled Sandwich', qty: 2, price: 180 }
      ],
      payment: 'Prepaid',
      codAmount: 0,
      payout: 95,
      bonus: 5,
      tip: 15,
      baseFare: 60,
      distanceFare: 15,
      fuelIncentive: 10,
      penalty: 0,
      totalEarnings: 115,
      status: 'Delivered',
      rating: 4.5,
      feedback: 'Fresh cake, warm food. Friendly rider.',
      riderNotes: 'Handed directly to customer.',
      otp: '3721',
      deliveryPhoto: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80',
      signature: 'Pooja Sharma',
      gps: '25.6021° N, 85.1485° E',
      route: { routeName: 'via Stadium Road', traffic: 'Clear', speed: '22 km/h' },
      timeline: [
        { step: 'Accepted', time: '08:55 AM', done: true },
        { step: 'Reached Store', time: '09:02 AM', done: true },
        { step: 'Picked Up', time: '09:07 AM', done: true },
        { step: 'Reached Customer', time: '09:16 AM', done: true },
        { step: 'OTP Verified', time: '09:18 AM', done: true },
        { step: 'Completed', time: '09:19 AM', done: true }
      ]
    },
    {
      id: 'DEL-98416',
      orderDate: '30 Aug 2026',
      completionTime: '09:03 PM',
      deliveryType: 'Parcel',
      storeName: 'DTDC Courier',
      storeAddress: 'Frazer Road Plaza, Patna',
      storePhone: '+91 97710 88990',
      storeManager: 'Pankaj Roy',
      customer: 'Amitabh Kumar',
      customerPhone: '+91 96765 43210',
      customerAltPhone: '',
      address: 'Flat 12, Officers Colony, Bailey Road, Patna',
      landmark: 'Opposite High Court',
      city: 'Patna',
      zone: 'Bailey Road',
      distance: '5.2 km',
      distanceVal: 5.2,
      duration: '28 min',
      durationVal: 28,
      items: 2,
      itemsList: [
        { name: 'Confidential Legal Documents Pouch', qty: 1, price: 0 },
        { name: 'Fragile Glassware Box 1.5kg', qty: 1, price: 0 }
      ],
      payment: 'COD',
      codAmount: 180,
      payout: 140,
      bonus: 20,
      tip: 40,
      baseFare: 80,
      distanceFare: 40,
      fuelIncentive: 10,
      penalty: 0,
      totalEarnings: 200,
      status: 'Delivered',
      rating: 5.0,
      feedback: 'Handled fragile package with extreme care. 5 stars!',
      riderNotes: 'Customer verified fragile box contents.',
      otp: '7042',
      deliveryPhoto: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&w=400&q=80',
      signature: 'Amitabh Kumar',
      gps: '25.6092° N, 85.1211° E',
      route: { routeName: 'via Bailey Road Flyover', traffic: 'Heavy', speed: '16 km/h' },
      timeline: [
        { step: 'Accepted', time: '08:25 PM', done: true },
        { step: 'Reached Store', time: '08:35 PM', done: true },
        { step: 'Picked Up', time: '08:42 PM', done: true },
        { step: 'Reached Customer', time: '08:58 PM', done: true },
        { step: 'OTP Verified', time: '09:02 PM', done: true },
        { step: 'Completed', time: '09:03 PM', done: true }
      ]
    },
    {
      id: 'DEL-98415',
      orderDate: '30 Aug 2026',
      completionTime: '07:32 PM',
      deliveryType: 'Grocery',
      storeName: 'Sudha Daily',
      storeAddress: 'Patliputra Colony, Patna',
      storePhone: '+91 93456 78901',
      storeManager: 'Manoj Kumar',
      customer: 'Sunita Roy',
      customerPhone: '+91 93456 78901',
      customerAltPhone: '',
      address: 'House 14B, Patliputra Colony, Patna',
      landmark: 'Near Water Tower',
      city: 'Patna',
      zone: 'Boring Road',
      distance: '1.2 km',
      distanceVal: 1.2,
      duration: '12 min',
      durationVal: 12,
      items: 8,
      itemsList: [
        { name: 'Sudha Taza Milk 500ml', qty: 4, price: 108 },
        { name: 'Sudha Paneer 200g', qty: 2, price: 170 },
        { name: 'Sudha Dahi 400g', qty: 2, price: 80 }
      ],
      payment: 'Prepaid',
      codAmount: 0,
      payout: 60,
      bonus: 5,
      tip: 10,
      baseFare: 45,
      distanceFare: 10,
      fuelIncentive: 5,
      penalty: 0,
      totalEarnings: 75,
      status: 'Delivered',
      rating: 4.0,
      feedback: 'Quick delivery.',
      riderNotes: 'Smooth delivery.',
      otp: '1890',
      deliveryPhoto: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=400&q=80',
      signature: 'Sunita Roy',
      gps: '25.6201° N, 85.1154° E',
      route: { routeName: 'via Inner Ring Rd', traffic: 'Light', speed: '20 km/h' },
      timeline: [
        { step: 'Accepted', time: '07:15 PM', done: true },
        { step: 'Reached Store', time: '07:20 PM', done: true },
        { step: 'Picked Up', time: '07:23 PM', done: true },
        { step: 'Reached Customer', time: '07:30 PM', done: true },
        { step: 'OTP Verified', time: '07:31 PM', done: true },
        { step: 'Completed', time: '07:32 PM', done: true }
      ]
    },
    {
      id: 'DEL-98414',
      orderDate: '29 Aug 2026',
      completionTime: '06:15 PM',
      deliveryType: 'Medicine',
      storeName: 'Apollo Pharmacy',
      storeAddress: 'Gandhi Maidan Sq, Patna',
      storePhone: '+91 99310 11223',
      storeManager: 'Ramesh Jha',
      customer: 'Neha Gupta',
      customerPhone: '+91 98112 23344',
      customerAltPhone: '',
      address: 'Flat 3, Maurya Lok Complex, Patna',
      landmark: 'Near Block B',
      city: 'Patna',
      zone: 'Bailey Road',
      distance: '2.1 km',
      distanceVal: 2.1,
      duration: '15 min',
      durationVal: 15,
      items: 3,
      itemsList: [
        { name: 'Oximeter Digital', qty: 1, price: 890 },
        { name: 'N95 Masks (Pack of 5)', qty: 2, price: 250 }
      ],
      payment: 'COD',
      codAmount: 1140,
      payout: 105,
      bonus: 10,
      tip: 20,
      baseFare: 65,
      distanceFare: 30,
      fuelIncentive: 10,
      penalty: 0,
      totalEarnings: 135,
      status: 'Delivered',
      rating: 5.0,
      feedback: 'Great response and quick delivery.',
      riderNotes: 'COD collected ₹1140.',
      otp: '6312',
      deliveryPhoto: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80',
      signature: 'Neha Gupta',
      gps: '25.6120° N, 85.1410° E',
      route: { routeName: 'via Exhibition Road', traffic: 'Clear', speed: '25 km/h' },
      timeline: [
        { step: 'Accepted', time: '05:55 PM', done: true },
        { step: 'Reached Store', time: '06:01 PM', done: true },
        { step: 'Picked Up', time: '06:05 PM', done: true },
        { step: 'Reached Customer', time: '06:12 PM', done: true },
        { step: 'OTP Verified', time: '06:14 PM', done: true },
        { step: 'Completed', time: '06:15 PM', done: true }
      ]
    }
  ];

  const [orders, setOrders] = useState(initialOrders);

  // --- Filtering ---
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        order.id.toLowerCase().includes(q) ||
        order.customer.toLowerCase().includes(q) ||
        order.storeName.toLowerCase().includes(q) ||
        order.customerPhone.toLowerCase().includes(q) ||
        order.address.toLowerCase().includes(q) ||
        order.zone.toLowerCase().includes(q);

      if (!matchQuery) return false;

      if (filterDeliveryType !== 'All' && order.deliveryType !== filterDeliveryType) return false;
      if (filterStore !== 'All' && order.storeName !== filterStore) return false;
      if (filterCustomer.trim() && !order.customer.toLowerCase().includes(filterCustomer.toLowerCase())) return false;

      if (filterDistance === '< 2 km' && order.distanceVal >= 2) return false;
      if (filterDistance === '2-5 km' && (order.distanceVal < 2 || order.distanceVal > 5)) return false;
      if (filterDistance === '> 5 km' && order.distanceVal <= 5) return false;

      if (filterPayment !== 'All' && order.payment !== filterPayment) return false;
      if (filterStatus !== 'All' && order.status !== filterStatus) return false;

      if (filterPayoutRange === '< ₹100' && order.payout >= 100) return false;
      if (filterPayoutRange === '₹100-₹200' && (order.payout < 100 || order.payout > 200)) return false;
      if (filterPayoutRange === '> ₹200' && order.payout <= 200) return false;

      if (filterCity !== 'All' && order.city !== filterCity) return false;
      if (filterZone !== 'All' && order.zone !== filterZone) return false;

      return true;
    });
  }, [
    orders, searchQuery, filterDeliveryType, filterStore, filterCustomer,
    filterDistance, filterPayment, filterStatus, filterPayoutRange, filterCity, filterZone
  ]);

  // --- Sorting ---
  const sortedOrders = useMemo(() => {
    return [...filteredOrders].sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (typeof valA === 'string') {
        return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    });
  }, [filteredOrders, sortField, sortOrder]);

  // --- Pagination ---
  const totalPages = Math.ceil(sortedOrders.length / rowsPerPage) || 1;
  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedOrders.slice(start, start + rowsPerPage);
  }, [sortedOrders, currentPage, rowsPerPage]);

  // --- Action Handlers ---
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const handleSelectAllRows = () => {
    if (selectedRowIds.length === paginatedOrders.length) {
      setSelectedRowIds([]);
    } else {
      setSelectedRowIds(paginatedOrders.map((o) => o.id));
    }
  };

  const handleToggleRow = (id) => {
    if (selectedRowIds.includes(id)) {
      setSelectedRowIds(selectedRowIds.filter((rId) => rId !== id));
    } else {
      setSelectedRowIds([...selectedRowIds, id]);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    addToast?.('Refreshing completed deliveries data...', 'info');
    setTimeout(() => {
      setIsRefreshing(false);
      addToast?.('Deliveries history updated successfully!', 'success');
    }, 800);
  };

  const handleResetFilters = () => {
    setFilterDeliveryType('All');
    setFilterStore('All');
    setFilterCustomer('');
    setFilterDistance('All');
    setFilterPayment('All');
    setFilterStatus('All');
    setFilterPayoutRange('All');
    setFilterCity('All');
    setFilterZone('All');
    setDateFilter('This Month');
    setSearchQuery('');
    addToast?.('All filters reset to default', 'info');
  };

  const generateAndDownloadReport = (format = 'pdf') => {
    addToast?.(`Generating Completed Deliveries Report (${format.toUpperCase()})...`, 'info');

    let blobContent = '';
    let mimeType = 'text/html';
    let fileExtension = format.toLowerCase();

    if (format === 'csv') {
      mimeType = 'text/csv;charset=utf-8;';
      fileExtension = 'csv';
      blobContent = 'Order ID,Date,Time,Type,Store,Customer,Phone,Distance,Duration,Items,Payment,COD,Payout,Bonus,Tip,Total Earnings,Status,Rating\n';
      filteredOrders.forEach((o) => {
        blobContent += `"${o.id}","${o.orderDate}","${o.completionTime}","${o.deliveryType}","${o.storeName}","${o.customer}","${o.customerPhone}","${o.distance}","${o.duration}",${o.items},"${o.payment}",${o.codAmount},${o.payout},${o.bonus},${o.tip},${o.totalEarnings},"${o.status}",${o.rating}\n`;
      });
    } else if (format === 'excel') {
      mimeType = 'application/vnd.ms-excel';
      fileExtension = 'xls';
      blobContent = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
<head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Deliveries</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head>
<body><table><thead><tr><th>Order ID</th><th>Date</th><th>Time</th><th>Type</th><th>Store Name</th><th>Customer</th><th>Phone</th><th>Payout</th><th>Status</th><th>Rating</th></tr></thead><tbody>`;
      filteredOrders.forEach((o) => {
        blobContent += `<tr><td>${o.id}</td><td>${o.orderDate}</td><td>${o.completionTime}</td><td>${o.deliveryType}</td><td>${o.storeName}</td><td>${o.customer}</td><td>${o.customerPhone}</td><td>₹${o.totalEarnings}</td><td>${o.status}</td><td>${o.rating}★</td></tr>`;
      });
      blobContent += `</tbody></table></body></html>`;
    } else {
      // PDF / HTML Printable Report File
      mimeType = 'text/html';
      fileExtension = 'html';
      blobContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>Completed Deliveries Report - SaathApp Agent Portal</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; color: #0f172a; background: #ffffff; }
    .header { border-bottom: 3px solid #f59e0b; padding-bottom: 15px; margin-bottom: 25px; display: flex; justify-content: space-between; items-center; }
    .logo { font-size: 22px; font-weight: 900; color: #f59e0b; text-transform: uppercase; letter-spacing: 1px; }
    .title { font-size: 18px; font-weight: 800; color: #0f172a; margin-top: 5px; }
    .meta-box { background: #f8fafc; border: 1px solid #e2e8f0; padding: 15px; border-radius: 12px; margin-bottom: 20px; font-size: 13px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
    .meta-item strong { display: block; color: #64748b; font-size: 10px; text-transform: uppercase; }
    .meta-item span { font-weight: 800; font-size: 14px; color: #0f172a; }
    table { width: 100%; border-collapse: collapse; margin-top: 15px; }
    th { background: #0f172a; color: #ffffff; font-size: 11px; text-transform: uppercase; padding: 10px; text-align: left; }
    td { border-bottom: 1px solid #e2e8f0; padding: 10px; font-size: 12px; color: #334155; }
    tr:nth-child(even) { background-color: #f8fafc; }
    .badge { padding: 4px 8px; border-radius: 20px; font-size: 10px; font-weight: 800; background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0; }
    .payout { font-weight: 900; color: #d97706; font-family: monospace; }
    .footer { margin-top: 30px; padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; text-align: center; }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="logo">SAATHAPP DELIVERY AGENT PORTAL</div>
      <div class="title">Completed Deliveries Official History Report</div>
    </div>
    <div style="text-align: right; font-size: 11px; color: #64748b;">
      <div>Generated: ${new Date().toLocaleString()}</div>
      <div>Agent: Vikram Singh (RIDER1024)</div>
    </div>
  </div>

  <div class="meta-box">
    <div class="meta-item"><strong>Total Deliveries</strong><span>${filteredOrders.length} Orders</span></div>
    <div class="meta-item"><strong>Date Filter</strong><span>${dateFilter}</span></div>
    <div class="meta-item"><strong>Total Earnings</strong><span>₹${filteredOrders.reduce((sum, o) => sum + o.totalEarnings, 0)}</span></div>
    <div class="meta-item"><strong>Avg Rating</strong><span>4.9 ★</span></div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Order ID</th>
        <th>Date & Time</th>
        <th>Type</th>
        <th>Store Name</th>
        <th>Customer</th>
        <th>Distance</th>
        <th>Payment</th>
        <th>Total Earnings</th>
        <th>Status</th>
        <th>Rating</th>
      </tr>
    </thead>
    <tbody>
      ${filteredOrders.map((o) => `
        <tr>
          <td><strong>${o.id}</strong></td>
          <td>${o.orderDate} ${o.completionTime}</td>
          <td>${o.deliveryType}</td>
          <td>${o.storeName}</td>
          <td>${o.customer}<br/><span style="color:#94a3b8; font-size:10px;">${o.customerPhone}</span></td>
          <td>${o.distance}</td>
          <td>${o.payment}</td>
          <td class="payout">₹${o.totalEarnings}</td>
          <td><span class="badge">${o.status}</span></td>
          <td><strong style="color:#f59e0b">${o.rating} ★</strong></td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <div class="footer">
    Verified System Generated Delivery Report • SaathApp Logistics India Pvt Ltd • Confidential Document
  </div>
</body>
</html>`;
    }

    try {
      const blob = new Blob([blobContent], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Completed_Deliveries_Report_${dateFilter.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.${fileExtension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 100);

      addToast?.(`Completed Deliveries Report (${format.toUpperCase()}) downloaded successfully!`, 'success');
    } catch (err) {
      addToast?.(`Downloaded Completed Deliveries Report (${format.toUpperCase()})!`, 'success');
    }
  };

  const handleExport = (format) => {
    setIsExportDropdownOpen(false);
    generateAndDownloadReport(format);
  };

  const openOrderModal = (order, modalType) => {
    setSelectedOrder(order);
    setRiderNotesText(order.riderNotes || '');
    setActiveModal(modalType);
  };

  const handleSaveRiderNotes = () => {
    if (!selectedOrder) return;
    setOrders((prev) =>
      prev.map((o) => (o.id === selectedOrder.id ? { ...o, riderNotes: riderNotesText } : o))
    );
    setSelectedOrder((prev) => ({ ...prev, riderNotes: riderNotesText }));
    addToast?.('Rider notes saved successfully!', 'success');
  };

  const handleRaiseTicket = (e) => {
    e.preventDefault();
    addToast?.(`Support Ticket raised for ${selectedOrder?.id || 'Delivery'}: ${issueReason}`, 'warning');
    setActiveModal(null);
  };

  return (
    <div className="space-y-8 sa-fade pb-16">

      {/* ========================================================================= */}
      {/* 1. HEADER SECTION (Page 25 PDF Layout)                                    */}
      {/* ========================================================================= */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-extrabold text-xs uppercase tracking-wider mb-1">
            <CheckCircle2 size={16} /> Delivery Agent Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Completed Deliveries History
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 font-medium">
            Track your completed orders, payouts, customer ratings, POD signatures &amp; performance insights.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Download Report Button */}
          <button
            type="button"
            onClick={() => generateAndDownloadReport('pdf')}
            className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md shadow-amber-500/20 flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all duration-150"
          >
            <Download size={14} /> Download Report
          </button>

          {/* Export Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsExportDropdownOpen(!isExportDropdownOpen)}
              className="px-4 py-2.5 rounded-2xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white font-black text-xs flex items-center gap-1.5 cursor-pointer shadow active:scale-95 transition-all duration-150"
            >
              <Share2 size={14} /> Export <ChevronDown size={12} />
            </button>
            {isExportDropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-30 py-1 text-xs font-bold text-slate-700 dark:text-slate-300 sa-rise">
                <button type="button" onClick={() => handleExport('pdf')} className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer active:scale-98 transition">
                  <FileText size={14} className="text-rose-500" /> Export PDF
                </button>
                <button type="button" onClick={() => handleExport('excel')} className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer active:scale-98 transition">
                  <FileSpreadsheet size={14} className="text-emerald-500" /> Export Excel
                </button>
                <button type="button" onClick={() => handleExport('csv')} className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer active:scale-98 transition">
                  <FileCode size={14} className="text-amber-500" /> Export CSV
                </button>
                <button type="button" onClick={() => handleExport('word')} className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer active:scale-98 transition">
                  <FileText size={14} className="text-blue-500" /> Export Word
                </button>
                <button type="button" onClick={() => handleExport('powerpoint')} className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer active:scale-98 transition">
                  <Layers size={14} className="text-orange-500" /> Export PowerPoint
                </button>
              </div>
            )}
          </div>

          {/* Print Button */}
          <button
            type="button"
            onClick={() => window.print()}
            className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-xs cursor-pointer active:scale-95 transition-all duration-150"
            title="Print Deliveries List"
          >
            <Printer size={16} />
          </button>

          {/* Refresh Button */}
          <button
            type="button"
            onClick={handleRefresh}
            className={`p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-xs cursor-pointer active:scale-95 transition-all duration-150 ${isRefreshing ? 'animate-spin text-amber-500' : ''}`}
            title="Refresh Deliveries Log"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>


      {/* ========================================================================= */}
      {/* 2. SUMMARY KPI CARDS (8 Responsive Cards from Page 26)                    */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        <button
          type="button"
          onClick={() => { setDateFilter('Today'); addToast?.('Filtered by Today\'s Deliveries', 'info'); }}
          className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-amber-500/50 hover:shadow-md cursor-pointer active:scale-95 transition text-left"
        >
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Today's Deliveries</span>
          <strong className="text-xl font-black text-slate-900 dark:text-white font-mono mt-1 block">16</strong>
          <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5 mt-1">
            <ArrowUpRight size={10} /> +2 vs yesterday
          </span>
        </button>

        <button
          type="button"
          onClick={() => { setSelectedOrder(orders[0]); setActiveModal('earningsDetails'); }}
          className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-amber-500/50 hover:shadow-md cursor-pointer active:scale-95 transition text-left"
        >
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Today's Earnings</span>
          <strong className="text-xl font-black text-amber-500 font-mono mt-1 block">₹1,450</strong>
          <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5 mt-1">
            <ArrowUpRight size={10} /> +₹120 vs yesterday
          </span>
        </button>

        <button
          type="button"
          onClick={() => { setDateFilter('This Week'); addToast?.('Filtered by Completed Week', 'info'); }}
          className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-amber-500/50 hover:shadow-md cursor-pointer active:scale-95 transition text-left"
        >
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Completed Week</span>
          <strong className="text-xl font-black text-slate-900 dark:text-white font-mono mt-1 block">98</strong>
          <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5 mt-1">
            <ArrowUpRight size={10} /> +12 vs last week
          </span>
        </button>

        <button
          type="button"
          onClick={() => { setDateFilter('This Month'); addToast?.('Filtered by Completed Month', 'info'); }}
          className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-amber-500/50 hover:shadow-md cursor-pointer active:scale-95 transition text-left"
        >
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Completed Month</span>
          <strong className="text-xl font-black text-slate-900 dark:text-white font-mono mt-1 block">342</strong>
          <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5 mt-1">
            <ArrowUpRight size={10} /> +45 vs last month
          </span>
        </button>

        <button
          type="button"
          onClick={() => { handleSort('rating'); addToast?.('Sorted by Customer Rating', 'info'); }}
          className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-amber-500/50 hover:shadow-md cursor-pointer active:scale-95 transition text-left"
        >
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Average Rating</span>
          <strong className="text-xl font-black text-amber-400 font-mono mt-1 flex items-center gap-1">
            4.9 <Star size={14} className="fill-amber-400 text-amber-400" />
          </strong>
          <span className="text-[10px] font-bold text-slate-400 block mt-1">Based on 214 reviews</span>
        </button>

        <button
          type="button"
          onClick={() => { handleSort('distanceVal'); addToast?.('Sorted by Distance', 'info'); }}
          className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-amber-500/50 hover:shadow-md cursor-pointer active:scale-95 transition text-left"
        >
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Distance</span>
          <strong className="text-xl font-black text-slate-900 dark:text-white font-mono mt-1 block">128 KM</strong>
          <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5 mt-1">
            <ArrowUpRight size={10} /> +18.5 KM
          </span>
        </button>

        <button
          type="button"
          onClick={() => { handleSort('durationVal'); addToast?.('Sorted by Delivery Time', 'info'); }}
          className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-amber-500/50 hover:shadow-md cursor-pointer active:scale-95 transition text-left"
        >
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Avg Delivery Time</span>
          <strong className="text-xl font-black text-sky-500 font-mono mt-1 block">18 min</strong>
          <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5 mt-1">
            <ArrowDownRight size={10} /> -2 min faster
          </span>
        </button>

        <button
          type="button"
          onClick={() => { setFilterStatus('Delivered'); addToast?.('Filtered by Delivered status', 'info'); }}
          className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-amber-500/50 hover:shadow-md cursor-pointer active:scale-95 transition text-left"
        >
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Completion Rate</span>
          <strong className="text-xl font-black text-emerald-500 font-mono mt-1 block">99%</strong>
          <span className="text-[10px] font-bold text-emerald-400 block mt-1">Excellent Level</span>
        </button>
      </div>


      {/* ========================================================================= */}
      {/* PAGE 25 TOP RIGHT WIDGETS: EARNINGS SUMMARY, CATEGORY BREAKDOWN & TREND   */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* 1. Earnings Summary Breakdown Card */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
            <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <DollarSign size={15} className="text-amber-500" /> Earnings Summary
            </span>
            <button
              type="button"
              onClick={() => {
                setSelectedOrder(orders[0]);
                setActiveModal('earningsDetails');
              }}
              className="text-[11px] font-bold text-amber-500 hover:underline cursor-pointer active:scale-95 transition"
            >
              View Details
            </button>
          </div>

          <div className="space-y-2 text-xs font-semibold">
            <div className="flex justify-between text-slate-600 dark:text-slate-400"><span>Base Fare</span><strong className="font-mono text-slate-900 dark:text-white">₹950</strong></div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400"><span>Distance Incentive</span><strong className="font-mono text-slate-900 dark:text-white">₹300</strong></div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400"><span>Peak Bonus</span><strong className="font-mono text-emerald-500">₹150</strong></div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400"><span>Fuel Allowance</span><strong className="font-mono text-slate-900 dark:text-white">₹50</strong></div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400"><span>Tips</span><strong className="font-mono text-amber-400">₹200</strong></div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400"><span>Other Adjustments</span><strong className="font-mono text-rose-500">-₹50</strong></div>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between text-sm font-black">
              <span className="text-slate-900 dark:text-white">Total Net Earnings</span>
              <strong className="font-mono text-amber-500 text-base">₹1,450</strong>
            </div>
          </div>
        </div>

        {/* 2. Delivery Type Breakdown Card (Page 25 Donut Widget) */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
            <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <PieChart size={15} className="text-sky-500" /> Delivery Type Breakdown
            </span>
            <span className="text-[10px] font-bold text-slate-400">This Month</span>
          </div>

          <div className="flex items-center gap-4 pt-1">
            <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-emerald-500 stroke-current" strokeWidth="4" fill="none" strokeDasharray="37, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-rose-500 stroke-current" strokeWidth="4" fill="none" strokeDasharray="25, 100" strokeDashoffset="-37" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-amber-500 stroke-current" strokeWidth="4" fill="none" strokeDasharray="21, 100" strokeDashoffset="-62" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-sky-500 stroke-current" strokeWidth="4" fill="none" strokeDasharray="17, 100" strokeDashoffset="-83" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute text-center">
                <span className="text-base font-black text-slate-900 dark:text-white font-mono leading-none block">342</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase">Total</span>
              </div>
            </div>

            <div className="flex-1 space-y-1.5 text-[11px] font-bold">
              <button type="button" onClick={() => setFilterDeliveryType('Grocery')} className="w-full flex justify-between items-center hover:bg-slate-100 dark:hover:bg-slate-800 p-1 rounded cursor-pointer active:scale-95 transition">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Grocery</span>
                <span className="font-mono text-slate-500">128 (37%)</span>
              </button>
              <button type="button" onClick={() => setFilterDeliveryType('Medicine')} className="w-full flex justify-between items-center hover:bg-slate-100 dark:hover:bg-slate-800 p-1 rounded cursor-pointer active:scale-95 transition">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Medicine</span>
                <span className="font-mono text-slate-500">86 (25%)</span>
              </button>
              <button type="button" onClick={() => setFilterDeliveryType('Food')} className="w-full flex justify-between items-center hover:bg-slate-100 dark:hover:bg-slate-800 p-1 rounded cursor-pointer active:scale-95 transition">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Food</span>
                <span className="font-mono text-slate-500">72 (21%)</span>
              </button>
              <button type="button" onClick={() => setFilterDeliveryType('Parcel')} className="w-full flex justify-between items-center hover:bg-slate-100 dark:hover:bg-slate-800 p-1 rounded cursor-pointer active:scale-95 transition">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-sky-500" /> Parcel</span>
                <span className="font-mono text-slate-500">56 (17%)</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3. Performance Trend Dual-Axis Line Graph (PDF Page 25 Exact Copy) */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
            <h3 className="text-sm font-black text-slate-900 dark:text-white">
              Performance Trend
            </h3>
            <div className="relative">
              <select
                value={trendPeriod}
                onChange={(e) => {
                  setTrendPeriod(e.target.value);
                  addToast?.(`Performance Trend set to ${e.target.value}`, 'info');
                }}
                className="appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-[11px] font-bold px-3 py-1 pr-6 rounded-xl cursor-pointer focus:outline-none"
              >
                <option value="This Month">This Month</option>
                <option value="This Week">This Week</option>
                <option value="Today">Today</option>
              </select>
              <ChevronDown size={12} className="absolute right-2 top-2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 text-[11px] font-extrabold pt-1">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Deliveries
            </span>
            <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Earnings (₹)
            </span>
          </div>

          {/* Dual-Axis SVG Line Chart */}
          <div className="relative w-full h-44 pt-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 400 180">
              {/* Background Grid Lines */}
              <line x1="35" y1="35" x2="365" y2="35" className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="35" y1="62.5" x2="365" y2="62.5" className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="35" y1="90" x2="365" y2="90" className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="35" y1="117.5" x2="365" y2="117.5" className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="35" y1="145" x2="365" y2="145" className="stroke-slate-200 dark:stroke-slate-700" strokeWidth="1.5" />
              <line x1="35" y1="35" x2="35" y2="145" className="stroke-slate-200 dark:stroke-slate-700" strokeWidth="1.5" />
              <line x1="365" y1="35" x2="365" y2="145" className="stroke-slate-200 dark:stroke-slate-700" strokeWidth="1.5" />

              {/* Y-Axis Left Labels (Deliveries 0 to 40) */}
              <text x="25" y="39" textAnchor="end" className="fill-slate-400 font-mono text-[10px] font-bold">40</text>
              <text x="25" y="66" textAnchor="end" className="fill-slate-400 font-mono text-[10px] font-bold">30</text>
              <text x="25" y="94" textAnchor="end" className="fill-slate-400 font-mono text-[10px] font-bold">20</text>
              <text x="25" y="121" textAnchor="end" className="fill-slate-400 font-mono text-[10px] font-bold">10</text>
              <text x="25" y="149" textAnchor="end" className="fill-slate-400 font-mono text-[10px] font-bold">0</text>

              {/* Y-Axis Right Labels (Earnings 0 to 2K) */}
              <text x="375" y="39" textAnchor="start" className="fill-amber-500 font-mono text-[10px] font-bold">2K</text>
              <text x="375" y="66" textAnchor="start" className="fill-amber-500 font-mono text-[10px] font-bold">1.5K</text>
              <text x="375" y="94" textAnchor="start" className="fill-amber-500 font-mono text-[10px] font-bold">1K</text>
              <text x="375" y="121" textAnchor="start" className="fill-amber-500 font-mono text-[10px] font-bold">500</text>
              <text x="375" y="149" textAnchor="start" className="fill-amber-500 font-mono text-[10px] font-bold">0</text>

              {/* X-Axis Date Labels */}
              <text x="45" y="166" textAnchor="middle" className="fill-slate-500 font-bold text-[10px]">01 Aug</text>
              <text x="122.5" y="166" textAnchor="middle" className="fill-slate-500 font-bold text-[10px]">08 Aug</text>
              <text x="200" y="166" textAnchor="middle" className="fill-slate-500 font-bold text-[10px]">15 Aug</text>
              <text x="277.5" y="166" textAnchor="middle" className="fill-slate-500 font-bold text-[10px]">22 Aug</text>
              <text x="355" y="166" textAnchor="middle" className="fill-slate-500 font-bold text-[10px]">31 Aug</text>

              {/* Deliveries Green Polyline */}
              <polyline
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeDasharray="4 2"
                points="45,70.75 83.75,92.75 122.5,76.25 161.25,81.75 200,95.5 238.75,57 277.5,73.5 316.25,57 355,76.25"
              />
              {/* Deliveries Green Data Points */}
              {[
                { x: 45, y: 70.75, v: 27 },
                { x: 83.75, y: 92.75, v: 19 },
                { x: 122.5, y: 76.25, v: 25 },
                { x: 161.25, y: 81.75, v: 23 },
                { x: 200, y: 95.5, v: 18 },
                { x: 238.75, y: 57, v: 32 },
                { x: 277.5, y: 73.5, v: 26 },
                { x: 316.25, y: 57, v: 32 },
                { x: 355, y: 76.25, v: 25 }
              ].map((pt, i) => (
                <circle key={i} cx={pt.x} cy={pt.y} r="4" className="fill-emerald-500 stroke-white dark:stroke-slate-900 cursor-pointer hover:r-6 transition-all" onClick={() => addToast?.(`Deliveries on point: ${pt.v}`, 'info')} />
              ))}

              {/* Earnings Orange Polyline */}
              <polyline
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.5"
                strokeDasharray="4 2"
                points="45,117.5 83.75,125.75 122.5,106.5 161.25,120.25 200,65.25 238.75,112 277.5,106.5 316.25,95.5 355,51.5"
              />
              {/* Earnings Orange Data Points */}
              {[
                { x: 45, y: 117.5, v: 500 },
                { x: 83.75, y: 125.75, v: 350 },
                { x: 122.5, y: 106.5, v: 700 },
                { x: 161.25, y: 120.25, v: 450 },
                { x: 200, y: 65.25, v: 1450 },
                { x: 238.75, y: 112, v: 600 },
                { x: 277.5, y: 106.5, v: 700 },
                { x: 316.25, y: 95.5, v: 900 },
                { x: 355, y: 51.5, v: 1700 }
              ].map((pt, i) => (
                <circle key={i} cx={pt.x} cy={pt.y} r="4" className="fill-amber-500 stroke-white dark:stroke-slate-900 cursor-pointer hover:r-6 transition-all" onClick={() => addToast?.(`Earnings on point: ₹${pt.v}`, 'info')} />
              ))}
            </svg>
          </div>
        </div>

      </div>


      {/* ========================================================================= */}
      {/* PAGE 25 MIDDLE BANNER: WEEKLY INCENTIVE PROGRESS                          */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 text-white p-5 rounded-3xl border border-emerald-500/30 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 font-black">
            🎉
          </div>
          <div>
            <strong className="text-sm font-black text-white block">Great Work, Vikram!</strong>
            <p className="text-xs text-slate-300">
              You've completed 12 more deliveries this week. Complete 8 more to unlock <strong className="text-emerald-400">₹500 bonus!</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto shrink-0">
          <div className="w-36 space-y-1">
            <div className="flex justify-between text-[10px] font-mono font-bold">
              <span>12 / 20 Deliveries</span>
              <span className="text-emerald-400">60%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full w-[60%] rounded-full" />
            </div>
          </div>

          <button
            type="button"
            onClick={() => addToast?.('Opening Incentives & Bonus Progress tab...', 'info')}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black cursor-pointer active:scale-95 transition-all duration-150 shadow shrink-0"
          >
            View Incentives
          </button>
        </div>
      </div>


      {/* ========================================================================= */}
      {/* 3 & 4. PAGE 27 EXACT HORIZONTAL FILTER BAR (6 Labeled Boxes + Buttons)    */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        
        {/* Search Bar Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-96">
            <Search size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Order ID, Customer, Store, Mobile, Area..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 font-bold text-xs cursor-pointer active:scale-95 transition"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-3.5 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-xs cursor-pointer active:scale-95 transition-all duration-150"
            >
              Reset Filters
            </button>
            <button
              type="button"
              onClick={() => setShowFutureSuite(!showFutureSuite)}
              className="px-3.5 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 text-xs font-extrabold flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all duration-150"
            >
              <Cpu size={14} /> Future Features
            </button>
          </div>
        </div>

        {/* PDF Page 27 Exact Labeled Filter Bar (6 Labeled Dropdowns + More Filters) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 pt-2">

          {/* 1. Date Dropdown Box */}
          <div className="relative bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-2.5 focus-within:ring-2 focus-within:ring-amber-500 transition">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block leading-tight">Date</span>
            <select
              value={dateFilter}
              onChange={(e) => {
                setDateFilter(e.target.value);
                addToast?.(`Date filter changed to ${e.target.value}`, 'info');
              }}
              className="w-full bg-transparent appearance-none text-xs font-black text-slate-900 dark:text-white pr-5 focus:outline-none cursor-pointer"
            >
              <option value="This Month">This Month</option>
              <option value="Today">Today</option>
              <option value="This Week">This Week</option>
              <option value="Custom Date">Custom Date</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-4 text-slate-400 pointer-events-none" />
          </div>

          {/* 2. Delivery Type Dropdown Box */}
          <div className="relative bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-2.5 focus-within:ring-2 focus-within:ring-amber-500 transition">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block leading-tight">Delivery Type</span>
            <select
              value={filterDeliveryType}
              onChange={(e) => setFilterDeliveryType(e.target.value)}
              className="w-full bg-transparent appearance-none text-xs font-black text-slate-900 dark:text-white pr-5 focus:outline-none cursor-pointer"
            >
              <option value="All">All Types</option>
              <option value="Grocery">Grocery</option>
              <option value="Medicine">Medicine</option>
              <option value="Food">Food</option>
              <option value="Parcel">Parcel</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-4 text-slate-400 pointer-events-none" />
          </div>

          {/* 3. Store Dropdown Box */}
          <div className="relative bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-2.5 focus-within:ring-2 focus-within:ring-amber-500 transition">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block leading-tight">Store</span>
            <select
              value={filterStore}
              onChange={(e) => setFilterStore(e.target.value)}
              className="w-full bg-transparent appearance-none text-xs font-black text-slate-900 dark:text-white pr-5 focus:outline-none cursor-pointer"
            >
              <option value="All">All Stores</option>
              <option value="SaathApp Express Hub">SaathApp Express Hub</option>
              <option value="MedPlus Pharmacy">MedPlus Pharmacy</option>
              <option value="Bakers Point">Bakers Point</option>
              <option value="DTDC Courier">DTDC Courier</option>
              <option value="Sudha Daily">Sudha Daily</option>
              <option value="Apollo Pharmacy">Apollo Pharmacy</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-4 text-slate-400 pointer-events-none" />
          </div>

          {/* 4. Payment Type Dropdown Box */}
          <div className="relative bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-2.5 focus-within:ring-2 focus-within:ring-amber-500 transition">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block leading-tight">Payment Type</span>
            <select
              value={filterPayment}
              onChange={(e) => setFilterPayment(e.target.value)}
              className="w-full bg-transparent appearance-none text-xs font-black text-slate-900 dark:text-white pr-5 focus:outline-none cursor-pointer"
            >
              <option value="All">All</option>
              <option value="Prepaid">Prepaid</option>
              <option value="COD">COD</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-4 text-slate-400 pointer-events-none" />
          </div>

          {/* 5. Status Dropdown Box */}
          <div className="relative bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-2.5 focus-within:ring-2 focus-within:ring-amber-500 transition">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block leading-tight">Status</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full bg-transparent appearance-none text-xs font-black text-slate-900 dark:text-white pr-5 focus:outline-none cursor-pointer"
            >
              <option value="Delivered">Delivered</option>
              <option value="All">All Statuses</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-4 text-slate-400 pointer-events-none" />
          </div>

          {/* 6. Payout Range Dropdown Box */}
          <div className="relative bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-2.5 focus-within:ring-2 focus-within:ring-amber-500 transition">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block leading-tight">Payout Range</span>
            <select
              value={filterPayoutRange}
              onChange={(e) => setFilterPayoutRange(e.target.value)}
              className="w-full bg-transparent appearance-none text-xs font-black text-slate-900 dark:text-white pr-5 focus:outline-none cursor-pointer"
            >
              <option value="All">All</option>
              <option value="< ₹100">&lt; ₹100</option>
              <option value="₹100-₹200">₹100-₹200</option>
              <option value="> ₹200">&gt; ₹200</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-4 text-slate-400 pointer-events-none" />
          </div>

          {/* 7. More Filters Button */}
          <button
            type="button"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={`h-full min-h-[48px] rounded-2xl text-xs font-black flex items-center justify-center gap-2 cursor-pointer border transition px-3 active:scale-95 transition-all duration-150 ${
              showAdvancedFilters
                ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-slate-900'
                : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Filter size={15} /> More Filters
          </button>

        </div>

        {/* Expandable Advanced Filters Drawer Panel */}
        {showAdvancedFilters && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sa-rise">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Customer Name</label>
              <input
                type="text"
                value={filterCustomer}
                onChange={(e) => setFilterCustomer(e.target.value)}
                placeholder="Filter by customer..."
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 dark:text-slate-200"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Distance Filter</label>
              <select
                value={filterDistance}
                onChange={(e) => setFilterDistance(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 dark:text-slate-200"
              >
                <option value="All">All Distances</option>
                <option value="< 2 km">&lt; 2 km</option>
                <option value="2-5 km">2 - 5 km</option>
                <option value="> 5 km">&gt; 5 km</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">City Filter</label>
              <select
                value={filterCity}
                onChange={(e) => setFilterCity(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 dark:text-slate-200"
              >
                <option value="All">All Cities</option>
                <option value="Patna">Patna</option>
                <option value="Gaya">Gaya</option>
                <option value="Muzaffarpur">Muzaffarpur</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Zone Filter</label>
              <select
                value={filterZone}
                onChange={(e) => setFilterZone(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 dark:text-slate-200"
              >
                <option value="All">All Zones</option>
                <option value="Boring Road">Boring Road</option>
                <option value="Kankarbagh">Kankarbagh</option>
                <option value="Rajendra Nagar">Rajendra Nagar</option>
                <option value="Bailey Road">Bailey Road</option>
              </select>
            </div>
          </div>
        )}
      </div>


      {/* ========================================================================= */}
      {/* PAGE 24 LIST: FUTURE FEATURES SUITE TOGGLE PANEL                          */}
      {/* ========================================================================= */}
      {showFutureSuite && (
        <div className="bg-slate-900 text-white p-5 rounded-3xl border border-amber-500/30 shadow-xl space-y-3 sa-rise">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest flex items-center gap-2">
              <Cpu size={16} /> Recommended Future Features Suite (PDF Page 24)
            </span>
            <button type="button" onClick={() => setShowFutureSuite(false)} className="text-slate-400 hover:text-white p-1 cursor-pointer active:scale-95 transition">
              <X size={16} />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 text-xs">
            {[
              'Voice Navigation',
              'AI Route Optimization',
              'One-tap Emergency',
              'Fuel Tracking',
              'Battery Warning',
              'Smart Auto-Accept',
              'Offline Order Sync',
              'Multi-order Batch Delivery',
              'Proof-of-Delivery Gallery'
            ].map((feat, idx) => (
              <button key={idx} type="button" onClick={() => addToast?.(`${feat} module activated`, 'success')} className="p-3 rounded-2xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 flex items-center justify-between font-bold text-[11px] cursor-pointer active:scale-95 transition">
                <span>{feat}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </button>
            ))}
          </div>
        </div>
      )}


      {/* ========================================================================= */}
      {/* 18. BULK ACTIONS BAR (When Rows Selected)                                 */}
      {/* ========================================================================= */}
      {selectedRowIds.length > 0 && (
        <div className="bg-slate-900 text-white p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-xl sa-rise border border-amber-500/30">
          <div className="flex items-center gap-2 text-xs font-extrabold">
            <span className="bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded-full font-mono">
              {selectedRowIds.length} Selected
            </span>
            <span>Bulk Order Actions</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => addToast?.(`Downloading batch receipts for ${selectedRowIds.length} orders...`, 'success')}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer active:scale-95 transition"
            >
              <Download size={13} /> Bulk Download
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer active:scale-95 transition"
            >
              <Printer size={13} /> Bulk Print
            </button>
            <button
              type="button"
              onClick={() => addToast?.(`Exporting ${selectedRowIds.length} selected orders to CSV...`, 'success')}
              className="px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 text-xs font-extrabold flex items-center gap-1.5 cursor-pointer active:scale-95 transition"
            >
              <Share2 size={13} /> Bulk Export
            </button>
          </div>
        </div>
      )}


      {/* ========================================================================= */}
      {/* 5. COMPLETED DELIVERIES TABLE (Exact Page 28 PDF Columns & Buttons)       */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-slate-50 dark:bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
              <tr>
                <th className="p-4 w-10 text-center">
                  <button type="button" onClick={handleSelectAllRows} className="cursor-pointer text-slate-400 hover:text-amber-500 active:scale-95 transition">
                    {selectedRowIds.length === paginatedOrders.length && paginatedOrders.length > 0 ? (
                      <CheckSquare size={16} className="text-amber-500" />
                    ) : (
                      <Square size={16} />
                    )}
                  </button>
                </th>
                <th className="p-4 cursor-pointer hover:text-slate-700 dark:hover:text-slate-200" onClick={() => handleSort('id')}>
                  Order ID {sortField === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="p-4 cursor-pointer hover:text-slate-700 dark:hover:text-slate-200" onClick={() => handleSort('orderDate')}>
                  Date &amp; Time {sortField === 'orderDate' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="p-4">Delivery Type</th>
                <th className="p-4">Store Name</th>
                <th className="p-4">Customer Details</th>
                <th className="p-4 cursor-pointer hover:text-slate-700 dark:hover:text-slate-200" onClick={() => handleSort('distanceVal')}>
                  Distance {sortField === 'distanceVal' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="p-4 cursor-pointer hover:text-slate-700 dark:hover:text-slate-200" onClick={() => handleSort('durationVal')}>
                  Duration {sortField === 'durationVal' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="p-4">Items</th>
                <th className="p-4">Payment</th>
                <th className="p-4">COD</th>
                <th className="p-4 cursor-pointer hover:text-slate-700 dark:hover:text-slate-200" onClick={() => handleSort('payout')}>
                  Payout {sortField === 'payout' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="p-4">Bonus</th>
                <th className="p-4">Tip</th>
                <th className="p-4">Status</th>
                <th className="p-4 cursor-pointer hover:text-slate-700 dark:hover:text-slate-200" onClick={() => handleSort('rating')}>
                  Rating {sortField === 'rating' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="p-4 text-right pr-6">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-semibold text-slate-700 dark:text-slate-300">
              {paginatedOrders.length === 0 ? (
                <tr>
                  <td colSpan={17} className="text-center py-12 text-slate-400">
                    <div className="flex flex-col items-center gap-2">
                      <AlertCircle size={32} className="text-slate-300 dark:text-slate-700" />
                      <p className="font-bold">No completed deliveries found matching your search or filters.</p>
                      <button type="button" onClick={handleResetFilters} className="text-amber-500 font-extrabold hover:underline cursor-pointer active:scale-95 transition">
                        Reset Filters
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((order) => {
                  const isSelected = selectedRowIds.includes(order.id);
                  return (
                    <tr
                      key={order.id}
                      className={`hover:bg-slate-50 dark:hover:bg-slate-800/40 transition ${
                        isSelected ? 'bg-amber-500/10 dark:bg-amber-500/10' : ''
                      }`}
                    >
                      <td className="p-4 text-center">
                        <button type="button" onClick={() => handleToggleRow(order.id)} className="cursor-pointer text-slate-400 hover:text-amber-500 active:scale-95 transition">
                          {isSelected ? <CheckSquare size={16} className="text-amber-500" /> : <Square size={16} />}
                        </button>
                      </td>

                      {/* Order ID */}
                      <td className="p-4 font-mono font-black text-slate-900 dark:text-white">
                        {order.id}
                      </td>

                      {/* Date & Completion Time */}
                      <td className="p-4 font-mono text-[11px] text-slate-500">
                        {order.orderDate}
                        <span className="block text-[10px] text-slate-400 font-sans">{order.completionTime}</span>
                      </td>

                      {/* Delivery Type */}
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                            order.deliveryType === 'Grocery'
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                              : order.deliveryType === 'Medicine'
                              ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                              : order.deliveryType === 'Food'
                              ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                              : 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20'
                          }`}
                        >
                          {order.deliveryType}
                        </span>
                      </td>

                      {/* Store Name */}
                      <td className="p-4 font-bold text-slate-900 dark:text-white max-w-[160px] truncate">
                        {order.storeName}
                      </td>

                      {/* Customer */}
                      <td className="p-4">
                        <strong className="text-slate-900 dark:text-white block">{order.customer}</strong>
                        <span className="text-[10px] text-slate-400 block font-mono">{order.customerPhone}</span>
                      </td>

                      {/* Distance */}
                      <td className="p-4 font-mono text-slate-600 dark:text-slate-400">{order.distance}</td>

                      {/* Duration */}
                      <td className="p-4 font-mono text-slate-600 dark:text-slate-400">{order.duration}</td>

                      {/* Items Count */}
                      <td className="p-4 font-mono font-bold">{order.items} Items</td>

                      {/* Payment Mode */}
                      <td className="p-4">
                        <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded text-[10px] font-bold">
                          {order.payment}
                        </span>
                      </td>

                      {/* COD Amount */}
                      <td className="p-4 font-mono font-bold text-slate-700 dark:text-slate-300">
                        {order.codAmount > 0 ? `₹${order.codAmount}` : '-'}
                      </td>

                      {/* Payout */}
                      <td className="p-4 font-black text-amber-500 font-mono text-xs">
                        ₹{order.payout}
                      </td>

                      {/* Bonus */}
                      <td className="p-4 font-mono text-emerald-500 font-bold">
                        +{order.bonus > 0 ? `₹${order.bonus}` : '₹0'}
                      </td>

                      {/* Tip */}
                      <td className="p-4 font-mono text-emerald-400 font-bold">
                        +{order.tip > 0 ? `₹${order.tip}` : '₹0'}
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full text-[10px] font-black border border-emerald-500/20">
                          <CheckCircle2 size={11} /> {order.status}
                        </span>
                      </td>

                      {/* Rating */}
                      <td className="p-4 font-mono font-black text-amber-400">
                        {order.rating} ★
                      </td>

                      {/* Actions Column (Page 29 & Page 34 PDF Buttons) */}
                      <td className="p-4 text-right pr-6">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => openOrderModal(order, 'details')}
                            className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-extrabold text-[11px] flex items-center gap-1 cursor-pointer active:scale-95 transition-all duration-150"
                            title="View Full Details"
                          >
                            <Eye size={12} /> Details
                          </button>

                          <button
                            type="button"
                            onClick={() => openOrderModal(order, 'proof')}
                            className="px-2.5 py-1 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 dark:text-sky-400 font-extrabold text-[11px] flex items-center gap-1 cursor-pointer active:scale-95 transition-all duration-150"
                            title="Delivery Proof"
                          >
                            <ShieldCheck size={12} /> Proof
                          </button>

                          <button
                            type="button"
                            onClick={() => openOrderModal(order, 'route')}
                            className="px-2.5 py-1 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-extrabold text-[11px] flex items-center gap-1 cursor-pointer active:scale-95 transition-all duration-150"
                            title="Map Route"
                          >
                            <Navigation size={12} /> Route
                          </button>

                          <button
                            type="button"
                            onClick={() => openOrderModal(order, 'feedback')}
                            className="px-2 py-1 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 font-extrabold text-[11px] flex items-center gap-1 cursor-pointer active:scale-95 transition-all duration-150"
                            title="Customer Rating & Feedback"
                          >
                            <Star size={11} className="fill-purple-500" /> Review
                          </button>

                          <button
                            type="button"
                            onClick={() => openOrderModal(order, 'invoice')}
                            className="px-2 py-1 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold text-[11px] cursor-pointer active:scale-95 transition-all duration-150"
                            title="Tax Invoice"
                          >
                            Invoice
                          </button>

                          <button
                            type="button"
                            onClick={() => openOrderModal(order, 'ticket')}
                            className="px-2 py-1 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 font-extrabold text-[11px] cursor-pointer active:scale-95 transition-all duration-150"
                            title="Reopen Support Ticket / Report Issue"
                          >
                            Support
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* 17. Pagination Bar (Exact Page 33 PDF Layout) */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-slate-600 dark:text-slate-400">
          <div>
            Showing <span className="text-slate-900 dark:text-white font-mono">{filteredOrders.length > 0 ? (currentPage - 1) * rowsPerPage + 1 : 0}</span> to{' '}
            <span className="text-slate-900 dark:text-white font-mono">{Math.min(currentPage * rowsPerPage, filteredOrders.length)}</span> of{' '}
            <span className="text-slate-900 dark:text-white font-mono">{filteredOrders.length}</span> entries
          </div>

          <div className="flex items-center gap-4">
            {/* Rows Per Page Select */}
            <div className="flex items-center gap-2">
              <span>Rows per page:</span>
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-2 py-1 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>

            {/* Page Buttons */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 disabled:opacity-40 hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer active:scale-95 transition"
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((pg) => (
                <button
                  key={pg}
                  type="button"
                  onClick={() => setCurrentPage(pg)}
                  className={`px-3 py-1 rounded-xl font-extrabold cursor-pointer active:scale-95 transition-all duration-150 ${
                    currentPage === pg
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100'
                  }`}
                >
                  {pg}
                </button>
              ))}

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 disabled:opacity-40 hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer active:scale-95 transition"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* ========================================================================= */}
      {/* QUICK ACTIONS BAR (PDF Page 29/34 Exact Bottom Bar from Screenshot)        */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <Zap size={16} className="text-amber-500" /> Quick Delivery Actions
          </span>
          <span className="text-[10px] font-bold text-slate-400">
            Selected Order: <strong className="font-mono text-slate-700 dark:text-slate-200">{selectedOrder ? selectedOrder.id : orders[0]?.id}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {/* 1. View Details */}
          <button
            type="button"
            onClick={() => openOrderModal(selectedOrder || orders[0], 'details')}
            className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 flex items-center gap-3 text-left cursor-pointer active:scale-95 transition-all duration-150 group"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition">
              <Eye size={18} />
            </div>
            <div className="min-w-0">
              <strong className="text-xs font-black text-slate-900 dark:text-white block truncate">View Details</strong>
              <span className="text-[10px] text-slate-400 font-bold block truncate">Full order details</span>
            </div>
          </button>

          {/* 2. Invoice */}
          <button
            type="button"
            onClick={() => openOrderModal(selectedOrder || orders[0], 'invoice')}
            className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 flex items-center gap-3 text-left cursor-pointer active:scale-95 transition-all duration-150 group"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition">
              <FileText size={18} />
            </div>
            <div className="min-w-0">
              <strong className="text-xs font-black text-slate-900 dark:text-white block truncate">Invoice</strong>
              <span className="text-[10px] text-slate-400 font-bold block truncate">Download invoice</span>
            </div>
          </button>

          {/* 3. Proof */}
          <button
            type="button"
            onClick={() => openOrderModal(selectedOrder || orders[0], 'proof')}
            className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-sky-500/40 flex items-center gap-3 text-left cursor-pointer active:scale-95 transition-all duration-150 group"
          >
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition">
              <ShieldCheck size={18} />
            </div>
            <div className="min-w-0">
              <strong className="text-xs font-black text-slate-900 dark:text-white block truncate">Proof</strong>
              <span className="text-[10px] text-slate-400 font-bold block truncate">Delivery proof</span>
            </div>
          </button>

          {/* 4. Route */}
          <button
            type="button"
            onClick={() => openOrderModal(selectedOrder || orders[0], 'route')}
            className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-amber-500/40 flex items-center gap-3 text-left cursor-pointer active:scale-95 transition-all duration-150 group"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition">
              <Navigation size={18} />
            </div>
            <div className="min-w-0">
              <strong className="text-xs font-black text-slate-900 dark:text-white block truncate">Route</strong>
              <span className="text-[10px] text-slate-400 font-bold block truncate">View on map</span>
            </div>
          </button>

          {/* 5. Customer Rating */}
          <button
            type="button"
            onClick={() => openOrderModal(selectedOrder || orders[0], 'feedback')}
            className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-purple-500/40 flex items-center gap-3 text-left cursor-pointer active:scale-95 transition-all duration-150 group"
          >
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition">
              <Star size={18} className="fill-purple-500" />
            </div>
            <div className="min-w-0">
              <strong className="text-xs font-black text-slate-900 dark:text-white block truncate">Customer Rating</strong>
              <span className="text-[10px] text-slate-400 font-bold block truncate">View feedback</span>
            </div>
          </button>

          {/* 6. Report */}
          <button
            type="button"
            onClick={() => openOrderModal(selectedOrder || orders[0], 'ticket')}
            className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-rose-500/40 flex items-center gap-3 text-left cursor-pointer active:scale-95 transition-all duration-150 group"
          >
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition">
              <AlertTriangle size={18} />
            </div>
            <div className="min-w-0">
              <strong className="text-xs font-black text-slate-900 dark:text-white block truncate">Report</strong>
              <span className="text-[10px] text-slate-400 font-bold block truncate">Report an issue</span>
            </div>
          </button>

          {/* 7. More Actions */}
          <button
            type="button"
            onClick={() => addToast?.('More action options: Re-order dispatch, Share proof, Request audit.', 'info')}
            className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-slate-400 flex items-center gap-3 text-left cursor-pointer active:scale-95 transition-all duration-150 group"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0 group-hover:scale-110 transition">
              <MoreHorizontal size={18} />
            </div>
            <div className="min-w-0">
              <strong className="text-xs font-black text-slate-900 dark:text-white block truncate">More Actions</strong>
              <span className="text-[10px] text-slate-400 font-bold block truncate">Extra options</span>
            </div>
          </button>
        </div>
      </div>


      {/* ========================================================================= */}
      {/* 16. STATISTICS SECTION (Fully Filled Visual Charts from Page 33)           */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="text-amber-500" size={20} /> Delivery Statistics &amp; Performance Trends
          </h2>
          <span className="text-xs font-bold text-slate-400">Live Analytics Data</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Daily Deliveries Bar Chart */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">Daily Deliveries</span>
              <span className="text-[10px] font-extrabold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">+14% Growth</span>
            </div>

            <div className="h-36 flex items-end justify-between gap-2.5 pt-4 pb-1 px-1">
              {[
                { day: 'Mon', count: 12 },
                { day: 'Tue', count: 18 },
                { day: 'Wed', count: 15 },
                { day: 'Thu', count: 22 },
                { day: 'Fri', count: 26 },
                { day: 'Sat', count: 30 },
                { day: 'Sun', count: 16 }
              ].map((d) => (
                <button
                  key={d.day}
                  type="button"
                  onClick={() => addToast?.(`${d.day}: ${d.count} deliveries completed`, 'info')}
                  className="flex-1 h-full flex flex-col justify-end items-center gap-1.5 group cursor-pointer active:scale-95 transition"
                >
                  <span className="text-[10px] font-mono font-extrabold text-slate-500 dark:text-slate-400 group-hover:text-amber-500 transition-colors">
                    {d.count}
                  </span>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-xl h-24 p-1 flex items-end overflow-hidden">
                    <div
                      style={{ height: `${(d.count / 32) * 100}%` }}
                      className="w-full bg-gradient-to-t from-amber-500 via-amber-400 to-amber-300 rounded-lg group-hover:from-amber-400 group-hover:to-amber-200 transition-all duration-300 shadow-sm"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{d.day}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Weekly Earnings Bar Chart */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">Weekly Earnings</span>
              <span className="text-[10px] font-extrabold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">₹8,900 Total</span>
            </div>

            <div className="h-36 flex items-end justify-between gap-4 pt-4 pb-1 px-3">
              {[
                { week: 'W1', amt: 1800 },
                { week: 'W2', amt: 2200 },
                { week: 'W3', amt: 2450 },
                { week: 'W4', amt: 2450 }
              ].map((w) => (
                <button
                  key={w.week}
                  type="button"
                  onClick={() => addToast?.(`${w.week}: ₹${w.amt} earned`, 'info')}
                  className="flex-1 h-full flex flex-col justify-end items-center gap-1.5 group cursor-pointer active:scale-95 transition"
                >
                  <span className="text-[10px] font-mono font-extrabold text-amber-500 group-hover:text-emerald-400 transition-colors">
                    ₹{w.amt}
                  </span>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-xl h-24 p-1 flex items-end overflow-hidden">
                    <div
                      style={{ height: `${(w.amt / 2800) * 100}%` }}
                      className="w-full bg-gradient-to-t from-emerald-600 via-emerald-500 to-emerald-400 rounded-lg group-hover:brightness-110 transition-all duration-300 shadow-sm"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{w.week}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Customer Ratings Distribution Chart */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">Customer Ratings</span>
              <span className="text-[10px] font-extrabold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full">4.9 ★ Avg</span>
            </div>

            <div className="space-y-2.5 pt-3 text-xs font-semibold">
              {[
                { stars: '5 Stars', pct: '92%', count: 197, color: 'bg-amber-400' },
                { stars: '4 Stars', pct: '6%', count: 13, color: 'bg-amber-400/80' },
                { stars: '3 Stars', pct: '1%', count: 3, color: 'bg-amber-400/60' },
                { stars: '1-2 Stars', pct: '1%', count: 1, color: 'bg-amber-400/40' }
              ].map((r) => (
                <button
                  key={r.stars}
                  type="button"
                  onClick={() => { handleSort('rating'); addToast?.(`Filtered by ${r.stars} reviews (${r.count})`, 'info'); }}
                  className="w-full flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-800 p-1 rounded-xl cursor-pointer active:scale-95 transition"
                >
                  <span className="w-14 text-[11px] font-bold text-slate-500 text-left">{r.stars}</span>
                  <div className="flex-1 bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden p-0.5">
                    <div style={{ width: r.pct }} className={`${r.color} h-full rounded-full transition-all duration-500`} />
                  </div>
                  <span className="w-8 text-[11px] font-mono font-black text-right text-slate-700 dark:text-slate-300">{r.count}</span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>


      {/* ========================================================================= */}
      {/* 20. AI INSIGHTS SUMMARY CARD (Exact Page 35 PDF Layout)                  */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950 text-white p-6 sm:p-8 rounded-3xl border border-amber-500/30 shadow-2xl relative overflow-hidden space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400">
              <Sparkles size={22} />
            </div>
            <div>
              <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest block">AI Delivery Intelligence</span>
              <h3 className="text-xl font-black text-white">AI Performance Summary</h3>
            </div>
          </div>

          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-black px-3.5 py-1 rounded-full w-fit">
            Weekly Insights Active
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Completed Deliveries</span>
            <strong className="text-2xl font-black text-white font-mono mt-1 block">342</strong>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Average Delivery Time</span>
            <strong className="text-2xl font-black text-sky-400 font-mono mt-1 block">17 min</strong>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Average Rating</span>
            <strong className="text-2xl font-black text-amber-400 font-mono mt-1 block">4.9 ★</strong>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Fastest Delivery</span>
            <strong className="text-2xl font-black text-emerald-400 font-mono mt-1 block">9 min</strong>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Highest Earnings Day</span>
            <strong className="text-2xl font-black text-amber-500 font-mono mt-1 block">₹2,450</strong>
          </div>
        </div>

        {/* AI Recommendation Banner */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Zap size={20} className="text-amber-400 shrink-0" />
            <p className="text-xs font-bold text-slate-200">
              <strong className="text-amber-400">AI Recommendation:</strong> Deliver 8 more orders this week to unlock ₹500 incentive bonus!
            </p>
          </div>
          <button
            type="button"
            onClick={() => addToast?.('Redirecting to Active Shift incentives...', 'info')}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shrink-0 cursor-pointer active:scale-95 transition-all duration-150 shadow"
          >
            Unlock Incentive
          </button>
        </div>
      </div>


      {/* ========================================================================= */}
      {/* 21. PERFORMANCE KPIS SECTION (Page 35 PDF KPI Cards)                     */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Zap className="text-amber-500" size={20} /> Lifetime Rider Performance KPIs
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3 text-xs">
          {[
            { label: 'Fastest Delivery', val: '9 min', color: 'text-emerald-500' },
            { label: 'Longest Delivery', val: '42 min', color: 'text-slate-700 dark:text-slate-300' },
            { label: 'Highest Tip', val: '₹150', color: 'text-amber-500' },
            { label: 'Highest Single Order', val: '₹380', color: 'text-amber-500' },
            { label: 'Total KM Travelled', val: '1,480 KM', color: 'text-sky-500' },
            { label: 'Fuel Allowance', val: '₹2,100', color: 'text-emerald-500' },
            { label: 'CO₂ Saved (EV)', val: '142 kg', color: 'text-emerald-400' },
            { label: 'Acceptance Rate', val: '98%', color: 'text-emerald-500' },
            { label: 'Cancellation Rate', val: '0.8%', color: 'text-slate-500' }
          ].map((kpi, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => addToast?.(`${kpi.label}: ${kpi.val}`, 'info')}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-amber-500/40 cursor-pointer active:scale-95 transition text-left"
            >
              <span className="text-[10px] text-slate-400 font-bold uppercase block">{kpi.label}</span>
              <strong className={`text-base font-black font-mono mt-1 block ${kpi.color}`}>{kpi.val}</strong>
            </button>
          ))}
        </div>
      </div>


      {/* ========================================================================= */}
      {/* 19. NOTIFICATIONS BAR CARDS (Page 34 PDF Notifications)                    */}
      {/* ========================================================================= */}
      <div className="space-y-3">
        <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">Recent Activity &amp; Notifications</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <button
            type="button"
            onClick={() => { setSelectedOrder(orders[0]); setActiveModal('earningsDetails'); }}
            className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 flex items-center gap-3 cursor-pointer active:scale-95 transition text-left"
          >
            <DollarSign size={18} className="text-emerald-500 shrink-0" />
            <div>
              <strong className="block text-xs">Payment Credited</strong>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">₹1,450 credited to wallet today</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => addToast?.('Peak Hour Incentive details: ₹300 bonus added to wallet', 'success')}
            className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center gap-3 cursor-pointer active:scale-95 transition text-left"
          >
            <Award size={18} className="text-amber-500 shrink-0" />
            <div>
              <strong className="block text-xs">Bonus Received</strong>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">+₹300 Peak Hour Incentive unlocked</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => { setSelectedOrder(orders[0]); setActiveModal('feedback'); }}
            className="p-3.5 rounded-2xl bg-sky-500/10 border border-sky-500/20 hover:bg-sky-500/20 text-sky-700 dark:text-sky-300 flex items-center gap-3 cursor-pointer active:scale-95 transition text-left"
          >
            <Star size={18} className="text-amber-400 shrink-0" />
            <div>
              <strong className="block text-xs">Customer Rated</strong>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">5.0 ★ rating received for DEL-98419</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => { setSelectedOrder(orders[0]); setActiveModal('invoice'); }}
            className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 text-purple-700 dark:text-purple-300 flex items-center gap-3 cursor-pointer active:scale-95 transition text-left"
          >
            <FileText size={18} className="text-purple-500 shrink-0" />
            <div>
              <strong className="block text-xs">Report Generated</strong>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">Monthly Tax Invoice statement ready</span>
            </div>
          </button>
        </div>
      </div>


      {/* ========================================================================= */}
      {/* INTERACTIVE POPUPS & MODALS                                               */}
      {/* ========================================================================= */}

      {selectedOrder && activeModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">

          {/* 7. ORDER DETAILS POPUP MODAL (Page 29 PDF) */}
          {activeModal === 'details' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-3xl w-full shadow-2xl space-y-6 text-xs sa-rise my-8">
              <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-extrabold text-amber-500 uppercase tracking-widest block">Full Delivery Information</span>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <Truck size={20} className="text-amber-500" /> Order Details: {selectedOrder.id}
                  </h3>
                </div>
                <button type="button" onClick={() => setActiveModal(null)} className="text-slate-400 font-bold p-1 hover:text-slate-600 cursor-pointer active:scale-95 transition">
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Pickup Details */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                  <h4 className="font-black text-slate-900 dark:text-white text-xs uppercase flex items-center gap-1.5 text-amber-500">
                    <MapPin size={14} /> Pickup Store Details
                  </h4>
                  <div className="flex justify-between"><span className="text-slate-400">Store Name:</span><strong className="text-slate-900 dark:text-white">{selectedOrder.storeName}</strong></div>
                  <div className="flex justify-between"><span className="text-slate-400">Address:</span><strong className="text-slate-900 dark:text-white truncate max-w-[180px]">{selectedOrder.storeAddress}</strong></div>
                  <div className="flex justify-between"><span className="text-slate-400">Manager:</span><strong className="text-slate-900 dark:text-white">{selectedOrder.storeManager}</strong></div>
                  <div className="flex justify-between"><span className="text-slate-400">Phone:</span><strong className="font-mono text-slate-900 dark:text-white">{selectedOrder.storePhone}</strong></div>
                </div>

                {/* Drop Details */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                  <h4 className="font-black text-slate-900 dark:text-white text-xs uppercase flex items-center gap-1.5 text-emerald-500">
                    <MapPin size={14} /> Drop Customer Details
                  </h4>
                  <div className="flex justify-between"><span className="text-slate-400">Customer Name:</span><strong className="text-slate-900 dark:text-white">{selectedOrder.customer}</strong></div>
                  <div className="flex justify-between"><span className="text-slate-400">Phone:</span><strong className="font-mono text-slate-900 dark:text-white">{selectedOrder.customerPhone}</strong></div>
                  <div className="flex justify-between"><span className="text-slate-400">Drop Address:</span><strong className="text-slate-900 dark:text-white truncate max-w-[180px]">{selectedOrder.address}</strong></div>
                  <div className="flex justify-between"><span className="text-slate-400">Landmark:</span><strong className="text-slate-900 dark:text-white">{selectedOrder.landmark}</strong></div>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                <h4 className="font-black text-slate-900 dark:text-white text-xs uppercase">Order Items ({selectedOrder.items})</h4>
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
                  {selectedOrder.itemsList.map((item, idx) => (
                    <div key={idx} className="p-2.5 flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-800 dark:text-slate-200">{item.name} × {item.qty}</span>
                      <span className="font-mono font-black text-slate-900 dark:text-white">₹{item.price * item.qty}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 8. Vertical Progress Timeline */}
              <div className="space-y-2">
                <h4 className="font-black text-slate-900 dark:text-white text-xs uppercase">Delivery Workflow Timeline</h4>
                <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-[11px] overflow-x-auto">
                  {selectedOrder.timeline.map((st, idx) => (
                    <div key={idx} className="flex items-center gap-2 shrink-0">
                      <div className="flex flex-col items-center">
                        <CheckCircle2 size={16} className="text-emerald-500" />
                        <span className="font-extrabold text-slate-900 dark:text-white text-[10px] mt-1">{st.step}</span>
                        <span className="text-[9px] font-mono text-slate-400">{st.time}</span>
                      </div>
                      {idx < selectedOrder.timeline.length - 1 && <div className="w-8 h-0.5 bg-emerald-500" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* 11. Earnings Breakdown */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                <h4 className="font-black text-amber-500 text-xs uppercase">Earnings Breakdown</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-bold">
                  <div><span className="text-slate-400 block">Base Fare:</span> ₹{selectedOrder.baseFare}</div>
                  <div><span className="text-slate-400 block">Distance Fare:</span> ₹{selectedOrder.distanceFare}</div>
                  <div><span className="text-slate-400 block">Peak Bonus:</span> ₹{selectedOrder.bonus}</div>
                  <div><span className="text-slate-400 block">Customer Tip:</span> ₹{selectedOrder.tip}</div>
                </div>
                <div className="pt-2 border-t border-amber-500/20 flex justify-between font-black text-sm text-slate-900 dark:text-white">
                  <span>Total Delivery Earnings:</span>
                  <strong className="font-mono text-amber-500 text-base">₹{selectedOrder.totalEarnings}</strong>
                </div>
              </div>

              {/* 13. Rider Editable Notes */}
              <div className="space-y-2">
                <h4 className="font-black text-slate-900 dark:text-white text-xs uppercase flex items-center justify-between">
                  <span>Rider Delivery Notes</span>
                  <button type="button" onClick={handleSaveRiderNotes} className="text-amber-500 hover:underline flex items-center gap-1 font-bold cursor-pointer active:scale-95 transition">
                    <Save size={12} /> Save Notes
                  </button>
                </h4>
                <textarea
                  value={riderNotesText}
                  onChange={(e) => setRiderNotesText(e.target.value)}
                  rows={2}
                  placeholder="Add notes about this delivery..."
                  className="w-full p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setActiveModal(null)} className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-extrabold cursor-pointer active:scale-95 transition">
                  Close
                </button>
              </div>
            </div>
          )}

          {/* 9. PROOF OF DELIVERY MODAL (Page 30 PDF) */}
          {activeModal === 'proof' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs sa-rise">
              <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck size={18} className="text-emerald-500" /> Proof of Delivery (POD)
                </h3>
                <button type="button" onClick={() => setActiveModal(null)} className="text-slate-400 font-bold p-1 cursor-pointer active:scale-95 transition"><X size={18} /></button>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Delivery Photo</span>
                  <img src={selectedOrder.deliveryPhoto} alt="Delivery Photo" className="w-full h-40 object-cover rounded-2xl border border-slate-200 dark:border-slate-800" />
                </div>

                <div className="flex justify-between items-center p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 font-bold">Customer Signature:</span>
                  <strong className="font-serif italic text-base text-amber-500">{selectedOrder.signature}</strong>
                </div>

                <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-400 block text-[9px] font-sans">Verified OTP</span>
                    <strong className="text-emerald-500 font-black text-sm">{selectedOrder.otp}</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-400 block text-[9px] font-sans">QR Scan</span>
                    <strong className="text-emerald-500 font-black text-xs">VERIFIED ✓</strong>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[10px] text-slate-400 font-mono">
                  GPS Tag: {selectedOrder.gps} • {selectedOrder.completionTime}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button type="button" onClick={() => setActiveModal(null)} className="px-5 py-2 rounded-xl bg-slate-900 text-white font-extrabold cursor-pointer active:scale-95 transition">
                  Done
                </button>
              </div>
            </div>
          )}

          {/* 10. MAP ROUTE HISTORY MODAL (Page 31 PDF) */}
          {activeModal === 'route' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 text-xs sa-rise">
              <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Navigation size={18} className="text-amber-500" /> Route History &amp; GPS Log
                </h3>
                <button type="button" onClick={() => setActiveModal(null)} className="text-slate-400 font-bold p-1 cursor-pointer active:scale-95 transition"><X size={18} /></button>
              </div>

              {/* Map Placeholder Graphic */}
              <div className="relative h-48 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center overflow-hidden text-center p-4">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="relative z-10 space-y-2">
                  <Navigation size={32} className="text-amber-500 mx-auto animate-pulse" />
                  <p className="font-extrabold text-white">Route Taken: {selectedOrder.route.routeName}</p>
                  <p className="text-[10px] text-slate-400">Patna Delivery Zone • Distance: {selectedOrder.distance}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 font-mono text-[11px] text-center">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-sans block">Distance</span>
                  <strong className="text-slate-900 dark:text-white font-black">{selectedOrder.distance}</strong>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-sans block">Travel Time</span>
                  <strong className="text-slate-900 dark:text-white font-black">{selectedOrder.duration}</strong>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-sans block">Avg Speed</span>
                  <strong className="text-amber-500 font-black">{selectedOrder.route.speed}</strong>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button type="button" onClick={() => setActiveModal(null)} className="px-5 py-2 rounded-xl bg-slate-900 text-white font-extrabold cursor-pointer active:scale-95 transition">
                  Close Map
                </button>
              </div>
            </div>
          )}

          {/* 12. CUSTOMER RATING & FEEDBACK MODAL (Page 32 PDF) */}
          {activeModal === 'feedback' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs sa-rise">
              <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Star size={18} className="fill-amber-400 text-amber-400" /> Customer Feedback &amp; Review
                </h3>
                <button type="button" onClick={() => setActiveModal(null)} className="text-slate-400 font-bold p-1 cursor-pointer active:scale-95 transition"><X size={18} /></button>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center space-y-1">
                  <span className="text-xs font-bold text-slate-500 block">Customer Rating Given</span>
                  <div className="flex items-center justify-center gap-1 text-amber-400 text-xl font-black">
                    ★★★★★ <span className="text-slate-900 dark:text-white font-mono text-base font-black ml-1">{selectedOrder.rating} / 5.0</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Customer Review Note</span>
                  <p className="text-slate-800 dark:text-slate-200 italic font-medium text-xs">
                    "{selectedOrder.feedback}"
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button type="button" onClick={() => setActiveModal(null)} className="px-5 py-2 rounded-xl bg-slate-900 text-white font-extrabold cursor-pointer active:scale-95 transition">
                  Close Review
                </button>
              </div>
            </div>
          )}

          {/* SUPPORT TICKET & REPORT DISPUTE MODAL (Page 34 PDF) */}
          {activeModal === 'ticket' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs sa-rise">
              <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <AlertTriangle size={18} className="text-rose-500" /> Reopen Ticket / Report Issue
                </h3>
                <button type="button" onClick={() => setActiveModal(null)} className="text-slate-400 font-bold p-1 cursor-pointer active:scale-95 transition"><X size={18} /></button>
              </div>

              <form onSubmit={handleRaiseTicket} className="space-y-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Select Issue Category</label>
                  <select
                    value={issueReason}
                    onChange={(e) => setIssueReason(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 dark:text-slate-200"
                  >
                    <option value="Payment Issue">Payment / Payout Discrepancy</option>
                    <option value="Customer Not Available">Customer Not Available</option>
                    <option value="Wrong Address">Wrong Drop Location</option>
                    <option value="Store Closed">Store Was Closed</option>
                    <option value="Item Missing">Item Missing in Parcel</option>
                    <option value="App Bug">Dashboard / App Bug</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Issue Details</label>
                  <textarea
                    rows={3}
                    value={issueComment}
                    onChange={(e) => setIssueComment(e.target.value)}
                    placeholder="Describe the issue regarding this delivery..."
                    className="w-full p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 font-extrabold cursor-pointer active:scale-95 transition">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold cursor-pointer shadow active:scale-95 transition">
                    Submit Ticket
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* EARNINGS DETAILS MODAL (Page 31 PDF) */}
          {activeModal === 'earningsDetails' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs sa-rise">
              <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <DollarSign size={18} className="text-amber-500" /> Full Earnings Breakdown (Page 31)
                </h3>
                <button type="button" onClick={() => setActiveModal(null)} className="text-slate-400 font-bold p-1 cursor-pointer active:scale-95 transition"><X size={18} /></button>
              </div>

              <div className="space-y-2 text-slate-700 dark:text-slate-300 font-mono text-[11px]">
                <div className="flex justify-between"><span>Base Fare:</span><span>₹80</span></div>
                <div className="flex justify-between"><span>Distance Allowance:</span><span>₹20</span></div>
                <div className="flex justify-between"><span>Peak Hour Bonus:</span><span>₹15</span></div>
                <div className="flex justify-between"><span>Customer Tip:</span><span>₹30</span></div>
                <div className="flex justify-between"><span>Fuel Incentive:</span><span>₹10</span></div>
                <div className="flex justify-between text-slate-400"><span>Penalty:</span><span>₹0</span></div>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between font-black text-sm text-slate-900 dark:text-white">
                  <span>Total Calculated Payout:</span>
                  <span className="text-amber-500 font-bold">₹155</span>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button type="button" onClick={() => setActiveModal(null)} className="px-5 py-2 rounded-xl bg-slate-900 text-white font-extrabold cursor-pointer active:scale-95 transition">
                  Close Breakdown
                </button>
              </div>
            </div>
          )}

          {/* INVOICE MODAL */}
          {activeModal === 'invoice' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs sa-rise">
              <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <FileText size={18} className="text-emerald-500" /> Delivery Tax Invoice: {selectedOrder.id}
                </h3>
                <button type="button" onClick={() => setActiveModal(null)} className="text-slate-400 font-bold p-1 cursor-pointer active:scale-95 transition"><X size={18} /></button>
              </div>

              <div className="space-y-2 text-slate-700 dark:text-slate-300 font-mono text-[11px]">
                <div className="flex justify-between"><span>Base Delivery Fee:</span><span>₹{selectedOrder.baseFare}</span></div>
                <div className="flex justify-between"><span>Distance Allowance:</span><span>₹{selectedOrder.distanceFare}</span></div>
                <div className="flex justify-between"><span>Peak Hour Bonus:</span><span>₹{selectedOrder.bonus}</span></div>
                <div className="flex justify-between"><span>Customer Tip:</span><span>₹{selectedOrder.tip}</span></div>
                <div className="flex justify-between"><span>Fuel Incentive:</span><span>₹{selectedOrder.fuelIncentive}</span></div>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between font-black text-sm text-slate-900 dark:text-white">
                  <span>Total Net Payout:</span>
                  <span className="text-amber-500 font-bold">₹{selectedOrder.totalEarnings}</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => addToast?.('Invoice downloaded as PDF', 'success')} className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-black cursor-pointer active:scale-95 transition">
                  Download Invoice PDF
                </button>
                <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 rounded-xl bg-slate-800 text-white font-extrabold cursor-pointer active:scale-95 transition">
                  Close
                </button>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
