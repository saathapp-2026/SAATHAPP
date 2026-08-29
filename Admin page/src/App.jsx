import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate as useRouterNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Users, Store, Wrench, HardHat, Truck, Package, Tag,
  ShoppingCart, Warehouse, CreditCard, Wallet, Percent, Megaphone,
  Headphones, Bell, FileText, BarChart3, ClipboardList, UserCog,
  CheckSquare, Copy, MessageSquare, Video, Handshake, ShieldAlert, Sparkles,
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
import { generateReport } from "./utils/export/generateReport.js";

// Shopping Journey Imports
import ShoppingJourneyDashboard from './pages/ShoppingJourneyManager/Dashboard';
import MilestoneConfig from './pages/ShoppingJourneyManager/MilestoneConfig';
import WinnerSelection from './pages/ShoppingJourneyManager/WinnerSelection';
import Fulfillment from './pages/ShoppingJourneyManager/Fulfillment';
import { Gift, Award, Trophy, Box } from "lucide-react";
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
   NAV CONFIGURATION (FINAL SAATHAPP ADMIN SIDEBAR)
   - Preserves existing module ids where possible
   - Merges/renames items to match the requested 17 primary modules
============================================================ */
const NAV_SECTIONS = [
  {
    label: "Overview",
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { id: "analytics_reports", label: "Analytics & Reports", icon: BarChart3 },
    ],
  },
  {
    label: "Platform",
    items: [
      { id: "users", label: "Customers", icon: Users },
      { id: "sellers", label: "Sellers", icon: Store },
      { id: "professionals", label: "Service Professionals", icon: Wrench },
      { id: "workers", label: "Service Workers", icon: HardHat },
      { id: "vendors", label: "Wholesale Partners", icon: Handshake },
      { id: "delivery", label: "Delivery Partners", icon: Truck },
    ],
  },
  {
    label: "Catalog & Orders",
    items: [
      { id: "products_categories", label: "Products & Categories", icon: Package },
      { id: "saathpack_management", label: "SaathPack Management", icon: Box },
      { id: "orders", label: "Orders", icon: ShoppingCart },
      { id: "inventory", label: "Inventory", icon: Warehouse },
    ],
  },
  {
    label: "Money",
    items: [
      { id: "payments_finance", label: "Payments & Finance", icon: CreditCard },
    ],
  },
  {
    label: "Growth",
    items: [
      { id: "marketing_cms", label: "Marketing & CMS", icon: Megaphone },
      { id: "shopping_journey_dashboard", label: "Shopping Journey", icon: Gift },
      { id: "shopping_journey_milestones", label: "Milestones Config", icon: Award },
      { id: "shopping_journey_winners", label: "Winner Selection", icon: Trophy },
      { id: "shopping_journey_fulfillment", label: "Rewards Fulfillment", icon: Box },
    ],
  },
  {
    label: "Support & Operations",
    items: [
      { id: "support_ops", label: "Support & Operations", icon: Headphones },
    ],
  },
  {
    label: "Trust & System",
    items: [
      { id: "trust_safety", label: "Trust & Safety", icon: ShieldAlert },
      { id: "system", label: "System", icon: Activity },
    ],
  },
  {
    label: "Admin",
    items: [
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
  Admin: ["dashboard", "analytics_reports", "users", "sellers", "professionals", "workers", "vendors", "delivery", "products_categories", "saathpack_management", "orders", "inventory", "payments_finance", "marketing_cms", "support_ops", "trust_safety", "system", "settings"],
  HR: ["dashboard", "hr", "tasks", "chat", "meetings"],
  Finance: ["dashboard", "payments_finance", "payments", "finance", "reports", "coupons"],
  Operations: ["dashboard", "orders", "inventory", "delivery", "workers", "vendors", "tasks"],
  "Customer Support": ["dashboard", "support_ops", "support", "orders", "notifications", "chat"],
  Warehouse: ["dashboard", "inventory", "products_categories", "orders"],
  Marketing: ["dashboard", "marketing_cms", "ads", "coupons", "cms", "notifications", "analytics_reports"],
  Developer: ["dashboard", "system", "api", "flags", "health", "audit"],
  Moderator: ["dashboard", "trust_safety", "fraud", "support", "cms", "audit"],
  Intern: ["dashboard", "tasks", "chat"],
};

/* ============================================================
   GLOBAL ROUTE MAPPINGS (module-level so nested components can
   reference canonical paths without relying on App closure)
============================================================ */
const ID_TO_PATH = {
  dashboard: "/dashboard",
  analytics_reports: "/analytics-reports",
  analytics: "/analytics-reports/overview",
  reports: "/analytics-reports/reports",
  users: "/customers/overview",
  users_data: "/customers/data",
  users_profiles: "/customers/profiles",
  users_history: "/customers/history",
  users_orders: "/customers/orders",
  users_spending: "/customers/spending",
  users_activity: "/customers/activity",
  users_analytics: "/customers/analytics",
  sellers: "/sellers/overview",
  sellers_applications: "/sellers/applications",
  sellers_pending: "/sellers/pending",
  sellers_profiles: "/sellers/profiles",
  sellers_orders: "/sellers/orders",
  sellers_payouts: "/sellers/payouts",
  sellers_analytics: "/sellers/analytics",
  professionals: "/service-professionals",
  workers: "/service-workers",
  vendors: "/wholesale-partners",
  delivery: "/delivery-partners",
  products_categories: "/products-categories",
  saathpack_management: "/saathpack-management",
  products: "/products-categories/products",
  categories: "/products-categories/categories",
  orders: "/orders",
  orders_new: "/orders/new",
  inventory: "/inventory",
  payments_finance: "/payments-finance",
  payments: "/payments-finance/payments",
  finance: "/payments-finance/finance",
  marketing_cms: "/marketing-cms",
  ads: "/marketing-cms/ads",
  cms: "/marketing-cms/cms",
  coupons: "/marketing-cms/coupons",
  support_ops: "/support-operations",
  support: "/support-operations/support",
  support_complaints: "/support-operations/complaints",
  tasks: "/support-operations/tasks",
  chat: "/support-operations/chat",
  meetings: "/support-operations/meetings",
  trust_safety: "/trust-safety",
  trust_fraud: "/trust-safety/fraud",
  fraud: "/trust-safety/fraud",
  system: "/system",
  health: "/system/health",
  api: "/system/api",
  flags: "/system/flags",
  audit: "/system/audit",
  settings: "/settings/platform",
  settings_profile: "/settings/profile",
  settings_general: "/settings/general",
  settings_payment: "/settings/payment",
  settings_delivery: "/settings/delivery",
  settings_notification: "/settings/notification",
  settings_roles: "/settings/roles",
  settings_security: "/settings/security",
};

const PATH_TO_ID = (() => {
  const map = {};
  for (const [k, v] of Object.entries(ID_TO_PATH)) {
    if (!map[v]) map[v] = k;
  }
  return map;
})();

const ROUTE_PREFIX_TO_MODULE = {
  "/dashboard": "dashboard",
  "/analytics-reports": "analytics_reports",
  "/customers": "users",
  "/sellers": "sellers",
  "/service-professionals": "professionals",
  "/service-workers": "workers",
  "/wholesale-partners": "vendors",
  "/delivery-partners": "delivery",
  "/products-categories": "products_categories",
  "/saathpack-management": "saathpack_management",
  "/orders": "orders",
  "/inventory": "inventory",
  "/payments-finance": "payments_finance",
  "/marketing-cms": "marketing_cms",
  "/shopping-journey-dashboard": "shopping_journey_dashboard",
  "/shopping-journey-milestones": "shopping_journey_milestones",
  "/shopping-journey-winners": "shopping_journey_winners",
  "/shopping-journey-fulfillment": "shopping_journey_fulfillment",
  "/support-operations": "support_ops",
  "/trust-safety": "trust_safety",
  "/system": "system",
  "/settings": "settings"
};

/* ============================================================
   MODULE CONFIG for the generic ModulePage
   (title, kpis, table columns/rows, primary action)
============================================================ */
const MODULES = {
  users: {
    title: "Customers", subtitle: "Manage every customer registered on SaathApp.",
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
      ["UrbanCraft Store", "Partner Owner", "27PQRSX9988H1Z1", "10%", "4.3", "Pending KYC"],
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
      ["Brass Ganesh Murti", "Spiritual / Puja Items", "ABC Puja Store", "₹899", "25", "Pending Review"],
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
      ["Electricals", "-", "4,120", "Complete", "Active"],
      ["Grocery", "-", "12,980", "Complete", "Active"],
      ["Spiritual / Puja Items", "-", "45", "Complete", "Active"],
      ["Fresh Produce", "Grocery", "3,980", "Incomplete", "Active"],
      ["Cables & Wires", "Electricals", "840", "Complete", "Active"],
    ],
  },
  saathpack_dashboard: {
    title: "SaathPack Dashboard", subtitle: "Total Orders, Pending Procurement, Manufacturing, Quality Check, Ready for Dispatch, In Transit, Delivered.",
    primaryAction: "Refresh",
    kpis: [
      { label: "Live SKUs", value: "8", delta: "0", up: true },
      { label: "Pending Procurement", value: "24", delta: "+3", up: false },
      { label: "Orders Today", value: "15", delta: "+2", up: true },
      { label: "Avg Delivery", value: "6.5 Days", delta: "-0.5", up: true },
    ],
    columns: ["Total Orders", "Pending Procurement", "Manufacturing", "Quality Check", "Ready for Dispatch", "In Transit", "Delivered"],
    rows: [
      ["120", "24", "15", "8", "12", "30", "415"],
    ],
  },
  saathpack_products: {
    title: "SaathPack Products", subtitle: "Manage B2B packaging supplies catalogue.",
    primaryAction: "Add Product",
    kpis: [
      { label: "Live SKUs", value: "8", delta: "0", up: true },
    ],
    columns: ["Product", "Pack Size", "MOQ", "Pricing", "Specifications", "Status"],
    rows: [
      ["SaathApp Paper Bag (Medium)", "100 pcs", "100", "₹499", "Kraft Paper, 32x22x28 cm", "Active"],
      ["SaathApp Carton Box", "10 pcs", "10", "₹399", "Corrugated, 18x12x12 inch", "Active"],
      ["Aluminium Foil Roll", "1 Roll", "1", "₹249", "18 inch x 72 Meter", "Active"],
    ],
  },
  saathpack_manufacturers: {
    title: "Manufacturers / Suppliers", subtitle: "B2B suppliers for SaathPack packaging.",
    primaryAction: "Add Supplier",
    kpis: [
      { label: "Active Suppliers", value: "4", delta: "+1", up: true },
    ],
    columns: ["Manufacturer", "Product Supplied", "Capacity", "Rate", "Lead Time", "Quality Rating"],
    rows: [
      ["Packly Packaging Co.", "Paper Bags", "50,000/month", "₹6.50", "3 days", "4.8"],
      ["BoxIt India", "Corrugated Boxes", "20,000/month", "₹35.00", "5 days", "4.6"],
      ["WrapFlex", "Foil & Wraps", "10,000/month", "₹180.00", "2 days", "4.9"],
    ],
  },
  saathpack_orders: {
    title: "SaathPack Orders", subtitle: "Track wholesale orders through the fulfillment workflow.",
    primaryAction: "Export Orders",
    kpis: [
      { label: "Orders Today", value: "15", delta: "+2", up: true },
      { label: "Pending Procurement", value: "24", delta: "+3", up: false },
    ],
    columns: ["Order ID", "Business", "Total", "Items", "Status", "Delivery"],
    rows: [
      ["SP-391204", "Green Basket", "₹4,990", "10 Packs", "Procurement", "Pending"],
      ["SP-841922", "UrbanCraft Store", "₹2,490", "2 Rolls", "Dispatch", "On Time"],
      ["SP-119284", "QuickFix Hardware", "₹14,950", "30 Packs", "QC", "Delayed"],
      ["SP-991201", "Sunrise Foods", "₹1,245", "5 Packs", "Delivered", "Completed"],
    ],
  },
  orders: {
    title: "Orders", subtitle: "Live order tracking, modifications and cancellations.",
    primaryAction: "Create Order",
    kpis: [
      { label: "Orders Today", value: "8,204", delta: "+15%", up: true },
      { label: "Pending", value: "312", delta: "-40", up: true },
      { label: "Delivered", value: "6,912", delta: "+12%", up: true },
      { label: "Returns", value: "45", delta: "-5", up: true },
    ],
    columns: ["Order ID", "Customer", "Amount", "City", "Date", "Status"],
    rows: [
      ["ORD-99120", "Ravi Kumar", "₹420", "Mysuru", "Today", "Delivered"],
      ["ORD-99121", "Aisha Fernandes", "₹1,280", "Mumbai", "Today", "Processing"],
    ],
  },
  orders_details: {
    title: "Order Details", subtitle: "Deep-dive view into line items, timelines, and payment traces.",
    primaryAction: "Export Details",
    kpis: [{ label: "Line Items", value: "4", delta: "0", up: true }],
    columns: ["Item", "SKU", "Qty", "Price", "Fulfillment Status"],
    rows: [
      ["Copper Wire 2.5mm", "CW-25", "2", "₹3,798", "Packed"],
      ["Organic Toor Dal", "GRO-01", "1", "₹186", "Shipped"],
    ],
  },
  inventory: {
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
  analytics_reports: {
    title: "Analytics Overview", subtitle: "Platform-wide analytical datasets and raw exports.",
    primaryAction: "Export Data",
    kpis: [{ label: "Datasets", value: "45", delta: "+2", up: true }],
    columns: ["Dataset", "Category", "Last Updated", "Size", "Status"],
    rows: [
      ["Sales History Q3", "Revenue", "2 hours ago", "45 MB", "Active"],
      ["User Demographics", "Users", "Yesterday", "1.2 GB", "Active"],
      ["Fraud Patterns", "Trust & Safety", "1 hour ago", "800 MB", "Processing"],
    ],
  },
  analytics_sales: {
    title: "Sales Analytics", subtitle: "Granular breakdown of platform sales volume.",
    primaryAction: "Export Sales",
    kpis: [{ label: "Total Sales", value: "₹4.2Cr", delta: "+12%", up: true }],
    columns: ["Date", "Category", "Gross Sales", "Net Sales", "Trend"],
    rows: [
      ["Today", "Electronics", "₹12L", "₹10L", "Up"],
      ["Yesterday", "Fashion", "₹8L", "₹7L", "Down"],
    ],
  },
  analytics_orders: {
    title: "Order Analytics", subtitle: "Order volume, fulfillment rates, and drops.",
    primaryAction: "Export Orders",
    kpis: [{ label: "Fulfillment Rate", value: "98.2%", delta: "+0.5%", up: true }],
    columns: ["Region", "Total Orders", "Fulfilled", "Cancelled", "Avg Time"],
    rows: [
      ["North", "12,400", "12,100", "300", "1.2 Days"],
      ["South", "15,200", "15,000", "200", "1.1 Days"],
    ],
  },
  analytics_customers: {
    title: "Customer Analytics", subtitle: "Retention, acquisition, and cohort analysis.",
    primaryAction: "View Cohorts",
    kpis: [{ label: "Retention", value: "64%", delta: "+2%", up: true }],
    columns: ["Cohort", "Users", "Active", "Churned", "LTV"],
    rows: [
      ["Jan 2026", "45,000", "32,000", "13,000", "₹1,200"],
      ["Feb 2026", "52,000", "41,000", "11,000", "₹1,150"],
    ],
  },
  analytics_sellers: {
    title: "Seller Analytics", subtitle: "Seller performance and GMV contribution.",
    primaryAction: "Export Sellers",
    kpis: [{ label: "Avg Seller GMV", value: "₹4.5L", delta: "+5%", up: true }],
    columns: ["Seller Tier", "Total Sellers", "Total GMV", "Avg Rating", "Top Category"],
    rows: [
      ["Platinum", "120", "₹2.1Cr", "4.8", "Electronics"],
      ["Gold", "850", "₹5.4Cr", "4.5", "Fashion"],
    ],
  },
  analytics_professionals: {
    title: "Service Pro Analytics", subtitle: "Booking volume and rating distributions.",
    primaryAction: "Export Pros",
    kpis: [{ label: "Completion Rate", value: "94%", delta: "+1%", up: true }],
    columns: ["Service Type", "Bookings", "Completed", "Avg Rating", "Revenue"],
    rows: [
      ["Plumbing", "4,500", "4,300", "4.6", "₹45L"],
      ["Electrician", "3,200", "3,100", "4.7", "₹32L"],
    ],
  },
  analytics_workers: {
    title: "Service Worker Analytics", subtitle: "Task completion and shift analytics.",
    primaryAction: "Export Workers",
    kpis: [{ label: "Active Workers", value: "8,400", delta: "+120", up: true }],
    columns: ["Region", "Workers", "Tasks Assigned", "Completed", "Avg Hours"],
    rows: [
      ["Delhi NCR", "2,400", "12,000", "11,500", "8.2"],
      ["Mumbai", "3,100", "15,000", "14,200", "8.5"],
    ],
  },
  analytics_wholesale: {
    title: "Wholesale Analytics", subtitle: "B2B order volume and bulk pricing trends.",
    primaryAction: "Export Wholesale",
    kpis: [{ label: "B2B Volume", value: "₹8.5Cr", delta: "+15%", up: true }],
    columns: ["Vendor", "Total Orders", "Bulk Volume", "Avg Discount", "Status"],
    rows: [
      ["MegaMart", "45", "₹1.2Cr", "15%", "Active"],
      ["RetailPro", "32", "₹85L", "12%", "Active"],
    ],
  },
  analytics_delivery: {
    title: "Delivery Analytics", subtitle: "Delivery times, costs, and partner performance.",
    primaryAction: "Export Logistics",
    kpis: [{ label: "Avg Delivery Time", value: "42 mins", delta: "-3 mins", up: true }],
    columns: ["Partner", "Deliveries", "On-Time", "Delayed", "Cost/Order"],
    rows: [
      ["ExpressLogistics", "125,000", "98%", "2%", "₹42"],
      ["CityRunners", "85,000", "95%", "5%", "₹38"],
    ],
  },
  analytics_marketing: {
    title: "Marketing Analytics", subtitle: "Campaign ROI, CAC, and conversion rates.",
    primaryAction: "Export Marketing",
    kpis: [{ label: "Blended CAC", value: "₹145", delta: "-₹12", up: true }],
    columns: ["Campaign", "Spend", "Impressions", "Conversions", "ROI"],
    rows: [
      ["Diwali Blast", "₹5L", "2.1M", "45,000", "3.2x"],
      ["Summer Sale", "₹3L", "1.5M", "28,000", "2.8x"],
    ],
  },
  analytics_finance: {
    title: "Financial Analytics", subtitle: "Cash flow, margins, and settlement times.",
    primaryAction: "Export Financials",
    kpis: [{ label: "Gross Margin", value: "24.5%", delta: "+1.2%", up: true }],
    columns: ["Category", "Revenue", "COGS", "Gross Margin", "Net Margin"],
    rows: [
      ["Marketplace", "₹12Cr", "₹9Cr", "25%", "12%"],
      ["Services", "₹4Cr", "₹2.5Cr", "37%", "18%"],
    ],
  },
  fraud: {
    title: "Fraud Alerts", subtitle: "Real-time monitoring of suspicious activity.",
    primaryAction: "Review Alerts",
    kpis: [{ label: "New Alerts", value: "24", delta: "+5", up: false }, { label: "Critical", value: "3", delta: "-1", up: true }],
    columns: ["Alert ID", "Partner", "Type", "Risk Level", "Status"],
    rows: [
      ["FA-991", "Store A", "Fake Reviews", "High", "Open"],
      ["FA-992", "User B", "Stolen Card", "Critical", "Investigating"],
    ],
  },
  risk: {
    title: "Risk Monitoring", subtitle: "Continuous risk assessment for partners.",
    primaryAction: "Run Scan",
    kpis: [{ label: "High Risk", value: "12", delta: "-2", up: true }, { label: "Avg Score", value: "85/100", delta: "+1", up: true }],
    columns: ["Partner", "Risk Score", "Risk Level", "Last Review", "Status"],
    rows: [
      ["Vendor X", "92", "High", "Today", "Flagged"],
      ["Seller Y", "45", "Low", "Yesterday", "Clear"],
    ],
  },
  warnings: {
    title: "Account Warnings", subtitle: "Policy violations and issued warnings.",
    primaryAction: "Issue Warning",
    kpis: [{ label: "Active Warnings", value: "45", delta: "+12", up: false }],
    columns: ["Account", "Reason", "Severity", "Issued", "Status"],
    rows: [
      ["Seller Z", "Late Shipments", "Medium", "2 days ago", "Active"],
    ],
  },
  suspensions: {
    title: "Suspensions", subtitle: "Temporarily or permanently suspended accounts.",
    primaryAction: "Review Suspensions",
    kpis: [{ label: "Suspended", value: "8", delta: "-1", up: true }],
    columns: ["Account", "Reason", "End Date", "Admin", "Status"],
    rows: [
      ["Store B", "Counterfeit", "Permanent", "Admin 1", "Suspended"],
    ],
  },
  abuse: {
    title: "Abuse Reports", subtitle: "User-submitted reports of abusive behavior.",
    primaryAction: "Review Reports",
    kpis: [{ label: "Pending", value: "15", delta: "+2", up: false }],
    columns: ["Report ID", "Account", "Reason", "Severity", "Status"],
    rows: [
      ["AR-101", "User C", "Harassment", "High", "Open"],
    ],
  },
  incidents: {
    title: "Safety Incidents", subtitle: "Critical safety incidents requiring immediate action.",
    primaryAction: "Log Incident",
    kpis: [{ label: "Open Incidents", value: "2", delta: "0", up: true }],
    columns: ["Incident ID", "Type", "Severity", "Date", "Status"],
    rows: [
      ["SI-05", "Physical altercation", "Critical", "Today", "Investigating"],
    ],
  },
  health: {
    title: "System Health", subtitle: "Overall platform and infrastructure status.",
    primaryAction: "Run Diagnostics",
    kpis: [{ label: "Uptime", value: "99.99%", delta: "0", up: true }, { label: "DB Latency", value: "45ms", delta: "-5ms", up: true }],
    columns: ["Service", "Status", "Latency", "Last Check", "Action"],
    rows: [
      ["Main Database", "Operational", "45ms", "1m ago", "View"],
      ["Payment Gateway", "Operational", "120ms", "1m ago", "View"],
      ["Search Service", "Degraded", "850ms", "1m ago", "Restart"],
    ],
  },
  promotions: {
    title: "Promotions", subtitle: "Active promotional campaigns and discounts.",
    primaryAction: "Create Promo",
    kpis: [{ label: "Active", value: "14", delta: "+2", up: true }],
    columns: ["Promo Code", "Type", "Usage", "Expiry", "Status"],
    rows: [
      ["SUMMER26", "Percentage", "12,400", "Next Month", "Active"],
      ["WELCOME", "Fixed", "45,000", "Never", "Active"],
    ],
  },
  campaigns: {
    title: "Marketing Campaigns", subtitle: "Omnichannel marketing campaigns.",
    primaryAction: "New Campaign",
    kpis: [{ label: "Running", value: "5", delta: "+1", up: true }, { label: "Spend", value: "₹1.2L", delta: "-10%", up: true }],
    columns: ["Campaign", "Channel", "Budget", "Spend", "Status"],
    rows: [
      ["Diwali Blast", "Email/SMS", "₹50k", "₹12k", "Active"],
      ["Re-engagement", "Push", "₹10k", "₹4k", "Active"],
    ],
  },
  settings_profile: {
    title: "Admin Profile", subtitle: "Manage your personal admin account settings.",
    primaryAction: "Edit Profile",
    kpis: [],
    columns: ["Property", "Value", "Visibility", "Last Updated", "Action"],
    rows: [
      ["Name", "Admin User", "Private", "Today", "Edit"],
      ["Email", "admin@saathapp.com", "Private", "1 month ago", "Edit"],
      ["Phone", "+91 99999 99999", "Private", "1 month ago", "Edit"],
    ],
  },
  settings_general: {
    title: "General Settings", subtitle: "Platform-wide configuration and details.",
    primaryAction: "Save Changes",
    kpis: [],
    columns: ["Setting", "Value", "Category", "Modified By", "Status"],
    rows: [
      ["Platform Name", "SaathApp", "Branding", "System", "Active"],
      ["Support Email", "support@saathapp.com", "Contact", "Admin", "Active"],
    ],
  },
  settings_payment: {
    title: "Payment Settings", subtitle: "Configure gateways, COD, and settlements.",
    primaryAction: "Add Gateway",
    kpis: [],
    columns: ["Method", "Provider", "Status", "Fee", "Action"],
    rows: [
      ["UPI", "Razorpay", "Active", "0%", "Configure"],
      ["Credit Card", "Stripe", "Active", "2%", "Configure"],
      ["COD", "Internal", "Active", "₹50", "Configure"],
    ],
  },
  settings_delivery: {
    title: "Delivery Settings", subtitle: "Zones, fees, and partner configurations.",
    primaryAction: "Add Zone",
    kpis: [],
    columns: ["Zone", "Base Fee", "Per Km", "Status", "Action"],
    rows: [
      ["Tier 1 Cities", "₹40", "₹10", "Active", "Edit"],
      ["Tier 2 Cities", "₹50", "₹12", "Active", "Edit"],
    ],
  },
  settings_notification: {
    title: "Notification Settings", subtitle: "Manage SMS, Email, and Push alerts.",
    primaryAction: "Save Preferences",
    kpis: [],
    columns: ["Event", "Email", "SMS", "Push", "Status"],
    rows: [
      ["Order Placed", "Yes", "Yes", "Yes", "Active"],
      ["Payment Failed", "Yes", "Yes", "No", "Active"],
      ["New Seller Signup", "Yes", "No", "No", "Active"],
    ],
  },
  settings_roles: {
    title: "Roles & Permissions", subtitle: "Manage RBAC access levels for staff.",
    primaryAction: "Create Role",
    kpis: [],
    columns: ["Role", "Users", "Permissions", "Created", "Action"],
    rows: [
      ["Super Admin", "2", "All Access", "System", "View"],
      ["Support Agent", "45", "Limited", "Admin", "Edit"],
      ["Finance Manager", "8", "Finance Only", "Admin", "Edit"],
    ],
  },
  settings_security: {
    title: "Security Settings", subtitle: "2FA, sessions, and access logs.",
    primaryAction: "Review Logs",
    kpis: [],
    columns: ["Feature", "Status", "Last Audit", "Risk Level", "Action"],
    rows: [
      ["Two-Factor Auth (2FA)", "Enforced", "Today", "Low", "Configure"],
      ["Session Timeout", "30 mins", "Yesterday", "Low", "Configure"],
      ["IP Whitelisting", "Disabled", "1 month ago", "High", "Configure"],
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
    title: "Wholesale Partners", subtitle: "External vendors, contracts and payments.",
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

const downloadCSV = (filename, headers, rows) => {
  const escaped = rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","));
  const csv = [headers.join(","), ...escaped].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const safeNumber = (value) => {
  if (typeof value === "number") return value;
  const parsed = Number(String(value).replace(/[^0-9.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
};

const formatCurrency = (value) => {
  const number = safeNumber(value);
  return `₹${number.toLocaleString("en-IN")}`;
};

const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
const validatePhone = (value) => {
  const digits = String(value).replace(/\D/g, "");
  return /^(?:91)?[6-9]\d{9}$/.test(digits);
};
const validateGST = (value) => /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(String(value).trim().toUpperCase());
const validatePAN = (value) => /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(String(value).trim().toUpperCase());
const validatePassword = (value) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/.test(String(value));
const validateFile = (file) => {
  if (!file) return false;
  const allowed = ["image/png", "image/jpeg", "image/jpg", "image/webp", "application/pdf"];
  return allowed.includes(file.type) && file.size <= 5 * 1024 * 1024;
};

const Modal = ({ title, children, open, onClose, footer }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/35 p-4">
      <div className="w-full max-w-3xl rounded-[28px] bg-white shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
          <div>
            <p className="sa-font-display text-lg font-bold text-slate-900">{title}</p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-900 p-2 rounded-full">×</button>
        </div>
        <div className="max-h-[80vh] overflow-y-auto p-6">{children}</div>
        {footer && <div className="border-t border-slate-200 px-6 py-4 bg-slate-50">{footer}</div>}
      </div>
    </div>
  );
};

const ConfirmDialog = ({ open, title, message, confirmLabel = "Delete", cancelLabel = "Cancel", onCancel, onConfirm, loading }) => (
  <Modal
    title={title}
    open={open}
    onClose={onCancel}
    footer={(
      <div className="flex justify-end gap-3">
        <button onClick={onCancel} className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 bg-white">{cancelLabel}</button>
        <button onClick={onConfirm} disabled={loading} className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 disabled:opacity-60">
          {loading ? "Deleting..." : confirmLabel}
        </button>
      </div>
    )}
  >
    <div className="space-y-4 text-sm text-slate-600">
      <p>{message}</p>
    </div>
  </Modal>
);

const ActionMenu = ({ actions, open, onClose }) => {
  if (!open) return null;
  return (
    <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-slate-200 bg-white shadow-lg z-20">
      <div className="p-2">
        {actions.map((action) => (
          <button
            key={action.label}
            type="button"
            onClick={() => { action.onClick(); onClose?.(); }}
            className={`w-full text-left rounded-xl px-3 py-2 text-sm flex items-center gap-2 ${action.destructive ? "text-rose-600 hover:bg-rose-50" : "text-slate-700 hover:bg-slate-100"}`}
          >
            {action.icon && <action.icon size={14} />}
            <span>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const buildReviewRows = (fields, values) => fields.filter(f => !f.condition || f.condition(values)).map((field) => ({ label: field.label, value: String(values[field.name] || "-") }));

const ViewDialog = ({ open, title, fields, values, onClose }) => {
  if (!open) return null;
  return (
    <Modal
      title={title}
      open={open}
      onClose={onClose}
      footer={(
        <div className="flex justify-end">
          <button onClick={onClose} className="px-4 py-2 rounded-xl border border-slate-300 bg-white text-slate-700">Close</button>
        </div>
      )}
    >
      <div className="space-y-4">
        {fields.map((field) => (
          <div key={field.name} className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
            <p className="text-xs font-semibold text-slate-500 mb-1">{field.label}</p>
            <p className="text-sm text-slate-900">{field.type === "file" ? (values[field.name]?.name ?? "No file") : String(values[field.name] ?? "—")}</p>
          </div>
        ))}
      </div>
    </Modal>
  );
};

const EntityFormModal = ({ open, title, fields, values, onChange, onClose, onSave, loading, step, setStep, steps, validationErrors }) => {
  if (!open) return null;
  const filteredSteps = steps.map(s => ({
    ...s,
    fields: s.fields ? s.fields.filter(f => !f.condition || f.condition(values)) : undefined
  })).filter(s => !s.fields || s.fields.length > 0);

  const currentStepIndex = Math.min(step, filteredSteps.length - 1);
  const currentStep = filteredSteps[currentStepIndex];

  return (
    <Modal
      title={`${title} ${currentStepIndex === filteredSteps.length - 1 ? "Review" : ""}`}
      open={open}
      onClose={onClose}
      footer={(
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex gap-2 text-xs text-slate-500">Step {currentStepIndex + 1} of {filteredSteps.length}</div>
          <div className="flex gap-3">
            {currentStepIndex > 0 && <button type="button" onClick={() => setStep((s) => Math.max(0, s - 1))} className="px-4 py-2 rounded-xl border border-slate-300 bg-white text-slate-700">Back</button>}
            <button type="button" onClick={currentStepIndex < filteredSteps.length - 1 ? () => setStep((s) => Math.min(filteredSteps.length - 1, s + 1)) : onSave} disabled={loading} className="px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-60">
              {loading ? "Saving..." : currentStepIndex < filteredSteps.length - 1 ? "Next" : "Create"}
            </button>
          </div>
        </div>
      )}
    >
      <div className="space-y-5">
        <div className="flex flex-wrap gap-2 text-xs text-slate-500">
          {filteredSteps.map((stepInfo, i) => (
            <div key={stepInfo.label} className={`rounded-full px-3 py-1 ${i === currentStepIndex ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{stepInfo.label}</div>
          ))}
        </div>
        {currentStep.fields ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {currentStep.fields.map((field) => {
              if (field.condition && !field.condition(values)) return null;

              if (field.type === "textarea") {
                return (
                  <label key={field.name} className="space-y-2 text-sm text-slate-700">
                    <span className="font-medium">{field.label}{field.required ? " *" : ""}</span>
                    <textarea
                      value={values[field.name] ?? ""}
                      onChange={(e) => onChange(field.name, e.target.value)}
                      rows={4}
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-300"
                    />
                    {validationErrors[field.name] && <span className="text-rose-600 text-xs">{validationErrors[field.name]}</span>}
                  </label>
                );
              }
              if (field.type === "select") {
                return (
                  <label key={field.name} className="space-y-2 text-sm text-slate-700">
                    <span className="font-medium">{field.label}{field.required ? " *" : ""}</span>
                    <select value={values[field.name] ?? field.default ?? ""} onChange={(e) => onChange(field.name, e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-300">
                      <option value="">Select</option>
                      {field.options?.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                    {validationErrors[field.name] && <span className="text-rose-600 text-xs">{validationErrors[field.name]}</span>}
                  </label>
                );
              }
              if (field.type === "file") {
                return (
                  <label key={field.name} className="space-y-2 text-sm text-slate-700">
                    <span className="font-medium">{field.label}{field.required ? " *" : ""}</span>
                    <input type="file" accept={field.accept || "image/*"} onChange={(e) => onChange(field.name, e.target.files?.[0] ?? null)} className="w-full text-sm text-slate-600" />
                    {values[field.name] && <p className="text-xs text-slate-500">Selected: {values[field.name].name || values[field.name]}</p>}
                    {validationErrors[field.name] && <span className="text-rose-600 text-xs">{validationErrors[field.name]}</span>}
                  </label>
                );
              }
              return (
                <label key={field.name} className="space-y-2 text-sm text-slate-700">
                  <span className="font-medium">{field.label}{field.required ? " *" : ""}</span>
                  <input
                    type={field.type || "text"}
                    value={values[field.name] ?? ""}
                    onChange={(e) => onChange(field.name, e.target.value)}
                    placeholder={field.placeholder || ""}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-300"
                  />
                  {validationErrors[field.name] && <span className="text-rose-600 text-xs">{validationErrors[field.name]}</span>}
                </label>
              );
            })}
          </div>
        ) : (
          <div className="space-y-3">
            {(typeof currentStep.review === "function" ? currentStep.review(values) : currentStep.review)?.map((item) => (
              <div key={item.label} className="flex justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm">
                <span className="text-slate-600">{item.label}</span>
                <span className="font-medium text-slate-900">{item.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};

const MODULE_FORMS = {
  users: {
    entity: "User",
    fields: [
      { name: "name", label: "Full Name", required: true, section: "basic" },
      { name: "email", label: "Email", type: "email", required: true, section: "basic" },
      { name: "phone", label: "Phone", type: "tel", required: true, section: "basic" },
      { name: "city", label: "City", required: true, section: "basic" },
      { name: "status", label: "Status", type: "select", options: ["Active", "Pending KYC", "Suspended"], default: "Pending KYC", section: "business" },
      { name: "notes", label: "Notes", type: "textarea", section: "business" },
    ],
    toRow: (values) => [values.name, values.phone, values.city, "₹0", values.status || "Pending KYC", "Just now"],
    fromRow: (row) => ({ name: row[0], phone: row[1], city: row[2], status: row[4], email: "" }),
    duplicateSuffix: "copy",
    rowActions: (rowObj, handlers) => [
      { label: "View Profile", onClick: () => handlers.view(rowObj), icon: Eye },
      { label: "Edit", onClick: () => handlers.edit(rowObj), icon: CheckSquare },
      { label: "Duplicate", onClick: () => handlers.duplicate(rowObj), icon: Copy },
      { label: rowObj.data[4] === "Active" ? "Suspend" : "Activate", onClick: () => handlers.toggleStatus(rowObj), icon: ShieldCheck, destructive: rowObj.data[4] !== "Active" },
      { label: "Delete", onClick: () => handlers.delete(rowObj), destructive: true },
    ],
  },
  sellers: {
    entity: "Seller",
    fields: [
      { name: "store", label: "Store Name", required: true, section: "basic" },
      { name: "owner", label: "Owner", required: true, section: "basic" },
      { name: "gst", label: "GST Number", required: true, section: "business" },
      { name: "commission", label: "Commission (%)", type: "text", required: true, section: "business" },
      { name: "rating", label: "Rating", type: "text", required: true, section: "business" },
      { name: "status", label: "Status", type: "select", options: ["Active", "Pending KYC", "Suspended"], default: "Pending KYC", section: "business" },
    ],
    toRow: (values) => [values.store, values.owner, values.gst, `${values.commission || "8"}%`, values.rating || "0", values.status || "Pending KYC"],
    fromRow: (row) => ({ store: row[0], owner: row[1], gst: row[2], commission: String((row[3] || "").replace("%", "")), rating: row[4], status: row[5] }),
    duplicateSuffix: "copy",
    rowActions: (rowObj, handlers) => [
      { label: "View", onClick: () => handlers.view(rowObj), icon: Eye },
      { label: "Edit", onClick: () => handlers.edit(rowObj), icon: CheckSquare },
      { label: rowObj.data[5] === "Active" ? "Suspend" : "Activate", onClick: () => handlers.toggleStatus(rowObj), icon: ShieldCheck, destructive: rowObj.data[5] !== "Active" },
      { label: rowObj.data[5] === "Pending KYC" ? "Verify" : "Approve", onClick: () => handlers.verify(rowObj), icon: BadgeCheck },
      { label: "Delete", onClick: () => handlers.delete(rowObj), destructive: true },
    ],
  },
  delivery: {
    entity: "Delivery Partner",
    fields: [
      { name: "name", label: "Partner Name", required: true, section: "basic" },
      { name: "vehicle", label: "Vehicle", required: true, section: "basic" },
      { name: "city", label: "City", required: true, section: "basic" },
      { name: "orders", label: "Orders Today", type: "text", section: "business" },
      { name: "rating", label: "Rating", type: "text", section: "business" },
      { name: "status", label: "Status", type: "select", options: ["Online", "Offline"], default: "Online", section: "business" },
    ],
    toRow: (values) => [values.name, values.vehicle, values.city, values.orders || "0", values.rating || "0", values.status || "Online"],
    fromRow: (row) => ({ name: row[0], vehicle: row[1], city: row[2], orders: row[3], rating: row[4], status: row[5] }),
    duplicateSuffix: "copy",
    rowActions: (rowObj, handlers) => [
      { label: "View", onClick: () => handlers.view(rowObj), icon: Eye },
      { label: "Edit", onClick: () => handlers.edit(rowObj), icon: CheckSquare },
      { label: rowObj.data[5] === "Online" ? "Go Offline" : "Go Online", onClick: () => handlers.toggleStatus(rowObj), icon: ShieldCheck },
      { label: "Complete Delivery", onClick: () => handlers.complete(rowObj), icon: CheckCircle2 },
      { label: "Delete", onClick: () => handlers.delete(rowObj), destructive: true },
    ],
  },
  products: {
    entity: "Product",
    fields: [
      { name: "product", label: "Product Name", required: true, section: "basic" },
      { name: "category", label: "Category", required: true, section: "basic" },
      { name: "subCategory", label: "Subcategory", type: "text", section: "basic", condition: (values) => values.category?.toLowerCase() === "grocery" },
      { name: "seller", label: "Seller", required: true, section: "basic" },
      { name: "price", label: "Price", type: "text", required: true, section: "business" },
      { name: "stock", label: "Stock Quantity", type: "text", required: true, section: "business" },
      { name: "groceryTier", label: "Grocery Tier", type: "select", options: ["NORMAL", "PREMIUM"], default: "NORMAL", section: "business", condition: (values) => values.category?.toLowerCase() === "grocery" },
      { name: "electronicsType", label: "Electronics Type", type: "select", options: ["Mobile", "Laptop", "TV", "Accessories", "Other"], section: "business", condition: (values) => values.category?.toLowerCase() === "electronics" },
      { name: "spiritualType", label: "Spiritual Type", type: "select", options: ["Puja Samagri", "Idols", "Books", "Prasad", "Other"], section: "business", condition: (values) => values.category?.toLowerCase() === "spiritual-puja" },
      { name: "productTier", label: "Product Tier", type: "select", options: ["NORMAL", "PREMIUM"], default: "NORMAL", section: "business" },
      { name: "availabilityMode", label: "Availability Mode", type: "select", options: ["REGULAR", "LIMITED"], default: "REGULAR", section: "business" },
      { name: "productionQuantity", label: "Production Quantity", type: "text", section: "premium", condition: (values) => values.productTier === "PREMIUM" },
      { name: "allocatedQuantity", label: "Allocated Quantity", type: "text", section: "premium", condition: (values) => values.productTier === "PREMIUM" },
      { name: "batchId", label: "Batch ID", type: "text", section: "premium", condition: (values) => values.productTier === "PREMIUM" },
      { name: "materials", label: "Materials", type: "text", section: "premium", condition: (values) => values.productTier === "PREMIUM" },
      { name: "craftsmanship", label: "Craftsmanship", type: "text", section: "premium", condition: (values) => values.productTier === "PREMIUM" },
      { name: "packaging", label: "Packaging", type: "text", section: "premium", condition: (values) => values.productTier === "PREMIUM" },
      { name: "warranty", label: "Warranty", type: "text", section: "premium", condition: (values) => values.productTier === "PREMIUM" },
      { name: "status", label: "Status", type: "select", options: ["Pending", "Active", "Rejected"], default: "Pending", section: "business" },
      { name: "promoActive", label: "Promotion Active", type: "select", options: ["No", "Yes"], default: "No", section: "business" },
      { name: "promoType", label: "Promotion Type", type: "select", options: ["None", "NORMAL_GROCERY_DEAL", "PREMIUM_GROCERY_DEAL", "BUY_1_GET_1", "COMBO", "FESTIVAL", "MEMBER", "SELLER"], default: "None", section: "business", condition: (values) => values.promoActive === "Yes" },
      { name: "promoDiscount", label: "Discount %", type: "text", section: "business", condition: (values) => values.promoActive === "Yes" },
    ],
    toRow: (values) => {
      // Clean up stale premium data if toggled to NORMAL
      const cleanValues = { ...values };
      if (cleanValues.productTier === 'NORMAL') {
        delete cleanValues.productionQuantity;
        delete cleanValues.allocatedQuantity;
        delete cleanValues.batchId;
        delete cleanValues.materials;
        delete cleanValues.craftsmanship;
        delete cleanValues.packaging;
        delete cleanValues.warranty;
      }
      if (cleanValues.category?.toLowerCase() !== 'grocery') {
        delete cleanValues.groceryTier;
        delete cleanValues.subCategory;
      }
      if (cleanValues.category?.toLowerCase() !== 'electronics') {
        delete cleanValues.electronicsType;
      }
      if (cleanValues.category?.toLowerCase() !== 'spiritual-puja') {
        delete cleanValues.spiritualType;
      }
      if (cleanValues.promoActive === 'No') {
        delete cleanValues.promoType;
        delete cleanValues.promoDiscount;
      }
      // Edge Case: Invalidating cross-vertical promos
      if (cleanValues.promoType === 'PREMIUM_GROCERY_DEAL' && (cleanValues.category?.toLowerCase() !== 'grocery' || cleanValues.groceryTier !== 'PREMIUM')) {
        cleanValues.promoType = 'None';
        cleanValues.promoActive = 'No';
      }
      if (cleanValues.promoType === 'NORMAL_GROCERY_DEAL' && (cleanValues.category?.toLowerCase() !== 'grocery' || cleanValues.groceryTier === 'PREMIUM')) {
        cleanValues.promoType = 'None';
        cleanValues.promoActive = 'No';
      }
      return [cleanValues.product, cleanValues.category, cleanValues.seller, cleanValues.price, cleanValues.stock, cleanValues.status, cleanValues];
    },
    fromRow: (row) => {
      const savedVals = row[6] || {};
      return {
        product: row[0], category: row[1], seller: row[2], price: row[3], stock: row[4], status: row[5],
        productTier: savedVals.productTier || "NORMAL",
        groceryTier: savedVals.groceryTier || "NORMAL",
        subCategory: savedVals.subCategory || "",
        electronicsType: savedVals.electronicsType || "",
        spiritualType: savedVals.spiritualType || "",
        availabilityMode: savedVals.availabilityMode || "REGULAR",
        productionQuantity: savedVals.productionQuantity || "",
        allocatedQuantity: savedVals.allocatedQuantity || "",
        batchId: savedVals.batchId || "",
        materials: savedVals.materials || "",
        craftsmanship: savedVals.craftsmanship || "",
        packaging: savedVals.packaging || "",
        warranty: savedVals.warranty || "",
        promoActive: savedVals.promoActive || "No",
        promoType: savedVals.promoType || "None",
        promoDiscount: savedVals.promoDiscount || "",
      };
    },
    duplicateSuffix: "copy",
    rowActions: (rowObj, handlers) => [
      { label: "View", onClick: () => handlers.view(rowObj), icon: Eye },
      { label: "Edit", onClick: () => handlers.edit(rowObj), icon: CheckSquare },
      { label: rowObj.data[5] === "Active" ? "Draft" : "Publish", onClick: () => handlers.toggleStatus(rowObj), icon: ShieldCheck, destructive: rowObj.data[5] === "Active" },
      { label: "Delete", onClick: () => handlers.delete(rowObj), destructive: true },
    ],
  },
  orders: {
    entity: "Order",
    fields: [
      { name: "orderId", label: "Order ID", type: "text", required: true },
      { name: "customer", label: "Customer", type: "text", required: true },
      { name: "amount", label: "Amount", type: "text", required: true },
      { name: "city", label: "City", type: "text", required: true },
      { name: "date", label: "Date", type: "text", required: true },
      { name: "status", label: "Status", type: "select", options: ["Processing", "Packed", "Shipped", "Delivered"], default: "Processing" },
      { name: "itemsJson", label: "Order Items (JSON)", type: "textarea", section: "details" },
      { name: "breakdownJson", label: "Payment Breakdown (JSON)", type: "textarea", section: "details" }
    ],
    toRow: (values) => [values.orderId, values.customer, values.amount, values.city, values.date, values.status, { items: JSON.parse(values.itemsJson || "[]"), breakdown: JSON.parse(values.breakdownJson || "{}") }],
    fromRow: (row) => ({
      orderId: row[0], customer: row[1], amount: row[2], city: row[3], date: row[4], status: row[5],
      itemsJson: JSON.stringify(row[6]?.items || [], null, 2),
      breakdownJson: JSON.stringify(row[6]?.breakdown || {}, null, 2)
    }),
    rowActions: (rowObj, handlers) => [
      { label: "View Details", onClick: () => handlers.view(rowObj), icon: Eye },
      { label: "Delete", onClick: () => handlers.delete(rowObj), destructive: true },
    ],
  },
};

const mergeSteps = (fields) => {
  const sections = Array.from(new Set(fields.map((field) => field.section || "basic")));
  return [
    ...sections.map((section) => ({
      label: section === "basic" ? "Basic Info" : section === "business" ? "Business Details" : section === "premium" ? "Premium Details" : section,
      fields: fields.filter((field) => (field.section || "basic") === section),
    })),
    { label: "Review", review: (values) => buildReviewRows(fields, values) },
  ];
};

const normalizeFieldName = (name) => String(name).toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
const createGenericFields = (columns) => columns.map((col) => {
  const name = normalizeFieldName(col);
  let type = "text";
  if (/email/i.test(col)) type = "email";
  else if (/phone|mobile|contact/i.test(col)) type = "tel";
  else if (/amount|price|commission|discount|orders|stock|rating|available|percentage|payout/i.test(col)) type = "text";
  else if (/status/i.test(col)) type = "select";
  return {
    name,
    label: col,
    type,
    required: true,
    section: /status/i.test(col) ? "business" : "basic",
    options: /status/i.test(col) ? ["Active", "Pending", "Suspended", "Draft", "Online", "Offline", "Scheduled", "Resolved"] : undefined,
  };
});
const valuesFromRow = (columns, row) => Object.fromEntries(columns.map((col, index) => [normalizeFieldName(col), row[index]]));
const rowFromValues = (columns, values) => columns.map((col) => values[normalizeFieldName(col)] ?? "");

const getReportDefinition = (reportId) => {
  const orderRows = MODULES.orders.rows;
  const sellerRows = MODULES.sellers.rows;
  const deliveryRows = MODULES.delivery.rows;
  const employeeRows = MODULES.hr.rows;
  const inventoryRows = MODULES.inventory.rows;
  const financeRows = MODULES.finance.rows;

  const salesRows = revenueSeries.map((item) => [item.m, formatCurrency(item.revenue), item.orders.toLocaleString()]);
  const revenueRows = revenueSeries.map((item) => [item.m, formatCurrency(item.revenue)]);

  switch (reportId) {
    case "Sales Report":
      return {
        title: reportId,
        headers: ["Month", "Revenue", "Orders"],
        rows: salesRows,
        summary: [
          { label: "Total Revenue", value: formatCurrency(revenueSeries.reduce((sum, item) => sum + item.revenue, 0)) },
          { label: "Total Orders", value: revenueSeries.reduce((sum, item) => sum + item.orders, 0).toLocaleString() },
          { label: "Average Order Value", value: formatCurrency(revenueSeries.reduce((sum, item) => sum + item.revenue, 0) / Math.max(1, revenueSeries.reduce((sum, item) => sum + item.orders, 0))) },
        ],
      };
    case "Revenue Report":
      return {
        title: reportId,
        headers: ["Month", "Revenue"],
        rows: revenueRows,
        summary: [
          { label: "Total Revenue", value: formatCurrency(revenueSeries.reduce((sum, item) => sum + item.revenue, 0)) },
          { label: "Average Monthly Revenue", value: formatCurrency(revenueSeries.reduce((sum, item) => sum + item.revenue, 0) / revenueSeries.length) },
          { label: "Last Month Revenue", value: formatCurrency(revenueSeries[revenueSeries.length - 1].revenue) },
        ],
      };
    case "Orders Report":
      return {
        title: reportId,
        headers: MODULES.orders.columns,
        rows: orderRows,
        summary: [
          { label: "Total Orders", value: orderRows.length.toString() },
          { label: "Delivered Orders", value: orderRows.filter((row) => row[4] === "Delivered").length.toString() },
          { label: "Pending Orders", value: orderRows.filter((row) => row[4] !== "Delivered").length.toString() },
        ],
      };
    case "Seller Report":
      return {
        title: reportId,
        headers: MODULES.sellers.columns,
        rows: sellerRows,
        summary: [
          { label: "Total Sellers", value: sellerRows.length.toString() },
          { label: "Active Sellers", value: sellerRows.filter((row) => row[5] === "Active").length.toString() },
          { label: "Pending KYC", value: sellerRows.filter((row) => row[5] === "Pending KYC").length.toString() },
        ],
      };
    case "Delivery Report":
      return {
        title: reportId,
        headers: MODULES.delivery.columns,
        rows: deliveryRows,
        summary: [
          { label: "Total Partners", value: deliveryRows.length.toString() },
          { label: "Online", value: deliveryRows.filter((row) => row[5] === "Online").length.toString() },
          { label: "Offline", value: deliveryRows.filter((row) => row[5] === "Offline").length.toString() },
        ],
      };
    case "Employee Report":
      return {
        title: reportId,
        headers: MODULES.hr.columns,
        rows: employeeRows,
        summary: [
          { label: "Total Employees", value: employeeRows.length.toString() },
          { label: "Active", value: employeeRows.filter((row) => row[4] === "Active").length.toString() },
          { label: "Pending", value: employeeRows.filter((row) => row[4] !== "Active").length.toString() },
        ],
      };
    case "Inventory Report":
      return {
        title: reportId,
        headers: MODULES.inventory.columns,
        rows: inventoryRows,
        summary: [
          { label: "Total Warehouses", value: inventoryRows.length.toString() },
          { label: "Active Locations", value: inventoryRows.filter((row) => row[5] === "Active").length.toString() },
          { label: "Low Stock Alerts", value: inventoryRows.filter((row) => row[4] !== "0" && Number(String(row[4]).replace(/[^0-9]/g, "")) < 500).length.toString() },
        ],
      };
    case "Finance Report":
      return {
        title: reportId,
        headers: MODULES.finance.columns,
        rows: financeRows,
        summary: [
          { label: "Revenue Items", value: financeRows.length.toString() },
          { label: "Active Entries", value: financeRows.filter((row) => row[4] === "Active").length.toString() },
          { label: "Total Amount", value: formatCurrency(financeRows.reduce((sum, row) => sum + safeNumber(row[1]), 0)) },
        ],
      };
    default:
      return null;
  }
};

const KPICard = ({ label, value, delta, up, icon: Icon, index = 0, onClick }) => {
  const content = (
    <Card className={`p-5 sa-rise ${onClick ? "group transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300" : ""}`}>
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

  if (!onClick) return content;
  return (
    <button type="button" onClick={onClick} className="w-full text-left">
      {content}
    </button>
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

const DataTable = ({ columns, rows, onToast, rowActions, onDeleteRows }) => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedRows, setSelectedRows] = useState([]);
  const [hiddenRows, setHiddenRows] = useState([]);
  const [menuRow, setMenuRow] = useState(null);
  const rowsPerPage = 5;
  const normalizedQuery = query.trim().toLowerCase();

  const rowKey = useCallback((row, index) => (row[0] != null ? `${String(row[0])}-${index}` : `row-${index}`), []);
  const normalizedRows = useMemo(() => rows.map((row, index) => ({ id: rowKey(row, index), data: row })), [rows, rowKey]);
  const statusIndex = useMemo(() => columns.findIndex((c) => String(c).toLowerCase() === "status"), [columns]);

  const filterableStatusOptions = useMemo(() => {
    if (statusIndex < 0) return [];
    return Array.from(new Set(rows.map((row) => row[statusIndex]).filter(Boolean))).sort();
  }, [rows, statusIndex]);

  const filteredRows = useMemo(() => normalizedRows.filter((rowObj) => {
    if (hiddenRows.includes(rowObj.id)) return false;
    if (filterStatus !== "All" && statusIndex >= 0 && rowObj.data[statusIndex] !== filterStatus) return false;
    if (!normalizedQuery) return true;
    return rowObj.data.some((cell) => String(cell).toLowerCase().includes(normalizedQuery));
  }), [normalizedRows, hiddenRows, filterStatus, normalizedQuery, statusIndex]);

  const pageCount = Math.max(1, Math.ceil(filteredRows.length / rowsPerPage));
  const currentPage = Math.min(page, pageCount - 1);
  const visibleRows = useMemo(
    () => filteredRows.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage),
    [filteredRows, currentPage]
  );

  const selectedVisibleRowIds = visibleRows.map((r) => r.id);
  const allVisibleSelected = selectedVisibleRowIds.length > 0 && selectedVisibleRowIds.every((id) => selectedRows.includes(id));
  const selectedCount = selectedRows.length;

  const toggleRowSelection = (id) => setSelectedRows((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
  const toggleAllRows = () => {
    if (allVisibleSelected) {
      setSelectedRows((prev) => prev.filter((id) => !selectedVisibleRowIds.includes(id)));
    } else {
      setSelectedRows((prev) => Array.from(new Set([...prev, ...selectedVisibleRowIds])));
    }
  };

  const exportRows = (rowsToExport, filename = "table-export.csv") => {
    if (rowsToExport.length === 0) {
      onToast?.("No rows selected for export.");
      return;
    }
    downloadCSV(filename, columns, rowsToExport.map((item) => item.data));
    onToast?.("Export completed.");
  };

  const deleteSelected = () => {
    if (selectedRows.length === 0) {
      onToast?.("Select rows to delete.");
      return;
    }
    if (typeof onDeleteRows === "function") {
      onDeleteRows(selectedRows);
      setSelectedRows([]);
      onToast?.(`${selectedCount} row${selectedCount === 1 ? "" : "s"} deleted.`);
      return;
    }
    setHiddenRows((prev) => Array.from(new Set([...prev, ...selectedRows])));
    setSelectedRows([]);
    onToast?.(`${selectedCount} row${selectedCount === 1 ? "" : "s"} deleted.`);
  };

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col gap-3 px-5 py-4 border-b border-black/5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-[220px] max-w-md">
            <Search size={15} className="text-slate-400" />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(0); }}
              placeholder="Search records..."
              className="sa-font-body text-sm outline-none bg-transparent w-full placeholder:text-slate-400"
            />
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setFilterOpen((s) => !s)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-black/10 text-xs font-medium text-slate-600 hover:bg-slate-50">
              <Filter size={13} /> Filter
            </button>
            <button onClick={() => exportRows(visibleRows, "visible-records.csv")} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-black/10 text-xs font-medium text-slate-600 hover:bg-slate-50">
              <Download size={13} /> Export visible
            </button>
          </div>
        </div>
        {filterOpen && statusIndex >= 0 && (
          <div className="flex flex-wrap items-center gap-3 bg-slate-50 rounded-2xl px-4 py-3">
            <div className="flex items-center gap-2 text-slate-600 text-xs font-medium">
              <span>Status</span>
              <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setPage(0); }} className="rounded-lg border border-black/10 bg-white px-2.5 py-1 text-[12px] outline-none">
                <option value="All">All</option>
                {filterableStatusOptions.map((status) => <option key={status} value={status}>{status}</option>)}
              </select>
            </div>
            <button type="button" onClick={() => { setFilterStatus("All"); setQuery(""); setPage(0); }} className="text-xs text-slate-600 underline underline-offset-2">Reset filters</button>
          </div>
        )}
      </div>
      {selectedCount > 0 && (
        <div className="px-5 py-3 border-b border-black/5 bg-slate-50 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-700">
          <span>{selectedCount} selected</span>
          <div className="flex items-center gap-2">
            <button onClick={() => exportRows(filteredRows.filter((item) => selectedRows.includes(item.id)), "selected-rows.csv")} className="px-3 py-1 rounded-lg border border-black/10 bg-white text-xs font-medium hover:bg-slate-100">Export selected</button>
            <button onClick={deleteSelected} className="px-3 py-1 rounded-lg border border-black/10 bg-white text-xs font-medium text-red-600 hover:bg-red-50">Delete selected</button>
            <button onClick={() => setSelectedRows([])} className="px-3 py-1 rounded-lg border border-black/10 bg-white text-xs font-medium hover:bg-slate-100">Clear selection</button>
          </div>
        </div>
      )}
      <div className="overflow-x-auto sa-scrollbar">
        <table className="w-full text-sm sa-font-body">
          <thead>
            <tr className="text-left text-slate-500 text-xs uppercase tracking-wide bg-slate-50/60">
              <th className="px-5 py-3 font-semibold whitespace-nowrap">
                <input type="checkbox" checked={allVisibleSelected} onChange={toggleAllRows} className="rounded text-emerald-600" />
              </th>
              {columns.map((c) => <th key={c} className="px-5 py-3 font-semibold whitespace-nowrap">{c}</th>)}
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.length > 0 ? visibleRows.map((rowObj, i) => (
              <tr key={rowObj.id} className="border-t border-black/5 hover:bg-emerald-50/30 transition-colors">
                <td className="px-5 py-3.5">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(rowObj.id)}
                    onChange={() => toggleRowSelection(rowObj.id)}
                    className="rounded text-emerald-600"
                  />
                </td>
                {rowObj.data.map((cell, j) => (
                  <td key={j} className="px-5 py-3.5 text-[#0B1420] whitespace-nowrap">
                    {statusTone[cell] ? <Pill label={cell} /> : cell}
                  </td>
                ))}
                <td className="px-5 py-3.5 text-right relative">
                  <button onClick={() => setMenuRow((prev) => (prev === rowObj.id ? null : rowObj.id))} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400">
                    <MoreHorizontal size={16} />
                  </button>
                  {menuRow === rowObj.id && rowActions && (
                    <ActionMenu
                      open
                      actions={rowActions(rowObj)}
                      onClose={() => setMenuRow(null)}
                    />
                  )}
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={columns.length + 2} className="px-5 py-8 text-center text-slate-500 text-sm">No records match your search.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="px-5 py-3 border-t border-black/5 flex items-center justify-between text-xs text-slate-500 sa-font-body">
        <span>{filteredRows.length === rows.length ? `Showing ${visibleRows.length} of ${rows.length.toLocaleString()} records` : `Showing ${visibleRows.length} of ${filteredRows.length.toLocaleString()} matching records`}</span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className={`px-2.5 py-1 rounded-lg border border-black/10 hover:bg-slate-50 ${currentPage === 0 ? "opacity-40 cursor-not-allowed" : ""}`}>
            Prev
          </button>
          <button
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
            disabled={currentPage >= pageCount - 1}
            className={`px-2.5 py-1 rounded-lg border border-black/10 hover:bg-slate-50 ${currentPage >= pageCount - 1 ? "opacity-40 cursor-not-allowed" : ""}`}>
            Next
          </button>
        </div>
      </div>
    </Card>
  );
};

// --- WRAPPERS ---
const GenericWrapper = ({ basePath, tabs, defaultTab, title, onToast }) => {
  const location = useLocation();
  const routerNavigate = useRouterNavigate();
  const [tab, setTab] = useState(defaultTab || Object.keys(tabs)[0]);

  useEffect(() => {
    const p = location.pathname || '';
    let found = false;
    for (const key of Object.keys(tabs)) {
      if (p.endsWith('/' + key)) {
        setTab(key);
        found = true;
        break;
      }
    }
    if (!found) setTab(defaultTab || Object.keys(tabs)[0]);
  }, [location.pathname]);

  const go = (t) => {
    setTab(t);
    routerNavigate(`${basePath}/${t}`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2 flex-wrap">
          {Object.entries(tabs).map(([k, v]) => (
            <button key={k} onClick={() => go(k)} className={`px-3 py-2 rounded-lg text-sm font-medium ${tab === k ? "bg-emerald-50 text-emerald-700" : "bg-white text-slate-600 hover:bg-slate-50"}`}>
              {v.label}
            </button>
          ))}
        </div>
      </div>
      <ModulePage id={tabs[tab].id} statusFilter={tabs[tab].label} onToast={onToast} />
    </div>
  );
};

const ProfessionalsWrapper = ({ onToast }) => (
  <GenericWrapper basePath="/service-professionals" defaultTab="all" onToast={onToast} tabs={{
    all: { label: "All", id: "professionals" },
    pending: { label: "Pending Verification", id: "professionals" },
    approved: { label: "Approved", id: "professionals" },
    rejected: { label: "Rejected", id: "professionals" },
    warning: { label: "Warning", id: "professionals" },
    suspended: { label: "Suspended", id: "professionals" },
    terminated: { label: "Terminated", id: "professionals" },
    deactivated: { label: "Deactivated", id: "professionals" },
  }} />
);

const WorkersWrapper = ({ onToast }) => (
  <GenericWrapper basePath="/service-workers" defaultTab="all" onToast={onToast} tabs={{
    all: { label: "All Workers", id: "workers" },
    pending: { label: "Pending", id: "workers" },
    approved: { label: "Approved", id: "workers" },
    rejected: { label: "Rejected", id: "workers" },
    warning: { label: "Warning", id: "workers" },
    suspended: { label: "Suspended", id: "workers" },
    terminated: { label: "Terminated", id: "workers" },
    deactivated: { label: "Deactivated", id: "workers" },
  }} />
);

const VendorsWrapper = ({ onToast }) => (
  <GenericWrapper basePath="/wholesale-partners" defaultTab="all" onToast={onToast} tabs={{
    all: { label: "All Partners", id: "vendors" },
    pending: { label: "Pending Verification", id: "vendors" },
    approved: { label: "Approved", id: "vendors" },
    rejected: { label: "Rejected", id: "vendors" },
    warning: { label: "Warning", id: "vendors" },
    suspended: { label: "Suspended", id: "vendors" },
    terminated: { label: "Terminated", id: "vendors" },
    deactivated: { label: "Deactivated", id: "vendors" },
  }} />
);

const DeliveryWrapper = ({ onToast }) => (
  <GenericWrapper basePath="/delivery-partners" defaultTab="all" onToast={onToast} tabs={{
    all: { label: "All Partners", id: "delivery" },
    pending: { label: "Pending Verification", id: "delivery" },
    active: { label: "Approved / Active", id: "delivery" },
    online: { label: "Online", id: "delivery" },
    offline: { label: "Offline", id: "delivery" },
    warning: { label: "Warning", id: "delivery" },
    suspended: { label: "Suspended", id: "delivery" },
    terminated: { label: "Terminated", id: "delivery" },
    deactivated: { label: "Deactivated", id: "delivery" },
  }} />
);

const OrdersWrapper = ({ onToast }) => (
  <GenericWrapper basePath="/orders" defaultTab="all" onToast={onToast} tabs={{
    all: { label: "All Orders", id: "orders" },
    new: { label: "New", id: "orders" },
    processing: { label: "Processing", id: "orders" },
    out: { label: "Out for Delivery", id: "orders" },
    delivered: { label: "Delivered", id: "orders" },
    cancelled: { label: "Cancelled", id: "orders" },
    returned: { label: "Returned", id: "orders" },
    failed: { label: "Failed", id: "orders" },
    details: { label: "Order Details", id: "orders_details" },
  }} />
);

const InventoryWrapper = ({ onToast }) => (
  <GenericWrapper basePath="/inventory" defaultTab="overview" onToast={onToast} tabs={{
    overview: { label: "Stock Overview", id: "inventory" },
    low: { label: "Low Stock", id: "inventory_low" },
    out: { label: "Out of Stock", id: "inventory_out" },
    warehouse: { label: "Warehouse Stock", id: "inventory_warehouse" },
    movement: { label: "Stock Movement", id: "inventory_movement" },
    alerts: { label: "Inventory Alerts", id: "inventory_alerts" },
  }} />
);

const UsersPage = ({ onToast }) => {
  const config = MODULES.users;
  const location = useLocation();
  const routerNavigate = useRouterNavigate();
  const [tab, setTab] = useState("all");
  const [rows, setRows] = useState(config.rows);
  const [nextInviteId, setNextInviteId] = useState(1);

  const tabs = {
    all: { label: "All Customers" },
    pending: { label: "Pending KYC" },
    active: { label: "Active" },
    suspended: { label: "Suspended" },
  };

  useEffect(() => {
    const p = location.pathname || '';
    let found = false;
    for (const key of Object.keys(tabs)) {
      if (p.endsWith('/' + key)) {
        setTab(key);
        found = true;
        break;
      }
    }
    if (!found) setTab("all");
  }, [location.pathname]);

  const goTab = (t) => {
    setTab(t);
    routerNavigate(`/customers/${t}`);
  };

  const filteredRows = useMemo(() => {
    if (tab === "all") return rows;
    const filterText = tabs[tab]?.label || "";
    return rows.filter(r => r[4] === filterText || (tab === "pending" && r[4] === "Pending KYC"));
  }, [rows, tab]);

  const addUser = () => {
    const newUser = [
      `New User ${nextInviteId}`,
      "+91 90000 00000",
      "Bengaluru",
      "₹0",
      "Pending KYC",
      "Just now",
    ];
    setRows((prev) => [newUser, ...prev]);
    setNextInviteId((id) => id + 1);
    onToast?.("Invitation sent. New user pending verification.");
  };

  const toggleUserStatus = (rowObj) => {
    setRows((prev) => prev.map((row, index) => {
      if (`${row[0]}-${index}` === rowObj.id) {
        const current = row[4];
        const next = current === "Active" ? "Suspended" : "Active";
        return [...row.slice(0, 4), next, row[5]];
      }
      return row;
    }));
    onToast?.(`${rowObj.data[0]}'s status updated.`);
  };

  const deleteUser = (rowObj) => {
    setRows((prev) => prev.filter((row, index) => `${row[0]}-${index}` !== rowObj.id));
    onToast?.(`${rowObj.data[0]} removed from user list.`);
  };

  const viewProfile = (rowObj) => {
    onToast?.(`${rowObj.data[0]} • ${rowObj.data[2]} • Wallet ${rowObj.data[3]} • ${rowObj.data[4]}`);
  };

  return (
    <div className="sa-fade">
      <SectionHeader title={config.title} subtitle={config.subtitle} action={config.primaryAction} onAction={addUser} />
      <div className="flex items-center gap-2 mb-4">
        {Object.entries(tabs).map(([k, v]) => (
          <button key={k} onClick={() => goTab(k)} className={`px-3 py-2 rounded-lg text-sm font-medium ${tab === k ? "bg-emerald-50 text-emerald-700" : "bg-white text-slate-600 hover:bg-slate-50"}`}>
            {v.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {config.kpis.map((k, i) => <KPICard key={k.label} {...k} index={i} />)}
      </div>
      <DataTable
        columns={config.columns}
        rows={filteredRows}
        onToast={onToast}
        onDeleteRows={(selectedIds) => {
          setRows((prev) => prev.filter((row, index) => !selectedIds.includes(`${row[0]}-${index}`)));
        }}
        rowActions={(rowObj) => [
          { label: "View", icon: Eye, onClick: () => viewProfile(rowObj) },
          { label: rowObj.data[4] === "Active" ? "Suspend" : "Activate", icon: ShieldCheck, onClick: () => toggleUserStatus(rowObj) },
          { label: "Delete", icon: X, onClick: () => deleteUser(rowObj) },
        ]}
      />
    </div>
  );
};

const SellersPage = ({ onToast }) => {
  const config = MODULES.sellers;
  const [rows, setRows] = useState(config.rows);
  const [nextSellerId, setNextSellerId] = useState(1);

  const addSeller = () => {
    const newSeller = [
      `New Seller ${nextSellerId}`,
      "Anjali Gupta",
      "33ABCDE1234F1Z7",
      "9%",
      "4.2",
      "Pending KYC",
    ];
    setRows((prev) => [newSeller, ...prev]);
    setNextSellerId((id) => id + 1);
    onToast?.("New seller application created.");
  };

  const toggleSellerStatus = (rowObj) => {
    setRows((prev) => prev.map((row, index) => {
      if (`${row[0]}-${index}` === rowObj.id) {
        const current = row[5];
        const next = current === "Active" ? "Suspended" : "Active";
        return [...row.slice(0, 5), next];
      }
      return row;
    }));
    onToast?.(`${rowObj.data[0]}'s status updated.`);
  };

  const verifySeller = (rowObj) => {
    setRows((prev) => prev.map((row, index) => {
      if (`${row[0]}-${index}` === rowObj.id) {
        return [...row.slice(0, 5), "Active"];
      }
      return row;
    }));
    onToast?.(`${rowObj.data[0]} verified successfully.`);
  };

  const deleteSeller = (rowObj) => {
    setRows((prev) => prev.filter((row, index) => `${row[0]}-${index}` !== rowObj.id));
    onToast?.(`${rowObj.data[0]} removed from seller registry.`);
  };

  const viewSeller = (rowObj) => {
    onToast?.(`${rowObj.data[0]} • ${rowObj.data[1]} • ${rowObj.data[4]} rating • ${rowObj.data[5]}`);
  };

  return (
    <div className="sa-fade">
      <SectionHeader title={config.title} subtitle={config.subtitle} action={config.primaryAction} onAction={addSeller} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {config.kpis.map((k, i) => <KPICard key={k.label} {...k} index={i} />)}
      </div>
      <DataTable
        columns={config.columns}
        rows={rows}
        onToast={onToast}
        onDeleteRows={(selectedIds) => {
          setRows((prev) => prev.filter((row, index) => !selectedIds.includes(`${row[0]}-${index}`)));
        }}
        rowActions={(rowObj) => [
          { label: "View", icon: Eye, onClick: () => viewSeller(rowObj) },
          { label: rowObj.data[5] === "Active" ? "Suspend" : "Activate", icon: ShieldCheck, onClick: () => toggleSellerStatus(rowObj) },
          { label: rowObj.data[5] === "Pending KYC" ? "Verify" : "Approve", icon: BadgeCheck, onClick: () => verifySeller(rowObj) },
          { label: "Delete", icon: X, onClick: () => deleteSeller(rowObj) },
        ]}
      />
    </div>
  );
};

const SettingsPage = ({ role, onToast }) => {
  const tabs = {
    profile: { label: "Admin Profile", id: "settings_profile" },
    general: { label: "General Settings", id: "settings_general" },
    platform: { label: "Platform Settings", id: "platform" },
    payment: { label: "Payment Settings", id: "settings_payment" },
    delivery: { label: "Delivery Settings", id: "settings_delivery" },
    notification: { label: "Notification Settings", id: "settings_notification" },
    roles: { label: "Roles & Permissions", id: "settings_roles" },
    security: { label: "Security", id: "settings_security" },
  };
  const location = useLocation();
  const routerNavigate = useRouterNavigate();
  const [tab, setTab] = useState("platform");

  useEffect(() => {
    const p = location.pathname || '';
    let found = false;
    for (const key of Object.keys(tabs)) {
      if (p.endsWith('/' + key)) {
        setTab(key);
        found = true;
        break;
      }
    }
    if (!found) setTab("platform");
  }, [location.pathname]);

  const go = (t) => {
    setTab(t);
    routerNavigate(`/settings/${t}`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2 flex-wrap">
          {Object.entries(tabs).map(([k, v]) => (
            <button key={k} onClick={() => go(k)} className={`px-3 py-2 rounded-lg text-sm font-medium ${tab === k ? "bg-emerald-50 text-emerald-700" : "bg-white text-slate-600 hover:bg-slate-50"}`}>
              {v.label}
            </button>
          ))}
        </div>
      </div>
      {tab === "platform" ? <SettingsContent role={role} onToast={onToast} /> : <ModulePage id={tabs[tab].id} onToast={onToast} />}
    </div>
  );
};

const SellersWrapper = ({ onToast }) => (
  <GenericWrapper basePath="/sellers" defaultTab="all" onToast={onToast} tabs={{
    all: { label: "All Sellers", id: "sellers" },
    pending: { label: "Pending Approval", id: "sellers" },
    approved: { label: "Approved", id: "sellers" },
    rejected: { label: "Rejected", id: "sellers" },
    warning: { label: "Warning", id: "sellers" },
    suspended: { label: "Suspended", id: "sellers" },
    terminated: { label: "Terminated", id: "sellers" },
    deactivated: { label: "Deactivated", id: "sellers" },
  }} />
);

const DeliveryPage = ({ onToast }) => {
  const config = MODULES.delivery;
  const [rows, setRows] = useState(config.rows);
  const [nextPartnerId, setNextPartnerId] = useState(1);

  const addPartner = () => {
    const newPartner = [
      `New Partner ${nextPartnerId}`,
      "Bike - KA09",
      "Mysuru",
      "0",
      "5.0",
      "Online",
    ];
    setRows((prev) => [newPartner, ...prev]);
    setNextPartnerId((id) => id + 1);
    onToast?.("New delivery partner onboarded.");
  };

  const togglePartnerStatus = (rowObj) => {
    setRows((prev) => prev.map((row, index) => {
      if (`${row[0]}-${index}` === rowObj.id) {
        const current = row[5];
        const next = current === "Online" ? "Offline" : "Online";
        return [...row.slice(0, 5), next];
      }
      return row;
    }));
    onToast?.(`${rowObj.data[0]}'s availability updated.`);
  };

  const completeDelivery = (rowObj) => {
    setRows((prev) => prev.map((row, index) => {
      if (`${row[0]}-${index}` === rowObj.id) {
        const currentOrders = Number(row[3]) || 0;
        return [...row.slice(0, 3), String(currentOrders + 1), row[4], row[5]];
      }
      return row;
    }));
    onToast?.(`${rowObj.data[0]} completed a delivery.`);
  };

  const deletePartner = (rowObj) => {
    setRows((prev) => prev.filter((row, index) => `${row[0]}-${index}` !== rowObj.id));
    onToast?.(`${rowObj.data[0]} removed from delivery partners.`);
  };

  const viewPartner = (rowObj) => {
    onToast?.(`${rowObj.data[0]} • ${rowObj.data[1]} • ${rowObj.data[3]} orders today • ${rowObj.data[5]}`);
  };

  return (
    <div className="sa-fade">
      <SectionHeader title={config.title} subtitle={config.subtitle} action={config.primaryAction} onAction={addPartner} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {config.kpis.map((k, i) => <KPICard key={k.label} {...k} index={i} />)}
      </div>
      <DataTable
        columns={config.columns}
        rows={rows}
        onToast={onToast}
        onDeleteRows={(selectedIds) => {
          setRows((prev) => prev.filter((row, index) => !selectedIds.includes(`${row[0]}-${index}`)));
        }}
        rowActions={(rowObj) => [
          { label: "View", icon: Eye, onClick: () => viewPartner(rowObj) },
          { label: rowObj.data[5] === "Online" ? "Offline" : "Online", icon: ShieldCheck, onClick: () => togglePartnerStatus(rowObj) },
          { label: "Complete", icon: CheckCircle2, onClick: () => completeDelivery(rowObj) },
          { label: "Delete", icon: X, onClick: () => deletePartner(rowObj) },
        ]}
      />
    </div>
  );
};

/* Generic module page driven by MODULES config */
const ModulePage = ({ id, statusFilter, onToast }) => {
  const cfg = MODULES[id];
  if (!cfg) return null;
  const formConfig = MODULE_FORMS[id] ?? {
    entity: cfg.title.replace(/s$/i, ""),
    fields: createGenericFields(cfg.columns),
  };
  const fields = formConfig.fields;
  const [rows, setRows] = useState(() => {
    try {
      const stored = localStorage.getItem(`saathapp_admin_${id}`);
      if (stored) return JSON.parse(stored);
    } catch { }
    return cfg.rows;
  });

  useEffect(() => {
    localStorage.setItem(`saathapp_admin_${id}`, JSON.stringify(rows));
  }, [id, rows]);

  const [modalOpen, setModalOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [formValues, setFormValues] = useState(() => Object.fromEntries(fields.map((field) => [field.name, ""])));
  const [viewValues, setViewValues] = useState({});
  const [step, setStep] = useState(0);
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const steps = useMemo(() => mergeSteps(fields), [fields]);
  const statusIndex = useMemo(() => cfg.columns.findIndex((c) => /status/i.test(c)), [cfg.columns]);
  const createEnabled = /add|new|create|invite|onboard|schedule|assign/i.test(cfg.primaryAction.toLowerCase());

  useEffect(() => {
    let r = cfg.rows;
    if (statusFilter && statusFilter !== "All" && !statusFilter.startsWith("All ")) {
      if (statusIndex >= 0) {
        r = cfg.rows.map((row, i) => {
          const newRow = [...row];
          const shortStatus = statusFilter.split(" ")[0];
          newRow[0] = newRow[0] + ` - ${shortStatus}`;
          newRow[statusIndex] = shortStatus;
          return newRow;
        });
      }
    }
    setRows(r);
  }, [id, statusFilter, cfg, statusIndex]);

  const resetForm = (values = null) => {
    setFormValues(values ?? Object.fromEntries(fields.map((field) => [field.name, ""])));
    setValidationErrors({});
    setStep(0);
  };

  const getRowValues = (row) => valuesFromRow(cfg.columns, row);
  const getRowArray = (values) => rowFromValues(cfg.columns, values);

  const openCreate = () => {
    resetForm();
    setSelectedRow(null);
    setModalOpen(true);
  };

  const openEdit = (rowObj) => {
    resetForm(getRowValues(rowObj.data));
    setSelectedRow(rowObj);
    setModalOpen(true);
  };

  const openDuplicate = (rowObj) => {
    const values = getRowValues(rowObj.data);
    const primaryField = fields[0]?.name;
    if (primaryField && values[primaryField]) {
      values[primaryField] = `${values[primaryField]} copy`;
    }
    resetForm(values);
    setSelectedRow(null);
    setModalOpen(true);
  };

  const openView = (rowObj) => {
    setViewValues(getRowValues(rowObj.data));
    setViewOpen(true);
  };

  const openDelete = (rowObj) => {
    setSelectedRow(rowObj);
    setDeleteOpen(true);
  };

  const toggleStatus = (rowObj) => {
    if (statusIndex < 0) return;
    setRows((prev) => prev.map((row, index) => {
      if (`${row[0]}-${index}` !== rowObj.id) return row;
      const current = String(row[statusIndex] || "");
      const next = /active|online/i.test(current) ? "Suspended" : /offline|suspended|draft/i.test(current) ? "Active" : current === "Pending KYC" ? "Active" : "Active";
      return [...row.slice(0, statusIndex), next, ...row.slice(statusIndex + 1)];
    }));
    onToast?.(`${rowObj.data[0]} status updated.`);
  };

  const validateForm = (values) => {
    const errors = {};
    fields.forEach((field) => {
      const value = String(values[field.name] ?? "").trim();
      if (field.required && !value) {
        errors[field.name] = "Required field";
        return;
      }
      if (value && field.type === "email" && !validateEmail(value)) {
        errors[field.name] = "Enter a valid email.";
      }
      if (value && field.type === "tel" && !validatePhone(value)) {
        errors[field.name] = "Enter a valid phone number.";
      }
      if (value && /gst/i.test(field.name) && !validateGST(value)) {
        errors[field.name] = "Enter a valid GST number.";
      }
      if (value && /pan/i.test(field.name) && !validatePAN(value)) {
        errors[field.name] = "Enter a valid PAN.";
      }
      if (value && /password/i.test(field.name) && !validatePassword(value)) {
        errors[field.name] = "Password must be at least 8 chars and include a number and symbol.";
      }
    });
    const uniqueField = fields[0]?.name;
    if (uniqueField && String(values[uniqueField] ?? "").trim()) {
      const normalized = String(values[uniqueField]).trim().toLowerCase();
      const duplicate = rows.some((row, index) => {
        const rowId = `${row[0]}-${index}`;
        if (selectedRow && rowId === selectedRow.id) return false;
        return String(getRowValues(row)[uniqueField] ?? "").trim().toLowerCase() === normalized;
      });
      if (duplicate) {
        errors[uniqueField] = `${fields[0].label || "Item"} already exists.`;
      }
    }
    return errors;
  };

  const saveEntity = () => {
    const errors = validateForm(formValues);
    if (Object.keys(errors).length) {
      setValidationErrors(errors);
      onToast?.("Validation failed.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const nextRow = getRowArray(formValues);
      setRows((prev) => {
        if (selectedRow) {
          return prev.map((row, index) => (`${row[0]}-${index}` === selectedRow.id ? nextRow : row));
        }
        return [nextRow, ...prev];
      });
      setLoading(false);
      setModalOpen(false);
      onToast?.(`${formConfig.entity} ${selectedRow ? "updated" : "created"} successfully`);
      setSelectedRow(null);
    }, 500);
  };

  const removeSelectedRows = (selectedIds) => {
    setRows((prev) => prev.filter((row, index) => !selectedIds.includes(`${row[0]}-${index}`)));
  };

  const handleFormChange = (name, value) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const actions = (rowObj) => {
    const status = statusIndex >= 0 ? String(rowObj.data[statusIndex] || "") : "";
    const menu = [
      { label: "View", icon: Eye, onClick: () => openView(rowObj) },
      { label: "Edit", icon: CheckSquare, onClick: () => openEdit(rowObj) },
      { label: "Duplicate", icon: Copy, onClick: () => openDuplicate(rowObj) },
    ];
    if (status) {
      menu.push({
        label: /active|online/i.test(status) ? "Deactivate" : "Activate",
        icon: ShieldCheck,
        onClick: () => toggleStatus(rowObj),
      });
    }
    menu.push({ label: "Delete", icon: X, onClick: () => openDelete(rowObj), destructive: true });
    return menu;
  };

  const modalTitle = selectedRow ? `Edit ${formConfig.entity}` : `Create ${formConfig.entity}`;

  return (
    <div className="sa-fade">
      <SectionHeader title={cfg.title} subtitle={cfg.subtitle} action={cfg.primaryAction} onAction={createEnabled ? openCreate : () => onToast(`${cfg.primaryAction} — mock action`)} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {cfg.kpis.map((k, i) => <KPICard key={k.label} {...k} index={i} />)}
      </div>
      <DataTable columns={cfg.columns} rows={rows} onToast={onToast} onDeleteRows={removeSelectedRows} rowActions={actions} />
      <EntityFormModal
        open={modalOpen}
        title={modalTitle}
        fields={fields}
        values={formValues}
        onChange={handleFormChange}
        onClose={() => setModalOpen(false)}
        onSave={saveEntity}
        loading={loading}
        step={step}
        setStep={setStep}
        steps={steps}
        validationErrors={validationErrors}
      />
      <ViewDialog open={viewOpen} title={`View ${formConfig.entity}`} fields={fields} values={viewValues} onClose={() => setViewOpen(false)} />
      <ConfirmDialog
        open={deleteOpen}
        title={`Delete ${formConfig.entity}?`}
        message={`This action cannot be undone. Are you sure you want to delete this ${formConfig.entity.toLowerCase()}?`}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={() => {
          if (!selectedRow) return;
          setRows((prev) => prev.filter((row, index) => `${row[0]}-${index}` !== selectedRow.id));
          setDeleteOpen(false);
          onToast?.(`${formConfig.entity} deleted successfully`);
          setSelectedRow(null);
        }}
      />
    </div>
  );
};

/* ============================================================
   DASHBOARD PAGE
============================================================ */
const quickLinks = [
  { id: "users", label: "Customers", icon: Users },
  { id: "sellers", label: "Sellers", icon: Store },
  { id: "delivery", label: "Delivery Partners", icon: Truck },
  { id: "orders", label: "Orders", icon: ShoppingCart },
  { id: "products_categories", label: "Products", icon: Package },
  { id: "products_categories", label: "Categories", icon: Tag },
  { id: "inventory", label: "Inventory", icon: Warehouse },
  { id: "payments_finance", label: "Payments", icon: CreditCard },
  { id: "marketing_cms", label: "Advertisements", icon: Megaphone },
  { id: "marketing_cms", label: "Coupons", icon: Percent },
  { id: "analytics_reports", label: "Analytics", icon: BarChart3 },
  { id: "analytics_reports", label: "Reports", icon: ClipboardList },
  { id: "trust_safety", label: "Fraud Detection", icon: ShieldAlert },
  { id: "system", label: "Notifications", icon: Bell },
  { id: "marketing_cms", label: "CMS", icon: FileText },
  { id: "settings", label: "Settings", icon: SettingsIcon },
];

const DashboardPage = ({ onNavigate, onToast, mounted }) => {
  const [isExporting, setIsExporting] = useState(false);

  // Dashboard KPI cards — ensure required partner metrics are present and labels match final spec
  const kpis = [
    { label: "Today's Revenue", value: "₹45.62L", delta: "+16.3%", up: true, icon: Wallet, module: "finance" },
    { label: "Today's Orders", value: "8,650", delta: "+4.6%", up: true, icon: ShoppingCart, module: "orders" },
    { label: "Pending Orders", value: "128", delta: "+2%", up: false, icon: AlertTriangle, module: "orders" },
    { label: "Cancelled Orders", value: "184", delta: "-1.2%", up: true, icon: XCircle, module: "orders" },
    { label: "Total Customers", value: "1,25,430", delta: "+6.2%", up: true, icon: Users, module: "users" },
    { label: "Online Customers", value: "3,810", delta: "+7.1%", up: true, icon: Globe, module: "users" },
    { label: "Total Sellers", value: "4,120", delta: "+3.4%", up: true, icon: Store, module: "sellers" },
    { label: "Service Professionals", value: MODULES.professionals.kpis?.[0]?.value || "3,208", delta: MODULES.professionals.kpis?.[0]?.delta || "+2.9%", up: true, icon: Wrench, module: "professionals" },
    { label: "Service Workers", value: MODULES.workers.kpis?.[0]?.value || "1,946", delta: MODULES.workers.kpis?.[0]?.delta || "+1.2%", up: true, icon: HardHat, module: "workers" },
    { label: "Wholesale Partners", value: MODULES.vendors.kpis?.[0]?.value || "142", delta: MODULES.vendors.kpis?.[0]?.delta || "+6", up: true, icon: Handshake, module: "vendors" },
    { label: "Delivery Partners", value: "2,318", delta: "+8.1%", up: true, icon: Truck, module: "delivery" },
    { label: "New Registrations", value: "2,884", delta: "+11.4%", up: true, icon: UserCog, module: "users" },
    { label: "Open Complaints", value: "312", delta: "-18", up: true, icon: Headphones, module: "support" },
    { label: "Low Stock Alerts", value: "1,204", delta: "-8%", up: true, icon: HardHat, module: "inventory" },
    { label: "Warehouse Alerts", value: "18", delta: "+5", up: false, icon: Warehouse, module: "inventory" },
    { label: "Payment Status", value: "99.2%", delta: "+0.3%", up: true, icon: CreditCard, module: "payments" },
    { label: "System/API Status", value: "Operational", delta: "99.95%", up: true, icon: Server, module: "system" },
    { label: "Fraud Alerts", value: "9", delta: "+2", up: false, icon: ShieldAlert, module: "trust_safety" },
  ];

  const exportReport = async () => {
    if (isExporting) return;
    setIsExporting(true);
    try {
      const rows = kpis.map((item) => [item.label, item.value, item.delta]);
      await generateReport({
        reportId: "founder-dashboard-report",
        title: "Founder Dashboard Report",
        headers: ["Metric", "Value", "Change"],
        rows,
        summary: [
          { label: "Total KPIs", value: kpis.length.toString() },
          { label: "Top Revenue", value: kpis.find((item) => item.label === "Today's Revenue")?.value || "N/A" },
        ],
        format: "pdf",
      });
      onToast("Report downloaded successfully.");
    } catch (error) {
      console.error("Export report failed:", error);
      onToast("Unable to generate report.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="sa-fade">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
        <div>
          <h1 className="sa-font-display text-2xl font-bold text-[#0B1420]">Good afternoon, Founder 👋</h1>
          <p className="sa-font-body text-sm text-slate-500 mt-1">Here's what's happening across SaathApp today — 28 May 2026</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={exportReport} disabled={isExporting} className="sa-font-body inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-black/10 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60">
            {isExporting ? <RefreshCw size={15} className="animate-spin" /> : <Download size={15} />}
            {isExporting ? "Generating..." : "Export report"}
          </button>
          <button onClick={() => onNavigate("analytics")} className="sa-font-body inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold shadow-sm hover:opacity-90"
            style={{ background: `linear-gradient(135deg, ${T.forest}, ${T.forestMid})` }}>
            <BarChart3 size={15} /> View analytics
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
        {kpis.map((k, i) => <KPICard key={k.label} {...k} index={i} onClick={() => onNavigate(k.module)} />)}
      </div>

      <div className="mb-6">
        <Card className="p-4">
          <p className="sa-font-display font-semibold text-[#0B1420] mb-3">Quick Actions</p>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => onNavigate('sellers_pending')} className="px-3 py-2 rounded-lg bg-emerald-50 text-emerald-700">Review Pending Applications</button>
            <button onClick={() => onNavigate('orders_new')} className="px-3 py-2 rounded-lg bg-white border">View Pending Orders</button>
            <button onClick={() => onNavigate('support_complaints')} className="px-3 py-2 rounded-lg bg-white border">View Complaints</button>
            <button onClick={() => onNavigate('trust_fraud')} className="px-3 py-2 rounded-lg bg-white border">View Fraud Alerts</button>
            <button onClick={() => onNavigate('analytics')} className="px-3 py-2 rounded-lg bg-white border">View Analytics</button>
          </div>
        </Card>
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
            <button key={q.label} onClick={() => onNavigate(q.id)}
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
const AnalyticsPage = () => {
  const [orders, setOrders] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    try {
      const storedOrders = JSON.parse(window.localStorage.getItem('saathapp_customer_orders') || '[]');
      setOrders(storedOrders);
      const storedEvents = JSON.parse(window.localStorage.getItem('saathapp_analytics_events') || '[]');
      setEvents(storedEvents);
    } catch (e) {
      console.warn('Failed to load analytics data', e);
    }
  }, []);

  // Basic Metrics
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.breakdown?.finalTotal || 0), 0);
  const aov = totalOrders ? totalRevenue / totalOrders : 0;

  const productViews = events.filter(e => e.event === 'product_view').length;
  const purchases = events.filter(e => e.event === 'purchase').length;
  const conversionRate = productViews ? (purchases / productViews) * 100 : 0;

  // Grocery Split
  const groceryViews = events.filter(e => e.event === 'product_view' && e.category === 'grocery');
  const groceryCarts = events.filter(e => e.event === 'add_to_cart' && e.category === 'grocery');
  const groceryPurchases = events.filter(e => e.event === 'purchase' && e.category === 'grocery');

  const normalViews = groceryViews.filter(e => e.groceryTier !== 'Premium').length;
  const premiumViews = groceryViews.filter(e => e.groceryTier === 'Premium').length;

  const normalCarts = groceryCarts.filter(e => e.groceryTier !== 'Premium').length;
  const premiumCarts = groceryCarts.filter(e => e.groceryTier === 'Premium').length;

  const normalPurchases = groceryPurchases.filter(e => e.groceryTier !== 'Premium').length;
  const premiumPurchases = groceryPurchases.filter(e => e.groceryTier === 'Premium').length;

  const normalConv = normalViews ? (normalPurchases / normalViews) * 100 : 0;
  const premiumConv = premiumViews ? (premiumPurchases / premiumViews) * 100 : 0;

  // Category Performance (from events/orders)
  const catPerf = [
    { cat: 'Grocery', views: groceryViews.length, purchases: groceryPurchases.length },
    { cat: 'Electronics', views: events.filter(e => e.category === 'electronics' && e.event === 'product_view').length, purchases: events.filter(e => e.category === 'electronics' && e.event === 'purchase').length },
    { cat: 'Spiritual / Puja', views: events.filter(e => e.category === 'spiritual-puja' && e.event === 'product_view').length, purchases: events.filter(e => e.category === 'spiritual-puja' && e.event === 'purchase').length },
  ];

  // Seller Performance
  const sellerData = {};
  orders.forEach(o => {
    o.items?.forEach(i => {
      const s = i.seller || 'SaathApp Official';
      if (!sellerData[s]) sellerData[s] = { orders: 0, revenue: 0 };
      sellerData[s].orders += 1;
      sellerData[s].revenue += (i.price * i.quantity);
    });
  });
  const topSellers = Object.keys(sellerData).map(s => ({ name: s, ...sellerData[s] })).sort((a, b) => b.revenue - a.revenue).slice(0, 5);

  // Delivery Performance
  const delPerf = {
    avgTime: '1-2 Days',
    onTime: '98.5%',
    pending: orders.filter(o => o.status !== 'DELIVERED').length,
    delivered: orders.filter(o => o.status === 'DELIVERED').length
  };

  return (
    <div className="sa-fade">
      <SectionHeader title="SaathApp Analytics" subtitle="Unified marketplace analytics derived from events and global orders." />

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <Card className="p-5">
          <p className="text-sm text-slate-500 font-semibold mb-1">Total Orders</p>
          <p className="text-3xl font-black text-slate-900">{totalOrders}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-slate-500 font-semibold mb-1">Total Revenue</p>
          <p className="text-3xl font-black text-slate-900">₹{totalRevenue.toFixed(0)}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-slate-500 font-semibold mb-1">Average Order Value</p>
          <p className="text-3xl font-black text-slate-900">₹{aov.toFixed(0)}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-slate-500 font-semibold mb-1">Conversion Rate</p>
          <p className="text-3xl font-black text-slate-900">{conversionRate.toFixed(1)}%</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <h3 className="font-bold text-lg mb-4 text-slate-800">CATEGORY PERFORMANCE</h3>
          <div className="space-y-4">
            {catPerf.map(c => (
              <div key={c.cat} className="flex justify-between items-center border-b border-slate-100 pb-2">
                <span className="font-semibold text-slate-700">{c.cat}</span>
                <div className="text-right">
                  <span className="text-sm text-slate-500 block">{c.views} views</span>
                  <span className="text-sm text-emerald-600 font-bold block">{c.purchases} purchases</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-bold text-lg mb-4 text-slate-800">GROCERY PERFORMANCE</h3>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-slate-500 border-b border-slate-200">
                <th className="pb-2">Tier</th>
                <th className="pb-2">Views</th>
                <th className="pb-2">Cart</th>
                <th className="pb-2">Purchases</th>
                <th className="pb-2">Conversion</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-3 font-semibold text-slate-700">Normal Grocery</td>
                <td className="py-3">{normalViews}</td>
                <td className="py-3">{normalCarts}</td>
                <td className="py-3 text-emerald-600 font-bold">{normalPurchases}</td>
                <td className="py-3 font-bold">{normalConv.toFixed(1)}%</td>
              </tr>
              <tr>
                <td className="py-3 font-semibold text-amber-600">Premium Grocery</td>
                <td className="py-3">{premiumViews}</td>
                <td className="py-3">{premiumCarts}</td>
                <td className="py-3 text-emerald-600 font-bold">{premiumPurchases}</td>
                <td className="py-3 font-bold text-amber-600">{premiumConv.toFixed(1)}%</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-bold text-lg mb-4 text-slate-800">SELLER PERFORMANCE</h3>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-slate-500 border-b border-slate-200">
                <th className="pb-2">Seller</th>
                <th className="pb-2">Orders Contributed</th>
                <th className="pb-2">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {topSellers.map(s => (
                <tr key={s.name} className="border-b border-slate-100 last:border-0">
                  <td className="py-3 font-semibold text-slate-700">{s.name}</td>
                  <td className="py-3">{s.orders} items</td>
                  <td className="py-3 font-bold text-emerald-600">₹{s.revenue.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card className="p-6">
          <h3 className="font-bold text-lg mb-4 text-slate-800">DELIVERY PERFORMANCE</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="font-semibold text-slate-700">Average Delivery Time</span>
              <span className="text-sm font-bold">{delPerf.avgTime}</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="font-semibold text-slate-700">On-Time Delivery</span>
              <span className="text-sm text-emerald-600 font-bold">{delPerf.onTime}</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="font-semibold text-slate-700">Pending</span>
              <span className="text-sm text-amber-600 font-bold">{delPerf.pending}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-slate-700">Delivered</span>
              <span className="text-sm font-bold">{delPerf.delivered}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

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
const SettingsContent = ({ role, onToast }) => {
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
   REUSABLE UI PRIMITIVES
============================================================ */
const ReportsPage = ({ onToast }) => {
  const [loading, setLoading] = useState(null);
  const reportIds = ["Sales Report", "Revenue Report", "Orders Report", "Seller Report", "Delivery Report", "Employee Report", "Inventory Report", "Finance Report"];
  const formats = ["PDF", "Excel", "CSV"];

  const handleExport = async (reportId, format) => {
    const report = getReportDefinition(reportId);
    if (!report) {
      onToast("Unable to generate report.");
      return;
    }
    const formatKey = format.toLowerCase();
    setLoading(`${reportId}-${formatKey}`);
    try {
      await generateReport({ reportId, title: report.title, headers: report.headers, rows: report.rows, summary: report.summary, format: formatKey });
      onToast("✓ Report downloaded successfully");
    } catch (error) {
      console.error(error);
      onToast("Unable to generate report.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="sa-fade">
      <SectionHeader title="Reports" subtitle="Generate and export platform reports." />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
        {reportIds.map((r) => (
          <Card key={r} className="p-5">
            <ClipboardList size={18} color={T.forest} />
            <p className="sa-font-display font-semibold text-sm text-[#0B1420] mt-3">{r}</p>
            <p className="sa-font-body text-xs text-slate-500 mt-1 mb-3">Auto-generated from live mock data</p>
            <div className="flex gap-2 flex-wrap">
              {formats.map((f) => {
                const key = `${r}-${f.toLowerCase()}`;
                const isLoading = loading === key;
                return (
                  <button
                    key={f}
                    onClick={() => handleExport(r, f)}
                    disabled={isLoading}
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-black/10 hover:bg-slate-50 sa-font-body ${isLoading ? "opacity-60 cursor-not-allowed" : ""}`}>
                    {isLoading ? "Generating..." : f}
                  </button>
                );
              })}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

/* ============================================================
   MERGED / WRAPPER PAGES (lightweight connectors that reuse existing pages)
============================================================ */
const AnalyticsReportsPage = ({ onToast }) => {
  const routerNavigate = useRouterNavigate();
  const location = useLocation();
  const [tab, setTab] = useState("overview");

  useEffect(() => {
    const path = location.pathname || "";
    const segments = path.split('/');
    const last = segments[segments.length - 1];
    const validTabs = ["overview", "sales", "orders", "customers", "sellers", "professionals", "workers", "wholesale", "delivery", "revenue", "reports"];
    if (validTabs.includes(last)) setTab(last);
    else setTab("overview");
  }, [location.pathname]);

  const goTab = (t) => {
    setTab(t);
    routerNavigate(`/analytics-reports/${t}`);
  };

  const tabs = [
    { id: "overview", label: "Platform Overview" },
    { id: "sales", label: "Sales Analytics" },
    { id: "orders", label: "Order Analytics" },
    { id: "customers", label: "Customer Analytics" },
    { id: "sellers", label: "Seller Analytics" },
    { id: "professionals", label: "Service Professional Analytics" },
    { id: "workers", label: "Service Worker Analytics" },
    { id: "wholesale", label: "Wholesale Analytics" },
    { id: "delivery", label: "Delivery Analytics" },
    { id: "marketing", label: "Marketing Analytics" },
    { id: "finance", label: "Financial Analytics" },
    { id: "reports", label: "Reports" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4 overflow-x-auto no-scrollbar py-2">
        <div className="flex gap-2">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => goTab(t.id)} className={`px-3 py-2 whitespace-nowrap rounded-lg text-sm font-medium ${tab === t.id ? "bg-emerald-50 text-emerald-700" : "bg-white text-slate-600 hover:bg-slate-50"}`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>
      {tab === "overview" ? <AnalyticsPage /> : tab === "reports" ? <ReportsPage onToast={onToast} /> : <ModulePage id={`analytics_${tab}`} onToast={onToast} />}
    </div>
  );
};

const SaathPackManagementPage = ({ onToast }) => (
  <GenericWrapper basePath="/saathpack-management" defaultTab="dashboard" onToast={onToast} tabs={{
    dashboard: { label: "Dashboard", id: "saathpack_dashboard" },
    products: { label: "Products", id: "saathpack_products" },
    manufacturers: { label: "Manufacturers", id: "saathpack_manufacturers" },
    orders: { label: "Orders", id: "saathpack_orders" },
  }} />
);

const ProductsCategoriesPage = ({ onToast }) => (
  <GenericWrapper basePath="/products-categories" defaultTab="products" onToast={onToast} tabs={{
    products: { label: "All Products", id: "products" },
    pending: { label: "Pending Products", id: "products" },
    approved: { label: "Approved Products", id: "products" },
    rejected: { label: "Rejected Products", id: "products" },
    categories: { label: "Categories", id: "categories" },
    subcategories: { label: "Subcategories", id: "categories" },
    moderation: { label: "Product Moderation", id: "products" },
  }} />
);

const PaymentsFinancePage = ({ onToast }) => (
  <GenericWrapper basePath="/payments-finance" defaultTab="transactions" onToast={onToast} tabs={{
    transactions: { label: "Payment Transactions", id: "payments" },
    cod: { label: "COD", id: "payments" },
    online: { label: "Online Payments", id: "payments" },
    refunds: { label: "Refunds", id: "payments" },
    seller: { label: "Seller Settlements", id: "finance" },
    partner: { label: "Partner Settlements", id: "finance" },
    revenue: { label: "Platform Revenue", id: "finance" },
    fees: { label: "Fees / Commission", id: "finance" },
    reports: { label: "Financial Reports", id: "finance" },
  }} />
);

const MarketingCMSPage = ({ onToast }) => (
  <GenericWrapper basePath="/marketing-cms" defaultTab="ads" onToast={onToast} tabs={{
    ads: { label: "Advertisements", id: "ads" },
    coupons: { label: "Coupons & Offers", id: "coupons" },
    banners: { label: "Banners", id: "cms" },
    homepage: { label: "Homepage Content", id: "cms" },
    promotions: { label: "Promotions", id: "promotions" },
    campaigns: { label: "Campaigns", id: "campaigns" },
  }} />
);

const SupportOpsPage = ({ onToast }) => (
  <GenericWrapper basePath="/support-operations" defaultTab="customer" onToast={onToast} tabs={{
    customer: { label: "Customer Support", id: "support" },
    partner: { label: "Partner Support", id: "support" },
    complaints: { label: "Complaints", id: "support" },
    disputes: { label: "Disputes", id: "support" },
    issues: { label: "Operational Issues", id: "tasks" },
    tasks: { label: "Tasks", id: "tasks" },
    chat: { label: "Internal Chat", id: "chat" },
    meetings: { label: "Meetings", id: "meetings" },
    vendors: { label: "Vendor Management", id: "vendors" },
  }} />
);

const TrustSafetyPage = ({ onToast }) => (
  <GenericWrapper basePath="/trust-safety" defaultTab="fraud" onToast={onToast} tabs={{
    fraud: { label: "Fraud Alerts", id: "fraud" },
    risk: { label: "Risk Monitoring", id: "risk" },
    warnings: { label: "Account Warnings", id: "warnings" },
    suspensions: { label: "Suspensions", id: "suspensions" },
    abuse: { label: "Abuse Reports", id: "abuse" },
    incidents: { label: "Safety Incidents", id: "incidents" },
  }} />
);

const SystemPage = ({ onToast }) => (
  <GenericWrapper basePath="/system" defaultTab="health" onToast={onToast} tabs={{
    health: { label: "System Health", id: "health" },
    api: { label: "API Status", id: "api" },
    notifications: { label: "Notifications", id: "notifications" },
    audit: { label: "Audit Logs", id: "audit" },
    features: { label: "Feature Controls", id: "flags" },
  }} />
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
const LoginPage = ({ onLogin, onToast }) => {
  const [showPw, setShowPw] = useState(false);
  const [otp, setOtp] = useState(false);
  const [twofa, setTwofa] = useState(true);
  const [captcha, setCaptcha] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      onToast?.("Enter email and password to sign in.");
      return;
    }
    if (!email.includes("@")) {
      onToast?.("Enter a valid email address.");
      return;
    }
    onLogin();
  };

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
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="you@saathapp.com" className="w-full outline-none text-sm bg-transparent" />
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
                <input value={password} onChange={(e) => setPassword(e.target.value)} type={showPw ? "text" : "password"} placeholder="••••••••••" className="w-full outline-none text-sm bg-transparent" />
                <button type="button" onClick={() => setShowPw((s) => !s)} className="text-slate-400">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-slate-600">
                <input checked={remember} onChange={() => setRemember((s) => !s)} type="checkbox" className="accent-emerald-600 rounded" /> Remember me
              </label>
              <button type="button" onClick={() => onToast?.("Password reset instructions have been sent to your email.")} className="font-semibold" style={{ color: T.forest }}>Forgot password?</button>
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
                  <button type="button" onClick={() => onToast?.("OTP sent to your registered admin number.")} className="text-xs font-semibold" style={{ color: T.forest }}>Send OTP</button>
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

            <button type="button" onClick={handleLogin} className="w-full py-3 rounded-xl text-white text-sm font-semibold shadow-md hover:opacity-95 active:scale-[0.99] transition"
              style={{ background: `linear-gradient(135deg, ${T.forest}, ${T.forestDeep})` }}>
              Sign in to Admin Panel
            </button>
          </div>

          <div className="flex items-center justify-between mt-5 pt-4 border-t border-black/5 text-[11px] text-slate-400">
            <span className="flex items-center gap-1"><ShieldCheck size={12} /> 256-bit encrypted session</span>
            <button type="button" onClick={() => onToast?.("Login history is available after signing in.")} className="underline underline-offset-2">Login history</button>
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
const Topbar = ({ title, role, setRole, onLogout, collapsed, setCollapsed, setMobileOpen, onToast, onNavigate }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
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
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") onToast?.(`Search: ${searchTerm.trim() || "..."}`); }}
            placeholder="Search users, orders, sellers, settings..."
            className="outline-none text-sm w-full sa-font-body placeholder:text-slate-400"
          />
          <kbd className="text-[10px] text-slate-400 border border-black/10 rounded px-1.5 py-0.5">⌘K</kbd>
        </div>

        <div className="ml-auto flex items-center gap-1.5">
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-500 mr-2 sa-font-body">
            <Clock size={13} />
            {now.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" })} · {now.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
          </div>
          <button onClick={() => onToast?.("Language controls are available in the full platform.")} className="hidden sm:flex p-2 rounded-lg hover:bg-slate-100 text-slate-500"><Globe size={17} /></button>
          <button onClick={() => onToast?.("Theme controls are available in the full platform.")} className="hidden sm:flex p-2 rounded-lg hover:bg-slate-100 text-slate-500"><Sun size={17} /></button>

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
                <button onClick={() => { onNavigate("settings"); setProfileOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 sa-font-body">Profile settings</button>
                <button onClick={() => { onNavigate("audit"); setProfileOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 sa-font-body">Login history</button>
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
  const [authed, setAuthed] = useState(true); // dev: default to signed-in for E2E/testing
  const [active, setActive] = useState("dashboard");
  const [role, setRole] = useState("Founder");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [mounted, setMounted] = useState(false);
  const routerNavigate = useRouterNavigate();
  const location = useLocation();

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
    if (id === "__logout") { setAuthed(false); setActive("dashboard"); routerNavigate('/dashboard'); return; }
    if (allowedSet && !allowedSet.has(id) && id !== "settings") {
      pushToast("Restricted for your current role");
      return;
    }
    const path = ID_TO_PATH[id] || `/${id}`;
    setActive(id);
    routerNavigate(path);
  };

  useEffect(() => {
    const path = location.pathname === "/" ? "/dashboard" : location.pathname;
    let mappedId = "dashboard";
    for (const [prefix, id] of Object.entries(ROUTE_PREFIX_TO_MODULE)) {
      if (path === prefix || path.startsWith(prefix + "/")) {
        mappedId = id;
        break;
      }
    }
    setActive(mappedId);
  }, [location.pathname]);

  if (!authed) {
    return (
      <div className="w-full min-h-screen">
        <FontStyle />
        <LoginPage onLogin={() => { setAuthed(true); pushToast("Welcome back, Admin"); }} onToast={pushToast} />
      </div>
    );
  }

  const activeLabel = ALL_ITEMS.find((i) => i.id === active)?.label || "Dashboard";

  const renderPage = () => {
    switch (active) {
      case "dashboard": return <DashboardPage onNavigate={navigate} onToast={pushToast} mounted={mounted} />;
      case "analytics_reports": return <AnalyticsReportsPage onToast={pushToast} />;
      case "users": return <UsersPage onToast={pushToast} />;
      case "sellers": return <SellersWrapper onToast={pushToast} />;
      case "professionals": return <ProfessionalsWrapper onToast={pushToast} />;
      case "workers": return <WorkersWrapper onToast={pushToast} />;
      case "vendors": return <VendorsWrapper onToast={pushToast} />;
      case "delivery": return <DeliveryWrapper onToast={pushToast} />;
      case "products_categories": return <ProductsCategoriesPage onToast={pushToast} />;
      case "saathpack_management": return <SaathPackManagementPage onToast={pushToast} />;
      case "orders": return <OrdersWrapper onToast={pushToast} />;
      case "inventory": return <InventoryWrapper onToast={pushToast} />;
      case "payments_finance": return <PaymentsFinancePage onToast={pushToast} />;
      case "marketing_cms": return <MarketingCMSPage onToast={pushToast} />;
      case "shopping_journey_dashboard": return <ShoppingJourneyDashboard />;
      case "shopping_journey_milestones": return <MilestoneConfig />;
      case "shopping_journey_winners": return <WinnerSelection />;
      case "shopping_journey_fulfillment": return <Fulfillment />;
      case "support_ops": return <SupportOpsPage onToast={pushToast} />;
      case "trust_safety": return <TrustSafetyPage onToast={pushToast} />;
      case "system": return <SystemPage onToast={pushToast} />;
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
          <Topbar title={activeLabel} role={role} setRole={setRole} onLogout={() => { setAuthed(false); }} collapsed={collapsed} setCollapsed={setCollapsed} setMobileOpen={setMobileOpen} onToast={pushToast} onNavigate={navigate} />
          <main className="p-4 lg:p-6 max-w-[1600px] mx-auto">
            {renderPage()}
          </main>
        </div>
      </div>
      <Toast toasts={toasts} />
    </div>
  );
}
