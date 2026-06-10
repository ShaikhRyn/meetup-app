import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface StarRatingProps {
  rating: number;
  onRate?: (rating: number) => void;
  readOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
}

const sizeMap = {
  sm: { star: 'w-4 h-4', gap: 'gap-1' },
  md: { star: 'w-5 h-5', gap: 'gap-1.5' },
  lg: { star: 'w-6 h-6', gap: 'gap-2' }
};

export function StarRating({ rating, onRate, readOnly = true, size = 'md', showCount = false }: StarRatingProps) {
  return (
    <div className="flex items-center gap-2">
      <div className={`flex ${sizeMap[size].gap}`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => !readOnly && onRate?.(star)}
            className={`${sizeMap[size].star} ${!readOnly && 'cursor-pointer'} transition`}
            disabled={readOnly}
          >
            <Star
              className={`w-full h-full ${
                star <= rating
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            />
          </motion.button>
        ))}
      </div>
      {showCount && <span className="text-sm text-gray-600 dark:text-gray-400">{rating.toFixed(1)}</span>}
    </div>
  );
}
