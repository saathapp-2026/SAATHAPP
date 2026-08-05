import React, { useState } from 'react';
import { Star, MessageSquare, CornerDownRight, Send } from 'lucide-react';

export default function RatingCard() {
  const [reviews, setReviews] = useState([
    { id: 1, author: 'Aman Varma', rating: 5, date: 'Yesterday', text: 'Rahul arrived right on time and fixed our main generator line very quickly. Extremely professional and courteous!', reply: null },
    { id: 2, author: 'Megha Gupta', rating: 4, date: '3 days ago', text: 'Good job with fixing the kitchen light fixtures. Cleaned up after finishing the wiring. Recommended.', reply: 'Thank you for the review, Megha! Glad I could help.' },
    { id: 3, author: 'Devendra Yadav', rating: 5, date: '1 week ago', text: 'Highly skilled. Diagnosed a complex short-circuit issue in our farmhouse that other technicians could not fix. 5 stars!', reply: null }
  ]);

  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyText, setReplyText] = useState('');

  const starsDistribution = [
    { stars: 5, count: 142, percentage: 80 },
    { stars: 4, count: 28, percentage: 15 },
    { stars: 3, count: 5, percentage: 3 },
    { stars: 2, count: 2, percentage: 1 },
    { stars: 1, count: 1, percentage: 1 }
  ];

  const handleReplySubmit = (e, reviewId) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setReviews(prev => prev.map(rev => {
      if (rev.id === reviewId) {
        return { ...rev, reply: replyText };
      }
      return rev;
    }));

    setReplyText('');
    setActiveReplyId(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Overall Score Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-card p-6 shadow-soft hover:shadow-premium transition-all text-left flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Feedback Metrics</span>
          <h3 className="text-base sm:text-lg font-black text-slate-800 dark:text-white mt-0.5">Rating Summary</h3>
        </div>

        {/* Big star counter */}
        <div className="flex items-center gap-4 my-6">
          <div className="text-center">
            <span className="text-5xl font-black text-slate-800 dark:text-white leading-none">4.8</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mt-1">out of 5</span>
          </div>

          <div className="space-y-1">
            <div className="flex gap-0.5 text-amber-500">
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} className="text-slate-200 dark:text-slate-700" fill="currentColor" />
            </div>
            <p className="text-xs text-slate-400 font-semibold">Based on 178 bookings</p>
          </div>
        </div>

        {/* Star Bars list */}
        <div className="space-y-2">
          {starsDistribution.map((dist, idx) => (
            <div key={idx} className="flex items-center gap-3 text-[11px] font-bold text-slate-500">
              <span className="w-8">{dist.stars} Star</span>
              <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500 rounded-full" 
                  style={{ width: `${dist.percentage}%` }}
                />
              </div>
              <span className="w-8 text-right">{dist.count}</span>
            </div>
          ))}
        </div>

      </div>

      {/* Reviews list */}
      <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-card p-6 shadow-soft hover:shadow-premium transition-all text-left flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">Latest Reviews</h3>
          <span className="text-xs font-bold text-slate-450 flex items-center gap-1">
            <MessageSquare size={13} />
            <span>{reviews.length} Comments</span>
          </span>
        </div>

        <div className="space-y-5 overflow-y-auto max-h-[300px] pr-2 scrollbar-none">
          {reviews.map((rev) => (
            <div key={rev.id} className="pb-4 border-b border-slate-100 dark:border-slate-800/40 last:border-0 last:pb-0">
              
              {/* Author Row */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-200">{rev.author}</h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="flex text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} size={10} fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold">{rev.date}</span>
                  </div>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-2">
                "{rev.text}"
              </p>

              {/* Persisted Reply */}
              {rev.reply && (
                <div className="mt-3 pl-4 border-l-2 border-primary/45 flex gap-2 items-start bg-slate-50/50 dark:bg-slate-950/20 p-2.5 rounded-r-xl">
                  <CornerDownRight size={14} className="text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    <span className="font-black text-primary block text-[10px] uppercase">Your Response</span>
                    <p className="mt-0.5 font-medium">{rev.reply}</p>
                  </div>
                </div>
              )}

              {/* Reply Button Trigger */}
              {!rev.reply && activeReplyId !== rev.id && (
                <button
                  onClick={() => {
                    setActiveReplyId(rev.id);
                    setReplyText('');
                  }}
                  className="mt-2 text-[10px] font-black uppercase text-primary hover:text-primary-dark flex items-center gap-1 cursor-pointer"
                >
                  Reply to feedback
                </button>
              )}

              {/* Reply Form */}
              {activeReplyId === rev.id && (
                <form 
                  onSubmit={(e) => handleReplySubmit(e, rev.id)} 
                  className="mt-3 flex gap-2"
                >
                  <input
                    type="text"
                    required
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply to customer..."
                    className="flex-1 px-3 py-1.5 border border-slate-250 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950 text-xs text-slate-800 dark:text-slate-200 outline-none focus:border-primary/50"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-black uppercase flex items-center justify-center cursor-pointer shadow-sm"
                  >
                    <Send size={12} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveReplyId(null)}
                    className="px-3 py-1.5 border border-slate-200 text-slate-500 rounded-xl text-xs font-extrabold uppercase cursor-pointer"
                  >
                    Cancel
                  </button>
                </form>
              )}

            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
