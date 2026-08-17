import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import SellerOverlay from '../SellerOverlay';
import { SELLER_Z } from '../../../config/seller/sellerZIndex';
import { REPORT_TYPES, SCHEDULE_TYPES, DELIVERY_METHODS } from '../../../config/seller/reportConstants';
import { saveSchedule } from '../../../services/seller/sellerReportsService';

const EMPTY = {
  name: '',
  typeId: 'sales',
  scheduleType: 'daily',
  time: '09:00',
  delivery: 'email',
  status: 'active',
};

export default function ScheduleReportModal({ open, onClose, onSaved, initial }) {
  const [form, setForm] = useState(EMPTY);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (open) setForm({ ...EMPTY, ...initial });
  }, [open, initial]);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error('Schedule name is required');
      return;
    }
    setBusy(true);
    try {
      const res = await saveSchedule(form);
      if (res.success) {
        toast.success(form.id ? 'Schedule updated' : 'Report scheduled');
        onSaved?.(res.data);
        onClose?.();
      }
    } catch {
      toast.error('Failed to save schedule');
    } finally {
      setBusy(false);
    }
  };

  return (
    <SellerOverlay open={open} onClose={onClose} labelledBy="schedule-title" zIndex={SELLER_Z.modal}>
      <div className="w-full max-w-lg rounded-2xl bg-surface border border-slate-200 dark:border-slate-800 shadow-xl p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 id="schedule-title" className="text-lg font-bold">
              {form.id ? 'Edit Schedule' : 'Schedule Report'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Automatic generation & delivery</p>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 rounded-lg hover:bg-page" aria-label="Close">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={submit} className="space-y-3">
          <label className="block text-xs font-medium">
            Schedule Name
            <input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm"
              placeholder="Daily Sales Report"
              required
            />
          </label>
          <label className="block text-xs font-medium">
            Report Type
            <select
              value={form.typeId}
              onChange={(e) => setForm((f) => ({ ...f, typeId: e.target.value }))}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm"
            >
              {REPORT_TYPES.map((t) => (
                <option key={t.id} value={t.id}>{t.label}</option>
              ))}
            </select>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-xs font-medium">
              Frequency
              <select
                value={form.scheduleType}
                onChange={(e) => setForm((f) => ({ ...f, scheduleType: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm"
              >
                {SCHEDULE_TYPES.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </label>
            <label className="block text-xs font-medium">
              Time
              <input
                type="time"
                value={form.time}
                onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm"
              />
            </label>
          </div>
          <label className="block text-xs font-medium">
            Delivery
            <select
              value={form.delivery}
              onChange={(e) => setForm((f) => ({ ...f, delivery: e.target.value }))}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm"
            >
              {DELIVERY_METHODS.map((d) => (
                <option key={d.id} value={d.id}>{d.label}</option>
              ))}
            </select>
          </label>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold">
              Cancel
            </button>
            <button
              type="submit"
              disabled={busy}
              className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 text-sm font-semibold disabled:opacity-50"
            >
              {busy ? 'Saving…' : 'Save Schedule'}
            </button>
          </div>
        </form>
      </div>
    </SellerOverlay>
  );
}
