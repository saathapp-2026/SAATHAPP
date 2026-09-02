import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, UserCheck, CheckCircle } from 'lucide-react';
import { howItWorksSteps } from '../data/mockData';

const stepIcons = [Search, Calendar, UserCheck, CheckCircle];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-12 bg-surface border-b border-slate-100 ">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-extrabold text-primary tracking-wider uppercase block">Simple Steps</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">How SaathApp Works</h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-2 leading-relaxed">
            Order local products or book home services in seconds — simple, fast, and transparent.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          
          {/* Horizontal Line Connector (desktop only) */}
          <div className="absolute top-[39px] left-[12%] right-[12%] h-0.5 bg-page hidden md:block z-10" />

          {howItWorksSteps.map((item, index) => {
            const Icon = stepIcons[index];
            const isSelected = activeStep === index;

            return (
              <motion.div
                key={index}
                onClick={() => setActiveStep(index)}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="relative cursor-pointer text-center flex flex-col items-center space-y-4 group z-20"
              >
                
                {/* Step Circle with Icon */}
                <motion.div
                  animate={isSelected 
                    ? { scale: 1.15, boxShadow: '0 0 20px rgba(46, 125, 50, 0.25)' } 
                    : { scale: 1 }
                  }
                  className={`w-20 h-20 rounded-full flex items-center justify-center border-2 transition-all relative ${
                    isSelected 
                      ? 'bg-primary border-primary text-white' 
                      : 'bg-surface border-slate-200 dark:border-slate-800 text-slate-400 group-hover:border-primary/50 group-hover:text-primary'
                  }`}
                >
                  <Icon size={28} />

                  {/* Step index badge */}
                  <span className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black border-2 ${
                    isSelected
                      ? 'bg-secondary text-slate-900 border-primary'
                      : 'bg-page text-slate-500 border-white dark:border-slate-900'
                  }`}>
                    {item.step}
                  </span>
                </motion.div>

                {/* Text Labels */}
                <div className="space-y-1 max-w-[200px]">
                  <h3 className={`text-sm font-black transition-colors ${
                    isSelected ? 'text-primary dark:text-primary-light' : 'text-slate-800 dark:text-slate-250'
                  }`}>
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-450 leading-relaxed">
                    {item.description}
                  </p>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
