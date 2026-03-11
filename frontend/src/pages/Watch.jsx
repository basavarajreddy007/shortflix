import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { ChevronLeft, Info } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import { motion } from 'framer-motion';
import FuturisticVideoPlayer from '../components/video/FuturisticVideoPlayer';
import InteractiveButtons from '../components/video/InteractiveButtons';

const Watch = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const [video, setVideo] = useState(null);
   const [loading, setLoading] = useState(true);
    // Mock user ID (replace with actual auth)
   const userId = 'user_' + Math.random().toString(36).substr(2, 9);

    useEffect(() => {
       const fetchVideo = async () => {
            try {
               const res = await api.get(`/api/videos/${id}`);
               setVideo(res.data);
            } catch (err) {
               console.error(err);
            } finally {
               setLoading(false);
            }
        };
        fetchVideo();
    }, [id]);

    if (loading) return <div className="bg-black min-h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" /></div>;
    if (!video) return <div className="bg-black min-h-screen text-white flex items-center justify-center">Video not found</div>;

    return (
        <div className="bg-netflix-black min-h-screen pb-20">
            <Navbar />

            <div className="pt-20 px-4 md:px-8">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                >
                    <ChevronLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Home
                </button>

                {/* Futuristic Video Player */}
                <FuturisticVideoPlayer video={video} userId={userId} />

                {/* Video Details Section */}
                <div className="max-w-7xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <h1 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            {video.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                            <span className="text-green-500">98% Match</span>
                            <span className="text-gray-400">2024</span>
                            <span className="border border-gray-600px-2 text-xs">HD</span>
                            <span className="text-gray-400">{video.genre}</span>
                        </div>

                        <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
                            {video.description}
                        </p>

                        {/* Interactive Buttons */}
                        <InteractiveButtons video={video} userId={userId} />
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                            <Info className="w-5 h-5 text-gray-400" /> More Details
                        </h3>
                        <div className="text-sm space-y-4">
                            <div>
                                <span className="text-gray-500 block mb-1 uppercase tracking-widest text-[10px] font-black">Release Date</span>
                                <p>{new Date(video.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <span className="text-gray-500 block mb-1 uppercase tracking-widest text-[10px] font-black">Genre</span>
                                <p>{video.genre}</p>
                            </div>
                            <div>
                                <span className="text-gray-500 block mb-1 uppercase tracking-widest text-[10px] font-black">Views</span>
                                <p>{video.views || 0}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Watch;
