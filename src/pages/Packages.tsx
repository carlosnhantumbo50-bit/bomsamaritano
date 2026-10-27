import React, { useState } from 'react';
import {
  Palmtree,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  MessageCircle,
  SlidersHorizontal,
  X,
  ArrowRight,
  Info,
  Sparkles,
} from 'lucide-react';
import { PageRoute, TourPackage } from '../types';
import { TOUR_PACKAGES } from '../data/travelData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { openWhatsApp, saveQuoteLocally } from '../utils/whatsapp';

interface PackagesProps {
  onNavigate: (page: PageRoute) => void;
  onOpenQuoteModal: (service?: string) => void;
}

export const Packages: React.FC<PackagesProps> = ({ onNavigate, onOpenQuoteModal }) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('todos');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [activePackageModal, setActivePackageModal] = useState<TourPackage | null>(null);

  // Custom Trip Builder modal state
  const [showCustomTripModal, setShowCustomTripModal] = useState(false);
  const [customDestination, setCustomDestination] = useState('');
  const [customDuration, setCustomDuration] = useState('7 dias');
  const [customType, setCustomType] = useState('Férias Familiares');
  const [customPax, setCustomPax] = useState('2');
  const [customBudget, setCustomBudget] = useState('A definir / Cotação');
  const [customNotes, setCustomNotes] = useState('');
  const [customClientName, setCustomClientName] = useState('');
  const [customClientPhone, setCustomClientPhone] = useState('');

  const filteredPackages = TOUR_PACKAGES.filter((pkg) => {
    if (selectedRegion !== 'todos' && pkg.region !== selectedRegion) return false;
    if (selectedCategory !== 'todos' && pkg.category !== selectedCategory) return false;
    return true;
  });

  const handleRequestPackageQuote = (pkg: TourPackage) => {
    const lines = [
      'Olá BOM Samaritano!',
      '',
      'Gostaria de solicitar uma cotação para o pacote turístico:',
      `Pacote: ${pkg.name}`,
      `Destino: ${pkg.destination} (${pkg.country})`,
      `Duração de Referência: ${pkg.duration}`,
      '',
      'Gostaria de saber opções de datas, passagens e orçamento personalizado.',
      'Podem ajudar-me?',
    ];

    saveQuoteLocally({
      type: 'Pacote',
      clientName: 'Cliente Interessado',
      clientPhone: 'Via WhatsApp',
      details: `Pacote: ${pkg.name} | Destino: ${pkg.destination} | Região: ${pkg.region}`,
    });

    openWhatsApp(lines.join('\n'));
  };

  const handleCustomTripSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customDestination.trim()) return;

    const lines = [
      'Olá BOM Samaritano!',
      '',
      'Gostaria de personalizar uma viagem sob medida.',
      '',
      customClientName ? `Nome: ${customClientName.trim()}` : '',
      customClientPhone ? `Telefone: ${customClientPhone.trim()}` : '',
      `Destino Pretendido: ${customDestination.trim()}`,
      `Tipo de Viagem: ${customType}`,
      `Duração Pretendida: ${customDuration}`,
      `Passageiros / Viajantes: ${customPax}`,
      `Expectativa de Orçamento: ${customBudget}`,
      customNotes ? `Notas / Pedidos especiais: ${customNotes.trim()}` : '',
      '',
      'Podem preparar um roteiro e cotação personalizada para mim?',
    ].filter(Boolean);

    saveQuoteLocally({
      type: 'Pacote',
      clientName: customClientName.trim() || 'Cliente Personalizado',
      clientPhone: customClientPhone.trim() || 'Via WhatsApp',
      details: `Viagem Sob Medida: ${customDestination} | Tipo: ${customType} | Pax: ${customPax}`,
    });

    setShowCustomTripModal(false);
    openWhatsApp(lines.join('\n'));
  };

  return (
    <div className="bg-[#F5F7FB] min-h-screen pb-20">
      {/* Hero Header */}
      <div className="bg-[#11164D] text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80"
            alt="Praia tropical e turismo"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#11164D] via-[#11164D]/90 to-[#11164D]/70" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <Breadcrumbs
            items={[{ label: 'Serviços' }, { label: 'Pacotes Turísticos' }]}
            onNavigate={onNavigate}
          />

          <div className="max-w-3xl mt-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F58220]">
              Roteiros & Experiências Inesquecíveis
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white mt-2 mb-4 leading-tight">
              PACOTES TURÍSTICOS
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-light">
              Descubra destinos incríveis e planeie viagens inesquecíveis com assistência do início ao fim.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowCustomTripModal(true)}
              className="px-6 py-3.5 rounded-xl bg-[#F58220] hover:bg-[#E07316] text-white font-extrabold text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Personalizar a Minha Viagem</span>
            </button>
            <button
              onClick={() => onOpenQuoteModal('Pacotes Turísticos')}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-sm transition-all"
            >
              Pedir Cotação Rápida
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        {/* Transparency Disclaimer */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-100 mb-8 flex items-start gap-3">
          <Info className="w-5 h-5 text-[#F58220] shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            <strong>Transparência Comercial:</strong> Os roteiros abaixo apresentados são <strong>exemplos ilustrativos</strong> para inspiração de viagens. Todas as cotações são personalizadas com base na data da sua viagem, disponibilidade hoteleira e emissão dos voos no momento da contratação. Não inventamos preços estáticos sem confirmação prévia da agência.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm font-bold text-[#11164D]">
              <SlidersHorizontal className="w-4 h-4 text-[#F58220]" />
              <span>Filtrar Catálogo:</span>
            </div>

            {/* Region Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-500 font-semibold mr-1">Região:</span>
              {[
                { id: 'todos', label: 'Todos os Destinos' },
                { id: 'Moçambique', label: 'Moçambique' },
                { id: 'África', label: 'África' },
                { id: 'Europa', label: 'Europa' },
                { id: 'Médio Oriente', label: 'Médio Oriente' },
                { id: 'Ásia', label: 'Ásia' },
              ].map((reg) => (
                <button
                  key={reg.id}
                  onClick={() => setSelectedRegion(reg.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedRegion === reg.id
                      ? 'bg-[#11164D] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {reg.label}
                </button>
              ))}
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-500 font-semibold mr-1">Estilo:</span>
              {[
                { id: 'todos', label: 'Todos' },
                { id: 'Férias Familiares', label: 'Família' },
                { id: 'Lua de Mel', label: 'Lua de Mel' },
                { id: 'Cultural', label: 'Cultural' },
                { id: 'Aventura & Safari', label: 'Safari' },
                { id: 'Compras & Negócios', label: 'Negócios' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-[#F58220] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col group"
            >
              {/* Image & Badges */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 rounded-full bg-[#11164D]/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                    {pkg.region}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[#F58220] text-white text-[10px] font-bold">
                    {pkg.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-slate-200 text-[11px] font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#F58220]" />
                  <span>{pkg.duration}</span>
                </div>
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-xs text-[#F58220] font-bold uppercase tracking-wider">
                    {pkg.destination} • {pkg.country}
                  </span>
                  <h3 className="font-display text-xl font-bold leading-tight">
                    {pkg.name}
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                    {pkg.description}
                  </p>

                  <div className="mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Destaques do Roteiro:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {pkg.highlights.slice(0, 3).map((h, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
                  <button
                    onClick={() => setActivePackageModal(pkg)}
                    className="w-full py-2.5 rounded-xl border border-slate-200 hover:border-[#11164D] text-[#11164D] text-xs font-bold transition-all text-center"
                  >
                    Ver Roteiro e Serviços Incluídos
                  </button>

                  <button
                    onClick={() => handleRequestPackageQuote(pkg)}
                    className="w-full py-3 rounded-xl bg-[#F58220] hover:bg-[#E07316] text-white text-xs font-extrabold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Pedir Cotação no WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Trip Banner */}
        <div className="mt-16 bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F58220]">
              Não Encontrou o Seu Destino de Sonho?
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#11164D] mt-1 mb-2">
              Nós Desenhamos a Sua Viagem Personalizada
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Diga-nos para onde quer viajar, quantas pessoas o acompanham e quais os seus interesses. A equipa da BOM Samaritano elabora um itinerário exclusivo para si.
            </p>
          </div>

          <button
            onClick={() => setShowCustomTripModal(true)}
            className="px-8 py-4 rounded-xl bg-[#11164D] hover:bg-[#1A216E] text-white font-bold text-sm shadow-md transition-all shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#F58220]" />
            <span>Personalizar a Minha Viagem</span>
          </button>
        </div>
      </div>

      {/* Package Detail Modal */}
      {activePackageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="relative h-48 sm:h-60 overflow-hidden shrink-0">
              <img
                src={activePackageModal.image}
                alt={activePackageModal.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
              <button
                onClick={() => setActivePackageModal(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                aria-label="Fechar detalhes"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-[#F58220] text-xs font-bold uppercase">
                  {activePackageModal.destination} • {activePackageModal.country}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold">
                  {activePackageModal.name}
                </h3>
                <span className="text-xs text-slate-300">
                  Duração ilustrativa: {activePackageModal.duration}
                </span>
              </div>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#F58220] mb-1">
                  Sobre Esta Experiência
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {activePackageModal.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Destaques e Roteiro
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activePackageModal.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100">
                  <h5 className="text-xs font-bold text-emerald-800 uppercase mb-2 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Geralmente Incluído (Sob Cotação)</span>
                  </h5>
                  <ul className="space-y-1 text-[11px] text-emerald-900">
                    {activePackageModal.included.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h5 className="text-xs font-bold text-slate-700 uppercase mb-2 flex items-center gap-1.5">
                    <XCircle className="w-3.5 h-3.5 text-slate-400" />
                    <span>Não Incluído / Opcional</span>
                  </h5>
                  <ul className="space-y-1 text-[11px] text-slate-600">
                    {activePackageModal.notIncluded.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl text-xs text-amber-800 border border-amber-200">
                * Os serviços e itinerários são ajustados no momento da emissão conforme os seus requisitos específicos e orçamento.
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={() => setActivePackageModal(null)}
                className="px-4 py-2.5 text-slate-600 hover:text-slate-900 text-xs font-bold"
              >
                Voltar
              </button>

              <button
                onClick={() => {
                  handleRequestPackageQuote(activePackageModal);
                  setActivePackageModal(null);
                }}
                className="px-6 py-3 rounded-xl bg-[#F58220] hover:bg-[#E07316] text-white font-bold text-xs shadow-md flex items-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Pedir Cotação Deste Pacote no WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Trip Modal */}
      {showCustomTripModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-[#11164D] text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#F58220] font-bold">
                  BOM Samaritano • Viagens à Medida
                </span>
                <h3 className="font-display text-xl font-bold">
                  Personalizar a Minha Viagem
                </h3>
              </div>
              <button
                onClick={() => setShowCustomTripModal(false)}
                className="text-white/70 hover:text-white p-1"
                aria-label="Fechar"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleCustomTripSubmit} className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                    O Seu Nome
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Carlos Nhantumbo"
                    value={customClientName}
                    onChange={(e) => setCustomClientName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#F58220] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                    Telemóvel / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Ex: 84 / 85 / 86..."
                    value={customClientPhone}
                    onChange={(e) => setCustomClientPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#F58220] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Destino(s) Pretendido(s) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Dubai e Istambul, Ilhas Maurícias, Cabo Verde, Tailândia..."
                  value={customDestination}
                  onChange={(e) => setCustomDestination(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#F58220] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                    Tipo de Viagem
                  </label>
                  <select
                    value={customType}
                    onChange={(e) => setCustomType(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#F58220] focus:outline-none"
                  >
                    <option value="Férias Familiares">Férias Familiares</option>
                    <option value="Lua de Mel">Lua de Mel</option>
                    <option value="Compras & Negócios">Compras & Negócios</option>
                    <option value="Aventura & Safari">Aventura & Safari</option>
                    <option value="Viagem de Grupo">Viagem de Grupo / Amigos</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                    Duração Estimada
                  </label>
                  <input
                    type="text"
                    value={customDuration}
                    onChange={(e) => setCustomDuration(e.target.value)}
                    placeholder="Ex: 5 dias, 10 dias, 2 semanas..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#F58220] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                    Número de Viajantes
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={customPax}
                    onChange={(e) => setCustomPax(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#F58220] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                    Categoria de Alojamento
                  </label>
                  <select
                    value={customBudget}
                    onChange={(e) => setCustomBudget(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#F58220] focus:outline-none"
                  >
                    <option value="Hotéis 3 estrelas">3 Estrelas (Económico Confortável)</option>
                    <option value="Hotéis 4 estrelas">4 Estrelas (Primeira Classe)</option>
                    <option value="Resorts e Hotéis 5 estrelas">5 Estrelas / Resorts de Luxo</option>
                    <option value="A definir / Cotação">A definir pelo consultor</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Notas ou Preferências Especiais
                </label>
                <textarea
                  rows={2}
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="Ex: Queremos transfers privados, quartos comunicantes para crianças, regime tudo incluído..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#F58220] focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#F58220] hover:bg-[#E07316] text-white font-extrabold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                  <span>Enviar Roteiro Sob Medida para o WhatsApp</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
