import React, { useState } from 'react';
import { X, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { openWhatsApp, saveQuoteLocally } from '../utils/whatsapp';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  initialService = 'Passagens Aéreas',
}) => {
  const [service, setService] = useState(initialService);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [destination, setDestination] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [passengers, setPassengers] = useState('1');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Por favor, introduza o seu nome completo.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Por favor, introduza o seu contacto de telefone ou WhatsApp.');
      return;
    }

    // Build the requested WhatsApp message format:
    const lines = [
      'Olá BOM Samaritano!',
      '',
      'Gostaria de solicitar uma cotação.',
      '',
      `Nome: ${name.trim()}`,
      `Telefone: ${phone.trim()}`,
      `Serviço: ${service}`,
      destination.trim() ? `Destino: ${destination.trim()}` : '',
      travelDate.trim() ? `Data pretendida: ${travelDate.trim()}` : '',
      passengers ? `Passageiros / Pessoas: ${passengers}` : '',
      additionalNotes.trim() ? `Mensagem adicional: ${additionalNotes.trim()}` : '',
      '',
      'Podem ajudar-me?',
    ].filter((line) => line !== '');

    const finalMessage = lines.join('\n');

    // Save locally
    saveQuoteLocally({
      type:
        service.includes('Passagem') ? 'Voo' :
        service.includes('Visto') ? 'Visto' :
        service.includes('Pacote') ? 'Pacote' :
        service.includes('Hotel') ? 'Hotel' :
        service.includes('Viatura') ? 'Viatura' :
        service.includes('Seguro') ? 'Seguro' : 'Contacto',
      clientName: name.trim(),
      clientPhone: phone.trim(),
      details: `Serviço: ${service} | Destino: ${destination || 'A indicar'} | Data: ${travelDate || 'A definir'} | Pax: ${passengers}`,
    });

    setSubmitted(true);
    setErrorMsg('');

    // Open WhatsApp
    setTimeout(() => {
      openWhatsApp(finalMessage);
    }, 400);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#11164D] text-white p-5 flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#F58220] font-bold">
              BOM Samaritano • Atendimento Rápido
            </span>
            <h3 className="font-display text-xl font-bold text-white">
              Pedir Cotação de Viagem
            </h3>
          </div>
          <button
            onClick={handleResetAndClose}
            className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Fechar janela"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-100 text-[#25D366] rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-[#11164D] mb-2">
                Pedido Enviado para o WhatsApp!
              </h4>
              <p className="text-slate-600 text-sm mb-6 max-w-sm mx-auto leading-relaxed">
                Abrimos a conversa com a nossa equipa da BOM Samaritano no WhatsApp. Caso a janela não tenha aberto automaticamente, clique no botão abaixo.
              </p>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    const msg = `Olá BOM Samaritano! Solicitei uma cotação para ${name.trim()} (${service}).`;
                    openWhatsApp(msg);
                  }}
                  className="w-full py-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Abrir WhatsApp Novamente</span>
                </button>
                <button
                  onClick={handleResetAndClose}
                  className="w-full py-2.5 text-slate-500 hover:text-slate-800 text-sm font-semibold transition-colors"
                >
                  Fechar janela
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                  {errorMsg}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Serviço Pretendido *
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F58220] focus:border-transparent font-medium"
                >
                  <option value="Passagens Aéreas">Passagens Aéreas (Nacionais / Internacionais)</option>
                  <option value="Vistos e Documentação">Vistos e Documentação Consular</option>
                  <option value="Pacotes Turísticos">Pacotes Turísticos & Roteiros</option>
                  <option value="Reservas de Hotéis">Reservas de Hotéis e Alojamento</option>
                  <option value="Aluguer de Viaturas">Aluguer de Viaturas (Rent-a-Car)</option>
                  <option value="Seguros de Viagem">Seguros de Viagem Internacional</option>
                  <option value="Consultoria Geral">Consultoria de Viagens Geral</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    O Seu Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Carlos Nhantumbo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F58220]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Telemóvel / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Ex: 84 / 85 / 86..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F58220]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Destino Desejado
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Lisboa, Dubai, Turquia, Beira..."
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F58220]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Data Pretendida
                  </label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F58220]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Número de Pessoas / Passageiros
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F58220]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Detalhes ou Preferências
                </label>
                <textarea
                  rows={2}
                  placeholder="Ex: Classe económica, ida e volta, hotel com pequeno-almoço..."
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F58220]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#F58220] hover:bg-[#E07316] text-white font-bold text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                  <span>Enviar Pedido para o WhatsApp</span>
                </button>
                <p className="text-[11px] text-slate-400 text-center mt-2">
                  Ao submeter, será direccionado para o WhatsApp oficial da BOM Samaritano (+258 852 808 080) com a mensagem formatada.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
