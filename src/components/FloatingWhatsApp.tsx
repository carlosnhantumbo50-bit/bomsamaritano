import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { openWhatsApp } from '../utils/whatsapp';
import { COMPANY_DETAILS } from '../data/travelData';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const defaultMessage =
    'Olá BOM Samaritano! Gostaria de obter informações sobre os serviços de viagens.';

  const handleClick = () => {
    openWhatsApp(defaultMessage);
  };

  return (
    <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 flex items-end flex-col gap-2">
      {/* Tooltip on Desktop & Mobile */}
      {showTooltip && (
        <div className="relative bg-white text-slate-800 rounded-2xl shadow-xl border border-slate-100 p-3 max-w-[260px] text-xs animate-in fade-in slide-in-from-bottom-2 duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 p-0.5"
            aria-label="Fechar dica"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="font-bold text-[#11164D] text-sm flex items-center gap-1.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Consultores Online</span>
          </div>
          <p className="text-slate-600 leading-snug">
            Precisa de ajuda com a sua viagem ou visto? Fale connosco no WhatsApp!
          </p>
          <div className="mt-2 text-[11px] font-semibold text-[#25D366] flex items-center gap-1">
            <span>{COMPANY_DETAILS.whatsApp}</span>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        id="floating-whatsapp-btn"
        onClick={handleClick}
        className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-300 cursor-pointer"
        aria-label="Falar no WhatsApp com a BOM Samaritano"
        title="Falar no WhatsApp (258 852 808 080)"
      >
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-pulse group-hover:opacity-50" />
        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 fill-white text-transparent relative z-10" />
      </button>
    </div>
  );
};
