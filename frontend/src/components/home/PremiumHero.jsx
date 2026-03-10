import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Sparkles, Star, TrendingUp, Users, Info } from 'lucide-react';

const FloatingBadge = ({ icon: Icon, text, delay, className }) => (
    <motion.div
        initial={{ y: 0 }}
        animate={{ y: [-10, 10, -10] }}
        transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay
        }}
        className={`absolute hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-2xl shadow-2xl ${className}`}
    >
        <div className="p-2 bg-gradient-to-tr from-netflix-red to-red-500 rounded-lg">
            <Icon className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm font-medium text-white/90">{text}</span>
    </motion.div>
);

const PremiumHero = ({ movies }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-cycle through movies every 8 seconds
    useEffect(() => {
        if (!movies || movies.length === 0) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % movies.length);
        }, 8000);
        return () => clearInterval(timer);
    }, [movies]);

    if (!movies || movies.length === 0) {
        return <div className="h-[90vh] bg-netflix-black flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-netflix-red border-t-transparent rounded-full animate-spin" />
        </div>;
    }

    const currentMovie = movies[currentIndex];

    return (
        <section className="relative min-h-[95vh] flex items-center overflow-hidden bg-netflix-black">
            {/* Background Image with Transitions */}
            <AnimatePresence mode='wait'>
                <motion.div
                    key={currentMovie._id}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src={currentMovie.thumbnailUrl || currentMovie.poster}
                        alt={currentMovie.title}
                        className="w-full h-full object-cover"
                    />
                    {/* Multi-layered cinematic overlays */}
                    <div className="absolute inset-0 bg-gradient-to-r from-netflix-black via-netflix-black/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-netflix-black/20" />
                    <div className="absolute inset-0 netflix-gradient" />
                </motion.div>
            </AnimatePresence>

            {/* Dynamic Background Gradients */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-netflix-red/10 blur-[120px] rounded-full" />
            </div>

            <div className="container mx-auto px-6 md:px-16 relative z-10 w-full">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentMovie._id}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 50, opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-3xl"
                    >
                        {/* Movie Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
                            <Sparkles className="w-4 h-4 text-netflix-red" />
                            <span className="text-xs font-bold tracking-widest uppercase text-gray-300">
                                {currentMovie.genre} • New Arrival
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-5xl md:text-8xl font-black mb-4 tracking-tighter leading-none uppercase drop-shadow-2xl">
                            {currentMovie.title}
                        </h1>

                        {/* Description */}
                        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-xl leading-relaxed drop-shadow-lg line-clamp-3">
                            {currentMovie.description}
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <button className="group relative px-10 py-4 bg-white text-black rounded-lg font-bold flex items-center gap-3 overflow-hidden transition-all hover:scale-105 active:scale-95">
                                <Play className="w-5 h-5 fill-black" />
                                <span>Play Now</span>
                            </button>

                            <button className="px-10 py-4 bg-gray-500/40 hover:bg-gray-500/60 border border-white/10 text-white rounded-lg font-bold transition-all backdrop-blur-md flex items-center gap-3">
                                <Info className="w-5 h-5" />
                                <span>More Info</span>
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Pagination Indicators */}
            <div className="absolute bottom-40 right-16 flex flex-col gap-3 z-20">
                {movies.slice(0, 5).map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-1 transition-all duration-500 rounded-full ${currentIndex === idx ? 'w-12 bg-netflix-red' : 'w-6 bg-white/30'
                            }`}
                    />
                ))}
            </div>

            {/* Floating Elements (Atmospheric) */}
            <FloatingBadge
                icon={Star}
                text="Top Pick of the Week"
                delay={0}
                className="top-[15%] right-[10%]"
            />
            <FloatingBadge
                icon={TrendingUp}
                text="Trending Now"
                delay={0.5}
                className="bottom-[20%] right-[20%]"
            />
        </section>
    );
};

export default PremiumHero;
