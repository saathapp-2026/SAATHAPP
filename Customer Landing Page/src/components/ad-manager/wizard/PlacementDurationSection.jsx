import React from 'react';
import { Check } from 'lucide-react';

const PLACEMENTS = [
  { id: 'homepage_banner', label: 'Homepage' },
  { id: 'search_top', label: 'Search Results Top' },
  { id: 'category', label: 'Category Pages' },
  { id: 'store', label: 'Store Pages' },
  { id: 'product', label: 'Product Pages' },
  { id: 'recommended', label: 'Recommended Section' },
  { id: 'nearby', label: 'Nearby Stores' },
  { id: 'app_main', label: 'App Main Banner' },
];

const DURATIONS = [
  { value: 1, label: '1 Day' },
  { value: 3, label: '3 Days' },
  { value: 7, label: '7 Days' },
  { value: 15, label: '15 Days' },
  { value: 30, label: '30 Days' },
  { value: 'custom', label: 'Custom' },
];

export default function PlacementDurationSection({ draft, updateDraft }) {
  const togglePlacement = (id) => {
    const current = new Set(draft.placements || []);
    if (current.has(id)) {
      current.delete(id);
    } else {
      current.add(id);
    }
    updateDraft({ placements: [...current] });
  };

  return (
    <div className="space-y-12 pt-4">
      
      {/* Placements */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight border-t border-slate-200 pt-8">4. Select Placement</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PLACEMENTS.map(p => (
            <label key={p.id} className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-5 h-5 rounded-[4px] border-2 flex items-center justify-center transition-colors ${
                (draft.placements || []).includes(p.id) ? 'border-[#15803D] bg-[#15803D]' : 'border-slate-300 group-hover:border-slate-400 bg-white'
              }`}>
                {(draft.placements || []).includes(p.id) && <Check size={14} className="text-white" strokeWidth={3} />}
              </div>
              <span className="text-sm font-semibold text-slate-700">{p.label}</span>
              <input 
                type="checkbox" 
                className="hidden" 
                checked={(draft.placements || []).includes(p.id)}
                onChange={() => togglePlacement(p.id)}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight border-t border-slate-200 pt-8">5. Choose Duration</h2>
        
        <div className="flex flex-wrap items-center gap-6 md:gap-10">
          {DURATIONS.map(d => (
            <label key={d.value} className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                draft.duration === d.value ? 'border-[#15803D] bg-white' : 'border-slate-300 group-hover:border-slate-400'
              }`}>
                {draft.duration === d.value && <div className="w-2.5 h-2.5 rounded-full bg-[#15803D]" />}
              </div>
              <span className="text-sm font-semibold text-slate-700">{d.label}</span>
              <input 
                type="radio" 
                className="hidden" 
                checked={draft.duration === d.value}
                onChange={() => updateDraft({ duration: d.value })}
              />
            </label>
          ))}
        </div>
        <p className="text-xs text-slate-500 font-medium pt-2">Campaign will run for selected duration</p>
      </div>

    </div>
  );
}
