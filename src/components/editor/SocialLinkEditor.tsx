import React from 'react';
import { Facebook, Instagram, MessageSquare, Link } from 'lucide-react';
import { SocialNetwork } from '../../store/dashboardStore';

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
    </svg>
);

const socialIcons: Record<SocialNetwork, React.FC<{ className?: string }>> = {
    facebook: Facebook,
    whatsapp: MessageSquare,
    instagram: Instagram,
    x: XIcon,
};

interface SocialLinkEditorProps {
  network: SocialNetwork;
  url: string;
  isEnabled: boolean;
  onUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleChange: (checked: boolean) => void;
}

export const SocialLinkEditor: React.FC<SocialLinkEditorProps> = ({ network, url, isEnabled, onUrlChange, onToggleChange }) => {
  const Icon = socialIcons[network];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 capitalize">
          <Icon className="w-4 h-4" />
          <span>{network}</span>
        </label>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isEnabled}
            onChange={(e) => onToggleChange(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
        </label>
      </div>
      {isEnabled && (
        <div className="relative">
          <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="url"
            value={url}
            onChange={onUrlChange}
            placeholder={`https://...`}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
          />
        </div>
      )}
    </div>
  );
};
