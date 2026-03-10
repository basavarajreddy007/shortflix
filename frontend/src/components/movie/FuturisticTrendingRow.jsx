import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, Star, TrendingUp, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import FuturisticMovieCard from './FuturisticMovieCard';

const FuturisticTrendingRow = ({ title, movies }) => {
   const rowRef = useRef(null);
   const [isMoved, setIsMoved] = useState(false);
   const [hoveredIndex, setHoveredIndex] = useState(null);

   const handleClick = (direction) => {
        setIsMoved(true);
        if (rowRef.current) {
           const { scrollLeft, clientWidth } = rowRef.current;
           const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    // Animated gradient background
   const gradientVariants = {
        animate: {
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }
    };

    // Title animation
   const titleVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    if (!movies || movies.length === 0) return null;

    return (
        <div className="relative px-4 md:px-8 py-12 overflow-hidden">
            {/* Background Tech Grid Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
                        linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px',
                    animation: 'gridMove 20s linear infinite'
                }} />
            </div>

            {/* Animated Gradient Glow */}
            <motion.div
                variants={gradientVariants}
                animate="animate"
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-60"
                style={{ backgroundSize: '200% 100%' }}
            />

            {/* Section Title with Floating Badge */}
            <motion.div
                variants={titleVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative mb-8 flex items-center gap-4"
            >
                <div className="relative">
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
                        {title}
                    </h2>
                    <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-pink-500/50 blur-sm" />
                </div>

                {/* Floating Trending Badge */}
                <motion.div
                    animate={{
                        y: [0, -8, 0],
                        scale: [1, 1.05, 1]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 rounded-full backdrop-blur-sm"
                >
                    <TrendingUp className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-semibold text-cyan-100">AI Powered</span>
                </motion.div>
            </motion.div>

            {/* Navigation Arrows */}
            <motion.button
                whileHover={{ scale: 1.2, x: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-cyan-500/80 to-purple-600/80 border border-cyan-400/50 flex items-center justify-center shadow-lg shadow-cyan-500/30 transition-all duration-300 ${!isMoved && 'opacity-0 pointer-events-none'
                    } hover:shadow-cyan-500/60`}
                onClick={() => handleClick('left')}
            >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </motion.button>

            <motion.button
                whileHover={{ scale: 1.2, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-cyan-500/80 to-purple-600/80 border border-cyan-400/50 flex items-center justify-center shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/60"
                onClick={() => handleClick('right')}
            >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </motion.button>

            {/* Movie Carousel Container */}
            <div className="relative group">
                {/* Left Glow Effect */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-netflix-black to-transparent z-30 pointer-events-none opacity-60" />

                {/* Right Glow Effect */}
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-netflix-black to-transparent z-30 pointer-events-none opacity-60" />

                {/* Scrollable Movie Row */}
                <div
                    ref={rowRef}
                    className="flex gap-4 md:gap-6 overflow-x-scroll scrollbar-hide py-8 px-2"
                    style={{
                        scrollBehavior: 'smooth',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}
                    onScroll={() => {
                        if (rowRef.current?.scrollLeft === 0) setIsMoved(false);
                    }}
                >
                    {movies.map((movie, index) => (
                        <div
                            key={movie._id}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <FuturisticMovieCard
                                movie={movie}
                                index={index}
                                isHovered={hoveredIndex === index}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Glow Line */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

            {/* Decorative Floating Particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * 200 + 50,
                            opacity: 0
                        }}
                        animate={{
                            y: [null, Math.random() * -100 - 50],
                            opacity: [0, 0.8, 0]
                        }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{
                            left: `${Math.random() * 100}%`,
                            boxShadow: '0 0 10px 2px rgba(34, 211, 238, 0.6)'
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default FuturisticTrendingRow;
