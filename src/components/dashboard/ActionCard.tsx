import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient?: string;
  onClick?: () => void;
}

export const ActionCard: React.FC<ActionCardProps> = ({
  title,
  description,
  icon: Icon,
  gradient = 'bg-gradient-primary',
  onClick
}) => {
  return (
    <div className="action-card group" onClick={onClick}>
      <div className={cn(
        'p-3 rounded-xl mb-3 group-hover:scale-110 transition-transform duration-300',
        gradient
      )}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      
      <h4 className="font-semibold text-white mb-1 group-hover:text-primary-400 transition-colors">
        {title}
      </h4>
      <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
        {description}
      </p>
    </div>
  );
};
