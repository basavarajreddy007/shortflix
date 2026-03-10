import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/layout/Navbar';
import { Sparkles, Send, Copy, Download, Save, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ScriptWriter = () => {
    const [formData, setFormData] = useState({
        title: '',
        genre: 'Action',
        mood: 'Intense',
        characters: '',
        length: 'Short (5 mins)'
    });
    const [script, setScript] = useState('');
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await axios.post('http://localhost:5000/api/ai/generate-script', formData);
            setScript(res.data.content);
        } catch (err) {
            console.error(err);
            const errorMsg = err.response?.data?.isQuotaExceeded
                ? "AI Quota Exceeded. Please wait a minute or use a different API key."
                : (err.response?.data?.message || 'AI Generation Failed. Please try again.');
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };


    const copyToClipboard = () => {
        navigator.clipboard.writeText(script);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="bg-netflix-black min-h-screen pt-24 pb-12 px-4 md:px-8">
            <Navbar />

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Input Panel */}
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="lg:col-span-1 space-y-6"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-netflix-red rounded-xl">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">AI Script Writer</h1>
                            <p className="text-sm text-gray-400">Generate masterpieces in seconds</p>
                        </div>
                    </div>

                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm italic"
                            >
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={(e) => { setError(''); handleSubmit(e); }} className="glass p-6 rounded-2xl space-y-4">

                        <div>
                            <label className="text-sm text-gray-400 block mb-1">Film Title</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-netflix-red outline-none"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-gray-400 block mb-1">Genre</label>
                                <select
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-2 focus:ring-2 focus:ring-netflix-red outline-none"
                                    value={formData.genre}
                                    onChange={e => setFormData({ ...formData, genre: e.target.value })}
                                >
                                    {['Action', 'Drama', 'Comedy', 'Horror', 'Sci-Fi', 'Romance'].map(g => (
                                        <option key={g} value={g} className="bg-netflix-dark">{g}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="text-sm text-gray-400 block mb-1">Mood</label>
                                <select
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-2 focus:ring-2 focus:ring-netflix-red outline-none"
                                    value={formData.mood}
                                    onChange={e => setFormData({ ...formData, mood: e.target.value })}
                                >
                                    {['Intense', 'Melancholic', 'Upbeat', 'Spooky', 'Nostalgic'].map(m => (
                                        <option key={m} value={m} className="bg-netflix-dark">{m}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm text-gray-400 block mb-1">Characters & Brief Idea</label>
                            <textarea
                                rows="4"
                                placeholder="E.g. Two spies meeting in a cafe..."
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-netflix-red outline-none resize-none"
                                value={formData.characters}
                                onChange={e => setFormData({ ...formData, characters: e.target.value })}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-netflix-red py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-colors disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                            {loading ? 'Thinking...' : 'Generate Script'}
                        </button>
                    </form>
                </motion.div>

                {/* Output Panel */}
                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="lg:col-span-2"
                >
                    <div className="glass h-full min-h-[600px] rounded-2xl overflow-hidden flex flex-col">
                        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                            <span className="text-sm font-medium text-gray-400 tracking-widest uppercase">Script Output</span>
                            {script && (
                                <div className="flex items-center gap-2">
                                    <button onClick={copyToClipboard} className="p-2 hover:bg-white/10 rounded-lg transition-colors" title="Copy">
                                        <Copy className={`w-5 h-5 ${saved ? 'text-green-500' : 'text-gray-400'}`} />
                                    </button>
                                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors" title="Save">
                                        <Save className="w-5 h-5 text-gray-400" />
                                    </button>
                                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors" title="Download">
                                        <Download className="w-5 h-5 text-gray-400" />
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="flex-1 p-8 overflow-y-auto whitespace-pre-wrap font-mono text-sm leading-relaxed text-gray-300">
                            {loading ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <Loader2 className="w-12 h-12 text-netflix-red animate-spin" />
                                    <p className="text-gray-500 animate-pulse">Our AI is drafting your next big hit...</p>
                                </div>
                            ) : script ? (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    {script}
                                </motion.div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center text-gray-600">
                                    <Sparkles className="w-16 h-16 mb-4 opacity-20" />
                                    <p>Configure your story settings and click generate to see the magic.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ScriptWriter;
