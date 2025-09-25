import React, { useState, useEffect } from 'react';
import { TemplateConfig } from '../../store/dashboardStore';
import { Facebook, Instagram, MessageSquare } from 'lucide-react';

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
    </svg>
);

const calculateTimeLeft = (electionDate: string) => {
  const difference = +new Date(electionDate) - +new Date();
  let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return timeLeft;
};

export const CountdownPreviewContent: React.FC<{ config: TemplateConfig }> = ({ config }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(config.electionDate || ''));

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(config.electionDate || ''));
    }, 1000);
    return () => clearTimeout(timer);
  });

  const CountdownUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="text-center">
      <div className="text-6xl font-bold" style={{ color: config.primaryColor }}>{String(value).padStart(2, '0')}</div>
      <div className="text-sm uppercase text-gray-400 tracking-widest">{label}</div>
    </div>
  );

  return (
    <div className="w-full h-full flex overflow-hidden">
      {/* Left Panel - Candidate Image */}
      <div className="w-1/2 h-full bg-cover bg-center" style={{ backgroundImage: `url(${config.candidateImage})` }}>
        <div className="w-full h-full bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-12 text-white">
          <h1 className="text-4xl font-bold">{config.candidateName}</h1>
          <p className="text-lg opacity-80">{config.candidatePosition}</p>
        </div>
      </div>

      {/* Right Panel - Countdown */}
      <div className="w-1/2 h-full bg-background-dark flex flex-col justify-center p-12 relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff1a_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="relative z-10 text-center">
          <h2 className="text-2xl font-semibold text-white mb-2">La decisión está en tus manos</h2>
          <p className="text-gray-400 mb-8">El futuro de nuestra comunidad se decide en:</p>
          
          <div className="grid grid-cols-4 gap-4 mb-8">
            <CountdownUnit value={timeLeft.days} label="Días" />
            <CountdownUnit value={timeLeft.hours} label="Horas" />
            <CountdownUnit value={-timeLeft.minutes} label="Minutos" />
            <CountdownUnit value={timeLeft.seconds} label="Segundos" />
          </div>

          <p className="font-bold text-2xl mb-8" style={{ color: config.primaryColor }}>VOTA • 1 DE JUNIO</p>

          <form className="space-y-4 max-w-sm mx-auto">
            <input type="text" placeholder="Usuario" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500" />
            <input type="password" placeholder="Contraseña" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500" />
            <button type="submit" className="w-full font-bold py-3 rounded-lg text-white" style={{ backgroundColor: config.primaryColor }}>
              Conectar Ahora
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
      </div>
    </div>
  );
};
