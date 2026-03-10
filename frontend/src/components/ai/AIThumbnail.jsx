import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Cpu, Sparkles, Zap } from 'lucide-react';

const AIThumbnail = ({ 
  title = "ARTIFICIAL INTELLIGENCE",
  subtitle = "The Future is Here",
  showNodes = true,
  showPulses = true 
}) => {
  // Static nodes for thumbnail (optimized)
 const nodes = [
    { id: 1, x: 400, y: 300, size: 20, color: '#f472b6' },
    { id: 2, x: 300, y: 250, size: 15, color: '#c084fc' },
    { id: 3, x: 500, y: 250, size: 15, color: '#60a5fa' },
    { id: 4, x: 250, y: 350, size: 12, color: '#c084fc' },
    { id: 5, x: 550, y: 350, size: 12, color: '#60a5fa' },
    { id: 6, x: 350, y: 200, size: 10, color: '#f472b6' },
    { id: 7, x: 450, y: 200, size: 10, color: '#60a5fa' },
    { id: 8, x: 350, y: 400, size: 10, color: '#c084fc' },
    { id: 9, x: 450, y: 400, size: 10, color: '#f472b6' },
    { id: 10, x: 200, y: 300, size: 8, color: '#60a5fa' },
    { id: 11, x: 600, y: 300, size: 8, color: '#f472b6' },
    { id: 12, x: 400, y: 150, size: 8, color: '#c084fc' },
  ];

 const connections = [
    { from: 0, to: 1, thickness: 3 },
    { from: 0, to: 2, thickness: 3 },
    { from: 0, to: 3, thickness: 2 },
    { from: 0, to: 4, thickness: 2 },
    { from: 1, to: 5, thickness: 2 },
    { from: 1, to: 6, thickness: 2 },
    { from: 2, to: 6, thickness: 2 },
    { from: 2, to: 7, thickness: 2 },
    { from: 3, to: 8, thickness: 2 },
    { from: 3, to: 9, thickness: 1.5 },
    { from: 4, to: 7, thickness: 2 },
    { from: 4, to: 10, thickness: 1.5 },
    { from: 5, to: 11, thickness: 1.5 },
    { from: 6, to: 11, thickness: 1.5 },
    { from: 7, to: 10, thickness: 1.5 },
    { from: 8, to: 9, thickness: 1.5 },
  ];

 return (
    <div className="relative w-full aspect-video bg-[#0a0a1a] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#1a0a2e] to-[#0a0a1a]" />
      
      {/* Animated Grid */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(rgba(96, 165, 250, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(96, 165, 250, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-3xl" />

      {/* SVG Neural Network */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 450">
        <defs>
          <linearGradient id="thumbGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="50%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>
          
          <filter id="thumbGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Connections */}
        {connections.map((conn, i) => {
         const fromNode = nodes[conn.from];
         const toNode = nodes[conn.to];
          
          return (
            <motion.line
              key={i}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="url(#thumbGradient)"
              strokeWidth={conn.thickness}
              opacity="0.6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: i * 0.1 }}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <g key={node.id}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={node.size}
              fill={node.color}
              filter="url(#thumbGlow)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            />
            <circle
              cx={node.x}
              cy={node.y}
              r={node.size * 0.4}
              fill="#ffffff"
              opacity="0.9"
            />
          </g>
        ))}
      </svg>

      {/* Floating Icons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute top-8 left-8 flex items-center gap-3"
      >
        <Brain className="w-8 h-8 text-cyan-400" />
        <span className="text-lg font-bold text-white/80">AI POWERED</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="absolute top-8 right-8 flex items-center gap-3"
      >
        <span className="text-lg font-bold text-white/80">NEURAL NETWORK</span>
        <Cpu className="w-8 h-8 text-purple-400" />
      </motion.div>

      {/* Main Title */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="text-center px-8">
          <motion.h1
            animate={{
              textShadow: [
                '0 0 30px rgba(96, 165, 250, 0.8)',
                '0 0 50px rgba(192, 132, 252, 0.8)',
                '0 0 30px rgba(96, 165, 250, 0.8)',
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-6xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl tracking-tight"
          >
            {title}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-2xl md:text-3xl font-bold text-white mt-4 tracking-wider"
          >
            {subtitle}
          </motion.p>

          {/* Feature Badges */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-400/50 rounded-full backdrop-blur-sm"
            >
              <Zap className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-bold text-cyan-100">DEEP LEARNING</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-400/50 rounded-full backdrop-blur-sm"
            >
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-bold text-purple-100">MACHINE LEARNING</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="flex items-center gap-2 px-4 py-2 bg-pink-500/20 border border-pink-400/50 rounded-full backdrop-blur-sm"
            >
              <Brain className="w-5 h-5 text-pink-400" />
              <span className="text-sm font-bold text-pink-100">NEURAL AI</span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Gradient for Readability */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/90 to-transparent" />

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/50 via-transparent to-black/50" />

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-cyan-500/30 to-transparent rounded-br-full" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-pink-500/30 to-transparent rounded-bl-full" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/30 to-transparent rounded-tr-full" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-cyan-500/30 to-transparent rounded-tl-full" />
    </div>
  );
};

export default AIThumbnail;
