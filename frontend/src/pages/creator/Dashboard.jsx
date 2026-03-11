import React, { useState } from 'react';
import api from '../../utils/api';
import Navbar from '../../components/layout/Navbar';
import { Upload, Film, Image as ImageIcon, CheckCircle, Loader2, X, Wand2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CreatorDashboard = () => {
   const navigate = useNavigate();
   const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [videoFile, setVideoFile] = useState(null);
    const [thumbFile, setThumbFile] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        genre: 'Action'
    });

    const handleUpload = async (e) => {
        e.preventDefault();
        setUploading(true);
        const data = new FormData();
        data.append('video', videoFile);
        data.append('thumbnail', thumbFile);
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('genre', formData.genre);

        try {
            await api.post('/api/videos/upload', data);
            setSuccess(true);
        } catch (err) {
            console.error(err);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="bg-netflix-black min-h-screen pt-24 pb-12 px-4 md:px-8">
            <Navbar />

            <div className="max-w-4xl mx-auto">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Creator Dashboard</h1>
                        <p className="text-gray-400">Share your stories with the world</p>
                    </div>
                    
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/upload')}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-bold text-white hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
                    >
                        <Wand2 className="w-5 h-5" />
                        <span>Try AI Uploader</span>
                    </motion.button>
                </div>

                {success ? (
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="glass p-12 rounded-3xl text-center space-y-6"
                    >
                        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle className="w-12 h-12 text-green-500" />
                        </div>
                        <h2 className="text-2xl font-bold">Successfully Published!</h2>
                        <p className="text-gray-400">Your film is now live on ShortFlix and available to all viewers.</p>
                        <button
                            onClick={() => { setSuccess(false); setVideoFile(null); setThumbFile(null); }}
                            className="bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors"
                        >
                            Upload Another
                        </button>
                    </motion.div>
                ) : (
                    <form onSubmit={handleUpload} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* File Drop Zones */}
                            <div className="space-y-4">
                                <label className="text-sm font-bold text-gray-400 flex items-center gap-2">
                                    <Film className="w-4 h-4" /> Video File (MP4, MOV)
                                </label>
                                <div
                                    className={`border-2 border-dashed rounded-2xl h-64 flex flex-col items-center justify-center p-6 text-center transition-colors cursor-pointer ${videoFile ? 'border-netflix-red bg-netflix-red/5' : 'border-white/10 hover:border-white/30'}`}
                                    onClick={() => document.getElementById('video-input').click()}
                                >
                                    <input id="video-input" type="file" hidden accept="video/*" onChange={e => setVideoFile(e.target.files[0])} />
                                    {videoFile ? (
                                        <div className="space-y-2">
                                            <p className="text-white font-medium truncate max-w-[200px]">{videoFile.name}</p>
                                            <button type="button" onClick={(e) => { e.stopPropagation(); setVideoFile(null); }} className="text-xs text-red-500 hover:underline">Remove</button>
                                        </div>
                                    ) : (
                                        <>
                                            <Upload className="w-10 h-10 text-gray-500 mb-4" />
                                            <p className="text-sm text-gray-400">Drag & drop video or click to browse</p>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-sm font-bold text-gray-400 flex items-center gap-2">
                                    <ImageIcon className="w-4 h-4" /> Thumbnail Image
                                </label>
                                <div
                                    className={`border-2 border-dashed rounded-2xl h-64 flex flex-col items-center justify-center p-6 text-center transition-colors cursor-pointer ${thumbFile ? 'border-netflix-red bg-netflix-red/5' : 'border-white/10 hover:border-white/30'}`}
                                    onClick={() => document.getElementById('thumb-input').click()}
                                >
                                    <input id="thumb-input" type="file" hidden accept="image/*" onChange={e => setThumbFile(e.target.files[0])} />
                                    {thumbFile ? (
                                        <div className="space-y-2">
                                            <p className="text-white font-medium truncate max-w-[200px]">{thumbFile.name}</p>
                                            <button type="button" onClick={(e) => { e.stopPropagation(); setThumbFile(null); }} className="text-xs text-red-500 hover:underline">Remove</button>
                                        </div>
                                    ) : (
                                        <>
                                            <Upload className="w-10 h-10 text-gray-500 mb-4" />
                                            <p className="text-sm text-gray-400">Optimal size: 1280x720</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Metadata Fields */}
                        <div className="glass p-8 rounded-3xl space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Title</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Midnight in Mumbai"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:ring-2 focus:ring-netflix-red"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Genre</label>
                                    <select
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:ring-2 focus:ring-netflix-red"
                                        value={formData.genre}
                                        onChange={e => setFormData({ ...formData, genre: e.target.value })}
                                    >
                                        {['Action', 'Drama', 'Comedy', 'Horror', 'Sci-Fi', 'Documentary'].map(g => (
                                            <option key={g} value={g} className="bg-netflix-dark">{g}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Plot Description</label>
                                <textarea
                                    rows="4"
                                    required
                                    placeholder="What happens in this film?"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:ring-2 focus:ring-netflix-red resize-none"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={uploading || !videoFile || !thumbFile}
                                className="w-full bg-netflix-red py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg shadow-red-500/20"
                            >
                                {uploading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Upload className="w-6 h-6" />}
                                {uploading ? 'Processing & Uploading...' : 'Publish to ShortFlix'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default CreatorDashboard;
