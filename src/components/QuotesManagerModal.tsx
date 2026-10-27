import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Trash2, Clock, CheckCircle, RefreshCw, FileText, User, Phone, FileSpreadsheet } from 'lucide-react';
import { StoredQuote } from '../types';
import { getStoredQuotes, deleteStoredQuote, updateStoredQuoteStatus, openWhatsApp } from '../utils/whatsapp';

interface QuotesManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNewQuote: () => void;
}

export const QuotesManagerModal: React.FC<QuotesManagerModalProps> = ({
  isOpen,
  onClose,
  onNewQuote,
}) => {
  const [quotes, setQuotes] = useState<StoredQuote[]>([]);

  const loadQuotes = () => {
    const list = getStoredQuotes();
    setQuotes(list);
  };

  useEffect(() => {
    if (isOpen) {
      loadQuotes();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteStoredQuote(id);
    loadQuotes();
  };

  const handleStatusChange = (id: string, newStatus: StoredQuote['status'], e: React.MouseEvent) => {
    e.stopPropagation();
    updateStoredQuoteStatus(id, newStatus);
    loadQuotes();
  };

  const handleResendWhatsApp = (quote: StoredQuote) => {
    const msg = [
      'Olá BOM Samaritano!',
      '',
      `Acompanhamento do Pedido de Cotação ${quote.id}:`,
      `Cliente: ${quote.clientName}`,
      `Contacto: ${quote.clientPhone}`,
      `Serviço: ${quote.type}`,
      quote.details ? `Detalhes: ${quote.details}` : '',
      '',
      'Podem confirmar o estado desta cotação?',
    ]
      .filter(Boolean)
      .join('\n');

    openWhatsApp(msg);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="bg-[#11164D] p-5 sm:p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F58220] flex items-center justify-center text-white">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold">Painel de Pedidos & Cotações</h2>
              <p className="text-xs text-slate-300">Histórico de solicitações geradas nesta sessão</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {quotes.length === 0 ? (
            <div className="text-center py-12 px-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
                <FileSpreadsheet className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-800 mb-1">Nenhum pedido registado ainda</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
                Todas as cotações solicitadas pelo formulário ou modal de atendimento ficam guardadas aqui para fácil acompanhamento.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onNewQuote();
                }}
                className="px-5 py-2.5 rounded-xl bg-[#F58220] text-white text-xs font-bold hover:bg-[#d96f14] transition-all shadow-md inline-flex items-center gap-2"
              >
                Solicitar Nova Cotação
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                <span>{quotes.length} {quotes.length === 1 ? 'pedido guardado' : 'pedidos guardados'}</span>
                <button
                  onClick={loadQuotes}
                  className="flex items-center gap-1 text-slate-600 hover:text-[#F58220] transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Actualizar</span>
                </button>
              </div>

              {quotes.map((quote) => (
                <div
                  key={quote.id}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#11164D] bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs">
                        {quote.id}
                      </span>
                      <span className="text-xs font-semibold bg-orange-100/80 text-[#F58220] px-2.5 py-0.5 rounded-full">
                        {quote.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{quote.timestamp}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="font-medium text-slate-800">{quote.clientName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{quote.clientPhone}</span>
                    </div>
                    {quote.details && (
                      <div className="col-span-1 sm:col-span-2 text-slate-600 text-[11px] pt-1 border-t border-slate-100">
                        {quote.details}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-1 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-500">Estado:</span>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                        quote.status === 'Novo'
                          ? 'bg-blue-100 text-blue-700'
                          : quote.status === 'Em Atendimento'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {quote.status}
                      </span>
                      {quote.status !== 'Concluído' && (
                        <button
                          onClick={(e) => handleStatusChange(quote.id, 'Concluído', e)}
                          className="text-[11px] text-emerald-600 hover:text-emerald-700 font-medium underline flex items-center gap-1"
                        >
                          <CheckCircle className="w-3 h-3" />
                          Marcar como concluído
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-2 ml-auto">
                      <button
                        onClick={() => handleResendWhatsApp(quote)}
                        className="px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Reenviar WhatsApp</span>
                      </button>

                      <button
                        onClick={(e) => handleDelete(quote.id, e)}
                        className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-rose-100 hover:text-rose-600 text-slate-500 flex items-center justify-center transition-colors"
                        title="Eliminar registo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>BOM Samaritano • Maputo, Moçambique</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
