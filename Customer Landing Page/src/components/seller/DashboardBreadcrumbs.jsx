import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { DASHBOARD_BREADCRUMB_LABELS } from '../../config/sellerDashboardNav';

export default function DashboardBreadcrumbs({ extra = [] }) {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);

  const crumbs = [{ label: 'Dashboard', path: '/seller/dashboard' }];

  if (segments.length > 2) {
    const sectionPath = `/${segments.slice(0, 3).join('/')}`;
    const label = DASHBOARD_BREADCRUMB_LABELS[sectionPath];
    if (label && sectionPath !== '/seller/dashboard') {
      crumbs.push({ label, path: sectionPath });
    }
  }

  extra.forEach((item) => crumbs.push(item));

  return (
    <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1 text-sm text-slate-500 dark:text-slate-400 mb-4">
      <Link
        to="/seller/dashboard"
        className="inline-flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
      >
        <Home size={14} />
        <span className="hidden sm:inline">Dashboard</span>
      </Link>
      {crumbs.slice(1).map((crumb, i) => {
        const isLast = i === crumbs.length - 2 && extra.length === 0;
        return (
          <React.Fragment key={crumb.path || crumb.label}>
            <ChevronRight size={14} className="text-slate-400 shrink-0" />
            {isLast || !crumb.path ? (
              <span className="font-medium text-slate-800 dark:text-slate-200">{crumb.label}</span>
            ) : (
              <Link
                to={crumb.path}
                className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                {crumb.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
      {extra.map((item, i) => (
        <React.Fragment key={item.label}>
          <ChevronRight size={14} className="text-slate-400 shrink-0" />
          <span className={`font-medium text-slate-800 dark:text-slate-200 ${i < extra.length - 1 ? '' : ''}`}>
            {item.label}
          </span>
        </React.Fragment>
      ))}
    </nav>
  );
}
