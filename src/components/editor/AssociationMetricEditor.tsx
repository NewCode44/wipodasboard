import React from 'react';
import { ImpactMetric } from '../../store/dashboardStore';
import { Users, Award, Briefcase } from 'lucide-react';

const iconMap: { [key: string]: React.FC<{ className?: string }> } = {
  Users,
  Award,
  Briefcase,
};

interface AssociationMetricEditorProps {
  index: number;
  metric: ImpactMetric;
  onUpdate: (index: number, field: 'value' | 'label', value: string) => void;
}

export const AssociationMetricEditor: React.FC<AssociationMetricEditorProps> = ({ index, metric, onUpdate }) => {
  const Icon = iconMap[metric.icon] || Users;

  return (
    <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-2">
      <div className="flex items-center space-x-2">
        <Icon className="w-4 h-4 text-green-400" />
        <h5 className="text-sm font-semibold text-white">Métrica #{index + 1}</h5>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <input
          type="text"
          value={metric.value}
          onChange={(e) => onUpdate(index, 'value', e.target.value)}
          placeholder="Valor (ej: 1,500+)"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-green-400 text-sm"
        />
        <input
          type="text"
          value={metric.label}
          onChange={(e) => onUpdate(index, 'label', e.target.value)}
          placeholder="Etiqueta (ej: Familias Ayudadas)"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-green-400 text-sm"
        />
      </div>
    </div>
  );
};
