import { motion } from 'framer-motion';
import { AgendaItem } from '../data/mockData';
import { Clock, User } from 'lucide-react';

interface AgendaTimelineProps {
  items: AgendaItem[];
}

export function AgendaTimeline({ items }: AgendaTimelineProps) {
  return (
    <div className="space-y-6">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex gap-4"
        >
          {/* Timeline Line */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 saffron-gradient rounded-full flex items-center justify-center text-white font-bold text-sm">
              {index + 1}
            </div>
            {index !== items.length - 1 && (
              <div className="w-1 h-16 bg-gradient-to-b from-orange-400/50 to-transparent mt-2" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 pb-4">
            <div className="surface rounded-xl p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">{item.title}</p>
                  {item.speaker && (
                    <p className="text-sm text-orange-500 dark:text-orange-400 flex items-center gap-1 mt-1">
                      <User className="w-4 h-4" />
                      {item.speaker}
                    </p>
                  )}
                </div>
                <p className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 font-semibold">
                  <Clock className="w-4 h-4" />
                  {item.time}
                </p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
