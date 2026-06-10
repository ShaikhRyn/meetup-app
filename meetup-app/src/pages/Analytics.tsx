import { Award, TrendingUp, Users } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { useAppData } from '../contexts/AppDataContext';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function Analytics() {
  const { meetups, registrations, users } = useAppData();

  const performanceData = meetups.map(m => {
    const regs = registrations.filter(r => r.meetupId === m.id);
    const checkins = regs.filter(r => r.checkedIn);
    return {
      name: m.title.substring(0, 15) + '...',
      Registrations: regs.length,
      CheckIns: checkins.length
    };
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Deep Analytics</h1>
        <p className="text-gray-500">Understand your community engagement.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-6">Event Performance Comparison</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="Registrations" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                <Bar dataKey="CheckIns" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Award className="w-6 h-6 text-yellow-500" />
            <h2 className="text-xl font-bold">Community Leaderboard</h2>
          </div>
          
          <div className="space-y-4">
            {users.slice(0, 4).map((user, i) => (
              <div key={user.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-dark-900 rounded-xl transition-colors">
                <div className="w-8 text-center font-bold text-gray-400">#{i + 1}</div>
                <img src={user.avatar} className="w-12 h-12 rounded-full border-2 border-transparent hover:border-primary transition-all" />
                <div className="flex-1">
                  <h4 className="font-bold">{user.name}</h4>
                  <p className="text-xs text-gray-500">{user.profession}</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-primary">{Math.floor(Math.random() * 20) + 5}</div>
                  <div className="text-xs text-gray-500">Events</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
