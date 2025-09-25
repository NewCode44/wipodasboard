import React from 'react';
import { Plus, Edit, Copy, Trash2, MapPin, Users, TrendingUp } from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';
import { cn } from '@/lib/utils';

export const CampaignGrid: React.FC = () => {
  const { campaigns, openModal } = useDashboardStore();
  const [filter, setFilter] = React.useState<'all' | 'active' | 'finished'>('all');

  const filteredCampaigns = campaigns.filter(campaign => {
    if (filter === 'all') return true;
    if (filter === 'active') return campaign.status === 'Activa';
    if (filter === 'finished') return campaign.status === 'Finalizada';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-white">Gestión de Campañas</h2>
          <p className="text-gray-400">Administra tus campañas políticas activas</p>
        </div>
        
        <button 
          onClick={() => openModal('campaign')}
          className="glass-button flex items-center space-x-2 bg-gradient-primary"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Campaña</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex space-x-2">
        {[
          { key: 'all', label: 'Todas', count: campaigns.length },
          { key: 'active', label: 'Activas', count: campaigns.filter(c => c.status === 'Activa').length },
          { key: 'finished', label: 'Finalizadas', count: campaigns.filter(c => c.status === 'Finalizada').length }
        ].map((filterOption) => (
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

      {/* Campaign Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCampaigns.map((campaign) => (
          <div key={campaign.id} className="glass-card p-6 hover:bg-white/5 transition-all duration-300 group">
            {/* Status Badge */}
            <div className="flex justify-between items-start mb-4">
              <span className={cn(
                'px-3 py-1 rounded-full text-xs font-medium',
                campaign.status === 'Activa' 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
              )}>
                {campaign.status}
              </span>
              
              <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
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

            {/* Campaign Info */}
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
              {campaign.name}
            </h3>
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
              {campaign.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-primary-500" />
                <div>
                  <p className="text-lg font-semibold text-white">{campaign.votantes}</p>
                  <p className="text-xs text-gray-400">Votantes</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <div>
                  <p className="text-lg font-semibold text-white">{campaign.conversion}%</p>
                  <p className="text-xs text-gray-400">Conversión</p>
                </div>
              </div>
            </div>

            {/* Zones */}
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="w-4 h-4 text-gray-400" />
              <div className="flex flex-wrap gap-1">
                {campaign.zones.slice(0, 2).map((zone, index) => (
                  <span key={index} className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded">
                    {zone}
                  </span>
                ))}
                {campaign.zones.length > 2 && (
                  <span className="text-xs text-gray-400">
                    +{campaign.zones.length - 2} más
                  </span>
                )}
              </div>
            </div>

            {/* Dates */}
            <div className="text-xs text-gray-400">
              <p>Inicio: {new Date(campaign.startDate).toLocaleDateString('es-ES')}</p>
              <p>Fin: {new Date(campaign.endDate).toLocaleDateString('es-ES')}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCampaigns.length === 0 && (
        <div className="glass-card p-12 text-center">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            No hay campañas {filter === 'all' ? '' : filter === 'active' ? 'activas' : 'finalizadas'}
          </h3>
          <p className="text-gray-400 mb-6">
            Crea tu primera campaña para comenzar a gestionar portales cautivos
          </p>
          <button 
            onClick={() => openModal('campaign')}
            className="glass-button bg-gradient-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Crear Primera Campaña
          </button>
        </div>
      )}
    </div>
  );
};
