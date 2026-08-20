import React from 'react';

const MyJourney = () => {
  const history = [
    { day: 1, title: 'Shopping Started', date: '2026-08-01', type: 'start' },
    { day: 7, title: '₹25 Reward Unlocked', date: '2026-08-07', type: 'reward', icon: '✓' },
    { day: 15, title: 'Free Item Unlocked', date: '2026-08-15', type: 'reward', icon: '✓' },
    { day: 18, title: 'Current Progress', date: 'Today', type: 'current' },
    { day: 30, title: '₹99 Reward', type: 'upcoming', icon: '🔒' },
    { day: 60, title: 'SaathApp Merchandise', type: 'upcoming', icon: '🔒' },
    { day: 90, title: 'Premium Reward', type: 'upcoming', icon: '🔒' },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 pb-20 md:pb-8">
      <div className="flex items-center mb-8">
        <button onClick={() => window.history.back()} className="mr-4 text-gray-500 hover:text-green-600 font-bold">&larr; Back</button>
        <h1 className="text-3xl font-bold text-gray-900">My Shopping Journey</h1>
      </div>
      
      {/* Premium Dashboard Metrics */}
      <div className="bg-gray-900 rounded-2xl p-6 text-white grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div>
          <div className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">Current Streak</div>
          <div className="text-3xl font-bold text-green-400">18 <span className="text-sm font-normal text-gray-300">Days</span></div>
        </div>
        <div>
          <div className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">Longest Streak</div>
          <div className="text-3xl font-bold">24 <span className="text-sm font-normal text-gray-300">Days</span></div>
        </div>
        <div>
          <div className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">Total Days</div>
          <div className="text-3xl font-bold">43 <span className="text-sm font-normal text-gray-300">Days</span></div>
        </div>
        <div>
          <div className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">Next Milestone</div>
          <div className="text-3xl font-bold text-orange-400">30 <span className="text-sm font-normal text-gray-300">Days</span></div>
        </div>
      </div>

      {/* Chronological Feed */}
      <div className="relative border-l-2 border-gray-200 ml-4">
        {history.map((event, index) => (
          <div key={index} className="mb-10 ml-8 relative">
            <span className={`absolute -left-10 flex h-6 w-6 items-center justify-center rounded-full ring-8 ring-white ${
              event.type === 'upcoming' ? 'bg-gray-200 text-gray-500' : 
              event.type === 'current' ? 'bg-orange-500 text-white' : 'bg-green-500 text-white'
            }`}>
              {event.type === 'current' ? '🔥' : (event.icon || '•')}
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-500">Day {event.day} {event.date && `• ${event.date}`}</span>
              <h3 className={`text-lg font-bold mt-1 ${event.type === 'upcoming' ? 'text-gray-400' : 'text-gray-900'}`}>
                {event.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyJourney;
