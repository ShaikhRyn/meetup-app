import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAppData } from '../contexts/AppDataContext';
import { useAuth } from '../contexts/AuthContext';

export default function Analytics() {
  const { user } = useAuth();
  const { meetups, registrations, getMeetupAnalytics } = useAppData();

  if (!user || user.role !== 'admin') return null;

  const adminMeetups = meetups.filter(m => m.organizerId === user.id);

  // Prepare data
  const registrationTrend = adminMeetups.map(m => ({
    name: m.title.slice(0, 10),
    registrations: m.registeredCount,
    attended: m.attendedCount,
  }));

  const ratingDistribution = [
    { name: '5 Stars', value: Math.round(adminMeetups.filter(m => m.averageRating >= 4.5).length) },
    { name: '4 Stars', value: Math.round(adminMeetups.filter(m => m.averageRating >= 3.5 && m.averageRating < 4.5).length) },
    { name: '3 Stars', value: Math.round(adminMeetups.filter(m => m.averageRating < 3.5).length) },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

  return (
    <div className="pb-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Analytics & Reports</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Registration Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Registration Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={registrationTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,100,100,0.1)" />
              <XAxis dataKey="name" stroke="rgba(100,100,100,0.5)" />
              <YAxis stroke="rgba(100,100,100,0.5)" />
              <Tooltip />
              <Legend />
              <Bar dataKey="registrations" fill="#3b82f6" />
              <Bar dataKey="attended" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Rating Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Rating Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={ratingDistribution} cx="50%" cy="50%" labelLine={false} label outerRadius={80} fill="#8884d8" dataKey="value">
                {ratingDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Detailed Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Detailed Metrics</h2>
        <div className="space-y-4">
          {adminMeetups.map((meetup) => (
            <div key={meetup.id} className="p-4 border border-gray-200 dark:border-slate-700 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900 dark:text-white">{meetup.title}</h3>
                <span className="text-sm text-gray-600 dark:text-gray-400">{meetup.date}</span>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Registrations</p>
                  <p className="font-bold text-gray-900 dark:text-white">{meetup.registeredCount}/{meetup.capacity}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Attended</p>
                  <p className="font-bold text-gray-900 dark:text-white">{meetup.attendedCount} ({((meetup.attendedCount / meetup.registeredCount) * 100).toFixed(0)}%)</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Rating</p>
                  <p className="font-bold text-gray-900 dark:text-white">⭐ {meetup.averageRating.toFixed(1)}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Reviews</p>
                  <p className="font-bold text-gray-900 dark:text-white">{meetup.totalRatings}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
