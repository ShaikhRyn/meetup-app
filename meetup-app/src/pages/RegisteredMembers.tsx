import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MessageCircle, UserPlus, ArrowLeft, X } from 'lucide-react';
import { useAppData } from '../contexts/AppDataContext';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export default function RegisteredMembers() {
  const { id } = useParams();
  const { meetups, registrations, users } = useAppData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const meetup = meetups.find(m => m.id === id);
  const meetupRegs = registrations.filter(r => r.meetupId === id);
  const members = meetupRegs.map(r => users.find(u => u.id === r.userId)).filter(Boolean);

  const filteredMembers = members.filter(m => 
    m?.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m?.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!meetup) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
      <Link to={`/meetup/${meetup.id}`} className="inline-flex items-center text-sm font-medium hover:text-primary mb-8 text-gray-500">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Event
      </Link>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Registered Members</h1>
          <p className="text-gray-500">Connect with {members.length} professionals attending {meetup.title}</p>
        </div>
        
        <div className="flex w-full md:w-auto gap-3">
          <div className="relative w-full md:w-64">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input 
              className="pl-10" 
              placeholder="Search members..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="px-3"><Filter className="w-5 h-5" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMembers.map((member, index) => (
          <motion.div
            key={member?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="p-6 text-center group hover:border-primary/50 border border-transparent transition-all cursor-pointer" onClick={() => setSelectedUser(member)}>
              <div className="relative inline-block mb-4">
                <img src={member?.avatar} alt={member?.name} className="w-24 h-24 rounded-full mx-auto ring-4 ring-gray-50 dark:ring-dark-900 group-hover:ring-primary/20 transition-all" />
              </div>
              <h3 className="text-lg font-bold">{member?.name}</h3>
              <p className="text-sm text-primary font-medium mt-1">{member?.profession}</p>
              <p className="text-xs text-gray-500 mt-1">{member?.company}</p>
              
              <div className="flex justify-center gap-2 mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="icon" variant="secondary" className="w-8 h-8 rounded-full"><UserPlus className="w-4 h-4" /></Button>
                <Button size="icon" variant="primary" className="w-8 h-8 rounded-full"><MessageCircle className="w-4 h-4" /></Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Profile Drawer */}
      <AnimatePresence>
        {selectedUser && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
              onClick={() => setSelectedUser(null)}
            />
            <motion.div 
              initial={{ x: '100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '100%' }} 
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-md bg-white dark:bg-dark-card shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-6">
                <button 
                  onClick={() => setSelectedUser(null)}
                  className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="text-center mt-10 mb-8">
                  <img src={selectedUser.avatar} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white shadow-lg" />
                  <h2 className="text-2xl font-bold">{selectedUser.name}</h2>
                  <p className="text-primary font-medium">{selectedUser.profession} at {selectedUser.company}</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">About</h4>
                    <p className="text-gray-700 dark:text-gray-300">{selectedUser.bio}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Looking For</h4>
                    <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-dark-900 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                      {selectedUser.lookingFor}
                    </p>
                  </div>
                </div>

                <div className="mt-10 flex gap-4">
                  <Button className="flex-1">Connect</Button>
                  <Button variant="outline" className="flex-1">Message</Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
