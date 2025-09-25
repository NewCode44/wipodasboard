import React from 'react';
import { Modal } from '../common/Modal';
import { useDashboardStore } from '../../store/dashboardStore';
import { Save, Calendar, Users } from 'lucide-react';

interface CampaignModalProps {
  isOpen: boolean;
}

export const CampaignModal: React.FC<CampaignModalProps> = ({ isOpen }) => {
  const { closeModal } = useDashboardStore();

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title="Crear Nueva Campaña">
      <form onSubmit={(e) => { e.preventDefault(); closeModal(); }}>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nombre de la Campaña
            </label>
            <input
              type="text"
              placeholder="Ej: Elecciones Municipales 2025"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Descripción
            </label>
            <textarea
              rows={3}
              placeholder="Describe el objetivo principal de la campaña..."
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-500 resize-none focus:outline-none focus:border-primary-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Fecha de Inicio
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-3 py-2 text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Fecha de Fin
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-3 py-2 text-white"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Objetivo de Votantes
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                placeholder="5000"
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
              />
            </div>
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
              <span>Guardar Campaña</span>
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
