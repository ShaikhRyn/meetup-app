import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  lightText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  tagline?: string;
}

export function Logo({ className = '', iconOnly = false, lightText = false, size = 'md', tagline = 'Connect & Grow' }: LogoProps) {
  // Size-specific mappings
  const containerSizes = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-9 h-9 rounded-xl',
    lg: 'w-12 h-12 rounded-2xl'
  };

  const svgSizes = {
    sm: 'w-4.5 h-4.5',
    md: 'w-5.5 h-5.5',
    lg: 'w-7.5 h-7.5'
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-xl'
  };

  const tagSizes = {
    sm: 'text-[8px]',
    md: 'text-[10px]',
    lg: 'text-xs'
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Minimalistic Connection Icon Container */}
      <div className={`${containerSizes[size]} saffron-gradient flex items-center justify-center flex-shrink-0 shadow-md`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`${svgSizes[size]} text-white`}
        >
          {/* Overlapping nodes / intersecting circles representing connection/meetup */}
          <circle cx="8.5" cy="12" r="3.5" />
          <circle cx="15.5" cy="12" r="3.5" />
          <line x1="8.5" y1="12" x2="15.5" y2="12" />
        </svg>
      </div>
      
      {/* Minimal Brand Name Text */}
      {!iconOnly && (
        <div className="min-w-0 text-left">
          <p className={`font-extrabold ${textSizes[size]} leading-tight tracking-tight ${lightText ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
            MeetUp <span className={`${lightText ? 'text-orange-400' : 'text-orange-500'} font-black`}>India</span>
          </p>
          <p className={`${tagSizes[size]} font-semibold uppercase tracking-widest leading-none mt-0.5 ${lightText ? 'text-white/60' : 'text-gray-500 dark:text-gray-400'}`}>
            {tagline}
          </p>
        </div>
      )}
    </div>
  );
}
