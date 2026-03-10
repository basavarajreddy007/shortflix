import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, Mail, MapPin, Phone, 
  Facebook, Twitter, Instagram, Youtube, 
  Github, Linkedin, MessageCircle, Sparkles 
} from 'lucide-react';

const FuturisticFooter= () => {
 const socialLinks = [
   { icon: Facebook, url: '#', color: 'hover:text-blue-400 hover:shadow-blue-500/50' },
   { icon: Twitter, url: '#', color: 'hover:text-cyan-400 hover:shadow-cyan-500/50' },
    { icon: Instagram, url: '#', color: 'hover:text-pink-400 hover:shadow-pink-500/50' },
   { icon: Youtube, url: '#', color: 'hover:text-red-400 hover:shadow-red-500/50' },
   { icon: Github, url: '#', color: 'hover:text-purple-400 hover:shadow-purple-500/50' },
   { icon: Linkedin, url: '#', color: 'hover:text-blue-600 hover:shadow-blue-700/50' },
 ];

const footerLinks = {
   Company: ['About Us', 'Careers', 'Press', 'Blog'],
   Support: ['Help Center', 'Contact Us', 'FAQ', 'Accessibility'],
   Legal: ['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Licensing'],
   Content: ['Genres', 'New Releases', 'Popular', 'Trending'],
 };

 return (
    <footer className="relative bg-gradient-to-t from-[#0a0a1a] via-[#0f0f1f] to-netflix-black pt-16 pb-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
       <div
          className="absolute inset-0"
       style={{
           backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
         }}
        />
      </div>

      {/* Top Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-60" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          
          {/* Brand Section */}
         <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Logo */}
            <div className="flex items-center gap-3 mb-4">
             <motion.div
               animate={{
                 boxShadow: [
                   '0 0 20px rgba(6, 182, 212, 0.5)',
                   '0 0 30px rgba(168, 85, 247, 0.5)',
                   '0 0 20px rgba(6, 182, 212, 0.5)'
                 ]
               }}
               transition={{ duration: 3, repeat: Infinity }}
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 flex items-center justify-center"
             >
               <Sparkles className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-black">
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">SHORT</span>
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">FLIX</span>
                </h3>
                <p className="text-xs text-gray-400 tracking-wider">The Future of Streaming</p>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed">
              Experience the next generation of entertainment. AI-powered recommendations, stunning quality, and unlimited possibilities.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-4">
             {socialLinks.map((social, index) => (
               <motion.a
                 key={index}
                 href={social.url}
                 initial={{ opacity: 0, scale: 0 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                 whileHover={{ scale: 1.2, y: -5 }}
                  className={`w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center ${social.color} transition-all duration-300 hover:bg-white/10 hover:shadow-lg`}
               >
                 <social.icon className="w-5 h-5" />
               </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Links */}
         {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
           <motion.div
             key={category}
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
           >
              <h4 className="text-white font-bold mb-4 flex items-center gap-2">
               <div className="w-1 h-4 bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full" />
               {category}
              </h4>
              <ul className="space-y-2">
               {links.map((link, linkIndex) => (
                 <li key={link}>
                   <motion.a
                     href="#"
                     initial={{ x: -10, opacity: 0 }}
                     whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: linkIndex * 0.05 }}
                     whileHover={{ x: 5 }}
                      className="text-gray-400 hover:text-cyan-400 transition-colors text-sm block"
                   >
                     {link}
                   </motion.a>
                 </li>
               ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact & AI Assistant Section */}
        <motion.div
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-white/10 pt-8 mt-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            
            {/* Contact Info */}
           <div className="space-y-3">
              <h4 className="text-white font-bold flex items-center gap-2">
               <Mail className="w-4 h-4 text-cyan-400" />
               Contact Us
              </h4>
             <div className="space-y-2 text-sm text-gray-400">
               <div className="flex items-center gap-2">
                 <MapPin className="w-4 h-4 text-purple-400" />
                 <span>123 Innovation Drive, Tech City</span>
               </div>
               <div className="flex items-center gap-2">
                 <Phone className="w-4 h-4 text-pink-400" />
                 <span>+1 (555) 123-4567</span>
               </div>
               <div className="flex items-center gap-2">
                 <MessageCircle className="w-4 h-4 text-cyan-400" />
                 <span>support@shortflix.com</span>
               </div>
             </div>
           </div>

            {/* AI Assistant */}
           <motion.div
             whileHover={{ scale: 1.02 }}
              className="md:col-span-2 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-md border border-white/10 rounded-2xl p-6"
           >
              <div className="flex items-start gap-4">
               <motion.div
                 animate={{
                   boxShadow: [
                     '0 0 20px rgba(6, 182, 212, 0.5)',
                     '0 0 30px rgba(168, 85, 247, 0.5)',
                     '0 0 20px rgba(6, 182, 212, 0.5)'
                   ]
                 }}
                 transition={{ duration: 3, repeat: Infinity }}
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0"
               >
                 <MessageCircle className="w-7 h-7 text-white" />
               </motion.div>
               
               <div className="flex-1">
                 <h4 className="text-xl font-bold text-white mb-2">AI Assistant Available 24/7</h4>
                 <p className="text-gray-400 text-sm mb-4">
                   Get instant help with any questions. Our AI-powered assistant is here to guide you through your streaming experience.
                 </p>
                 <motion.button
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl font-bold text-white hover:shadow-lg hover:shadow-cyan-500/30 transition-all flex items-center gap-2"
                 >
                   <MessageCircle className="w-5 h-5" />
                   <span>Chat with AI Assistant</span>
                 </motion.button>
               </div>
             </div>
           </motion.div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.p
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-500 text-sm text-center md:text-left"
          >
            © {new Date().getFullYear()} ShortFlix. All rights reserved. Made with <Heart className="w-4 h-4 inline text-red-500 fill-red-500" /> for the future.
          </motion.p>
          
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Cookies</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default FuturisticFooter;
