import React from 'react';
import { Plus, Edit, Copy, Trash2, Eye, Globe } from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';
import { cn } from '@/lib/utils';

export const PortalGrid: React.FC = () => {
  const { portals, openModal } = useDashboardStore();
  const [filter, setFilter] = React.useState<'all' | 'Reconocimiento' | 'Propuestas' | 'Trayectoria' | 'Cuenta Regresiva'>('all');

  const filteredPortals = portals.filter(portal => {
    if (filter === 'all') return true;
    return portal.type === filter;
  });

  const portalTypes = [
    { key: 'all', label: 'Todos', count: portals.length },
    { key: 'Reconocimiento', label: 'Reconocimiento', count: portals.filter(p => p.type === 'Reconocimiento').length },
    { key: 'Propuestas', label: 'Propuestas', count: portals.filter(p => p.type === 'Propuestas').length },
    { key: 'Trayectoria', label: 'Trayectoria', count: portals.filter(p => p.type === 'Trayectoria').length },
    { key: 'Cuenta Regresiva', label: 'Cuenta Regresiva', count: portals.filter(p => p.type === 'Cuenta Regresiva').length }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Reconocimiento': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Propuestas': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Trayectoria': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Cuenta Regresiva': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-white">Gestión de Portales</h2>
          <p className="text-gray-400">Configura y personaliza tus portales cautivos</p>
        </div>
        
        <button 
          onClick={() => openModal('portal')}
          className="glass-button flex items-center space-x-2 bg-gradient-primary"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Portal</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {portalTypes.map((filterOption) => (
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
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
              {filterOption.count}
            </span>
          </button>
        ))}
      </div>

      {/* Portal Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPortals.map((portal) => (
          <div key={portal.id} className="glass-card p-6 hover:bg-white/5 transition-all duration-300 group">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <span className={cn(
                  'px-3 py-1 rounded-full text-xs font-medium border',
                  getTypeColor(portal.type)
                )}>
                  {portal.type}
                </span>
                <span className={cn(
                  'px-2 py-1 rounded-full text-xs',
                  portal.status === 'Activo' 
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-gray-500/20 text-gray-400'
                )}>
                  {portal.status}
                </span>
              </div>
              
              <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Copy className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-red-400">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Portal Preview */}
            <div className="mb-4">
              <div 
                className="h-32 rounded-xl border-2 border-white/10 flex items-center justify-center relative overflow-hidden"
                style={{ backgroundColor: portal.design.primaryColor + '20' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20"></div>
                <Globe className="w-8 h-8 text-white/60" />
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="h-1 bg-white/20 rounded"></div>
                  <div className="h-1 bg-white/10 rounded mt-1"></div>
                </div>
              </div>
            </div>

            {/* Portal Info */}
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
              {portal.name}
            </h3>
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
              {portal.content}
            </p>

            {/* Design Info */}
            <div className="flex items-center space-x-3 mb-4">
              <div 
                className="w-4 h-4 rounded-full border border-white/20"
                style={{ backgroundColor: portal.design.primaryColor }}
              ></div>
              <div 
                className="w-4 h-4 rounded-full border border-white/20"
                style={{ backgroundColor: portal.design.secondaryColor }}
              ></div>
              <span className="text-xs text-gray-400">Colores del portal</span>
            </div>

            {/* Widgets */}
            <div className="flex flex-wrap gap-1">
              {portal.widgets.map((widget, index) => (
                <span key={index} className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded">
                  {widget}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPortals.length === 0 && (
        <div className="glass-card p-12 text-center">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            No hay portales {filter === 'all' ? '' : `de tipo ${filter}`}
          </h3>
          <p className="text-gray-400 mb-6">
            Crea tu primer portal cautivo personalizado
          </p>
          <button 
            onClick={() => openModal('portal')}
            className="glass-button bg-gradient-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Crear Primer Portal
          </button>
        </div>
      )}
    </div>
  );
};
