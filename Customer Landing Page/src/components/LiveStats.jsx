import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
// Removed mockData dependency

// Dynamic count-up counter component
function Counter({ value, prefix = '', suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000; // 2 seconds
    const end = parseInt(value);
    if (start === end) return;

    const incrementTime = Math.abs(Math.floor(duration / end));
    const stepSize = Math.max(1, Math.floor(end / 100)); // Make it step faster for large values

    const timer = setInterval(() => {
      start += stepSize;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, Math.max(16, incrementTime)); // Cap interval speed at 60fps (16ms)

    return () => clearInterval(timer);
  }, [value, isInView]);

  return (
    <span ref={ref} className="font-mono">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function LiveStats() {
  const [liveStats, setLiveStats] = useState(Array.from({ length: 4 }, () => ({
    value: '0',
    prefix: '',
    suffix: '',
    label: '\u00A0'
  })));
  return (
    <section className="py-12 bg-gradient-primary text-white border-b border-green-900 relative overflow-hidden">
      
      {/* Background shape overlays */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute w-72 h-72 rounded-full bg-white/20 blur-3xl -top-10 -right-10" />
        <div className="absolute w-72 h-72 rounded-full bg-white/20 blur-3xl -bottom-10 -left-10" />
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {liveStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="text-center space-y-1.5"
              >
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-secondary tracking-tight">
                  <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
                
                <div className="h-0.5 w-10 bg-white/35 mx-auto rounded-full" />
                
                <p className="text-xs sm:text-sm font-bold text-white/85 tracking-wide uppercase">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

    </section>
  );
}
