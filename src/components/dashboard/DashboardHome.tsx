import React from 'react';
import { 
  Users, 
  MapPin, 
  Wifi, 
  Share,
  Plus,
  Building,
  Globe,
  BarChart3,
  Settings,
  Send
} from 'lucide-react';
import { StatCard } from './StatCard';
import { ActionCard } from './ActionCard';
import { useDashboardStore } from '../../store/dashboardStore';

export const DashboardHome: React.FC = () => {
  const { stats, setActiveSection, openModal } = useDashboardStore();

  const actionCards = [
    {
      title: 'Agregar Campaña',
      description: 'Crear nueva campaña política',
      icon: Plus,
      gradient: 'bg-gradient-primary',
      action: () => openModal('campaign')
    },
    {
      title: 'Nueva Propuesta',
      description: 'Gestionar propuestas ciudadanas',
      icon: Building,
      gradient: 'bg-gradient-success',
      action: () => openModal('portal')
    },
    {
      title: 'Gestionar Portal',
      description: 'Configurar portales cautivos',
      icon: Globe,
      gradient: 'bg-gradient-ocean',
      action: () => setActiveSection('portals')
    },
    {
      title: 'Ver Analytics',
      description: 'Análisis de datos en tiempo real',
      icon: BarChart3,
      gradient: 'bg-gradient-purple',
      action: () => setActiveSection('analytics')
    },
    {
      title: 'Configuración',
      description: 'Ajustes del sistema',
      icon: Settings,
      gradient: 'bg-gradient-sunset',
      action: () => setActiveSection('config')
    },
    {
      title: 'Enviar Mensaje',
      description: 'Contacta a tus votantes',
      icon: Send,
      gradient: 'bg-gradient-emerald',
      action: () => openModal('message')
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Votantes Conectados"
          value={stats.votantesConectados.value}
          change={stats.votantesConectados.change}
          icon={Users}
          gradient="bg-gradient-primary"
          description="Usuarios activos en portales"
        />
        <StatCard
          title="Zonas de Mayor Tráfico"
          value={stats.zonasMayorTrafico.value}
          change={stats.zonasMayorTrafico.change}
          icon={MapPin}
          gradient="bg-gradient-success"
          description="Puntos de acceso activos"
        />
        <StatCard
          title="Conversión WiFi"
          value={stats.conversionWifi.value}
          change={stats.conversionWifi.change}
          icon={Wifi}
          format="percentage"
          gradient="bg-gradient-ocean"
          description="Tasa de conversión portal"
        />
        <StatCard
          title="Propuestas Compartidas"
          value={stats.propuestasCompartidas.value}
          icon={Share}
          gradient="bg-gradient-purple"
          description={`€${stats.propuestasCompartidas.sales}k en ventas`}
        />
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {actionCards.map((card, index) => (
          <ActionCard
            key={index}
            title={card.title}
            description={card.description}
            icon={card.icon}
            gradient={card.gradient}
            onClick={card.action}
          />
        ))}
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Chart */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4 text-white">
            Tráfico de Usuarios (Últimas 24h)
          </h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-primary-500 to-primary-300 rounded-t transition-all duration-500 hover:from-primary-400 hover:to-primary-200"
                style={{
                  height: `${Math.random() * 80 + 20}%`,
                  animationDelay: `${i * 50}ms`
                }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>24:00</span>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4 text-white">
            Actividad Reciente
          </h3>
          <div className="space-y-4">
            {[
              {
                user: 'Carlos',
                action: 'compartió su propuesta',
                time: 'hace 5 min',
                type: 'proposal'
              },
              {
                user: 'Ana',
                action: 'completó su registro',
                time: 'hace 12 min',
                type: 'registration'
              },
              {
                user: 'Nuevo usuario',
                action: 'se registró',
                time: 'hace 18 min',
                type: 'new_user'
              },
              {
                user: 'Mensaje SMS',
                action: 'fue enviado a Zona Centro',
                time: 'hace 25 min',
                type: 'message'
              },
              {
                user: 'María',
                action: 'votó una propuesta',
                time: 'hace 31 min',
                type: 'vote'
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 hover:bg-white/5 rounded-xl transition-colors">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'proposal' ? 'bg-blue-500' :
                  activity.type === 'registration' ? 'bg-green-500' :
                  activity.type === 'new_user' ? 'bg-purple-500' :
                  activity.type === 'message' ? 'bg-yellow-500' :
                  'bg-orange-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-white">
                    <span className="font-medium">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
