import React, { useState } from 'react';

export default function ReviewsTab({ bookings, reviewsList, setReviewsList }) {
  const [showReviewFormModal, setShowReviewFormModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  const handleReviewSubmit = () => {
    if (!reviewText.trim()) {
      alert('Please write some feedback comments.');
      return;
    }

    const newReview = {
      id: `rev-${Date.now()}`,
      serviceName: selectedBooking.service,
      rating: rating,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      text: reviewText
    };

    const currentReviews = JSON.parse(localStorage.getItem('saath_user_reviews') || '[]');
    const updated = [newReview, ...currentReviews];
    localStorage.setItem('saath_user_reviews', JSON.stringify(updated));
    setReviewsList(updated);

    setShowReviewFormModal(false);
    alert('Review submitted successfully! Thank you for your feedback.');
  };

  const completedBookings = bookings.filter(b => b.status === 'Completed');
  const unreviewedBookings = completedBookings.filter(b => !reviewsList.some(r => r.serviceName === b.service));

  return (
    <div className="space-y-6 text-left">
      <div>
        <h2 className="text-lg font-black text-slate-855 dark:text-white uppercase tracking-wider">My Reviews</h2>
        <p className="text-xs text-slate-400 font-semibold mt-0.5">Ratings and feedback you submitted for completed bookings.</p>
      </div>

      <div className="space-y-4">
        {/* Completed bookings awaiting review */}
        {unreviewedBookings.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-black text-[#6C3BFF] uppercase tracking-wider">Awaiting Your Feedback</h3>
            <div className="space-y-2.5">
              {unreviewedBookings.map((bkg) => (
                <div key={bkg.id} className="p-4 bg-yellow-500/5 border border-yellow-500/10 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                  <div>
                    <p className="font-black text-slate-800 dark:text-white">{bkg.service}</p>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Assigned to: {bkg.provider} • Completed on {bkg.date}</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedBooking(bkg);
                      setRating(5);
                      setReviewText('');
                      setShowReviewFormModal(true);
                    }}
                    className="px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-extrabold uppercase tracking-wider rounded-xl cursor-pointer shadow-sm text-center"
                  >
                    Rate Partner
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <h3 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider pt-2">My Reviews History</h3>
        {reviewsList.length === 0 ? (
          <p className="text-xs text-slate-400 font-semibold">No reviews submitted yet.</p>
        ) : (
          <div className="space-y-3">
            {reviewsList.map((rev) => (
              <div key={rev.id} className="p-4 bg-page dark:bg-slate-955/20 border border-slate-205 dark:border-slate-850 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-slate-855 dark:text-white">{rev.serviceName}</h4>
                  <div className="flex gap-0.5 text-xs text-amber-500 font-bold">
                    {Array.from({ length: rev.rating }).map((_, i) => <span key={i}>★</span>)}
                  </div>
                </div>
                <p className="text-xs text-slate-550 dark:text-slate-350 font-medium leading-relaxed">{rev.text}</p>
                <p className="text-[9px] text-slate-400 font-semibold font-mono">{rev.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Review Form Modal Overlay */}
      {showReviewFormModal && selectedBooking && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-955/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-surface border border-slate-205 dark:border-slate-800 rounded-card p-6 shadow-premium space-y-4 text-left">
            <div>
              <h3 className="text-base font-black text-slate-800 dark:text-white uppercase tracking-wider">Submit Review</h3>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">{selectedBooking.service} • {selectedBooking.provider}</p>
            </div>

            <div className="space-y-3.5 text-xs font-semibold">
              <div className="space-y-1">
                <label className="font-black uppercase tracking-wider text-slate-400 text-[10px]">Select Rating</label>
                <div className="flex gap-1.5 text-xl text-amber-500">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="hover:scale-110 transition-transform cursor-pointer"
                    >
                      {star <= rating ? '★' : '☆'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-black uppercase tracking-wider text-slate-400 text-[10px]">Your Comments</label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Tell us about your experience..."
                  rows="3"
                  className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none dark:bg-slate-950 font-medium text-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-2 text-xs">
              <button
                type="button"
                onClick={() => setShowReviewFormModal(false)}
                className="px-4 py-2.5 border border-slate-200 dark:border-slate-800 hover:bg-page rounded-xl font-bold uppercase cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReviewSubmit}
                className="px-5 py-2.5 bg-[#6C3BFF] hover:bg-[#6C3BFF]/95 text-white rounded-xl font-bold uppercase cursor-pointer shadow-sm"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
