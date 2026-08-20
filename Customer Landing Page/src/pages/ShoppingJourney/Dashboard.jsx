import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InstallPWAButton from '../../components/PWA/InstallPWAButton';
import { Gift, ShoppingBag, Trophy, Users, Smartphone, Wallet, Shirt, Flame, Check, Star, ShieldCheck, Sparkles, Info, ArrowRight, Percent, X, FileText } from 'lucide-react';
import KnowMoreModal from '../../components/ShoppingJourney/KnowMoreModal';

const ShoppingJourneyDashboard = () => {
  const navigate = useNavigate();
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [isKnowMoreOpen, setIsKnowMoreOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white pb-16 font-sans">
      {/* Header and Breadcrumb */}
      <div className="bg-white px-4 py-4 sticky top-0 z-20">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <Link to="/" className="text-sm text-green-600 hover:text-green-700 font-bold flex items-center">
            &larr; Back to Home
          </Link>
          <div className="font-extrabold text-gray-900 flex items-center text-lg">
            <span className="mr-2 text-xl text-red-500">🎁</span> Shop More, Win More
          </div>
          <button onClick={() => setShowTermsModal(true)} className="text-sm font-bold text-green-600 hover:text-green-700">
            How it works ?
          </button>
        </div>
      </div>

      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-2 space-y-6">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[#e8faed] to-[#f2fdf5] rounded-[32px] p-6 pb-4 relative shadow-sm border border-green-50 overflow-hidden flex flex-col">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 w-full">
            <div className="max-w-xl mb-2 md:mb-0">
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0a4d33] mb-1.5 uppercase leading-none">
                SHOP MORE, <span className="text-[#0a4d33]">WIN MORE!</span>
              </h1>
              <p className="text-gray-700 mt-2 font-medium max-w-sm leading-relaxed text-[13px]">
                The more you shop, the more you earn.
                Unlock exciting rewards, free gifts and
                a chance to win big every month!
              </p>
            </div>
            
            <div className="md:absolute md:right-8 md:top-1/2 md:-translate-y-[60%] w-full md:w-[380px] h-32 md:h-40 flex justify-end">
               <img 
                 src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                 alt="Rewards" 
                 className="object-cover w-full h-full rounded-2xl shadow-lg mix-blend-multiply opacity-90"
               />
            </div>
          </div>
          
          {/* Stats Bar */}
          <div className="bg-white rounded-full px-5 py-3 mt-4 md:mt-5 flex flex-wrap justify-between items-center shadow-sm relative z-20 w-full border border-green-50">
            <div className="flex items-center gap-3">
              <div className="flex flex-col">
                <span className="text-xl font-black text-[#0a4d33] leading-none">1,24,680+</span>
                <span className="text-[11px] text-gray-500 font-medium">Customers Participating</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-10">
              <div className="flex items-center gap-3">
                <Gift size={24} className="text-orange-400" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-900 leading-none">Free Items</span>
                  <span className="text-[11px] text-gray-500 font-medium">Up to ₹99</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ShoppingBag size={24} className="text-gray-400" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-900 leading-none">Exclusive</span>
                  <span className="text-[11px] text-gray-500 font-medium">Merchandise</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Trophy size={24} className="text-yellow-500" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-900 leading-none">Big Rewards</span>
                  <span className="text-[11px] text-gray-500 font-medium">Every Month</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => setIsKnowMoreOpen(true)}
              className="bg-[#00a86b] hover:bg-green-700 text-white text-xs font-bold py-2.5 px-6 rounded-full transition-colors shadow-sm flex items-center"
            >
              Know More <ArrowRight size={14} className="ml-1" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
          {/* YOUR SHOPPING JOURNEY (White Card) */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between relative overflow-hidden">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-sm font-bold uppercase flex items-center text-gray-800">
                <Flame size={16} className="text-orange-500 mr-2" /> YOUR SHOPPING JOURNEY
              </h2>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-8 mb-8">
              <div className="relative w-32 h-32 flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="64" cy="64" r="56" stroke="#f3f4f6" strokeWidth="12" fill="transparent" />
                  <circle cx="64" cy="64" r="56" stroke="#00a86b" strokeWidth="12" fill="transparent" strokeDasharray="351.8" strokeDashoffset="140.7" strokeLinecap="round" />
                </svg>
                <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center">
                  <span className="text-4xl font-black text-gray-900 leading-none tracking-tighter">18</span>
                  <span className="text-[11px] font-bold text-gray-600 uppercase tracking-widest mt-1">DAYS</span>
                  <span className="text-[9px] text-gray-400 font-bold mt-1.5 flex items-center">
                    Shopping Streak <Flame size={10} className="text-orange-500 ml-1" />
                  </span>
                </div>
              </div>
              
              <div className="flex-1 w-full text-center sm:text-left">
                <div className="text-sm font-black text-gray-900 mb-4">
                  18 <span className="text-gray-400 font-medium">/ 30 Days</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5 mb-4 overflow-hidden">
                  <div className="bg-green-500 h-full rounded-full" style={{ width: '60%' }}></div>
                </div>
                <p className="text-sm font-bold text-gray-800">
                  <span className="text-[#00a86b]">12 more days to unlock</span><br/>
                  <span className="font-normal text-gray-600">your next reward</span>
                </p>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-4 bg-green-50/50 -mx-6 px-6 -mb-6 pb-6 rounded-b-3xl text-xs">
              <span className="text-green-700 font-medium flex items-center">
                <Check size={14} className="mr-1" /> Keep it up! You're doing great.
              </span>
              <Link to="/shopping-journey/my-journey" className="font-bold text-green-700 hover:text-green-800 flex items-center transition-colors">
                View Journey History <ArrowRight size={14} className="ml-1" />
              </Link>
            </div>
          </div>

          {/* YOUR REWARDS */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-sm font-bold text-gray-800 uppercase flex items-center">
                <Gift size={16} className="text-green-500 mr-2" /> YOUR REWARDS
              </h2>
              <Link to="/shopping-journey/my-rewards" className="text-xs font-bold text-green-600 hover:text-green-700 flex items-center">
                View All Rewards <ArrowRight size={14} className="ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 mb-6">
              <div className="border border-gray-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow bg-white">
                <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center border border-green-100"><Wallet size={20} /></div>
                <div>
                  <div className="text-lg font-black text-gray-900">₹75</div>
                  <div className="text-[11px] font-bold text-gray-500 leading-tight">Rewards<br/>Unlocked</div>
                </div>
              </div>
              
              <div className="border border-gray-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow bg-white">
                <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center border border-red-100"><Gift size={20} /></div>
                <div>
                  <div className="text-lg font-black text-gray-900">3</div>
                  <div className="text-[11px] font-bold text-gray-500 leading-tight">Free Items<br/>Earned</div>
                </div>
              </div>
              
              <div className="border border-gray-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow bg-white">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center border border-blue-100"><Shirt size={20} /></div>
                <div>
                  <div className="text-lg font-black text-gray-900">1</div>
                  <div className="text-[11px] font-bold text-gray-500 leading-tight">Merchandise<br/>Unlocked</div>
                </div>
              </div>
              
              <div className="border border-gray-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow bg-white">
                <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center border border-orange-100"><Flame size={20} /></div>
                <div>
                  <div className="text-lg font-black text-gray-900">18</div>
                  <div className="text-[11px] font-bold text-gray-500 leading-tight">Shopping<br/>Days</div>
                </div>
              </div>
            </div>
            
            <div className="pt-4 flex items-center text-xs font-bold text-green-700 bg-green-50/50 -mx-6 px-6 -mb-6 pb-6 rounded-b-3xl">
              <Sparkles size={14} className="mr-2 text-green-500" /> More shopping. More rewards. More happiness!
            </div>
          </div>
        </div>
        
        {/* REWARD MILESTONES */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 py-10">
          <div className="mb-10">
            <h2 className="text-sm font-black text-gray-800 uppercase tracking-widest mb-1">REWARD MILESTONES</h2>
            <p className="text-xs text-gray-500 font-medium">Complete days to unlock exciting rewards</p>
          </div>
          
          <div className="relative pt-4 pb-8 max-w-5xl mx-auto">
            {/* Dashed background line */}
            <div className="absolute top-[40%] left-[5%] right-[5%] h-0.5 border-t-[3px] border-dashed border-gray-200 -mt-0.5 z-0"></div>
            
            <div className="relative z-10 flex justify-between items-start">
              {/* Milestone 7 */}
              <div className="flex flex-col items-center">
                <div className="text-sm font-black text-gray-900 leading-none">7</div>
                <div className="text-[10px] text-gray-500 font-medium mb-4">Days</div>
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-white border-[3px] border-[#00a86b] flex items-center justify-center">
                    <Gift size={24} className="text-orange-500" />
                  </div>
                  <div className="absolute -bottom-2 right-1/2 translate-x-1/2 w-5 h-5 bg-[#00a86b] rounded-full flex items-center justify-center border-2 border-white text-white shadow-sm">
                    <Check size={10} strokeWidth={4} />
                  </div>
                </div>
                <div className="mt-5 text-center">
                  <div className="text-xs font-black text-gray-900">₹25</div>
                  <div className="text-[10px] text-gray-500 font-medium">Reward</div>
                </div>
              </div>

              {/* Milestone 15 */}
              <div className="flex flex-col items-center">
                <div className="text-sm font-black text-gray-900 leading-none">15</div>
                <div className="text-[10px] text-gray-500 font-medium mb-4">Days</div>
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-white border-[3px] border-[#00a86b] flex items-center justify-center">
                    <ShoppingBag size={24} className="text-gray-700" />
                  </div>
                  <div className="absolute -bottom-2 right-1/2 translate-x-1/2 w-5 h-5 bg-[#00a86b] rounded-full flex items-center justify-center border-2 border-white text-white shadow-sm">
                    <Check size={10} strokeWidth={4} />
                  </div>
                </div>
                <div className="mt-5 text-center">
                  <div className="text-xs font-black text-gray-900">Free Item</div>
                  <div className="text-[10px] text-gray-500 font-medium">Up to ₹49</div>
                </div>
              </div>

              {/* Milestone 30 */}
              <div className="flex flex-col items-center">
                <div className="text-sm font-black text-gray-900 leading-none">30</div>
                <div className="text-[10px] text-gray-500 font-medium mb-4">Days</div>
                <div className="relative">
                  <div className="w-20 h-20 -mt-2 rounded-full bg-white border-[3px] border-[#00a86b] flex items-center justify-center shadow-lg shadow-green-100">
                    <Percent size={28} className="text-gray-800" />
                  </div>
                  <div className="absolute -bottom-2 right-1/2 translate-x-1/2 w-5 h-5 bg-[#00a86b] rounded-full flex items-center justify-center border-2 border-white text-white shadow-sm">
                    <Check size={10} strokeWidth={4} />
                  </div>
                </div>
                <div className="mt-5 text-center">
                  <div className="text-xs font-black text-gray-900">₹99</div>
                  <div className="text-[10px] text-gray-500 font-medium">Reward</div>
                </div>
              </div>

              {/* Milestone 60 */}
              <div className="flex flex-col items-center opacity-70">
                <div className="text-sm font-black text-gray-900 leading-none">60</div>
                <div className="text-[10px] text-gray-500 font-medium mb-4">Days</div>
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-white border-[3px] border-gray-200 flex items-center justify-center">
                    <Shirt size={24} className="text-gray-400" />
                  </div>
                </div>
                <div className="mt-5 text-center">
                  <div className="text-xs font-black text-gray-900">SaathApp</div>
                  <div className="text-[10px] text-gray-500 font-medium">Merchandise</div>
                </div>
              </div>

              {/* Milestone 90 */}
              <div className="flex flex-col items-center opacity-70">
                <div className="text-sm font-black text-gray-900 leading-none">90</div>
                <div className="text-[10px] text-gray-500 font-medium mb-4">Days</div>
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-white border-[3px] border-gray-200 flex items-center justify-center">
                    <Trophy size={24} className="text-yellow-500" />
                  </div>
                </div>
                <div className="mt-5 text-center">
                  <div className="text-xs font-black text-gray-900">Premium</div>
                  <div className="text-[10px] text-gray-500 font-medium">Reward</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mega Rewards Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Grand Reward Card */}
          <div className="lg:col-span-1 bg-[#0c4a30] rounded-3xl p-6 shadow-sm text-white relative overflow-hidden flex flex-col">
            <div className="flex items-center text-yellow-400 text-[10px] font-bold tracking-widest uppercase mb-4 relative z-10">
              <Star size={12} className="mr-1" fill="currentColor" /> THE SAATHAPP GRAND REWARD
            </div>
            
            <h2 className="text-lg font-black mb-6 text-white leading-snug relative z-10">
              Every regular shopper gets closer<br/>to special rewards!
            </h2>
            
            <div className="flex items-center mb-6 relative z-10">
              <div className="flex -space-x-2 mr-3">
                <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-[#0c4a30] flex items-center justify-center"><Users size={14} className="text-white"/></div>
                <div className="w-8 h-8 rounded-full bg-teal-500 border-2 border-[#0c4a30]"></div>
              </div>
              <div>
                <div className="text-2xl font-black text-green-400 drop-shadow-md leading-none mb-1">1,24,680+</div>
                <div className="text-[9px] font-medium text-green-100 uppercase tracking-wide">Customers Participating</div>
              </div>
            </div>
            
            <div className="mt-auto relative z-10 border-t border-green-700/50 pt-4">
              <div className="flex flex-wrap gap-4 text-[10px] font-bold text-gray-100">
                <span className="flex items-center"><Shirt size={12} className="mr-1"/> T-Shirts</span>
                <span className="flex items-center"><span className="mr-1 text-sm leading-none">☕</span> Mugs</span>
                <span className="flex items-center"><ShoppingBag size={12} className="mr-1"/> Grocery Items</span>
                <span className="flex items-center"><Trophy size={12} className="mr-1"/> ₹99 Rewards</span>
                <span className="text-green-400">& More!</span>
              </div>
            </div>
          </div>
          
          {/* Monthly Mega Rewards List */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 h-full">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6">MONTHLY MEGA REWARDS</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0"><Shirt size={20} /></div>
                <div>
                  <h4 className="text-sm font-black text-gray-900">SaathApp Merchandise</h4>
                  <p className="text-[11px] text-gray-500 font-medium">T-Shirts, Mugs & More</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center flex-shrink-0"><ShoppingBag size={20} /></div>
                <div>
                  <h4 className="text-sm font-black text-gray-900">Free Grocery Items</h4>
                  <p className="text-[11px] text-gray-500 font-medium">Up to ₹99</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center flex-shrink-0"><div className="font-black text-lg">%</div></div>
                <div>
                  <h4 className="text-sm font-black text-gray-900">₹99 Value Rewards</h4>
                  <p className="text-[11px] text-gray-500 font-medium">Coupons & Cash Rewards</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center flex-shrink-0"><Gift size={20} /></div>
                <div>
                  <h4 className="text-sm font-black text-gray-900">Surprise Rewards</h4>
                  <p className="text-[11px] text-gray-500 font-medium">Exciting gifts every month</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Chance to Win */}
          <div className="bg-[#f4fcf6] rounded-3xl p-8 border border-green-50 flex flex-col h-full justify-between relative overflow-hidden">
            <div>
              <h3 className="text-lg font-black text-[#0a4d33] mb-2">Your Chance to Win!</h3>
              <p className="text-xs text-gray-600 font-medium mb-6 max-w-[200px]">
                Stay active, shop regularly and be among the lucky winners every month.
              </p>
            </div>
            
            <div className="flex justify-end pr-4 mb-4">
              <Gift size={64} className="text-[#00a86b]" />
            </div>
            
            <button 
              onClick={() => alert("Winner list for this month is currently being generated!")}
              className="w-full bg-[#00a86b] hover:bg-green-700 text-white font-bold py-3.5 px-6 rounded-xl transition-colors shadow-sm flex items-center justify-center"
            >
              View Winners <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        </div>
        
        {/* Bottom App & Features */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
          <div className="bg-[#f8f9fa] rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between col-span-1 lg:col-span-1">
            <div className="w-full">
              <h3 className="text-base font-black text-gray-900 mb-1">Get the full SaathApp experience</h3>
              <p className="text-xs text-gray-500 font-medium mb-6">Install SaathApp on your phone and track<br/>your journey, rewards and offers easily.</p>
              <div className="w-48">
                <InstallPWAButton />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 col-span-1 lg:col-span-2 flex items-center justify-around">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center"><ShoppingBag size={24}/></div>
              <div>
                <h4 className="text-sm font-black text-gray-900">Shop Daily</h4>
                <p className="text-[10px] text-gray-500 font-medium">Build your streak<br/>and unlock rewards</p>
              </div>
            </div>
            <div className="w-px h-12 bg-gray-100"></div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center"><Gift size={24}/></div>
              <div>
                <h4 className="text-sm font-black text-gray-900">Earn Rewards</h4>
                <p className="text-[10px] text-gray-500 font-medium">Get free items, discounts<br/>and exciting gifts</p>
              </div>
            </div>
            <div className="w-px h-12 bg-gray-100"></div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center"><Trophy size={24}/></div>
              <div>
                <h4 className="text-sm font-black text-gray-900">Win Big</h4>
                <p className="text-[10px] text-gray-500 font-medium">Stand a chance to win<br/>big every month</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer Note */}
        <div className="pt-4 flex items-center justify-between text-xs font-bold text-gray-500 border-t border-gray-200 mt-8 pb-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mr-2 text-[10px]"><Info size={10}/></div>
            Rewards are given based on your shopping streak and activity. Terms & Conditions apply.
          </div>
          <button onClick={() => setShowTermsModal(true)} className="hover:text-gray-900 flex items-center shrink-0 transition-colors">
            Learn More <ArrowRight size={12} className="ml-1" />
          </button>
        </div>
        
      </main>

      <KnowMoreModal isOpen={isKnowMoreOpen} onClose={() => setIsKnowMoreOpen(false)} />

      {/* Terms & Conditions Modal Overlay */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-[32px] w-full max-w-3xl shadow-2xl relative animate-in fade-in zoom-in duration-200 my-auto">
            <button 
              onClick={() => setShowTermsModal(false)}
              className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
            >
              <X size={16} />
            </button>
            
            <div className="p-8 sm:p-10">
              {/* Header */}
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-12 h-12 rounded-full bg-green-50 text-green-500 border border-green-100 flex items-center justify-center mb-4">
                  <ShieldCheck size={24} />
                </div>
                <h2 className="text-2xl font-black text-gray-900 mb-2">Terms & Conditions</h2>
                <p className="text-sm text-gray-500 font-medium">Please read the terms carefully</p>
              </div>
              
              {/* Badges/Tabs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-lg mx-auto">
                <div className="flex-1 bg-green-50 border border-green-100 rounded-xl py-3 flex justify-center items-center gap-2 text-green-600 font-bold text-sm">
                  <Info size={16} /> How it works
                </div>
                <div className="flex-1 border border-gray-100 rounded-xl py-3 flex justify-center items-center gap-2 text-gray-500 font-bold text-sm bg-gray-50">
                  <FileText size={16} /> Terms & Conditions
                </div>
              </div>

              {/* Content */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 mb-8">
                {/* Left Column */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-5">How it works</h3>
                  <ul className="space-y-5">
                    <li className="flex gap-4">
                      <div className="w-6 h-6 shrink-0 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold mt-0.5">1</div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm mb-1 leading-tight">Shop regularly</h4>
                        <p className="text-xs text-gray-500 font-medium leading-relaxed">Place orders on any day. Every successful order counts as a shopping day.</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="w-6 h-6 shrink-0 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold mt-0.5">2</div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm mb-1 leading-tight">Maintain your streak</h4>
                        <p className="text-xs text-gray-500 font-medium leading-relaxed">Shop on more days to build your streak and reach exciting milestones.</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="w-6 h-6 shrink-0 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold mt-0.5">3</div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm mb-1 leading-tight">Unlock rewards!</h4>
                        <p className="text-xs text-gray-500 font-medium leading-relaxed">Hit milestones to unlock rewards, free items, merchandise & more.</p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Right Column */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-5">Terms & Conditions</h3>
                  <ul className="space-y-4">
                    <li className="flex gap-3 items-start">
                      <div className="w-4 h-4 shrink-0 rounded-full bg-green-50 text-green-500 border border-green-100 flex items-center justify-center mt-0.5">
                        <Check size={10} strokeWidth={3} />
                      </div>
                      <p className="text-xs text-gray-600 font-medium leading-relaxed">Maintain your streak to keep rewards.</p>
                    </li>
                    <li className="flex gap-3 items-start">
                      <div className="w-4 h-4 shrink-0 rounded-full bg-green-50 text-green-500 border border-green-100 flex items-center justify-center mt-0.5">
                        <Check size={10} strokeWidth={3} />
                      </div>
                      <p className="text-xs text-gray-600 font-medium leading-relaxed">Fraudulent activities lead to disqualification.</p>
                    </li>
                    <li className="flex gap-3 items-start">
                      <div className="w-4 h-4 shrink-0 rounded-full bg-green-50 text-green-500 border border-green-100 flex items-center justify-center mt-0.5">
                        <Check size={10} strokeWidth={3} />
                      </div>
                      <p className="text-xs text-gray-600 font-medium leading-relaxed">Cancelled, returned or fraudulent orders will not be counted.</p>
                    </li>
                    <li className="flex gap-3 items-start">
                      <div className="w-4 h-4 shrink-0 rounded-full bg-green-50 text-green-500 border border-green-100 flex items-center justify-center mt-0.5">
                        <Check size={10} strokeWidth={3} />
                      </div>
                      <p className="text-xs text-gray-600 font-medium leading-relaxed">Rewards are subject to availability and may change at any time.</p>
                    </li>
                    <li className="flex gap-3 items-start">
                      <div className="w-4 h-4 shrink-0 rounded-full bg-green-50 text-green-500 border border-green-100 flex items-center justify-center mt-0.5">
                        <Check size={10} strokeWidth={3} />
                      </div>
                      <p className="text-xs text-gray-600 font-medium leading-relaxed">SaathApp reserves the right to modify or withdraw the program at any time.</p>
                    </li>
                    <li className="flex gap-3 items-start">
                      <div className="w-4 h-4 shrink-0 rounded-full bg-green-50 text-green-500 border border-green-100 flex items-center justify-center mt-0.5">
                        <Check size={10} strokeWidth={3} />
                      </div>
                      <p className="text-xs text-gray-600 font-medium leading-relaxed">Other terms as per SaathApp policy.</p>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Footer Area */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-gray-100">
                <div className="flex items-center text-green-600 text-xs font-bold">
                  <ShieldCheck size={16} className="mr-2" />
                  By participating, you agree to the above terms and conditions.
                </div>
                <button 
                  onClick={() => setShowTermsModal(false)}
                  className="w-full sm:w-auto bg-[#00a86b] hover:bg-green-700 text-white font-bold py-3.5 px-10 rounded-xl transition-colors text-sm shadow-sm"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingJourneyDashboard;

