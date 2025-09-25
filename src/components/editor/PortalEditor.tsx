import React from 'react';
import { motion } from 'framer-motion';
import { useDashboardStore, Template } from '../../store/dashboardStore';
import { ArrowLeft, Save, Palette, Type, Image as ImageIcon, Link as LinkIcon, Calendar, Video, Users, Building, ShieldCheck, UserCheck, Heart } from 'lucide-react';
import { ImageUploadInput } from './ImageUploadInput';
import { SocialLinkEditor } from './SocialLinkEditor';
import { ProposalEditor } from './ProposalEditor';
import { AchievementEditor } from './AchievementEditor';
import { OpponentEditor } from './OpponentEditor';
import { AssociationEditor } from './AssociationEditor';
import { MovementEditor } from './MovementEditor';
import { TeamMemberEditor } from './TeamMemberEditor';
import { RecognitionPreviewContent } from '../templates/RecognitionPreviewContent';
import { ProposalsPreviewContent } from '../templates/ProposalsPreviewContent';
import { AchievementsPreviewContent } from '../templates/AchievementsPreviewContent';
import { CountdownPreviewContent } from '../templates/CountdownPreviewContent';
import { ComparativePreviewContent } from '../templates/ComparativePreviewContent';
import { VideoPreviewContent } from '../templates/VideoPreviewContent';
import { AssociationPreviewContent } from '../templates/AssociationPreviewContent';
import { TeamPreviewContent } from '../templates/TeamPreviewContent';

const EditorInput: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; type?: string; placeholder?: string; as?: 'input' | 'textarea' }> = ({ label, value, onChange, type = 'text', placeholder, as = 'input' }) => (
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
    {as === 'input' ? (
      <input
        type={type}
        value={value}
        onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
      />
    ) : (
      <textarea
        value={value}
        onChange={onChange as (e: React.ChangeEvent<HTMLTextAreaElement>) => void}
        placeholder={placeholder}
        rows={3}
        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 resize-none"
      />
    )}
  </div>
);

const EditorColorInput: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ label, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
        <div className="flex items-center space-x-3">
            <input
                type="color"
                value={value}
                onChange={onChange}
                className="w-12 h-10 p-1 rounded-lg border border-white/20 bg-transparent"
            />
            <input
                type="text"
                value={value}
                onChange={onChange}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white"
            />
        </div>
    </div>
);

const EditorSection: React.FC<{ title: string; icon: React.ElementType; children: React.ReactNode }> = ({ title, icon: Icon, children }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold flex items-center text-white border-b border-white/10 pb-3">
      <Icon className="w-5 h-5 mr-3 text-primary-400" /> {title}
    </h3>
    <div className="space-y-4">{children}</div>
  </div>
);

const renderPreview = (template: Template) => {
  if (template.id.startsWith('tpl-new')) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-800/50 rounded-lg">
        <p className="text-gray-500">Lienzo en Blanco</p>
      </div>
    );
  }
  switch (template.type) {
    case 'Reconocimiento': return <RecognitionPreviewContent config={template.config} />;
    case 'Propuestas': return <ProposalsPreviewContent config={template.config} />;
    case 'Trayectoria': return <AchievementsPreviewContent config={template.config} />;
    case 'Cuenta Regresiva': return <CountdownPreviewContent config={template.config} />;
    case 'Comparativo': return <ComparativePreviewContent config={template.config} />;
    case 'Video': return <VideoPreviewContent config={template.config} />;
    case 'Asociación': return <AssociationPreviewContent config={template.config} />;
    case 'Equipo': return <TeamPreviewContent config={template.config} />;
    default: return <div className="text-center p-8">Vista previa no disponible para este tipo de plantilla.</div>;
  }
};

