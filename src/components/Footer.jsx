import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaYoutube, FaFacebookF, FaTiktok } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-8">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
            <Link to="/" onClick={() => window.scrollTo(0, 0)} className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-60 transition duration-500"></div>
              <div className="relative bg-white/95 backdrop-blur-sm px-6 py-4 rounded-2xl flex items-center justify-center shadow-xl border border-white/20">
                <img src="/logo.png" alt="One Link Holding" className="h-14 md:h-16 object-contain group-hover:scale-105 transition-transform duration-500" />
              </div>
            </Link>
            <Link to="/onelinktravel" onClick={() => window.scrollTo(0, 0)} className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl blur opacity-20 group-hover:opacity-60 transition duration-500"></div>
              <div className="relative bg-white/95 backdrop-blur-sm px-6 py-4 rounded-2xl flex items-center justify-center shadow-xl border border-white/20">
                <img src="/onelinktravel-logo.png" alt="One Link Travel" className="h-12 md:h-14 object-contain group-hover:scale-105 transition-transform duration-500" />
              </div>
            </Link>
            <Link to="/cbest" onClick={() => window.scrollTo(0, 0)} className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-400 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-60 transition duration-500"></div>
              <div className="relative bg-white/95 backdrop-blur-sm px-6 py-4 rounded-2xl flex items-center justify-center shadow-xl border border-white/20">
                <img src="/cbest-logo.png" alt="CBEST" className="h-9 md:h-10 object-contain group-hover:scale-105 transition-transform duration-500" />
              </div>
            </Link>
          </div>
          
          <div className="flex space-x-4">
            <a href="https://www.instagram.com/cbest__onelinktravel" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#E1306C] transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(225,48,108,0.5)] hover:-translate-y-1">
              <FaInstagram className="w-5 h-5" />
            </a>
            <a href="https://www.youtube.com/@cbest_onelinktravel" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#FF0000] transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(255,0,0,0.5)] hover:-translate-y-1">
              <FaYoutube className="w-5 h-5" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61579546714192" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#1877F2] transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(24,119,242,0.5)] hover:-translate-y-1">
              <FaFacebookF className="w-5 h-5" />
            </a>
            <a href="https://www.tiktok.com/@cbest_onelinktravel" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-black hover:border border-white/20 transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:-translate-y-1">
              <FaTiktok className="w-4 h-4" />
            </a>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} One Link Holding. {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
