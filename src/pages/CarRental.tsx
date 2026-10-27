import React, { useState } from 'react';
import {
  Car,
  Calendar,
  MapPin,
  Users,
  Briefcase,
  Fuel,
  CheckCircle2,
  ShieldCheck,
  MessageCircle,
  Clock,
  KeyRound,
  UserCheck,
} from 'lucide-react';
import { PageRoute, CarRentalQuoteRequest } from '../types';
import { VEHICLE_CATEGORIES } from '../data/travelData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { openWhatsApp, saveQuoteLocally } from '../utils/whatsapp';

interface CarRentalProps {
  onNavigate: (page: PageRoute) => void;
  onOpenQuoteModal: (service?: string) => void;
}

export const CarRental: React.FC<CarRentalProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState<CarRentalQuoteRequest>({
    name: '',
    phone: '',
    email: '',
    pickupLocation: 'Maputo (Aeroporto ou Cidade)',
    returnLocation: 'Maputo (Aeroporto ou Cidade)',
    startDate: '',
    endDate: '',
    vehicleCategory: 'SUV 4x4',
    withDriver: false,
    additionalMessage: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg('Por favor, informe o seu nome completo.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg('Por favor, informe o seu número de WhatsApp / telefone.');
      return;
    }
    if (!formData.startDate || !formData.endDate) {
      setErrorMsg('Por favor, seleccione as datas de início e fim do aluguer.');
      return;
    }

    const lines = [
      'Olá BOM Samaritano!',
      '',
      'Gostaria de solicitar uma cotação para Aluguer de Viatura.',
      '',
      `Nome: ${formData.name.trim()}`,
      `Telefone: ${formData.phone.trim()}`,
      formData.email ? `E-mail: ${formData.email.trim()}` : '',
      `Categoria: ${formData.vehicleCategory}`,
      `Com Motorista: ${formData.withDriver ? 'Sim (Com motorista profissional)' : 'Não (Condução própria / Self-drive)'}`,
      `Local de Recolha: ${formData.pickupLocation.trim()}`,
      `Local de Devolução: ${formData.returnLocation.trim()}`,
      `Data de Início: ${formData.startDate}`,
      `Data de Devolução: ${formData.endDate}`,
      formData.additionalMessage ? `Notas: ${formData.additionalMessage.trim()}` : '',
      '',
      'Podem informar-me os veículos disponíveis e as condições de caução?',
    ].filter(Boolean);

    saveQuoteLocally({
      type: 'Viatura',
      clientName: formData.name.trim(),
      clientPhone: formData.phone.trim(),
      details: `${formData.vehicleCategory} | ${formData.withDriver ? 'Com motorista' : 'Sem motorista'} | De ${formData.startDate} a ${formData.endDate}`,
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
            src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1600&q=80"
            alt="Frota de viaturas executivas e 4x4"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#11164D] via-[#11164D]/90 to-[#11164D]/70" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <Breadcrumbs
            items={[{ label: 'Serviços' }, { label: 'Aluguer de Viaturas' }]}
            onNavigate={onNavigate}
          />

          <div className="max-w-3xl mt-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F58220]">
              Mobilidade Segura & Confortável
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white mt-2 mb-4 leading-tight">
              ALUGUER DE VIATURAS
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-light">
              Mobilidade prática e segura para viagens de negócios, lazer ou rotas interprovinciais em Moçambique.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        {/* Vehicle Showcase Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {VEHICLE_CATEGORIES.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-slate-100 flex flex-col justify-between"
            >
              <div>
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={vehicle.image}
                    alt={vehicle.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-[#11164D]/90 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {vehicle.title}
                  </div>
                </div>

                <div className="p-5">
                  <div className="text-xs text-slate-500 font-medium mb-1">
                    {vehicle.examples}
                  </div>
                  <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                    {vehicle.desc}
                  </p>

                  <div className="py-2.5 border-y border-slate-100 text-slate-600 text-xs my-3 flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#F58220] shrink-0" />
                    <span className="font-medium text-slate-700">{vehicle.capacity}</span>
                  </div>

                  <ul className="space-y-1 text-[11px] text-slate-600">
                    {vehicle.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => {
                    setFormData({ ...formData, vehicleCategory: vehicle.title });
                    document.getElementById('rental-form-anchor')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-[#11164D] hover:text-white text-[#11164D] text-xs font-bold transition-all"
                >
                  Seleccionar Esta Categoria
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Form and Options */}
        <div id="rental-form-anchor" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Quote Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#F58220]">
                  Reserva & Cotação
                </span>
                <h2 className="font-display text-2xl font-bold text-[#11164D]">
                  Pedir Cotação de Viatura
                </h2>
              </div>
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#F58220] flex items-center justify-center">
                <Car className="w-5 h-5" />
              </div>
            </div>

            {submitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-emerald-100 text-[#25D366] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-[#11164D] mb-2">
                  Pedido de Aluguer Preparado!
                </h3>
                <p className="text-slate-600 text-sm mb-6 max-w-md mx-auto leading-relaxed">
                  Os dados foram encaminhados para o WhatsApp da BOM Samaritano. Confirmaremos as viaturas disponíveis para as suas datas e os detalhes de caução ou contratação de motorista.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 rounded-xl bg-[#11164D] text-white font-semibold text-sm hover:bg-[#1A216E] transition-colors"
                >
                  Novo Pedido de Viatura
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Categoria Pretendida *
                    </label>
                    <select
                      value={formData.vehicleCategory}
                      onChange={(e) => setFormData({ ...formData, vehicleCategory: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#F58220] focus:outline-none"
                    >
                      <option value="Económico & Compacto">Económico & Compacto (Hatchback)</option>
                      <option value="Sedan Executivo">Sedan Executivo</option>
                      <option value="SUV 4x4">SUV 4x4 (Urbano & Estradas Nacionais)</option>
                      <option value="Minivan / Van de Grupo">Minivan / Van de Grupo (7 a 14 Lugares)</option>
                      <option value="Pick-up 4x4 Cabine Dupla">Pick-up 4x4 Cabine Dupla</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Modalidade de Condução *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, withDriver: false })}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                          !formData.withDriver
                            ? 'bg-[#11164D] text-white shadow'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        <KeyRound className="w-3.5 h-3.5" />
                        <span>Sem Motorista</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, withDriver: true })}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                          formData.withDriver
                            ? 'bg-[#F58220] text-white shadow'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Com Motorista</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Local de Recolha *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Aeroporto de Maputo, Matola, Hotel..."
                      value={formData.pickupLocation}
                      onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#F58220] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Local de Devolução *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Aeroporto de Maputo ou outro ponto..."
                      value={formData.returnLocation}
                      onChange={(e) => setFormData({ ...formData, returnLocation: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#F58220] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Data de Início *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#F58220] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Data de Devolução *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#F58220] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Destino da Viagem / Notas Adicionais
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Ex: Viagem para Ponta do Ouro, Bilene, ou circulação urbana em Maputo..."
                    value={formData.additionalMessage}
                    onChange={(e) => setFormData({ ...formData, additionalMessage: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#F58220] focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#F58220] hover:bg-[#E07316] text-white font-extrabold text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5 text-white" />
                    <span>Pedir Cotação de Viatura no WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Conditions & Driver info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-display font-bold text-lg text-[#11164D] mb-4 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-[#F58220]" />
                <span>Serviço com Motorista Profissional</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Ideal para delegações estrangeiras, executivos, casamentos ou quem visita Moçambique e prefere não conduzir no trânsito local.
              </p>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Motoristas habilitados, pontuais e discretos</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Conhecimento aprofundado das vias da Grande Maputo</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Disponibilidade para diárias e transfers de aeroporto</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#11164D] text-white rounded-2xl p-6">
              <h4 className="font-display font-bold text-base mb-3 text-[#F58220] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                <span>Requisitos Gerais para Condução Própria</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li>• Carta de condução válida com pelo menos 2 anos de emissão</li>
                <li>• Documento de identificação (BI ou Passaporte válido)</li>
                <li>• Caução de garantia reembolsável após vistoria da viatura</li>
                <li>• Seguro de responsabilidade civil obrigatório incluído</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
