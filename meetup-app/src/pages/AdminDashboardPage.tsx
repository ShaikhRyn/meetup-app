import { motion } from 'framer-motion';
import { useAppData } from '../contexts/AppDataContext';
import { useAuth } from '../contexts/AuthContext';
import { BarChart3, Calendar, Users, TrendingUp, PlusCircle, Edit, Trash2 } from 'lucide-react';
import { MetricsCard } from '../components/MetricsCard';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function AdminDashboard() {
  const { user } = useAuth();
  const { meetups, registrations, feedback, deleteMeetup, getRecentActivities } = useAppData();
  const [selectedMeetup, setSelectedMeetup] = useState<string | null>(null);

  if (!user || user.role !== 'admin') return null;

  // Get admin's meetups
  const adminMeetups = meetups.filter(m => m.organizerId === user.id);

  // Calculate stats
  const totalRegistrations = registrations.filter(r =>
    adminMeetups.some(m => m.id === r.meetupId)
  ).length;

  const totalAttendees = registrations.filter(r =>
    adminMeetups.some(m => m.id === r.meetupId) && r.checkedIn
  ).length;

  const upcomingMeetups = adminMeetups.filter(m => new Date(m.date) > new Date());

  const pastMeetups = adminMeetups.filter(m => new Date(m.date) <= new Date());

  const recentActivities = getRecentActivities();

  return (
    <div className="pb-20">
      {/* Header with CTA */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your events and track performance</p>
        </div>
        <Link
          to="/admin/create"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition"
        >
          <PlusCircle className="w-5 h-5" />
          Create Meetup
        </Link>
      </div>

      {/* Key Metrics */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <MetricsCard
          icon={<Calendar className="w-8 h-8" />}
          label="Total Meetups"
          value={adminMeetups.length}
          trend={12}
          color="blue"
        />
        <MetricsCard
          icon={<Calendar className="w-8 h-8" />}
          label="Upcoming"
          value={upcomingMeetups.length}
          color="green"
        />
        <MetricsCard
          icon={<Users className="w-8 h-8" />}
          label="Total Registrations"
          value={totalRegistrations}
          trend={8}
          color="purple"
        />
        <MetricsCard
          icon={<TrendingUp className="w-8 h-8" />}
          label="Attended"
          value={totalAttendees}
          subtext={`${((totalAttendees / totalRegistrations) * 100).toFixed(0)}% attendance rate`}
          color="orange"
        />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Upcoming Meetups */}
          <section className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Upcoming Meetups</h2>
              <Link to="/admin/create" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Add New →
              </Link>
            </div>

            {upcomingMeetups.length > 0 ? (
              <div className="space-y-4">
                {upcomingMeetups.map((meetup, idx) => (
                  <motion.div
                    key={meetup.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => setSelectedMeetup(meetup.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedMeetup === meetup.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white">{meetup.title}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                          <span>📅 {meetup.date}</span>
                          <span>👥 {meetup.registeredCount}/{meetup.capacity}</span>
                          <span>⭐ {meetup.averageRating.toFixed(1)}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition text-blue-600">
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteMeetup(meetup.id);
                          }}
                          className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition text-red-600"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-400">No upcoming meetups. Create one now!</p>
              </div>
            )}
          </section>

          {/* Past Meetups */}
          <section className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Past Meetups</h2>

            {pastMeetups.length > 0 ? (
              <div className="space-y-4">
                {pastMeetups.slice(0, 5).map((meetup, idx) => (
                  <motion.div
                    key={meetup.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-4 rounded-lg border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white">{meetup.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{meetup.date}</p>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{meetup.attendedCount} Attended</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{((meetup.attendedCount / meetup.registeredCount) * 100).toFixed(0)}% rate</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">⭐ {meetup.averageRating.toFixed(1)}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{meetup.totalRatings} reviews</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-400">No past meetups yet</p>
              </div>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl p-6 shadow-lg">
            <h3 className="font-bold mb-4">Quick Stats</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="opacity-90">Avg Registration</span>
                <span className="font-bold">{Math.round(totalRegistrations / adminMeetups.length) || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-90">Avg Rating</span>
                <span className="font-bold">{(adminMeetups.reduce((sum, m) => sum + m.averageRating, 0) / adminMeetups.length).toFixed(1)}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-90">Total Feedback</span>
                <span className="font-bold">{feedback.length}</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivities.slice(0, 5).map((activity, idx) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="text-xs"
                >
                  <p className="font-medium text-gray-900 dark:text-white">{activity.description}</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {new Date(activity.timestamp).toLocaleDateString()}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <Link
              to="/admin/analytics"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 font-semibold rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition"
            >
              <BarChart3 className="w-4 h-4" />
              View Analytics
            </Link>
            <Link
              to="/admin/history"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition"
            >
              View History
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
