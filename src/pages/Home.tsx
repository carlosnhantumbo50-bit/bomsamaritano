import React, { useState } from 'react';
import {
  Plane,
  FileCheck,
  Palmtree,
  Building,
  Car,
  ShieldCheck,
  MessageCircle,
  ArrowRight,
  CheckCircle,
  Clock,
  Compass,
  MapPin,
  Calendar,
  Users,
  Search,
  Sparkles,
  ShieldAlert,
  Phone,
  Check,
} from 'lucide-react';
import { PageRoute } from '../types';
import {
  SERVICES,
  POPULAR_DESTINATIONS,
  COMPANY_DETAILS,
} from '../data/travelData';
import { openWhatsApp } from '../utils/whatsapp';

interface HomeProps {
  onNavigate: (page: PageRoute) => void;
  onOpenQuoteModal: (service?: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, onOpenQuoteModal }) => {
  // Quick Search Bar state in Hero
  const [activeSearchTab, setActiveSearchTab] = useState<'voos' | 'vistos' | 'pacotes' | 'hoteis'>('voos');
  const [quickOrigin, setQuickOrigin] = useState('Maputo (MPM)');
  const [quickDestination, setQuickDestination] = useState('');
  const [quickDate, setQuickDate] = useState('');
  const [quickPax, setQuickPax] = useState('1');

  const handleQuickSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceName =
      activeSearchTab === 'voos'
        ? 'Passagens Aéreas'
        : activeSearchTab === 'vistos'
        ? 'Vistos e Documentação'
        : activeSearchTab === 'pacotes'
        ? 'Pacotes Turísticos'
        : 'Reservas de Hotéis';

    const msg = [
      'Olá BOM Samaritano!',
      '',
      'Gostaria de solicitar uma cotação.',
      '',
      `Serviço: ${serviceName}`,
      quickDestination ? `Destino: ${quickDestination}` : '',
      activeSearchTab === 'voos' ? `Origem: ${quickOrigin}` : '',
      quickDate ? `Data pretendida: ${quickDate}` : '',
      `Passageiros / Pessoas: ${quickPax}`,
      '',
      'Podem ajudar-me?',
    ].filter(Boolean).join('\n');

    openWhatsApp(msg);
  };

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Plane': return <Plane className="w-6 h-6" />;
      case 'FileCheck': return <FileCheck className="w-6 h-6" />;
      case 'Palmtree': return <Palmtree className="w-6 h-6" />;
      case 'Building': return <Building className="w-6 h-6" />;
      case 'Car': return <Car className="w-6 h-6" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6" />;
      default: return <Compass className="w-6 h-6" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[620px] lg:min-h-[700px] flex items-center bg-[#11164D] overflow-hidden text-white">
        {/* Background Image Composition with subtle gradient overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2000&q=80"
            alt="Avião comercial e viagens internacionais"
            className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#11164D] via-[#11164D]/90 to-[#11164D]/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 flex flex-col items-start gap-5">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-wider text-[#F58220]">
                  <Compass className="w-3.5 h-3.5" />
                  Agência de Viagens e Turismo
                </span>

                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-medium">
                  <CheckCircle className="w-3 h-3" />
                  Atendimento personalizado
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white uppercase leading-[1.1]">
                VIAJE COM SEGURANÇA, <br />
                <span className="text-[#F58220]">REALIZE SONHOS!</span>
              </h1>

              {/* Secondary text */}
              <p className="text-base sm:text-xl text-slate-200 leading-relaxed max-w-2xl font-normal">
                Facilitamos o seu caminho para o mundo com soluções completas em viagens, vistos e consultoria.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2 w-full sm:w-auto">
                <button
                  id="hero-quote-btn"
                  onClick={() => onOpenQuoteModal('Passagens Aéreas')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#F58220] hover:bg-[#E07316] text-white font-bold text-base shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Pedir Cotação</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  id="hero-whatsapp-btn"
                  onClick={() => openWhatsApp('Olá BOM Samaritano! Gostaria de falar com um consultor para organizar a minha viagem.')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-base shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  <span>Falar no WhatsApp</span>
                </button>
              </div>

              {/* Agency Highlights Bar */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 w-full max-w-lg text-slate-300 text-xs sm:text-sm">
                <div>
                  <div className="font-bold text-white text-base sm:text-lg">Maputo</div>
                  <div className="text-slate-400 text-xs">Sede em Moçambique</div>
                </div>
                <div>
                  <div className="font-bold text-white text-base sm:text-lg">100% Legal</div>
                  <div className="text-slate-400 text-xs">Processos rigorosos</div>
                </div>
                <div>
                  <div className="font-bold text-white text-base sm:text-lg">Apoio Real</div>
                  <div className="text-slate-400 text-xs">Antes e durante o voo</div>
                </div>
              </div>
            </div>

            {/* Right Interactive Quick Quote Box */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl shadow-2xl p-6 text-slate-800 border border-slate-100">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#F58220]">
                      Simulador Rápido
                    </span>
                    <h3 className="font-display text-lg font-bold text-[#11164D]">
                      Planear a Sua Viagem
                    </h3>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#F58220] flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>

                {/* Tabs */}
                <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-xl mb-4 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setActiveSearchTab('voos')}
                    className={`py-2 rounded-lg transition-all ${
                      activeSearchTab === 'voos' ? 'bg-[#11164D] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Voos
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSearchTab('vistos')}
                    className={`py-2 rounded-lg transition-all ${
                      activeSearchTab === 'vistos' ? 'bg-[#11164D] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Vistos
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSearchTab('pacotes')}
                    className={`py-2 rounded-lg transition-all ${
                      activeSearchTab === 'pacotes' ? 'bg-[#11164D] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Pacotes
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSearchTab('hoteis')}
                    className={`py-2 rounded-lg transition-all ${
                      activeSearchTab === 'hoteis' ? 'bg-[#11164D] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Hotéis
                  </button>
                </div>

                <form onSubmit={handleQuickSearchSubmit} className="space-y-3">
                  {activeSearchTab === 'voos' && (
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                        Origem
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          value={quickOrigin}
                          onChange={(e) => setQuickOrigin(e.target.value)}
                          placeholder="Maputo (MPM)"
                          className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#F58220] focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                      {activeSearchTab === 'vistos' ? 'País de Destino' : 'Destino Pretendido'}
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-[#F58220] absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={quickDestination}
                        onChange={(e) => setQuickDestination(e.target.value)}
                        placeholder="Ex: Lisboa, Dubai, Turquia, China..."
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#F58220] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                        Data Prevista
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-slate-400 absolute left-2.5 top-3" />
                        <input
                          type="date"
                          value={quickDate}
                          onChange={(e) => setQuickDate(e.target.value)}
                          className="w-full pl-8 pr-2 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#F58220] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                        Passageiros
                      </label>
                      <div className="relative">
                        <Users className="w-4 h-4 text-slate-400 absolute left-2.5 top-3" />
                        <select
                          value={quickPax}
                          onChange={(e) => setQuickPax(e.target.value)}
                          className="w-full pl-8 pr-2 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#F58220] focus:outline-none"
                        >
                          <option value="1">1 Pessoa</option>
                          <option value="2">2 Pessoas</option>
                          <option value="3">3 Pessoas</option>
                          <option value="4+">4+ Pessoas</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 mt-1 rounded-xl bg-[#F58220] hover:bg-[#E07316] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-white" />
                    <span>Cotação Imediata no WhatsApp</span>
                  </button>

                  {/* Direct GDS Real-Time Booking CTA */}
                  <div className="pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => onNavigate(activeSearchTab === 'hoteis' ? 'hotels' : 'flights')}
                      className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-[#11164D] hover:text-white text-[#11164D] font-bold text-xs transition-all flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#F58220]" />
                      <span>
                        {activeSearchTab === 'hoteis'
                          ? 'Pesquisar & Reservar Hotéis Online (Voucher Imediato) ➔'
                          : 'Pesquisar Voos & Emitir Reserva no GDS em Tempo Real ➔'}
                      </span>
                    </button>
                  </div>

                  <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
                    <Clock className="w-3 h-3 text-[#F58220]" />
                    <span>Resposta rápida por consultores em Maputo</span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES SECTION */}
      <section className="py-20 bg-[#F5F7FB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F58220]">
              Soluções Integradas de Viagem
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#11164D] mt-2 mb-3">
              OS NOSSOS SERVIÇOS
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Tudo o que precisa para organizar a sua próxima viagem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((serv) => (
              <div
                key={serv.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={serv.image}
                    alt={serv.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 w-11 h-11 rounded-xl bg-[#11164D] text-white flex items-center justify-center shadow-lg border border-white/20">
                    {getServiceIcon(serv.icon)}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#11164D] mb-2 group-hover:text-[#F58220] transition-colors">
                      {serv.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      {serv.shortDesc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => onNavigate(serv.route)}
                      className="text-xs font-bold uppercase tracking-wider text-[#11164D] hover:text-[#F58220] flex items-center gap-1 transition-colors"
                    >
                      <span>Saber Detalhes</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onOpenQuoteModal(serv.title)}
                      className="px-4 py-2 rounded-xl bg-orange-50 hover:bg-[#F58220] text-[#F58220] hover:text-white text-xs font-bold transition-colors"
                    >
                      {serv.ctaText}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PORQUÊ ESCOLHER A BOM SAMARITANO? */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#F58220]">
                Excelência e Confiança
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#11164D] leading-tight">
                A SUA VIAGEM MERECE ATENÇÃO ESPECIAL
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Na BOM Samaritano, ajudamos a tornar o planeamento da sua viagem mais simples, organizado e tranquilo.
              </p>

              <div className="pt-4 flex flex-col gap-3">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#11164D] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4 text-[#F58220]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#11164D]">Atendimento em Maputo</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {COMPANY_DETAILS.address}. Disponíveis presencialmente e via canais digitais.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#11164D] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#11164D]">Processos Transparentes</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Sem taxas ocultas e com total integridade ética na assistência documental.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  {
                    title: 'Atendimento personalizado',
                    desc: 'Cada cliente e viagem têm necessidades únicas. Escutamos o seu plano e aconselhamos a melhor rota e estadia.',
                  },
                  {
                    title: 'Orientação para a organização da viagem',
                    desc: 'Aconselhamos os tempos adequados de reserva, documentação obrigatória e dicas práticas para a partida.',
                  },
                  {
                    title: 'Soluções completas em viagens e documentação',
                    desc: 'Desde passagens aéreas e hotéis até à assistência consultiva em vistos e contratação de seguro internacional.',
                  },
                  {
                    title: 'Apoio ao cliente',
                    desc: 'Canais abertos de comunicação directa via chamadas e WhatsApp para esclarecimento rápido de dúvidas.',
                  },
                  {
                    title: 'Experiência e profissionalismo',
                    desc: 'Equipa focada em padrões rigorosos de serviço, pontualidade nas emissões e clareza informativa.',
                  },
                  {
                    title: 'Assistência antes da viagem',
                    desc: 'Revisão final de itinerários, confirmação de horários de voo e verificação preventiva da bagagem autorizada.',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[#F5F7FB] border border-slate-100 hover:border-orange-200 transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#F58220] flex items-center justify-center mb-3">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <h4 className="font-display text-base font-bold text-[#11164D] mb-1.5">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECÇÃO DE VISTOS E CONSULTORIA */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F58220_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F58220]">
              Assistência Documental Responsável
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-3">
              PLANEIE O SEU FUTURO ALÉM-FRONTEIRAS
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Orientação rigorosa para quem deseja viajar a turismo, ingressar em estudos universitários ou abraçar desafios profissionais no exterior.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {/* Visto Turismo */}
            <div className="bg-white/5 border border-white/10 hover:border-[#F58220]/50 rounded-2xl p-7 flex flex-col justify-between transition-all hover:-translate-y-1">
              <div>
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-[#F58220] flex items-center justify-center mb-5">
                  <Palmtree className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-2">
                  Visto de Turismo
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  Prepare a sua viagem com orientação sobre documentação e requisitos aplicáveis para lazer e visitas a familiares.
                </p>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Conferência de passaporte e fotos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Comprovativos de alojamento e rota</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Seguro de viagem obrigatório</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Visto Estudante */}
            <div className="bg-white/5 border border-[#F58220]/40 rounded-2xl p-7 flex flex-col justify-between transition-all hover:-translate-y-1 relative shadow-lg">
              <div className="absolute -top-3 right-5 px-3 py-0.5 rounded-full bg-[#F58220] text-white text-[10px] font-extrabold uppercase">
                Elevada Procura
              </div>
              <div>
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-[#F58220] flex items-center justify-center mb-5">
                  <Building className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-2">
                  Visto de Estudante
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  Orientação para quem pretende estudar no exterior: universidades em Portugal, África do Sul, Turquia, China e outros destinos.
                </p>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Organização de cartas de aceitação</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Meios de subsistência e termos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Apoio em agendamentos consulares</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Visto Trabalho */}
            <div className="bg-white/5 border border-white/10 hover:border-[#F58220]/50 rounded-2xl p-7 flex flex-col justify-between transition-all hover:-translate-y-1">
              <div>
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-[#F58220] flex items-center justify-center mb-5">
                  <FileCheck className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-2">
                  Visto de Trabalho
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  Assistência na preparação documental para oportunidades profissionais e viagens de negócios no exterior.
                </p>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Contratos e cartas de convite</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Reconhecimento notarial e consular</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Certidões de registo criminal</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Consultation CTA & Disclaimer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-white/10 border border-white/15">
            <div className="flex items-start gap-3 max-w-2xl">
              <ShieldAlert className="w-5 h-5 text-[#F58220] shrink-0 mt-0.5" />
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>Aviso legal importante:</strong> A concessão de vistos depende das autoridades competentes. A agência presta assistência e orientação, não garante aprovação.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
              <button
                id="visas-consultation-home-btn"
                onClick={() => onNavigate('visas')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#F58220] hover:bg-[#E07316] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Solicitar Consultoria</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SECÇÃO DE DESTINOS DE EXEMPLO */}
      <section className="py-20 bg-[#F5F7FB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#F58220]">
                Inspiração Para Viajar
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#11164D] mt-1">
                DESTINOS EM DESTAQUE
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-1">
                Conheça alguns dos destinos mais procurados para férias, negócios e estudos internacionais.
              </p>
            </div>

            <div className="text-xs text-slate-500 italic">
              * Destinos de exemplo ilustrativo. Cotações sob medida para as suas datas.
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {POPULAR_DESTINATIONS.map((dest) => (
              <div
                key={dest.id}
                className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white border border-slate-100 flex flex-col"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11164D]/90 via-[#11164D]/30 to-transparent" />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-semibold">
                    {dest.suggestedDuration}
                  </div>
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-[#F58220] text-xs font-bold uppercase tracking-wider">
                      {dest.country}
                    </span>
                    <h3 className="font-display text-2xl font-bold text-white leading-tight">
                      {dest.name}
                    </h3>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                    {dest.description}
                  </p>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      Ideal para: <strong className="text-slate-700">{dest.popularFor}</strong>
                    </span>

                    <button
                      onClick={() => {
                        const msg = `Olá BOM Samaritano! Gostaria de pedir informação sobre viagem para ${dest.name} (${dest.country}).`;
                        openWhatsApp(msg);
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-orange-50 hover:bg-[#F58220] text-[#F58220] hover:text-white text-xs font-bold transition-colors flex items-center gap-1"
                    >
                      <span>Pedir Informação</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => onNavigate('packages')}
              className="px-6 py-3 rounded-xl bg-white border border-slate-300 hover:border-[#11164D] text-[#11164D] font-bold text-sm shadow-sm hover:shadow transition-all inline-flex items-center gap-2"
            >
              <span>Ver Catálogo de Pacotes Turísticos</span>
              <ArrowRight className="w-4 h-4 text-[#F58220]" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. SECÇÃO DE CTA PRINCIPAL */}
      <section className="py-16 bg-[#11164D] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="bg-gradient-to-r from-white/10 to-white/5 border border-white/15 rounded-3xl p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center lg:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-[#F58220]">
                Inicie o Seu Planeamento Connosco
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-black text-white mt-2 mb-4 leading-tight">
                A SUA PRÓXIMA VIAGEM <br className="hidden sm:inline" />
                COMEÇA AQUI!
              </h2>
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
                Fale com a nossa equipa e descubra como podemos ajudar a organizar a sua viagem.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full lg:w-auto">
              <button
                id="cta-talk-bom-samaritano-btn"
                onClick={() => openWhatsApp('Olá BOM Samaritano! Quero falar com a vossa equipa para começar a organizar a minha próxima viagem.')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#F58220] hover:bg-[#E07316] text-white font-extrabold text-base shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 text-white" />
                <span>Falar com a BOM Samaritano</span>
              </button>

              <a
                href={`tel:${COMPANY_DETAILS.phoneCallsRaw}`}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#F58220]" />
                <span>Ligar: {COMPANY_DETAILS.phoneCalls}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
