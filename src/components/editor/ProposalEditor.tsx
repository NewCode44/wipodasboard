import React from 'react';
import { Proposal } from '../../store/dashboardStore';
import { BookOpen, HeartPulse, HardHat, Shield } from 'lucide-react';

const iconMap: { [key: string]: React.FC<{ className?: string }> } = {
  BookOpen,
  HeartPulse,
  HardHat,
  Shield,
};

interface ProposalEditorProps {
  index: number;
  proposal: Proposal;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const ProposalEditor: React.FC<ProposalEditorProps> = ({ index, proposal, onTitleChange, onDescriptionChange }) => {
  const Icon = iconMap[proposal.icon] || BookOpen;

  return (
    <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-3">
      <div className="flex items-center space-x-3">
        <Icon className="w-5 h-5 text-primary-400" />
        <h4 className="font-semibold text-white">Propuesta #{index + 1}</h4>
      </div>
      <input
        type="text"
        value={proposal.title}
        onChange={onTitleChange}
        placeholder="Título de la propuesta"
        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
      />
      <textarea
        value={proposal.description}
        onChange={onDescriptionChange}
        rows={2}
        placeholder="Descripción de la propuesta"
        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-500 resize-none focus:outline-none focus:border-primary-500"
      />
    </div>
  );
};
