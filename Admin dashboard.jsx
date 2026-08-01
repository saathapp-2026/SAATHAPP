import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  LayoutDashboard, Users, Store, Wrench, HardHat, Truck, Package, Tag,
  ShoppingCart, Warehouse, CreditCard, Wallet, Percent, Megaphone,
  Headphones, Bell, FileText, BarChart3, ClipboardList, UserCog,
  CheckSquare, MessageSquare, Video, Handshake, ShieldAlert, Sparkles,
  Activity, Plug, ToggleLeft, ScrollText, Settings as SettingsIcon,
  LogOut, Search, Sun, Moon, Globe, ChevronDown, Clock, Mail, Lock,
  Eye, EyeOff, BadgeCheck, ShieldCheck, ArrowUpRight, ArrowDownRight,
  Plus, Download, Filter, MoreHorizontal, TrendingUp, AlertTriangle,
  CheckCircle2, XCircle, Server, Database, Cpu, HardDrive, Zap, MapPin,
  Star, Building2, KeyRound, Smartphone, X, RefreshCw, ChevronRight,
  Menu, PanelLeftClose, ShieldQuestion, Send, LineChart as LineChartIcon
} from "lucide-react";
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

/* ============================================================
   DESIGN TOKENS
   Forest green + azure blue + amber accent, glass surfaces on a
   soft mint-white canvas. Sora for display/numerals, Inter for UI.
============================================================ */
const T = {
  forest: "#0C8B52",
  forestDeep: "#063D26",
  forestMid: "#0A6B40",
  azure: "#1D6FE0",
  amber: "#F2A93B",
  red: "#E2493D",
  paper: "#F4F8F6",
  ink: "#0B1420",
  mint: "#E7F6EE",
};

const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
    .sa-font-display { font-family: 'Sora', ui-sans-serif, system-ui, sans-serif; }
    .sa-font-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
    .sa-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
    .sa-scrollbar::-webkit-scrollbar-thumb { background: rgba(12,139,82,0.25); border-radius: 8px; }
    .sa-scrollbar::-webkit-scrollbar-track { background: transparent; }
    @keyframes sa-rise { from { opacity:0; transform: translateY(10px);} to {opacity:1; transform: translateY(0);} }
    @keyframes sa-fade { from { opacity:0;} to {opacity:1;} }
    @keyframes sa-pulse-ring { 0% { box-shadow: 0 0 0 0 rgba(12,139,82,0.45); } 70% { box-shadow: 0 0 0 8px rgba(12,139,82,0); } 100% { box-shadow: 0 0 0 0 rgba(12,139,82,0); } }
    @keyframes sa-blob { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(30px,-20px) scale(1.08); } 66% { transform: translate(-20px,20px) scale(0.95); } }
    .sa-rise { animation: sa-rise 0.5s ease both; }
    .sa-fade { animation: sa-fade 0.4s ease both; }
    .sa-pulse { animation: sa-pulse-ring 2.2s infinite; }
    .sa-blob { animation: sa-blob 12s ease-in-out infinite; }
    .sa-glass { background: rgba(255,255,255,0.72); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); }
    .sa-num { font-variant-numeric: tabular-nums; }
  `}</style>
);

/* ============================================================
   MOCK DATA
============================================================ */
const revenueSeries = [
  { m: "Jan", revenue: 1820000, orders: 8200 },
  { m: "Feb", revenue: 2010000, orders: 8700 },
  { m: "Mar", revenue: 2240000, orders: 9400 },
  { m: "Apr", revenue: 2105000, orders: 9100 },
  { m: "May", revenue: 2460000, orders: 10200 },
  { m: "Jun", revenue: 2680000, orders: 10800 },
  { m: "Jul", revenue: 2910000, orders: 11500 },
  { m: "Aug", revenue: 3120000, orders: 12100 },
  { m: "Sep", revenue: 3040000, orders: 11900 },
  { m: "Oct", revenue: 3380000, orders: 12750 },
  { m: "Nov", revenue: 3610000, orders: 13300 },
  { m: "Dec", revenue: 3980000, orders: 14100 },
];

const categoryPerf = [
  { name: "Home Services", value: 3245 },
  { name: "Electronics", value: 2870 },
  { name: "Grocery", value: 2231 },
  { name: "Fashion", value: 1987 },
  { name: "Repairs", value: 1540 },
];
const PIE_COLORS = [T.forest, T.azure, T.amber, "#7CC9A8", "#8FB4EE"];

const topCities = [
  { city: "Mumbai", orders: 4210 },
  { city: "Bengaluru", orders: 3860 },
  { city: "Delhi NCR", orders: 3520 },
  { city: "Mysuru", orders: 2140 },
  { city: "Pune", orders: 1980 },
  { city: "Hyderabad", orders: 1870 },
];

const retentionSeries = [
  { m: "Jan", retention: 61 }, { m: "Feb", retention: 63 }, { m: "Mar", retention: 65 },
  { m: "Apr", retention: 64 }, { m: "May", retention: 68 }, { m: "Jun", retention: 71 },
  { m: "Jul", retention: 73 }, { m: "Aug", retention: 75 }, { m: "Sep", retention: 74 },
  { m: "Oct", retention: 77 }, { m: "Nov", retention: 79 }, { m: "Dec", retention: 82 },
];

const recentOrders = [
  { id: "SA-88231", customer: "Ravi Kumar", city: "Mysuru", amount: "₹1,240", status: "Delivered" },
  { id: "SA-88230", customer: "Aisha Fernandes", city: "Mumbai", amount: "₹3,860", status: "Out for Delivery" },
  { id: "SA-88229", customer: "Devendra Rao", city: "Bengaluru", amount: "₹560", status: "Pending" },
  { id: "SA-88228", customer: "Meera Shah", city: "Pune", amount: "₹2,110", status: "Confirmed" },
  { id: "SA-88227", customer: "Arjun Singh", city: "Delhi NCR", amount: "₹980", status: "Cancelled" },
];

const statusTone = {
  Delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Out for Delivery": "bg-blue-50 text-blue-700 border-blue-200",
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Confirmed: "bg-sky-50 text-sky-700 border-sky-200",
  Cancelled: "bg-red-50 text-red-700 border-red-200",
  Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Suspended: "bg-red-50 text-red-700 border-red-200",
  "Pending KYC": "bg-amber-50 text-amber-700 border-amber-200",
  Verified: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Draft: "bg-slate-100 text-slate-600 border-slate-200",
  Open: "bg-amber-50 text-amber-700 border-amber-200",
  Resolved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Escalated: "bg-red-50 text-red-700 border-red-200",
  Online: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Offline: "bg-slate-100 text-slate-600 border-slate-200",
  Live: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Scheduled: "bg-sky-50 text-sky-700 border-sky-200",
  Flagged: "bg-red-50 text-red-700 border-red-200",
};

const Pill = ({ label }) => (
  <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusTone[label] || "bg-slate-100 text-slate-600 border-slate-200"}`}>
    {label}
  </span>
);

/* ============================================================
   NAV CONFIGURATION (drives sidebar + generic module pages)
============================================================ */
const NAV_SECTIONS = [
  {
    label: "Overview",
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { id: "analytics", label: "Analytics", icon: BarChart3 },
      { id: "reports", label: "Reports", icon: ClipboardList },
    ],
  },
  {
    label: "Platform",
    items: [
      { id: "users", label: "Users", icon: Users },
      { id: "sellers", label: "Sellers", icon: Store },
      { id: "professionals", label: "Service Professionals", icon: Wrench },
      { id: "workers", label: "Service Workers", icon: HardHat },
      { id: "delivery", label: "Delivery Partners", icon: Truck },
    ],
  },
  {
    label: "Catalog & Orders",
    items: [
      { id: "products", label: "Products", icon: Package },
      { id: "categories", label: "Categories", icon: Tag },
      { id: "orders", label: "Orders", icon: ShoppingCart },
      { id: "inventory", label: "Inventory", icon: Warehouse },
    ],
  },
  {
    label: "Money",
    items: [
      { id: "payments", label: "Payments", icon: CreditCard },
      { id: "finance", label: "Finance", icon: Wallet },
      { id: "coupons", label: "Coupons", icon: Percent },
    ],
  },
  {
    label: "Growth",
    items: [
      { id: "ads", label: "Advertisements", icon: Megaphone },
      { id: "cms", label: "CMS", icon: FileText },
      { id: "notifications", label: "Notifications", icon: Bell },
    ],
  },
  {
    label: "Support & Ops",
    items: [
      { id: "support", label: "Customer Support", icon: Headphones },
      { id: "tasks", label: "Tasks", icon: CheckSquare },
      { id: "chat", label: "Internal Chat", icon: MessageSquare },
      { id: "meetings", label: "Meetings", icon: Video },
      { id: "vendors", label: "Vendor Management", icon: Handshake },
    ],
  },
  {
    label: "Trust & Systems",
    items: [
      { id: "fraud", label: "Fraud Detection", icon: ShieldAlert },
      { id: "ai", label: "AI Assistant", icon: Sparkles },
      { id: "health", label: "System Health", icon: Activity },
      { id: "api", label: "API Management", icon: Plug },
      { id: "flags", label: "Feature Flags", icon: ToggleLeft },
      { id: "audit", label: "Audit Logs", icon: ScrollText },
    ],
  },
  {
    label: "People & Admin",
    items: [
      { id: "hr", label: "HR", icon: UserCog },
      { id: "settings", label: "Settings", icon: SettingsIcon },
    ],
  },
];
const ALL_ITEMS = NAV_SECTIONS.flatMap((s) => s.items);

