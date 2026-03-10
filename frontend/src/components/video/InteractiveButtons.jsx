import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp, ThumbsDown, Share2, Bookmark, Heart, MessageSquare } from 'lucide-react';

const InteractiveButtons = ({ video, userId }) => {
 const [likes, setLikes] = useState(video.likes?.length || 0);
const [hasLiked, setHasLiked] = useState(false);
const [hasDisliked, setHasDisliked] = useState(false);
const [isSaved, setIsSaved] = useState(false);
const [showShareMenu, setShowShareMenu] = useState(false);

  // Load persisted data
  useEffect(() => {
  const savedData = localStorage.getItem(`video_interactions_${video._id}`);
    if (savedData) {
    const parsed = JSON.parse(savedData);
    setLikes(parsed.likes || 0);
    setHasLiked(parsed.hasLiked || false);
    setHasDisliked(parsed.hasDisliked || false);
    setIsSaved(parsed.isSaved || false);
    }
  }, [video._id]);

  // Save to localStorage
  useEffect(() => {
  const dataToSave = {
      likes,
      hasLiked,
      hasDisliked,
      isSaved
    };
    localStorage.setItem(`video_interactions_${video._id}`, JSON.stringify(dataToSave));
  }, [likes, hasLiked, hasDisliked, isSaved, video._id]);

const handleLike = () => {
    if (hasLiked) {
    setLikes(likes -1);
    setHasLiked(false);
    } else {
    setLikes(likes + 1);
    setHasLiked(true);
     if (hasDisliked) setHasDisliked(false);
    }
  };

const handleDislike = () => {
    if (hasDisliked) {
    setHasDisliked(false);
    } else {
    setHasDisliked(true);
     if (hasLiked) {
      setLikes(likes -1);
      setHasLiked(false);
     }
    }
  };

const handleShare = async () => {
  const shareUrl = window.location.href;
    
    try {
     await navigator.share({
       title: video.title,
        text: `Check out "${video.title}"`,
        url: shareUrl
      });
    } catch (err) {
      // Fallback: copy to clipboard
     navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    }
  };

const handleSave = () => {
  setIsSaved(!isSaved);
  };

 return (
    <div className="flex flex-wrap items-center gap-4 md:gap-6">
      {/* Like Button */}
      <motion.div className="relative">
       <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleLike}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${hasLiked
            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50'
            : 'bg-white/10 text-white border border-white/20 hover:border-cyan-400 hover:text-cyan-400'
          }`}
        >
          <motion.div
            animate={hasLiked ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <ThumbsUp className="w-5 h-5" />
          </motion.div>
          <span>{likes.toLocaleString()}</span>
        </motion.button>

        {/* Animated Hearts on Like */}
        {hasLiked && (
          <div className="absolute-top-8 left-1/2 -translate-x-1/2 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 1, y: 0, scale: 0 }}
                animate={{ opacity: 0, y: -40, scale: 1.5 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="absolute"
              >
                <Heart className="w-6 h-6 fill-pink-500 text-pink-500" />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Dislike Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleDislike}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${hasDisliked
          ? 'bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg shadow-gray-500/50'
          : 'bg-white/10 text-white border border-white/20 hover:border-gray-400 hover:text-gray-400'
        }`}
      >
        <ThumbsDown className="w-5 h-5" />
      </motion.button>

      {/* Share Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleShare}
        className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white border border-white/20 rounded-xl font-bold hover:border-purple-400 hover:text-purple-400 hover:bg-purple-500/20 transition-all"
      >
        <Share2 className="w-5 h-5" />
        <span className="hidden md:inline">Share</span>
      </motion.button>

      {/* Save Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleSave}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${isSaved
          ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-yellow-500/50'
          : 'bg-white/10 text-white border border-white/20 hover:border-yellow-400 hover:text-yellow-400'
        }`}
      >
        <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-white' : ''}`} />
        <span className="hidden md:inline">{isSaved ? 'Saved' : 'Save'}</span>
      </motion.button>

      {/* Comments Count */}
      <div className="flex items-center gap-2 px-4 py-3 bg-white/5 rounded-xl border border-white/10">
        <MessageSquare className="w-5 h-5 text-cyan-400" />
        <span className="text-white font-semibold">{video.comments?.length || 0} comments</span>
      </div>
    </div>
  );
};

export default InteractiveButtons;
