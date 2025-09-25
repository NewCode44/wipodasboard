import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Globe, 
  Send, 
  BarChart3, 
  Settings,
  Wifi,
  TrendingUp,
  LayoutTemplate
} from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';
import { cn } from '@/lib/utils';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'campaigns', label: 'Campañas', icon: Users },
  { id: 'portals', label: 'Portales', icon: Globe },
  { id: 'templates', label: 'Plantillas', icon: LayoutTemplate },
  { id: 'communications', label: 'Comunicaciones', icon: Send },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'config', label: 'Configuración', icon: Settings },
];

interface SidebarProps {
  isCollapsed: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
  const { activeSection, setActiveSection } = useDashboardStore();

  return (
    <div className={cn(
      'h-full glass-card p-6 flex flex-col transition-all duration-300'
    )}>
      {/* Logo */}
      <div className={cn(
        "flex items-center mb-8",
        isCollapsed ? 'justify-center' : 'space-x-3'
      )}>
        <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-gradient-primary rounded-xl">
          <Wifi className="w-6 h-6 text-white" />
        </div>
        {!isCollapsed && (
          <div className="overflow-hidden">
            <h1 className="text-xl font-bold gradient-text whitespace-nowrap">WiPo</h1>
            <p className="text-xs text-gray-400 whitespace-nowrap">WiFi Político</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="space-y-2 flex-grow">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={cn(
                'sidebar-item group w-full text-left',
                isActive && 'active',
                isCollapsed && 'justify-center'
              )}
              title={isCollapsed ? item.label : ''}
            >
              <Icon className={cn(
                'w-5 h-5 transition-colors flex-shrink-0',
                isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
              )} />
              {!isCollapsed && (
                <span className={cn(
                  'transition-colors whitespace-nowrap',
                  isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
                )}>
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Status indicator */}
      {!isCollapsed && (
        <div className="mt-8 p-4 glass-card flex-shrink-0">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300">Sistema Online</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-400">
            <TrendingUp className="w-3 h-3" />
            <span>Actualizando cada 30s</span>
          </div>
        </div>
      )}
    </div>
  );
};