const ROLES = ["Founder", "Super Admin", "Admin", "HR", "Finance", "Operations", "Customer Support", "Warehouse", "Marketing", "Developer", "Moderator", "Intern"];

// mock RBAC: which module ids each role can see (Founder/Super Admin see all)
const ROLE_ACCESS = {
  Founder: null, // null = all
  "Super Admin": null,
  Admin: ["dashboard", "analytics", "reports", "users", "sellers", "professionals", "workers", "delivery", "products", "categories", "orders", "inventory", "support", "notifications", "tasks", "audit"],
  HR: ["dashboard", "hr", "tasks", "chat", "meetings"],
  Finance: ["dashboard", "finance", "payments", "reports", "coupons"],
  Operations: ["dashboard", "orders", "inventory", "delivery", "workers", "vendors", "tasks"],
  "Customer Support": ["dashboard", "support", "orders", "notifications", "chat"],
  Warehouse: ["dashboard", "inventory", "products", "orders"],
  Marketing: ["dashboard", "ads", "coupons", "cms", "notifications", "analytics"],
  Developer: ["dashboard", "api", "flags", "health", "audit"],
  Moderator: ["dashboard", "fraud", "support", "cms", "audit"],
  Intern: ["dashboard", "tasks", "chat"],
};

/* ============================================================
   MODULE CONFIG for the generic ModulePage
   (title, kpis, table columns/rows, primary action)
============================================================ */
const MODULES = {
  users: {
    title: "Users", subtitle: "Manage every customer registered on SaathApp.",
    primaryAction: "Invite user",
    kpis: [
      { label: "Total Users", value: "1,25,430", delta: "+6.2%", up: true },
      { label: "Verified", value: "1,08,910", delta: "+4.1%", up: true },
      { label: "Suspended", value: "312", delta: "-1.3%", up: false },
      { label: "New this week", value: "2,884", delta: "+11.4%", up: true },
    ],
    columns: ["Name", "Phone", "City", "Wallet", "Status", "Joined"],
    rows: [
      ["Ravi Kumar", "+91 98450 12233", "Mysuru", "₹420", "Active", "12 May 2026"],
      ["Aisha Fernandes", "+91 90040 88213", "Mumbai", "₹1,280", "Active", "03 Jun 2026"],
      ["Devendra Rao", "+91 99860 44210", "Bengaluru", "₹0", "Pending KYC", "21 Jun 2026"],
      ["Meera Shah", "+91 87990 12333", "Pune", "₹95", "Active", "02 Jul 2026"],
      ["Arjun Singh", "+91 91123 55210", "Delhi NCR", "₹0", "Suspended", "14 Jul 2026"],
    ],
  },
  sellers: {
    title: "Sellers", subtitle: "Approve, verify and monitor marketplace sellers.",
    primaryAction: "Review applications",
    kpis: [
      { label: "Active Sellers", value: "4,120", delta: "+3.4%", up: true },
      { label: "Pending KYC", value: "86", delta: "+9", up: false },
      { label: "Avg. Rating", value: "4.6", delta: "+0.1", up: true },
      { label: "Commission Owed", value: "₹8.4L", delta: "-2.0%", up: true },
    ],
    columns: ["Store", "Owner", "GST", "Commission", "Rating", "Status"],
    rows: [
      ["Green Basket", "Suresh Patil", "29ABCDE1234F1Z5", "8%", "4.7", "Active"],
      ["UrbanCraft Store", "Nikita Rao", "27PQRSX9988H1Z1", "10%", "4.3", "Pending KYC"],
      ["QuickFix Hardware", "Farhan Ali", "07LMNOQ2211K1Z9", "7%", "4.8", "Active"],
      ["Sunrise Foods", "Lakshmi N.", "33ZXCVB4432J1Z7", "9%", "4.1", "Suspended"],
    ],
  },
  professionals: {
    title: "Service Professionals", subtitle: "Electricians, plumbers, technicians and more.",
    primaryAction: "Add professional",
    kpis: [
      { label: "Verified Pros", value: "3,208", delta: "+2.9%", up: true },
      { label: "Avg. Rating", value: "4.7", delta: "+0.2", up: true },
      { label: "Bookings Today", value: "612", delta: "+18%", up: true },
      { label: "Docs Pending", value: "44", delta: "-6", up: true },
    ],
    columns: ["Name", "Trade", "Experience", "Rating", "Earnings (MTD)", "Status"],
    rows: [
      ["Manjunath S.", "Electrician", "6 yrs", "4.8", "₹32,400", "Active"],
      ["Priya Desai", "AC Technician", "4 yrs", "4.6", "₹28,900", "Active"],
      ["Ibrahim Sheikh", "Plumber", "9 yrs", "4.9", "₹41,200", "Active"],
      ["Tarun Verma", "Carpenter", "3 yrs", "4.2", "₹15,600", "Pending KYC"],
    ],
  },
  workers: {
    title: "Service Workers", subtitle: "Assigned crew, attendance and payroll.",
    primaryAction: "Assign job",
    kpis: [
      { label: "Active Workers", value: "1,946", delta: "+1.2%", up: true },
      { label: "Attendance Today", value: "92%", delta: "+3%", up: true },
      { label: "Jobs Assigned", value: "780", delta: "+40", up: true },
      { label: "Incentives Paid", value: "₹2.1L", delta: "+5%", up: true },
    ],
    columns: ["Name", "Team", "Assigned Job", "Attendance", "Performance", "Status"],
    rows: [
      ["Ganesh M.", "Warehouse - Mysuru", "Stock Transfer #221", "26/26", "Excellent", "Active"],
      ["Kavya R.", "Field Ops - Blr", "Home Cleaning #883", "24/26", "Good", "Active"],
      ["Suman T.", "Warehouse - Pune", "Return Processing", "18/26", "Needs Review", "Active"],
    ],
  },
  delivery: {
    title: "Delivery Partners", subtitle: "Fleet status, documents and live earnings.",
    primaryAction: "Onboard partner",
    kpis: [
      { label: "Online Now", value: "2,318", delta: "+312", up: true },
      { label: "Deliveries Today", value: "18,204", delta: "+7.8%", up: true },
      { label: "On-time Rate", value: "96.4%", delta: "+0.6%", up: true },
      { label: "Docs Expiring", value: "58", delta: "+9", up: false },
    ],
    columns: ["Name", "Vehicle", "City", "Orders Today", "Rating", "Status"],
    rows: [
      ["Yusuf Khan", "Bike - KA09", "Mysuru", "22", "4.8", "Online"],
      ["Bhavana Nair", "Scooter - KA03", "Bengaluru", "31", "4.9", "Online"],
      ["Rakesh Yadav", "Van - MH12", "Mumbai", "14", "4.4", "Offline"],
    ],
  },
  products: {
    title: "Products", subtitle: "Catalog, media, pricing and quality status.",
    primaryAction: "Add product",
    kpis: [
      { label: "Live Products", value: "58,120", delta: "+920", up: true },
      { label: "Out of Stock", value: "1,204", delta: "-8%", up: true },
      { label: "Featured", value: "340", delta: "+12", up: true },
      { label: "Flagged for QC", value: "63", delta: "+4", up: false },
    ],
    columns: ["Product", "Category", "Seller", "Price", "Stock", "Status"],
    rows: [
      ["Copper Wire 2.5mm (90m)", "Electricals", "QuickFix Hardware", "₹1,899", "412", "Active"],
      ["Organic Toor Dal 1kg", "Grocery", "Green Basket", "₹186", "1,204", "Active"],
      ["Cordless Drill Machine", "Tools", "UrbanCraft Store", "₹3,450", "0", "Draft"],
    ],
  },
  categories: {
    title: "Categories", subtitle: "Taxonomy, banners, icons and SEO metadata.",
    primaryAction: "New category",
    kpis: [
      { label: "Categories", value: "212", delta: "+3", up: true },
      { label: "With Banners", value: "184", delta: "+6", up: true },
      { label: "SEO Complete", value: "78%", delta: "+2%", up: true },
      { label: "Merge Requests", value: "5", delta: "0", up: true },
    ],
    columns: ["Category", "Parent", "Products", "SEO", "Status"],
    rows: [
      ["Home Services", "—", "8,420", "Complete", "Active"],
      ["Electricians", "Home Services", "1,120", "Complete", "Active"],
      ["Fresh Produce", "Grocery", "3,980", "Incomplete", "Active"],
    ],
  },
  orders: {
    title: "Orders", subtitle: "Full lifecycle tracking with admin intervention tools.",
    primaryAction: "Export orders",
    kpis: [
      { label: "Active Orders", value: "8,650", delta: "+4.6%", up: true },
      { label: "Delivered Today", value: "6,120", delta: "+9.1%", up: true },
      { label: "Cancelled", value: "184", delta: "-1.2%", up: true },
      { label: "Refunded", value: "76", delta: "+3", up: false },
    ],
    columns: ["Order ID", "Customer", "City", "Amount", "Status"],
    rows: recentOrders.map((o) => [o.id, o.customer, o.city, o.amount, o.status]),
  },
  inventory: {
    title: "Inventory", subtitle: "Warehouse stock, damage, returns and transfers.",
    primaryAction: "New transfer",
    kpis: [
      { label: "Warehouses", value: "18", delta: "+1", up: true },
      { label: "Available Stock", value: "4.2L units", delta: "+1.8%", up: true },
      { label: "Damaged Stock", value: "1,204", delta: "-4%", up: true },
      { label: "Low Stock Alerts", value: "312", delta: "+22", up: false },
    ],
    columns: ["Warehouse", "City", "Available", "Reserved", "Damaged", "Status"],
    rows: [
      ["SA-WH-01", "Mysuru", "84,210", "3,100", "220", "Active"],
      ["SA-WH-04", "Bengaluru", "1,12,400", "8,900", "540", "Active"],
      ["SA-WH-07", "Mumbai", "96,880", "5,220", "312", "Active"],
    ],
  },
  payments: {
    title: "Payments", subtitle: "Transactions, settlements, refunds and invoices.",
    primaryAction: "New settlement",
    kpis: [
      { label: "Processed Today", value: "₹45.6L", delta: "+16.3%", up: true },
      { label: "UPI Share", value: "68%", delta: "+3%", up: true },
      { label: "Refunds Pending", value: "42", delta: "-6", up: true },
      { label: "Failed Txns", value: "0.8%", delta: "-0.2%", up: true },
    ],
    columns: ["Txn ID", "Method", "Order", "Amount", "Status"],
    rows: [
      ["TXN-98213", "UPI", "SA-88231", "₹1,240", "Delivered"],
      ["TXN-98212", "Visa", "SA-88230", "₹3,860", "Confirmed"],
      ["TXN-98211", "COD", "SA-88229", "₹560", "Pending"],
    ],
  },
  finance: {
    title: "Finance", subtitle: "Revenue, expenses, commissions and payouts.",
    primaryAction: "Generate P&L",
    kpis: [
      { label: "Revenue (MTD)", value: "₹3.98Cr", delta: "+9.4%", up: true },
      { label: "Expenses (MTD)", value: "₹1.42Cr", delta: "+2.1%", up: false },
      { label: "Net Profit", value: "₹2.56Cr", delta: "+13.8%", up: true },
      { label: "Vendor Payouts Due", value: "₹34.2L", delta: "+4%", up: false },
    ],
    columns: ["Head", "This Month", "Last Month", "Change", "Status"],
    rows: [
      ["Platform Commission", "₹1.12Cr", "₹1.02Cr", "+9.8%", "Active"],
      ["Seller Settlements", "₹78.4L", "₹74.1L", "+5.8%", "Active"],
      ["Salary & Payroll", "₹42.6L", "₹41.9L", "+1.7%", "Active"],
    ],
  },
  coupons: {
    title: "Coupons", subtitle: "Create and monitor discount campaigns.",
    primaryAction: "Create coupon",
    kpis: [
      { label: "Active Coupons", value: "64", delta: "+5", up: true },
      { label: "Redemptions Today", value: "3,410", delta: "+12%", up: true },
      { label: "Discount Given", value: "₹6.8L", delta: "+8%", up: false },
      { label: "Abuse Flags", value: "9", delta: "+2", up: false },
    ],
    columns: ["Code", "Type", "Value", "Usage", "Expiry", "Status"],
    rows: [
      ["SAATH50", "Flat", "₹50", "12,204", "31 Aug 2026", "Active"],
      ["FIRSTORDER", "Percent", "20%", "48,900", "Ongoing", "Active"],
      ["MONSOON10", "Percent", "10%", "6,340", "15 Aug 2026", "Draft"],
    ],
  },
  ads: {
    title: "Advertisements", subtitle: "Sponsored placements and campaign performance.",
    primaryAction: "New campaign",
    kpis: [
      { label: "Live Campaigns", value: "22", delta: "+3", up: true },
      { label: "Impressions", value: "4.8M", delta: "+11%", up: true },
      { label: "Clicks", value: "96.4K", delta: "+9%", up: true },
      { label: "Ad Spend", value: "₹9.2L", delta: "+6%", up: false },
    ],
    columns: ["Campaign", "Seller", "Impressions", "CTR", "Budget", "Status"],
    rows: [
      ["Diwali Electronics Push", "UrbanCraft Store", "1.2M", "2.4%", "₹2.0L", "Active"],
      ["Grocery Weekend Blast", "Green Basket", "860K", "3.1%", "₹1.2L", "Active"],
      ["Tools Flash Sale", "QuickFix Hardware", "410K", "1.8%", "₹60K", "Scheduled"],
    ],
  },
  cms: {
    title: "CMS", subtitle: "Editable public pages, policies and blog content.",
    primaryAction: "New page",
    kpis: [
      { label: "Published Pages", value: "18", delta: "+1", up: true },
      { label: "Draft Pages", value: "4", delta: "+1", up: true },
      { label: "Blog Posts", value: "62", delta: "+5", up: true },
      { label: "Last Updated", value: "2h ago", delta: "", up: true },
    ],
    columns: ["Page", "Section", "Last Edited By", "Updated", "Status"],
    rows: [
      ["Home", "Landing", "Admin - Priya", "Today", "Active"],
      ["Privacy Policy", "Policies", "Legal - Ramesh", "3 days ago", "Active"],
      ["Careers", "Company", "HR - Fatima", "1 week ago", "Draft"],
    ],
  },
  notifications: {
    title: "Notifications", subtitle: "Push, SMS, Email and WhatsApp broadcasts.",
    primaryAction: "New broadcast",
    kpis: [
      { label: "Sent Today", value: "2.1L", delta: "+14%", up: true },
      { label: "Open Rate", value: "38%", delta: "+2%", up: true },
      { label: "Scheduled", value: "6", delta: "+2", up: true },
      { label: "Failed", value: "0.3%", delta: "-0.1%", up: true },
    ],
    columns: ["Broadcast", "Channel", "Audience", "Sent", "Status"],
    rows: [
      ["Order Delivered Confirmation", "Push", "Customers", "84,200", "Active"],
      ["Seller Payout Notice", "Email", "Sellers", "4,120", "Active"],
      ["Festive Offer Blast", "WhatsApp", "Customers", "1.2L", "Scheduled"],
    ],
  },
  support: {
    title: "Customer Support", subtitle: "Tickets, complaints, live chat and escalations.",
    primaryAction: "New ticket",
    kpis: [
      { label: "Open Tickets", value: "312", delta: "-18", up: true },
      { label: "Avg. Resolution", value: "4h 20m", delta: "-12%", up: true },
      { label: "CSAT", value: "4.5 / 5", delta: "+0.1", up: true },
      { label: "Escalations", value: "14", delta: "+2", up: false },
    ],
    columns: ["Ticket", "Customer", "Issue", "Priority", "Status"],
    rows: [
      ["TCK-4021", "Ravi Kumar", "Order not delivered", "High", "Open"],
      ["TCK-4020", "Meera Shah", "Refund delay", "Medium", "Escalated"],
      ["TCK-4019", "Aisha Fernandes", "Wrong item", "Low", "Resolved"],
    ],
  },
  hr: {
    title: "HR", subtitle: "Attendance, payroll, recruitment and training.",
    primaryAction: "Add employee",
    kpis: [
      { label: "Employees", value: "486", delta: "+9", up: true },
      { label: "Attendance Today", value: "94%", delta: "+1%", up: true },
      { label: "Open Roles", value: "12", delta: "+3", up: true },
      { label: "Leave Requests", value: "8", delta: "+2", up: true },
    ],
    columns: ["Employee", "Department", "Role", "Attendance", "Status"],
    rows: [
      ["Fatima Sheikh", "HR", "HR Manager", "22/22", "Active"],
      ["Rohit Malhotra", "Engineering", "Frontend Dev", "20/22", "Active"],
      ["Sneha Kulkarni", "Marketing", "Growth Lead", "21/22", "Active"],
    ],
  },
  tasks: {
    title: "Tasks", subtitle: "Internal task assignment with deadlines and priority.",
    primaryAction: "New task",
    kpis: [
      { label: "Open Tasks", value: "128", delta: "+14", up: true },
      { label: "Due Today", value: "22", delta: "+4", up: false },
      { label: "Completed (Week)", value: "94", delta: "+11%", up: true },
      { label: "Overdue", value: "6", delta: "-2", up: true },
    ],
    columns: ["Task", "Assignee", "Module", "Priority", "Status"],
    rows: [
      ["Reconcile Nov settlements", "Finance Team", "Finance", "High", "Open"],
      ["Update FAQ for returns", "Content Team", "CMS", "Medium", "Open"],
      ["Warehouse audit - WH-04", "Ops Team", "Inventory", "High", "Resolved"],
    ],
  },
  chat: {
    title: "Internal Chat", subtitle: "Team communication across departments.",
    primaryAction: "New channel",
    kpis: [
      { label: "Active Channels", value: "34", delta: "+2", up: true },
      { label: "Messages Today", value: "6,204", delta: "+9%", up: true },
      { label: "Online Team", value: "212", delta: "+18", up: true },
      { label: "Unread Mentions", value: "9", delta: "+3", up: false },
    ],
    columns: ["Channel", "Members", "Last Message", "Updated", "Status"],
    rows: [
      ["#warehouse-ops", "42", "Transfer complete for WH-07", "3m ago", "Active"],
      ["#finance-team", "12", "Settlement report attached", "22m ago", "Active"],
      ["#founder-updates", "8", "Q3 roadmap review notes", "1h ago", "Active"],
    ],
  },
  meetings: {
    title: "Meetings", subtitle: "Scheduled calls and internal reviews.",
    primaryAction: "Schedule meeting",
    kpis: [
      { label: "This Week", value: "18", delta: "+3", up: true },
      { label: "Today", value: "4", delta: "+1", up: true },
      { label: "Recorded", value: "62", delta: "+5", up: true },
      { label: "Avg. Duration", value: "34m", delta: "-4m", up: true },
    ],
    columns: ["Meeting", "Host", "Team", "Time", "Status"],
    rows: [
      ["Weekly Ops Sync", "Operations Lead", "Ops", "10:00 AM", "Scheduled"],
      ["Finance Review", "CFO Office", "Finance", "2:00 PM", "Scheduled"],
      ["Founder 1:1s", "Founder", "Leadership", "5:00 PM", "Live"],
    ],
  },
  vendors: {
    title: "Vendor Management", subtitle: "External vendors, contracts and payments.",
    primaryAction: "Add vendor",
    kpis: [
      { label: "Active Vendors", value: "142", delta: "+6", up: true },
      { label: "Contracts Renewing", value: "9", delta: "+2", up: false },
      { label: "Payouts Due", value: "₹12.4L", delta: "+3%", up: false },
      { label: "Avg. Rating", value: "4.4", delta: "+0.1", up: true },
    ],
    columns: ["Vendor", "Category", "Contract Ends", "Payout Due", "Status"],
    rows: [
      ["Packly Packaging Co.", "Packaging", "Dec 2026", "₹2.1L", "Active"],
      ["FleetCare Logistics", "Logistics", "Mar 2027", "₹4.6L", "Active"],
      ["CloudServe IT", "IT Infra", "Aug 2026", "₹1.8L", "Active"],
    ],
  },
  api: {
    title: "API Management", subtitle: "Keys, rate limits and integration health.",
    primaryAction: "Generate key",
    kpis: [
      { label: "Active Keys", value: "26", delta: "+1", up: true },
      { label: "Requests / min", value: "8,420", delta: "+4%", up: true },
      { label: "Error Rate", value: "0.4%", delta: "-0.1%", up: true },
      { label: "Rate Limited", value: "12", delta: "+2", up: false },
    ],
    columns: ["Key Name", "Owner", "Scope", "Last Used", "Status"],
    rows: [
      ["mobile-app-prod", "App Team", "Read/Write", "2m ago", "Active"],
      ["partner-logistics", "FleetCare Logistics", "Read only", "14m ago", "Active"],
      ["legacy-web-v1", "Web Team", "Read/Write", "3 days ago", "Suspended"],
    ],
  },
  flags: {
    title: "Feature Flags", subtitle: "Toggle experiments and staged rollouts.",
    primaryAction: "New flag",
    kpis: [
      { label: "Active Flags", value: "38", delta: "+4", up: true },
      { label: "In Rollout", value: "6", delta: "+2", up: true },
      { label: "Deprecated", value: "11", delta: "+1", up: true },
      { label: "Impacted Users", value: "62%", delta: "+8%", up: true },
    ],
    columns: ["Flag", "Environment", "Rollout", "Owner", "Status"],
    rows: [
      ["new_checkout_flow", "Production", "40%", "Growth Team", "Active"],
      ["ai_assistant_v2", "Staging", "100%", "Developer Team", "Active"],
      ["legacy_seller_ui", "Production", "0%", "Web Team", "Draft"],
    ],
  },
  audit: {
    title: "Audit Logs", subtitle: "Every admin action, recorded for accountability.",
    primaryAction: "Export logs",
    kpis: [
      { label: "Events Today", value: "4,820", delta: "+9%", up: true },
      { label: "Critical Actions", value: "18", delta: "+3", up: false },
      { label: "Unique Admins", value: "62", delta: "+4", up: true },
      { label: "Failed Logins", value: "6", delta: "-2", up: true },
    ],
    columns: ["Employee", "Action", "Module", "Timestamp", "IP Address"],
    rows: [
      ["Priya Nair", "Suspended seller", "Sellers", "28 Jul 2026, 10:42", "103.21.44.6"],
      ["Ramesh Iyer", "Approved refund", "Payments", "28 Jul 2026, 10:20", "49.207.12.98"],
      ["Fatima Sheikh", "Updated payroll", "HR", "28 Jul 2026, 09:58", "117.198.4.21"],
    ],
  },
};

