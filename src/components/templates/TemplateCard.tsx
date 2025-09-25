import React from 'react';
import { Template, useDashboardStore } from '../../store/dashboardStore';
import { cn } from '@/lib/utils';
import { Eye, Rocket, CheckCircle, Plus, Edit } from 'lucide-react';
import toast from 'react-hot-toast';

interface TemplateCardProps {
  template: Template;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  const { openTemplatePreview, setActiveSection, openModal, startEditingTemplate } = useDashboardStore();

  const handleDeploy = () => {
    const toastId = toast.loading(`Preparando despliegue de "${template.title}"...`, {
      icon: '🚀',
    });

    setTimeout(() => {
      toast.success(`¡Desplegado! URL: cdn.wipo.com/p/${template.id}`, {
        id: toastId,
        duration: 6000,
      });
    }, 2000);
  };

  const handleUseTemplate = () => {
    setActiveSection('portals');
    openModal('portal');
    toast.success(`Creando portal desde "${template.title}"`, {
      icon: <Plus className="text-green-400" />,
    });
  };

  const handlePreview = () => {
    openTemplatePreview(template);
  };

  const handleEdit = () => {
    startEditingTemplate(template);
  };

  return (
    <div className="glass-card flex flex-col overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
      {/* Header with Preview Image */}
      <div className="relative">
        <img src={template.previewImage} alt={template.title} className="w-full h-40 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute top-2 right-2">
          <span className={cn(
            'px-3 py-1 rounded-full text-xs font-medium border',
            template.type === 'Reconocimiento' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
            template.type === 'Propuestas' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
            template.type === 'Trayectoria' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
            'bg-purple-500/20 text-purple-300 border-purple-500/30'
          )}>
            {template.type}
          </span>
        </div>
        <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
          {template.tags.map(tag => (
            <span key={tag} className="text-xs bg-white/20 text-white px-2 py-1 rounded-full backdrop-blur-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-grow">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
          {template.title}
        </h3>
        <p className="text-sm text-gray-400 mb-4 line-clamp-3">
          {template.description}
        </p>

        <div className="space-y-2">
          {template.features.map(feature => (
            <div key={feature} className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
              <span className="text-sm text-gray-300">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer with Actions */}
      <div className="p-4 border-t border-white/10 mt-auto grid grid-cols-2 gap-2">
        <button
          onClick={handleUseTemplate}
          className="glass-button text-sm flex items-center justify-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Usar</span>
        </button>
        <button
          onClick={handlePreview}
          className="glass-button text-sm flex items-center justify-center space-x-2"
        >
          <Eye className="w-4 h-4" />
          <span>Previa</span>
        </button>
        <button
          onClick={handleEdit}
          className="glass-button text-sm flex items-center justify-center space-x-2"
        >
          <Edit className="w-4 h-4" />
          <span>Editar</span>
        </button>
        <button
          onClick={handleDeploy}
          className="glass-button bg-gradient-primary text-sm flex items-center justify-center space-x-2"
        >
          <Rocket className="w-4 h-4" />
          <span>Desplegar</span>
        </button>
      </div>
    </div>
  );
};
