with open('./src/components/professional/CustomerTable.jsx', 'r') as f:
    content = f.read()

mock_data = """  const customers = [
    { name: 'Amit Sharma', phone: '9876543210', location: 'Andheri West, Mumbai', jobs: 12, rating: 4.8, repeat: true, totalSpending: 4500, lastBooking: '12 Aug 2026', completedServices: 10 },
    { name: 'Priya Singh', phone: '8765432109', location: 'Bandra East, Mumbai', jobs: 3, rating: 4.5, repeat: false, totalSpending: 1200, lastBooking: '20 Jul 2026', completedServices: 3 },
    { name: 'Rahul Desai', phone: '7654321098', location: 'Koramangala, Bangalore', jobs: 25, rating: 5.0, repeat: true, totalSpending: 15000, lastBooking: '25 Aug 2026', completedServices: 22 },
    { name: 'Sneha Gupta', phone: '6543210987', location: 'Indiranagar, Bangalore', jobs: 1, rating: 4.0, repeat: false, totalSpending: 400, lastBooking: '15 Jun 2026', completedServices: 1 },
    { name: 'Vikram Mehta', phone: '9988776655', location: 'Vasant Kunj, Delhi', jobs: 8, rating: 4.2, repeat: true, totalSpending: 3200, lastBooking: '02 Aug 2026', completedServices: 7 },
  ];"""

content = content.replace("  const customers = [];", mock_data)

with open('./src/components/professional/CustomerTable.jsx', 'w') as f:
    f.write(content)
