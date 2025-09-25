import React from 'react';
import { Plus, Edit, Copy, Trash2, Send, Mail, MessageSquare, BarChart2 } from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';
import { cn } from '@/lib/utils';

export const CommunicationsGrid: React.FC = () => {
  const { messages, openModal } = useDashboardStore();
  const [filter, setFilter] = React.useState<'all' | 'SMS' | 'Email' | 'Push'>('all');

  const filteredMessages = messages.filter(message => {
    if (filter === 'all') return true;
    return message.type === filter;
  });

  const getMessageIcon = (type: 'SMS' | 'Email' | 'Push') => {
    switch (type) {
      case 'SMS': return <MessageSquare className="w-5 h-5 text-blue-400" />;
      case 'Email': return <Mail className="w-5 h-5 text-purple-400" />;
      case 'Push': return <Send className="w-5 h-5 text-green-400" />;
    }
  };

  const getStatusInfo = (status: 'Enviado' | 'Programado' | 'Borrador') => {
    switch (status) {
      case 'Enviado': return { class: 'bg-green-500/20 text-green-400', label: 'Enviado' };
      case 'Programado': return { class: 'bg-yellow-500/20 text-yellow-400', label: 'Programado' };
      case 'Borrador': return { class: 'bg-gray-500/20 text-gray-400', label: 'Borrador' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-white">Gestión de Comunicaciones</h2>
          <p className="text-gray-400">Envía mensajes masivos a tus votantes registrados</p>
        </div>
        
        <button 
          onClick={() => openModal('message')}
          className="glass-button flex items-center space-x-2 bg-gradient-primary"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Mensaje</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: 'all', label: 'Todos' },
          { key: 'SMS', label: 'SMS' },
          { key: 'Email', label: 'Email' },
          { key: 'Push', label: 'Push' }
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
          </button>
        ))}
      </div>

      {/* Messages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMessages.map((message) => {
          const statusInfo = getStatusInfo(message.status);
          return (
            <div key={message.id} className="glass-card p-6 hover:bg-white/5 transition-all duration-300 group">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                    {getMessageIcon(message.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-primary-400 transition-colors">
                      {message.title}
                    </h3>
                    <span className={cn('text-xs px-2 py-1 rounded-full', statusInfo.class)}>
                      {statusInfo.label}
                    </span>
                  </div>
                </div>
                
                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors"><Edit className="w-4 h-4" /></button>
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors"><Copy className="w-4 h-4" /></button>
                  <button className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-red-400"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>

              {/* Content */}
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {message.content}
              </p>

              {/* Audience */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-1">Dirigido a:</p>
                <span className="text-sm bg-white/10 text-gray-300 px-2 py-1 rounded">
                  {message.audience}
                </span>
              </div>

              {/* Stats */}
              <div className="pt-4 border-t border-white/10">
                {message.status === 'Enviado' ? (
                  <div className="flex items-center space-x-2">
                    <BarChart2 className="w-4 h-4 text-green-400" />
                    <p className="text-sm text-gray-300">
                      Tasa de apertura: <span className="font-bold text-white">{message.openRate}%</span>
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">
                    Programado para: {new Date(message.sentDate).toLocaleString('es-ES')}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredMessages.length === 0 && (
        <div className="glass-card p-12 text-center">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            No hay mensajes {filter !== 'all' && `de tipo ${filter}`}
          </h3>
          <p className="text-gray-400 mb-6">
            Crea tu primer mensaje para conectar con tus votantes
          </p>
          <button 
            onClick={() => openModal('message')}
            className="glass-button bg-gradient-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Crear Primer Mensaje
          </button>
        </div>
      )}
    </div>
  );
};
