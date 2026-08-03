/* eslint-disable react-refresh/only-export-components -- section page factory exports */
import React from 'react';
import DashboardSectionPage from '../../../components/seller/DashboardSectionPage';
import { DASHBOARD_SECTIONS } from '../../../config/sellerDashboardPages';

function makePage(sectionKey, breadcrumbExtra) {
  return function SectionPage() {
    return <DashboardSectionPage config={DASHBOARD_SECTIONS[sectionKey]} breadcrumbExtra={breadcrumbExtra} />;
  };
}

export const OrdersPage = makePage('orders');
export const ProductsPage = makePage('products', [{ label: 'Add Product' }]);
export const InventoryPage = makePage('inventory');
export const CustomersPage = makePage('customers');
export const MarketingPage = makePage('marketing');
export const AnalyticsPage = makePage('analytics');
export const WalletPage = makePage('wallet');
export const PaymentsPage = makePage('payments');
export const InvoicesPage = makePage('invoices', [{ label: 'Create Invoice' }]);
export const ReportsPage = makePage('reports');
export const CouponsPage = makePage('coupons');
export const AdvertisementsPage = makePage('advertisements');
export const StoreSettingsPage = makePage('settings');
export const DocumentsPage = makePage('documents');
export const SupportPage = makePage('support');
