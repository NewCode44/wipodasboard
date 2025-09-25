import React from 'react';
import { TemplateConfig } from '../../store/dashboardStore';
import { Facebook, Instagram, MessageSquare, X } from 'lucide-react';

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
    </svg>
);

export const RecognitionPreviewContent: React.FC<{ config: TemplateConfig }> = ({ config }) => {
  return (
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: `url(${config.backgroundImage}) center/cover` }}>
      <div className="w-full max-w-sm glass-card p-8 text-center" style={{ borderColor: config.primaryColor }}>
        <img src={config.partyLogo} alt="Logo del Partido" className="h-12 mx-auto mb-4" />
        <img src={config.candidateImage} alt={config.candidateName} className="w-32 h-32 rounded-full mx-auto mb-4 border-4" style={{ borderColor: config.primaryColor }} />
        
        <h1 className="text-2xl font-bold text-white">{config.candidateName}</h1>
        <p className="text-gray-300 mb-6">{config.candidatePosition}</p>

        <form className="space-y-4">
          <input type="text" placeholder="Usuario" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500" />
          <input type="password" placeholder="Contraseña" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500" />
          <button type="submit" className="w-full font-bold py-3 rounded-lg" style={{ backgroundColor: config.secondaryColor, color: config.primaryColor === '#ffcc00' ? '#000' : '#fff' }}>
            Ingresar
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-sm">o síguenos en</span>
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
  );
};
