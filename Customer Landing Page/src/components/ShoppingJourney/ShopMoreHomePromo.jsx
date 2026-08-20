import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MilestoneTimeline from './MilestoneTimeline';
import InstallPWAButton from '../PWA/InstallPWAButton';

export default function ShopMoreHomePromo() {
  const navigate = useNavigate();
  
  return (
    <div className="w-full bg-white rounded-[32px] p-5 lg:p-6 border border-gray-100 shadow-sm flex flex-col">
      <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-700 text-[9px] font-black uppercase tracking-wider w-fit mb-3">
        <span className="mr-1 text-xs">🎁</span> SHOP MORE, WIN MORE
      </div>
      
      {/* Title & Install Banner */}
      <div className="flex flex-col gap-3 mb-4">
        <div>
          <h2 className="text-xl lg:text-2xl font-black text-gray-900 mb-1">
            Shop More,<br/> <span className="text-green-600">Win More</span>
          </h2>
          <p className="text-[11px] text-gray-600 font-medium leading-relaxed">
            Your regular shopping can unlock exciting rewards, free items, and chances to win amazing prizes!
          </p>
        </div>
        
        <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-100 flex items-center justify-between gap-3">
          <div className="flex-1">
            <h4 className="text-[11px] font-bold text-gray-900 mb-0.5">Get the full SaathApp experience</h4>
            <p className="text-[9px] text-gray-500 mb-2">Track your journey, rewards & challenges on the app.</p>
            <div className="scale-[0.85] origin-left">
              <InstallPWAButton />
            </div>
          </div>
          <div className="hidden sm:flex text-xl bg-white p-2 rounded-xl border border-gray-100 shadow-sm">📱</div>
        </div>
      </div>
      

      
      <button 
        onClick={() => navigate('/shopping-journey')}
        className="w-full mt-3 bg-[#00a86b] text-white font-bold py-2.5 rounded-xl hover:bg-green-700 transition-colors shadow-sm flex items-center justify-center text-[11px]"
      >
        VIEW MY JOURNEY &rarr;
      </button>
    </div>
  );
}
