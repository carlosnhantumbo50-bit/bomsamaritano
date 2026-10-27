import React, { useState, useEffect } from 'react';
import { PageRoute } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { QuoteModal } from './components/QuoteModal';
import { QuotesManagerModal } from './components/QuotesManagerModal';

// Pages
import { Home } from './pages/Home';
import { AboutUs } from './pages/AboutUs';
import { Flights } from './pages/Flights';
import { Visas } from './pages/Visas';
import { Packages } from './pages/Packages';
import { Hotels } from './pages/Hotels';
import { CarRental } from './pages/CarRental';
import { Insurance } from './pages/Insurance';
import { Blog } from './pages/Blog';
import { Contact } from './pages/Contact';

export default function App() {
  // Sync state with URL hash for browser navigation and bookmarking
  const getInitialPage = (): PageRoute => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    const validRoutes: PageRoute[] = [
      'home',
      'about',
      'flights',
      'visas',
      'packages',
      'hotels',
      'cars',
      'car-rental',
      'insurance',
      'blog',
      'contact',
      'quotes-manager',
    ];
    if (validRoutes.includes(hash as PageRoute)) {
      if (hash === 'quotes-manager') {
        return 'home';
      }
      return hash as PageRoute;
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<PageRoute>(getInitialPage);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quotesManagerOpen, setQuotesManagerOpen] = useState(false);
  const [quoteModalInitialService, setQuoteModalInitialService] = useState('Passagens Aéreas');

  // Handle hash changes (back/forward button)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'quotes-manager') {
        setQuotesManagerOpen(true);
        return;
      }
      const page = getInitialPage();
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageRoute) => {
    if (page === 'quotes-manager') {
      setQuotesManagerOpen(true);
      return;
    }
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuoteModal = (service?: string) => {
    if (service) {
      setQuoteModalInitialService(service);
    }
    setQuoteModalOpen(true);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={navigateTo} onOpenQuoteModal={handleOpenQuoteModal} />;
      case 'about':
        return <AboutUs onNavigate={navigateTo} onOpenQuoteModal={handleOpenQuoteModal} />;
      case 'flights':
        return <Flights onNavigate={navigateTo} onOpenQuoteModal={handleOpenQuoteModal} />;
      case 'visas':
        return <Visas onNavigate={navigateTo} onOpenQuoteModal={handleOpenQuoteModal} />;
      case 'packages':
        return <Packages onNavigate={navigateTo} onOpenQuoteModal={handleOpenQuoteModal} />;
      case 'hotels':
        return <Hotels onNavigate={navigateTo} onOpenQuoteModal={handleOpenQuoteModal} />;
      case 'cars':
      case 'car-rental':
        return <CarRental onNavigate={navigateTo} onOpenQuoteModal={handleOpenQuoteModal} />;
      case 'insurance':
        return <Insurance onNavigate={navigateTo} onOpenQuoteModal={handleOpenQuoteModal} />;
      case 'blog':
      case 'blog-post':
        return <Blog onNavigate={navigateTo} onOpenQuoteModal={handleOpenQuoteModal} />;
      case 'contact':
        return <Contact onNavigate={navigateTo} onOpenQuoteModal={handleOpenQuoteModal} />;
      default:
        return <Home onNavigate={navigateTo} onOpenQuoteModal={handleOpenQuoteModal} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FB] text-slate-900 selection:bg-[#F58220] selection:text-white">
      {/* Global Navigation Header */}
      <Header
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenQuoteModal={handleOpenQuoteModal}
      />

      {/* Main Page View */}
      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Global Comprehensive Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenQuoteModal={handleOpenQuoteModal}
      />

      {/* Persistent Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Global Lead Generation Quote Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialService={quoteModalInitialService}
      />

      {/* Local Quotes Manager Modal */}
      <QuotesManagerModal
        isOpen={quotesManagerOpen}
        onClose={() => setQuotesManagerOpen(false)}
        onNewQuote={() => {
          setQuotesManagerOpen(false);
          setQuoteModalOpen(true);
        }}
      />
    </div>
  );
}
