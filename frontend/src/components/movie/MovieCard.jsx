import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Plus, ThumbsUp, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    return (
        <div
            className="relative flex-none w-[200px] h-[300px] md:w-[250px] md:h-40 cursor-pointer group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => navigate(`/watch/${movie._id}`)}
        >
            <img
                src={movie.thumbnailUrl || movie.poster}

                alt={movie.title}
                className="w-full h-full object-cover rounded-sm transition-opacity duration-300 group-hover:opacity-0"
            />

            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: 0 }}
                        animate={{ scale: 1.2, opacity: 1, y: -40 }}
                        exit={{ scale: 0.8, opacity: 0, y: 0 }}
                        className="absolute top-0 left-0 w-full z-20 bg-netflix-dark rounded-md shadow-2xl"
                    >
                        <div className="relative h-32 md:h-40">
                            <img
                                src={movie.thumbnailUrl || movie.poster}

                                alt={movie.title}
                                className="w-full h-full object-cover rounded-t-md"
                            />
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full border-2 border-white/50 flex items-center justify-center bg-black/40">
                                    <Play className="w-6 h-6 fill-white text-white" />
                                </div>
                            </div>
                        </div>

                        <div className="p-4 space-y-3">
                            <div className="flex items-center gap-3">
                                <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors">
                                    <Play className="w-4 h-4 fill-black text-black ml-0.5" />
                                </button>
                                <button className="w-8 h-8 rounded-full border-2 border-gray-500 flex items-center justify-center hover:border-white transition-colors">
                                    <Plus className="w-4 h-4 text-white" />
                                </button>
                                <button className="w-8 h-8 rounded-full border-2 border-gray-500 flex items-center justify-center hover:border-white transition-colors">
                                    <ThumbsUp className="w-4 h-4 text-white" />
                                </button>
                                <div className="ml-auto">
                                    <button className="w-8 h-8 rounded-full border-2 border-gray-500 flex items-center justify-center hover:border-white transition-colors">
                                        <ChevronDown className="w-4 h-4 text-white" />
                                    </button>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-bold text-sm text-white">{movie.title}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-green-500 text-xs font-bold">98% Match</span>
                                    <span className="border border-gray-500 px-1 text-[10px] text-gray-300">HD</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <span className="text-xs text-white">{movie.genre}</span>
                                <span className="text-xs text-gray-500">•</span>
                                <span className="text-xs text-white">Exciting</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MovieCard;
