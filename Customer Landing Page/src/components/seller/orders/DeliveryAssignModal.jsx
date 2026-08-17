import React, { useEffect, useState } from 'react';
import { Star, Bike, MapPin, X, User } from 'lucide-react';
import { getDeliveryAgents } from '../../../services/seller/sellerOrdersService';

export default function DeliveryAssignModal({ open, order, loading, onAssign, onClose }) {
  const [agents, setAgents] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    let cancelled = false;
    setFetching(true);
    getDeliveryAgents()
      .then((res) => {
        if (!cancelled) setAgents(res.data || []);
      })
      .finally(() => {
        if (!cancelled) setFetching(false);
      });
    return () => {
      cancelled = true;
    };
  }, [open]);

  if (!open || !order) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-4" role="dialog" aria-modal="true" aria-labelledby="assign-title">
      <button type="button" className="absolute inset-0 bg-black/50" aria-label="Close" onClick={onClose} />
      <div className="relative w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-surface border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="sticky top-0 flex items-center justify-between gap-3 p-4 border-b border-slate-200 dark:border-slate-800 bg-surface">
          <div>
            <h2 id="assign-title" className="font-bold text-lg">Assign Delivery Agent</h2>
            <p className="text-sm text-slate-500">Order {order.id} · {order.customer.name}</p>
          </div>
          <button type="button" onClick={onClose} className="p-2 rounded-lg hover:bg-page" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="p-4 space-y-3">
          {fetching && (
            <div className="space-y-2 animate-pulse">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-24 rounded-xl bg-page" />
              ))}
            </div>
          )}
          {!fetching && agents.map((agent) => (
            <div
              key={agent.id}
              className={`flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl border ${
                agent.available
                  ? 'border-slate-200'
                  : 'border-slate-100 dark:border-slate-800 opacity-60'
              }`}
            >
              <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center shrink-0">
                <User size={22} className="text-emerald-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold">{agent.name}</p>
                  <span className="inline-flex items-center gap-0.5 text-xs text-amber-600">
                    <Star size={12} fill="currentColor" /> {agent.rating}
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                    agent.available
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                      : 'bg-page text-slate-500'
                  }`}>
                    {agent.available ? 'Available' : 'Busy'}
                  </span>
                </div>
                <div className="mt-1 flex flex-wrap gap-3 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1"><MapPin size={12} /> {agent.distanceKm} km</span>
                  <span className="inline-flex items-center gap-1"><Bike size={12} /> {agent.vehicle}</span>
                  <span>{agent.currentOrders} active orders</span>
                  <span>ETA {agent.etaMinutes} min</span>
                </div>
              </div>
              <button
                type="button"
                disabled={!agent.available || loading}
                onClick={() => onAssign(agent.id)}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-40"
              >
                {loading ? 'Assigning…' : 'Assign'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
