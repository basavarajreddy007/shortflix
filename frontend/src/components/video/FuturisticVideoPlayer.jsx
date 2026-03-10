import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, Volume2, VolumeX, Maximize, Minimize, 
  SkipForward, Settings, ThumbsUp, ThumbsDown, Share2, 
  Bookmark, MessageSquare, Send, Heart, Clock, User
} from 'lucide-react';

const FuturisticVideoPlayer= ({ video, userId }) => {
 const videoRef = useRef(null);
 const [isPlaying, setIsPlaying] = useState(false);
 const [progress, setProgress] = useState(0);
 const [volume, setVolume] = useState(1);
 const [isMuted, setIsMuted] = useState(false);
 const [isFullscreen, setIsFullscreen] = useState(false);
 const [playbackSpeed, setPlaybackSpeed] = useState(1);
 const [showControls, setShowControls] = useState(true);
 const [likes, setLikes] = useState(video.likes?.length || 0);
 const [hasLiked, setHasLiked] = useState(false);
 const [comments, setComments] = useState(video.comments || []);
 const [newComment, setNewComment] = useState('');
 const [showSpeedMenu, setShowSpeedMenu] = useState(false);
 const [showComments, setShowComments] = useState(true);

  // Load persisted data from localStorage
  useEffect(() => {
   const savedData = localStorage.getItem(`video_${video._id}`);
    if (savedData) {
     const parsed = JSON.parse(savedData);
     setComments(parsed.comments || []);
     setLikes(parsed.likes || 0);
      
      // Check if current user has liked
     const userLiked = parsed.userLikes?.includes(userId);
     setHasLiked(userLiked || false);
    }
  }, [video._id, userId]);

  // Save to localStorage whenever data changes
  useEffect(() => {
   const dataToSave = {
     comments,
      likes,
      userLikes: hasLiked ? [userId] : []
    };
    localStorage.setItem(`video_${video._id}`, JSON.stringify(dataToSave));
  }, [comments, likes, hasLiked, video._id, userId]);

  // Progress update
  useEffect(() => {
   const video = videoRef.current;
    if (!video) return;

   const updateProgress = () => {
     setProgress((video.currentTime/ video.duration) * 100);
    };

    video.addEventListener('timeupdate', updateProgress);
    return () => video.removeEventListener('timeupdate', updateProgress);
  }, []);

  // Auto-hide controls
  useEffect(() => {
    let timeout;
    if (isPlaying) {
     timeout = setTimeout(() => setShowControls(false), 3000);
    }
    return () => clearTimeout(timeout);
  }, [isPlaying, showControls]);

 const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
     setIsPlaying(!isPlaying);
    }
  };

 const handleSeek = (e) => {
   const seekTime = (e.target.value / 100) * videoRef.current.duration;
    videoRef.current.currentTime = seekTime;
   setProgress(e.target.value);
  };

 const toggleMute = () => {
    videoRef.current.muted = !isMuted;
   setIsMuted(!isMuted);
  };

 const handleVolumeChange = (e) => {
   const newVolume = parseFloat(e.target.value);
   setVolume(newVolume);
    videoRef.current.volume= newVolume;
   setIsMuted(newVolume === 0);
  };

 const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current.parentElement.requestFullscreen();
     setIsFullscreen(true);
    } else {
      document.exitFullscreen();
     setIsFullscreen(false);
    }
  };

 const changePlaybackSpeed = (speed) => {
    videoRef.current.playbackRate = speed;
   setPlaybackSpeed(speed);
   setShowSpeedMenu(false);
  };

 const handleLike = () => {
    if (hasLiked) {
     setLikes(likes -1);
     setHasLiked(false);
    } else {
     setLikes(likes + 1);
     setHasLiked(true);
    }
  };

 const handleAddComment = () => {
    if (!newComment.trim()) return;

   const comment = {
      _id: Date.now().toString(),
      user: {
        _id: userId,
        username: 'CurrentUser',
        avatar: null
      },
      text: newComment,
      date: new Date().toISOString(),
      replies: []
    };

   setComments([comment, ...comments]);
   setNewComment('');
  };

 const formatTime = (seconds) => {
   const mins = Math.floor(seconds / 60);
   const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

 const formatTimestamp = (dateString) => {
   const date = new Date(dateString);
   const now = new Date();
   const diff = now - date;
   const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

 return (
    <div className="relative w-full bg-[#0a0a1a] rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/20 border border-white/10">
      {/* Video Container */}
      <div
        className="relative aspect-video group"
        onMouseMove={() => setShowControls(true)}
        onClick={() => setShowControls(true)}
      >
        <video
          ref={videoRef}
          src={video.videoUrl || video.url}
          className="w-full h-full object-contain"
          onClick={togglePlay}
        />

        {/* Animated Gradient Overlay */}
        <AnimatePresence>
          {showControls && (
            <>
              {/* Top Gradient */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
                className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none"
              />

              {/* Bottom Gradient */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
                className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none"
              />
            </>
          )}
        </AnimatePresence>

        {/* Controls */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col justify-between p-4 md:p-6"
            >
              {/* Top Bar */}
              <div className="flex items-center justify-between">
                <motion.h3 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="text-white font-bold text-lg drop-shadow-lg"
                >
                  {video.title}
                </motion.h3>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowComments(!showComments)}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-cyan-400" />
                  <span className="text-white text-sm font-semibold">{comments.length}</span>
                </motion.button>
              </div>

              {/* Center Play Button */}
              <motion.button
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePlay}
                className="self-center w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 border-2 border-white/60 flex items-center justify-center shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-500/80 transition-all"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 fill-white text-white" />
                ) : (
                  <Play className="w-8 h-8 fill-white text-white ml-1" />
                )}
              </motion.button>

              {/* Bottom Controls */}
              <div className="space-y-3">
                {/* Seek Bar */}
                <div className="relative group/seek">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={handleSeek}
                    className="w-full h-2 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-cyan-400 [&::-webkit-slider-thumb]:via-purple-400 [&::-webkit-slider-thumb]:to-pink-400 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-cyan-500/50 [&::-webkit-slider-thumb]:hover:scale-125 [&::-webkit-slider-thumb]:transition-transform"
                  />
                  <div
                    className="absolute top-0 left-0 h-2 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full pointer-events-none"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 md:gap-4">
                    {/* Play/Pause */}
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={togglePlay}
                      className="text-white hover:text-cyan-400 transition-colors"
                    >
                      {isPlaying ? <Pause className="w-6 h-6 md:w-8 md:h-8" /> : <Play className="w-6 h-6 md:w-8 md:h-8" />}
                    </motion.button>

                    {/* Volume */}
                    <div className="flex items-center gap-2 group/volume">
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleMute}
                        className="text-white hover:text-cyan-400 transition-colors"
                      >
                        {isMuted ? <VolumeX className="w-6 h-6 md:w-8 md:h-8" /> : <Volume2 className="w-6 h-6 md:w-8 md:h-8" />}
                      </motion.button>
                      
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-0 group-hover/volume:w-20 transition-all duration-300 h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400"
                      />
                    </div>

                    {/* Time Display */}
                    <span className="text-white text-xs md:text-sm font-mono">
                      {formatTime(videoRef.current?.currentTime || 0)} / {formatTime(videoRef.current?.duration || 0)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 md:gap-4">
                    {/* Playback Speed */}
                    <div className="relative">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                        className="px-3 py-1 text-white text-xs md:text-sm font-semibold border border-white/30 rounded-full hover:border-cyan-400 hover:text-cyan-400 transition-all"
                      >
                        {playbackSpeed}x
                      </motion.button>

                      <AnimatePresence>
                        {showSpeedMenu && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: -10 }}
                            className="absolute bottom-full right-0 mb-2 bg-[#1a1a2e]/95 backdrop-blur-xl border border-white/20 rounded-xl p-2 space-y-1 shadow-xl"
                          >
                            {[0.5, 0.75, 1, 1.25, 1.5, 2].map(speed => (
                              <button
                                key={speed}
                                onClick={() => changePlaybackSpeed(speed)}
                                className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-semibold transition-all ${playbackSpeed === speed 
                                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white' 
                                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                }`}
                              >
                                {speed}x
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Fullscreen */}
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={toggleFullscreen}
                      className="text-white hover:text-cyan-400 transition-colors"
                    >
                      {isFullscreen ? <Minimize className="w-6 h-6 md:w-8 md:h-8" /> : <Maximize className="w-6 h-6 md:w-8 md:h-8" />}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Comments Section */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
           exit={{ height: 0, opacity: 0 }}
            className="border-t border-white/10 bg-[#0f0f1f]/50 backdrop-blur-sm overflow-hidden"
          >
            <div className="p-4 md:p-6 space-y-4">
              {/* Comment Input */}
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                    placeholder="Add a comment..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleAddComment}
                    className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-bold text-white hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                {comments.map((comment, index) => (
                  <motion.div
                    key={comment._id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{comment.user?.username || 'User'}</span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTimestamp(comment.date)}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm">{comment.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FuturisticVideoPlayer;
