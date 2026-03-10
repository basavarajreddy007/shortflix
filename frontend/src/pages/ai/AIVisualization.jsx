import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import AINeuralNetwork from '../../components/ai/AINeuralNetwork';
import AIThumbnail from '../../components/ai/AIThumbnail';
import { Brain, Cpu, Sparkles, Download, Share2 } from 'lucide-react';

const AIVisualization = () => {
 return (
    <div className="bg-netflix-black min-h-screen pb-20">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[600px] overflow-hidden">
        <AINeuralNetwork />
        
        {/* Overlay Content */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center px-4"
          >
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4 drop-shadow-2xl">
              AI Neural Network
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 drop-shadow-lg">
              Futuristic Visualization for Next-Gen Content
            </p>
            
            <div className="flex items-center justify-center gap-4 pointer-events-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-bold text-white hover:shadow-2xl hover:shadow-cyan-500/50 transition-all"
              >
                <Download className="w-6 h-6" />
                <span>Download Thumbnail</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full font-bold text-white hover:bg-white/20 transition-all"
              >
                <Share2 className="w-6 h-6" />
                <span>Share</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-4 md:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Premium AI Visualizations
          </h2>
          <p className="text-center text-gray-400 mb-12 text-lg">
            Professional-grade thumbnails and backgrounds for your tech content
          </p>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div
              whileHover={{ y: -10 }}
              className="glass p-8 rounded-2xl space-y-4"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Neural Network Design</h3>
              <p className="text-gray-400">
                Biologically-inspired architecture with interconnected nodes mimicking brain synapses
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -10 }}
              className="glass p-8 rounded-2xl space-y-4"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Animated Data Pulses</h3>
              <p className="text-gray-400">
                Real-time data flow visualization with traveling pulses across neural connections
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -10 }}
              className="glass p-8 rounded-2xl space-y-4"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl flex items-center justify-center">
                <Cpu className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">YouTube Optimized</h3>
              <p className="text-gray-400">
                Perfect 16:9 aspect ratio, high contrast, and bold composition for maximum impact
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Thumbnail Preview Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            YouTube Thumbnail Preview
          </h3>
          
          <div className="rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/30 border border-white/10">
            <AIThumbnail 
             title="ARTIFICIAL INTELLIGENCE"
              subtitle="Revolutionary Technology"
            />
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="rounded-xl overflow-hidden shadow-xl shadow-cyan-500/20 border border-cyan-400/30"
            >
              <AIThumbnail 
               title="MACHINE LEARNING"
                subtitle="Deep Neural Networks"
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="rounded-xl overflow-hidden shadow-xl shadow-pink-500/20 border border-pink-400/30"
            >
              <AIThumbnail 
               title="DEEP LEARNING"
                subtitle="AI Revolution"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Usage Examples */}
        <motion.div
          initial={{ opacity: 0, mt: 80 }}
          whileInView={{ opacity: 1, mt: 0 }}
          viewport={{ once: true }}
          className="mt-20 glass p-12 rounded-3xl"
        >
          <h3 className="text-3xl font-bold text-white mb-6">
            Perfect For:
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Brain, text: 'AI Tutorials' },
              { icon: Cpu, text: 'Tech Reviews' },
              { icon: Sparkles, text: 'Innovation Talks' },
              { icon: Download, text: 'Online Courses' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
              >
                <item.icon className="w-10 h-10 text-cyan-400" />
                <span className="text-white font-semibold">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="px-4 md:px-8 py-20 mt-20"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Ready to Create Stunning Content?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Use our AI-powered visualizations to captivate your audience
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full font-bold text-xl hover:shadow-2xl hover:shadow-purple-500/40 transition-all"
          >
            Get Started Now
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default AIVisualization;
