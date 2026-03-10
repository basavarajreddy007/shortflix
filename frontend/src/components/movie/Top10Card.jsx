import React from 'react';
import { motion } from 'framer-motion';
import { Play, Plus, Star, TrendingUp, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Top10Card = ({ movie, rank, isHovered }) => {
  const navigate = useNavigate();

    // Animation variants
  const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delay: rank * 0.1,
                ease: "easeOut"
            }
        },
        hover: {
            scale: 1.08,
            y: -15,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    // Number parallax animation
  const numberVariants = {
        normal: { x: 0, y: 0 },
        hover: {
            x: -10,
            y: -10,
            transition: { duration: 0.3 }
        }
    };

    // Glow effect animation
  const glowVariants = {
        normal: { opacity: 0.3, scale: 1 },
        hover: {
            opacity: 0.8,
            scale: 1.2,
            transition: { duration: 0.3 }
        }
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true }}
            className="relative flex-none w-[160px] md:w-[220px] lg:w-[260px] cursor-pointer group"
            onClick={() => navigate(`/watch/${movie._id}`)}
        >
            {/* Background Glow Aura */}
            <motion.div
                variants={glowVariants}
                animate={isHovered ? "hover" : "normal"}
                className={`absolute inset-0 bg-gradient-to-br rounded-2xl blur-2xl transition-colors duration-500 ${rank === 1
                        ? 'from-amber-500/40 via-orange-500/40 to-yellow-500/40'
                        : rank <= 3
                            ? 'from-purple-500/40 via-pink-500/40 to-red-500/40'
                            : 'from-cyan-500/40 via-blue-500/40 to-indigo-500/40'
                    }`}
            />

            {/* Main Card Container */}
            <div className="relative h-[240px] md:h-[330px] lg:h-[400px] rounded-xl overflow-hidden">
                {/* BIG Ranking Number Behind */}
                <motion.div
                    variants={numberVariants}
                    animate={isHovered ? "hover" : "normal"}
                    className={`absolute-top-4 -left-4 z-10 text-[120px] md:text-[160px] lg:text-[200px] font-black leading-none select-none transition-colors duration-500 ${rank === 1
                            ? 'text-transparent bg-gradient-to-br from-amber-400 to-orange-600 bg-clip-text drop-shadow-lg'
                            : rank <= 3
                                ? 'text-transparent bg-gradient-to-br from-purple-400 to-pink-600 bg-clip-text drop-shadow-lg'
                                : 'text-transparent bg-gradient-to-br from-cyan-400 to-indigo-600 bg-clip-text drop-shadow-lg'
                        }`}
                    style={{
                        WebkitTextStroke: '2px rgba(255, 255, 255, 0.3)',
                        filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))'
                    }}
                >
                    {rank}
                </motion.div>

                {/* Poster Container */}
                <div className="relative h-full w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                    {/* Poster Image */}
                    <img
                        src={movie.thumbnailUrl || movie.poster}
                        alt={movie.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

                    {/* Glassmorphism Border */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none" />

                    {/* Rank Badge (Small, on poster) */}
                    <div className="absolute top-3 left-3 z-20">
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                            className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-black text-sm md:text-base shadow-lg backdrop-blur-md ${rank === 1
                                    ? 'bg-gradient-to-br from-amber-400 to-orange-600 text-white shadow-amber-500/50'
                                    : rank <= 3
                                        ? 'bg-gradient-to-br from-purple-400 to-pink-600 text-white shadow-purple-500/50'
                                        : 'bg-gradient-to-br from-cyan-400 to-indigo-600 text-white shadow-cyan-500/50'
                                }`}
                        >
                            {rank}
                        </motion.div>
                    </div>

                    {/* Rating Badge */}
                    {movie.rating && (
                        <div className="absolute top-3 right-3 z-20">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.6 }}
                                className="flex items-center gap-1 px-2 py-1 bg-black/70 backdrop-blur-md rounded-lg border border-green-500/50"
                            >
                                <Star className="w-3 h-3 md:w-4 md:h-4 fill-green-400 text-green-400" />
                                <span className="text-xs md:text-sm font-bold text-green-400">
                                    {movie.rating.toFixed(1)}
                                </span>
                            </motion.div>
                        </div>
                    )}

                    {/* AI Recommendation Tag for Top 3 */}
                    {rank <= 3 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 }}
                            className="absolute bottom-28 right-3 z-20"
                        >
                            <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-purple-500/80 to-pink-500/80 rounded-full backdrop-blur-md border border-purple-400/50 shadow-lg shadow-purple-500/30">
                                <Zap className="w-3 h-3 text-white" />
                                <span className="text-[10px] font-semibold text-white">Hot</span>
                            </div>
                        </motion.div>
                    )}

                    {/* Hover Overlay with Actions */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-4 z-30 transition-all duration-300"
                    >
                        {/* Play Button */}
                        <motion.button
                            initial={{ scale: 0.8, y: 20 }}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 border-2 border-white/60 flex items-center justify-center shadow-2xl shadow-cyan-500/50"
                        >
                            <Play className="w-6 h-6 md:w-7 md:h-7 fill-white text-white ml-1" />
                        </motion.button>

                        {/* Action Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileHover={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="flex items-center gap-2"
                        >
                            <button className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center hover:bg-white/30 transition-colors">
                                <Plus className="w-4 h-4 text-white" />
                            </button>
                            <button className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center hover:bg-white/30 transition-colors">
                                <TrendingUp className="w-4 h-4 text-white" />
                            </button>
                        </motion.div>
                    </motion.div>

                    {/* Bottom Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 z-20">
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-sm md:text-base font-bold text-white mb-2 line-clamp-2 drop-shadow-lg"
                        >
                            {movie.title}
                        </motion.h3>

                        <div className="flex items-center gap-2 text-xs text-gray-300">
                            <span className="px-2 py-0.5 bg-white/10 backdrop-blur-sm rounded border border-white/20">
                                {movie.genre || 'Action'}
                            </span>
                            <span className="text-gray-400">•</span>
                            <span>{movie.year || '2024'}</span>
                        </div>

                        {/* Progress Indicator */}
                        {movie.progress && (
                            <motion.div
                                initial={{ opacity: 0, scaleX: 0 }}
                                animate={{ opacity: 1, scaleX: 1 }}
                                transition={{ delay: 0.4 }}
                                className="mt-2 h-0.5 bg-white/20 rounded-full overflow-hidden"
                            >
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${movie.progress}%` }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                    className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
                                />
                            </motion.div>
                        )}
                    </div>

                    {/* Tech Grid Pattern Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 0.3 }}
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            backgroundImage: `
                                linear-gradient(rgba(34, 211, 238, 0.15) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(34, 211, 238, 0.15) 1px, transparent 1px)
                            `,
                            backgroundSize: '30px 30px'
                        }}
                    />
                </div>
            </div>

            {/* Corner Accent Highlights */}
            <div className="absolute top-0 left-0 w-12 h-12 bg-gradient-to-br from-white/20 to-transparent rounded-tl-xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-white/20 to-transparent rounded-br-xl pointer-events-none" />
        </motion.div>
    );
};

export default Top10Card;
