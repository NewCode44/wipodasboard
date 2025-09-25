import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { DashboardHome } from './components/dashboard/DashboardHome';
import { CampaignGrid } from './components/campaigns/CampaignGrid';
import { PortalGrid } from './components/portals/PortalGrid';
import { CommunicationsGrid } from './components/communications/CommunicationsGrid';
import { AnalyticsCharts } from './components/analytics/AnalyticsCharts';
import { PortalConfig } from './components/config/PortalConfig';
import { TemplateGrid } from './components/templates/TemplateGrid';
import { PortalEditor } from './components/editor/PortalEditor';
import { CampaignModal } from './components/campaigns/CampaignModal';
import { PortalModal } from './components/portals/PortalModal';
import { MessageModal } from './components/communications/MessageModal';
import { TemplatePreviewModal } from './components/templates/TemplatePreviewModal';
import { useDashboardStore } from './store/dashboardStore';
import { cn } from '@/lib/utils';

function App() {
  const { 
    activeSection, 
    modalOpen, 
    previewingTemplate, 
    closeTemplatePreview 
  } = useDashboardStore();
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(true);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      useDashboardStore.getState().updateStats();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'campaigns':
        return <CampaignGrid />;
      case 'portals':
        return <PortalGrid />;
      case 'communications':
        return <CommunicationsGrid />;
      case 'analytics':
        return <AnalyticsCharts />;
      case 'config':
        return <PortalConfig />;
      case 'templates':
        return <TemplateGrid />;
      case 'editor':
        return <PortalEditor />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-background-dark text-white flex">
        {/* Mobile Sidebar (Drawer) */}
        <div
          className={cn(
            'fixed inset-y-0 left-0 z-50 w-80 p-4 transition-transform duration-300 md:hidden',
            sidebarCollapsed ? '-translate-x-full' : 'translate-x-0'
          )}
        >
          <Sidebar isCollapsed={false} />
        </div>

        {/* Desktop Sidebar */}
        <div
          className={cn(
            'hidden md:fixed md:inset-y-0 md:flex md:flex-col p-4 transition-all duration-300',
            sidebarCollapsed ? 'w-28' : 'w-80'
          )}
        >
          <Sidebar isCollapsed={sidebarCollapsed} />
        </div>

        {/* Mobile overlay */}
        {!sidebarCollapsed && (
          <div
            className="fixed inset-0 bg-black/60 z-40 md:hidden"
            onClick={() => setSidebarCollapsed(true)}
          />
        )}

        {/* Main content */}
        <div
          className={cn(
            'flex-1 flex flex-col transition-all duration-300',
            sidebarCollapsed ? 'md:pl-28' : 'md:pl-80'
          )}
        >
          <div className="p-4 pb-0">
            <TopBar onToggleSidebar={toggleSidebar} />
          </div>
          
          <main className="flex-1 p-4 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
              {renderContent()}
            </div>
          </main>
        </div>

        {/* Modals */}
        <CampaignModal isOpen={modalOpen === 'campaign'} />
        <PortalModal isOpen={modalOpen === 'portal'} />
        <MessageModal isOpen={modalOpen === 'message'} />
        <TemplatePreviewModal 
          isOpen={!!previewingTemplate}
          onClose={closeTemplatePreview}
          template={previewingTemplate}
        />

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              backdropFilter: 'blur(25px)',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
