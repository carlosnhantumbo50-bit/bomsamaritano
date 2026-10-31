import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  Building2,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { PageRoute } from '../types';
import { COMPANY_DETAILS } from '../data/travelData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { openWhatsApp, saveQuoteLocally } from '../utils/whatsapp';

interface ContactProps {
  onNavigate: (page: PageRoute) => void;
  onOpenQuoteModal: (service?: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Passagens Aéreas',
    message: '',
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
      setErrorMsg('Por favor, informe o seu contacto telefónico ou WhatsApp.');
      return;
    }
    if (!formData.message.trim()) {
      setErrorMsg('Por favor, escreva a sua mensagem ou dúvida.');
      return;
    }

    const lines = [
      'Olá BOM Samaritano!',
      '',
      'Mensagem enviada através do Website Oficial:',
      '',
      `Nome: ${formData.name.trim()}`,
      `Telefone/WhatsApp: ${formData.phone.trim()}`,
      formData.email ? `E-mail: ${formData.email.trim()}` : '',
      `Assunto: ${formData.subject}`,
      '',
      `Mensagem:`,
      formData.message.trim(),
    ].filter(Boolean);

    saveQuoteLocally({
      type: 'Contacto',
      clientName: formData.name.trim(),
      clientPhone: formData.phone.trim(),
      details: `Assunto: ${formData.subject} | ${formData.message.substring(0, 80)}...`,
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
            src="https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1600&q=80"
            alt="Atendimento ao cliente em Maputo"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#11164D] via-[#11164D]/90 to-[#11164D]/70" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <Breadcrumbs items={[{ label: 'Contacto' }]} onNavigate={onNavigate} />

          <div className="max-w-3xl mt-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F58220]">
              Estamos Prontos Para o Atender
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white mt-2 mb-4 leading-tight">
              FALE COM A BOM SAMARITANO
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-light">
              Visite o nosso escritório na cidade de Maputo ou fale em tempo real com os nossos consultores através dos canais directos.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: WhatsApp / Telefone */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#25D366] flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Atendimento Directo
              </span>
              <h3 className="font-display text-lg font-bold text-[#11164D] mt-1">
                WhatsApp & Telefone
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Resposta rápida para cotações, dúvidas sobre voos, vistos e reservas.
              </p>
              <div className="space-y-2 mt-4 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200/60 text-emerald-900">
                  <span className="font-semibold flex items-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                    WhatsApp Oficial:
                  </span>
                  <span className="font-mono font-bold text-sm text-[#25D366]">+258 {COMPANY_DETAILS.whatsApp}</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-800">
                  <span className="font-semibold flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#F58220]" />
                    Chamada Telefónica:
                  </span>
                  <a href={`tel:${COMPANY_DETAILS.phoneCallsRaw}`} className="font-mono font-bold text-sm text-[#11164D] hover:text-[#F58220] transition-colors">
                    +258 {COMPANY_DETAILS.phoneCalls}
                  </a>
                </div>
              </div>
            </div>

            <button
              onClick={() => openWhatsApp('Olá BOM Samaritano! Gostaria de falar com a vossa equipa.')}
              className="mt-6 w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Abrir Conversa no WhatsApp</span>
            </button>
          </div>

          {/* Card 2: Localização */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#11164D] flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-[#F58220]" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Escritório Físico
              </span>
              <h3 className="font-display text-lg font-bold text-[#11164D] mt-1">
                Visite a Nossa Agência
              </h3>
              <p className="text-xs text-slate-700 mt-2 font-medium">
                {COMPANY_DETAILS.address}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {COMPANY_DETAILS.city}, {COMPANY_DETAILS.country}
              </p>
            </div>

            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(
                COMPANY_DETAILS.address + ', ' + COMPANY_DETAILS.city
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full py-2.5 rounded-xl bg-[#11164D] hover:bg-[#1A216E] text-white text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Ver no Google Maps</span>
            </a>
          </div>

          {/* Card 3: Horário de Atendimento */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#F58220] flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Disponibilidade
              </span>
              <h3 className="font-display text-lg font-bold text-[#11164D] mt-1">
                Horário de Atendimento
              </h3>
              <div className="space-y-1.5 text-xs text-slate-600 mt-3">
                <div className="flex justify-between">
                  <span className="font-medium text-slate-700">Segunda a Sexta:</span>
                  <span>{COMPANY_DETAILS.schedule.weekdays}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-slate-700">Sábados:</span>
                  <span>{COMPANY_DETAILS.schedule.saturdays}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span className="font-medium">Domingos & Feriados:</span>
                  <span>{COMPANY_DETAILS.schedule.sundays}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-2.5 bg-slate-50 rounded-xl text-[11px] text-slate-500 text-center">
              Plantão de emergências no WhatsApp aos fins de semana
            </div>
          </div>
        </div>

        {/* Form and Office Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Message Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#F58220]">
                  Formulário Directo
                </span>
                <h2 className="font-display text-2xl font-bold text-[#11164D]">
                  Enviar Mensagem à Agência
                </h2>
              </div>
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#F58220] flex items-center justify-center">
                <Send className="w-5 h-5" />
              </div>
            </div>

            {submitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-emerald-100 text-[#25D366] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-[#11164D] mb-2">
                  Mensagem Enviada!
                </h3>
                <p className="text-slate-600 text-sm mb-6 max-w-md mx-auto leading-relaxed">
                  A sua mensagem foi transmitida com sucesso para o WhatsApp oficial da BOM Samaritano. Entraremos em contacto brevemente.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      phone: '',
                      email: '',
                      subject: 'Passagens Aéreas',
                      message: '',
                    });
                  }}
                  className="px-6 py-3 rounded-xl bg-[#11164D] text-white font-semibold text-sm hover:bg-[#1A216E] transition-colors"
                >
                  Enviar Outra Mensagem
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
                      O Seu Nome Completo *
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
                      E-mail (Opcional)
                    </label>
                    <input
                      type="email"
                      placeholder="seu.email@exemplo.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#F58220] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Assunto *
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#F58220] focus:outline-none"
                    >
                      <option value="Passagens Aéreas">Passagens Aéreas</option>
                      <option value="Vistos e Documentação">Vistos e Documentação</option>
                      <option value="Pacotes Turísticos">Pacotes Turísticos</option>
                      <option value="Reservas de Hotéis">Reservas de Hotéis</option>
                      <option value="Aluguer de Viaturas">Aluguer de Viaturas</option>
                      <option value="Seguro de Viagem">Seguro de Viagem</option>
                      <option value="Parcerias / Outro">Parcerias Corporativas / Outro</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Mensagem / Pergunta *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Descreva as suas necessidades de viagem, datas pretendidas, itinerário ou dúvidas..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#F58220] focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#F58220] hover:bg-[#E07316] text-white font-extrabold text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5 text-white" />
                    <span>Enviar Mensagem Directa no WhatsApp</span>
                  </button>
                  <p className="text-[11px] text-slate-400 text-center mt-2">
                    A sua mensagem será organizada e enviada directamente para o atendimento em Maputo.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Interactive Map & Agency Profile */}
          <div className="lg:col-span-5 space-y-6">
            {/* Visual Location Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 overflow-hidden">
              <h3 className="font-display font-bold text-lg text-[#11164D] mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#F58220]" />
                <span>O Nosso Escritório em Maputo</span>
              </h3>

              {/* Map Mockup / Visual Frame */}
              <div className="w-full h-52 rounded-2xl bg-slate-100 relative overflow-hidden border border-slate-200 mb-4 flex flex-col items-center justify-center text-center p-6">
                <div className="w-12 h-12 rounded-full bg-[#11164D] text-[#F58220] flex items-center justify-center shadow-lg mb-2">
                  <MapPin className="w-6 h-6 animate-bounce" />
                </div>
                <div className="font-display font-bold text-sm text-[#11164D]">
                  BOM SAMARITANO
                </div>
                <div className="text-xs text-slate-600 max-w-xs">
                  {COMPANY_DETAILS.address}, Maputo
                </div>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(
                    COMPANY_DETAILS.address + ', ' + COMPANY_DETAILS.city
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 px-3 py-1.5 rounded-lg bg-white shadow-sm border border-slate-200 text-xs font-bold text-[#11164D] hover:bg-slate-50 flex items-center gap-1.5"
                >
                  <span>Abrir Mapa Interativo</span>
                  <ExternalLink className="w-3 h-3 text-[#F58220]" />
                </a>
              </div>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#F58220] shrink-0" />
                  <span>{COMPANY_DETAILS.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#F58220] shrink-0" />
                  <span>{COMPANY_DETAILS.phone}</span>
                </div>
              </div>
            </div>

            {/* CNM Multiservices Credits & Institutional Box */}
            <div className="bg-[#11164D] text-white rounded-3xl p-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#F58220] block mb-1">
                Garantia Institucional
              </span>
              <h4 className="font-display font-bold text-base mb-2">
                Atendimento Idóneo & Transparente
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Todas as reservas, cotações e emissões são efectuadas com recibo e comprovativo oficial. Não autorizamos cobranças fora dos canais formais da empresa.
              </p>
              <div className="pt-3 border-t border-white/10 text-[11px] text-slate-400">
                Website corporativo desenvolvido pela <strong className="text-slate-200">CNM Multiservices</strong> para a BOM Samaritano.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
