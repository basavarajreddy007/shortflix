import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Bell, Clock, Play, Star } from 'lucide-react';

const UpcomingReleases = () => {
  // Mock upcoming releases data
 const upcomingReleases = [
    {
   id:1,
     title: 'Quantum Paradox',
    releaseDate: new Date(Date.now() +7 * 24 * 60 * 60 * 1000), // 7 days from now
    color: 'from-cyan-500 to-blue-500',
    genre: 'Sci-Fi',
     description: 'A mind-bending journey through parallel universes where time itself is the enemy.',
    },
    {
   id: 2,
     title: 'Neural Dawn',
    releaseDate: new Date(Date.now() +14 * 24 * 60 * 60 * 1000), // 14 days from now
    color: 'from-purple-500 to-pink-500',
    genre: 'Thriller',
     description: 'AI consciousness emerges, and humanity must decide its fate.',
    },
    {
   id: 3,
     title: 'Stellar Horizon',
    releaseDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 21 days from now
    color: 'from-pink-500 to-red-500',
    genre: 'Adventure',
     description: 'The first interstellar voyage discovers a secret that could change everything.',
    },
  ];

 return (
    <div className="relative px-4 md:px-8 py-16 overflow-hidden bg-gradient-to-b from-netflix-black to-[#0f0f1f]">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
       <div
          className="absolute inset-0"
       style={{
           backgroundImage: `
            linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
         }}
        />
      </div>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
       whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg mb-3">
          Coming Soon
        </h2>
        <p className="text-gray-400 text-lg">Exciting content releasing soon</p>
        
        {/* Decorative Line */}
        <div className="flex items-center gap-3 mt-4">
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
          <div className="w-2 h-2 bg-pink-500 rounded-full animate-ping" />
          <div className="flex-1 h-px bg-gradient-to-r from-pink-500/50 to-transparent" />
        </div>
      </motion.div>

      {/* Releases Grid */}
      <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8">
       {upcomingReleases.map((release, index) => (
         <ReleaseCard key={release.id} release={release} index={index} />
        ))}
      </div>
    </div>
  );
};

const ReleaseCard = ({ release, index }) => {
 const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(release.releaseDate));

  useEffect(() => {
  const timer= setInterval(() => {
     setTimeLeft(calculateTimeLeft(release.releaseDate));
    }, 1000);

  return () => clearInterval(timer);
  }, [release.releaseDate]);

 return (
    <motion.div
     initial={{ opacity: 0, y: 50 }}
     whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.8 }}
     whileHover={{ y: -10, scale: 1.02 }}
      className="group relative"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Card Container */}
      <div className="relative bg-gradient-to-br from-white/5 via-white/5 to-white/10 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
        
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
         {/* Gradient Placeholder */}
         <div className={`w-full h-full bg-gradient-to-br ${release.color}`} />
          
          {/* Badge */}
          <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-500/90 to-pink-500/90 rounded-full backdrop-blur-md shadow-lg">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-bold text-white">Coming Soon</span>
          </div>

          {/* Play Trailer Button */}
         <motion.button
           initial={{ opacity: 0, scale: 0.8 }}
           whileHover={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center hover:bg-white/30 transition-all">
             <Play className="w-7 h-7 fill-white text-white ml-1" />
            </div>
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <h3 className="text-2xl font-bold text-white mb-2">{release.title}</h3>
          
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>{formatDate(release.releaseDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-400" />
              <span>{release.genre}</span>
            </div>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed">{release.description}</p>

          {/* Countdown Timer */}
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-pink-400" />
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Countdown</span>
            </div>
            
            <div className="grid grid-cols-4 gap-3">
              <CountdownBox value={timeLeft.days} label="Days" />
              <CountdownBox value={timeLeft.hours} label="Hours" />
              <CountdownBox value={timeLeft.minutes} label="Minutes" />
              <CountdownBox value={timeLeft.seconds} label="Seconds" color="pink" />
            </div>
          </div>

          {/* Reminder Button */}
         <motion.button
           whileHover={{ scale: 1.05 }}
           whileTap={{ scale: 0.95 }}
            className="w-full py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-xl font-bold text-white flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/30 transition-all"
          >
            <Bell className="w-5 h-5" />
            <span>Set Reminder</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const CountdownBox = ({ value, label, color = 'cyan' }) => {
 const colorClasses = {
   cyan: 'from-cyan-500 to-blue-500',
    purple: 'from-purple-500 to-pink-500',
    pink: 'from-pink-500 to-red-500',
  };

 return (
    <div className="text-center">
      <div className={`bg-gradient-to-br ${colorClasses[color]} rounded-lg p-3 mb-2 shadow-lg`}>
        <span className="text-2xl font-black text-white">{String(value).padStart(2, '0')}</span>
      </div>
      <p className="text-xs text-gray-400 font-medium">{label}</p>
    </div>
  );
};

// Helper functions
function calculateTimeLeft(targetDate) {
 const difference = +targetDate - +new Date();
  
  if (difference <= 0) {
  return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

 return {
   days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference/ 1000 / 60) % 60),
   seconds: Math.floor((difference/ 1000) % 60),
  };
}

function formatDate(date) {
 return date.toLocaleDateString('en-US', { 
   month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
 });
}

export default UpcomingReleases;
