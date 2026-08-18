# SaathApp

SaathApp is a next-generation unified e-commerce platform demonstrating how multiple isolated retail verticals (Grocery, Electronics, and Spiritual/Puja) can coexist in a single, frictionless user journey. 

This repository contains the frontend prototypes for both the **Customer Portal** and the **Admin Dashboard**, functioning entirely without a traditional backend by utilizing cross-tab `localStorage` synchronization.

## Features

- **Multi-Vertical Shopping**: Add organic apples, wireless earbuds, and brass puja idols into the exact same cart.
- **Unified Checkout**: A single 4-step checkout flow (Address → Delivery → Payment → Review) handles the complexity of fulfilling diverse items.
- **SaathApp Plus**: Native subscription tier providing sitewide benefits, free express delivery, and flat percentage discounts calculated centrally.
- **Dynamic Admin Dashboard**: Real-time management of catalog, inventory, analytics, and order tracking.
- **Local Database Simulation**: Zero-setup environment. Open the apps side-by-side and watch edits, inventory deductions, and purchases sync in real-time on refresh.

## Project Structure

```text
SAATHAPP/
├── Admin page/                 # Admin Dashboard (npm run dev)
├── Customer Landing Page/      # Customer Portal (npm run dev)
└── ARCHITECTURE.md             # Deep dive into the data flow and sync logic
```

## Getting Started

Because this is a dual-app setup, you will need to run two separate development servers.

### 1. Start the Admin Dashboard
```bash
cd "Admin page"
npm install
npm run dev
```

### 2. Start the Customer Portal
Open a new terminal window:
```bash
cd "Customer Landing Page"
npm install
npm run dev
```

### 3. Test the Synchronization
1. Open the Admin Dashboard (usually `http://localhost:5173`) and the Customer Portal (usually `http://localhost:5174`) side-by-side.
2. In the Admin Dashboard, navigate to **Products** and create a new item. Set its status to **Active**.
3. Refresh the Customer Portal and search for your new item.
4. Add it to your cart, proceed to checkout, and complete the order.
5. Refresh the Admin Dashboard and observe the **Orders** table, **Analytics** KPIs, and the reduced **Inventory** count on your product.

## Documentation

For a technical breakdown of how the Cart Context, LocalStorage bridges, and Cross-Vertical isolation schemas work, please read the [ARCHITECTURE.md](./ARCHITECTURE.md).
