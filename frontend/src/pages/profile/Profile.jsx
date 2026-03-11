import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../utils/api';
import Navbar from '../../components/layout/Navbar';
import ProfileBanner from './ProfileBanner';
import ProfileStats from './ProfileStats';
import ProfileSettings from './ProfileSettings';
import MovieCard from '../../components/movie/MovieCard';
import { Play, User } from 'lucide-react';

const Profile = () => {
 const [activeSection, setActiveSection] = useState('overview');
 const [loading, setLoading] = useState(true);
 const [userData, setUserData] = useState(null);
 
  useEffect(() => {
 const fetchUserData = async () => {
     try {
  setLoading(true);
       // Fetch user profile data from backend
   const response = await api.get('/api/user/profile');
  setUserData(response.data);
  setLoading(false);
     } catch (error) {
  console.error('Error fetching profile data:', error);
    
    // TEMPORARY FALLBACK - Remove this once backend is ready
  setUserData({
     user: {
      _id: '1',
       name: 'Current User',
       email: 'user@example.com',
       avatar: null,
       plan: 'Premium',
       memberSince: new Date().toISOString(),
       totalWatched: 0,
       hoursWatched: 0,
       favorites: 0,
     },
     stats: {
      hoursWatched: 0,
      totalWatched: 0,
      favorites: 0,
      achievements: 0,
      favoriteGenres: [],
    recentCategories: [],
      achievementsList: [],
     },
   continueWatching: [],
   watchHistory: [],
     myList: [],
   recommended: [],
    });
    
  setLoading(false);
     }
   };

   fetchUserData();
 }, []);

const sections = [
   { id: 'overview', label: 'Overview' },
   { id: 'continue-watching', label: 'Continue Watching' },
   { id: 'history', label: 'Watch History' },
   { id: 'my-list', label: 'My List' },
   { id: 'recommended', label: 'Recommended' },
   { id: 'settings', label: 'Settings' },
 ];

 if (loading) {
 return (
     <div className="min-h-screen bg-netflix-black flex items-center justify-center">
       <motion.div
         initial={{ opacity: 0, scale: 0.8 }}
         animate={{ opacity: 1, scale:1 }}
         className="text-center"
       >
         <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4" />
         <p className="text-gray-400">Loading your profile...</p>
       </motion.div>
     </div>
   );
 }

 if (!userData || !userData.user) {
 return (
     <div className="min-h-screen bg-netflix-black flex items-center justify-center">
       <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         className="text-center max-w-md px-4"
       >
         <div className="w-20 h-20 rounded-full bg-red-500/10 border-2 border-red-500/30 flex items-center justify-center mx-auto mb-4">
           <User className="w-10 h-10 text-red-500" />
         </div>
         <h2 className="text-2xl font-bold text-white mb-2">Profile Not Found</h2>
         <p className="text-gray-400 mb-6">Unable to load your profile. Please try logging in again.</p>
         <motion.button
           whileHover={{ scale: 1.05 }}
           onClick={() => window.location.href = '/login'}
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-bold text-white"
         >
           Go to Login
         </motion.button>
       </motion.div>
     </div>
   );
 }

 return (
   <div className="min-h-screen bg-gradient-to-b from-[#0a0a1a] via-[#0f0f1f] to-netflix-black">
     <Navbar />

     {/* Profile Banner */}
     <ProfileBanner user={userData.user} />

     {/* Section Navigation */}
     <div className="sticky top-0 z-50 bg-[#0a0a1a]/95 backdrop-blur-md border-b border-white/10 py-4 mt-4">
       <div className="max-w-7xl mx-auto px-4 md:px-8">
         <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
          {sections.map((section) => (
             <motion.button
               key={section.id}
               onClick={() => setActiveSection(section.id)}
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                 activeSection === section.id
                   ? 'bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                   : 'text-gray-400 hover:text-white hover:bg-white/10'
               }`}
             >
               {section.label}
             </motion.button>
            ))}
         </div>
       </div>
     </div>

     {/* Content Area */}
     <div className="max-w-7xl mx-auto pb-20">
      {activeSection === 'overview' && (
         <>
           <ProfileStats stats={userData.stats} />
           
           {/* Quick Access Sections */}
           <ContinueWatching videos={userData.continueWatching} />
           <MyList videos={userData.myList} />
           <Recommended videos={userData.recommended} />
         </>
        )}

      {activeSection === 'continue-watching' && (
         <ContinueWatching videos={userData.continueWatching} />
        )}

      {activeSection === 'history' && (
         <WatchHistory videos={userData.watchHistory} />
        )}

      {activeSection === 'my-list' && (
         <MyList videos={userData.myList} />
        )}

      {activeSection === 'recommended' && (
         <Recommended videos={userData.recommended} />
        )}

      {activeSection === 'settings' && (
         <ProfileSettings />
        )}
     </div>
   </div>
 );
};

// Section Components
const ContinueWatching = ({ videos }) => {
 return (
   <Section title="Continue Watching" icon={Play}>
     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {(videos && videos.length > 0) ? (
        videos.map((video, index) => (
         <ContinueWatchingCard key={index} video={video} index={index} />
        ))
      ) : (
        <EmptyState message="No videos in continue watching" />
      )}
     </div>
   </Section>
 );
};

const ContinueWatchingCard = ({ video, index }) => {
 return (
   <motion.div
     initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     transition={{ delay: index * 0.1 }}
     whileHover={{ y: -10, scale: 1.05 }}
      className="group cursor-pointer"
   >
     <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-white/5 border border-white/10">
       <img
         src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
       />
       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
       
       {/* Progress Bar */}
       <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
         <div
           className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
           style={{ width: `${video.progress || 45}%` }}
         />
       </div>

       {/* Play Button Overlay */}
       <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
         <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
           <Play className="w-6 h-6 fill-white text-white ml-1" />
         </div>
       </div>
     </div>

     <h4 className="text-sm font-semibold text-white truncate">{video.title}</h4>
     <p className="text-xs text-gray-400">{video.duration || '2h 15m'}</p>
   </motion.div>
 );
};

const WatchHistory = ({ videos }) => {
 return (
   <Section title="Watch History" icon={Play}>
     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {(videos && videos.length > 0) ? (
        videos.map((video, index) => (
         <HistoryCard key={index} video={video} index={index} />
        ))
      ) : (
        <EmptyState message="No watch history yet" />
      )}
     </div>
   </Section>
 );
};

const HistoryCard = ({ video, index }) => (
   <motion.div
     initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     transition={{ delay: index * 0.05 }}
     whileHover={{ y: -5, scale: 1.05 }}
      className="group cursor-pointer"
   >
     <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
       <img
         src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
       />
       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
     </div>
     <h4 className="text-sm font-semibold text-white truncate">{video.title}</h4>
     <p className="text-xs text-gray-400">{video.watchedAt || 'Recently'}</p>
   </motion.div>
 );

const MyList = ({ videos }) => {
 return (
   <Section title="My List" icon={Play}>
     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {(videos && videos.length > 0) ? (
        videos.map((video, index) => (
         <MovieCard key={index} movie={video} />
        ))
      ) : (
        <EmptyState message="No videos in your list" />
      )}
     </div>
   </Section>
 );
};

const Recommended = ({ videos }) => {
 return (
   <Section title="Recommended For You" icon={Play}>
     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {(videos && videos.length > 0) ? (
        videos.map((video, index) => (
         <MovieCard key={index} movie={video} />
        ))
      ) : (
        <EmptyState message="No recommendations yet" />
      )}
     </div>
   </Section>
 );
};

// Empty State Component
const EmptyState = ({ message }) => (
 <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
   <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
     <Play className="w-8 h-8 text-gray-500" />
   </div>
   <p className="text-gray-400 font-medium">{message}</p>
 </div>
);

// Generic Section Component
const Section = ({ title, icon: Icon, children }) => {
 return (
   <motion.section
     initial={{ opacity: 0 }}
     whileInView={{ opacity: 1 }}
     viewport={{ once: true }}
      className="px-4 md:px-8 py-12"
   >
     <div className="flex items-center gap-3 mb-6">
       <Icon className="w-6 h-6 text-cyan-400" />
       <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
     </div>
     {children}
   </motion.section>
 );
};

export default Profile;
