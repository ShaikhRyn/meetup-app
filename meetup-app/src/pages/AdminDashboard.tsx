import { Users, Ticket, CheckCircle, TrendingUp } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { useAppData } from '../contexts/AppDataContext';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function AdminDashboard() {
  const { meetups, registrations } = useAppData();

  const totalMeetups = meetups.length;
  const totalRegistrations = registrations.length;
  const totalCheckIns = registrations.filter(r => r.checkedIn).length;
  const attendanceRate = totalRegistrations > 0 ? Math.round((totalCheckIns / totalRegistrations) * 100) : 0;

  const statCards = [
    { title: 'Total Meetups', value: totalMeetups, icon: Ticket, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/20' },
    { title: 'Total Registrations', value: totalRegistrations, icon: Users, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/20' },
    { title: 'Total Check-ins', value: totalCheckIns, icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/20' },
    { title: 'Attendance Rate', value: `${attendanceRate}%`, icon: TrendingUp, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/20' },
  ];

  const chartData = [
    { name: 'Jan', reg: 400, checkin: 240 },
    { name: 'Feb', reg: 300, checkin: 139 },
    { name: 'Mar', reg: 200, checkin: 980 },
    { name: 'Apr', reg: 278, checkin: 390 },
    { name: 'May', reg: 189, checkin: 480 },
    { name: 'Jun', reg: 239, checkin: 380 },
    { name: 'Jul', reg: 349, checkin: 430 },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </div>
                <div className={`p-4 rounded-xl ${stat.bg}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 p-6">
          <h2 className="text-xl font-bold mb-6">Activity Trend</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorReg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCheckin" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="reg" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorReg)" />
                <Area type="monotone" dataKey="checkin" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorCheckin)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
          <div className="space-y-6">
            {[...registrations].reverse().slice(0, 5).map((reg, i) => {
               const user = useAppData().users.find(u => u.id === reg.userId);
               return (
                 <div key={i} className="flex items-center gap-4">
                   <img src={user?.avatar} className="w-10 h-10 rounded-full" />
                   <div>
                     <p className="text-sm font-medium">
                       <span className="font-bold">{user?.name}</span> {reg.checkedIn ? 'checked in to' : 'registered for'} an event
                     </p>
                     <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                   </div>
                 </div>
               )
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
