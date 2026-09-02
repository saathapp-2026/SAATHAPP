import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const DEFAULT_NOTICE = (
  <>
    Payment of the One-Time Seller Onboarding Fee does <strong>not</strong> guarantee seller approval.
    Every application is subject to SAATHAPP&apos;s verification, compliance, and quality review process.
    Seller accounts become active only after successful verification and approval.
    Monthly Membership is optional and is not required to create or operate a seller account.
  </>
);

export default function TermsCheckbox({
  accepted,
  onChange,
  termsLink = '/seller/terms',
  termsLabel = 'Seller Onboarding Terms & Conditions',
  notice = DEFAULT_NOTICE,
  accentClass = 'text-emerald-400',
  openInNewTab = true,
}) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-4 flex gap-3">
        <AlertTriangle size={20} className="text-amber-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-amber-200">Important Notice</p>
          <p className="text-xs text-amber-200/80 mt-1 leading-relaxed">{notice}</p>
        </div>
      </div>

      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-1 w-4 h-4 rounded border-white/20 bg-surface/5 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0"
        />
        <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
          I have read and agree to the{' '}
          <Link
            to={termsLink}
            {...(openInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className={`${accentClass} hover:opacity-80 underline underline-offset-2`}
          >
            {termsLabel}
          </Link>
          .
        </span>
      </label>
    </div>
  );
}
