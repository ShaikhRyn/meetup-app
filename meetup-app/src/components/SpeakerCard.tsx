import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { Speaker } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

interface SpeakerCardProps {
  speaker: Speaker;
}

export function SpeakerCard({ speaker }: SpeakerCardProps) {
  const { user } = useAuth();
  
  // Compute match score and shared skills if a user is logged in
  let matchPercentage = 0;
  let sharedSkills: string[] = [];
  
  if (user) {
    const userSkills = user.skills || [];
    const userInterests = user.interests || [];
    const speakerSkills = speaker.skills || [];
    
    sharedSkills = speakerSkills.filter(
      skill => userSkills.includes(skill) || userInterests.includes(skill)
    );
    
    if (sharedSkills.length > 0) {
      matchPercentage = Math.min(sharedSkills.length * 30, 98);
    } else {
      const isTechProfessional = ['developer', 'engineer', 'architect', 'designer'].some(
        prof => user.profession.toLowerCase().includes(prof)
      );
      matchPercentage = isTechProfessional ? 25 : 15;
    }
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group surface rounded-2xl overflow-hidden shadow-card card-hover"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden saffron-gradient">
        <img
          src={speaker.avatar}
          alt={speaker.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{speaker.name}</h3>
        <p className="text-sm text-orange-500 dark:text-orange-400 font-semibold">{speaker.title}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{speaker.company}</p>

        {/* Match score badge */}
        {user && (
          <div className="mt-3 flex flex-col gap-1 bg-orange-500/5 dark:bg-orange-500/10 border border-orange-500/10 rounded-xl p-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-wider">Speaker Match</span>
              <span className="text-xs font-black text-orange-600 dark:text-orange-400">{matchPercentage}% Match</span>
            </div>
            {sharedSkills.length > 0 ? (
              <p className="text-[9px] text-gray-500 dark:text-gray-400 leading-tight">
                You both share interest in: <strong className="text-orange-500 dark:text-orange-400 font-semibold">{sharedSkills.join(', ')}</strong>
              </p>
            ) : (
              <p className="text-[9px] text-gray-400 dark:text-gray-500 leading-tight">
                Connect to learn about {speaker.skills.slice(0, 2).join(' & ')}
              </p>
            )}
          </div>
        )}

        {/* Bio */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 line-clamp-2">
          {speaker.bio}
        </p>

        {/* Social Links */}
        <div className="flex gap-2 mt-4">
          {speaker.socialLinks.twitter && (
            <a
              href={`https://twitter.com/${speaker.socialLinks.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition"
            >
              <Twitter className="w-4 h-4" />
            </a>
          )}
          {speaker.socialLinks.linkedin && (
            <a
              href={`https://linkedin.com/in/${speaker.socialLinks.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-600 transition"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
          {speaker.socialLinks.github && (
            <a
              href={`https://github.com/${speaker.socialLinks.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