/* ============================================================
   REUSABLE UI PRIMITIVES
============================================================ */
const Card = ({ className = "", children }) => (
  <div className={`sa-glass rounded-2xl border border-black/5 shadow-[0_1px_2px_rgba(11,20,32,0.04),0_8px_24px_-12px_rgba(11,20,32,0.08)] ${className}`}>
    {children}
  </div>
);

function useCountUp(target, active, duration = 900) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start;
    let raf;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min(1, (ts - start) / duration);
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, active]);
  return val;
}

const KPICard = ({ label, value, delta, up, icon: Icon, index = 0 }) => {
  const numeric = typeof value === "string" ? parseFloat(value.replace(/[^\d.]/g, "")) : value;
  const isPureNumber = typeof value === "string" && /^[\d,]+$/.test(value.replace(/[₹,%\s]/g, "")) === false ? false : true;
  return (
    <Card className={`p-5 sa-rise`} >
      <div style={{ animationDelay: `${index * 60}ms` }} className="flex items-start justify-between">
        <div>
          <p className="sa-font-body text-[13px] text-slate-500 font-medium">{label}</p>
          <p className="sa-font-display sa-num text-[26px] font-bold text-[#0B1420] mt-1">{value}</p>
        </div>
        {Icon && (
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${T.forest}22, ${T.azure}1a)` }}>
            <Icon size={18} color={T.forest} />
          </div>
        )}
      </div>
      {delta ? (
        <div className={`mt-3 inline-flex items-center gap-1 text-xs font-semibold ${up ? "text-emerald-600" : "text-red-500"}`}>
          {up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />} {delta}
          <span className="text-slate-400 font-normal ml-1">vs last period</span>
        </div>
      ) : <div className="mt-3 h-[17px]" />}
    </Card>
  );
};

const SectionHeader = ({ title, subtitle, action, onAction }) => (
  <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
    <div>
      <h1 className="sa-font-display text-[22px] font-bold text-[#0B1420]">{title}</h1>
      {subtitle && <p className="sa-font-body text-sm text-slate-500 mt-1">{subtitle}</p>}
    </div>
    {action && (
      <button onClick={onAction} className="sa-font-body inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold shadow-sm hover:opacity-90 active:scale-[0.98] transition"
        style={{ background: `linear-gradient(135deg, ${T.forest}, ${T.forestMid})` }}>
        <Plus size={16} /> {action}
      </button>
    )}
  </div>
);

const DataTable = ({ columns, rows, onToast }) => (
  <Card className="overflow-hidden">
    <div className="flex items-center justify-between px-5 py-4 border-b border-black/5">
      <div className="flex items-center gap-2 flex-1 max-w-sm">
        <Search size={15} className="text-slate-400" />
        <input placeholder="Search records..." className="sa-font-body text-sm outline-none bg-transparent w-full placeholder:text-slate-400" />
      </div>
      <div className="flex items-center gap-2">
        <button onClick={() => onToast?.("Filters applied")} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-black/10 text-xs font-medium text-slate-600 hover:bg-slate-50">
          <Filter size={13} /> Filter
        </button>
        <button onClick={() => onToast?.("Export started — check downloads shortly")} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-black/10 text-xs font-medium text-slate-600 hover:bg-slate-50">
          <Download size={13} /> Export
        </button>
      </div>
    </div>
    <div className="overflow-x-auto sa-scrollbar">
      <table className="w-full text-sm sa-font-body">
        <thead>
          <tr className="text-left text-slate-500 text-xs uppercase tracking-wide bg-slate-50/60">
            {columns.map((c) => <th key={c} className="px-5 py-3 font-semibold whitespace-nowrap">{c}</th>)}
            <th className="px-5 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-black/5 hover:bg-emerald-50/30 transition-colors">
              {r.map((cell, j) => (
                <td key={j} className="px-5 py-3.5 text-[#0B1420] whitespace-nowrap">
                  {statusTone[cell] ? <Pill label={cell} /> : cell}
                </td>
              ))}
              <td className="px-5 py-3.5 text-right">
                <button onClick={() => onToast?.(`Opened ${r[0]}`)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400">
                  <MoreHorizontal size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="px-5 py-3 border-t border-black/5 flex items-center justify-between text-xs text-slate-500 sa-font-body">
      <span>Showing {rows.length} of {(rows.length * 214).toLocaleString()} records</span>
      <div className="flex items-center gap-1">
        <button className="px-2.5 py-1 rounded-lg border border-black/10 hover:bg-slate-50">Prev</button>
        <button className="px-2.5 py-1 rounded-lg border border-black/10 hover:bg-slate-50">Next</button>
      </div>
    </div>
  </Card>
);

/* Generic module page driven by MODULES config */
const ModulePage = ({ id, onToast }) => {
  const cfg = MODULES[id];
  if (!cfg) return null;
  return (
    <div className="sa-fade">
      <SectionHeader title={cfg.title} subtitle={cfg.subtitle} action={cfg.primaryAction} onAction={() => onToast(`${cfg.primaryAction} — mock action`)} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {cfg.kpis.map((k, i) => <KPICard key={k.label} {...k} index={i} />)}
      </div>
      <DataTable columns={cfg.columns} rows={cfg.rows} onToast={onToast} />
    </div>
  );
};

/* ============================================================
   DASHBOARD PAGE
============================================================ */
const quickLinks = [
  { id: "users", label: "Users", icon: Users },
  { id: "sellers", label: "Sellers", icon: Store },
  { id: "delivery", label: "Delivery Partners", icon: Truck },
  { id: "orders", label: "Orders", icon: ShoppingCart },
  { id: "products", label: "Products", icon: Package },
  { id: "categories", label: "Categories", icon: Tag },
  { id: "inventory", label: "Inventory", icon: Warehouse },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "ads", label: "Advertisements", icon: Megaphone },
  { id: "coupons", label: "Coupons", icon: Percent },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "reports", label: "Reports", icon: ClipboardList },
  { id: "fraud", label: "Fraud Detection", icon: ShieldAlert },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "cms", label: "CMS", icon: FileText },
  { id: "settings", label: "Settings", icon: SettingsIcon },
];

const DashboardPage = ({ onNavigate, onToast, mounted }) => {
  const kpis = [
    { label: "Total Users", value: "1,25,430", delta: "+6.2%", up: true, icon: Users },
    { label: "Total Sellers", value: "4,120", delta: "+3.4%", up: true, icon: Store },
    { label: "Service Professionals", value: "3,208", delta: "+2.9%", up: true, icon: Wrench },
    { label: "Delivery Partners", value: "2,318", delta: "+8.1%", up: true, icon: Truck },
    { label: "Active Orders", value: "8,650", delta: "+4.6%", up: true, icon: ShoppingCart },
    { label: "Revenue Today", value: "₹45.62L", delta: "+16.3%", up: true, icon: Wallet },
    { label: "Revenue This Month", value: "₹3.98Cr", delta: "+9.4%", up: true, icon: TrendingUp },
    { label: "Support Tickets", value: "312", delta: "-5.8%", up: true, icon: Headphones },
    { label: "Low Stock Alerts", value: "312", delta: "+22", up: false, icon: AlertTriangle },
    { label: "Fraud Alerts", value: "9", delta: "+2", up: false, icon: ShieldAlert },
  ];

  return (
    <div className="sa-fade">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
        <div>
          <h1 className="sa-font-display text-2xl font-bold text-[#0B1420]">Good afternoon, Founder 👋</h1>
          <p className="sa-font-body text-sm text-slate-500 mt-1">Here's what's happening across SaathApp today — 28 May 2026</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => onToast("Report generated")} className="sa-font-body inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-black/10 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50">
            <Download size={15} /> Export report
          </button>
          <button onClick={() => onNavigate("analytics")} className="sa-font-body inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold shadow-sm hover:opacity-90"
            style={{ background: `linear-gradient(135deg, ${T.forest}, ${T.forestMid})` }}>
            <BarChart3 size={15} /> View analytics
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
        {kpis.map((k, i) => <KPICard key={k.label} {...k} index={i} />)}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-6">
        <Card className="xl:col-span-2 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="sa-font-display font-semibold text-[#0B1420]">Revenue Growth</p>
              <p className="sa-font-body text-xs text-slate-500">Monthly platform revenue, last 12 months</p>
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">+34.6% YoY</span>
          </div>
          <ResponsiveContainer width="100%" height={230}>
            <AreaChart data={revenueSeries} margin={{ left: -20, right: 10 }}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={T.forest} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={T.forest} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7ECEA" />
              <XAxis dataKey="m" tick={{ fontSize: 11, fill: "#7C8A85" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#7C8A85" }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 100000}L`} />
              <Tooltip formatter={(v) => `₹${(v / 100000).toFixed(1)}L`} contentStyle={{ borderRadius: 12, border: "1px solid #E7ECEA", fontSize: 12 }} />
              <Area type="monotone" dataKey="revenue" stroke={T.forest} strokeWidth={2.5} fill="url(#rev)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <p className="sa-font-display font-semibold text-[#0B1420] mb-1">Category Performance</p>
          <p className="sa-font-body text-xs text-slate-500 mb-3">Orders by category, this month</p>
          <ResponsiveContainer width="100%" height={190}>
            <PieChart>
              <Pie data={categoryPerf} dataKey="value" nameKey="name" innerRadius={48} outerRadius={72} paddingAngle={3}>
                {categoryPerf.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E7ECEA", fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mt-1">
            {categoryPerf.map((c, i) => (
              <div key={c.name} className="flex items-center gap-1.5 text-xs text-slate-600 sa-font-body">
                <span className="w-2 h-2 rounded-full" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                {c.name}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-6">
        <Card className="p-5 xl:col-span-1">
          <p className="sa-font-display font-semibold text-[#0B1420] mb-1">Orders Overview</p>
          <p className="sa-font-body text-xs text-slate-500 mb-3">Monthly order volume</p>
          <ResponsiveContainer width="100%" height={190}>
            <BarChart data={revenueSeries} margin={{ left: -20, right: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7ECEA" />
              <XAxis dataKey="m" tick={{ fontSize: 10, fill: "#7C8A85" }} axisLine={false} tickLine={false} interval={1} />
              <YAxis tick={{ fontSize: 10, fill: "#7C8A85" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E7ECEA", fontSize: 12 }} />
              <Bar dataKey="orders" radius={[6, 6, 0, 0]} fill={T.azure} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5 xl:col-span-1">
          <p className="sa-font-display font-semibold text-[#0B1420] mb-1">Top Cities</p>
          <p className="sa-font-body text-xs text-slate-500 mb-3">Order volume by city</p>
          <div className="space-y-2.5 mt-3">
            {topCities.map((c) => {
              const pct = Math.round((c.orders / topCities[0].orders) * 100);
              return (
                <div key={c.city}>
                  <div className="flex justify-between text-xs sa-font-body text-slate-600 mb-1">
                    <span className="flex items-center gap-1"><MapPin size={11} /> {c.city}</span>
                    <span className="font-semibold text-[#0B1420]">{c.orders.toLocaleString()}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: mounted ? `${pct}%` : 0, background: `linear-gradient(90deg, ${T.forest}, ${T.azure})`, transition: "width 1s ease" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-5 xl:col-span-1">
          <p className="sa-font-display font-semibold text-[#0B1420] mb-1">Customer Retention</p>
          <p className="sa-font-body text-xs text-slate-500 mb-3">Monthly repeat-purchase rate</p>
          <ResponsiveContainer width="100%" height={190}>
            <LineChart data={retentionSeries} margin={{ left: -20, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7ECEA" />
              <XAxis dataKey="m" tick={{ fontSize: 10, fill: "#7C8A85" }} axisLine={false} tickLine={false} interval={1} />
              <YAxis tick={{ fontSize: 10, fill: "#7C8A85" }} axisLine={false} tickLine={false} domain={[50, 90]} />
              <Tooltip formatter={(v) => `${v}%`} contentStyle={{ borderRadius: 12, border: "1px solid #E7ECEA", fontSize: 12 }} />
              <Line type="monotone" dataKey="retention" stroke={T.amber} strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-6">
        <Card className="xl:col-span-2 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-black/5">
            <p className="sa-font-display font-semibold text-[#0B1420]">Recent Orders</p>
            <button onClick={() => onNavigate("orders")} className="text-xs font-semibold flex items-center gap-1" style={{ color: T.forest }}>
              View all <ChevronRight size={13} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm sa-font-body">
              <thead>
                <tr className="text-left text-slate-500 text-xs uppercase tracking-wide bg-slate-50/60">
                  <th className="px-5 py-3 font-semibold">Order</th>
                  <th className="px-5 py-3 font-semibold">Customer</th>
                  <th className="px-5 py-3 font-semibold">City</th>
                  <th className="px-5 py-3 font-semibold">Amount</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id} className="border-t border-black/5 hover:bg-emerald-50/30">
                    <td className="px-5 py-3.5 font-medium text-[#0B1420]">{o.id}</td>
                    <td className="px-5 py-3.5 text-slate-600">{o.customer}</td>
                    <td className="px-5 py-3.5 text-slate-600">{o.city}</td>
                    <td className="px-5 py-3.5 font-medium text-[#0B1420]">{o.amount}</td>
                    <td className="px-5 py-3.5"><Pill label={o.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-5">
          <p className="sa-font-display font-semibold text-[#0B1420] mb-1">Platform Usage</p>
          <p className="sa-font-body text-xs text-slate-500 mb-4">Live session snapshot</p>
          <div className="space-y-3">
            {[
              { label: "Customer App", pct: 82, color: T.forest },
              { label: "Seller Dashboard", pct: 64, color: T.azure },
              { label: "Delivery App", pct: 71, color: T.amber },
              { label: "Professional App", pct: 58, color: "#8FB4EE" },
            ].map((u) => (
              <div key={u.label}>
                <div className="flex justify-between text-xs sa-font-body text-slate-600 mb-1">
                  <span>{u.label}</span><span className="font-semibold text-[#0B1420]">{u.pct}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: mounted ? `${u.pct}%` : 0, background: u.color, transition: "width 1.2s ease" }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <p className="sa-font-display font-semibold text-[#0B1420] mb-4">Quick Access</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {quickLinks.map((q) => (
            <button key={q.id} onClick={() => onNavigate(q.id)}
              className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-black/5 bg-white/60 hover:bg-emerald-50/60 hover:border-emerald-200 py-4 transition-all">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110" style={{ background: `${T.forest}14` }}>
                <q.icon size={17} color={T.forest} />
              </div>
              <span className="text-[11px] font-medium text-slate-600 text-center leading-tight sa-font-body">{q.label}</span>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
};

/* ============================================================
   ANALYTICS PAGE
============================================================ */
const AnalyticsPage = () => (
  <div className="sa-fade">
    <SectionHeader title="Analytics" subtitle="Deep platform insights across growth, retention and category performance." />
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
      <Card className="p-5">
        <p className="sa-font-display font-semibold text-[#0B1420] mb-1">User Growth</p>
        <p className="sa-font-body text-xs text-slate-500 mb-3">New signups per month</p>
        <ResponsiveContainer width="100%" height={230}>
          <BarChart data={revenueSeries}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7ECEA" />
            <XAxis dataKey="m" tick={{ fontSize: 11, fill: "#7C8A85" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#7C8A85" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E7ECEA", fontSize: 12 }} />
            <Bar dataKey="orders" radius={[6, 6, 0, 0]} fill={T.forest} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <Card className="p-5">
        <p className="sa-font-display font-semibold text-[#0B1420] mb-1">Monthly Sales</p>
        <p className="sa-font-body text-xs text-slate-500 mb-3">Gross merchandise value</p>
        <ResponsiveContainer width="100%" height={230}>
          <AreaChart data={revenueSeries}>
            <defs>
              <linearGradient id="sales2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={T.azure} stopOpacity={0.35} />
                <stop offset="100%" stopColor={T.azure} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7ECEA" />
            <XAxis dataKey="m" tick={{ fontSize: 11, fill: "#7C8A85" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#7C8A85" }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 100000}L`} />
            <Tooltip formatter={(v) => `₹${(v / 100000).toFixed(1)}L`} contentStyle={{ borderRadius: 12, border: "1px solid #E7ECEA", fontSize: 12 }} />
            <Area type="monotone" dataKey="revenue" stroke={T.azure} strokeWidth={2.5} fill="url(#sales2)" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
      <Card className="p-5">
        <p className="sa-font-display font-semibold text-[#0B1420] mb-1">Customer Retention</p>
        <p className="sa-font-body text-xs text-slate-500 mb-3">Repeat purchase rate</p>
        <ResponsiveContainer width="100%" height={230}>
          <LineChart data={retentionSeries}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7ECEA" />
            <XAxis dataKey="m" tick={{ fontSize: 11, fill: "#7C8A85" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#7C8A85" }} axisLine={false} tickLine={false} domain={[50, 90]} />
            <Tooltip formatter={(v) => `${v}%`} contentStyle={{ borderRadius: 12, border: "1px solid #E7ECEA", fontSize: 12 }} />
            <Line type="monotone" dataKey="retention" stroke={T.amber} strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
      <Card className="p-5">
        <p className="sa-font-display font-semibold text-[#0B1420] mb-1">Category Performance</p>
        <p className="sa-font-body text-xs text-slate-500 mb-3">Order share by category</p>
        <ResponsiveContainer width="100%" height={230}>
          <BarChart data={categoryPerf} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E7ECEA" />
            <XAxis type="number" tick={{ fontSize: 11, fill: "#7C8A85" }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "#7C8A85" }} axisLine={false} tickLine={false} width={100} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E7ECEA", fontSize: 12 }} />
            <Bar dataKey="value" radius={[0, 6, 6, 0]} fill={T.forest} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  </div>
);

/* ============================================================
   FRAUD DETECTION
============================================================ */
const fraudCards = [
  { title: "Duplicate Accounts", count: 42, trend: "+8", icon: Users, tone: "red" },
  { title: "Fake Reviews", count: 118, trend: "+21", icon: Star, tone: "amber" },
  { title: "Coupon Abuse", count: 9, trend: "+2", icon: Percent, tone: "amber" },
  { title: "Refund Abuse", count: 27, trend: "+5", icon: Wallet, tone: "red" },
  { title: "Suspicious Orders", count: 63, trend: "+14", icon: ShoppingCart, tone: "red" },
];
const FraudPage = ({ onToast }) => (
  <div className="sa-fade">
    <SectionHeader title="Fraud Detection" subtitle="Automated risk signals across the platform, reviewed by the trust & safety team." action="Run new scan" onAction={() => onToast("Fraud scan queued")} />
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 mb-5">
      {fraudCards.map((c) => (
        <Card key={c.title} className="p-5">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${c.tone === "red" ? "bg-red-50" : "bg-amber-50"}`}>
            <c.icon size={17} className={c.tone === "red" ? "text-red-500" : "text-amber-600"} />
          </div>
          <p className="sa-font-display text-2xl font-bold text-[#0B1420]">{c.count}</p>
          <p className="sa-font-body text-xs text-slate-500 mt-1">{c.title}</p>
          <p className={`text-xs font-semibold mt-2 ${c.tone === "red" ? "text-red-500" : "text-amber-600"}`}>{c.trend} this week</p>
        </Card>
      ))}
    </div>
    <DataTable
      columns={["Flag ID", "Type", "Entity", "Risk Score", "Status"]}
      rows={[
        ["FR-2291", "Suspicious Orders", "User #88231", "Flagged", "Flagged"],
        ["FR-2290", "Coupon Abuse", "Seller - UrbanCraft", "Flagged", "Flagged"],
        ["FR-2289", "Fake Reviews", "Product #4021", "Resolved", "Resolved"],
      ]}
      onToast={onToast}
    />
  </div>
);

/* ============================================================
   AI ASSISTANT
============================================================ */
const AIAssistantPage = ({ onToast }) => {
  const [msgs, setMsgs] = useState([
    { from: "ai", text: "Hi Admin, I can pull orders, generate reports, summarize sales or predict inventory needs. What do you need?" },
  ]);
  const [input, setInput] = useState("");
  const actions = [
    { label: "Find Order", icon: ShoppingCart },
    { label: "Generate Report", icon: ClipboardList },
    { label: "Sales Summary", icon: BarChart3 },
    { label: "Predict Inventory", icon: Warehouse },
    { label: "Answer Employee Questions", icon: MessageSquare },
  ];
  const send = (text) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { from: "admin", text }, { from: "ai", text: "Got it — here's a mock response for \u201c" + text + "\u201d based on current platform data." }]);
    setInput("");
  };
  return (
    <div className="sa-fade">
      <SectionHeader title="AI Assistant" subtitle="Ask questions about the platform or trigger quick actions." />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="p-5 lg:col-span-1">
          <p className="sa-font-display font-semibold text-[#0B1420] mb-3">Quick actions</p>
          <div className="space-y-2">
            {actions.map((a) => (
              <button key={a.label} onClick={() => send(a.label)} className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl border border-black/5 hover:border-emerald-200 hover:bg-emerald-50/40 transition text-left">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${T.forest}14` }}>
                  <a.icon size={15} color={T.forest} />
                </div>
                <span className="text-sm font-medium text-slate-700 sa-font-body">{a.label}</span>
              </button>
            ))}
          </div>
        </Card>
        <Card className="p-0 lg:col-span-2 flex flex-col h-[480px]">
          <div className="px-5 py-4 border-b border-black/5 flex items-center gap-2">
            <Sparkles size={16} color={T.forest} />
            <p className="sa-font-display font-semibold text-[#0B1420]">SaathApp Assistant</p>
          </div>
          <div className="flex-1 overflow-y-auto sa-scrollbar px-5 py-4 space-y-3">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.from === "admin" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm sa-font-body ${m.from === "admin" ? "text-white rounded-br-sm" : "bg-slate-100 text-[#0B1420] rounded-bl-sm"}`}
                  style={m.from === "admin" ? { background: T.forest } : {}}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-black/5 flex items-center gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder="Ask the assistant anything..." className="flex-1 px-4 py-2.5 rounded-xl border border-black/10 text-sm outline-none sa-font-body focus:border-emerald-300" />
            <button onClick={() => send(input)} className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ background: T.forest }}>
              <Send size={16} />
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

/* ============================================================
   SYSTEM HEALTH
============================================================ */
const healthItems = [
  { label: "API Status", icon: Plug, status: "Operational", pct: 99.98 },
  { label: "Database", icon: Database, status: "Operational", pct: 99.95 },
  { label: "Storage", icon: HardDrive, status: "Operational", pct: 100 },
  { label: "CPU", icon: Cpu, status: "Operational", pct: 42 },
  { label: "RAM", icon: Server, status: "Operational", pct: 61 },
  { label: "Redis Cache", icon: Zap, status: "Operational", pct: 99.9 },
  { label: "Job Queue", icon: RefreshCw, status: "Degraded", pct: 87 },
  { label: "Payment Gateway", icon: CreditCard, status: "Operational", pct: 99.97 },
  { label: "Email Gateway", icon: Mail, status: "Operational", pct: 99.8 },
  { label: "SMS Gateway", icon: Smartphone, status: "Operational", pct: 99.6 },
];
const SystemHealthPage = () => (
  <div className="sa-fade">
    <SectionHeader title="System Health" subtitle="Live infrastructure status across SaathApp services." />
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
      {healthItems.map((h) => {
        const ok = h.status === "Operational";
        return (
          <Card key={h.label} className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: ok ? `${T.forest}14` : `${T.amber}22` }}>
                <h.icon size={16} color={ok ? T.forest : T.amber} />
              </div>
              {ok ? <CheckCircle2 size={16} className="text-emerald-500" /> : <AlertTriangle size={16} className="text-amber-500" />}
            </div>
            <p className="sa-font-body text-sm font-semibold text-[#0B1420]">{h.label}</p>
            <p className={`text-xs mt-0.5 ${ok ? "text-emerald-600" : "text-amber-600"}`}>{h.status}</p>
            <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden mt-3">
              <div className="h-full rounded-full" style={{ width: `${Math.min(h.pct, 100)}%`, background: ok ? T.forest : T.amber }} />
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5 sa-font-body">{h.pct}% uptime (30d)</p>
          </Card>
        );
      })}
    </div>
  </div>
);

/* ============================================================
   SETTINGS (Founder-only)
============================================================ */
const SettingsPage = ({ role, onToast }) => {
  const allowed = role === "Founder" || role === "Super Admin";
  const [values, setValues] = useState({ commission: 8, tax: 18, delivery: 40, platformFee: 2, referral: 50, maintenance: false });
  if (!allowed) {
    return (
      <div className="sa-fade flex flex-col items-center justify-center text-center py-24">
        <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
          <ShieldQuestion size={26} className="text-red-500" />
        </div>
        <p className="sa-font-display text-lg font-bold text-[#0B1420]">Founder access required</p>
        <p className="sa-font-body text-sm text-slate-500 mt-1 max-w-sm">Platform settings can only be changed by the Founder or Super Admin role. Switch roles from the profile menu to preview this page.</p>
      </div>
    );
  }
  const set = (k, v) => setValues((s) => ({ ...s, [k]: v }));
  return (
    <div className="sa-fade">
      <SectionHeader title="Settings" subtitle="Founder-only platform configuration." action="Save changes" onAction={() => onToast("Settings saved")} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card className="p-5 space-y-4">
          <p className="sa-font-display font-semibold text-[#0B1420]">Commercial</p>
          {[
            ["commission", "Platform Commission (%)"], ["tax", "Tax / GST (%)"],
            ["delivery", "Delivery Charge (₹)"], ["platformFee", "Platform Fee (%)"], ["referral", "Referral Reward (₹)"],
          ].map(([key, label]) => (
            <div key={key}>
              <div className="flex justify-between text-xs sa-font-body text-slate-500 mb-1">
                <span>{label}</span><span className="font-semibold text-[#0B1420]">{values[key]}</span>
              </div>
              <input type="range" min="0" max="100" value={values[key]} onChange={(e) => set(key, e.target.value)}
                className="w-full accent-emerald-600" />
            </div>
          ))}
        </Card>
        <Card className="p-5 space-y-4">
          <p className="sa-font-display font-semibold text-[#0B1420]">Platform</p>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-[#0B1420] sa-font-body">Maintenance Mode</p>
              <p className="text-xs text-slate-500 sa-font-body">Temporarily disable customer-facing apps</p>
            </div>
            <button onClick={() => set("maintenance", !values.maintenance)}
              className={`w-11 h-6 rounded-full relative transition ${values.maintenance ? "bg-red-400" : "bg-slate-200"}`}>
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${values.maintenance ? "left-5" : "left-0.5"}`} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <p className="text-xs text-slate-500 sa-font-body mb-1">Default Currency</p>
              <select className="w-full border border-black/10 rounded-lg px-3 py-2 text-sm sa-font-body">
                <option>INR (₹)</option><option>USD ($)</option>
              </select>
            </div>
            <div>
              <p className="text-xs text-slate-500 sa-font-body mb-1">Default Language</p>
              <select className="w-full border border-black/10 rounded-lg px-3 py-2 text-sm sa-font-body">
                <option>English</option><option>Kannada</option><option>Hindi</option>
              </select>
            </div>
          </div>
          <div className="pt-2">
            <p className="text-xs text-slate-500 sa-font-body mb-2">Feature Flags</p>
            <div className="flex flex-wrap gap-2">
              {["AI Assistant v2", "New Checkout", "Multi-warehouse Routing"].map((f) => (
                <span key={f} className="px-2.5 py-1 rounded-full text-xs border border-emerald-200 bg-emerald-50 text-emerald-700 sa-font-body">{f}</span>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

/* ============================================================
   REPORTS (custom-ish wrapper around generic table + export)
============================================================ */
const ReportsPage = ({ onToast }) => (
  <div className="sa-fade">
    <SectionHeader title="Reports" subtitle="Generate and export platform reports." />
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
      {["Sales Report", "Revenue Report", "Orders Report", "Seller Report", "Delivery Report", "Employee Report", "Inventory Report", "Finance Report"].map((r) => (
        <Card key={r} className="p-5">
          <ClipboardList size={18} color={T.forest} />
          <p className="sa-font-display font-semibold text-sm text-[#0B1420] mt-3">{r}</p>
          <p className="sa-font-body text-xs text-slate-500 mt-1 mb-3">Auto-generated from live mock data</p>
          <div className="flex gap-2">
            {["PDF", "Excel", "CSV"].map((f) => (
              <button key={f} onClick={() => onToast(`${r} exported as ${f}`)} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-black/10 hover:bg-slate-50 sa-font-body">{f}</button>
            ))}
          </div>
        </Card>
      ))}
    </div>
  </div>
);

/* ============================================================
   TOAST
============================================================ */
const Toast = ({ toasts }) => (
  <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 items-end">
    {toasts.map((t) => (
      <div key={t.id} className="sa-rise flex items-center gap-2 bg-[#0B1420] text-white px-4 py-3 rounded-xl shadow-lg text-sm sa-font-body">
        <CheckCircle2 size={15} className="text-emerald-400" /> {t.text}
      </div>
    ))}
  </div>
);

/* ============================================================
   LOGIN PAGE
============================================================ */
const LoginPage = ({ onLogin }) => {
  const [showPw, setShowPw] = useState(false);
  const [otp, setOtp] = useState(false);
  const [twofa, setTwofa] = useState(true);
  const [captcha, setCaptcha] = useState(false);

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden sa-font-body" style={{ background: `radial-gradient(1200px 600px at 10% 10%, #E7F6EE, #F4F8F6 55%)` }}>
      <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full sa-blob" style={{ background: `radial-gradient(circle, ${T.forest}33, transparent 70%)` }} />
      <div className="absolute -bottom-32 -right-16 w-[480px] h-[480px] rounded-full sa-blob" style={{ background: `radial-gradient(circle, ${T.azure}2e, transparent 70%)`, animationDelay: "3s" }} />
      <div className="absolute top-1/3 right-1/4 w-[260px] h-[260px] rounded-full sa-blob" style={{ background: `radial-gradient(circle, ${T.amber}22, transparent 70%)`, animationDelay: "6s" }} />

      <div className="relative z-10 w-full max-w-[420px] mx-4 sa-rise">
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 shadow-lg" style={{ background: `linear-gradient(135deg, ${T.forest}, ${T.forestDeep})` }}>
            <Building2 size={24} className="text-white" />
          </div>
          <p className="sa-font-display text-xl font-extrabold text-[#0B1420] tracking-tight">SAATH<span style={{ color: T.forest }}>APP</span></p>
          <p className="text-xs text-slate-500 mt-1">Internal Admin Portal</p>
        </div>

        <Card className="p-7">
          <p className="sa-font-display text-lg font-bold text-[#0B1420]">Welcome back, Admin</p>
          <p className="text-sm text-slate-500 mt-1 mb-6">Sign in with your company credentials to continue.</p>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-600 mb-1.5 block">Company Email</label>
              <div className="flex items-center gap-2 border border-black/10 rounded-xl px-3.5 py-2.5 focus-within:border-emerald-300 bg-white">
                <Mail size={16} className="text-slate-400" />
                <input type="text" placeholder="you@saathapp.com" className="w-full outline-none text-sm bg-transparent" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 mb-1.5 block">Employee ID <span className="text-slate-400 font-normal">(optional)</span></label>
              <div className="flex items-center gap-2 border border-black/10 rounded-xl px-3.5 py-2.5 focus-within:border-emerald-300 bg-white">
                <BadgeCheck size={16} className="text-slate-400" />
                <input type="text" placeholder="SA-EMP-0000" className="w-full outline-none text-sm bg-transparent" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 mb-1.5 block">Password</label>
              <div className="flex items-center gap-2 border border-black/10 rounded-xl px-3.5 py-2.5 focus-within:border-emerald-300 bg-white">
                <Lock size={16} className="text-slate-400" />
                <input type={showPw ? "text" : "password"} placeholder="••••••••••" className="w-full outline-none text-sm bg-transparent" />
                <button type="button" onClick={() => setShowPw((s) => !s)} className="text-slate-400">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-slate-600">
                <input type="checkbox" className="accent-emerald-600 rounded" /> Remember me
              </label>
              <button type="button" className="font-semibold" style={{ color: T.forest }}>Forgot password?</button>
            </div>

            <div className="rounded-xl border border-dashed border-black/10 p-3.5 space-y-2.5 bg-slate-50/60">
              <button type="button" onClick={() => setOtp((s) => !s)} className="flex items-center justify-between w-full text-xs font-medium text-slate-600">
                <span className="flex items-center gap-2"><KeyRound size={14} /> OTP Verification</span>
                <span className={`w-9 h-5 rounded-full relative transition ${otp ? "bg-emerald-500" : "bg-slate-200"}`}>
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${otp ? "left-4" : "left-0.5"}`} />
                </span>
              </button>
              {otp && (
                <div className="flex gap-2 pt-1">
                  {[0, 1, 2, 3].map((i) => <input key={i} maxLength={1} className="w-10 h-10 text-center border border-black/10 rounded-lg text-sm sa-font-display font-semibold" />)}
                  <button type="button" className="text-xs font-semibold" style={{ color: T.forest }}>Send OTP</button>
                </div>
              )}
              <button type="button" onClick={() => setTwofa((s) => !s)} className="flex items-center justify-between w-full text-xs font-medium text-slate-600 pt-1 border-t border-black/5">
                <span className="flex items-center gap-2 pt-2"><ShieldCheck size={14} /> Two-Factor Authentication</span>
                <span className={`w-9 h-5 rounded-full relative transition mt-2 ${twofa ? "bg-emerald-500" : "bg-slate-200"}`}>
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${twofa ? "left-4" : "left-0.5"}`} />
                </span>
              </button>
              <label className="flex items-center gap-2 text-xs text-slate-600 pt-2 border-t border-black/5 mt-2">
                <input type="checkbox" checked={captcha} onChange={() => setCaptcha((s) => !s)} className="accent-emerald-600 rounded" />
                I'm not a robot <span className="ml-auto text-[10px] text-slate-400 border border-black/10 rounded px-1.5 py-0.5">CAPTCHA</span>
              </label>
            </div>

            <button type="button" onClick={onLogin} className="w-full py-3 rounded-xl text-white text-sm font-semibold shadow-md hover:opacity-95 active:scale-[0.99] transition"
              style={{ background: `linear-gradient(135deg, ${T.forest}, ${T.forestDeep})` }}>
              Sign in to Admin Panel
            </button>
          </div>

          <div className="flex items-center justify-between mt-5 pt-4 border-t border-black/5 text-[11px] text-slate-400">
            <span className="flex items-center gap-1"><ShieldCheck size={12} /> 256-bit encrypted session</span>
            <button className="underline underline-offset-2">Login history</button>
          </div>
        </Card>
        <p className="text-center text-[11px] text-slate-400 mt-5">This portal is for authorized SaathApp personnel only. Unauthorized access is prohibited & logged.</p>
      </div>
    </div>
  );
};

/* ============================================================
   SIDEBAR
============================================================ */
const Sidebar = ({ active, onNavigate, allowedSet, collapsed, mobileOpen, setMobileOpen }) => {
  const isAllowed = (id) => !allowedSet || allowedSet.has(id);
  return (
    <>
      {mobileOpen && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setMobileOpen(false)} />}
      <aside className={`fixed lg:sticky top-0 h-screen z-40 ${collapsed ? "w-[76px]" : "w-[264px]"} shrink-0 transition-all duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        style={{ background: `linear-gradient(180deg, ${T.forestDeep}, #072A1B 70%)` }}>
        <div className="h-full flex flex-col sa-scrollbar overflow-y-auto">
          <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/10">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <Building2 size={18} className="text-white" />
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="sa-font-display text-white font-bold text-[15px] leading-none truncate">SAATHAPP</p>
                <p className="text-[10px] text-emerald-200/70 mt-1">Admin Console</p>
              </div>
            )}
          </div>

          <nav className="flex-1 px-3 py-4 space-y-5">
            {NAV_SECTIONS.map((sec) => {
              const visibleItems = sec.items.filter((it) => isAllowed(it.id));
              if (visibleItems.length === 0) return null;
              return (
                <div key={sec.label}>
                  {!collapsed && <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-200/50">{sec.label}</p>}
                  <div className="space-y-0.5">
                    {visibleItems.map((it) => {
                      const isActive = active === it.id;
                      return (
                        <button key={it.id} onClick={() => { onNavigate(it.id); setMobileOpen(false); }}
                          title={collapsed ? it.label : undefined}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all relative sa-font-body
                            ${isActive ? "bg-white/15 text-white font-semibold" : "text-emerald-100/70 hover:bg-white/8 hover:text-white"}`}>
                          {isActive && <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-full" style={{ background: T.amber }} />}
                          <it.icon size={17} className="shrink-0" />
                          {!collapsed && <span className="truncate">{it.label}</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="p-3 border-t border-white/10">
            <button onClick={() => onNavigate("__logout")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-200/80 hover:bg-white/8 hover:text-red-100 transition sa-font-body">
              <LogOut size={17} />
              {!collapsed && <span>Logout</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

/* ============================================================
   TOPBAR
============================================================ */
const Topbar = ({ title, role, setRole, onLogout, collapsed, setCollapsed, setMobileOpen, onToast }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [now, setNow] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 30000); return () => clearInterval(t); }, []);

  return (
    <header className="sticky top-0 z-20 sa-glass border-b border-black/5">
      <div className="flex items-center gap-3 px-4 lg:px-6 py-3.5">
        <button onClick={() => setMobileOpen((s) => !s)} className="lg:hidden p-2 rounded-lg hover:bg-slate-100">
          <Menu size={18} />
        </button>
        <button onClick={() => setCollapsed((s) => !s)} className="hidden lg:flex p-2 rounded-lg hover:bg-slate-100 text-slate-500">
          <PanelLeftClose size={18} />
        </button>

        <div className="hidden md:flex items-center gap-2 bg-white rounded-xl border border-black/10 px-3.5 py-2 flex-1 max-w-md">
          <Search size={15} className="text-slate-400" />
          <input placeholder="Search users, orders, sellers, settings..." className="outline-none text-sm w-full sa-font-body placeholder:text-slate-400" />
          <kbd className="text-[10px] text-slate-400 border border-black/10 rounded px-1.5 py-0.5">⌘K</kbd>
        </div>

        <div className="ml-auto flex items-center gap-1.5">
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-500 mr-2 sa-font-body">
            <Clock size={13} />
            {now.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" })} · {now.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
          </div>
          <button className="hidden sm:flex p-2 rounded-lg hover:bg-slate-100 text-slate-500"><Globe size={17} /></button>
          <button className="hidden sm:flex p-2 rounded-lg hover:bg-slate-100 text-slate-500"><Sun size={17} /></button>

          <div className="relative">
            <button onClick={() => { setNotifOpen((s) => !s); setProfileOpen(false); }} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 relative">
              <Bell size={17} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 sa-pulse" />
            </button>
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-black/10 shadow-xl overflow-hidden sa-rise">
                <div className="px-4 py-3 border-b border-black/5 font-semibold text-sm sa-font-body">Notifications</div>
                <div className="max-h-80 overflow-y-auto sa-scrollbar">
                  {[
                    { t: "New seller KYC pending review", time: "2m ago", icon: Store },
                    { t: "Fraud alert: suspicious order spike in Mumbai", time: "18m ago", icon: ShieldAlert },
                    { t: "Low stock alert — 12 warehouses affected", time: "1h ago", icon: AlertTriangle },
                  ].map((n, i) => (
                    <div key={i} className="flex gap-3 px-4 py-3 hover:bg-slate-50 border-b border-black/5 last:border-0">
                      <n.icon size={15} className="mt-0.5 shrink-0" color={T.forest} />
                      <div>
                        <p className="text-xs text-[#0B1420] sa-font-body">{n.t}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button onClick={() => { setProfileOpen((s) => !s); setNotifOpen(false); }} className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-xl hover:bg-slate-100">
              <div className="relative">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold sa-font-display" style={{ background: `linear-gradient(135deg, ${T.forest}, ${T.azure})` }}>AS</div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-semibold text-[#0B1420] leading-none sa-font-body">Admin User</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{role}</p>
              </div>
              <ChevronDown size={14} className="text-slate-400 hidden md:block" />
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl border border-black/10 shadow-xl overflow-hidden sa-rise z-50">
                <div className="px-4 py-3 border-b border-black/5">
                  <p className="text-sm font-semibold text-[#0B1420] sa-font-body">Admin User</p>
                  <p className="text-xs text-slate-400">admin@saathapp.com</p>
                </div>
                <div className="p-3 border-b border-black/5">
                  <p className="text-[10px] font-semibold uppercase text-slate-400 mb-1.5 tracking-wide">Preview as role (RBAC demo)</p>
                  <select value={role} onChange={(e) => { setRole(e.target.value); onToast(`Viewing as ${e.target.value}`); }}
                    className="w-full border border-black/10 rounded-lg px-2.5 py-1.5 text-xs sa-font-body outline-none">
                    {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <button className="w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 sa-font-body">Profile settings</button>
                <button className="w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 sa-font-body">Login history</button>
                <button onClick={onLogout} className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 flex items-center gap-2 sa-font-body">
                  <LogOut size={14} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

/* ============================================================
   APP ROOT
============================================================ */
export default function App() {
  const [authed, setAuthed] = useState(false);
  const [active, setActive] = useState("dashboard");
  const [role, setRole] = useState("Founder");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { const t = setTimeout(() => setMounted(true), 150); return () => clearTimeout(t); }, [authed]);

  const pushToast = useCallback((text) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, text }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2800);
  }, []);

  const allowedSet = useMemo(() => {
    const list = ROLE_ACCESS[role];
    return list ? new Set(list) : null;
  }, [role]);

  const navigate = (id) => {
    if (id === "__logout") { setAuthed(false); setActive("dashboard"); return; }
    if (allowedSet && !allowedSet.has(id) && id !== "settings") {
      pushToast("Restricted for your current role");
      return;
    }
    setActive(id);
  };

  if (!authed) {
    return (
      <div className="w-full min-h-screen">
        <FontStyle />
        <LoginPage onLogin={() => { setAuthed(true); pushToast("Welcome back, Admin"); }} />
      </div>
    );
  }

  const activeLabel = ALL_ITEMS.find((i) => i.id === active)?.label || "Dashboard";

  const renderPage = () => {
    switch (active) {
      case "dashboard": return <DashboardPage onNavigate={navigate} onToast={pushToast} mounted={mounted} />;
      case "analytics": return <AnalyticsPage />;
      case "reports": return <ReportsPage onToast={pushToast} />;
      case "fraud": return <FraudPage onToast={pushToast} />;
      case "ai": return <AIAssistantPage onToast={pushToast} />;
      case "health": return <SystemHealthPage />;
      case "settings": return <SettingsPage role={role} onToast={pushToast} />;
      default: return <ModulePage id={active} onToast={pushToast} />;
    }
  };

  return (
    <div className="w-full min-h-screen sa-font-body" style={{ background: T.paper }}>
      <FontStyle />
      <div className="flex">
        <Sidebar active={active} onNavigate={navigate} allowedSet={allowedSet} collapsed={collapsed} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <div className="flex-1 min-w-0">
          <Topbar title={activeLabel} role={role} setRole={setRole} onLogout={() => { setAuthed(false); }} collapsed={collapsed} setCollapsed={setCollapsed} setMobileOpen={setMobileOpen} onToast={pushToast} />
          <main className="p-4 lg:p-6 max-w-[1600px] mx-auto">
            {renderPage()}
          </main>
        </div>
      </div>
      <Toast toasts={toasts} />
    </div>
  );
}
