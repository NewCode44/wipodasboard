import React from 'react';
import { BarChart3, TrendingUp, Download, Calendar } from 'lucide-react';

export const AnalyticsCharts: React.FC = () => {
  const [timeRange, setTimeRange] = React.useState<'7d' | '30d' | '90d'>('30d');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-white">Analytics Avanzados</h2>
          <p className="text-gray-400">Análisis detallado de tu campaña política</p>
        </div>
        
        <div className="flex space-x-3">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="glass-button bg-white/5 border border-white/10"
          >
            <option value="7d">Últimos 7 días</option>
            <option value="30d">Últimos 30 días</option>
            <option value="90d">Últimos 90 días</option>
          </select>
          <button className="glass-button bg-gradient-primary">
            <Download className="w-4 h-4 mr-2" />
            Exportar PDF
          </button>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Users Chart */}
        <div className="glass-card p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Usuarios por Día</h3>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <div className="h-64 flex items-end justify-between space-x-2">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-primary-500 to-primary-300 rounded-t transition-all duration-500 hover:from-primary-400 hover:to-primary-200"
                style={{
                  height: `${Math.random() * 80 + 20}%`,
                  animationDelay: `${i * 20}ms`
                }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>Día 1</span>
            <span>Día 15</span>
            <span>Día 30</span>
          </div>
        </div>

        {/* Traffic Zones */}
        <div className="glass-card p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Zonas de Mayor Tráfico</h3>
            <BarChart3 className="w-5 h-5 text-blue-400" />
          </div>
          <div className="space-y-3">
            {[
              { zone: 'Plaza Central', users: 2456, color: 'bg-primary-500' },
              { zone: 'Universidad', users: 1823, color: 'bg-blue-500' },
              { zone: 'Centro Comercial', users: 1542, color: 'bg-green-500' },
              { zone: 'Barrio Norte', users: 1234, color: 'bg-purple-500' },
              { zone: 'Terminal', users: 987, color: 'bg-orange-500' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                  <span className="text-gray-300">{item.zone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-white/10 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${item.color}`}
                      style={{ width: `${(item.users / 2456) * 100}%` }}
                    />
                  </div>
                  <span className="text-white font-medium w-12 text-right">{item.users}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Propuestas Más Compartidas', value: '15', subtitle: 'Esta semana' },
          { title: 'Tasa de Conversión', value: '89%', subtitle: 'Promedio mensual' },
          { title: 'Tiempo Promedio', value: '4.2min', subtitle: 'En portal' },
          { title: 'Dispositivos Únicos', value: '3,247', subtitle: 'Total registrados' }
        ].map((stat, index) => (
          <div key={index} className="glass-card p-6">
            <h4 className="text-sm text-gray-400 mb-2">{stat.title}</h4>
            <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.subtitle}</p>
          </div>
        ))}
      </div>

      {/* Conversion Funnel */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Embudo de Conversión</h3>
        <div className="space-y-4">
          {[
            { step: 'Conexión WiFi', users: 5000, percentage: 100 },
            { step: 'Portal Visitado', users: 4500, percentage: 90 },
            { step: 'Registro Completado', users: 3600, percentage: 72 },
            { step: 'Propuesta Enviada', users: 2800, percentage: 56 },
            { step: 'Compartido en RRSS', users: 1400, percentage: 28 }
          ].map((step, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-32 text-right">
                <p className="text-sm text-gray-300">{step.step}</p>
              </div>
              <div className="flex-1 bg-white/10 rounded-full h-8 relative">
                <div 
                  className="h-8 bg-gradient-to-r from-primary-500 to-primary-400 rounded-full flex items-center justify-center transition-all duration-1000"
                  style={{ width: `${step.percentage}%` }}
                >
                  <span className="text-white text-sm font-medium">{step.users}</span>
                </div>
              </div>
              <div className="w-16 text-left">
                <span className="text-sm text-gray-400">{step.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
