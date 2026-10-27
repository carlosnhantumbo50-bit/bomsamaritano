import React, { useState } from 'react';
import {
  FileCheck,
  ShieldAlert,
  GraduationCap,
  Briefcase,
  Palmtree,
  Calendar,
  Globe,
  MessageCircle,
  CheckCircle2,
  AlertTriangle,
  Info,
  Clock,
  Send,
  HelpCircle,
} from 'lucide-react';
import { PageRoute, VisaQuoteRequest } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { openWhatsApp, saveQuoteLocally } from '../utils/whatsapp';

interface VisasProps {
  onNavigate: (page: PageRoute) => void;
  onOpenQuoteModal: (service?: string) => void;
}

export const Visas: React.FC<VisasProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState<VisaQuoteRequest>({
    name: '',
    phone: '',
    email: '',
    destinationCountry: '',
    visaType: 'Turismo',
    nationality: 'Moçambicana',
    intendedTravelDate: '',
    message: '',
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
      setErrorMsg('Por favor, introduza o seu telefone ou WhatsApp de contacto.');
      return;
    }
    if (!formData.destinationCountry.trim()) {
      setErrorMsg('Por favor, informe o país de destino.');
      return;
    }

    const lines = [
      'Olá BOM Samaritano!',
      '',
      'Gostaria de solicitar Consultoria para Vistos e Documentação.',
      '',
      `Nome: ${formData.name.trim()}`,
      `Contacto: ${formData.phone.trim()}`,
      formData.email ? `E-mail: ${formData.email.trim()}` : '',
      `País de Destino: ${formData.destinationCountry.trim()}`,
      `Tipo de Visto: ${formData.visaType}`,
      `Nacionalidade: ${formData.nationality}`,
      formData.intendedTravelDate ? `Data Prevista da Viagem: ${formData.intendedTravelDate}` : '',
      formData.message ? `Detalhes / Dúvidas: ${formData.message.trim()}` : '',
      '',
      'Podem orientar-me sobre os requisitos e passos do processo?',
    ].filter(Boolean);

    const messageText = lines.join('\n');

    saveQuoteLocally({
      type: 'Visto',
      clientName: formData.name.trim(),
      clientPhone: formData.phone.trim(),
      details: `Visto ${formData.visaType} para ${formData.destinationCountry} | Nac: ${formData.nationality} | Data: ${formData.intendedTravelDate || 'A definir'}`,
    });

    setSubmitted(true);
    setErrorMsg('');

    setTimeout(() => {
      openWhatsApp(messageText);
    }, 300);
  };

  return (
    <div className="bg-[#F5F7FB] min-h-screen pb-20">
      {/* Page Header */}
      <div className="bg-[#11164D] text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1600&q=80"
            alt="Passaporte e documentação consular"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#11164D] via-[#11164D]/90 to-[#11164D]/70" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <Breadcrumbs
            items={[{ label: 'Serviços' }, { label: 'Vistos e Documentação' }]}
            onNavigate={onNavigate}
          />

          <div className="max-w-3xl mt-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F58220]">
              Consultoria Técnica Especializada
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white mt-2 mb-4 leading-tight">
              VISTOS E DOCUMENTAÇÃO
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-light">
              Orientação para preparar a sua viagem com mais organização e confiança.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        {/* Crucial Ethical Disclaimer Banner */}
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 mb-10 shadow-sm flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
            <strong className="font-bold text-amber-950 block mb-1">
              Aviso Importante e Código de Ética Profissional:
            </strong>
            Os requisitos variam conforme o país e o tipo de visto. A aprovação e concessão de vistos é da exclusiva e soberana responsabilidade das autoridades consulares e migratórias competentes. A BOM Samaritano presta assistência técnica, conferência de conformidade e orientação na instrução do processo, <strong>não prometendo nem garantindo a aprovação</strong> de qualquer visto. Não trabalhamos com documentação falsa nem métodos irregulares.
          </div>
        </div>

        {/* 3 Main Visa Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Visto de Turismo */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#F58220] flex items-center justify-center mb-4">
                <Palmtree className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#11164D] mb-2">
                Visto de Turismo & Visita Familiar
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                Orientação detalhada para viagens de lazer, férias, turismo religioso e visita a familiares residentes no exterior (Portugal, Espaço Schengen, Turquia, Dubai, África do Sul, etc.).
              </p>
              <div className="space-y-1.5 text-xs text-slate-500 border-t border-slate-100 pt-3">
                <div>• Apoio no preenchimento de formulários consulares</div>
                <div>• Checklist de comprovativos de alojamento e meios financeiros</div>
                <div>• Emissão de seguro de viagem internacional obrigatório</div>
              </div>
            </div>
            <button
              onClick={() => {
                setFormData({ ...formData, visaType: 'Turismo' });
                document.getElementById('visa-form-anchor')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-6 text-xs font-bold text-[#F58220] hover:text-[#E07316] flex items-center gap-1"
            >
              Pedir orientação para Turismo →
            </button>
          </div>

          {/* Visto de Estudante */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-[#F58220]/40 flex flex-col justify-between relative">
            <div className="absolute -top-3 right-4 px-2.5 py-0.5 bg-[#F58220] text-white text-[10px] font-extrabold uppercase rounded-full">
              Destaque Académico
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#11164D] flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#11164D] mb-2">
                Visto de Estudante
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                Orientação especializada para jovens moçambicanos admitidos em cursos de licenciatura, mestrado, doutoramento ou formação profissional no exterior.
              </p>
              <div className="space-y-1.5 text-xs text-slate-500 border-t border-slate-100 pt-3">
                <div>• Verificação da carta de aceitação institucional</div>
                <div>• Orientação para termos de responsabilidade financeira</div>
                <div>• Seguro de saúde escolar e apoio no registo criminal</div>
              </div>
            </div>
            <button
              onClick={() => {
                setFormData({ ...formData, visaType: 'Estudante' });
                document.getElementById('visa-form-anchor')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-6 text-xs font-bold text-[#F58220] hover:text-[#E07316] flex items-center gap-1"
            >
              Pedir orientação para Estudos →
            </button>
          </div>

          {/* Visto de Trabalho & Negócios */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#11164D] mb-2">
                Visto de Trabalho & Negócios
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                Assistência na organização de processos para profissionais com propostas de emprego, transferência empresarial ou participação em feiras e missões comerciais.
              </p>
              <div className="space-y-1.5 text-xs text-slate-500 border-t border-slate-100 pt-3">
                <div>• Análise de contratos de trabalho ou cartas de convite</div>
                <div>• Conferência de legalizações junto do MIREC</div>
                <div>• Apoio em vistos de negócios de curta ou longa duração</div>
              </div>
            </div>
            <button
              onClick={() => {
                setFormData({ ...formData, visaType: 'Trabalho' });
                document.getElementById('visa-form-anchor')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-6 text-xs font-bold text-[#F58220] hover:text-[#E07316] flex items-center gap-1"
            >
              Pedir orientação para Trabalho →
            </button>
          </div>
        </div>

        {/* Section 2: Form + Process Steps */}
        <div id="visa-form-anchor" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Consultation Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#F58220]">
                  Atendimento Especializado
                </span>
                <h2 className="font-display text-2xl font-bold text-[#11164D]">
                  Solicitar Consultoria Documental
                </h2>
              </div>
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#F58220] flex items-center justify-center">
                <FileCheck className="w-5 h-5" />
              </div>
            </div>

            {submitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-emerald-100 text-[#25D366] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-[#11164D] mb-2">
                  Pedido de Consultoria Encaminhado!
                </h3>
                <p className="text-slate-600 text-sm mb-6 max-w-md mx-auto leading-relaxed">
                  Os dados do seu processo foram organizados e abrimos o WhatsApp para que o consultor responsável analise os requisitos específicos do seu país de destino.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 rounded-xl bg-[#11164D] text-white font-semibold text-sm hover:bg-[#1A216E] transition-colors"
                >
                  Submeter Outro Pedido
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
                      País de Destino *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Portugal, Turquia, Dubai, China..."
                      value={formData.destinationCountry}
                      onChange={(e) => setFormData({ ...formData, destinationCountry: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#F58220] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Tipo de Visto *
                    </label>
                    <select
                      value={formData.visaType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          visaType: e.target.value as VisaQuoteRequest['visaType'],
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#F58220] focus:outline-none"
                    >
                      <option value="Turismo">Visto de Turismo</option>
                      <option value="Estudante">Visto de Estudante</option>
                      <option value="Trabalho">Visto de Trabalho</option>
                      <option value="Negócios">Visto de Negócios</option>
                      <option value="Outro">Outro Tipo de Visto</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Nacionalidade
                    </label>
                    <input
                      type="text"
                      value={formData.nationality}
                      onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                      placeholder="Moçambicana"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#F58220] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Data Prevista da Viagem
                    </label>
                    <input
                      type="date"
                      value={formData.intendedTravelDate}
                      onChange={(e) => setFormData({ ...formData, intendedTravelDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#F58220] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Mensagem / Situação Específica
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Indique se já tem passaporte válido, agendamento, carta de aceitação ou quais são as suas principais dúvidas..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#F58220] focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    id="visas-submit-btn"
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#F58220] hover:bg-[#E07316] text-white font-extrabold text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5 text-white" />
                    <span>Solicitar Consultoria no WhatsApp</span>
                  </button>
                  <p className="text-[11px] text-slate-400 text-center mt-2">
                    A sua mensagem será encaminhada para o WhatsApp +258 852 808 080 com todos os parâmetros preenchidos.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Steps & Best Practices */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-display font-bold text-lg text-[#11164D] mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#F58220]" />
                <span>Como Funciona a Nossa Consultoria</span>
              </h3>

              <div className="space-y-4">
                {[
                  {
                    step: '1',
                    title: 'Avaliação Inicial do Perfil',
                    desc: 'Analisamos o seu objectivo de viagem, destino pretendido e documentos já disponíveis.',
                  },
                  {
                    step: '2',
                    title: 'Checklist Consular Rigorosa',
                    desc: 'Entregamos uma lista detalhada e explicada com os requisitos oficiais actualizados.',
                  },
                  {
                    step: '3',
                    title: 'Revisão e Instrução do Dossiê',
                    desc: 'Conferência de formulários, comprovativos de reserva de voo, alojamento e seguro obrigatório.',
                  },
                  {
                    step: '4',
                    title: 'Acompanhamento do Agendamento',
                    desc: 'Orientação para o dia da recolha biométrica ou entrevista consular.',
                  },
                ].map((s) => (
                  <div key={s.step} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#11164D] text-[#F58220] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {s.step}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">{s.title}</h4>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* General Travel Documentation Checklist */}
            <div className="bg-[#11164D] text-white rounded-2xl p-6">
              <h4 className="font-display font-bold text-base mb-3 text-[#F58220] flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Documentos Essenciais de Viagem</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-[#F58220] font-bold">•</span>
                  <span><strong>Passaporte:</strong> Validade mínima de 6 meses além da data prevista de regresso.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F58220] font-bold">•</span>
                  <span><strong>Seguro de Viagem:</strong> Cobertura mínima de 30.000 € para a Europa / Schengen.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F58220] font-bold">•</span>
                  <span><strong>Autorização de Menores:</strong> Obrigatória por lei quando menores viajam sem ambos os pais.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F58220] font-bold">•</span>
                  <span><strong>Cartão Internacional de Vacinas:</strong> Febre Amarela quando exigido pelas regras sanitárias.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
