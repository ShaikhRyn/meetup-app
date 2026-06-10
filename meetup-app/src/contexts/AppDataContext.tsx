import { createContext, useContext, useState, ReactNode } from 'react';
import { Meetup, Registration, User, mockMeetups, mockRegistrations, mockUsers, Feedback, mockFeedback, Activity, mockActivities } from '../data/mockData';
import { useAuth } from './AuthContext';

interface AppDataContextType {
  meetups: Meetup[];
  users: User[];
  registrations: Registration[];
  feedback: Feedback[];
  activities: Activity[];
  registerForMeetup: (meetupId: string, answers: Registration['answers']) => void;
  checkInToMeetup: (registrationId: string) => void;
  createMeetup: (meetup: Omit<Meetup, 'id'>) => void;
  editMeetup: (id: string, meetup: Partial<Meetup>) => void;
  deleteMeetup: (id: string) => void;
  addFeedback: (feedback: Omit<Feedback, 'id'>) => void;
  getRegisteredMeetups: (userId: string) => Meetup[];
  getAttendedMeetups: (userId: string) => Meetup[];
  getRecommendedMeetups: (userId: string) => Meetup[];
  getNetworkingMatches: (userId: string) => User[];
  getMeetupAnalytics: (meetupId: string) => any;
  getRecentActivities: (meetupId?: string) => Activity[];
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const { user: authUser } = useAuth();
  const [meetups, setMeetups] = useState<Meetup[]>(mockMeetups);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [registrations, setRegistrations] = useState<Registration[]>(mockRegistrations);
  const [feedback, setFeedback] = useState<Feedback[]>(mockFeedback);
  const [activities, setActivities] = useState<Activity[]>(mockActivities);

  const registerForMeetup = (meetupId: string, answers: Registration['answers']) => {
    if (!authUser) return;
    
    const newReg: Registration = {
      id: `r${Date.now()}`,
      userId: authUser.id,
      meetupId,
      registeredAt: new Date().toISOString(),
      checkedIn: false,
      qrCode: `QR_${Date.now()}_${meetupId}_${authUser.id}`,
      ticketNumber: `TKT-${String(registrations.length + 1).padStart(3, '0')}`,
      answers
    };
    setRegistrations([...registrations, newReg]);
    
    // Update meetup registration count
    setMeetups(meetups.map(m => 
      m.id === meetupId 
        ? { ...m, registeredCount: m.registeredCount + 1 }
        : m
    ));

    // Add activity
    const newActivity: Activity = {
      id: `act${Date.now()}`,
      type: 'registration',
      userId: authUser.id,
      meetupId,
      description: `${authUser.name} registered for an event`,
      timestamp: new Date().toISOString()
    };
    setActivities([...activities, newActivity]);
  };

  const checkInToMeetup = (registrationId: string) => {
    setRegistrations(regs => {
      const updated = regs.map(r => 
        r.id === registrationId 
          ? { ...r, checkedIn: true, checkInTime: new Date().toISOString() } 
          : r
      );

      const reg = updated.find(r => r.id === registrationId);
      if (reg && authUser) {
        // Update meetup attendance count
        setMeetups(meetups.map(m => 
          m.id === reg.meetupId
            ? { ...m, attendedCount: m.attendedCount + 1 }
            : m
        ));

        // Add activity
        const newActivity: Activity = {
          id: `act${Date.now()}`,
          type: 'checkin',
          userId: reg.userId,
          meetupId: reg.meetupId,
          description: `Checked in to event`,
          timestamp: new Date().toISOString()
        };
        setActivities(prev => [...prev, newActivity]);
      }

      return updated;
    });
  };

  const createMeetup = (meetupData: Omit<Meetup, 'id'>) => {
    const newMeetup: Meetup = {
      ...meetupData,
      id: `m${Date.now()}`
    };
    setMeetups([...meetups, newMeetup]);
  };

  const editMeetup = (id: string, meetupData: Partial<Meetup>) => {
    setMeetups(meetups.map(m => 
      m.id === id ? { ...m, ...meetupData } : m
    ));
  };

  const deleteMeetup = (id: string) => {
    setMeetups(meetups.filter(m => m.id !== id));
  };

  const addFeedback = (feedbackData: Omit<Feedback, 'id'>) => {
    const newFeedback: Feedback = {
      ...feedbackData,
      id: `f${Date.now()}`
    };
    setFeedback([...feedback, newFeedback]);

    // Update meetup rating
    const meetupId = feedbackData.meetupId;
    const meetupFeedback = [...feedback, newFeedback].filter(f => f.meetupId === meetupId);
    const avgRating = meetupFeedback.reduce((sum, f) => sum + f.rating, 0) / meetupFeedback.length;
    
    setMeetups(meetups.map(m => 
      m.id === meetupId
        ? { ...m, averageRating: avgRating, totalRatings: meetupFeedback.length }
        : m
    ));

    // Add activity
    if (authUser) {
      const newActivity: Activity = {
        id: `act${Date.now()}`,
        type: 'feedback',
        userId: authUser.id,
        meetupId,
        description: `Left ${feedbackData.rating}-star feedback`,
        timestamp: new Date().toISOString()
      };
      setActivities(prev => [...prev, newActivity]);
    }
  };

