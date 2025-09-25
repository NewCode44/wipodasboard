import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Template } from '../../store/dashboardStore';
import { RecognitionPreviewContent } from './RecognitionPreviewContent';
import { ProposalsPreviewContent } from './ProposalsPreviewContent';
import { AchievementsPreviewContent } from './AchievementsPreviewContent';
import { CountdownPreviewContent } from './CountdownPreviewContent';
import { ComparativePreviewContent } from './ComparativePreviewContent';
import { VideoPreviewContent } from './VideoPreviewContent';
import { AssociationPreviewContent } from './AssociationPreviewContent';
import { TeamPreviewContent } from './TeamPreviewContent';

const renderPreview = (template: Template) => {
  switch (template.type) {
    case 'Reconocimiento': return <RecognitionPreviewContent config={template.config} />;
    case 'Propuestas': return <ProposalsPreviewContent config={template.config} />;
    case 'Trayectoria': return <AchievementsPreviewContent config={template.config} />;
    case 'Cuenta Regresiva': return <CountdownPreviewContent config={template.config} />;
    case 'Comparativo': return <ComparativePreviewContent config={template.config} />;
    case 'Video': return <VideoPreviewContent config={template.config} />;
    case 'Asociación': return <AssociationPreviewContent config={template.config} />;
    case 'Equipo': return <TeamPreviewContent config={template.config} />;
    default: return (
      <div className="w-full h-full flex items-center justify-center bg-gray-800/50">
        <p className="text-gray-400">Vista previa no disponible para este tipo de plantilla.</p>
      </div>
    );
  }
};

export const TemplatePreviewModal: React.FC<{ isOpen: boolean; onClose: () => void; template: Template | null; }> = ({ isOpen, onClose, template }) => {
  if (!template || !template.config) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: -50 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="w-full max-w-6xl h-[90vh] bg-background-dark rounded-2xl shadow-2xl shadow-primary-500/20 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Browser Header */}
            <div className="flex-shrink-0 p-3 bg-gray-800/50 rounded-t-2xl flex items-center space-x-2 border-b border-white/10">
              <div className="flex space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 bg-black/30 rounded-full text-center text-sm text-gray-400 py-1">
                https://portal.wipo.com/preview/{template.id}
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* Portal Content */}
            <div className="flex-1 overflow-hidden bg-background-dark">
                {renderPreview(template)}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
