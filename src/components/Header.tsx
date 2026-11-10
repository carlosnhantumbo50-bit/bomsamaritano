import React, { useState, useEffect } from 'react';
import {
  Phone,
  PhoneCall,
  MessageCircle,
  MapPin,
  Menu,
  X,
  Plane,
  ChevronDown,
  Clock,
  Compass,
  FileCheck,
  ShieldCheck,
  Car,
  Building,
  Palmtree,
  BookOpen,
} from 'lucide-react';
import { PageRoute } from '../types';
import { COMPANY_DETAILS } from '../data/travelData';
import { openWhatsApp } from '../utils/whatsapp';

interface HeaderProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  onOpenQuoteModal: (service?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenQuoteModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (page: PageRoute) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks: { label: string; route: PageRoute }[] = [
    { label: 'Início', route: 'home' },
    { label: 'Sobre Nós', route: 'about' },
    { label: 'Pacotes Turísticos', route: 'packages' },
    { label: 'Vistos', route: 'visas' },
    { label: 'Blog', route: 'blog' },
    { label: 'Contactos', route: 'contact' },
  ];

  const serviceSubItems: { label: string; route: PageRoute; icon: React.ComponentType<{ className?: string }> }[] = [
    { label: 'Passagens Aéreas', route: 'flights', icon: Plane },
    { label: 'Vistos e Documentação', route: 'visas', icon: FileCheck },
    { label: 'Pacotes Turísticos', route: 'packages', icon: Palmtree },
    { label: 'Reservas de Hotéis', route: 'hotels', icon: Building },
    { label: 'Aluguer de Viaturas', route: 'cars', icon: Car },
    { label: 'Seguros de Viagem', route: 'insurance', icon: ShieldCheck },
  ];

  const isServicesActive = [
    'flights',
    'visas',
    'packages',
    'hotels',
    'cars',
    'insurance',
  ].includes(currentPage);

  return (
    <header className="sticky top-0 z-50 w-full shadow-md bg-white transition-all">
      {/* Top Bar with Essential Maputo Contacts */}
      <div className="bg-[#11164D] text-white text-xs sm:text-sm py-2 px-4 sm:px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-slate-200">
            <div className="flex items-center gap-1.5 hover:text-white transition-colors">
              <MapPin className="w-3.5 h-3.5 text-[#F58220] shrink-0" />
              <span className="truncate hidden sm:inline">{COMPANY_DETAILS.fullAddress}</span>
              <span className="sm:hidden">Maputo, Moçambique</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-[#F58220] shrink-0" />
              <span>Seg - Sex: 08:00 – 17:30 | Sáb: 08:30 – 13:00</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            {/* Phone Call (Voz / Linha Directa) */}
            <a
              id="header-call-link"
              href={`tel:${COMPANY_DETAILS.phoneCallsRaw}`}
              className="group flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 hover:bg-sky-500/20 border border-white/15 hover:border-sky-400/50 text-slate-100 hover:text-sky-200 transition-all text-xs"
              title="Ligar agora para linha directa de voz (+258 85 280 8080)"
            >
              <div className="w-5 h-5 rounded-full bg-sky-500/30 group-hover:bg-sky-400 text-sky-200 group-hover:text-slate-900 flex items-center justify-center transition-colors">
                <PhoneCall className="w-3 h-3 stroke-[2.5]" />
              </div>
              <span className="hidden xl:inline text-[10px] font-bold uppercase tracking-wider text-sky-300">
                Chamada:
              </span>
              <span className="font-semibold text-white group-hover:text-sky-100">
                {COMPANY_DETAILS.phoneCallsFormatted}
              </span>
            </a>

            {/* WhatsApp (Chat Directo com Badge Online) */}
            <button
              id="header-whatsapp-top-btn"
              onClick={() => openWhatsApp('Olá BOM Samaritano! Gostaria de obter informações sobre os vossos serviços.')}
              className="group flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#25D366]/20 hover:bg-[#25D366] border border-[#25D366]/50 hover:border-[#25D366] text-white transition-all text-xs cursor-pointer shadow-sm"
              title="Conversar no WhatsApp oficial (+258 86 560 6060)"
            >
              <div className="w-5 h-5 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xs">
                <MessageCircle className="w-3 h-3 fill-white text-transparent" />
              </div>
              <span className="font-bold flex items-center gap-1">
                <span className="hidden lg:inline text-emerald-300 group-hover:text-white">WhatsApp:</span>
                <span>{COMPANY_DETAILS.whatsAppFormatted}</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full bg-[#25D366] group-hover:bg-white text-slate-950 group-hover:text-[#25D366] tracking-wider transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-950 group-hover:bg-[#25D366] animate-pulse" />
                Online
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className={`transition-all duration-200 ${scrolled ? 'py-2.5 shadow-sm' : 'py-3.5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <div
            id="brand-logo"
            onClick={() => handleNav('home')}
            className="cursor-pointer flex items-center gap-3 group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#11164D] to-[#1A216E] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform border border-white/20">
              <Compass className="w-6 h-6 text-[#F58220]" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-lg sm:text-xl text-[#11164D] tracking-tight leading-tight flex items-center gap-1">
                BOM SAMARITANO
              </span>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#F58220] -mt-0.5">
                Agência de Viagens e Turismo
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              id="nav-link-home"
              onClick={() => handleNav('home')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                currentPage === 'home'
                  ? 'text-[#11164D] bg-slate-100 font-bold'
                  : 'text-slate-700 hover:text-[#11164D] hover:bg-slate-50'
              }`}
            >
              Início
            </button>

            <button
              id="nav-link-about"
              onClick={() => handleNav('about')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                currentPage === 'about'
                  ? 'text-[#11164D] bg-slate-100 font-bold'
                  : 'text-slate-700 hover:text-[#11164D] hover:bg-slate-50'
              }`}
            >
              Sobre Nós
            </button>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                id="nav-link-services-dropdown"
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-1 transition-colors ${
                  isServicesActive
                    ? 'text-[#11164D] bg-slate-100 font-bold'
                    : 'text-slate-700 hover:text-[#11164D] hover:bg-slate-50'
                }`}
              >
                <span>Serviços</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    servicesDropdownOpen ? 'rotate-180 text-[#F58220]' : 'text-slate-400'
                  }`}
                />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-2 mt-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  {serviceSubItems.map((item) => {
                    const Icon = item.icon;
                    const active = currentPage === item.route;
                    return (
                      <button
                        key={item.route}
                        onClick={() => handleNav(item.route)}
                        className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 transition-colors ${
                          active
                            ? 'bg-orange-50 text-[#F58220] font-semibold'
                            : 'text-slate-700 hover:bg-slate-50 hover:text-[#11164D]'
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                            active ? 'bg-[#F58220] text-white' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <button
              id="nav-link-packages"
              onClick={() => handleNav('packages')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                currentPage === 'packages'
                  ? 'text-[#11164D] bg-slate-100 font-bold'
                  : 'text-slate-700 hover:text-[#11164D] hover:bg-slate-50'
              }`}
            >
              Pacotes Turísticos
            </button>

            <button
              id="nav-link-visas"
              onClick={() => handleNav('visas')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                currentPage === 'visas'
                  ? 'text-[#11164D] bg-slate-100 font-bold'
                  : 'text-slate-700 hover:text-[#11164D] hover:bg-slate-50'
              }`}
            >
              Vistos
            </button>

            <button
              id="nav-link-blog"
              onClick={() => handleNav('blog')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                currentPage === 'blog' || currentPage === 'blog-post'
                  ? 'text-[#11164D] bg-slate-100 font-bold'
                  : 'text-slate-700 hover:text-[#11164D] hover:bg-slate-50'
              }`}
            >
              Blog & Dicas
            </button>

            <button
              id="nav-link-contact"
              onClick={() => handleNav('contact')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                currentPage === 'contact'
                  ? 'text-[#11164D] bg-slate-100 font-bold'
                  : 'text-slate-700 hover:text-[#11164D] hover:bg-slate-50'
              }`}
            >
              Contactos
            </button>
          </nav>

          {/* Desktop Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-2.5">
            <button
              id="header-whatsapp-cta-btn"
              onClick={() => openWhatsApp('Olá BOM Samaritano! Gostaria de falar com um consultor de viagens.')}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-emerald-500 text-emerald-700 hover:bg-emerald-50 text-xs font-semibold transition-all shadow-sm"
              title="Abrir WhatsApp da Agência"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp</span>
            </button>

            <button
              id="header-quote-modal-btn"
              onClick={() => onOpenQuoteModal()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F58220] hover:bg-[#E07316] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
            >
              <span>Pedir Cotação</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              id="mobile-quote-btn-header"
              onClick={() => onOpenQuoteModal()}
              className="px-3 py-1.5 rounded-lg bg-[#F58220] text-white text-xs font-bold shadow"
            >
              Cotação
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-[#11164D] hover:bg-slate-100 focus:outline-none"
              aria-label="Abrir Menu de Navegação"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="lg:hidden bg-white border-t border-slate-100 px-4 pt-3 pb-6 shadow-2xl max-h-[85vh] overflow-y-auto"
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.route}
                onClick={() => handleNav(link.route)}
                className={`text-left px-3 py-2.5 rounded-lg text-base font-semibold transition-colors ${
                  currentPage === link.route
                    ? 'bg-slate-100 text-[#11164D] font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}

            {/* Mobile Services Accordion */}
            <div className="border-t border-slate-100 my-2 pt-2">
              <span className="px-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                Os Nossos Serviços
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-2">
                {serviceSubItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.route}
                      onClick={() => handleNav(item.route)}
                      className={`text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2.5 ${
                        currentPage === item.route
                          ? 'bg-orange-50 text-[#F58220] font-semibold'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-[#F58220]" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Conversion Actions */}
            <div className="pt-4 flex flex-col gap-2.5">
              <button
                id="mobile-drawer-quote-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuoteModal();
                }}
                className="w-full py-3 rounded-xl bg-[#F58220] hover:bg-[#E07316] text-white text-center font-bold text-base shadow-md flex items-center justify-center gap-2"
              >
                <span>Pedir Cotação de Viagem</span>
              </button>

              <button
                id="mobile-drawer-whatsapp-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openWhatsApp('Olá BOM Samaritano! Gostaria de falar com um consultor de viagens.');
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm shadow-md flex items-center justify-between transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 fill-white text-transparent" />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] uppercase tracking-wider text-emerald-100 font-extrabold">WhatsApp Directo</div>
                    <div className="font-extrabold text-white">{COMPANY_DETAILS.whatsAppFormatted}</div>
                  </div>
                </div>
                <span className="text-[10px] bg-white text-emerald-800 font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online
                </span>
              </button>

              <a
                id="mobile-drawer-phone-btn"
                href={`tel:${COMPANY_DETAILS.phoneCallsRaw}`}
                className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-[#11164D] text-white font-bold text-sm shadow-sm flex items-center justify-between border border-slate-700 transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center">
                    <PhoneCall className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] uppercase tracking-wider text-sky-300 font-extrabold">Chamada Telefónica (Voz)</div>
                    <div className="font-extrabold text-white">{COMPANY_DETAILS.phoneCallsFormatted}</div>
                  </div>
                </div>
                <span className="text-[10px] bg-sky-500/20 text-sky-300 font-bold px-2 py-0.5 rounded-full">
                  Ligar
                </span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
