import React from 'react';
import { TemplateConfig } from '../../store/dashboardStore';
import { CheckCircle, XCircle, Facebook, Instagram, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
    </svg>
);

export const ComparativePreviewContent: React.FC<{ config: TemplateConfig }> = ({ config }) => {
  if (!config.proposals || !config.opponent) return null;

  return (
    <div className="w-full h-full flex overflow-hidden">
      {/* Left Panel - Candidate Image */}
      <div className="w-3/5 h-full relative overflow-hidden">
        <motion.div
          key={config.candidateImage}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${config.candidateImage})` }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 15, ease: 'linear', repeat: Infinity, repeatType: 'mirror' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
      </div>

      {/* Right Panel - Content */}
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-2/5 h-full bg-background-dark/80 backdrop-blur-2xl flex flex-col p-8 overflow-y-auto"
      >
        <div className="flex-grow">
          {/* Login Form */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white">{config.candidateName}</h3>
            <p className="text-gray-400 mb-6">{config.candidatePosition}</p>
            <form className="space-y-4">
              <input type="text" placeholder="Usuario" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500" />
              <input type="password" placeholder="Contraseña" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500" />
              <button type="submit" className="w-full font-bold py-3 rounded-lg text-white" style={{ backgroundColor: config.primaryColor }}>
                Conectar
              </button>
            </form>
          </div>

          {/* Comparison */}
          <div className="space-y-6">
            {/* Our Vision */}
            <div className="p-4 rounded-lg" style={{ backgroundColor: `${config.primaryColor}20` }}>
              <h4 className="font-bold text-lg mb-3" style={{ color: config.primaryColor }}>Nuestra Visión</h4>
              <div className="space-y-2">
                {config.proposals.map((proposal, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: config.primaryColor }} />
                    <span className="text-sm text-gray-300">{proposal.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Opponent's Stances */}
            <div className="p-4 rounded-lg bg-white/5">
              <div className="flex items-center space-x-3 mb-3">
                <img src={config.opponent.image} alt={config.opponent.name} className="w-10 h-10 rounded-full object-cover grayscale" />
                <div>
                  <h4 className="font-bold text-lg text-gray-400">Las Mismas Ideas</h4>
                  <p className="text-sm text-gray-500">{config.opponent.name}</p>
                </div>
              </div>
              <div className="space-y-2">
                {config.opponent.stances.map((stance, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <XCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-gray-500" />
                    <span className="text-sm text-gray-400">{stance.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-6">
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
