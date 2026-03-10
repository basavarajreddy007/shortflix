import React from 'react';
import { motion } from 'framer-motion';
import { Play, Star, Zap, TrendingUp, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FuturisticMovieCard = ({ movie, index, isHovered }) => {
   const navigate = useNavigate();

    // Card animation variants
   const cardVariants = {
        hidden: {
            opacity: 0,
            x: 100,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut"
            }
        },
        hover: {
            scale: 1.05,
            y: -10,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    // Glow animation
   const glowVariants = {
        normal: {
            opacity: 0.3,
            scale: 1
        },
        hover: {
            opacity: 0.8,
            scale: 1.1,
            transition: {
                duration: 0.3
            }
        }
    };

    // Badge animations
   const badgeVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                delay: 0.3
            }
        }
    };

    // Determine badges based on movie data
   const showTopRated = movie.rating >= 8.5;
   const showTrending = index < 3;
   const showAIRecommended = movie.aiRecommended || true;

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true }}
            className="relative flex-none w-[200px] md:w-[280px] cursor-pointer group"
            onClick={() => navigate(`/watch/${movie._id}`)}
        >
            {/* Background Glow Effect */}
            <motion.div
                variants={glowVariants}
                animate={isHovered ? "hover" : "normal"}
                className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 via-purple-500/30 to-pink-500/30 rounded-2xl blur-xl"
            />

            {/* Main Card Container */}
            <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm shadow-2xl">
                {/* Poster Image */}
                <img
                    src={movie.thumbnailUrl || movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Glassmorphism Border Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/20 via-transparent to-purple-500/20 pointer-events-none" />

                {/* Top Badges */}
                <motion.div
                    variants={badgeVariants}
                    initial="hidden"
                    animate="visible"
                    className="absolute top-3 left-3 flex flex-col gap-2 z-20"
                >
                    {showTopRated && (
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500/90 to-orange-500/90 rounded-full backdrop-blur-md shadow-lg shadow-amber-500/40"
                        >
                            <Award className="w-3.5 h-3.5 text-white" />
                            <span className="text-xs font-bold text-white">Top Rated</span>
                        </motion.div>
                    )}

                    {showTrending && (
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-red-500/90 to-pink-500/90 rounded-full backdrop-blur-md shadow-lg shadow-red-500/40"
                        >
                            <TrendingUp className="w-3.5 h-3.5 text-white" />
                            <span className="text-xs font-bold text-white">Trending #{index + 1}</span>
                        </motion.div>
                    )}
                </motion.div>

                {/* AI Recommendation Badge */}
                {showAIRecommended && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="absolute top-3 right-3 z-20"
                    >
                        <div className="flex items-center gap-1 px-2.5 py-1.5 bg-gradient-to-r from-cyan-500/80 to-blue-500/80 rounded-full backdrop-blur-md border border-cyan-400/50 shadow-lg shadow-cyan-500/30">
                            <Zap className="w-3.5 h-3.5 text-white" />
                            <span className="text-[10px] font-semibold text-white">AI Pick</span>
                        </div>
                    </motion.div>
                )}

                {/* Rating Badge */}
                {movie.rating && (
                    <div className="absolute bottom-24 left-3 z-20">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-black/60 backdrop-blur-md rounded-lg border border-green-500/50"
                        >
                            <Star className="w-3.5 h-3.5 fill-green-400 text-green-400" />
                            <span className="text-sm font-bold text-green-400">{movie.rating.toFixed(1)}</span>
                        </motion.div>
                    </div>
                )}

                {/* Play Button Overlay */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center z-10"
                >
                    <motion.div
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-cyan-500/80 via-purple-500/80 to-pink-500/80 border-2 border-white/60 flex items-center justify-center backdrop-blur-sm shadow-2xl shadow-cyan-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                        <Play className="w-7 h-7 md:w-8 md:h-8 fill-white text-white ml-1" />
                    </motion.div>
                </motion.div>

                {/* Bottom Info Section */}
                <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                    {/* Movie Title */}
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-base md:text-lg font-bold text-white mb-2 line-clamp-2 drop-shadow-lg"
                    >
                        {movie.title}
                    </motion.h3>

                    {/* Movie Meta Info */}
                    <div className="flex items-center gap-2 text-xs text-gray-300 mb-3">
                        <span className="px-2 py-0.5 bg-white/10 backdrop-blur-sm rounded border border-white/20">
                            {movie.genre || 'Action'}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span>{movie.year || '2024'}</span>
                    </div>

                    {/* Progress Bar (for watched episodes) */}
                    {movie.progress && (
                        <div className="mt-2">
                            <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${movie.progress}%` }}
                                    transition={{ delay: 0.6, duration: 0.8 }}
                                    className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Hover Tech Grid Pattern */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '20px 20px'
                    }}
                />
            </div>

            {/* Corner Accent Lights */}
            <div className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-br from-cyan-400/40 to-transparent rounded-tl-2xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-purple-500/40 to-transparent rounded-br-2xl pointer-events-none" />
        </motion.div>
    );
};

export default FuturisticMovieCard;
