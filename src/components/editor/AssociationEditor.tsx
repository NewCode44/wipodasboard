import React from 'react';
import { AssociationConfig } from '../../store/dashboardStore';
import { ImageUploadInput } from './ImageUploadInput';
import { AssociationMetricEditor } from './AssociationMetricEditor';

interface AssociationEditorProps {
  association: AssociationConfig;
  onUpdate: (field: keyof Omit<AssociationConfig, 'impactMetrics'>, value: string) => void;
  onMetricUpdate: (index: number, field: 'value' | 'label', value: string) => void;
}

export const AssociationEditor: React.FC<AssociationEditorProps> = ({ association, onUpdate, onMetricUpdate }) => {
  return (
    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 space-y-4">
      <input
        type="text"
        value={association.name}
        onChange={(e) => onUpdate('name', e.target.value)}
        placeholder="Nombre de la Asociación"
        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-green-400"
      />
      <textarea
        value={association.mission}
        onChange={(e) => onUpdate('mission', e.target.value)}
        rows={3}
        placeholder="Misión de la Asociación"
        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-500 resize-none focus:outline-none focus:border-green-400"
      />
      <ImageUploadInput
        label="Logo de la Asociación"
        value={association.logo}
        onChange={(url) => onUpdate('logo', url)}
      />
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Métricas de Impacto</label>
        {association.impactMetrics.map((metric, index) => (
          <AssociationMetricEditor 
            key={index}
            index={index}
            metric={metric}
            onUpdate={onMetricUpdate}
          />
        ))}
      </div>
    </div>
  );
};
