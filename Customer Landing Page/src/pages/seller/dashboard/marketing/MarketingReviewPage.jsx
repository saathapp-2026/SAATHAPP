import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { ShieldCheck, AlertTriangle, CheckCircle2, Info, RefreshCcw } from 'lucide-react';
import {
  getAds,
  updateAdStatus,
  getAdReviewChecklist,
  getAdReviewTimeline,
  getAdReviewDetails,
} from '../../../../services/advertisementsService';
import { formatINR, getAdType } from '../../../../config/seller/adConstants';

function statusBadge(status) {
  if (status === 'complete') return 'bg-emerald-100 text-emerald-700';
  if (status === 'pending') return 'bg-amber-100 text-amber-700';
  return 'bg-page text-slate-600';
}

export default function MarketingReviewPage() {
  const [reviewList, setReviewList] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [campaign, setCampaign] = useState(null);
  const [checklist, setChecklist] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchReviewCandidates = async () => {
    const response = await getAds({ status: 'submitted' });
    return response.data || [];
  };

  const loadReviewCandidates = async () => {
    try {
      const candidates = await fetchReviewCandidates();
      setReviewList(candidates);
      if (!selectedId && candidates.length) setSelectedId(candidates[0].id);
      if (candidates.length === 0) {
        setCampaign(null);
        setChecklist([]);
        setTimeline([]);
      }
    } catch {
      toast.error('Unable to load review candidates');
    }
  };

  useEffect(() => {
    let active = true;
    const load = async () => {
      if (!active) return;
      setLoading(true);
      await loadReviewCandidates();
      if (active) setLoading(false);
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    const loadDetails = async () => {
      if (!selectedId) return;
      setLoading(true);
      try {
        const [detailsRes, checklistRes, timelineRes] = await Promise.all([
          getAdReviewDetails(selectedId),
          getAdReviewChecklist(selectedId),
          getAdReviewTimeline(selectedId),
        ]);
        if (!active) return;
        setCampaign(detailsRes.data);
        setChecklist(checklistRes.data?.checklist || []);
        setTimeline(timelineRes.data || []);
      } catch {
        toast.error('Unable to load campaign review details');
      } finally {
        if (active) setLoading(false);
      }
    };
    loadDetails();
    return () => {
      active = false;
    };
  }, [selectedId]);

  const handleStatusUpdate = async (status) => {
    if (!selectedId) return;
    setActionLoading(true);
    try {
      await updateAdStatus(selectedId, status, status === 'approved' ? 'Approved by reviewer' : 'Rejected by reviewer');
      toast.success(`Campaign ${status === 'approved' ? 'approved' : 'rejected'}`);
      await loadReviewCandidates();
    } catch {
      toast.error('Unable to update campaign status');
    } finally {
      setActionLoading(false);
    }
  };

  const selectedCampaign = useMemo(() => reviewList.find((item) => item.id === selectedId), [reviewList, selectedId]);

  if (loading) {
    return <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-sm animate-pulse h-96" aria-busy="true" />;
  }

  if (!campaign) {
    return (
      <div className="space-y-4">
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-sm text-center text-slate-500">
          No campaign available for review.
        </div>
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-sm">
          <p className="text-sm text-slate-500">Pending review campaigns will appear here once submitted by the seller.</p>
        </div>
      </div>
    );
  }

  const adType = getAdType(campaign.typeId);

  return (
    <div className="space-y-5">
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-emerald-600">Admin review</p>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Campaign review action center</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">All review checks are performed before the campaign can be scheduled and go live.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleStatusUpdate('approved')}
              disabled={actionLoading}
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 text-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-emerald-700 disabled:opacity-50"
            >
              <ShieldCheck size={16} /> Approve
            </button>
            <button
              type="button"
              onClick={() => handleStatusUpdate('rejected')}
              disabled={actionLoading}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white text-slate-700 px-4 py-2 text-sm font-semibold shadow-sm hover:bg-page disabled:opacity-50"
            >
              <AlertTriangle size={16} /> Reject
            </button>
            <button
              type="button"
              onClick={() => loadReviewCandidates()}
              disabled={actionLoading}
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 text-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-slate-800 disabled:opacity-50"
            >
              <RefreshCcw size={16} /> Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-sm">
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl bg-page dark:bg-slate-900 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Campaign Information</p>
                <h2 className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-50">{campaign.name}</h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{campaign.description || campaign.headline}</p>
              </div>
              <div className="rounded-3xl bg-page dark:bg-slate-900 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Seller</p>
                <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-50">Saath Grocery Shop</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">GST: 27AABCU9603R1ZM</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">PAN: AABCU9603R</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 dark:border-slate-800 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Objective</p>
                <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-50">{campaign.objective.replace(/_/g, ' ')}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 dark:border-slate-800 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Advertisement Type</p>
                <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-50">{adType.label}</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 dark:border-slate-800 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Landing URL</p>
                <p className="mt-2 text-sm text-emerald-700 dark:text-emerald-300">{campaign.destinationUrl || 'N/A'}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 dark:border-slate-800 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Target Audience</p>
                <p className="mt-2 text-sm text-slate-900 dark:text-slate-50">{campaign.audience?.customerTypes?.join(', ') || 'General'}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{campaign.audience?.languages?.join(', ') || 'English, Hindi'}</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 dark:border-slate-800 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Locations</p>
                <p className="mt-2 text-sm text-slate-900 dark:text-slate-50">{campaign.coverage?.areas?.join(', ') || campaign.audience?.city || 'Mumbai, Pune'}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 dark:border-slate-800 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Duration</p>
                <p className="mt-2 text-sm text-slate-900 dark:text-slate-50">{campaign.startAt?.slice(0, 10)} → {campaign.endAt?.slice(0, 10)}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{campaign.durationDays} days</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 dark:border-slate-800 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Pricing Plan</p>
                <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-50">Daily Budget {formatINR(campaign.dailyBudget)}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Total Budget {formatINR(campaign.totalBudget)}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 dark:border-slate-800 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Payment</p>
                <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-50">{campaign.paymentMethod || 'Wallet'}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Invoice: {campaign.invoiceType || 'GST Invoice'}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Status: Pending Review</p>
              </div>
            </div>
          </div>
        </div>

        <aside className="transition-colors hover:text-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none rounded-3xl border border-slate-200 dark:border-slate-800 bg-page dark:bg-slate-900 p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Review checklist</p>
          <div className="mt-4 space-y-3">
            {checklist.map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-3 rounded-2xl bg-white dark:bg-slate-950 p-4 border border-slate-200 dark:border-slate-800">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">{item.label}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                  item.status === 'pass'
                    ? 'bg-emerald-100 text-emerald-700'
                    : item.status === 'warning'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-red-100 text-red-700'
                }`}>
                  {item.status === 'pass' ? '✔ Pass' : item.status === 'warning' ? '⚠ Warning' : '✖ Failed'}
                </span>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-sm">
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Review timeline</p>
        <div className="mt-6 space-y-4">
          {timeline.map((step) => (
            <div key={step.label} className="flex items-center gap-4">
              <span className={`flex h-10 w-10 items-center justify-center rounded-full border ${statusBadge(step.status)}`}>
                {step.status === 'complete' ? <CheckCircle2 size={16} /> : step.status === 'pending' ? <AlertTriangle size={16} /> : <Info size={16} />}
              </span>
              <div>
                <p className="font-semibold text-slate-900 dark:text-slate-50">{step.label}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{step.status === 'complete' ? 'Completed' : step.status === 'pending' ? 'Pending action' : 'Upcoming step'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-page dark:bg-slate-900 p-6 shadow-sm">
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Pending review campaigns</p>
        <div className="mt-4 grid gap-3">
          {reviewList.length ? (
            reviewList.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
                className={`rounded-3xl border p-4 text-left ${selectedId === item.id ? 'border-emerald-500 bg-white dark:bg-slate-950' : 'border-slate-200 bg-page dark:border-slate-800 dark:bg-slate-900'}`}
              >
                <p className="font-semibold text-slate-900 dark:text-slate-50">{item.name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{item.status.replace(/_/g, ' ')} • {item.typeId}</p>
              </button>
            ))
          ) : (
            <p className="text-sm text-slate-400">No campaigns are currently awaiting review.</p>
          )}
        </div>
      </div>
    </div>
  );
}
