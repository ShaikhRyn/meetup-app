import { motion } from 'framer-motion';
import { MessageCircle, Share2 } from 'lucide-react';
import { User } from '../data/mockData';

interface NetworkingMatchProps {
  user: User & { matchScore: number; sharedInterests: string[]; sharedSkills?: string[] };
}

export function NetworkingMatch({ user }: NetworkingMatchProps) {
  const matchPercentage = Math.min((user.matchScore / 100) * 100, 100);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="surface rounded-2xl shadow-card hover:shadow-saffron card-hover overflow-hidden"
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 dark:text-white">{user.name}</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {user.profession} @ {user.company}
            </p>
          </div>
        </div>

        {/* Match Score */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Compatibility</span>
            <span className="text-base font-black text-orange-500">{Math.round(matchPercentage)}% Match</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${matchPercentage}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="h-full saffron-gradient"
            />
          </div>
        </div>

        {/* Match Details */}
        {((user.sharedSkills && user.sharedSkills.length > 0) || user.sharedInterests.length > 0) && (
          <div className="mb-4 space-y-3">
            {user.sharedSkills && user.sharedSkills.length > 0 && (
              <div>
                <p className="text-[9px] font-bold uppercase tracking-wider text-orange-500 mb-1">Mutual Skills</p>
                <div className="flex flex-wrap gap-1">
                  {user.sharedSkills.map((skill) => (
                    <span key={skill} className="px-2 py-0.5 bg-orange-500/10 text-orange-600 border border-orange-500/25 rounded-full text-[9px] font-semibold dark:text-orange-400">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {user.sharedInterests.length > 0 && (
              <div>
                <p className="text-[9px] font-bold uppercase tracking-wider text-teal-500 mb-1">Shared Interests</p>
                <div className="flex flex-wrap gap-1">
                  {user.sharedInterests.map((interest) => (
                    <span key={interest} className="px-2 py-0.5 bg-teal-500/10 text-teal-600 border border-teal-500/25 rounded-full text-[9px] font-semibold dark:text-teal-400">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Bio */}
        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">{user.bio}</p>

        {/* Actions */}
        <div className="flex gap-2">
          <button className="flex-1 btn-teal font-semibold py-2 rounded-xl hover:opacity-90 transition flex items-center justify-center gap-2 text-sm">
            <MessageCircle className="w-4 h-4" />
            Connect
          </button>
          <button className="px-3 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 font-semibold py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
