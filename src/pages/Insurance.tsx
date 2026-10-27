import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  HeartPulse,
  Luggage,
  Clock,
  Globe2,
  CheckCircle2,
  MessageCircle,
  FileCheck,
  AlertCircle,
  ArrowRight,
  Plane,
} from 'lucide-react';
import { PageRoute, InsuranceQuoteRequest } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { openWhatsApp, saveQuoteLocally } from '../utils/whatsapp';

interface InsuranceProps {
  onNavigate: (page: PageRoute) => void;
  onOpenQuoteModal: (service?: string) => void;
}

export const Insurance: React.FC<InsuranceProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState<InsuranceQuoteRequest>({
    name: '',
    phone: '',
    email: '',
    destination: 'Europa / Espaço Schengen',
    departureDate: '',
    returnDate: '',
    travelersCount: 1,
    travelerAges: '',
    additionalNotes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg('Por favor, informe o seu nome.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg('Por favor, informe o seu número de WhatsApp / telefone.');
      return;
    }
    if (!formData.departureDate || !formData.returnDate) {
      setErrorMsg('Por favor, seleccione as datas de partida e de regresso.');
      return;
    }

    const lines = [
      'Olá BOM Samaritano!',
      '',
      'Gostaria de solicitar uma cotação de Seguro de Viagem Internacional.',
      '',
      `Nome: ${formData.name.trim()}`,
      `Telefone: ${formData.phone.trim()}`,
      formData.email ? `E-mail: ${formData.email.trim()}` : '',
      `Destino: ${formData.destination}`,
      `Data de Partida: ${formData.departureDate}`,
      `Data de Regresso: ${formData.returnDate}`,
      `Número de Viajantes: ${formData.travelersCount}`,
      formData.travelerAges ? `Idades: ${formData.travelerAges.trim()}` : '',
      formData.additionalNotes ? `Notas: ${formData.additionalNotes.trim()}` : '',
      '',
      'Podem emitir a simulação com a apólice exigida para o meu destino/visto?',
    ].filter(Boolean);

    saveQuoteLocally({
      type: 'Seguro',
      clientName: formData.name.trim(),
      clientPhone: formData.phone.trim(),
      details: `Seguro para ${formData.destination} | ${formData.departureDate} a ${formData.returnDate} | ${formData.travelersCount} pax`,
    });

    setSubmitted(true);
    setErrorMsg('');

    setTimeout(() => {
      openWhatsApp(lines.join('\n'));
    }, 300);
  };

  return (
    <div className="bg-[#F5F7FB] min-h-screen pb-20">
      {/* Hero Header */}
      <div className="bg-[#11164D] text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80"
            alt="Viajante tranquilo e protegido"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#11164D] via-[#11164D]/90 to-[#11164D]/70" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <Breadcrumbs
            items={[{ label: 'Serviços' }, { label: 'Seguro de Viagem' }]}
            onNavigate={onNavigate}
          />

          <div className="max-w-3xl mt-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F58220]">
              Protecção & Tranquilidade Global
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white mt-2 mb-4 leading-tight">
              SEGURO DE VIAGEM INTERNACIONAL
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-light">
              Viaje protegido contra imprevistos de saúde, cancelamentos e extravio de bagagem em qualquer canto do mundo.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        {/* Schengen Alert Card */}
        <div className="bg-gradient-to-r from-blue-900 to-[#11164D] text-white rounded-3xl p-6 sm:p-8 shadow-md border border-blue-800/40 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
              <Globe2 className="w-6 h-6 text-[#F58220]" />
            </div>
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-[#F58220] block mb-1">
                Requisito Consular Obrigatório
              </span>
              <h3 className="font-display text-lg sm:text-xl font-bold">
                Obrigatório para Vistos Schengen (Europa)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Para viajar ou solicitar visto para qualquer país da União Europeia (Portugal, Espanha, França, etc.), é obrigatório apresentar uma apólice de seguro de viagem com <strong>cobertura médica mínima de 30.000 Euros</strong> com assistência em repatriamento sanitário. A BOM Samaritano emite apólices 100% aprovadas pelos consulados.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setFormData({ ...formData, destination: 'Europa / Espaço Schengen' });
              document.getElementById('insurance-form-anchor')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3 rounded-xl bg-[#F58220] hover:bg-[#E07316] text-white font-bold text-xs shadow-md transition-all shrink-0 cursor-pointer"
          >
            Emitir Seguro Schengen
          </button>
        </div>

        {/* Coberturas Típicas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              icon: HeartPulse,
              title: 'Despesas Médicas & Hospitalares',
              desc: 'Internamentos de urgência, consultas, exames e medicação prescrita no estrangeiro.',
            },
            {
              icon: Luggage,
              title: 'Extravio ou Dano de Bagagem',
              desc: 'Indemnização complementar em caso de perda definitiva ou atraso prolongado das suas malas.',
            },
            {
              icon: Clock,
              title: 'Atraso e Cancelamento de Voos',
              desc: 'Reembolso de despesas essenciais de hotel e alimentação causadas por atrasos das companhias aéreas.',
            },
            {
              icon: ShieldCheck,
              title: 'Repatriamento Sanitário & Funeral',
              desc: 'Transporte aéreo especializado de regresso a Moçambique em caso de emergência médica grave.',
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#F58220] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-base font-bold text-[#11164D] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Form and Details */}
        <div id="insurance-form-anchor" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Quote Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#F58220]">
                  Cotação Instantânea
                </span>
                <h2 className="font-display text-2xl font-bold text-[#11164D]">
                  Pedir Cotação de Seguro
                </h2>
              </div>
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#F58220] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>

            {submitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-emerald-100 text-[#25D366] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-[#11164D] mb-2">
                  Dados do Seguro Organizados!
                </h3>
                <p className="text-slate-600 text-sm mb-6 max-w-md mx-auto leading-relaxed">
                  O consultor de seguros da BOM Samaritano foi notificado pelo WhatsApp e enviará o valor exato da apólice com emissão em minutos.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 rounded-xl bg-[#11164D] text-white font-semibold text-sm hover:bg-[#1A216E] transition-colors"
                >
                  Nova Cotação de Seguro
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Nome Completo do Titular *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Carlos Nhantumbo"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#F58220] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Telefone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ex: 84 / 85 / 86..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#F58220] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Destino da Viagem *
                  </label>
                  <select
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#F58220] focus:outline-none"
                  >
                    <option value="Europa / Espaço Schengen">Europa / Espaço Schengen (30.000 €)</option>
                    <option value="África do Sul / Região SADC">África do Sul / Região SADC</option>
                    <option value="Médio Oriente (Dubai / Turquia)">Médio Oriente (Dubai / Turquia)</option>
                    <option value="América do Norte (EUA / Canadá)">América do Norte (EUA / Canadá)</option>
                    <option value="Ásia / Outros Países">Ásia / Outros Países Mundiais</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Data de Partida *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.departureDate}
                      onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#F58220] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Data de Regresso *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.returnDate}
                      onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#F58220] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Número de Viajantes
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.travelersCount}
                      onChange={(e) =>
                        setFormData({ ...formData, travelersCount: parseInt(e.target.value) || 1 })
                      }
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#F58220] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Idades dos Viajantes
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: 34 anos, 28 anos, 5 anos..."
                      value={formData.travelerAges}
                      onChange={(e) => setFormData({ ...formData, travelerAges: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#F58220] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Finalidade / Notas Adicionais
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Ex: É para pedido de visto no Consulado Geral de Portugal em Maputo..."
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#F58220] focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#F58220] hover:bg-[#E07316] text-white font-extrabold text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5 text-white" />
                    <span>Pedir Cotação de Seguro no WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Why BOM Samaritano Insurance */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-display font-bold text-lg text-[#11164D] mb-3">
                Por Que Emitir o Seu Seguro Connosco?
              </h3>
              <ul className="space-y-3 text-xs text-slate-600">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Emissão Imediata:</strong> Apólice enviada em formato digital PDF pronta para imprimir ou anexar no processo de visto.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Conformidade Consular:</strong> Redacção em língua portuguesa e inglesa, aceite por embaixadas em Maputo.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Assistência 24/7 em Português:</strong> Linha internacional gratuita para atendimento em caso de internamento.</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#11164D] text-white rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#F58220] shrink-0 mt-0.5" />
                <p className="text-xs text-slate-300 leading-relaxed">
                  Os custos de internamento hospitalar no estrangeiro podem atingir dezenas de milhares de dólares. Um seguro de viagem tem um custo reduzido em relação ao valor total da viagem e garante protecção absoluta para si e para os seus familiares.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
