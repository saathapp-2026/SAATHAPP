import React, { useState } from 'react';
import { X, Gift, Wallet, ShoppingBag, Percent, Shirt, Trophy, Check, Smartphone, Download, Star, Sparkles, HelpCircle, Activity } from 'lucide-react';

export default function KnowMoreModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#f8f9fa] rounded-3xl w-full max-w-5xl h-[90vh] sm:h-[85vh] flex flex-col shadow-2xl relative animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-gray-600 shadow-sm transition-colors"
        >
          <X size={18} />
        </button>

        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-50 to-[#effaf3] rounded-t-3xl pt-8 pb-0 px-8 sm:px-12 relative overflow-hidden shrink-0">
          <div className="relative z-10 max-w-2xl mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2 flex items-center">
              <span className="mr-3 text-3xl">🎁</span> Shop More, Win More
            </h2>
            <p className="text-sm text-gray-600 font-medium">
              Your shopping journey can unlock exciting rewards, free items and monthly chances to win big!
            </p>
          </div>

          {/* Decorative background illustrations */}
          <div className="absolute right-0 bottom-0 top-0 w-1/3 hidden md:block opacity-80 pointer-events-none">
             <div className="absolute top-1/4 right-20 text-4xl animate-bounce" style={{animationDuration: '3s'}}>🛍️</div>
             <div className="absolute bottom-1/4 right-10 text-5xl">🎁</div>
             <div className="absolute top-1/3 right-40 text-2xl">✨</div>
             <div className="absolute top-10 right-10 text-yellow-400"><Star size={24} fill="currentColor"/></div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-6 sm:gap-10 border-b border-gray-200/60 overflow-x-auto scrollbar-hide">
            {[
              { id: 'overview', icon: <Sparkles size={16}/>, label: 'Overview' },
              { id: 'milestones', icon: <Trophy size={16}/>, label: 'Milestones' },
              { id: 'rewards', icon: <Gift size={16}/>, label: 'Rewards' },
              { id: 'monthly', icon: <Star size={16}/>, label: 'Monthly Rewards' },
              { id: 'faqs', icon: <HelpCircle size={16}/>, label: 'FAQs' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 text-sm font-bold flex items-center gap-2 whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id 
                    ? 'border-[#00a86b] text-[#00a86b]' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
          
          {activeTab === 'overview' && (
            <>
              {/* Section 1: What can you unlock? */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900 mb-1">
              <Gift className="text-green-500" size={20} /> What can you unlock?
            </h3>
            <p className="text-xs text-gray-500 font-medium mb-6">Shop regularly and unlock amazing rewards at every milestone.</p>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="border border-gray-100 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 mx-auto bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-3">
                  <Wallet size={20} />
                </div>
                <h4 className="font-bold text-gray-900 text-[11px] mb-1">Cash Rewards</h4>
                <p className="text-[9px] text-gray-500">₹25, ₹99 & more<br/>cash rewards</p>
              </div>
              <div className="border border-gray-100 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 mx-auto bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-3">
                  <ShoppingBag size={20} />
                </div>
                <h4 className="font-bold text-gray-900 text-[11px] mb-1">Free Items</h4>
                <p className="text-[9px] text-gray-500">Free groceries<br/>up to ₹49</p>
              </div>
              <div className="border border-gray-100 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 mx-auto bg-purple-50 text-purple-500 rounded-full flex items-center justify-center mb-3">
                  <Percent size={20} />
                </div>
                <h4 className="font-bold text-gray-900 text-[11px] mb-1">Coupons</h4>
                <p className="text-[9px] text-gray-500">Exclusive coupons<br/>& discounts</p>
              </div>
              <div className="border border-gray-100 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 mx-auto bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-3">
                  <Shirt size={20} />
                </div>
                <h4 className="font-bold text-gray-900 text-[11px] mb-1">Merchandise</h4>
                <p className="text-[9px] text-gray-500">SaathApp branded<br/>merchandise</p>
              </div>
              <div className="border border-gray-100 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 mx-auto bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center mb-3">
                  <Trophy size={20} />
                </div>
                <h4 className="font-bold text-gray-900 text-[11px] mb-1">Premium Rewards</h4>
                <p className="text-[9px] text-gray-500">Special & surprise<br/>rewards</p>
              </div>
            </div>
          </div>

          {/* Section 2: How your journey grows */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900 mb-1">
              <Activity className="text-orange-500" size={20} /> How your journey grows
            </h3>
            <p className="text-xs text-gray-500 font-medium mb-10">Maintain your shopping streak and reach milestones to unlock rewards.</p>
            
            <div className="relative max-w-4xl mx-auto px-4 pb-4">
              <div className="absolute top-8 left-[10%] right-[10%] h-[2px] border-t-2 border-dashed border-gray-200 z-0"></div>
              
              <div className="grid grid-cols-5 gap-2 relative z-10">
                {/* 7 Days */}
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className="w-16 h-16 rounded-full bg-white border-[3px] border-[#00a86b] flex flex-col items-center justify-center shadow-sm">
                      <span className="font-black text-lg text-gray-900 leading-none">7</span>
                      <span className="text-[9px] font-bold text-gray-500">Days</span>
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#00a86b] rounded-full border-2 border-white flex items-center justify-center text-white"><Check size={10} strokeWidth={4}/></div>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-1"><Gift size={14} className="text-orange-400"/></div>
                    <div className="font-black text-[11px] text-gray-900">₹25</div>
                    <div className="text-[9px] text-gray-500 font-medium mb-2">Cash Reward</div>
                    <div className="px-2 py-0.5 bg-green-50 text-green-600 font-bold text-[9px] rounded-sm">Unlocked</div>
                  </div>
                </div>

                {/* 15 Days */}
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className="w-16 h-16 rounded-full bg-white border-[3px] border-[#00a86b] flex flex-col items-center justify-center shadow-sm">
                      <span className="font-black text-lg text-gray-900 leading-none">15</span>
                      <span className="text-[9px] font-bold text-gray-500">Days</span>
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#00a86b] rounded-full border-2 border-white flex items-center justify-center text-white"><Check size={10} strokeWidth={4}/></div>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-1"><ShoppingBag size={14} className="text-orange-500"/></div>
                    <div className="font-black text-[11px] text-gray-900">Free Item</div>
                    <div className="text-[9px] text-gray-500 font-medium mb-2">Up to ₹49</div>
                    <div className="px-2 py-0.5 bg-green-50 text-green-600 font-bold text-[9px] rounded-sm">Unlocked</div>
                  </div>
                </div>

                {/* 30 Days (Current Target) */}
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className="w-20 h-20 -mt-2 rounded-full bg-white border-[4px] border-[#00a86b] flex flex-col items-center justify-center shadow-md shadow-green-100">
                      <span className="font-black text-2xl text-gray-900 leading-none">30</span>
                      <span className="text-[10px] font-bold text-gray-500">Days</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-1"><Percent size={14} className="text-purple-500"/></div>
                    <div className="font-black text-[11px] text-gray-900">₹99</div>
                    <div className="text-[9px] text-gray-500 font-medium mb-2">Cash Reward</div>
                    <div className="px-2 py-0.5 bg-green-100 text-green-700 font-bold text-[9px] rounded-sm whitespace-nowrap">Next Milestone</div>
                  </div>
                </div>

                {/* 60 Days */}
                <div className="flex flex-col items-center opacity-60">
                  <div className="relative mb-4">
                    <div className="w-16 h-16 rounded-full bg-white border-[3px] border-gray-200 flex flex-col items-center justify-center">
                      <span className="font-black text-lg text-gray-900 leading-none">60</span>
                      <span className="text-[9px] font-bold text-gray-500">Days</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-1"><Shirt size={14} className="text-blue-500"/></div>
                    <div className="font-black text-[11px] text-gray-900">SaathApp</div>
                    <div className="text-[9px] text-gray-500 font-medium mb-2">Merchandise</div>
                    <div className="px-3 py-0.5 bg-gray-100 text-gray-500 font-bold text-[9px] rounded-sm">Locked</div>
                  </div>
                </div>

                {/* 90 Days */}
                <div className="flex flex-col items-center opacity-60">
                  <div className="relative mb-4">
                    <div className="w-16 h-16 rounded-full bg-white border-[3px] border-gray-200 flex flex-col items-center justify-center">
                      <span className="font-black text-lg text-gray-900 leading-none">90</span>
                      <span className="text-[9px] font-bold text-gray-500">Days</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-1"><Trophy size={14} className="text-yellow-500"/></div>
                    <div className="font-black text-[11px] text-gray-900">Premium</div>
                    <div className="text-[9px] text-gray-500 font-medium mb-2">Reward</div>
                    <div className="px-3 py-0.5 bg-gray-100 text-gray-500 font-bold text-[9px] rounded-sm">Locked</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Split Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Monthly Rewards */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col h-full">
              <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900 mb-1">
                <Trophy className="text-yellow-500" size={20} /> Monthly Rewards
              </h3>
              <p className="text-xs text-gray-500 font-medium mb-6">Active shoppers get a chance to win exciting rewards every month!</p>
              
              <div className="flex justify-between items-start mb-auto px-2">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center"><Shirt size={18}/></div>
                  <span className="text-[10px] font-bold text-gray-800">T-Shirts</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center text-lg font-black">☕</div>
                  <span className="text-[10px] font-bold text-gray-800">Mugs</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center"><ShoppingBag size={18}/></div>
                  <div className="text-[10px] font-bold text-gray-800">Grocery Items<br/><span className="text-[8px] text-gray-500 font-medium">Up to ₹99</span></div>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center"><Percent size={18}/></div>
                  <div className="text-[10px] font-bold text-gray-800">₹99 Value<br/>Rewards</div>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-yellow-50 text-yellow-500 flex items-center justify-center"><Gift size={18}/></div>
                  <div className="text-[10px] font-bold text-gray-800">Surprise<br/>Rewards</div>
                </div>
              </div>

              <div className="mt-8 bg-green-50/60 rounded-xl p-3 flex gap-3 items-center border border-green-100/50">
                <Star className="text-green-500 shrink-0" size={16}/>
                <p className="text-[10px] text-green-800 font-medium leading-relaxed">
                  The more active you are, the higher your chances of winning!<br/>Winners are announced monthly.
                </p>
              </div>
            </div>

            {/* Track Everything */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden flex flex-col h-full">
              <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900 mb-1">
                <Activity className="text-blue-500" size={20} /> Track everything on SaathApp
              </h3>
              <p className="text-xs text-gray-500 font-medium mb-6">Stay updated with your progress, streaks and rewards right from the app.</p>
              
              <div className="flex justify-between items-start">
                <ul className="space-y-4 pt-2">
                  <li className="flex items-center gap-2 text-[11px] text-gray-700 font-medium">
                    <Check size={14} className="text-[#00a86b]"/> Shopping days & streaks
                  </li>
                  <li className="flex items-center gap-2 text-[11px] text-gray-700 font-medium">
                    <Check size={14} className="text-[#00a86b]"/> Next milestone & progress
                  </li>
                  <li className="flex items-center gap-2 text-[11px] text-gray-700 font-medium">
                    <Check size={14} className="text-[#00a86b]"/> Unlocked rewards
                  </li>
                  <li className="flex items-center gap-2 text-[11px] text-gray-700 font-medium">
                    <Check size={14} className="text-[#00a86b]"/> Reward history & details
                  </li>
                  <li className="flex items-center gap-2 text-[11px] text-gray-700 font-medium">
                    <Check size={14} className="text-[#00a86b]"/> Monthly rewards & winners
                  </li>
                </ul>

                {/* Mockup Phone */}
                <div className="w-32 h-44 bg-gray-900 rounded-t-[24px] border-4 border-gray-900 ml-4 relative overflow-hidden flex-shrink-0 shadow-xl translate-y-4">
                  <div className="absolute top-0 inset-x-0 h-4 bg-gray-900 flex justify-center z-20">
                    <div className="w-10 h-3 bg-black rounded-b-xl"></div>
                  </div>
                  <div className="bg-white w-full h-full p-2 pt-6">
                    <div className="text-[6px] text-gray-400 mb-2">← Your Journey</div>
                    <div className="w-16 h-16 mx-auto rounded-full border-[3px] border-green-500 flex flex-col items-center justify-center mb-2">
                      <span className="text-lg font-black leading-none">18</span>
                      <span className="text-[5px] text-gray-500">Days Streak</span>
                    </div>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full mb-1"><div className="w-3/5 bg-green-500 h-full rounded-full"></div></div>
                    <div className="text-[5px] text-center text-gray-500 mb-2">12 more days to unlock next reward</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Install Banner */}
          <div className="bg-[#f0f4fd] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-blue-50">
            <div className="flex items-center gap-6">
              <div className="w-16 h-24 bg-white rounded-xl border-[3px] border-gray-900 shadow-md flex flex-col items-center justify-center relative rotate-[-5deg]">
                <div className="font-black text-[8px] leading-tight text-center mb-1">SAATH<br/>APP</div>
                <ShoppingBag size={14}/>
                <div className="absolute top-1 w-6 h-1 bg-gray-900 rounded-full"></div>
              </div>
              
              <div>
                <h3 className="text-lg font-black text-gray-900 mb-1">Get the full SaathApp experience</h3>
                <p className="text-xs text-gray-600 font-medium mb-4 max-w-sm">Install SaathApp and manage your journey, track rewards, redeem offers and win big!</p>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-gray-700 bg-white px-2.5 py-1.5 rounded-md shadow-sm">
                    <span className="text-green-500">🤖</span> Available on Android
                  </div>
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-gray-700 bg-white px-2.5 py-1.5 rounded-md shadow-sm">
                    <span className="text-gray-900">🍎</span> Available on iOS
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <button className="bg-[#00a86b] hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 shadow-sm transition-colors text-sm">
                <Download size={16} /> Install SaathApp
              </button>
              <span className="text-[10px] text-gray-500 font-medium">It's free and easy!</span>
            </div>
          </div>

          {/* Final Footer Banner */}
          <div className="bg-[#e8faed] rounded-xl p-3 flex items-center justify-center text-center gap-2 border border-green-100">
            <span className="text-lg">🎉</span>
            <span className="text-[11px] font-bold text-green-800">
              Shop more. Unlock more. Win more.<br/>
              <span className="font-medium text-green-700">Your journey. Your rewards. Your wins!</span>
            </span>
          </div>
            </>
          )}

          {activeTab !== 'overview' && (
            <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-4">
                <Sparkles size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">More Details Coming Soon</h3>
              <p className="text-sm text-gray-500 max-w-sm">We're working on adding detailed information for the {activeTab} section. Check back later!</p>
              <button onClick={() => setActiveTab('overview')} className="mt-6 px-6 py-2 bg-green-50 text-green-700 font-bold rounded-lg hover:bg-green-100 transition-colors">
                Back to Overview
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
