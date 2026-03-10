import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Mail, Lock, CreditCard, Bell, 
  Film, Clock, Star, Award, TrendingUp,
  Edit2, Upload, CheckCircle, PlayCircle
} from 'lucide-react';

const ProfileBanner= ({ user }) => {
 const [isHovered, setIsHovered] = useState(false);
 const [uploading, setUploading] = useState(false);

const handleAvatarUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setUploading(true);
   // TODO: Implement actual avatar upload to backend
   // const formData = new FormData();
   // formData.append('avatar', file);
   // await axios.put('http://localhost:5000/api/user/avatar', formData);
  setUploading(false);
 };

 if (!user) return null;

 return (
    <motion.div
     initial={{ opacity: 0, y: -50 }}
     animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
     className="relative h-[400px] md:h-[500px] rounded-b-3xl overflow-hidden"
    >
      {/* Background with Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/30 via-purple-600/30 to-pink-600/30" />
      
      {/* Animated Background Pattern */}
      <div
        className="absolute inset-0 opacity-20"
      style={{
         backgroundImage: `
          linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
       }}
      />

      {/* Glowing Orbs */}
      <motion.div
       animate={{
         scale: [1, 1.3, 1],
         opacity: [0.3, 0.5, 0.3]
       }}
       transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/30 rounded-full blur-3xl"
      />
      
      <motion.div
       animate={{
         scale: [1, 1.3, 1],
         opacity: [0.2, 0.4, 0.2]
       }}
       transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
      />

      {/* Content Container */}
      <div className="relative h-full max-w-7xl mx-auto px-4 md:px-8 flex items-end pb-12">
        
        {/* Avatar Section */}
       <motion.div
         initial={{ scale: 0.8, opacity: 0 }}
         animate={{ scale: 1, opacity: 1 }}
         transition={{ delay: 0.3, duration: 0.5 }}
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
          className="relative mr-8"
        >
          {/* Glow Effect */}
         <div className={`absolute inset-0 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 rounded-full blur-2xl transition-opacity duration-500 ${isHovered ? 'opacity-80' : 'opacity-40'}`} />
          
          {/* Avatar Image */}
         <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-white/20 overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm">
           {uploading ? (
             <div className="w-full h-full flex items-center justify-center bg-black/50">
               <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
             </div>
           ) : (
             <>
               <img
                 src={user.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name) + '&background=6366f1&color=fff'}
                  alt={user.name}
                  className="w-full h-full object-cover"
               />
               
               {/* Hover Overlay with Upload */}
              <label className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer bg-black/50 backdrop-blur-sm">
                <Upload className="w-8 h-8 text-white" />
                <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
              </label>
             </>
           )}
         </div>

          {/* Online Status */}
         <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-[#0a0a1a]" />
        </motion.div>

        {/* User Info */}
        <div className="flex-1 mb-8">
         <motion.div
           initial={{ x: -50, opacity: 0 }}
           animate={{ x: 0, opacity: 1 }}
           transition={{ delay: 0.5 }}
         >
           <div className="flex items-center gap-3 mb-3">
             <h1 className="text-4xl md:text-6xl font-black text-white drop-shadow-2xl">{user.name}</h1>
             <CheckCircle className="w-8 h-8 text-cyan-400 fill-cyan-400/20" />
           </div>
           
           {/* Membership Badge */}
          <motion.div
             whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-400/50 rounded-full backdrop-blur-md mb-4"
           >
             <Star className="w-4 h-4 text-purple-400 fill-purple-400" />
             <span className="text-sm font-bold text-purple-100 uppercase tracking-wider">{user.plan} Plan</span>
           </motion.div>

           {/* Member Since */}
           <p className="text-gray-300 text-lg mb-6">
             Member since {new Date(user.memberSince).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
           </p>

           {/* Quick Stats */}
           <div className="flex gap-6">
             <StatBadge icon={Film} value={user.totalWatched} label="Videos Watched" color="cyan" />
             <StatBadge icon={Clock} value={`${user.hoursWatched}h`} label="Hours Watched" color="purple" />
             <StatBadge icon={Star} value={user.favorites} label="Favorites" color="pink" />
           </div>
         </motion.div>
        </div>

        {/* Edit Profile Button */}
       <motion.button
         initial={{ opacity: 0, scale: 0.8 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ delay: 0.7 }}
         whileHover={{ scale: 1.1 }}
         whileTap={{ scale: 0.95 }}
          className="mb-8 px-8 py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl font-bold text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all"
        >
         <Edit2 className="w-5 h-5 inline mr-2" />
         Edit Profile
        </motion.button>
      </div>
    </motion.div>
  );
};

const StatBadge = ({ icon: Icon, value, label, color }) => {
 const colorClasses = {
   cyan: 'from-cyan-500 to-blue-500',
    purple: 'from-purple-500 to-pink-500',
    pink: 'from-pink-500 to-red-500',
 };

 return (
   <motion.div
     whileHover={{ y: -5, scale: 1.05 }}
      className="flex items-center gap-3 px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl"
   >
     <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center`}>
       <Icon className="w-5 h-5 text-white" />
     </div>
     <div>
       <p className="text-xl font-bold text-white">{value}</p>
       <p className="text-xs text-gray-400">{label}</p>
     </div>
   </motion.div>
 );
};

export default ProfileBanner;
