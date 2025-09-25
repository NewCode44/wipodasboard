import React from 'react';
import { TemplateConfig } from '../../store/dashboardStore';
import { Facebook, Instagram, MessageSquare, Users, Award, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
    </svg>
);

const iconMap: { [key: string]: React.FC<{ className?: string }> } = {
  Users, Award, Briefcase,
};

export const AssociationPreviewContent: React.FC<{ config: TemplateConfig }> = ({ config }) => {
  if (!config.association) return null;

  return (
    <div className="w-full h-full flex overflow-hidden">
      {/* Left Panel - Candidate */}
      <div className="w-1/2 h-full relative flex flex-col justify-center p-12 text-white bg-cover bg-center" style={{ backgroundImage: `url(${config.candidateImage})` }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold">{config.candidateName}</h1>
          <p className="text-lg text-gray-300 mb-8">{config.candidatePosition}</p>

          <form className="space-y-4 max-w-sm mx-auto">
            <input type="text" placeholder="Usuario" className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:border-primary-500" />
            <input type="password" placeholder="Contraseña" className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:border-primary-500" />
            <button type="submit" className="w-full font-bold py-3 rounded-lg text-white" style={{ backgroundColor: config.primaryColor }}>
              Conectar
            </button>
          </form>
          <div className="flex items-center my-6 max-w-sm mx-auto">
            <div className="flex-grow border-t border-white/20"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-sm">o síguenos</span>
            <div className="flex-grow border-t border-white/20"></div>
          </div>
          <div className="flex justify-center space-x-4">
            {config.socialLinks.facebook.enabled && <a href={config.socialLinks.facebook.url} target="_blank" rel="noopener noreferrer"><Facebook className="w-6 h-6 text-gray-400 hover:text-white" /></a>}
            {config.socialLinks.whatsapp.enabled && <a href={config.socialLinks.whatsapp.url} target="_blank" rel="noopener noreferrer"><MessageSquare className="w-6 h-6 text-gray-400 hover:text-white" /></a>}
            {config.socialLinks.instagram.enabled && <a href={config.socialLinks.instagram.url} target="_blank" rel="noopener noreferrer"><Instagram className="w-6 h-6 text-gray-400 hover:text-white" /></a>}
            {config.socialLinks.x.enabled && <a href={config.socialLinks.x.url} target="_blank" rel="noopener noreferrer"><XIcon /></a>}
          </div>
        </div>
      </div>

      {/* Right Panel - Association */}
      <div className="w-1/2 h-full bg-background-dark flex flex-col justify-center p-12 relative bg-cover bg-center" style={{ backgroundImage: `url(${config.association.logo})` }}>
        <div className="absolute inset-0 bg-background-dark/90 backdrop-blur-xl"></div>
        <div className="relative z-10 text-center">
          <img src={config.association.logo} alt={config.association.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
          <h2 className="text-3xl font-bold" style={{ color: config.primaryColor }}>{config.association.name}</h2>
          <p className="text-gray-400 italic my-4 max-w-md mx-auto">"{config.association.mission}"</p>
          
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            {config.association.impactMetrics.map((metric, index) => {
              const Icon = iconMap[metric.icon] || Users;
              return (
                <div key={index} className="p-4 bg-white/5 rounded-lg">
                  <Icon className="w-8 h-8 mx-auto mb-2" style={{ color: config.primaryColor }} />
                  <p className="text-2xl font-bold text-white">{metric.value}</p>
                  <p className="text-xs text-gray-400">{metric.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
