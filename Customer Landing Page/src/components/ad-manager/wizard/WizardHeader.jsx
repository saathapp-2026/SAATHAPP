import React from 'react';
import { Bell, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoUrl from '../../../assets/saathapp-logo.jpeg';

const NAV_ITEMS = [
  { label: 'Marketing', path: '/seller/marketing', active: true }
];

export default function WizardHeader({ user, onBack }) {
  return (
    <div className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1600px] mx-auto h-16 flex items-center justify-between">
        
        {/* Left - Logo */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoUrl} alt="SaathApp" className="h-8 object-contain" />
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`text-sm font-medium transition-colors ${
                  item.active ? 'text-[#15803D] border-b-2 border-[#15803D] py-5' : 'text-slate-600 hover:text-slate-900 py-5'
                }`}
              >
                {item.label} {item.active && <span className="inline-block ml-1 w-2 h-2 rounded-full bg-emerald-500/20" />}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right - Profile & Actions */}
        <div className="flex items-center gap-4">
          <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-[#15803D] border border-[#15803D] rounded-full hover:bg-emerald-50 transition-colors">
            <HelpCircle size={16} />
            How Advertising Works?
          </button>
          
          <div className="w-px h-6 bg-slate-200 hidden sm:block" />
          
          <button className="relative p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
          </button>
          
          <div className="flex items-center gap-2 pl-2">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-bold text-slate-900">{user?.name || 'Smart Electronics'}</span>
              <span className="text-xs text-slate-500">Seller</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
              {user?.avatar ? (
                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#15803D] text-white font-bold text-sm">
                  {(user?.name || 'S')[0]}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
