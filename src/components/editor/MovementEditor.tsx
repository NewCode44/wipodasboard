import React from 'react';
import { MovementConfig } from '../../store/dashboardStore';
import { ImageUploadInput } from './ImageUploadInput';

interface MovementEditorProps {
  movement: MovementConfig;
  onUpdate: (field: keyof MovementConfig, value: string) => void;
}

export const MovementEditor: React.FC<MovementEditorProps> = ({ movement, onUpdate }) => {
  return (
    <div className="p-4 rounded-lg bg-portal-teamBlue/10 border border-portal-teamBlue/20 space-y-4">
      <input
        type="text"
        value={movement.name}
        onChange={(e) => onUpdate('name', e.target.value)}
        placeholder="Nombre del Movimiento"
        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-portal-teamBlue"
      />
      <textarea
        value={movement.slogan}
        onChange={(e) => onUpdate('slogan', e.target.value)}
        rows={2}
        placeholder="Slogan del Movimiento"
        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-500 resize-none focus:outline-none focus:border-portal-teamBlue"
      />
      <ImageUploadInput
        label="Imagen de Fondo del Movimiento"
        value={movement.backgroundImage}
        onChange={(url) => onUpdate('backgroundImage', url)}
      />
    </div>
  );
};
