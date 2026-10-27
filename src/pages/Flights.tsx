import React, { useState } from 'react';
import {
  Plane,
  Calendar,
  Users,
  MapPin,
  MessageCircle,
  Clock,
  ShieldCheck,
  Luggage,
  CheckCircle2,
  ArrowRightLeft,
  ArrowRight,
  Info,
  Sparkles,
  Zap,
} from 'lucide-react';
import { PageRoute, FlightQuoteRequest } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { openWhatsApp, saveQuoteLocally } from '../utils/whatsapp';
import { FlightBookingEngine } from '../components/FlightBookingEngine';

interface FlightsProps {
  onNavigate: (page: PageRoute) => void;
  onOpenQuoteModal: (service?: string) => void;
}

export const Flights: React.FC<FlightsProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'realtime' | 'consultancy'>('realtime');
  const [formData, setFormData] = useState<FlightQuoteRequest>({
    name: '',
    phone: '',
    email: '',
    tripType: 'ida-e-volta',
    origin: 'Maputo (MPM)',
    destination: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    cabinClass: 'Económica',
    additionalMessage: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg('Por favor, introduza o seu nome completo.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg('Por favor, introduza o seu número de telefone ou WhatsApp.');
      return;
    }
    if (!formData.destination.trim()) {
      setErrorMsg('Por favor, indique a cidade ou país de destino.');
      return;
    }
    if (!formData.departureDate) {
      setErrorMsg('Por favor, seleccione a data pretendida de ida.');
      return;
    }

    const typeLabel =
      formData.tripType === 'ida-e-volta'
        ? 'Ida e Volta'
        : formData.tripType === 'so-ida'
        ? 'Apenas Ida'
        : 'Multi-destinos';

    // Build the clean WhatsApp message
    const lines = [
      'Olá BOM Samaritano!',
      '',
      'Gostaria de solicitar uma cotação de Passagem Aérea.',
      '',
      `Nome: ${formData.name.trim()}`,
      `Telefone: ${formData.phone.trim()}`,
      formData.email ? `E-mail: ${formData.email.trim()}` : '',
      `Tipo de Viagem: ${typeLabel}`,
      `Origem: ${formData.origin.trim()}`,
      `Destino: ${formData.destination.trim()}`,
      `Data de Ida: ${formData.departureDate}`,
      formData.tripType === 'ida-e-volta' && formData.returnDate ? `Data de Regresso: ${formData.returnDate}` : '',
      `Passageiros: ${formData.passengers}`,
      `Classe: ${formData.cabinClass}`,
      formData.additionalMessage ? `Mensagem adicional: ${formData.additionalMessage.trim()}` : '',
      '',
      'Podem ajudar-me com as opções e disponibilidade?',
    ].filter(Boolean);

    const messageText = lines.join('\n');

    // Register locally
    saveQuoteLocally({
      type: 'Voo',
      clientName: formData.name.trim(),
      clientPhone: formData.phone.trim(),
      details: `${formData.origin} -> ${formData.destination} | ${typeLabel} | Ida: ${formData.departureDate} | Pax: ${formData.passengers} | Classe: ${formData.cabinClass}`,
    });

    setSubmitted(true);
    setErrorMsg('');

    setTimeout(() => {
      openWhatsApp(messageText);
    }, 300);
  };

  const domesticDestinations = [
    { city: 'Beira', code: 'BEW', desc: 'Conexão diária regular' },
    { city: 'Nampula', code: 'APL', desc: 'Pólo económico do Norte' },
    { city: 'Pemba', code: 'POL', desc: 'Turismo costeiro e negócios' },
    { city: 'Tete', code: 'TET', desc: 'Sector mineiro e energia' },
    { city: 'Vilankulo', code: 'VNX', desc: 'Arquipélago de Bazaruto' },
    { city: 'Quelimane', code: 'UEL', desc: 'Zambézia' },
  ];

  const internationalDestinations = [
    { city: 'Lisboa', country: 'Portugal', airlines: 'TAP / LAM' },
    { city: 'Istambul', country: 'Turquia', airlines: 'Turkish Airlines' },
    { city: 'Dubai', country: 'Emirados Árabes', airlines: 'Emirates' },
    { city: 'Joanesburgo', country: 'África do Sul', airlines: 'Airlink / SAA' },
    { city: 'Doha', country: 'Qatar', airlines: 'Qatar Airways' },
    { city: 'Adis Abeba', country: 'Etiópia', airlines: 'Ethiopian Airlines' },
  ];

  return (
    <div className="bg-[#F5F7FB] min-h-screen pb-20">
      {/* Hero Header */}
      <div className="bg-[#11164D] text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80"
            alt="Avião no céu"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#11164D] via-[#11164D]/90 to-[#11164D]/70" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <Breadcrumbs
            items={[{ label: 'Serviços' }, { label: 'Passagens Aéreas' }]}
            onNavigate={onNavigate}
          />

          <div className="max-w-3xl mt-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F58220]">
              Emissão & Reserva de Voos
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white mt-2 mb-4 leading-tight">
              PASSAGENS AÉREAS NACIONAIS E INTERNACIONAIS
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-light">
              Encontre soluções de viagem adequadas ao seu destino, datas e necessidades.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 relative z-20 space-y-6">
        {/* Mode Selector Tabs */}
        <div className="bg-white p-2 rounded-3xl shadow-lg border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setActiveTab('realtime')}
              className={`flex-1 sm:flex-none px-5 sm:px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'realtime'
                  ? 'bg-[#11164D] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Zap className="w-4 h-4 text-[#F58220]" />
              <span>Reserva Online em Tempo Real (GDS / Amadeus)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('consultancy')}
              className={`flex-1 sm:flex-none px-5 sm:px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'consultancy'
                  ? 'bg-[#11164D] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <MessageCircle className="w-4 h-4 text-emerald-500" />
              <span>Cotação Sob Medida & WhatsApp</span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 pr-4">
            <ShieldCheck className="w-4 h-4 text-[#F58220]" />
            <span>Bilhetes Emitidos com Código PNR Oficial</span>
          </div>
        </div>

        {activeTab === 'realtime' ? (
          <FlightBookingEngine />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#F58220]">
                  Cotação Oficial
                </span>
                <h2 className="font-display text-2xl font-bold text-[#11164D]">
                  Solicitar Cotação de Voo
                </h2>
              </div>
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#F58220] flex items-center justify-center">
                <Plane className="w-5 h-5" />
              </div>
            </div>

            {submitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-emerald-100 text-[#25D366] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-[#11164D] mb-2">
                  Pedido de Cotação Preparado!
                </h3>
                <p className="text-slate-600 text-sm mb-6 max-w-md mx-auto leading-relaxed">
                  Os detalhes do seu voo foram organizados e a conversa no WhatsApp foi aberta para os nossos consultores em Maputo confirmarem os melhores horários e tarifas para si.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        tripType: 'ida-e-volta',
                        origin: 'Maputo (MPM)',
                        destination: '',
                        departureDate: '',
                        returnDate: '',
                        passengers: 1,
                        cabinClass: 'Económica',
                        additionalMessage: '',
                      });
                    }}
                    className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-colors"
                  >
                    Fazer Novo Pedido
                  </button>
                  <button
                    onClick={() => onNavigate('contact')}
                    className="px-6 py-3 rounded-xl bg-[#11164D] hover:bg-[#1A216E] text-white font-semibold text-sm transition-colors"
                  >
                    Ver Contactos da Agência
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium">
                    {errorMsg}
                  </div>
                )}

                {/* Trip Type Selector */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                    Tipo de Viagem *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'ida-e-volta', label: 'Ida e Volta' },
                      { id: 'so-ida', label: 'Só Ida' },
                      { id: 'multi-destinos', label: 'Multi-destinos' },
                    ].map((t) => (
                      <button
                        type="button"
                        key={t.id}
                        onClick={() =>
                          setFormData({ ...formData, tripType: t.id as FlightQuoteRequest['tripType'] })
                        }
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                          formData.tripType === t.id
                            ? 'bg-[#11164D] text-white shadow'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name, Phone, Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Carlos Nhantumbo"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F58220]"
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
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F58220]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    E-mail (Opcional)
                  </label>
                  <input
                    type="email"
                    placeholder="exemplo@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F58220]"
                  />
                </div>

                {/* Origin & Destination */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Origem *
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="Ex: Maputo (MPM)"
                        value={formData.origin}
                        onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F58220]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Destino *
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-[#F58220] absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="Ex: Lisboa, Istambul, Beira..."
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F58220]"
                      />
                    </div>
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Data de Ida *
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="date"
                        required
                        value={formData.departureDate}
                        onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F58220]"
                      />
                    </div>
                  </div>

                  {formData.tripType === 'ida-e-volta' && (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Data de Regresso
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="date"
                          value={formData.returnDate}
                          onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                          className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F58220]"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Passengers & Cabin Class */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Número de Passageiros
                    </label>
                    <div className="relative">
                      <Users className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={formData.passengers}
                        onChange={(e) =>
                          setFormData({ ...formData, passengers: parseInt(e.target.value) || 1 })
                        }
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F58220]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Classe de Cabine
                    </label>
                    <select
                      value={formData.cabinClass}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          cabinClass: e.target.value as FlightQuoteRequest['cabinClass'],
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F58220]"
                    >
                      <option value="Económica">Classe Económica</option>
                      <option value="Executiva">Classe Executiva (Business)</option>
                      <option value="Primeira">Primeira Classe (First)</option>
                    </select>
                  </div>
                </div>

                {/* Additional Message */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Mensagem Adicional / Preferências
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Ex: Preferência por voo nocturno, bagagem extra, escala curta..."
                    value={formData.additionalMessage}
                    onChange={(e) => setFormData({ ...formData, additionalMessage: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F58220]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    id="flights-submit-whatsapp-btn"
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#F58220] hover:bg-[#E07316] text-white font-extrabold text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5 text-white" />
                    <span>Solicitar Cotação no WhatsApp</span>
                  </button>
                  <p className="text-[11px] text-slate-400 text-center mt-2">
                    A sua solicitação será enviada formatada directamente para o WhatsApp da BOM Samaritano (+258 852 808 080).
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Information & Transparency Notice */}
          <div className="lg:col-span-5 space-y-6">
            {/* Note on Real Pricing */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-amber-900">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-[#F58220] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-[#11164D]">Transparência e Tarifas</h4>
                  <p className="text-xs text-amber-800 leading-relaxed mt-1">
                    As tarifas aéreas sofrem variações em tempo real de acordo com a disponibilidade das companhias e época do ano. A nossa equipa consulta os sistemas autorizados e apresenta-lhe sempre as cotações mais competitivas para as suas datas.
                  </p>
                </div>
              </div>
            </div>

            {/* Domestic Flights Box */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center gap-2 text-[#11164D] font-bold text-base mb-3">
                <Plane className="w-4 h-4 text-[#F58220]" />
                <span>Voos Domésticos em Moçambique</span>
              </div>
              <p className="text-xs text-slate-600 mb-4">
                Emissão de bilhetes para as principais cidades moçambicanas com saídas frequentes de Maputo:
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {domesticDestinations.map((dest) => (
                  <div
                    key={dest.code}
                    onClick={() => setFormData({ ...formData, destination: `${dest.city} (${dest.code})` })}
                    className="p-2 rounded-lg bg-slate-50 border border-slate-100 hover:border-orange-300 cursor-pointer transition-colors"
                  >
                    <div className="font-bold text-slate-800">{dest.city}</div>
                    <div className="text-[10px] text-slate-400">{dest.code} • {dest.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* International Routes Box */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center gap-2 text-[#11164D] font-bold text-base mb-3">
                <ArrowRightLeft className="w-4 h-4 text-[#F58220]" />
                <span>Rotas Internacionais Populares</span>
              </div>
              <div className="space-y-2 text-xs">
                {internationalDestinations.map((route, i) => (
                  <div
                    key={i}
                    onClick={() => setFormData({ ...formData, destination: `${route.city}, ${route.country}` })}
                    className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 hover:border-orange-300 cursor-pointer transition-colors flex items-center justify-between"
                  >
                    <div>
                      <span className="font-bold text-slate-800">{route.city}</span>
                      <span className="text-slate-500 text-[11px]"> ({route.country})</span>
                    </div>
                    <span className="text-[10px] font-semibold text-[#F58220] bg-orange-50 px-2 py-0.5 rounded-md">
                      {route.airlines}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Advantages */}
            <div className="bg-[#11164D] text-white rounded-2xl p-6">
              <h4 className="font-display font-bold text-base mb-3 text-[#F58220]">
                Vantagens de Emitir com a BOM Samaritano
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Luggage className="w-4 h-4 text-[#F58220]" />
                  <span>Assistência com franquia de bagagem e excessos</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#F58220]" />
                  <span>Suporte prioritário em caso de atrasos ou remarcações</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Conferência de regras de trânsito em aeroportos de conexão</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};
