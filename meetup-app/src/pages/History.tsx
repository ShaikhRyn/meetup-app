import { Download, MoreVertical, Search, Copy } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { useAppData } from '../contexts/AppDataContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export default function History() {
  const { meetups, registrations } = useAppData();

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Meetup History</h1>
          <p className="text-gray-500">Manage and export your past events.</p>
        </div>
        
        <div className="relative w-full sm:w-64">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input className="pl-10" placeholder="Search events..." />
        </div>
      </div>

      <div className="space-y-4">
        {meetups.map((meetup) => {
          const regs = registrations.filter(r => r.meetupId === meetup.id);
          const checkins = regs.filter(r => r.checkedIn);
          
          return (
            <Card key={meetup.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-6 hover:border-primary/30 border border-transparent transition-all">
              <img src={meetup.bannerUrl} className="w-full sm:w-48 h-32 object-cover rounded-xl" />
              
              <div className="flex-1 w-full">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm text-primary font-medium mb-1">
                      {new Date(meetup.date).toLocaleDateString()}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{meetup.title}</h3>
                  </div>
                  <button className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-6 mt-4">
                  <div>
                    <div className="text-sm text-gray-500">Registrations</div>
                    <div className="font-bold text-lg">{regs.length}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Check-ins</div>
                    <div className="font-bold text-lg">{checkins.length}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Revenue</div>
                    <div className="font-bold text-lg">$0.00</div>
                  </div>
                </div>
              </div>
              
              <div className="flex sm:flex-col w-full sm:w-auto gap-3 border-t sm:border-t-0 sm:border-l border-gray-100 dark:border-gray-800 pt-4 sm:pt-0 sm:pl-6">
                <Button variant="outline" className="flex-1 w-full sm:w-40 text-xs h-10">
                  <Download className="w-4 h-4 mr-2" /> Export CSV
                </Button>
                <Button variant="ghost" className="flex-1 w-full sm:w-40 text-xs h-10">
                  <Copy className="w-4 h-4 mr-2" /> Duplicate
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
