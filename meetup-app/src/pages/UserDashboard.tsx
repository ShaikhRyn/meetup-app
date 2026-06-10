import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useAppData } from '../contexts/AppDataContext';
import { Calendar, Users, TrendingUp, Heart, MapPin, Zap, Star } from 'lucide-react';
import { EnhancedEventCard } from '../components/EnhancedEventCard';
import { NetworkingMatch } from '../components/NetworkingMatch';
import { useState } from 'react';

const INDIA_CITIES = ['All Cities', 'Mumbai', 'Bengaluru', 'Delhi', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata', 'Ahmedabad'];

const STAT_COLORS = [
  { bg: 'from-orange-50 to-amber-50 dark:from-[#1e1500] dark:to-[#1e1800]', border: 'border-orange-200 dark:border-orange-900/40', icon: 'saffron-gradient', text: 'text-orange-600 dark:text-orange-400' },
  { bg: 'from-teal-50 to-cyan-50 dark:from-[#001818] dark:to-[#001520]', border: 'border-teal-200 dark:border-teal-900/40', icon: 'teal-gradient', text: 'text-teal-600 dark:text-teal-400' },
  { bg: 'from-purple-50 to-violet-50 dark:from-[#150018] dark:to-[#100018]', border: 'border-purple-200 dark:border-purple-900/40', icon: 'bg-gradient-to-br from-purple-500 to-violet-600', text: 'text-purple-600 dark:text-purple-400' },
  { bg: 'from-rose-50 to-pink-50 dark:from-[#1a0010] dark:to-[#150010]', border: 'border-rose-200 dark:border-rose-900/40', icon: 'bg-gradient-to-br from-rose-500 to-pink-600', text: 'text-rose-600 dark:text-rose-400' },
];

export default function UserDashboard() {
  const { user } = useAuth();
  const { getRegisteredMeetups, getRecommendedMeetups, getNetworkingMatches, meetups, activities } = useAppData();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'registered' | 'recommended' | 'networking'>('upcoming');
  const [selectedCity, setSelectedCity] = useState('All Cities');

  if (!user) return null;

  const registeredMeetups = getRegisteredMeetups(user.id);
  const recommendedMeetups = getRecommendedMeetups(user.id);
  const networkingMatches = getNetworkingMatches(user.id);

  const upcomingMeetups = meetups
    .filter(m => new Date(m.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 6);

  const filteredUpcoming = selectedCity === 'All Cities'
    ? upcomingMeetups
    : upcomingMeetups.filter(m => m.location?.city === selectedCity);

  const tabs = [
    { id: 'upcoming', label: '🗓️ Upcoming', count: upcomingMeetups.length },
    { id: 'registered', label: '✅ Registered', count: registeredMeetups.length },
    { id: 'recommended', label: '⭐ For You', count: recommendedMeetups.length },
    { id: 'networking', label: '🤝 Connect', count: networkingMatches.length },
  ];

  const stats = [
    { icon: <Calendar className="w-5 h-5 text-white" />, label: 'Upcoming', value: upcomingMeetups.length, sub: 'events near you' },
    { icon: <Heart className="w-5 h-5 text-white" />, label: 'Registered', value: registeredMeetups.length, sub: 'events joined' },
    { icon: <Users className="w-5 h-5 text-white" />, label: 'Network', value: networkingMatches.length, sub: 'people to meet' },
    { icon: <TrendingUp className="w-5 h-5 text-white" />, label: 'Attended', value: registeredMeetups.filter(m => {
      const reg = (user as any).registrations?.find((r: any) => r.meetupId === m.id);
      return reg?.checkedIn;
    }).length || 0, sub: 'events completed' },
  ];

  const greetingTime = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Suprabhat 🌅'; // Good morning in Hindi
    if (h < 17) return 'Namaskar 🙏';
    return 'Shubh Sandhya 🌆'; // Good evening
  };

  return (
    <div className="pb-20">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FF6B1A 0%, #F5A623 40%, #0B7B83 100%)' }}>
        {/* Decorative rangoli dots */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-6 right-8 w-64 h-64 rounded-full bg-white/5 blur-3xl"></div>
          <div className="absolute bottom-0 left-1/3 w-48 h-48 rounded-full bg-black/10 blur-2xl"></div>
          {/* Decorative pattern dots */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-white/20"
              style={{ top: `${20 + (i % 4) * 20}%`, right: `${5 + (i % 6) * 8}%` }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <p className="text-orange-100 text-sm font-medium mb-1">{greetingTime()}</p>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {user.name.split(' ')[0]}! 👋
                </h1>
                <p className="text-orange-100 text-sm max-w-md">
                  Discover tech meetups, workshops & networking events across India. Connect with India's brightest minds.
                </p>
                {/* Location tag */}
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 backdrop-blur rounded-full">
                  <MapPin className="w-3.5 h-3.5 text-white" />
                  <span className="text-white text-xs font-medium">Hyderabad, India</span>
                  <span className="text-orange-200 text-xs">• Change city</span>
                </div>
              </div>

              {/* Quick stats chips */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 px-3 py-2 bg-white/15 backdrop-blur rounded-xl">
                  <Zap className="w-4 h-4 text-yellow-300" />
                  <span className="text-white text-xs font-semibold">{upcomingMeetups.length} events this month</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-white/15 backdrop-blur rounded-xl">
                  <Star className="w-4 h-4 text-yellow-300" />
                  <span className="text-white text-xs font-semibold">{networkingMatches.length} networking matches</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Wave bottom */}
        <div className="relative z-10">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
            <path d="M0 40 C360 0 1080 0 1440 40 L1440 40 L0 40 Z" fill="#f8f4ef" className="dark:hidden" />
            <path d="M0 40 C360 0 1080 0 1440 40 L1440 40 L0 40 Z" fill="#0E1020" className="hidden dark:block" />
          </svg>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="max-w-6xl mx-auto px-6 -mt-2 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`surface rounded-2xl p-4 card-hover bg-gradient-to-br ${STAT_COLORS[i].bg} border ${STAT_COLORS[i].border}`}
            >
              <div className={`w-9 h-9 rounded-xl ${STAT_COLORS[i].icon} flex items-center justify-center mb-3 shadow-md`}>
                {stat.icon}
              </div>
              <p className={`text-2xl font-black ${STAT_COLORS[i].text}`}>{stat.value}</p>
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mt-0.5">{stat.label}</p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── City Filter ── */}
      <section className="max-w-6xl mx-auto px-6 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0" />
          {INDIA_CITIES.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                selectedCity === city
                  ? 'saffron-gradient text-white shadow-md'
                  : 'bg-white dark:bg-[#161828] text-gray-600 dark:text-gray-400 border border-orange-100 dark:border-[#252840] hover:border-orange-300 hover:text-orange-500'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </section>

      {/* ── Tabs ── */}
      <section className="max-w-6xl mx-auto px-6 mb-6">
        <div className="flex gap-1 bg-white dark:bg-[#161828] rounded-2xl p-1.5 border border-orange-100 dark:border-[#252840] w-fit shadow-sm overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'saffron-gradient text-white shadow-md'
                  : 'text-gray-500 dark:text-gray-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-[#252840]'
              }`}
            >
              {tab.label}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-orange-100 dark:bg-[#252840] text-orange-500 dark:text-orange-400'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ── Events Grid ── */}
      <section className="max-w-6xl mx-auto px-6 mb-10">
        {activeTab === 'upcoming' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUpcoming.length > 0 ? (
              filteredUpcoming.map((meetup, idx) => (
                <motion.div key={meetup.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }}>
                  <EnhancedEventCard meetup={meetup} isRegistered={registeredMeetups.some(m => m.id === meetup.id)} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <div className="w-16 h-16 saffron-gradient rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <p className="text-gray-600 dark:text-gray-400 font-semibold">No events in {selectedCity} yet</p>
                <p className="text-sm text-gray-400 mt-1">Try another city or check back soon!</p>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'registered' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {registeredMeetups.length > 0 ? (
              registeredMeetups.map((meetup, idx) => (
                <motion.div key={meetup.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }}>
                  <EnhancedEventCard meetup={meetup} isRegistered={true} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <div className="w-16 h-16 teal-gradient rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <p className="text-gray-600 dark:text-gray-400 font-semibold">No registrations yet</p>
                <p className="text-sm text-gray-400 mt-1">Explore upcoming events and register!</p>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'recommended' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedMeetups.length > 0 ? (
              recommendedMeetups.map((meetup, idx) => (
                <motion.div key={meetup.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }}>
                  <EnhancedEventCard meetup={meetup} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <div className="w-16 h-16 saffron-gradient rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <p className="text-gray-600 dark:text-gray-400 font-semibold">No recommendations yet</p>
                <p className="text-sm text-gray-400 mt-1">Update your interests for personalized suggestions!</p>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'networking' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {networkingMatches.length > 0 ? (
              networkingMatches.map((match, idx) => (
                <motion.div key={(match as any).id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }}>
                  <NetworkingMatch user={match as any} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <div className="w-16 h-16 teal-gradient rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <p className="text-gray-600 dark:text-gray-400 font-semibold">No networking matches yet</p>
                <p className="text-sm text-gray-400 mt-1">Register for events to find your community!</p>
              </div>
            )}
          </motion.div>
        )}
      </section>

      {/* ── Recent Activity ── */}
      <section className="max-w-6xl mx-auto px-6 mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recent Activity</h2>
          <span className="text-xs text-orange-500 font-semibold cursor-pointer hover:text-orange-600">View all →</span>
        </div>
        <div className="surface rounded-2xl overflow-hidden shadow-sm">
          {activities.slice(0, 5).map((activity, idx) => {
            const colorMap: Record<string, string> = {
              registration: 'saffron-gradient',
              checkin: 'teal-gradient',
              feedback: 'bg-gradient-to-br from-purple-500 to-violet-600',
              comment: 'bg-gradient-to-br from-rose-500 to-pink-600',
            };
            const emojiMap: Record<string, string> = {
              registration: '📋',
              checkin: '✅',
              feedback: '⭐',
              comment: '💬',
            };
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.06 }}
                className="flex items-center gap-4 p-4 hover:bg-orange-50/50 dark:hover:bg-[#1a1c2e] transition-colors border-b border-orange-50 dark:border-[#252840] last:border-b-0"
              >
                <div className={`w-9 h-9 rounded-xl ${colorMap[activity.type]} flex items-center justify-center text-base flex-shrink-0 shadow-sm`}>
                  {emojiMap[activity.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{activity.description}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                    {new Date(activity.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <span className="tag-pill hidden sm:inline-flex">{activity.type}</span>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
