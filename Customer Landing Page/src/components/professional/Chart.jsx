import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, TrendingUp } from 'lucide-react';

export default function Chart() {
  const [timeframe, setTimeframe] = useState('weekly'); // 'daily', 'weekly', 'monthly', 'yearly'
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [downloading, setDownloading] = useState(false);

  // Real data structure ready to be hydrated
  const earningsData = {
    daily: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      values: [0, 0, 0, 0, 0, 0, 0],
      total: '0',
      percentage: '0.0'
    },
    weekly: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      values: [0, 0, 0, 0],
      total: '0',
      percentage: '0.0'
    },
    monthly: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      values: [0, 0, 0, 0, 0, 0],
      total: '0',
      percentage: '0.0'
    },
    yearly: {
      labels: ['2023', '2024', '2025', '2026'],
      values: [0, 0, 0, 0],
      total: '0',
      percentage: '0.0'
    }
  };

  // Empty state for Doughnut Chart
  const bookingStatuses = [
    { label: 'Completed', value: 0, color: '#2E7D32', offset: 0 },
    { label: 'Upcoming', value: 0, color: '#1565C0', offset: 0 },
    { label: 'Pending', value: 0, color: '#FFC107', offset: 0 },
    { label: 'Cancelled', value: 0, color: '#E53935', offset: 0 },
    { label: 'In Progress', value: 0, color: '#81C784', offset: 0 }
  ];

  const currentData = earningsData[timeframe];
  const maxVal = Math.max(...currentData.values);
  
  // Chart dimensions
  const width = 500;
  const height = 200;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 30;

  // Coordinate calculations for line chart
  const points = currentData.values.map((val, idx) => {
    const x = paddingLeft + (idx * (width - paddingLeft - paddingRight)) / (currentData.values.length - 1);
    const y = height - paddingBottom - (val * (height - paddingTop - paddingBottom)) / maxVal;
    return { x, y, value: val, label: currentData.labels[idx] };
  });

  // Construct path string
  let pathD = '';
  if (points.length > 0) {
    pathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      pathD += ` L ${points[i].x} ${points[i].y}`;
    }
  }

  // Construct fill path string (under-the-curve gradient)
  let fillD = '';
  if (points.length > 0) {
    fillD = `${pathD} L ${points[points.length - 1].x} ${height - paddingBottom} L ${points[0].x} ${height - paddingBottom} Z`;
  }

  const handleDownloadReport = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert('Earnings statement downloaded as PDF successfully.');
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Interactive Line Chart: Earnings */}
      <div className="lg:col-span-2 bg-surface border border-slate-200/60 dark:border-slate-800 rounded-card p-6 shadow-soft hover:shadow-premium transition-all text-left flex flex-col justify-between">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Financial Reports</span>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-slate-800 dark:text-white leading-none">Earnings Overview</h3>
              <span className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 font-extrabold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                <TrendingUp size={12} />
                <span>+{currentData.percentage}%</span>
              </span>
            </div>
          </div>

          {/* Timeframe Selector */}
          <div className="flex bg-page dark:bg-slate-950 p-1 border border-slate-200/60 dark:border-slate-800 rounded-xl w-max">
            {['daily', 'weekly', 'monthly', 'yearly'].map((period) => (
              <button
                key={period}
                onClick={() => {
                  setTimeframe(period);
                  setHoveredPoint(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider cursor-pointer transition-colors ${
                  timeframe === period 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Earning Stat summary */}
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-3xl font-black text-slate-800 dark:text-white">₹{currentData.total}</span>
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total settled</span>
        </div>

        {/* SVG Graphic Area */}
        <div className="relative mt-6 h-56 w-full">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.25" />
                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.00" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid Lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((r, idx) => {
              const y = paddingTop + r * (height - paddingTop - paddingBottom);
              return (
                <line
                  key={idx}
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-slate-100 dark:text-slate-800/80"
                  strokeDasharray="4 4"
                />
              );
            })}

            {/* Under-line Fill Area */}
            {fillD && <path d={fillD} fill="url(#chartGradient)" />}

            {/* Main Path Stroke */}
            {pathD && (
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8 }}
                d={pathD}
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Data point circles & hover triggers */}
            {points.map((pt, idx) => (
              <g key={idx}>
                {/* Visual Circle */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="5"
                  className="fill-primary stroke-white dark:stroke-slate-900"
                  strokeWidth="2"
                />
                
                {/* Active hover overlay */}
                {hoveredPoint === idx && (
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="9"
                    className="fill-primary/20 stroke-primary/30"
                    strokeWidth="1.5"
                  />
                )}

                {/* Grid intersection helper */}
                <line
                  x1={pt.x}
                  y1={paddingTop}
                  x2={pt.x}
                  y2={height - paddingBottom}
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-slate-100/50 dark:text-slate-850/50"
                  style={{ display: hoveredPoint === idx ? 'block' : 'none' }}
                />

                {/* Invisible large hover area */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="24"
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredPoint(idx)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              </g>
            ))}

            {/* X-Axis labels */}
            {points.map((pt, idx) => (
              <text
                key={idx}
                x={pt.x}
                y={height - 10}
                textAnchor="middle"
                className="fill-slate-400 dark:fill-slate-500 font-bold uppercase text-[9px] tracking-wide"
              >
                {pt.label}
              </text>
            ))}
          </svg>

          {/* Interactive Tooltip Card overlay */}
          <AnimatePresence>
            {hoveredPoint !== null && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{
                  position: 'absolute',
                  left: `${points[hoveredPoint].x - 45}px`,
                  top: `${points[hoveredPoint].y - 45}px`
                }}
                className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-3 py-1.5 rounded-lg shadow-premium text-center z-10 pointer-events-none"
              >
                <p className="text-[9px] font-black uppercase tracking-wider text-slate-450 dark:text-slate-500 leading-none">
                  {points[hoveredPoint].label}
                </p>
                <p className="text-xs font-black mt-1">₹{points[hoveredPoint].value}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer download action */}
        <div className="pt-4 mt-4 border-t border-slate-150 dark:border-slate-850 flex items-center justify-between">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Statement for {timeframe} settling</span>
          <button
            onClick={handleDownloadReport}
            disabled={downloading}
            className="flex items-center gap-1.5 text-xs font-black uppercase text-primary hover:text-primary-dark cursor-pointer disabled:opacity-50"
          >
            {downloading ? (
              <>
                <span className="w-3 h-3 rounded-full border border-primary border-t-transparent animate-spin" />
                <span>Downloading...</span>
              </>
            ) : (
              <>
                <Download size={13} />
                <span>Download Statement</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* Doughnut Chart: Booking Status Breakdown */}
      <div className="bg-surface border border-slate-200/60 dark:border-slate-800 rounded-card p-6 shadow-soft hover:shadow-premium transition-all text-left flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Order Analysis</span>
          <h3 className="text-base sm:text-lg font-black text-slate-800 dark:text-white mt-0.5">Booking Statuses</h3>
        </div>

        {/* SVG Doughnut */}
        <div className="relative w-36 h-36 mx-auto my-6 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
            {bookingStatuses.map((seg, idx) => {
              // Formula: circumference = 2 * pi * r = 2 * 3.14 * 35 = 220
              const circumference = 220;
              const strokeDash = (seg.value * circumference) / 100;
              const strokeOffset = circumference - (seg.offset * circumference) / 100;
              
              return (
                <circle
                  key={idx}
                  cx="50"
                  cy="50"
                  r="35"
                  fill="transparent"
                  stroke={seg.color}
                  strokeWidth="10"
                  strokeDasharray={`${strokeDash} ${circumference - strokeDash}`}
                  strokeDashoffset={strokeOffset}
                  className="transition-all duration-500"
                />
              );
            })}
          </svg>

          {/* Center text overlay */}
          <div className="absolute text-center">
            <span className="text-xl font-black text-slate-855 dark:text-white">0</span>
            <span className="text-[9px] text-slate-400 block font-bold uppercase tracking-wider">Total Jobs</span>
          </div>
        </div>

        {/* Legend listing */}
        <div className="space-y-1.5">
          {bookingStatuses.map((seg, idx) => (
            <div key={idx} className="flex items-center justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: seg.color }} />
                <span>{seg.label}</span>
              </div>
              <span className="font-bold">{seg.value}%</span>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
