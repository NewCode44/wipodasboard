import React, { useState, useEffect } from 'react';
import { TemplateConfig } from '../../store/dashboardStore';
import { Facebook, Instagram, MessageSquare, BookOpen, HeartPulse, HardHat, Shield } from 'lucide-react';

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
    </svg>
);

const iconMap: { [key: string]: React.FC<{ className?: string }> } = {
  BookOpen, HeartPulse, HardHat, Shield,
};

export const ProposalsPreviewContent: React.FC<{ config: TemplateConfig }> = ({ config }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!config.proposals || config.proposals.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % config.proposals!.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [config.proposals]);

  if (!config.proposals) return null;
  const currentProposal = config.proposals[currentIndex];
  const Icon = iconMap[currentProposal.icon] || BookOpen;

  return (
    <div className="w-full h-full flex overflow-hidden">
      {/* Left Panel - Carousel */}
      <div className="w-1/2 h-full relative text-white flex flex-col justify-end p-12" style={{ backgroundColor: config.primaryColor }}>
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${config.candidateImage})` }}></div>
        <div className="absolute inset-0 bg-black/30 backdrop-blur-md"></div>
        
        <div className="relative z-10">
          <div className="mb-8">
            <Icon className="w-16 h-16 mb-4" />
            <h2 className="text-4xl font-bold mb-2">{currentProposal.title}</h2>
            <p className="text-lg opacity-80">{currentProposal.description}</p>
          </div>
          <div className="flex space-x-2">
            {config.proposals.map((_, index) => (
              <div key={index} className={`h-1 rounded-full ${index === currentIndex ? 'bg-white w-8' : 'bg-white/50 w-4'}`}></div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Login */}
      <div className="w-1/2 h-full bg-background-dark flex flex-col justify-center p-12">
        <div className="w-full max-w-sm mx-auto text-center">
          <img src={config.partyLogo} alt="Logo del Partido" className="h-10 mx-auto mb-4" />
          <img src={config.candidateImage} alt={config.candidateName} className="w-32 h-32 rounded-full mx-auto mb-4 border-4" style={{ borderColor: config.secondaryColor }} />
          
          <h1 className="text-2xl font-bold text-white">{config.candidateName}</h1>
          <p className="text-gray-300 mb-6">{config.candidatePosition}</p>

          <form className="space-y-4">
            <input type="text" placeholder="Usuario" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500" />
            <input type="password" placeholder="Contraseña" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500" />
            <button type="submit" className="w-full font-bold py-3 rounded-lg" style={{ backgroundColor: config.primaryColor, color: '#fff' }}>
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
    </div>
  );
};
