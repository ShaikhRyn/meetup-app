import { motion } from 'framer-motion';
import { QrCode, CheckCircle2, Clock } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useAppData } from '../contexts/AppDataContext';

export default function LiveAttendee() {
  const { id } = useParams();
  const { meetups, registrations } = useAppData();

  const meetup = meetups.find(m => m.id === id);
  const registeredUsers = registrations.filter(r => r.meetupId === id);
  const checkedInUsers = registeredUsers.filter(r => r.checkedIn);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Live Attendance</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">{meetup?.title}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">Total Registered</span>
            <span className="text-3xl font-bold">{registeredUsers.length}</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Checked In
            </span>
            <span className="text-3xl font-bold">{checkedInUsers.length}</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Pending
            </span>
            <span className="text-3xl font-bold">{registeredUsers.length - checkedInUsers.length}</span>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">QR Check-In</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Scan attendee QR codes to mark check-ins.</p>
        
        <div className="border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg p-12 text-center">
          <QrCode className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Point camera at QR code to scan</p>
        </div>
      </div>
    </div>
  );
}
