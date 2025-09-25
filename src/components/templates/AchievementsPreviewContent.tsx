import React, { useState, useEffect } from 'react';
import { TemplateConfig } from '../../store/dashboardStore';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Building, TrendingUp, Heart, Facebook, Instagram, MessageSquare } from 'lucide-react';

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
    </svg>
);

const iconMap: { [key: string]: React.FC<{ className?: string }> } = {
  BookOpen, Building, TrendingUp, Heart,
};

export const AchievementsPreviewContent: React.FC<{ config: TemplateConfig }> = ({ config }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!config.achievements || config.achievements.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % config.achievements!.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [config.achievements]);

  if (!config.achievements) return null;
  const currentAchievement = config.achievements[currentIndex];
  const Icon = iconMap[currentAchievement.icon] || BookOpen;

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
        className="w-2/5 h-full bg-background-dark/80 backdrop-blur-2xl flex flex-col justify-center p-12 overflow-y-auto"
      >
        <div className="w-full">
          {/* Slider */}
          <div className="mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex items-start space-x-4 mb-4"
              >
                <Icon className="w-8 h-8 text-primary-400 mt-1 flex-shrink-0" style={{color: config.primaryColor}} />
                <div>
                  <p className="text-xs text-gray-400">{currentAchievement.dateRange}</p>
                  <h2 className="text-2xl font-bold text-white">{currentAchievement.title}</h2>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {currentAchievement.stats.map((stat, i) => (
                <div key={i}>
                  <p className="text-3xl font-bold" style={{color: config.primaryColor}}>{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              {config.achievements.map((_, index) => (
                <div key={index} className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  {index === currentIndex && (
                    <motion.div
                      className="h-full"
                      style={{ background: config.primaryColor }}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 4, ease: 'linear' }}
                    />
                  )}
                  {index < currentIndex && <div className="h-full w-full" style={{ background: config.primaryColor }}></div>}
                </div>
              ))}
            </div>
          </div>
          
          {/* Login Form */}
          <div className="mt-auto">
            <h3 className="text-xl font-semibold text-white">{config.candidateName}</h3>
            <p className="text-gray-400 mb-6">{config.candidatePosition}</p>
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
        </div>
      </motion.div>
    </div>
  );
};
