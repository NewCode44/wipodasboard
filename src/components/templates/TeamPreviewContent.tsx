import React from 'react';
import { TemplateConfig } from '../../store/dashboardStore';
import { Facebook, Instagram, MessageSquare, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
    </svg>
);

export const TeamPreviewContent: React.FC<{ config: TemplateConfig }> = ({ config }) => {
  if (!config.movement || !config.team) return null;

  return (
    <div className="w-full h-full grid grid-cols-12 overflow-hidden">
      {/* Left Panel - Movement */}
      <div className="col-span-3 h-full relative flex flex-col justify-end p-8 text-white bg-cover bg-center" style={{ backgroundImage: `url(${config.movement.backgroundImage})` }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10">
          <Users className="w-10 h-10 mb-4" style={{ color: config.primaryColor }} />
          <h2 className="text-3xl font-bold">{config.movement.name}</h2>
          <p className="text-md opacity-80">{config.movement.slogan}</p>
        </div>
      </div>

      {/* Center Panel - Candidate */}
      <div className="col-span-5 h-full bg-background-dark flex flex-col justify-center p-8 text-center">
        <img src={config.candidateImage} alt={config.candidateName} className="w-32 h-32 rounded-full mx-auto mb-4 border-4" style={{ borderColor: config.primaryColor }} />
        <h1 className="text-3xl font-bold text-white">{config.candidateName}</h1>
        <p className="text-gray-300 mb-6">{config.candidatePosition}</p>

        <form className="space-y-4 max-w-sm mx-auto">
          <input type="text" placeholder="Usuario" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500" />
          <input type="password" placeholder="Contraseña" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500" />
          <button type="submit" className="w-full font-bold py-3 rounded-lg text-white" style={{ backgroundColor: config.primaryColor }}>
            Conectar
          </button>
        </form>
        <div className="flex items-center my-6 max-w-sm mx-auto">
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

      {/* Right Panel - Team */}
      <div className="col-span-4 h-full bg-black/20 flex flex-col p-8 overflow-y-auto">
        <h3 className="text-xl font-bold text-white mb-6">Nuestro Equipo</h3>
        <div className="space-y-4">
          {config.team.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg"
            >
              <img src={member.image} alt={member.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <p className="font-semibold text-white">{member.name}</p>
                <p className="text-sm text-gray-400">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
