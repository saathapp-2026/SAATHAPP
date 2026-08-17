import React from 'react';
import { Settings, User, Building2, Shield, Key, Bell, Save } from 'lucide-react';
import { useWholesale } from '../../../context/WholesaleContext';

export default function SettingsTab() {
  const { formData, updateFormData, addToast } = useWholesale();

  const handleSaveSettings = (e) => {
    e.preventDefault();
    addToast('Business settings saved successfully!', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Business Settings & Security</h2>
          <p className="text-xs text-slate-500">Configure profile details, warehouse permissions, API keys, and security options.</p>
        </div>
      </div>

      <form onSubmit={handleSaveSettings} className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-surface p-6 shadow-sm space-y-6 max-w-3xl">
        <div className="space-y-4 text-xs">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
            Company & Partner Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Company Name</label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => updateFormData({ businessName: e.target.value })}
                className="w-full rounded-xl border border-slate-300 bg-page dark:bg-slate-950 p-2.5 font-semibold text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Owner Name</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => updateFormData({ fullName: e.target.value })}
                className="w-full rounded-xl border border-slate-300 bg-page dark:bg-slate-950 p-2.5 font-semibold text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
            API Key & Developer Access (ERP Sync)
          </h3>
          <div className="p-4 rounded-2xl bg-page dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">saath_live_whl_9842027184712039</span>
              <p className="text-[11px] text-slate-500 mt-0.5">Use for SAP / Tally ERP real-time inventory sync.</p>
            </div>
            <button
              type="button"
              onClick={() => addToast('API Key copied to clipboard!', 'success')}
              className="rounded-xl border border-slate-300 px-3 py-1.5 text-xs font-bold"
            >
              Copy Key
            </button>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 px-6 py-3 text-xs font-extrabold text-white shadow"
          >
            <Save size={15} /> Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
