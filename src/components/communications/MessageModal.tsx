import React from 'react';
import { Modal } from '../common/Modal';
import { useDashboardStore } from '../../store/dashboardStore';
import { Save, Send, Users } from 'lucide-react';

interface MessageModalProps {
  isOpen: boolean;
}

export const MessageModal: React.FC<MessageModalProps> = ({ isOpen }) => {
  const { closeModal } = useDashboardStore();

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title="Crear Nuevo Mensaje">
      <form onSubmit={(e) => { e.preventDefault(); closeModal(); }}>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Título del Mensaje
            </label>
            <input
              type="text"
              placeholder="Ej: Recordatorio de votación"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Canal de Comunicación
            </label>
            <select
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary-500"
            >
              <option>SMS</option>
              <option>Email</option>
              <option>Push Notification</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Audiencia
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Ej: Votantes Zona Centro"
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Contenido del Mensaje
            </label>
            <textarea
              rows={4}
              placeholder="Escribe aquí tu mensaje..."
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-500 resize-none focus:outline-none focus:border-primary-500"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-white/10">
            <button
              type="button"
              onClick={closeModal}
              className="glass-button px-6 py-2"
            >
              Guardar Borrador
            </button>
            <button
              type="submit"
              className="glass-button bg-gradient-primary px-6 py-2 flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Enviar Mensaje</span>
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
