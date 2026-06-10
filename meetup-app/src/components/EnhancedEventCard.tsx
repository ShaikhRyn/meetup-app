import { motion } from 'framer-motion';
import { Clock, Users, MapPin, Share2, Heart, Star } from 'lucide-react';
import { Meetup } from '../data/mockData';
import { Link } from 'react-router-dom';

interface EnhancedEventCardProps {
  meetup: Meetup;
  isRegistered?: boolean;
  onRegister?: () => void;
  variant?: 'default' | 'compact';
}

export function EnhancedEventCard({ meetup, isRegistered, onRegister, variant = 'default' }: EnhancedEventCardProps) {
  const isExpired = new Date(meetup.date) < new Date();
  const fillPercent = Math.round((meetup.registeredCount / meetup.capacity) * 100);
  const isNearFull = fillPercent >= 80 && !isExpired;

  if (variant === 'compact') {
    return (
      <motion.div
        whileHover={{ y: -3, boxShadow: '0 12px 30px rgba(255,107,26,0.12)' }}
        className="surface rounded-2xl overflow-hidden cursor-pointer"
      >
        <Link to={`/user/meetup/${meetup.id}`} className="block">
          <img src={meetup.bannerUrl} alt={meetup.title} className="w-full h-28 object-cover" />
          <div className="p-3">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white line-clamp-2 mb-1">{meetup.title}</h3>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-400">
                <MapPin className="w-3 h-3 text-orange-400" /> {meetup.location.city}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-amber-500 font-semibold">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {meetup.averageRating.toFixed(1)}
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="surface rounded-2xl overflow-hidden group shadow-card card-hover flex flex-col"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-orange-100 dark:bg-[#1a1c30] flex-shrink-0">
        <img
          src={meetup.bannerUrl}
          alt={meetup.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {isExpired && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-bold text-sm bg-black/40 px-3 py-1.5 rounded-full">Event Ended</span>
          </div>
        )}

        {/* Date badge */}
        <div className="absolute top-3 right-3 bg-white/95 dark:bg-[#161828]/95 backdrop-blur px-2.5 py-1 rounded-xl shadow-sm">
          <p className="text-gray-900 dark:text-white text-xs font-bold">
            {new Date(meetup.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
          </p>
        </div>

        {/* Heart */}
        <button className="absolute top-3 left-3 w-7 h-7 bg-white/90 dark:bg-[#161828]/90 backdrop-blur rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors shadow-sm">
          <Heart className="w-3.5 h-3.5" />
        </button>

        {/* Near full badge */}
        {isNearFull && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            ⚡ {100 - fillPercent}% left
          </div>
        )}

        {/* Registered badge */}
        {isRegistered && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            ✓ Registered
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-2.5">
          {meetup.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="tag-pill">{tag}</span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2 mb-1.5 leading-snug">
          {meetup.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3 flex-1 leading-relaxed">
          {meetup.description}
        </p>

        {/* Meta row */}
        <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400 mb-3 pb-3 border-b border-orange-100 dark:border-[#252840]">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-orange-400" />
            {meetup.startTime}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3 text-teal-500" />
            {meetup.registeredCount}/{meetup.capacity}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-orange-400" />
            {meetup.location.city}
          </span>
        </div>

        {/* Rating + Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{meetup.averageRating.toFixed(1)}</span>
            <span className="text-[10px] text-gray-400">({meetup.totalRatings})</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={(e) => { e.preventDefault(); }}
              className="w-7 h-7 rounded-lg bg-orange-50 dark:bg-[#252840] flex items-center justify-center text-gray-400 hover:text-orange-500 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
            <Link
              to={`/user/meetup/${meetup.id}`}
              className="px-4 py-1.5 btn-saffron text-[11px] font-bold rounded-lg"
            >
              View →
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
