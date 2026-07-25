import React from 'react';
import { ArrowLeft, Bell, Heart, ShoppingBag, MapPin, Settings, Wallet, ShieldCheck, LogOut, Pencil, Sparkles, Truck, BadgeCheck, HandCoins, CircleDollarSign, Headphones, Store, Info, ChevronRight } from 'lucide-react';

export default function Profile({ user, onBack, onLogout, onNavigate }) {
  const quickActions = [
    { label: 'My Orders', icon: ShoppingBag, description: 'Track your recent orders', action: 'orders' },
    { label: 'Cart', icon: ShoppingBag, description: 'Review your basket', action: 'cart' },
    { label: 'Wishlist', icon: Heart, description: 'Saved items and services', action: 'wishlist' },
    { label: 'Wallet', icon: Wallet, description: 'Rewards and payments', action: 'wallet' },
    { label: 'Rewards', icon: HandCoins, description: 'Points and benefits', action: 'rewards' },
  ];

  const accountSections = [
    { label: 'Edit Profile', icon: Pencil, description: 'Update your profile info', action: 'edit-profile' },
    { label: 'Saved Addresses', icon: MapPin, description: 'Manage delivery locations', action: 'addresses' },
    { label: 'Payment Methods', icon: CircleDollarSign, description: 'Saved card and UPI details', action: 'payment' },
    { label: 'Notifications', icon: Bell, description: 'Offers and updates', action: 'notifications' },
    { label: 'Change Password', icon: ShieldCheck, description: 'Secure your account', action: 'settings' },
    { label: 'Privacy & Security', icon: ShieldCheck, description: 'App permissions and privacy', action: 'privacy-policy' },
  ];

  const supportSections = [
    { label: 'Help Centre', icon: Headphones, description: 'Support and complaints', action: 'help-support' },
    { label: 'About SaathApp', icon: Info, description: 'Learn about the app', action: 'about' },
    { label: 'Terms & Conditions', icon: Sparkles, description: 'Read the policies', action: 'terms' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8">
        <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-slate-600">
          <ArrowLeft size={16} /> Back to home
        </button>

        <div className="mt-6 rounded-[24px] bg-gradient-to-r from-emerald-600 to-cyan-600 p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-xl font-black">{(user?.name || 'U').charAt(0).toUpperCase()}</div>
            <div>
              <div className="text-xl font-black">{user?.name || 'Nikita Sharma'}</div>
              <div className="text-sm text-white/80">{user?.email || 'demo@saathapp.com'}</div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-white/80">
            <ShieldCheck size={16} className="text-amber-300" /> Verified SaathApp account
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-slate-500">Quick Actions</div>
          <div className="grid gap-3 md:grid-cols-3">
            {quickActions.map(({ label, icon: Icon, description, action }) => (
              <button key={label} onClick={() => onNavigate(action)} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition hover:-translate-y-0.5 hover:border-emerald-300">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm">
                  <Icon size={18} />
                </div>
                <div>
                  <div className="font-semibold text-slate-800">{label}</div>
                  <div className="text-sm text-slate-500">{description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div>
            <div className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-slate-500">Account</div>
            <div className="space-y-2">
              {accountSections.map(({ label, icon: Icon, description, action }) => (
                <button key={label} onClick={() => onNavigate(action)} className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-emerald-300">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-50 text-emerald-600">
                      <Icon size={16} />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">{label}</div>
                      <div className="text-sm text-slate-500">{description}</div>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-slate-400" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-slate-500">Support & About</div>
            <div className="space-y-2">
              {supportSections.map(({ label, icon: Icon, description, action }) => (
                <button key={label} onClick={() => onNavigate(action)} className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-emerald-300">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-50 text-cyan-600">
                      <Icon size={16} />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">{label}</div>
                      <div className="text-sm text-slate-500">{description}</div>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-slate-400" />
                </button>
              ))}
            </div>

            <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700"><Store size={16} /> Become a partner</div>
              <div className="mt-1 text-sm text-emerald-700/80">Sell, provide services, advertise, or refer friends to earn on SaathApp.</div>
            </div>
          </div>
        </div>

        <button onClick={onLogout} className="mt-6 flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 font-semibold text-red-600">
          <LogOut size={16} /> Logout
        </button>
      </div>
    </div>
  );
}
