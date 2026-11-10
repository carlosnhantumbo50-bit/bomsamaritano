import React, { useState } from 'react';
import { MessageCircle, X, PhoneCall, Sparkles } from 'lucide-react';
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
        <div className="relative bg-white text-slate-800 rounded-2xl shadow-2xl border border-emerald-100 p-4 max-w-[280px] sm:max-w-[300px] text-xs animate-in fade-in slide-in-from-bottom-2 duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="absolute top-2.5 right-2.5 text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 transition-colors"
            aria-label="Fechar dica"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          {/* Online status indicator */}
          <div className="flex items-center justify-between pr-5 mb-2">
            <div className="font-bold text-[#11164D] text-xs flex items-center gap-1.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span>Consultores Online</span>
            </div>
            <span className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
              Resposta Rápida
            </span>
          </div>

          <p className="text-slate-600 leading-snug mb-3">
            Precisa de cotação de voos, vistos ou hotéis? Atendimento personalizado em tempo real:
          </p>

          {/* Primary WhatsApp Action */}
          <button
            onClick={handleClick}
            className="w-full py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-3.5 h-3.5 fill-white text-transparent" />
              </div>
              <div className="text-left">
                <div className="text-[10px] text-emerald-100 font-extrabold uppercase">WhatsApp Oficial</div>
                <div className="font-extrabold text-white">{COMPANY_DETAILS.whatsAppFormatted}</div>
              </div>
            </div>
            <span className="text-[10px] bg-white text-emerald-800 font-extrabold px-2 py-0.5 rounded-lg group-hover:scale-105 transition-transform">
              Conversar
            </span>
          </button>

          {/* Secondary Voice Call option for immediate phone inquiries */}
          <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1 text-slate-600 font-medium">
              <PhoneCall className="w-3 h-3 text-sky-500" />
              Linha de Voz:
            </span>
            <a
              href={`tel:${COMPANY_DETAILS.phoneCallsRaw}`}
              className="font-bold text-[#11164D] hover:text-[#F58220] transition-colors"
            >
              {COMPANY_DETAILS.phoneCallsFormatted}
            </a>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        id="floating-whatsapp-btn"
        onClick={handleClick}
        className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-300 cursor-pointer"
        aria-label="Falar no WhatsApp com a BOM Samaritano"
        title={`Falar no WhatsApp (${COMPANY_DETAILS.whatsAppFormatted})`}
      >
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-pulse group-hover:opacity-50" />
        
        {/* Pulsing indicator beacon */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-white border-2 border-[#25D366] rounded-full z-20 flex items-center justify-center">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
        </span>

        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 fill-white text-transparent relative z-10" />
      </button>
    </div>
  );
};
