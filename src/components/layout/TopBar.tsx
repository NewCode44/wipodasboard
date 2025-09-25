import React from 'react';
import { 
  Bell, 
  Search, 
  Menu, 
  User,
  Settings,
  LogOut
} from 'lucide-react';

interface TopBarProps {
  onToggleSidebar: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ 
  onToggleSidebar, 
}) => {
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);

  return (
    <div className="h-16 glass-card px-6 flex items-center justify-between">
      {/* Left section */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden md:block">
          <h2 className="text-xl font-semibold text-white">
            Dashboard de Campaña
          </h2>
          <p className="text-sm text-gray-400">
            Gestiona tus portales cautivos
          </p>
        </div>
      </div>

      {/* Center - Search */}
      <div className="hidden lg:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar campañas, portales, routers..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-2 md:space-x-4">
        {/* Notifications */}
        <button className="relative p-2 hover:bg-white/10 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-background-dark"></div>
        </button>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-3 p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-white">Carlos Mendez</p>
              <p className="text-xs text-gray-400">Administrador</p>
            </div>
          </button>

          {/* Profile dropdown */}
          {showProfileMenu && (
            <div 
              className="absolute right-0 top-full mt-2 w-48 glass-card border border-white/20 rounded-xl overflow-hidden z-50 animate-fade-in"
              onMouseLeave={() => setShowProfileMenu(false)}
            >
              <div className="p-3 border-b border-white/10">
                <p className="text-sm font-medium">Carlos Mendez</p>
                <p className="text-xs text-gray-400">carlos@campaign.com</p>
              </div>
              <div className="p-2">
                <button className="flex items-center space-x-2 w-full p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Settings className="w-4 h-4" />
                  <span className="text-sm">Configuración</span>
                </button>
                <button className="flex items-center space-x-2 w-full p-2 hover:bg-white/10 rounded-lg transition-colors text-red-400">
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Cerrar Sesión</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
