import React from 'react';
import { Achievement } from '../../store/dashboardStore';
import { BookOpen, Building, TrendingUp, Heart, Award } from 'lucide-react';

const iconMap: { [key: string]: React.FC<{ className?: string }> } = {
  BookOpen,
  Building,
  TrendingUp,
  Heart,
};

interface AchievementEditorProps {
  index: number;
  achievement: Achievement;
  onUpdate: (index: number, field: 'title' | 'dateRange' | `stat${number}_value` | `stat${number}_label`, value: string) => void;
}

export const AchievementEditor: React.FC<AchievementEditorProps> = ({ index, achievement, onUpdate }) => {
  const Icon = iconMap[achievement.icon] || Award;

  return (
    <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-3">
      <div className="flex items-center space-x-3">
        <Icon className="w-5 h-5 text-primary-400" />
        <h4 className="font-semibold text-white">Logro #{index + 1}</h4>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          value={achievement.title}
          onChange={(e) => onUpdate(index, 'title', e.target.value)}
          placeholder="Título del logro"
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
        />
        <input
          type="text"
          value={achievement.dateRange}
          onChange={(e) => onUpdate(index, 'dateRange', e.target.value)}
          placeholder="Rango de Fechas"
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
        />
      </div>

      {achievement.stats.map((stat, statIndex) => (
        <div key={statIndex} className="grid grid-cols-2 gap-3">
          <input
            type="text"
            value={stat.value}
            onChange={(e) => onUpdate(index, `stat${statIndex}_value`, e.target.value)}
            placeholder={`Valor Stat ${statIndex + 1}`}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
          />
          <input
            type="text"
            value={stat.label}
            onChange={(e) => onUpdate(index, `stat${statIndex}_label`, e.target.value)}
            placeholder={`Etiqueta Stat ${statIndex + 1}`}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
          />
        </div>
      ))}
    </div>
  );
};
