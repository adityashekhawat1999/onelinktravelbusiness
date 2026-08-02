import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaYoutube, FaFacebookF, FaTiktok } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center mb-8">
          <div className="flex space-x-6">
            <a href="https://www.instagram.com/cbest__onelinktravel" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#E1306C] transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(225,48,108,0.5)] hover:-translate-y-1">
              <FaInstagram className="w-6 h-6" />
            </a>
            <a href="https://www.youtube.com/@cbest_onelinktravel" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#FF0000] transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(255,0,0,0.5)] hover:-translate-y-1">
              <FaYoutube className="w-6 h-6" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61579546714192" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#1877F2] transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(24,119,242,0.5)] hover:-translate-y-1">
              <FaFacebookF className="w-6 h-6" />
            </a>
            <a href="https://www.tiktok.com/@cbest_onelinktravel" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-black hover:border border-white/20 transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:-translate-y-1">
              <FaTiktok className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} One Link Holding
        </div>
      </div>
    </footer>
  );
};

export default Footer;
