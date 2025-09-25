import React from 'react';
import { OpponentConfig } from '../../store/dashboardStore';
import { ImageUploadInput } from './ImageUploadInput';
import { XCircle } from 'lucide-react';

interface OpponentEditorProps {
  opponent: OpponentConfig;
  onUpdate: (field: keyof Omit<OpponentConfig, 'stances'>, value: string) => void;
  onStanceUpdate: (index: number, value: string) => void;
}

export const OpponentEditor: React.FC<OpponentEditorProps> = ({ opponent, onUpdate, onStanceUpdate }) => {
  return (
    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 space-y-4">
      <input
        type="text"
        value={opponent.name}
        onChange={(e) => onUpdate('name', e.target.value)}
        placeholder="Nombre del oponente"
        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-red-400"
      />
      <input
        type="text"
        value={opponent.position}
        onChange={(e) => onUpdate('position', e.target.value)}
        placeholder="Cargo del oponente"
        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-red-400"
      />
      <ImageUploadInput
        label="Imagen del Oponente"
        value={opponent.image}
        onChange={(url) => onUpdate('image', url)}
      />
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Posturas del Oponente</label>
        {opponent.stances.map((stance, index) => (
          <div key={index} className="relative">
            <XCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-400" />
            <input
              type="text"
              value={stance.text}
              onChange={(e) => onStanceUpdate(index, e.target.value)}
              placeholder={`Postura ${index + 1}`}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-red-400"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
