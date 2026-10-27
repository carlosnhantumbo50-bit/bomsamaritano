import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { PageRoute } from '../types';

interface BreadcrumbsProps {
  items: { label: string; route?: PageRoute }[];
  onNavigate: (page: PageRoute) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate }) => {
  return (
    <nav className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 py-3 overflow-x-auto whitespace-nowrap">
      <button
        onClick={() => onNavigate('home')}
        className="flex items-center gap-1 hover:text-[#F58220] transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Início</span>
      </button>

      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <div key={idx} className="flex items-center gap-1.5">
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            {isLast || !item.route ? (
              <span className="font-semibold text-[#11164D]">{item.label}</span>
            ) : (
              <button
                onClick={() => item.route && onNavigate(item.route)}
                className="hover:text-[#F58220] transition-colors"
              >
                {item.label}
              </button>
            )}
          </div>
        );
      })}
    </nav>
  );
};
