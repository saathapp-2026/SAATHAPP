import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, Timer, Calendar, UserCheck } from 'lucide-react';
import { services } from '../data/mockData';

export default function ServiceSection({ onBookService }) {
  return (
    <section className="py-12 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/40">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="text-left">
            <span className="text-xs font-extrabold text-accent tracking-wider uppercase block">On-Demand Services</span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">Book Verified Local Professionals</h2>
          </div>

          <div className="flex items-center gap-1.5 bg-accent/5 text-accent dark:text-accent-light px-3.5 py-1.5 rounded-full border border-accent/15 text-xs font-bold">
            <ShieldCheck size={14} className="text-accent" />
            <span>All Services backed by 30-Day Warranty</span>
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -6 }}
              className="bg-white dark:bg-slate-900 rounded-card overflow-hidden border border-slate-200/60 dark:border-slate-800/50 shadow-soft hover:shadow-premium group flex flex-col justify-between"
            >
              {/* Image Banner */}
              <div className="w-full h-44 sm:h-48 bg-slate-200 relative overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Overlay: Category Tag */}
                <span className="absolute top-3 left-3 bg-accent text-white text-[10px] font-black uppercase tracking-wider py-0.5 px-2 rounded-full shadow-sm z-10">
                  {service.category}
                </span>

                {/* Overlay: Saathis active count */}
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-bold text-white flex items-center gap-1">
                  <UserCheck size={10} className="text-green-400" />
                  <span>{service.saathisAvailable} Professionals Active</span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-5 text-left flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-black text-slate-800 dark:text-slate-100 group-hover:text-accent transition-colors">
                    {service.name}
                  </h3>
                  
                  {/* Rating & reviews counts */}
                  <div className="flex items-center gap-1.5 mt-1.5 text-xs text-slate-500 font-semibold">
                    <div className="flex items-center gap-0.5 text-secondary">
                      <Star size={13} className="fill-secondary text-secondary" />
                      <span className="text-slate-800 dark:text-slate-200 font-bold">{service.rating}</span>
                    </div>
                    <span>•</span>
                    <span>({service.reviewsCount} bookings)</span>
                  </div>
                </div>

                {/* Specs: job duration */}
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 py-1 px-2 bg-slate-50 dark:bg-slate-800/40 rounded-md w-fit">
                  <Timer size={13} className="text-slate-400" />
                  <span>Duration: {service.duration}</span>
                </div>

                {/* Price and Book CTA button */}
                <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800/40">
                  <div className="text-left">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Starts From</span>
                    <span className="text-xl font-black text-slate-950 dark:text-white">₹{service.price}</span>
                  </div>

                  <motion.button
                    onClick={() => onBookService(service)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="h-10 px-5 rounded-btn bg-accent hover:bg-accent-dark text-white font-extrabold text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                  >
                    <Calendar size={13} />
                    <span>Book Now</span>
                  </motion.button>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
