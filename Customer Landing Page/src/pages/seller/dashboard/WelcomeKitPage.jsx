import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Crown, ArrowUpRight } from 'lucide-react';
import DashboardBreadcrumbs from '../../../components/seller/DashboardBreadcrumbs';
import WelcomeKitTracking from '../../../components/seller/WelcomeKitTracking';
import MembershipWelcomeKit from '../../../components/seller/MembershipWelcomeKit';
import { useOnboarding } from '../../../context/SellerOnboardingContext';
import { isWelcomeKitEligible, getWelcomeKitConfig } from '../../../config/seller/welcomeKitConfig';
import { getPlanById } from '../../../config/seller/membershipPlans';

export default function WelcomeKitPage() {
  const { data, updateSection } = useOnboarding();
  const kitConfig = getWelcomeKitConfig();
  const eligible = isWelcomeKitEligible(data.membership?.planId);
  const plan = getPlanById(data.membership?.planId);

  return (
    <div className="space-y-6">
      <DashboardBreadcrumbs />

      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Package className="text-amber-500" size={24} />
          Welcome Business Kit
        </h1>
        <p className="text-slate-500 text-sm mt-0.5">
          Complimentary kit included with Growth and Enterprise membership
        </p>
      </div>

      {!eligible ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 text-center"
        >
          <Crown size={40} className="text-violet-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Upgrade to Unlock Your Welcome Kit</h2>
          <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">
            You are on the <strong>{plan.name}</strong> plan. Subscribe to Growth (₹2,499/mo) or Enterprise (₹4,999/mo) to receive your complimentary Welcome Business Kit.
          </p>
          <Link
            to="/seller/dashboard/membership"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-500 text-white font-semibold hover:bg-violet-600 transition-colors"
          >
            Upgrade Membership
            <ArrowUpRight size={18} />
          </Link>
        </motion.div>
      ) : (
        <>
          <MembershipWelcomeKit variant="light" />
          <WelcomeKitTracking
            membership={data.membership}
            onUpdate={(membership) => updateSection('membership', membership)}
          />
        </>
      )}

      <div className="rounded-2xl bg-amber-500/10 border border-amber-500/30 p-6">
        <h3 className="font-bold text-amber-600 dark:text-amber-400 mb-3">{kitConfig.label}</h3>
        <p className="text-sm text-slate-500 mb-4">{kitConfig.badge}</p>
        <div className="grid sm:grid-cols-2 gap-2">
          {kitConfig.items.map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
