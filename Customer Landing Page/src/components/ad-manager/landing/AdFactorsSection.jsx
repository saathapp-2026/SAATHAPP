import React from 'react';
import { 
  MapPin, 
  Building2, 
  LayoutGrid, 
  Package, 
  Navigation,
  Globe2,
  Swords,
  Users2,
  Sun,
  LayoutTemplate,
  MonitorPlay,
  Users,
  Clock,
  Search,
  Target
} from 'lucide-react';

const FACTORS = [
  { icon: MapPin, label: 'Location' },
  { icon: Building2, label: 'City Tier' },
  { icon: LayoutGrid, label: 'Category' },
  { icon: Package, label: 'Products' },
  { icon: Navigation, label: 'Distance' },
  { icon: Globe2, label: 'Coverage Area' },
  { icon: Swords, label: 'Competition' },
  { icon: Users2, label: 'Population' },
  { icon: Sun, label: 'Season' },
  { icon: LayoutTemplate, label: 'Placement' },
  { icon: MonitorPlay, label: 'Banner Size' },
  { icon: Users, label: 'Audience' },
  { icon: Clock, label: 'Duration' },
  { icon: Search, label: 'Search Volume' },
  { icon: Target, label: 'Targeting' },
];

export default function AdFactorsSection() {
  return (
    <div className="flex-1">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px w-6 sm:w-12 bg-emerald-500" />
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight shrink-0">
          Factors That Affect Pricing
        </h2>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4">
        {FACTORS.map((factor, i) => (
          <div 
            key={i} 
            className="group flex flex-col items-center justify-center p-4 rounded-2xl bg-surface dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-lg transition-all duration-300 text-center gap-3 cursor-default"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <factor.icon size={20} />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
              {factor.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
