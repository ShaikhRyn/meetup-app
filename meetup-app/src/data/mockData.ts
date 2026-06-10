export interface Speaker {
  id: string;
  name: string;
  avatar: string;
  title: string;
  company: string;
  bio: string;
  skills: string[];
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  }
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  profession: string;
  company: string;
  bio: string;
  lookingFor: string;
  interests: string[];
  skills: string[];
  role: 'user' | 'admin';
  joinedAt: string;
}

export interface Meetup {
  id: string;
  title: string;
  description: string;
  bannerUrl: string;
  date: string;
  startTime: string;
  endTime: string;
  venueName: string;
  mapLink: string;
  capacity: number;
  registeredCount: number;
  attendedCount: number;
  organizerId: string;
  tags: string[];
  speakers: Speaker[];
  agenda: AgendaItem[];
  location: {
    address: string;
    city: string;
    country: string;
    coordinates: { lat: number; lng: number };
  }
  averageRating: number;
  totalRatings: number;
  image?: string;
}

export interface AgendaItem {
  id: string;
  time: string;
  title: string;
  speaker?: string;
  description: string;
}

export interface Registration {
  id: string;
  userId: string;
  meetupId: string;
  registeredAt: string;
  checkedIn: boolean;
  checkInTime?: string;
  qrCode?: string;
  ticketNumber?: string;
  answers: {
    whyAttend: string;
    learnGoals: string;
    contribute: string;
  }
}

export interface Feedback {
  id: string;
  registrationId: string;
  userId: string;
  meetupId: string;
  rating: number;
  comment: string;
  categories: {
    content: number;
    organization: number;
    networking: number;
    venue: number;
  }
  createdAt: string;
}

export interface NetworkingMatch {
  userId: string;
  matchScore: number;
  sharedInterests: string[];
  mutualConnections: number;
}

export interface Activity {
  id: string;
  type: 'registration' | 'checkin' | 'feedback' | 'comment';
  userId: string;
  meetupId: string;
  description: string;
  timestamp: string;
}

// Speakers
export const mockSpeakers: Speaker[] = [
  {
    id: 's1',
    name: 'Sarah Chen',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    title: 'Senior Frontend Engineer',
    company: 'Google',
    bio: 'React core contributor and performance enthusiast',
    skills: ['React', 'TypeScript', 'JavaScript', 'Web Performance', 'Next.js'],
    socialLinks: { twitter: '@sarah_chen', linkedin: 'sarah-chen', github: 'sarah-chen' }
  },
  {
    id: 's2',
    name: 'Marcus Johnson',
    avatar: 'https://i.pravatar.cc/150?u=marcus',
    title: 'Design Systems Lead',
    company: 'Adobe',
    bio: 'Building design systems at scale for enterprise',
    skills: ['Figma', 'UI Design', 'Design Systems', 'CSS', 'Framer Motion', 'UI/UX'],
    socialLinks: { twitter: '@marcus_j', linkedin: 'marcus-johnson', github: 'marcus-j' }
  },
  {
    id: 's3',
    name: 'Emma Rodriguez',
    avatar: 'https://i.pravatar.cc/150?u=emma',
    title: 'Full Stack Engineer',
    company: 'Stripe',
    bio: 'Expert in scalable backend architectures',
    skills: ['Node.js', 'Backend', 'Databases', 'Scalability', 'Docker', 'Kubernetes'],
    socialLinks: { twitter: '@emma_rod', linkedin: 'emma-rodriguez', github: 'emma-rod' }
  },
];

