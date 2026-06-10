import { motion } from 'framer-motion';
import { Users, Mail, Copy } from 'lucide-react';
import { useAppData } from '../contexts/AppDataContext';
import { useParams } from 'react-router-dom';

export default function RegisteredMembers() {
  const { id } = useParams();
  const { registrations, users } = useAppData();

  const members = registrations
    .filter(r => r.meetupId === id)
    .map(r => users.find(u => u.id === r.userId))
    .filter(Boolean);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Registered Members</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((user, idx) => (
          <motion.div
            key={user?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
          >
            <div className="flex items-start gap-4">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 dark:text-white">{user?.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{user?.profession}</p>
                <p className="text-xs text-gray-500">{user?.company}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 line-clamp-2">{user?.bio}</p>
            
            <div className="flex gap-2 mt-4">
              <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition text-sm font-medium">
                <Mail className="w-4 h-4" />
                Message
              </button>
              <button className="px-3 py-2 bg-gray-100 dark:bg-slate-700 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition">
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
