import React from 'react';
import {
  Compass,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Globe,
  Clock,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { PageRoute } from '../types';
import { COMPANY_DETAILS } from '../data/travelData';
import { openWhatsApp } from '../utils/whatsapp';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
  onOpenQuoteModal: (service?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenQuoteModal }) => {
  const handleNav = (page: PageRoute) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#11164D] text-white pt-16 pb-8 border-t-4 border-[#F58220]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1 & 2: Brand & Description */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div
              onClick={() => handleNav('home')}
              className="cursor-pointer flex items-center gap-3 group w-fit"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F58220] to-[#E07316] flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
                <Compass className="w-7 h-7 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight leading-tight">
                  BOM SAMARITANO
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#F58220]">
                  Agência de Viagens e Turismo
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed max-w-md mt-2">
              Facilitamos o seu caminho para o mundo com soluções completas e assistência personalizada em passagens aéreas, vistos consulares, turismo e alojamento a partir de Maputo, Moçambique.
            </p>

            <div className="flex items-center gap-3 mt-3">
              <a
                id="footer-social-instagram"
                href="https://www.instagram.com/bom_samaritano.viagens"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#F58220] flex items-center justify-center text-white transition-all hover:scale-105"
                title="Instagram da BOM Samaritano"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                id="footer-social-facebook"
                href="https://www.facebook.com/bomsamaritanoviagens"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#F58220] flex items-center justify-center text-white transition-all hover:scale-105"
                title="Facebook da BOM Samaritano"
              >
                <Facebook className="w-5 h-5" />
              </a>

              <button
                id="footer-whatsapp-btn-social"
                onClick={() => openWhatsApp('Olá BOM Samaritano! Gostaria de falar com a agência.')}
                className="w-10 h-10 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-white flex items-center justify-center transition-all hover:scale-105"
                title="WhatsApp Directo"
              >
                <MessageCircle className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-1.5 text-xs text-slate-400 pl-2">
                <Globe className="w-4 h-4 text-slate-500" />
                <span>{COMPANY_DETAILS.website}</span>
              </div>
            </div>

            <div className="mt-4 p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3 text-xs text-slate-300 max-w-md">
              <ShieldAlert className="w-5 h-5 text-[#F58220] shrink-0 mt-0.5" />
              <span>
                <strong>Aviso Legal Ético:</strong> A concessão de vistos depende unicamente das autoridades soberanas competentes. A agência presta assistência técnica e consultoria documental, não garantindo aprovação.
              </span>
            </div>
          </div>

          {/* Col 3: Navegação Rápida */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-bold text-base tracking-wide uppercase text-xs text-[#F58220]">
              Navegação
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-slate-300">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#F58220]" />
                  Início
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#F58220]" />
                  Sobre Nós
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('packages')}
                  className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#F58220]" />
                  Pacotes Turísticos
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('blog')}
                  className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#F58220]" />
                  Blog & Dicas
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#F58220]" />
                  Contactos
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('quotes-manager')}
                  className="text-xs text-orange-300 hover:text-white hover:translate-x-1 transition-all flex items-center gap-1.5 pt-2"
                >
                  <ArrowRight className="w-3 h-3 text-[#F58220]" />
                  Painel de Pedidos & Cotações
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Serviços */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-bold text-base tracking-wide uppercase text-xs text-[#F58220]">
              Os Nossos Serviços
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-slate-300">
              <li>
                <button
                  onClick={() => handleNav('flights')}
                  className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#F58220]" />
                  Passagens Aéreas
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('visas')}
                  className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#F58220]" />
                  Vistos e Documentação
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('packages')}
                  className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#F58220]" />
                  Pacotes Turísticos
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('hotels')}
                  className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#F58220]" />
                  Reservas de Hotéis
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('cars')}
                  className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#F58220]" />
                  Aluguer de Viaturas
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('insurance')}
                  className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#F58220]" />
                  Seguros de Viagem
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Contactos Directos */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-bold text-base tracking-wide uppercase text-xs text-[#F58220]">
              Contactos da Agência
            </h4>
            <div className="flex flex-col gap-3 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F58220] shrink-0 mt-0.5" />
                <span className="leading-snug">
                  {COMPANY_DETAILS.address}<br />
                  {COMPANY_DETAILS.city}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F58220] shrink-0" />
                <div>
                  <div className="text-[11px] text-slate-400">Chamadas:</div>
                  <a
                    href={`tel:${COMPANY_DETAILS.phoneCallsRaw}`}
                    className="hover:text-white font-semibold"
                  >
                    {COMPANY_DETAILS.phoneCalls}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <div>
                  <div className="text-[11px] text-slate-400">WhatsApp:</div>
                  <button
                    onClick={() => openWhatsApp('Olá BOM Samaritano! Gostaria de obter informações.')}
                    className="hover:text-white font-semibold text-[#25D366]"
                  >
                    {COMPANY_DETAILS.whatsApp}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#F58220] shrink-0" />
                <a
                  href={`mailto:${COMPANY_DETAILS.email}`}
                  className="hover:text-white break-all text-xs sm:text-sm font-medium"
                >
                  {COMPANY_DETAILS.email}
                </a>
              </div>

              <div className="flex items-start gap-2.5 pt-1 text-xs text-slate-400">
                <Clock className="w-4 h-4 text-[#F58220] shrink-0 mt-0.5" />
                <div>
                  <div>{COMPANY_DETAILS.openingHours.weekdays}</div>
                  <div>{COMPANY_DETAILS.openingHours.saturday}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="text-center sm:text-left">
            © 2026 BOM Samaritano — Agência de Viagens e Turismo. Todos os direitos reservados.
          </p>

          <div className="flex flex-wrap items-center gap-3 text-center sm:text-right">
            <span className="bg-white/10 px-3 py-1 rounded-full text-slate-300 font-medium">
              {COMPANY_DETAILS.developerText}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
