# SaathApp: Unified E-Commerce Architecture

SaathApp is a unified frontend prototype simulating a multi-vertical e-commerce platform. It demonstrates a seamless shopping experience combining Grocery, Electronics, and Spiritual/Puja items into a single, cohesive user journey, managed by a centralized Admin dashboard.

Since this is a frontend-only prototype, **Local Storage** (`window.localStorage`) serves as the mock database and synchronization bridge between the Customer App and the Admin Dashboard.

## Core Pillars

1. **Unified Cart & Checkout**: Users can add products from vastly different verticals (e.g., Premium Grocery and Electronics) into a single cart and check out in one transaction.
2. **Cross-Vertical Isolation**: Despite sharing a single cart and order schema, vertical-specific metadata (e.g., `groceryTier`, `electronicsType`) is strictly isolated and validated.
3. **Admin ↔ Customer Sync**: Real-time (refresh-based) synchronization of Products, Orders, Inventory, and Analytics between the Admin and Customer portals.

---

## 1. Directory Structure

The repository is split into two primary React applications:

```text
SAATHAPP/
├── Admin page/                 # React App (Vite/Tailwind)
│   └── src/App.jsx             # Admin Dashboard, Modules, and Analytics
└── Customer Landing Page/      # React App (Vite/Tailwind)
    ├── src/
    │   ├── App.jsx             # Main Router & Checkout orchestration
    │   ├── context/            # CartContext (Centralized State)
    │   ├── data/               # Mock data & Admin Sync parsers
    │   ├── pages/              # Vertical Pages, Cart, Checkout
    │   └── utils/              # Cart Calculations & Analytics
```

---

## 2. LocalStorage Sync Bridge (The Mock DB)

The platform relies on specific `localStorage` keys to share state between the two applications:

### `saathapp_admin_products`
- **Writer**: Admin Dashboard (`MODULE_FORMS.products.toRow`)
- **Reader**: Customer App (`src/data/products.js`)
- **Purpose**: Defines the source of truth for the catalog. The Customer app parses this on load, dynamically merging it with local mock data, hiding `Pending`/`Rejected` products, and injecting new `Active` ones.

### `saathapp_customer_orders`
- **Writer**: Customer App (`handleCheckoutProcess`)
- **Reader**: Admin Dashboard (`AnalyticsDashboard`)
- **Purpose**: Powers the revenue, order count, and AOV metrics on the Admin dashboard.

### `saathapp_admin_orders`
- **Writer**: Customer App (`handleCheckoutProcess`)
- **Reader**: Admin Dashboard (`MODULES.orders`)
- **Purpose**: Feeds the exact line-item order data back into the Admin's live Order Tracking table. Includes deep JSON metadata (`itemsJson`, `breakdownJson`) for vertical-specific details.

### `saathapp_analytics_events`
- **Writer**: Customer App (`trackEvent` utility)
- **Reader**: Admin Dashboard (`AnalyticsDashboard`)
- **Purpose**: Tracks granular user behavior (`product_view`, `add_to_cart`, `checkout`, `purchase`) with full vertical metadata attached for conversion rate and funnel analysis.

---

## 3. Cart & Checkout Orchestration

### CartContext (`src/context/CartContext.jsx`)
The single source of truth for the user's active cart session.
- Validates inventory limits (`maxStock`).
- Automatically prunes items when quantity drops to 0.
- Persists instantly to `saathapp_cart` so the cart survives page reloads.

### Calculation Engine (`src/utils/cartUtils.js`)
Centralizes all financial math:
- Base subtotals.
- Vertical-specific promotions (e.g., `PREMIUM_GROCERY_DEAL`).
- Membership discounts (SaathApp Plus 5% flat off).
- Coupon code thresholds (`SAATH50`, `PLUS10`).
- Delivery fees (Express vs. Standard waivers).

### The Unified Checkout (`handleCheckoutProcess`)
Located in `Customer Landing Page/src/App.jsx`. When a user clicks **Confirm & Pay**, this function executes the "Big Bang" transaction:
1. Validates the final cart payload.
2. In-memory and LocalStorage inventory deduction (syncing back to `saathapp_admin_products`).
3. Order object creation and dispatch to both `saathapp_customer_orders` and `saathapp_admin_orders`.
4. Dispatches the final `checkout` and `purchase` analytics events.
5. Clears the cart context.

---

## 4. Cross-Vertical Data Isolation

To prevent messy data leaks (e.g., a bag of apples accidentally retaining a "Warranty" field from its time as a mock Electronic item), the Admin `toRow` function enforces strict structural typing:

```javascript
// Admin page/src/App.jsx
if (cleanValues.productTier === 'NORMAL') {
  delete cleanValues.productionQuantity;
  // ... deletes premium fields
}
if (cleanValues.category?.toLowerCase() !== 'grocery') {
  delete cleanValues.groceryTier;
}
```

This ensures that whenever an Admin alters a category or tier, the underlying JSON payload is fully sanitized before hitting the Customer portal. Invalid promotions are similarly stripped out during the Customer App's data hydration phase.
