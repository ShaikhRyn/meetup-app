import { motion } from 'framer-motion';
import { Calendar, Users, Star } from 'lucide-react';
import { useAppData } from '../contexts/AppDataContext';
import { useAuth } from '../contexts/AuthContext';

export default function History() {
  const { user } = useAuth();
  const { meetups, registrations, feedback } = useAppData();

  if (!user || user.role !== 'admin') return null;

  const adminMeetups = meetups.filter(m => m.organizerId === user.id && new Date(m.date) < new Date());

  return (
    <div className="pb-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Event History</h1>

      <div className="space-y-6">
        {adminMeetups.length > 0 ? (
          adminMeetups.map((meetup, idx) => {
            const meetupFeedback = feedback.filter(f => f.meetupId === meetup.id);
            const meetupRegs = registrations.filter(r => r.meetupId === meetup.id);

            return (
              <motion.div
                key={meetup.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{meetup.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{meetup.description.slice(0, 100)}...</p>

                    <div className="flex items-center gap-6 mt-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        {meetup.date}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Users className="w-4 h-4" />
                        {meetup.attendedCount} attended
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Star className="w-4 h-4 text-yellow-500" />
                        {meetup.averageRating.toFixed(1)} ({meetupFeedback.length} reviews)
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold">{meetup.attendedCount}</p>
                    <p className="text-sm opacity-90">Attended</p>
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl">
            <p className="text-gray-600 dark:text-gray-400 text-lg">No past events yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
