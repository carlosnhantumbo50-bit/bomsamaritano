import React, { useState } from 'react';
import {
  Building,
  Calendar,
  Users,
  MapPin,
  MessageCircle,
  CheckCircle2,
  Bed,
  Utensils,
  Wifi,
  Sparkles,
  ShieldCheck,
  Coffee,
  Info,
  Zap,
} from 'lucide-react';
import { PageRoute, HotelQuoteRequest } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { openWhatsApp, saveQuoteLocally } from '../utils/whatsapp';
import { HotelBookingEngine } from '../components/HotelBookingEngine';

interface HotelsProps {
  onNavigate: (page: PageRoute) => void;
  onOpenQuoteModal: (service?: string) => void;
}

export const Hotels: React.FC<HotelsProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'realtime' | 'consultancy'>('realtime');
  const [formData, setFormData] = useState<HotelQuoteRequest>({
    name: '',
    phone: '',
    email: '',
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    rooms: 1,
    roomCategory: 'Quarto Standard Duplo',
    boardBasis: 'Com Pequeno-Almoço',
    preferences: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg('Por favor, indique o seu nome.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg('Por favor, informe o seu número de telefone ou WhatsApp.');
      return;
    }
    if (!formData.destination.trim()) {
      setErrorMsg('Por favor, indique a cidade ou destino do alojamento.');
      return;
    }
    if (!formData.checkIn || !formData.checkOut) {
      setErrorMsg('Por favor, seleccione as datas de Check-in e Check-out.');
      return;
    }

    const lines = [
      'Olá BOM Samaritano!',
      '',
      'Gostaria de solicitar uma cotação para Reserva de Hotel.',
      '',
      `Nome: ${formData.name.trim()}`,
      `Telefone: ${formData.phone.trim()}`,
      formData.email ? `E-mail: ${formData.email.trim()}` : '',
      `Destino / Cidade: ${formData.destination.trim()}`,
      `Data Check-in: ${formData.checkIn}`,
      `Data Check-out: ${formData.checkOut}`,
      `Número de Hóspedes: ${formData.guests}`,
      `Número de Quartos: ${formData.rooms}`,
      `Regime Pretendido: ${formData.boardBasis}`,
      `Categoria de Quarto: ${formData.roomCategory}`,
      formData.preferences ? `Preferências: ${formData.preferences.trim()}` : '',
      '',
      'Podem apresentar opções e tarifas disponíveis?',
    ].filter(Boolean);

    saveQuoteLocally({
      type: 'Hotel',
      clientName: formData.name.trim(),
      clientPhone: formData.phone.trim(),
      details: `Hotel em ${formData.destination} | ${formData.checkIn} a ${formData.checkOut} | ${formData.guests} hóspedes | ${formData.boardBasis}`,
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
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80"
            alt="Hotel de luxo e quartos confortáveis"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#11164D] via-[#11164D]/90 to-[#11164D]/70" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <Breadcrumbs
            items={[{ label: 'Serviços' }, { label: 'Reservas de Hotéis' }]}
            onNavigate={onNavigate}
          />

          <div className="max-w-3xl mt-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F58220]">
              Alojamento em Moçambique e no Mundo
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white mt-2 mb-4 leading-tight">
              RESERVAS DE HOTÉIS
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-light">
              Encontre alojamento adequado às suas necessidades de viagem, conforto e orçamento.
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
              <span>Pesquisa & Reserva Imediata de Hotéis</span>
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
              <span>Solicitar Proposta Sob Medida & WhatsApp</span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 pr-4">
            <ShieldCheck className="w-4 h-4 text-[#F58220]" />
            <span>Vouchers Oficiais com Confirmação Imediata</span>
          </div>
        </div>

        {activeTab === 'realtime' ? (
          <HotelBookingEngine />
        ) : (
          <div>
            {/* Accommodation Types */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            {
              title: 'Hotéis Urbanos & Executivos',
              desc: 'Próximos de centros de negócios, convenções e aeroportos. Ideais para trabalho e estadias práticas.',
              badge: 'Negócios & Cidade',
            },
            {
              title: 'Resorts de Praia & Lazer',
              desc: 'Em frente ao mar com regime Tudo Incluído (All Inclusive), piscinas e entretenimento para toda a família.',
              badge: 'Férias & Relax',
            },
            {
              title: 'Lodges de Safari & Natureza',
              desc: 'Experiências exclusivas integradas na vida selvagem na África do Sul, Parque da Gorongosa e Bazaruto.',
              badge: 'Aventura & Safari',
            },
            {
              title: 'Apart-hotéis com Cozinha',
              desc: 'Conforto de apartamento com serviços hoteleiros, ideais para estadias prolongadas ou viagens com crianças.',
              badge: 'Estadias Longas',
            },
          ].map((type, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F58220] bg-orange-50 px-2.5 py-1 rounded-md">
                  {type.badge}
                </span>
                <h3 className="font-display text-base font-bold text-[#11164D] mt-3 mb-1">
                  {type.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {type.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Form and Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Hotel Quote Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#F58220]">
                  Cotação Personalizada
                </span>
                <h2 className="font-display text-2xl font-bold text-[#11164D]">
                  Pedir Cotação de Alojamento
                </h2>
              </div>
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#F58220] flex items-center justify-center">
                <Building className="w-5 h-5" />
              </div>
            </div>

            {submitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-emerald-100 text-[#25D366] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-[#11164D] mb-2">
                  Solicitação Enviada com Sucesso!
                </h3>
                <p className="text-slate-600 text-sm mb-6 max-w-md mx-auto leading-relaxed">
                  A nossa equipa irá consultar a disponibilidade nos hotéis do destino indicado e responder-lhe directamente no WhatsApp com opções e fotografias.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 rounded-xl bg-[#11164D] text-white font-semibold text-sm hover:bg-[#1A216E] transition-colors"
                >
                  Fazer Outro Pedido
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
                      Nome Completo *
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
                    Destino / Cidade Pretendida *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-[#F58220] absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="Ex: Lisboa, Dubai, Joanesburgo, Maputo, Vilankulo..."
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#F58220] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Data de Check-in *
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="date"
                        required
                        value={formData.checkIn}
                        onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#F58220] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Data de Check-out *
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="date"
                        required
                        value={formData.checkOut}
                        onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#F58220] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Nº de Hóspedes
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) || 1 })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#F58220] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Nº de Quartos
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.rooms}
                      onChange={(e) => setFormData({ ...formData, rooms: parseInt(e.target.value) || 1 })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#F58220] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Regime Alimentar
                    </label>
                    <select
                      value={formData.boardBasis}
                      onChange={(e) => setFormData({ ...formData, boardBasis: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#F58220] focus:outline-none"
                    >
                      <option value="Com Pequeno-Almoço">Com Pequeno-Almoço</option>
                      <option value="Só Alojamento (Sem Refeições)">Só Alojamento</option>
                      <option value="Meia Pensão (Pequeno-Almoço + Jantar)">Meia Pensão</option>
                      <option value="Tudo Incluído (All Inclusive)">Tudo Incluído</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Preferências Especiais
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Ex: Cama de casal, berço para bebé, vista mar, proximidade de metro..."
                    value={formData.preferences}
                    onChange={(e) => setFormData({ ...formData, preferences: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#F58220] focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#F58220] hover:bg-[#E07316] text-white font-extrabold text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5 text-white" />
                    <span>Pedir Cotação de Hotel no WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Benefits & Guarantees */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-display font-bold text-lg text-[#11164D] mb-4">
                Comodidades e Confirmação Segura
              </h3>
              <ul className="space-y-3 text-xs text-slate-600">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-orange-50 text-[#F58220] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-800">Comprovativo Oficial para Vistos:</strong> Voucher emitido com código de confirmação reconhecido pelos consulados.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-orange-50 text-[#F58220] flex items-center justify-center shrink-0">
                    <Coffee className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-800">Tarifas com Pequeno-Almoço:</strong> Selecção prioritária de hotéis com pequeno-almoço buffet incluído para a sua comodidade.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-orange-50 text-[#F58220] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-800">Localização Estratégica:</strong> Seleccionamos hotéis seguros e com fácil acesso a transportes e atracções.
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-[#11164D] text-white rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-[#F58220] shrink-0 mt-0.5" />
                <p className="text-xs text-slate-300 leading-relaxed">
                  Trabalhamos com fornecedores e operadoras globais (Amadeus, Sabre, redes hoteleiras mundiais). Ao enviar a cotação, um consultor da BOM Samaritano em Maputo verifica as melhores opções em minutos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
      </div>
    </div>
  );
};
