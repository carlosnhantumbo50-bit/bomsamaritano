import React from 'react';
import {
  Compass,
  CheckCircle2,
  Shield,
  Award,
  Users,
  HeartHandshake,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  ArrowRight,
} from 'lucide-react';
import { PageRoute } from '../types';
import { COMPANY_DETAILS } from '../data/travelData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { openWhatsApp } from '../utils/whatsapp';

interface AboutUsProps {
  onNavigate: (page: PageRoute) => void;
  onOpenQuoteModal: (service?: string) => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ onNavigate, onOpenQuoteModal }) => {
  return (
    <div className="bg-[#F5F7FB] min-h-screen pb-16">
      {/* Page Title Hero Banner */}
      <div className="bg-[#11164D] text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80"
            alt="Viagens e Turismo"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#11164D] via-[#11164D]/90 to-[#11164D]/70" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <Breadcrumbs items={[{ label: 'Sobre Nós' }]} onNavigate={onNavigate} />

          <div className="max-w-3xl mt-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F58220]">
              A Nossa Agência
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white mt-2 mb-4 leading-tight">
              SOBRE A BOM SAMARITANO
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-light">
              Nascemos em Maputo com a missão de conectar Moçambique ao mundo, proporcionando viagens seguras, assistência documental transparente e experiências que realizam sonhos.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        {/* Quick Highlights Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#F58220] flex items-center justify-center shrink-0">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-[#11164D]">
                Atendimento Personalizado
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Consultoria individual que compreende os seus objectivos de viagem, datas e orçamento.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#11164D] flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-[#11164D]">
                Segurança e Rigor
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Processos documentais transparentes e emissões de bilhetes em companhias aéreas reconhecidas.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-[#11164D]">
                Presença Física em Maputo
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Localizados na Av. Eduardo Mondlane, Paragem Belita, prontos para o receber.
              </p>
            </div>
          </div>
        </div>

        {/* Story & Presentation */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-100 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 flex flex-col gap-5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F58220]">
                A Nossa História e Compromisso
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#11164D] leading-snug">
                Facilitamos o Seu Caminho Para o Mundo Com Tranquilidade
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                A <strong>BOM Samaritano — Agência de Viagens e Turismo</strong> foi constituída em Maputo com o firme propósito de transformar a forma como as famílias, estudantes e profissionais moçambicanos planeiam e executam as suas viagens ao exterior e dentro do país.
              </p>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Reconhecemos que viajar vai muito além de comprar um bilhete de avião: envolve expectativas, sonhos familiares, investimentos na formação profissional e formalidades burocráticas que necessitam de orientação idónea. Por isso, a nossa abordagem assenta na máxima honestidade, clareza e acompanhamento permanente.
              </p>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Não prometemos milagres nem facilidades irreais: oferecemos sim trabalho técnico sério, conhecimento prático das regras de trânsito internacional e uma equipa dedicada que trata cada passageiro com o respeito que ele merece.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onOpenQuoteModal()}
                  className="px-6 py-3 rounded-xl bg-[#F58220] hover:bg-[#E07316] text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Pedir Cotação de Viagem</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => openWhatsApp('Olá BOM Samaritano! Gostaria de falar com a vossa equipa.')}
                  className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-all flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Falar no WhatsApp</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
                  alt="Atendimento de viagens em Maputo"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#11164D]/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs font-semibold text-[#F58220]">BOM Samaritano</div>
                  <div className="font-display font-bold text-lg">Maputo, Moçambique</div>
                  <p className="text-xs text-slate-300">Av. Eduardo Mondlane, Paragem Belita</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Missão, Visão e Valores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#11164D] text-white flex items-center justify-center mb-5">
                <Compass className="w-6 h-6 text-[#F58220]" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#11164D] mb-3">
                A Nossa Missão
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Prestar serviços integrados de consultoria de viagens, reservas e documentação com excelência, ética e proximidade humana, tornando a experiência de viajar segura, acessível e memorável para cidadãos e empresas em Moçambique.
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#11164D] text-white flex items-center justify-center mb-5">
                <Award className="w-6 h-6 text-[#F58220]" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#11164D] mb-3">
                A Nossa Visão
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ser reconhecida em Maputo e em todo o território nacional como uma agência de referência pela seriedade, solidez no aconselhamento consular e capacidade de resposta ágil para qualquer destino global.
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#11164D] text-white flex items-center justify-center mb-5">
                <Shield className="w-6 h-6 text-[#F58220]" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#11164D] mb-3">
                Os Nossos Valores
              </h3>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F58220] shrink-0" />
                  <span><strong>Integridade e Verdade:</strong> Sem falsas promessas de vistos.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F58220] shrink-0" />
                  <span><strong>Empatia:</strong> Cuidado genuíno com o passageiro.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F58220] shrink-0" />
                  <span><strong>Rigor Técnico:</strong> Cumprimento de normas internacionais.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F58220] shrink-0" />
                  <span><strong>Pontualidade:</strong> Resposta rápida e diligência.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Informações Institucionais & Parceria com CNM Multiservices */}
        <div className="p-8 rounded-3xl bg-[#11164D] text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#F58220]">
              Desenvolvimento e Tecnologia
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
              Plataforma Desenvolvida por CNM Multiservices
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
              Projectado especialmente para proporcionar a melhor experiência de navegação rápida, segura e com integração directa com os canais de atendimento em Maputo.
            </p>
          </div>

          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-[#11164D] font-bold text-sm shadow-md transition-all shrink-0"
          >
            Ver Detalhes de Contacto
          </button>
        </div>
      </div>
    </div>
  );
};
