import React from 'react';
import { LucideIcon } from 'lucide-react';
import { formatNumber, formatPercentage } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: number;
  change?: number;
  icon: LucideIcon;
  format?: 'number' | 'percentage' | 'currency';
  gradient?: string;
  description?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  format = 'number',
  gradient = 'bg-gradient-primary',
  description
}) => {
  const formatValue = (val: number) => {
    switch (format) {
      case 'percentage':
        return `${val}%`;
      case 'currency':
        return `€${formatNumber(val)}`;
      default:
        return formatNumber(val);
    }
  };

  const changeColor = change && change > 0 ? 'text-green-400' : 'text-red-400';
  const changeIcon = change && change > 0 ? '📈' : '📉';

  return (
    <div className="stat-card group">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <div className="flex items-baseline space-x-2 mt-1">
            <h3 className="text-2xl font-bold text-white">
              {formatValue(value)}
            </h3>
            {change !== undefined && (
              <span className={cn('text-sm font-medium flex items-center space-x-1', changeColor)}>
                <span>{formatPercentage(change)}</span>
                <span>{changeIcon}</span>
              </span>
            )}
          </div>
          {description && (
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          )}
        </div>
        
        <div className={cn(
          'p-3 rounded-xl group-hover:scale-110 transition-transform duration-300',
          gradient
        )}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Mini chart placeholder */}
      <div className="h-16 flex items-end space-x-1">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 bg-gradient-to-t from-primary-500/20 to-primary-500/5 rounded-t"
            style={{
              height: `${Math.random() * 100}%`,
              minHeight: '20%'
            }}
          />
        ))}
      </div>
    </div>
  );
};
