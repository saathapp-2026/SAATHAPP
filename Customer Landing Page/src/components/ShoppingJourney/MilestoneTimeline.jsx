import React from 'react';

const MilestoneTimeline = ({ currentStreak = 18 }) => {
  const milestones = [
    { day: 7, label: '₹25' },
    { day: 15, label: 'Free Item' },
    { day: 30, label: '₹99' },
    { day: 60, label: 'Merch' },
    { day: 90, label: 'Premium' },
  ];

  return (
    <div className="py-8 relative">
      <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -mt-0.5 z-0 rounded"></div>
      <div 
        className="absolute top-1/2 left-0 h-1 bg-green-500 -mt-0.5 z-0 rounded transition-all duration-500"
        style={{ width: `${Math.min(100, (currentStreak / 90) * 100)}%` }}
      ></div>

      <div className="relative z-10 flex justify-between">
        {milestones.map((m, idx) => {
          const isPassed = currentStreak >= m.day;
          const isCurrentTarget = currentStreak < m.day && (idx === 0 || currentStreak >= milestones[idx-1].day);
          
          return (
            <div key={m.day} className="flex flex-col items-center">
              <div className="text-xs font-bold text-gray-500 mb-2">{m.day} Days</div>
              
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                isPassed ? 'bg-green-500 border-green-500 text-white' : 
                isCurrentTarget ? 'bg-surface border-green-500 text-green-500 shadow-[0_0_0_4px_rgba(34,197,94,0.2)]' : 
                'bg-surface border-gray-300 text-gray-300'
              }`}>
                {isPassed ? '✓' : (isCurrentTarget ? '⏳' : '🔒')}
              </div>
              
              <div className={`text-xs mt-2 font-medium text-center px-1 ${
                isPassed || isCurrentTarget ? 'text-gray-900' : 'text-gray-400'
              }`}>
                {m.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MilestoneTimeline;
