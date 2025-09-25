import React from 'react';
import { TeamMember } from '../../store/dashboardStore';
import { ImageUploadInput } from './ImageUploadInput';

interface TeamMemberEditorProps {
  index: number;
  member: TeamMember;
  onUpdate: (index: number, field: keyof Omit<TeamMember, 'id'>, value: string) => void;
}

export const TeamMemberEditor: React.FC<TeamMemberEditorProps> = ({ index, member, onUpdate }) => {
  return (
    <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-3">
      <h5 className="text-sm font-semibold text-white">Miembro del Equipo #{index + 1}</h5>
      <div className="grid grid-cols-2 gap-2">
        <input
          type="text"
          value={member.name}
          onChange={(e) => onUpdate(index, 'name', e.target.value)}
          placeholder="Nombre"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-portal-teamBlue text-sm"
        />
        <input
          type="text"
          value={member.role}
          onChange={(e) => onUpdate(index, 'role', e.target.value)}
          placeholder="Rol"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-portal-teamBlue text-sm"
        />
      </div>
      <ImageUploadInput
        label="Foto del Miembro"
        value={member.image}
        onChange={(url) => onUpdate(index, 'image', url)}
      />
    </div>
  );
};
