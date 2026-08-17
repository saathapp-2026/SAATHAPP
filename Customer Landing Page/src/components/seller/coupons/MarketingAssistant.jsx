import React, { useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import toast from 'react-hot-toast';
import SellerOverlay from '../SellerOverlay';
import { SELLER_Z } from '../../../config/seller/sellerZIndex';
import { getAiMarketingSuggestion } from '../../../services/seller/sellerCouponsService';

const ACTIONS = [
  { id: 'coupon_name', label: 'Generate Coupon Name' },
  { id: 'marketing_text', label: 'Generate Marketing Text' },
  { id: 'banner_headline', label: 'Generate Banner Headline' },
  { id: 'offer_description', label: 'Generate Offer Description' },
  { id: 'discount', label: 'Suggest Discount %' },
  { id: 'budget', label: 'Suggest Campaign Budget' },
  { id: 'audience', label: 'Suggest Target Audience' },
  { id: 'poster', label: 'Generate Poster Content' },
];

export default function MarketingAssistant({ open, onClose, onUse }) {
  const [busy, setBusy] = useState(false);
  const [results, setResults] = useState([]);
  const [active, setActive] = useState(ACTIONS[0].id);

  const run = async (id) => {
    setActive(id);
    setBusy(true);
    try {
      const res = await getAiMarketingSuggestion(id);
      setResults(res.data || []);
    } catch {
      toast.error('AI assistant unavailable');
    } finally {
      setBusy(false);
    }
  };

  return (
    <SellerOverlay open={open} onClose={onClose} labelledBy="ai-assist-title" zIndex={SELLER_Z.modal}>
      <div className="w-full max-w-lg rounded-2xl bg-surface border border-slate-200 dark:border-slate-800 shadow-xl p-5 max-h-[85vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 id="ai-assist-title" className="text-lg font-bold inline-flex items-center gap-2">
              <Sparkles className="text-emerald-600" size={18} /> AI Marketing Assistant
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Mock AI — architecture ready for live models</p>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 rounded-lg hover:bg-page" aria-label="Close">
            <X size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          {ACTIONS.map((a) => (
            <button
              key={a.id}
              type="button"
              disabled={busy}
              onClick={() => run(a.id)}
              className={`rounded-xl border px-3 py-2 text-left text-xs font-semibold ${
                active === a.id ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20' : 'border-slate-200'
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>

        {busy ? (
          <p className="text-sm text-slate-500 text-center py-6">Generating…</p>
        ) : (
          <ul className="space-y-2">
            {results.map((r) => (
              <li key={r}>
                <button
                  type="button"
                  onClick={() => {
                    onUse?.({ kind: active, value: r });
                    toast.success('Suggestion copied to flow');
                  }}
                  className="w-full text-left rounded-xl border border-slate-200 px-3 py-2.5 text-sm hover:bg-page"
                >
                  {r}
                </button>
              </li>
            ))}
            {!results.length ? (
              <li className="text-sm text-slate-500 text-center py-6">Pick an action to generate suggestions</li>
            ) : null}
          </ul>
        )}
      </div>
    </SellerOverlay>
  );
}
