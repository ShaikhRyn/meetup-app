import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image, MapPin, Calendar, Clock, Users, ArrowRight } from 'lucide-react';
import { useAppData } from '../contexts/AppDataContext';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export default function CreateMeetup() {
  const { createMeetup, currentUser } = useAppData();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    bannerUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2000',
    date: '',
    startTime: '',
    endTime: '',
    venueName: '',
    mapLink: '',
    capacity: '',
    tags: 'Tech, Networking'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMeetup({
      ...formData,
      capacity: parseInt(formData.capacity) || 50,
      tags: formData.tags.split(',').map(t => t.trim()),
      organizerId: currentUser?.id || 'u1'
    });
    navigate('/admin');
  };

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      {/* Form Section */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-2">Create New Meetup</h1>
        <p className="text-gray-500 mb-8">Fill in the details to host your next amazing event.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">Basic Info</h2>
            <div className="space-y-4">
              <Input 
                label="Event Title" 
                placeholder="E.g. Future of Tech 2026" 
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                required
              />
              
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea 
                  className="w-full h-32 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-900 p-4 focus:ring-2 focus:ring-primary outline-none"
                  placeholder="Describe your event..."
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  required
                />
              </div>

              <Input 
                label="Banner Image URL" 
                placeholder="https://..." 
                value={formData.bannerUrl}
                onChange={e => setFormData({...formData, bannerUrl: e.target.value})}
              />
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">Date & Location</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                type="date" 
                label="Date" 
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
                required
              />
              <div className="flex gap-4">
                <Input 
                  type="time" 
                  label="Start Time" 
                  className="w-full"
                  value={formData.startTime}
                  onChange={e => setFormData({...formData, startTime: e.target.value})}
                  required
                />
                <Input 
                  type="time" 
                  label="End Time" 
                  className="w-full"
                  value={formData.endTime}
                  onChange={e => setFormData({...formData, endTime: e.target.value})}
                  required
                />
              </div>
              <Input 
                label="Venue Name" 
                placeholder="E.g. Tech Hub Downtown" 
                className="md:col-span-2"
                value={formData.venueName}
                onChange={e => setFormData({...formData, venueName: e.target.value})}
                required
              />
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                type="number" 
                label="Capacity" 
                placeholder="100" 
                value={formData.capacity}
                onChange={e => setFormData({...formData, capacity: e.target.value})}
                required
              />
              <Input 
                label="Tags (comma separated)" 
                placeholder="Tech, Networking, AI" 
                value={formData.tags}
                onChange={e => setFormData({...formData, tags: e.target.value})}
              />
            </div>
          </Card>

          <div className="flex justify-end gap-4">
            <Button variant="ghost">Save Draft</Button>
            <Button type="submit">Publish Event</Button>
          </div>
        </form>
      </div>

      {/* Live Preview Section */}
      <div className="w-full xl:w-96">
        <div className="sticky top-8">
          <div className="flex items-center gap-2 mb-4 text-gray-500 font-medium">
            <ArrowRight className="w-4 h-4" /> Live Preview
          </div>
          
          <Card className="overflow-hidden border-2 border-primary/20">
            <div className="h-48 bg-gray-200 dark:bg-gray-800 relative">
              {formData.bannerUrl ? (
                <img src={formData.bannerUrl} className="w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <Image className="w-10 h-10" />
                </div>
              )}
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4 line-clamp-2">
                {formData.title || 'Your Event Title'}
              </h3>
              
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4" />
                  <span>{formData.date ? new Date(formData.date).toLocaleDateString() : 'Select date'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4" />
                  <span>{formData.startTime || '--:--'} - {formData.endTime || '--:--'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4" />
                  <span>{formData.venueName || 'Venue name'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4" />
                  <span>{formData.capacity || '0'} spots total</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
