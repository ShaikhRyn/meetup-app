import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useAppData } from '../contexts/AppDataContext';
import { Button } from '../components/ui/Button';

export default function LiveAttendee() {
  const { id } = useParams();
  const { meetups, registrations, users, checkInToMeetup, currentUser } = useAppData();
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const meetup = meetups.find(m => m.id === id);
  const myRegistration = registrations.find(r => r.meetupId === id && r.userId === currentUser?.id);
  const checkedInRegs = registrations.filter(r => r.meetupId === id && r.checkedIn);
  const checkedInUsers = checkedInRegs.map(r => users.find(u => u.id === r.userId)).filter(Boolean);

  if (!meetup || !myRegistration) return <div className="p-20 text-center">Not registered for this event.</div>;

  const handleCheckIn = () => {
    checkInToMeetup(myRegistration.id);
    setIsCheckedIn(true);
  };

  const alreadyCheckedIn = myRegistration.checkedIn || isCheckedIn;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4">{meetup.title}</h1>
        <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full font-bold animate-pulse">
          LIVE NOW
        </div>
      </div>

      {!alreadyCheckedIn ? (
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          className="max-w-md mx-auto bg-white dark:bg-dark-card p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 text-center"
        >
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">👋</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">You've arrived!</h2>
          <p className="text-gray-500 mb-8">Tap below to check in and let others know you're here.</p>
          
          <Button size="lg" className="w-full text-lg h-16 rounded-2xl" onClick={handleCheckIn}>
            CHECK IN
          </Button>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          className="max-w-md mx-auto bg-green-50 dark:bg-green-900/20 p-10 rounded-3xl border border-green-200 dark:border-green-800/50 text-center mb-12"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
            className="text-green-500 flex justify-center mb-4"
          >
            <CheckCircle2 className="w-20 h-20" />
          </motion.div>
          <h2 className="text-2xl font-bold text-green-700 dark:text-green-400">Checked In!</h2>
          <p className="text-green-600 dark:text-green-500 mt-2">Enjoy the event and start networking.</p>
        </motion.div>
      )}

      {alreadyCheckedIn && (
        <div className="mt-16">
          <div className="flex justify-between items-center mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
            <h3 className="text-2xl font-bold">Currently Here</h3>
            <div className="bg-gray-100 dark:bg-gray-800 px-4 py-1 rounded-full font-medium">
              {checkedInUsers.length} People
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {checkedInUsers.map((user, i) => (
              <motion.div 
                key={user?.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-dark-card p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-3"
              >
                <img src={user?.avatar} className="w-12 h-12 rounded-full" />
                <div>
                  <div className="font-bold text-sm truncate">{user?.name}</div>
                  <div className="text-xs text-gray-500 truncate">{user?.company}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
