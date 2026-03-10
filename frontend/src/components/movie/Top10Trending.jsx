import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Flame, Zap, Star } from 'lucide-react';
import Top10Card from './Top10Card';

const Top10Trending = ({ title = "Top10 Trending Now", subtitle = "Most watched this week", movies }) => {
   const rowRef = useRef(null);
   const [isMoved, setIsMoved] = useState(false);
   const [hoveredIndex, setHoveredIndex] = useState(null);

    // Take only top10 movies or pad the array
   const top10Movies = movies?.slice(0, 10) || [];

   const handleClick = (direction) => {
        setIsMoved(true);
        if (rowRef.current) {
           const { scrollLeft, clientWidth } = rowRef.current;
           const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    // Animation variants
   const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

   const headerVariants = {
        hidden: { opacity: 0, y: -30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    // Floating particle animation
   const particles = Array.from({ length: 5 });

    return (
        <div className="relative px-4 md:px-8 py-16 overflow-hidden">
            {/* Background Effects */}
            
            {/* Tech Grid Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div 
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px',
                        animation: 'gridMove 30s linear infinite'
                    }}
                />
            </div>

            {/* Animated Gradient Aura */}
            <motion.div
                animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-70"
                style={{ backgroundSize: '200% 100%' }}
            />

            {/* Glowing Orbs */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

            {/* Section Header */}
            <motion.div
                variants={headerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
            >
                <div className="space-y-2">
                    {/* Main Title with Gradient */}
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl">
                        {title}
                    </h2>
                    
                    {/* Subtitle */}
                    <p className="text-gray-400 text-sm md:text-base flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        {subtitle}
                    </p>

                    {/* Decorative Line */}
                    <div className="flex items-center gap-3 mt-4">
                        <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                        <div className="w-3 h-3 bg-purple-500 rounded-full animate-ping" />
                        <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent" />
                    </div>
                </div>

                {/* Floating Badges */}
                <div className="flex items-center gap-3">
                    <motion.div
                        animate={{
                            y: [0, -8, 0],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-400/40 rounded-full backdrop-blur-md"
                    >
                        <Flame className="w-5 h-5 text-orange-400" />
                        <span className="text-sm font-bold text-orange-100">#1 Trending</span>
                    </motion.div>

                    <motion.div
                        animate={{
                            y: [0, -8, 0],
                            rotate: [0, -5, 5, 0]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/40 rounded-full backdrop-blur-md"
                    >
                        <Zap className="w-5 h-5 text-purple-400" />
                        <span className="text-sm font-bold text-purple-100">AI Picks</span>
                    </motion.div>
                </div>
            </motion.div>

            {/* Navigation Arrows */}
            <motion.button
                whileHover={{ scale: 1.2, x: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-indigo-500/80 via-purple-600/80 to-pink-600/80 border border-indigo-400/50 flex items-center justify-center shadow-lg shadow-indigo-500/30 transition-all duration-300 ${!isMoved && 'opacity-0 pointer-events-none'
                    } hover:shadow-indigo-500/60`}
                onClick={() => handleClick('left')}
            >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </motion.button>

            <motion.button
                whileHover={{ scale: 1.2, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-indigo-500/80 via-purple-600/80 to-pink-600/80 border border-indigo-400/50 flex items-center justify-center shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:shadow-indigo-500/60"
                onClick={() => handleClick('right')}
            >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </motion.button>

            {/* Horizontal Scroll Container */}
            <div className="relative group">
                {/* Side Gradients */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-netflix-black to-transparent z-30 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-netflix-black to-transparent z-30 pointer-events-none" />

                {/* Movie Cards Row */}
                <div
                    ref={rowRef}
                    className="flex gap-6 overflow-x-scroll scrollbar-hide py-12 px-4"
                    style={{
                        scrollBehavior: 'smooth',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}
                    onScroll={() => {
                        if (rowRef.current?.scrollLeft === 0) setIsMoved(false);
                    }}
                >
                    {top10Movies.map((movie, index) => (
                        <div
                            key={movie._id || index}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <Top10Card
                                movie={movie}
                                rank={index + 1}
                                isHovered={hoveredIndex === index}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Gradient Line */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {particles.map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 bg-purple-300 rounded-full"
                        initial={{
                            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                            y: Math.random() * 200 + 50,
                            opacity: 0
                        }}
                        animate={{
                            y: [null, Math.random() * -150 - 50],
                            opacity: [0, 0.8, 0]
                        }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.5
                        }}
                        style={{
                            boxShadow: '0 0 15px 3px rgba(168, 85, 247, 0.6)'
                        }}
                    />
                ))}
            </div>

            {/* Decorative Corner Elements */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Updated in real-time</span>
            </div>
        </div>
    );
};

export default Top10Trending;
