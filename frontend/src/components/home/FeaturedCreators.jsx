import React from 'react';
import { motion } from 'framer-motion';
import { Users, Play, Star, TrendingUp, CheckCircle2 } from 'lucide-react';

const FeaturedCreators = () => {
  // Real YouTube creator data(replace with actual API data)
 const creators = [
    {
  id:1,
    name: 'Marques Brownlee',
     youtubeHandle: '@MKBHD',
     avatar: 'https://yt3.googleusercontent.com/lh6Fv9l_5H8SZLpJnRwkwJNlZvPzTqJgZQ8K7XqYmWqKxYqYmWqKxYqYmWqKxYqYmWqK=s900-c-k-c0x00ffffff-no-rj',
     followers: '18.2M subscribers',
     verified: true,
   videos: [
       { 
     title: 'iPhone 15 Pro Review: The Best iPhone?', 
     views: '8.2M views',
      color: 'from-cyan-500 to-blue-500'
       },
       { 
     title: 'Tesla Cybertruck Review', 
     views: '12.5M views',
      color: 'from-purple-500 to-pink-500'
       },
       { 
     title: 'The Truth About Foldable Phones', 
     views: '6.8M views',
      color: 'from-pink-500 to-red-500'
       },
     ]
    },
    {
  id: 2,
  name: 'MrBeast',
    youtubeHandle: '@MrBeast',
     avatar: 'https://yt3.googleusercontent.com/ytc/AIdro_mDk8SbTiWiGYejS8oRHCfOJSVU9fnYNrNJhB=s900-c-k-c0x00ffffff-no-rj',
     followers: '239M subscribers',
     verified: true,
  videos: [
       { 
    title: '$1 vs $100,000,000 Car!', 
    views: '156M views',
     color: 'from-amber-500 to-orange-500'
       },
       { 
    title: 'I Built 100 Houses And Gave Them Away', 
    views: '98M views',
     color: 'from-green-500 to-emerald-500'
       },
       { 
    title: 'Extreme Hide And Seek Challenge', 
    views: '87M views',
     color: 'from-red-500 to-rose-500'
       },
     ]
    },
    {
  id: 3,
  name: 'Veritasium',
   youtubeHandle: '@veritasium',
     avatar: 'https://yt3.googleusercontent.com/ytc/AIdro_nDerekMullerChannelAvatar=s900-c-k-c0x00ffffff-no-rj',
     followers: '14.6M subscribers',
     verified: true,
  videos: [
       { 
   title: 'The Most Misunderstood Concept in Physics', 
   views: '24M views',
    color: 'from-indigo-500 to-purple-500'
       },
       { 
   title: 'Why Gravity is NOT a Force', 
   views: '18M views',
    color: 'from-cyan-500 to-teal-500'
       },
       { 
   title: 'The Science of Thinking', 
   views: '15M views',
    color: 'from-violet-500 to-fuchsia-500'
       },
     ]
    },
    {
  id: 4,
  name: 'Emma Chamberlain',
   youtubeHandle: '@emmachamberlain',
     avatar: 'https://yt3.googleusercontent.com/ytc/AIdro_kEmmaChamberlainAvatar=s900-c-k-c0x00ffffff-no-rj',
     followers: '12.1M subscribers',
     verified: true,
  videos: [
       { 
   title: 'my honest morning routine 2024', 
   views: '5.2M views',
    color: 'from-pink-400 to-rose-400'
       },
       { 
   title: 'apartment tour!! (finally)', 
   views: '8.7M views',
    color: 'from-sky-400 to-blue-400'
       },
       { 
   title: 'what I eat in a day(realistic)', 
   views: '6.3M views',
    color: 'from-amber-400 to-yellow-400'
       },
     ]
    },
  ];

 return (
    <div className="relative px-4 md:px-8 py-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
       <div
          className="absolute inset-0"
        style={{
           backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
         }}
        />
      </div>

      {/* Animated Gradient Line */}
      <motion.div
       animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-60"
       style={{ backgroundSize: '200% 100%' }}
      />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true }}
        className="relative mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg mb-3">
          Featured Creators
        </h2>
        <p className="text-gray-400 text-lg">Top creators shaping the future of content</p>
        
        {/* Decorative Line */}
        <div className="flex items-center gap-3 mt-4">
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full" />
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-ping" />
          <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent" />
        </div>
      </motion.div>

      {/* Creators Grid */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
       {creators.map((creator, index) => (
         <CreatorCard key={creator.id} creator={creator} index={index} />
        ))}
      </div>
    </div>
  );
};

const CreatorCard = ({ creator, index }) => {
 return (
    <motion.div
     initial={{ opacity: 0, y: 50 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
     whileHover={{ y: -10, scale:1.02 }}
      className="group relative"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Card Container */}
      <div className="relative bg-gradient-to-br from-white/5 via-white/5 to-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 overflow-hidden">
        
        {/* Avatar & Info */}
        <div className="flex flex-col items-center mb-6">
         <motion.div
           whileHover={{ scale:1.1 }}
            className="relative mb-4"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full blur-lg opacity-50 group-hover:opacity-80 transition-opacity" />
            <img
             src={creator.avatar}
             alt={creator.name}
              className="relative w-24 h-24 rounded-full object-cover border-2 border-white/20"
           onError={(e) => {
             e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(creator.name)}&background=6366f1&color=fff&size=200`;
           }}
            />
            {creator.verified && (
             <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center border-2 border-white">
               <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
            )}
          </motion.div>
          
          <h3 className="text-xl font-bold text-white text-center mb-2">{creator.name}</h3>
          <p className="text-sm text-gray-400 mb-2">{creator.youtubeHandle}</p>
          
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full border border-cyan-400/30">
            <Users className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-100">{creator.followers}</span>
          </div>
        </div>

        {/* Top Videos */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <Play className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-semibold text-gray-300">Top Videos</span>
          </div>
          
         {creator.videos.map((video, i) => (
           <motion.a
             key={i}
             href={video.videoUrl}
             target="_blank"
            rel="noopener noreferrer"
             whileHover={{ x: 5, scale:1.05 }}
              className="group/video cursor-pointer block"
           >
              <div className="relative rounded-lg overflow-hidden aspect-video mb-2">
               {/* Gradient Thumbnail Placeholder */}
               <div className={`w-full h-full bg-gradient-to-br ${video.color}`} />
                
                {/* Play Icon Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/video:opacity-100 transition-opacity">
                 <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                   <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                  </div>
                </div>
              </div>
              
              <h4 className="text-sm font-semibold text-white truncate group-hover/video:text-cyan-400 transition-colors">
                {video.title}
              </h4>
              <p className="text-xs text-gray-400">{video.views}</p>
            </motion.a>
          ))}
        </div>

        {/* Subscribe Button */}
        <motion.button
         whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 w-full py-3 bg-gradient-to-r from-red-500 via-red-500 to-red-600 rounded-xl font-bold text-white hover:shadow-lg hover:shadow-red-500/30 transition-all flex items-center justify-center gap-2"
        >
          <Play className="w-5 h-5 fill-white" />
          Subscribe
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FeaturedCreators;
