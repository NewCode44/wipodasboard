import { create } from 'zustand';
import toast from 'react-hot-toast';
import { BookOpen, HeartPulse, HardHat, Shield, Briefcase, TrendingUp, Building, Heart, Award, Users, Star, CheckCircle, XCircle } from 'lucide-react';

// --- INTERFACES ---

export interface Campaign {
  id: string; name: string; description: string; status: 'Activa' | 'Finalizada'; startDate: string; endDate: string; objective: string; zones: string[]; votantes: number; conversion: number;
}
export interface Portal {
  id: string; name: string; type: 'Reconocimiento' | 'Propuestas' | 'Trayectoria' | 'Cuenta Regresiva' | 'Comparativo'; status: 'Activo' | 'Inactivo'; content: string; design: { primaryColor: string; secondaryColor: string; logo: string; }; widgets: string[];
}
export interface Message {
  id:string; type: 'SMS' | 'Email' | 'Push'; title: string; content: string; audience: string; status: 'Enviado' | 'Programado' | 'Borrador'; sentDate: string; openRate: number;
}

// --- CONFIGURACIÓN DE PLANTILLAS ---

export type SocialNetwork = 'facebook' | 'whatsapp' | 'instagram' | 'x';
export interface Proposal { icon: string; title: string; description: string; }
export interface Achievement { icon: string; title: string; dateRange: string; stats: { value: string; label: string }[]; }
export interface OpponentConfig { name: string; position: string; image: string; stances: { icon: string; text: string; }[]; }
export interface ImpactMetric { icon: string; value: string; label: string; }
export interface AssociationConfig { name: string; mission: string; logo: string; impactMetrics: ImpactMetric[]; }
export interface TeamMember { id: string; name: string; role: string; image: string; }
export interface MovementConfig { name: string; slogan: string; backgroundImage: string; }

export interface TemplateConfig {
  primaryColor: string;
  secondaryColor: string;
  welcomeTitle: string;
  welcomeMessage: string;
  candidateName: string;
  candidatePosition: string;
  candidateImage: string;
  partyLogo: string;
  backgroundImage: string;
  socialLinks: Record<SocialNetwork, { url: string; enabled: boolean; }>;
  proposals?: Proposal[];
  achievements?: Achievement[];
  electionDate?: string;
  opponent?: OpponentConfig;
  videoUrl?: string;
  association?: AssociationConfig;
  movement?: MovementConfig;
  team?: TeamMember[];
}

export interface Template {
  id: string; title: string; description: string; type: 'Reconocimiento' | 'Propuestas' | 'Trayectoria' | 'Cuenta Regresiva' | 'Comparativo' | 'Video' | 'Asociación' | 'Equipo' | 'Mixto'; tags: string[]; features: string[]; previewImage: string; config: TemplateConfig;
}

export interface DashboardStats {
  votantesConectados: { value: number; change: number; };
  zonasMayorTrafico: { value: number; change: number; };
  conversionWifi: { value: number; change: number; };
  propuestasCompartidas: { value: number; sales: number; };
}

type ModalType = 'campaign' | 'portal' | 'message' | null;

interface DashboardState {
  activeSection: string;
  setActiveSection: (section: string) => void;
  stats: DashboardStats;
  updateStats: () => void;
  campaigns: Campaign[];
  portals: Portal[];
  messages: Message[];
  templates: Template[];
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  modalOpen: ModalType;
  openModal: (modal: ModalType) => void;
  closeModal: () => void;
  previewingTemplate: Template | null;
  openTemplatePreview: (template: Template) => void;
  closeTemplatePreview: () => void;
  
  // Editor State
  editingTemplate: Template | null;
  startEditingTemplate: (template: Template | null) => void;
  stopEditing: () => void;
  updateTemplateConfig: <K extends keyof TemplateConfig>(field: K, value: TemplateConfig[K]) => void;
  updateSocialLink: (network: SocialNetwork, field: 'url' | 'enabled', value: string | boolean) => void;
  updateProposal: (index: number, field: 'title' | 'description', value: string) => void;
  updateAchievement: (index: number, field: 'title' | 'dateRange' | `stat${number}_value` | `stat${number}_label`, value: string) => void;
  updateOpponent: (field: keyof Omit<OpponentConfig, 'stances'>, value: string) => void;
  updateOpponentStance: (index: number, value: string) => void;
  updateAssociation: (field: keyof Omit<AssociationConfig, 'impactMetrics'>, value: string) => void;
  updateAssociationMetric: (index: number, field: 'value' | 'label', value: string) => void;
  updateMovement: (field: keyof MovementConfig, value: string) => void;
  updateTeamMember: (index: number, field: keyof Omit<TeamMember, 'id'>, value: string) => void;
}

