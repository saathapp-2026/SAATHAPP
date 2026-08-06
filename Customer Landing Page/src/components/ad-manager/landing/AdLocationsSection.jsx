import React from 'react';
import { 
  Home, 
  Search, 
  ListTree, 
  Package, 
  Store, 
  ThumbsUp, 
  BadgeCheck, 
  MapPin, 
  PartyPopper, 
  Zap,
  CheckCircle2,
  Globe2
} from 'lucide-react';

const LOCATIONS = [
  { icon: Home, label: 'Homepage' },
  { icon: Search, label: 'Search Results' },
  { icon: ListTree, label: 'Category Pages' },
  { icon: Package, label: 'Product Pages' },
  { icon: Store, label: 'Store Pages' },
  { icon: ThumbsUp, label: 'Recommended Products' },
  { icon: BadgeCheck, label: 'Brand Pages' },
  { icon: MapPin, label: 'Nearby Stores' },
  { icon: PartyPopper, label: 'Festival Pages' },
  { icon: Zap, label: 'Flash Sale Section' },
];

const COVERAGE_OPTIONS = [
  'Single Village',
  'Multiple Villages',
  'Panchayat',
  'Block',
  'District',
  'Multiple Districts',
  'State',
  'Multiple States',
  'National (All India)',
];

export default function AdLocationsSection() {
  return (
    <div className="flex-1">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px w-6 sm:w-12 bg-emerald-500" />
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight shrink-0">
          Advertisement Locations
        </h2>
        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4">
          {LOCATIONS.map((loc, i) => (
            <div 
              key={i} 
              className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center gap-3"
            >
              <loc.icon size={20} className="text-emerald-600 dark:text-emerald-500" />
              <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                {loc.label}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-emerald-100/50 dark:from-emerald-900/20 to-transparent pointer-events-none" />
          <Globe2 size={120} className="absolute -right-4 -bottom-4 text-emerald-100 dark:text-emerald-900/30 -rotate-12 pointer-events-none" />
          
          <h3 className="text-emerald-800 dark:text-emerald-400 font-bold mb-4 flex items-center gap-2 relative z-10">
            Coverage Options
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 relative z-10">
            {COVERAGE_OPTIONS.map((opt, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {opt}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
