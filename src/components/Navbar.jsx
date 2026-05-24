import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-16 md:h-20 flex justify-between items-center px-4 md:px-8 bg-white/10 backdrop-blur-2xl border-b border-white/30 z-[100]">
      
      {/* CONTENTOR DO LOGÓTIPO */}
      <div className="relative h-full w-40 md:w-64 flex items-center">
        <div className="absolute left-0 top-1/2 -translate-y-1/2">
          <img 
            src="/logo-full.svg" 
            alt="Logótipo One Link Travel" 
            className="h-[140px] md:h-[260px] w-auto object-contain transition-transform duration-300 hover:scale-105" 
          />
        </div>
      </div>
      
      {/* NAVEGAÇÃO DESKTOP */}
      <div 
        className="hidden md:flex items-center gap-8 text-[15px] font-semibold text-gray-900"
        style={{ fontFamily: 'var(--font-worksans)' }}
      >
        <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="hover:text-blue-600 transition-colors">Início</a>
        <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover:text-blue-600 transition-colors">Serviços</a>
        <a href="#visas" onClick={(e) => scrollToSection(e, 'countries')} className="hover:text-blue-600 transition-colors">Vistos</a>
        <div 
          onClick={(e) => scrollToSection(e, 'team')} 
          className="flex items-center gap-1.5 cursor-pointer hover:text-blue-600 transition-colors group"
        >
          <span>Sobre nós</span>
          <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-600 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* BOTÃO MOBILE (Hambúrguer) */}
      <button 
        className="md:hidden p-3 bg-white/80 backdrop-blur-xl rounded-full border border-pink-200 shadow-sm relative z-[120] active:scale-90 transition-transform"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu"
      >
        <div className="flex flex-col gap-1 w-5">
          <span className={`h-0.5 w-full bg-gradient-to-r from-pink-500 to-blue-500 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`h-0.5 w-full bg-gradient-to-r from-pink-500 to-blue-500 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`h-0.5 w-full bg-gradient-to-r from-pink-500 to-blue-500 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </div>
      </button>

      {/* OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/5 backdrop-blur-[1px] z-[110] md:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* MENU MOBILE - TEMA ROSA/AZUL, MAIS ALTO E MAIS ESTREITO */}
      <div className={`fixed top-20 right-4 w-40 bg-gradient-to-b from-white/95 to-pink-50/90 backdrop-blur-3xl border border-white/50 rounded-[2.5rem] shadow-xl transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] z-[115] py-10 px-4 md:hidden ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-8 scale-90 pointer-events-none'}`}>
        <div 
          className="flex flex-col gap-8 text-[12px] font-bold text-gray-800 uppercase tracking-[0.2em] text-center"
          style={{ fontFamily: 'var(--font-worksans)' }}
        >
          <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="hover:text-pink-500 transition-colors">Início</a>
          <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover:text-blue-500 transition-colors">Serviços</a>
          <a href="#visas" onClick={(e) => scrollToSection(e, 'services')} className="hover:text-pink-500 transition-colors">Vistos</a>
          <a href="#about" onClick={(e) => scrollToSection(e, 'team')} className="hover:text-blue-500 transition-colors">Sobre nós</a>
        </div>
        
        {/* Detalhe Decorativo Inferior */}
        <div className="mt-8 flex justify-center">
          <div className="w-8 h-1 bg-gradient-to-r from-pink-300 to-blue-300 rounded-full opacity-50"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
