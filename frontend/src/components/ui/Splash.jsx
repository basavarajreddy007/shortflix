import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Splash = ({ onFinish }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onFinish, 1000); // Wait for fade out
        }, 3000);
        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="fixed inset-0 z-[9999] bg-netflix-black flex flex-col items-center justify-center overflow-hidden"
                >
                    {/* Animated Background */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-netflix-red/20 via-transparent to-netflix-black opacity-50" />
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-netflix-red/10 blur-[150px] rounded-full"
                        />
                    </div>

                    {/* Logo Animation */}
                    <div className="relative z-10 text-center">
                        <motion.h1
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                duration: 1.5,
                                ease: [0, 0.71, 0.2, 1.01],
                                scale: {
                                    type: "spring",
                                    damping: 5,
                                    stiffness: 100,
                                    restDelta: 0.001
                                }
                            }}
                            className="text-7xl md:text-9xl font-black text-netflix-red tracking-tighter drop-shadow-2xl"
                        >
                            SHORT<span className="text-white">FLIX</span>
                        </motion.h1>

                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2, delay: 0.5 }}
                            className="h-1 bg-netflix-red mt-4 rounded-full mx-auto"
                        />

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.5 }}
                            className="mt-4 text-gray-400 font-medium tracking-widest uppercase text-sm"
                        >
                            The AI-Powered OTT Experience
                        </motion.p>
                    </div>

                    {/* Loading Animation */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                className="w-3 h-3 bg-netflix-red rounded-full"
                            />
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Splash;
