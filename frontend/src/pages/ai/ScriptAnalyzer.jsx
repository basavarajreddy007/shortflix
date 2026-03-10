import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/layout/Navbar';
import { BarChart3, Upload, FileText, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


const ScriptAnalyzer = () => {
    const [content, setContent] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    const handleAnalyze = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await axios.post('http://localhost:5000/api/ai/analyze-script', { content });
            setAnalysis(res.data);
        } catch (err) {
            console.error(err);
            const errorMsg = err.response?.data?.isQuotaExceeded
                ? "AI Quota Exceeded. Please wait 60 seconds."
                : (err.response?.data?.message || 'Analysis Failed.');
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };


    const ScoreBar = ({ label, score, color }) => (
        <div className="space-y-2">
            <div className="flex justify-between text-sm">
                <span className="text-gray-400">{label}</span>
                <span className="font-bold">{score}/10</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${score * 10}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full ${color}`}
                />
            </div>
        </div>
    );

    return (
        <div className="bg-netflix-black min-h-screen pt-24 pb-12 px-4 md:px-8">
            <Navbar />

            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-600 rounded-xl">
                        <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">AI Script Analyzer</h1>
                        <p className="text-gray-400">Professional screenplay diagnostics and audience predictions</p>
                    </div>
                </div>

                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm italic text-center"
                        >
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>


                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Input Section */}
                    <div className="glass p-8 rounded-3xl space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <FileText className="w-5 h-5 text-netflix-red" /> Input Script
                            </h2>
                            <button className="text-xs text-gray-400 hover:text-white flex items-center gap-1 border border-white/10 px-3 py-1 rounded-full uppercase tracking-widest">
                                <Upload className="w-3 h-3" /> Upload PDF
                            </button>
                        </div>

                        <textarea
                            rows="15"
                            placeholder="Paste your script text here..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 outline-none focus:ring-2 focus:ring-purple-500 resize-none font-mono text-sm leading-relaxed"
                            value={content}
                            onChange={e => setContent(e.target.value)}
                        />

                        <button
                            onClick={handleAnalyze}
                            disabled={loading || !content}
                            className="w-full bg-purple-600 py-4 rounded-xl font-bold text-lg hover:bg-purple-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Sparkles className="w-6 h-6" />}
                            {loading ? 'Analyzing Architecture...' : 'Analyze Script'}
                        </button>
                    </div>

                    {/* Analysis Results */}
                    <div className="space-y-8">
                        {analysis ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="space-y-6"
                            >
                                {/* Scores Card */}
                                <div className="glass p-8 rounded-3xl space-y-6">
                                    <h3 className="text-lg font-bold">Diagnostic Scores</h3>
                                    <div className="grid gap-6">
                                        <ScoreBar label="Story Quality" score={analysis.storyQuality} color="bg-blue-500" />
                                        <ScoreBar label="Dialogue Strength" score={analysis.dialogueStrength} color="bg-green-500" />
                                        <ScoreBar label="Character Depth" score={analysis.characterDepth} color="bg-yellow-500" />
                                        <ScoreBar label="Emotional Impact" score={analysis.emotionalImpact} color="bg-pink-500" />
                                    </div>
                                </div>

                                {/* Rating Card */}
                                <div className="bg-gradient-to-br from-purple-900/40 to-black glass p-8 rounded-3xl flex items-center justify-between">
                                    <div>
                                        <h3 className="text-gray-400 text-sm uppercase tracking-widest mb-1">Predicted Rating</h3>
                                        <p className="text-3xl font-black">{analysis.predictedRating}/10</p>
                                    </div>
                                    <div className="px-4 py-2 bg-green-500/20 text-green-500 rounded-full text-sm font-bold border border-green-500/20">
                                        High Potential
                                    </div>
                                </div>

                                {/* Suggestions Card */}
                                <div className="glass p-8 rounded-3xl space-y-4">
                                    <h3 className="text-lg font-bold flex items-center gap-2">
                                        <AlertCircle className="w-5 h-5 text-yellow-500" /> Suggestions for Improvement
                                    </h3>
                                    <ul className="space-y-3">
                                        {analysis.suggestions.map((s, i) => (
                                            <li key={i} className="flex gap-3 text-sm text-gray-300">
                                                <span className="text-purple-500 font-bold">•</span>
                                                {s}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="h-full border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center p-12 text-center text-gray-600 grayscale opacity-50">
                                <BarChart3 className="w-24 h-24 mb-6" />
                                <h3 className="text-xl font-bold">No Analysis Yet</h3>
                                <p className="max-w-xs mx-auto mt-2">Submit your script to see deep diagnostics and audience impact scores.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScriptAnalyzer;