export const PortalEditor: React.FC = () => {
  const { 
    editingTemplate, 
    stopEditing, 
    updateTemplateConfig,
    updateSocialLink,
    updateProposal,
    updateAchievement,
    updateOpponent,
    updateOpponentStance,
    updateAssociation,
    updateAssociationMetric,
    updateMovement,
    updateTeamMember
  } = useDashboardStore();

  if (!editingTemplate) {
    return (
      <div className="text-center p-12 glass-card">
        <h2 className="text-2xl font-bold">No hay plantilla en edición</h2>
        <p className="text-gray-400 mt-2">
          Por favor, selecciona una plantilla para editar o crea una nueva.
        </p>
        <button onClick={() => useDashboardStore.getState().setActiveSection('templates')} className="mt-6 glass-button bg-gradient-primary">
          Volver a Plantillas
        </button>
      </div>
    );
  }

  const { config } = editingTemplate;

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)]">
      {/* Header */}
      <div className="flex-shrink-0 flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
            <button onClick={() => useDashboardStore.getState().setActiveSection('templates')} className="p-2 hover:bg-white/10 rounded-lg">
                <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
                <h2 className="text-2xl font-bold text-white">Editor de Portales</h2>
                <p className="text-gray-400">Estás editando: <span className="font-semibold text-primary-400">{editingTemplate.title}</span></p>
            </div>
        </div>
        <button onClick={stopEditing} className="glass-button bg-gradient-primary flex items-center space-x-2">
          <Save className="w-4 h-4" />
          <span>Guardar y Salir</span>
        </button>
      </div>
      
      {/* Editor Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
        {/* Left Panel: Controls */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="lg:col-span-1 glass-card p-6 overflow-y-auto space-y-8"
        >
          <EditorSection title="Estilos Globales" icon={Palette}>
            <EditorColorInput label="Color Primario" value={config.primaryColor} onChange={(e) => updateTemplateConfig('primaryColor', e.target.value)} />
            <EditorColorInput label="Color Secundario" value={config.secondaryColor} onChange={(e) => updateTemplateConfig('secondaryColor', e.target.value)} />
            <ImageUploadInput label="Imagen de Fondo General" value={config.backgroundImage} onChange={(url) => updateTemplateConfig('backgroundImage', url)} />
          </EditorSection>

          <EditorSection title="Candidato" icon={UserCheck}>
            <EditorInput label="Nombre del Candidato" value={config.candidateName} onChange={(e) => updateTemplateConfig('candidateName', e.target.value)} />
            <EditorInput label="Cargo al que Aspira" value={config.candidatePosition} onChange={(e) => updateTemplateConfig('candidatePosition', e.target.value)} />
            <ImageUploadInput label="Imagen del Candidato" value={config.candidateImage} onChange={(url) => updateTemplateConfig('candidateImage', url)} />
            <ImageUploadInput label="Logo del Partido" value={config.partyLogo} onChange={(url) => updateTemplateConfig('partyLogo', url)} />
          </EditorSection>

          <EditorSection title="Redes Sociales" icon={LinkIcon}>
            {Object.keys(config.socialLinks).map((key) => {
              const network = key as keyof typeof config.socialLinks;
              return (
                <SocialLinkEditor
                  key={network}
                  network={network}
                  url={config.socialLinks[network].url}
                  isEnabled={config.socialLinks[network].enabled}
                  onUrlChange={(e) => updateSocialLink(network, 'url', e.target.value)}
                  onToggleChange={(checked) => updateSocialLink(network, 'enabled', checked)}
                />
              );
            })}
          </EditorSection>

          {config.proposals && (
            <EditorSection title="Propuestas" icon={Building}>
              {config.proposals.map((p, i) => (
                <ProposalEditor key={i} index={i} proposal={p} onTitleChange={(e) => updateProposal(i, 'title', e.target.value)} onDescriptionChange={(e) => updateProposal(i, 'description', e.target.value)} />
              ))}
            </EditorSection>
          )}

          {config.achievements && (
            <EditorSection title="Logros" icon={ShieldCheck}>
              {config.achievements.map((a, i) => (
                <AchievementEditor key={i} index={i} achievement={a} onUpdate={updateAchievement} />
              ))}
            </EditorSection>
          )}

          {config.electionDate !== undefined && (
            <EditorSection title="Elección" icon={Calendar}>
              <EditorInput label="Fecha de la Elección" value={config.electionDate.substring(0, 16)} onChange={(e) => updateTemplateConfig('electionDate', e.target.value)} type="datetime-local" />
            </EditorSection>
          )}

          {config.opponent && (
            <EditorSection title="Oponente" icon={Users}>
              <OpponentEditor opponent={config.opponent} onUpdate={updateOpponent} onStanceUpdate={updateOpponentStance} />
            </EditorSection>
          )}
          
          {config.videoUrl !== undefined && (
            <EditorSection title="Video" icon={Video}>
              <EditorInput label="URL del Video (.mp4)" value={config.videoUrl} onChange={(e) => updateTemplateConfig('videoUrl', e.target.value)} />
            </EditorSection>
          )}

          {config.association && (
            <EditorSection title="Asociación Civil" icon={Heart}>
              <AssociationEditor association={config.association} onUpdate={updateAssociation} onMetricUpdate={updateAssociationMetric} />
            </EditorSection>
          )}

          {config.movement && (
            <EditorSection title="Movimiento" icon={Users}>
              <MovementEditor movement={config.movement} onUpdate={updateMovement} />
            </EditorSection>
          )}

          {config.team && (
            <EditorSection title="Equipo" icon={Users}>
              {config.team.map((m, i) => (
                <TeamMemberEditor key={m.id} index={i} member={m} onUpdate={updateTeamMember} />
              ))}
            </EditorSection>
          )}

        </motion.div>

        {/* Right Panel: Preview */}
        <div className="lg:col-span-2 glass-card p-4 flex items-center justify-center bg-[#111119] bg-[radial-gradient(#ffffff1a_1px,transparent_1px)] [background-size:16px_16px]">
          <motion.div 
            key={editingTemplate.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full h-full"
          >
            {renderPreview(editingTemplate)}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