// --- DATOS MOCK ---

const mockCampaigns: Campaign[] = [
  { id: '1', name: 'Campaña Centro 2024', description: 'Campaña electoral para el centro de la ciudad', status: 'Activa', startDate: '2024-01-15', endDate: '2024-03-15', objective: 'Aumentar participación ciudadana', zones: ['Centro', 'Plaza Mayor', 'Universidad'], votantes: 1247, conversion: 89 },
  { id: '2', name: 'Propuestas Barrio Norte', description: 'Recolección de propuestas vecinales', status: 'Activa', startDate: '2024-02-01', endDate: '2024-04-01', objective: 'Recopilar propuestas ciudadanas', zones: ['Barrio Norte', 'Zona Comercial'], votantes: 893, conversion: 76 },
  { id: '3', name: 'Consulta Popular 2023', description: 'Consulta sobre obras públicas', status: 'Finalizada', startDate: '2023-11-01', endDate: '2023-12-31', objective: 'Consultar sobre prioridades de obras', zones: ['Toda la ciudad'], votantes: 2156, conversion: 92 }
];
const mockPortals: Portal[] = [
  { id: '1', name: 'Portal Principal', type: 'Reconocimiento', status: 'Activo', content: 'Portal de bienvenida con reconocimiento ciudadano', design: { primaryColor: '#FF6B35', secondaryColor: '#1A1A2E', logo: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/120x60/FF6B35/FFFFFF?text=LOGO' }, widgets: ['Reconocimiento', 'Propuestas', 'Noticias'] },
  { id: '2', name: 'Portal Propuestas', type: 'Propuestas', status: 'Activo', content: 'Portal dedicado a la recolección de propuestas', design: { primaryColor: '#4CAF50', secondaryColor: '#1A1A2E', logo: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/120x60/4CAF50/FFFFFF?text=PROP' }, widgets: ['Propuestas', 'Votación', 'Comentarios'] }
];
const mockMessages: Message[] = [
  { id: '1', type: 'Email', title: '¡Gracias por participar!', content: 'Tu opinión es muy importante para nosotros. Sigue nuestras propuestas...', audience: 'Todos los registrados', status: 'Enviado', sentDate: '2024-01-20T10:30:00Z', openRate: 68 },
  { id: '2', type: 'SMS', title: 'Recordatorio de Votación', content: 'No olvides votar este domingo. Tu participación es clave. Link: bit.ly/vota-aqui', audience: 'Votantes Zona Centro', status: 'Programado', sentDate: '2024-01-25T09:00:00Z', openRate: 0 },
  { id: '3', type: 'Push', title: 'Nueva Propuesta de Seguridad', content: 'Hemos publicado una nueva propuesta sobre seguridad en tu barrio. ¡Opina ahora!', audience: 'Residentes Barrio Norte', status: 'Enviado', sentDate: '2024-01-18T15:00:00Z', openRate: 82 },
  { id: '4', type: 'Email', title: 'Resumen Semanal', content: 'Aquí tienes un resumen de las actividades y propuestas de la semana.', audience: 'Suscriptores Newsletter', status: 'Borrador', sentDate: '2024-01-22T12:00:00Z', openRate: 0 }
];

const defaultSocialLinks: Record<SocialNetwork, { url: string; enabled: boolean; }> = {
  facebook: { url: 'https://facebook.com/candidato2025', enabled: true },
  whatsapp: { url: 'https://wa.me/1234567890', enabled: true },
  instagram: { url: 'https://instagram.com/candidato2025', enabled: true },
  x: { url: 'https://x.com/candidato2025', enabled: false },
};

const createDefaultConfig = (overrides: Partial<TemplateConfig> = {}): TemplateConfig => ({
  primaryColor: '#FF6B35',
  secondaryColor: '#1A1A2E',
  welcomeTitle: 'Conéctate con el Futuro',
  welcomeMessage: 'Tu participación es clave. Ingresa y conoce nuestras propuestas.',
  candidateName: 'Candidato Genérico',
  candidatePosition: 'Presidencia Municipal',
  candidateImage: 'https://img-wrapper.vercel.app/image?url=https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=600',
  partyLogo: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/150x50/FFFFFF/0F0F23?text=PARTIDO',
  backgroundImage: 'https://img-wrapper.vercel.app/image?url=https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  socialLinks: JSON.parse(JSON.stringify(defaultSocialLinks)),
  ...overrides,
});

export const useDashboardStore = create<DashboardState>((set, get) => ({
  activeSection: 'dashboard',
  setActiveSection: (section) => set({ activeSection: section }),
  stats: { votantesConectados: { value: 1247, change: 12 }, zonasMayorTrafico: { value: 24, change: 3 }, conversionWifi: { value: 89, change: 5 }, propuestasCompartidas: { value: 15, sales: 2400 } },
  updateStats: () => {
    const currentStats = get().stats;
    set({ stats: { ...currentStats, votantesConectados: { ...currentStats.votantesConectados, value: currentStats.votantesConectados.value + Math.floor(Math.random() * 10) - 5 } } });
  },
  campaigns: mockCampaigns,
  portals: mockPortals,
  messages: mockMessages,
  templates: [
    {
      id: 'tpl-reconocimiento',
      title: 'Portal de Reconocimiento',
      description: 'Un portal simple y directo para capturar datos y dar a conocer al candidato. Ideal para un primer contacto.',
      type: 'Reconocimiento',
      tags: ['Básico', 'MikroTik', 'CHAP'],
      features: ['Autenticación CHAP/MD5', 'Diseño Político Personalizable', 'Integración con Redes Sociales', 'Totalmente Responsivo'],
      previewImage: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/600x400/1a5276/FFFFFF?text=Reconocimiento',
      config: createDefaultConfig({
        primaryColor: '#ffcc00',
        secondaryColor: '#00cc33',
        candidateName: 'Candidato de Reconocimiento',
      }),
    },
    {
      id: 'tpl-propuestas',
      title: 'Portal de Propuestas Clave',
      description: 'Muestra las propuestas más importantes de tu campaña en un carrusel dinámico y atractivo.',
      type: 'Propuestas',
      tags: ['Carrusel', 'Interactivo', 'Moderno'],
      features: ['Carrusel de 4 Propuestas', 'Animaciones Suaves', 'Diseño de Doble Panel', 'Enfoque en Contenido'],
      previewImage: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/600x400/2980b9/FFFFFF?text=Propuestas',
      config: createDefaultConfig({
        primaryColor: '#2980b9',
        secondaryColor: '#e74c3c',
        candidateName: 'Miguel Rodríguez',
        backgroundImage: 'https://img-wrapper.vercel.app/image?url=https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        proposals: [
          { icon: 'BookOpen', title: 'Educación de Calidad', description: 'Modernización escolar y becas estudiantiles para todos.' },
          { icon: 'HeartPulse', title: 'Salud Para Todos', description: 'Centro médico 24/7 y programas de prevención.' },
          { icon: 'HardHat', title: 'Infraestructura Moderna', description: 'Pavimentación de calles e iluminación LED en toda la ciudad.' },
          { icon: 'Shield', title: 'Seguridad Ciudadana', description: 'Más videovigilancia y comités vecinales activos.' },
        ],
      }),
    },
    {
      id: 'tpl-logros',
      title: 'Portal de Logros y Trayectoria',
      description: 'Destaca la experiencia y los resultados del candidato con un slider de logros y estadísticas de impacto.',
      type: 'Trayectoria',
      tags: ['Experiencia', 'Resultados', 'Profesional'],
      features: ['Slider de Logros con Estadísticas', 'Diseño Editorial Asimétrico', 'Enfoque en Credibilidad', 'Animación "Ken Burns"'],
      previewImage: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/600x400/1a5276/FFFFFF?text=Trayectoria',
      config: createDefaultConfig({
        primaryColor: '#1a5276',
        secondaryColor: '#f1c40f',
        candidateName: 'Carlos Mendoza',
        achievements: [
          { icon: 'BookOpen', title: 'Revolución Educativa', dateRange: '2015-2018', stats: [{ value: '32', label: 'Escuelas Renovadas' }, { value: '+28%', label: 'Graduación' }] },
          { icon: 'Building', title: 'Obras que Transforman', dateRange: '2018-2021', stats: [{ value: '200km', label: 'Calles Pavimentadas' }, { value: '15', label: 'Parques Nuevos' }] },
          { icon: 'TrendingUp', title: 'Impulso Económico', dateRange: '2019-2021', stats: [{ value: '1,200', label: 'Emprendedores' }, { value: '3,000+', label: 'Empleos Creados' }] },
          { icon: 'Heart', title: 'Salud Primero', dateRange: '2020-2022', stats: [{ value: '30,000', label: 'Personas Atendidas' }, { value: '-23%', label: 'Hospitalización' }] },
        ],
      }),
    },
    {
      id: 'tpl-countdown',
      title: 'Portal de Cuenta Regresiva',
      description: 'Genera urgencia y movilización con un contador en tiempo real hasta el día de la elección.',
      type: 'Cuenta Regresiva',
      tags: ['Urgencia', 'Movilización', 'Día D'],
      features: ['Contador Regresivo Gigante', 'Llamado a la Acción Claro', 'Diseño de Alto Impacto', 'Fondo Animado'],
      previewImage: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/600x400/e67e22/FFFFFF?text=Countdown',
      config: createDefaultConfig({
        primaryColor: '#e67e22',
        secondaryColor: '#d35400',
        candidateName: 'Laura Martínez',
        electionDate: '2025-06-01T08:00:00',
      }),
    },
    {
      id: 'tpl-comparativo',
      title: 'Portal Comparativo',
      description: 'Enfrenta las propuestas de tu candidato contra las de su oponente de forma clara y persuasiva.',
      type: 'Comparativo',
      tags: ['Persuasión', 'Contraste', 'Decisivo'],
      features: ['Diseño Asimétrico Persuasivo', 'Psicología del Color', 'Enfoque en Fortalezas', 'Presentación Clara'],
      previewImage: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/600x400/8B5CF6/FFFFFF?text=Comparativo',
      config: createDefaultConfig({
        primaryColor: '#8B5CF6',
        secondaryColor: '#7C3AED',
        candidateName: 'Ana García',
        proposals: [
          { icon: 'CheckCircle', title: 'Energías Limpias', description: 'Inversión en parques solares y eólicos.' },
          { icon: 'CheckCircle', title: 'Educación Digital', description: 'Tablets y conectividad para todos los estudiantes.' },
          { icon: 'CheckCircle', title: 'Transporte Público Moderno', description: 'Nuevas rutas y unidades eléctricas.' },
        ],
        opponent: {
          name: 'Marcos Torres',
          position: 'Candidato Oponente',
          image: 'https://img-wrapper.vercel.app/image?url=https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&w=600',
          stances: [
            { icon: 'XCircle', text: 'Dependencia de combustibles fósiles.' },
            { icon: 'XCircle', text: 'Recortes al presupuesto educativo.' },
            { icon: 'XCircle', text: 'Sin plan de movilidad urbana.' },
          ],
        },
      }),
    },
    {
      id: 'tpl-video',
      title: 'Portal de Video Breve',
      description: 'Conecta emocionalmente con un video de campaña corto y de alto impacto como pieza central.',
      type: 'Video',
      tags: ['Emocional', 'Cinematográfico', 'Directo'],
      features: ['Video Inmersivo Autoplay', 'Mensaje Directo y Claro', 'Diseño Minimalista', 'Enfoque en el Candidato'],
      previewImage: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/600x400/14B8A6/FFFFFF?text=Video',
      config: createDefaultConfig({
        primaryColor: '#14B8A6',
        secondaryColor: '#0F766E',
        candidateName: 'Sofia Castillo',
        videoUrl: 'https://videos.pexels.com/video-files/853875/853875-hd_1920_1080_25fps.mp4',
      }),
    },
    {
      id: 'tpl-asociacion',
      title: 'Portal Candidato y Asociación',
      description: 'Muestra el respaldo de una asociación civil, combinando la figura política con la acción social.',
      type: 'Asociación',
      tags: ['Credibilidad', 'Acción Social', 'Confianza'],
      features: ['Diseño de Doble Enfoque', 'Métricas de Impacto Social', 'Prueba Social Fuerte', 'Narrativa de Resultados'],
      previewImage: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/600x400/059669/FFFFFF?text=Asociaci%C3%B3n',
      config: createDefaultConfig({
        primaryColor: '#059669',
        secondaryColor: '#047857',
        candidateName: 'Ricardo Vega',
        association: {
          name: 'Fundación Crece',
          mission: 'Nuestra misión es impulsar el desarrollo comunitario a través de la educación y el emprendimiento.',
          logo: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/150x150/FFFFFF/059669?text=CRECE',
          impactMetrics: [
            { icon: 'Users', value: '1,500+', label: 'Familias Ayudadas' },
            { icon: 'Award', value: '300+', label: 'Becas Otorgadas' },
            { icon: 'Briefcase', value: '50+', label: 'Negocios Impulsados' },
          ],
        },
      }),
    },
    {
      id: 'tpl-equipo',
      title: 'Portal de Equipo y Movimiento',
      description: 'Presenta al equipo detrás del candidato y la visión del movimiento que representan.',
      type: 'Equipo',
      tags: ['Unidad', 'Fuerza', 'Colectivo'],
      features: ['Diseño de Tres Columnas', 'Presentación del Equipo', 'Visión del Movimiento', 'Liderazgo Claro'],
      previewImage: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/600x400/0ea5e9/FFFFFF?text=Equipo',
      config: createDefaultConfig({
        primaryColor: '#0ea5e9',
        secondaryColor: '#0284c7',
        candidateName: 'Javier Navarro',
        movement: {
          name: 'Fuerza Ciudadana',
          slogan: 'La fuerza del cambio está en la gente.',
          backgroundImage: 'https://img-wrapper.vercel.app/image?url=https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        },
        team: [
          { id: 'tm1', name: 'Laura Gómez', role: 'Jefa de Campaña', image: 'https://img-wrapper.vercel.app/image?url=https://images.pexels.com/photos/3772510/pexels-photo-3772510.jpeg?auto=compress&cs=tinysrgb&w=400' },
          { id: 'tm2', name: 'Marcos Peña', role: 'Estratega Político', image: 'https://img-wrapper.vercel.app/image?url=https://images.pexels.com/photos/845457/pexels-photo-845457.jpeg?auto=compress&cs=tinysrgb&w=400' },
          { id: 'tm3', name: 'Sofía Reyes', role: 'Dir. de Comunicación', image: 'https://img-wrapper.vercel.app/image?url=https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=400' },
          { id: 'tm4', name: 'David Chen', role: 'Analista de Datos', image: 'https://img-wrapper.vercel.app/image?url=https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400' },
        ],
      }),
    },
  ],
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
  modalOpen: null,
  openModal: (modal) => set({ modalOpen: modal }),
  closeModal: () => set({ modalOpen: null }),
  previewingTemplate: null,
  openTemplatePreview: (template) => set({ previewingTemplate: template }),
  closeTemplatePreview: () => set({ previewingTemplate: null }),
  editingTemplate: null,
  startEditingTemplate: (template) => {
    if (template) {
      set({ editingTemplate: JSON.parse(JSON.stringify(template)), activeSection: 'editor' });
    } else {
      // Crear nueva plantilla desde lienzo en blanco
      set({
        editingTemplate: {
          id: `tpl-new-${Date.now()}`,
          title: 'Nueva Plantilla Sin Título',
          description: 'Describe esta nueva plantilla...',
          type: 'Mixto',
          tags: ['Nuevo', 'Personalizado'],
          features: ['Diseño Libre'],
          previewImage: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/600x400/1A1A2E/FFFFFF?text=Lienzo+en+Blanco',
          config: createDefaultConfig()
        },
        activeSection: 'editor'
      });
    }
  },
  stopEditing: () => {
    set(state => {
      if (!state.editingTemplate) return {};
      // Lógica para actualizar la plantilla en el array `templates`
      const newTemplates = state.templates.map(t => 
        t.id === state.editingTemplate!.id ? state.editingTemplate! : t
      );
      // Si era una plantilla nueva, la añade
      if (!state.templates.some(t => t.id === state.editingTemplate!.id)) {
        newTemplates.push(state.editingTemplate!);
      }
      toast.success('Cambios guardados en la plantilla!');
      return { editingTemplate: null, activeSection: 'templates', templates: newTemplates };
    });
  },
  updateTemplateConfig: (field, value) => {
    set(state => {
      if (!state.editingTemplate) return {};
      return {
        editingTemplate: {
          ...state.editingTemplate,
          config: { ...state.editingTemplate.config, [field]: value }
        }
      };
    });
  },
  updateSocialLink: (network, field, value) => {
    set(state => {
      if (!state.editingTemplate) return {};
      const newSocialLinks = { ...state.editingTemplate.config.socialLinks };
      newSocialLinks[network] = { ...newSocialLinks[network], [field]: value };
      return {
        editingTemplate: {
          ...state.editingTemplate,
          config: { ...state.editingTemplate.config, socialLinks: newSocialLinks }
        }
      };
    });
  },
  updateProposal: (index, field, value) => {
    set(state => {
      if (!state.editingTemplate || !state.editingTemplate.config.proposals) return {};
      const newProposals = [...state.editingTemplate.config.proposals];
      newProposals[index] = { ...newProposals[index], [field]: value };
      return {
        editingTemplate: {
          ...state.editingTemplate,
          config: { ...state.editingTemplate.config, proposals: newProposals }
        }
      };
    });
  },
  updateAchievement: (index, field, value) => {
    set(state => {
      if (!state.editingTemplate || !state.editingTemplate.config.achievements) return {};
      const newAchievements = JSON.parse(JSON.stringify(state.editingTemplate.config.achievements));
      if (field.startsWith('stat')) {
        const statIndex = parseInt(field.charAt(4));
        const statField = field.substring(6) as 'value' | 'label';
        newAchievements[index].stats[statIndex][statField] = value;
      } else {
        newAchievements[index][field as 'title' | 'dateRange'] = value;
      }
      return {
        editingTemplate: {
          ...state.editingTemplate,
          config: { ...state.editingTemplate.config, achievements: newAchievements }
        }
      };
    });
  },
  updateOpponent: (field, value) => {
    set(state => {
      if (!state.editingTemplate || !state.editingTemplate.config.opponent) return {};
      return {
        editingTemplate: {
          ...state.editingTemplate,
          config: {
            ...state.editingTemplate.config,
            opponent: { ...state.editingTemplate.config.opponent, [field]: value }
          }
        }
      };
    });
  },
  updateOpponentStance: (index, value) => {
    set(state => {
      if (!state.editingTemplate || !state.editingTemplate.config.opponent) return {};
      const newStances = [...state.editingTemplate.config.opponent.stances];
      newStances[index] = { ...newStances[index], text: value };
      return {
        editingTemplate: {
          ...state.editingTemplate,
          config: {
            ...state.editingTemplate.config,
            opponent: { ...state.editingTemplate.config.opponent, stances: newStances }
          }
        }
      };
    });
  },
  updateAssociation: (field, value) => {
    set(state => {
      if (!state.editingTemplate || !state.editingTemplate.config.association) return {};
      return {
        editingTemplate: {
          ...state.editingTemplate,
          config: {
            ...state.editingTemplate.config,
            association: { ...state.editingTemplate.config.association, [field]: value }
          }
        }
      };
    });
  },
  updateAssociationMetric: (index, field, value) => {
    set(state => {
      if (!state.editingTemplate || !state.editingTemplate.config.association) return {};
      const newMetrics = [...state.editingTemplate.config.association.impactMetrics];
      newMetrics[index] = { ...newMetrics[index], [field]: value };
      return {
        editingTemplate: {
          ...state.editingTemplate,
          config: {
            ...state.editingTemplate.config,
            association: { ...state.editingTemplate.config.association, impactMetrics: newMetrics }
          }
        }
      };
    });
  },
  updateMovement: (field, value) => {
    set(state => {
      if (!state.editingTemplate || !state.editingTemplate.config.movement) return {};
      return {
        editingTemplate: {
          ...state.editingTemplate,
          config: {
            ...state.editingTemplate.config,
            movement: { ...state.editingTemplate.config.movement, [field]: value }
          }
        }
      };
    });
  },
  updateTeamMember: (index, field, value) => {
    set(state => {
      if (!state.editingTemplate || !state.editingTemplate.config.team) return {};
      const newTeam = [...state.editingTemplate.config.team];
      newTeam[index] = { ...newTeam[index], [field]: value };
      return {
        editingTemplate: {
          ...state.editingTemplate,
          config: { ...state.editingTemplate.config, team: newTeam }
        }
      };
    });
  },
}));
