import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MilestoneTimeline from './MilestoneTimeline';
import InstallPWAButton from '../PWA/InstallPWAButton';

export default function ShopMoreHomePromo() {
  const navigate = useNavigate();
  
  return (
    <div className="w-full h-full bg-white rounded-[32px] p-5 lg:p-6 border border-gray-100 shadow-sm flex flex-col">
      <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-700 text-[9px] font-black uppercase tracking-wider w-fit mb-3">
        <span className="mr-1 text-xs">🎁</span> SHOP MORE, WIN MORE
      </div>
      
      {/* Title & Install Banner */}
      <div className="flex-1 flex flex-col justify-center gap-3 mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-gray-900 mt-1 mb-1">
            Shop More, <span className="text-green-600">Win More</span>
          </h2>
          <p className="text-[11px] text-gray-600 font-medium leading-relaxed">
            Your regular shopping can unlock exciting rewards, free items, and chances to win amazing prizes!
          </p>
        </div>
        
        <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-100 flex items-center justify-between gap-3">
          <div className="flex-1">
            <h4 className="text-[11px] font-bold text-gray-900 mb-2">Get the full SaathApp experience</h4>
            <div className="scale-[0.85] origin-left">
              <InstallPWAButton />
            </div>
          </div>
          <div className="hidden sm:flex text-xl bg-white p-2 rounded-xl border border-gray-100 shadow-sm">📱</div>
        </div>
      </div>
      
      <button 
        onClick={() => navigate('/shopping-journey')}
        className="w-full mt-auto bg-[#00a86b] text-white font-black text-[11px] uppercase tracking-wider py-2.5 rounded-xl hover:bg-green-700 transition-colors shadow-sm flex items-center justify-center gap-2"
      >
        <span>VIEW MY JOURNEY</span>
        <span className="text-sm leading-none">&rarr;</span>
      </button>
    </div>
  );
}
