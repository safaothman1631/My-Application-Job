'use client';

import { useState } from 'react';

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: {
    id: string;
    serviceTitle: string;
    providerName: string;
  } | null;
  onSubmit: (data: { rating: number; comment: string }) => void;
}

export function RatingModal({ isOpen, onClose, booking, onSubmit }: RatingModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');

  if (!isOpen || !booking) return null;

  const handleSubmit = () => {
    if (rating === 0) {
      alert('تکایە هەڵسەنگاندنێک هەڵبژێرە');
      return;
    }
    onSubmit({ rating, comment });
    setRating(0);
    setComment('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-blue-900 via-teal-900 to-cyan-900 w-full max-w-md rounded-3xl shadow-2xl border border-white/20">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-xl border-b border-white/20 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">هەڵسەنگاندن</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-red-500/20 hover:bg-red-500/40 rounded-xl flex items-center justify-center text-white text-xl transition-all duration-300"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
            <h3 className="text-lg font-bold text-white mb-1">{booking.serviceTitle}</h3>
            <p className="text-teal-200 text-sm">پیشەساز: {booking.providerName}</p>
          </div>

          <div>
            <label className="block text-white font-bold mb-3 text-center">
              چۆن خزمەتگوزارییەکە هەڵدەسەنگێنیت؟
            </label>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                  className="text-5xl transition-transform duration-200 transform hover:scale-125"
                >
                  {star <= (hoveredRating || rating) ? '⭐' : '☆'}
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-center text-white mt-2">
                {rating === 1 && 'خراپ'}
                {rating === 2 && 'لاواز'}
                {rating === 3 && 'باش'}
                {rating === 4 && 'زۆر باش'}
                {rating === 5 && 'نایاب! 🎉'}
              </p>
            )}
          </div>

          <div>
            <label className="block text-white font-bold mb-2">تێبینیەکەت (دڵخواز)</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="ئەزموونەکەت باس بکە..."
              rows={4}
              className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-400/20"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={rating === 0}
            className="w-full px-6 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            ناردنی هەڵسەنگاندن ⭐
          </button>
        </div>
      </div>
    </div>
  );
}
