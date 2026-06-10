import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';
import { StarRating } from './ui/StarRating';
import { useAppData } from '../contexts/AppDataContext';
import { useAuth } from '../contexts/AuthContext';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  meetupId: string;
  registrationId: string;
}

export function FeedbackModal({ isOpen, onClose, meetupId, registrationId }: FeedbackModalProps) {
  const { addFeedback } = useAppData();
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [categoryRatings, setCategoryRatings] = useState({
    content: 0,
    organization: 0,
    networking: 0,
    venue: 0,
  });

  if (!isOpen || !user) return null;

  const handleSubmit = () => {
    if (rating === 0) return;

    addFeedback({
      registrationId,
      userId: user.id,
      meetupId,
      rating,
      comment,
      categories: categoryRatings,
      createdAt: new Date().toISOString(),
    });

    // Reset form
    setRating(0);
    setComment('');
    setCategoryRatings({ content: 0, organization: 0, networking: 0, venue: 0 });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-slate-800 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Share Your Feedback</h2>
            <p className="text-blue-100">Help us improve future events</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Overall Rating */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
              How would you rate this event overall?
            </label>
            <div className="flex justify-center mb-2">
              <StarRating rating={rating} onRate={setRating} readOnly={false} size="lg" showCount={true} />
            </div>
          </div>

          {/* Category Ratings */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
            {['content', 'organization', 'networking', 'venue'].map((category) => (
              <div key={category}>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 capitalize">
                  {category}
                </label>
                <StarRating
                  rating={categoryRatings[category as keyof typeof categoryRatings]}
                  onRate={(rate) =>
                    setCategoryRatings({
                      ...categoryRatings,
                      [category]: rate,
                    })
                  }
                  readOnly={false}
                  size="sm"
                />
              </div>
            ))}
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Additional Comments
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              disabled={rating === 0}
              className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Feedback
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 border border-gray-200 dark:border-slate-600 text-gray-900 dark:text-white font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
