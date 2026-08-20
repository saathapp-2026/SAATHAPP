import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MilestoneTimeline from './MilestoneTimeline';
import InstallPWAButton from '../PWA/InstallPWAButton';

export default function ShopMoreHomePromo() {
  const navigate = useNavigate();
  
  return (
    <div className="w-full h-full bg-white rounded-[32px] p-5 lg:p-6 border border-gray-100 shadow-sm flex flex-col">
      <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-700 text-[10px] font-black uppercase tracking-wider w-fit mb-4">
        <span className="mr-1 text-sm">🎁</span> SHOP MORE, WIN MORE
      </div>
      
      {/* Title & Install Banner */}
      <div className="flex flex-col gap-4 mb-5">
        <div>
          <h2 className="text-2xl lg:text-3xl font-black text-gray-900 mb-1">
            Shop More,<br/> <span className="text-green-600">Win More</span>
          </h2>
          <p className="text-xs text-gray-600 font-medium leading-relaxed">
            Your regular shopping can unlock exciting rewards, free items, and chances to win amazing prizes!
          </p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center justify-between gap-3">
          <div className="flex-1">
            <h4 className="text-xs font-bold text-gray-900">Get the full SaathApp experience</h4>
            <p className="text-[10px] text-gray-500 mb-2">Track your journey, rewards & challenges on the app.</p>
            <div className="scale-90 origin-left">
              <InstallPWAButton />
            </div>
          </div>
          <div className="hidden sm:flex text-2xl bg-white p-2 rounded-xl border border-gray-100 shadow-sm">📱</div>
        </div>
      </div>
      

      
      <button 
        onClick={() => navigate('/shopping-journey')}
        className="w-full mt-auto bg-[#00a86b] text-white font-bold py-3 rounded-xl hover:bg-green-700 transition-colors shadow-sm flex items-center justify-center text-xs"
      >
        VIEW MY JOURNEY &rarr;
      </button>
    </div>
  );
}
