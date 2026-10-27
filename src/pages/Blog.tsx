import React, { useState } from 'react';
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  X,
  MessageCircle,
  Share2,
  CheckCircle2,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { PageRoute, BlogPost } from '../types';
import { BLOG_POSTS } from '../data/travelData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { openWhatsApp } from '../utils/whatsapp';

interface BlogProps {
  onNavigate: (page: PageRoute) => void;
  onOpenQuoteModal: (service?: string) => void;
}

export const Blog: React.FC<BlogProps> = ({ onNavigate, onOpenQuoteModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  const filteredPosts = BLOG_POSTS.filter((post) => {
    if (selectedCategory !== 'todos' && post.category !== selectedCategory) return false;
    return true;
  });

  const categories = [
    { id: 'todos', label: 'Todos os Artigos' },
    { id: 'Documentação & Vistos', label: 'Vistos & Documentos' },
    { id: 'Destinos & Turismo', label: 'Destinos' },
    { id: 'Dicas Práticas', label: 'Dicas Práticas' },
    { id: 'Seguros & Protecção', label: 'Seguros' },
    { id: 'Turismo Nacional', label: 'Moçambique' },
  ];

  return (
    <div className="bg-[#F5F7FB] min-h-screen pb-20">
      {/* Hero Header */}
      <div className="bg-[#11164D] text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1600&q=80"
            alt="Dicas de viagem e exploração"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#11164D] via-[#11164D]/90 to-[#11164D]/70" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <Breadcrumbs
            items={[{ label: 'Dicas de Viagem & Blog' }]}
            onNavigate={onNavigate}
          />

          <div className="max-w-3xl mt-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F58220]">
              Guia Prático do Viajante
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white mt-2 mb-4 leading-tight">
              DICAS DE VIAGEM & BLOG
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-light">
              Informação prática, conselhos úteis e orientação para viajantes que partem de Moçambique rumo ao mundo.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        {/* Category Filters */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 mb-10 flex items-center justify-between overflow-x-auto gap-2">
          <div className="flex items-center gap-2 min-w-max">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === c.id
                    ? 'bg-[#11164D] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#11164D]/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                    {post.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-[#11164D] mb-3 group-hover:text-[#F58220] transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                    {post.excerpt || post.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-50 flex items-center justify-between">
                <button
                  onClick={() => setActiveArticle(post)}
                  className="text-xs font-bold text-[#11164D] hover:text-[#F58220] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Ler Artigo Completo</span>
                  <ArrowRight className="w-4 h-4 text-[#F58220]" />
                </button>

                <button
                  onClick={() =>
                    openWhatsApp(
                      `Olá BOM Samaritano! Li o artigo "${post.title}" no vosso website e tenho uma dúvida. Podem ajudar-me?`
                    )
                  }
                  className="p-2 rounded-lg bg-slate-50 hover:bg-emerald-50 text-slate-500 hover:text-emerald-600 transition-colors"
                  title="Tirar dúvidas no WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Box */}
        <div className="mt-16 bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F58220]">
              Precisa de Apoio Personalizado?
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#11164D] mt-1 mb-2">
              Fale Directamente Com os Nossos Consultores em Maputo
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Tem dúvidas sobre um visto específico, regras de companhias aéreas ou precisa de montar um roteiro à medida? Estamos disponíveis no WhatsApp e no nosso escritório na Av. Eduardo Mondlane.
            </p>
          </div>

          <button
            onClick={() => onOpenQuoteModal()}
            className="px-8 py-4 rounded-xl bg-[#F58220] hover:bg-[#E07316] text-white font-bold text-sm shadow-md transition-all shrink-0 cursor-pointer"
          >
            Fazer Pergunta à Agência
          </button>
        </div>
      </div>

      {/* Article Detail Modal / Reader */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="relative h-60 sm:h-72 overflow-hidden shrink-0">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                aria-label="Fechar artigo"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-5 left-6 right-6 text-white">
                <span className="px-2.5 py-1 rounded-full bg-[#F58220] text-white text-[10px] font-bold uppercase tracking-wider mb-2 inline-block">
                  {activeArticle.category}
                </span>
                <h2 className="font-display text-xl sm:text-2xl font-bold leading-snug">
                  {activeArticle.title}
                </h2>
                <div className="flex items-center gap-4 text-xs text-slate-300 mt-2">
                  <span>{activeArticle.date}</span>
                  <span>•</span>
                  <span>{activeArticle.readTime} de leitura</span>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
              <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed font-light space-y-3">
                {Array.isArray(activeArticle.content) ? (
                  activeArticle.content.map((paragraph, index) => (
                    <p key={index} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p className="whitespace-pre-line">{activeArticle.content}</p>
                )}
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm text-[#11164D]">
                    Ficou com alguma dúvida sobre este assunto?
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Fale em tempo real com um dos consultores da BOM Samaritano.
                  </p>
                </div>

                <button
                  onClick={() =>
                    openWhatsApp(
                      `Olá BOM Samaritano! Estava a ler o artigo "${activeArticle.title}" e gostaria de obter mais esclarecimentos.`
                    )
                  }
                  className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs shadow transition-all flex items-center gap-2 shrink-0 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Perguntar no WhatsApp</span>
                </button>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2 text-slate-600 hover:text-slate-900 text-xs font-bold"
              >
                Voltar à Lista de Artigos
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