// Initial Mock Data
export const mockUsers: User[] = [
  { id: 'u1', name: 'Alice Freeman', email: 'alice@example.com', avatar: 'https://i.pravatar.cc/150?u=alice', profession: 'Frontend Developer', company: 'TechNova', bio: 'Love creating beautiful UIs and exploring new frameworks.', lookingFor: 'Networking and mentorship', interests: ['React', 'JavaScript', 'Web Dev', 'UI/UX'], skills: ['React', 'TypeScript', 'TailwindCSS', 'Vite', 'Next.js', 'JavaScript', 'CSS', 'UI/UX'], role: 'admin', joinedAt: '2024-01-15T00:00:00Z' },
  { id: 'u2', name: 'Bob Smith', email: 'bob@example.com', avatar: 'https://i.pravatar.cc/150?u=bob', profession: 'Product Manager', company: 'Innovate LLC', bio: 'Bridging the gap between engineering and user needs.', lookingFor: 'Hiring developers', interests: ['Product', 'Strategy', 'Leadership', 'UI/UX'], skills: ['Product Management', 'Agile', 'Scrum', 'Product Strategy', 'UI/UX'], role: 'user', joinedAt: '2024-02-10T00:00:00Z' },
  { id: 'u3', name: 'Charlie Davis', email: 'charlie@example.com', avatar: 'https://i.pravatar.cc/150?u=charlie', profession: 'UX Designer', company: 'DesignCo', bio: 'Passionate about accessibility and clean design.', lookingFor: 'Inspiration', interests: ['Design', 'Figma', 'Accessibility', 'CSS', 'UI/UX'], skills: ['Figma', 'UI Design', 'Wireframing', 'User Research', 'Design Systems', 'CSS', 'UI/UX'], role: 'user', joinedAt: '2024-03-05T00:00:00Z' },
  { id: 'u4', name: 'Diana Prince', email: 'diana@example.com', avatar: 'https://i.pravatar.cc/150?u=diana', profession: 'Backend Engineer', company: 'DataSys', bio: 'Scaling systems and optimizing databases.', lookingFor: 'Learning new architectures', interests: ['Backend', 'Node.js', 'Databases', 'DevOps', 'Architecture'], skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Docker', 'GraphQL', 'Backend', 'Architecture'], role: 'user', joinedAt: '2024-04-20T00:00:00Z' },
  { id: 'u5', name: 'David Chen', email: 'david@example.com', avatar: 'https://i.pravatar.cc/150?u=david', profession: 'DevOps Engineer', company: 'CloudTech', bio: 'Infrastructure and deployment specialist', lookingFor: 'Knowledge sharing', interests: ['DevOps', 'Kubernetes', 'Docker', 'CI/CD', 'Architecture'], skills: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD', 'Linux', 'DevOps', 'Architecture'], role: 'user', joinedAt: '2024-05-12T00:00:00Z' },
];

// Mock Meetups with enhanced data
export const mockMeetups: Meetup[] = [
  {
    id: 'm1',
    title: 'Future of Frontend Frameworks 2026',
    description: 'Join us for an evening of deep technical dives into the future of React, Vue, and emerging frameworks. We will discuss server components, edge rendering, and the evolution of the frontend ecosystem. Network with fellow developers and learn from industry experts.',
    bannerUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000',
    date: '2026-07-15',
    startTime: '18:00',
    endTime: '21:00',
    venueName: 'T-Hub, HITEC City, Hyderabad',
    mapLink: 'https://maps.google.com/?q=T-Hub+HITEC+City',
    capacity: 200,
    registeredCount: 156,
    attendedCount: 142,
    organizerId: 'u1',
    tags: ['React', 'Frontend', 'Web Development', 'JavaScript'],
    speakers: [mockSpeakers[0]],
    agenda: [
      { id: 'a1', time: '18:00', title: 'Doors Open & Networking', description: 'Arrive early, grab some food and network with fellow developers' },
      { id: 'a2', time: '18:30', title: 'Opening Keynote: The Future of React', speaker: 'Sarah Chen', description: 'Insights into React 19+ and the direction of frontend development' },
      { id: 'a3', time: '19:15', title: 'Panel Discussion: Framework Wars', speaker: 'Community Panel', description: 'React vs Vue vs Svelte - honest comparison' },
      { id: 'a4', time: '20:00', title: 'Networking & Drinks', description: 'Connect with speakers and fellow attendees' },
    ],
    location: {
      address: 'Gachibowli Rd, Hyderabad',
      city: 'Hyderabad',
      country: 'India',
      coordinates: { lat: 17.3850, lng: 78.4867 }
    },
    averageRating: 4.6,
    totalRatings: 142,
  },
  {
    id: 'm2',
    title: 'Design Systems at Scale',
    description: 'How do large organizations manage their design tokens and components? Come learn from experts who have built design systems for Fortune 500 companies. Discover best practices in building scalable, maintainable design systems.',
    bannerUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=2000',
    date: '2026-08-02',
    startTime: '17:30',
    endTime: '20:00',
    venueName: 'Raheja Mindspace IT Park, Hyderabad',
    mapLink: 'https://maps.google.com/?q=Raheja+Mindspace',
    capacity: 100,
    registeredCount: 87,
    attendedCount: 79,
    organizerId: 'u3',
    tags: ['UX', 'Design Systems', 'Figma', 'Design'],
    speakers: [mockSpeakers[1]],
    agenda: [
      { id: 'a4', time: '17:30', title: 'Registration & Networking', description: 'Check-in and meet fellow designers' },
      { id: 'a5', time: '18:00', title: 'Design Systems at Adobe', speaker: 'Marcus Johnson', description: 'How Adobe scales design across products' },
      { id: 'a6', time: '18:45', title: 'Workshop: Building Your First Design System', speaker: 'Marcus Johnson', description: 'Hands-on workshop' },
      { id: 'a7', time: '19:30', title: 'Q&A & Networking', description: 'Ask your questions and network' },
    ],
    location: {
      address: 'HITEC City, Hyderabad',
      city: 'Hyderabad',
      country: 'India',
      coordinates: { lat: 17.3850, lng: 78.4867 }
    },
    averageRating: 4.7,
    totalRatings: 79,
  },
  {
    id: 'm3',
    title: 'Backend Scalability Workshop',
    description: 'Deep dive into building scalable backend systems. Learn about database optimization, caching strategies, and microservices architecture from industry veterans.',
    bannerUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=2000',
    date: '2026-09-10',
    startTime: '14:00',
    endTime: '17:00',
    venueName: 'Microsoft Tech Hub, Bangalore',
    mapLink: 'https://maps.google.com/?q=Microsoft+Tech+Hub',
    capacity: 150,
    registeredCount: 78,
    attendedCount: 0,
    organizerId: 'u4',
    tags: ['Backend', 'Scalability', 'Databases', 'Architecture'],
    speakers: [mockSpeakers[2]],
    agenda: [
      { id: 'a8', time: '14:00', title: 'Workshop Begins', description: 'Introduction to backend scalability' },
      { id: 'a9', time: '14:30', title: 'Database Optimization', speaker: 'Emma Rodriguez', description: 'Techniques for scaling databases' },
      { id: 'a10', time: '15:15', title: 'Coffee Break', description: 'Networking break' },
      { id: 'a11', time: '15:30', title: 'Microservices Architecture', speaker: 'Emma Rodriguez', description: 'Building systems with microservices' },
    ],
    location: {
      address: 'Whitefield, Bangalore',
      city: 'Bangalore',
      country: 'India',
      coordinates: { lat: 12.9698, lng: 77.7499 }
    },
    averageRating: 4.5,
    totalRatings: 0,
  },
];

export const mockRegistrations: Registration[] = [
  { id: 'r1', userId: 'u2', meetupId: 'm1', registeredAt: '2026-06-01T10:00:00Z', checkedIn: true, checkInTime: '2026-07-15T17:45:00Z', qrCode: 'QR_r1_m1_u2', ticketNumber: 'TKT-001', answers: { whyAttend: 'Networking', learnGoals: 'React Server Components', contribute: 'Experience' } },
  { id: 'r2', userId: 'u3', meetupId: 'm1', registeredAt: '2026-06-05T14:20:00Z', checkedIn: false, qrCode: 'QR_r2_m1_u3', ticketNumber: 'TKT-002', answers: { whyAttend: 'Learning', learnGoals: 'Performance', contribute: 'Questions' } },
  { id: 'r3', userId: 'u4', meetupId: 'm1', registeredAt: '2026-06-10T09:15:00Z', checkedIn: true, checkInTime: '2026-07-15T17:50:00Z', qrCode: 'QR_r3_m1_u4', ticketNumber: 'TKT-003', answers: { whyAttend: 'Learning', learnGoals: 'Architecture', contribute: 'Experience' } },
  { id: 'r4', userId: 'u2', meetupId: 'm2', registeredAt: '2026-07-01T11:00:00Z', checkedIn: true, checkInTime: '2026-08-02T17:15:00Z', qrCode: 'QR_r4_m2_u2', ticketNumber: 'TKT-004', answers: { whyAttend: 'Learning', learnGoals: 'Design Systems', contribute: 'Feedback' } },
  { id: 'r5', userId: 'u5', meetupId: 'm2', registeredAt: '2026-07-05T09:00:00Z', checkedIn: true, checkInTime: '2026-08-02T17:20:00Z', qrCode: 'QR_r5_m2_u5', ticketNumber: 'TKT-005', answers: { whyAttend: 'Networking', learnGoals: 'Design', contribute: 'Questions' } },
];

export const mockFeedback: Feedback[] = [
  { id: 'f1', registrationId: 'r1', userId: 'u2', meetupId: 'm1', rating: 5, comment: 'Excellent event! Sarah\'s talk was insightful and the networking was great.', categories: { content: 5, organization: 5, networking: 5, venue: 4 }, createdAt: '2026-07-16T10:00:00Z' },
  { id: 'f2', registrationId: 'r3', userId: 'u4', meetupId: 'm1', rating: 4, comment: 'Good content, could have more hands-on session.', categories: { content: 4, organization: 4, networking: 4, venue: 5 }, createdAt: '2026-07-17T14:00:00Z' },
  { id: 'f3', registrationId: 'r4', userId: 'u2', meetupId: 'm2', rating: 5, comment: 'Marcus\'s workshop was incredibly valuable. Highly recommended!', categories: { content: 5, organization: 5, networking: 4, venue: 5 }, createdAt: '2026-08-03T11:00:00Z' },
  { id: 'f4', registrationId: 'r5', userId: 'u5', meetupId: 'm2', rating: 4, comment: 'Great event, small venue but cozy and productive.', categories: { content: 4, organization: 5, networking: 5, venue: 4 }, createdAt: '2026-08-04T09:30:00Z' },
];

export const mockActivities: Activity[] = [
  { id: 'act1', type: 'registration', userId: 'u2', meetupId: 'm1', description: 'Bob Smith registered for Future of Frontend Frameworks', timestamp: '2026-06-01T10:00:00Z' },
  { id: 'act2', type: 'registration', userId: 'u3', meetupId: 'm1', description: 'Charlie Davis registered for Future of Frontend Frameworks', timestamp: '2026-06-05T14:20:00Z' },
  { id: 'act3', type: 'checkin', userId: 'u2', meetupId: 'm1', description: 'Bob Smith checked in to the event', timestamp: '2026-07-15T17:45:00Z' },
  { id: 'act4', type: 'feedback', userId: 'u2', meetupId: 'm1', description: 'Bob Smith left 5-star feedback', timestamp: '2026-07-16T10:00:00Z' },
  { id: 'act5', type: 'registration', userId: 'u4', meetupId: 'm3', description: 'Diana Prince registered for Backend Scalability Workshop', timestamp: '2026-08-15T09:00:00Z' },
];
