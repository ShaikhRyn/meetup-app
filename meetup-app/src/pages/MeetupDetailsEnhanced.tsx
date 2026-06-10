import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppData } from '../contexts/AppDataContext';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, MapPin, Users, Share2, Heart, Clock, ArrowLeft, CheckCircle, X, ChevronDown } from 'lucide-react';
import { SpeakerCard } from '../components/SpeakerCard';
import { AgendaTimeline } from '../components/AgendaTimeline';
import { StarRating } from '../components/ui/StarRating';
import { FeedbackModal } from '../components/FeedbackModal';
import { QRTicket } from '../components/QRTicket';
import { useState } from 'react';

const INDIA_CITIES = [
  'Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Ahmedabad', 'Chennai',
  'Kolkata', 'Pune', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur',
  'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Patna',
  'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik', 'Ranchi',
  'Coimbatore', 'Kochi', 'Chandigarh', 'Gurgaon', 'Noida', 'Mysuru',
];

interface RegistrationModalProps {
  meetupTitle: string;
  onClose: () => void;
  onConfirm: (data: { whyAttend: string; learnGoals: string; contribute: string; city: string; locality: string }) => void;
}

function RegistrationModal({ meetupTitle, onClose, onConfirm }: RegistrationModalProps) {
  const [form, setForm] = useState({
    whyAttend: '',
    learnGoals: '',
    contribute: '',
    city: '',
    locality: '',
  });
  const [step, setStep] = useState(1);

  const handleSubmit = () => {
    onConfirm(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        className="bg-white dark:bg-[#161828] rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        {/* Header */}
        <div className="saffron-gradient p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-white/80 text-xs font-semibold uppercase tracking-wider">Step {step} of 2</span>
              <div className="flex gap-1 ml-2">
                <div className={`h-1 w-8 rounded-full transition-all ${step >= 1 ? 'bg-white' : 'bg-white/30'}`} />
                <div className={`h-1 w-8 rounded-full transition-all ${step >= 2 ? 'bg-white' : 'bg-white/30'}`} />
              </div>
            </div>
            <h2 className="text-xl font-bold text-white">Register for Event</h2>
            <p className="text-orange-100 text-sm mt-1 line-clamp-1">{meetupTitle}</p>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  📍 Your City <span className="text-orange-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-orange-200 dark:border-[#352840] bg-orange-50 dark:bg-[#0E1020] text-gray-800 dark:text-gray-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-400 appearance-none cursor-pointer"
                  >
                    <option value="">Select your city</option>
                    {INDIA_CITIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  🏘️ Locality / Area
                </label>
                <input
                  type="text"
                  value={form.locality}
                  onChange={(e) => setForm({ ...form, locality: e.target.value })}
                  placeholder="e.g. Koramangala, Andheri West..."
                  className="w-full px-4 py-3 rounded-xl border border-orange-200 dark:border-[#352840] bg-orange-50 dark:bg-[#0E1020] text-gray-800 dark:text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  🎯 Why do you want to attend?
                </label>
                <textarea
                  value={form.whyAttend}
                  onChange={(e) => setForm({ ...form, whyAttend: e.target.value })}
                  placeholder="Share your motivation..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-orange-200 dark:border-[#352840] bg-orange-50 dark:bg-[#0E1020] text-gray-800 dark:text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-400 resize-none"
                />
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!form.city}
                className="w-full py-3 btn-saffron text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-none"
              >
                Continue →
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  📚 What do you hope to learn?
                </label>
                <textarea
                  value={form.learnGoals}
                  onChange={(e) => setForm({ ...form, learnGoals: e.target.value })}
                  placeholder="Skills, topics, insights..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-orange-200 dark:border-[#352840] bg-orange-50 dark:bg-[#0E1020] text-gray-800 dark:text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-400 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  🤝 How will you contribute?
                </label>
                <textarea
                  value={form.contribute}
                  onChange={(e) => setForm({ ...form, contribute: e.target.value })}
                  placeholder="Your experience, questions, ideas..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-orange-200 dark:border-[#352840] bg-orange-50 dark:bg-[#0E1020] text-gray-800 dark:text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-400 resize-none"
                />
              </div>

              {/* Summary pill */}
              {form.city && (
                <div className="flex items-center gap-2 px-3 py-2 bg-orange-50 dark:bg-[#1a1020] rounded-xl">
                  <MapPin className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">Attending from <strong className="text-orange-500">{form.city}</strong>{form.locality ? `, ${form.locality}` : ''}</span>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 rounded-xl border border-orange-200 dark:border-[#352840] text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-orange-50 dark:hover:bg-[#252840] transition-colors"
                >
                  ← Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 py-3 btn-saffron text-sm"
                >
                  🎉 Confirm!
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function MeetupDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { meetups, registrations, registerForMeetup, feedback } = useAppData();
  const { user } = useAuth();
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showQRTicket, setShowQRTicket] = useState(false);
  const [showRegModal, setShowRegModal] = useState(false);

  const meetup = meetups.find(m => m.id === id);
  if (!meetup || !user) return null;

  const userRegistration = registrations.find(r => r.userId === user.id && r.meetupId === meetup.id);
  const meetupFeedback = feedback.filter(f => f.meetupId === meetup.id);

  const handleRegister = (data: { whyAttend: string; learnGoals: string; contribute: string; city: string; locality: string }) => {
    registerForMeetup(meetup.id, {
      whyAttend: data.whyAttend || 'Interested in this event',
      learnGoals: data.learnGoals || 'Learn and network',
      contribute: data.contribute || 'Share my experience',
    });
  };

  const availableSeats = meetup.capacity - meetup.registeredCount;
  const attendanceRate = meetup.registeredCount > 0 ? ((meetup.attendedCount / meetup.registeredCount) * 100).toFixed(0) : '0';
  const fillPercent = (meetup.registeredCount / meetup.capacity) * 100;

  return (
    <div className="pb-20 bg-[#f8f4ef] dark:bg-[#0E1020] min-h-screen">
      {/* Registration Modal */}
      <AnimatePresence>
        {showRegModal && (
          <RegistrationModal
            meetupTitle={meetup.title}
            onClose={() => setShowRegModal(false)}
            onConfirm={handleRegister}
          />
        )}
      </AnimatePresence>

      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-6 pt-6">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => navigate('/user')}
          className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </motion.button>
      </div>

      {/* Hero Banner */}
      <section className="relative h-72 md:h-96 overflow-hidden">
        <img
          src={meetup.bannerUrl}
          alt={meetup.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-6 left-6 right-6 max-w-3xl"
        >
          <div className="flex flex-wrap gap-2 mb-3">
            {meetup.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-3 py-1 bg-orange-500/90 backdrop-blur text-white text-xs font-bold rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-1">{meetup.title}</h1>
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-orange-200 text-sm">
              <MapPin className="w-3.5 h-3.5" /> {meetup.location.city}, India
            </span>
            <span className="flex items-center gap-1.5 text-orange-200 text-sm">
              <Calendar className="w-3.5 h-3.5" /> {meetup.date}
            </span>
            <span className="flex items-center gap-1.5 text-orange-200 text-sm">
              <Users className="w-3.5 h-3.5" /> {meetup.registeredCount} registered
            </span>
          </div>
        </motion.div>

        {/* Action buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button className="p-2.5 bg-white/20 backdrop-blur hover:bg-white/30 text-white rounded-xl transition">
            <Heart className="w-5 h-5" />
          </button>
          <button className="p-2.5 bg-white/20 backdrop-blur hover:bg-white/30 text-white rounded-xl transition">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Left / Main ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Event Info */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="surface rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                <span className="w-1 h-5 saffron-gradient rounded-full inline-block"></span>
                Event Details
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {[
                  { icon: <Calendar className="w-4 h-4" />, label: 'Date', value: meetup.date },
                  { icon: <Clock className="w-4 h-4" />, label: 'Time', value: `${meetup.startTime} – ${meetup.endTime}` },
                  { icon: <Users className="w-4 h-4" />, label: 'Capacity', value: `${meetup.registeredCount}/${meetup.capacity}` },
                  { icon: <MapPin className="w-4 h-4" />, label: 'City', value: meetup.location.city },
                ].map((item) => (
                  <div key={item.label} className="bg-orange-50 dark:bg-[#1a1c30] rounded-xl p-3">
                    <div className="flex items-center gap-1.5 text-orange-500 mb-1.5">
                      {item.icon}
                      <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
                    </div>
                    <p className="font-bold text-sm text-gray-900 dark:text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="surface rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="w-1 h-5 teal-gradient rounded-full inline-block"></span>
                About this Event
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{meetup.description}</p>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="surface rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="w-1 h-5 saffron-gradient rounded-full inline-block"></span>
                📍 Venue
              </h3>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 saffron-gradient rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{meetup.venueName}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{meetup.location.address}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{meetup.location.city}, India</p>
                  <a
                    href={meetup.mapLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-orange-500 hover:text-orange-600 transition-colors"
                  >
                    View on Google Maps →
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Speakers */}
            {meetup.speakers.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="surface rounded-2xl p-6 shadow-sm"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 teal-gradient rounded-full inline-block"></span>
                  🎙️ Featured Speakers
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {meetup.speakers.map((speaker) => (
                    <SpeakerCard key={speaker.id} speaker={speaker} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Agenda */}
            {meetup.agenda.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="surface rounded-2xl p-6 shadow-sm"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 saffron-gradient rounded-full inline-block"></span>
                  🗓️ Event Agenda
                </h3>
                <AgendaTimeline items={meetup.agenda} />
              </motion.div>
            )}

            {/* Reviews */}
            {meetupFeedback.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="surface rounded-2xl p-6 shadow-sm"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 teal-gradient rounded-full inline-block"></span>
                  ⭐ Reviews
                </h3>
                <div className="space-y-4">
                  {meetupFeedback.slice(0, 3).map((review) => (
                    <div key={review.id} className="pb-4 border-b border-orange-100 dark:border-[#252840] last:border-b-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold text-sm text-gray-900 dark:text-white">Attendee</p>
                        <StarRating rating={review.rating} />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-5">
            {/* Registration Card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl overflow-hidden shadow-xl sticky top-20"
            >
              <div className="saffron-gradient p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white/80 text-xs font-semibold uppercase tracking-wider">Available Seats</span>
                  <span className="text-white font-black text-xl">{availableSeats}</span>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden mb-1">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${fillPercent}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full bg-white rounded-full"
                  />
                </div>
                <p className="text-white/70 text-xs">{meetup.registeredCount} of {meetup.capacity} spots filled</p>
              </div>

              <div className="bg-white dark:bg-[#161828] p-5 space-y-3">
                {userRegistration ? (
                  <>
                    <div className="flex items-center gap-2 px-4 py-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800/40">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-green-700 dark:text-green-400">You're registered! 🎉</p>
                        <p className="text-xs text-green-600 dark:text-green-500">Ticket: {userRegistration.ticketNumber}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowQRTicket(true)}
                      className="w-full py-3 btn-saffron text-sm"
                    >
                      📱 View Ticket & QR Code
                    </button>
                    {userRegistration.checkedIn && (
                      <button
                        onClick={() => setShowFeedbackModal(true)}
                        className="w-full py-2.5 btn-teal text-sm"
                      >
                        ⭐ Leave Feedback
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    {fillPercent >= 80 && fillPercent < 100 && (
                      <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                        <span className="text-base">⚡</span>
                        <p className="text-xs font-semibold text-amber-700 dark:text-amber-400">Only {availableSeats} spots left!</p>
                      </div>
                    )}
                    <button
                      onClick={() => setShowRegModal(true)}
                      disabled={availableSeats <= 0}
                      className="w-full py-3 btn-saffron text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {availableSeats > 0 ? '🎟️ Register Now – FREE' : '😔 Event Full'}
                    </button>
                    <p className="text-center text-xs text-gray-400">No payment needed · Instant confirmation</p>
                  </>
                )}
              </div>
            </motion.div>

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="surface rounded-2xl p-5 shadow-sm"
            >
              <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-4 saffron-gradient rounded-full inline-block"></span>
                Event Stats
              </h4>
              <div className="space-y-3">
                {[
                  { label: 'Average Rating', value: `${meetup.averageRating.toFixed(1)} ⭐` },
                  { label: 'Total Reviews', value: meetupFeedback.length },
                  { label: 'Attendance Rate', value: `${attendanceRate}%` },
                  { label: 'City', value: `📍 ${meetup.location.city}` },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400">{item.label}</span>
                    <span className="text-xs font-bold text-gray-900 dark:text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Share */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="surface rounded-2xl p-5 shadow-sm"
            >
              <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-3">Share with your friends</h4>
              <div className="flex gap-2">
                <button className="flex-1 py-2.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl text-xs transition-colors">
                  📱 WhatsApp
                </button>
                <button className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs transition-colors">
                  💼 LinkedIn
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* QR Ticket Modal */}
      {showQRTicket && userRegistration && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowQRTicket(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <QRTicket
              ticketNumber={userRegistration.ticketNumber || ''}
              qrCode={userRegistration.qrCode || ''}
              eventName={meetup.title}
              attendeeName={user.name}
              eventDate={meetup.date}
            />
          </motion.div>
        </div>
      )}

      <FeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        meetupId={meetup.id}
        registrationId={userRegistration?.id || ''}
      />
    </div>
  );
}