  const getRegisteredMeetups = (userId: string): Meetup[] => {
    const registeredIds = registrations
      .filter(r => r.userId === userId)
      .map(r => r.meetupId);
    return meetups.filter(m => registeredIds.includes(m.id));
  };

  const getAttendedMeetups = (userId: string): Meetup[] => {
    const attendedIds = registrations
      .filter(r => r.userId === userId && r.checkedIn)
      .map(r => r.meetupId);
    return meetups.filter(m => attendedIds.includes(m.id));
  };

  const getRecommendedMeetups = (userId: string): Meetup[] => {
    const user = users.find(u => u.id === userId);
    if (!user) return [];

    const registered = getRegisteredMeetups(userId).map(m => m.id);
    return meetups
      .filter(m => !registered.includes(m.id))
      .filter(m => m.tags.some(tag => user.interests.includes(tag)))
      .sort((a, b) => b.registeredCount - a.registeredCount)
      .slice(0, 5);
  };

  const getNetworkingMatches = (userId: string): User[] => {
    const user = users.find(u => u.id === userId);
    if (!user) return [];

    const userRegistrations = registrations.filter(r => r.userId === userId).map(r => r.meetupId);
    
    return users
      .filter(u => u.id !== userId)
      .map(u => {
        const userRegs = registrations.filter(r => r.userId === u.id).map(r => r.meetupId);
        const commonMeetups = userRegistrations.filter(m => userRegs.includes(m)).length;
        const sharedInterests = user.interests.filter(i => u.interests.includes(i));
        const sharedSkills = (user.skills || []).filter(s => (u.skills || []).includes(s));
        
        // Calculate score based on shared skills, interests, and meetups
        const skillWeight = sharedSkills.length * 30;
        const interestWeight = sharedInterests.length * 15;
        const meetupWeight = commonMeetups * 15;
        
        // Generate a stable, name-specific base score so compatibility is diverse and not flat
        const nameHash = u.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const dynamicBase = 35 + (nameHash % 25); // value between 35 and 59
        
        const rawScore = dynamicBase + skillWeight + interestWeight + meetupWeight;
        const matchScore = Math.min(rawScore, 98); // Bound up to 98% match
        
        return { 
          ...u, 
          matchScore, 
          sharedInterests, 
          sharedSkills 
        } as User & { matchScore: number; sharedInterests: string[]; sharedSkills: string[] };
      })
      .sort((a, b) => (b as any).matchScore - (a as any).matchScore)
      .slice(0, 5) as User[];
  };

  const getMeetupAnalytics = (meetupId: string) => {
    const meetup = meetups.find(m => m.id === meetupId);
    if (!meetup) return null;

    const meetupRegs = registrations.filter(r => r.meetupId === meetupId);
    const meetupFeedback = feedback.filter(f => f.meetupId === meetupId);

    return {
      totalRegistrations: meetupRegs.length,
      totalAttended: meetupRegs.filter(r => r.checkedIn).length,
      attendanceRate: ((meetupRegs.filter(r => r.checkedIn).length / meetupRegs.length) * 100).toFixed(1),
      totalFeedback: meetupFeedback.length,
      averageRating: meetup.averageRating,
      avgContentRating: (meetupFeedback.reduce((sum, f) => sum + f.categories.content, 0) / meetupFeedback.length || 0).toFixed(1),
      avgOrganizationRating: (meetupFeedback.reduce((sum, f) => sum + f.categories.organization, 0) / meetupFeedback.length || 0).toFixed(1),
      avgNetworkingRating: (meetupFeedback.reduce((sum, f) => sum + f.categories.networking, 0) / meetupFeedback.length || 0).toFixed(1),
      avgVenueRating: (meetupFeedback.reduce((sum, f) => sum + f.categories.venue, 0) / meetupFeedback.length || 0).toFixed(1),
    };
  };

  const getRecentActivities = (meetupId?: string): Activity[] => {
    let filtered = activities;
    if (meetupId) {
      filtered = activities.filter(a => a.meetupId === meetupId);
    }
    return filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  };

  return (
    <AppDataContext.Provider value={{
      meetups,
      users,
      registrations,
      feedback,
      activities,
      registerForMeetup,
      checkInToMeetup,
      createMeetup,
      editMeetup,
      deleteMeetup,
      addFeedback,
      getRegisteredMeetups,
      getAttendedMeetups,
      getRecommendedMeetups,
      getNetworkingMatches,
      getMeetupAnalytics,
      getRecentActivities,
    }}>
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (context === undefined) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
}
