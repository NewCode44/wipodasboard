import React from 'react';
import { TemplateConfig } from '../../store/dashboardStore';
import { Facebook, Instagram, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
    </svg>
);

export const VideoPreviewContent: React.FC<{ config: TemplateConfig }> = ({ config }) => {
  if (!config.videoUrl) return null;

  return (
    <div className="w-full h-full flex overflow-hidden">
      {/* Left Panel - Video */}
      <div className="w-3/5 h-full relative overflow-hidden bg-black">
        <video
          key={config.videoUrl}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={config.videoUrl} type="video/mp4" />
          Tu navegador no soporta el tag de video.
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
      </div>

      {/* Right Panel - Content */}
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-2/5 h-full bg-background-dark/80 backdrop-blur-2xl flex flex-col justify-center p-12"
      >
        <div className="w-full max-w-sm mx-auto text-center">
          <img src={config.candidateImage} alt={config.candidateName} className="w-24 h-24 rounded-full mx-auto mb-4 border-4" style={{ borderColor: config.primaryColor }} />
          
          <h1 className="text-2xl font-bold text-white">{config.candidateName}</h1>
          <p className="text-gray-300 mb-2">{config.candidatePosition}</p>
          <p className="text-gray-400 mb-6 text-sm">"Un video vale más que mil palabras. Conéctate para ver nuestro plan de acción."</p>

          <form className="space-y-4">
            <input type="text" placeholder="Usuario" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500" />
            <input type="password" placeholder="Contraseña" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500" />
            <button type="submit" className="w-full font-bold py-3 rounded-lg text-white" style={{ backgroundColor: config.primaryColor }}>
              Conectar
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-sm">o síguenos</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>
          <div className="flex justify-center space-x-4">
            {config.socialLinks.facebook.enabled && <a href={config.socialLinks.facebook.url} target="_blank" rel="noopener noreferrer"><Facebook className="w-6 h-6 text-gray-400 hover:text-white" /></a>}
            {config.socialLinks.whatsapp.enabled && <a href={config.socialLinks.whatsapp.url} target="_blank" rel="noopener noreferrer"><MessageSquare className="w-6 h-6 text-gray-400 hover:text-white" /></a>}
            {config.socialLinks.instagram.enabled && <a href={config.socialLinks.instagram.url} target="_blank" rel="noopener noreferrer"><Instagram className="w-6 h-6 text-gray-400 hover:text-white" /></a>}
            {config.socialLinks.x.enabled && <a href={config.socialLinks.x.url} target="_blank" rel="noopener noreferrer"><XIcon /></a>}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
