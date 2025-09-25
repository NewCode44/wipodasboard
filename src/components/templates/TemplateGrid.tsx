import React from 'react';
import { useDashboardStore } from '../../store/dashboardStore';
import { TemplateCard } from './TemplateCard';
import { cn } from '@/lib/utils';
import { LayoutTemplate, Plus } from 'lucide-react';

export const TemplateGrid: React.FC = () => {
  const { templates, startEditingTemplate } = useDashboardStore();
  const [filter, setFilter] = React.useState<'all' | 'Reconocimiento' | 'Propuestas' | 'Mixto'>('all');

  const filteredTemplates = templates.filter(template => {
    if (filter === 'all') return true;
    return template.type === filter;
  });

  const templateTypes = [
    { key: 'all', label: 'Todas' },
    { key: 'Reconocimiento', label: 'Reconocimiento' },
    { key: 'Propuestas', label: 'Propuestas' },
    { key: 'Mixto', label: 'Mixto' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-white">Plantillas de Portales Cautivos</h2>
          <p className="text-gray-400">Elige una plantilla profesional o crea la tuya</p>
        </div>
        <button 
          onClick={() => startEditingTemplate(null)}
          className="glass-button flex items-center space-x-2 bg-gradient-primary"
        >
          <Plus className="w-4 h-4" />
          <span>Crear Plantilla</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {templateTypes.map((filterOption) => (
          <button
            key={filterOption.key}
            onClick={() => setFilter(filterOption.key as any)}
            className={cn(
              'px-4 py-2 rounded-xl transition-all duration-200 flex items-center space-x-2',
              filter === filterOption.key
                ? 'bg-gradient-primary text-white'
                : 'glass-card hover:bg-white/10'
            )}
          >
            <span>{filterOption.label}</span>
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
      
      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <div className="glass-card p-12 text-center col-span-full">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <LayoutTemplate className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            No hay plantillas de tipo "{filter}"
          </h3>
          <p className="text-gray-400">
            Próximamente agregaremos más plantillas a nuestro catálogo.
          </p>
        </div>
      )}
    </div>
  );
};
