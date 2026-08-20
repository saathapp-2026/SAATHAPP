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
      
      {/* Journey & Rewards */}
      <div className="flex flex-col xl:flex-row gap-4 mb-4 flex-1">
        {/* Journey Card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex flex-col justify-between flex-1">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase flex items-center"><span className="text-orange-500 mr-1 text-sm">🔥</span> YOUR JOURNEY</h3>
            <Link to="/shopping-journey/my-journey" className="text-[10px] font-bold text-green-600 hover:text-green-700 whitespace-nowrap">View Details &rarr;</Link>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-20 h-20 flex-shrink-0">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-gray-100" />
                <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray="226.1" strokeDashoffset="90.4" className="text-green-500" strokeLinecap="round" />
              </svg>
              <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-extrabold text-gray-900 leading-none">18</span>
                <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider mt-1">Days</span>
              </div>
            </div>
            
            <div className="flex-1 w-full text-center sm:text-left">
              <div className="text-xs font-bold text-gray-900 mb-1.5">
                18 <span className="text-gray-400 font-medium">/ 30 Days</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 mb-1.5 overflow-hidden">
                <div className="bg-gradient-to-r from-green-400 to-green-500 h-full rounded-full" style={{ width: '60%' }}></div>
              </div>
              <p className="text-[10px] font-medium text-gray-500">
                <span className="text-green-600 font-bold">12 more days</span> to unlock reward
              </p>
            </div>
          </div>
        </div>
        
        {/* Rewards Grid */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex-1">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase flex items-center"><span className="text-green-500 mr-1 text-sm">🎁</span> YOUR REWARDS</h3>
            <Link to="/shopping-journey/my-rewards" className="text-[10px] font-bold text-green-600 hover:text-green-700 whitespace-nowrap">View All &rarr;</Link>
          </div>
          
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-gray-50 rounded-xl p-2.5 flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-green-100 text-green-600 flex items-center justify-center font-bold text-sm">₹</div>
              <div>
                <div className="text-sm font-extrabold text-gray-900 leading-tight">₹75</div>
                <div className="text-[9px] text-gray-500 font-medium leading-none">Rewards</div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-2.5 flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-orange-100 text-orange-500 flex items-center justify-center font-bold text-sm">🎁</div>
              <div>
                <div className="text-sm font-extrabold text-gray-900 leading-tight">3</div>
                <div className="text-[9px] text-gray-500 font-medium leading-none">Free Items</div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-2.5 flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-blue-100 text-blue-500 flex items-center justify-center font-bold text-sm">👕</div>
              <div>
                <div className="text-sm font-extrabold text-gray-900 leading-tight">1</div>
                <div className="text-[9px] text-gray-500 font-medium leading-none">Merch</div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-2.5 flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-purple-100 text-purple-500 flex items-center justify-center font-bold text-sm">🔥</div>
              <div>
                <div className="text-sm font-extrabold text-gray-900 leading-tight">18</div>
                <div className="text-[9px] text-gray-500 font-medium leading-none">Shopping Days</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Milestones */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm overflow-hidden mb-4">
        <h3 className="text-[10px] font-bold text-gray-500 uppercase mb-3">REWARD MILESTONES</h3>
        <div className="overflow-x-auto scrollbar-hide">
          <div className="min-w-[320px] scale-[0.85] origin-left -my-4">
            <MilestoneTimeline currentStreak={18} />
          </div>
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
