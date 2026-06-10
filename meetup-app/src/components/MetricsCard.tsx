import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface MetricsCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  subtext?: string;
  trend?: number;
  color: 'blue' | 'purple' | 'green' | 'orange' | 'red';
}

const colorClasses = {
  blue: 'from-blue-500 to-blue-600 text-blue-100',
  purple: 'from-purple-500 to-purple-600 text-purple-100',
  green: 'from-green-500 to-emerald-600 text-green-100',
  orange: 'from-orange-500 to-amber-600 text-orange-100',
  red: 'from-red-500 to-pink-600 text-red-100',
};

export function MetricsCard({ icon, label, value, subtext, trend, color }: MetricsCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-gradient-to-br rounded-xl shadow-lg overflow-hidden"
    >
      <div className={`bg-gradient-to-br ${colorClasses[color]} p-6`}>
        <div className="flex items-start justify-between mb-4">
          <div className="text-3xl opacity-80">{icon}</div>
          {trend !== undefined && (
            <div className={`text-sm font-bold ${trend > 0 ? 'text-green-300' : 'text-red-300'}`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
            </div>
          )}
        </div>

        <p className="text-sm opacity-90 mb-1">{label}</p>
        <p className="text-3xl font-bold">{value}</p>
        
        {subtext && (
          <p className="text-xs opacity-75 mt-2">{subtext}</p>
        )}
      </div>
    </motion.div>
  );
}
