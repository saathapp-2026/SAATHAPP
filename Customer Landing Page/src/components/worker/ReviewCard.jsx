import React, { useState } from 'react';
import { Star, MessageSquare, CornerDownRight, Send } from 'lucide-react';
export default function ReviewCard() {
  const [reviews, setReviews] = useState([]);
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyText, setReplyText] = useState('');

  const starsDistribution = [
    { stars: 5, count: 0, percentage: 0 },
    { stars: 4, count: 0, percentage: 0 },
    { stars: 3, count: 0, percentage: 0 },
    { stars: 2, count: 0, percentage: 0 },
    { stars: 1, count: 0, percentage: 0 },
  ];

  const handleReplySubmit = (e, reviewId) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setReviews((prev) => prev.map((rev) => (rev.id === reviewId ? { ...rev, reply: replyText } : rev)));
    setReplyText('');
    setActiveReplyId(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800 rounded-card p-6 shadow-soft">
        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Overall Rating</span>
        <div className="flex items-center gap-4 my-6">
          <span className="text-5xl font-black text-slate-800 dark:text-white">0.0</span>
          <div>
            <div className="flex gap-0.5 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="none" />
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-1">Based on {reviews.length} reviews</p>
          </div>
        </div>
        <div className="space-y-2">
          {starsDistribution.map((dist) => (
            <div key={dist.stars} className="flex items-center gap-3 text-[11px] font-bold text-slate-500">
              <span className="w-8">{dist.stars} ★</span>
              <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${dist.percentage}%` }} />
              </div>
              <span className="w-8 text-right">{dist.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800 rounded-card p-6 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">Latest Reviews</h3>
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
            <MessageSquare size={13} /> {reviews.length} feedback
          </span>
        </div>
        <div className="space-y-5 max-h-[420px] overflow-y-auto pr-1">
          {reviews.length === 0 ? (
            <p className="text-sm text-slate-400 py-4 text-center italic">No reviews yet.</p>
          ) : (
            reviews.map((rev) => (
              <div key={rev.id} className="pb-4 border-b border-slate-100 dark:border-slate-800 last:border-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-slate-800 dark:text-white">{rev.author}</h4>
                  <span className="text-[10px] text-slate-400">{rev.date}</span>
                </div>
                <div className="flex text-amber-500 mt-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={10} fill="currentColor" />
                  ))}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">"{rev.text}"</p>
                {rev.reply && (
                  <div className="mt-3 pl-3 border-l-2 border-primary/40 bg-slate-50/80 dark:bg-slate-950/40 p-3 rounded-r-xl flex gap-2">
                    <CornerDownRight size={14} className="text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-black uppercase text-primary">Your reply</span>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{rev.reply}</p>
                    </div>
                  </div>
                )}
                {!rev.reply && activeReplyId !== rev.id && (
                  <button
                    type="button"
                    onClick={() => setActiveReplyId(rev.id)}
                    className="mt-2 text-[10px] font-black uppercase text-primary hover:text-primary-dark"
                  >
                    Reply to feedback
                  </button>
                )}
                {activeReplyId === rev.id && (
                  <form onSubmit={(e) => handleReplySubmit(e, rev.id)} className="mt-3 flex gap-2">
                    <input
                      type="text"
                      autoFocus
                      placeholder="Write your reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="flex-1 text-xs px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:border-primary text-slate-700 dark:text-slate-300"
                    />
                    <button
                      type="submit"
                      className="p-2 bg-primary hover:bg-primary-dark text-white rounded-lg flex items-center justify-center"
                    >
                      <Send size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveReplyId(null)}
                      className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-2"
                    >
                      Cancel
                    </button>
                  </form>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
