import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AINeuralNetwork = () => {
 const [nodes, setNodes] = useState([]);
 const [connections, setConnections] = useState([]);
 const [pulses, setPulses] = useState([]);

  // Generate neural network nodes
  useEffect(() => {
   const nodeCount = 30;
   const newNodes = [];
    
    // Create nodes in a brain-like structure(centered, denser in middle)
    for (let i = 0; i < nodeCount; i++) {
     const angle = Math.random() * Math.PI * 2;
      // More nodes in center, fewer on edges (brain shape)
     const radius = Math.random() * 250 + (Math.random() > 0.5 ? 50 : 100);
     const x = Math.cos(angle) * radius + 400; // Center horizontally
     const y = Math.sin(angle) * (radius * 0.6) + 300; // Compress vertically for brain shape
      
      newNodes.push({
        id: i,
        x,
        y,
        size: Math.random() * 8 +6,
       color: i < 5 ? '#f472b6' : i < 10 ? '#c084fc' : '#60a5fa', // Pink, Purple, Blue
        glowColor: i < 5 ? 'rgba(244, 114, 182, 0.8)' : i < 10 ? 'rgba(192, 132, 252, 0.8)' : 'rgba(96, 165, 250, 0.8)',
      });
    }
    
   setNodes(newNodes);

    // Create connections between nearby nodes
   const newConnections = [];
    for (let i = 0; i < newNodes.length; i++) {
      for (let j = i + 1; j < newNodes.length; j++) {
       const dx = newNodes[i].x - newNodes[j].x;
       const dy = newNodes[i].y - newNodes[j].y;
       const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) { // Connect nearby nodes
          newConnections.push({
            id: `${i}-${j}`,
            from: i,
            to: j,
           thickness: Math.random() * 2 + 1,
            opacity: 1 - (distance / 120),
          });
        }
      }
    }
    
   setConnections(newConnections);

    // Create data pulses traveling along connections
   const interval = setInterval(() => {
      if (newConnections.length> 0) {
       const randomConn = newConnections[Math.floor(Math.random() * newConnections.length)];
       const newPulse = {
          id: Date.now(),
         connectionId: randomConn.id,
         progress: 0,
          speed: Math.random() * 2 +1,
        };
        
       setPulses(prev => [...prev.slice(-15), newPulse]); // Keep last 15 pulses
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  // Animate pulses
  useEffect(() => {
   const animatePulses = setInterval(() => {
     setPulses(prev => 
       prev
          .map(pulse => ({
            ...pulse,
           progress: pulse.progress + pulse.speed * 0.02,
          }))
          .filter(pulse => pulse.progress < 1)
      );
    }, 16);

    return () => clearInterval(animatePulses);
  }, []);

 return (
    <div className="relative w-full h-full bg-[#0a0a1a] overflow-hidden">
      {/* Dark Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#1a0a2e] to-[#0a0a1a]" />
      
      {/* Animated Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(96, 165, 250, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(96, 165, 250, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }}
      />

      {/* Background Glow Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
      />
      
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl"
      />

      {/* SVG Neural Network */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600">
        <defs>
          {/* Gradients */}
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0" />
            <stop offset="50%" stopColor="#c084fc" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#f472b6" stopOpacity="0" />
          </linearGradient>
          
          {/* Glow Filters */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id="strongGlow">
            <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Connections */}
        {connections.map(conn => {
         const fromNode = nodes[conn.from];
         const toNode = nodes[conn.to];
          if (!fromNode || !toNode) return null;
          
          return (
            <g key={conn.id}>
              {/* Connection Line */}
              <line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke="url(#connectionGradient)"
                strokeWidth={conn.thickness}
                opacity={conn.opacity * 0.4}
              />
              
              {/* Energy Line */}
              <motion.line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={fromNode.color}
                strokeWidth={conn.thickness * 0.5}
                opacity={conn.opacity * 0.6}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: conn.opacity * 0.6 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              />
            </g>
          );
        })}

        {/* Data Pulses */}
        {pulses.map(pulse => {
         const conn = connections.find(c => c.id === pulse.connectionId);
          if (!conn) return null;
          
         const fromNode = nodes[conn.from];
         const toNode = nodes[conn.to];
          if (!fromNode || !toNode) return null;
          
         const x = fromNode.x + (toNode.x - fromNode.x) * pulse.progress;
         const y = fromNode.y + (toNode.y - fromNode.y) * pulse.progress;
          
          return (
            <g key={pulse.id}>
              <circle cx={x} cy={y} r="4" fill="#ffffff" filter="url(#strongGlow)" />
              <motion.circle
                cx={x}
                cy={y}
                r="8"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                opacity="0.5"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map(node => (
          <g key={node.id}>
            {/* Outer Glow */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={node.size * 1.5}
              fill={node.color}
              opacity="0.3"
              filter="url(#glow)"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: node.id * 0.1,
              }}
            />
            
            {/* Inner Core */}
            <circle
              cx={node.x}
              cy={node.y}
              r={node.size}
              fill={node.color}
              filter="url(#strongGlow)"
            />
            
            {/* Bright Center */}
            <circle
              cx={node.x}
              cy={node.y}
              r={node.size * 0.4}
              fill="#ffffff"
              opacity="0.8"
            />
          </g>
        ))}

        {/* Holographic Circuit Patterns */}
        {[...Array(5)].map((_, i) => (
          <motion.path
            key={i}
            d={`M ${100 + i * 150} 100 L ${150 + i * 150} 150 L ${200 + i * 150} 100`}
            fill="none"
            stroke={`rgba(96, 165, 250, ${0.2 - i * 0.03})`}
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.2 - i * 0.03 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: i * 0.5 }}
          />
        ))}
      </svg>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: '0 0 10px 2px rgba(34, 211, 238, 0.8)'
            }}
            animate={{
              y: [0, Math.random() * -100 - 50],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 +2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/60" />
      
      {/* Central AI Text/Logo Area */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="text-center">
          <motion.h1
            animate={{
              textShadow: [
                '0 0 20px rgba(96, 165, 250, 0.8)',
                '0 0 40px rgba(192, 132, 252, 0.8)',
                '0 0 20px rgba(96, 165, 250, 0.8)',
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-6xl md:text-8xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl"
          >
            AI
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-xl md:text-2xl font-bold text-white/80 mt-4 tracking-widest"
          >
            NEURAL NETWORK
          </motion.p>
        </div>
      </motion.div>

      {/* Bottom Gradient for Thumbnail Text Space */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
    </div>
  );
};

export default AINeuralNetwork;
