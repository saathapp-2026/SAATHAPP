with open('./src/components/wholesale/dashboard/OrdersTab.jsx', 'r') as f:
    content = f.read()

mock_data = """export const MOCK_FULL_ORDERS = [
  { id: 'ORD-SA-2026-8001', buyer: 'SuperMart Delhi', category: 'Groceries', status: 'Pending', payment: 'Awaiting', total: '₹ 45,000', items: 120, date: '29 Aug 2026' },
  { id: 'ORD-SA-2026-8002', buyer: 'Metro Retail', category: 'Electronics', status: 'Accepted', payment: 'Paid', total: '₹ 1,20,000', items: 45, date: '28 Aug 2026' },
  { id: 'ORD-SA-2026-8003', buyer: 'Fresh Farm Hub', category: 'Groceries', status: 'Delivered', payment: 'Paid', total: '₹ 32,500', items: 200, date: '25 Aug 2026' },
  { id: 'ORD-SA-2026-8004', buyer: 'Tech Store Bangalore', category: 'Electronics', status: 'Cancelled', payment: 'Refunded', total: '₹ 55,000', items: 10, date: '24 Aug 2026' }
];"""

content = content.replace("export const MOCK_FULL_ORDERS = [];", mock_data)

with open('./src/components/wholesale/dashboard/OrdersTab.jsx', 'w') as f:
    f.write(content)
