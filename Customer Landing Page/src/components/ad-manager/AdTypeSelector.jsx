import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Type,
  Image,
  FileImage,
  Star,
  Flame,
  Tag,
  Video,
  Search,
  Store,
  LayoutGrid,
  Rocket,
  PartyPopper,
  BookOpen,
} from 'lucide-react';
import { AD_TYPES, PRIMARY_AD_TYPES } from '../../config/seller/adConstants';

const ICONS = {
  text: Type,
  banner: Image,
  poster: FileImage,
  sponsored: Star,
  featured: Flame,
  offer: Tag,
  video: Video,
  search: Search,
  store: Store,
  category: LayoutGrid,
  launch: Rocket,
  festival: PartyPopper,
};

const COLOR = {
  emerald: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  violet: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  orange: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  pink: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
  teal: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
  rose: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  sky: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  indigo: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
  amber: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  lime: 'bg-lime-100 text-lime-700 dark:bg-lime-900/40 dark:text-lime-300',
  fuchsia: 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/40 dark:text-fuchsia-300',
};

const BTN = {
  emerald: 'bg-emerald-600 hover:bg-emerald-700',
  violet: 'bg-violet-600 hover:bg-violet-700',
  blue: 'bg-blue-600 hover:bg-blue-700',
  orange: 'bg-orange-600 hover:bg-orange-700',
  pink: 'bg-pink-600 hover:bg-pink-700',
  teal: 'bg-teal-600 hover:bg-teal-700',
};

export default function AdTypeSelector({ onSelect, onViewGuide }) {
  const [showAll, setShowAll] = useState(false);
  const list = showAll ? AD_TYPES : AD_TYPES.filter((t) => PRIMARY_AD_TYPES.includes(t.id));

  return (
    <section aria-label="Choose ad type">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-slate-900 dark:text-slate-50">Choose Ad Type</h2>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => setShowAll((v) => !v)} className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:underline">
            {showAll ? 'Show Less' : 'View All Types'}
          </button>
          <button type="button" onClick={onViewGuide} className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:underline">
            <BookOpen size={13} /> View Guide
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {list.map((t, i) => {
          const Icon = ICONS[t.icon] || Type;
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-surface p-4 shadow-sm flex flex-col gap-3"
            >
              <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${COLOR[t.color] || COLOR.emerald}`}>
                <Icon size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-50 leading-snug">{t.label}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{t.description}</p>
              </div>
              <button
                type="button"
                onClick={() => onSelect?.(t)}
                className={`mt-auto w-full rounded-xl text-white text-xs font-semibold py-2 transition-colors ${BTN[t.color] || 'bg-emerald-600 hover:bg-emerald-700'}`}
              >
                {t.cta}
              </button>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
