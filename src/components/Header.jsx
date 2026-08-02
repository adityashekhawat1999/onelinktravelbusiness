import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { FaInstagram, FaYoutube, FaFacebookF, FaTiktok } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

const Header = () => {
  const { scrollY } = useScroll();
  const { language, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isCBEST = location.pathname === '/cbest';
  const isOneLinkTravel = location.pathname === '/onelinktravel';

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const navLinks = [
    { name: t('header.aboutUs'), href: "/#sobre-nos" },
    { name: t('header.ecosystem'), href: "/#nossas-marcas" },
    { name: t('header.partners'), href: "/#parceiros" },
    { name: t('header.ourVision'), href: "/#equipa" },
    { name: t('header.faqs'), href: "/#faqs" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-2 px-4 pointer-events-none">
      <motion.div
        className={`pointer-events-auto flex flex-wrap justify-between items-center gap-y-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled
            ? "bg-white/80 backdrop-blur-2xl border border-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] py-2.5 px-4 rounded-[2rem] w-[95%] max-w-6xl"
            : "bg-white/40 backdrop-blur-lg border border-white/30 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.1)] py-4 px-6 rounded-[2.5rem] w-full max-w-7xl"
          }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.1 }}
      >
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center relative z-10"
          >
            <img
              src="/logo.png"
              alt="One Link Holding"
              className={`object-contain origin-left transition-all duration-500 ${(isCBEST || isOneLinkTravel) ? "h-9 scale-[1.1] ml-1" : "h-14 scale-[1.4] ml-2"
                }`}
            />
          </Link>

          {isCBEST && (
            <motion.div
              initial={{ opacity: 0, x: -20, filter: "blur(5px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="flex items-center ml-2 gap-2"
            >
              <div className="h-6 w-[1px] bg-gradient-to-b from-transparent via-slate-400 to-transparent opacity-50"></div>
              <Link
                to="/cbest"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center cursor-pointer pointer-events-auto group"
              >
                <img
                  src="/cbest-logo.png"
                  alt="CBEST"
                  className="object-contain h-6 group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
                />
              </Link>
            </motion.div>
          )}

          {isOneLinkTravel && (
            <motion.div
              initial={{ opacity: 0, x: -20, filter: "blur(5px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="flex items-center ml-2 gap-2"
            >
              <div className="h-6 w-[1px] bg-gradient-to-b from-transparent via-slate-400 to-transparent opacity-50"></div>
              <Link
                to="/onelinktravel"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center cursor-pointer pointer-events-auto group"
              >
                <img
                  src="/onelinktravel-logo.png"
                  alt="One Link Travel"
                  className="object-contain h-10 group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
                />
              </Link>
            </motion.div>
          )}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-slate-700 hover:text-slate-900 font-medium text-[13px] px-2 xl:px-3 py-2 rounded-full transition-all duration-300 hover:bg-white/70 hover:shadow-sm whitespace-nowrap"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Actions (Desktop) */}
        <div className="hidden md:flex items-center space-x-2">
          <div className="flex items-center space-x-1 mr-1 pr-3 border-r border-slate-200/60">
            <a href="https://www.instagram.com/cbest__onelinktravel" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-[#E1306C] hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md">
              <FaInstagram className="w-3.5 h-3.5" />
            </a>
            <a href="https://www.youtube.com/@cbest_onelinktravel" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-[#FF0000] hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md">
              <FaYoutube className="w-3.5 h-3.5" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61579546714192" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-[#1877F2] hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md">
              <FaFacebookF className="w-3.5 h-3.5" />
            </a>
            <a href="https://www.tiktok.com/@cbest_onelinktravel" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-black hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md">
              <FaTiktok className="w-3.5 h-3.5" />
            </a>
          </div>

          <Link
            to="/onelinktravel"
            className="px-4 py-2 rounded-full text-[13px] font-semibold text-[#5a7bc2] bg-[#7195e0]/10 hover:bg-[#7195e0]/20 hover:shadow-sm transition-all duration-300 whitespace-nowrap"
          >
            One Link Travel
          </Link>
          <Link
            to="/cbest"
            className="px-4 py-2 rounded-full text-[13px] font-semibold text-[#c4778a] bg-[#e89cae]/10 hover:bg-[#e89cae]/20 hover:shadow-sm transition-all duration-300 whitespace-nowrap"
          >
            CBEST
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center pr-2">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-slate-700 hover:text-slate-900 focus:outline-none p-2 rounded-full hover:bg-black/5 transition-colors"
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-4 right-4 mt-2 bg-white/95 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-6 flex flex-col gap-4 pointer-events-auto z-50 lg:hidden"
        >
          <div className="flex flex-col gap-2 border-b border-slate-100 pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-slate-700 font-medium text-[15px] px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="flex flex-col gap-3 pt-2">
            <Link
              to="/onelinktravel"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center px-4 py-3 rounded-xl text-[14px] font-bold text-[#5a7bc2] bg-[#7195e0]/10 hover:bg-[#7195e0]/20 transition-colors"
            >
              One Link Travel
            </Link>
            <Link
              to="/cbest"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center px-4 py-3 rounded-xl text-[14px] font-bold text-[#c4778a] bg-[#e89cae]/10 hover:bg-[#e89cae]/20 transition-colors"
            >
              CBEST
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
