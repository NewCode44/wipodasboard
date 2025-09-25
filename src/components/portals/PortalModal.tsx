import React from 'react';
import { Modal } from '../common/Modal';
import { useDashboardStore } from '../../store/dashboardStore';
import { Save, Globe } from 'lucide-react';

interface PortalModalProps {
  isOpen: boolean;
}

export const PortalModal: React.FC<PortalModalProps> = ({ isOpen }) => {
  const { closeModal } = useDashboardStore();

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title="Crear Nuevo Portal">
      <form onSubmit={(e) => { e.preventDefault(); closeModal(); }}>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nombre del Portal
            </label>
            <input
              type="text"
              placeholder="Ej: Portal de Bienvenida"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tipo de Portal
            </label>
            <select
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary-500"
            >
              <option>Reconocimiento</option>
              <option>Propuestas</option>
              <option>Trayectoria</option>
              <option>Cuenta Regresiva</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Contenido Principal
            </label>
            <textarea
              rows={3}
              placeholder="Mensaje principal que verán los usuarios al conectarse..."
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-500 resize-none focus:outline-none focus:border-primary-500"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-white/10">
            <button
              type="button"
              onClick={closeModal}
              className="glass-button px-6 py-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="glass-button bg-gradient-primary px-6 py-2 flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Portal</span>
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
