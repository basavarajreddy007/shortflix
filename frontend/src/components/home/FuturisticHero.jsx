import React from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, Cpu, Zap, Star, Shield, Globe, MousePointer2 } from 'lucide-react';

const GlassBadge = ({ icon: Icon, text, delay = 0, className = "" }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
            opacity: 1,
            y: [0, -10, 0],
        }}
        transition={{
            opacity: { duration: 0.8, delay },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay }
        }}
        className={`hidden md:flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] ${className}`}
    >
        <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/20">
            <Icon size={16} className="text-white" />
        </div>
        <span className="text-sm font-semibold text-white/90 tracking-wide">{text}</span>
    </motion.div>
);

const DecorativeRing = ({ size, duration, delay, color }) => (
    <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration, repeat: Infinity, ease: "linear", delay }}
        style={{ width: size, height: size }}
        className={`absolute rounded-full border border-dashed ${color} opacity-20 pointer-events-none`}
    />
);

const FuturisticHero = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 40, opacity: 0, filter: "blur(10px)" },
        visible: {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
        }
    };

    return (
        <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#020205] pt-20">
            {/* --- BACKGROUND LAYER --- */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {/* Dynamic Aura Glows */}
                <div className="absolute top-[10%] left-[-5%] w-[500px] h-[500px] bg-indigo-600/20 blur-[140px] rounded-full mix-blend-screen animate-pulse" />
                <div className="absolute bottom-[5%] right-[-5%] w-[600px] h-[600px] bg-purple-600/10 blur-[160px] rounded-full mix-blend-screen" />
                <div className="absolute top-[30%] right-[10%] w-[300px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full" />

                {/* Tech Grid Overlay */}
                <div className="absolute inset-0 z-0 opacity-[0.05]"
                    style={{
                        backgroundImage: `linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)`,
                        backgroundSize: '80px 80px'
                    }}
                />
            </div>

            {/* --- DECORATIVE ELEMENTS --- */}
            <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
                <DecorativeRing size="400px" duration={25} delay={0} color="border-indigo-500/30" />
                <DecorativeRing size="600px" duration={40} delay={1} color="border-purple-500/20" />
                <DecorativeRing size="800px" duration={60} delay={2} color="border-blue-500/10" />
            </div>

            {/* --- CONTENT LAYER --- */}
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-center max-w-5xl mx-auto"
                >
                    {/* Top Label */}
                    <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-xl group hover:border-indigo-500/50 transition-colors pointer-events-auto cursor-default">
                        <Sparkles className="w-4 h-4 text-indigo-400 group-hover:scale-125 transition-transform" />
                        <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-indigo-200/80">AI-Powered Cinematic Hub</span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl sm:text-7xl lg:text-9xl font-black mb-8 tracking-tight leading-[0.9] text-white"
                    >
                        THE FUTURE OF <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 animate-gradient pb-2 block sm:inline">
                            DIGITAL CINEMA
                        </span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        variants={itemVariants}
                        className="text-base sm:text-lg lg:text-xl text-indigo-100/60 mb-12 max-w-2xl mx-auto leading-relaxed font-light"
                    >
                        Welcome to the next generation of entertainment. Experience ultra-crisp streaming,
                        AI-curated recommendations, and immersive storytelling built for the modern era.
                    </motion.p>

                    {/* CTA Group */}
                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <button className="group relative px-10 py-5 bg-white text-black rounded-2xl font-bold flex items-center gap-3 overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(79,70,229,0.3)]">
                            <Play className="w-5 h-5 fill-black" />
                            <span className="relative z-10">START STREAMING</span>
                            <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/5 transition-colors" />
                        </button>

                        <button className="relative px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold transition-all backdrop-blur-xl group overflow-hidden">
                            <span className="relative z-10 flex items-center gap-3">
                                EXPLORE HUB <Zap size={18} className="text-yellow-400 group-hover:scale-110 transition-transform" />
                            </span>
                        </button>
                    </motion.div>
                </motion.div>
            </div>

            {/* --- FLOATING BADGES --- */}
            <GlassBadge icon={Star} text="Top Rated Content" className="top-[22%] left-[8%]" delay={0} />
            <GlassBadge icon={Cpu} text="AI Recommendations" className="bottom-[28%] left-[12%]" delay={1.2} />
            <GlassBadge icon={Shield} text="Ultra Secure HD" className="top-[25%] right-[10%]" delay={0.6} />
            <GlassBadge icon={Globe} text="Global Streaming" className="bottom-[25%] right-[14%]" delay={1.8} />

            {/* --- SCROLL INDICATOR --- */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 cursor-pointer"
            >
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-indigo-300/40">Scroll</span>
                <div className="w-[2px] h-16 rounded-full bg-indigo-500/10 relative overflow-hidden">
                    <motion.div
                        animate={{ y: ["-100%", "200%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/80 to-transparent"
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default FuturisticHero;
