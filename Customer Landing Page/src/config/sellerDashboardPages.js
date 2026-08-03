export const DASHBOARD_SECTIONS = {
  orders: {
    title: 'Orders',
    subtitle: 'Manage and fulfill customer orders',
    stats: [
      { label: 'Pending', value: '12' },
      { label: 'Processing', value: '8' },
      { label: 'Delivered', value: '156' },
      { label: 'Cancelled', value: '3' },
    ],
    table: {
      headers: ['Order ID', 'Customer', 'Items', 'Amount', 'Status', 'Date'],
      rows: [
        ['#SA-1042', 'Rahul Sharma', '3 items', '₹1,250', 'Pending', 'Today'],
        ['#SA-1041', 'Priya Patel', '1 item', '₹890', 'Processing', 'Today'],
        ['#SA-1040', 'Amit Kumar', '5 items', '₹3,420', 'Delivered', 'Yesterday'],
        ['#SA-1039', 'Sneha Reddy', '2 items', '₹650', 'Delivered', 'Yesterday'],
        ['#SA-1038', 'Vikram Singh', '1 item', '₹2,100', 'Cancelled', '2 days ago'],
      ],
    },
  },
  products: {
    title: 'Products',
    subtitle: 'Manage your product catalog',
    stats: [
      { label: 'Active', value: '48' },
      { label: 'Draft', value: '5' },
      { label: 'Out of Stock', value: '3' },
      { label: 'Total Views', value: '2.4K' },
    ],
    table: {
      headers: ['Product', 'SKU', 'Price', 'Stock', 'Status', 'Category'],
      rows: [
        ['Organic Mangoes (1kg)', 'MNG-001', '₹120', '45', 'Active', 'Grocery'],
        ['Basmati Rice 5kg', 'RCE-002', '₹450', '28', 'Active', 'Grocery'],
        ['Fresh Milk 1L', 'MLK-003', '₹65', '0', 'Out of Stock', 'Dairy'],
        ['Whole Wheat Flour', 'FLR-004', '₹55', '120', 'Active', 'Grocery'],
        ['Premium Tea 250g', 'TEA-005', '₹180', '15', 'Draft', 'Beverages'],
      ],
    },
    actions: [{ label: 'Add Product', variant: 'primary' }],
  },
  inventory: {
    title: 'Inventory',
    subtitle: 'Track stock levels and warehouse inventory',
    stats: [
      { label: 'Total SKUs', value: '56' },
      { label: 'Low Stock', value: '7' },
      { label: 'Warehouse Items', value: '234' },
      { label: 'Reorder Alerts', value: '4' },
    ],
    table: {
      headers: ['SKU', 'Product', 'Store Stock', 'Warehouse', 'Reorder Level', 'Status'],
      rows: [
        ['MNG-001', 'Organic Mangoes', '45', '200', '20', 'In Stock'],
        ['RCE-002', 'Basmati Rice', '28', '150', '30', 'In Stock'],
        ['MLK-003', 'Fresh Milk', '0', '50', '25', 'Low Stock'],
        ['FLR-004', 'Wheat Flour', '120', '80', '40', 'In Stock'],
        ['TEA-005', 'Premium Tea', '15', '0', '10', 'Low Stock'],
      ],
    },
  },
  customers: {
    title: 'Customers',
    subtitle: 'View and manage your customer database',
    stats: [
      { label: 'Total Customers', value: '342' },
      { label: 'Repeat Buyers', value: '128' },
      { label: 'New This Month', value: '45' },
      { label: 'Avg. Order Value', value: '₹780' },
    ],
    table: {
      headers: ['Name', 'Phone', 'Orders', 'Total Spent', 'Last Order', 'Status'],
      rows: [
        ['Rahul Sharma', '+91 98765 43210', '12', '₹14,200', 'Today', 'Active'],
        ['Priya Patel', '+91 87654 32109', '8', '₹9,450', 'Today', 'Active'],
        ['Amit Kumar', '+91 76543 21098', '15', '₹22,100', 'Yesterday', 'VIP'],
        ['Sneha Reddy', '+91 65432 10987', '3', '₹2,800', '3 days ago', 'Active'],
        ['Vikram Singh', '+91 54321 09876', '1', '₹650', '1 week ago', 'New'],
      ],
    },
  },
  marketing: {
    title: 'Marketing',
    subtitle: 'Promotions, campaigns, and customer engagement',
    stats: [
      { label: 'Active Campaigns', value: '3' },
      { label: 'Coupons Used', value: '89' },
      { label: 'Reach', value: '5.2K' },
      { label: 'Conversion', value: '4.2%' },
    ],
    cards: [
      { title: 'Summer Sale', desc: '20% off on grocery items', status: 'Active' },
      { title: 'New Customer Offer', desc: '₹100 off first order', status: 'Active' },
      { title: 'Festival Special', desc: 'Buy 2 Get 1 Free', status: 'Scheduled' },
    ],
  },
  analytics: {
    title: 'Analytics',
    subtitle: 'Business insights and performance metrics',
    stats: [
      { label: 'Revenue (MTD)', value: '₹1.2L' },
      { label: 'Orders (MTD)', value: '186' },
      { label: 'Conversion Rate', value: '3.8%' },
      { label: 'Avg. Rating', value: '4.6★' },
    ],
    chart: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      values: [4200, 5100, 4800, 6200, 7500, 8900, 6800],
    },
  },
  wallet: {
    title: 'Wallet',
    subtitle: 'Balance, settlements, and transactions',
    stats: [
      { label: 'Available Balance', value: '₹24,580' },
      { label: 'Pending Settlement', value: '₹8,420' },
      { label: 'This Month', value: '₹1.2L' },
      { label: 'Withdrawals', value: '₹45,000' },
    ],
    table: {
      headers: ['Transaction', 'Type', 'Amount', 'Status', 'Date'],
      rows: [
        ['Settlement #SET-892', 'Credit', '+₹8,420', 'Completed', 'Today'],
        ['Withdrawal #WDR-156', 'Debit', '-₹15,000', 'Completed', 'Yesterday'],
        ['Order #SA-1040', 'Credit', '+₹3,420', 'Completed', 'Yesterday'],
        ['Commission', 'Debit', '-₹274', 'Completed', 'Yesterday'],
        ['Settlement #SET-891', 'Credit', '+₹12,100', 'Completed', '3 days ago'],
      ],
    },
    actions: [{ label: 'Withdraw Funds', variant: 'primary' }],
  },
  payments: {
    title: 'Payments',
    subtitle: 'Payment history and settlement details',
    stats: [
      { label: 'Total Received', value: '₹2.4L' },
      { label: 'Pending', value: '₹8,420' },
      { label: 'Refunds', value: '₹1,200' },
      { label: 'Commission Paid', value: '₹18,400' },
    ],
    table: {
      headers: ['Payment ID', 'Order', 'Method', 'Amount', 'Status', 'Date'],
      rows: [
        ['PAY-78234', '#SA-1042', 'UPI', '₹1,250', 'Pending', 'Today'],
        ['PAY-78233', '#SA-1041', 'Card', '₹890', 'Success', 'Today'],
        ['PAY-78232', '#SA-1040', 'COD', '₹3,420', 'Settled', 'Yesterday'],
        ['PAY-78231', '#SA-1039', 'UPI', '₹650', 'Settled', 'Yesterday'],
        ['PAY-78230', '#SA-1038', 'Wallet', '₹2,100', 'Refunded', '2 days ago'],
      ],
    },
  },
  invoices: {
    title: 'Invoices',
    subtitle: 'GST invoices and billing documents',
    stats: [
      { label: 'Total Invoices', value: '186' },
      { label: 'This Month', value: '42' },
      { label: 'GST Collected', value: '₹12,400' },
      { label: 'Pending', value: '3' },
    ],
    table: {
      headers: ['Invoice #', 'Customer', 'Amount', 'GST', 'Status', 'Date'],
      rows: [
        ['INV-2026-042', 'Rahul Sharma', '₹1,250', '₹225', 'Paid', 'Today'],
        ['INV-2026-041', 'Priya Patel', '₹890', '₹160', 'Paid', 'Today'],
        ['INV-2026-040', 'Amit Kumar', '₹3,420', '₹616', 'Paid', 'Yesterday'],
        ['INV-2026-039', 'Sneha Reddy', '₹650', '₹117', 'Pending', 'Yesterday'],
        ['INV-2026-038', 'Vikram Singh', '₹2,100', '₹378', 'Cancelled', '2 days ago'],
      ],
    },
    actions: [{ label: 'Create Invoice', variant: 'primary' }],
  },
  reports: {
    title: 'Reports',
    subtitle: 'Sales, profit & loss, and business reports',
    stats: [
      { label: 'Reports Generated', value: '24' },
      { label: 'Last Report', value: 'Today' },
      { label: 'Profit Margin', value: '18.5%' },
      { label: 'Top Category', value: 'Grocery' },
    ],
    cards: [
      { title: 'Monthly Sales Report', desc: 'Revenue, orders, and trends', status: 'Ready' },
      { title: 'Profit & Loss', desc: 'Income vs expenses analysis', status: 'Ready' },
      { title: 'Inventory Report', desc: 'Stock levels and movement', status: 'Generate' },
      { title: 'Tax Summary', desc: 'GST and tax compliance', status: 'Ready' },
    ],
  },
  coupons: {
    title: 'Coupons',
    subtitle: 'Create and manage discount coupons',
    stats: [
      { label: 'Active Coupons', value: '5' },
      { label: 'Used Today', value: '12' },
      { label: 'Total Savings', value: '₹4,200' },
      { label: 'Conversion', value: '8.5%' },
    ],
    table: {
      headers: ['Code', 'Discount', 'Min Order', 'Uses', 'Expires', 'Status'],
      rows: [
        ['SUMMER20', '20% off', '₹500', '45/100', 'Aug 31', 'Active'],
        ['NEW100', '₹100 off', '₹300', '89/200', 'Sep 15', 'Active'],
        ['FESTIVAL', '15% off', '₹1,000', '12/50', 'Oct 5', 'Active'],
        ['VIP50', '₹50 off', '₹200', '200/200', 'Jul 30', 'Expired'],
        ['WELCOME', '10% off', '₹0', '156/∞', '—', 'Active'],
      ],
    },
    actions: [{ label: 'Create Coupon', variant: 'primary' }],
  },
  advertisements: {
    title: 'Advertisements',
    subtitle: 'Promote your store and products',
    stats: [
      { label: 'Active Ads', value: '2' },
      { label: 'Impressions', value: '12.4K' },
      { label: 'Clicks', value: '486' },
      { label: 'CTR', value: '3.9%' },
    ],
    cards: [
      { title: 'Store Banner — Homepage', desc: 'Featured store placement', status: 'Active' },
      { title: 'Product Spotlight', desc: 'Organic Mangoes promotion', status: 'Active' },
      { title: 'Category Banner', desc: 'Grocery section featured', status: 'Paused' },
    ],
    actions: [{ label: 'Create Ad', variant: 'primary' }],
  },
  settings: {
    title: 'Store Settings',
    subtitle: 'Configure your store profile and preferences',
    form: [
      { label: 'Store Name', value: 'Fresh Grocery Mart', type: 'text' },
      { label: 'Business Email', value: 'store@example.com', type: 'email' },
      { label: 'Phone', value: '+91 98765 43210', type: 'tel' },
      { label: 'Store Description', value: 'Your neighborhood grocery store with fresh produce.', type: 'textarea' },
      { label: 'Operating Hours', value: '9:00 AM - 9:00 PM', type: 'text' },
    ],
  },
  documents: {
    title: 'Documents',
    subtitle: 'Business documents and compliance files',
    table: {
      headers: ['Document', 'Type', 'Uploaded', 'Status', 'Action'],
      rows: [
        ['Aadhaar Card', 'KYC', 'Jan 15, 2026', 'Verified', 'View'],
        ['PAN Card', 'KYC', 'Jan 15, 2026', 'Verified', 'View'],
        ['GST Certificate', 'Tax', 'Jan 16, 2026', 'Verified', 'View'],
        ['Shop License', 'Business', 'Jan 16, 2026', 'Pending', 'View'],
        ['Cancelled Cheque', 'Bank', 'Jan 15, 2026', 'Verified', 'View'],
      ],
    },
    actions: [{ label: 'Upload Document', variant: 'primary' }],
  },
  support: {
    title: 'Support',
    subtitle: 'Get help from SAATHAPP seller support',
    cards: [
      { title: 'Open Ticket', desc: 'Create a new support request', status: 'Action' },
      { title: 'Live Chat', desc: 'Chat with support team', status: 'Available' },
      { title: 'Knowledge Base', desc: 'Browse help articles', status: 'Browse' },
    ],
    table: {
      headers: ['Ticket #', 'Subject', 'Priority', 'Status', 'Updated'],
      rows: [
        ['TKT-1042', 'Payment settlement delay', 'High', 'Open', 'Today'],
        ['TKT-1038', 'Product listing issue', 'Medium', 'Resolved', '3 days ago'],
        ['TKT-1035', 'GST invoice format', 'Low', 'Closed', '1 week ago'],
      ],
    },
    actions: [{ label: 'New Ticket', variant: 'primary' }],
  },
};
