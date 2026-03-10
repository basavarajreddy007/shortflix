import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Film, Star, Award, TrendingUp, Calendar, Zap } from 'lucide-react';

const ProfileStats = ({ stats }) => {
 const [animatedValue, setAnimatedValue] = useState(0);

 // Animate counter on mount
 React.useEffect(() => {
   if (!stats?.hoursWatched) return;
   
 const duration = 2000;
  const steps = 60;
  const increment = stats.hoursWatched / steps;
   let current = 0;

 const timer= setInterval(() => {
     current += increment;
      if (current >= stats.hoursWatched) {
       current = stats.hoursWatched;
        clearInterval(timer);
      }
   setAnimatedValue(current.toFixed(1));
    }, duration / steps);

 return () => clearInterval(timer);
 }, [stats?.hoursWatched]);

 if (!stats) return null;

 const statCards = [
   {
    icon: Clock,
     label: 'Hours Watched',
     value: `${animatedValue}h`,
     gradient: 'from-cyan-500 to-blue-500',
     bgGradient: 'from-cyan-500/10 to-blue-500/10',
   },
   {
    icon: Film,
     label: 'Videos Watched',
     value: stats.totalWatched,
     gradient: 'from-purple-500 to-pink-500',
     bgGradient: 'from-purple-500/10 to-pink-500/10',
   },
   {
    icon: Star,
     label: 'Favorites',
     value: stats.favorites,
     gradient: 'from-pink-500 to-red-500',
     bgGradient: 'from-pink-500/10 to-red-500/10',
   },
   {
    icon: Award,
     label: 'Achievements',
     value: stats.achievements,
     gradient: 'from-amber-500 to-orange-500',
     bgGradient: 'from-amber-500/10 to-orange-500/10',
   },
 ];

 return (
   <div className="px-4 md:px-8 py-12">
     {/* Section Header */}
     <motion.div
       initial={{ opacity: 0, y: -30 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true }}
       className="mb-8"
     >
       <h2 className="text-3xl md:text-4xl font-black text-white mb-3 flex items-center gap-3">
         <Zap className="w-8 h-8 text-cyan-400 fill-cyan-400/20" />
         <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
           Your Statistics
         </span>
       </h2>
       <div className="flex items-center gap-3">
         <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full" />
         <div className="w-2 h-2 bg-purple-500 rounded-full animate-ping" />
         <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent" />
       </div>
     </motion.div>

     {/* Stats Grid */}
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {statCards.map((card, index) => (
         <StatCard key={index} card={card} index={index} />
        ))}
     </div>

     {/* Detailed Stats */}
     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
       {/* Favorite Genres */}
      <motion.div
         initial={{ opacity: 0, x: -50 }}
         whileInView={{ opacity: 1, x: 0 }}
         viewport={{ once: true }}
          className="bg-gradient-to-br from-white/5 via-white/5 to-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6"
       >
         <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
           <Film className="w-5 h-5 text-purple-400" />
           Favorite Genres
         </h3>
         
         <div className="space-y-4">
          {stats.favoriteGenres.map((genre, index) => (
             <GenreBar key={index} genre={genre} index={index} />
            ))}
         </div>
       </motion.div>

       {/* Recently Watched Categories */}
      <motion.div
         initial={{ opacity: 0, x: 50 }}
         whileInView={{ opacity: 1, x: 0 }}
         viewport={{ once: true }}
          className="bg-gradient-to-br from-white/5 via-white/5 to-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6"
       >
         <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
           <TrendingUp className="w-5 h-5 text-pink-400" />
           Recently Watched Categories
         </h3>
         
         <div className="flex flex-wrap gap-3">
          {stats.recentCategories.map((category, index) => (
             <CategoryBadge key={index} category={category} index={index} />
            ))}
         </div>
       </motion.div>

       {/* Achievements */}
      <motion.div
         initial={{ opacity: 0, y: 50 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-gradient-to-br from-white/5 via-white/5 to-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6"
       >
         <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
           <Award className="w-5 h-5 text-amber-400" />
           Recent Achievements
         </h3>
         
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.achievementsList.map((achievement, index) => (
             <AchievementCard key={index} achievement={achievement} index={index} />
            ))}
         </div>
       </motion.div>
     </div>
   </div>
 );
};

const StatCard = ({ card, index }) => {
 return (
   <motion.div
     initial={{ opacity: 0, y: 50 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     transition={{ delay: index * 0.1 }}
     whileHover={{ y: -10, scale: 1.05 }}
      className="relative group"
   >
     {/* Glow Effect */}
     <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
     
     {/* Card */}
     <div className={`relative bg-gradient-to-br ${card.bgGradient} backdrop-blur-md border border-white/10 rounded-2xl p-6 overflow-hidden`}>
       
       {/* Icon */}
       <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-4 shadow-lg`}>
         <card.icon className="w-7 h-7 text-white" />
       </div>

       {/* Value */}
       <p className="text-4xl font-black text-white mb-2">{card.value}</p>
       <p className="text-sm text-gray-400 font-medium">{card.label}</p>

       {/* Decorative Gradient Line */}
       <div className={`mt-4 h-1 bg-gradient-to-r ${card.gradient} rounded-full opacity-50`} />
     </div>
   </motion.div>
 );
};

const GenreBar = ({ genre, index }) => {
 return (
   <motion.div
     initial={{ opacity: 0, x: -20 }}
     whileInView={{ opacity: 1, x: 0 }}
     viewport={{ once: true }}
     transition={{ delay: index * 0.1 }}
      className="space-y-2"
   >
     <div className="flex justify-between text-sm">
       <span className="text-gray-300 font-medium">{genre.name}</span>
       <span className="text-gray-400">{genre.count} videos</span>
     </div>
     <div className="h-2 bg-white/5 rounded-full overflow-hidden">
       <motion.div
         initial={{ width: 0 }}
         whileInView={{ width: `${genre.percentage}%` }}
         viewport={{ once: true }}
         transition={{ duration: 1, delay: index * 0.1 }}
          className={`h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full`}
       />
     </div>
   </motion.div>
 );
};

const CategoryBadge = ({ category, index }) => {
 return (
   <motion.div
     initial={{ opacity: 0, scale: 0.8 }}
     whileInView={{ opacity: 1, scale: 1 }}
     viewport={{ once: true }}
     transition={{ delay: index * 0.05 }}
     whileHover={{ scale: 1.1 }}
      className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 border border-white/10 rounded-full cursor-pointer hover:border-cyan-400/50 transition-all"
   >
     <span className="text-sm font-semibold text-cyan-100">{category}</span>
   </motion.div>
 );
};

const AchievementCard = ({ achievement, index }) => {
 return (
   <motion.div
     initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     transition={{ delay: index * 0.1 }}
     whileHover={{ y: -5, scale: 1.05 }}
      className="group cursor-pointer"
   >
     <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all">
       <div className="flex items-center gap-3 mb-2">
         <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
           <achievement.icon className="w-5 h-5 text-white" />
         </div>
         <div>
           <p className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">{achievement.title}</p>
           <p className="text-xs text-gray-400">{achievement.date}</p>
         </div>
       </div>
       <p className="text-xs text-gray-400">{achievement.description}</p>
     </div>
   </motion.div>
 );
};

export default ProfileStats;
