import React from 'react';
import { HelpCircle, X, Check } from 'lucide-react';

const OBJECTIVES = ['Brand Awareness', 'More Sales', 'More Store Visits', 'New Product Launch'];
const GENDERS = ['All', 'Male', 'Female'];
const AGE_GROUPS = ['All', '18-24', '25-34', '35-44', '45+'];
const LANGUAGES = ['All Languages', 'Hindi', 'English', 'Regional'];
const CITIES = ['Patna', 'Nalanda', 'Biharsharif', 'Gaya', 'Muzaffarpur', 'Bhagalpur'];

export default function CampaignDetailsSection({ draft, updateDraft }) {
  const toggleCity = (city) => {
    const current = draft.targetCities || [];
    if (current.includes(city)) {
      updateDraft({ targetCities: current.filter(c => c !== city) });
    } else {
      updateDraft({ targetCities: [...current, city] });
    }
  };

  const toggleLocationType = (val) => {
    updateDraft({ locationType: val });
  };

  return (
    <div className="space-y-6 pt-4">
      <h2 className="text-xl font-bold text-slate-900 tracking-tight border-t border-slate-200 pt-8">2. Set Campaign Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Campaign Name <span className="text-rose-500">*</span></label>
          <input 
            type="text" 
            placeholder="Enter campaign name"
            className="transition-colors duration-200 focus:ring-emerald-500/20 focus:border-emerald-500 w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#15803D]/20 focus:border-[#15803D] transition-all bg-surface"
            value={draft.name || ''}
            onChange={(e) => updateDraft({ name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Campaign Objective <span className="text-rose-500">*</span></label>
          <select 
            className="transition-colors duration-200 focus:ring-emerald-500/20 focus:border-emerald-500 w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#15803D]/20 focus:border-[#15803D] transition-all bg-surface appearance-none"
            value={draft.objective || ''}
            onChange={(e) => updateDraft({ objective: e.target.value })}
          >
            {OBJECTIVES.map(obj => <option key={obj} value={obj}>{obj}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Start Date <span className="text-rose-500">*</span></label>
          <input 
            type="date" 
            className="transition-colors duration-200 focus:ring-emerald-500/20 focus:border-emerald-500 w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#15803D]/20 focus:border-[#15803D] transition-all bg-surface"
            value={draft.startDate || ''}
            onChange={(e) => updateDraft({ startDate: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">End Date <span className="text-rose-500">*</span></label>
          <input 
            type="date" 
            className="transition-colors duration-200 focus:ring-emerald-500/20 focus:border-emerald-500 w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#15803D]/20 focus:border-[#15803D] transition-all bg-surface"
            value={draft.endDate || ''}
            onChange={(e) => updateDraft({ endDate: e.target.value })}
          />
        </div>
      </div>

      {/* Targeted Locations */}
      <div className="space-y-4">
        <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
          Targeted Locations <span className="text-rose-500">*</span>
          <HelpCircle size={14} className="text-slate-400" />
        </label>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            {[
              { id: 'all_india', label: 'All India' },
              { id: 'state', label: 'Select State' },
              { id: 'district', label: 'Select District' },
              { id: 'city', label: 'Select City' },
              { id: 'area', label: 'Select Area / PIN Code' },
              { id: 'radius', label: 'Radius Targeting' },
            ].map(loc => (
              <label key={loc.id} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                  draft.locationType === loc.id ? 'border-[#15803D] bg-surface' : 'border-slate-300 group-hover:border-slate-400'
                }`}>
                  {draft.locationType === loc.id && <div className="w-2 h-2 rounded-full bg-[#15803D]" />}
                </div>
                <span className="text-sm font-medium text-slate-700">{loc.label}</span>
                <input 
                  type="radio" 
                  className="transition-colors duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none hidden" 
                  checked={draft.locationType === loc.id}
                  onChange={() => toggleLocationType(loc.id)}
                />
              </label>
            ))}
          </div>

          <div className="bg-surface p-5 rounded-xl border border-slate-200 space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3">Select Cities</label>
              <div className="flex flex-wrap gap-2 mb-4">
                {(draft.targetCities || []).map(city => (
                  <div key={city} className="flex items-center gap-1.5 bg-page px-3 py-1.5 rounded-md border border-slate-200 text-sm font-medium text-slate-700">
                    {city}
                    <button onClick={() => toggleCity(city)} className="text-slate-400 hover:text-slate-600">
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <select 
                className="transition-colors duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 w-full p-0 border-none focus:outline-none focus:ring-0 text-slate-500 text-sm bg-transparent appearance-none cursor-pointer"
                onChange={(e) => {
                  if (e.target.value && !(draft.targetCities || []).includes(e.target.value)) {
                    toggleCity(e.target.value);
                  }
                  e.target.value = "";
                }}
              >
                <option value="">Search and select cities</option>
                {CITIES.map(city => <option key={city} value={city}>{city}</option>)}
              </select>
            </div>

            {draft.locationType === 'radius' && (
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Target Radius (Km)</label>
                <div className="flex flex-wrap gap-2">
                  {['3km', '5km', '10km', '50km'].map((rad) => {
                    const active = (draft.radius || '10km') === rad;
                    return (
                      <button
                        key={rad}
                        type="button"
                        onClick={() => updateDraft({ radius: rad })}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition ${
                          active ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-page text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {rad}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Target Audience */}
      <div className="space-y-4 pt-2">
        <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
          Target Audience (Optional)
          <HelpCircle size={14} className="text-slate-400" />
        </label>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500">Gender</label>
            <select 
              className="transition-colors duration-200 focus:ring-emerald-500/20 focus:border-emerald-500 w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#15803D]/20 focus:border-[#15803D] transition-all bg-surface appearance-none text-sm"
              value={draft.audienceGender || 'All'}
              onChange={(e) => updateDraft({ audienceGender: e.target.value })}
            >
              {GENDERS.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500">Age Group</label>
            <select 
              className="transition-colors duration-200 focus:ring-emerald-500/20 focus:border-emerald-500 w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#15803D]/20 focus:border-[#15803D] transition-all bg-surface appearance-none text-sm"
              value={draft.audienceAge || 'All'}
              onChange={(e) => updateDraft({ audienceAge: e.target.value })}
            >
              {AGE_GROUPS.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500">Language</label>
            <select 
              className="transition-colors duration-200 focus:ring-emerald-500/20 focus:border-emerald-500 w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#15803D]/20 focus:border-[#15803D] transition-all bg-surface appearance-none text-sm"
              value={draft.audienceLanguage || 'All Languages'}
              onChange={(e) => updateDraft({ audienceLanguage: e.target.value })}
            >
              {LANGUAGES.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 pt-3">
          {[
            { id: 'new', label: 'New Customers' },
            { id: 'returning', label: 'Returning Customers' },
            { id: 'b2b', label: 'Business Customers (B2B)' },
            { id: 'b2c', label: 'Retail Customers (B2C)' },
          ].map(type => (
            <label key={type.id} className="flex items-center gap-2 cursor-pointer group">
              <div className={`w-4 h-4 rounded-[4px] border-2 flex items-center justify-center transition-colors ${
                (draft.customerTypes || []).includes(type.id) ? 'border-[#15803D] bg-[#15803D]' : 'border-slate-300 group-hover:border-slate-400 bg-surface'
              }`}>
                {(draft.customerTypes || []).includes(type.id) && <Check size={10} className="text-white" strokeWidth={4} />}
              </div>
              <span className="text-sm font-medium text-slate-600">{type.label}</span>
              <input 
                type="checkbox" 
                className="transition-colors duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none hidden" 
                checked={(draft.customerTypes || []).includes(type.id)}
                onChange={(e) => {
                  const types = new Set(draft.customerTypes || []);
                  if (e.target.checked) types.add(type.id);
                  else types.delete(type.id);
                  updateDraft({ customerTypes: [...types] });
                }}
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
