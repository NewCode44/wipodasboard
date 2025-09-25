import React from 'react';
import { Palette, Upload, Save, Eye, Smartphone, Monitor, Tablet } from 'lucide-react';

export const PortalConfig: React.FC = () => {
  const [config, setConfig] = React.useState({
    primaryColor: '#FF6B35',
    secondaryColor: '#1A1A2E',
    logo: '',
    welcomeTitle: 'Bienvenido a nuestra campaña',
    welcomeMessage: 'Conéctate y participa en el futuro de nuestra ciudad',
    widgets: {
      recognition: true,
      proposals: true,
      countdown: false,
      social: true,
      news: true
    }
  });

  const [previewDevice, setPreviewDevice] = React.useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  const handleConfigChange = (key: string, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleWidgetChange = (widget: string, enabled: boolean) => {
    setConfig(prev => ({
      ...prev,
      widgets: { ...prev.widgets, [widget]: enabled }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-white">Configuración del Portal</h2>
          <p className="text-gray-400">Personaliza la apariencia y funcionalidad de tus portales</p>
        </div>
        
        <div className="flex space-x-3">
          <button className="glass-button">
            <Eye className="w-4 h-4 mr-2" />
            Vista Previa
          </button>
          <button className="glass-button bg-gradient-primary">
            <Save className="w-4 h-4 mr-2" />
            Guardar Cambios
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuration Panel */}
        <div className="space-y-6">
          {/* Brand Settings */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Palette className="w-5 h-5 mr-2" />
              Identidad Visual
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Color Primario
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={config.primaryColor}
                    onChange={(e) => handleConfigChange('primaryColor', e.target.value)}
                    className="w-12 h-10 rounded-lg border border-white/20 bg-transparent"
                  />
                  <input
                    type="text"
                    value={config.primaryColor}
                    onChange={(e) => handleConfigChange('primaryColor', e.target.value)}
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Color Secundario
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={config.secondaryColor}
                    onChange={(e) => handleConfigChange('secondaryColor', e.target.value)}
                    className="w-12 h-10 rounded-lg border border-white/20 bg-transparent"
                  />
                  <input
                    type="text"
                    value={config.secondaryColor}
                    onChange={(e) => handleConfigChange('secondaryColor', e.target.value)}
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Logo de la Campaña
                </label>
                <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-primary-500/50 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Arrastra tu logo aquí o haz clic para subir</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG hasta 2MB</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Settings */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Contenido del Portal
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Título de Bienvenida
                </label>
                <input
                  type="text"
                  value={config.welcomeTitle}
                  onChange={(e) => handleConfigChange('welcomeTitle', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mensaje de Bienvenida
                </label>
                <textarea
                  value={config.welcomeMessage}
                  onChange={(e) => handleConfigChange('welcomeMessage', e.target.value)}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white resize-none"
                />
              </div>
            </div>
          </div>

          {/* Widget Settings */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Widgets Activos
            </h3>
            
            <div className="space-y-3">
              {[
                { key: 'recognition', label: 'Reconocimiento Ciudadano', description: 'Sistema de reconocimiento facial' },
                { key: 'proposals', label: 'Propuestas', description: 'Recolección de propuestas ciudadanas' },
                { key: 'countdown', label: 'Cuenta Regresiva', description: 'Contador hacia la elección' },
                { key: 'social', label: 'Redes Sociales', description: 'Integración con RRSS' },
                { key: 'news', label: 'Noticias', description: 'Feed de noticias de campaña' }
              ].map((widget) => (
                <div key={widget.key} className="flex items-center justify-between p-3 glass-card">
                  <div>
                    <h4 className="text-white font-medium">{widget.label}</h4>
                    <p className="text-sm text-gray-400">{widget.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.widgets[widget.key as keyof typeof config.widgets]}
                      onChange={(e) => handleWidgetChange(widget.key, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="space-y-6">
          {/* Device Selector */}
          <div className="flex space-x-2">
            {[
              { key: 'mobile', icon: Smartphone, label: 'Móvil' },
              { key: 'tablet', icon: Tablet, label: 'Tablet' },
              { key: 'desktop', icon: Monitor, label: 'Desktop' }
            ].map((device) => (
              <button
                key={device.key}
                onClick={() => setPreviewDevice(device.key as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  previewDevice === device.key
                    ? 'bg-primary-500 text-white'
                    : 'glass-card hover:bg-white/10'
                }`}
              >
                <device.icon className="w-4 h-4" />
                <span className="text-sm">{device.label}</span>
              </button>
            ))}
          </div>

          {/* Preview */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Vista Previa del Portal</h3>
            
            <div className={`mx-auto border border-white/20 rounded-xl overflow-hidden ${
              previewDevice === 'mobile' ? 'w-80 h-96' :
              previewDevice === 'tablet' ? 'w-96 h-80' :
              'w-full h-96'
            }`}>
              <div 
                className="h-full relative"
                style={{ 
                  background: `linear-gradient(135deg, ${config.primaryColor}20, ${config.secondaryColor}20)` 
                }}
              >
                {/* Header */}
                <div 
                  className="p-4 text-center border-b border-white/10"
                  style={{ backgroundColor: config.primaryColor + '30' }}
                >
                  <div className="w-16 h-8 bg-white/20 rounded mx-auto mb-2"></div>
                  <h1 className="text-white font-bold">{config.welcomeTitle}</h1>
                  <p className="text-white/80 text-sm mt-1">{config.welcomeMessage}</p>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  {config.widgets.recognition && (
                    <div className="bg-white/10 p-3 rounded-lg">
                      <div className="w-full h-6 bg-white/20 rounded mb-2"></div>
                      <div className="w-2/3 h-4 bg-white/10 rounded"></div>
                    </div>
                  )}
                  
                  {config.widgets.proposals && (
                    <div className="bg-white/10 p-3 rounded-lg">
                      <div className="w-full h-6 bg-white/20 rounded mb-2"></div>
                      <div className="w-3/4 h-4 bg-white/10 rounded"></div>
                    </div>
                  )}

                  {config.widgets.social && (
                    <div className="flex space-x-2">
                      <div className="w-8 h-8 bg-blue-500/30 rounded"></div>
                      <div className="w-8 h-8 bg-green-500/30 rounded"></div>
                      <div className="w-8 h-8 bg-red-500/30 rounded"></div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
                  <div 
                    className="w-full h-10 rounded text-center text-white font-medium flex items-center justify-center"
                    style={{ backgroundColor: config.primaryColor }}
                  >
                    Conectar WiFi
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
