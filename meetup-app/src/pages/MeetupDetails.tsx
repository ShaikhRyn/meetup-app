import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Users, Share2, BookmarkPlus, ArrowLeft, Clock } from 'lucide-react';
import { useState } from 'react';
import { useAppData } from '../contexts/AppDataContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export default function MeetupDetails() {
  const { id } = useParams();
  const { meetups, registrations, currentUser, registerForMeetup } = useAppData();
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [regStep, setRegStep] = useState(1);
  const [answers, setAnswers] = useState({ whyAttend: '', learnGoals: '', contribute: '' });

  const meetup = meetups.find(m => m.id === id);
  const meetupRegistrations = registrations.filter(r => r.meetupId === id);
  const isRegistered = registrations.some(r => r.meetupId === id && r.userId === currentUser?.id);

  if (!meetup) {
    return <div className="p-20 text-center text-xl">Meetup not found</div>;
  }

  const handleRegister = () => {
    registerForMeetup(meetup.id, answers);
    setRegStep(3); // Success step
    setTimeout(() => {
      setIsRegisterModalOpen(false);
      setRegStep(1);
    }, 2000);
  };

  return (
    <div className="pb-24">
      {/* Hero Banner */}
      <div className="relative h-[60vh] min-h-[400px] w-full">
        <img 
          src={meetup.bannerUrl} 
          alt={meetup.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-6xl mx-auto text-white">
            <Link to="/" className="inline-flex items-center text-sm font-medium hover:text-primary mb-6 bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Discover
            </Link>
            <div className="flex flex-wrap gap-3 mb-4">
              {meetup.tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-sm font-medium border border-white/30">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">{meetup.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-lg font-medium text-gray-200">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                {new Date(meetup.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                {meetup.startTime} - {meetup.endTime}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-3xl font-bold mb-6">About this event</h2>
              <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                {meetup.description}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">Venue details</h2>
              <Card className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{meetup.venueName}</h3>
                    <p className="text-gray-500 mt-1">Get directions to this premium venue.</p>
                  </div>
                </div>
                <div className="w-full h-64 bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden relative">
                   <iframe 
                     width="100%" 
                     height="100%" 
                     frameBorder="0" 
                     style={{ border: 0 }} 
                     src={`https://maps.google.com/maps?q=${encodeURIComponent(meetup.venueName)}&t=&z=13&ie=UTF8&iwloc=&output=embed`} 
                     allowFullScreen
                   ></iframe>
                </div>
              </Card>
            </section>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              <Card className="p-6 border border-gray-200 dark:border-gray-800">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Registration</div>
                  <div className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                    Free
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-semibold">{meetupRegistrations.length} / {meetup.capacity}</div>
                      <div className="text-xs text-gray-500">Spots filled</div>
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${(meetupRegistrations.length / meetup.capacity) * 100}%` }}
                    />
                  </div>
                </div>

                {isRegistered ? (
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full border-green-500 text-green-600 dark:text-green-400 font-bold" disabled>
                      ✓ You are registered
                    </Button>
                    <Link to={`/meetup/${meetup.id}/live`}>
                      <Button variant="primary" className="w-full mt-3">
                        Go to Live Event Area
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <Button variant="primary" size="lg" className="w-full text-lg" onClick={() => setIsRegisterModalOpen(true)}>
                    Register Now
                  </Button>
                )}

                <div className="flex gap-4 mt-6">
                  <Button variant="ghost" className="flex-1 border border-gray-200 dark:border-gray-700">
                    <Share2 className="w-4 h-4 mr-2" /> Share
                  </Button>
                  <Button variant="ghost" className="flex-1 border border-gray-200 dark:border-gray-700">
                    <BookmarkPlus className="w-4 h-4 mr-2" /> Save
                  </Button>
                </div>
              </Card>

              {/* Registered Members Preview */}
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold">Attendees</h3>
                  <Link to={`/meetup/${meetup.id}/members`} className="text-sm text-primary hover:underline font-medium">
                    View all
                  </Link>
                </div>
                <div className="flex -space-x-3 overflow-hidden p-2">
                  {[...Array(Math.min(5, meetupRegistrations.length))].map((_, i) => (
                    <img key={i} className="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-dark-card" src={`https://i.pravatar.cc/150?u=${i}`} alt="" />
                  ))}
                  {meetupRegistrations.length > 5 && (
                    <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center ring-2 ring-white dark:ring-dark-card text-xs font-bold text-gray-600 dark:text-gray-300">
                      +{meetupRegistrations.length - 5}
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Modal Wizard */}
      <AnimatePresence>
        {isRegisterModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsRegisterModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-dark-card rounded-3xl shadow-2xl overflow-hidden z-10"
            >
              {regStep === 1 && (
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">Almost there!</h3>
                  <p className="text-gray-500 mb-6">Let the organizer know why you want to attend.</p>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Why do you want to attend?</label>
                      <textarea 
                        className="w-full h-24 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-900 p-3 focus:ring-2 focus:ring-primary outline-none resize-none"
                        value={answers.whyAttend}
                        onChange={e => setAnswers({...answers, whyAttend: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                    <div className="text-sm text-gray-500">Step 1 of 2</div>
                    <Button onClick={() => setRegStep(2)}>Next Step</Button>
                  </div>
                </div>
              )}

              {regStep === 2 && (
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">Final Questions</h3>
                  <p className="text-gray-500 mb-6">Help us tailor the experience for you.</p>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">What do you want to learn?</label>
                      <textarea 
                        className="w-full h-20 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-900 p-3 focus:ring-2 focus:ring-primary outline-none resize-none"
                        value={answers.learnGoals}
                        onChange={e => setAnswers({...answers, learnGoals: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">What can you contribute?</label>
                      <textarea 
                        className="w-full h-20 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-900 p-3 focus:ring-2 focus:ring-primary outline-none resize-none"
                        value={answers.contribute}
                        onChange={e => setAnswers({...answers, contribute: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                    <Button variant="ghost" onClick={() => setRegStep(1)}>Back</Button>
                    <Button variant="primary" onClick={handleRegister}>Complete Registration</Button>
                  </div>
                </div>
              )}

              {regStep === 3 && (
                <div className="p-12 text-center">
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <h3 className="text-3xl font-bold mb-2">You're In!</h3>
                  <p className="text-gray-500">Your spot is confirmed for {meetup.title}.</p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
